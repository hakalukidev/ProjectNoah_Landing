import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/site-config";

type Service = (typeof SERVICES)[number];

function ServiceRow({ service }: { service: Service }) {
  return (
    <Link
      href="/contact"
      className="group/service flex items-center justify-between gap-4 border-b border-border py-4 outline-none transition-colors duration-300 hover:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
    >
      <h4 className="min-w-0 text-base font-bold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover/service:text-primary">
        {service.title}
      </h4>

      <ArrowUpRight
        aria-hidden
        className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover/service:text-primary"
      />
    </Link>
  );
}

type Category = (typeof SERVICE_CATEGORIES)[number];

/** One titled block per practice area. The header dropdown deep-links to
    `#services-<category>`, so the id stays on the block wrapper. */
function CategoryBlock({ category }: { category: Category }) {
  const services = SERVICES.filter(
    (service) => service.category === category.slug,
  );

  return (
    <div id={`services-${category.slug}`} className="scroll-mt-30">
      {/* Ash ramp echoing the gradient behind the header logo, bled out past
          the column padding so the icon and title still line up with the
          service rows below. Fades to transparent rather than to white so it
          dissolves into the cream page background. */}
      <div className="-mx-4 flex items-center gap-4 border-b-2 border-primary bg-gradient-to-r from-neutral-300 via-neutral-100 to-transparent px-4 py-3">
        <Image
          src={category.icon}
          alt=""
          aria-hidden
          width={192}
          height={192}
          className="size-12 shrink-0 object-contain"
        />

        <div className="min-w-0">
          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            {category.label}
          </h3>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {category.tagline}
          </p>
        </div>
      </div>

      <div className="mt-2">
        {services.map((service) => (
          <ServiceRow key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-30 bg-background py-16 sm:py-20">
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
        </div>

        {/* Three practice areas side by side from lg, so the whole service
            list reads as one screen rather than three stacked blocks. */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {SERVICE_CATEGORIES.map((category) => (
            <CategoryBlock key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
