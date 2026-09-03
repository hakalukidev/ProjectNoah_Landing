"use client";

import { useActionState } from "react";

import { updateContactAction } from "@/lib/server/actions";
import type { ContactInfo } from "@/lib/server/contact";

const FIELD_CLASS =
  "h-11 rounded-none border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-primary";
const LABEL_CLASS = "text-xs font-bold uppercase tracking-wide text-muted-foreground";

export function ContactEditor({ contact }: { contact: ContactInfo }) {
  const [state, formAction, pending] = useActionState(updateContactAction, undefined);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={LABEL_CLASS}>Phone</label>
          <input id="phone" name="phone" defaultValue={contact.phone} required className={FIELD_CLASS} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="whatsapp" className={LABEL_CLASS}>WhatsApp Number (digits only)</label>
          <input id="whatsapp" name="whatsapp" defaultValue={contact.whatsapp} required className={FIELD_CLASS} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className={LABEL_CLASS}>Email</label>
        <input id="email" name="email" type="email" defaultValue={contact.email} required className={FIELD_CLASS} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="addressLine1" className={LABEL_CLASS}>Address Line 1</label>
          <input id="addressLine1" name="addressLine1" defaultValue={contact.address.line1} className={FIELD_CLASS} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="addressLine2" className={LABEL_CLASS}>Address Line 2</label>
          <input id="addressLine2" name="addressLine2" defaultValue={contact.address.line2} className={FIELD_CLASS} />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:w-1/2">
        <label htmlFor="postalCode" className={LABEL_CLASS}>Postal Code</label>
        <input id="postalCode" name="postalCode" defaultValue={contact.address.postalCode} className={FIELD_CLASS} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="youtube" className={LABEL_CLASS}>YouTube URL</label>
          <input id="youtube" name="youtube" defaultValue={contact.social.youtube} className={FIELD_CLASS} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="facebook" className={LABEL_CLASS}>Facebook URL</label>
          <input id="facebook" name="facebook" defaultValue={contact.social.facebook} className={FIELD_CLASS} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="instagram" className={LABEL_CLASS}>Instagram URL</label>
          <input id="instagram" name="instagram" defaultValue={contact.social.instagram} className={FIELD_CLASS} />
        </div>
      </div>

      {state?.error && <p className="text-sm font-medium text-[#ad1111]">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="h-11 w-fit rounded-none bg-[#ad1111] px-8 text-sm font-bold text-white transition-colors hover:bg-[#8e0e0e] disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
