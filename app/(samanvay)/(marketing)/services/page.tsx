import Link from "next/link";

import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { ServiceDetail } from "@/components/sections/service-detail";
import { ClosingCTA } from "@/components/sections/closing-cta";
import { Button } from "@/components/ui/button";
import { servicesContent } from "@/content/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: servicesContent.seo.title,
  description: servicesContent.seo.description,
  path: "/services",
});

export default function ServicesPage() {
  const { overview, services, engagement, promise } = servicesContent;

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
          </FadeIn>
        </Container>
      </section>

      <Container>
        {services.map((service) => (
          <ServiceDetail key={service.id} {...service} />
        ))}
      </Container>

      <Section surface>
        <FadeIn>
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {engagement.title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {engagement.introduction}
          </p>
          <p className="mt-2 text-base text-muted-foreground md:text-lg">
            {engagement.body}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {engagement.models.map((model) => (
              <li
                key={model}
                className="rounded-lg border border-border bg-background px-5 py-4 text-sm font-medium text-foreground md:text-base"
              >
                {model}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn className="prose-width mx-auto text-center">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {promise.title}
          </h2>
          <div className="mt-8 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {promise.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <Button
              render={<Link href="/contact" />}
              className="h-11 rounded-lg px-5"
            >
              Schedule a Discovery Call
            </Button>
          </div>
        </FadeIn>
      </Section>

      <ClosingCTA
        title="Let's build technology that creates measurable business value."
        body="Start the conversation today."
        primaryCta={{ label: "Schedule a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
