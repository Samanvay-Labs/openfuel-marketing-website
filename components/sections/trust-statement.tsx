import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";

type TrustStatementProps = {
  lines: readonly string[];
  paragraphs: readonly string[];
};

export function TrustStatement({ lines, paragraphs }: TrustStatementProps) {
  return (
    <Section>
      <FadeIn className="prose-width mx-auto text-center">
        <div className="space-y-3">
          {lines.map((line) => (
            <p
              key={line}
              className="font-heading text-2xl leading-snug font-medium text-foreground md:text-3xl md:leading-snug"
            >
              {line}
            </p>
          ))}
        </div>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
