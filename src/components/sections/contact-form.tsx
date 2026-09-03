"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

const fieldClass =
  "h-11 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";
const labelClass =
  "text-xs font-bold uppercase tracking-wide text-muted-foreground";

export function ContactForm({
  recipientEmail,
  whatsapp,
  serviceTitles,
}: {
  recipientEmail: string;
  /** Digits-only or formatted number; a wa.me handoff is offered when given. */
  whatsapp?: string;
  /** Enquiry categories - the live service catalogue, so the dropdown
      always matches what the site actually offers. */
  serviceTitles: string[];
}) {
  const WORK_TYPES = [
    "General building maintenance",
    ...serviceTitles,
    "Other / not sure yet",
  ];
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workType, setWorkType] = useState(WORK_TYPES[0]);
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  /** Shared plain-text body for both the mailto and the WhatsApp handoff. */
  const enquiryBody = () =>
    [
      `Name: ${name}`,
      company ? `Company / MCST: ${company}` : null,
      `Email: ${email}`,
      phone ? `Contact number: ${phone}` : null,
      `Type of works: ${workType}`,
      location ? `Site location: ${location}` : null,
      "",
      "Project details:",
      details,
    ]
      .filter((line) => line !== null)
      .join("\n");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      `Enquiry (${workType}) from ${name || "website"}`
    )}&body=${encodeURIComponent(enquiryBody())}`;

    window.location.href = mailto;
  };

  const handleWhatsapp = () => {
    const number = (whatsapp ?? "").replace(/\D/g, "");
    if (!number) return;
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(enquiryBody())}`,
      "_blank",
      "noopener,noreferrer"
    );
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
          Send an Enquiry
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
            <label htmlFor="company" className={labelClass}>
              Company / MCST
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className={fieldClass}
              placeholder="Organisation name"
            />
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
              placeholder="name@company.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={labelClass}>
              Contact Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={fieldClass}
              placeholder="+65 0000 0000"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="workType" className={labelClass}>
            Type of Works
          </label>
          {/* Native select with the chevron drawn on top - keeps the square
              field styling without pulling in a popup component for one
              input. */}
          <div className="relative">
            <select
              id="workType"
              name="workType"
              value={workType}
              onChange={(event) => setWorkType(event.target.value)}
              className={`${fieldClass} appearance-none pr-10`}
            >
              {WORK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground/70" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="location" className={labelClass}>
            Site Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className={fieldClass}
            placeholder="Building name, address or area"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="details" className={labelClass}>
            Project Details <span className="text-primary">*</span>
          </label>
          <textarea
            id="details"
            name="details"
            required
            rows={5}
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            className="resize-none rounded-none border border-border bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
            placeholder="Describe the issue, building height, affected areas and any timeline constraints."
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-13 w-full rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
        >
          Send Enquiry
          <ArrowRight className="ml-1 size-4" />
        </Button>

        <p className="text-xs leading-relaxed text-muted-foreground">
          Your enquiry is emailed to our team.
          {whatsapp ? (
            <>
              {" "}
              Prefer WhatsApp?{" "}
              <button
                type="button"
                onClick={handleWhatsapp}
                className="font-bold text-primary underline underline-offset-2 hover:opacity-80"
              >
                Send these details on WhatsApp instead
              </button>{" "}
              - it opens with your details pre-filled so you can review before
              sending.
            </>
          ) : null}
        </p>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5 shrink-0" />
          We typically reply within one business day.
        </p>
      </div>
    </form>
  );
}
