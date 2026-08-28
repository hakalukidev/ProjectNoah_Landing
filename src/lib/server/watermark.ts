import path from "node:path";

import { company } from "@/lib/site-config";
import { watermarkBuffer } from "@/lib/server/watermark-core.mjs";

// The transparent mark-only icon, not public/logo.png - that one is a full
// lockup baked onto an opaque white background, which would composite as a
// white box over the photo.
const LOGO_PATH = path.join(process.cwd(), "public", "logo-icon.png");

/**
 * Burns the Project Noah logo, name and phone number into the bottom-right
 * corner of an uploaded photo. Called on upload (lib/server/gallery.ts), so
 * only the watermarked file is ever written to disk - the original is never
 * persisted and cannot be served by mistake.
 */
export async function watermarkImage(
  input: Buffer
): Promise<{ buffer: Buffer; width: number; height: number }> {
  return watermarkBuffer(input, {
    logoPath: LOGO_PATH,
    brandName: company.brandName,
    phone: company.phone,
  });
}
