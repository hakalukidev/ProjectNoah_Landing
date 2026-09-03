import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { company } from "@/lib/site-config";

const CHECKLIST = [
  `Incorporated in Singapore on ${company.incorporationDateLabel}`,
  `${company.entityType}, UEN ${company.uen}`,
  "Registered principal activity: Building Construction (n.e.c.)",
  "Registered office in Pioneer, Singapore",
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-30 border-t border-border bg-background py-12 sm:py-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div className="relative mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#ad1111]/5" />
          <Image
            src="/about_us.png"
            alt="Line drawing of a building under construction with a tower crane and mobile crane on site"
            width={1536}
            height={1024}
            className="relative mx-auto w-full max-w-md"
          />
        </div>

        <div className="lg:order-1">
          <Badge
            variant="outline"
            className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            About Us
          </Badge>

          <h2 className="mt-5 max-w-xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Built on Trust,{" "}
            <span className="text-[#ad1111]">Since 2008</span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {company.legalName} has been a Singapore-registered construction
            company for {company.yearsInOperation}+ years. From our Pioneer
            office we deliver building construction, design &amp; build and
            addition &amp; alteration works island-wide.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground/80 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
