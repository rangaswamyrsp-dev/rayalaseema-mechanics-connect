import { createFileRoute } from '@tanstack/react-router';
import { LoginEntry } from '@/components/association/login-entry';

export const Route = createFileRoute('/register')({
  head: () => ({ meta: [
    { title: 'Register | R2WMS' },
    { name: 'description', content: 'Create a browser-local R2WMS member demo profile.' },
    { property: 'og:title', content: 'Register | R2WMS' },
    { property: 'og:description', content: 'Create a browser-local R2WMS member demo profile.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: () => <LoginEntry register />,
});
