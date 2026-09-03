"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fires once per full page load to record a daily-unique visit. Renders in
    the root layout, which persists across client-side navigation, so this
    only re-fires on a hard reload - one beacon per visit, not per route. */
export function VisitTracker() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
      return;
    }
    fetch("/api/track-visit", { method: "POST" }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
