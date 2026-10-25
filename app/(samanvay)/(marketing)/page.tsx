import { ClosingCTA } from "@/components/sections/closing-cta";
import { Hero } from "@/components/sections/hero";
import { homeContent } from "@/content/home";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: homeContent.seo.title,
  description: homeContent.seo.description,
  path: "/",
});

// Minimal home: hero + one closing call to action.
export default function HomePage() {
  const { hero, closing } = homeContent;

  return (
    <>
      <Hero
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
      />
      <ClosingCTA
        statement={closing.statement}
        title={closing.ctaTitle}
        body={closing.ctaBody}
        primaryCta={closing.primaryCta}
        secondaryCta={closing.secondaryCta}
      />
    </>
  );
}
