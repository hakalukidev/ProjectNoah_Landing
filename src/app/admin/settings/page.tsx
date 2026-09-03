import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { company } from "@/lib/site-config";
import { getFooterSettings } from "@/lib/footer-settings";
import { FooterSettingsForm } from "./footer-settings-form";

export const metadata: Metadata = {
  title: "Settings",
};

const FIELDS: { label: string; value: string }[] = [
  { label: "Legal Name", value: company.legalName },
  { label: "Brand Name", value: company.brandName },
  { label: "UEN", value: company.uen },
  { label: "Entity Type", value: company.entityType },
  { label: "Incorporation Date", value: company.incorporationDateLabel },
  { label: "Registered Address", value: company.address.full },
  { label: "Primary Activity", value: company.primaryActivity },
  { label: "Phone", value: company.phone },
  { label: "Email", value: company.email },
];

export default async function AdminSettingsPage() {
  const footerSettings = await getFooterSettings();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Company details sourced from ACRA records, used across the site.
        </p>
      </div>

      <Card className="max-w-2xl border-none shadow-sm ring-1 ring-foreground/5">
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Read-only, sourced from site config.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <div
              key={field.label}
              className="flex flex-col gap-1.5 sm:col-span-1"
            >
              <Label className="text-xs text-muted-foreground">
                {field.label}
              </Label>
              <Input value={field.value} readOnly disabled />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="max-w-2xl border-none shadow-sm ring-1 ring-foreground/5">
        <CardHeader>
          <CardTitle>Footer Content</CardTitle>
          <CardDescription>
            Tagline, contact details and social links shown in the site
            footer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FooterSettingsForm settings={footerSettings} />
        </CardContent>
      </Card>
    </div>
  );
}
