"use client";

import { useEffect, useRef, useState } from "react";
import { Play, ShieldCheck, X } from "lucide-react";

export type ProjectVideo = { id: string; src: string; caption: string };

const STATIC_VIDEOS: ProjectVideo[] = [
  { id: "video1", src: "/video1.mp4", caption: "Roofing & Shelter" },
  { id: "video2", src: "/video2.mp4", caption: "Steel Fabrication" },
  { id: "video3", src: "/video3.mp4", caption: "Facade & Renovation" },
  { id: "video4", src: "/video4.mp4", caption: "On-Site Progress" },
  { id: "video5", src: "/video5.mp4", caption: "Completed Installation" },
];

// Designed to sit on the white "Project Films" section in
// src/app/projects/page.tsx that renders this - card chrome (border, scrim,
// footer text) is tuned for a light background rather than taking a
// light/dark tone prop, since this grid is only ever embedded there.
export function ProjectVideoGallery({ videos = [] }: { videos?: ProjectVideo[] }) {
  // Static showcase clips first, then anything uploaded via the admin panel.
  const allVideos = [...STATIC_VIDEOS, ...videos];
  const [activeVideo, setActiveVideo] = useState<ProjectVideo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // <dialog>.showModal() renders in the browser's top-layer, so it always
  // paints above the sticky/backdrop-blurred header regardless of z-index -
  // it also blocks background scroll and handles Escape-to-close natively
  // (same pattern as the photo lightbox in photo-gallery.tsx).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (activeVideo && !dialog.open) {
      dialog.showModal();
    } else if (!activeVideo && dialog.open) {
      dialog.close();
    }
  }, [activeVideo]);

  const playPreview = (id: string) => {
    previewRefs.current[id]?.play().catch(() => {});
  };
  const resetPreview = (id: string) => {
    const el = previewRefs.current[id];
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allVideos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveVideo(video)}
            onMouseEnter={() => playPreview(video.id)}
            onMouseLeave={() => resetPreview(video.id)}
            onFocus={() => playPreview(video.id)}
            onBlur={() => resetPreview(video.id)}
            onContextMenu={(event) => event.preventDefault()}
            aria-label={`Play video: ${video.caption}`}
            className="group/video relative aspect-video cursor-pointer select-none overflow-hidden border border-border bg-muted/40 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          >
            <video
              ref={(el) => {
                previewRefs.current[video.id] = el;
              }}
              src={video.src}
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              className="size-full object-cover transition-transform duration-500 group-hover/video:scale-105"
            />
            {/* Subtle default scrim so the white play icon always has
                contrast, deepening on hover - no white-disc/red-triangle
                "YouTube button" here, just a clean frosted-glass ring. */}
            <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover/video:bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition-all duration-200 group-hover/video:scale-110 group-hover/video:bg-primary group-hover/video:border-primary">
                <Play className="ml-0.5 size-5 fill-white text-white" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent p-4 pt-12">
              <p className="text-sm font-bold text-white">{video.caption}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        Site videos are provided for viewing only.
      </p>

      <dialog
        ref={dialogRef}
        onClose={() => setActiveVideo(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setActiveVideo(null);
        }}
        onContextMenu={(event) => event.preventDefault()}
        className="m-auto max-h-none max-w-none border-0 bg-transparent p-4 backdrop:bg-black/90 open:flex open:items-center open:justify-center sm:p-10"
      >
        {activeVideo && (
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close"
              className="fixed top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <div className="relative w-full max-w-full">
              <video
                key={activeVideo.id}
                src={activeVideo.src}
                controls
                autoPlay
                playsInline
                controlsList="nodownload noremoteplayback"
                className="max-h-[80vh] w-full max-w-full touch-none object-contain"
              />
            </div>
            <p className="text-center text-sm text-white/80">
              {activeVideo.caption}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}
