import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { ProjectsPreviewGrid } from "@/components/sections/projects-preview-grid";
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

        <ProjectsPreviewGrid
          projects={featured}
          availableImageIds={availableImageIds}
        />

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
