import { del, put } from "@vercel/blob";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const MAX_BYTES = 5 * 1024 * 1024;

export async function saveServiceImage(
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
  const filename = `services/${slug}-${Date.now()}.${ext}`;

  const blob = await put(filename, file, {
    access: "public",
    contentType: file.type,
  });

  return blob.url;
}

export async function deleteServiceImage(imagePath: string | null | undefined) {
  if (!imagePath) return;
  await del(imagePath).catch(() => {});
}
