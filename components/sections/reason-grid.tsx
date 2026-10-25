import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";

type Reason = {
  title: string;
  description: string;
};

type ReasonGridProps = {
  title: string;
  items: readonly Reason[];
};

export function ReasonGrid({ title, items }: ReasonGridProps) {
  return (
    <Section>
      <FadeIn>
        <SectionHeader title={title} />
        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.04}>
              <article className="border-t border-border pt-6">
                <h3 className="font-heading text-xl font-medium text-foreground md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
