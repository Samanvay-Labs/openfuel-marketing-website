import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type HeroProps = {
  headline: string;
  supporting: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
};

export function Hero({
  headline,
  supporting,
  primaryCta,
  secondaryCta,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-background",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--border) 80%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--border) 80%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 75%)",
        }}
      />
      <Container className="relative py-20 md:py-28 lg:py-32">
        <FadeIn className="max-w-4xl">
          <h1 className="font-heading text-4xl leading-[1.12] font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.08]">
            {headline}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            {supporting}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button nativeButton={false}
              render={<Link href={primaryCta.href} />}
              className="h-11 rounded-lg px-5 text-sm"
            >
              {primaryCta.label}
            </Button>
            {secondaryCta ? (
              <Button nativeButton={false}
                variant="outline"
                render={<Link href={secondaryCta.href} />}
                className="h-11 rounded-lg px-5 text-sm"
              >
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
