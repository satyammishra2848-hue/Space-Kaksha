'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { useApp } from '@/context/AppContext';

interface LessonCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  xpEarned?: number;
  nextLessonHref?: string;
  nextLessonTitle?: string;
}

export const LessonCompleteModal: React.FC<LessonCompleteModalProps> = ({
  isOpen,
  onClose,
  lessonTitle,
  xpEarned = 50,
  nextLessonHref = '/lesson/discover-planets',
  nextLessonTitle = 'Discover Planets',
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
      aria-labelledby="lesson-complete-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/70 backdrop-blur-xs overflow-y-auto"
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
            <Link
              href="/path"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink transition-colors"
            >
              ← Back to My Path
            </Link>

            <h2 id="lesson-complete-title" className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink leading-tight">
              LESSON <br />
              <span className="text-orange">COMPLETE!</span>
            </h2>

            <p className="text-base font-bold text-ink">
              Great job, {user.name}!
            </p>
            <p className="text-xs sm:text-sm text-ink-muted">
              You&apos;ve completed <strong className="text-ink">{lessonTitle}</strong> and earned new rewards.
            </p>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-line bg-night shadow-sm">
              <Image
                src="/assets/illustrations/mascot_celebrating_complete.png"
                alt="Cheering astronaut and robot celebrating"
                fill
                className="object-contain p-2"
              />
              <div className="absolute bottom-3 left-3 bg-night/80 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-hand text-yellow">
                Small Steps Bigger Discoveries.
              </div>
            </div>
          </div>

          {/* Right Rewards & Next Mission Column */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Rewards Card */}
            <div className="bg-surface p-5 rounded-2xl border border-line space-y-3">
              <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                Rewards Earned
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-paper-warm border border-line/60">
                  <span className="text-lg">⭐</span>
                  <span className="text-xs font-bold text-ink block mt-1">+{xpEarned} XP</span>
                  <span className="text-[10px] text-ink-muted">Lesson Bonus</span>
                </div>
                <div className="p-2.5 rounded-xl bg-lavender/30 border border-lavender/40">
                  <span className="text-lg">🌕</span>
                  <span className="text-xs font-bold text-ink block mt-1">Moon Explorer</span>
                  <span className="text-[10px] text-ink-muted">New Badge</span>
                </div>
                <div className="p-2.5 rounded-xl bg-orange/20 border border-orange/40">
                  <span className="text-lg">🔥</span>
                  <span className="text-xs font-bold text-ink block mt-1">{user.streakDays} Days</span>
                  <span className="text-[10px] text-ink-muted">Streak Kept</span>
                </div>
              </div>
            </div>

            {/* What you learned */}
            <div className="bg-surface p-4 rounded-2xl border border-line">
              <span className="text-xs font-bold text-ink uppercase block mb-2">
                What You Learned
              </span>
              <ul className="text-xs text-ink-soft space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Why the Moon shines by reflecting sunlight</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Phases of the Moon and orbital positions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Average distance of 384,400 km</span>
                </li>
              </ul>
            </div>

            {/* Next Lesson Preview */}
            <div className="bg-surface p-4 rounded-2xl border border-line flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-orange uppercase block">Up Next</span>
                <span className="text-sm font-bold text-ink">{nextLessonTitle}</span>
              </div>
              <span className="text-base text-orange">➔</span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <PrimaryButton href={nextLessonHref} size="md" variant="orange">
                Continue to Next Lesson →
              </PrimaryButton>
              <SecondaryButton href="/path" size="sm">
                View My Path
              </SecondaryButton>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
