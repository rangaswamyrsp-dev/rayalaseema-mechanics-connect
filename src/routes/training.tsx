import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { EmptyState } from '../components/shared/EmptyState';

export const Route = createFileRoute('/training')({
  head: () => ({
    title: 'Training & Skill Development | R2WMS',
    meta: [
      { name: 'description', content: 'Technical training and skill development programs for mechanics.' },
    ],
  }),
  component: Training,
});

function Training() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('nav.training')}</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          We organize regular technical workshops and skill upgrade programs to keep our members updated with the latest two-wheeler technologies.
        </p>
        <EmptyState message="Upcoming training sessions will be posted here." />
      </div>
    </PublicLayout>
  );
}
