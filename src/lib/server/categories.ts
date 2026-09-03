import fs from "node:fs/promises";
import path from "node:path";

export type Category = {
  id: string;
  name: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");

const DEFAULT_CATEGORIES: Category[] = [
  { id: "roofing-shelter", name: "Roofing" },
  { id: "steel-fabrication", name: "Steel" },
  { id: "facade-renovation", name: "Glass" },
];

async function readAll(): Promise<Category[]> {
  try {
    const raw = await fs.readFile(CATEGORIES_FILE, "utf-8");
    return JSON.parse(raw) as Category[];
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

async function writeAll(categories: Category[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2), "utf-8");
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getCategories(): Promise<Category[]> {
  return readAll();
}

export async function addCategory(name: string): Promise<Category> {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Category name is required.");
  }

  const categories = await readAll();
  const id = slugify(trimmed) || `category-${Date.now()}`;

  if (categories.some((category) => category.id === id)) {
    throw new Error("A category with this name already exists.");
  }

  const record: Category = { id, name: trimmed };
  await writeAll([...categories, record]);
  return record;
}

export async function deleteCategory(id: string): Promise<void> {
  const categories = await readAll();
  await writeAll(categories.filter((category) => category.id !== id));
}
