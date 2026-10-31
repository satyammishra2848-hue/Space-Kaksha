'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { MoonSimulator } from '@/components/space/MoonSimulator';
import { SpaceTutorPanel } from '@/components/tutor/SpaceTutorPanel';
import { LessonQuiz } from '@/components/learning/LessonQuiz';
import { LessonSidebar } from '@/components/learning/LessonSidebar';
import { LessonNavBar } from '@/components/learning/LessonNavBar';
import { LessonCompleteModal } from '@/components/ui/LessonCompleteModal';
import { useApp } from '@/context/AppContext';

interface LessonDetailClientProps {
  lessonId: string;
}

export const LessonDetailClient: React.FC<LessonDetailClientProps> = ({
  lessonId,
}) => {
  const { addXp, completeLesson } = useApp();
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const handleLessonComplete = () => {
    completeLesson(lessonId, 50);
    addXp(50);
    setShowCompleteModal(true);
  };

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
                Level 1
              </TransitionLink>
              <span>›</span>
              <span className="text-ink font-bold">Meet the Moon</span>
            </div>

            {/* Handwritten Label */}
            <div className="font-hand text-2xl text-orange font-bold -rotate-1 select-none">
              Lesson 2
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink uppercase tracking-tight font-display mt-0.5">
              MEET THE MOON
            </h1>

            {/* Objective Subtitle */}
            <p className="text-sm sm:text-base text-ink-soft mt-1 max-w-xl">
              Let&apos;s explore Earth&apos;s closest neighbour.
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
                <span>~ 10 mins</span>
              </span>
            </div>
          </div>

          {/* Top-Right Decorative Cosmic Art Banner (Matching Reference Design) */}
          <div className="lg:col-span-4 hidden lg:flex justify-end items-end">
            <div className="relative w-72 h-32 rounded-xl overflow-hidden border border-line bg-[#0E1320] shadow-sm">
              <Image
                src="/assets/illustrations/ref_top_astro.png"
                alt="Astronaut boy on the Moon looking at Earth"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN DASHBOARD GRID (MATCHING REFERENCE DESIGN) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Level Navigation & Next Up (3 cols) */}
        <div className="lg:col-span-3 xl:col-span-3">
          <LessonSidebar />
        </div>

        {/* Center Column: Big Interactive 3D Moon Stage & Bottom Action Bar (6 cols) */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-4">
          <MoonSimulator />
          <LessonNavBar onComplete={handleLessonComplete} />
        </div>

        {/* Right Column: AI Space Tutor & Quick Quiz (3 cols) */}
        <div className="lg:col-span-3 xl:col-span-3 space-y-4">
          <SpaceTutorPanel contextLesson="Meet the Moon" />
          <LessonQuiz />
        </div>
      </div>

      {/* 3. LESSON COMPLETE MODAL */}
      <LessonCompleteModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        xpEarned={50}
        lessonTitle="Meet the Moon"
        nextLessonHref="/lesson/discover-planets"
        nextLessonTitle="Discover Planets"
      />
    </div>
  );
};
