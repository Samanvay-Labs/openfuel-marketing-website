# Samanvay Labs website + OpenFuel

One Next.js 16 (App Router) app serving two sites with separate layouts and styles:

| Route | Site |
| --- | --- |
| `/` (and `/home` → `/`) | Samanvay Labs home: hero + contact form (`/#contact`). Also `/privacy`, `/terms` |
| `/openfuel` | OpenFuel marketing page, a Samanvay Labs project |

## Setup

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

Don't run `npm run build` while `npm run dev` is running. Both write to `.next`.

## Structure

- `app/(samanvay)/`: Samanvay Labs root layout, Tailwind + shadcn styles (`globals.css`), pages under `(marketing)/`.
- `app/(openfuel)/openfuel/`: OpenFuel root layout, plain CSS (`openfuel.css`), landing page.
- `content/site.ts`, `content/*.ts`: Samanvay Labs copy.
- `content/openfuel.ts`: OpenFuel copy.
- `components/ui`, `components/layout`, `components/sections`, `components/motion`: Samanvay Labs components.
- `components/DotField.tsx`, `ThemeToggle.tsx`, `Reveal.tsx`: OpenFuel components (hero git-graph animation, theme toggle, scroll fade-in).
- `components/sections/contact-form.tsx` + `lib/contact.ts` + `content/contact.ts`: contact form (name, email, organization, reason, message), validated server-side. Submission is mocked for now (no email is sent).
- `lib/`: SEO helpers and contact form handling.

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL`: canonical site URL

