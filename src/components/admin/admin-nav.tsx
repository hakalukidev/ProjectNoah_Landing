"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Images, LogOut, Phone, Tags } from "lucide-react";

import { logoutAction } from "@/lib/server/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin/images", label: "Photos", icon: Images },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/contact", label: "Contact Info", icon: Phone },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="text-sm font-extrabold uppercase tracking-wide text-neutral-900">
            Project Noah &middot; Admin
          </span>
          <nav className="flex items-center gap-1">
            {LINKS.map((link) => {
              const active = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "bg-[#e01f22] text-white"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  )}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-2 border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-[#e01f22] hover:text-[#e01f22]"
          >
            <LogOut className="size-4" />
            Log Out
          </button>
        </form>
      </div>
    </header>
  );
}
