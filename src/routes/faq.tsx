import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export const Route = createFileRoute('/faq')({
  head: () => ({
    title: 'FAQ | R2WMS',
    meta: [
      { name: 'description', content: 'Frequently asked questions about R2WMS membership and services.' },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const { t } = useI18n();
  const faqs = [
    { q: 'What is R2WMS?', a: 'R2WMS stands for Roadside 2-Wheeler Mechanics Society, an association for mechanics in the Rayalaseema region.' },
    { q: 'How can I join R2WMS?', a: 'You can register online through our website or visit your local district representative.' },
    { q: 'What documents are required for membership?', a: 'You will need a valid ID proof, proof of address, and verification of your workshop or professional practice.' },
    { q: 'Is there a membership fee?', a: 'Yes, there is a nominal registration and annual fee to support the welfare funds and association activities.' },
  ];

  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('nav.faq')}</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PublicLayout>
  );
}
