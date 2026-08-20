import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { company } from "@/lib/site-config";

export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  /** "dark" for use on a dark/teal section background, "light" (default) for the white header/footer. */
  variant?: "light" | "dark";
}) {
  const textColor = variant === "dark" ? "text-white" : "text-black";

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 shrink-0",
        className
      )}
    >
      <Image
        src="/nav-logo.jpeg"
        alt="Project Noah Pte Ltd"
        width={520}
        height={520}
        priority
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
      />
      <span className="flex flex-col leading-none">
        <span className={cn("text-sm font-extrabold tracking-tight whitespace-nowrap sm:text-base lg:text-lg", textColor)}>
          PROJECT NOAH
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.25em] text-primary">
          <span className="h-px w-3 bg-primary" />
          <span className={textColor}>  PTE LTD</span>
          <span className="h-px w-3 bg-primary" />
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] font-medium tracking-wide whitespace-nowrap",
            variant === "dark" ? "text-white/70" : "text-muted-foreground"
          )}
        >
          UEN {company.uen}
        </span>
      </span>
    </Link>
  );
}
