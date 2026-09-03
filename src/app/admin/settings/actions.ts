"use server";

import { revalidatePath } from "next/cache";

import { updateFooterSettings } from "@/lib/footer-settings";

export async function updateFooterSettingsAction(formData: FormData) {
  const tagline = String(formData.get("tagline") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const whatsappUrl = String(formData.get("whatsappUrl") ?? "").trim();
  const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim();
  const facebookUrl = String(formData.get("facebookUrl") ?? "").trim();
  const instagramUrl = String(formData.get("instagramUrl") ?? "").trim();

  if (!tagline || !phone || !email) {
    throw new Error("Tagline, phone and email are required");
  }

  await updateFooterSettings({
    tagline,
    phone,
    email,
    whatsappUrl,
    youtubeUrl,
    facebookUrl,
    instagramUrl,
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/projects");
}
