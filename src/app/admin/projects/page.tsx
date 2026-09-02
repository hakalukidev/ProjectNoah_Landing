import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import {
  Card,
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
import { PROJECTS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projects",
};

export default function AdminProjectsPage() {
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
          <CardDescription>{PROJECTS.length} total entries.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROJECTS.map((project) => (
                <TableRow key={project.slug}>
                  <TableCell className="font-medium">
                    {project.title}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
