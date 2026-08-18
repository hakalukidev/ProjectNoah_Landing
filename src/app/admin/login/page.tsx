"use client";

import { useActionState } from "react";

import { loginAction } from "@/lib/server/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <form
        action={formAction}
        className="w-full max-w-sm border border-neutral-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-extrabold tracking-tight text-neutral-900">
          Admin Login
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Project Noah content management
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-xs font-bold uppercase tracking-wide text-neutral-500">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoFocus
              autoComplete="username"
              className="h-11 rounded-none border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition-colors focus:border-[#e01f22]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-neutral-500">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-11 rounded-none border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition-colors focus:border-[#e01f22]"
            />
          </div>

          {state?.error && (
            <p className="text-sm font-medium text-[#e01f22]">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 h-11 rounded-none bg-[#e01f22] text-sm font-bold text-white transition-colors hover:bg-[#b81a1c] disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
