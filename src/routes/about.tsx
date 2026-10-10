import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Us | R2WMS' },
      { name: 'description', content: 'Learn about Roadside 2-Wheeler Mechanics Society (R2WMS).' },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('nav.about')}</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            The Roadside 2-Wheeler Mechanics Society (R2WMS) is a dedicated association committed to the welfare and professional growth of mechanics across the Rayalaseema region.
          </p>
          <h2 className="text-2xl font-bold mt-12 mb-4 text-navy">Our Mission</h2>
          <p className="mb-6">To unite all roadside two-wheeler mechanics under one umbrella, providing them with a collective voice, professional recognition, and comprehensive welfare support.</p>
          
          <h2 className="text-2xl font-bold mt-12 mb-4 text-navy">Our Vision</h2>
          <p className="mb-6">A future where every mechanic is empowered, skilled, and socially secure, contributing to a better and more professionalized service industry.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
