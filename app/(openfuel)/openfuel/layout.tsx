import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./openfuel.css";
import { site, nav, footer } from "@/content/openfuel";
import ThemeToggle from "@/components/ThemeToggle";
import Reveal from "@/components/Reveal";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark light" };

// Runs before paint to avoid a theme flash.
const themeScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  ) : (
    <Link href={href}>{children}</Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <header className="nav">
          <div className="wrap nav-inner">
            <Link href="/openfuel" className="wordmark" aria-label="OpenFuel home">{nav.wordmark}</Link>
            <nav aria-label="Primary">
              <ul className="nav-links">
                {nav.links.map((l) => (
                  <li key={l.label}><A href={l.href}>{l.label}</A></li>
                ))}
              </ul>
            </nav>
            <div className="nav-actions">
              <ThemeToggle label={nav.themeToggle} />
              <button type="button" className="btn" disabled aria-disabled="true">{nav.cta}</button>
            </div>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="wrap footer-inner">
            <div>
              <p className="wordmark">{footer.wordmark}</p>
              <p className="muted">{footer.tagline}</p>
            </div>
            <nav aria-label="Footer">
              <ul className="footer-links">
                {footer.links.map((l) => (
                  <li key={l.label}><A href={l.href}>{l.label}</A></li>
                ))}
              </ul>
            </nav>
            <p className="muted mono small">{footer.copyright}</p>
          </div>
        </footer>
        <Reveal />
      </body>
    </html>
  );
}
