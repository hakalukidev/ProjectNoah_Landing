"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteServiceAction } from "./actions";

export function DeleteServiceButton({
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
          await deleteServiceAction(id);
        });
      }}
    >
      <Trash2 />
      <span className="sr-only">Delete service</span>
    </Button>
  );
}
