import type { Metadata } from "next";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SERVICES } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
};

export default function AdminServicesPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Services</h1>
        <p className="text-sm text-muted-foreground">
          {SERVICES.length} services listed on the public Services section.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Card
            key={service.title}
            className="overflow-hidden border-none shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-md"
          >
            <div className="relative h-36 w-full bg-muted">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-base">{service.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {service.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
