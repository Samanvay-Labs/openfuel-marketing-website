import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ClosingCTA } from "@/components/sections/closing-cta";
import { methodologyContent } from "@/content/methodology";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: methodologyContent.seo.title,
  description: methodologyContent.seo.description,
  path: "/methodology",
});

export default function MethodologyPage() {
  const {
    quote,
    philosophy,
    framework,
    phases,
    principles,
    successMetrics,
    closing,
  } = methodologyContent;

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-24">
          <FadeIn className="max-w-3xl">
            <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              Engineering Methodology
            </h1>
            <p className="mt-8 font-heading text-xl leading-snug text-foreground md:text-2xl">
              {quote}
            </p>
          </FadeIn>
        </Container>
      </section>

      <Section>
        <FadeIn className="prose-width">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {philosophy.title}
          </h2>
          <div className="mt-8 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {philosophy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section surface>
        <FadeIn>
          <SectionHeader
            title={framework.title}
            description={framework.paragraphs.join(" ")}
          />
          <ol className="space-y-0">
            {phases.map((phase, index) => {
              const isLast = index === phases.length - 1;
              return (
                <li key={phase.number} className="relative flex gap-5 md:gap-8">
                  <div className="flex flex-col items-center">
                    <div
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background font-heading text-sm font-medium text-primary"
                      aria-hidden
                    >
                      {phase.number}
                    </div>
                    {!isLast ? (
                      <div className="my-1 w-px flex-1 bg-border" aria-hidden />
                    ) : null}
                  </div>
                  <article className={cn("pb-12 md:pb-16", isLast && "pb-0")}>
                    <p className="pt-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Phase {phase.number}
                    </p>
                    <h3 className="mt-1 font-heading text-2xl font-medium text-foreground md:text-3xl">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-base font-medium text-foreground">
                      {phase.subtitle}
                    </p>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {phase.body}
                    </p>
                    {phase.includesLabel ? (
                      <p className="mt-4 text-sm font-medium text-foreground">
                        {phase.includesLabel}
                      </p>
                    ) : null}
                    <ul className="mt-3 space-y-2">
                      {phase.includes.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm text-muted-foreground md:text-base"
                        >
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-accent"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {phase.note ? (
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground">
                        {phase.note}
                      </p>
                    ) : null}
                    {phase.deliverablesTitle && phase.deliverables.length > 0 ? (
                      <div className="mt-6">
                        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                          {phase.deliverablesTitle}
                        </p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {phase.deliverables.map((item) => (
                            <li
                              key={item}
                              className="rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn>
          <SectionHeader title={principles.title} />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {principles.items.map((item) => (
              <article key={item.title} className="border-t border-border pt-5">
                <h3 className="font-heading text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section surface>
        <FadeIn className="max-w-3xl">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {successMetrics.title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {successMetrics.introduction}
          </p>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            {successMetrics.body}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {successMetrics.metrics.map((metric) => (
              <li
                key={metric}
                className="rounded-lg border border-border bg-background px-5 py-4 text-sm font-medium text-foreground"
              >
                {metric}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base leading-relaxed text-foreground md:text-lg">
            {successMetrics.closing}
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn className="prose-width mx-auto text-center">
          <p className="font-heading text-xl leading-relaxed text-foreground md:text-2xl">
            {closing}
          </p>
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
