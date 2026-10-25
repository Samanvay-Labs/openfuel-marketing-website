import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "horizontal" | "mark";
};

export function Logo({
  className,
  priority = false,
  variant = "horizontal",
}: LogoProps) {
  if (variant === "mark") {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center focus-ring rounded-md", className)}
        aria-label="Samanvay Labs home"
      >
        <Image
          src="/brand/logo-mark-blue.png"
          alt="Samanvay Labs"
          width={56}
          height={56}
          className="h-12 w-12 object-contain md:h-14 md:w-14"
          priority={priority}
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center focus-ring rounded-md", className)}
      aria-label="Samanvay Labs home"
    >
      <Image
        src="/brand/logo-horizontal-blue.png"
        alt="Samanvay Labs"
        width={280}
        height={74}
        className="h-9 w-auto object-contain md:h-10"
        priority={priority}
      />
    </Link>
  );
}
