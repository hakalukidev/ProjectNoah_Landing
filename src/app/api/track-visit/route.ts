import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { recordVisit } from "@/lib/analytics";

const COOKIE_NAME = "visitor_id";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const existing = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);

  const visitorId = existing || randomUUID();
  await recordVisit(visitorId);

  const response = NextResponse.json({ ok: true });
  if (!existing) {
    response.cookies.set(COOKIE_NAME, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
  }
  return response;
}
