"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import type { ProjectVideo } from "@/lib/server/videos";

export function VideoGrid({ videos }: { videos: ProjectVideo[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/videos/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Couldn't delete this video. Please try again.");
        return;
      }
      startTransition(() => router.refresh());
    } catch {
      alert("Couldn't delete this video. Check your connection and try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (videos.length === 0) {
    return (
      <p className="border border-border bg-muted px-4 py-8 text-center text-sm text-muted-foreground">
        No videos uploaded yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div
          key={video.id}
          className="group relative aspect-video overflow-hidden border border-border bg-black"
        >
          <video
            src={`/api/videos/${video.id}`}
            controls
            preload="metadata"
            className="size-full object-cover"
          />
          {video.caption && (
            <div className="pointer-events-none absolute inset-x-0 bottom-10 bg-linear-to-t from-black/85 to-transparent p-2 pt-8">
              <p className="truncate text-xs font-semibold text-white">{video.caption}</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => handleDelete(video.id)}
            disabled={deletingId === video.id || isPending}
            aria-label="Delete video"
            className="absolute top-2 right-2 flex size-8 items-center justify-center bg-black/60 text-white opacity-80 transition-opacity hover:bg-[#ad1111] hover:opacity-100 group-hover:opacity-100 disabled:opacity-60"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
