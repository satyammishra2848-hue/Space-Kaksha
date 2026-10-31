'use client';

import React from 'react';
import Link from 'next/link';
import { KakshaLogo } from '@/components/ui/KakshaLogo';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="w-full bg-paper border-t border-line py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <KakshaLogo />
        </div>

        {/* Center: Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-ink-muted" aria-label="Footer navigation">
          <Link href="/#how-it-works" className="hover:text-ink transition-colors">
            {t('nav_how_it_works')}
          </Link>
          <Link href="/#levels" className="hover:text-ink transition-colors">
            {t('nav_levels')}
          </Link>
          <Link href="/#explore" className="hover:text-ink transition-colors">
            {t('nav_explore')}
          </Link>
          <Link href="/#about" className="hover:text-ink transition-colors">
            {t('nav_about')}
          </Link>
          <span className="inline-flex items-center gap-1.5 text-ink-muted/80 cursor-default">
            {t('nav_contact')}
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-surface-muted text-ink-faint border border-line">
              {t('soon_badge')}
            </span>
          </span>
        </nav>

        {/* Right: Language toggle, social icons & copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <LanguageToggle />

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-ink-soft">
            <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center hover:border-ink hover:text-ink transition-all cursor-pointer" title="YouTube">
              ▶
            </span>
            <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center hover:border-ink hover:text-ink transition-all cursor-pointer text-xs" title="Instagram">
              📷
            </span>
            <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center hover:border-ink hover:text-ink transition-all cursor-pointer font-bold text-xs" title="X">
              𝕏
            </span>
            <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center hover:border-ink hover:text-ink transition-all cursor-pointer text-xs font-bold" title="LinkedIn">
              in
            </span>
          </div>

          <p className="text-xs text-ink-faint">
            {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

