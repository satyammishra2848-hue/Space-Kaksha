# Kaksha Motion Audit & Interaction Verification Checklist

This audit verifies that the motion and visual refinements implemented in **Kaksha: The Space Academy** adhere to all guidelines defined in the master design specification and prompt mandates.

---

## 1. Motion Principles Compliance
- [x] **Motion Explains, Rewards, or Guides**:
  - *Explains*: Dynamic Moon-phase rotational drag, orbit path draw on scroll (`DrawPath`).
  - *Rewards*: Level 1 Explorer stamp-down overshoot on test completion, 8-star radiant `StarBurst` confetti, and numeric `CountUp` counters.
  - *Guides*: Snappy option selection pop on radio answers, 120px question horizontal slide, and Orbit Wipe route transitions.
- [x] **One Hero Moment per Section**:
  - Hero Section: Organic right-edge astronaut window bleed with live Caveat annotation note.
  - Four Levels: Organic wavy lunar horizon transition (`WavyDivider`) into deep cosmic starfield.
  - Placement Test: 1s orbital loader indicating telemetry computation prior to result assignment.
  - Results Dashboard: Level badge stamp-down with spring overshoot.
- [x] **Concurrency Budget**: At most two distinct motions on screen simultaneously; zero CPU-bound loops.
- [x] **Transform and Opacity Only**:
  - All reveals, staggers, and transitions animate strictly `transform` and `opacity`.
  - Zero reflow-triggering layout property animations (no `width`, `height`, `margin`, or `top` transitions).
- [x] **Stagger Bounds**:
  - Stagger delay clamped to 70ms per sibling; capped at a maximum of 8 items (`Math.min(index, 7) * 70ms`).

---

## 2. Timing and Easing Verification
- **Press Duration**: 90ms (`--duration-press: 90ms`, active click state).
- **Hover Duration**: 160ms (`--duration-hover: 160ms`, card/button elevation).
- **UI Element Duration**: 260ms (`--duration-ui: 260ms`, question slide in).
- **Reveal Duration**: 420ms (`--duration-reveal: 420ms`, section scroll entry).
- **Hero Moment Duration**: 700ms (`--duration-hero: 700ms`, count-ups, SVG path draw).
- **Easings**:
  - Out: `cubic-bezier(0.22, 1, 0.36, 1)` (smooth deceleration for entries).
  - In-Out: `cubic-bezier(0.65, 0, 0.35, 1)` (balanced trajectory for wipe).
  - Pop: `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring overshoot for stamps & bursts).

---

## 3. Page-to-Page Orbit Wipe Transition
- [x] **Custom Link Wrapper**: Implemented `TransitionLink` as a drop-in wrapper around `next/link`.
- [x] **Custom Router Hook**: Implemented `useTransitionRouter` exposing transition-wrapped `.push()` and `.replace()`.
- [x] **Non-Blocking Safety**:
  - Modified clicks (`Cmd`, `Ctrl`, `Shift`, `Alt`), middle-clicks (`button === 1`), `target="_blank"`, and download links are preserved and bypass the wipe.
  - Timeout safety fallback (300ms) guarantees navigation even if an animation event stalls.
- [x] **Enter and Exit Choreography**:
  - Sweep in: Organic cosmic overlay sweeps in from right over 300ms.
  - Page entry: `template.tsx` automatically detects route mount, sweeping overlay off to left over 300ms while page content rises in over 260ms (`animate-page-rise`). Total roundtrip < 700ms.
- [x] **Accessibility & Reduced Motion**:
  - Screen reader polite announcement via `aria-live="polite"` element.
  - Active focus transferred to new page's main heading (`main h1, h1`).
  - Reduced motion mode substitutes the wipe with a clean 150ms opacity fade.
  - Overlay is `aria-hidden="true"`, pointer events isolated strictly to active state, and listeners detached on unmount.

---

## 4. Reduced-Motion & Progressive Enhancement
- [x] **Safe-by-Default Progressive Enhancement**:
  - Hidden initial states (`.reveal-init`) are gated under `html.js` class injected on client hydration. Content is 100% visible if JavaScript is disabled.
- [x] **System and User Override**:
  - Listens to `(prefers-reduced-motion: reduce)`.
  - Accessible toggle button in `Footer.tsx` lets user manually enable or disable motion with persistent `localStorage` preference.

---

## 5. Visual Contrast & Layout Verification
- [x] **WCAG AA Verification**: All 21 text/background token combinations verified passing via `scripts/contrast.mjs` (15.67:1 on night, 16.34:1 on paper).
- [x] **Zero Baked-In Text**: All label artifacts ("NER", "ADET", etc.) removed from image crops; annotations rendered as live text in `Caveat` (`font-hand`).
- [x] **Layout Overflow**: Enforced `overflow-x: clip` across `html`, `body`, and `AppShell` with zero horizontal overflow at 360, 390, 768, 1024, and 1440px.

