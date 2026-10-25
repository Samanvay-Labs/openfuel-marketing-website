# openfuel-marketing-website

Marketing site for **OpenFuel**, a Samanvay Labs project. Developers earn AI credits for pull requests merged into open-source projects.

Built with Next.js 14 (App Router) and TypeScript. No analytics or trackers. Fonts (Inter, JetBrains Mono) are self-hosted at build time via `next/font`.

## Setup

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

## Structure

- `content.ts`: all site copy. Edit text here. Items marked `TODO` / `TBD` are placeholders.
- `app/page.tsx`: landing page sections.
- `app/docs/page.tsx`: docs placeholder.
- `app/layout.tsx`: navbar, footer, metadata, fonts.
- `app/globals.css`: all styles (black and white, two grays, dark default).
- `app/icon.svg`: favicon.
- `components/`: theme toggle and scroll fade-in.
