import fs from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "projects");
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BYTES = 5 * 1024 * 1024;

export async function saveProjectImage(
  file: File,
  slug: string
): Promise<string> {
  if (!(file.type in ALLOWED_TYPES)) {
    throw new Error("Image must be a JPEG, PNG, or WebP file");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be smaller than 5MB");
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const ext = ALLOWED_TYPES[file.type];
  const filename = `${slug}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/projects/${filename}`;
}

export async function deleteProjectImage(imagePath: string | null | undefined) {
  if (!imagePath || !imagePath.startsWith("/uploads/projects/")) {
    return;
  }
  const filePath = path.join(process.cwd(), "public", imagePath);
  await fs.unlink(filePath).catch(() => {});
}
