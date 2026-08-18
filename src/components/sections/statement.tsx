import type { ReactNode } from "react";

import { NumberTicker } from "@/components/ui/number-ticker";
import { TextReveal } from "@/components/ui/text-reveal";
import { company } from "@/lib/site-config";

/** A number that ticks up as its own reveal "word", replaying on window focus. */
function TickerWord({ value, suffix }: { value: number; suffix: string }) {
  return (
    <span className="inline-flex items-baseline">
      <NumberTicker
        value={value}
        restartOnWindowFocus
        className="text-inherit dark:text-inherit"
      />
      <span>{suffix}</span>
    </span>
  );
}

export function Statement() {
  const incorporationYear = Number(company.incorporationDate.slice(0, 4));

  const words: ReactNode[] = [
    "Since",
    <TickerWord key="year" value={incorporationYear} suffix="," />,
    "we",
    "plan",
    "with",
    "precision,",
    "build",
    "with",
    "accountability,",
    "and",
    "deliver",
    "on",
    "schedule.",
    <TickerWord key="years" value={company.yearsInOperation} suffix="+" />,
    "years,",
    "one",
    "entity,",
    "one",
    "standard.",
  ];

  return (
    <section className="bg-white">
      <TextReveal>{words}</TextReveal>
    </section>
  );
}
