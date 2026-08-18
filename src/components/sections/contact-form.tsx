"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

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
      className="flex flex-col gap-5 border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-none border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="h-11 rounded-none border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            placeholder="+65 9xxx xxxx"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 rounded-none border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          placeholder="you@company.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-xs font-bold uppercase tracking-wide text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="resize-none rounded-none border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
          placeholder="Tell us about your site, scope, and timeline..."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-13 rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
      >
        Send Message
      </Button>
    </form>
  );
}
