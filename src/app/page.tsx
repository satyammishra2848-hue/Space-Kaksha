'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SpaceDoodle } from '@/components/space/SpaceDoodle';
import { useApp } from '@/context/AppContext';
import { LEVELS } from '@/content/levels';

export default function HomePage() {
  const { t, locale } = useApp();
  const [activeJourneyLevel, setActiveJourneyLevel] = useState<number>(1);

  return (
    <AppShell navbarVariant="logged-out">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-line bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-warm border border-line text-xs font-semibold text-ink-soft">
                <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
                <span>{locale === 'hi' ? 'सीखो ऑर्बिट से' : 'Seekho orbit se.'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink uppercase leading-none">
                {t('hero_title_1')}{' '}
                <span className="relative inline-block">
                  {t('hero_title_2')}
                  <span className="inline-block text-orange ml-2" aria-hidden="true">✦</span>
                </span>{' '}
                <br />
                {t('hero_title_3')}
              </h1>

              <div className="flex items-center gap-3">
                <p className="text-lg sm:text-xl font-medium text-ink-soft">
                  <span className="relative inline-block font-semibold">
                    {t('hero_subtitle').split('.')[0]}
                    <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange/70 rounded-full" />
                  </span>
                  {t('hero_subtitle').slice(t('hero_subtitle').indexOf('.'))}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <PrimaryButton href="/test" size="lg" variant="ink">
                  {t('hero_cta')}
                </PrimaryButton>
              </div>

              <div className="pt-2 flex items-center gap-2 text-ink-muted">
                <SpaceDoodle type="star" size={18} color="var(--orange)" />
                <span className="font-hand text-xl text-ink-soft transform -rotate-1">
                  {t('hero_hand_note_1')}
                </span>
              </div>
            </div>

            {/* Right Hero Illustration */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden border border-line bg-night shadow-card">
                <Image
                  src="/assets/illustrations/hero_earth_astronaut.png"
                  alt="Astronaut child and robot sitting on moon observing Earth in space"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Tactical annotation doodle */}
                <div className="absolute top-4 right-4 bg-night/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-night-line text-xs font-hand text-yellow flex items-center gap-1.5">
                  <span>✦</span>
                  <span>Same Sky. Bigger Dreams.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 bg-paper-warm/40 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink flex items-center gap-2">
              {t('how_title')}
              <span className="text-orange">✦</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-2xs hover:shadow-card transition-all flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-mint text-ink font-bold flex items-center justify-center mb-4 text-base">
                1
              </div>
              <div className="relative w-28 h-28 mb-4">
                <Image
                  src="/assets/illustrations/how_step1_astronaut.png"
                  alt="Take the test"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-lg font-bold text-ink mb-1">{t('how_step_1_title')}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t('how_step_1_desc')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-2xs hover:shadow-card transition-all flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-lavender text-ink font-bold flex items-center justify-center mb-4 text-base">
                2
              </div>
              <div className="relative w-28 h-28 mb-4">
                <Image
                  src="/assets/illustrations/how_step2_astronaut.png"
                  alt="Get your learning path"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-lg font-bold text-ink mb-1">{t('how_step_2_title')}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t('how_step_2_desc')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-2xs hover:shadow-card transition-all flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-full bg-orange text-ink font-bold flex items-center justify-center mb-4 text-base">
                3
              </div>
              <div className="relative w-28 h-28 mb-4">
                <Image
                  src="/assets/illustrations/how_step3_flag.png"
                  alt="Learn & level up"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-lg font-bold text-ink mb-1">{t('how_step_3_title')}</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                {t('how_step_3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR LEVELS SECTION */}
      <section id="levels" className="py-16 md:py-24 bg-night text-surface starfield-bg border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-surface">
              FOUR LEVELS. <span className="text-orange">ENDLESS POSSIBILITIES.</span>
            </h2>
            <p className="text-sm text-ink-faint mt-1">
              Curated astronomy curriculum from planetary foundations to deep space physics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEVELS.map((lvl) => (
              <div
                key={lvl.id}
                className="bg-night-soft/90 border border-night-line rounded-2xl p-5 flex flex-col justify-between hover:border-orange/60 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase ${
                      lvl.number === 1 ? 'bg-mint text-night' :
                      lvl.number === 2 ? 'bg-lavender text-night' :
                      lvl.number === 3 ? 'bg-orange text-night' : 'bg-dusty-blue text-night'
                    }`}>
                      LEVEL {lvl.number}
                    </span>
                    {lvl.isComingSoon && (
                      <span className="text-[10px] font-medium text-ink-faint border border-night-line px-1.5 py-0.5 rounded-sm">
                        Soon
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-surface uppercase mb-1">
                    {lvl.name}
                  </h3>
                  <p className="text-xs text-orange font-medium mb-4">
                    {lvl.theme}
                  </p>
                </div>

                <div className="relative w-full h-32 flex items-center justify-center my-2">
                  <div className="relative w-28 h-28">
                    <Image
                      src={lvl.planetIcon}
                      alt={lvl.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-night-line/60 flex items-center justify-between text-xs text-ink-faint">
                  <span>{lvl.lessonsCount} missions</span>
                  <Link
                    href={lvl.isComingSoon ? '#levels' : '/path'}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      lvl.isComingSoon
                        ? 'border-night-line text-ink-faint cursor-not-allowed opacity-50'
                        : 'border-orange text-orange hover:bg-orange hover:text-night'
                    }`}
                    aria-label={`Explore Level ${lvl.number} ${lvl.name}`}
                  >
                    →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. YOUR SPACE JOURNEY PATH PREVIEW */}
      <section id="explore" className="py-16 md:py-24 bg-paper border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink">
                {t('journey_title')}
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Step-by-step orbital roadmap from initial launch to mission mastery.
              </p>
            </div>

            {/* Level selection pill switcher */}
            <div className="inline-flex p-1 rounded-full border border-line bg-surface text-xs font-semibold">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setActiveJourneyLevel(num)}
                  className={`px-3 py-1.5 rounded-full transition-all ${
                    activeJourneyLevel === num
                      ? 'bg-ink text-surface shadow-xs'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Level {num}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Path Diagram */}
          <div className="bg-surface p-8 sm:p-12 rounded-3xl border border-line shadow-card text-center relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 relative z-10 py-6">
              
              {/* Walking astronaut mascot */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
                  <Image
                    src="/assets/illustrations/how_step2_astronaut.png"
                    alt="Astronaut Explorer"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-hand text-ink-muted">You are here!</span>
              </div>

              <span className="hidden sm:inline-block text-ink-faint">┈➔</span>

              {/* Node 1: Earth */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 rounded-full border-2 border-mint p-1 bg-surface-muted/40 mb-2">
                  <Image
                    src="/assets/illustrations/planet_level1_explorer.png"
                    alt="Earth & Sky"
                    fill
                    className="object-contain"
                  />
                  <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-mint text-[10px] font-bold text-ink flex items-center justify-center">
                    1
                  </span>
                </div>
                <span className="text-xs font-bold text-ink">{t('node_earth_sky')}</span>
              </div>

              <span className="hidden sm:inline-block text-ink-faint">┈➔</span>

              {/* Node 2: Moon */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 rounded-full border-2 border-orange p-1 bg-surface-muted/40 mb-2">
                  <Image
                    src="/assets/illustrations/moon_mission_surface.png"
                    alt="Meet the Moon"
                    fill
                    className="object-contain"
                  />
                  <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-orange text-[10px] font-bold text-ink flex items-center justify-center">
                    2
                  </span>
                </div>
                <span className="text-xs font-bold text-ink">{t('node_meet_moon')}</span>
              </div>

              <span className="hidden sm:inline-block text-ink-faint">┈➔</span>

              {/* Node 3: Saturn */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 rounded-full border-2 border-lavender p-1 bg-surface-muted/40 mb-2">
                  <Image
                    src="/assets/illustrations/planet_level2_cadet.png"
                    alt="Discover Planets"
                    fill
                    className="object-contain"
                  />
                  <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-lavender text-[10px] font-bold text-ink flex items-center justify-center">
                    3
                  </span>
                </div>
                <span className="text-xs font-bold text-ink">{t('node_discover_planets')}</span>
              </div>

              <span className="hidden sm:inline-block text-ink-faint">┈➔</span>

              {/* Finish Flag */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
                  <Image
                    src="/assets/illustrations/how_step3_flag.png"
                    alt="Level Check"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-hand text-orange font-bold">{t('win_flag')}</span>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-line flex justify-center">
              <PrimaryButton href="/path" size="md" variant="ink">
                {t('explore_level_1')}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY KAKSHA? SECTION */}
      <section id="about" className="py-16 md:py-24 bg-paper-warm/50 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink flex items-center gap-2">
              <span className="relative inline-block">
                {t('why_title').split(' ')[0]}
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-orange rounded-full" />
              </span>{' '}
              {t('why_title').split(' ').slice(1).join(' ')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3 Feature cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="bg-surface p-6 rounded-2xl border border-line shadow-2xs hover:shadow-card transition-all flex flex-col justify-between">
                <div className="w-12 h-12 rounded-xl bg-orange/15 text-orange flex items-center justify-center text-2xl mb-4">
                  🚀
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink uppercase mb-2">
                    {t('why_feat_1')}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Hands-on Moon phase rotators, planetary scale explorers, and orbital physics.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-surface p-6 rounded-2xl border border-line shadow-2xs hover:shadow-card transition-all flex flex-col justify-between">
                <div className="w-12 h-12 rounded-xl bg-lavender/30 text-lavender flex items-center justify-center text-2xl mb-4">
                  🤖
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink uppercase mb-2">
                    {t('why_feat_2')}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Friendly, contextual tutor answering curiosity questions in age-appropriate analogies.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-surface p-6 rounded-2xl border border-line shadow-2xs hover:shadow-card transition-all flex flex-col justify-between">
                <div className="w-12 h-12 rounded-xl bg-mint/30 text-success flex items-center justify-center text-lg font-bold mb-4">
                  A अ
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink uppercase mb-2">
                    {t('why_feat_3')}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Seamless bilingual instruction designed specifically for curious minds across India and the globe.
                  </p>
                </div>
              </div>

            </div>

            {/* Saturn mascot side illustration */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <Image
                  src="/assets/illustrations/mascot_saturn_curious.png"
                  alt="Astronaut sitting on Saturn"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-hand text-lg text-ink-soft mt-2">
                {t('hero_hand_note_2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="py-16 md:py-24 bg-night text-surface starfield-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left illustration */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-40 h-48 sm:w-48 sm:h-56">
                <Image
                  src="/assets/illustrations/hero_final_cta.png"
                  alt="Student gazing at Earth"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-hand text-xl text-yellow mt-3">
                {t('final_hand_note')}
              </span>
            </div>

            {/* Right CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-surface leading-tight">
                YOUR SPACE JOURNEY <br />
                <span className="text-orange">STARTS HERE.</span>
              </h2>

              <p className="text-sm sm:text-base text-ink-faint max-w-xl">
                Take a quick 12-question mission check to find your starting orbit. No pressure, no grading stress—just pure curiosity.
              </p>

              <div className="pt-2">
                <PrimaryButton href="/test" size="lg" variant="orange">
                  {t('final_cta_button')}
                </PrimaryButton>
              </div>
            </div>

          </div>
        </div>
      </section>
    </AppShell>
  );
}
