'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { useApp } from '@/context/AppContext';
import { askTutor } from '@/lib/tutorClient';

interface SpaceTutorPanelProps {
  className?: string;
  contextLesson?: string;
  lessonId?: string;
  level?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHIPS_EN = [
  'Why does the Moon shine?',
  'Phases of the Moon',
  'How far is the Moon?',
];

const CHIPS_HI = [
  'चाँद क्यों चमकता है?',
  'चाँद की कलाएँ',
  'चाँद कितनी दूर है?',
];

export const SpaceTutorPanel: React.FC<SpaceTutorPanelProps> = ({
  className = '',
  contextLesson = 'Meet the Moon',
  lessonId = 'meet-the-moon',
  level = 'Explorer',
}) => {
  const { locale } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState<string>('');
  const [isOffline, setIsOffline] = useState(false);
  const revealTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearInterval(revealTimerRef.current);
    };
  }, []);

  const chips = locale === 'hi' ? CHIPS_HI : CHIPS_EN;

  const handleAsk = async (questionText: string) => {
    const text = questionText.trim();
    if (!text || isLoading || isRevealing) return;

    if (revealTimerRef.current) {
      clearInterval(revealTimerRef.current);
      revealTimerRef.current = null;
    }

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setDisplayedAnswer('');
    setIsOffline(false);

    try {
      const response = await askTutor({
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        lessonId,
        level,
        language: locale,
      });

      setIsLoading(false);
      setIsOffline(response.offline);

      // Word-by-word reveal
      const words = response.text.split(' ');
      let wordIdx = 0;
      setIsRevealing(true);
      setDisplayedAnswer(words[0] || '');

      revealTimerRef.current = setInterval(() => {
        wordIdx += 1;
        if (wordIdx >= words.length) {
          setDisplayedAnswer(response.text);
          setIsRevealing(false);
          if (revealTimerRef.current) {
            clearInterval(revealTimerRef.current);
            revealTimerRef.current = null;
          }
          setMessages((prev) => [...prev, { role: 'assistant', content: response.text }]);
        } else {
          setDisplayedAnswer(words.slice(0, wordIdx + 1).join(' '));
        }
      }, 40);
    } catch {
      setIsLoading(false);
      setIsOffline(true);
      const fallback = locale === 'hi'
        ? 'संकेत खो गया है! सिमुलेटर का प्रयोग करके देखें।'
        : 'Signal interrupted! Explore the orbital simulator to discover the answer.';
      setDisplayedAnswer(fallback);
      setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);
    }
  };

  const hasAsked = messages.length > 0;
  const lastUserQuestion = hasAsked
    ? [...messages].reverse().find((m) => m.role === 'user')?.content
    : null;

  return (
    <div
      className={`bg-surface p-4 rounded-xl border-[1.5px] border-ink shadow-[3px_3px_0_var(--ink)] flex flex-col justify-between space-y-3 ${className}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-line mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-ink bg-paper-warm flex items-center justify-center text-sm shadow-[1px_1px_0_var(--ink)]">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink font-display">
                  AI Space Tutor
                </h3>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
              </div>
              <p className="text-[10px] text-ink-muted">
                {locale === 'hi' ? 'संदर्भ' : 'Context'}: {contextLesson}
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

        {/* Dynamic Response Box or Welcome Bubble */}
        {!hasAsked && !isLoading ? (
          <div className="bg-paper-warm/60 p-3 rounded-lg border border-line text-xs text-ink leading-relaxed mb-3">
            <span className="font-bold">
              {locale === 'hi' ? 'नमस्ते अंतरिक्ष खोजी! 🌙' : 'Welcome explorer! 🌙'}
            </span>{' '}
            {locale === 'hi'
              ? 'मुझसे चंद्रमा, ग्रहों या अंतरिक्ष विज्ञान के बारे में कोई भी प्रश्न पूछें!'
              : 'Ask me anything about lunar orbits, craters, or space science!'}
          </div>
        ) : (
          <div className="space-y-2 mb-3">
            {/* Last User Question */}
            {lastUserQuestion && (
              <div className="text-right">
                <div className="inline-block bg-paper-warm text-ink text-xs font-semibold px-3 py-1.5 rounded-lg border border-line text-left">
                  {lastUserQuestion}
                </div>
              </div>
            )}

            {/* Tutor Bubble */}
            <div className="bg-[#171715] text-[#F7F4ED] p-3 rounded-lg border border-ink shadow-xs transition-all">
              <div className="flex items-center justify-between mb-1 pb-1 border-b border-[#333]">
                <span className="text-[10px] font-bold text-orange flex items-center gap-1">
                  <span>✦</span>
                  <span>AI SPACE TUTOR</span>
                </span>
                {isOffline && (
                  <span className="text-[9px] bg-white/10 text-paper-warm px-1.5 py-0.5 rounded border border-white/20">
                    Offline answer
                  </span>
                )}
              </div>

              {isLoading ? (
                <div className="flex items-center gap-2 py-2 text-xs text-[#E6E1D5]">
                  <span className="inline-block w-2 h-2 rounded-full bg-orange animate-ping" />
                  <span>
                    {locale === 'hi'
                      ? 'अंतरिक्ष से उत्तर खोज रहा हूँ...'
                      : 'Consulting the cosmos...'}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-[#E6E1D5] leading-relaxed">
                  {displayedAnswer}
                  {isRevealing && <span className="inline-block w-1.5 h-3 bg-orange ml-1 animate-pulse" />}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Suggested Question Chips */}
        <div className="space-y-1.5 mb-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
            {locale === 'hi' ? 'त्वरित प्रश्न:' : 'Suggested questions:'}
          </p>
          <div className="flex flex-col gap-1.5">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                disabled={isLoading || isRevealing}
                onClick={() => handleAsk(chip)}
                className="w-full text-left px-3 py-1.5 rounded-lg border border-line bg-surface hover:border-ink hover:bg-paper-warm/50 text-ink text-xs font-medium transition-all flex items-center justify-between group cursor-pointer disabled:opacity-50"
              >
                <span className="truncate pr-2">{chip}</span>
                <span className="text-ink-muted group-hover:text-ink group-hover:translate-x-0.5 transition-transform text-[10px]">
                  ➔
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Visible Text Input & Send Button */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputValue);
          }}
          className="flex items-center gap-1.5 p-1 rounded-lg border border-line bg-surface focus-within:border-ink"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading || isRevealing}
            placeholder={locale === 'hi' ? 'अपना प्रश्न लिखें...' : 'Ask space tutor...'}
            className="flex-1 px-2.5 py-1.5 text-xs text-ink bg-transparent outline-none disabled:opacity-50"
            aria-label="Ask space tutor question"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading || isRevealing}
            className="px-3 py-1.5 rounded-md bg-ink text-surface text-xs font-bold hover:bg-ink-soft disabled:opacity-40 transition-colors flex items-center justify-center shrink-0"
            aria-label="Send question"
          >
            <span>Send</span>
          </button>
        </form>
      </div>

      {/* Link to Full Tutor */}
      <div className="pt-2 border-t border-line text-center">
        <TransitionLink
          href="/tutor"
          className="text-[11px] font-bold text-ink hover:text-orange transition-colors inline-flex items-center gap-1"
        >
          <span>{locale === 'hi' ? 'पूरा ट्यूटर खोलें' : 'Ask anything in full tutor'}</span>
          <span>→</span>
        </TransitionLink>
      </div>
    </div>
  );
};
