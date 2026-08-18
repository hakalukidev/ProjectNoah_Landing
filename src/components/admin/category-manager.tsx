"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";

import { addCategoryAction, deleteCategoryAction } from "@/lib/server/actions";
import type { Category } from "@/lib/server/categories";

export function CategoryManager({ categories }: { categories: Category[] }) {
  const [state, formAction, pending] = useActionState(addCategoryAction, undefined);

  return (
    <div className="flex flex-col gap-8">
      <form action={formAction} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wide text-neutral-500">
            New category name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Roofing & Shelter"
            className="h-11 rounded-none border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition-colors focus:border-[#e01f22]"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="h-11 shrink-0 rounded-none bg-[#e01f22] px-6 text-sm font-bold text-white transition-colors hover:bg-[#b81a1c] disabled:opacity-60"
        >
          {pending ? "Adding..." : "Add Category"}
        </button>
      </form>
      {state?.error && <p className="text-sm font-medium text-[#e01f22]">{state.error}</p>}

      <ul className="flex flex-col divide-y divide-neutral-200 border border-neutral-200">
        {categories.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-neutral-500">
            No categories yet. Add one above.
          </li>
        )}
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between gap-4 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-neutral-900">{category.name}</p>
              <p className="text-xs text-neutral-400">{category.id}</p>
            </div>
            <form action={deleteCategoryAction}>
              <input type="hidden" name="id" value={category.id} />
              <button
                type="submit"
                aria-label={`Delete ${category.name}`}
                className="flex size-9 items-center justify-center border border-neutral-200 text-neutral-500 transition-colors hover:border-[#e01f22] hover:text-[#e01f22]"
              >
                <Trash2 className="size-4" />
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
