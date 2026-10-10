import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { EmptyState } from '../components/shared/EmptyState';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';

export const Route = createFileRoute('/find-a-mechanic')({
  head: () => ({
    title: 'Find a Mechanic | R2WMS Directory',
    meta: [
      { name: 'description', content: 'Search for certified professional mechanics in Rayalaseema.' },
    ],
  }),
  component: FindAMechanic,
});

function FindAMechanic() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{t('home.findMechanic')}</h1>
        <p className="text-muted-foreground mb-12">Search our verified database of professional mechanics.</p>
        
        <div className="max-w-2xl mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input className="pl-10 h-12" placeholder="Search by name, location, or specialty..." />
          </div>
        </div>

        <EmptyState message="The mechanic directory will be available once member verifications are complete." />
      </div>
    </PublicLayout>
  );
}
