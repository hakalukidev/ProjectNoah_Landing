"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Building2, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PROJECT_CATEGORIES, PROJECTS } from "@/lib/site-config";

export function ProjectsGrid({
  availableImageIds,
}: {
  /** ids of gallery photos that currently exist, so cards can fall back to the placeholder if an admin removes one. */
  availableImageIds: Set<string>;
}) {
  const [category, setCategory] = useState<string>("All");

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
    </div>
  );
}
