import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Logo } from '../icons/Logo';
import { useI18n } from '../../lib/i18n';
import { Menu, X, Globe, User, LogIn } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  const { lang, changeLanguage, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/leadership', label: t('nav.leadership') },
    { to: '/membership-info', label: t('nav.membership') },
    { to: '/welfare-services', label: t('nav.welfare') },
    { to: '/find-a-mechanic', label: t('nav.directory') },
    { to: '/events', label: t('nav.events') },
    { to: '/training', label: t('nav.training') },
    { to: '/offers', label: t('nav.offers') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-10 h-10 text-primary" />
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none text-navy">R2WMS</span>
              <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Rayalaseema</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                activeProps={{ className: 'text-primary font-bold' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => changeLanguage(lang === 'en' ? 'te' : 'en')}
              className="flex items-center gap-1 text-xs"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? 'తెలుగు' : 'English'}</span>
            </Button>

            <div className="hidden sm:flex items-center gap-2 ml-2 border-l pl-4">
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-xs">
                  <LogIn className="w-4 h-4 mr-1" />
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="text-xs bg-orange hover:bg-orange/90 text-white">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="xl:hidden bg-card border-t py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground"
              activeProps={{ className: 'text-primary font-bold' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t flex flex-col gap-2">
            <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start text-sm">
                <LogIn className="w-4 h-4 mr-2" />
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full justify-start text-sm bg-orange hover:bg-orange/90 text-white">
                <User className="w-4 h-4 mr-2" />
                {t('nav.register')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
