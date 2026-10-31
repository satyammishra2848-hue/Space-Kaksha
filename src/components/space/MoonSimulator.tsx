'use client';

import React, { useState, useEffect } from 'react';

interface MoonPhaseInfo {
  name: string;
  angle: number;
  illumination: number; // 0 to 100%
  description: string;
}

const PHASES: MoonPhaseInfo[] = [
  { name: 'New Moon', angle: 0, illumination: 0, description: 'The Moon is between Earth and the Sun. Its lit side faces away from Earth.' },
  { name: 'Waxing Crescent', angle: 45, illumination: 25, description: 'A sliver of the sunlit side begins to grow visible from Earth.' },
  { name: 'First Quarter', angle: 90, illumination: 50, description: 'We see half of the Moon illuminated by sunlight.' },
  { name: 'Waxing Gibbous', angle: 135, illumination: 75, description: 'More than half of the lit side is visible and growing.' },
  { name: 'Full Moon', angle: 180, illumination: 100, description: 'The entire illuminated face of the Moon is visible from Earth.' },
  { name: 'Waning Gibbous', angle: 225, illumination: 75, description: 'The illuminated portion begins to decrease after full moon.' },
  { name: 'Third Quarter', angle: 270, illumination: 50, description: 'We see the opposite half illuminated as the Moon completes its orbit.' },
  { name: 'Waning Crescent', angle: 315, illumination: 25, description: 'A final crescent visible before the cycle restarts.' },
];

export const MoonSimulator: React.FC = () => {
  const [angle, setAngle] = useState<number>(90); // Default to First Quarter
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Determine current phase name based on angle
  const getPhase = (deg: number): MoonPhaseInfo => {
    const normalized = ((deg % 360) + 360) % 360;
    let closest = PHASES[0];
    let minDiff = 360;
    for (const p of PHASES) {
      let diff = Math.abs(normalized - p.angle);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closest = p;
      }
    }
    return closest;
  };

  const currentPhase = getPhase(angle);

  // Position of Moon in orbit (parametric ellipse)
  const rad = (angle * Math.PI) / 180;
  const radiusX = 140;
  const radiusY = 70;
  const moonX = 200 + radiusX * Math.cos(rad);
  const moonY = 130 + radiusY * Math.sin(rad);

  const handleReset = () => {
    setAngle(90);
    setIsPlaying(false);
  };

  return (
    <div className="bg-night text-surface rounded-2xl border border-night-line p-5 sm:p-6 starfield-bg relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Header of Simulator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange animate-ping" />
            <span className="text-xs font-bold tracking-wider text-orange uppercase font-mono">
              MOON-PHASE SIMULATOR
            </span>
          </div>
          <h3 className="text-lg font-bold text-surface mt-0.5">
            {currentPhase.name} ({currentPhase.illumination}% lit)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-full bg-night-soft border border-night-line text-xs font-semibold hover:border-orange transition-colors flex items-center gap-1.5"
          >
            <span>{isPlaying ? '⏸ Pause' : '▶ Orbit'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-full bg-night-soft border border-night-line text-xs font-semibold hover:border-orange transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* Main Simulation Canvas */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-xl border border-night-line bg-night-soft/60 overflow-hidden flex items-center justify-center my-2">
        
        {/* Sunlight indicator on left */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-70 z-10 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-yellow/20 border border-yellow flex items-center justify-center text-xs">
            ☀️
          </div>
          <span className="text-[9px] uppercase font-bold tracking-wider text-yellow font-mono">
            Sunlight
          </span>
          <span className="text-yellow text-xs">➔ ➔</span>
        </div>

        {/* Orbit and Celestial Bodies SVG */}
        <svg viewBox="0 0 400 260" className="w-full h-full max-h-[300px] overflow-visible">
          {/* Orbital path ellipse */}
          <ellipse
            cx="200"
            cy="130"
            rx={radiusX}
            ry={radiusY}
            fill="none"
            stroke="var(--night-line)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Central Earth */}
          <g transform="translate(180, 110)">
            <circle cx="20" cy="20" r="20" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
            {/* Green continents */}
            <path d="M12 15 Q18 8, 26 12 Q24 24, 18 28 Z" fill="#34d399" opacity="0.8" />
            <path d="M26 18 Q32 20, 28 30 Z" fill="#34d399" opacity="0.8" />
            <text x="20" y="47" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">
              Earth
            </text>
          </g>

          {/* Orbiting Moon */}
          <g transform={`translate(${moonX - 12}, ${moonY - 12})`}>
            <circle cx="12" cy="12" r="12" fill="#d1d5db" stroke="#f3f4f6" strokeWidth="1" />
            {/* Dark side shadow based on Sun coming from left */}
            <path
              d="M 12 0 A 12 12 0 0 1 12 24 Z"
              fill="#111827"
              opacity="0.85"
            />
            {/* Tiny crater dots */}
            <circle cx="8" cy="10" r="1.5" fill="#9ca3af" />
            <circle cx="9" cy="15" r="1.2" fill="#9ca3af" />
          </g>
        </svg>

        {/* Live Annotation Pill */}
        <div className="absolute top-3 right-3 bg-night/85 px-3 py-1 rounded-full border border-night-line text-[11px] font-mono text-ink-faint">
          The Moon (384,400 km away)
        </div>

        {/* View from Earth Indicator Card */}
        <div className="absolute bottom-3 left-3 bg-night/90 backdrop-blur-xs p-2.5 rounded-xl border border-night-line flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full border border-night-line overflow-hidden bg-night flex items-center justify-center">
            {/* Dynamic CSS Moon shadow reflection */}
            <div
              className="w-full h-full bg-yellow transition-all duration-150"
              style={{
                clipPath: currentPhase.angle <= 180
                  ? `inset(0 0 0 ${(100 - currentPhase.illumination)}%)`
                  : `inset(0 ${(100 - currentPhase.illumination)}% 0 0)`,
              }}
            />
          </div>
          <div>
            <span className="text-[10px] text-ink-faint block uppercase">View from Earth</span>
            <span className="text-xs font-bold text-surface">{currentPhase.name}</span>
          </div>
        </div>

      </div>

      {/* Interactive Controls & Phase Selector */}
      <div className="space-y-3 mt-4 pt-4 border-t border-night-line z-10">
        
        {/* Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-ink-faint font-mono">
            <span>Orbit Position ({angle}°)</span>
            <span>Drag slider to revolve</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => {
              setIsPlaying(false);
              setAngle(Number(e.target.value));
            }}
            className="w-full accent-orange cursor-pointer"
            aria-label="Adjust moon orbital position"
          />
        </div>

        {/* Phase quick preset buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          {PHASES.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setAngle(p.angle);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                currentPhase.name === p.name
                  ? 'border-orange bg-orange text-night'
                  : 'border-night-line bg-night-soft text-ink-faint hover:text-surface'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Dynamic Explanation Text */}
        <p className="text-xs text-ink-faint italic pt-1">
          💡 {currentPhase.description}
        </p>

      </div>

    </div>
  );
};
