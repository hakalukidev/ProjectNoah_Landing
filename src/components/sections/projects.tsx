import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { PROJECTS } from "@/lib/site-config";
import { getCategories } from "@/lib/server/categories";
import { getImages } from "@/lib/server/gallery";

export async function ProjectsPreview() {
  const featured = PROJECTS.slice(0, 3);
  const [categories, images] = await Promise.all([
    getCategories(),
    getImages(),
  ]);
  // Cards reference a real gallery photo by id; if it's ever removed via the
  // admin gallery, fall back to the placeholder graphic instead of a 404.
  const availableImageIds = new Set(images.map((image) => image.id));

  return (
    <section id="projects" className="scroll-mt-30 bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Badge
              variant="outline"
              className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
            >
              Our Projects
            </Badge>
            <h2 className="mt-5 max-w-xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              A Track Record Across Singapore
            </h2>
          </div>
          <Button
            render={<Link href="/projects" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="rounded-none border-foreground/15 px-6 hover:bg-muted"
          >
            View All Projects
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => {
            const hasPhoto = availableImageIds.has(project.imageId);
            return (
              <Card
                key={project.slug}
                className="group/project rounded-none border border-border bg-card p-0 ring-0 transition-shadow hover:shadow-lg"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-foreground to-foreground/80">
                  {hasPhoto ? (
                    <Image
                      src={`/api/images/${project.imageId}`}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover/project:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, var(--background) 0px, var(--background) 2px, transparent 2px, transparent 14px)",
                        }}
                      />
                      <Building2
                        className="size-16 text-background/15 transition-colors group-hover/project:text-primary/40"
                        strokeWidth={1.25}
                      />
                    </>
                  )}
                  <span className="absolute top-4 left-4 rounded-none bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                    {project.category}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-none border border-background/25 px-2 py-1 text-xs font-bold text-background/80">
                    {project.year}
                  </span>
                </div>
                <CardContent className="flex flex-col gap-2 px-6 pt-5 pb-6">
                  <h3 className="text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {project.location}
                  </span>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {images.length > 0 && (
          <div className="mt-16 border-t border-border pt-14">
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Photos From Our Sites
            </h3>
            <div className="mt-10">
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
        )}
      </div>
    </section>
  );
}
