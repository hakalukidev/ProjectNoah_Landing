import fs from "node:fs";
import fsp from "node:fs/promises";
import { NextResponse } from "next/server";

import { getVideoFilePath, getVideoRecord } from "@/lib/server/videos";

const MIME_TYPES: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  ogv: "video/ogg",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Defensive: ids are nanoid-generated, but never let path-y input through.
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const [record, filePath] = await Promise.all([getVideoRecord(id), getVideoFilePath(id)]);
  if (!record || !filePath) {
    return new NextResponse("Not found", { status: 404 });
  }

  const stat = await fsp.stat(filePath);
  const contentType = MIME_TYPES[record.extension] ?? record.mimeType ?? "video/mp4";

  const baseHeaders = {
    "Content-Type": contentType,
    // "inline" so the browser plays it instead of offering a save dialog.
    "Content-Disposition": "inline",
    "Cache-Control": "private, max-age=3600",
    "X-Content-Type-Options": "nosniff",
    "Accept-Ranges": "bytes",
  };

  // <video> relies on Range requests to seek/scrub - without honoring them
  // the browser has to buffer the whole file before it can jump ahead.
  const range = request.headers.get("range");
  if (!range) {
    const buffer = await fsp.readFile(filePath);
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: { ...baseHeaders, "Content-Length": String(stat.size) },
    });
  }

  const match = /bytes=(\d*)-(\d*)/.exec(range);
  const start = match?.[1] ? parseInt(match[1], 10) : 0;
  const end = match?.[2] ? parseInt(match[2], 10) : stat.size - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= stat.size) {
    return new NextResponse(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${stat.size}` },
    });
  }

  const chunkSize = end - start + 1;
  const nodeStream = fs.createReadStream(filePath, { start, end });
  const stream = new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk) => controller.enqueue(new Uint8Array(chunk as Buffer)));
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (error) => controller.error(error));
    },
    cancel() {
      nodeStream.destroy();
    },
  });

  return new NextResponse(stream, {
    status: 206,
    headers: {
      ...baseHeaders,
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Content-Length": String(chunkSize),
    },
  });
}
