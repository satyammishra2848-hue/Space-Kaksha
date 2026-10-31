# Product Requirements Document (PRD)
## Project: Kaksha: The Space Academy (Seekho orbit se)

**Version:** 1.0.0 (Hackathon MVP)  
**Author:** Lead Engineer  
**Date:** 2026-10-31  
**Status:** Approved & Implemented  

---

### 1. Product Summary
Kaksha ("Seekho orbit se") is an illustrated, editorial space academy web application designed to guide curious learners through astronomy and space science concepts in a structured, inspiring, and accessible manner. Combining the visual charm of a hand-illustrated science journal with modern interactive web experiences, Kaksha pairs bite-sized lessons with hands-on interactive simulations, adaptive assessments, gamified orbital roadmaps, and an empathetic AI Space Tutor (bilingual in English and Hindi).

---

### 2. Goals & Success Metrics
- **Demo Excellence:** Provide a zero-crash, highly polished end-to-end interactive journey across all specified screens.
- **Visual Fidelity:** Honor the "Illustrated Space Editorial" aesthetic (warm paper surfaces, ink-black typography, restrained accents, hand-drawn astronomy art, orbital paths).
- **Core Educational Loop:** Demonstrate the full student lifecycle: Placement Test -> Level Assignment -> My Path -> Interactive Lesson & Moon-phase Simulator -> Mini Quiz -> Lesson Complete -> Level Check -> Level Up -> Profile & AI Tutor.
- **Accessibility & Responsiveness:** Clean fluid layouts supporting viewports from 360px mobile to 1440px desktop with keyboard navigation, visible focus, ARIA semantics, and reduced-motion support.

---

### 3. Target Users
- **Curious Beginners & Young Learners (Ages 8-16):** Seeking engaging, non-intimidating explanations, visual diagrams, and playful gamification.
- **Space Enthusiasts of All Ages:** Looking for an intuitive curriculum covering our Solar System, rocketry, gravity, and cosmology.
- **Bilingual Learners (India & Global):** Learners who benefit from seamless toggling between English and Hindi (हिंदी).

---

### 4. User Flow
1. **Discover (Home `/`):** User lands on the homepage, explores the mission, learning levels, and how it works.
2. **Placement Test (`/test`):** User answers 12 calibrated questions ("Let's find your orbit") with keyboard/radio support.
3. **Assessment Result (`/result`):** Instant placement into a level (e.g., Level 1 Explorer) with topic bars and a clear next step.
4. **Learning Journey (`/path`):** Visual path map showing completed, active, and locked lesson nodes.
5. **Interactive Lesson (`/lesson/[lessonId]`):** Multi-tab lesson (Explore, Learn, Key Facts), working Moon-phase simulator (interactive orbit and phase illumination), video fallback, and 3-question mini-quiz.
6. **Lesson Complete State (Modal / Screen):** Awards XP, displays badge, updates progress, and links to the next lesson.
7. **Level Check (`/check/[levelId]`):** 8-question timed mission assessment with visual diagrams and question navigator.
8. **Level Up State (Modal / Screen):** Celebratory unlock of Level 2 Cadet, awarding bonus XP and new badges.
9. **Student Profile (`/profile`):** Comprehensive learner overview featuring XP progress, streak, badges, learning stats, and recent activity.
10. **AI Space Tutor (`/tutor`):** Dedicated conversational space tutor with suggested prompt chips, deterministic simulation answers, and retry/error handling.

---

### 5. Routes & Screen Mapping
| Route | Screen Name | Reference Image | Core Purpose |
|---|---|---|---|
| `/` | Homepage | `Kaksha Space Academy Homepage.png` | Complete vertical scroll: Hero, How it works, 4 Levels, Path preview, Why Kaksha, CTA, Footer. |
| `/test` | Placement Test | `Kaksha Space Academy Quiz Interface.png` | 12 questions ("Let's find your orbit"), segment progress, encouragement tips, back/next navigation. |
| `/result` | Results Dashboard | `Kaksha Space Academy Results Dashboard.png` | Assigned level ("You're a Level 1 Explorer"), topic breakdown, "What this means", Path preview. |
| `/path` | Learning Journey | `Kaksha Space Learning Journey.png` | Interactive orbital map, numbered nodes (completed, current, locked), Up Next card, Level 2 preview. |
| `/lesson/[lessonId]` | Moon Mission Dashboard | `Kaksha Moon Mission Dashboard.png` | Breadcrumb, tabs (Explore/Learn/Key Facts), interactive Moon-phase simulator, embedded quiz, AI tutor panel. |
| `/check/[levelId]` | Level Check | `Kaksha Space Academy Level Check.png` | 8 questions, timer, question navigator, orbital diagrams, unlocks Level Up upon pass. |
| `/profile` | Profile Dashboard | `Kaksha Space Academy Profile Dashboard.png` | Learner stats, streak calendar, unlocked badges, learning metrics, recent activities. |
| Modal/Overlay | Lesson Complete | `Kaksha Space Academy Lesson Complete.png` | Modal/fullscreen celebration, XP reward, "What You Learned" checklist, Next Lesson CTA. |
| Modal/Overlay | Level Up | `Level Up to New Horizons geschniegelt.png` | Modal/fullscreen celebration, unlocks Level 2 Cadet, bonus XP, new horizons banner. |
| `/tutor` | AI Space Tutor | `Kaksha AI Space Tutor Dashboard.png` | Full-page interactive chat with canned deterministic knowledge base, suggested chips, and error retry state. |

---

### 6. Levels and Curriculum Structure
- **Level 1: Explorer** (Theme: *Our Solar System*)
  - Lesson 1: `earth-and-sky` — Earth & Sky (Atmosphere, day/night overview)
  - Lesson 2: `meet-the-moon` — Meet the Moon (Phases, tidal lock, distance 384,400 km, interactive simulator)
  - Lesson 3: `discover-planets` — Discover Planets (Inner rocky planets & outer gas giants)
  - Capstone: `level-1-check` — Level 1 Check (8 comprehensive questions to unlock Level 2)
- **Level 2: Cadet** (Theme: *Gravity & Rockets*)
  - Lesson 1: `gravity-and-motion` — Gravity & Motion
  - Lesson 2: `rockets-and-space-travel` — Rockets & Space Travel
  - Lesson 3: `day-night-weather` — Day, Night & Weather
  - Capstone: `level-2-check` — Level 2 Check
- **Level 3: Astronaut** (Theme: *Stars & Galaxies*) — [Coming Soon Preview]
- **Level 4: Mission Specialist** (Theme: *Space Careers & Deep Space*) — [Coming Soon Preview]

---

### 7. Data Models & State Architecture

```typescript
// Core User Progress State
export interface UserState {
  name: string;
  avatar: string;
  currentLevelId: string;
  xp: number;
  streakDays: number;
  completedLessonIds: string[];
  passedCheckIds: string[];
  earnedBadgeIds: string[];
  topicScores: Record<string, number>;
  activeLocale: 'en' | 'hi';
}

// Lesson Definition
export interface Lesson {
  id: string;
  levelId: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  estimatedMinutes: number;
  objectives: string[];
  keyFacts: string[];
  videoUrl?: string; // Optional local/hosted MP4
  quiz: QuizQuestion[];
  xpReward: number;
}

// Question Definition
export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
  diagramUrl?: string;
  tier?: number;
  topic?: string;
}
```

---

### 8. System Rules & Integrity Constraints
1. **Single-Award XP:** Completing a lesson or passing a Level Check awards XP exactly once. Reloading or repeating completed items does not increment XP or badges.
2. **Sequential Unlocking:** Locked lessons and level checks remain locked until all prerequisite lessons within that level are completed.
3. **Graceful Degraded Navigation:** Nav/sidebar links without dedicated routes (e.g., Notes, Settings, Achievements, Contact, Help, Privacy) must either smoothly scroll to an on-page section or display a visible, disabled "Soon" tooltip badge. No dead links.
4. **Deterministic Demo Reliability:** No reliance on unstable external APIs. AI Tutor uses a deterministic rule-based knowledge engine (`getTutorReply`) with simulated network delays, retry states, and fallback error handlers.
5. **Sample Data Isolation:** Aarav's sample telemetry (320 XP, 7 day streak, 12 lessons) is isolated strictly inside `src/data/sampleState.ts` with explicit UI disclaimer comments.

---

### 9. Decisions & Deviations Record
- **Level Names & Themes:** Synchronized with the visual reference images: Level 1 Explorer (*Our Solar System*), Level 2 Cadet (*Gravity & Rockets*), Level 3 Astronaut (*Stars & Galaxies*), Level 4 Mission Specialist (*Space Careers*).
- **Illustrations:** Cropped and extracted cleanly from reference images into `public/assets/illustrations/` with an accompanying manifest. High-fidelity inline SVGs are provided for orbital trajectories and tactile space doodles.
- **Language Switcher:** Working global English (`en`) and Hindi (`hi`) toggle supporting navbars, footers, buttons, and key headers.

---

### 10. Non-Goals (Out of Scope for Hackathon)
- Persistent server database / user accounts with password authentication.
- Live LLM streaming API calls requiring paid API keys or cloud credentials.
- Dynamic automated video generation.
- Full custom localized copy for all future Level 3/4 content.

---

### 11. Acceptance Criteria Checklist
- [x] All 7 core routes (`/`, `/test`, `/result`, `/path`, `/lesson/[lessonId]`, `/check/[levelId]`, `/profile`, `/tutor`) implemented.
- [x] Lesson Complete and Level Up modal/screens fully interactive with focus trapping and Esc dismissal.
- [x] Working Moon-phase simulator responding to slider/rotation with live illumination and phase titles.
- [x] Working Placement Test with score calculation mapping to starting level.
- [x] Zero console runtime errors, lint errors, or broken builds.
- [x] Mobile responsive down to 360px without horizontal overflow.
