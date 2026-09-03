import { count, eq, ne, and } from "drizzle-orm";

import { PROJECTS as SEED_PROJECTS } from "@/lib/site-config";
import { projects } from "@/lib/schema";
import { db } from "@/lib/db-client";

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string | null;
};

let seeded = false;

async function ensureSeeded() {
  if (seeded) return;
  seeded = true;

  const [{ value }] = await db.select({ value: count() }).from(projects);
  if (value > 0) return;

  await db.insert(projects).values(
    SEED_PROJECTS.map((project, index) => ({
      ...project,
      image: null,
      position: index + 1,
    }))
  );
}

export async function getProjects(): Promise<Project[]> {
  await ensureSeeded();
  return db.select().from(projects).orderBy(projects.position);
}

export async function getProjectById(
  id: number
): Promise<Project | undefined> {
  await ensureSeeded();
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id));
  return project;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(title: string, ignoreId?: number) {
  const base = slugify(title) || "project";
  let slug = base;
  let suffix = 2;

  while (true) {
    const where = ignoreId
      ? and(eq(projects.slug, slug), ne(projects.id, ignoreId))
      : eq(projects.slug, slug);
    const [existing] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(where);
    if (!existing) break;
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export type ProjectInput = {
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image?: string | null;
};

export async function createProject(input: ProjectInput): Promise<Project> {
  await ensureSeeded();
  const slug = await uniqueSlug(input.title);
  const [lowest] = await db
    .select({ minPosition: projects.position })
    .from(projects)
    .orderBy(projects.position)
    .limit(1);
  const position = (lowest?.minPosition ?? 1) - 1;

  const [project] = await db
    .insert(projects)
    .values({
      slug,
      title: input.title,
      category: input.category,
      location: input.location,
      year: input.year,
      description: input.description,
      image: input.image ?? null,
      position,
    })
    .returning();

  return project;
}

export async function updateProject(
  id: number,
  input: ProjectInput & { image?: string | null }
): Promise<Project> {
  const existing = await getProjectById(id);
  if (!existing) {
    throw new Error(`Project ${id} not found`);
  }

  const slug =
    input.title === existing.title
      ? existing.slug
      : await uniqueSlug(input.title, id);

  const [project] = await db
    .update(projects)
    .set({
      slug,
      title: input.title,
      category: input.category,
      location: input.location,
      year: input.year,
      description: input.description,
      image: input.image !== undefined ? input.image : existing.image,
    })
    .where(eq(projects.id, id))
    .returning();

  return project;
}

export async function deleteProject(
  id: number
): Promise<Project | undefined> {
  const [deleted] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning();
  return deleted;
}
