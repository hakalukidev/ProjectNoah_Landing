import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className="scroll-mt-30 bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="rounded-none border-red-600/30 px-3 py-1 text-sm font-extrabold uppercase tracking-[0.2em] text-red-600"
          >
            Our Services
          </Badge>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            From Groundbreaking to Handover
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Eleven service lines across three practice areas, all delivered
            by the same accountable team.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-16">
          {SERVICE_CATEGORIES.map((category) => {
            const services = SERVICES.filter(
              (service) => service.category === category.slug
            );

            return (
              <div
                key={category.slug}
                id={`services-${category.slug}`}
                className="scroll-mt-30 target:-mx-4 target:rounded-lg target:px-4 target:ring-2 target:ring-primary"
              >
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {category.label}
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service, index) => (
                    <div
                      key={service.slug}
                      className="group/service flex flex-col overflow-hidden border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-2/1 w-full">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-contain p-4 transition-transform duration-300 group-hover/service:scale-105"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-1.5 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-lg font-bold text-foreground">
                            {service.title}
                          </h4>
                          <span className="shrink-0 font-heading text-3xl font-extrabold text-primary/30">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-justify text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
