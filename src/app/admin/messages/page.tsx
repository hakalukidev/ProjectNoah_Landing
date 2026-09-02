import type { Metadata } from "next";
import { Inbox } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Messages",
};

export default function AdminMessagesPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-sm text-muted-foreground">
          Enquiries submitted through the site&apos;s contact form.
        </p>
      </div>

      <Card className="border-none shadow-sm ring-1 ring-foreground/5">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            No contact-form submissions are wired up to this panel yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Inbox className="size-5" />
            </div>
            <p className="text-sm font-medium">No messages</p>
            <p className="text-xs text-muted-foreground">
              New enquiries will show up here once the contact form is
              connected to a backend.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
