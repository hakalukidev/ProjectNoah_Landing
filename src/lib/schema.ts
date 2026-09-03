import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  year: text("year").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  position: integer("position").notNull(),
});

export const footerSettings = pgTable("footer_settings", {
  id: integer("id").primaryKey().default(1),
  tagline: text("tagline").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  whatsappUrl: text("whatsapp_url").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
  facebookUrl: text("facebook_url").notNull(),
  instagramUrl: text("instagram_url").notNull(),
  uen: text("uen").notNull(),
  entityType: text("entity_type").notNull(),
  registeredOffice: text("registered_office").notNull(),
  mapEmbedUrl: text("map_embed_url").notNull(),
});
