import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FAQS } from "@/lib/site-config";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-30 bg-background py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-10 lg:grid-cols-3 lg:gap-16 lg:px-16">
        <div>
          <Badge
            variant="outline"
            className="rounded-none border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            FAQ
          </Badge>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Common Questions
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Answers grounded in our public ACRA registration. Can&apos;t find
            what you need? Reach out directly.
          </p>
        </div>

        <div className="lg:col-span-2">
          <Accordion>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-base font-bold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
