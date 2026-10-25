export const siteConfig = {
  name: "Samanvay Labs",
  legalName: "Samanvay Labs",
  tagline: "Engineering clarity through intelligent systems.",
  description:
    "Samanvay Labs engineers intelligent software, enterprise platforms, and AI-powered automation that help organizations improve productivity, simplify operations, and scale with confidence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://samanvaylabs.com",
  email: "hello@samanvaylabs.com",
  copyrightYear: new Date().getFullYear(),
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/openfuel", label: "OpenFuel" },
] as const;

export const footerLinks = {
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
} as const;
