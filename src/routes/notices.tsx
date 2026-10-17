import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';

export const Route = createFileRoute('/notices')({
  head: () => ({ meta: [
    { title: 'Notices | R2WMS' },
    { name: 'description', content: 'Association announcements in your R2WMS demo portal.' },
    { property: 'og:title', content: 'Notices | R2WMS' },
    { property: 'og:description', content: 'Association announcements in your R2WMS demo portal.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AssociationApp,
});
