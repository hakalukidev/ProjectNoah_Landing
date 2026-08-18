import {
  company,
  PROJECT_CATEGORIES,
  SERVICES,
} from "@/lib/site-config";
import { NumberTicker } from "@/components/ui/number-ticker";

const STATS = [
  { value: company.yearsInOperation, suffix: "+", label: "Years in Operation" },
  { value: SERVICES.length, suffix: "", label: "Service Lines" },
  {
    value: PROJECT_CATEGORIES.length - 1,
    suffix: "",
    label: "Project Categories Delivered",
  },
  { value: 100, suffix: "%", label: "Singapore-Registered (ACRA)" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-white py-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-10 lg:grid-cols-4 lg:gap-4 lg:px-16">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <div className="flex items-baseline text-4xl font-extrabold text-[#e01f22] sm:text-5xl">
              <NumberTicker
                value={stat.value}
                startValue={Math.max(0, stat.value - Math.ceil(stat.value * 0.6))}
                className="text-[#e01f22] tabular-nums dark:text-[#e01f22]"
              />
              <span>{stat.suffix}</span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
