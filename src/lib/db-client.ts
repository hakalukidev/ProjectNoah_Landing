import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

declare global {
  var __projectNoahPool: Pool | undefined;
}

const pool =
  globalThis.__projectNoahPool ??
  new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalThis.__projectNoahPool = pool;
}

export const db = drizzle(pool);
