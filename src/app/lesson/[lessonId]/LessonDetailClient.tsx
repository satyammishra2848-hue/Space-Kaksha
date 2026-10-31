'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { MoonSimulator } from '@/components/space/MoonSimulator';
import { SpaceTutorPanel } from '@/components/tutor/SpaceTutorPanel';
import { LessonQuiz } from '@/components/learning/LessonQuiz';
import { LessonSidebar } from '@/components/learning/LessonSidebar';
import { LessonNavBar } from '@/components/learning/LessonNavBar';
import { LessonCompleteModal } from '@/components/ui/LessonCompleteModal';
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
  const isLessonCompleted = user.completedLessonIds.includes(lesson.id);
  // Unlocked if order === 1, or completed, or previous lesson is completed
  const isLessonUnlocked = isLevelUnlocked && (lesson.order === 1 || isLessonCompleted || (previousLesson && user.completedLessonIds.includes(previousLesson.id)));

  // 2. LOCKED SCREEN
  if (!isLessonUnlocked) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-ink bg-paper-warm flex items-center justify-center text-3xl shadow-[3px_3px_0_var(--ink)]">
          🔒
        </div>
        <div className="font-hand text-xl text-orange font-bold -rotate-1 mb-1">
          Orbit Restricted
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-black text-ink mb-3 uppercase tracking-tight">
          {lesson.title} is Locked
        </h1>
        <p className="text-sm text-ink-muted mb-6 leading-relaxed max-w-md mx-auto">
          {previousLesson
            ? `Complete "${previousLesson.title}" first to calibrate your orbital trajectory and unlock this lesson.`
            : `Unlock ${levelInfo?.name || 'this Level'} to access this mission.`}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <TransitionLink
            href="/path"
            className="px-5 py-2.5 rounded-lg border-2 border-ink bg-surface text-ink text-sm font-bold shadow-[2px_2px_0_var(--ink)] hover:bg-paper-warm transition-all"
          >
            ← Back to My Path
          </TransitionLink>
          {previousLesson && (
            <PrimaryButton href={`/lesson/${previousLesson.id}`} variant="orange">
              Go to {previousLesson.title} →
            </PrimaryButton>
          )}
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

            {/* Lesson Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-surface text-xs font-semibold text-ink shadow-2xs">
                <span>📹</span>
                <span>Video</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-ink bg-paper-warm text-xs font-bold text-ink shadow-xs">
                <span>🎮</span>
                <span>Interactive</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-line bg-surface text-xs font-semibold text-ink shadow-2xs">
                <span>📝</span>
                <span>Quiz</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-line bg-surface text-xs text-ink-muted">
                <span>⏱</span>
                <span>~ {lesson.estimatedMinutes} mins</span>
              </span>
            </div>
          </div>

          {/* Top-Right Clean Header Art (No baked-in text, live Caveat handwriting) */}
          <div className="lg:col-span-4 hidden lg:flex justify-end items-end">
            <div className="relative flex items-center gap-3 p-3 rounded-xl border border-line bg-surface shadow-xs">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-line bg-[#0E1320] shrink-0">
                <Image
                  src="/assets/illustrations/lesson_header_clean_astro.png"
                  alt="Young astronaut child gazing at Earth and space"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="max-w-[170px]">
                <div className="font-hand text-sm font-bold text-ink leading-tight -rotate-1">
                  &ldquo;A closer look at our cosmic companion.&rdquo;
                </div>
                <div className="w-12 h-0.5 bg-orange mt-1 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Level Navigation & Next Up (3 cols) */}
        <div className="lg:col-span-3 xl:col-span-3">
          <LessonSidebar currentLessonId={lesson.id} />
        </div>

        {/* Center Column: Interactive SVG Simulator or Lesson Stage + Bottom Nav (6 cols) */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-4">
          {lesson.id === 'meet-the-moon' ? (
            <MoonSimulator />
          ) : (
            <div className="bg-surface p-6 rounded-xl border-[1.5px] border-ink shadow-[3px_3px_0_var(--ink)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h3 className="font-display font-bold text-lg text-ink uppercase">
                  {lesson.title} Mission Briefing
                </h3>
                <span className="text-xs font-bold text-orange bg-paper-warm px-2.5 py-1 rounded-full border border-line">
                  +{lesson.xpReward} XP
                </span>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                {lesson.description}
              </p>
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Core Objectives
                </h4>
                <ul className="space-y-1.5 text-xs text-ink">
                  {lesson.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange font-bold">✦</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2 pt-2 border-t border-line">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  Key Discoveries
                </h4>
                <ul className="space-y-1.5 text-xs text-ink-soft">
                  {lesson.keyFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-mint font-bold">✓</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <LessonNavBar
            onComplete={handleLessonComplete}
            prevHref={prevHref}
            currentOrder={lesson.order}
          />
        </div>

        {/* Right Column: AI Space Tutor & Quick Quiz (3 cols) */}
        <div className="lg:col-span-3 xl:col-span-3 space-y-4">
          <SpaceTutorPanel
            contextLesson={lesson.title}
            lessonId={lesson.id}
            level={levelInfo?.name || 'Explorer'}
          />
          <LessonQuiz questions={lesson.quiz} />
        </div>
      </div>

      {/* 3. LESSON COMPLETE MODAL */}
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
