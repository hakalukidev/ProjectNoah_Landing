import { sql } from "drizzle-orm";

import { pageViews } from "@/lib/schema";
import { db } from "@/lib/db-client";

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export async function recordVisit(visitorId: string): Promise<void> {
  await db
    .insert(pageViews)
    .values({ visitorId, date: toDateKey(new Date()) })
    .onConflictDoNothing();
}

export async function getTotalVisitors(): Promise<number> {
  const [row] = await db
    .select({ count: sql<number>`count(distinct ${pageViews.visitorId})` })
    .from(pageViews);
  return Number(row?.count ?? 0);
}

export type DailyVisitors = { date: string; count: number };

/** Daily unique-visitor counts for the last `days` days (today inclusive),
    zero-filled so the chart has a continuous, gap-free date axis. */
export async function getVisitorsByDay(days: number): Promise<DailyVisitors[]> {
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - (days - 1));

  const rows = await db
    .select({
      date: pageViews.date,
      count: sql<number>`count(distinct ${pageViews.visitorId})`,
    })
    .from(pageViews)
    .where(sql`${pageViews.date} >= ${toDateKey(start)}`)
    .groupBy(pageViews.date);

  const counts = new Map(rows.map((row) => [row.date, Number(row.count)]));

  const series: DailyVisitors[] = [];
  for (let i = 0; i < days; i += 1) {
    const day = new Date(start);
    day.setDate(day.getDate() + i);
    const key = toDateKey(day);
    series.push({ date: key, count: counts.get(key) ?? 0 });
  }

  return series;
}
