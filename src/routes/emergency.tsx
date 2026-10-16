import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';

export const Route = createFileRoute('/emergency')({
  head: () => ({ meta: [{ title: 'Emergency Help | R2WMS' }, { name: 'description', content: 'Emergency contact numbers and support for R2WMS members.' }, { property: 'og:title', content: 'Emergency Help | R2WMS' }, { property: 'og:description', content: 'Emergency contacts for R2WMS members.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: AssociationApp,
});
