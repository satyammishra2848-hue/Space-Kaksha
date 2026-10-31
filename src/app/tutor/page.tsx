'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';
import { askTutor } from '@/lib/tutorClient';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  time: string;
  diagramUrl?: string;
  bullets?: string[];
  isOffline?: boolean;
  isStreaming?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'user',
    text: 'Can you explain why the Moon has phases?',
    time: '10:24 AM',
  },
  {
    id: 'm2',
    sender: 'tutor',
    text: 'Great question! 🌙 The Moon doesn\'t produce its own light. It reflects sunlight from the Sun. As the Moon moves around the Earth, the angle at which we see the lit part changes, and that\'s why we see different phases.',
    time: '10:24 AM',
    diagramUrl: '/assets/illustrations/moon_phases_diagram.png',
    bullets: [
      'New Moon: We see the unlit side facing Earth.',
      'First Quarter: We see half of the lit side.',
      'Full Moon: We see the entire lit side.',
      'Last Quarter: We see the opposite half lit.',
    ],
  },
];

export default function SpaceTutorPage() {
  const { user, locale } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [hasError, setHasError] = useState(false);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInputValue('');
    setIsLoading(true);
    setHasError(false);

    if (simulateError) {
      setTimeout(() => {
        setIsLoading(false);
        setHasError(true);
      }, 500);
      return;
    }

    try {
      const response = await askTutor({
        messages: updatedMessages.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
        level: user.currentLevelId,
        language: locale,
      });

      const tutorMsgId = `tutor-${Date.now()}`;
      const words = response.text.split(' ');
      let currentWordIndex = 0;

      const tutorMsg: ChatMessage = {
        id: tutorMsgId,
        sender: 'tutor',
        text: words[0] || '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOffline: response.offline,
        isStreaming: true,
      };

      setMessages((prev) => [...prev, tutorMsg]);
      setIsLoading(false);

      streamIntervalRef.current = setInterval(() => {
        currentWordIndex += 1;
        if (currentWordIndex >= words.length) {
          if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
          }
          setMessages((prev) =>
            prev.map((m) =>
              m.id === tutorMsgId ? { ...m, text: response.text, isStreaming: false } : m
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === tutorMsgId
                ? { ...m, text: words.slice(0, currentWordIndex + 1).join(' ') }
                : m
            )
          );
        }
      }, 35);
    } catch {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    handleSendMessage('Can you explain why the Moon has phases?');
  };

  return (
    <AppShell navbarVariant="logged-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. LEFT NAVIGATION SIDEBAR */}
          <aside className="lg:col-span-2 space-y-4">
            <div className="bg-surface rounded-2xl border border-line p-3 shadow-2xs space-y-1.5">
              <Link
                href="/profile"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-ink-muted hover:text-ink hover:bg-paper-warm/60 font-semibold text-xs transition-colors"
              >
                <span>👤</span>
                <span>Profile</span>
              </Link>
              <Link
                href="/path"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-ink-muted hover:text-ink hover:bg-paper-warm/60 font-semibold text-xs transition-colors"
              >
                <span>🗺️</span>
                <span>My Path</span>
              </Link>
              <Link
                href="/lesson/meet-the-moon"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-ink-muted hover:text-ink hover:bg-paper-warm/60 font-semibold text-xs transition-colors"
              >
                <span>📖</span>
                <span>Lessons</span>
              </Link>
              <Link
                href="/check/level-1"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-ink-muted hover:text-ink hover:bg-paper-warm/60 font-semibold text-xs transition-colors"
              >
                <span>🏁</span>
                <span>Level Check</span>
              </Link>
              
              {/* Active Tutor */}
              <button
                type="button"
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-orange text-ink font-bold text-xs shadow-xs"
              >
                <span>🤖</span>
                <span>Space Tutor</span>
              </button>

              <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-faint text-xs cursor-not-allowed">
                <span>📝 Notes</span>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-surface-muted border border-line">Soon</span>
              </div>
              <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-ink-faint text-xs cursor-not-allowed">
                <span>⚙️ Settings</span>
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-surface-muted border border-line">Soon</span>
              </div>
            </div>

            {/* Error simulation toggle for testing */}
            <div className="p-3 bg-paper-warm/50 rounded-xl border border-line text-[11px] text-ink-muted space-y-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simulateError}
                  onChange={(e) => setSimulateError(e.target.checked)}
                  className="rounded text-orange"
                />
                <span>Simulate network error</span>
              </label>
            </div>
          </aside>

          {/* 2. CENTER CONVERSATION VIEW */}
          <main className="lg:col-span-7 space-y-4">
            
            {/* Header with Mascot */}
            <div className="bg-surface rounded-2xl border border-line p-5 shadow-2xs relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange text-ink text-[11px] font-bold uppercase tracking-wider mb-1">
                  <span>✦</span>
                  <span>AI SPACE TUTOR</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink font-display">
                  ASK. LEARN. <span className="text-orange">EXPLORE.</span>
                </h1>
                <p className="text-xs text-ink-muted">
                  Your empathetic AI companion for space, science and beyond.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 shrink-0">
                  <Image
                    src="/assets/illustrations/mascot_tutor_robot.png"
                    alt="Space Tutor Robot"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Message Thread Container */}
            <div className="bg-surface rounded-2xl border border-line p-4 sm:p-6 shadow-card space-y-4 min-h-[420px] max-h-[560px] overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-2 text-[10px] text-ink-muted px-1">
                    <span className="font-bold">{msg.sender === 'user' ? user.name : 'AI Space Tutor'}</span>
                    <span>·</span>
                    <span>{msg.time}</span>
                    {msg.isOffline && (
                      <span className="text-[9px] bg-paper-warm text-ink-muted px-1.5 py-0.5 rounded border border-line">
                        Offline answer
                      </span>
                    )}
                  </div>

                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                      msg.sender === 'user'
                        ? 'bg-paper-warm text-ink border border-line/80 font-medium'
                        : 'bg-surface border border-line shadow-2xs text-ink'
                    }`}
                  >
                    <p>
                      {msg.text}
                      {msg.isStreaming && <span className="inline-block w-1.5 h-3 bg-orange ml-1 animate-pulse" />}
                    </p>

                    {/* Optional diagram */}
                    {msg.diagramUrl && (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-line bg-night">
                        <Image src={msg.diagramUrl} alt="Explanation diagram" fill className="object-contain p-2" />
                      </div>
                    )}

                    {/* Bullet points */}
                    {msg.bullets && (
                      <ul className="space-y-1 list-disc list-inside text-ink-soft bg-paper-warm/40 p-2.5 rounded-xl border border-line/50">
                        {msg.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-paper-warm text-xs text-ink-muted">
                  <span className="animate-spin text-orange">✦</span>
                  <span>AI Tutor is querying the cosmos...</span>
                </div>
              )}

              {/* Error State with Actionable Retry */}
              {hasError && (
                <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-xs text-ink space-y-2">
                  <div className="flex items-center gap-2 font-bold text-error">
                    <span>⚠️</span>
                    <span>Signal lost in transmission.</span>
                  </div>
                  <p className="text-ink-muted">
                    Unable to contact the AI deep space network. Please retry your request.
                  </p>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="px-3 py-1 rounded-full bg-ink text-surface font-semibold hover:bg-ink-soft transition-colors cursor-pointer"
                  >
                    ↺ Retry Transmission
                  </button>
                </div>
              )}
            </div>

            {/* Quick Suggested Question Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => handleSendMessage('Why does the Moon shine?')}
                className="px-3 py-1.5 rounded-full border border-line bg-surface hover:border-orange hover:bg-orange/5 text-ink shrink-0 font-medium transition-all cursor-pointer"
              >
                Why does the Moon shine? ➔
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('How long is a lunar day?')}
                className="px-3 py-1.5 rounded-full border border-line bg-surface hover:border-orange hover:bg-orange/5 text-ink shrink-0 font-medium transition-all cursor-pointer"
              >
                How long is a lunar day? ➔
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Why is the sky black in space?')}
                className="px-3 py-1.5 rounded-full border border-line bg-surface hover:border-orange hover:bg-orange/5 text-ink shrink-0 font-medium transition-all cursor-pointer"
              >
                Why is the sky black in space? ➔
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('How do rockets work?')}
                className="px-3 py-1.5 rounded-full border border-line bg-surface hover:border-orange hover:bg-orange/5 text-ink shrink-0 font-medium transition-all cursor-pointer"
              >
                How do rockets work? ➔
              </button>
            </div>

            {/* Chat Input Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 p-1.5 rounded-full border border-line bg-surface shadow-xs"
            >
              <span className="pl-3 text-ink-muted text-sm">📎</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything about space, science or your lessons..."
                className="flex-1 px-2 py-2 text-xs text-ink bg-transparent outline-none"
                aria-label="Ask space tutor question"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-8 h-8 rounded-full bg-ink text-surface flex items-center justify-center text-xs font-bold hover:bg-ink-soft disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                ➔
              </button>
            </form>

          </main>

          {/* 3. RIGHT SIDEBAR */}
          <aside className="lg:col-span-3 space-y-5">
            
            {/* Example Questions List */}
            <div className="bg-surface rounded-2xl border border-line p-4 space-y-3">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 font-display">
                <span>📖</span>
                <span>Curated Topics</span>
              </h4>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleSendMessage('What is a black hole?')}
                  className="w-full text-left p-2.5 rounded-xl border border-line hover:border-ink hover:bg-paper-warm/50 transition-all text-xs cursor-pointer group"
                >
                  <div className="font-semibold text-ink group-hover:text-orange flex items-center justify-between">
                    <span>What is a black hole?</span>
                    <span>→</span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-0.5">Gravity traps light inside</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage('Why is the sky black in space?')}
                  className="w-full text-left p-2.5 rounded-xl border border-line hover:border-ink hover:bg-paper-warm/50 transition-all text-xs cursor-pointer group"
                >
                  <div className="font-semibold text-ink group-hover:text-orange flex items-center justify-between">
                    <span>Why is space black?</span>
                    <span>→</span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-0.5">No air molecules to scatter light</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage('How do rockets work?')}
                  className="w-full text-left p-2.5 rounded-xl border border-line hover:border-ink hover:bg-paper-warm/50 transition-all text-xs cursor-pointer group"
                >
                  <div className="font-semibold text-ink group-hover:text-orange flex items-center justify-between">
                    <span>How do rockets work?</span>
                    <span>→</span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-0.5">Newton&apos;s third law in vacuum</p>
                </button>
              </div>
            </div>

            {/* Quick Context Card */}
            <div className="bg-paper-warm/50 rounded-2xl border border-line p-4 space-y-2 text-xs">
              <h4 className="font-bold text-ink flex items-center gap-1.5 uppercase font-display text-[11px] tracking-wider">
                <span>🛰️</span>
                <span>About Your Tutor</span>
              </h4>
              <p className="text-ink-soft leading-relaxed text-[11px]">
                Kaksha Space Tutor combines real-time astrophysics knowledge with kind, conversational guidance. Ask any question in English or Hindi!
              </p>
            </div>

          </aside>

        </div>
      </div>
    </AppShell>
  );
}
