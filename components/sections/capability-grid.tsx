import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";

type Capability = {
  title: string;
  description: string;
};

type CapabilityGridProps = {
  title: string;
  introduction?: string;
  items: readonly Capability[];
  surface?: boolean;
};

export function CapabilityGrid({
  title,
  introduction,
  items,
  surface = false,
}: CapabilityGridProps) {
  return (
    <Section surface={surface}>
      <FadeIn>
        <SectionHeader title={title} description={introduction} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.05}>
              <article className="h-full rounded-lg border border-border bg-background p-6 md:p-7">
                <h3 className="font-heading text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
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
