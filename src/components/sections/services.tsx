import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { services } from "@/lib/site-config";
import { iconMap } from "@/lib/icon-map";

export function Services() {
  return (
    <section id="services" className="section-py bg-surface-muted">
      <div className="container-px">
        <BlurFade inView inViewMargin="-100px" className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            What We Do
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-ink sm:text-4xl">
            Services Built Around Your Project
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground">
            From first blueprint to final coat of paint, our in-house teams
            cover every discipline your build needs.
          </p>
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <BlurFade
                key={service.id}
                inView
                inViewMargin="-80px"
                delay={(i % 3) * 0.08}
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-7 ring-1 ring-border transition-shadow hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-5xl font-extrabold text-brand/10 transition-colors group-hover:text-brand/15">
                      {service.number}
                    </span>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition-colors group-hover:text-brand"
                  >
                    Service Details
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
                  />
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
