import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";

import { company } from "@/lib/site-config";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" ? next : "/admin";

  return (
    <div
      className="dark isolate relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground"
      style={
        {
          "--background": "oklch(0.16 0.025 22)",
          "--foreground": "oklch(0.96 0.012 30)",
          "--card": "oklch(0.22 0.03 20 / 92%)",
          "--card-foreground": "oklch(0.96 0.012 30)",
          "--muted": "oklch(0.30 0.03 20)",
          "--muted-foreground": "oklch(0.72 0.02 20)",
          "--border": "oklch(1 0 0 / 12%)",
          "--input": "oklch(1 0 0 / 15%)",
          "--ring": "#dc143c",
          "--destructive": "oklch(0.65 0.2 20)",
        } as CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/login-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt={company.brandName}
            width={56}
            height={56}
            className="rounded-lg"
          />
          <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground">
            {company.brandName} Admin
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your site content.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl backdrop-blur-sm sm:p-10">
          <LoginForm next={nextPath} />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {company.legalName} &middot; UEN {company.uen}
        </p>
      </div>
    </div>
  );
}
