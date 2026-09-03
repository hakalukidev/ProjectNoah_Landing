import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjects } from "@/lib/db";

export async function ProjectsPreview() {
  const featured = (await getProjects()).slice(0, 3);

  return (
    <section id="projects" className="scroll-mt-30 bg-muted/40 py-20 sm:py-28">
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
          {featured.map((project) => (
            <Card
              key={project.slug}
              className="group/project rounded-none border border-border bg-card p-0 ring-0 transition-shadow hover:shadow-lg"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-foreground">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
                <span className="absolute top-4 left-4 rounded-none bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                  {project.category}
                </span>
                {!project.image && (
                  <span className="px-8 text-center text-2xl font-extrabold tracking-tight text-background/10 transition-colors group-hover/project:text-background/20">
                    {project.year}
                  </span>
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
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
