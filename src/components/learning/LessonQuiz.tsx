'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'What causes the phases of the Moon?',
    options: [
      "The Moon's own light turning on and off",
      "The Moon's changing distance from Earth",
      'The changing positions of Earth, Moon, and Sun',
      "Clouds in Earth's atmosphere blocking it",
    ],
    correctIndex: 2,
    explanation: 'As the Moon orbits Earth, sunlight hits it from different angles, changing how much of the lit side we see!',
  },
  {
    id: 'q2',
    prompt: 'How long does it take the Moon to complete one full orbit around Earth?',
    options: [
      '24 hours (1 day)',
      '7 days (1 week)',
      '27.3 days (about a month)',
      '365 days (1 year)',
    ],
    correctIndex: 2,
    explanation: 'The Moon takes 27.3 days to revolve once around Earth, which is the basis for our calendar months!',
  },
  {
    id: 'q3',
    prompt: 'Why do we only ever see one side of the Moon from Earth?',
    options: [
      'The other side is always in pure darkness',
      'The Moon rotates at the exact same rate it orbits Earth',
      'Earth’s magnetic field holds it rigid',
      'The Moon does not rotate at all',
    ],
    correctIndex: 1,
    explanation: 'Tidal locking! Its rotational period exactly matches its orbital period (27.3 days).',
  },
];

interface LessonQuizProps {
  className?: string;
  onQuizComplete?: (score: number) => void;
}

export const LessonQuiz: React.FC<LessonQuizProps> = ({
  className = '',
  onQuizComplete,
}) => {
  const { addXp } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const total = QUIZ_QUESTIONS.length;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckOrNext = () => {
    if (!isAnswered) {
      if (selectedOption === null) return;
      setIsAnswered(true);
      if (selectedOption === currentQ.correctIndex) {
        setScore((prev) => prev + 1);
        addXp(10);
      }
    } else {
      // Advance to next
      if (currentIdx + 1 < total) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
        onQuizComplete?.(score + (selectedOption === currentQ.correctIndex ? 1 : 0));
      }
    }
  };

  const handleSkip = () => {
    if (currentIdx + 1 < total) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onQuizComplete?.(score);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className={`bg-surface p-4 rounded-xl border-[1.5px] border-ink shadow-[3px_3px_0_var(--ink)] text-center ${className}`}>
        <div className="text-3xl mb-1">🎉</div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-1">
          Quiz Completed!
        </h3>
        <p className="text-xs text-ink-muted mb-3">
          You scored <strong className="text-orange">{score} / {total}</strong> on Lunar Mechanics!
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="w-full py-2 rounded-lg bg-[#171715] text-[#F7F4ED] text-xs font-bold border-2 border-[#171715] shadow-[2px_2px_0_#171715] hover:bg-[#282723] cursor-pointer"
        >
          Retake Quiz ↺
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-surface p-4 rounded-xl border-[1.5px] border-ink shadow-[3px_3px_0_var(--ink)] flex flex-col justify-between ${className}`}>
      <div>
        {/* Header & Progress */}
        <div className="flex items-center justify-between pb-2 border-b border-line mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
            <span>🎯</span>
            <span className="uppercase tracking-wider">Quick Quiz</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-paper-warm rounded-full overflow-hidden border border-line">
              <div
                className="h-full bg-orange rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-ink-muted">
              {currentIdx + 1} / {total}
            </span>
          </div>
        </div>

        {/* Question Prompt */}
        <p className="text-xs font-bold text-ink mb-3 leading-snug">
          {currentQ.prompt}
        </p>

        {/* Options */}
        <div className="space-y-1.5 mb-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnClass = 'border-line bg-surface text-ink hover:border-ink hover:bg-paper-warm/50';

            if (isAnswered) {
              if (isCorrect) {
                btnClass = 'border-success bg-success-soft text-ink font-bold';
              } else if (isSelected && !isCorrect) {
                btnClass = 'border-error bg-red-50 text-ink line-through opacity-75';
              }
            } else if (isSelected) {
              btnClass = 'border-ink bg-paper-warm font-bold text-ink shadow-[1px_1px_0_var(--ink)]';
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-2 rounded-lg border text-[11px] leading-tight flex items-start gap-2 transition-all cursor-pointer ${btnClass}`}
              >
                <span
                  className={`w-4 h-4 rounded-full border border-ink flex items-center justify-center shrink-0 text-[9px] mt-0.5 ${
                    isSelected ? 'bg-ink text-surface' : 'bg-surface text-ink'
                  }`}
                >
                  {isAnswered && isCorrect ? '✓' : String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Post-answer feedback */}
        {isAnswered && (
          <div className="p-2 rounded-lg bg-paper-warm/80 border border-line text-[11px] text-ink leading-relaxed mb-3 animate-fadeIn">
            <span className="font-bold text-orange">
              {selectedOption === currentQ.correctIndex ? '✨ Correct! (+10 XP)' : '💡 Tip:'}
            </span>{' '}
            {currentQ.explanation}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-line">
        <button
          type="button"
          onClick={handleSkip}
          className="px-3 py-1.5 rounded-lg border border-line hover:border-ink text-[11px] font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={handleCheckOrNext}
          disabled={selectedOption === null}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold border-2 border-[#171715] transition-all cursor-pointer ${
            selectedOption === null
              ? 'bg-paper-warm text-ink-muted border-line opacity-50 cursor-not-allowed'
              : 'bg-[#171715] text-[#F7F4ED] shadow-[2px_2px_0_#171715] hover:bg-[#282723]'
          }`}
        >
          {isAnswered ? (currentIdx + 1 === total ? 'Finish Quiz →' : 'Next Question →') : 'Check Answer →'}
        </button>
      </div>
    </div>
  );
};
