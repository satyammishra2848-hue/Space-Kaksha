'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface MoonSimulatorProps {
  className?: string;
  onPhaseChange?: (phaseName: string, phasePercent: number) => void;
}

interface PhaseInfo {
  name: string;
  nameHi: string;
  deg: number;
  illum: number;
  desc: string;
  tip: string;
}

const PHASES: PhaseInfo[] = [
  { name: 'Full Moon', nameHi: 'पूर्णिमा', deg: 0, illum: 100, desc: 'Earth sits between Sun and Moon. The entire sunlit face reflects light.', tip: 'Shines all night long' },
  { name: 'Waning Gibbous', nameHi: 'कृष्ण पक्ष द्वितीया', deg: 45, illum: 75, desc: 'Illumination begins shrinking as the Moon moves toward morning sky.', tip: 'Rises late in the evening' },
  { name: 'Third Quarter', nameHi: 'कृष्ण पक्ष अष्टमी', deg: 90, illum: 50, desc: 'The left half is lit, visible high in the early morning.', tip: 'Rises around midnight' },
  { name: 'Waning Crescent', nameHi: 'कृष्ण पक्ष एकादशी', deg: 135, illum: 25, desc: 'A thin crescent greeting early risers just before dawn.', tip: 'Visible just before sunrise' },
  { name: 'New Moon', nameHi: 'अमावस्या', deg: 180, illum: 0, desc: 'The Moon sits between Earth and the Sun. Its dark side faces us.', tip: 'Invisible in the night sky' },
  { name: 'Waxing Crescent', nameHi: 'शुक्ल पक्ष दूज', deg: 225, illum: 25, desc: 'A slender sliver of silver light begins growing in the western sky.', tip: 'Visible right after sunset' },
  { name: 'First Quarter', nameHi: 'शुक्ल पक्ष अष्टमी', deg: 270, illum: 50, desc: 'Exactly half of the lunar disk is lit by the Sun.', tip: 'Rises at noon, sets around midnight' },
  { name: 'Waxing Gibbous', nameHi: 'शुक्ल पक्ष एकादशी', deg: 315, illum: 75, desc: 'More than half is lit as the Moon nears full opposition.', tip: 'Bright throughout the evening' },
];

export const MoonSimulator: React.FC<MoonSimulatorProps> = ({
  className = '',
  onPhaseChange,
}) => {
  const [angle, setAngle] = useState(0); // Default to Full Moon / side-by-side view like in reference mockup
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'learn' | 'facts'>('explore');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isTopDown, setIsTopDown] = useState(false);
  const [activeCrater, setActiveCrater] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  // Calculate current phase
  const normalizedAngle = ((angle % 360) + 360) % 360;
  const closestPhaseIndex = Math.round(normalizedAngle / 45) % 8;
  const currentPhase = PHASES[closestPhaseIndex];

  // Fraction illuminated for rendering terminator (0 to 1)
  const illumFraction = Math.cos((normalizedAngle * Math.PI) / 360) ** 2;

  // Auto-play orbital loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    let lastTime = performance.now();
    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      // 1 full revolution in 16 seconds
      setAngle((prev) => (prev + delta * 22.5) % 360);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying]);

  // Notify parent on change
  useEffect(() => {
    onPhaseChange?.(currentPhase.name, Math.round(illumFraction * 100));
  }, [currentPhase.name, illumFraction, onPhaseChange]);

  // Handle direct drag on orbit
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width * 0.49;
    const cy = rect.top + rect.height * 0.54;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const rad = Math.atan2(dy, dx * 1.8);
    let deg = (rad * 180) / Math.PI;
    if (deg < 0) deg += 360;
    setAngle(deg);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Jump to specific milestone phase
  const jumpToPhase = (targetDeg: number) => {
    setAngle(targetDeg);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setAngle(0);
    setIsPlaying(false);
    setIsZoomed(false);
    setIsTopDown(false);
    setActiveCrater(null);
  };

  // Orbital positions matching the authentic reference trajectory
  const orbitRad = (normalizedAngle * Math.PI) / 180;
  const moonX = isTopDown
    ? 50 + 26 * Math.cos(orbitRad)
    : 52 + 21 * Math.cos(orbitRad);
  const moonY = isTopDown
    ? 50 + 26 * Math.sin(orbitRad)
    : 52 + 9 * Math.sin(orbitRad);

  // Depth scaling: Moon slightly larger when in foreground (bottom of orbit), smaller in background
  const depthScale = isTopDown ? 1 : 0.95 + 0.15 * Math.sin(orbitRad);
  const moonZIndex = Math.sin(orbitRad) > 0 ? 30 : 10;

  return (
    <div
      className={`relative w-full rounded-2xl border-2 border-[#171715] bg-[#0B0E17] text-[#F7F4ED] overflow-hidden shadow-[4px_4px_0_#171715] select-none ${className}`}
      style={{ minHeight: '440px' }}
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 1. TOP STAGE BAR: TABS & RESET */}
      <div className="absolute top-3 left-3 right-3 z-40 flex items-center justify-between pointer-events-auto">
        {/* Segmented Pill Tabs */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#1A1F2E]/90 border border-[#2D3548] backdrop-blur-md shadow-md">
          <button
            type="button"
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'explore'
                ? 'bg-[#F2A23A] text-[#171715] shadow-sm'
                : 'text-[#A0A8BA] hover:text-[#FFFFFF]'
            }`}
          >
            <span>✦</span>
            <span>Explore</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('learn')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-[#F2A23A] text-[#171715] shadow-sm'
                : 'text-[#A0A8BA] hover:text-[#FFFFFF]'
            }`}
          >
            <span>📖</span>
            <span>Learn</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('facts')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'facts'
                ? 'bg-[#F2A23A] text-[#171715] shadow-sm'
                : 'text-[#A0A8BA] hover:text-[#FFFFFF]'
            }`}
          >
            <span>📷</span>
            <span>Key Facts</span>
          </button>
        </div>

        {/* Reset Button */}
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1 rounded-full bg-[#1A1F2E]/80 border border-[#2D3548] text-xs font-semibold text-[#A0A8BA] hover:text-[#FFFFFF] hover:border-[#F2A23A] transition-all flex items-center gap-1 backdrop-blur-md shadow-sm cursor-pointer"
          title="Reset to default view"
        >
          <span>⟳</span>
          <span>Reset</span>
        </button>
      </div>

      {/* 2. TAB 1: 3D INTERACTIVE EXPLORE VIEW */}
      {activeTab === 'explore' && (
        <div className="relative w-full h-[440px] sm:h-[480px] overflow-hidden bg-radial from-[#121624] via-[#0B0E17] to-[#06080E]">
          {/* Subtle Starfield Dots */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(1px 1px at 25px 35px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 80px, #ffd79e, rgba(0,0,0,0)), radial-gradient(1px 1px at 300px 220px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 480px 130px, #b8d4f0, rgba(0,0,0,0)), radial-gradient(1px 1px at 640px 320px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 800px 200px, #ffd79e, rgba(0,0,0,0))',
              backgroundSize: '400px 300px',
            }}
          />

          {/* Elliptical Orbit Track */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
            <ellipse
              cx={isTopDown ? '50%' : '49%'}
              cy={isTopDown ? '50%' : '54%'}
              rx={isTopDown ? '35%' : '35%'}
              ry={isTopDown ? '35%' : '17%'}
              fill="none"
              stroke="#54637D"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="opacity-70"
            />
          </svg>

          {/* EARTH: Photorealistic 3D Globe */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20 pointer-events-none"
            style={{
              left: isTopDown ? '50%' : '26%',
              top: isTopDown ? '50%' : '56%',
              width: isTopDown ? '140px' : '230px',
              height: isTopDown ? '140px' : '230px',
            }}
          >
            {/* Atmospheric Cyan Glow */}
            <div className="absolute -inset-4 rounded-full bg-[#4DA8DA]/25 blur-xl pointer-events-none" />
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_40px_rgba(77,168,218,0.35)]">
              <Image
                src="/assets/illustrations/earth_real_3d.png"
                alt="Earth as seen from orbit"
                fill
                priority
                className="object-cover rounded-full"
              />
            </div>

            {/* Earth Callout Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full bg-[#121620]/90 border border-[#4DA8DA]/60 text-[10px] font-bold text-[#EBF4FC] backdrop-blur-md shadow-md pointer-events-auto">
              Earth
            </div>
          </div>

          {/* THE MOON: Photorealistic 3D Cratered Sphere with Dynamic Lighting & Dragging */}
          <div
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing transition-transform ${
              isDragging ? 'duration-0' : 'duration-300 ease-out'
            }`}
            style={{
              left: `${moonX}%`,
              top: `${moonY}%`,
              zIndex: moonZIndex,
              transform: `translate(-50%, -50%) scale(${isZoomed ? depthScale * 2.2 : depthScale})`,
            }}
            onPointerDown={handlePointerDown}
            title="Drag the Moon along its orbit or click to inspect craters"
          >
            {/* Moon Halo / Subtle Glow */}
            <div className="absolute -inset-2 rounded-full bg-[#E5E9F0]/15 blur-md pointer-events-none" />

            {/* High-res Moon Sphere Disk */}
            <div
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.85)] border border-[#FFFFFF]/20"
              style={{
                backgroundColor: '#11141C',
              }}
            >
              {/* Pristine Crater Texture */}
              <Image
                src="/assets/illustrations/moon_exact_clean.png"
                alt="High-resolution lunar surface showing Tycho and Copernicus craters"
                fill
                priority
                className="object-cover rounded-full select-none"
                draggable={false}
              />

              {/* Dynamic Spherical Terminator Shadow Overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  background: `linear-gradient(${normalizedAngle + 90}deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) ${Math.max(10, 100 - illumFraction * 100)}%, transparent ${Math.min(90, 120 - illumFraction * 80)}%)`,
                  mixBlendMode: 'multiply',
                }}
              />

              {/* Surface Zoom Clickable Crater Annotations (visible when zoomed) */}
              {isZoomed && (
                <div className="absolute inset-0 z-30 pointer-events-auto">
                  {/* Apollo 11 Tranquility Base */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCrater('apollo');
                    }}
                    className="absolute top-9 right-8 w-4 h-4 rounded-full bg-[#F2A23A] border border-[#171715] flex items-center justify-center text-[8px] font-black text-[#171715] animate-pulse hover:scale-125 transition-transform"
                    title="Apollo 11 Tranquility Base"
                  >
                    🚀
                  </button>

                  {/* Tycho Crater */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCrater('tycho');
                    }}
                    className="absolute bottom-6 left-12 w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#171715] flex items-center justify-center text-[8px] font-black text-[#171715] hover:scale-125 transition-transform"
                    title="Tycho Crater"
                  >
                    ★
                  </button>

                  {/* Copernicus Crater */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCrater('copernicus');
                    }}
                    className="absolute top-12 left-10 w-4 h-4 rounded-full bg-[#F3C95E] border border-[#171715] flex items-center justify-center text-[8px] font-black text-[#171715] hover:scale-125 transition-transform"
                    title="Copernicus Crater"
                  >
                    ●
                  </button>
                </div>
              )}
            </div>

            {/* Moon Callout Bubble (Matching reference image) */}
            {!isZoomed && (
              <div className="absolute -top-11 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-[#121620]/95 border border-[#3D475C] px-2.5 py-1 rounded-lg text-center shadow-lg pointer-events-none">
                <div className="text-[11px] font-bold text-[#F7F4ED] leading-tight">
                  The Moon
                </div>
                <div className="text-[9px] text-[#A0A8BA]">
                  (384,400 km away)
                </div>
                {/* Speech tail */}
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#121620] border-r border-b border-[#3D475C] rotate-45" />
              </div>
            )}
          </div>

          {/* ACTIVE CRATER DETAIL POPUP */}
          {activeCrater && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-11/12 bg-[#161B29] border-2 border-[#F2A23A] p-3 rounded-xl shadow-2xl text-xs backdrop-blur-md">
              <div className="flex items-center justify-between font-bold text-[#F2A23A] mb-1">
                <span>
                  {activeCrater === 'apollo' && '🚀 Apollo 11 · Mare Tranquillitatis'}
                  {activeCrater === 'tycho' && '★ Tycho Crater (Ray System)'}
                  {activeCrater === 'copernicus' && '● Copernicus Crater (93 km wide)'}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveCrater(null)}
                  className="text-white hover:text-orange-400 p-0.5"
                >
                  ✕
                </button>
              </div>
              <p className="text-[#D3D8E2] leading-snug">
                {activeCrater === 'apollo' &&
                  'First human moon landing on July 20, 1969. "One small step for man, one giant leap for mankind."'}
                {activeCrater === 'tycho' &&
                  'A 108-million-year-old impact crater. Its striking white rays stretch over 1,500 kilometers across the lunar surface!'}
                {activeCrater === 'copernicus' &&
                  'Prominent crater with massive stepped walls and central peaks rising 1.2 km above the crater floor.'}
              </p>
            </div>
          )}

          {/* 3. BOTTOM-LEFT FLOATING CONTROLS: ROTATE / ZOOM / ORBIT VIEW */}
          <div className="absolute bottom-4 left-6 z-40 flex flex-col gap-1 p-1.5 rounded-xl bg-[#141824]/95 border border-[#2F384C] backdrop-blur-md shadow-xl">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isPlaying
                  ? 'bg-[#F2A23A] text-[#171715] shadow-sm'
                  : 'text-[#D0D6E2] hover:bg-[#202738] hover:text-white'
              }`}
            >
              <span>{isPlaying ? '⏸' : '🎯'}</span>
              <span>{isPlaying ? 'Pause' : 'Rotate'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsZoomed(!isZoomed);
                if (!isZoomed) setActiveCrater(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isZoomed
                  ? 'bg-[#F2A23A] text-[#171715] shadow-sm'
                  : 'text-[#D0D6E2] hover:bg-[#202738] hover:text-white'
              }`}
            >
              <span>🔍</span>
              <span>{isZoomed ? 'Zoom Out' : 'Zoom'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsTopDown(!isTopDown)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isTopDown
                  ? 'bg-[#F2A23A] text-[#171715] shadow-sm'
                  : 'text-[#D0D6E2] hover:bg-[#202738] hover:text-white'
              }`}
            >
              <span>🪐</span>
              <span>Orbit View</span>
            </button>
          </div>

          {/* 4. RIGHT-EDGE VERTICAL TOOLBAR: QUICK PHASE MILESTONES */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 p-1 rounded-full bg-[#141824]/95 border border-[#2F384C] backdrop-blur-md shadow-xl">
            {/* Full Moon */}
            <button
              type="button"
              onClick={() => jumpToPhase(0)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                closestPhaseIndex === 0
                  ? 'bg-[#F2A23A] text-[#171715] shadow-md scale-110'
                  : 'text-[#A0A8BA] hover:text-white hover:bg-[#202738]'
              }`}
              title="Full Moon (0°)"
            >
              🌕
            </button>

            {/* First Quarter */}
            <button
              type="button"
              onClick={() => jumpToPhase(270)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                closestPhaseIndex === 6
                  ? 'bg-[#F2A23A] text-[#171715] shadow-md scale-110'
                  : 'text-[#A0A8BA] hover:text-white hover:bg-[#202738]'
              }`}
              title="First Quarter (270°)"
            >
              🌓
            </button>

            {/* New Moon */}
            <button
              type="button"
              onClick={() => jumpToPhase(180)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                closestPhaseIndex === 4
                  ? 'bg-[#F2A23A] text-[#171715] shadow-md scale-110'
                  : 'text-[#A0A8BA] hover:text-white hover:bg-[#202738]'
              }`}
              title="New Moon (180°)"
            >
              🌑
            </button>

            {/* Third Quarter */}
            <button
              type="button"
              onClick={() => jumpToPhase(90)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                closestPhaseIndex === 2
                  ? 'bg-[#F2A23A] text-[#171715] shadow-md scale-110'
                  : 'text-[#A0A8BA] hover:text-white hover:bg-[#202738]'
              }`}
              title="Third Quarter (90°)"
            >
              🌗
            </button>
          </div>

          {/* BOTTOM LIVE PHASE HUD BADGE */}
          <div className="absolute bottom-3 right-16 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141824]/90 border border-[#2F384C] backdrop-blur-md shadow-md">
            <span className="text-sm font-bold text-[#F2A23A]">
              {currentPhase.name}
            </span>
            <span className="text-xs text-[#8E97AC] border-l border-[#333E56] pl-2">
              {Math.round(illumFraction * 100)}% lit
            </span>
          </div>
        </div>
      )}

      {/* 3. TAB 2: CLEAN BITE-SIZED SCIENTIFIC CONCEPTS */}
      {activeTab === 'learn' && (
        <div className="p-6 sm:p-8 space-y-6 max-h-[480px] overflow-y-auto">
          <div className="border-b border-[#252D40] pb-4">
            <h3 className="text-xl font-bold text-[#F2A23A] uppercase tracking-wide">
              Essential Lunar Concepts
            </h3>
            <p className="text-xs text-[#A0A8BA] mt-1">
              Three core discoveries that explain everything we see in the night sky.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#141926] p-4 rounded-xl border border-[#2B354D] hover:border-[#F2A23A] transition-colors">
              <div className="text-2xl mb-2">🪞</div>
              <h4 className="font-bold text-sm text-white mb-1">
                Cosmic Mirror
              </h4>
              <p className="text-xs text-[#B2BACD] leading-relaxed">
                The Moon emits zero light of its own. It acts as a giant dusty mirror reflecting photons from our Sun back to Earth.
              </p>
            </div>

            <div className="bg-[#141926] p-4 rounded-xl border border-[#2B354D] hover:border-[#F2A23A] transition-colors">
              <div className="text-2xl mb-2">⏳</div>
              <h4 className="font-bold text-sm text-white mb-1">
                27.3-Day Dance
              </h4>
              <p className="text-xs text-[#B2BACD] leading-relaxed">
                The Moon completes one full orbital revolution around Earth in 27.3 days, constantly changing the sunlit angle we see.
              </p>
            </div>

            <div className="bg-[#141926] p-4 rounded-xl border border-[#2B354D] hover:border-[#F2A23A] transition-colors">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-bold text-sm text-white mb-1">
                Tidal Locking
              </h4>
              <p className="text-xs text-[#B2BACD] leading-relaxed">
                The Moon rotates on its axis at the exact same rate it orbits Earth! That is why humanity always sees the exact same side.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: KEY FACTS SHEET */}
      {activeTab === 'facts' && (
        <div className="p-6 sm:p-8 space-y-6 max-h-[480px] overflow-y-auto">
          <div className="border-b border-[#252D40] pb-4">
            <h3 className="text-xl font-bold text-[#F2A23A] uppercase tracking-wide">
              Lunar Mission Data Sheet
            </h3>
            <p className="text-xs text-[#A0A8BA] mt-1">
              Verified astrophysics metrics measured by Chandrayaan, Apollo, and Lunar Reconnaissance Orbiter.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#141926] p-3 rounded-lg border border-[#2B354D]">
              <div className="text-xs text-[#8E97AC]">Distance</div>
              <div className="text-base font-bold text-white mt-1">384,400 km</div>
              <div className="text-[10px] text-[#F2A23A]">~30 Earths away</div>
            </div>
            <div className="bg-[#141926] p-3 rounded-lg border border-[#2B354D]">
              <div className="text-xs text-[#8E97AC]">Diameter</div>
              <div className="text-base font-bold text-white mt-1">3,474 km</div>
              <div className="text-[10px] text-[#F2A23A]">1/4th of Earth</div>
            </div>
            <div className="bg-[#141926] p-3 rounded-lg border border-[#2B354D]">
              <div className="text-xs text-[#8E97AC]">Gravity</div>
              <div className="text-base font-bold text-white mt-1">1.62 m/s²</div>
              <div className="text-[10px] text-[#F2A23A]">1/6th of Earth</div>
            </div>
            <div className="bg-[#141926] p-3 rounded-lg border border-[#2B354D]">
              <div className="text-xs text-[#8E97AC]">Temperature</div>
              <div className="text-base font-bold text-white mt-1">-130° to 120°C</div>
              <div className="text-[10px] text-[#F2A23A]">No atmosphere</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
