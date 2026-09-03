import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import { deleteVideo } from "@/lib/server/videos";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteVideo(id);

  revalidatePath("/");
  revalidatePath("/works");
  revalidatePath("/admin/videos");

  return NextResponse.json({ ok: true });
}
