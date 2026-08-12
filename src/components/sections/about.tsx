import { CheckCircle2, MapPinned } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const values = [
  {
    title: "Quality Craftsmanship",
    description: "Premium materials and meticulous finishing on every build.",
  },
  {
    title: "Safety First",
    description: "bizSAFE Level 3 certified crews and rigorous site protocols.",
  },
  {
    title: "On-Time Delivery",
    description: "Realistic timelines, tracked weekly, communicated clearly.",
  },
  {
    title: "Client-Centered",
    description: "One point of contact from consultation through handover.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white section-py">
      <div
        aria-hidden
        className="absolute -top-24 -left-24 -z-10 size-80 rounded-full bg-brand/5"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 right-0 -z-10 size-96 rounded-full bg-surface-muted"
      />
      <div className="container-px grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
        <BlurFade inView inViewMargin="-100px">
          <div className="lg:sticky lg:top-28">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-brand">
              <MapPinned className="size-6" />
            </span>
            <span className="mt-5 block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Our Value
            </span>
            <h2 className="mt-3 text-balance text-3xl font-semibold text-ink sm:text-4xl">
              A Partner Invested in Every Build
            </h2>
          </div>
        </BlurFade>

        <BlurFade inView inViewMargin="-100px" delay={0.1}>
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Founded in {siteConfig.founded}, Noah Construction has grown
              from a small roofing outfit into a full-service design-and-build
              contractor trusted across Singapore. We plan every stage of the
              journey — permits, engineering, materials and manpower — so our
              clients get a single, accountable team from first sketch to
              final handover.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Whatever the scale, our approach stays the same: transparent
              pricing, licensed craftsmen and a site that&rsquo;s left as tidy
              as we found it.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {value.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                render={<a href="#services" />}
                nativeButton={false}
                variant="outline"
                size="lg"
                className="rounded-full border-brand/40 px-8 text-brand hover:bg-brand/5 hover:text-brand-dark"
              >
                Our Services
              </Button>
              <Button
                render={<a href="#contact" />}
                nativeButton={false}
                size="lg"
                className="rounded-full bg-brand px-8 text-brand-foreground hover:bg-brand-dark"
              >
                Talk to Our Team
              </Button>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
