import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PhotoGallery } from "@/components/sections/photo-gallery";
import { WorksMosaic } from "@/components/sections/works-mosaic";
import { SITE_PHOTOS, WORKS } from "@/lib/site-config";
import { getCategories } from "@/lib/server/categories";
import { getImages } from "@/lib/server/gallery";

export async function WorksPreview() {
  // Five works plus the mosaic's accent tile make one complete 4x3 block.
  const featured = WORKS.slice(0, 5);
  const [categories, images] = await Promise.all([
    getCategories(),
    getImages(),
  ]);
  // Static site photos plus anything uploaded via the admin gallery.
  const galleryPhotos = [
    ...SITE_PHOTOS,
    ...images.map((image) => ({
      id: image.id,
      categoryId: image.categoryId,
      caption: image.caption,
      width: image.width,
      height: image.height,
    })),
  ];

  return (
    <section id="works" className="scroll-mt-30 bg-background pt-20 pb-10 sm:pt-28 sm:pb-14">
      <div className="mx-auto w-full max-w-7xl px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Badge
              variant="outline"
              className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
            >
              Our Works
            </Badge>
            <h2 className="mt-5 max-w-xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              A Track Record Across Singapore
            </h2>
          </div>
          <Button
            render={<Link href="/works" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="rounded-none border-foreground/15 px-6 hover:bg-muted"
          >
            View All Works
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>

        <div className="mt-14">
          <WorksMosaic works={featured} />
        </div>

        {galleryPhotos.length > 0 && (
          <div className="mt-16 border-t border-border pt-14">
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Photos From Our Sites
            </h3>
            <div className="mt-10">
              <PhotoGallery categories={categories} photos={galleryPhotos} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
