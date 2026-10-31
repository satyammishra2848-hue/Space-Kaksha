'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { KakshaLogo } from '@/components/ui/KakshaLogo';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { XpChip, StreakChip } from '@/components/ui/XpChip';
import { useApp } from '@/context/AppContext';

interface NavbarProps {
  variant?: 'logged-out' | 'logged-in' | 'auto';
  className?: string;
}

function NavbarInner({ variant = 'auto', className = '' }: NavbarProps) {
  const pathname = usePathname() || '/';
  const { user, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto determine variant based on current route
  const isPublicPage = pathname === '/' || pathname === '/test';
  const resolvedVariant = variant === 'auto' ? (isPublicPage ? 'logged-out' : 'logged-in') : variant;

  return (
    <header className={`w-full bg-paper/95 backdrop-blur-xs border-b border-line sticky top-0 z-40 transition-colors ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <KakshaLogo />
        </div>

        {/* Center / Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink-soft" aria-label="Main navigation">
          {resolvedVariant === 'logged-out' ? (
            <>
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
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`hover:text-ink transition-colors ${pathname === '/' ? 'text-ink font-semibold' : ''}`}
              >
                Home
              </Link>
              <Link
                href="/#explore"
                className="hover:text-ink transition-colors"
              >
                {t('nav_explore')}
              </Link>
              <Link
                href="/#levels"
                className="hover:text-ink transition-colors"
              >
                {t('nav_levels')}
              </Link>
              <Link
                href="/path"
                className={`hover:text-ink transition-colors ${pathname.startsWith('/path') ? 'text-ink font-bold underline decoration-orange decoration-2 underline-offset-4' : ''}`}
              >
                {t('nav_my_path')}
              </Link>
            </>
          )}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <LanguageToggle />

          {resolvedVariant === 'logged-out' ? (
            pathname === '/test' ? (
              <PrimaryButton href="/" size="sm" variant="ink">
                {t('nav_exit_test')}
              </PrimaryButton>
            ) : (
              <PrimaryButton href="/test" size="sm" variant="ink">
                {t('nav_start_test')}
              </PrimaryButton>
            )
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-2">
                <StreakChip days={user.streakDays} />
                <XpChip xp={user.xp} />
              </div>
              <Link
                href="/profile"
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-line bg-surface hover:border-ink transition-all group"
                title="View Profile"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-line bg-paper-warm">
                  <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                </div>
                <span className="text-xs font-semibold text-ink group-hover:text-orange transition-colors hidden sm:inline">
                  {user.name}
                </span>
                <span className="text-[10px] text-ink-muted">▼</span>
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-line text-ink hover:bg-paper-warm"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-surface px-4 py-4 space-y-3">
          <div className="flex flex-col gap-2.5 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded hover:bg-paper"
            >
              Home
            </Link>
            <Link
              href="/path"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded hover:bg-paper"
            >
              {t('nav_my_path')}
            </Link>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded hover:bg-paper"
            >
              {t('nav_profile')}
            </Link>
            <Link
              href="/tutor"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded hover:bg-paper"
            >
              {t('nav_tutor')}
            </Link>
            <Link
              href="/#levels"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded hover:bg-paper"
            >
              {t('nav_levels')}
            </Link>
          </div>
          {resolvedVariant === 'logged-in' && (
            <div className="pt-2 border-t border-line flex items-center justify-between text-xs">
              <StreakChip days={user.streakDays} />
              <XpChip xp={user.xp} />
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <Suspense fallback={
      <header className="w-full bg-paper border-b border-line h-16 flex items-center px-6">
        <KakshaLogo />
      </header>
    }>
      <NavbarInner {...props} />
    </Suspense>
  );
};
