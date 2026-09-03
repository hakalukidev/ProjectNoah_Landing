"use server";

import { revalidatePath } from "next/cache";

import {
  createService,
  deleteService,
  getServiceById,
  updateService,
  type ServiceInput,
} from "@/lib/services";
import { deleteServiceImage, saveServiceImage } from "@/lib/service-images";

function readServiceInput(formData: FormData): ServiceInput {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !category || !description) {
    throw new Error("All fields are required");
  }

  return { title, category, description };
}

function revalidateServicePages() {
  revalidatePath("/admin");
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function createServiceAction(formData: FormData) {
  const input = readServiceInput(formData);
  const service = await createService(input);

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const imagePath = await saveServiceImage(imageFile, service.slug);
    await updateService(service.id, { ...input, image: imagePath });
  }

  revalidateServicePages();
}

export async function updateServiceAction(id: number, formData: FormData) {
  const existing = await getServiceById(id);
  if (!existing) {
    throw new Error("Service not found");
  }

  const input = readServiceInput(formData);
  let image = existing.image;

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const newImage = await saveServiceImage(imageFile, existing.slug);
    await deleteServiceImage(existing.image);
    image = newImage;
  }

  await updateService(id, { ...input, image });
  revalidateServicePages();
}

export async function deleteServiceAction(id: number) {
  const deleted = await deleteService(id);
  if (deleted) {
    await deleteServiceImage(deleted.image);
  }
  revalidateServicePages();
}
