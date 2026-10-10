import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { EmptyState } from '../components/shared/EmptyState';
import { useI18n } from '../lib/i18n';

export const Route = createFileRoute('/notices')({
  head: () => ({
    title: 'Notices | R2WMS',
    meta: [
      { name: 'description', content: 'Official announcements and notices from R2WMS.' },
    ],
  }),
  component: Notices,
});

function Notices() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Association Notices</h1>
        <EmptyState />
      </div>
    </PublicLayout>
  );
}
