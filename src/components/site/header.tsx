"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { TopBar } from "@/components/site/top-bar";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SERVICE_CATEGORIES } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { ContactInfo } from "@/lib/server/contact";

// Click-to-toggle instead of the base-ui NavigationMenu's hover-driven
// open/close: with a real mouse (not a synthetic click), moving from the
// "Services" trigger down into the popup can cross outside both elements
// and fire a mouseleave that closes the menu before the click on a category
// link ever registers. A plain click-toggled dropdown can't have that race.

// A NAV_LINKS href is either a real route ("/about") or an in-page anchor on
// the home page ("/#services"). A link counts as active when the current
// pathname matches its route part, and - for anchor links - the current URL
// hash also matches (so "Home" doesn't stay marked once you've clicked down
// to the "Services" or "FAQ" section on the same page).
function isNavLinkActive(href: string, pathname: string, hash: string) {
  const [path, anchor] = href.split("#");
  const routePath = path || "/";
  if (routePath !== pathname) return false;
  return anchor ? hash === `#${anchor}` : hash === "";
}

function ServicesDropdown({
  active,
  onNavigate,
}: {
  active?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex items-center gap-1 border-b-2 border-transparent text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-primary",
          active && "border-primary text-primary"
        )}
      >
        Services
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 z-50 mt-3 w-56 -translate-x-1/2 border border-border bg-popover py-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10">
          {SERVICE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/#services-${category.slug}`}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className="block px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
            >
              {category.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header({ contact }: { contact: ContactInfo }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  // usePathname() doesn't include the hash, and the anchor links (Services,
  // FAQ) only exist as "/#section" - so the hash is tracked separately to
  // know which in-page section is currently active.
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash);
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

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
      <TopBar contact={contact} />
      <header className="relative w-full border-b border-border bg-white">
        <div className="mx-auto grid h-20 w-full max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 xl:gap-6 xl:px-10">
          <div className="col-start-1 -ml-4 flex h-20 items-center justify-self-start bg-gradient-to-r from-neutral-300 via-neutral-100 to-white pr-6 pl-4 sm:-ml-6 sm:pl-6 xl:-ml-10 xl:pr-8 xl:pl-10">
            <Logo variant="light" />
          </div>

          {/* col-start-2 pinned explicitly: a `hidden` (display:none) grid
              item is dropped from auto-placement entirely below xl, which
              would otherwise shift the row-3 group below into this track
              and leave the real end column empty - stranding the mobile
              menu button away from the right edge instead of flush against
              it. */}
          <nav className="col-start-2 hidden items-center gap-4 justify-self-center xl:flex 2xl:gap-6">
            {NAV_LINKS.map((link) =>
              link.label === "Services" ? (
                <ServicesDropdown
                  key="services"
                  active={isNavLinkActive(link.href, pathname, hash)}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(link.href, event)}
                  className={cn(
                    "border-b-2 border-transparent text-sm font-semibold uppercase tracking-wide text-foreground/80 transition-colors hover:text-primary",
                    isNavLinkActive(link.href, pathname, hash) &&
                      "border-primary text-primary"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="col-start-3 flex items-center justify-self-end gap-3 xl:gap-4">
            <div className="hidden items-center gap-6 xl:flex 2xl:gap-8">
              <Button
                render={<Link href="/contact#contact-form" />}
                nativeButton={false}
                className="rounded-none bg-[#e01f22] px-4 text-white shadow-lg shadow-[#e01f22]/25 hover:bg-[#b81a1c] 2xl:px-6"
              >
                Get a Free Quote
              </Button>
              <div className="-mr-4 flex h-20 items-center bg-gradient-to-l from-neutral-300 via-neutral-100 to-white pr-4 pl-6 sm:-mr-6 sm:pr-6 xl:-mr-10 xl:pr-10 xl:pl-8">
                <Logo variant="light" />
              </div>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-none p-2 text-foreground xl:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Positioned absolute (rather than in normal flow) so opening/
            closing it never changes the height of anything above the page
            content below the header. In flow, its max-height transition was
            reflowing the whole page underneath it while a tapped nav link's
            anchor-scroll was landing - the page would jump to the target
            section, then get shoved back up as the menu finished collapsing,
            leaving the viewport short of the target (e.g. a tap on "FAQ"
            would land back up near the hero video instead of the FAQ
            questions). Overlaying the content instead removes that race
            entirely. */}
        <div
          className={cn(
            "absolute inset-x-0 top-full overflow-hidden border-t border-border bg-background shadow-lg transition-[max-height] duration-300 ease-in-out xl:hidden",
            open ? "max-h-[85vh] overflow-y-auto" : "max-h-0 border-t-0"
          )}
        >
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) =>
              link.label === "Services" ? (
                <div key={link.href}>
                  <p
                    className={cn(
                      "px-2 py-2.5 text-sm font-semibold uppercase tracking-wide text-foreground/80",
                      isNavLinkActive(link.href, pathname, hash) && "text-primary"
                    )}
                  >
                    Services
                  </p>
                  <div className="flex flex-col gap-0.5 pb-1 pl-4">
                    {SERVICE_CATEGORIES.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/#services-${category.slug}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-md px-2 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-primary",
                          hash === `#services-${category.slug}` &&
                            pathname === "/" &&
                            "bg-muted text-primary"
                        )}
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    handleNavClick(link.href, event);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-md px-2 py-2.5 text-sm font-semibold uppercase tracking-wide text-foreground/80 hover:bg-muted hover:text-primary",
                    isNavLinkActive(link.href, pathname, hash) &&
                      "bg-muted text-primary"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <Button
              render={
                <Link href="/contact#contact-form" onClick={() => setOpen(false)} />
              }
              nativeButton={false}
              className="mt-2 w-full rounded-none bg-[#e01f22] text-white shadow-lg shadow-[#e01f22]/25 hover:bg-[#b81a1c]"
            >
              Get a Free Quote
            </Button>
          </nav>
        </div>
      </header>
    </div>
  );
}
