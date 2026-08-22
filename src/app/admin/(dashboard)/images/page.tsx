import { ImageGrid } from "@/components/admin/image-grid";
import { ImageUploader } from "@/components/admin/image-uploader";
import { getCategories } from "@/lib/server/categories";
import { getImages } from "@/lib/server/gallery";

export default async function AdminImagesPage() {
  const [categories, images] = await Promise.all([getCategories(), getImages()]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">Photos</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Uploaded photos are watermarked with the logo and phone number automatically, and
          served only through the site&apos;s gallery (no direct download link).
        </p>
      </div>

      {categories.length === 0 ? (
        <p className="border border-[#ad1111]/30 bg-[#ad1111]/5 px-4 py-3 text-sm text-neutral-900">
          Add a category first on the{" "}
          <a href="/admin/categories" className="underline">
            Categories
          </a>{" "}
          page before uploading photos.
        </p>
      ) : (
        <ImageUploader categories={categories} />
      )}

      <ImageGrid images={images} categories={categories} />
    </div>
  );
}
