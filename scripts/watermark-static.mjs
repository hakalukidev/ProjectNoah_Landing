/**
 * Burns the Project Noah watermark into the static photos under public/.
 *
 * Admin-uploaded gallery photos are watermarked on upload by
 * src/lib/server/gallery.ts, but the works mosaic and site-photo gallery are
 * plain files served straight out of public/ - this stamps those too, so every
 * project photo on the site carries the mark.
 *
 * Run with:  npm run watermark:photos
 *
 * Pristine originals are copied to .watermark-originals/ (repo root, ignored
 * by git) BEFORE anything is overwritten, and every later run re-stamps from
 * that copy. So the script is idempotent - running it twice does not stack two
 * watermarks - and restoring is just copying the folder back.
 *
 * The backup deliberately lives outside public/: anything under public/ is
 * served, so an un-watermarked copy there would be one URL guess away.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { watermarkBuffer } from "../src/lib/server/watermark-core.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BACKUP_DIR = path.join(ROOT, ".watermark-originals");
const LOGO_PATH = path.join(ROOT, "public", "logo-icon.png");

/**
 * Folders under public/ holding project photography. `projects` is the leftover
 * drop from the old projects section - nothing renders it any more, but the
 * files are still tracked and still served, so they get stamped too rather
 * than sitting there as un-watermarked originals one URL guess away.
 */
const TARGETS = ["works", "site-photos", "project_images", "projects"];
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

/**
 * public/project_images is a bulk drop of site photography whose filenames
 * carry the service they belong to (`glass-aluminium-works-07.jpeg`). This
 * maps that prefix onto a gallery caption and one of the three gallery
 * category ids from lib/server/categories.ts (roofing-shelter /
 * steel-fabrication / facade-renovation).
 *
 * Mirrors the slug -> category pairing in SERVICES in site-config.ts; keep the
 * two in sync. An unrecognised prefix is a hard error rather than a silent
 * default, so a newly dropped batch cannot quietly file itself under the wrong
 * tab or land in the gallery with a wrong caption.
 */
const SERVICE_PHOTO_GROUPS = {
  "roofing-systems": { categoryId: "roofing-shelter", caption: "Roofing Systems" },
  "canopy-shelter": { categoryId: "roofing-shelter", caption: "Canopy & Shelter Installation" },
  "awning-solutions": { categoryId: "roofing-shelter", caption: "Awning Solutions" },
  "waterproofing-roof-repairs": { categoryId: "roofing-shelter", caption: "Waterproofing & Roof Repairs" },
  "gutter-drainage-systems": { categoryId: "roofing-shelter", caption: "Gutter & Drainage Systems" },
  "steel-metal-fabrication": { categoryId: "steel-fabrication", caption: "Steel & Metal Fabrication" },
  "structural-steel-works": { categoryId: "steel-fabrication", caption: "Structural Steel Works" },
  "custom-fabrication": { categoryId: "steel-fabrication", caption: "Custom Fabrication & Installation" },
  "glass-aluminium-works": { categoryId: "facade-renovation", caption: "Glass & Aluminium Works" },
  "acp-cladding": { categoryId: "facade-renovation", caption: "ACP Cladding" },
  "renovation-maintenance": { categoryId: "facade-renovation", caption: "Renovation & Maintenance" },
};

/**
 * Files kept out of the gallery manifest. `unsorted-01` is a photo of a phone
 * screen mid-upload ("150 items selected"), not site work. Excluded here
 * rather than deleted, so the file itself is left alone.
 */
const MANIFEST_EXCLUDE = new Set(["unsorted-01.jpeg"]);

/** Generated gallery manifest, imported by site-config.ts. */
const MANIFEST_FILE = path.join(ROOT, "src", "lib", "project-photos.json");
const MANIFEST_SOURCE_DIR = "project_images";

/**
 * Reads the brand name and phone straight out of site-config.ts rather than
 * hardcoding them, so the stamp can never drift from what the site shows.
 * A plain regex read - importing the module would drag in lucide and JSX.
 */
/** `key: "value"` - deliberately backslash-free so it stays readable. */
const VALUE_AFTER_KEY = ':[^"]*"([^"]+)"';

async function readBrand() {
  const source = await fs.readFile(
    path.join(ROOT, "src", "lib", "site-config.ts"),
    "utf-8"
  );
  const find = (key) => {
    const match = source.match(new RegExp(key + VALUE_AFTER_KEY));
    if (!match) throw new Error(`Could not read company.${key} from site-config.ts`);
    return match[1];
  };
  return { brandName: find("brandName"), phone: find("phone") };
}

async function main() {
  const { brandName, phone } = await readBrand();
  console.log(`Watermarking as "${brandName}" / ${phone}\n`);

  let stamped = 0;
  const manifest = [];
  for (const target of TARGETS) {
    const dir = path.join(ROOT, "public", target);
    const backupDir = path.join(BACKUP_DIR, target);

    let entries;
    try {
      entries = await fs.readdir(dir);
    } catch {
      console.log(`- public/${target}: not found, skipping`);
      continue;
    }

    await fs.mkdir(backupDir, { recursive: true });

    for (const entry of entries) {
      if (!EXTENSIONS.has(path.extname(entry).toLowerCase())) continue;

      const filePath = path.join(dir, entry);
      const backupPath = path.join(backupDir, entry);

      // First run: stash the pristine original. Later runs: re-stamp from it,
      // so the watermark never gets applied on top of itself.
      let original;
      try {
        original = await fs.readFile(backupPath);
      } catch {
        original = await fs.readFile(filePath);
        await fs.writeFile(backupPath, original);
      }

      const { buffer, width, height } = await watermarkBuffer(original, {
        logoPath: LOGO_PATH,
        brandName,
        phone,
      });
      await fs.writeFile(filePath, buffer);
      stamped += 1;

      if (target === MANIFEST_SOURCE_DIR && !MANIFEST_EXCLUDE.has(entry)) {
        const id = path.basename(entry, path.extname(entry));
        // Strip the trailing sequence number to get the service slug.
        const group = SERVICE_PHOTO_GROUPS[id.replace(/-\d+$/, "")];
        if (!group) {
          throw new Error(
            `No SERVICE_PHOTO_GROUPS entry for "${entry}". Add its slug to ` +
              `the map in this script, or list it in MANIFEST_EXCLUDE.`
          );
        }
        // width/height come from watermarkBuffer, not the file on disk, so
        // they reflect the post-EXIF-rotation orientation the browser sees.
        // The gallery uses them for the lightbox, so a swapped pair here
        // would letterbox the photo.
        manifest.push({
          id,
          categoryId: group.categoryId,
          src: `/${target}/${entry}`,
          caption: group.caption,
          width,
          height,
        });
      }
    }
  }

  // Sorted by id so the file has a stable order and a re-run produces no
  // spurious diff when the filesystem hands back a different readdir order.
  manifest.sort((a, b) => a.id.localeCompare(b.id));
  await fs.writeFile(
    MANIFEST_FILE,
    JSON.stringify(manifest, null, 2) + "\n",
    "utf-8"
  );

  console.log(
    `\nDone - ${stamped} photo(s) watermarked.` +
      `\nGallery manifest: ${path.relative(ROOT, MANIFEST_FILE)} (${manifest.length} photos)` +
      `\nOriginals: ${path.relative(ROOT, BACKUP_DIR)}/ (git-ignored)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
