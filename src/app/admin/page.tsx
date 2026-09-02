import Link from "next/link";
import Image from "next/image";
import {
  FolderKanban,
  Wrench,
  Inbox,
  Timer,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/db";
import { company, SERVICES } from "@/lib/site-config";

const QUICK_LINKS = [
  {
    title: "Manage Projects",
    description: "View the full portfolio",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Manage Services",
    description: "Browse service listings",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    title: "Company Settings",
    description: "Registered company details",
    href: "/admin/settings",
    icon: Timer,
  },
];

export default function AdminDashboardPage() {
  const projects = getProjects();

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
    },
    {
      label: "Services Offered",
      value: SERVICES.length,
      icon: Wrench,
    },
    {
      label: "New Messages",
      value: 0,
      icon: Inbox,
    },
    {
      label: "Years in Operation",
      value: company.yearsInOperation,
      icon: Timer,
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of {company.brandName}&apos;s site content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="border-none shadow-sm ring-1 ring-foreground/5"
          >
            <CardContent className="flex items-center gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#fce8ea] text-[#dc143c]">
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-none shadow-sm ring-1 ring-foreground/5 lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Latest entries from the projects portfolio.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/admin/projects" />}
              nativeButton={false}
            >
              View all
              <ArrowRight data-icon="inline-end" />
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                href="/admin/projects"
                className="flex items-center justify-between gap-4 rounded-lg px-2 py-2.5 -mx-2 transition-colors hover:bg-muted/60"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <FolderKanban className="size-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {project.location} &middot; {project.year}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">{project.category}</Badge>
              </Link>
            ))}
            {projects.length === 0 && (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                No projects yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-foreground/5">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Jump to a section.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-3 rounded-lg px-2 py-2.5 -mx-2 transition-colors hover:bg-muted/60"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <link.icon className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{link.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {link.description}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
