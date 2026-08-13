import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { company } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-10 sm:pb-24 sm:pt-12 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-14">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Since 2008
          </span>

          <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            Built to{" "}
            <span className="rounded bg-primary px-1.5 text-primary-foreground">
              Protect
            </span>
            , Built to{" "}
            <span className="underline decoration-primary decoration-[3px] underline-offset-4">
              Last
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {company.legalName} delivers end-to-end construction and project
            management solutions engineered for speed, safety, and precision,
            from groundbreaking to handover.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button
              render={<Link href="/#contact" />}
              nativeButton={false}
              size="lg"
              className="h-13 rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              Get a Free Quote
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              render={<Link href="/projects" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-13 rounded-none border-foreground/15 px-8 text-base hover:bg-muted"
            >
              View Our Projects
            </Button>
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            UEN {company.uen} &middot; {company.entityType}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="absolute inset-0 -z-10 translate-x-6 translate-y-10 rounded-[2rem] bg-primary/10 [clip-path:polygon(0_35%,100%_0,100%_65%,0%_100%)]" />
          <Image
            src="/banner.png"
            alt="A glimpse of blue sky and a building under Project Noah's construction canopy"
            width={1086}
            height={1448}
            priority
            className="relative w-full"
          />
        </div>
      </div>
    </section>
  );
}
