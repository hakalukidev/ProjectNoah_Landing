import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

import { watermarkImage } from "@/lib/server/watermark";

export type GalleryImage = {
  id: string;
  categoryId: string;
  caption: string;
  width: number;
  height: number;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const IMAGES_FILE = path.join(DATA_DIR, "images.json");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

async function readAll(): Promise<GalleryImage[]> {
  try {
    const raw = await fs.readFile(IMAGES_FILE, "utf-8");
    return JSON.parse(raw) as GalleryImage[];
  } catch {
    return [];
  }
}

async function writeAll(images: GalleryImage[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(IMAGES_FILE, JSON.stringify(images, null, 2), "utf-8");
}

function filePathFor(id: string): string {
  return path.join(UPLOADS_DIR, `${id}.jpg`);
}

export async function getImages(): Promise<GalleryImage[]> {
  const images = await readAll();
  return images.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getImagesByCategory(categoryId: string): Promise<GalleryImage[]> {
  const images = await getImages();
  return images.filter((image) => image.categoryId === categoryId);
}

/** Watermarks the uploaded photo and persists it + its metadata. */
export async function addImage({
  categoryId,
  caption,
  buffer,
}: {
  categoryId: string;
  caption: string;
  buffer: Buffer;
}): Promise<GalleryImage> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const { buffer: watermarked, width, height } = await watermarkImage(buffer);
  const id = nanoid(12);
  await fs.writeFile(filePathFor(id), watermarked);

  const record: GalleryImage = {
    id,
    categoryId,
    caption: caption.trim(),
    width,
    height,
    createdAt: new Date().toISOString(),
  };

  const images = await readAll();
  images.push(record);
  await writeAll(images);

  return record;
}

export async function deleteImage(id: string): Promise<void> {
  const images = await readAll();
  await writeAll(images.filter((image) => image.id !== id));
  await fs.rm(filePathFor(id), { force: true });
}

/** Reads the already-watermarked file for the /api/images/[id] route. */
export async function getImageFile(id: string): Promise<Buffer | null> {
  try {
    return await fs.readFile(filePathFor(id));
  } catch {
    return null;
  }
}
