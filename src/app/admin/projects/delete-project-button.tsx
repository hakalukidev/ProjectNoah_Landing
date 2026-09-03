"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteProjectAction } from "./actions";

export function DeleteProjectButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      disabled={pending}
      onClick={() => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
          return;
        }
        startTransition(async () => {
          await deleteProjectAction(id);
        });
      }}
    >
      <Trash2 />
      <span className="sr-only">Delete project</span>
    </Button>
  );
}
