import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isRateLimited } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Extracts the caller's IP from request headers, falling back to localhost.
 * Handles proxied requests via x-forwarded-for.
 */
function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return request.headers.get('x-real-ip') ?? '127.0.0.1';
}

export async function POST(request: NextRequest) {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: 'Too many requests. Please wait a minute before trying again.' },
            { status: 429 }
        );
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    if (
        typeof body !== 'object' ||
        body === null ||
        !('name' in body) ||
        !('email' in body) ||
        !('subject' in body) ||
        !('message' in body)
    ) {
        return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const { name, email, subject, message } = body as Record<string, unknown>;

    if (typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
        return NextResponse.json({ error: 'Invalid name.' }, { status: 400 });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (typeof subject !== 'string' || subject.trim().length === 0 || subject.length > 200) {
        return NextResponse.json({ error: 'Invalid subject.' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.trim().length === 0 || message.length > 2000) {
        return NextResponse.json({ error: 'Invalid message.' }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

    if (!toEmail) {
        return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
    }

    const { error } = await resend.emails.send({
        from: `Portfolio Contact <${fromEmail}>`,
        to: toEmail,
        replyTo: email,
        subject: subject.trim(),
        html: `
            <p><strong>Name:</strong> ${name.trim()}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr />
            <p>${message.trim().replace(/\n/g, '<br />')}</p>
        `,
    });

    if (error) {
        return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
