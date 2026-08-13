import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className="scroll-mt-30 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            Our Services
          </Badge>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            From Groundbreaking to Handover
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Six service lines, all delivered by the same accountable team,
            spanning our registered principal and secondary business
            activities.
          </p>
        </div>

        {/* Rows tile cleanly at lg (4 cols): [wide,1,1] [wide,wide] [1,1,wide] [1,1,wide] */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ image, title, description }, index) => {
            const isWide = [0, 3, 4, 7, 10].includes(index);
            const imageOnRight = index % 2 !== 0;
            const number = String(index + 1).padStart(2, "0");

            if (isWide) {
              return (
                <div
                  key={title}
                  className={`group/service flex overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 ${
                    imageOnRight ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="relative w-2/5 shrink-0 self-stretch sm:w-1/2">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-contain p-4 transition-transform duration-300 mask-[radial-gradient(ellipse_75%_75%_at_50%_50%,black_55%,transparent_100%)] group-hover/service:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-center gap-2 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-foreground">
                        {title}
                      </h3>
                      <span className="shrink-0 font-heading text-3xl font-extrabold text-primary/30">
                        {number}
                      </span>
                    </div>
                    <p className="text-justify text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={title}
                className="group/service flex flex-col overflow-hidden border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-2/1 w-full">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4 transition-transform duration-300 group-hover/service:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1.5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-foreground">
                      {title}
                    </h3>
                    <span className="shrink-0 font-heading text-3xl font-extrabold text-primary/30">
                      {number}
                    </span>
                  </div>
                  <p className="text-justify text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
