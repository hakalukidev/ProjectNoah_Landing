import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { company, PROJECT_CATEGORIES } from "@/lib/site-config";
import { getProjects } from "@/lib/db";

export const metadata: Metadata = {
  title: "Projects",
  description: `A look at the project types ${company.legalName} delivers across Singapore: industrial, commercial, institutional and A&A works.`,
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-foreground">
      <Header />

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden bg-foreground py-24 text-background sm:py-32">
          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Portfolio
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Projects Built Across Singapore
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/60 sm:text-lg">
              Representative work spanning industrial, commercial and
              institutional construction, plus addition &amp; alteration
              works, delivered by {company.legalName} (UEN {company.uen}).
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-background/10 pt-8 sm:grid-cols-4">
              {[
                { value: projects.length, suffix: "+", label: "Projects Shown" },
                {
                  value: PROJECT_CATEGORIES.length - 1,
                  suffix: "",
                  label: "Categories",
                },
                { value: company.yearsInOperation, suffix: "+", label: "Years Active" },
                { value: 100, suffix: "%", label: "Singapore-Based" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div className="flex items-baseline text-3xl font-extrabold text-primary sm:text-4xl">
                    <span>{stat.value}</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-background/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground pb-24">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <ProjectsGrid projects={projects} />
          </div>
        </section>

        <section className="border-t border-background/10 bg-foreground py-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 text-center lg:px-8">
            <h2 className="max-w-xl text-2xl font-extrabold tracking-tight text-background sm:text-3xl">
              Have a site that needs a contractor like this?
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-background/60 sm:text-base">
              Tell us the scope and timeline, and we&apos;ll respond with next
              steps within one business day.
            </p>
            <Button
              render={<Link href="/#contact" />}
              nativeButton={false}
              size="lg"
              className="h-13 rounded-none bg-primary px-8 text-base text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              Get a Free Quote
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
