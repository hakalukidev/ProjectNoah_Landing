import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isAuthenticated } from "@/lib/server/auth";
import { deleteImage } from "@/lib/server/gallery";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteImage(id);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/images");

  return NextResponse.json({ ok: true });
}
