"use client";

import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-linear-to-b from-black/50 to-transparent border-b border-transparent",
      )}
    >
      <div className="container-px flex h-18 items-center justify-between py-3">
        <Logo variant={scrolled ? "dark" : "light"} />

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-brand",
                scrolled ? "text-foreground" : "text-white/90",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className={cn(
              "flex h-10 items-center rounded-full border px-5 text-sm font-semibold transition-colors",
              scrolled
                ? "border-ink/20 text-foreground hover:bg-muted"
                : "border-white/40 text-white hover:bg-white/10",
            )}
          >
            Contact Us
          </a>
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            className="rounded-full bg-brand text-brand-foreground hover:bg-brand-dark font-semibold"
          >
            <Phone className="size-4" />
            Get Free Quote
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className={cn("lg:hidden", scrolled ? "text-foreground" : "text-white")}
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:w-80">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <Logo variant="dark" />
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-3 px-4">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Phone className="size-4 text-brand" />
                {siteConfig.phone}
              </a>
              <SheetClose
                nativeButton={false}
                render={
                  <a
                    href="#contact"
                    className={cn(
                      buttonVariants(),
                      "rounded-full bg-brand text-brand-foreground hover:bg-brand-dark font-semibold",
                    )}
                  />
                }
              >
                Get Free Quote
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
