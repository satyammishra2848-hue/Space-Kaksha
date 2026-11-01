'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { askTutor } from '@/lib/tutorClient';

interface SpaceTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextLesson?: string;
  lessonId?: string;
  level?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  isOffline?: boolean;
}

export const SpaceTutorModal: React.FC<SpaceTutorModalProps> = ({
  isOpen,
  onClose,
  contextLesson = 'Meet the Moon',
  lessonId = 'meet-the-moon',
  level = 'Explorer',
}) => {
  const { locale } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        locale === 'hi'
          ? 'नमस्ते! 🚀 मैं कक्षा का एआई स्पेस ट्यूटर हूँ। आज आप अंतरिक्ष के बारे में क्या जानना चाहते हैं? मुझसे कुछ भी पूछें!'
          : "Hello! 🚀 I'm your AI Space Tutor for Kaksha. What would you like to explore about the universe today? Ask me anything!",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isRevealing]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading || isRevealing) return;

    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = { id: userMsgId, role: 'user', content: text };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askTutor({
        messages: nextHistory.map((m) => ({ role: m.role, content: m.content })),
        lessonId,
        level,
        language: locale,
      });

      const tutorMsgId = `tutor-${Date.now()}`;
      const words = response.text.split(' ');
      let currentWordIndex = 0;

      const tutorMsg: Message = {
        id: tutorMsgId,
        role: 'assistant',
        content: words[0] || '',
        isStreaming: true,
        isOffline: response.offline,
      };

      setMessages((prev) => [...prev, tutorMsg]);
      setIsLoading(false);
      setIsRevealing(true);

      streamIntervalRef.current = setInterval(() => {
        currentWordIndex += 1;
        if (currentWordIndex >= words.length) {
          if (streamIntervalRef.current) {
            clearInterval(streamIntervalRef.current);
            streamIntervalRef.current = null;
          }
          setIsRevealing(false);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === tutorMsgId ? { ...m, content: response.text, isStreaming: false } : m
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === tutorMsgId
                ? { ...m, content: words.slice(0, currentWordIndex + 1).join(' ') }
                : m
            )
          );
        }
      }, 35);
    } catch {
      setIsLoading(false);
      const fallback =
        locale === 'hi'
          ? 'नमस्ते! सिग्नल में थोड़ी रुकावट आई है, लेकिन मैं यहाँ हूँ। आप क्या पूछना चाहते हैं?'
          : "Signal momentarily interrupted in deep space! I'm here though—what would you like to explore?";
      setMessages((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, role: 'assistant', content: fallback, isOffline: true },
      ]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutor-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/75 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-paper rounded-3xl border-2 border-ink shadow-[6px_6px_0_var(--ink)] max-w-2xl w-full flex flex-col h-[640px] max-h-[92vh] overflow-hidden relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-line bg-surface flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-ink bg-paper-warm flex items-center justify-center text-lg shadow-[2px_2px_0_var(--ink)]">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="tutor-dialog-title" className="text-sm font-bold uppercase tracking-wider text-ink font-display">
                  AI Space Tutor
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] bg-mint/15 text-mint-dark font-bold px-2 py-0.5 rounded-full border border-mint/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                  Live Chat
                </span>
              </div>
              <p className="text-[11px] text-ink-muted">
                {locale === 'hi' ? 'पाठ संदर्भ' : 'Context'}: <span className="font-semibold text-ink">{contextLesson}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-line bg-surface hover:bg-paper-warm text-ink flex items-center justify-center font-bold text-sm cursor-pointer transition-colors shadow-2xs"
            aria-label="Close tutor dialog"
          >
            ✕
          </button>
        </div>

        {/* ChatGPT Open Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-paper/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-1`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-ink-muted px-1 font-semibold">
                <span>{msg.role === 'user' ? 'You' : 'AI Space Tutor'}</span>
                {msg.isOffline && (
                  <span className="text-[9px] bg-paper-warm text-ink-muted px-1.5 py-0.5 rounded border border-line">
                    Offline answer
                  </span>
                )}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-paper-warm text-ink border border-line font-medium shadow-2xs'
                    : 'bg-[#171715] text-[#F7F4ED] border border-ink shadow-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">
                  {msg.content}
                  {msg.isStreaming && (
                    <span className="inline-block w-1.5 h-3 bg-orange ml-1 animate-pulse" />
                  )}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-line text-xs text-ink-muted max-w-[240px]">
              <span className="w-2 h-2 rounded-full bg-orange animate-ping" />
              <span>
                {locale === 'hi' ? 'ट्यूटर सोच रहा है...' : 'AI Tutor is thinking...'}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Clean ChatGPT-Style Composer (No canned suggestion chips) */}
        <div className="p-3 sm:p-4 border-t border-line bg-surface shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 p-1.5 rounded-2xl border border-line bg-surface-card focus-within:border-ink shadow-inner-sm"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading || isRevealing}
              placeholder={
                locale === 'hi'
                  ? 'अंतरिक्ष के बारे में कुछ भी पूछें... (उदा: नमस्ते)'
                  : 'Ask anything about space... (e.g. "hi", "how do orbits work?")'
              }
              className="flex-1 px-3 py-2 text-xs sm:text-sm text-ink bg-transparent outline-none disabled:opacity-50"
              aria-label="Type your space question"
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading || isRevealing}
              className="px-4 py-2 rounded-xl bg-ink text-surface text-xs font-bold hover:bg-ink-soft disabled:opacity-40 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
              aria-label="Send message"
            >
              <span>Send</span>
              <span className="ml-1">➔</span>
            </button>
          </form>
          <p className="text-[10px] text-center text-ink-muted mt-2">
            Ask naturally like ChatGPT • Powered by Gemini AI Space Engine
          </p>
        </div>
      </div>
    </div>
  );
};

