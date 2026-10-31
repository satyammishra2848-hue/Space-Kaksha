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
      className={`inline-flex items-center p-1 rounded-full border-2 border-[#171715] bg-[#FFFEFA] text-xs font-semibold select-none shadow-[2px_2px_0_#171715] ${className}`}
    >
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'en'}
        onClick={() => setLocale('en')}
        className="px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer text-center leading-none"
        style={{
          backgroundColor: locale === 'en' ? '#171715' : 'transparent',
          color: locale === 'en' ? '#FFFFFF' : '#5C5850',
        }}
      >
        EN
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'hi'}
        onClick={() => setLocale('hi')}
        className="px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer text-center leading-none"
        style={{
          backgroundColor: locale === 'hi' ? '#171715' : 'transparent',
          color: locale === 'hi' ? '#FFFFFF' : '#5C5850',
        }}
      >
        हिंदी
      </button>
    </div>
  );
};
