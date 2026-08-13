import { company } from "@/lib/site-config";

export function Statement() {
  return (
    <section className="bg-background py-10 sm:py-14">
      <p className="mx-auto max-w-4xl px-10 text-center text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl lg:px-16">
        {`Since ${company.incorporationDate.slice(0, 4)}, we plan with precision, build with accountability, and deliver on schedule. ${company.yearsInOperation}+ years, one entity, one standard.`}
      </p>
    </section>
  );
}
