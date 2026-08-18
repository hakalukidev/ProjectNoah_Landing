"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

import type { Category } from "@/lib/server/categories";

const HEIC_TYPES = ["image/heic", "image/heif"];

async function toUploadableFile(file: File): Promise<File> {
  const isHeic =
    HEIC_TYPES.includes(file.type) || /\.hei[cf]$/i.test(file.name);
  if (!isHeic) return file;

  // iPhones default to HEIC; convert client-side so "any type of photo" works.
  const heic2any = (await import("heic2any")).default;
  const converted = (await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 })) as Blob;
  return new File([converted], file.name.replace(/\.hei[cf]$/i, ".jpg"), {
    type: "image/jpeg",
  });
}

export function ImageUploader({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const files = inputRef.current?.files;
    if (!files || files.length === 0) {
      setError("Choose at least one photo.");
      return;
    }
    if (!categoryId) {
      setError("Add a category first.");
      return;
    }

    setBusy(true);
    let uploaded = 0;
    let failed = 0;

    for (const original of Array.from(files)) {
      try {
        setStatus(`Uploading ${original.name}...`);
        const file = await toUploadableFile(original);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("categoryId", categoryId);
        formData.append("caption", caption);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          failed += 1;
        } else {
          uploaded += 1;
        }
      } catch {
        failed += 1;
      }
    }

    setBusy(false);
    setStatus(
      failed === 0
        ? `Uploaded ${uploaded} photo${uploaded === 1 ? "" : "s"}.`
        : `Uploaded ${uploaded}, failed ${failed}.`
    );
    if (inputRef.current) inputRef.current.value = "";
    setCaption("");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-neutral-200 bg-neutral-50 p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="categoryId" className="text-xs font-bold uppercase tracking-wide text-neutral-500">
            Category
          </label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="h-11 rounded-none border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none focus:border-[#e01f22]"
          >
            {categories.length === 0 && <option value="">No categories yet</option>}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="caption" className="text-xs font-bold uppercase tracking-wide text-neutral-500">
            Caption (optional, applied to this batch)
          </label>
          <input
            id="caption"
            type="text"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            placeholder="e.g. Pioneer Sector roof install"
            className="h-11 rounded-none border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none focus:border-[#e01f22]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="file" className="text-xs font-bold uppercase tracking-wide text-neutral-500">
          Photos (any image type, including iPhone HEIC)
        </label>
        <input
          ref={inputRef}
          id="file"
          type="file"
          accept="image/*,.heic,.heif"
          multiple
          className="text-sm text-neutral-600 file:mr-4 file:border-0 file:bg-[#e01f22] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
        />
      </div>

      {error && <p className="text-sm font-medium text-[#e01f22]">{error}</p>}
      {status && !error && <p className="text-sm text-neutral-500">{status}</p>}

      <button
        type="submit"
        disabled={busy || categories.length === 0}
        className="flex h-11 items-center justify-center gap-2 rounded-none bg-[#e01f22] text-sm font-bold text-white transition-colors hover:bg-[#b81a1c] disabled:opacity-60"
      >
        <UploadCloud className="size-4" />
        {busy ? "Uploading..." : "Upload & Watermark"}
      </button>
    </form>
  );
}
