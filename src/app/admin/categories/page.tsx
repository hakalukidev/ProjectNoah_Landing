import { CategoryManager } from "@/components/admin/category-manager";
import { getCategories } from "@/lib/server/categories";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Categories</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Photos are organised by category on the public site&apos;s gallery filters.
      </p>
      <CategoryManager categories={categories} />
    </div>
  );
}
