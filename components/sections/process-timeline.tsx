import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description?: string;
  number?: string;
};

type ProcessTimelineProps = {
  title: string;
  steps: readonly Step[];
  surface?: boolean;
  numbered?: boolean;
};

export function ProcessTimeline({
  title,
  steps,
  surface = false,
  numbered = false,
}: ProcessTimelineProps) {
  return (
    <Section surface={surface}>
      <FadeIn>
        <SectionHeader title={title} />
        <ol className="space-y-0">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li key={step.title} className="relative flex gap-5 md:gap-8">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-primary md:size-11",
                      numbered && "font-heading"
                    )}
                    aria-hidden
                  >
                    {numbered && step.number
                      ? step.number
                      : String(index + 1).padStart(2, "0")}
                  </div>
                  {!isLast ? (
                    <div className="my-1 w-px flex-1 bg-border" aria-hidden />
                  ) : null}
                </div>
                <div className={cn("pb-10 md:pb-12", isLast && "pb-0")}>
                  <h3 className="font-heading pt-1.5 text-xl font-medium text-foreground md:pt-2 md:text-2xl">
                    {step.title}
                  </h3>
                  {step.description ? (
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </FadeIn>
    </Section>
  );
}
