import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/server/session-token";
import { getCategories } from "@/lib/server/categories";
import { addImage, type GalleryImage } from "@/lib/server/gallery";

// multer needs the raw Node request stream, so this route has to live under
// pages/api (App Router route handlers only expose the Web Request API and
// can't be handed to Express-style middleware like multer).
export const config = {
  api: { bodyParser: false },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
});

type MulterRequest = NextApiRequest & { file?: Express.Multer.File };

// multer's RequestHandler is typed against Express's Request/Response, which
// NextApiRequest/NextApiResponse are structurally compatible with at runtime
// but not nominally - hence the `any` here (standard for this integration).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) return reject(result);
      resolve();
    });
  });
}

type ResponseBody = { image: GalleryImage } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!verifySessionToken(req.cookies[SESSION_COOKIE])) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await runMiddleware(req, res, upload.single("file"));
  } catch {
    return res.status(400).json({ error: "Upload failed (file too large or malformed)." });
  }

  const file = (req as MulterRequest).file;
  const categoryId = typeof req.body?.categoryId === "string" ? req.body.categoryId : "";
  const caption = typeof req.body?.caption === "string" ? req.body.caption : "";

  if (!file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  if (!file.mimetype.startsWith("image/")) {
    return res.status(400).json({ error: "Only image files are allowed." });
  }

  const categories = await getCategories();
  if (!categories.some((category) => category.id === categoryId)) {
    return res.status(400).json({ error: "Select a valid category." });
  }

  try {
    const image = await addImage({ categoryId, caption, buffer: file.buffer });
    return res.status(200).json({ image });
  } catch (error) {
    console.error("Failed to process upload:", error);
    return res.status(500).json({ error: "Could not process this image." });
  }
}
