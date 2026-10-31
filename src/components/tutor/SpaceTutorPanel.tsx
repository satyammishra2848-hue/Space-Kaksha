'use client';

import React, { useState } from 'react';
import { TransitionLink } from '@/components/motion/TransitionLink';

interface SpaceTutorPanelProps {
  className?: string;
  contextLesson?: string;
}

interface QuickPrompt {
  q: string;
  a: string;
  icon: string;
}

const LESSON_PROMPTS: QuickPrompt[] = [
  {
    q: 'Why does the Moon shine?',
    a: 'The Moon has no light of its own! It acts as a giant cosmic mirror, reflecting sunlight back towards our eyes on Earth.',
    icon: '✨',
  },
  {
    q: 'What causes the phases?',
    a: 'As the Moon revolves around Earth every 27.3 days, the angle between Sun, Earth, and Moon shifts, changing how much of the lit side we see.',
    icon: '🌓',
  },
  {
    q: 'How far is the Moon?',
    a: '384,400 km away! You could fit all 7 other planets in our solar system side-by-side in that distance, with room to spare.',
    icon: '🚀',
  },
];

export const SpaceTutorPanel: React.FC<SpaceTutorPanelProps> = ({
  className = '',
  contextLesson = 'Meet the Moon',
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<QuickPrompt | null>(null);

  return (
    <div
      className={`bg-surface p-4 rounded-xl border-[1.5px] border-ink shadow-[3px_3px_0_var(--ink)] flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-ink bg-paper-warm flex items-center justify-center text-sm shadow-[1px_1px_0_var(--ink)]">
              🤖
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                AI Space Tutor
              </h3>
              <p className="text-[10px] text-ink-muted">
                Context: {contextLesson}
              </p>
            </div>
          </div>
          <TransitionLink
            href="/tutor"
            className="text-xs text-ink-muted hover:text-ink p-1 rounded hover:bg-paper-warm transition-colors"
            title="Open Full Tutor"
          >
            ↗
          </TransitionLink>
        </div>

        {/* Clean Speech Bubble: No walls of text or AI slop */}
        {!selectedPrompt ? (
          <div className="bg-paper-warm/60 p-3 rounded-lg border border-line text-xs text-ink leading-relaxed mb-3">
            <span className="font-semibold">The Moon is Earth&apos;s closest companion! 🌙</span> It doesn&apos;t create light; it bounces sunlight. Tap a question below to unlock the secrets!
          </div>
        ) : (
          <div className="bg-[#171715] text-[#F7F4ED] p-3 rounded-lg border border-ink shadow-xs mb-3 transition-all animate-fadeIn">
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#333]">
              <span className="text-[11px] font-bold text-orange flex items-center gap-1">
                <span>{selectedPrompt.icon}</span>
                <span>{selectedPrompt.q}</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedPrompt(null)}
                className="text-[10px] text-paper-warm hover:text-white px-1"
                title="Close answer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#E6E1D5] leading-relaxed">
              {selectedPrompt.a}
            </p>
          </div>
        )}

        {/* Quick Question Pills */}
        <div className="space-y-1.5">
          {LESSON_PROMPTS.map((item) => (
            <button
              key={item.q}
              type="button"
              onClick={() => setSelectedPrompt(item)}
              className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                selectedPrompt?.q === item.q
                  ? 'border-ink bg-paper-warm font-bold text-ink shadow-[1px_1px_0_var(--ink)]'
                  : 'border-line bg-surface hover:border-ink hover:bg-paper-warm/50 text-ink'
              }`}
            >
              <span className="truncate pr-2">{item.q}</span>
              <span className="text-ink-muted group-hover:text-ink group-hover:translate-x-0.5 transition-transform text-[10px]">
                →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Link to Full Tutor */}
      <div className="pt-3 border-t border-line mt-3 text-center">
        <TransitionLink
          href="/tutor"
          className="text-[11px] font-bold text-ink hover:text-orange transition-colors inline-flex items-center gap-1"
        >
          <span>Ask anything in full tutor</span>
          <span>→</span>
        </TransitionLink>
      </div>
    </div>
  );
};
