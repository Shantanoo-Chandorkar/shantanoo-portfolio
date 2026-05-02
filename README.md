# Shantanoo Chandorkar - Portfolio

**Author:** Shantanoo Chandorkar

---

Personal portfolio built with Next.js 16, TypeScript, and Tailwind CSS v4. Showcases projects, work experience, and tech skills through a multi-section single-page layout with four distinct visual themes.

## What It Offers

- **Hero** - name, tagline, bio, CTAs to projects and contact
- **Experience** - timeline of professional roles with slider view
- **Projects** - 7 projects with descriptions, features, tech stack, GitHub/live links
- **Tech Stack** - compact 4-group view and full 11-category breakdown
- **Contact** - email, location, social links (GitHub, LinkedIn, LeetCode, HackerRank, GeeksForGeeks), and a contact form powered by Resend

## Theme System

4 themes selectable via navbar dropdown:

- **Terminal** - green-on-black, pixel font aesthetic
- **Synthwave** - neon pink and cyan on dark purple
- **Win98** - Windows 95 visual style
- **Newspaper** - serif print style on warm off-white

## Interactions

- Keyboard arrow navigation for sliders
- Touch swipe support for sliders
- Smooth section transitions (fade + scale)
- Fixed resume download button

## Tech Stack

- Next.js 16.2.4 (App Router)
- TypeScript
- Tailwind CSS v4 (CSS-first, no config file)
- react-icons, clsx, class-variance-authority
- Resend (contact form email delivery)
- In-memory IP rate limiting (5 req/min) on contact API

## Local Development

```bash
npm install
# create .env.local and set the required environment variables (see below)
npm run dev
```

Open http://localhost:3000

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | Yes | Resend API key for contact form email |
| `CONTACT_EMAIL` | Yes | Email address that receives contact form submissions |
| `RESEND_FROM_EMAIL` | No | Sender address (defaults to `onboarding@resend.dev`) |
