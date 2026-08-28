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
        src="/logo-icon.png"
        alt="Project Noah Pte Ltd"
        width={260}
        height={255}
        priority
        className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 lg:h-11 lg:w-11"
      />
      <span className="flex flex-col items-center text-center leading-none">
        <span className={cn("text-[9px] font-extrabold tracking-tight whitespace-nowrap sm:text-[10px] lg:text-[11px]", textColor)}>
          PROJECT NOAH
        </span>
        <span className="mt-0.5 flex items-center justify-center gap-1 text-[7px] font-semibold tracking-[0.2em]">
          <span className="h-px w-2 shrink-0 bg-primary" />
          <span className={cn("whitespace-nowrap", textColor)}>PTE LTD</span>
          <span className="h-px w-2 shrink-0 bg-primary" />
        </span>
        <span
          className={cn(
            "mt-0.5 text-[7px] font-medium tracking-wide whitespace-nowrap",
            variant === "dark" ? "text-white/70" : "text-muted-foreground"
          )}
        >
          UEN {company.uen}
        </span>
      </span>
    </Link>
  );
}
