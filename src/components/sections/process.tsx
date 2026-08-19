import { Badge } from "@/components/ui/badge";
import { PROCESS_STEPS } from "@/lib/site-config";

export function Process() {
  return (
    <section id="process" className="scroll-mt-30 bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            How We Work
          </Badge>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            A Predictable Path From Brief to Handover
          </h2>
        </div>

        {/* Numbered step sequence laid out as a bordered panel (same
            gap-px/bg-border hairline trick as the Why Choose Us grid)
            instead of floating circular badges on a dashed line, so the
            "how we work" and "why choose us" sections read as one system. */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="group relative bg-white p-8 transition-colors hover:bg-neutral-50"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center border border-primary/20 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon className="size-5.5" strokeWidth={2} />
                </span>
                <span className="font-mono text-2xl font-bold text-primary/15">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
