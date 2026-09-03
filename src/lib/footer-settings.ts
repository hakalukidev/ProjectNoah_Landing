import { eq } from "drizzle-orm";

import { company, SOCIAL_LINKS } from "@/lib/site-config";
import { footerSettings } from "@/lib/schema";
import { db } from "@/lib/db-client";

const SETTINGS_ID = 1;

export type FooterSettings = {
  tagline: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  instagramUrl: string;
};

const DEFAULTS: FooterSettings = {
  tagline: `Singapore-registered construction and project management, delivering since ${company.incorporationDateLabel}.`,
  phone: company.phone,
  email: company.email,
  whatsappUrl: SOCIAL_LINKS.whatsapp,
  youtubeUrl: SOCIAL_LINKS.youtube,
  facebookUrl: SOCIAL_LINKS.facebook,
  instagramUrl: SOCIAL_LINKS.instagram,
};

function withoutId(row: FooterSettings & { id: number }): FooterSettings {
  return {
    tagline: row.tagline,
    phone: row.phone,
    email: row.email,
    whatsappUrl: row.whatsappUrl,
    youtubeUrl: row.youtubeUrl,
    facebookUrl: row.facebookUrl,
    instagramUrl: row.instagramUrl,
  };
}

export async function getFooterSettings(): Promise<FooterSettings> {
  const [row] = await db
    .select()
    .from(footerSettings)
    .where(eq(footerSettings.id, SETTINGS_ID));

  if (row) return withoutId(row);

  const [created] = await db
    .insert(footerSettings)
    .values({ id: SETTINGS_ID, ...DEFAULTS })
    .returning();
  return withoutId(created);
}

export async function updateFooterSettings(
  input: FooterSettings
): Promise<FooterSettings> {
  const [updated] = await db
    .update(footerSettings)
    .set(input)
    .where(eq(footerSettings.id, SETTINGS_ID))
    .returning();
  return withoutId(updated);
}
