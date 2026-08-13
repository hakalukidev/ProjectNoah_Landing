"use client";

import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PROJECT_CATEGORIES, PROJECTS } from "@/lib/site-config";

export function ProjectsGrid() {
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
          className="mx-auto w-fit flex-wrap justify-center gap-2 border-b border-background/10 pb-0"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-none px-4 py-2 text-sm font-bold uppercase tracking-wide text-background/50 data-active:bg-transparent data-active:text-primary"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Card
            key={project.slug}
            className="group/project rounded-none border border-background/10 bg-background/[0.03] p-0 ring-0 transition-colors hover:border-primary/40"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-background/10 bg-background/[0.02]">
              <span className="absolute top-4 left-4 rounded-none bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                {project.category}
              </span>
              <span className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wide text-background/40">
                {project.year}
              </span>
              <span className="px-8 text-center text-5xl font-extrabold tracking-tight text-background/10 transition-colors group-hover/project:text-primary/20">
                {project.year}
              </span>
            </div>
            <CardContent className="flex flex-col gap-2 px-6 pt-5 pb-6">
              <h3 className="text-lg font-bold text-background">
                {project.title}
              </h3>
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-background/40">
                <MapPin className="size-3.5" />
                {project.location}
              </span>
              <p className="mt-1 text-sm leading-relaxed text-background/60">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-background/50">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
