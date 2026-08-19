"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Building2, Maximize2, MapPin, X } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PROJECT_CATEGORIES, PROJECTS } from "@/lib/site-config";

type Project = (typeof PROJECTS)[number];

export function ProjectsGrid({
  availableImageIds,
}: {
  /** ids of gallery photos that currently exist, so cards can fall back to the placeholder if an admin removes one. */
  availableImageIds: Set<string>;
}) {
  const [category, setCategory] = useState<string>("All");
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // <dialog>.showModal() renders in the browser's top-layer, so it always
  // paints above the sticky/backdrop-blurred header regardless of z-index -
  // it also blocks background scroll and handles Escape-to-close natively.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxProject && !dialog.open) {
      dialog.showModal();
    } else if (!lightboxProject && dialog.open) {
      dialog.close();
    }
  }, [lightboxProject]);

  const filtered = useMemo(
    () =>
      category === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === category),
    [category]
  );

  return (
    <div>
      <Tabs value={category} onValueChange={(v) => setCategory(v as string)}>
        <TabsList
          variant="line"
          className="mx-auto w-fit flex-wrap justify-center gap-2 border-b border-border pb-0"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-none px-4 py-2 text-sm font-bold uppercase tracking-wide text-muted-foreground data-active:bg-transparent data-active:text-primary"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => {
          const hasPhoto = availableImageIds.has(project.imageId);
          return (
            <Card
              key={project.slug}
              className="group/project rounded-none border border-border bg-card p-0 ring-0 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <span className="rounded-none bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                  {project.category}
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {project.year}
                </span>
              </div>
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-foreground to-foreground/80">
                {hasPhoto ? (
                  <button
                    type="button"
                    onClick={() => setLightboxProject(project)}
                    aria-label={`View larger photo of ${project.title}`}
                    className="absolute inset-0 cursor-zoom-in"
                  >
                    <Image
                      src={`/api/images/${project.imageId}`}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover/project:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover/project:bg-black/30">
                      <Maximize2 className="size-6 text-white opacity-0 transition-opacity duration-200 group-hover/project:opacity-100" />
                    </div>
                  </button>
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
                      className="size-20 text-background/15 transition-colors group-hover/project:text-primary/40"
                      strokeWidth={1.25}
                    />
                  </>
                )}
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

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          No projects in this category yet.
        </p>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setLightboxProject(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setLightboxProject(null);
        }}
        className="m-auto max-h-none max-w-none border-0 bg-transparent p-4 backdrop:bg-black/90 open:flex open:items-center open:justify-center sm:p-10"
      >
        {lightboxProject && (
          <div className="flex max-h-[90vh] max-w-full flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setLightboxProject(null)}
              aria-label="Close"
              className="fixed top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
            <Image
              key={lightboxProject.slug}
              src={`/api/images/${lightboxProject.imageId}`}
              alt={lightboxProject.title}
              width={1600}
              height={1200}
              unoptimized
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
            <p className="text-center text-sm text-white/80">
              {lightboxProject.title} &middot; {lightboxProject.location}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}
