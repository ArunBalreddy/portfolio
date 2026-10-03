# Arun Kumar — Portfolio

A personal portfolio site for a backend engineer, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Sections

- **About** — intro, current role, and education
- **Skills** — grouped technical skills
- **Projects** — project cards with tech tags, each linking to a short case study at `/projects/[slug]`
- **Resume** — one-click PDF download
- **Contact** — a form that emails you via [Resend](https://resend.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

All personal content (name, bio, skills, projects, case studies) lives in one place:
[`src/content/profile.ts`](src/content/profile.ts). Edit that file to update the site — no need to touch components.

To replace the resume, drop a new PDF at `public/resume/Arun-Kumar-Resume.pdf` (or update the
path in `profile.ts`).

## Contact form setup

The contact form posts to `src/app/api/contact/route.ts`, which sends email via Resend.

1. Create a free account at [resend.com](https://resend.com) and generate an API key.
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`.
3. (Optional) Set `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` to override the defaults.

Without `RESEND_API_KEY` set, the form will show a friendly error asking visitors to email you
directly — the rest of the site works fine.

When deploying on Vercel, add the same environment variables in
**Project Settings → Environment Variables**.

## Deploying

This project is zero-config on [Vercel](https://vercel.com):

```bash
npm i -g vercel
vercel login
vercel link
vercel env add RESEND_API_KEY
vercel --prod
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) for automatic deploys on
every push.

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · lucide-react · Resend
