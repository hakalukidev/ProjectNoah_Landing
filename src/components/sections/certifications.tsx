import { Award, BadgeCheck, ShieldCheck } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { certifications } from "@/lib/site-config";

const blobColor = ["bg-brand/10 text-brand", "bg-ink/10 text-ink", "bg-brand/10 text-brand-dark"];

export function Certifications() {
  return (
    <section id="certifications" className="section-py bg-surface-muted">
      <div className="container-px">
        <BlurFade
          inView
          inViewMargin="-100px"
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Certified &amp; Accredited
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-ink sm:text-4xl">
            International &amp; Local Certifications We Hold
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground">
            Every project runs under recognised quality, safety and
            environmental standards — verified and renewed annually.
          </p>
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <BlurFade inView inViewMargin="-80px">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {certifications.map((cert, i) => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-white px-4 py-8 text-center shadow-sm transition-shadow hover:shadow-lg"
                >
                  <span
                    className={`flex size-12 items-center justify-center rounded-full ${blobColor[i % blobColor.length]}`}
                  >
                    <ShieldCheck className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {cert.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>

          <BlurFade inView inViewMargin="-80px" delay={0.1}>
            <div className="relative mx-auto max-w-sm">
              <div className="relative z-10 rounded-2xl border border-border bg-white p-6 shadow-xl">
                <div className="flex items-center gap-3 border-b border-dashed border-border pb-4">
                  <span className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground">
                    <Award className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Certificate of Registration
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ISO 9001:2015 — Quality Management
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  This is to certify that Noah Construction operates a
                  quality management system that fulfils the requirements of
                  ISO 9001:2015 for design-and-build construction services.
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Valid through 2027</span>
                  <BadgeCheck className="size-5 text-brand" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 z-0 hidden w-48 rotate-6 rounded-2xl border border-border bg-white p-5 shadow-lg sm:block">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-6 shrink-0 text-ink" />
                  <div>
                    <p className="text-xs font-semibold text-ink">
                      bizSAFE Level 3
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Workplace Safety
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
