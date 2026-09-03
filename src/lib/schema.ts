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
