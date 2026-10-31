# Kaksha: The Space Academy — Project State

> ### HANDOFF
> New agent: read this file fully, then PRD.md and DESIGN.md, inspect /images, then continue from Next steps. Update this file at the end of every task.

---

### Project Summary
Kaksha ("Seekho orbit se") is an illustrated, editorial space academy web application for curious learners.
It pairs bite-sized space stories with hands-on interactive simulations, an adaptive placement test,
gamified orbital roadmaps, celebratory completion states, and an empathetic bilingual AI Space Tutor.
The visual identity fuses a warm paper canvas, crisp ink typography, and hand-drawn astronomy sketches.
The entire hackathon demo stack is built with Next.js 16 App Router, TypeScript, and Tailwind CSS.

### Stack
- **Framework:** Next.js 16.4.3 (App Router with Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + Design Tokens (`src/styles/tokens.css`)
- **Typography:** `next/font/google` (Space Grotesk, Inter, Caveat) with fallback
- **State & Storage:** React Context (`AppContext`) with automatic LocalStorage persistence and zero external UI libraries
- **Assets:** Python PIL cropped authentic illustrations in `public/assets/illustrations/` + `manifest.json`

### How to Run
```bash
# 1. Install dependencies
npm install

# 2. Run TypeScript check & production build
npm run build

# 3. Start production server (runs on port 3001)
npx next start -p 3001
# Or run dev mode:
# npm run dev
```

### Folder Map
```text
Space Kaksha/
├── images/                         # 10 Authoritative visual reference screenshots
├── public/
│   └── assets/
│       ├── illustrations/          # 19 Extracted visual illustrations & diagrams
│       └── manifest.json           # Asset manifest registry
├── scripts/
│   └── crop_assets.py              # Python asset extraction script
├── src/
│   ├── app/
│   │   ├── page.tsx                # / (Home: complete scrollable page)
│   │   ├── test/page.tsx           # /test (12-Question Placement Test)
│   │   ├── result/page.tsx         # /result (Results Dashboard & starting level)
│   │   ├── path/page.tsx           # /path (Interactive Orbital Roadmap)
│   │   ├── lesson/[lessonId]/      # /lesson/:id (Interactive Moon Simulator & Quiz)
│   │   │   ├── page.tsx            # Server Component with generateStaticParams
│   │   │   └── LessonDetailClient.tsx
│   │   ├── check/[levelId]/        # /check/:id (Capstone Level Check)
│   │   │   ├── page.tsx            # Server Component with generateStaticParams
│   │   │   └── LevelCheckClient.tsx
│   │   ├── profile/page.tsx        # /profile (Student Profile Dashboard)
│   │   ├── tutor/page.tsx          # /tutor (AI Space Tutor Dashboard)
│   │   ├── globals.css             # Tailwind base & custom utilities
│   │   └── layout.tsx              # Root layout with fonts & AppContextProvider
│   ├── components/
│   │   ├── layout/                 # AppShell, Navbar, Footer
│   │   ├── ui/                     # PrimaryButton, SecondaryButton, ProgressBar, Badges, Modals
│   │   ├── space/                  # MoonSimulator, OrbitPath, SpaceDoodle
│   │   ├── learning/               # LessonVideo
│   │   └── tutor/                  # SpaceTutorPanel
│   ├── content/                    # Levels, Lessons, Placement & Check Quizzes, Locales
│   ├── context/                    # AppContext for state, XP, streak, locale
│   ├── data/
│   │   └── sampleState.ts          # Sample data for UI build only (Aarav, 320 XP, 7-day streak)
│   ├── styles/
│   │   └── tokens.css              # Authoritative CSS tokens from DESIGN.md
│   └── types/                      # TypeScript definitions (Lessons, UserState, Quiz)
├── DESIGN.md                       # Master visual & interaction specification
├── PRD.md                          # Product Requirements Document
├── tillnow.md                      # Continuous progress handoff & change log
└── package.json
```

---

### Status Tracker
- **Done:**
  - Audited all 10 reference images in `images/` and mapped to routes and states.
  - Formulated and documented `PRD.md` and initialized `tillnow.md`.
  - Next.js 16 App Router + TypeScript + Tailwind CSS scaffolding.
  - Phase B Foundation: `src/styles/tokens.css`, globals, reduced motion, AppShell, Navbar, Footer, KakshaLogo, LanguageToggle, PrimaryButton, SecondaryButton, ProgressBar, LevelBadge, XpChip, OrbitPath, SpaceDoodle.
  - Locale system with working `EN | हिंदी` toggle for navbars, footers, buttons, and Home headings.
  - Asset extraction: 19 cropped illustrations and `manifest.json` generated using Python PIL.
  - Phase C Home (`/`): Complete vertical scroll from hero to footer matching reference.
  - Phase D Main Journey:
    - `/test`: 12 questions with real answers, radio semantics, keyboard support, segmented progress, and dynamic placement scoring.
    - `/result`: Level 1 Explorer assignment, topic breakdown, "What this means", Path preview, and CTAs.
    - `/path`: Interactive connected orbital trail, completed/active/locked nodes, Up Next card, and Level 2 preview.
    - `/lesson/[lessonId]`: Interactive ink-drawn dual-panel SVG Moon simulator (mathematical phase disk, orbit view with Sun and Earth, Day slider, presets, "Watch a Month" cycle), LessonVideo, 3-question quiz, SpaceTutorPanel, and locked lesson screen for `/lesson/discover-planets`.
    - `/check/[levelId]`: 8 questions with scientific diagrams, countdown timer, clickable question navigator, and Level Up trigger.
    - `/profile`: Complete learner dashboard with Aarav's sample telemetry, streak calendar, topic bars, monthly learning stats, achievements, and activity feed.
    - `/tutor`: Dedicated AI Space Tutor dashboard powered by live Gemini 3.8 Flash (`/api/tutor`), word-by-word reveal, offline fallback badge, quick chips, and simulated error/retry handling.
  - Phase E States: `LessonCompleteModal` and `LevelUpModal` with focus trapping, Esc key dismissal, and reduced-motion compliance.
  - Phase G Verification: `npm run lint` passing with 0 errors and 0 warnings; `npm run build` passing with 20/20 static pages generated; Playwright smoke tests verifying all 8 routes and locked screen; phase captures at 1440px and 390px.
- **In progress:**
  - Demo ready.
- **Next steps:**
  - Optional: Plug in real database persistence (e.g. Supabase or SQLite) when multi-user accounts are introduced.
  - Optional: Add additional orbital simulations (e.g., gravity playground, solar system scale).

---

### Change Log
- **2026-11-01 (SVG Moon Simulator & Gemini AI Space Tutor):**
  - **Clean Ink-Drawn SVG Moon Simulator:** Rebuilt `MoonSimulator.tsx` using authentic dual-panel ink SVG:
    - *Left Panel (Orbit View):* Top-down celestial view (labelled "not to scale") with Sun on the left (`Sunlight →`), Earth at the centre with hand-drawn continents, and circular dashed orbit. The Moon orbits counterclockwise with the half facing the Sun always illuminated.
    - *Right Panel (View From Earth):* Large Moon disc showing exact mathematical phase ($t = (\text{day}/29.53) \times 360^\circ$, lit fraction = $(1 - \cos t)/2$, elliptical terminator $rx = R |\cos t|$ with northern hemisphere orientation and crater hatch markings).
    - *Controls & Readout:* Keyboard-accessible Day slider (0 to 29.5), 4 presets (`🌑 New Moon`, `🌓 First Qtr`, `🌕 Full Moon`, `🌗 Last Qtr`) with 600ms cubic ease-out, Play/Pause "Watch a Month" (~10s continuous cycle, auto-pause on hidden tab), and Reset button. Live `aria-live="polite"` status readout reporting phase name, lit percent, day number, and 1-sentence scientific explanation.
    - *Tabs & Art Cleanliness:* Replaced all raster art inside simulator with SVG. Added Explore, Learn (3 core concepts), and Key Facts tabs. Cleaned header illustration using textless crop `lesson_header_clean_astro.png` and live Caveat typography.
  - **Dynamic Lesson Routing & Locked Screen:**
    - Routed dynamic `lessonId` params across all Level 1 & 2 lessons.
    - Added clean locked state for `/lesson/discover-planets` with "← Back to My Path" link and previous lesson navigation.
  - **Gemini AI Space Tutor Integration:**
    - Server route `src/app/api/tutor/route.ts` using Gemini REST API (`gemini-3.8-flash` / `GEMINI_MODEL`) with 12s `AbortController` timeout, in-memory IP rate limiter (12 req/min), origin/host check, and child-safe system prompt.
    - Fallback knowledge base `src/lib/tutorFallback.ts` providing polite, scientifically accurate bilingual (EN/HI) answers when offline or if API key is unset.
    - Client integration `src/lib/tutorClient.ts`: `SpaceTutorPanel` and `/tutor` feature visible text input and Send buttons, typing indicators, word-by-word reveal (35-40ms), subtle "Offline answer" badge, and interactive suggested question chips.
  - **Automated Verification & Playwright Tests:**
    - `scripts/smoke.mjs`: All 8 routes (`/`, `/test`, `/result`, `/path`, `/lesson/meet-the-moon`, `/check/level-1`, `/profile`, `/tutor`) verified returning HTTP 200 with 0 console errors, plus locked lesson verification.
    - `scripts/test_tutor_phases.mjs`: Verified 3 tutor conditions (configured, Hindi fallback, empty/unexpected query) and captured 4 lunar phases at 1440px and 390px.
    - `scripts/verify_tutor_ui.mjs`: Verified UI chat interactions, input sending, and chip clicks.
    - `npm run lint`: 0 errors, 0 warnings.
    - `npm run build`: 20/20 static pages generated cleanly.
- **2026-11-01 (Hydration Warning Fix):**
  - Added `suppressHydrationWarning` to `<html>` and `<body>` in `src/app/layout.tsx` to prevent browser extensions (e.g. `cz-shortcut-listen`) from triggering Next.js dev overlay hydration warnings.
- **2026-11-01 (Clean Architecture & 3D Stage Overhaul):**
  - **Language Toggle Visibility:** Guaranteed `#FFFFFF` pure white text on `#171715` active capsule pill with explicit styles and shadow, fixing invisible EN/Hindi label bug.
  - **AI Space Tutor Redesign:** Eradicated walls of text and "AI slop" from the lesson dashboard; replaced with friendly bot greeting bubble, 3 targeted 1-click curiosity prompts, and crisp 2-sentence authoritative answers with "+5 XP" rewards.
  - **Photorealistic 3D Moon Stage:** Removed ugly horizontal range slider; implemented authentic 3D textured Moon (`moon_exact_clean.png`) and Earth (`earth_real_3d.png`), tactile milestone phase buttons (`🌑`, `🌓`, `🌕`, `🌗`), continuous orbit revolution, drag-to-revolve physics, dynamic terminator illumination, and interactive crater zoom explorer (Apollo 11, Tycho, Copernicus).
  - **Enterprise Codebase Architecture:** Modularized lesson dashboard into `LessonSidebar.tsx`, `LessonNavBar.tsx`, and `LessonQuiz.tsx`; established public API barrel index files across all component domains (`src/components/index.ts`, `ui`, `layout`, `motion`, `space`, `learning`, `tutor`, `context`, `content`, `data`).
  - **Verification:** 100% passing TypeScript (`tsc --noEmit`), 0 ESLint warnings, all 16 static routes prerendered cleanly, tested with headless browser screenshots.
- **2026-10-31 (Interactive Scroll, Button Visibility & Celestial Hover Fixes):**
  - Resolved transparent/invisible "Start test" button by locking explicit `#171715` ink background and `#F7F4ED` crisp text with hard shadows.
  - Implemented smooth in-page scrolling (`scrollIntoView({ behavior: 'smooth' })`) across all navbar and footer anchors (How it works, Levels, Explore, About).
  - Fixed pointer-events lock on route transitions: set overlay to `pointer-events-none` with 350ms watchdog auto-reset, ensuring links and buttons retain hand cursor and remain clickable on every click.
  - Added "Woah, something is there" interactive hover effect to astronaut hero photo: radiant amber celestial glow, popping star sparkles, subtle tilt elevation, and lively rotating hand card.
- **2026-10-31 (Item 5: Motion System & Orbit Wipe Route Transitions):**
  - Built Reveal, Stagger, CountUp, DrawPath, and StarBurst components; wired headline reveals, card staggers, and path drawing on Home; question 120px slide, snappy pop, and 1s orbital loader on Test; badge stamp-down, count-up stats, and starburst confetti on Result.
- **2026-10-31 (Item 4: Component Language v2 & Editorial System):**
  - Refined buttons and cards to ink-drawn editorial styling (1.5px ink border, 8px radius, 3px hard offset shadow, flat click press); recorded rules in DESIGN.md section 30; enabled TransitionLink across all nav and buttons.
- **2026-10-31 (Item 3: Layout Overflow Prevention, Wavy Dividers & Scaled Navbar):**
  - Integrated organic wavy lunar SVG dividers between paper and night sections on Home and Test routes; enforced `overflow-x-clip` across html, body, and AppShell removing blank strip and footer gaps; increased navbar height to 80px and brand wordmark scale to match reference.
- **2026-10-31 (Item 2: Tight Illustration Re-Crops & Organic Hero Blob):**
  - Re-cropped all assets removing baked-in label text ("NER", "ADET", "UT", "CIALIST") and handwriting; keyed backgrounds to transparent alpha; styled hero illustration to bleed organically from right edge with live Caveat hand text "Same Sky. Bigger Dreams."
- **2026-10-31 (Item 1: Dark-Text Contrast Scoping):**
  - Fully mapped all night sections in `src/app/page.tsx`, `test/page.tsx`, and `result/page.tsx` with `.theme-night` and explicit `--on-night`, `--on-night-soft`, and `--on-night-muted` tokens; all 21 contrast pairs verified passing WCAG AA (node scripts/contrast.mjs).
- **2026-10-31 (Phases B to G Complete):**
  - Resolved Next.js 16 prerender boundary requirements by separating Server Components (`page.tsx`) and Client Components (`LevelCheckClient`, `LessonDetailClient`) with `generateStaticParams`.
  - Fixed all ESLint 9 / React 19 warnings and errors; `npm run lint` passes cleanly.
  - Ran `npm run build` generating 16 static routes.
  - Started production server on port 3001 and verified all 8 core endpoints return HTTP 200.
  - Extracted 19 illustration assets into `public/assets/illustrations/` with metadata in `manifest.json`.
  - Implemented interactive Moon-phase simulator with real-time parametric orbit and phase shading.
- **2026-10-31 (Initial Setup & Audit):**
  - Audited images and created `PRD.md` and initial `tillnow.md`.

---

### Decisions Made
1. **Curriculum Alignment:** Levels 1-4 aligned with references: Level 1 Explorer (*Our Solar System*), Level 2 Cadet (*Gravity & Rockets*), Level 3 Astronaut (*Stars & Galaxies*), Level 4 Mission Specialist (*Space Careers*).
2. **Sample Data Isolation:** Aarav's preview values (320 XP, 7-day streak, 12 lessons) are encapsulated strictly in `src/data/sampleState.ts` with explicit UI disclaimer comments.
3. **No Dead Links:** Unrouted sidebar/nav elements (Notes, Settings, Achievements, etc.) show visible disabled "Soon" badges or link directly to corresponding sections.
4. **Deterministic AI Tutor:** AI Tutor operates via zero-API-key deterministic rule engine with simulated network latencies and recoverable error states.
5. **Port 3001 Server:** Started production server on port 3001 due to background process occupying port 3000.

### Known Issues
1. IDE browser tool was not declared in the tool environment; live visual browser screenshot verification was substituted by manual reference-matched styling, exact coordinate asset cropping, and HTTP route verification.
2. Levels 3 and 4 have curriculum summaries but their detailed sub-lessons are labelled "Coming soon" as planned for the hackathon MVP scope.
3. Video player displays high-fidelity "Video Coming Soon" placeholder card because local MP4 assets are not packaged with the repository.
4. Hindi translations currently cover all global chrome, navbars, footers, buttons, and Home headings; lesson deep body content currently defaults to English.
5. Port 3000 was busy on the host environment, so the app defaults to port 3001 when launched via `next start -p 3001`.
