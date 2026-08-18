import "server-only";
import { cookies } from "next/headers";

import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  issueSessionToken,
  verifyCredentials,
  verifySessionToken,
} from "@/lib/server/session-token";

export { SESSION_COOKIE, verifyCredentials, verifySessionToken };

export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, issueSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
