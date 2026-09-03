import { company, WORK_CATEGORIES, SERVICES } from "@/lib/site-config";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BlurFade } from "@/components/ui/blur-fade";

/**
 * Left half of the rail: static company credentials in a label-over-value
 * pairing. These are facts, not achievements, so they stay small and quiet -
 * the eye should land on the figures at the right.
 */
const FACTS = [
  {
    label: "Established",
    value: `Since ${company.incorporationDate.slice(0, 4)}`,
  },
  { label: "UEN", value: company.uen },
  { label: "Divisions", value: "Roofing · Steel · Glass" },
];

const STATS = [
  { value: company.yearsInOperation, suffix: "+", label: "Years in Operation" },
  { value: SERVICES.length, suffix: "", label: "Service Lines" },
  {
    value: WORK_CATEGORIES.length - 1,
    suffix: "",
    label: "Work Categories Delivered",
  },
  { value: 100, suffix: "%", label: "Singapore-Registered (ACRA)" },
];

/**
 * Credential rail directly under the hero video: company facts on the left,
 * headline figures on the right, divided by hairline rules the way a spec
 * sheet is. No cards and no shadows - the only decoration is the red rule
 * along the top, which carries the hero's accent colour down into the page.
 *
 * The figures are set in near-black rather than the brand red, so a row of
 * four numbers doesn't shout over the hero's own red CTA; the red is spent on
 * the suffixes and the short accent rule under each figure instead.
 *
 * Every label sits on a single line (`whitespace-nowrap`), which is what
 * drives the breakpoints: the longest label is ~175px, so four of them only
 * fit side by side once the group has the full width of a laptop screen.
 * Hence 1 column on a phone, 2 from `sm`, 4 from `lg`, and the two groups
 * only sit shoulder to shoulder from `xl` - where the 1152px container has
 * roughly 60px to spare. Shortening a label buys back room; lengthening one
 * spends it.
 *
 * In the two-column layout the odd-numbered columns start a row, so they
 * drop their left rule (a divider at the start of a row is just a stray
 * line); the four-column layout puts it back on everything but the first.
 *
 * Columns are auto-width rather than equal fractions: with equal columns the
 * widest value ("Roofing · Steel · Glass") filled its cell almost to the
 * dividers while the short ones sat in a sea of space. Sizing each column to
 * its own content means every one keeps the same 20px gutter on both sides,
 * and it also buys back the width the four figures need to sit on one row.
 *
 * Padding stays symmetric so the centred text is actually centred in its box;
 * the negative margin on each group pulls the outer edges back onto the page
 * gutter that the hero and every section below it use.
 */
export function Stats() {
  return (
    <section className="relative border-b border-zinc-200/90 bg-[linear-gradient(105deg,#ffffff_0%,#f8f8f9_50%,#f1f1f3_100%)]">
      {/* Brand hairline along the top edge, fading out to the right so it
          reads as an accent rather than a full-width border. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,#ad1111_0%,rgba(173,17,17,0.35)_38%,rgba(173,17,17,0)_78%)]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-7 px-10 py-8 lg:px-16 xl:flex-row xl:items-center xl:justify-between xl:gap-x-8">
        {/* Company facts */}
        <dl className="grid grid-cols-1 justify-center gap-y-6 text-center sm:-mx-5 sm:grid-cols-[repeat(3,auto)]">
          {FACTS.map((fact) => (
            <div
              key={fact.label}
              className="sm:border-l sm:border-zinc-300/70 sm:px-5 sm:first:border-l-0"
            >
              <dt className="text-[9px] font-semibold uppercase leading-none tracking-[0.18em] whitespace-nowrap text-zinc-500">
                {fact.label}
              </dt>
              <dd className="mt-2 text-[13px] font-bold leading-snug tracking-tight whitespace-nowrap text-zinc-900">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Headline figures. Plain markup rather than a <dl> here: the
            figure has to sit above its label visually, and a description
            list would need the <dt> first in the DOM to stay valid. */}
        <div className="grid grid-cols-1 justify-center gap-y-7 border-t border-zinc-200 pt-7 text-center sm:-mx-5 sm:grid-cols-[repeat(2,auto)] lg:grid-cols-[repeat(4,auto)] xl:border-t-0 xl:pt-0">
          {STATS.map((stat, index) => (
            <BlurFade
              key={stat.label}
              inView
              direction="up"
              delay={index * 0.08}
              className="sm:border-l sm:border-zinc-300/70 sm:px-5 sm:[&:nth-child(odd)]:border-l-0 lg:[&:nth-child(odd)]:border-l lg:first:border-l-0"
            >
              <div className="flex items-start justify-center leading-none text-zinc-900">
                <NumberTicker
                  value={stat.value}
                  startValue={Math.max(
                    0,
                    stat.value - Math.ceil(stat.value * 0.6),
                  )}
                  className="text-[1.75rem] font-extrabold tracking-tight text-zinc-900 tabular-nums sm:text-[2rem] dark:text-zinc-900"
                />
                {/* Suffixes stay small and red - they qualify the figure, so
                    they shouldn't compete with it for size. */}
                {stat.suffix ? (
                  <span className="mt-0.5 ml-0.5 text-[11px] font-bold text-[#ad1111] sm:text-xs">
                    {stat.suffix}
                  </span>
                ) : null}
              </div>
              <div aria-hidden className="mx-auto mt-3 h-0.5 w-6 bg-[#ad1111]" />
              <p className="mt-2.5 text-[9px] font-semibold uppercase leading-none tracking-[0.14em] whitespace-nowrap text-zinc-500">
                {stat.label}
              </p>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
