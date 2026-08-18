import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/sections/footer";
import { Process } from "@/components/sections/process";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { BENEFITS, company, PROJECTS } from "@/lib/site-config";
import { getContactInfo } from "@/lib/server/contact";
import { getCategories } from "@/lib/server/categories";
import { getImages } from "@/lib/server/gallery";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${company.legalName} (UEN ${company.uen}) - a Singapore-registered construction company operating since ${company.incorporationDateLabel}. Our story, our registration facts, and our work.`,
};

const CHECKLIST = [
  `Incorporated in Singapore on ${company.incorporationDateLabel}`,
  `${company.entityType}, UEN ${company.uen}`,
  "Registered principal activity: Building Construction (n.e.c.)",
  "Registered office in Pioneer, Singapore",
];

export default async function AboutPage() {
  const [contact, categories, images] = await Promise.all([
    getContactInfo(),
    getCategories(),
    getImages(),
  ]);

  const availableImageIds = new Set(images.map((image) => image.id));
  // A landed-home facade shot reads well as a wide cover crop - prefer it,
  // falling back to the first project with a live photo if it's ever removed.
  const coverProject =
    PROJECTS.find(
      (project) =>
        project.slug === "landed-home-facade-canopy" &&
        availableImageIds.has(project.imageId)
    ) ?? PROJECTS.find((project) => availableImageIds.has(project.imageId));

  // Registry facts sourced from ACRA / Singapore's public business registry
  // (sgpbusiness.com company profile for PROJECT NOAH PTE. LTD.), mirrored
  // straight from `company` in site-config.ts.
  const COMPANY_PROFILE = [
    { label: "Legal Name", value: company.legalName },
    { label: "UEN", value: company.uen },
    { label: "Entity Type", value: company.entityType },
    { label: "Status", value: company.status },
    { label: "Incorporated", value: company.incorporationDateLabel },
    { label: "Country of Incorporation", value: company.countryOfIncorporation },
    { label: "Registered Address", value: company.address.full },
    { label: "Primary Activity", value: company.primaryActivity },
    { label: "Secondary Activity", value: company.secondaryActivity },
  ];

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <Header contact={contact} />

      <main className="flex flex-1 flex-col">
        {/* Cover - real project photo. Fixed min-height (matched with the
            Projects and Contact page covers) rather than content-driven
            padding, since this page's cover has one fewer content row than
            Projects' - min-height + flex centering keeps every banner the
            same height regardless of how much copy each one carries. */}
        <section className="relative flex min-h-[420px] items-center overflow-hidden bg-neutral-950 py-10 text-white sm:min-h-[480px] sm:py-14 lg:min-h-[520px]">
          {coverProject && (
            <>
              {/* object-top keeps the crop away from the watermark burned
                  into the vertical middle of every gallery photo. */}
              <Image
                src={`/api/images/${coverProject.imageId}`}
                alt=""
                fill
                unoptimized
                priority
                sizes="100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/25" />
            </>
          )}

          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              About Us
            </span>

            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
              Building Singapore, One Project at a Time
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              {company.legalName} (UEN {company.uen}) has delivered building
              construction, design &amp; build and addition &amp; alteration
              works for {company.yearsInOperation}+ years, from our office in
              Pioneer.
            </p>
          </div>
        </section>

        {/* Story - sketch image */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div className="relative mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/5" />
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
                className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
              >
                Our Story
              </Badge>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {company.legalName} has operated as a Singapore-registered
                construction company for {company.yearsInOperation}+ years.
                What started as a small team taking on roofing and steel work
                has grown into a full-service contractor covering roofing &amp;
                shelter, steel fabrication, and glass &amp; facade works -
                still run by the same accountable, single-point-of-contact
                approach we started with.
              </p>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Every project is signed off against BCA and workplace safety
                standards at each phase, so clients get a documented,
                ACRA-registered track record rather than just a finished
                building.
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="text-sm text-foreground/80 sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                render={<Link href="/projects" />}
                nativeButton={false}
                size="lg"
                className="mt-10 h-13 rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
              >
                See Our Projects
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Company Profile - registry facts sourced from ACRA / Singapore's
            public business registry (sgpbusiness.com company profile for
            PROJECT NOAH PTE. LTD.), mirrored from company in site-config. */}
        <section className="border-t border-border bg-neutral-50 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
              >
                Company Profile
              </Badge>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Registered with ACRA, Singapore
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Our corporate particulars as filed with Singapore&apos;s
                Accounting and Corporate Regulatory Authority.
              </p>
            </div>

            <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-8 border border-border bg-white p-8 sm:grid-cols-2 sm:p-10">
              {COMPANY_PROFILE.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-foreground sm:text-base">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Why choose us - BENEFITS from site-config, not shown anywhere
            else on the site */}
        <section className="border-t border-border bg-white py-20 sm:py-28">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge
                variant="outline"
                className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
              >
                Why Choose Us
              </Badge>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                What Working With Us Looks Like
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="flex flex-col gap-4">
                  <span className="flex size-12 items-center justify-center rounded-none border border-border text-primary">
                    <benefit.icon className="size-5.5" />
                  </span>
                  <h3 className="text-lg font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How we work - PROCESS_STEPS from site-config */}
        <div className="border-t border-border">
          <Process />
        </div>

        {/* Get in touch CTA - points to the dedicated Contact page (details,
            map, socials, form) instead of duplicating that content here. */}
        <section className="border-t border-border bg-neutral-950 py-16 text-white sm:py-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-8">
            <h2 className="max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">
              Have a Site That Needs a Contractor Like This?
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              Reach us directly, or send your site details and we&apos;ll
              reply with next steps within one business day.
            </p>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              size="lg"
              className="h-13 rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              Get in Touch
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        </section>

        {/* Real project photos - kept last so the page closes on the work
            itself, after the story and facts have made the case. */}
        {images.length > 0 && (
          <section className="border-t border-border bg-white py-20 sm:py-28">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <Badge
                  variant="outline"
                  className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
                >
                  Our Work
                </Badge>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  A look at completed roofing, steel and glass works from
                  sites across Singapore.
                </p>
              </div>
              <div className="mt-12">
                <PhotoGallery
                  categories={categories}
                  photos={images.map((image) => ({
                    id: image.id,
                    categoryId: image.categoryId,
                    caption: image.caption,
                    width: image.width,
                    height: image.height,
                  }))}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer contact={contact} />
    </div>
  );
}
