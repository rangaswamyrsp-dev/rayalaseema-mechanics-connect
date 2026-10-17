import { createFileRoute } from '@tanstack/react-router';
import { LoginEntry } from '@/components/association/login-entry';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Sign In | R2WMS' },
    { name: 'description', content: 'Open your R2WMS browser-local demo profile or create a new one.' },
    { property: 'og:title', content: 'Sign In | R2WMS' },
    { property: 'og:description', content: 'Open your R2WMS browser-local demo profile or create a new one.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: LoginEntry,
});
