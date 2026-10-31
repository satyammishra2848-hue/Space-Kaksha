'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { MoonSimulator } from '@/components/space/MoonSimulator';
import { LessonVideo } from '@/components/learning/LessonVideo';
import { SpaceTutorPanel } from '@/components/tutor/SpaceTutorPanel';
import { LessonCompleteModal } from '@/components/ui/LessonCompleteModal';
import { useApp } from '@/context/AppContext';
import { LEVEL_1_LESSONS } from '@/content/levels';

export function LessonDetailClient({ lessonId }: { lessonId: string }) {
  const { user, completeLesson, isLessonCompleted } = useApp();

  const lesson = LEVEL_1_LESSONS.find((l) => l.id === lessonId) || LEVEL_1_LESSONS[1]; // default to Meet the Moon
  const [activeTab, setActiveTab] = useState<'explore' | 'learn' | 'facts'>('explore');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quick Mini-Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentQuizQ = lesson.quiz[quizIndex] || lesson.quiz[0];

  const handleQuizAnswer = (optionId: string) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(optionId);
  };

  const handleNextQuizQuestion = () => {
    if (!selectedQuizOption) return;
    const isCorrect = currentQuizQ.options.find((o) => o.id === selectedQuizOption)?.isCorrect;
    if (isCorrect) setQuizScore((prev) => prev + 1);

    if (quizIndex < lesson.quiz.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
    } else {
      setQuizSubmitted(true);
    }
  };

  const handleCompleteLessonAction = () => {
    completeLesson(lesson.id, lesson.xpReward, 'moon-explorer');
    setIsModalOpen(true);
  };

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
                  <h3 className="text-xs font-bold text-ink uppercase">Level 1 · Explorer</h3>
                  <span className="text-[11px] text-ink-muted">
                    {user.completedLessonIds.length} / 4 lessons completed
                  </span>
                </div>
              </div>

              {/* Lesson Step List */}
              <div className="space-y-1.5 pt-2 border-t border-line">
                {LEVEL_1_LESSONS.map((lsn) => {
                  const isActive = lsn.id === lesson.id;
                  const isDone = isLessonCompleted(lsn.id);

                  return (
                    <Link
                      key={lsn.id}
                      href={`/lesson/${lsn.id}`}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-orange/15 border border-orange text-ink font-bold shadow-xs'
                          : 'hover:bg-paper-warm/60 text-ink-muted border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive ? 'bg-orange text-ink' : 'bg-surface-muted text-ink-muted'
                        }`}>
                          {lsn.order}
                        </span>
                        <span className={isActive ? 'text-ink font-bold' : ''}>{lsn.title}</span>
                      </div>
                      {isDone ? (
                        <span className="text-success font-bold text-xs">✓</span>
                      ) : isActive ? (
                        <span className="text-orange text-xs font-bold">▶</span>
                      ) : (
                        <span className="text-ink-muted text-xs">🔒</span>
                      )}
                    </Link>
                  );
                })}

                {/* Level Check Step */}
                <Link
                  href="/check/level-1"
                  className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-ink-muted hover:bg-paper-warm/60 transition-all border border-transparent"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface-muted text-ink-muted flex items-center justify-center text-[10px] font-bold">
                      4
                    </span>
                    <span>Level Check</span>
                  </div>
                  <span className="text-ink-muted text-xs">🏁</span>
                </Link>
              </div>
            </div>

            {/* Next Up Card */}
            <div className="bg-surface rounded-2xl border border-line p-4 shadow-2xs space-y-2">
              <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">
                Next Up
              </span>
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-line shrink-0 bg-night">
                  <Image src="/assets/illustrations/planet_level2_cadet.png" alt="Planets" fill className="object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-ink">Discover Planets</h4>
                  <span className="text-[10px] text-ink-muted">Lesson 3</span>
                </div>
              </div>
            </div>

            {/* Bottom Doodle */}
            <div className="p-4 text-center">
              <span className="font-hand text-lg text-ink-muted block transform -rotate-2">
                Same Sky. Bigger Dreams.
              </span>
            </div>

          </aside>

          {/* 2. CENTER MAIN LESSON CONTAINER */}
          <main className="lg:col-span-6 space-y-6">
            
            {/* Breadcrumb & Header */}
            <div>
              <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-2">
                <Link href="/path" className="hover:text-ink">My Path</Link> &gt;{' '}
                <span>Level 1</span> &gt;{' '}
                <span className="text-ink font-semibold">{lesson.title}</span>
              </nav>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="font-hand text-xl text-orange">Lesson {lesson.order}</span>
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink">
                  {lesson.title}
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-ink-soft mt-1">
                {lesson.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-3 text-xs text-ink-muted">
                <span className="px-2.5 py-1 rounded-full bg-surface border border-line flex items-center gap-1">
                  ▶ Video
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface border border-line flex items-center gap-1">
                  🎮 Interactive
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface border border-line flex items-center gap-1">
                  🎯 Quiz
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface border border-line flex items-center gap-1">
                  ⏱ ~ {lesson.estimatedMinutes} mins
                </span>
              </div>
            </div>

            {/* Tabs: Explore | Learn | Key Facts */}
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <button
                type="button"
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'explore'
                    ? 'bg-orange text-ink shadow-xs'
                    : 'bg-surface border border-line text-ink-muted hover:text-ink'
                }`}
              >
                ✦ Explore
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('learn')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'learn'
                    ? 'bg-ink text-surface shadow-xs'
                    : 'bg-surface border border-line text-ink-muted hover:text-ink'
                }`}
              >
                Learn
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('facts')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'facts'
                    ? 'bg-ink text-surface shadow-xs'
                    : 'bg-surface border border-line text-ink-muted hover:text-ink'
                }`}
              >
                Key Facts
              </button>
            </div>

            {/* Tab 1: Explore (WORKING MOON SIMULATOR) */}
            {activeTab === 'explore' && (
              <div className="space-y-4">
                <MoonSimulator />
                <p className="text-xs text-ink-muted leading-relaxed">
                  Interact with the simulator above to observe how the Moon revolves around Earth. Notice how the lit side always faces the Sun, while observers on Earth witness varying crescent, quarter, and full phases!
                </p>
              </div>
            )}

            {/* Tab 2: Learn (Story & Video Component) */}
            {activeTab === 'learn' && (
              <div className="space-y-4">
                <LessonVideo title={lesson.title} />
                <div className="bg-surface p-5 rounded-2xl border border-line space-y-3">
                  <h3 className="text-sm font-bold text-ink uppercase">Lesson Mission Brief</h3>
                  <p className="text-xs text-ink leading-relaxed">
                    {lesson.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-ink block mb-2">Objectives:</span>
                    <ul className="text-xs text-ink-soft space-y-1.5 list-disc list-inside">
                      {lesson.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Key Facts */}
            {activeTab === 'facts' && (
              <div className="bg-surface p-6 rounded-2xl border border-line space-y-4">
                <h3 className="text-sm font-bold text-ink uppercase">Key Planetary Facts</h3>
                <div className="space-y-2.5">
                  {lesson.keyFacts.map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-paper-warm/50 border border-line/60">
                      <span className="text-orange text-sm font-bold mt-0.5">✦</span>
                      <p className="text-xs text-ink font-medium leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions: Previous & Complete Lesson */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line">
              <SecondaryButton href="/path" size="sm">
                ← Previous Lesson
              </SecondaryButton>

              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-success text-surface text-xs font-bold flex items-center justify-center">✓</span>
                <span className="w-6 h-6 rounded-full bg-orange text-ink text-xs font-bold flex items-center justify-center">2</span>
                <span className="w-6 h-6 rounded-full bg-surface-muted text-ink-muted text-xs font-bold flex items-center justify-center">3</span>
                <span className="w-6 h-6 rounded-full bg-surface-muted text-ink-muted text-xs font-bold flex items-center justify-center">🔒</span>
              </div>

              <PrimaryButton onClick={handleCompleteLessonAction} size="md" variant="orange">
                Complete Lesson →
              </PrimaryButton>
            </div>

          </main>

          {/* 3. RIGHT SIDEBAR (AI Space Tutor & Quick Quiz) */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* Embedded AI Space Tutor Panel */}
            <SpaceTutorPanel contextLesson={lesson.title} />

            {/* Quick Mini-Quiz Panel */}
            <div className="bg-surface rounded-2xl border border-line p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🎯</span>
                  <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Quick Quiz</h4>
                </div>
                <span className="text-xs font-mono font-bold text-ink-muted">
                  {quizIndex + 1} / {lesson.quiz.length}
                </span>
              </div>

              {!quizSubmitted ? (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-ink leading-snug">
                    {currentQuizQ.question}
                  </p>

                  <div className="space-y-2">
                    {currentQuizQ.options.map((opt) => {
                      const isSelected = selectedQuizOption === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleQuizAnswer(opt.id)}
                          className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                            isSelected
                              ? 'border-orange bg-orange/10 font-semibold'
                              : 'border-line hover:border-ink hover:bg-paper-warm/40'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected ? 'border-orange bg-orange text-surface' : 'border-line'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setQuizIndex((prev) => Math.min(lesson.quiz.length - 1, prev + 1))}
                      className="text-xs text-ink-muted hover:text-ink underline"
                    >
                      Skip
                    </button>
                    <PrimaryButton
                      onClick={handleNextQuizQuestion}
                      disabled={!selectedQuizOption}
                      size="sm"
                      variant="ink"
                    >
                      {quizIndex === lesson.quiz.length - 1 ? 'Check Answer' : 'Next Question →'}
                    </PrimaryButton>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-mint/30 text-success text-xl flex items-center justify-center mx-auto">
                    ✓
                  </div>
                  <h5 className="text-xs font-bold text-ink uppercase">Quiz Completed!</h5>
                  <p className="text-xs text-ink-muted">
                    You scored {quizScore} out of {lesson.quiz.length} on this check!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizIndex(0);
                      setSelectedQuizOption(null);
                      setQuizScore(0);
                    }}
                    className="text-xs text-orange font-bold hover:underline"
                  >
                    ↺ Try Quiz Again
                  </button>
                </div>
              )}
            </div>

          </aside>

        </div>

      </div>

      {/* Lesson Complete Modal */}
      <LessonCompleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lessonTitle={lesson.title}
        xpEarned={lesson.xpReward}
        nextLessonHref="/lesson/discover-planets"
        nextLessonTitle="Discover Planets"
      />
    </AppShell>
  );
}

