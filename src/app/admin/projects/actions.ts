"use server";

import { revalidatePath } from "next/cache";

import {
  createProject,
  deleteProject,
  getProjectById,
  updateProject,
  type ProjectInput,
} from "@/lib/db";
import { deleteProjectImage, saveProjectImage } from "@/lib/project-images";

function readProjectInput(formData: FormData): ProjectInput {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!title || !category || !location || !year || !description) {
    throw new Error("All fields are required");
  }

  return { title, category, location, year, description };
}

function revalidateProjectPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function createProjectAction(formData: FormData) {
  const input = readProjectInput(formData);
  const project = createProject(input);

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const imagePath = await saveProjectImage(imageFile, project.slug);
    updateProject(project.id, { ...input, image: imagePath });
  }

  revalidateProjectPages();
}

export async function updateProjectAction(id: number, formData: FormData) {
  const existing = getProjectById(id);
  if (!existing) {
    throw new Error("Project not found");
  }

  const input = readProjectInput(formData);
  let image = existing.image;

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    const newImage = await saveProjectImage(imageFile, existing.slug);
    await deleteProjectImage(existing.image);
    image = newImage;
  }

  updateProject(id, { ...input, image });
  revalidateProjectPages();
}

export async function deleteProjectAction(id: number) {
  const deleted = deleteProject(id);
  if (deleted) {
    await deleteProjectImage(deleted.image);
  }
  revalidateProjectPages();
}
