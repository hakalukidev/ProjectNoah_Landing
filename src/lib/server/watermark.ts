import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";

import { company } from "@/lib/site-config";

const LOGO_PATH = path.join(process.cwd(), "public", "logo-icon.png");
const LOGO_OPACITY = 0.55; // keep the watermark visible but let the photo show through

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Burns the company logo + phone number into the centre of an uploaded
 * photo, so any copy that leaves the site (screenshot, save-as, etc.)
 * still carries the watermark. Output is always a JPEG.
 */
export async function watermarkImage(
  input: Buffer
): Promise<{ buffer: Buffer; width: number; height: number }> {
  const source = sharp(input).rotate(); // normalise EXIF orientation first
  const metadata = await source.metadata();
  const width = metadata.width ?? 1600;
  const height = metadata.height ?? 1200;

  const markWidth = Math.round(Math.min(width, height) * 0.42);
  const logoSize = Math.round(markWidth * 0.34);
  const fontSize = Math.max(18, Math.round(markWidth * 0.1));
  const gap = Math.round(fontSize * 0.6);

  const logoRaw = await sharp(await fs.readFile(LOGO_PATH))
    .resize(logoSize, logoSize, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Scale down the alpha channel so the logo blends into the photo instead
  // of sitting on top of it at full strength.
  for (let i = 3; i < logoRaw.data.length; i += 4) {
    logoRaw.data[i] = Math.round(logoRaw.data[i] * LOGO_OPACITY);
  }

  const logoBuffer = await sharp(logoRaw.data, {
    raw: {
      width: logoRaw.info.width,
      height: logoRaw.info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  const phone = escapeXml(company.phone);
  const textSvg = `
    <svg width="${markWidth}" height="${Math.round(fontSize * 1.5)}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50%" y="70%"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-weight="700"
        font-size="${fontSize}"
        fill="rgba(255,255,255,0.92)"
        stroke="rgba(0,0,0,0.6)"
        stroke-width="${Math.max(2, Math.round(fontSize * 0.09))}"
        paint-order="stroke"
      >${phone}</text>
    </svg>`;

  const textPng = new Resvg(textSvg, { fitTo: { mode: "original" } })
    .render()
    .asPng();
  const textMeta = await sharp(textPng).metadata();
  const textWidth = textMeta.width ?? markWidth;
  const textHeight = textMeta.height ?? Math.round(fontSize * 1.5);

  const markHeight = logoSize + gap + textHeight;

  const finalBuffer = await source
    .composite([
      {
        input: logoBuffer,
        left: Math.round((width - logoSize) / 2),
        top: Math.round((height - markHeight) / 2),
        blend: "over",
      },
      {
        input: textPng,
        left: Math.round((width - textWidth) / 2),
        top: Math.round((height - markHeight) / 2 + logoSize + gap),
        blend: "over",
      },
    ])
    .jpeg({ quality: 88 })
    .toBuffer();

  return { buffer: finalBuffer, width, height };
}
