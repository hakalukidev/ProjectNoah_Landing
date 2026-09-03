"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { WhatsappIcon } from "@/components/site/social-icons";
import { cn } from "@/lib/utils";
import type { ContactInfo } from "@/lib/server/contact";

const fieldClass =
  "h-11 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/15";
const labelClass = "text-sm font-semibold text-foreground";

/** Trade groupings a caller can pick from - broader than the full service
    catalogue so the chip row stays scannable. */
const HELP_OPTIONS = [
  "Roofing",
  "Canopy / Shelter",
  "Steel Fabrication",
  "Glass & Aluminium",
  "ACP Cladding",
  "Waterproofing",
  "Maintenance",
  "Not sure yet",
];

const REFERRAL_OPTIONS = [
  "Google search",
  "Referral / word of mouth",
  "Facebook or Instagram",
  "YouTube",
  "Worked with you before",
  "Drove past a site",
  "Other",
];

type Tab = "brief" | "call";

export function ContactBrief({ contact }: { contact: ContactInfo }) {
  const [tab, setTab] = useState<Tab>("brief");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [problem, setProblem] = useState("");
  const [referral, setReferral] = useState("");
  const [help, setHelp] = useState<string[]>([]);

  const whatsappNumber = contact.whatsapp.replace(/\D/g, "");
  const address = `${contact.address.line1}, ${contact.address.line2}, Singapore ${contact.address.postalCode}`;

  const toggleHelp = (option: string) =>
    setHelp((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );

  /** Plain-text body of the emailed brief. */
  const briefBody = () =>
    [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Contact number: ${phone}` : null,
      location ? `Site location: ${location}` : null,
      help.length ? `Help needed: ${help.join(", ")}` : null,
      referral ? `Heard about us via: ${referral}` : null,
      "",
      "The problem right now:",
      problem,
    ]
      .filter((line) => line !== null)
      .join("\n");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Project brief from ${name || "website"}${
      help.length ? ` (${help.join(", ")})` : ""
    }`;

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(briefBody())}`;
  };

  const CALL_CHANNELS = [
    {
      icon: Phone,
      label: "Call us",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s+/g, "")}`,
      note: "Fastest for urgent leaks and site emergencies.",
    },
    {
      icon: WhatsappIcon,
      label: "WhatsApp",
      value: contact.phone,
      href: `https://wa.me/${whatsappNumber}`,
      note: "Send photos of the affected area and we'll advise.",
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      note: "Best for tender documents and drawings.",
    },
    {
      icon: MapPin,
      label: "Visit our office",
      value: address,
      href: `https://www.google.com/maps?q=${encodeURIComponent(address)}`,
      note: "Mon - Fri, 9:00 AM - 6:00 PM.",
    },
  ];

  return (
    <div className="border border-border bg-white shadow-xl shadow-neutral-900/5">
      {/* Segmented control - a two-state switch between the written brief and
          the direct-contact channels. */}
      <div className="border-b border-border p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-1 bg-neutral-100 p-1">
          {(
            [
              { id: "brief", label: "Send a Brief", icon: Mail },
              { id: "call", label: "Call or WhatsApp", icon: Phone },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={cn(
                "flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold transition-colors",
                tab === id
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "brief" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 sm:p-8">
          <h2 className="text-xl font-extrabold tracking-tight text-foreground">
            Tell us about your site.
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="brief-name" className={labelClass}>
                Your Name <span className="text-primary">*</span>
              </label>
              <input
                id="brief-name"
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
              <label htmlFor="brief-email" className={labelClass}>
                Work Email <span className="text-primary">*</span>
              </label>
              <input
                id="brief-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
                placeholder="name@company.com.sg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="brief-phone" className={labelClass}>
                Contact Number{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              <input
                id="brief-phone"
                name="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className={fieldClass}
                placeholder="+65 0000 0000"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="brief-location" className={labelClass}>
                Site Location{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </label>
              <input
                id="brief-location"
                name="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className={fieldClass}
                placeholder="Building name or area"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="brief-problem" className={labelClass}>
              What&apos;s the #1 problem on your site right now?{" "}
              <span className="text-primary">*</span>
            </label>
            <textarea
              id="brief-problem"
              name="problem"
              required
              rows={5}
              value={problem}
              onChange={(event) => setProblem(event.target.value)}
              className="resize-none rounded-none border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="Tell us what's leaking or what you're building - roof height, affected areas and any timeline constraints."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="brief-referral" className={labelClass}>
              How did you get to know about us?{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            {/* Native select with the chevron drawn on top - keeps the square
                field styling without pulling in a popup component. */}
            <div className="relative">
              <select
                id="brief-referral"
                name="referral"
                value={referral}
                onChange={(event) => setReferral(event.target.value)}
                className={cn(
                  fieldClass,
                  "appearance-none pr-10",
                  !referral && "text-muted-foreground/70"
                )}
              >
                <option value="">Select</option>
                {REFERRAL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground/70" />
            </div>
          </div>

          {/* Multi-select chips - plain toggle buttons rather than checkboxes;
              the selection is folded into the emailed brief on submit. */}
          <fieldset className="flex flex-col gap-3">
            <legend className={labelClass}>
              What help do you need?{" "}
              <span className="font-normal text-muted-foreground">
                (pick all that apply)
              </span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {HELP_OPTIONS.map((option) => {
                const selected = help.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleHelp(option)}
                    aria-pressed={selected}
                    className={cn(
                      "flex items-center gap-1.5 border px-3 py-2 text-sm font-medium transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-white text-foreground/80 hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {selected ? <Check className="size-3.5" /> : null}
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-1 flex h-13 w-full items-center justify-center gap-2 bg-neutral-950 px-8 text-base font-semibold text-white transition-colors hover:bg-primary"
          >
            Submit Brief
            <ArrowRight className="size-4" />
          </button>

          <div className="flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 shrink-0" />
              Your details are private and never shared.
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 shrink-0 text-primary" />
              Replies within 1 business day.
            </span>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-foreground">
              Rather speak to someone?
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Reach us directly on any of these - Mon to Fri, 9:00 AM to 6:00
              PM.
            </p>
          </div>

          <div className="flex flex-col gap-px bg-border">
            {CALL_CHANNELS.map(({ icon: Icon, label, value, href, note }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group flex items-start gap-4 bg-white p-4 transition-colors hover:bg-neutral-50"
              >
                <span className="flex size-11 shrink-0 items-center justify-center border border-primary/20 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {value}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {note}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer noopener"
            className="flex h-13 w-full items-center justify-center gap-2 bg-neutral-950 px-8 text-base font-semibold text-white transition-colors hover:bg-primary"
          >
            <WhatsappIcon className="size-5" />
            Message us on WhatsApp
          </a>

          <p className="flex items-center gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
            <Clock className="size-3.5 shrink-0 text-primary" />
            Outside office hours? Leave a message and we&apos;ll call you back
            the next business day.
          </p>
        </div>
      )}
    </div>
  );
}
