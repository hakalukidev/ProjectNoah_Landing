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
// hash also matches, so scrolling from "Services" down to "FAQ" moves the
// marker with you instead of leaving both lit.
function isNavLinkActive(href: string, pathname: string, hash: string) {
  const [path, anchor] = href.split("#");
  const routePath = path || "/";
  if (routePath !== pathname) return false;
  return anchor ? hash === `#${anchor}` : hash === "";
}

// The two colour schemes the nav row can be in. `transparent` is the state
// the bar sits in while it floats over the home page hero; every other case
// - any inner page, or the home page once it has been scrolled - uses the
// solid white chrome.
function navLinkClasses(transparent: boolean, active: boolean) {
  return cn(
    "whitespace-nowrap border-b-2 border-transparent text-sm font-semibold uppercase tracking-wide transition-colors",
    transparent
      ? "text-white/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] hover:text-white"
      : "text-foreground/80 hover:text-primary",
    active && (transparent ? "border-white text-white" : "border-primary text-primary")
  );
}

function ServicesDropdown({
  active,
  transparent,
  onNavigate,
}: {
  active?: boolean;
  transparent: boolean;
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
        className={cn("flex items-center gap-1", navLinkClasses(transparent, Boolean(active)))}
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

export function Header({
  contact,
  /**
   * Float the chrome over the page instead of sitting above it in flow.
   * Passed by the home page, whose hero is a full-height dark scene the
   * transparent bar reads against; the bar fades back to its solid white
   * self as soon as the page is scrolled. Inner pages leave this off - they
   * open on light content, where white-on-white would be invisible - and
   * keep the sticky, in-flow header.
   */
  overlay = false,
}: {
  contact: ContactInfo;
  overlay?: boolean;
}) {
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

  // Only meaningful in overlay mode. Read once on mount as well as on every
  // scroll: a reload part-way down the page, or a back-navigation that
  // restores the scroll position, both arrive already scrolled and have to
  // paint the solid bar rather than white text over white content.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!overlay) return;
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [overlay]);

  // The open mobile drawer is a white panel hanging off the bottom edge of
  // the bar, so the bar goes solid with it rather than leaving that panel
  // attached to nothing.
  const transparent = overlay && !scrolled && !open;

  return (
    <div className={cn("top-0 z-50 w-full", overlay ? "fixed inset-x-0" : "sticky")}>
      <TopBar contact={contact} transparent={transparent} />
      <header
        className={cn(
          "relative w-full border-b transition-colors duration-300",
          transparent ? "border-white/15 bg-transparent" : "border-border bg-white"
        )}
      >
        <div className="mx-auto grid h-20 w-full max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 xl:gap-6 xl:px-10">
          <div
            className={cn(
              "col-start-1 -ml-4 flex h-20 items-center justify-self-start pr-6 pl-4 transition-colors duration-300 sm:-ml-6 sm:pl-6 xl:-ml-10 xl:pr-8 xl:pl-10",
              !transparent && "bg-gradient-to-r from-neutral-300 via-neutral-100 to-white"
            )}
          >
            <Logo variant={transparent ? "dark" : "light"} />
          </div>

          {/* col-start-2 pinned explicitly: a `hidden` (display:none) grid
              item is dropped from auto-placement entirely below xl, which
              would otherwise shift the row-3 group below into this track
              and leave the real end column empty - stranding the mobile
              menu button away from the right edge instead of flush against
              it. */}
          <div className="col-start-2 hidden items-center gap-4 justify-self-center xl:flex 2xl:gap-6">
            <nav className="flex items-center gap-3.5 2xl:gap-6">
              {NAV_LINKS.map((link) =>
                link.label === "Services" ? (
                  <ServicesDropdown
                    key="services"
                    active={isNavLinkActive(link.href, pathname, hash)}
                    transparent={transparent}
                  />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClasses(
                      transparent,
                      isNavLinkActive(link.href, pathname, hash)
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA sits inside the centred nav group, not out at the right
                edge: at wide viewports the end column is taken up by the
                logo panel, which would otherwise strand the button a full
                track away from the links it belongs with. */}
            <Button
              render={<Link href="/contact#contact-form" />}
              nativeButton={false}
              className={cn(
                "rounded-none px-4 text-white transition-colors 2xl:px-6",
                transparent
                  ? "border border-white/60 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  : "bg-[#ad1111] shadow-lg shadow-[#ad1111]/25 hover:bg-[#8e0e0e]"
              )}
            >
              Get a Free Quote
            </Button>
          </div>

          <div className="col-start-3 flex items-center justify-self-end gap-3 xl:gap-4">
            <div
              className={cn(
                "-mr-4 hidden h-20 items-center pr-4 pl-6 transition-colors duration-300 sm:-mr-6 sm:pr-6 xl:-mr-10 xl:flex xl:pr-10 xl:pl-8",
                !transparent && "bg-gradient-to-l from-neutral-300 via-neutral-100 to-white"
              )}
            >
              <Logo variant={transparent ? "dark" : "light"} />
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "inline-flex items-center justify-center rounded-none p-2 transition-colors xl:hidden",
                transparent ? "text-white" : "text-foreground"
              )}
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
            "absolute inset-x-0 top-full overflow-hidden border-t border-border bg-white shadow-lg transition-[max-height] duration-300 ease-in-out xl:hidden",
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
                  onClick={() => setOpen(false)}
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
              render={<Link href="/contact#contact-form" />}
              nativeButton={false}
              onClick={() => setOpen(false)}
              className="mt-2 w-full rounded-none bg-[#ad1111] text-white shadow-lg shadow-[#ad1111]/25 hover:bg-[#8e0e0e]"
            >
              Get a Free Quote
            </Button>
          </nav>
        </div>
      </header>
    </div>
  );
}
