import { cn } from "@/lib/utils";

import { Container } from "./container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  surface?: boolean;
  as?: "section" | "div";
};

export function Section({
  children,
  className,
  containerClassName,
  id,
  surface = false,
  as: Comp = "section",
}: SectionProps) {
  return (
    <Comp
      id={id}
      className={cn("section-space", surface && "bg-surface", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </Comp>
  );
}
