import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";

type FAQItem = {
  question: string;
  answer: readonly string[];
};

type FAQProps = {
  title: string;
  items: readonly FAQItem[];
};

export function FAQ({ title, items }: FAQProps) {
  return (
    <Section>
      <FadeIn>
        <SectionHeader title={title} />
        <Accordion multiple className="mx-auto max-w-3xl">
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="py-4 text-left text-base font-medium md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pb-4 text-muted-foreground">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </Section>
  );
}
