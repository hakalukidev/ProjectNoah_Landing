import { Header } from "@/components/site/header";
import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { ProjectsPreview } from "@/components/sections/projects";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { getContactInfo } from "@/lib/server/contact";

export default async function Home() {
  const contact = await getContactInfo();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Header contact={contact} />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Statement />
        <Stats />
        <About />
        <Services />
        <ProjectsPreview />
        <Faq />
        <Contact contact={contact} />
      </main>
      <Footer contact={contact} />
    </div>
  );
}
