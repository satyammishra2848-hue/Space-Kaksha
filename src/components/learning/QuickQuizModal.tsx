'use client';

import React, { useEffect } from 'react';
import { LessonQuiz } from './LessonQuiz';
import { QuizQuestion } from '@/types';

interface QuickQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions?: QuizQuestion[];
  lessonTitle?: string;
}

export const QuickQuizModal: React.FC<QuickQuizModalProps> = ({
  isOpen,
  onClose,
  questions,
  lessonTitle = 'Meet the Moon',
}) => {
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
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink/75 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-paper rounded-3xl border-2 border-ink shadow-[6px_6px_0_var(--ink)] max-w-xl w-full flex flex-col max-h-[92vh] overflow-hidden relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-line bg-surface flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-ink bg-paper-warm flex items-center justify-center text-sm shadow-[1px_1px_0_var(--ink)]">
              🎯
            </div>
            <div>
              <h2 id="quiz-dialog-title" className="text-xs font-bold uppercase tracking-wider text-ink font-display">
                Quick Quiz Check
              </h2>
              <p className="text-[10px] text-ink-muted">
                Topic: <span className="font-semibold text-ink">{lessonTitle}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-line bg-surface hover:bg-paper-warm text-ink flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
            aria-label="Close quiz dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body with Quiz */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <LessonQuiz questions={questions} />
        </div>
      </div>
    </div>
  );
};

