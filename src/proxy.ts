import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { COOKIE_NAME, decrypt } from "@/lib/session";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await decrypt(request.cookies.get(COOKIE_NAME)?.value);

  if (pathname.startsWith("/admin") && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
