'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { locale, setLocale } = useApp();

  return (
    <div
      role="radiogroup"
      aria-label="Language selection"
      className={`inline-flex items-center p-0.5 rounded-full border border-line bg-surface text-xs font-medium ${className}`}
    >
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'en'}
        onClick={() => setLocale('en')}
        className={`px-2.5 py-1 rounded-full transition-all duration-150 ${
          locale === 'en'
            ? 'bg-ink text-surface font-semibold shadow-xs'
            : 'text-ink-muted hover:text-ink'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'hi'}
        onClick={() => setLocale('hi')}
        className={`px-2.5 py-1 rounded-full transition-all duration-150 ${
          locale === 'hi'
            ? 'bg-ink text-surface font-semibold shadow-xs'
            : 'text-ink-muted hover:text-ink'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};

