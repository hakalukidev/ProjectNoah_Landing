"use client";

import { useActionState, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";

import {
  addCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/lib/server/actions";
import type { Category } from "@/lib/server/categories";

function CategoryRow({ category }: { category: Category }) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, pending] = useActionState(updateCategoryAction, undefined);

  if (editing) {
    return (
      <li className="flex flex-col gap-2 px-4 py-3">
        <form
          action={async (formData) => {
            await formAction(formData);
            setEditing(false);
          }}
          className="flex items-center gap-3"
        >
          <input type="hidden" name="id" value={category.id} />
          <input
            name="name"
            type="text"
            required
            autoFocus
            defaultValue={category.name}
            className="h-9 flex-1 rounded-none border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          />
          <button
            type="submit"
            disabled={pending}
            className="h-9 shrink-0 rounded-none bg-[#ad1111] px-4 text-xs font-bold text-white transition-colors hover:bg-[#8e0e0e] disabled:opacity-60"
          >
            {pending ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            aria-label="Cancel editing"
            className="flex size-9 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </form>
        {state?.error && <p className="text-sm font-medium text-[#ad1111]">{state.error}</p>}
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between gap-4 px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-foreground">{category.name}</p>
        <p className="text-xs text-muted-foreground/60">{category.id}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label={`Edit ${category.name}`}
          className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Pencil className="size-4" />
        </button>
        <form action={deleteCategoryAction}>
          <input type="hidden" name="id" value={category.id} />
          <button
            type="submit"
            aria-label={`Delete ${category.name}`}
            className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-[#ad1111] hover:text-[#ad1111]"
          >
            <Trash2 className="size-4" />
          </button>
        </form>
      </div>
    </li>
  );
}

export function CategoryManager({ categories }: { categories: Category[] }) {
  const [state, formAction, pending] = useActionState(addCategoryAction, undefined);

  return (
    <div className="flex flex-col gap-8">
      <form action={formAction} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            New category name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Roofing & Shelter"
            className="h-11 rounded-none border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="h-11 shrink-0 rounded-none bg-[#ad1111] px-6 text-sm font-bold text-white transition-colors hover:bg-[#8e0e0e] disabled:opacity-60"
        >
          {pending ? "Adding..." : "Add Category"}
        </button>
      </form>
      {state?.error && <p className="text-sm font-medium text-[#ad1111]">{state.error}</p>}

      <ul className="flex flex-col divide-y divide-neutral-200 border border-border">
        {categories.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-muted-foreground">
            No categories yet. Add one above.
          </li>
        )}
        {categories.map((category) => (
          <CategoryRow key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
}
