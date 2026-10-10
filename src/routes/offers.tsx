import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { EmptyState } from '../components/shared/EmptyState';

export const Route = createFileRoute('/offers')({
  head: () => ({
    title: 'Member Offers | R2WMS',
    meta: [
      { name: 'description', content: 'Exclusive offers and discounts for R2WMS members.' },
    ],
  }),
  component: Offers,
});

function Offers() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('nav.offers')}</h1>
        <EmptyState message="Partner offers and member discounts will appear here soon." />
      </div>
    </PublicLayout>
  );
}
