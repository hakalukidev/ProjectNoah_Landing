import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { AppSidebar } from "@/components/admin/app-sidebar";
import { Breadcrumb } from "@/components/admin/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LogoutButton } from "./logout-button";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <TooltipProvider>
      <SidebarProvider
        className="dark bg-background text-foreground"
        style={
          {
            "--background": "oklch(0.22 0 0)",
            "--foreground": "oklch(0.96 0 0)",
            "--card": "oklch(0.27 0 0)",
            "--card-foreground": "oklch(0.96 0 0)",
            "--popover": "oklch(0.27 0 0)",
            "--popover-foreground": "oklch(0.96 0 0)",
            "--primary": "oklch(0.65 0 0)",
            "--primary-foreground": "oklch(0.15 0 0)",
            "--muted": "oklch(0.30 0 0)",
            "--muted-foreground": "oklch(0.75 0 0)",
            "--secondary": "oklch(0.30 0 0)",
            "--secondary-foreground": "oklch(0.96 0 0)",
            "--accent": "oklch(0.33 0 0)",
            "--accent-foreground": "oklch(0.97 0 0)",
            "--border": "oklch(1 0 0 / 12%)",
            "--input": "oklch(1 0 0 / 15%)",
            "--ring": "oklch(0.6 0 0)",
            "--sidebar": "oklch(0.16 0 0)",
            "--sidebar-foreground": "oklch(0.78 0 0)",
            "--sidebar-border": "oklch(1 0 0 / 10%)",
            "--sidebar-accent": "oklch(0.30 0 0)",
            "--sidebar-accent-foreground": "oklch(0.95 0 0)",
            "--sidebar-ring": "oklch(0.6 0 0)",
          } as CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-1 h-4" />
              <Breadcrumb />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/" target="_blank" rel="noopener" />}
                nativeButton={false}
              >
                View site
                <ExternalLink data-icon="inline-end" />
              </Button>
              <LogoutButton />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
