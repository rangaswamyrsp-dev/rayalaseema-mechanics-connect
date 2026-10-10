import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';

export const Route = createFileRoute('/privacy')({
  head: () => ({
    title: 'Privacy Policy | R2WMS',
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-navy">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none">
          <p>Last updated: June 2026</p>
          <p>R2WMS respects your privacy and is committed to protecting your personal data. This policy explains how we handle your information when you use our website and services.</p>
          <h2 className="text-xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide during registration, such as your name, contact details, workshop information, and professional credentials.</p>
          <h2 className="text-xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use your information to manage your membership, provide welfare services, communicate association updates, and maintain our mechanic directory.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
