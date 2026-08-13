import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { company } from "@/lib/site-config";

export function TopBar() {
  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex h-10 w-full max-w-7xl items-center justify-between gap-4 px-6 text-xs font-semibold lg:px-8">
        <Link
          href={`tel:${company.phone.replace(/\s+/g, "")}`}
          className="flex items-center gap-1.5 whitespace-nowrap hover:opacity-80"
        >
          <Phone className="size-3.5" />
          <span className="hidden sm:inline">{company.phone}</span>
        </Link>

        <p className="hidden truncate text-center uppercase tracking-wide md:block">
          Trusted Singapore Contractor Since 2008 &middot;{" "}
          <Link href="/#contact" className="underline underline-offset-2 hover:opacity-80">
            Get a Free Quote
          </Link>
        </p>

        <div className="hidden items-center gap-4 whitespace-nowrap sm:flex">
          <Link
            href={`mailto:${company.email}`}
            className="flex items-center gap-1.5 hover:opacity-80"
          >
            <Mail className="size-3.5" />
            <span className="hidden lg:inline">{company.email}</span>
          </Link>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            Singapore
          </span>
        </div>
      </div>
    </div>
  );
}
