import { createFileRoute } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Route = createFileRoute('/contact')({
  head: () => ({
    title: 'Contact Us | R2WMS',
    meta: [
      { name: 'description', content: 'Get in touch with R2WMS for queries and support.' },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  return (
    <PublicLayout>
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">{t('nav.contact')}</h1>
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-navy">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and our team will get back to you within 24-48 hours.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="+91 00000 00000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="How can we help you?" className="min-h-[120px]" />
              </div>
              <Button className="w-full bg-navy hover:bg-navy/90 text-white">Send Message</Button>
            </form>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-navy">Office Information</h2>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Regional Head Office</h3>
                <p className="text-sm text-muted-foreground">Rayalaseema Region, Andhra Pradesh, India</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Helpline</h3>
                <p className="text-sm text-muted-foreground">+91 1800-R2WMS-HELP</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-sm text-muted-foreground">support@r2wms.org</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
