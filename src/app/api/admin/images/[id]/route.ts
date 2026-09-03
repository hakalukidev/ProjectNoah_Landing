import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import { deleteImage } from "@/lib/server/gallery";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteImage(id);

  revalidatePath("/");
  revalidatePath("/works");
  revalidatePath("/admin/images");

  return NextResponse.json({ ok: true });
}
