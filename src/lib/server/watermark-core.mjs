import fs from "node:fs/promises";
import sharp from "sharp";
import { Resvg } from "@resvg/resvg-js";

/**
 * Shared watermark compositor.
 *
 * Kept as plain ESM (with a hand-written .d.mts alongside) so the same code
 * runs in two places without duplication: the Next server path that stamps
 * admin uploads (lib/server/watermark.ts) and the offline CLI that stamps the
 * static photos under public/ (scripts/watermark-static.mjs). The CLI can't
 * import the TS module, because that pulls in @/lib/site-config and its
 * lucide/JSX dependencies.
 */

// Font stack rather than a single family: resvg resolves the list in order
// against whatever the host actually has, so this survives both a Windows dev
// box (Arial) and a Linux deploy (Liberation/DejaVu).
const FONT_STACK =
  "Arial, Helvetica, 'Liberation Sans', 'DejaVu Sans', sans-serif";
const FONT_OPTIONS = { loadSystemFonts: true, defaultFontFamily: "Arial" };

/**
 * Long-edge cap and JPEG quality for the output. Sized for a gallery that
 * never shows a photo larger than full-screen, not for print.
 */
const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 80;

/** Alpha applied to the finished mark - a watermark, not a sticker. */
const MARK_OPACITY = 0.92;
/**
 * Fill of the plate the lockup sits on, so it reads on any photo. Kept light
 * on purpose - just enough to hold the text against a bright sky, without
 * reading as a solid label pasted over the photo.
 */
const PLATE_FILL = "rgba(10,10,12,0.24)";
const PLATE_STROKE = "rgba(255,255,255,0.14)";
/** Corner rounding, as a fraction of plate height - a small, square-ish "sm". */
const PLATE_RADIUS_RATIO = 0.06;
/** The icon gets its own light chip - its frame is black and would vanish
 *  into the dark plate otherwise. */
const CHIP_FILL = "rgba(255,255,255,0.92)";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/** Renders an SVG and crops it to its own ink, giving exact text metrics. */
function renderTight(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "original" },
    font: FONT_OPTIONS,
  });
  const bbox = resvg.getBBox();
  if (bbox) resvg.cropByBBox(bbox);
  const rendered = resvg.render();
  return {
    png: rendered.asPng(),
    width: rendered.width,
    height: rendered.height,
  };
}

/** Multiplies every alpha sample by `factor`, in place on an RGBA buffer. */
async function withOpacity(png, factor) {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) {
    data[i] = Math.round(data[i] * factor);
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

/**
 * Builds the logo + brand name + phone lockup as a standalone RGBA PNG.
 * `size` drives every dimension, so the mark scales with the photo instead
 * of being a fixed pixel block that looks huge on a thumbnail.
 */
async function buildMark({ logoPath, brandName, phone, size }) {
  const iconSize = size;
  const nameFont = Math.round(iconSize * 0.4);
  const phoneFont = Math.round(iconSize * 0.32);
  const lineGap = Math.round(nameFont * 0.42);
  const pad = Math.round(iconSize * 0.3);
  const iconGap = Math.round(iconSize * 0.3);
  const chipPad = Math.round(iconSize * 0.12);

  // Canvas is deliberately oversized; renderTight() crops it back to the ink.
  const canvasW = Math.round(
    Math.max(brandName.length, phone.length + 2) * nameFont
  );
  const canvasH = Math.round((nameFont + lineGap + phoneFont) * 2);
  const nameBaseline = Math.round(nameFont * 1.2);
  const phoneBaseline = nameBaseline + lineGap + phoneFont;

  const text = renderTight(`
    <svg width="${canvasW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="${nameBaseline}"
        font-family="${FONT_STACK}" font-weight="800"
        font-size="${nameFont}" letter-spacing="${(nameFont * 0.05).toFixed(2)}"
        fill="#ffffff">${escapeXml(brandName.toUpperCase())}</text>
      <text x="0" y="${phoneBaseline}"
        font-family="${FONT_STACK}" font-weight="600"
        font-size="${phoneFont}" letter-spacing="${(phoneFont * 0.04).toFixed(2)}"
        fill="#ffffff" fill-opacity="0.9">${escapeXml(phone)}</text>
    </svg>`);

  const contentH = Math.max(iconSize, text.height);
  const plateW = pad + iconSize + iconGap + text.width + pad;
  const plateH = pad + contentH + pad;
  const radius = Math.max(2, Math.round(plateH * PLATE_RADIUS_RATIO));
  // The chip tracks the plate's rounding so the two corners agree.
  const chipRadius = Math.max(2, Math.round(iconSize * PLATE_RADIUS_RATIO));

  const chipTop = pad + Math.round((contentH - iconSize) / 2);
  const plate = renderTight(`
    <svg width="${plateW}" height="${plateH}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="${plateW - 1}" height="${plateH - 1}"
        rx="${radius}" ry="${radius}"
        fill="${PLATE_FILL}" stroke="${PLATE_STROKE}"
        stroke-width="${Math.max(1, Math.round(iconSize * 0.02))}"/>
      <rect x="${pad}" y="${chipTop}" width="${iconSize}" height="${iconSize}"
        rx="${chipRadius}" ry="${chipRadius}"
        fill="${CHIP_FILL}"/>
    </svg>`);

  const iconInner = iconSize - chipPad * 2;
  const icon = await sharp(await fs.readFile(logoPath))
    .ensureAlpha()
    .resize(iconInner, iconInner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const composed = await sharp(plate.png)
    .composite([
      { input: icon, left: pad + chipPad, top: chipTop + chipPad },
      {
        input: text.png,
        left: pad + iconSize + iconGap,
        top: pad + Math.round((contentH - text.height) / 2),
      },
    ])
    .png()
    .toBuffer();

  return { png: await withOpacity(composed, MARK_OPACITY), width: plateW };
}

/**
 * Burns the logo + brand name + phone lockup into the bottom-right corner of
 * a photo, so any copy that leaves the site - screenshot, save-as, scrape -
 * still carries it. Output is always a JPEG with EXIF dropped.
 */
export async function watermarkBuffer(
  input,
  { logoPath, brandName, phone }
) {
  // Normalise EXIF orientation and cap the long edge before compositing.
  // Phone uploads arrive at 2048px+, which is far more than the gallery ever
  // displays; re-encoding them at full size turns an already-compressed 280KB
  // photo into well over a megabyte. Capping first also means the watermark is
  // sized against the dimensions that actually ship.
  const normalised = await sharp(input)
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .toBuffer();

  const source = sharp(normalised);
  const metadata = await source.metadata();
  const width = metadata.width ?? 1600;
  const height = metadata.height ?? 1200;

  const base = Math.min(width, height);
  // Driven off the short edge so the mark keeps the same visual weight on a
  // square 2048px upload and a narrow phone portrait. The floor keeps the
  // phone number readable on small photos; the ceiling stops it ballooning
  // on very large ones.
  const size = clamp(Math.round(base * 0.072), 30, 130);
  const mark = await buildMark({ logoPath, brandName, phone, size });

  // On a very narrow photo the natural lockup can outgrow the frame; shrink
  // it to fit rather than letting sharp reject an out-of-bounds composite.
  const maxWidth = Math.round(width * 0.92);
  const markPng =
    mark.width > maxWidth
      ? await sharp(mark.png).resize({ width: maxWidth }).png().toBuffer()
      : mark.png;

  const markMeta = await sharp(markPng).metadata();
  const markW = markMeta.width ?? mark.width;
  const markH = markMeta.height ?? 0;

  const margin = Math.round(base * 0.028);
  const buffer = await source
    .composite([
      {
        input: markPng,
        left: Math.max(0, width - margin - markW),
        top: Math.max(0, height - margin - markH),
        blend: "over",
      },
    ])
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  return { buffer, width, height };
}
