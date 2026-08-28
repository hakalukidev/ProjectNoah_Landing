"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Maximize2, MapPin, X } from "lucide-react";

import { company, WORKS } from "@/lib/site-config";

type Work = (typeof WORKS)[number];

/**
 * Tile sizes for the mosaic, cycled by position. One pass through the six
 * entries fills exactly twelve cells - a full 4-col x 3-row block on desktop
 * and a 2-col x 6-row block on mobile - so the grid always tiles flush with
 * no holes as long as the item count is a multiple of six. `WorksMosaic`
 * inserts the accent tile to make that add up.
 */
const TILE_SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-2 row-span-1",
];

/** Larger tiles carry more pixels, so let each one ask for the right size. */
const TILE_SIZES = [
  "(min-width: 1024px) 50vw, 100vw",
  "(min-width: 1024px) 25vw, 50vw",
  "(min-width: 1024px) 25vw, 50vw",
  "(min-width: 1024px) 25vw, 50vw",
  "(min-width: 1024px) 50vw, 100vw",
  "(min-width: 1024px) 50vw, 100vw",
];

/**
 * On-screen brand mark for a mosaic tile.
 *
 * The photos under public/works already carry the burned-in watermark
 * (scripts/watermark-static.mjs stamps it into the bottom-right corner), but
 * every tile renders with object-cover: a portrait photo dropped into a 2x1
 * tile loses its entire bottom edge, and the caption scrim covers whatever
 * survives. So on the mosaic the burned mark is effectively invisible - this
 * paints the same lockup back on, anchored to the tile rather than to the
 * photo, where no crop or hover zoom can reach it.
 *
 * The burned mark is still what protects a saved copy; this one is only for
 * what a visitor sees on the page.
 */
function TileWatermark({ compact }: { compact: boolean }) {
  return (
    <span className="pointer-events-none absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-sm border border-white/15 bg-black/25 px-1.5 py-1 backdrop-blur-[1px] sm:top-3 sm:left-3 sm:gap-2 sm:px-2 sm:py-1.5">
      <span className="grid size-5 shrink-0 place-items-center rounded-[2px] bg-white/90 sm:size-6">
        <Image
          src="/logo-icon.png"
          alt=""
          width={260}
          height={255}
          className="size-3.5 object-contain sm:size-4"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-white sm:text-[10px]">
          {company.brandName}
        </span>
        {/* The phone number is dropped on the 1x1 tiles - at that width the
            second line has nowhere to sit without crowding the lockup. */}
        {!compact && (
          <span className="mt-1 text-[9px] font-semibold text-white/85 sm:text-[10px]">
            {company.phone}
          </span>
        )}
      </span>
    </span>
  );
}

export function WorksMosaic({ works }: { works: Work[] }) {
  const [lightbox, setLightbox] = useState<Work | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // <dialog>.showModal() renders in the browser's top-layer, so it always
  // paints above the sticky/backdrop-blurred header regardless of z-index -
  // it also blocks background scroll and handles Escape-to-close natively.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightbox && !dialog.open) {
      dialog.showModal();
    } else if (!lightbox && dialog.open) {
      dialog.close();
    }
  }, [lightbox]);

  // The accent tile sits sixth so it lands inside the first block rather than
  // trailing the mosaic, and it keeps the total item count a multiple of six.
  const tiles: ({ kind: "work"; work: Work } | { kind: "accent" })[] = [
    ...works.slice(0, 5).map((work) => ({ kind: "work" as const, work })),
    { kind: "accent" as const },
    ...works.slice(5).map((work) => ({ kind: "work" as const, work })),
  ];

  return (
    <>
      <div className="grid auto-rows-[minmax(9rem,1fr)] grid-cols-2 gap-3 sm:auto-rows-[minmax(11rem,1fr)] lg:grid-cols-4 lg:gap-4">
        {tiles.map((tile, index) => {
          const span = TILE_SPANS[index % TILE_SPANS.length];

          if (tile.kind === "accent") {
            return (
              <div
                key="accent"
                className={`${span} flex flex-col justify-between bg-brand-dark p-5 text-brand-dark-foreground sm:p-6`}
              >
                <span className="w-fit bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                  Since 2008
                </span>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {company.yearsInOperation}+ years
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-dark-foreground/70">
                    of roofing, steel and facade works delivered island-wide
                    across Singapore.
                  </p>
                  <Link
                    href="/contact#contact-form"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground underline-offset-4 hover:underline"
                  >
                    Start a project
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          }

          const { work } = tile;
          // 1x1 tiles are roughly 280x180 on desktop - too small for the
          // two-line lockup, so those get the compact mark.
          const compact = span === "col-span-1 row-span-1";
          return (
            <button
              key={work.slug}
              type="button"
              onClick={() => setLightbox(work)}
              onContextMenu={(event) => event.preventDefault()}
              data-protected-image
              aria-label={`View larger photo of ${work.title}`}
              className={`${span} group/tile relative cursor-zoom-in select-none overflow-hidden bg-brand-dark text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                draggable={false}
                sizes={TILE_SIZES[index % TILE_SIZES.length]}
                className="pointer-events-none object-cover transition-transform duration-500 ease-out group-hover/tile:scale-105"
              />

              {/* Scrim is always on so the caption stays readable, and deepens
                  on hover to carry the zoom affordance. */}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/25 to-brand-dark/0 transition-opacity duration-300 group-hover/tile:opacity-90" />

              <TileWatermark compact={compact} />

              <span className="pointer-events-none absolute top-3 right-3 grid size-8 place-items-center bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/tile:opacity-100">
                <Maximize2 className="size-4" />
              </span>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:p-5">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
                  <span className="bg-primary px-1.5 py-0.5 text-primary-foreground">
                    {work.category}
                  </span>
                  {work.year}
                </span>
                <span className="text-sm font-extrabold leading-snug tracking-tight text-white sm:text-base">
                  {work.title}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/70">
                  <MapPin className="size-3" />
                  {work.location}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setLightbox(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setLightbox(null);
        }}
        onContextMenu={(event) => event.preventDefault()}
        className="m-auto max-h-none max-w-none border-0 bg-transparent p-4 backdrop:bg-black/90 open:flex open:items-center open:justify-center sm:p-10"
      >
        {lightbox && (
          <div className="flex max-h-[90vh] max-w-full flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="fixed top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <Image
              key={lightbox.slug}
              src={lightbox.image}
              alt={lightbox.title}
              width={1600}
              height={1200}
              draggable={false}
              className="max-h-[75vh] w-auto max-w-full touch-none object-contain select-none"
            />
            <div className="max-w-xl text-center">
              <p className="text-sm font-bold text-white">
                {lightbox.title} &middot; {lightbox.location}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                {lightbox.description}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
