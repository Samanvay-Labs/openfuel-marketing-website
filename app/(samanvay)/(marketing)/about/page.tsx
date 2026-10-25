import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { ClosingCTA } from "@/components/sections/closing-cta";
import { aboutContent } from "@/content/about";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: aboutContent.seo.title,
  description: aboutContent.seo.description,
  path: "/about",
});

export default function AboutPage() {
  const {
    hero,
    whyWeExist,
    perspective,
    whatDefines,
    difference,
    clients,
    howWeWork,
    name,
    lookingAhead,
    closing,
  } = aboutContent;

  return (
    <>
      <section className="border-b border-border">
        <Container className="py-16 md:py-24">
          <FadeIn className="max-w-3xl">
            <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
              {hero.title}
            </h1>
            <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {hero.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={
                    paragraph === "Technology should make organizations more effective."
                      ? "font-medium text-foreground"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <Section>
        <FadeIn className="prose-width">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {whyWeExist.title}
          </h2>
          <div className="mt-8 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {whyWeExist.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section surface>
        <FadeIn className="prose-width mx-auto text-center">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {perspective.title}
          </h2>
          <div className="mt-8 space-y-2">
            {perspective.lines.map((line) => (
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

      <Section>
        <FadeIn>
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {whatDefines.title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {whatDefines.introduction}
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {whatDefines.items.map((item) => (
              <article key={item.title} className="border-t border-border pt-6">
                <h3 className="font-heading text-xl font-medium text-foreground md:text-2xl">
                  {item.title}
                </h3>
                <div className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section surface>
        <FadeIn className="prose-width mx-auto text-center">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {difference.title}
          </h2>
          <div className="mt-8 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {difference.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn className="prose-width">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {clients.title}
          </h2>
          <div className="mt-6 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {clients.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            {clients.values.map((value) => (
              <li
                key={value}
                className="text-base font-medium text-foreground md:text-lg"
              >
                {value}
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>

      <Section surface>
        <FadeIn className="prose-width">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {howWeWork.title}
          </h2>
          <div className="mt-6 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {howWeWork.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            {howWeWork.items.map((item) => (
              <li
                key={item}
                className="text-base font-medium text-foreground md:text-lg"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {howWeWork.closing}
          </p>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn className="prose-width">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {name.title}
          </h2>
          <div className="mt-8 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {name.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section surface>
        <FadeIn className="prose-width">
          <h2 className="font-heading text-3xl font-medium md:text-4xl">
            {lookingAhead.title}
          </h2>
          <div className="mt-8 space-y-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {lookingAhead.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </Section>

      <Section>
        <FadeIn className="prose-width mx-auto text-center">
          {closing.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="font-heading text-xl leading-relaxed text-foreground md:text-2xl"
            >
              {paragraph}
            </p>
          ))}
        </FadeIn>
      </Section>

      <ClosingCTA
        title="Let's Build Smarter Systems Together."
        body="Whether you're modernizing legacy software, exploring AI, or scaling digital operations, we'd love to understand your challenges and discuss what's possible."
        primaryCta={{ label: "Start a Conversation", href: "/contact" }}
        secondaryCta={{ label: "View Our Services", href: "/services" }}
      />
    </>
  );
}
