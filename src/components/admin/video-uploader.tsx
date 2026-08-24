"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

export function VideoUploader() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const files = inputRef.current?.files;
    if (!files || files.length === 0) {
      setError("Choose at least one video.");
      return;
    }

    setBusy(true);
    let uploaded = 0;
    let failed = 0;

    for (const file of Array.from(files)) {
      try {
        setStatus(`Uploading ${file.name}...`);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("caption", caption);

        const res = await fetch("/api/admin/upload-video", {
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
        ? `Uploaded ${uploaded} video${uploaded === 1 ? "" : "s"}.`
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
      <div className="flex flex-col gap-2">
        <label htmlFor="video-caption" className="text-xs font-bold uppercase tracking-wide text-neutral-500">
          Caption (optional, applied to this batch)
        </label>
        <input
          id="video-caption"
          type="text"
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          placeholder="e.g. Pioneer Sector roof install"
          className="h-11 rounded-none border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none focus:border-[#ad1111]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="video-file" className="text-xs font-bold uppercase tracking-wide text-neutral-500">
          Videos (MP4, WebM, MOV)
        </label>
        <input
          ref={inputRef}
          id="video-file"
          type="file"
          accept="video/*"
          multiple
          className="text-sm text-neutral-600 file:mr-4 file:border-0 file:bg-[#ad1111] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
        />
        <p className="text-xs text-neutral-400">Max 200MB per video.</p>
      </div>

      {error && <p className="text-sm font-medium text-[#ad1111]">{error}</p>}
      {status && !error && <p className="text-sm text-neutral-500">{status}</p>}

      <button
        type="submit"
        disabled={busy}
        className="flex h-11 items-center justify-center gap-2 rounded-none bg-[#ad1111] text-sm font-bold text-white transition-colors hover:bg-[#8e0e0e] disabled:opacity-60"
      >
        <UploadCloud className="size-4" />
        {busy ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
}
