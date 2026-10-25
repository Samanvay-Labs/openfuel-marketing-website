import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";

type IndustryGridProps = {
  title: string;
  introduction?: string;
  items: readonly string[];
  href?: string;
};

export function IndustryGrid({
  title,
  introduction,
  items,
  href = "/industries",
}: IndustryGridProps) {
  return (
    <Section>
      <FadeIn>
        <SectionHeader title={title} description={introduction} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={item}>
              <FadeIn delay={index * 0.03}>
                <Link
                  href={href}
                  className="flex h-full items-center rounded-lg border border-border bg-background px-5 py-4 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-surface focus-ring"
                >
                  {item}
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}
