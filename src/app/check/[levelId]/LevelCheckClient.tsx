'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AppShell } from '@/components/layout/AppShell';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { LevelUpModal } from '@/components/ui/LevelUpModal';
import { LEVEL_1_CHECK_QUESTIONS } from '@/content/questions';
import { useApp } from '@/context/AppContext';

export function LevelCheckClient() {
  const { passLevelCheck } = useApp();

  const [currentIndex, setCurrentIndex] = useState(2); // start on question 3 to match reference image!
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({
    0: 'b',
    1: 'b',
    2: 'c', // default selected option C to match reference
  });
  const [secondsLeft, setSecondsLeft] = useState(525); // 08:45
  const [isLevelUpOpen, setIsLevelUpOpen] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const totalQuestions = LEVEL_1_CHECK_QUESTIONS.length;
  const currentQ = LEVEL_1_CHECK_QUESTIONS[currentIndex];
  const selectedOptionId = selectedAnswers[currentIndex];

  const handleSelect = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Pass level check and trigger Level Up celebration
      passLevelCheck('level-1', 100);
      setIsLevelUpOpen(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <AppShell navbarVariant="logged-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. LEFT SIDEBAR */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Level Card */}
            <div className="bg-surface rounded-2xl border border-line p-4 shadow-2xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-line shrink-0">
                  <Image src="/assets/illustrations/planet_level1_explorer.png" alt="Level 1" fill className="object-contain" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink uppercase">Level 1</h3>
                  <span className="text-sm font-bold text-ink">Explorer</span>
                </div>
              </div>

              {/* Lesson Step List */}
              <div className="space-y-1.5 pt-2 border-t border-line">
                <div className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold bg-surface-muted/40 text-ink">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-paper-warm text-ink text-[10px] font-bold flex items-center justify-center">1</span>
                    <span>Earth & Sky</span>
                  </div>
                  <span className="text-success font-bold">✓</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold bg-surface-muted/40 text-ink">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-paper-warm text-ink text-[10px] font-bold flex items-center justify-center">2</span>
                    <span>Meet the Moon</span>
                  </div>
                  <span className="text-success font-bold">✓</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold bg-surface-muted/40 text-ink">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-paper-warm text-ink text-[10px] font-bold flex items-center justify-center">3</span>
                    <span>Discover Planets</span>
                  </div>
                  <span className="text-success font-bold">✓</span>
                </div>

                {/* Level Check Active */}
                <div className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold bg-orange text-ink shadow-xs">
                  <div className="flex items-center gap-2">
                    <span>🚩</span>
                    <span>Level Check</span>
                  </div>
                  <span className="text-xs">Active</span>
                </div>
              </div>
            </div>

            {/* Astronaut Mascot with Hand note */}
            <div className="p-4 text-center space-y-2">
              <span className="font-hand text-lg text-ink-soft block transform -rotate-2">
                Small Steps Bigger Discoveries.
              </span>
            </div>

          </aside>

          {/* 2. CENTER QUESTION CARD */}
          <main className="lg:col-span-6 space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange text-ink text-xs font-bold uppercase tracking-wider mb-2">
                <span>✦</span>
                <span>LEVEL CHECK</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink leading-tight">
                MISSION: READY <br className="hidden sm:inline" />
                FOR THE <span className="text-orange">NEXT ORBIT?</span>
              </h1>

              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Answer a few questions to complete Level 1 and unlock Level 2.
              </p>
            </div>

            {/* Question Container Card */}
            <div className="bg-surface rounded-3xl border border-line p-6 shadow-card space-y-6">
              
              {/* Top Bar: Question Index + Timer */}
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-orange/20 text-orange flex items-center justify-center text-xs font-bold">
                    🎯
                  </span>
                  <span className="text-xs font-bold text-ink uppercase font-mono">
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-warm border border-line text-xs font-mono font-bold text-ink">
                  <span>⏱</span>
                  <span>{formatTime(secondsLeft)}</span>
                </div>
              </div>

              {/* Diagram + Question Options */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Left: Scientific Diagram */}
                <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-line bg-night p-2 flex items-center justify-center">
                  <Image
                    src="/assets/illustrations/moon_phases_diagram.png"
                    alt="Sun Earth Moon Orbit Diagram"
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Right: Question & Options */}
                <div className="md:col-span-7 space-y-4">
                  <h2 className="text-base sm:text-lg font-bold text-ink leading-snug">
                    {currentQ.question}
                  </h2>

                  <div className="space-y-2.5">
                    {currentQ.options.map((opt) => {
                      const isSelected = selectedOptionId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelect(opt.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                            isSelected
                              ? 'border-orange bg-orange/10 font-bold ring-2 ring-orange/30 shadow-2xs'
                              : 'border-line hover:border-ink hover:bg-paper-warm/40 text-ink'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold uppercase shrink-0 ${
                            isSelected ? 'bg-orange text-surface' : 'bg-surface-muted text-ink'
                          }`}>
                            {opt.id}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom Navigator and Actions */}
              <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                <SecondaryButton onClick={handlePrevious} disabled={currentIndex === 0} size="sm">
                  ← Previous
                </SecondaryButton>

                {/* Question Navigator Dots */}
                <div className="flex items-center gap-1.5" aria-label="Question Navigator">
                  {LEVEL_1_CHECK_QUESTIONS.map((_, idx) => {
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isCurrent = idx === currentIndex;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-4 h-4 rounded-full transition-all flex items-center justify-center text-[9px] font-bold ${
                          isCurrent
                            ? 'ring-2 ring-orange bg-orange text-surface scale-110'
                            : isAnswered
                            ? 'bg-orange text-surface'
                            : 'bg-surface-muted text-ink-muted border border-line'
                        }`}
                        title={`Go to Question ${idx + 1}`}
                      >
                        {isAnswered && !isCurrent ? '•' : ''}
                      </button>
                    );
                  })}
                </div>

                <PrimaryButton onClick={handleNext} disabled={!selectedOptionId} size="sm" variant="ink">
                  {currentIndex === totalQuestions - 1 ? 'Submit Mission Check →' : 'Next Question →'}
                </PrimaryButton>
              </div>

            </div>

          </main>

          {/* 3. RIGHT SIDEBAR */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Mission Progress Card */}
            <div className="bg-surface rounded-2xl border border-line p-5 shadow-2xs space-y-4">
              <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                Mission Progress
              </span>

              <div className="flex items-center justify-between">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* SVG circular progress */}
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--surface-muted)"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="var(--orange)"
                      strokeWidth="3.5"
                      strokeDasharray={`${(answeredCount / totalQuestions) * 100}, 100`}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xs font-bold text-ink block">{answeredCount}/{totalQuestions}</span>
                    <span className="text-[9px] text-ink-muted">Answered</span>
                  </div>
                </div>

                <div className="relative w-16 h-16">
                  <Image src="/assets/illustrations/how_step1_astronaut.png" alt="Astronaut" fill className="object-contain" />
                </div>
              </div>
            </div>

            {/* Quick Tip Card */}
            <div className="bg-paper-warm/60 rounded-2xl border border-line p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-orange text-sm">💡</span>
                <h4 className="text-xs font-bold text-ink uppercase">Quick Tip</h4>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed">
                The Moon doesn&apos;t produce its own light. It reflects sunlight, and as it moves around Earth, we see different portions of the lit side.
              </p>
            </div>

            {/* You've Got This Card */}
            <div className="bg-surface rounded-2xl border border-line p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">🚀</span>
                <h4 className="text-xs font-bold text-ink uppercase">You&apos;ve Got This!</h4>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Take your time. Read carefully. You can always review and change your answers before submitting.
              </p>
            </div>

          </aside>

        </div>

      </div>

      {/* Level Up Modal */}
      <LevelUpModal
        isOpen={isLevelUpOpen}
        onClose={() => setIsLevelUpOpen(false)}
        unlockedLevelName="Cadet"
        unlockedLevelNumber={2}
        xpBonus={100}
      />
    </AppShell>
  );
}
