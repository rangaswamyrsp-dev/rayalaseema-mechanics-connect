import { createFileRoute, Link } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { Button } from '../components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/membership-info')({
  head: () => ({
    meta: [
      { title: 'Membership Benefits | R2WMS' },
      { name: 'description', content: 'Discover the benefits of joining R2WMS.' },
    ],
  }),
  component: MembershipInfo,
});

function MembershipInfo() {
  const { t } = useI18n();
  const benefits = [
    'Official Recognition Card',
    'Family Welfare Insurance Coverage',
    'Special Discounts on Tools and Spare Parts',
    'Technical Training & Certification',
    'Educational Support for Children',
    'Legal and Professional Assistance',
  ];

  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('home.membershipBenefits')}</h1>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-muted-foreground mb-8">
              Being a member of R2WMS means more than just having an ID card. It means being part of a community that looks after your interests and your family's future.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
            <Link to="/register">
              <Button size="lg" className="bg-orange hover:bg-orange/90 text-white">
                Join Today
              </Button>
            </Link>
          </div>
          <div className="bg-secondary/20 p-8 rounded-2xl border border-dashed border-primary/20">
            <h3 className="text-xl font-bold mb-4">Membership Eligibility</h3>
            <p className="text-sm text-muted-foreground mb-6">
              To be eligible for R2WMS membership, you must be a practicing two-wheeler mechanic residing in the Rayalaseema region.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Registration Fee</span>
                <span className="font-bold">Contact for Details</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span>Annual Renewal</span>
                <span className="font-bold">Nominal Charge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
