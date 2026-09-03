import type { Metadata } from "next";
import Image from "next/image";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SERVICE_CATEGORIES, SERVICES } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
};

export default function AdminServicesPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Services</h1>
        <p className="text-sm text-muted-foreground">
          {SERVICES.length} services listed on the public Services section,
          grouped under {SERVICE_CATEGORIES.length} practice areas. Services
          are text-only on the public site (no per-service photo) - edit them
          in src/lib/site-config.ts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const category = SERVICE_CATEGORIES.find(
            (item) => item.slug === service.category
          );

          return (
            <Card
              key={service.slug}
              className="overflow-hidden border-none shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-md"
            >
              <CardHeader>
                {category && (
                  <div className="mb-2 flex items-center gap-2">
                    <Image
                      src={category.icon}
                      alt=""
                      aria-hidden
                      width={20}
                      height={20}
                      className="size-5 object-contain"
                    />
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {category.label}
                    </span>
                  </div>
                )}
                <CardTitle className="text-base">{service.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
