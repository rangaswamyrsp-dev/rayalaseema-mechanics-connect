import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';

export const Route = createFileRoute('/offers')({
  head: () => ({ meta: [
    { title: 'Member Offers | R2WMS' },
    { name: 'description', content: 'Illustrative partner offers in your R2WMS demo portal.' },
    { property: 'og:title', content: 'Member Offers | R2WMS' },
    { property: 'og:description', content: 'Illustrative partner offers in your R2WMS demo portal.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AssociationApp,
});
