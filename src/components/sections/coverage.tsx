import Image from "next/image";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { coverageAreas, siteConfig } from "@/lib/site-config";

export function Coverage() {
  return (
    <section id="coverage" className="section-py bg-white">
      <div className="container-px">
        <BlurFade
          inView
          inViewMargin="-100px"
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Where We Work
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-ink sm:text-4xl">
            Coverage Across Singapore
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground">
            One head office at Tuas, with crews dispatched island-wide for
            every type of build.
          </p>
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {coverageAreas.map((area, i) => (
            <BlurFade
              key={area.id}
              inView
              inViewMargin="-80px"
              delay={i * 0.1}
            >
              <div className="group relative aspect-4/3 overflow-hidden rounded-2xl sm:aspect-square lg:aspect-4/3">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/10" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-lg">
                    <MapPin className="size-4 text-brand" />
                    <span className="text-sm font-semibold text-ink">
                      {area.title}
                    </span>
                  </div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
                    {area.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={siteConfig.phoneHref}
                      className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <Phone className="size-3.5 text-brand" />
                      {siteConfig.phone}
                    </a>
                    <a
                      href={siteConfig.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <MessageCircle className="size-3.5 text-brand" />
                      {siteConfig.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
