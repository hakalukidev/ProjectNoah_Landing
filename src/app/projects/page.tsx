import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { company, PROJECTS, PROJECT_CATEGORIES } from "@/lib/site-config";
import { getContactInfo } from "@/lib/server/contact";
import { getCategories } from "@/lib/server/categories";
import { getImages } from "@/lib/server/gallery";

export const metadata: Metadata = {
  title: "Projects",
  description: `A look at the project types ${company.legalName} delivers across Singapore: roofing & shelter, steel & fabrication, and facade & renovation works.`,
};

export default async function ProjectsPage() {
  const [contact, categories, images] = await Promise.all([
    getContactInfo(),
    getCategories(),
    getImages(),
  ]);
  const availableImageIds = new Set(images.map((image) => image.id));
  // Wide skyline shot reads best as a short banner - prefer it, falling
  // back to the first project with a live photo if it's ever removed.
  const coverProject =
    PROJECTS.find(
      (project) =>
        project.slug === "commercial-walkway-canopy" &&
        availableImageIds.has(project.imageId)
    ) ?? PROJECTS.find((project) => availableImageIds.has(project.imageId));

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <Header contact={contact} />

      <main className="flex flex-1 flex-col">
        {/* Fixed min-height (matched with the About page cover) rather than
            content-driven padding, since this page's cover carries an extra
            stats row that About's doesn't - min-height + flex centering
            keeps both banners the same height regardless of copy amount. */}
        <section className="relative flex min-h-[420px] items-center overflow-hidden bg-neutral-950 py-10 text-white sm:min-h-[480px] sm:py-14 lg:min-h-[520px]">
          {coverProject && (
            <>
              {/* object-top (not center) keeps the crop away from the
                  watermark the upload pipeline burns into the vertical
                  middle of every gallery photo (see watermark.ts) - this
                  short banner only ever shows the top slice of the image. */}
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
              Our Portfolio
            </span>

            <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
              Projects Built Across Singapore
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Representative work spanning roofing &amp; shelter, steel &amp;
              fabrication, and facade &amp; renovation projects, delivered by{" "}
              {company.legalName} (UEN {company.uen}).
            </p>

            <div className="mt-6 grid grid-cols-2 gap-8 border-t border-white/20 pt-5 sm:grid-cols-4">
              {[
                { value: PROJECTS.length, suffix: "+", label: "Projects Shown" },
                {
                  value: PROJECT_CATEGORIES.length - 1,
                  suffix: "",
                  label: "Categories",
                },
                { value: company.yearsInOperation, suffix: "+", label: "Years Active" },
                { value: 100, suffix: "%", label: "Singapore-Based" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div className="flex items-baseline text-3xl font-extrabold text-primary sm:text-4xl">
                    <span>{stat.value}</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white pt-12 pb-24">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <ProjectsGrid availableImageIds={availableImageIds} />
          </div>
        </section>

        {images.length > 0 && (
          <section className="border-t border-border bg-white py-20">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Site Photos
              </span>
              <h2 className="mt-6 max-w-xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Photos From Our Sites
              </h2>
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

        <section className="border-t border-border bg-white py-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-8">
            <h2 className="max-w-xl text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Have a site that needs a contractor like this?
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Tell us the scope and timeline, and we&apos;ll respond with next
              steps within one business day.
            </p>
            <Button
              render={<Link href="/#contact" />}
              nativeButton={false}
              size="lg"
              className="h-13 rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              Get a Free Quote
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer contact={contact} />
    </div>
  );
}
