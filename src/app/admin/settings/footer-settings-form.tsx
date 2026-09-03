"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FooterSettings } from "@/lib/footer-settings";
import { updateFooterSettingsAction } from "./actions";

export function FooterSettingsForm({
  settings,
}: {
  settings: FooterSettings;
}) {
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        await updateFooterSettingsAction(formData);
        setSaved(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="tagline">Tagline</Label>
        <Textarea
          id="tagline"
          name="tagline"
          rows={2}
          required
          defaultValue={settings.tagline}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" required defaultValue={settings.phone} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={settings.email}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="whatsappUrl">WhatsApp URL</Label>
          <Input
            id="whatsappUrl"
            name="whatsappUrl"
            defaultValue={settings.whatsappUrl}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="youtubeUrl">YouTube URL</Label>
          <Input
            id="youtubeUrl"
            name="youtubeUrl"
            defaultValue={settings.youtubeUrl}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="facebookUrl">Facebook URL</Label>
          <Input
            id="facebookUrl"
            name="facebookUrl"
            defaultValue={settings.facebookUrl}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="instagramUrl">Instagram URL</Label>
          <Input
            id="instagramUrl"
            name="instagramUrl"
            defaultValue={settings.instagramUrl}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {saved && !error && (
        <p className="text-sm text-emerald-600">Footer settings saved.</p>
      )}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Footer Settings"}
        </Button>
      </div>
    </form>
  );
}
