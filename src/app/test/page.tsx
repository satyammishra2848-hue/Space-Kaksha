'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { WavyDivider } from '@/components/ui/WavyDivider';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PLACEMENT_QUESTIONS } from '@/content/questions';
import { useApp } from '@/context/AppContext';

export default function PlacementTestPage() {
  const router = useRouter();
  const { t } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = PLACEMENT_QUESTIONS.length;
  const currentQuestion = PLACEMENT_QUESTIONS[currentIndex];
  const selectedOptionId = selectedAnswers[currentIndex];

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate placement score and navigate to /result
      setIsSubmitting(true);
      let score = 0;
      PLACEMENT_QUESTIONS.forEach((q, idx) => {
        const chosen = selectedAnswers[idx];
        const opt = q.options.find((o) => o.id === chosen);
        if (opt?.isCorrect) score += 1;
      });

      // Save result in sessionStorage so /result reads real answers
      try {
        sessionStorage.setItem(
          'kaksha_placement_result',
          JSON.stringify({
            score,
            total: totalQuestions,
            completedAt: new Date().toISOString(),
          })
        );
      } catch {
        // Safe fail
      }

      setTimeout(() => {
        router.push('/result');
      }, 400);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <AppShell navbarVariant="logged-out" hideFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-paper">
        
        {/* Main Quiz Viewport */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1">
          
          {/* Header Title */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-warm border border-line text-xs font-semibold text-ink-soft mb-3">
              <span>✦</span>
              <span>PLACEMENT MISSION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink uppercase">
              LET&apos;S FIND <span className="text-orange">YOUR ORBIT.</span>
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-2">
              A few quick questions to find your starting point. Take your best guess!
            </p>
          </div>

          {/* Interactive Question Card */}
          <div
            className="bg-surface rounded-3xl border border-line p-6 sm:p-10 shadow-card relative transition-all"
            role="region"
            aria-label="Quiz question container"
          >
            {/* Top Bar: Space Check Indicator & Segmented Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-line">
              <span className="text-xs font-bold tracking-wider text-ink uppercase font-mono">
                SPACE CHECK · {String(currentIndex + 1).padStart(2, '0')} / {String(totalQuestions).padStart(2, '0')}
              </span>
              <ProgressBar
                current={currentIndex + 1}
                total={totalQuestions}
                segments={true}
                color="orange"
                className="w-full sm:w-48"
              />
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
              {currentQuestion.question}
            </h2>

            {/* 4 Options Grid with Radio Semantics */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              role="radiogroup"
              aria-label="Answer options"
            >
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-orange bg-orange/10 ring-2 ring-orange/30 shadow-xs'
                        : 'border-line bg-surface hover:border-ink hover:bg-paper-warm/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold uppercase shrink-0 transition-colors ${
                        isSelected ? 'bg-orange text-surface' : 'bg-surface-muted text-ink'
                      }`}>
                        {opt.id}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {opt.text}
                      </span>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-orange bg-orange text-surface' : 'border-line'
                    }`}>
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Encouragement Line */}
            <div className="flex items-center justify-center gap-2 text-xs text-ink-muted mb-8 text-center">
              <span className="text-orange">✦</span>
              <span>Take your best guess — you&apos;ve got this!</span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-line">
              <SecondaryButton
                onClick={handleBack}
                disabled={currentIndex === 0}
                size="md"
              >
                {t('btn_back')}
              </SecondaryButton>

              <PrimaryButton
                onClick={handleNext}
                disabled={!selectedOptionId || isSubmitting}
                size="md"
                variant="ink"
              >
                {currentIndex === totalQuestions - 1 ? 'Finish Orbit Check →' : t('btn_next')}
              </PrimaryButton>
            </div>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-line bg-surface">
              <div className="w-8 h-8 rounded-full bg-mint/30 text-success flex items-center justify-center shrink-0 text-sm">
                🪐
              </div>
              <span className="text-xs font-semibold text-ink">No pressure</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-line bg-surface">
              <div className="w-8 h-8 rounded-full bg-lavender/30 text-lavender flex items-center justify-center shrink-0 text-sm">
                🎯
              </div>
              <span className="text-xs font-semibold text-ink">One question at a time</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-line bg-surface">
              <div className="w-8 h-8 rounded-full bg-orange/20 text-orange flex items-center justify-center shrink-0 text-sm font-bold">
                A अ
              </div>
              <span className="text-xs font-semibold text-ink">Hindi + English</span>
            </div>
          </div>

        </div>

        {/* Organic lunar transition into night banner */}
        <WavyDivider variant="warm-to-night" className="mt-12 -mb-[1px]" />

        {/* Bottom Banner Section */}
        <section className="bg-night text-[var(--on-night)] starfield-bg py-10 theme-night">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[var(--on-night)]">
                Ready when you are.
              </h3>
              <p className="text-xs text-[var(--on-night-soft)] mt-1">
                Your space journey starts here. Discover what you already know.
              </p>
            </div>

            <div className="relative w-28 h-28 shrink-0">
              <Image
                src="/assets/illustrations/rocket_quiz_launch.png"
                alt="Rocket launch"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

      </div>
    </AppShell>
  );
}
