import { redirect } from "next/navigation";

import { AdminNav } from "@/components/admin/admin-nav";
import { isAuthenticated } from "@/lib/server/auth";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
