import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BYTES = 5 * 1024 * 1024;

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

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

  const ext = ALLOWED_TYPES[file.type];
  const filename = `${slug}-${Date.now()}.${ext}`;
  const dir = path.join(UPLOAD_ROOT, "projects");

  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/projects/${filename}`;
}

export async function deleteProjectImage(imagePath: string | null | undefined) {
  if (!imagePath || !imagePath.startsWith("/uploads/projects/")) return;

  const filename = path.basename(imagePath);
  const filePath = path.join(UPLOAD_ROOT, "projects", filename);
  if (path.dirname(filePath) !== path.join(UPLOAD_ROOT, "projects")) return;

  await unlink(filePath).catch(() => {});
}
