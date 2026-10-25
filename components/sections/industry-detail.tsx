import { FadeIn } from "@/components/motion/fade-in";

type IndustryDetailProps = {
  id: string;
  title: string;
  introduction: string;
  body?: string | null;
  solutionsTitle: string;
  solutions: readonly string[];
  outcomesTitle: string;
  outcomes: readonly string[];
};

export function IndustryDetail({
  id,
  title,
  introduction,
  body,
  solutionsTitle,
  solutions,
  outcomesTitle,
  outcomes,
}: IndustryDetailProps) {
  return (
    <FadeIn>
      <article
        id={id}
        className="scroll-mt-28 border-t border-border py-12 md:py-16"
      >
        <h2 className="font-heading text-2xl font-medium text-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {introduction}
        </p>
        {body ? (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {body}
          </p>
        ) : null}

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {solutionsTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {solutions.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-foreground md:text-base"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {outcomesTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {outcomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-foreground md:text-base"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}
