import { createFileRoute } from '@tanstack/react-router';
import { LoginEntry } from '@/components/association/login-entry';

export const Route = createFileRoute('/auth')({
  head: () => ({ meta: [
    { title: 'Account Access | R2WMS' },
    { name: 'description', content: 'Sign in to the R2WMS association browser-local demo.' },
    { property: 'og:title', content: 'Account Access | R2WMS' },
    { property: 'og:description', content: 'Sign in to the R2WMS association browser-local demo.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: LoginEntry,
});
