"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Inbox,
  Settings,
  Images,
  Video,
  Tags,
  Phone,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/admin/nav-user";
import { company } from "@/lib/site-config";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { title: "Projects", href: "/admin/projects", icon: FolderKanban },
      { title: "Services", href: "/admin/services", icon: Wrench },
      { title: "Photos", href: "/admin/images", icon: Images },
      { title: "Videos", href: "/admin/videos", icon: Video },
      { title: "Categories", href: "/admin/categories", icon: Tags },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Messages", href: "/admin/messages", icon: Inbox },
      { title: "Contact Info", href: "/admin/contact", icon: Phone },
    ],
  },
  {
    label: "General",
    items: [{ title: "Settings", href: "/admin/settings", icon: Settings }],
  },
];

export function AppSidebar() {
  const pathname = usePathname() ?? "";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/admin" className="flex items-center gap-2.5 px-2 py-1.5">
          <Image
            src="/logo-icon.png"
            alt="Project Noah Pte Ltd"
            width={520}
            height={520}
            className="h-7 w-7 shrink-0"
          />
          <span className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-extrabold tracking-tight text-sidebar-foreground">
              PROJECT NOAH
            </span>
            <span className="text-[10px] font-medium tracking-[0.15em] text-[#ff6b7a]">
              ADMIN PANEL
            </span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator className="mx-0" />

      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser name="Admin" subtitle={`UEN ${company.uen}`} />
      </SidebarFooter>
    </Sidebar>
  );
}
