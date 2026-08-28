"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ShieldCheck,
  X,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type GalleryCategory = { id: string; name: string };
export type GalleryPhoto = {
  id: string;
  categoryId: string;
  caption: string;
  width: number;
  height: number;
  /** Static public/ file to use instead of the watermarked /api/images/[id] route. */
  src?: string;
};

/** Minimum horizontal travel (px) before a touch counts as a swipe. */
const SWIPE_THRESHOLD = 50;

/**
 * Photos rendered per page. The gallery is fed the full site library (well
 * over a hundred photos once public/project_images is included), and mounting
 * every tile at once costs a long initial paint on the homepage - so the grid
 * pages in. The lightbox still walks the whole filtered set, so paging never
 * limits what a visitor can actually reach.
 */
const PAGE_SIZE = 16;

export function PhotoGallery({
  categories,
  photos,
  tone = "light",
}: {
  categories: GalleryCategory[];
  photos: GalleryPhoto[];
  /** "dark" for use on a dark/inverted section background, "light" (default) otherwise. */
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  const [categoryId, setCategoryId] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const filtered = useMemo(
    () =>
      categoryId === "all"
        ? photos
        : photos.filter((photo) => photo.categoryId === categoryId),
    [photos, categoryId]
  );

  // slice(0, n) keeps indices aligned with `filtered`, so a tile's grid index
  // is still its lightbox index and the arrows can run past the visible page.
  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  const lightboxPhoto =
    lightboxIndex === null ? null : (filtered[lightboxIndex] ?? null);

  // Wraps around so the arrows never dead-end on the first/last photo.
  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null || filtered.length === 0) return current;
        return (current + delta + filtered.length) % filtered.length;
      });
    },
    [filtered.length]
  );

  // <dialog>.showModal() renders in the browser's top-layer, so it always
  // paints above the sticky/backdrop-blurred header regardless of z-index -
  // it also blocks background scroll and handles Escape-to-close natively.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxPhoto && !dialog.open) {
      dialog.showModal();
    } else if (!lightboxPhoto && dialog.open) {
      dialog.close();
    }
  }, [lightboxPhoto]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, step]);

  if (photos.length === 0) {
    return null;
  }

  return (
    <div>
      <Tabs
        value={categoryId}
        onValueChange={(v) => {
          setLightboxIndex(null);
          setVisibleCount(PAGE_SIZE);
          setCategoryId(v as string);
        }}
      >
        <TabsList
          variant="line"
          className={cn(
            "mx-auto w-fit flex-wrap justify-center gap-2 border-b pb-0",
            isDark ? "border-background/10" : "border-border"
          )}
        >
          <TabsTrigger
            value="all"
            className={cn(
              "rounded-none px-4 py-2 text-sm font-bold uppercase tracking-wide data-active:bg-transparent data-active:text-primary",
              isDark ? "text-background/50" : "text-muted-foreground"
            )}
          >
            All
          </TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className={cn(
                "rounded-none px-4 py-2 text-sm font-bold uppercase tracking-wide data-active:bg-transparent data-active:text-primary",
                isDark ? "text-background/50" : "text-muted-foreground"
              )}
            >
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            onContextMenu={(event) => event.preventDefault()}
            data-protected-image
            aria-label="View larger photo"
            className={cn(
              "group/photo relative aspect-[4/3] cursor-zoom-in select-none overflow-hidden border text-left",
              isDark
                ? "border-background/10 bg-background/[0.02]"
                : "border-border bg-muted/40"
            )}
          >
            <Image
              src={photo.src ?? `/api/images/${photo.id}`}
              alt={photo.caption || "Project site photo"}
              fill
              unoptimized
              draggable={false}
              className="object-cover pointer-events-none transition-transform duration-300 group-hover/photo:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover/photo:bg-black/30">
              <Maximize2 className="size-6 text-white opacity-0 transition-opacity duration-200 group-hover/photo:opacity-100" />
            </div>
            {photo.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-3 pt-8">
                <p className="text-xs font-medium text-white">
                  {photo.caption}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className={cn(
              "border px-8 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors",
              isDark
                ? "border-background/20 text-background/80 hover:border-background/40 hover:text-background"
                : "border-border text-foreground hover:border-primary hover:text-primary"
            )}
          >
            Load more ({remaining})
          </button>
        </div>
      )}

      <p
        className={cn(
          "mt-8 flex items-center justify-center gap-1.5 text-center text-xs",
          isDark ? "text-background/40" : "text-muted-foreground"
        )}
      >
        <ShieldCheck className="size-3.5" />
        Site photos are watermarked and provided for viewing only.
      </p>

      {filtered.length === 0 && (
        <p
          className={cn(
            "mt-12 text-center text-sm",
            isDark ? "text-background/50" : "text-muted-foreground"
          )}
        >
          No photos in this category yet.
        </p>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setLightboxIndex(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setLightboxIndex(null);
        }}
        onContextMenu={(event) => event.preventDefault()}
        className="m-auto max-h-none max-w-none border-0 bg-transparent p-4 backdrop:bg-black/90 open:flex open:items-center open:justify-center sm:p-10"
      >
        {lightboxPhoto && (
          <div
            className="flex max-h-[90vh] max-w-full flex-col items-center gap-3"
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchStartRef.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(event) => {
              const start = touchStartRef.current;
              touchStartRef.current = null;
              if (!start) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - start.x;
              const dy = touch.clientY - start.y;
              // Ignore mostly-vertical drags so they are not read as swipes.
              if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy))
                return;
              step(dx < 0 ? 1 : -1);
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="fixed top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="fixed top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="fixed top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
            <Image
              key={lightboxPhoto.id}
              src={lightboxPhoto.src ?? `/api/images/${lightboxPhoto.id}`}
              alt={lightboxPhoto.caption || "Project site photo"}
              width={lightboxPhoto.width}
              height={lightboxPhoto.height}
              unoptimized
              draggable={false}
              className="max-h-[80vh] w-auto max-w-full touch-none object-contain select-none"
            />
            <div className="flex flex-col items-center gap-1">
              {lightboxPhoto.caption && (
                <p className="text-center text-sm text-white/80">
                  {lightboxPhoto.caption}
                </p>
              )}
              {filtered.length > 1 && (
                <p className="text-xs text-white/40">
                  {(lightboxIndex ?? 0) + 1} / {filtered.length}
                </p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
