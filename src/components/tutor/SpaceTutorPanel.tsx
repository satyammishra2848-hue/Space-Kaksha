'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SpaceTutorPanelProps {
  className?: string;
  contextLesson?: string;
}

const CANNED_ANSWERS: Record<string, string> = {
  'Why does the Moon shine?':
    'The Moon shines because its pale rocky surface acts like a giant mirror, reflecting sunlight back towards Earth! It has no fire or nuclear fusion of its own.',
  'Phases of the Moon':
    'As the Moon orbits Earth every ~29.5 days, the angle between Earth, Moon, and Sun changes. We see different portions of the sunlit half—from New Moon to Full Moon!',
  'How far is the Moon?':
    'The Moon is about 384,400 km away from Earth on average. That is roughly 30 Earth diameters away! Light from the Moon takes about 1.3 seconds to reach your eyes.',
};

export const SpaceTutorPanel: React.FC<SpaceTutorPanelProps> = ({
  className = '',
  contextLesson = 'Meet the Moon',
}) => {
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChipClick = (question: string) => {
    setSelectedChip(question);
    setIsLoading(true);
    setActiveReply(null);

    setTimeout(() => {
      setIsLoading(false);
      setActiveReply(CANNED_ANSWERS[question] || 'Great space question! Orbiting knowledge...');
    }, 400);
  };

  return (
    <div className={`bg-surface rounded-2xl border border-line p-5 shadow-2xs space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-line">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-lavender/30 border border-lavender/40 flex items-center justify-center text-base">
            🤖
          </div>
          <div>
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider">AI Space Tutor</h4>
            <span className="text-[10px] text-ink-muted">Context: {contextLesson}</span>
          </div>
        </div>

        <Link
          href="/tutor"
          className="text-xs text-ink-muted hover:text-ink p-1 rounded hover:bg-paper"
          title="Open Full Tutor Dashboard"
        >
          ⤢
        </Link>
      </div>

      {/* Main Message Bubble */}
      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-paper-warm/60 border border-line/60 text-xs text-ink leading-relaxed">
          The Moon is Earth&apos;s closest neighbour! 🌙 It doesn&apos;t have its own light, it reflects sunlight from the Sun. Want to know why we see different shapes of the Moon?
        </div>

        {/* Selected answer reply */}
        {isLoading && (
          <div className="p-3 rounded-xl bg-lavender/15 border border-lavender/30 text-xs text-ink-muted flex items-center gap-2">
            <span className="animate-spin text-lavender">✦</span>
            <span>Tutor thinking...</span>
          </div>
        )}

        {activeReply && (
          <div className="p-3.5 rounded-xl bg-lavender/20 border border-lavender/40 text-xs text-ink space-y-1">
            <span className="font-bold text-ink block">🤖 Answer:</span>
            <p className="leading-relaxed">{activeReply}</p>
          </div>
        )}
      </div>

      {/* Suggested question chips */}
      <div className="space-y-1.5 pt-1">
        {Object.keys(CANNED_ANSWERS).map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => handleChipClick(q)}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
              selectedChip === q
                ? 'border-orange bg-orange/10 text-ink shadow-2xs'
                : 'border-line bg-surface hover:border-ink hover:bg-paper-warm/40 text-ink'
            }`}
          >
            <span>{q}</span>
            <span className="text-orange text-xs font-bold">➔</span>
          </button>
        ))}
      </div>

      <div className="pt-2 border-t border-line text-center">
        <Link
          href="/tutor"
          className="text-[11px] font-bold text-orange hover:underline inline-flex items-center gap-1"
        >
          <span>Ask anything in full tutor</span>
          <span>➔</span>
        </Link>
      </div>
    </div>
  );
};
