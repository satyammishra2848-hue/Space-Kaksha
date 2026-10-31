// src/context/TransitionContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useReducedMotion } from './MotionContext';

interface TransitionContextType {
  isTransitioning: boolean;
  phase: 'idle' | 'in' | 'out';
  navigateWithWipe: (href: string) => Promise<void>;
  notifyPageMounted: () => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  phase: 'idle',
  navigateWithWipe: async () => {},
  notifyPageMounted: () => {},
});

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { reducedMotion } = useReducedMotion();

  const [phase, setPhase] = useState<'idle' | 'in' | 'out'>('idle');
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const notifyPageMounted = useCallback(() => {
    // Called by template.tsx on route mount
    if (reducedMotion) {
      setPhase('out');
      timeoutRef.current = setTimeout(() => {
        setPhase('idle');
        focusMainHeading();
      }, 150);
      return;
    }

    setPhase('out');
    timeoutRef.current = setTimeout(() => {
      setPhase('idle');
      focusMainHeading();
    }, 300);
  }, [reducedMotion]);

  const focusMainHeading = () => {
    const heading = document.querySelector('main h1, h1') as HTMLElement | null;
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      setScreenReaderAnnouncement(`Navigated to ${document.title || 'Space Kaksha'}`);
    }
  };

  const navigateWithWipe = useCallback(
    async (href: string) => {
      // Don't transition if already moving or same route without query change
      if (phase !== 'idle') return;

      // Clean pending timeouts
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
      if (isExternal) {
        window.location.href = href;
        return;
      }

      // Reduced motion: 150ms gentle fade
      if (reducedMotion) {
        setPhase('in');
        timeoutRef.current = setTimeout(() => {
          try {
            router.push(href);
          } catch {
            window.location.href = href;
          }
        }, 150);
        return;
      }

      // Full Orbit Wipe: 300ms sweep in
      setPhase('in');

      // Safety timeout: Never block navigation even if animation stalls
      timeoutRef.current = setTimeout(() => {
        try {
          router.push(href);
        } catch {
          window.location.href = href;
        }
      }, 300);
    },
    [phase, reducedMotion, router]
  );

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning: phase !== 'idle',
        phase,
        navigateWithWipe,
        notifyPageMounted,
      }}
    >
      {children}

      {/* Screen Reader polite route announcer */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {screenReaderAnnouncement}
      </div>

      {/* Orbit Wipe Visual Overlay */}
      <OrbitWipeOverlay phase={phase} reducedMotion={reducedMotion} />
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);

export function useTransitionRouter() {
  const { navigateWithWipe } = useTransitionContext();
  const standardRouter = useRouter();

  return {
    push: (href: string) => navigateWithWipe(href),
    replace: (href: string) => navigateWithWipe(href),
    back: () => standardRouter.back(),
    forward: () => standardRouter.forward(),
  };
}

// -------------------------------------------------------------
// Orbit Wipe Visual Overlay Component
// -------------------------------------------------------------
function OrbitWipeOverlay({
  phase,
  reducedMotion,
}: {
  phase: 'idle' | 'in' | 'out';
  reducedMotion: boolean;
}) {
  if (phase === 'idle') return null;

  // Reduced motion: safe opacity fade (150ms)
  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-50 pointer-events-auto bg-night transition-opacity duration-150 ease-out ${
          phase === 'in' ? 'opacity-90' : 'opacity-0'
        }`}
      />
    );
  }

  // Full Orbit Wipe: Organic cosmic shape sweeping horizontally across screen
  // phase 'in' sweeps in from right: translateX(100%) -> translateX(0%)
  // phase 'out' sweeps away to left: translateX(0%) -> translateX(-100%)
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-auto overflow-hidden"
    >
      <div
        className={`w-full h-full bg-night relative transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          phase === 'in'
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
        style={{
          transform: phase === 'in' ? 'translateX(0%)' : 'translateX(-100%)',
          animation: phase === 'in' ? 'orbitSweepIn 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards' : undefined,
        }}
      >
        {/* Leading edge: Organic wavy lunar curve & orange star trail */}
        <div className="absolute top-0 right-[-40px] bottom-0 w-16 pointer-events-none flex flex-col justify-around text-orange">
          <span className="text-xl animate-pulse">✦</span>
          <span className="text-sm font-hand text-yellow -ml-4">Seekho...</span>
          <span className="text-lg animate-ping">✧</span>
        </div>
      </div>
    </div>
  );
}
