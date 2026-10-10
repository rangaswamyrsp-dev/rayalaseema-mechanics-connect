import { createFileRoute, Link } from '@tanstack/react-router';
import { PublicLayout } from '../components/shared/PublicLayout';
import { useI18n } from '../lib/i18n';
import { Button } from '../components/ui/button';
import { ArrowRight, Shield, Users, HeartHandshake, Search, BookOpen, Bell } from 'lucide-react';

export const Route = createFileRoute('/')({
  head: () => ({
    title: 'R2WMS | United Mechanics • Stronger Welfare • Better Future',
    meta: [
      { name: 'description', content: 'Rayalaseema Two-Wheeler Mechanics Society - Empowering mechanics through unity and welfare.' },
      { property: 'og:title', content: 'R2WMS | Home' },
      { property: 'og:description', content: 'United Mechanics • Stronger Welfare • Better Future' },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-navy py-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-orange/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-orange text-white text-[10px] font-bold uppercase tracking-widest mb-6">
              {t('home.tagline')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-white px-8 h-12">
                  {t('home.joinUs')} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-12">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card border rounded-xl shadow-lg -mt-20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-grow w-full">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  {t('home.findMechanic')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('home.directorySearch')}
                </p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter district or specialty..." 
                    className="flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <Link to="/find-a-mechanic">
                    <Button className="bg-primary text-white">Search</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welfare & Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Join R2WMS?</h2>
            <div className="w-20 h-1.5 bg-orange mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-primary mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('home.welfareOverview')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Comprehensive welfare schemes for mechanics and their families, providing security and support in times of need.
              </p>
              <Link to="/welfare-services" className="text-primary font-semibold text-sm flex items-center">
                Explore Schemes <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card p-8 rounded-xl border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-primary mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('home.membershipBenefits')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Access exclusive tool discounts, health insurance, and educational support for children of members.
              </p>
              <Link to="/membership-info" className="text-primary font-semibold text-sm flex items-center">
                View Benefits <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="bg-card p-8 rounded-xl border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-primary mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{t('nav.leadership')}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Represented by experienced mechanics who understand the challenges of the profession.
              </p>
              <Link to="/leadership" className="text-primary font-semibold text-sm flex items-center">
                Meet the Team <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Events Preview */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('home.noticesEvents')}</h2>
              <p className="text-muted-foreground">Stay updated with the latest association activities.</p>
            </div>
            <Link to="/events">
              <Button variant="ghost" className="text-primary">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl border overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-primary/10 flex items-center justify-center p-8">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
              <div className="p-6 md:w-2/3">
                <span className="text-[10px] font-bold text-orange uppercase tracking-widest mb-2 block">Next Workshop</span>
                <h3 className="text-lg font-bold mb-2">Modern EV Engine Maintenance</h3>
                <p className="text-sm text-muted-foreground mb-4">Learn about electric vehicle motors and battery management systems.</p>
                <Link to="/training">
                  <Button size="sm">Register for Training</Button>
                </Link>
              </div>
            </div>

            <div className="bg-card rounded-xl border overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-orange/10 flex items-center justify-center p-8">
                <Bell className="w-12 h-12 text-orange" />
              </div>
              <div className="p-6 md:w-2/3">
                <span className="text-[10px] font-bold text-navy uppercase tracking-widest mb-2 block">Recent Notice</span>
                <h3 className="text-lg font-bold mb-2">Annual General Meeting 2026</h3>
                <p className="text-sm text-muted-foreground mb-4">Join us for the annual meeting to discuss the future roadmap of the society.</p>
                <Link to="/notices">
                  <Button size="sm" variant="outline">Read Notice</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Support or Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our team is here to help you. Reach out to us for any membership queries or welfare support.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-navy text-white px-10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
