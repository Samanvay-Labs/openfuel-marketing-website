import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { legalContent } from "@/content/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: legalContent.terms.seo.title,
  description: legalContent.terms.seo.description,
  path: "/terms",
});

export default function TermsPage() {
  const { title, lastUpdated, sections } = legalContent.terms;

  return (
    <section className="border-b border-border">
      <Container className="py-16 md:py-24">
        <FadeIn className="prose-width">
          <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-heading text-2xl font-medium text-foreground">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
