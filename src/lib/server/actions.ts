"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createSession,
  destroySession,
  verifyCredentials,
} from "@/lib/server/auth";
import { addCategory, deleteCategory } from "@/lib/server/categories";
import { updateContactInfo, type ContactInfo } from "@/lib/server/contact";

export type ActionState = { error?: string } | undefined;

export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyCredentials(username, password)) {
    return { error: "Incorrect username or password." };
  }

  await createSession();
  redirect("/admin/images");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

export async function addCategoryAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "");

  try {
    await addCategory(name);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not add category." };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/images");
  revalidatePath("/");
  revalidatePath("/projects");
  return undefined;
}

export async function deleteCategoryAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (id) {
    await deleteCategory(id);
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/images");
  revalidatePath("/");
  revalidatePath("/projects");
}

export async function updateContactAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data: ContactInfo = {
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    whatsapp: String(formData.get("whatsapp") ?? "").trim(),
    address: {
      line1: String(formData.get("addressLine1") ?? "").trim(),
      line2: String(formData.get("addressLine2") ?? "").trim(),
      postalCode: String(formData.get("postalCode") ?? "").trim(),
    },
    social: {
      youtube: String(formData.get("youtube") ?? "").trim(),
      facebook: String(formData.get("facebook") ?? "").trim(),
      instagram: String(formData.get("instagram") ?? "").trim(),
    },
  };

  if (!data.phone || !data.email) {
    return { error: "Phone and email are required." };
  }

  await updateContactInfo(data);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/contact");
  return undefined;
}
