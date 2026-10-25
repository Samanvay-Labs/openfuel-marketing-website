import { CapabilityGrid } from "@/components/sections/capability-grid";
import { ClosingCTA } from "@/components/sections/closing-cta";
import { Hero } from "@/components/sections/hero";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { PhilosophyBlock } from "@/components/sections/philosophy-block";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ReasonGrid } from "@/components/sections/reason-grid";
import { TrustStatement } from "@/components/sections/trust-statement";
import { homeContent } from "@/content/home";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: homeContent.seo.title,
  description: homeContent.seo.description,
  path: "/",
});

export default function HomePage() {
  const { hero, trust, whatWeBuild, whyChoose, process, industries, philosophy, closing } =
    homeContent;

  return (
    <>
      <Hero
        headline={hero.headline}
        supporting={hero.supporting}
        primaryCta={hero.primaryCta}
        secondaryCta={hero.secondaryCta}
      />
      <TrustStatement lines={trust.lines} paragraphs={trust.paragraphs} />
      <CapabilityGrid
        title={whatWeBuild.title}
        introduction={whatWeBuild.introduction}
        items={whatWeBuild.items}
        surface
      />
      <ReasonGrid title={whyChoose.title} items={whyChoose.items} />
      <ProcessTimeline
        title={process.title}
        steps={process.steps}
        surface
      />
      <IndustryGrid
        title={industries.title}
        introduction={industries.introduction}
        items={industries.items}
      />
      <PhilosophyBlock
        title={philosophy.title}
        paragraphs={philosophy.paragraphs}
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
