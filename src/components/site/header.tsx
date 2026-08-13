"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { TopBar } from "@/components/site/top-bar";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (
    href: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (href === "/" && window.location.pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <TopBar />
      <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-10 lg:px-16">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleNavClick(link.href, event)}
                className="text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              render={<Link href="/#contact" />}
              nativeButton={false}
              variant="outline"
              className="rounded-none border-primary px-6 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Get a Free Quote
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-none p-2 text-foreground lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        <div
          className={cn(
            "overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 ease-in-out lg:hidden",
            open ? "max-h-96" : "max-h-0 border-t-0"
          )}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  handleNavClick(link.href, event);
                  setOpen(false);
                }}
                className="rounded-md px-2 py-2.5 text-sm font-semibold uppercase tracking-wide text-foreground/80 hover:bg-muted hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Button
              render={<Link href="/#contact" onClick={() => setOpen(false)} />}
              nativeButton={false}
              variant="outline"
              className="mt-2 w-full rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Get a Free Quote
            </Button>
          </nav>
        </div>
      </header>
    </div>
  );
}
