import { eq, ne, and } from "drizzle-orm";

import { SERVICES as SEED_SERVICES } from "@/lib/site-config";
import { services } from "@/lib/schema";
import { db } from "@/lib/db-client";

export type Service = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
};

let seeded = false;

async function ensureSeeded() {
  if (seeded) return;
  seeded = true;

  const existing = await db.select({ id: services.id }).from(services).limit(1);
  if (existing.length > 0) return;

  await db.insert(services).values(
    SEED_SERVICES.map((service, index) => ({
      slug: service.slug,
      title: service.title,
      category: service.category,
      description: service.description,
      image: null,
      position: index + 1,
    }))
  );
}

export async function getServices(): Promise<Service[]> {
  await ensureSeeded();
  return db.select().from(services).orderBy(services.position);
}

export async function getServiceById(id: number): Promise<Service | undefined> {
  await ensureSeeded();
  const [service] = await db.select().from(services).where(eq(services.id, id));
  return service;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(title: string, ignoreId?: number) {
  const base = slugify(title) || "service";
  let slug = base;
  let suffix = 2;

  while (true) {
    const where = ignoreId
      ? and(eq(services.slug, slug), ne(services.id, ignoreId))
      : eq(services.slug, slug);
    const [existing] = await db
      .select({ id: services.id })
      .from(services)
      .where(where);
    if (!existing) break;
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export type ServiceInput = {
  title: string;
  category: string;
  description: string;
  image?: string | null;
};

export async function createService(input: ServiceInput): Promise<Service> {
  await ensureSeeded();
  const slug = await uniqueSlug(input.title);
  const [lowest] = await db
    .select({ minPosition: services.position })
    .from(services)
    .orderBy(services.position)
    .limit(1);
  const position = (lowest?.minPosition ?? 1) - 1;

  const [service] = await db
    .insert(services)
    .values({
      slug,
      title: input.title,
      category: input.category,
      description: input.description,
      image: input.image ?? null,
      position,
    })
    .returning();

  return service;
}

export async function updateService(
  id: number,
  input: ServiceInput & { image?: string | null }
): Promise<Service> {
  const existing = await getServiceById(id);
  if (!existing) {
    throw new Error(`Service ${id} not found`);
  }

  const slug =
    input.title === existing.title
      ? existing.slug
      : await uniqueSlug(input.title, id);

  const [service] = await db
    .update(services)
    .set({
      slug,
      title: input.title,
      category: input.category,
      description: input.description,
      image: input.image !== undefined ? input.image : existing.image,
    })
    .where(eq(services.id, id))
    .returning();

  return service;
}

export async function deleteService(id: number): Promise<Service | undefined> {
  const [deleted] = await db.delete(services).where(eq(services.id, id)).returning();
  return deleted;
}
