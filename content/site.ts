export const siteConfig = {
  name: "Samanvay Labs",
  legalName: "Samanvay Labs",
  tagline: "Engineering clarity through intelligent systems.",
  description:
    "Samanvay Labs engineers intelligent software, enterprise platforms, and AI-powered automation that help organizations improve productivity, simplify operations, and scale with confidence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://samanvaylabs.com",
  email: "hello@samanvaylabs.com",
  linkedIn: "https://www.linkedin.com/company/samanvay-labs",
  copyrightYear: new Date().getFullYear(),
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/methodology", label: "Methodology" },
  { href: "/openfuel", label: "OpenFuel" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = {
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
} as const;
