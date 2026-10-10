import React from 'react';
import { Link } from '@tanstack/react-router';
import { Logo } from '../icons/Logo';
import { useI18n } from '../../lib/i18n';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo className="w-12 h-12 text-orange" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold leading-none text-white">R2WMS</span>
                <span className="text-[10px] font-bold text-orange uppercase tracking-wider">
                  Roadside 2-Wheeler Mechanics Society
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm">
              {t('home.heroDescription')}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">{t('nav.membership')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/membership-info" className="hover:text-orange transition-colors">Benefits</Link></li>
              <li><Link to="/register" className="hover:text-orange transition-colors">Apply Now</Link></li>
              <li><Link to="/faq" className="hover:text-orange transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">{t('nav.contact')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-orange transition-colors">Support</Link></li>
              <li><Link to="/privacy" className="hover:text-orange transition-colors">{t('common.privacy')}</Link></li>
              <li><Link to="/terms" className="hover:text-orange transition-colors">{t('common.terms')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-navy-light pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
          <span>&copy; {year} R2WMS. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy">{t('common.privacy')}</Link>
            <Link to="/terms">{t('common.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
