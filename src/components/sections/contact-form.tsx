"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

const fieldClass =
  "h-11 rounded-none border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15";
const labelClass =
  "text-xs font-bold uppercase tracking-wide text-muted-foreground";

export function ContactForm({ recipientEmail }: { recipientEmail: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      `Quote request from ${name || "website"}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border border-border bg-white shadow-sm"
    >
      {/* Header bar - matches the document-style panels used elsewhere on
          the About page (Company Profile, Why Choose Us) for a consistent
          system look across the site. */}
      <div className="border-b border-border bg-neutral-950 px-6 py-4 sm:px-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">
          Send a Message
        </h3>
        <p className="mt-1 text-sm text-white/60">
          Fill in your details and we&apos;ll get back to you within one
          business day.
        </p>
      </div>

      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-primary">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={fieldClass}
              placeholder="+65 9xxx xxxx"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className={labelClass}>
            Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="resize-none rounded-none border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
            placeholder="Tell us about your site, scope, and timeline..."
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-13 w-full rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 sm:w-fit"
        >
          Send Message
        </Button>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          We typically reply within one business day.
        </p>
      </div>
    </form>
  );
}
