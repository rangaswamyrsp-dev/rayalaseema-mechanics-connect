import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';

export const Route = createFileRoute('/terms')({
  head: () => ({
    title: 'Terms of Service | R2WMS',
  }),
  component: Terms,
});

function Terms() {
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-navy">Terms of Service</h1>
        <div className="prose prose-sm max-w-none">
          <p>Last updated: June 2026</p>
          <p>By using the R2WMS website and services, you agree to these terms and conditions.</p>
          <h2 className="text-xl font-bold mt-8 mb-4">1. Membership</h2>
          <p>Membership is subject to verification and approval by the R2WMS board. We reserve the right to revoke membership for violations of association rules.</p>
          <h2 className="text-xl font-bold mt-8 mb-4">2. Use of Services</h2>
          <p>Our services and welfare schemes are provided for the benefit of registered members. Misuse of these services may lead to termination of membership.</p>
        </div>
      </div>
    </PublicLayout>
  );
}
