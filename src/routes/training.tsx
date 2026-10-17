import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';

export const Route = createFileRoute('/training')({
  head: () => ({ meta: [
    { title: 'Training | R2WMS' },
    { name: 'description', content: 'Training programs and browser-local demo enrollments.' },
    { property: 'og:title', content: 'Training | R2WMS' },
    { property: 'og:description', content: 'Training programs and browser-local demo enrollments.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: AssociationApp,
});
