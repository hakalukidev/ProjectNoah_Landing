import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { clients } from "@/lib/site-config";

export function Clients() {
  return (
    <section className="section-py bg-surface-muted">
      <div className="container-px">
        <BlurFade
          inView
          inViewMargin="-100px"
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Our Clients
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-ink sm:text-4xl">
            Trusted by Teams Who Build to Last
          </h2>
        </BlurFade>

        <BlurFade inView inViewMargin="-80px" delay={0.1} className="mt-12">
          <div className="relative">
            <Marquee pauseOnHover className="[--duration:32s]">
              {clients.map((client) => (
                <span
                  key={client}
                  className="flex items-center px-8 font-heading text-xl font-semibold text-ink/40 grayscale transition-all hover:text-ink hover:grayscale-0"
                >
                  {client}
                </span>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-surface-muted to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-surface-muted to-transparent" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
