import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isAuthenticated } from "@/lib/server/auth";
import { deleteVideo } from "@/lib/server/videos";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteVideo(id);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/videos");

  return NextResponse.json({ ok: true });
}
