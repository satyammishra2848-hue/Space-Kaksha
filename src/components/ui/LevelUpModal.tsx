'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { useApp } from '@/context/AppContext';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedLevelName?: string;
  unlockedLevelNumber?: number;
  xpBonus?: number;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  unlockedLevelName = 'Cadet',
  unlockedLevelNumber = 2,
  xpBonus = 100,
}) => {
  const { user } = useApp();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="levelup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/75 backdrop-blur-xs overflow-y-auto"
    >
      <div
        ref={modalRef}
        className="bg-paper rounded-3xl border border-line shadow-popover max-w-4xl w-full p-6 sm:p-10 relative overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-line bg-surface text-ink-muted hover:text-ink hover:border-ink flex items-center justify-center text-sm font-bold z-20 cursor-pointer"
          aria-label="Close dialog"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Celebration Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange text-ink font-bold text-xs uppercase tracking-wider">
              <span>✦</span>
              <span>CONGRATULATIONS!</span>
            </div>

            <h2 id="levelup-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-ink leading-tight">
              YOU LEVELED UP <br />
              <span className="text-orange">TO LEVEL {unlockedLevelNumber}!</span>
            </h2>

            <p className="text-sm sm:text-base font-semibold text-ink-soft">
              Great job, {user.name}! You&apos;ve completed Level 1 and unlocked a new orbit.
            </p>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-line bg-night shadow-sm">
              <Image
                src="/assets/illustrations/mascot_levelup_cadet.png"
                alt="Astronaut celebrating level 2 with mission flag"
                fill
                className="object-contain p-2"
              />
              <div className="absolute top-3 right-3 bg-night/85 px-3 py-1 rounded-full text-xs font-hand text-yellow">
                Bigger Topics. Brighter Discoveries.
              </div>
            </div>
          </div>

          {/* Right Rewards Column */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-surface p-5 rounded-2xl border border-line space-y-4">
              <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                Rewards Unlocked
              </span>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 rounded-xl bg-orange/15 border border-orange/30">
                  <span className="text-xl">⭐</span>
                  <span className="text-xs font-bold text-ink block mt-1">+{xpBonus} XP</span>
                  <span className="text-[10px] text-ink-muted">Level Bonus</span>
                </div>
                <div className="p-3 rounded-xl bg-lavender/30 border border-lavender/40">
                  <span className="text-xl">🎖️</span>
                  <span className="text-xs font-bold text-ink block mt-1">Cadet Badge</span>
                  <span className="text-[10px] text-ink-muted">New Rank</span>
                </div>
                <div className="p-3 rounded-xl bg-mint/30 border border-mint/40">
                  <span className="text-xl">🪐</span>
                  <span className="text-xs font-bold text-ink block mt-1">3 Lessons</span>
                  <span className="text-[10px] text-ink-muted">Unlocked</span>
                </div>
              </div>
            </div>

            {/* Level Comparison Card */}
            <div className="bg-paper-warm/50 p-4 rounded-2xl border border-line flex items-center justify-between">
              <div className="text-center flex-1">
                <span className="text-[10px] font-bold text-ink-muted uppercase block">Completed</span>
                <span className="text-xs font-bold text-ink">Level 1 Explorer</span>
                <span className="text-[11px] text-success block font-semibold">100% ✓</span>
              </div>
              <span className="text-orange font-bold text-base px-2">➔</span>
              <div className="text-center flex-1">
                <span className="text-[10px] font-bold text-orange uppercase block">Unlocked</span>
                <span className="text-xs font-bold text-ink">Level {unlockedLevelNumber} {unlockedLevelName}</span>
                <span className="text-[11px] text-orange block font-bold">New Orbit 🚀</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-2.5">
              <PrimaryButton href="/path" size="lg" variant="orange">
                Continue to Level {unlockedLevelNumber} →
              </PrimaryButton>
              <SecondaryButton href="/profile" size="sm">
                View Updated Profile
              </SecondaryButton>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

