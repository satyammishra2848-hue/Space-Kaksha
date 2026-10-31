'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { XpChip, StreakChip } from '@/components/ui/XpChip';
import { useApp } from '@/context/AppContext';
import { LEVEL_1_LESSONS, LEVEL_2_LESSONS } from '@/content/levels';

export default function LearningPathPage() {
  const { user, isLessonCompleted } = useApp();
  const [activeTab, setActiveTab] = useState<'path' | 'achievements' | 'progress'>('path');

  // Determine current active lesson
  const currentLessonId = user.completedLessonIds.includes('meet-the-moon')
    ? 'discover-planets'
    : 'meet-the-moon';

  return (
    <AppShell navbarVariant="logged-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* 1. TOP HEADER & TELEMETRY */}
        <section className="bg-surface rounded-3xl border border-line p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Welcome Text */}
            <div className="lg:col-span-7 space-y-3">
              <span className="font-hand text-xl text-orange block">
                Welcome back, {user.name}!
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink uppercase leading-tight">
                YOUR SPACE JOURNEY <br />
                <span className="text-orange">CONTINUES.</span>
              </h1>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-paper-warm border border-line text-ink">
                  Level 1 · Explorer
                </span>
                <span className="text-xs text-ink-muted">Mission orbit active</span>
              </div>
            </div>

            {/* Right User Status Telemetry Card */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-4 bg-paper-warm/50 p-4 rounded-2xl border border-line">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-line shrink-0 bg-surface">
                <Image
                  src="/assets/illustrations/planet_level1_explorer.png"
                  alt="Explorer"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-xs font-bold text-ink uppercase">Level 1 Explorer</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <XpChip xp={user.xp} showBar={true} nextLevelXp={680} />
                  <StreakChip days={user.streakDays} />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. TABS: My Learning Path | Achievements | My Progress */}
        <div className="flex items-center gap-3 border-b border-line pb-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('path')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'path'
                ? 'bg-ink text-surface shadow-xs'
                : 'bg-surface border border-line text-ink-muted hover:text-ink'
            }`}
          >
            My Learning Path
          </button>

          <Link
            href="/profile"
            className="px-5 py-2 rounded-full text-xs font-bold bg-surface border border-line text-ink-muted hover:text-ink hover:border-ink transition-all flex items-center gap-1.5"
          >
            <span>Achievements</span>
            <span className="text-[10px] text-ink-faint">(Profile)</span>
          </Link>

          <Link
            href="/profile"
            className="px-5 py-2 rounded-full text-xs font-bold bg-surface border border-line text-ink-muted hover:text-ink hover:border-ink transition-all flex items-center gap-1.5"
          >
            <span>My Progress</span>
            <span className="text-[10px] text-ink-faint">(Profile)</span>
          </Link>
        </div>

        {/* 3. INTERACTIVE ORBITAL LEARNING PATH */}
        <section className="bg-night text-surface starfield-bg rounded-3xl p-6 sm:p-12 border border-night-line relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-orange tracking-widest uppercase block mb-1">
                LEVEL 1 · EXPLORER
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-surface">
                YOUR LEARNING PATH
              </h2>
            </div>
            <span className="font-hand text-lg text-yellow hidden sm:inline">
              Explore. Learn. Solve. Level up!
            </span>
          </div>

          {/* Connected Path Nodes */}
          <div className="py-8 relative">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative z-10">
              
              {/* Node 1: Earth & Sky */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-24 h-24 rounded-full border-2 border-mint p-2 bg-night-soft mb-3 shadow-lg flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/assets/illustrations/planet_level1_explorer.png"
                      alt="Earth & Sky"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-mint text-ink font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <span className="absolute -bottom-2 right-2 w-6 h-6 rounded-full bg-success text-surface text-xs flex items-center justify-center font-bold">
                    ✓
                  </span>
                </div>
                <Link href="/lesson/earth-and-sky" className="text-sm font-bold text-surface hover:text-mint transition-colors">
                  Earth & Sky
                </Link>
                <span className="text-[11px] text-mint font-semibold mt-0.5">Completed ✓</span>
              </div>

              {/* Node 2: Meet the Moon (CURRENT ACTIVE) */}
              <div className="flex flex-col items-center text-center group relative">
                <div className="relative w-24 h-24 rounded-full border-2 border-orange p-2 bg-night-soft mb-3 shadow-lg flex items-center justify-center ring-4 ring-orange/30 animate-pulse">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/assets/illustrations/moon_mission_surface.png"
                      alt="Meet the Moon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-orange text-ink font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <span className="absolute -bottom-2 right-2 w-6 h-6 rounded-full bg-orange text-ink text-xs flex items-center justify-center font-bold">
                    ➔
                  </span>
                </div>
                <Link href="/lesson/meet-the-moon" className="text-sm font-bold text-orange hover:underline transition-colors">
                  Meet the Moon
                </Link>
                <span className="text-[11px] text-orange font-bold mt-0.5">Current Mission</span>
              </div>

              {/* Node 3: Discover Planets */}
              <div className="flex flex-col items-center text-center group opacity-85">
                <div className="relative w-24 h-24 rounded-full border border-night-line p-2 bg-night-soft mb-3 shadow-lg flex items-center justify-center">
                  <div className="relative w-16 h-16 opacity-75">
                    <Image
                      src="/assets/illustrations/planet_level2_cadet.png"
                      alt="Discover Planets"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-night-line text-surface font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <span className="absolute -bottom-2 right-2 w-6 h-6 rounded-full bg-night-line text-surface text-xs flex items-center justify-center">
                    🔒
                  </span>
                </div>
                <Link href="/lesson/discover-planets" className="text-sm font-bold text-surface hover:text-orange transition-colors">
                  Discover Planets
                </Link>
                <span className="text-[11px] text-ink-faint mt-0.5">Lesson 3</span>
              </div>

              {/* Node 4: Level Check Flag */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-24 h-24 rounded-full border border-orange/60 p-2 bg-night-soft mb-3 shadow-lg flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/assets/illustrations/how_step3_flag.png"
                      alt="Level Check"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-orange text-ink font-bold text-xs flex items-center justify-center">
                    ★
                  </span>
                  <span className="absolute -bottom-2 right-2 w-6 h-6 rounded-full bg-orange text-ink text-xs flex items-center justify-center font-bold">
                    WIN
                  </span>
                </div>
                <Link href="/check/level-1" className="text-sm font-bold text-orange hover:underline transition-colors">
                  Level Check
                </Link>
                <span className="text-[11px] text-yellow font-bold mt-0.5">Final Mission</span>
              </div>

            </div>
          </div>
        </section>

        {/* 4. UP NEXT CARD */}
        <section className="bg-surface rounded-3xl border border-line p-6 sm:p-8 shadow-card">
          <div className="text-xs font-bold text-orange uppercase tracking-wider mb-4">
            UP NEXT
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual thumbnail */}
            <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden border border-line bg-night">
              <Image
                src="/assets/illustrations/moon_mission_surface.png"
                alt="Meet the Moon"
                fill
                className="object-contain p-4"
              />
            </div>

            {/* Mission Details */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-semibold text-ink-muted">Lesson 2 of 3</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink uppercase">
                MEET THE MOON
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-ink-soft">
                <span className="px-2.5 py-1 rounded-full bg-surface-muted border border-line">
                  ▶ Interactive lesson
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-muted border border-line">
                  🎯 Mini quiz
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-muted border border-line">
                  ⏱ ~ 10 minutes
                </span>
              </div>

              <div className="pt-3">
                <PrimaryButton href="/lesson/meet-the-moon" size="lg" variant="orange">
                  Continue Lesson →
                </PrimaryButton>
              </div>
            </div>

            {/* What you'll explore */}
            <div className="lg:col-span-3 bg-paper-warm/50 p-5 rounded-2xl border border-line space-y-2">
              <span className="text-xs font-bold text-ink uppercase block mb-1">
                What you&apos;ll explore
              </span>
              <ul className="text-xs text-ink-soft space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-orange">★</span>
                  <span>Why does the Moon shine?</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange">★</span>
                  <span>Phases of the Moon</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange">★</span>
                  <span>Fun facts & real images</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 5. LESSONS IN THIS LEVEL */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-ink uppercase">
              LESSONS IN THIS LEVEL
            </h3>
            <span className="text-xs font-mono text-ink-muted">
              {user.completedLessonIds.length} / 4 completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEVEL_1_LESSONS.map((lsn) => {
              const isCompleted = isLessonCompleted(lsn.id);
              const isCurrent = lsn.id === currentLessonId;

              return (
                <div
                  key={lsn.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'border-orange bg-orange/5 ring-1 ring-orange/30 shadow-sm'
                      : isCompleted
                      ? 'border-line bg-surface'
                      : 'border-line bg-surface/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-paper-warm border border-line text-xs font-bold flex items-center justify-center">
                      {lsn.order}
                    </span>
                    {isCompleted ? (
                      <span className="w-5 h-5 rounded-full bg-success text-surface text-xs font-bold flex items-center justify-center">
                        ✓
                      </span>
                    ) : isCurrent ? (
                      <span className="w-5 h-5 rounded-full bg-orange text-surface text-xs font-bold flex items-center justify-center">
                        ▶
                      </span>
                    ) : (
                      <span className="text-xs text-ink-muted">🔒</span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-ink mb-1">{lsn.title}</h4>
                    <p className="text-xs text-ink-muted line-clamp-2">{lsn.subtitle}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                    <span className="text-[11px] text-ink-faint">+{lsn.xpReward} XP</span>
                    <Link
                      href={`/lesson/${lsn.id}`}
                      className="text-xs font-bold text-ink hover:text-orange transition-colors"
                    >
                      {isCompleted ? 'Review →' : isCurrent ? 'Start →' : 'View →'}
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Level Check Card */}
            <div className="p-5 rounded-2xl border border-line bg-surface flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="w-6 h-6 rounded-full bg-paper-warm border border-line text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <span className="text-xs text-orange font-bold">🏁 Capstone</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-ink mb-1">Level Check</h4>
                <p className="text-xs text-ink-muted">Pass 8 questions to advance to Level 2 Cadet.</p>
              </div>
              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                <span className="text-[11px] text-orange font-bold">+100 XP</span>
                <Link
                  href="/check/level-1"
                  className="text-xs font-bold text-orange hover:underline"
                >
                  Start Check →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. WHAT COMES NEXT? (LEVEL 2 PREVIEW) */}
        <section className="bg-night text-surface starfield-bg rounded-3xl p-6 sm:p-10 border border-night-line">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange uppercase tracking-wider">
                <span>🔒</span>
                <span>WHAT COMES NEXT?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-surface mt-1">
                LEVEL 2 · CADET
              </h3>
            </div>
            <span className="font-hand text-yellow text-sm">
              Complete Level 1 to unlock!
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LEVEL_2_LESSONS.map((lvl2) => (
              <div key={lvl2.id} className="bg-night-soft/80 p-4 rounded-xl border border-night-line">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-ink-faint">🔒</span>
                  <h4 className="text-xs font-bold text-surface">{lvl2.title}</h4>
                </div>
                <p className="text-[11px] text-ink-faint">{lvl2.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. BOTTOM BANNER */}
        <section className="bg-surface rounded-2xl border border-line p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-ink uppercase">
              SMALL STEPS. A BRIGHTER TOMORROW.
            </h4>
            <p className="text-xs text-ink-muted">
              Advance at your own orbit. Pick up right where you left off.
            </p>
          </div>
          <PrimaryButton href={`/lesson/${currentLessonId}`} size="md" variant="orange">
            Keep Learning →
          </PrimaryButton>
        </section>

      </div>
    </AppShell>
  );
}
