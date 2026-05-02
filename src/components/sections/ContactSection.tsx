'use client';

import { useState, type FormEvent } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { contact } from '@/data/contact';
import { socialLinks } from '@/data/social';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { clsx } from 'clsx';

/**
 * Contact section. Social links + mailto-based contact form.
 * Each theme gets distinct visual treatment via CSS variables and utility classes.
 */
export function ContactSection() {
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const isTerminal = theme === 'terminal';
    const isSynthwave = theme === 'synthwave';
    const isWin98 = theme === 'win98';
    const isNewspaper = theme === 'newspaper';

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await response.json();

            if (!response.ok) {
                setStatus('error');
                setErrorMessage(data.error ?? 'Something went wrong. Please try again.');
                return;
            }

            setStatus('success');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch {
            setStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    }

    const inputStyle: React.CSSProperties = {
        background: isWin98 ? 'white' : 'var(--bg)',
        color: isWin98 ? '#000' : 'var(--fg)',
        border: isWin98 ? '2px inset #808080' : `1px solid var(--border)`,
        borderRadius: 'var(--radius)',
        fontFamily: 'var(--font-mono)',
        padding: '6px 10px',
        width: '100%',
        fontSize: '13px',
        outline: 'none',
    };

    const labelStyle: React.CSSProperties = {
        fontFamily: 'var(--font-mono)',
        color: 'var(--fg-muted)',
        fontSize: '12px',
        display: 'block',
        marginBottom: '4px',
    };

    const directLinks = [
        {
            icon: FaEnvelope,
            label: contact.email,
            href: `mailto:${contact.email}`,
        },
        {
            icon: FaMapMarkerAlt,
            label: contact.location,
            href: contact.locationHref,
        },
    ];

    const formContent = (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
                <label style={labelStyle}>{isTerminal ? '// name' : 'Name'}</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isTerminal ? 'enter name_' : 'Your name'}
                    style={inputStyle}
                    required
                />
            </div>
            <div>
                <label style={labelStyle}>{isTerminal ? '// email' : 'Email'}</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isTerminal ? 'enter email_' : 'your@email.com'}
                    style={inputStyle}
                    required
                />
            </div>
            <div>
                <label style={labelStyle}>{isTerminal ? '// subject' : 'Subject'}</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={isTerminal ? 'enter subject_' : 'What\'s this about?'}
                    style={inputStyle}
                    required
                />
            </div>
            <div>
                <label style={labelStyle}>{isTerminal ? '// message' : 'Message'}</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isTerminal ? 'enter message_' : 'What would you like to discuss?'}
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    required
                />
            </div>
            <button
                type="submit"
                disabled={status === 'loading'}
                className={clsx(
                    'px-6 py-2 text-sm font-semibold transition-all',
                    status === 'loading' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                    isWin98 ? 'win-btn' : 'border border-[var(--accent)]',
                    isSynthwave && status !== 'loading' && 'neon-border'
                )}
                style={{
                    background: isWin98 ? 'var(--card-bg)' : 'var(--accent)',
                    color: isWin98 ? '#000' : 'var(--bg)',
                    fontFamily: 'var(--font-mono)',
                    borderRadius: 'var(--radius)',
                    alignSelf: 'flex-start',
                }}
            >
                {status === 'loading'
                    ? (isTerminal ? '$ sending...' : 'Sending...')
                    : isTerminal ? '$ send_message' : isSynthwave ? 'TRANSMIT' : isNewspaper ? 'Submit ✦' : 'Send Message'}
            </button>

            {status === 'success' && (
                <p
                    className="text-xs mt-1"
                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                >
                    {'Message sent successfully! I\'ll get back to you soon.'}
                </p>
            )}

            {status === 'error' && (
                <p
                    className="text-xs mt-1"
                    style={{ color: '#e53e3e', fontFamily: 'var(--font-mono)' }}
                >
                    {isTerminal ? `> error: ${errorMessage}` : errorMessage}
                </p>
            )}
        </form>
    );

    return (
        <div
            className={clsx(
                'h-full overflow-y-auto py-6',
                isTerminal && 'scanlines'
            )}
            style={{ background: 'var(--bg)' }}
        >
        <div className="max-w-4xl mx-auto px-4 md:px-8">
            {/* Section header */}
            <div className="mb-6">
                {isNewspaper && (
                    <div className="text-xs tracking-[0.4em] uppercase text-[var(--fg-muted)] border-b border-[var(--border)] pb-1 mb-2">
                        Get In Touch
                    </div>
                )}
                <h1
                    className={clsx('font-bold', isSynthwave && 'neon-glow')}
                    style={{
                        fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                        fontFamily: 'var(--font-display)',
                        color: 'var(--fg)',
                    }}
                >
                    {isTerminal ? '> Contact' : 'Contact'}
                </h1>
                {isNewspaper && <div className="w-16 h-1 mt-2" style={{ background: 'var(--accent)' }} />}
            </div>

            <div className="flex flex-col md:flex-row gap-8 pb-8">
                {/* Left column: direct links + social links */}
                <div className="md:w-1/3 shrink-0 flex flex-col gap-3">
                    {/* Email + location */}
                    <div
                        className="text-xs font-semibold mb-1 uppercase tracking-wider"
                        style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                    >
                        {isTerminal ? '// Find me at' : 'Find me at'}
                    </div>

                    {directLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className={clsx(
                                    'flex items-center gap-3 text-sm px-3 py-2 border transition-all hover:border-[var(--accent)]',
                                    isWin98 ? 'win-chrome' : 'border-[var(--border)]'
                                )}
                                style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius)', color: 'var(--fg)', fontFamily: 'var(--font-mono)' }}
                            >
                                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>
                                    <Icon size={14} />
                                </span>
                                <span className="truncate text-xs">{link.label}</span>
                            </a>
                        );
                    })}

                    {/* Social links — all 5, wraps on mobile */}
                    <div
                        className="text-xs font-semibold mt-2 mb-1 uppercase tracking-wider"
                        style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                    >
                        {isTerminal ? '// Social' : 'Social'}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    title={link.label}
                                    className={clsx(
                                        'flex items-center gap-1.5 px-2 py-1.5 text-xs border transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]',
                                        isWin98 ? 'win-btn' : 'border-[var(--border)]',
                                        isSynthwave && 'hover:neon-border'
                                    )}
                                    style={{
                                        color: 'var(--fg-muted)',
                                        fontFamily: 'var(--font-mono)',
                                        borderRadius: 'var(--radius)',
                                    }}
                                >
                                    <Icon size={13} />
                                    <span className="hidden sm:inline">{link.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Form column */}
                <div
                    className={clsx('flex-1', isWin98 && 'win-chrome')}
                    style={{ borderRadius: 'var(--radius)' }}
                >
                    {isWin98 && (
                        <div className="win-titlebar">
                            <span>New Message</span>
                            <div className="win-titlebar-dots">
                                <span className="win-btn">_</span>
                                <span className="win-btn">□</span>
                                <span className="win-btn">×</span>
                            </div>
                        </div>
                    )}
                    <div
                        className="p-4"
                        style={{ background: isWin98 ? 'var(--card-bg)' : 'transparent' }}
                    >
                        {isTerminal && (
                            <div className="text-xs mb-3" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
                                <span style={{ color: 'var(--accent)' }}>visitor@portfolio:~$</span> compose_message
                            </div>
                        )}
                        {formContent}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
