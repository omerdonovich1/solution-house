# Solution House — Landing Page

A high-end, motion-driven landing page built with **Next.js (App Router)**, **Tailwind CSS**, and **Framer Motion**. Monochrome aesthetic with a single high-impact lime accent, bold display typography, and purpose-driven entrance + hover animations. Fully responsive and RTL (Hebrew).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Framer Motion 11
- `next/font` (Heebo · Frank Ruhl Libre · JetBrains Mono)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm start       # serve the production build
```

## Project structure

```
app/
  layout.tsx          # fonts, RTL, metadata
  page.tsx            # composes the sections
  globals.css         # Tailwind + design tokens (grain, shell, kicker)
  api/contact/route.ts# contact form backend (stub — see below)
components/
  Navbar.tsx          # sticky nav + live IL clock + mobile menu
  motion/Reveal.tsx   # scroll-reveal wrapper + staggered items
  sections/           # Hero, Approach, HowItWorks, Team, Value, Contact, CTA, Footer
lib/
  motion.ts           # shared Framer Motion variants & easing
tailwind.config.ts    # color tokens + keyframes
```

## Before going live

1. **Contact details** — replace the placeholders in
   `components/sections/Contact.tsx` and `components/sections/CTA.tsx`:
   - `WHATSAPP` (`972500000000`)
   - `PHONE` (`+972500000000`)
   - `EMAIL` (`hello@solution.house`)
2. **Contact backend** — `app/api/contact/route.ts` currently validates and
   logs the lead. Wire it to email / DB / Slack at the marked `INTEGRATION
   POINT` (Resend, Supabase, a webhook, etc.).

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel
   auto-detects Next.js, no config needed.
3. Add any environment variables your integration needs (e.g.
   `RESEND_API_KEY`) in the Vercel dashboard, and deploy.

## Notes

- All copy is preserved verbatim from the original Solution House content.
- Animations respect `prefers-reduced-motion`.
