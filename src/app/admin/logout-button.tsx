"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { logoutAction } from "./actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button variant="ghost" size="sm" type="submit">
        Logout
        <LogOut data-icon="inline-end" />
      </Button>
    </form>
  );
}
