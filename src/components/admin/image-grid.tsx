"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

import type { Category } from "@/lib/server/categories";
import type { GalleryImage } from "@/lib/server/gallery";
import { useRouter } from "next/navigation";

export function ImageGrid({
  images,
  categories,
}: {
  images: GalleryImage[];
  categories: Category[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categoryName = (id: string) =>
    categories.find((category) => category.id === id)?.name ?? id;

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo? This cannot be undone.")) return;
    setDeletingId(id);
    await fetch(`/api/admin/images/${id}`, { method: "DELETE" });
    setDeletingId(null);
    startTransition(() => router.refresh());
  };

  if (images.length === 0) {
    return (
      <p className="border border-neutral-200 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500">
        No photos uploaded yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((image) => (
        <div key={image.id} className="group relative aspect-square overflow-hidden border border-neutral-200">
          <Image
            src={`/api/images/${image.id}`}
            alt={image.caption || "Uploaded photo"}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-t from-black/85 to-transparent p-2 pt-8">
            <p className="truncate text-xs font-semibold text-white">{categoryName(image.categoryId)}</p>
            {image.caption && <p className="truncate text-[11px] text-white/60">{image.caption}</p>}
          </div>
          <button
            type="button"
            onClick={() => handleDelete(image.id)}
            disabled={(deletingId === image.id) || isPending}
            aria-label="Delete photo"
            className="absolute top-2 right-2 flex size-8 items-center justify-center bg-black/60 text-white opacity-0 transition-opacity hover:bg-[#e01f22] group-hover:opacity-100 disabled:opacity-60"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
