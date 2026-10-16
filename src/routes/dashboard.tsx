import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';

export const Route = createFileRoute('/dashboard')({
  head: () => ({ meta: [{ title: 'Member Dashboard | R2WMS' }, { name: 'description', content: 'Your R2WMS member dashboard: membership, welfare, events and notices.' }, { property: 'og:title', content: 'Member Dashboard | R2WMS' }, { property: 'og:description', content: 'R2WMS member portal dashboard.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: AssociationApp,
});
