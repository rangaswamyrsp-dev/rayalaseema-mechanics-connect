import { createFileRoute } from '@tanstack/react-router';
import { AssociationApp } from '@/components/association/portal';

export const Route = createFileRoute('/blood-donors')({
  head: () => ({ meta: [{ title: 'Blood Donors | R2WMS' }, { name: 'description', content: 'R2WMS member blood donor registry for emergencies across Rayalaseema.' }, { property: 'og:title', content: 'Blood Donors | R2WMS' }, { property: 'og:description', content: 'R2WMS member blood donor registry.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: AssociationApp,
});
