import { AnimatedList } from "@/components/ui/animated-list";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className="scroll-mt-30 bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="rounded-none border-primary/30 px-3 py-1 text-sm font-extrabold uppercase tracking-[0.2em] text-primary"
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

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {SERVICE_CATEGORIES.map((category, index) => {
            const services = SERVICES.filter(
              (service) => service.category === category.slug
            );

            return (
              <div
                key={category.slug}
                id={`services-${category.slug}`}
                className="scroll-mt-30 target:-mx-4 target:rounded-lg target:px-4 target:ring-2 target:ring-primary"
              >
                <BlurFade inView direction="up" delay={index * 0.15}>
                  <h3 className="inline-block rounded-none bg-primary px-4 py-1.5 text-xl font-bold tracking-tight text-primary-foreground">
                    {category.label}
                  </h3>

                  <AnimatedList className="mt-6 items-stretch gap-4" delay={250}>
                    {services.map((service) => (
                      <div
                        key={service.slug}
                        className="group/service flex items-center gap-3"
                      >
                        <span className="shrink-0 font-heading text-2xl font-extrabold text-primary/30">
                          {String(services.indexOf(service) + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-base font-bold text-foreground">
                          {service.title}
                        </h4>
                      </div>
                    ))}
                  </AnimatedList>
                </BlurFade>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
