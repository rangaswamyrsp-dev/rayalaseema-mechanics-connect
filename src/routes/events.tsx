import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';

export const Route = createFileRoute('/events')({
  head: () => ({ meta: [
    { title: 'Events | R2WMS' },
    { name: 'description', content: 'Upcoming example events in your R2WMS demo portal.' },
    { property: 'og:title', content: 'Events | R2WMS' },
    { property: 'og:description', content: 'Upcoming example events in your R2WMS demo portal.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AssociationApp,
});
