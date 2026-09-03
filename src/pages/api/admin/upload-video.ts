import type { NextApiRequest, NextApiResponse } from "next";
import path from "node:path";
import multer from "multer";

import { COOKIE_NAME, decrypt } from "@/lib/session";
import { addVideo, type ProjectVideo } from "@/lib/server/videos";

// multer needs the raw Node request stream, so this route has to live under
// pages/api (App Router route handlers only expose the Web Request API and
// can't be handed to Express-style middleware like multer).
export const config = {
  api: { bodyParser: false },
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
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

const MIME_EXTENSIONS: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
  "video/ogg": "ogv",
};

type ResponseBody = { video: ProjectVideo } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!(await decrypt(req.cookies[COOKIE_NAME]))) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await runMiddleware(req, res, upload.single("file"));
  } catch {
    return res.status(400).json({ error: "Upload failed (file too large or malformed)." });
  }

  const file = (req as MulterRequest).file;
  const caption = typeof req.body?.caption === "string" ? req.body.caption : "";

  if (!file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  if (!file.mimetype.startsWith("video/")) {
    return res.status(400).json({ error: "Only video files are allowed." });
  }

  const extension =
    MIME_EXTENSIONS[file.mimetype] ??
    path.extname(file.originalname).replace(".", "").toLowerCase() ??
    "mp4";

  try {
    const video = await addVideo({
      caption,
      buffer: file.buffer,
      mimeType: file.mimetype,
      extension: extension || "mp4",
    });
    return res.status(200).json({ video });
  } catch (error) {
    console.error("Failed to process video upload:", error);
    return res.status(500).json({ error: "Could not process this video." });
  }
}
