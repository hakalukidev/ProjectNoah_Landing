"use client";

import { useEffect } from "react";

/**
 * Site-wide guard against the one-click ways to pull a photo off the page:
 * right-click -> "Save image as", and dragging the image out to the desktop
 * or into another tab.
 *
 * Mounted once from the root layout so it covers every image, including the
 * ones inside sections that never opted in individually (services, hero,
 * about). Listeners are on the document in the capture phase, so a section
 * that stops propagation on its own handler cannot accidentally bypass this.
 *
 * This is a deterrent, not DRM - devtools, view-source and the screenshot key
 * all remain. The watermark burned into the pixels on upload is what actually
 * protects the photos; see src/lib/server/watermark-core.mjs.
 */
export function ImageProtection() {
  useEffect(() => {
    const isImage = (target: EventTarget | null) =>
      target instanceof Element &&
      (target.tagName === "IMG" || target.closest("[data-protected-image]"));

    const onContextMenu = (event: MouseEvent) => {
      if (isImage(event.target)) event.preventDefault();
    };

    const onDragStart = (event: DragEvent) => {
      if (isImage(event.target)) event.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("dragstart", onDragStart, true);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("dragstart", onDragStart, true);
    };
  }, []);

  return null;
}
