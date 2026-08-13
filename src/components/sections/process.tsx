"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { PROCESS_STEPS } from "@/lib/site-config";

export function Process() {
  return (
    <section id="process" className="scroll-mt-30 bg-background py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-10 lg:px-16">
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

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden
            className="absolute top-6 inset-x-[12.5%] hidden h-1 lg:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--primary) 0 14px, transparent 14px 26px)",
            }}
          />
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="relative flex flex-col items-center gap-4 text-center"
            >
              <motion.div
                initial={{ y: -14, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 12,
                  delay: index * 0.12,
                }}
                className="relative z-10 flex size-12 items-center justify-center rounded-none bg-primary text-primary-foreground ring-8 ring-background"
              >
                <step.icon className="size-6" strokeWidth={2} />
              </motion.div>
              <h3 className="text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
