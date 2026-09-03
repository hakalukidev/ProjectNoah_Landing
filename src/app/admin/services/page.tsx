import type { Metadata } from "next";
import Image from "next/image";
import { Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SERVICE_CATEGORIES } from "@/lib/site-config";
import { getServices } from "@/lib/services";
import { DeleteServiceButton } from "./delete-service-button";
import { ServiceFormSheet } from "./service-form-sheet";

export const metadata: Metadata = {
  title: "Services",
};

export default async function AdminServicesPage() {
  const allServices = await getServices();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Services</h1>
        <p className="text-sm text-muted-foreground">
          Entries shown on the public Services section, grouped by practice
          area.
        </p>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-foreground/5">
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>{allServices.length} total entries.</CardDescription>
          <CardAction>
            <ServiceFormSheet />
          </CardAction>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allServices.map((service) => {
                const category = SERVICE_CATEGORIES.find(
                  (item) => item.slug === service.category
                );

                return (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-muted-foreground">
                          {service.image ? (
                            <Image
                              src={service.image}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Wrench className="size-4" />
                          )}
                        </div>
                        {service.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {category?.label ?? service.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <ServiceFormSheet service={service} />
                        <DeleteServiceButton
                          id={service.id}
                          title={service.title}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {allServices.length === 0 && (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              No services yet. Add your first one above.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
