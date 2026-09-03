import { ContactEditor } from "@/components/admin/contact-editor";
import { getContactInfo } from "@/lib/server/contact";

export default async function AdminContactPage() {
  const contact = await getContactInfo();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Contact Info</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Shown across the top bar, footer, contact section and WhatsApp button on the public site.
      </p>
      <ContactEditor contact={contact} />
    </div>
  );
}
