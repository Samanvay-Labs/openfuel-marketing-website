import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";

type PhilosophyBlockProps = {
  title: string;
  paragraphs: readonly string[];
  surface?: boolean;
};

export function PhilosophyBlock({
  title,
  paragraphs,
  surface = true,
}: PhilosophyBlockProps) {
  return (
    <Section surface={surface}>
      <FadeIn className="prose-width mx-auto text-center">
        <h2 className="font-heading text-3xl font-medium leading-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
