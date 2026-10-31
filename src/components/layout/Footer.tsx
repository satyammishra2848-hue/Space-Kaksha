'use client';

import React from 'react';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { KakshaLogo } from '@/components/ui/KakshaLogo';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useApp } from '@/context/AppContext';
import { useReducedMotion } from '@/context/MotionContext';

export const Footer: React.FC = () => {
  const { t } = useApp();
  const { reducedMotion, toggleReducedMotion } = useReducedMotion();

  return (
    <footer className="w-full bg-paper border-t border-line py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <KakshaLogo />
        </div>

        {/* Center: Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-ink-muted" aria-label="Footer navigation">
          <TransitionLink href="/#how-it-works" className="hover:text-ink transition-colors">
            {t('nav_how_it_works')}
          </TransitionLink>
          <TransitionLink href="/#levels" className="hover:text-ink transition-colors">
            {t('nav_levels')}
          </TransitionLink>
          <TransitionLink href="/#explore" className="hover:text-ink transition-colors">
            {t('nav_explore')}
          </TransitionLink>
          <TransitionLink href="/#about" className="hover:text-ink transition-colors">
            {t('nav_about')}
          </TransitionLink>
          <span className="inline-flex items-center gap-1.5 text-ink-muted/80 cursor-default">
            {t('nav_contact')}
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-surface-muted text-ink-faint border border-line">
              {t('soon_badge')}
            </span>
          </span>
        </nav>

        {/* Right: Language toggle, motion toggle, social icons & copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <LanguageToggle />

          {/* Accessible Reduced Motion Toggle */}
          <button
            type="button"
            onClick={toggleReducedMotion}
            className="text-xs px-2.5 py-1 rounded-full border border-line hover:border-ink transition-colors flex items-center gap-1.5 text-ink-muted hover:text-ink cursor-pointer bg-surface/80"
            title={reducedMotion ? "Enable animations" : "Reduce motion animations"}
            aria-pressed={reducedMotion}
          >
            <span className={`w-2 h-2 rounded-full transition-colors ${reducedMotion ? 'bg-orange' : 'bg-mint'}`} />
            <span>{reducedMotion ? "Motion: Off" : "Reduce motion"}</span>
          </button>

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

