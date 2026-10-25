import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

type ClosingCTAProps = {
  statement?: readonly string[];
  title: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function ClosingCTA({
  statement,
  title,
  body,
  primaryCta,
  secondaryCta,
}: ClosingCTAProps) {
  return (
    <Section>
      <FadeIn className="mx-auto max-w-3xl text-center">
        {statement ? (
          <div className="mb-10 space-y-2">
            {statement.map((line) => (
              <p
                key={line}
                className="font-heading text-xl font-medium text-foreground md:text-2xl"
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}
        <h2 className="font-heading text-3xl font-medium leading-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {body}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <Button
            render={<Link href={primaryCta.href} />}
            className="h-11 rounded-lg px-5 text-sm"
          >
            {primaryCta.label}
          </Button>
          {secondaryCta ? (
            <Button
              variant="outline"
              render={<Link href={secondaryCta.href} />}
              className="h-11 rounded-lg px-5 text-sm"
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
      </FadeIn>
    </Section>
  );
}
