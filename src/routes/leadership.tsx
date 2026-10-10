import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { EmptyState } from '../components/shared/EmptyState';

export const Route = createFileRoute('/leadership')({
  head: () => ({
    meta: [
      { title: 'Leadership | R2WMS' },
      { name: 'description', content: 'Meet the leadership team of R2WMS.' },
    ],
  }),
  component: Leadership,
});

function Leadership() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('nav.leadership')}</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-muted-foreground mb-12">
            R2WMS is led by a dedicated team of experienced professionals and community leaders.
          </p>
          <EmptyState message="Leadership profiles will be listed once confirmed by the association." />
        </div>
      </div>
    </PublicLayout>
  );
}
