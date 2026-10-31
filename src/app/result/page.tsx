'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SecondaryButton } from '@/components/ui/SecondaryButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useApp } from '@/context/AppContext';
import { LEVELS } from '@/content/levels';

export default function ResultsPage() {
  const { t } = useApp();
  const [placementData] = useState<{ score: number; total: number } | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('kaksha_placement_result');
        if (saved) return JSON.parse(saved);
      } catch {
        // safe fallback
      }
    }
    return null;
  });

  return (
    <AppShell navbarVariant="logged-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        
        {/* 1. HERO CELEBRATION */}
        <section className="bg-surface rounded-3xl border border-line p-6 sm:p-10 shadow-card relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-warm border border-line text-xs font-bold text-orange">
                <span>✦</span>
                <span>TEST COMPLETE!</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink uppercase leading-tight">
                YOU&apos;RE A <br />
                <span className="text-orange">LEVEL 1 EXPLORER!</span>
              </h1>

              <p className="text-sm sm:text-base font-semibold text-ink-soft">
                Curious mind. Bright future.
              </p>

              <div className="pt-2 flex items-center gap-2">
                <span className="font-hand text-lg sm:text-xl text-ink-muted">
                  &ldquo;Every big journey begins with a curious question like yours.&rdquo;
                </span>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <PrimaryButton href="/path" size="lg" variant="orange">
                  {t('btn_start_my_path')}
                </PrimaryButton>
                <SecondaryButton href="/test" size="lg">
                  Retake Test
                </SecondaryButton>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-line bg-night">
                <Image
                  src="/assets/illustrations/hero_earth_astronaut.png"
                  alt="Boy astronaut and robot gazing at Earth"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-3 right-3 bg-night/85 px-2.5 py-1 rounded-full text-[11px] font-hand text-yellow">
                  Same Sky. Bigger Dreams.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. HOW YOU DID (TOPIC BARS) */}
        <section className="bg-surface rounded-2xl border border-line p-6 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-ink uppercase mb-6 flex items-center gap-2">
            <span>HOW YOU DID</span>
            {placementData && (
              <span className="text-xs font-mono font-normal text-ink-muted ml-2">
                ({placementData.score} of {placementData.total} correct)
              </span>
            )}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Topic 1 */}
            <div className="space-y-2 p-3 rounded-xl bg-paper-warm/40 border border-line/60">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🪐</span>
                <div>
                  <h3 className="text-xs font-bold text-ink">Planets & Solar System</h3>
                </div>
              </div>
              <ProgressBar percentage={80} color="orange" showLabel={true} labelPrefix="ACCURACY" />
            </div>

            {/* Topic 2 */}
            <div className="space-y-2 p-3 rounded-xl bg-paper-warm/40 border border-line/60">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🌕</span>
                <div>
                  <h3 className="text-xs font-bold text-ink">Moon & Earth</h3>
                </div>
              </div>
              <ProgressBar percentage={60} color="lavender" showLabel={true} labelPrefix="ACCURACY" />
            </div>

            {/* Topic 3 */}
            <div className="space-y-2 p-3 rounded-xl bg-paper-warm/40 border border-line/60">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">⚛️</span>
                <div>
                  <h3 className="text-xs font-bold text-ink">Space Science Basics</h3>
                </div>
              </div>
              <ProgressBar percentage={40} color="mint" showLabel={true} labelPrefix="ACCURACY" />
            </div>

            {/* Topic 4 */}
            <div className="space-y-2 p-3 rounded-xl bg-paper-warm/40 border border-line/60">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🛰️</span>
                <div>
                  <h3 className="text-xs font-bold text-ink">Space & Technology</h3>
                </div>
              </div>
              <ProgressBar percentage={50} color="blue" showLabel={true} labelPrefix="ACCURACY" />
            </div>
          </div>
        </section>

        {/* 3. WHAT THIS MEANS */}
        <section className="bg-night text-[var(--on-night)] rounded-2xl border border-night-line p-6 sm:p-8 starfield-bg theme-night">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-orange uppercase tracking-wider">
                <span>✦</span>
                <span>WHAT THIS MEANS</span>
              </div>
              <p className="text-sm sm:text-base text-[var(--on-night-soft)] leading-relaxed">
                You have a good understanding of the basics. You&apos;re ready to start your space learning journey from Level 1, where you&apos;ll explore the wonders of our universe step by step.
              </p>
            </div>

            <div className="md:col-span-4 flex items-center justify-center md:justify-end gap-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-night-line shrink-0">
                <Image
                  src="/assets/illustrations/moon_mission_surface.png"
                  alt="Moon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="bg-surface text-ink text-xs p-3 rounded-xl border border-line max-w-[200px] shadow-sm">
                <span className="font-semibold block mb-0.5">Orbit Locked!</span>
                You&apos;re on the right orbit! Let&apos;s explore more together.
              </div>
            </div>

          </div>
        </section>

        {/* 4. YOUR LEARNING PATH STARTS HERE */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange uppercase">
                <span>✦</span>
                <span>YOUR LEARNING PATH STARTS HERE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-ink uppercase mt-1">
                Level 1 · Explorer
              </h2>
            </div>
            <PrimaryButton href="/path" size="md" variant="orange">
              {t('btn_go_to_path')}
            </PrimaryButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <Link href="/lesson/earth-and-sky" className="bg-surface p-5 rounded-2xl border border-line hover:border-ink hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-full bg-mint text-ink text-xs font-bold flex items-center justify-center">1</span>
                  <span className="text-xs text-ink-muted">~8 mins</span>
                </div>
                <h3 className="text-sm font-bold text-ink group-hover:text-orange transition-colors">Earth & Sky</h3>
              </div>
              <div className="relative w-full h-24 my-2">
                <Image src="/assets/illustrations/planet_level1_explorer.png" alt="Earth" fill className="object-contain" />
              </div>
              <div className="pt-2 border-t border-line flex justify-end">
                <span className="text-xs font-bold text-ink">Explore →</span>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/lesson/meet-the-moon" className="bg-surface p-5 rounded-2xl border border-line hover:border-ink hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-full bg-orange text-ink text-xs font-bold flex items-center justify-center">2</span>
                  <span className="text-xs text-ink-muted">~10 mins</span>
                </div>
                <h3 className="text-sm font-bold text-ink group-hover:text-orange transition-colors">Meet the Moon</h3>
              </div>
              <div className="relative w-full h-24 my-2">
                <Image src="/assets/illustrations/moon_mission_surface.png" alt="Moon" fill className="object-contain" />
              </div>
              <div className="pt-2 border-t border-line flex justify-end">
                <span className="text-xs font-bold text-ink">Explore →</span>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/lesson/discover-planets" className="bg-surface p-5 rounded-2xl border border-line hover:border-ink hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-full bg-lavender text-ink text-xs font-bold flex items-center justify-center">3</span>
                  <span className="text-xs text-ink-muted">~12 mins</span>
                </div>
                <h3 className="text-sm font-bold text-ink group-hover:text-orange transition-colors">Discover Planets</h3>
              </div>
              <div className="relative w-full h-24 my-2">
                <Image src="/assets/illustrations/planet_level2_cadet.png" alt="Planets" fill className="object-contain" />
              </div>
              <div className="pt-2 border-t border-line flex justify-end">
                <span className="text-xs font-bold text-ink">Explore →</span>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/check/level-1" className="bg-surface p-5 rounded-2xl border border-line hover:border-ink hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-full bg-orange text-ink text-xs font-bold flex items-center justify-center">4</span>
                  <span className="text-xs text-orange font-bold">Checkpoint</span>
                </div>
                <h3 className="text-sm font-bold text-ink group-hover:text-orange transition-colors">Level Check</h3>
              </div>
              <div className="relative w-full h-24 my-2">
                <Image src="/assets/illustrations/how_step3_flag.png" alt="Level Check" fill className="object-contain" />
              </div>
              <div className="pt-2 border-t border-line flex justify-end">
                <span className="text-xs font-bold text-ink">Take Check →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* 5. A PREVIEW OF WHAT'S AHEAD */}
        <section className="space-y-6 pt-4 border-t border-line">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase">
              <span>✦</span>
              <span>A PREVIEW OF WHAT&apos;S AHEAD</span>
            </div>
            <Link href="/#levels" className="text-xs font-bold text-ink hover:text-orange transition-colors">
              View All Levels →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LEVELS.map((lvl) => (
              <div
                key={lvl.id}
                className={`p-5 rounded-2xl border transition-all ${
                  lvl.number === 1
                    ? 'border-orange bg-orange/5 shadow-xs'
                    : 'border-line bg-surface opacity-80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-ink uppercase">
                    Level {lvl.number} · {lvl.name}
                  </span>
                  {lvl.number > 1 && <span className="text-xs text-ink-muted">🔒</span>}
                </div>
                <p className="text-[11px] text-ink-muted mb-3">{lvl.theme}</p>
                <div className="relative w-full h-20 my-1">
                  <Image src={lvl.planetIcon} alt={lvl.name} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. BOTTOM BANNER */}
        <section className="bg-night text-[var(--on-night)] starfield-bg rounded-3xl p-8 sm:p-10 border border-night-line flex flex-col sm:flex-row items-center justify-between gap-6 theme-night">
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-xs font-bold text-orange uppercase flex items-center justify-center sm:justify-start gap-1.5">
              <span>✦</span>
              <span>READY TO BEGIN?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--on-night)]">
              LET&apos;S EXPLORE <span className="text-orange">TOGETHER.</span>
            </h3>
            <p className="text-xs font-hand text-yellow text-base">
              A brighter India through curious minds.
            </p>
          </div>

          <PrimaryButton href="/path" size="lg" variant="orange">
            {t('btn_start_level_1')}
          </PrimaryButton>
        </section>

      </div>
    </AppShell>
  );
}
