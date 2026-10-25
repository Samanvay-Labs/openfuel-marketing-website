import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { IndustryDetail } from "@/components/sections/industry-detail";
import { ClosingCTA } from "@/components/sections/closing-cta";
import { industriesContent } from "@/content/industries";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: industriesContent.seo.title,
  description: industriesContent.seo.description,
  path: "/industries",
});

export default function IndustriesPage() {
  const { overview, industries, perspective, philosophy } = industriesContent;

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-24">
          <FadeIn className="max-w-3xl">
            <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              {overview.title}
            </h1>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-6 space-y-2">
              {overview.goals.map((goal) => (
                <li
                  key={goal}
                  className="text-base font-medium text-foreground md:text-lg"
                >
                  {goal}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {overview.closing}
            </p>
          </FadeIn>
        </Container>
      </section>

      <Container>
        {industries.map((industry) => (
          <IndustryDetail key={industry.id} {...industry} />
        ))}
      </Container>

      <Section surface>
        <FadeIn className="prose-width mx-auto text-center">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {perspective.title}
          </h2>
          <div className="mt-8 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {perspective.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn className="prose-width mx-auto text-center">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {philosophy.title}
          </h2>
          <div className="mt-8 space-y-2">
            {philosophy.lines.map((line) => (
              <p
                key={line}
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {line}
              </p>
            ))}
          </div>
        </FadeIn>
      </Section>

      <ClosingCTA
        title="Let's Build Smarter Systems Together."
        body="Whether you're modernizing legacy software, exploring AI, or scaling digital operations, we'd love to understand your challenges and discuss what's possible."
        primaryCta={{ label: "Schedule a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
