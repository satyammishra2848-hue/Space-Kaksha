'use client';

import React from 'react';
import { TransitionLink } from '@/components/motion/TransitionLink';

interface LessonNavBarProps {
  onComplete: () => void;
  prevHref?: string;
  currentOrder?: number;
}

export const LessonNavBar: React.FC<LessonNavBarProps> = ({
  onComplete,
  prevHref = '/path',
  currentOrder = 2,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-surface border-[1.5px] border-ink shadow-[3px_3px_0_var(--ink)] mt-6">
      {/* Previous Lesson Button */}
      <TransitionLink
        href={prevHref}
        className="px-4 py-2 rounded-lg border border-line hover:border-ink bg-surface text-xs font-bold text-ink transition-all hover:bg-paper-warm flex items-center gap-1.5"
      >
        <span>←</span>
        <span>Previous Lesson</span>
      </TransitionLink>

      {/* Step Dots Indicators */}
      <div className="flex items-center gap-2 select-none" aria-label="Lesson progress steps">
        {[1, 2, 3, 4].map((step) => {
          if (step < currentOrder) {
            return (
              <span
                key={step}
                className="w-7 h-7 rounded-full border border-mint bg-mint/15 text-mint flex items-center justify-center text-xs font-bold"
                title={`Lesson ${step}: Completed`}
              >
                ✓
              </span>
            );
          }
          if (step === currentOrder) {
            return (
              <span
                key={step}
                className="w-7 h-7 rounded-full border-2 border-ink bg-[#F2A23A] text-[#171715] flex items-center justify-center text-xs font-black shadow-[1.5px_1.5px_0_var(--ink)]"
                title={`Lesson ${step}: Current`}
              >
                {step}
              </span>
            );
          }
          return (
            <span
              key={step}
              className="w-7 h-7 rounded-full border border-line bg-paper-warm text-ink-muted flex items-center justify-center text-xs font-semibold"
              title={`Lesson ${step}: Locked`}
            >
              {step === 4 ? '🔒' : step}
            </span>
          );
        })}
      </div>

      {/* Complete Lesson CTA */}
      <button
        type="button"
        onClick={onComplete}
        className="px-6 py-2.5 rounded-lg bg-[#F2A23A] text-[#171715] font-display font-bold text-xs sm:text-sm border-2 border-[#171715] shadow-[3px_3px_0_#171715] hover:shadow-[4px_4px_0_#171715] hover:bg-[#f5ad4e] active:shadow-[1px_1px_0_#171715] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer whitespace-nowrap"
      >
        Complete Lesson →
      </button>
    </div>
  );
};
