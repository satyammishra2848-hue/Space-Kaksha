'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { MoonSimulator } from '@/components/space/MoonSimulator';
import { LessonSidebar } from '@/components/learning/LessonSidebar';
import { LessonNavBar } from '@/components/learning/LessonNavBar';
import { LessonCompleteModal } from '@/components/ui/LessonCompleteModal';
import { SpaceTutorModal } from '@/components/tutor/SpaceTutorModal';
import { QuickQuizModal } from '@/components/learning/QuickQuizModal';
import { useApp } from '@/context/AppContext';
import { LEVEL_1_LESSONS, LEVEL_2_LESSONS, LEVELS } from '@/content/levels';

interface LessonDetailClientProps {
  lessonId: string;
}

export const LessonDetailClient: React.FC<LessonDetailClientProps> = ({
  lessonId,
}) => {
  const { user, addXp, completeLesson } = useApp();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const allLessons = [...LEVEL_1_LESSONS, ...LEVEL_2_LESSONS];
  const lesson = allLessons.find((l) => l.id === lessonId);

  // 1. UNKNOWN ID: Friendly Not Found Screen
  if (!lesson) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-ink bg-paper-warm flex items-center justify-center text-3xl shadow-[3px_3px_0_var(--ink)]">
          🛸
        </div>
        <div className="font-hand text-xl text-orange font-bold -rotate-1 mb-1">
          Coordinate Unknown
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-ink mb-3 uppercase tracking-tight">
          Mission Not Found
        </h1>
        <p className="text-sm text-ink-muted mb-6 leading-relaxed">
          The celestial lesson ID &ldquo;{lessonId}&rdquo; was not found in our orbital flight plan.
        </p>
        <PrimaryButton href="/path" variant="orange">
          ← Return to My Path
        </PrimaryButton>
      </div>
    );
  }

  // Level info
  const levelInfo = LEVELS.find((lvl) => lvl.id === lesson.levelId);
  const levelLessons = allLessons.filter((l) => l.levelId === lesson.levelId);
  const lessonIndex = levelLessons.findIndex((l) => l.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? levelLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex + 1 < levelLessons.length ? levelLessons[lessonIndex + 1] : null;

  // Prerequisite logic: Level 1 is always unlocked. Level 2 requires level-1 passed.
  const isLevelUnlocked = lesson.levelId === 'level-1' || user.passedCheckIds.includes('level-1');
  const isLessonPrerequisiteMet =
    lessonIndex === 0 ||
    (previousLesson && user.completedLessonIds.includes(previousLesson.id));
  const isUnlocked = isLevelUnlocked && isLessonPrerequisiteMet;

  // 2. LOCKED SCREEN: Shown when trying to access e.g. /lesson/discover-planets before completing Meet the Moon
  if (!isUnlocked) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-surface p-8 sm:p-12 rounded-3xl border-2 border-ink shadow-[6px_6px_0_var(--ink)] space-y-5">
          <div className="w-16 h-16 mx-auto rounded-full border-2 border-ink bg-paper-warm flex items-center justify-center text-3xl shadow-[2px_2px_0_var(--ink)]">
            🔒
          </div>
          <div className="font-hand text-2xl text-orange font-bold -rotate-1">
            Orbital Trajectory Locked
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-ink uppercase tracking-tight">
            {lesson.title} is Locked
          </h1>
          <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
            {previousLesson ? (
              <>
                You must complete <strong className="text-ink">{previousLesson.title}</strong> first to calculate your flight path to this orbit.
              </>
            ) : (
              <>
                Complete the prerequisite lessons in <strong className="text-ink">{levelInfo?.name || 'Level 1'}</strong> to unlock this mission.
              </>
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <PrimaryButton href="/path" variant="ink">
              ← Back to My Path
            </PrimaryButton>
            {previousLesson && (
              <PrimaryButton href={`/lesson/${previousLesson.id}`} variant="orange">
                Go to {previousLesson.title} →
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    );
  }

  const handleLessonComplete = () => {
    completeLesson(lesson.id, lesson.xpReward || 50);
    addXp(lesson.xpReward || 50);
    setShowCompleteModal(true);
  };

  const prevHref = previousLesson ? `/lesson/${previousLesson.id}` : '/path';
  const nextLessonHref = nextLesson
    ? `/lesson/${nextLesson.id}`
    : `/check/${lesson.levelId}`;
  const nextLessonTitle = nextLesson ? nextLesson.title : 'Level Check';

  return (
    <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 1. TOP BREADCRUMB & HEADER SECTION */}
      <div className="relative mb-6 pb-4 border-b border-line">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Header Copy */}
          <div className="lg:col-span-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted mb-2">
              <TransitionLink href="/path" className="hover:text-ink transition-colors">
                My Path
              </TransitionLink>
              <span>›</span>
              <TransitionLink href="/path" className="hover:text-ink transition-colors">
                Level {levelInfo?.number || 1}
              </TransitionLink>
              <span>›</span>
              <span className="text-ink font-bold">{lesson.title}</span>
            </div>

            {/* Handwritten Label */}
            <div className="font-hand text-2xl text-orange font-bold -rotate-1 select-none">
              Lesson {lesson.order}
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink uppercase tracking-tight font-display mt-0.5 outline-none">
              {lesson.title}
            </h1>

            {/* Objective Subtitle */}
            <p className="text-sm sm:text-base text-ink-soft mt-1 max-w-xl">
              {lesson.subtitle}
            </p>

            {/* Interactive Tool Launcher Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-surface text-xs font-semibold text-ink shadow-2xs">
                <span>📹</span>
                <span>Video</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-ink bg-paper-warm text-xs font-bold text-ink shadow-xs">
                <span>🎮</span>
                <span>Interactive Stage</span>
              </span>

              {/* Click-to-Open AI Space Tutor */}
              <button
                type="button"
                onClick={() => setShowTutorModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-ink bg-orange hover:bg-orange-light text-ink text-xs font-bold transition-all shadow-[2px_2px_0_var(--ink)] cursor-pointer"
                title="Open AI Space Tutor chat"
              >
                <span>🤖</span>
                <span>AI Space Tutor</span>
                <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded-full">Ask</span>
              </button>

              {/* Click-to-Open Quick Quiz */}
              <button
                type="button"
                onClick={() => setShowQuizModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-line bg-surface hover:border-ink hover:bg-paper-warm text-ink text-xs font-bold transition-all shadow-2xs cursor-pointer"
                title="Open Quick Quiz"
              >
                <span>🎯</span>
                <span>Quick Quiz</span>
                <span className="text-[10px] bg-paper-warm px-1.5 py-0.5 rounded-full border border-line">3 Qs</span>
              </button>

              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-line bg-surface text-xs text-ink-muted">
                <span>⏱</span>
                <span>~ {lesson.estimatedMinutes} mins</span>
              </span>
            </div>
          </div>

          {/* Top-Right Mission Status Card */}
          <div className="lg:col-span-4 hidden lg:flex justify-end items-center">
            <div className="flex items-center gap-3.5 px-4 py-3 rounded-2xl border-[1.5px] border-ink bg-surface shadow-[3px_3px_0_var(--ink)]">
              <div className="w-11 h-11 rounded-xl border border-ink bg-paper-warm flex items-center justify-center text-2xl shadow-[1px_1px_0_var(--ink)]">
                🌙
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-orange">
                  Level {levelInfo?.number || 1} • Lesson {lesson.order}
                </div>
                <div className="font-hand text-sm sm:text-base font-bold text-ink -rotate-1">
                  &ldquo;A closer look at our cosmic companion.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RESTRUCTURED 2-COLUMN DASHBOARD GRID */}
      {/* Left: 4-Lesson Planner (3 cols) | Right: Full Interactive Topic Dashboard (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Lesson Planner & Interactive Launchers (3 cols) */}
        <div className="lg:col-span-3 xl:col-span-3 space-y-4">
          <LessonSidebar currentLessonId={lesson.id} />

          {/* Interactive Tools Launcher Card */}
          <div className="bg-surface p-4 rounded-xl border-[1.5px] border-ink shadow-[3px_3px_0_var(--ink)] space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted flex items-center justify-between">
              <span>Interactive Tools</span>
              <span className="text-mint font-bold text-[9px]">READY</span>
            </div>

            {/* AI Space Tutor Drawer Launcher */}
            <button
              type="button"
              onClick={() => setShowTutorModal(true)}
              className="w-full p-3 rounded-lg border border-line bg-paper-warm/60 hover:bg-paper-warm hover:border-ink transition-all flex items-center justify-between text-left group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-ink bg-orange flex items-center justify-center text-sm shadow-[1px_1px_0_var(--ink)]">
                  🤖
                </div>
                <div>
                  <div className="text-xs font-bold text-ink group-hover:text-orange transition-colors">
                    AI Space Tutor
                  </div>
                  <div className="text-[10px] text-ink-muted">
                    Open ChatGPT live chat
                  </div>
                </div>
              </div>
              <span className="text-xs text-ink-muted group-hover:text-ink group-hover:translate-x-1 transition-transform font-bold">
                ➔
              </span>
            </button>

            {/* Quick Quiz Launcher */}
            <button
              type="button"
              onClick={() => setShowQuizModal(true)}
              className="w-full p-3 rounded-lg border border-line bg-surface hover:bg-paper-warm hover:border-ink transition-all flex items-center justify-between text-left group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-ink bg-paper-warm flex items-center justify-center text-sm shadow-[1px_1px_0_var(--ink)]">
                  🎯
                </div>
                <div>
                  <div className="text-xs font-bold text-ink group-hover:text-orange transition-colors">
                    Quick Quiz Check
                  </div>
                  <div className="text-[10px] text-ink-muted">
                    3 questions • +30 XP
                  </div>
                </div>
              </div>
              <span className="text-xs text-ink-muted group-hover:text-ink group-hover:translate-x-1 transition-transform font-bold">
                ➔
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Full Topic Explanation Dashboard (9 cols) */}
        <div className="lg:col-span-9 xl:col-span-9 space-y-4">
          {lesson.id === 'meet-the-moon' ? (
            <MoonSimulator />
          ) : (
            <div className="bg-surface p-6 sm:p-8 rounded-xl border-[1.5px] border-ink shadow-[4px_4px_0_var(--ink)] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="font-display font-bold text-xl text-ink uppercase">
                  {lesson.title} Mission Briefing
                </h3>
                <span className="text-xs font-bold text-orange bg-paper-warm px-3 py-1 rounded-full border border-line shadow-2xs">
                  +{lesson.xpReward} XP
                </span>
              </div>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                {lesson.description}
              </p>
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Core Objectives
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-ink">
                  {lesson.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-orange font-bold text-sm">✦</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 pt-3 border-t border-line">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Key Discoveries
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-ink-soft">
                  {lesson.keyFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-mint font-bold text-sm">✓</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Bottom Lesson Navigation */}
          <LessonNavBar
            onComplete={handleLessonComplete}
            prevHref={prevHref}
            currentOrder={lesson.order}
          />
        </div>

      </div>

      {/* 3. MODALS (Click-to-Open) */}
      {/* AI Space Tutor Modal (ChatGPT-style open chat) */}
      <SpaceTutorModal
        isOpen={showTutorModal}
        onClose={() => setShowTutorModal(false)}
        contextLesson={lesson.title}
        lessonId={lesson.id}
        level={levelInfo?.name || 'Explorer'}
      />

      {/* Quick Quiz Modal */}
      <QuickQuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        questions={lesson.quiz}
        lessonTitle={lesson.title}
      />

      {/* Lesson Complete Celebration Modal */}
      <LessonCompleteModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        xpEarned={lesson.xpReward || 50}
        lessonTitle={lesson.title}
        nextLessonHref={nextLessonHref}
        nextLessonTitle={nextLessonTitle}
      />
    </div>
  );
};
