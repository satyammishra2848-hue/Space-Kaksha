'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface MoonSimulatorProps {
  className?: string;
}

interface PhaseDefinition {
  name: string;
  nameHi: string;
  minDay: number;
  maxDay: number;
  explanation: string;
}

const SYNODIC_MONTH = 29.53;

const PHASES: PhaseDefinition[] = [
  {
    name: 'New Moon',
    nameHi: 'अमावस्या',
    minDay: 28.5,
    maxDay: 1.0,
    explanation: 'The Moon is between Earth and Sun. Its sunlit side faces away from us.',
  },
  {
    name: 'Waxing Crescent',
    nameHi: 'शुक्ल पक्ष दूज',
    minDay: 1.0,
    maxDay: 6.5,
    explanation: 'A sliver of the sunlit side begins turning into our view as the Moon orbits eastward.',
  },
  {
    name: 'First Quarter',
    nameHi: 'शुक्ल पक्ष अष्टमी',
    minDay: 6.5,
    maxDay: 8.5,
    explanation: 'The Moon has completed one-quarter of its orbit; we see half of the sunlit side.',
  },
  {
    name: 'Waxing Gibbous',
    nameHi: 'शुक्ल पक्ष एकादशी',
    minDay: 8.5,
    maxDay: 13.8,
    explanation: 'More than half of the sunlit side is visible as the Moon approaches opposition.',
  },
  {
    name: 'Full Moon',
    nameHi: 'पूर्णिमा',
    minDay: 13.8,
    maxDay: 15.8,
    explanation: 'Earth is between Sun and Moon; we see the entire illuminated side reflecting sunlight.',
  },
  {
    name: 'Waning Gibbous',
    nameHi: 'कृष्ण पक्ष द्वितीया',
    minDay: 15.8,
    maxDay: 21.0,
    explanation: 'The illuminated side begins turning away as the Moon moves toward the morning sky.',
  },
  {
    name: 'Last Quarter',
    nameHi: 'कृष्ण पक्ष अष्टमी',
    minDay: 21.0,
    maxDay: 23.0,
    explanation: 'Three-quarters of the orbit complete; we see the opposite half of the sunlit side.',
  },
  {
    name: 'Waning Crescent',
    nameHi: 'कृष्ण पक्ष एकादशी',
    minDay: 23.0,
    maxDay: 28.5,
    explanation: 'Only a thin crescent remains visible in the early dawn before the next New Moon.',
  },
];

function getPhaseInfo(day: number) {
  const normalizedDay = ((day % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  for (const p of PHASES) {
    if (p.name === 'New Moon') {
      if (normalizedDay >= p.minDay || normalizedDay < p.maxDay) return p;
    } else if (normalizedDay >= p.minDay && normalizedDay < p.maxDay) {
      return p;
    }
  }
  return PHASES[0];
}

export const MoonSimulator: React.FC<MoonSimulatorProps> = ({ className = '' }) => {
  const [day, setDay] = useState(7.38); // Default to First Quarter
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'explore' | 'learn' | 'facts'>('explore');

  const animFrameRef = useRef<number | null>(null);

  // Phase math
  const t = (day / SYNODIC_MONTH) * 360;
  const rad = (t * Math.PI) / 180;
  const litFraction = (1 - Math.cos(rad)) / 2;
  const litPercent = Math.round(litFraction * 100);
  const currentPhase = getPhaseInfo(day);

  // Pause when document is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Animation Loop (handles continuous play AND 600ms preset easing)
  // 10s full cycle loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    let frameId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      // ~10s per full cycle = 2.953 days/second
      setDay((prev) => (prev + dt * 2.953) % SYNODIC_MONTH);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isPlaying]);

  // Preset button trigger with 600ms smooth cubic ease-out
  const handlePreset = useCallback((targetDay: number) => {
    setIsPlaying(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const startDay = day;
    const startTime = performance.now();
    const duration = 600;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease-out: 1 - (1 - progress)^3
      const ease = 1 - Math.pow(1 - progress, 3);
      const next = startDay + (targetDay - startDay) * ease;
      setDay(next);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setDay(targetDay);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [day]);

  const handleReset = () => {
    setIsPlaying(false);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setDay(0);
  };

  // Generate SVG path for "What we see from Earth" lunar disc
  // R = 68, cx = 110, cy = 110
  const R = 68;
  const cx = 110;
  const cy = 110;

  const normalizedT = ((t % 360) + 360) % 360;
  const isWaning = normalizedT > 180;
  const effT = isWaning ? 360 - normalizedT : normalizedT;
  const effRad = (effT * Math.PI) / 180;
  const rx = Math.max(0.1, Math.abs(R * Math.cos(effRad)));

  let litPathD = '';
  if (effT <= 1) {
    // New moon: completely dark
    litPathD = '';
  } else if (effT >= 179) {
    // Full moon: complete disc
    litPathD = `M ${cx - R} ${cy} a ${R} ${R} 0 1 0 ${R * 2} 0 a ${R} ${R} 0 1 0 ${-R * 2} 0`;
  } else if (effT < 90) {
    // Crescent: lit side is right side, terminator curves inward (sweep = 0)
    litPathD = `M ${cx} ${cy - R} A ${R} ${R} 0 0 1 ${cx} ${cy + R} A ${rx.toFixed(2)} ${R} 0 0 0 ${cx} ${cy - R} Z`;
  } else {
    // Gibbous: lit side is right side + bulge extends left (sweep = 1)
    litPathD = `M ${cx} ${cy - R} A ${R} ${R} 0 0 1 ${cx} ${cy + R} A ${rx.toFixed(2)} ${R} 0 0 1 ${cx} ${cy - R} Z`;
  }

  // Orbit view geometry: Earth at center (120, 105), Orbit radius = 64
  const orbitCx = 120;
  const orbitCy = 105;
  const orbitR = 64;

  // Moon position in orbit:
  // At t=0 (New Moon), Moon is on the LEFT (between Sun and Earth): (orbitCx - orbitR, orbitCy)
  // At t=90 (First Quarter), Moon is at the BOTTOM: (orbitCx, orbitCy + orbitR)
  // At t=180 (Full Moon), Moon is on the RIGHT: (orbitCx + orbitR, orbitCy)
  // At t=270 (Last Quarter), Moon is at the TOP: (orbitCx, orbitCy - orbitR)
  const moonOrbitX = orbitCx - orbitR * Math.cos(rad);
  const moonOrbitY = orbitCy + orbitR * Math.sin(rad);

  return (
    <div className={`rounded-xl border-2 border-ink bg-[#0E1320] text-[#F7F4ED] shadow-[4px_4px_0_var(--ink)] overflow-hidden ${className}`}>
      {/* 1. TOP TABS BAR */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2D3548] bg-[#141A29]">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Simulator modes">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'explore'}
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'explore'
                ? 'bg-[#F2A23A] text-[#171715] shadow-xs'
                : 'text-[#9EABC0] hover:text-white hover:bg-[#1C2438]'
            }`}
          >
            ✦ Explore
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'learn'}
            onClick={() => setActiveTab('learn')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-[#F2A23A] text-[#171715] shadow-xs'
                : 'text-[#9EABC0] hover:text-white hover:bg-[#1C2438]'
            }`}
          >
            📖 Learn
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'facts'}
            onClick={() => setActiveTab('facts')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'facts'
                ? 'bg-[#F2A23A] text-[#171715] shadow-xs'
                : 'text-[#9EABC0] hover:text-white hover:bg-[#1C2438]'
            }`}
          >
            📷 Key Facts
          </button>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="px-2.5 py-1 rounded-md border border-[#2D3548] bg-[#1A2234] hover:bg-[#232D44] hover:border-[#F2A23A] text-xs font-semibold text-[#CBD5E1] transition-all flex items-center gap-1 cursor-pointer"
          title="Reset to Day 0 (New Moon)"
        >
          <span>⟳</span>
          <span>Reset</span>
        </button>
      </div>

      {/* 2. EXPLORE TAB: DUAL-PANEL SVG SIMULATOR */}
      {activeTab === 'explore' && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* Dual Panel Stage: Orbit View (Left) & Earth View (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {/* LEFT PANEL: Orbit View (Top-Down, Not to Scale) */}
            <div className="bg-[#121826] p-3.5 rounded-lg border border-[#263147] flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F2A23A] flex items-center gap-1.5">
                  <span>🪐</span>
                  <span>Orbit View</span>
                </span>
                <span className="text-[10px] text-[#8694AC] font-mono">
                  (top-down, not to scale)
                </span>
              </div>

              {/* Clean Ink-Drawn SVG Solar Orbit Stage */}
              <svg viewBox="0 0 240 210" className="w-full max-w-[260px] h-auto select-none" aria-label="Top-down orbital view">
                {/* Background Stars (Hatch Dots) */}
                <circle cx="20" cy="30" r="1" fill="#8694AC" opacity="0.6" />
                <circle cx="45" cy="180" r="1.2" fill="#F3C95E" opacity="0.7" />
                <circle cx="190" cy="25" r="1" fill="#FFFFFF" opacity="0.7" />
                <circle cx="215" cy="175" r="1.2" fill="#8694AC" opacity="0.6" />
                <circle cx="160" cy="195" r="0.8" fill="#FFFFFF" opacity="0.5" />
                <circle cx="75" cy="15" r="0.8" fill="#FFFFFF" opacity="0.5" />

                {/* SUNLIGHT RAYS & LABEL (Left side) */}
                <g id="sunlight-source">
                  {/* Sun Icon */}
                  <circle cx="14" cy="105" r="10" fill="#F2A23A" stroke="#171715" strokeWidth="1.5" />
                  <path d="M 14 88 L 14 92 M 14 118 L 14 122 M 2 105 L 6 105 M 22 105 L 26 105" stroke="#F3C95E" strokeWidth="1.5" strokeLinecap="round" />
                  
                  {/* Sunlight Stream Rays */}
                  <path d="M 28 85 L 50 85 M 28 105 L 56 105 M 28 125 L 50 125" stroke="#F3C95E" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
                  
                  {/* Arrowheads */}
                  <polygon points="52,85 47,82 47,88" fill="#F3C95E" />
                  <polygon points="58,105 53,102 53,108" fill="#F3C95E" />
                  <polygon points="52,125 47,122 47,128" fill="#F3C95E" />
                  
                  <text x="14" y="140" fill="#F3C95E" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">
                    SUN
                  </text>
                  <text x="38" y="74" fill="#E2E8F0" fontSize="8" fontWeight="bold">
                    Sunlight →
                  </text>
                </g>

                {/* Circular Orbit Path */}
                <circle
                  cx={orbitCx}
                  cy={orbitCy}
                  r={orbitR}
                  fill="none"
                  stroke="#3D4B66"
                  strokeWidth="1.5"
                  strokeDasharray="3 4"
                />

                {/* Sightline from Earth to Moon */}
                <line
                  x1={orbitCx}
                  y1={orbitCy}
                  x2={moonOrbitX}
                  y2={moonOrbitY}
                  stroke="#F2A23A"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity="0.75"
                />

                {/* EARTH (Center): Ink-drawn globe with hand-drawn continents */}
                <g id="earth-orbit-center">
                  <circle cx={orbitCx} cy={orbitCy} r="18" fill="#1E4B82" stroke="#171715" strokeWidth="1.5" />
                  {/* Continents */}
                  <path
                    d="M 112 95 Q 116 93 120 96 Q 124 99 122 104 Q 118 108 114 105 Z"
                    fill="#3F7A48"
                    stroke="#171715"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M 125 106 Q 131 108 129 114 Q 124 117 122 112 Z"
                    fill="#3F7A48"
                    stroke="#171715"
                    strokeWidth="0.8"
                  />
                  {/* Polar cap */}
                  <path d="M 114 88 Q 120 89 126 88 Z" fill="#F0F4F8" />
                  <text x={orbitCx} y={orbitCy + 28} fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Earth
                  </text>
                </g>

                {/* ORBITING MOON DISC */}
                {/* Critical Spec: The Moon's half that faces the Sun (left side) is ALWAYS lit! */}
                <g id="moon-in-orbit" transform={`translate(${moonOrbitX}, ${moonOrbitY})`}>
                  {/* Base dark half (right side) */}
                  <path d="M 0 -9 A 9 9 0 0 1 0 9 Z" fill="#171B25" stroke="#171715" strokeWidth="1" />
                  
                  {/* Always-sunlit half (left side facing sun) */}
                  <path d="M 0 -9 A 9 9 0 0 0 0 9 Z" fill="#F7F4ED" stroke="#171715" strokeWidth="1" />
                  
                  {/* Moon boundary stroke */}
                  <circle cx="0" cy="0" r="9" fill="none" stroke="#CBD5E1" strokeWidth="1" />
                  
                  {/* Direction indicator pointer */}
                  <circle cx="0" cy="0" r="1.5" fill="#F2A23A" />
                </g>
              </svg>

              <div className="text-[10px] text-[#9EABC0] mt-1 text-center">
                The Sunlit half (left) is <strong className="text-white">always 50% illuminated</strong> in space.
              </div>
            </div>

            {/* RIGHT PANEL: What we see from Earth */}
            <div className="bg-[#121826] p-3.5 rounded-lg border border-[#263147] flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F2A23A] flex items-center gap-1.5">
                  <span>🔭</span>
                  <span>View From Earth</span>
                </span>
                <span className="text-xs font-bold text-white bg-[#1A2234] px-2 py-0.5 rounded border border-[#2E3B54]">
                  {litPercent}% lit
                </span>
              </div>

              {/* Large Ink-Drawn Lunar Disc */}
              <div className="py-2">
                <svg viewBox="0 0 220 220" className="w-[160px] sm:w-[175px] h-[160px] sm:h-[175px] select-none" aria-label={`Current Moon phase: ${currentPhase.name}`}>
                  <defs>
                    {/* Subtle Crater Hatch Pattern */}
                    <pattern id="crater-hatch" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.8" fill="#3D4B66" />
                      <circle cx="7" cy="6" r="1.2" fill="#2B364A" />
                      <circle cx="4" cy="8" r="0.6" fill="#3D4B66" />
                    </pattern>
                  </defs>

                  {/* Dark Base Disc (The Unlit Moon) */}
                  <circle cx={cx} cy={cy} r={R} fill="#141824" stroke="#475569" strokeWidth="2" />
                  <circle cx={cx} cy={cy} r={R} fill="url(#crater-hatch)" opacity="0.6" />

                  {/* Ink outlines of prominent craters on dark side */}
                  <circle cx={cx - 20} cy={cy + 15} r="10" fill="none" stroke="#252F42" strokeWidth="1" strokeDasharray="1 2" />
                  <circle cx={cx + 18} cy={cy - 20} r="14" fill="none" stroke="#252F42" strokeWidth="1" strokeDasharray="1 2" />
                  <circle cx={cx - 10} cy={cy - 25} r="8" fill="none" stroke="#252F42" strokeWidth="1" strokeDasharray="1 2" />

                  {/* Lit Shape (mathematically exact SVG path) */}
                  <g
                    transform={isWaning ? `translate(${cx}, ${cy}) scale(-1, 1) translate(${-cx}, ${-cy})` : undefined}
                  >
                    {litPathD && (
                      <path
                        d={litPathD}
                        fill="#F7F4ED"
                        stroke="#171715"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>

                  {/* Prominent craters on lit face when visible */}
                  {litPercent > 20 && (
                    <g opacity={Math.min(1, litPercent / 60)}>
                      {/* Tycho crater & ray system */}
                      <circle cx={cx + 10} cy={cy + 34} r="4" fill="#E2E8F0" stroke="#718096" strokeWidth="0.8" />
                      <line x1={cx + 10} y1={cy + 34} x2={cx + 35} y2={cy + 10} stroke="#CBD5E1" strokeWidth="0.6" strokeDasharray="2 2" />
                      <line x1={cx + 10} y1={cy + 34} x2={cx - 15} y2={cy + 12} stroke="#CBD5E1" strokeWidth="0.6" strokeDasharray="2 2" />
                      {/* Copernicus crater */}
                      <circle cx={cx - 14} cy={cy - 12} r="5" fill="#E2E8F0" stroke="#718096" strokeWidth="0.8" />
                    </g>
                  )}

                  {/* Outer disc rim ring */}
                  <circle cx={cx} cy={cy} r={R} fill="none" stroke="#D9D2C6" strokeWidth="2" />
                </svg>
              </div>

              {/* Phase Name & Live Scientific Explanation */}
              <div
                role="status"
                aria-live="polite"
                className="w-full text-center p-2 rounded bg-[#161D2D] border border-[#2E3B54]"
              >
                <div className="text-sm font-black text-[#F2A23A] uppercase tracking-wide">
                  {currentPhase.name}
                </div>
                <div className="text-xs text-[#CBD5E1] mt-0.5 leading-snug">
                  {currentPhase.explanation}
                </div>
              </div>
            </div>
          </div>

          {/* 3. INTERACTIVE CONTROLS */}
          <div className="bg-[#141A28] p-3.5 rounded-lg border border-[#273247] space-y-3">
            {/* Slider: Day of the Month */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="moon-day-slider" className="font-bold text-white flex items-center gap-1.5">
                  <span>📅</span>
                  <span>Day of the Month:</span>
                  <span className="text-[#F2A23A] font-mono text-sm">
                    {day.toFixed(1)} / 29.5
                  </span>
                </label>
                <span className="text-[11px] text-[#9EABC0]">
                  Angle: {Math.round(normalizedT)}°
                </span>
              </div>
              <input
                id="moon-day-slider"
                type="range"
                min="0"
                max="29.5"
                step="0.1"
                value={day}
                onChange={(e) => {
                  setIsPlaying(false);
                  setDay(parseFloat(e.target.value));
                }}
                className="w-full h-2 bg-[#263147] rounded-lg appearance-none cursor-pointer accent-[#F2A23A]"
                aria-label="Day of the month slider"
              />
            </div>

            {/* Presets & Playback Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#263147]">
              {/* Presets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePreset(0)}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all cursor-pointer ${
                    currentPhase.name === 'New Moon'
                      ? 'bg-[#F2A23A] text-[#171715] border-[#171715]'
                      : 'bg-[#1C2436] text-[#CBD5E1] border-[#313E58] hover:border-[#F2A23A]'
                  }`}
                >
                  🌑 New Moon
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(7.38)}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all cursor-pointer ${
                    currentPhase.name === 'First Quarter'
                      ? 'bg-[#F2A23A] text-[#171715] border-[#171715]'
                      : 'bg-[#1C2436] text-[#CBD5E1] border-[#313E58] hover:border-[#F2A23A]'
                  }`}
                >
                  🌓 First Qtr
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(14.76)}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all cursor-pointer ${
                    currentPhase.name === 'Full Moon'
                      ? 'bg-[#F2A23A] text-[#171715] border-[#171715]'
                      : 'bg-[#1C2436] text-[#CBD5E1] border-[#313E58] hover:border-[#F2A23A]'
                  }`}
                >
                  🌕 Full Moon
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset(22.15)}
                  className={`px-2.5 py-1 rounded text-xs font-bold border transition-all cursor-pointer ${
                    currentPhase.name === 'Last Quarter'
                      ? 'bg-[#F2A23A] text-[#171715] border-[#171715]'
                      : 'bg-[#1C2436] text-[#CBD5E1] border-[#313E58] hover:border-[#F2A23A]'
                  }`}
                >
                  🌗 Last Qtr
                </button>
              </div>

              {/* Play / Pause */}
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
                className={`px-3 py-1 rounded text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isPlaying
                    ? 'bg-[#E53E3E] text-white border-[#171715] shadow-xs'
                    : 'bg-[#2E7D47] text-white border-[#171715] hover:bg-[#25663a] shadow-xs'
                }`}
                title="Watch continuous 29.5 day lunar cycle (~10 seconds per loop)"
              >
                <span>{isPlaying ? '⏸' : '▶'}</span>
                <span>{isPlaying ? 'Pause Month' : 'Watch a Month'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. LEARN TAB: 3 CORE CONCEPTS */}
      {activeTab === 'learn' && (
        <div className="p-5 space-y-4">
          <div className="border-b border-[#263147] pb-2">
            <h3 className="text-base font-bold text-[#F2A23A] uppercase tracking-wide">
              How the Lunar Cycle Works
            </h3>
            <p className="text-xs text-[#9EABC0]">
              Three physical facts that explain everything we observe from our backyards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#121826] p-3.5 rounded-lg border border-[#273247]">
              <div className="text-xl mb-1.5">🪞</div>
              <h4 className="font-bold text-xs text-white mb-1">
                1. The Cosmic Mirror
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                The Moon produces zero light of its own. It is a sphere of dark basalt and anorthosite rock reflecting photons from the Sun.
              </p>
            </div>

            <div className="bg-[#121826] p-3.5 rounded-lg border border-[#273247]">
              <div className="text-xl mb-1.5">🔄</div>
              <h4 className="font-bold text-xs text-white mb-1">
                2. The 29.5-Day Cycle
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                While the Moon completes an orbit in 27.3 days, Earth also moves around the Sun. It takes 29.53 days (a synodic month) to cycle through all phases.
              </p>
            </div>

            <div className="bg-[#121826] p-3.5 rounded-lg border border-[#273247]">
              <div className="text-xl mb-1.5">🔒</div>
              <h4 className="font-bold text-xs text-white mb-1">
                3. Tidal Locking
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                The Moon rotates on its axis at the exact same rate it orbits Earth. This means the same lunar hemisphere always faces Earth.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. KEY FACTS TAB */}
      {activeTab === 'facts' && (
        <div className="p-5 space-y-4">
          <div className="border-b border-[#263147] pb-2">
            <h3 className="text-base font-bold text-[#F2A23A] uppercase tracking-wide">
              Verified Scientific Measurements
            </h3>
            <p className="text-xs text-[#9EABC0]">
              Astrophysics data verified by NASA Apollo, ISRO Chandrayaan, and laser-ranging reflectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="bg-[#121826] p-3 rounded-lg border border-[#273247]">
              <div className="text-[10px] text-[#9EABC0] uppercase">Mean Distance</div>
              <div className="text-sm font-bold text-white mt-1">384,400 km</div>
              <div className="text-[10px] text-[#F2A23A] mt-0.5">~30 Earths away</div>
            </div>
            <div className="bg-[#121826] p-3 rounded-lg border border-[#273247]">
              <div className="text-[10px] text-[#9EABC0] uppercase">Synodic Month</div>
              <div className="text-sm font-bold text-white mt-1">29.53 Days</div>
              <div className="text-[10px] text-[#F2A23A] mt-0.5">Phase-to-phase cycle</div>
            </div>
            <div className="bg-[#121826] p-3 rounded-lg border border-[#273247]">
              <div className="text-[10px] text-[#9EABC0] uppercase">Surface Gravity</div>
              <div className="text-sm font-bold text-white mt-1">1.62 m/s²</div>
              <div className="text-[10px] text-[#F2A23A] mt-0.5">1/6th of Earth gravity</div>
            </div>
            <div className="bg-[#121826] p-3 rounded-lg border border-[#273247]">
              <div className="text-[10px] text-[#9EABC0] uppercase">Orbital Period</div>
              <div className="text-sm font-bold text-white mt-1">27.32 Days</div>
              <div className="text-[10px] text-[#F2A23A] mt-0.5">Sidereal orbit time</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
