# B Arun Kumar — Portfolio

A personal portfolio for a backend engineer, built with Next.js (App Router) and TypeScript —
clean on the surface, with an animated WebGL layer underneath that visualizes an actual backend
request lifecycle.

**Live:** https://portfolio-arunbalreddys-projects.vercel.app

![Open Graph preview](https://portfolio-arunbalreddys-projects.vercel.app/opengraph-image)

## Features

- **About, Skills, Projects, Resume, Contact** — the standard portfolio sections, each project
  linking to a short case study (`/projects/[slug]`) covering problem → approach → outcome.
- **An actual request-flow visualization**, not just decoration — a `react-three-fiber` scene
  renders a live node graph (Client → Gateway → Service → Cache/Database) with a pulse that
  travels the real path on a timer, on scroll, and whenever you click anything interactive on the
  page. Node labels are DOM elements synced to the 3D camera every frame, not baked into the
  canvas, so they stay crisp at any resolution.
- **A floating terminal** in the hero that types out real snippets from the stack below (NestJS,
  Prisma, Redis).
- **Interaction layer**: a spring-driven custom cursor, Lenis smooth scrolling, scroll-triggered
  reveals, magnetic buttons, and tilt/spotlight cards — all gated behind `(hover: hover)` and
  `prefers-reduced-motion` checks, so touch devices and anyone who's asked for less motion get a
  clean, static experience instead of a degraded one.
- **Full SEO/social pass**: generated favicon and Open Graph/Twitter image, `sitemap.xml`,
  `robots.txt`, Person JSON-LD, canonical URL — all driven by one config file, not hardcoded.

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

The deployed origin (used for the sitemap, canonical URL, and OG image resolution) lives in
[`src/lib/site.ts`](src/lib/site.ts) — override it with a `NEXT_PUBLIC_SITE_URL` env var instead
of editing the file once a custom domain is attached.

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

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis · three.js /
react-three-fiber / drei · lucide-react · Resend · Vercel Analytics
