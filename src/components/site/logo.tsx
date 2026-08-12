import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";
  return (
    <Link
      href="#home"
      className={cn("flex items-center gap-2.5 shrink-0", className)}
      aria-label="Noah Construction — home"
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md text-base font-bold font-heading",
          isLight ? "bg-brand text-brand-foreground" : "bg-ink text-brand",
        )}
      >
        N
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-semibold tracking-wide",
            isLight ? "text-white" : "text-ink",
          )}
        >
          NOAH
        </span>
        <span
          className={cn(
            "text-[10px] font-medium tracking-[0.25em]",
            isLight ? "text-white/60" : "text-muted-foreground",
          )}
        >
          CONSTRUCTION
        </span>
      </span>
    </Link>
  );
}
