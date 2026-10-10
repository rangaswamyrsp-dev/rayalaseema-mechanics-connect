import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { EmptyState } from '../components/shared/EmptyState';

export const Route = createFileRoute('/welfare-services')({
  head: () => ({
    meta: [
      { title: 'Welfare Services | R2WMS' },
      { name: 'description', content: 'Explore the welfare schemes offered by R2WMS.' },
    ],
  }),
  component: WelfareServices,
});

function WelfareServices() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('home.welfareOverview')}</h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
          R2WMS offers various welfare schemes designed to provide financial and social security to our members and their families during difficult times.
        </p>
        <EmptyState message="Detailed welfare schemes will be published once finalized by the board." />
      </div>
    </PublicLayout>
  );
}
