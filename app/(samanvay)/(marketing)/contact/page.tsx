import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/sections/contact-form";
import { EngagementSteps } from "@/components/sections/engagement-steps";
import { FAQ } from "@/components/sections/faq";
import { contactContent } from "@/content/contact";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: contactContent.seo.title,
  description: contactContent.seo.description,
  path: "/contact",
});

export default function ContactPage() {
  const { hero, discuss, discovery, engagement, faq, cta, footerNote, form } =
    contactContent;

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-24">
          <FadeIn className="max-w-3xl">
            <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <FadeIn>
            <h2 className="font-heading text-2xl font-medium md:text-3xl">
              {discuss.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {discuss.introduction}
            </p>
            <ul className="mt-6 space-y-2.5">
              {discuss.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex gap-3 text-sm text-foreground md:text-base"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-accent"
                    aria-hidden
                  />
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <h2 className="font-heading text-2xl font-medium md:text-3xl">
                {discovery.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {discovery.introduction}
              </p>
              <ul className="mt-6 space-y-2">
                {discovery.items.map((item) => (
                  <li
                    key={item}
                    className="text-base font-medium text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {discovery.closing}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-lg border border-border bg-background p-6 md:p-8">
              <h2 className="font-heading text-2xl font-medium text-foreground">
                {form.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {cta.title} {cta.body}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      <EngagementSteps title={engagement.title} steps={engagement.steps} />

      <FAQ title={faq.title} items={faq.items} />

      <Section surface>
        <FadeIn className="prose-width mx-auto text-center">
          <div className="space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {footerNote.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
