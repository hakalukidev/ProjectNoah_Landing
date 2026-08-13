import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
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
        width={520}
        height={520}
        priority
        className="h-10 w-10 sm:h-11 sm:w-11"
      />
      <span className="flex flex-col leading-none">
        <span className="text-base sm:text-lg font-extrabold tracking-tight text-black">
          PROJECT NOAH
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.25em] text-primary">
          <span className="h-px w-3 bg-primary" />
        <span className="text-black">  PTE LTD</span>
          <span className="h-px w-3 bg-primary" />
        </span>
      </span>
    </Link>
  );
}
