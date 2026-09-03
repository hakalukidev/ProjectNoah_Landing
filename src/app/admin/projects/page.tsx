import type { Metadata } from "next";
import Image from "next/image";
import { FolderKanban } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProjects } from "@/lib/db";
import { DeleteProjectButton } from "./delete-project-button";
import { ProjectFormSheet } from "./project-form-sheet";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Portfolio entries shown on the public Projects page.
        </p>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-foreground/5">
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>{projects.length} total entries.</CardDescription>
          <CardAction>
            <ProjectFormSheet />
          </CardAction>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <FolderKanban className="size-4" />
                        )}
                      </div>
                      {project.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{project.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.location}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {project.year}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <ProjectFormSheet project={project} />
                      <DeleteProjectButton
                        id={project.id}
                        title={project.title}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {projects.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              No projects yet. Add your first one above.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
