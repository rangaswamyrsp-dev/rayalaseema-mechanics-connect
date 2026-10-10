import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { EmptyState } from '../components/shared/EmptyState';

export const Route = createFileRoute('/events')({
  head: () => ({
    title: 'Events | R2WMS',
    meta: [
      { name: 'description', content: 'Upcoming events and association meetings of R2WMS.' },
    ],
  }),
  component: Events,
});

function Events() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('nav.events')}</h1>
        <EmptyState />
      </div>
    </PublicLayout>
  );
}
