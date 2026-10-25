import { ContactSection } from "@/components/sections/contact-form";
import { Hero } from "@/components/sections/hero";
import { homeContent } from "@/content/home";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: homeContent.seo.title,
  description: homeContent.seo.description,
  path: "/",
});

// Minimal home: hero + contact form.
export default function HomePage() {
  const { hero } = homeContent;

  return (
    <>
      <Hero
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
      />
      <ContactSection />
    </>
  );
}
