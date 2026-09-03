"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Project } from "@/lib/db";
import { createProjectAction, updateProjectAction } from "./actions";

const CATEGORIES = ["Industrial", "Commercial", "Institutional", "A&A Works"];

export function ProjectFormSheet({ project }: { project?: Project }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        if (project) {
          await updateProjectAction(project.id, formData);
        } else {
          await createProjectAction(formData);
        }
        setOpen(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setError(null);
      }}
    >
      {project ? (
        <SheetTrigger render={<Button variant="ghost" size="icon-sm" />}>
          <Pencil />
          <span className="sr-only">Edit project</span>
        </SheetTrigger>
      ) : (
        <SheetTrigger render={<Button size="sm" />}>
          <Plus data-icon="inline-start" />
          New Project
        </SheetTrigger>
      )}
      <SheetContent className="flex flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{project ? "Edit Project" : "New Project"}</SheetTitle>
          <SheetDescription>
            {project
              ? "Update this project's details."
              : "Add a new entry to the projects portfolio."}
          </SheetDescription>
        </SheetHeader>

        <form
          action={handleSubmit}
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-4"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={project?.title}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              defaultValue={project?.category ?? CATEGORIES[0]}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                required
                defaultValue={project?.location}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                required
                defaultValue={project?.year}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              rows={4}
              defaultValue={project?.description}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="image">Image</Label>
            {project?.image && (
              <div className="relative mb-1 h-32 w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
            />
            <p className="text-xs text-muted-foreground">
              JPEG, PNG or WebP, up to 5MB.
              {project?.image ? " Leave empty to keep the current image." : ""}
            </p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <SheetFooter className="mt-auto flex-row justify-end gap-2 px-0">
            <SheetClose render={<Button type="button" variant="outline" />}>
              Cancel
            </SheetClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
