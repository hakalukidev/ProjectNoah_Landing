import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

import { PROJECTS as SEED_PROJECTS } from "@/lib/site-config";

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

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "app.db");

declare global {
  var __projectNoahDb: Database.Database | undefined;
}

function openDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT NOT NULL,
      year TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      position INTEGER NOT NULL
    )
  `);

  const { count } = db
    .prepare("SELECT COUNT(*) AS count FROM projects")
    .get() as { count: number };

  if (count === 0) {
    const insert = db.prepare(
      `INSERT INTO projects (slug, title, category, location, year, description, image, position)
       VALUES (@slug, @title, @category, @location, @year, @description, @image, @position)`
    );
    const seed = db.transaction(() => {
      SEED_PROJECTS.forEach((project, index) => {
        insert.run({ ...project, image: null, position: index + 1 });
      });
    });
    seed();
  }

  return db;
}

const db = globalThis.__projectNoahDb ?? openDb();
if (process.env.NODE_ENV !== "production") {
  globalThis.__projectNoahDb = db;
}

export function getProjects(): Project[] {
  return db
    .prepare("SELECT * FROM projects ORDER BY position ASC")
    .all() as Project[];
}

export function getProjectById(id: number): Project | undefined {
  return db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as
    | Project
    | undefined;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(title: string, ignoreId?: number) {
  const base = slugify(title) || "project";
  let slug = base;
  let suffix = 2;
  while (
    db
      .prepare(
        ignoreId
          ? "SELECT id FROM projects WHERE slug = ? AND id != ?"
          : "SELECT id FROM projects WHERE slug = ?"
      )
      .get(...(ignoreId ? [slug, ignoreId] : [slug]))
  ) {
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

export function createProject(input: ProjectInput): Project {
  const slug = uniqueSlug(input.title);
  const { minPosition } = db
    .prepare("SELECT MIN(position) AS minPosition FROM projects")
    .get() as { minPosition: number | null };
  const position = (minPosition ?? 1) - 1;

  const result = db
    .prepare(
      `INSERT INTO projects (slug, title, category, location, year, description, image, position)
       VALUES (@slug, @title, @category, @location, @year, @description, @image, @position)`
    )
    .run({
      slug,
      title: input.title,
      category: input.category,
      location: input.location,
      year: input.year,
      description: input.description,
      image: input.image ?? null,
      position,
    });

  return getProjectById(Number(result.lastInsertRowid))!;
}

export function updateProject(
  id: number,
  input: ProjectInput & { image?: string | null }
): Project {
  const existing = getProjectById(id);
  if (!existing) {
    throw new Error(`Project ${id} not found`);
  }

  const slug =
    input.title === existing.title
      ? existing.slug
      : uniqueSlug(input.title, id);

  db.prepare(
    `UPDATE projects
     SET slug = @slug, title = @title, category = @category, location = @location,
         year = @year, description = @description, image = @image
     WHERE id = @id`
  ).run({
    id,
    slug,
    title: input.title,
    category: input.category,
    location: input.location,
    year: input.year,
    description: input.description,
    image: input.image !== undefined ? input.image : existing.image,
  });

  return getProjectById(id)!;
}

export function deleteProject(id: number): Project | undefined {
  const existing = getProjectById(id);
  db.prepare("DELETE FROM projects WHERE id = ?").run(id);
  return existing;
}
