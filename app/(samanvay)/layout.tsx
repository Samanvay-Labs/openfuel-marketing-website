import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { JsonLd, SkipLink } from "@/components/layout/skip-link";
import { siteConfig } from "@/content/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Samanvay Labs | Enterprise AI, Software Engineering & Intelligent Automation",
    template: "%s | Samanvay Labs",
  },
  description: siteConfig.description,
  openGraph: {
    title:
      "Samanvay Labs | Enterprise AI, Software Engineering & Intelligent Automation",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Samanvay Labs | Enterprise AI, Software Engineering & Intelligent Automation",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <SkipLink />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
