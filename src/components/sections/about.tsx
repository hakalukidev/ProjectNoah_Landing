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
    <section id="about" className="scroll-mt-30 bg-white py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div className="relative mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[#e01f22]/5" />
          <Image
            src="/about_us.png"
            alt="Line drawing of a Project Noah construction site with a tower crane"
            width={1329}
            height={1200}
            className="relative mx-auto w-full max-w-md"
          />
        </div>

        <div className="lg:order-1">
          <Badge
            variant="outline"
            className="rounded-none border-red-600/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-red-600"
          >
            About Us
          </Badge>

          <h2 className="mt-5 max-w-xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Built on Trust,{" "}
            <span className="text-[#e01f22]">Since 2008</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {company.legalName} has operated as a Singapore-registered
            construction company for {company.yearsInOperation}+ years. From
            our office in Pioneer, we deliver building construction, design &
            build and addition &amp; alteration works for clients across the
            island, backed by a documented, ACRA-registered track record.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-red-600" />
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
