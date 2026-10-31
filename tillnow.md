# Kaksha: The Space Academy — Project State

> ### HANDOFF
> New agent: read this file fully, then PRD.md and DESIGN.md, inspect /images, then continue from Next steps. Update this file at the end of every task.

---

### Project Summary
Kaksha ("Seekho orbit se") is an illustrated, editorial space academy web app for curious learners.
It pairs bite-sized space stories with hands-on interactive simulations, an adaptive placement test,
gamified orbital roadmaps, celebratory completion states, and an empathetic bilingual AI Space Tutor.
The visual identity fuses a warm paper canvas, crisp ink typography, and hand-drawn astronomy sketches.
The app is engineered with Next.js App Router, TypeScript, and Tailwind CSS.

### Stack
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Custom Properties (`src/styles/tokens.css`)
- **Typography:** `next/font/google` (Space Grotesk, Inter, Caveat) with system fallbacks
- **State Management:** React Context + LocalStorage persistence (minimal zero-dependency)

### How to Run
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Folder Map
```text
Space Kaksha/
├── images/                         # Authoritative visual reference screenshots
├── public/
│   └── assets/
│       ├── illustrations/          # Extracted visual illustrations & diagrams
│       └── manifest.json           # Asset registry
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # / (Home)
│   │   ├── test/page.tsx           # /test (Placement Test)
│   │   ├── result/page.tsx         # /result (Assessment Results)
│   │   ├── path/page.tsx           # /path (Learning Map)
│   │   ├── lesson/[lessonId]/      # /lesson/:id (Interactive Lesson & Simulator)
│   │   ├── check/[levelId]/        # /check/:id (Level Capstone Assessment)
│   │   ├── profile/page.tsx        # /profile (Student Profile Dashboard)
│   │   └── tutor/page.tsx          # /tutor (AI Space Tutor)
│   ├── components/
│   │   ├── layout/                 # AppShell, Navbar, Footer
│   │   ├── ui/                     # PrimaryButton, SecondaryButton, ProgressBar, Badges, Modals
│   │   ├── space/                  # MoonSimulator, OrbitPath, SpaceDoodle, PlanetCanvas
│   │   └── tutor/                  # SpaceTutorPanel, TutorMessage, QuestionChips
│   ├── content/                    # Typed lesson content, quizzes, and Hindi/English dictionaries
│   ├── context/                    # User progress and locale state providers
│   ├── data/
│   │   └── sampleState.ts          # Sample data for UI preview (Aarav, 320 XP, 7-day streak)
│   ├── lib/                        # Scoring engine, deterministic tutor logic, audio/helpers
│   ├── styles/
│   │   ├── tokens.css              # Design tokens from DESIGN.md
│   │   └── globals.css             # Tailwind base & utilities, reduced motion
│   └── types/                      # TypeScript definitions (Lessons, UserState, Quiz)
├── DESIGN.md                       # Master visual & interaction specification
├── PRD.md                          # Product Requirements Document
├── tillnow.md                      # Continuous progress handoff & change log
└── package.json
```

---

### Status Tracker
- **Done:**
  - Audited all 10 reference images in `images/` and matched to all routes and states.
  - Read `DESIGN.md` master specification completely.
  - Formulated architectural decisions and documented in `PRD.md`.
  - Created initial `tillnow.md` with handoff block.
- **In progress:**
  - Phase B: Next.js scaffolding in temp folder, assets extraction, design tokens, core shell components, and locale setup.
- **Next steps:**
  - Run scaffold in temp folder and move to root.
  - Crop required illustration assets from references using Python PIL.
  - Implement tokens, base components, and English/Hindi language toggle.
  - Build Homepage (Phase C).
  - Build Main Journey routes `/test`, `/result`, `/path`, `/lesson/[lessonId]`, `/check/[levelId]`, `/profile`, `/tutor` (Phase D & E).
  - Verification & polish (Phase G).

---

### Change Log
- **2026-10-31 (Initial Setup & Audit):**
  - Inspected all 10 visual references and created route mappings.
  - Drafted comprehensive `PRD.md` with system boundaries, data models, and acceptance criteria.
  - Created initial `tillnow.md` tracking document.

---

### Decisions Made
1. **Level Curriculum:** Level 1 Explorer (*Our Solar System*), Level 2 Cadet (*Gravity & Rockets*), Level 3 Astronaut (*Stars & Galaxies*), Level 4 Mission Specialist (*Space Careers*).
2. **Sample Data Separation:** Aarav's sample values (320 XP, 7-day streak, 12 lessons) are encapsulated in `src/data/sampleState.ts` with explicit "UI build only" markers.
3. **No Dead Links:** Unrouted navigation elements (Notes, Settings, Achievements, etc.) show visible disabled "Soon" badges or smooth scroll.
4. **Deterministic AI Tutor:** AI Tutor operates via zero-API-key deterministic rule engine with simulated network latencies and recoverable error states.

### Known Issues
- None yet (Clean slate).
