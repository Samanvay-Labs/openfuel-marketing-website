import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";

type EngagementStepsProps = {
  title: string;
  steps: readonly { title: string }[];
};

export function EngagementSteps({ title, steps }: EngagementStepsProps) {
  return (
    <Section surface>
      <FadeIn>
        <SectionHeader title={title} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-lg border border-border bg-background p-5"
            >
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Step {index + 1}
              </p>
              <p className="mt-2 font-heading text-lg font-medium text-foreground">
                {step.title}
              </p>
            </li>
          ))}
        </ol>
      </FadeIn>
    </Section>
  );
}
