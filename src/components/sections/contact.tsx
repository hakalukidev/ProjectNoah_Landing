"use client";

import { useState, type FormEvent } from "react";
import { Clock, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlurFade } from "@/components/ui/blur-fade";
import { siteConfig } from "@/lib/site-config";
import { toast } from "sonner";

const details = [
  {
    icon: MapPin,
    label: "Our Office",
    value: siteConfig.address.full,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: siteConfig.hours,
  },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks — we'll be in touch within one business day.");
      form.reset();
    }, 900);
  }

  return (
    <section id="contact" className="section-py bg-ink">
      <div className="container-px grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
        <BlurFade inView inViewMargin="-100px" className="lg:col-span-2">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Get In Touch
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold text-white sm:text-4xl">
            Let&rsquo;s Talk About Your Project
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Reach out for a free consultation and site visit — no obligation,
            just an honest assessment and a clear quote.
          </p>

          <div className="mt-9 flex flex-col gap-5">
            {details.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-white/50">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className="w-fit">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </BlurFade>

        <BlurFade inView inViewMargin="-100px" delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Tan" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+65 9123 4567"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="service">Service Needed</Label>
                <Input
                  id="service"
                  name="service"
                  placeholder="e.g. Roofing, Renovation"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your site, timeline and budget..."
                  className="min-h-32"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-brand text-brand-foreground hover:bg-brand-dark sm:w-auto sm:px-10"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="size-4" />
                </>
              )}
            </Button>
          </form>
        </BlurFade>
      </div>
    </section>
  );
}
