"use client";

import { MapPin } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/dot-pattern";
import { projects, siteConfig } from "@/lib/site-config";

const pinColor: Record<(typeof projects)[number]["category"], string> = {
  Residential: "bg-brand",
  Commercial: "bg-ink",
  Roofing: "bg-brand-dark",
};

export function Projects() {
  return (
    <section id="projects" className="section-py bg-white">
      <div className="container-px">
        <BlurFade
          inView
          inViewMargin="-100px"
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Our Work
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-ink sm:text-4xl">
            A Portfolio Built on Trust
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground">
            A selection of the residential, commercial and roofing projects
            we&rsquo;ve completed across Singapore.
          </p>
        </BlurFade>

        <BlurFade inView inViewMargin="-80px" delay={0.1} className="mt-14">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-border bg-surface-muted sm:aspect-21/9">
            <DotPattern
              width={22}
              height={22}
              cr={1.4}
              className="text-ink/10"
            />
            <svg
              aria-hidden
              className="absolute inset-0 h-full w-full opacity-[0.15]"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M0 30 Q 30 10, 50 30 T 100 25"
                stroke="var(--ink)"
                strokeWidth="0.4"
                fill="none"
              />
              <path
                d="M0 70 Q 40 55, 55 72 T 100 65"
                stroke="var(--ink)"
                strokeWidth="0.4"
                fill="none"
              />
              <path
                d="M20 0 Q 25 50, 15 100"
                stroke="var(--ink)"
                strokeWidth="0.4"
                fill="none"
              />
              <path
                d="M75 0 Q 65 50, 80 100"
                stroke="var(--ink)"
                strokeWidth="0.4"
                fill="none"
              />
            </svg>

            {/* HQ marker */}
            <div
              className="group absolute z-10 -translate-x-1/2 -translate-y-full"
              style={{ left: "48%", top: "48%" }}
            >
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/40" />
              <span className="flex size-11 items-center justify-center rounded-full border-2 border-white bg-ink text-brand shadow-lg">
                <MapPin className="size-5" />
              </span>
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-48 -translate-x-1/2 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Noah HQ — {siteConfig.address.line1}
              </span>
            </div>

            {projects.map((project) => (
              <div
                key={project.id}
                className="group absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${project.map.x}%`, top: `${project.map.y}%` }}
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-full border-2 border-white text-white shadow-md transition-transform group-hover:scale-110 ${pinColor[project.category]}`}
                >
                  <MapPin className="size-4" />
                </span>
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-44 -translate-x-1/2 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {project.title}
                  <span className="block text-white/60">
                    {project.category}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </BlurFade>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-brand" /> Residential
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-ink" /> Commercial
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-brand-dark" /> Roofing
          </span>
        </div>
      </div>
    </section>
  );
}
