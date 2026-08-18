// Pure, framework-agnostic session token signing/verification - no
// `next/headers` and no `server-only` guard, so this is safe to import from
// both App Router server code and the Pages Router upload route (which
// can't use next/headers at all).
import crypto from "node:crypto";

export const SESSION_COOKIE = "noah_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set. Add it to .env.local.");
  }
  return secret;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function timingSafeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function issueSessionToken(): string {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  if (!timingSafeEqual(signature, sign(encoded))) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8")) as {
      exp?: number;
    };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyCredentials(username: string, password: string): boolean {
  const validUser = process.env.ADMIN_USERNAME ?? "";
  const validPass = process.env.ADMIN_PASSWORD ?? "";
  if (!validUser || !validPass) return false;
  return timingSafeEqual(username, validUser) && timingSafeEqual(password, validPass);
}
