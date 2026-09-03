import fs from "node:fs/promises";
import path from "node:path";

import { company, SOCIAL_LINKS } from "@/lib/site-config";

export type ContactInfo = {
  phone: string;
  email: string;
  whatsapp: string;
  address: {
    line1: string;
    line2: string;
    postalCode: string;
  };
  social: {
    youtube: string;
    facebook: string;
    instagram: string;
  };
};

const DATA_DIR = path.join(process.cwd(), "data");
const CONTACT_FILE = path.join(DATA_DIR, "contact.json");

function defaultContact(): ContactInfo {
  return {
    phone: company.phone,
    email: company.email,
    whatsapp: company.whatsapp,
    address: {
      line1: company.address.line1,
      line2: company.address.line2,
      postalCode: company.address.postalCode,
    },
    social: {
      youtube: SOCIAL_LINKS.youtube,
      facebook: SOCIAL_LINKS.facebook,
      instagram: SOCIAL_LINKS.instagram,
    },
  };
}

/** Admin-edited contact details, falling back to the values baked into site-config. */
export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const raw = await fs.readFile(CONTACT_FILE, "utf-8");
    const saved = JSON.parse(raw) as Partial<ContactInfo>;
    const fallback = defaultContact();
    return {
      ...fallback,
      ...saved,
      address: { ...fallback.address, ...saved.address },
      social: { ...fallback.social, ...saved.social },
    };
  } catch {
    return defaultContact();
  }
}

export async function updateContactInfo(data: ContactInfo): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTACT_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function contactWhatsappLink(whatsapp: string): string {
  return `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;
}

export function contactAddressFull(address: ContactInfo["address"]): string {
  return `${address.line1}, ${address.line2}, Singapore ${address.postalCode}`;
}
