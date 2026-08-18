import { NextResponse } from "next/server";

import { getImageFile } from "@/lib/server/gallery";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Defensive: ids are nanoid-generated, but never let path-y input through.
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const file = await getImageFile(id);
  if (!file) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      // "inline" (never "attachment") so the browser renders it instead of
      // offering a save dialog; this is a deterrent, not real DRM - the
      // watermark burned into the pixels is the actual protection.
      "Content-Disposition": "inline",
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
