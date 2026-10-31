'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useApp } from '@/context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  time: string;
  diagramUrl?: string;
  bullets?: string[];
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

const TUTOR_KNOWLEDGE_BASE: Record<string, { text: string; bullets?: string[] }> = {
  'why does the moon shine?': {
    text: 'The Moon shines purely by reflection! Sunlight travels 150 million km to strike the Moon\'s rocky surface, which bounces a fraction of that light back to Earth.',
    bullets: [
      'The Moon has an albedo (reflectivity) of about 0.12—similar to worn asphalt.',
      'Even though it looks bright against the night sky, it is quite dark compared to fresh snow.',
    ],
  },
  'how long is a lunar day?': {
    text: 'One full day-night cycle on the Moon lasts about 29.5 Earth days! That means roughly two weeks of continuous daylight followed by two weeks of continuous night.',
    bullets: [
      'Daytime surface temperatures can reach +120°C (+250°F).',
      'Nighttime drops down to a freezing -130°C (-200°F).',
    ],
  },
  'show a 3d simulation': {
    text: 'You can interact with our real-time 3D Moon Phase simulator right in Lesson 2 ("Meet the Moon")! You can rotate orbital angles and view the Earth-Moon system live.',
    bullets: [
      'Visit /lesson/meet-the-moon to drag the orbit slider.',
      'Observe synchronous tidal locking directly.',
    ],
  },
  'why is the sky black in space?': {
    text: 'On Earth, atmospheric molecules scatter blue sunlight in all directions (Rayleigh scattering), making our sky look blue. Space is an extreme vacuum with no dense atmosphere to scatter light, so the sky remains inky black even with the Sun shining brightly!',
    bullets: [
      'Stars do not twinkle in space because there is no turbulent air.',
      'Shadows in space are very sharp and dark.',
    ],
  },
  'how do rockets work?': {
    text: 'Rockets operate on Sir Isaac Newton\'s Third Law of Motion: "For every action, there is an equal and opposite reaction." By burning propellant and ejecting high-pressure exhaust gas downward at hypersonic speeds, the rocket accelerates upward into orbit!',
    bullets: [
      'Rockets carry their own oxidizer so engines burn in the airless vacuum.',
      'Reaching low Earth orbit requires traveling at about 7.8 km per second.',
    ],
  },
  'what is a black hole?': {
    text: 'A black hole is a region in spacetime where gravity is so intense that nothing—not even light—can escape its event horizon. They typically form when massive stars collapse at the end of their lifecycles.',
    bullets: [
      'The boundary beyond which escape is impossible is called the Event Horizon.',
      'Supermassive black holes reside at the hearts of most large galaxies, including our Milky Way.',
    ],
  },
  'compare earth, mars and moon': {
    text: 'Earth is our water-rich sanctuary with a protective atmosphere. Mars is a cold desert planet with a thin CO2 atmosphere and frozen polar caps. The Moon is Earth\'s rocky natural satellite with virtually no atmosphere at all!',
  },
};

export const getTutorReply = async (query: string): Promise<{ text: string; bullets?: string[] }> => {
  // Simulate natural brief latency (400ms)
  await new Promise((r) => setTimeout(r, 400));
  const clean = query.trim().toLowerCase();

  for (const [key, val] of Object.entries(TUTOR_KNOWLEDGE_BASE)) {
    if (clean.includes(key) || key.includes(clean)) {
      return val;
    }
  }

  return {
    text: `That is an excellent space query! The cosmos is filled with wonderful phenomena. In our upcoming lessons, we explore this in deeper detail. Would you like to check our lesson simulator or explore the solar system?`,
    bullets: [
      'Tip: Try asking "Why is the sky black in space?" or "How do rockets work?"',
      'Or check out Lesson 2: Meet the Moon for hands-on orbit exploration.',
    ],
  };
};

export default function SpaceTutorPage() {
  const { user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
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
      const reply = await getTutorReply(text);
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: reply.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bullets: reply.bullets,
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
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
                <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-ink">
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
                  </div>

                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                      msg.sender === 'user'
                        ? 'bg-paper-warm text-ink border border-line/80 font-medium'
                        : 'bg-surface border border-line shadow-2xs text-ink'
                    }`}
                  >
                    <p>{msg.text}</p>

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
                    className="px-3 py-1 rounded-full bg-ink text-surface font-semibold hover:bg-ink-soft transition-colors"
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
                className="px-3 py-1.5 rounded-full border border-line bg-surface hover:border-orange hover:bg-orange/5 text-ink shrink-0 font-medium transition-all"
              >
                Why does the Moon shine? ➔
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('How long is a lunar day?')}
                className="px-3 py-1.5 rounded-full border border-line bg-surface hover:border-orange hover:bg-orange/5 text-ink shrink-0 font-medium transition-all"
              >
                How long is a lunar day? ➔
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Why is the sky black in space?')}
                className="px-3 py-1.5 rounded-full border border-line bg-surface hover:border-orange hover:bg-orange/5 text-ink shrink-0 font-medium transition-all"
              >
                Why is the sky black in space? ➔
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('How do rockets work?')}
                className="px-3 py-1.5 rounded-full border border-line bg-surface hover:border-orange hover:bg-orange/5 text-ink shrink-0 font-medium transition-all"
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
                className="w-8 h-8 rounded-full bg-ink text-surface flex items-center justify-center text-xs font-bold hover:bg-ink-soft disabled:opacity-40 transition-colors"
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
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                <span>📖</span>
                <span>Example Questions</span>
              </h4>

              <div className="space-y-1.5">
                {[
                  'Why is the sky black in space?',
                  'How do rockets work?',
                  'What is a black hole?',
                  'Compare Earth, Mars and Moon',
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="w-full flex items-center justify-between p-2 rounded-xl border border-line/60 hover:border-orange hover:bg-orange/5 text-left text-xs font-medium text-ink transition-all"
                  >
                    <span>{q}</span>
                    <span className="text-orange text-xs">➔</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Suggestions */}
            <div className="bg-surface rounded-2xl border border-line p-4 space-y-3">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                <span>🎯</span>
                <span>Learning Suggestions</span>
              </h4>

              <div className="space-y-2">
                <Link
                  href="/lesson/meet-the-moon"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-line bg-paper-warm/40 hover:border-ink transition-all"
                >
                  <div>
                    <h5 className="text-xs font-bold text-ink">Moon & Earth</h5>
                    <span className="text-[10px] text-ink-muted">Interactive simulation</span>
                  </div>
                  <span className="text-orange">▶</span>
                </Link>

                <Link
                  href="/lesson/meet-the-moon"
                  className="flex items-center justify-between p-2.5 rounded-xl border border-line bg-paper-warm/40 hover:border-ink transition-all"
                >
                  <div>
                    <h5 className="text-xs font-bold text-ink">Phases of the Moon</h5>
                    <span className="text-[10px] text-ink-muted">3D Lunar Orbit</span>
                  </div>
                  <span className="text-orange">🎮</span>
                </Link>
              </div>
            </div>

            {/* Did You Know? */}
            <div className="bg-paper-warm/60 rounded-2xl border border-line p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                <span className="text-orange">💡</span>
                <span>Did You Know?</span>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed">
                The Moon is moving away from Earth at about 3.8 cm every year, as tidal interactions transfer angular momentum!
              </p>
            </div>

          </aside>

        </div>

      </div>
    </AppShell>
  );
}
