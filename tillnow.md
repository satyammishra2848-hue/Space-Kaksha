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
    - `/lesson/[lessonId]`: Interactive Moon-phase simulator (rotation, phase calculation, presets, reset), LessonVideo component, 3-question mini-quiz, and SpaceTutorPanel.
    - `/check/[levelId]`: 8 questions with scientific diagrams, countdown timer, clickable question navigator, and Level Up trigger.
    - `/profile`: Complete learner dashboard with Aarav's sample telemetry, streak calendar, topic bars, monthly learning stats, achievements, and activity feed.
    - `/tutor`: Dedicated AI Space Tutor dashboard with deterministic `getTutorReply()`, quick chips, and simulated error/retry handling.
  - Phase E States: `LessonCompleteModal` and `LevelUpModal` with focus trapping, Esc key dismissal, and reduced-motion compliance.
  - Phase G Verification: `npm run lint` passing with 0 errors and 0 warnings; `npm run build` passing with 16/16 static pages generated; all routes verified over HTTP returning status 200 OK.
- **In progress:**
  - Demo readiness and documentation handoff.
- **Next steps:**
  - Optional: Plug in real database persistence (e.g. Supabase or SQLite) when user accounts are introduced.
  - Optional: Integrate live Gemini API streaming keys on the server for dynamic open-domain tutor conversations.
  - Optional: Add additional orbital simulations (e.g., gravity playground, solar system scale).

---

### Change Log
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
