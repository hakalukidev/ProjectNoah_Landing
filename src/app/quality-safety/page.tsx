import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import {
  company,
  QUALITY_CHECKPOINTS,
  QUALITY_PILLARS,
  SAFETY_RULES,
  SAFETY_STANDARDS,
} from "@/lib/site-config";
import { getContactInfo } from "@/lib/server/contact";

export const metadata: Metadata = {
  title: "Quality & Safety",
  description: `How ${company.legalName} (UEN ${company.uen}) keeps quality signed off and sites safe - our five pillars, the site safety rules every crew works to, and the Singapore WSH and BCA regulations behind them.`,
};

export default async function QualitySafetyPage() {
  const contact = await getContactInfo();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Header contact={contact} />

      <main className="flex flex-1 flex-col">
        {/* Cover - same short band as the About page (identical
            min-heights, fill image and gradient), with a site photo
            instead of the skyline. */}
        <section className="relative flex min-h-[280px] items-center overflow-hidden bg-neutral-950 py-8 text-white sm:min-h-[320px] sm:py-10 lg:min-h-[360px]">
          <Image
            src="/works/rooftop-steel-pergola.jpg"
            alt="Steel pergola frame installed on a rooftop terrace against an open sky"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/25" />

          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
              Built to a Standard, Not to a Deadline
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Quality checked at every phase and a safety regime every crew is
              briefed on before work starts - held to Singapore&apos;s WSH Act
              and BCA codes.
            </p>
          </div>
        </section>

        {/* Five pillars - icon, title and one line each. */}
        <section className="bg-surface-alt py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              What We Stand On
            </h2>
            <span className="mt-4 block h-1 w-12 bg-primary" />

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {QUALITY_PILLARS.map((pillar) => (
                <div key={pillar.title} className="flex gap-4 lg:flex-col">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
                    <pillar.icon className="size-5" />
                  </span>
                  <div className="lg:mt-4">
                    <h3 className="text-base font-extrabold uppercase tracking-wide text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Site safety rules - plain grid, no photo panel. */}
        <section className="border-t border-border bg-background py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Site Safety Rules
            </h2>
            <span className="mt-4 block h-1 w-12 bg-primary" />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Briefed to our own crews and to every visiting subcontractor
              before work starts.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {SAFETY_RULES.map((rule) => (
                <div key={rule.title}>
                  <span className="flex size-10 items-center justify-center bg-primary/10 text-primary">
                    <rule.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    {rule.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality gates, with the statutory frame folded in underneath so
            the regulations don't need a section of their own. */}
        <section className="border-t border-border bg-surface-alt py-16 sm:py-20">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Four Gates Between Order and Handover
            </h2>
            <span className="mt-4 block h-1 w-12 bg-primary" />

            <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {QUALITY_CHECKPOINTS.map((checkpoint) => (
                <div key={checkpoint.step} className="bg-background p-6">
                  <span className="font-mono text-sm font-extrabold text-primary">
                    {checkpoint.step}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-foreground">
                    {checkpoint.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {checkpoint.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Standards We Work To
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                {SAFETY_STANDARDS.map((standard) => (
                  <li
                    key={standard.code}
                    className="border-l-2 border-primary pl-4"
                  >
                    <p className="text-sm font-bold text-foreground">
                      {standard.title}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {standard.code}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Closing CTA - same dark band as the About page's. */}
        <section className="border-t border-border bg-neutral-950 py-14 text-white sm:py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-6 text-center lg:px-8">
            <h2 className="max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">
              Want Our Safety and Quality Documents With Your Quote?
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Send us the scope and we&apos;ll come back with a risk assessment
              and method statement alongside the itemised quotation.
            </p>
            <Button
              render={<Link href="/contact#contact-form" />}
              nativeButton={false}
              size="lg"
              className="h-13 rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              Request a Quote
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
