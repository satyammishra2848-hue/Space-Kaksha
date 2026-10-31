'use client';

import React from 'react';
import Image from 'next/image';
import { TransitionLink } from '@/components/motion/TransitionLink';

interface LessonItem {
  id: string;
  number: number;
  title: string;
  status: 'completed' | 'current' | 'locked';
}

const LEVEL_LESSONS: LessonItem[] = [
  { id: 'earth-and-sky', number: 1, title: 'Earth & Sky', status: 'completed' },
  { id: 'meet-the-moon', number: 2, title: 'Meet the Moon', status: 'current' },
  { id: 'discover-planets', number: 3, title: 'Discover Planets', status: 'locked' },
  { id: 'level-check-1', number: 4, title: 'Level Check', status: 'locked' },
];

export const LessonSidebar: React.FC = () => {
  return (
    <aside className="space-y-4">
      {/* 1. LEVEL PROGRESS CARD */}
      <div className="bg-surface p-4 rounded-xl border-[1.5px] border-ink shadow-[3px_3px_0_var(--ink)]">
        <div className="flex items-center gap-3 pb-3 border-b border-line mb-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-ink bg-paper-warm shadow-xs shrink-0">
            <Image
              src="/assets/illustrations/moon_exact_clean.png"
              alt="Level 1 Explorer"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink truncate">
              Level 1 · Explorer
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-16 h-1.5 bg-paper-warm rounded-full overflow-hidden border border-line">
                <div className="h-full bg-mint w-2/4 rounded-full" />
              </div>
              <span className="text-[10px] text-ink-muted">2/4 lessons</span>
            </div>
          </div>
        </div>

        {/* Lesson List */}
        <nav className="space-y-1.5" aria-label="Level 1 lessons">
          {LEVEL_LESSONS.map((lesson) => {
            if (lesson.status === 'completed') {
              return (
                <TransitionLink
                  key={lesson.id}
                  href={`/lesson/${lesson.id}`}
                  className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold hover:bg-paper-warm transition-colors text-ink group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border border-mint bg-mint/15 text-mint flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                    <span className="group-hover:text-orange transition-colors">
                      {lesson.title}
                    </span>
                  </div>
                  <span className="text-mint text-xs">✓</span>
                </TransitionLink>
              );
            }

            if (lesson.status === 'current') {
              return (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-2 rounded-lg text-xs font-bold bg-[#F2A23A] text-[#171715] border border-ink shadow-[1.5px_1.5px_0_var(--ink)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#171715] text-[#F7F4ED] flex items-center justify-center text-[10px] font-bold">
                      {lesson.number}
                    </span>
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-xs">▶</span>
                </div>
              );
            }

            return (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-ink-faint opacity-60 cursor-not-allowed select-none"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full border border-line bg-paper-warm flex items-center justify-center text-[10px]">
                    {lesson.number}
                  </span>
                  <span>{lesson.title}</span>
                </div>
                <span className="text-[10px]">🔒</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* 2. NEXT UP PREVIEW CARD */}
      <div className="bg-surface p-3.5 rounded-xl border border-line shadow-xs">
        <div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted mb-2">
          Next Up
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-line bg-paper-warm flex items-center justify-center text-sm shadow-xs shrink-0">
            🪐
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-ink truncate">
              Discover Planets
            </div>
            <div className="text-[10px] text-ink-muted">Lesson 3 · Locked</div>
          </div>
          <span className="text-xs text-ink-faint">🔒</span>
        </div>
      </div>

      {/* 3. ASTRONAUT HANDWRITTEN DOODLE NOTE */}
      <div className="pt-2 text-center select-none hidden lg:block">
        <div className="relative w-36 h-36 mx-auto mb-1 opacity-90">
          <Image
            src="/assets/illustrations/hero_earth_astronaut.png"
            alt="Young astronaut dreaming"
            fill
            className="object-contain"
          />
        </div>
        <div className="font-hand text-lg text-ink-soft transform -rotate-2">
          ✦ Same Sky. Bigger Dreams.
        </div>
      </div>
    </aside>
  );
};
