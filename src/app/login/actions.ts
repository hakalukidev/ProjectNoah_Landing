"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";

import { createSession } from "@/lib/session";

export type LoginState = { error: string } | undefined;

function safeEqual(a: string, b: string) {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (
    !email ||
    !password ||
    !safeEqual(email.toLowerCase(), adminEmail.toLowerCase()) ||
    !safeEqual(password, adminPassword)
  ) {
    return { error: "Invalid email or password" };
  }

  await createSession(email);
  redirect(next.startsWith("/admin") ? next : "/admin");
}
