'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useApp } from '@/context/AppContext';
import { sampleBadges } from '@/data/sampleState';
import { LEVELS } from '@/content/levels';

export default function ProfilePage() {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState(user.name);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <AppShell navbarVariant="logged-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 1. LEFT VERTICAL NAVIGATION */}
          <aside className="lg:col-span-2 space-y-4">
            <div className="bg-surface rounded-2xl border border-line p-3 shadow-2xs space-y-1.5">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-orange text-ink font-bold text-xs shadow-xs"
              >
                <span>👤</span>
                <span>Profile</span>
              </button>

              <Link
                href="/path"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-ink-muted hover:text-ink hover:bg-paper-warm/60 font-semibold text-xs transition-colors"
              >
                <span>🗺️</span>
                <span>My Path</span>
              </Link>

              <Link
                href="/tutor"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-ink-muted hover:text-ink hover:bg-paper-warm/60 font-semibold text-xs transition-colors"
              >
                <span>🤖</span>
                <span>Space Tutor</span>
              </Link>

              <a
                href="#achievements"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-ink-muted hover:text-ink hover:bg-paper-warm/60 font-semibold text-xs transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span>⭐</span>
                  <span>Achievements</span>
                </div>
              </a>

              {/* Visibly Disabled "Soon" Items */}
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-faint text-xs cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <span>📝</span>
                  <span>Notes</span>
                </div>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-surface-muted text-ink-faint border border-line">
                  Soon
                </span>
              </div>

              <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-faint text-xs cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <span>⚙️</span>
                  <span>Settings</span>
                </div>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-surface-muted text-ink-faint border border-line">
                  Soon
                </span>
              </div>
            </div>

            {/* Astronaut Mascot bottom banner */}
            <div className="p-3 text-center hidden lg:block">
              <span className="font-hand text-sm text-ink-muted block transform -rotate-2">
                Curious Learner. Brighter Future.
              </span>
            </div>
          </aside>

          {/* 2. MAIN PROFILE DASHBOARD */}
          <main className="lg:col-span-10 space-y-8">
            
            {/* Top Banner Card */}
            <div className="bg-surface rounded-3xl border border-line p-6 sm:p-8 shadow-card relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Avatar & Profile Identity */}
                <div className="md:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-orange shrink-0 bg-paper-warm shadow-md">
                    <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                    <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-orange text-surface text-xs font-bold flex items-center justify-center">
                      ★
                    </span>
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
                      My Profile
                    </span>
                    
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="px-2 py-1 text-xl font-bold uppercase rounded border border-line bg-surface"
                        />
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-2 py-1 text-xs bg-ink text-surface rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <h1 className="text-3xl font-bold uppercase tracking-tight text-ink">
                        {profileName}
                      </h1>
                    )}

                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-paper-warm border border-line text-ink">
                        Level 1 Explorer
                      </span>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-3 py-1 rounded-full border border-line text-xs font-semibold text-ink-soft hover:border-ink transition-colors flex items-center gap-1.5"
                      >
                        <span>✏️</span>
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Hand annotation */}
                <div className="md:col-span-5 flex justify-center md:justify-end">
                  <div className="relative w-full max-w-[240px] aspect-[16/10] rounded-2xl overflow-hidden border border-line bg-night">
                    <Image
                      src="/assets/illustrations/hero_earth_astronaut.png"
                      alt="Space Explorer"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-night/85 px-2 py-0.5 rounded-full text-[10px] font-hand text-yellow">
                      Same Sky. Bigger Dreams.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Stat 1: XP */}
              <div className="bg-surface p-4 rounded-2xl border border-line shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow text-lg">⭐</span>
                  <span className="text-lg font-bold text-ink">{user.xp} XP</span>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-1.5 rounded-full bg-surface-muted overflow-hidden">
                    <div className="h-full bg-orange rounded-full" style={{ width: '47%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-ink-muted">
                    <span>Next: 680 XP</span>
                    <span>Level 2</span>
                  </div>
                </div>
              </div>

              {/* Stat 2: Streak */}
              <div className="bg-surface p-4 rounded-2xl border border-line shadow-2xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-orange text-lg">🔥</span>
                  <span className="text-lg font-bold text-ink">{user.streakDays}</span>
                </div>
                <span className="text-xs text-ink-muted block">Day Streak</span>
              </div>

              {/* Stat 3: Lessons */}
              <div className="bg-surface p-4 rounded-2xl border border-line shadow-2xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  <span className="text-lg font-bold text-ink">12</span>
                </div>
                <span className="text-xs text-ink-muted block">Lessons Completed</span>
              </div>

              {/* Stat 4: Badges */}
              <div className="bg-surface p-4 rounded-2xl border border-line shadow-2xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎖️</span>
                  <span className="text-lg font-bold text-ink">4</span>
                </div>
                <span className="text-xs text-ink-muted block">Badges Earned</span>
              </div>
            </div>

            {/* 3. MIDDLE SECTION: Overall Progress & Right Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Overall & Topic Progress) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Overall Progress */}
                <div className="bg-surface rounded-3xl border border-line p-6 shadow-2xs space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-ink uppercase">Overall Progress</h3>
                    <Link href="/path" className="text-xs font-bold text-orange hover:underline">
                      View My Path →
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Donut chart */}
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="var(--surface-muted)" strokeWidth="3.5" />
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="var(--orange)" strokeWidth="3.5" strokeDasharray="32, 100" />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-sm font-bold text-ink block">32%</span>
                        <span className="text-[9px] text-ink-muted">Completed</span>
                      </div>
                    </div>

                    {/* 4 Levels Progress Trail */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 w-full">
                      {LEVELS.map((lvl) => (
                        <div
                          key={lvl.id}
                          className={`p-3 rounded-xl border text-center ${
                            lvl.number === 1
                              ? 'border-orange bg-orange/5'
                              : 'border-line bg-paper-warm/30 opacity-70'
                          }`}
                        >
                          <span className="text-[10px] font-bold text-ink-muted uppercase block">
                            Level {lvl.number}
                          </span>
                          <span className="text-xs font-bold text-ink block mb-1">
                            {lvl.name}
                          </span>
                          <span className="text-xs">
                            {lvl.number === 1 ? '✓' : '🔒'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Topic Progress & Learning Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Topic Progress */}
                  <div className="bg-surface rounded-2xl border border-line p-5 space-y-4">
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                      Topic Progress
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                          <span>Planets & Solar System</span>
                          <span>80%</span>
                        </div>
                        <ProgressBar percentage={80} color="orange" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                          <span>Moon & Earth</span>
                          <span>60%</span>
                        </div>
                        <ProgressBar percentage={60} color="lavender" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                          <span>Space Science Basics</span>
                          <span>40%</span>
                        </div>
                        <ProgressBar percentage={40} color="mint" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                          <span>Space & Technology</span>
                          <span>50%</span>
                        </div>
                        <ProgressBar percentage={50} color="blue" />
                      </div>
                    </div>
                  </div>

                  {/* Learning Stats (This Month) */}
                  <div className="bg-surface rounded-2xl border border-line p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                        Learning Stats
                      </h4>
                      <span className="text-[10px] text-ink-muted">This Month ▾</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-paper-warm/50 border border-line/60">
                        <span className="text-lg">📖</span>
                        <span className="text-sm font-bold text-ink block mt-1">12</span>
                        <span className="text-[10px] text-ink-muted">Lessons</span>
                      </div>
                      <div className="p-3 rounded-xl bg-paper-warm/50 border border-line/60">
                        <span className="text-lg">⏱</span>
                        <span className="text-sm font-bold text-ink block mt-1">5.2 hrs</span>
                        <span className="text-[10px] text-ink-muted">Learning Time</span>
                      </div>
                      <div className="p-3 rounded-xl bg-paper-warm/50 border border-line/60">
                        <span className="text-lg">🎯</span>
                        <span className="text-sm font-bold text-ink block mt-1">86%</span>
                        <span className="text-[10px] text-ink-muted">Avg. Quiz Score</span>
                      </div>
                      <div className="p-3 rounded-xl bg-paper-warm/50 border border-line/60">
                        <span className="text-lg">📊</span>
                        <span className="text-sm font-bold text-ink block mt-1">3</span>
                        <span className="text-[10px] text-ink-muted">Topics Explored</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column (My Streak, Achievements & Activity) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* My Streak Card */}
                <div className="bg-surface rounded-2xl border border-line p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wider">My Streak</h4>
                    <span className="text-[10px] text-ink-muted">View Calendar</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {daysOfWeek.map((day, idx) => (
                      <div key={day} className="flex flex-col items-center gap-1">
                        <span className={`text-base ${idx < 6 ? 'text-orange animate-pulse' : 'text-ink-faint'}`}>
                          🔥
                        </span>
                        <span className="text-[10px] font-semibold text-ink-muted">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements Card */}
                <div id="achievements" className="bg-surface rounded-2xl border border-line p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Achievements</h4>
                    <span className="text-[10px] text-orange font-bold">View All →</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {sampleBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`p-3 rounded-xl border text-center ${
                          badge.unlocked
                            ? 'bg-paper-warm/40 border-line'
                            : 'bg-surface-muted/30 border-line/50 opacity-50'
                        }`}
                      >
                        <span className="text-xl block mb-1">{badge.icon}</span>
                        <span className="text-xs font-bold text-ink block">{badge.title}</span>
                        <span className="text-[10px] text-orange font-semibold block">
                          +{badge.xpReward} XP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-surface rounded-2xl border border-line p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Recent Activity</h4>
                    <span className="text-[10px] text-orange font-bold">View All →</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-start justify-between pb-2 border-b border-line/60">
                      <div className="flex items-center gap-2">
                        <span className="text-success font-bold">✓</span>
                        <div>
                          <span className="font-semibold text-ink block">Completed: Meet the Moon</span>
                          <span className="text-[10px] text-ink-muted">2 hours ago</span>
                        </div>
                      </div>
                      <span className="text-orange font-bold text-[11px]">+50 XP</span>
                    </div>

                    <div className="flex items-start justify-between pb-2 border-b border-line/60">
                      <div className="flex items-center gap-2">
                        <span className="text-orange">▶</span>
                        <div>
                          <span className="font-semibold text-ink block">Watched: Earth&apos;s Rotation</span>
                          <span className="text-[10px] text-ink-muted">2 hours ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span>🎯</span>
                        <div>
                          <span className="font-semibold text-ink block">Quiz: Phases of the Moon</span>
                          <span className="text-[10px] text-ink-muted">1 day ago</span>
                        </div>
                      </div>
                      <span className="text-orange font-bold text-[11px]">+20 XP</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </main>

        </div>

      </div>
    </AppShell>
  );
}
