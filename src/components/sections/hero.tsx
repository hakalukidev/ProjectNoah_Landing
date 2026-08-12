"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BlurFade } from "@/components/ui/blur-fade";
import { siteConfig } from "@/lib/site-config";

const HERO_CLIP_STROKE = "polygon(0 0, 68.6% 0, 54.6% 100%, 0 100%)";

export function Hero() {
  return (
    <section id="home" className="relative flex flex-col bg-ink">
      <div className="relative min-h-svh w-full overflow-hidden">
        {/* Dark panel, revealed to the right of the diagonal cut on large screens */}
        <div className="absolute inset-0 hidden bg-linear-to-br from-ink to-[oklch(0.1_0.015_25)] lg:block">
          <DotPattern
            width={28}
            height={28}
            className="text-white/[0.07] [mask-image:linear-gradient(to_left,black,transparent_65%)]"
          />
        </div>

        {/* Thin brand-colored seam along the diagonal edge */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-brand lg:block"
          style={{ clipPath: HERO_CLIP_STROKE }}
        />

        {/* Image, clipped into a diagonal panel on large screens */}
        <div className="absolute inset-0 lg:[clip-path:polygon(0_0,68%_0,54%_100%,0_100%)]">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=2400&q=80&auto=format&fit=crop"
            alt="Construction professionals reviewing plans at a Singapore building site during golden hour"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/30" />
          <div className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/35 to-transparent lg:from-transparent lg:via-transparent lg:to-ink/95" />
        </div>

        <div className="relative z-10 flex min-h-svh items-center">
          <div className="container-px w-full py-28 lg:flex lg:justify-end">
            <div className="lg:max-w-md lg:pl-14">
              <BlurFade duration={0.6}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-brand" />
                  <AnimatedShinyText className="text-xs font-medium tracking-wide text-white/90 sm:text-sm">
                    {siteConfig.yearsOfExcellence}+ Years Building Across Singapore
                  </AnimatedShinyText>
                </div>
              </BlurFade>

              <BlurFade duration={0.6} delay={0.1}>
                <span className="block text-sm font-bold uppercase tracking-[0.35em] text-brand">
                  {siteConfig.shortName}
                </span>
                <h1 className="mt-3 max-w-xl text-balance text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-[2.85rem]">
                  Your Trusted Partner in Building{" "}
                  <span className="text-brand">World-Class Finishes</span>
                </h1>
              </BlurFade>

              <BlurFade duration={0.6} delay={0.2}>
                <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-white/80">
                  Noah Construction plans, designs and builds commercial,
                  residential and roofing projects across Singapore —
                  delivered with licensed expertise, premium materials and a
                  crew that shows up on time.
                </p>
              </BlurFade>

              <BlurFade duration={0.6} delay={0.3}>
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-4 rounded-full bg-brand py-1.5 pl-7 pr-1.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-dark"
                  >
                    Get Free Quote
                    <span className="flex size-10 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                      <ArrowRight className="size-4" />
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    View Our Projects
                  </button>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="stripe-divider absolute inset-x-0 bottom-0 z-10 h-2.5"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 z-20 h-14 w-14 rounded-tr-[100%] bg-background sm:h-20 sm:w-20"
        />
      </div>
    </section>
  );
}
