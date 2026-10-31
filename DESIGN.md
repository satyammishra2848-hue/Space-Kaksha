# KAKSHA: THE SPACE ACADEMY

## Master Design System & Implementation Contract

**Purpose:** This is the authoritative visual and interaction
specification for building Kaksha. Read this file and inspect every
reference image in `images/` before implementation. The image files are
the visual source of truth; this document explains the system that
connects them.

**Brand:** Kaksha --- The Space Academy\
**Tagline:** Seekho orbit se.\
**Core promise:** Space is for everyone. Learning it should be too.

------------------------------------------------------------------------

# 0. Non-negotiable instructions

Build a real, responsive, interactive website---not a screenshot pasted
into a page. Recreate the reference layouts with semantic HTML, CSS,
reusable components, and working interactions.

The intended visual language is **illustrated space editorial**: warm
paper, ink-black typography, carefully restrained accent colours,
expressive hand-drawn astronomy illustrations, curved orbital paths,
small annotations, bold modern headings, and plenty of breathing room.

The result must not look like: - a generic AI-generated landing page, -
a neon cyberpunk dashboard, - a corporate LMS template, - a childish
clip-art site, - a wall of cards with identical styling, - or a
full-page screenshot used as a fake implementation.

## Reference-first rule

1.  Enumerate all files inside `images/`.
2.  Open and inspect every image visually.
3.  Map each reference to the correct page/state based on visual
    content, not filename alone.
4.  Recreate the composition, visual hierarchy, spacing, illustration
    placement, colour balance, and text density.
5.  Use the actual image asset when it is a real illustration; rebuild
    UI when the image is a full-page design reference.
6.  Do not silently substitute a different visual direction.
7.  Do not change the Kaksha logo if a logo asset is present.
8.  Do not invent facts, impact statistics, testimonials, student
    counts, or scientific claims.

The supplied images may include these expected names, but filenames can
vary: - `Kaksha Space Academy Homepage.png` -
`Kaksha Space Academy Quiz Interface.png` -
`Kaksha Space Academy Results Dashboard.png` -
`Kaksha Space Learning Journey.png` -
`Kaksha Space Academy Level Check.png` -
`Kaksha Space Academy Profile Dashboard.png` -
`Kaksha Space Academy Lesson Complete.png` -
`Level Up to New Horizons ...png` -
`Kaksha AI Space Tutor Dashboard.png` -
`Kaksha Moon Mission Dashboard.png`

If the names differ, inspect the actual directory and map the images by
their visual content.

## Design decision hierarchy

When details conflict, use this order: 1. The reference image for that
exact page/state. 2. The shared design system in this document. 3.
Existing project conventions and reusable components. 4. The simplest
implementation decision that preserves the visual direction.

Do not ask the user to repeat details already represented in the
reference images. Do not begin by replacing the current project setup.
Audit it first.

------------------------------------------------------------------------

# 1. Product and audience

Kaksha is a guided space-learning academy. It helps students learn
astronomy and space concepts in a sensible order through short stories,
interactive simulations, quizzes, a contextual AI Space Tutor, and
visible progress.

The core journey is:

**Discover Kaksha → Take a placement test → Receive a starting level →
Follow My Path → Learn a concept → Experiment → Complete a mini quiz →
Earn XP → Pass a Level Check → Unlock the next level.**

The experience should make learners feel curious, capable, guided, and
excited to discover what comes next. It should never shame students for
not knowing something.

## Knowledge levels

Placement is based on demonstrated knowledge, not age alone. Age or
chosen explanation style may affect how the AI Tutor phrases an
explanation, but should not automatically determine the student's
knowledge level.

Suggested progression: - **Level 1 --- Beginner:** Earth and sky, the
Moon, planet basics. - **Level 2 --- Explorer:** gravity, day and night,
rocket basics. - **Level 3 --- Navigator:** stars, satellites, orbits,
Indian space missions. - **Level 4 --- Mission Specialist:** galaxies,
black holes, space physics, space careers.

Each level contains three lessons and one Level Check. The hackathon
build can fully polish Levels 1--2 and show Levels 3--4 as a clearly
labelled preview/coming soon if their lessons are not ready.

------------------------------------------------------------------------

# 2. Art direction

## The concept: "Illustrated Space Editorial"

Blend the feeling of: - a beautifully art-directed science journal, - a
hand-illustrated children's astronomy book, - a contemporary educational
product, - and a lightly gamified mission map.

The page should feel crafted and tactile, like ink illustrations on warm
paper, but behave like a polished modern web app.

## Visual priorities

1.  Clear focal point.
2.  Bold, readable type hierarchy.
3.  Large, well-composed illustrations.
4.  Whitespace that feels intentional.
5.  Restrained colour accents.
6.  Small hand-drawn details that enrich rather than clutter.
7.  Consistent controls and interaction states.
8.  Minimal text with maximum clarity.

Use visual storytelling instead of paragraphs whenever possible. If a
section looks text-heavy, reduce the copy or use an
illustration/diagram; do not shrink the font to force it to fit.

## Colour balance

The overall site should feel warm, mostly neutral, and editorial: -
about 65--75% paper/neutral surfaces, - about 15--25% ink/dark
content, - about 5--10% accent colours combined.

These proportions are visual guidance, not a literal constraint.

## Colour tokens

Use central CSS variables and adjust them only after comparing the
supplied references.

``` css
:root {
  --paper: #F7F4ED;
  --paper-warm: #F0EBE1;
  --surface: #FFFEFA;
  --surface-muted: #EDE8DE;

  --ink: #171715;
  --ink-soft: #35342F;
  --ink-muted: #6F6B63;
  --ink-faint: #9B968C;
  --line: #D9D2C6;
  --line-strong: #24231F;

  --orange: #F2A23A;
  --orange-soft: #F9D7A1;
  --yellow: #F3C95E;
  --lavender: #B8A2E8;
  --dusty-blue: #8DB8D7;
  --mint: #9BC8A9;
  --coral: #E58D7A;

  --success: #397A50;
  --success-soft: #DDEBDD;
  --warning: #A86A20;
  --error: #B44D43;

  --night: #171B25;
  --night-soft: #232936;
  --night-line: #454A55;

  --shadow-card: 0 8px 24px rgba(23,23,21,.06);
  --shadow-hover: 0 12px 28px rgba(23,23,21,.10);
  --shadow-popover: 0 16px 40px rgba(23,23,21,.14);

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-pill: 999px;
}
```

### Colour rules

-   Use warm paper, not pure white, as the default canvas.
-   Use near-black ink for primary text.
-   Orange is the main CTA/progress accent.
-   Yellow is for discovery, achievement, and small spark details.
-   Lavender can identify AI Tutor surfaces.
-   Mint/green can identify successful completion.
-   Dusty blue is an occasional science/planet accent.
-   Use colour for meaning, not to make every card different.
-   Avoid neon blue/purple glows, gradient-heavy backgrounds, and
    glassmorphism unless a specific supplied reference clearly requires
    them.
-   The dark/night palette is a deliberate local treatment, not the
    default background of every page.

------------------------------------------------------------------------

# 3. Typography

Use at most two primary families plus an optional decorative handwriting
face.

Suggested starting stack:

``` css
:root {
  --font-display: "Space Grotesk", "Arial Rounded MT Bold", system-ui, sans-serif;
  --font-body: "Inter", "Segoe UI", system-ui, sans-serif;
  --font-hand: "Caveat", "Comic Sans MS", cursive;
}
```

Use the display face for expressive headings and the body face for
navigation, controls, labels, paragraphs, and learning content. Use the
handwritten face only for tiny annotations or playful marginal
notes---not essential instructions or long copy. Provide local/system
fallbacks; the website must remain readable if external fonts fail.

## Hierarchy

``` css
:root {
  --text-xs: .75rem;
  --text-sm: .875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;
  --text-4xl: clamp(2.4rem, 5vw, 4.8rem);
}
```

Rules: - Use responsive type sizes. - Headlines should express one
strong idea. - Use intentional line breaks where they improve
composition. - Highlight only a short phrase with orange. - Avoid
all-caps body copy. - Never shrink text excessively to fit a card. - Do
not use handwritten text for essential information. - Maintain readable
line length and comfortable line-height.

## Copy density

-   Headline: one concise idea.
-   Supporting text: preferably one short sentence.
-   Feature card: title + one concise explanation.
-   Buttons: usually 1--4 words.
-   Quiz: one question at a time.
-   Path labels: short, scan-friendly names.

Copy is not a substitute for art direction. Empty space is allowed; fill
it with a thoughtful visual only when it improves the composition.

------------------------------------------------------------------------

# 4. Spacing, layout, and shapes

## Spacing tokens

``` css
:root {
  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
}
```

-   Use a shared spacing scale rather than arbitrary values.
-   Use larger spacing between major sections than between elements
    within a card.
-   Align repeated elements to a shared grid.
-   Main desktop content max-width should be approximately 1180--1280px.
-   Keep reading columns narrower than the full page container.
-   Use comfortable 18--24px mobile gutters.
-   Set `min-width: 0` on grid children where needed.
-   Do not let decorative art overlap text or controls.

## Corners and borders

The design is editorial, so not every element should be a giant rounded
card. Use thin ink/paper borders for editorial panels, moderate radii
for UI cards, and pill shapes for selected chips or compact actions.
Keep radius and border weight consistent.

## Asymmetry

Use controlled asymmetry in the hero and illustration-led sections. The
page should feel art-directed, not mechanically centred in every
section. Keep interactive controls and text alignment precise even when
illustrations are asymmetrical.

------------------------------------------------------------------------

# 5. Illustration system

## Approved visual vocabulary

-   hand-drawn astronaut line art,
-   planets with subtle hatch marks,
-   cratered moons,
-   Saturn-like rings,
-   rockets and satellite sketches,
-   orbit ellipses and dotted trajectories,
-   four-point stars and tiny sparkles,
-   hand-drawn arrows,
-   telescope and observatory sketches,
-   mountain/horizon linework,
-   constellation dots,
-   mission stamps and small badges,
-   short handwritten annotations.

## Illustration style

Illustrations should feel like one family: expressive ink outlines,
slightly imperfect hand-drawn strokes, restrained fills, and clean
silhouettes. The same illustration language should carry across the
homepage, lesson pages, path, rewards, and tutor.

Do not mix glossy 3D characters, flat clip art, random stock photos, and
hand-drawn ink art without a clear reference-driven reason. Avoid visual
clutter and overly detailed backgrounds behind text.

## Doodles

Doodles should be decorative supporting actors: - place them near
section edges, corners, or transitions, - keep them away from text
baselines and interactive controls, - use a small reusable library, -
keep opacity and stroke weight consistent, - never use a doodle as the
only indication of state or meaning.

## Curves and orbital lines

Use SVG paths, ellipses, dotted trajectories, and restrained CSS curves.
These can connect a sequence, frame a hero illustration, or lead the eye
through a learning map. They must not cross through essential text or
make node connections ambiguous.

## Motion

Use motion to clarify action or celebrate progress: a short orbit draw,
a node unlock, a badge pop, a progress fill, or a few stars on
completion. Avoid constant floating objects, excessive parallax, large
spinning planets behind content, and animations that shift layout.
Respect `prefers-reduced-motion`.

------------------------------------------------------------------------

# 6. Assets and reference images

Before coding: 1. Enumerate the `images/` directory. 2. Open each image
at a useful resolution. 3. Identify the target route/state and key
visual features. 4. Record dimensions/aspect ratio and whether the image
is a full-page reference or a standalone asset. 5. Create an asset
manifest with filename, purpose, dimensions, crop behaviour, and
alt-text treatment. 6. Identify missing standalone assets that need
SVG/CSS recreation.

Never use a full-page screenshot as the page itself. Rebuild it as
actual responsive UI with selectable text, working controls, semantic
structure, and real content. Use an image directly only when it is an
intended illustration/photographic asset.

For external images, check usage rights and attribution. Avoid fragile
hotlinks. Do not invent NASA/ISRO image credits or permissions. Keep
secrets out of client code. Prefer local SVG illustrations for small
decorative elements.

------------------------------------------------------------------------

# 7. Global application shell

## Navbar before the test

-   Kaksha logo/wordmark on the left.
-   A few useful anchors such as "How it works" and "Levels".
-   Language toggle (`EN | हिंदी`).
-   Primary "Start test" CTA.
-   Keep it compact and aligned with the page grid.

## Navbar after the test

-   Logo.
-   My Path.
-   Profile.
-   Language toggle.
-   Current level badge.
-   XP chip.

Do not cram every route into the navbar. Desktop navigation can be
horizontal; mobile navigation should be compact and accessible. The
primary action must remain discoverable.

## Footer

Keep the footer small and intentional: - Kaksha wordmark/tagline, - a
few useful links, - brief mission line if appropriate, -
copyright/project details only when real. Do not create a giant
corporate footer with numerous columns.

## Shared components

Build reusable components where they provide real consistency: -
`AppShell` - `Navbar` - `Footer` - `KakshaLogo` - `LanguageToggle` -
`LevelBadge` - `XpChip` - `PrimaryButton` - `SecondaryButton` -
`ProgressBar` - `SpaceDoodle` - `OrbitPath` - `EmptyState` -
`ErrorState` - `SpaceTutorLauncher` - `SpaceTutorPanel`

Do not create excessive abstractions just to follow a list. Fit the
existing codebase.

------------------------------------------------------------------------

# 8. Routes and core page map

Implement the following pages and states, adapting route syntax to the
existing framework:

  -----------------------------------------------------------------------
  Route                   Page/state              Core purpose
  ----------------------- ----------------------- -----------------------
  `/`                     Home                    Introduce Kaksha and
                                                  start the journey

  `/test`                 Placement Test          Estimate the learner's
                                                  starting level

  `/result`               Test Results            Show the result and
                                                  next step

  `/path`                 My Learning Path        Show the connected
                                                  learning map

  `/lesson/:lessonId`     Lesson Experience       Story, simulation, mini
                                                  quiz, tutor

  `/check/:levelId`       Level Check             Assess readiness to
                                                  advance

  `/profile`              Student Profile         XP, badges, streak,
                                                  progress

  modal/state             Lesson Complete         Reward completion and
                                                  show next action

  modal/state             Level Up                Celebrate a new level
                                                  unlock

  overlay or route        Space Tutor             Contextual, adaptive
                                                  explanations
  -----------------------------------------------------------------------

The completion and level-up experiences may be modals, full-screen
panels, or routes depending on the reference and current architecture.
Keep the transition coherent.

------------------------------------------------------------------------

# 9. Page 01 --- Home

The homepage is the one design intended to show the **complete vertical
scroll from navbar to footer**. Its tall reference ratio is not a rule
for every other page.

## Purpose

Explain the value of Kaksha in seconds and encourage the visitor to
begin the placement test.

## Sections

1.  **Navbar:** logo, a few anchors, language toggle, Start Test.
2.  **Hero:** bold headline, one short supporting line, primary CTA,
    optional secondary link, dominant astronaut/space illustration,
    restrained orbital doodles.
3.  **How it works:** three compact steps---Test → Explore → Level
    up---with numbers and small visuals.
4.  **Learning levels:** four consistent level cards or illustrations,
    each with a concise name and theme.
5.  **Path preview:** a small connected path with numbered nodes and a
    finish flag.
6.  **Benefits/features:** simulations, Space Tutor, Hindi/English,
    progress/rewards.
7.  **Final CTA:** one short invitation and Start Test.
8.  **Footer:** compact brand footer.

## Composition rules

-   Hero needs one obvious focal point.
-   Keep the first viewport clean.
-   Alternate text-led and illustration-led sections.
-   Do not cram all features into the hero.
-   Use generous whitespace and restrained doodles.
-   No fake stats, testimonials, partner logos, or unverified impact
    claims.
-   Buttons and anchor links must work.
-   Primary CTA routes to `/test`.
-   The path preview must not pretend that a new visitor has already
    completed lessons.

------------------------------------------------------------------------

# 10. Page 02 --- Placement Test

## Purpose

Make the student comfortable answering a short sequence of space
questions. It should feel like a mission, not a stressful examination.

## Required interface

-   compact Kaksha header,
-   back/cancel control if appropriate,
-   language choice,
-   optional display name/age group only if necessary,
-   one question at a time,
-   answer options,
-   progress indicator,
-   Next/Continue control,
-   clear selected-answer state,
-   completion state.

## Adaptive logic

For the demo, use a short 12--16 question sequence, roughly four
questions per tier. Advance when the learner meets the configured
threshold; stop advancing when they struggle at a tier and assign a
suitable starting level. Keep the thresholds and question bank in
data/config, not scattered through UI code.

The interface should not falsely claim the test is scientifically
validated. Describe its result as a recommended starting level.

## UI states

-   default option,
-   hover,
-   selected,
-   disabled Next,
-   correct/incorrect feedback if used,
-   completion,
-   recoverable error if relevant.

Answers must work with keyboard and touch. Use semantic radio
inputs/buttons, visible focus, and accessible progress labels.

------------------------------------------------------------------------

# 11. Page 03 --- Test Results

## Purpose

Turn the assessment into a positive starting point and make the next
action obvious.

## Structure

-   celebratory but restrained visual,
-   assigned starting level,
-   one supportive sentence,
-   compact topic performance summary,
-   one or two suggested next steps,
-   primary "Start my path" action,
-   secondary retake option.

Use a badge, small planet, flag, or astronaut illustration. Avoid fake
precision, unsupported comparisons, and giant meaningless percentage
scores. Never describe a student as weak or a failure.

If the route is opened without a real result, show a helpful empty state
linking to the test rather than fabricating a score.

------------------------------------------------------------------------

# 12. Page 04 --- My Learning Path

This is the emotional and functional centre of Kaksha. The path should
feel like a playful illustrated mission map, not a list of ordinary
cards.

## Required elements

-   greeting,
-   current level badge,
-   XP,
-   progress indicator,
-   connected numbered nodes,
-   completed lessons,
-   currently available lesson,
-   locked future lessons,
-   finish flag / Level Check destination,
-   clear Continue Learning action,
-   access to profile and tutor.

Each level has three lessons plus one Level Check.

## Node states

**Completed:** checkmark/badge, explicit completed status, review action
if supported.\
**Current/unlocked:** strongest emphasis, concise label, opens lesson.\
**Locked:** lower emphasis but readable, lock icon and clear status; no
deceptive interaction.\
**Level Check:** distinctive finish flag, connected to path, unlocked
only when prerequisites are complete.

Use one coherent path line. Nodes must sit on or clearly connect to it.
On desktop, allow a spacious map; on mobile, transform it into a
vertical trail while preserving sequence. Never squeeze the whole map
into a tiny card.

Progress must derive from actual lesson completion and passed checks,
not from simply opening a page.

------------------------------------------------------------------------

# 13. Page 05 --- Lesson Experience

## Purpose

Teach one idea through a compact sequence: story, interactive
exploration, mini quiz, and access to the Space Tutor.

## Structure

1.  Back to My Path / breadcrumb.
2.  Lesson title and short objective.
3.  Short story/explanation.
4.  Main illustration or interactive simulation.
5.  One clear interaction prompt.
6.  Three or four mini-quiz questions.
7.  Completion action.
8.  Space Tutor entry point.
9.  Next lesson preview or locked-state explanation.

Do not put everything in one long text column. Use a balanced
composition. On desktop, lesson copy and simulation may sit side by
side; on mobile, stack them in a natural reading order.

## Simulation requirements

A simulation must actually respond to user input. Good examples: - Moon
phase explorer, - planet-size comparison, - gravity playground, - orbit
exploration, - rocket launch sequence.

Every simulation needs: - a clear prompt, - an obvious control, -
immediate visual feedback, - a reset action, - keyboard/touch support
where possible, - a concise explanation of what is being observed.

If scope is limited, build one small functional simulation rather than a
static mock labelled "interactive".

## Mini quiz

-   3--4 questions.
-   Clear answer selection and feedback.
-   Friendly retry.
-   Completion threshold defined in data.
-   Results stored in progress state.

------------------------------------------------------------------------

# 14. Page 06 --- Level Check

## Purpose

A short final mission that verifies whether the student is ready to
advance.

## Structure

-   level name and mission title,
-   concise briefing,
-   question/progress indicator,
-   question prompt,
-   answer options,
-   Submit/Continue,
-   pass or retry result.

## Pass state

Celebrate without overwhelming the interface. Show the completed level,
award XP once, unlock the next level, and provide one obvious CTA.

## Retry state

Offer an encouraging message, concepts to revisit, "Review lessons", and
"Try again". Do not shame the learner or erase earned progress.

## Integrity

Opening the page must not automatically pass the student. A level check
unlocks the next level only after the configured pass condition is met.
Avoid duplicate rewards on refresh.

------------------------------------------------------------------------

# 15. Page 07 --- Student Profile

## Purpose

Give the student a friendly overview of effort and achievements.

## Content

-   display name or friendly default,
-   current level,
-   XP,
-   streak only if actually tracked,
-   earned badges,
-   completed lessons,
-   overall progress,
-   recent activity if available,
-   clear route back to My Path.

Keep the profile encouraging, not competitive. Use small illustrated
badges and clearly labelled progress bars. Do not show metrics that are
not tracked. If there is no progress yet, show an intentional empty
state instead of fake data.

------------------------------------------------------------------------

# 16. State 08 --- Lesson Complete

Show this only after the lesson completion condition is met.

Include: - one strong celebratory illustration, - restrained
stars/confetti, - "Lesson complete" heading, - XP earned, - badge only
if genuinely earned, - next lesson action, - secondary Back to Path
action.

Persist completion and award XP once. The page should make the next step
obvious; do not flood the screen with confetti or competing CTAs.
Respect reduced motion.

------------------------------------------------------------------------

# 17. State 09 --- Level Up

Show this only after the Level Check is passed.

Include: - prominent new-level badge, - rocket/orbit/planet/flag
illustration, - short congratulatory headline, - next level name, -
primary Continue action, - secondary Back to Path action.

Use more celebratory accent colour than on normal pages, while retaining
Kaksha's paper, ink, illustration, and typography system. Persist the
unlock and prevent repeated XP awards on refresh.

------------------------------------------------------------------------

# 18. State 10 --- AI Space Tutor

## Purpose

Offer a contextual, friendly explanation in the learner's preferred
language and explanation style.

## Interface

-   compact conversation layout,
-   clear tutor identity,
-   distinct user/tutor message styles,
-   suggested questions,
-   language toggle,
-   input composer and send button,
-   loading state,
-   error/retry state,
-   close/back action if opened as an overlay.

Do not make it look like generic enterprise support chat. It should feel
like a knowledgeable space mentor.

## Adaptive example

Question: "Why is the sky black in space?"

For a younger learner, use simple words and a familiar analogy. For an
older learner, explain that space lacks a dense atmosphere to scatter
sunlight as Earth's atmosphere does. Stars and the Sun still emit light,
but light does not fill the sky in the same way. Do not claim that space
contains absolutely no matter.

## Reliability and safety

-   Keep AI keys on the server.
-   Do not break the lesson if the tutor request fails.
-   Offer retry and a clear fallback.
-   Use reviewed/deterministic fallback content for a hackathon demo
    where possible.
-   Avoid unnecessary external API calls across the rest of the site.
-   Use age-appropriate language and collect minimal personal data.
-   Do not present uncertain or invented scientific claims as facts.

------------------------------------------------------------------------

# 19. Content model and language

Store lessons and questions in structured data, not long UI
conditionals.

Conceptual lesson type:

``` ts
type Lesson = {
  id: string;
  levelId: string;
  order: number;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  content: {
    en: LessonLocale;
    hi: LessonLocale;
  };
  simulation?: {
    type: "moon-phases" | "planet-scale" | "gravity" | "rocket-launch";
    config?: Record<string, unknown>;
  };
  quiz: QuizQuestion[];
  xpReward: number;
};
```

Adapt the exact schema to the project. Keep content typed, testable, and
easy to review.

## Language

English and Hindi are first-class languages. Use a central
dictionary/locale structure. The toggle should read `EN | हिंदी` or
another clear equivalent and show the active state. Use natural Hindi,
not awkward literal translation. Test wrapping and spacing in both
languages. The browser's Hindi speech voice varies by device, so
narration must be treated as an enhancement rather than a guaranteed
capability.

## Science accuracy

-   Review lessons before shipping.
-   Keep simplified analogies scientifically honest.
-   Verify ISRO mission names, facts, and dates.
-   Check licensing and attribution for external imagery.
-   Do not invent statistics, testimonials, learning outcomes, or impact
    claims.
-   Do not claim the placement test is a validated educational
    diagnostic.

------------------------------------------------------------------------

# 20. Interaction system

## Buttons

**Primary:** high contrast, orange or ink surface according to
reference, clear label.\
**Secondary:** paper/transparent surface with understated border.\
**Tertiary:** text/icon action for low-priority tasks.

Every page should have one obvious primary action. Do not style every
button as primary.

## Interaction states

Implement hover, focus, pressed, selected, disabled, loading, success,
and error states where relevant. Hover transitions should be subtle and
quick, generally 120--260ms. Do not rely on hover on touch devices.

## Empty states

Create deliberate empty states for: - no test result, - no lessons
completed, - no badges, - no tutor messages, - no recent activity.

Each empty state should provide a next action and a small visual cue,
not a blank card.

## Error states

Use plain language and an actionable retry/back action. Never show raw
stack traces or secrets to the learner.

## Motion

Use animation to explain progress or reward action---not as constant
decoration. Avoid layout shifts and endless floating objects. Honour:

``` css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
}
```

------------------------------------------------------------------------

# 21. Responsive design

The reference images are visual targets, not permission to ship
desktop-only pages.

Test at: - 360px, - 390px, - 768px, - 1024px, - 1440px.

## Desktop

-   Preserve intended multi-column compositions.
-   Give the hero illustration room.
-   Let the learning path use horizontal space.
-   Use side-by-side lesson/simulation layouts where appropriate.

## Tablet

-   Reduce illustration scale before shrinking type.
-   Convert three columns to two where needed.
-   Keep controls touch-friendly.
-   Prevent cramped navigation.

## Mobile

-   Stack content in a natural reading order.
-   Keep the primary CTA obvious.
-   Use full-width answer options when useful.
-   Turn the path into a vertical trail.
-   Make the tutor panel fit the viewport.
-   Prevent decorative art from covering controls.
-   Do not shrink a desktop layout into a tiny version.
-   Avoid horizontal scrolling.
-   Prefer touch targets around 44×44 CSS pixels or larger.

------------------------------------------------------------------------

# 22. Accessibility

-   Use semantic landmarks and logical heading order.
-   Make all controls keyboard-operable.
-   Show visible focus.
-   Label every form field.
-   Use descriptive alt text for meaningful imagery and empty alt for
    decorative art.
-   Maintain readable contrast.
-   Do not communicate state through colour alone.
-   Respect reduced motion.
-   Announce quiz feedback and major state changes to assistive
    technology.
-   Manage focus correctly in dialogs and tutor overlays.
-   Keep close controls discoverable.
-   Update document language when switching languages where practical.

Accessibility is part of the implementation, not a last-minute optional
task.

------------------------------------------------------------------------

# 23. Engineering rules

First inspect the existing project. Preserve its framework, package
manager, scripts, and conventions unless a real issue requires a change.

-   Build reusable components where they genuinely help.
-   Separate content from UI.
-   Separate quiz scoring from question presentation.
-   Separate progress logic from path rendering.
-   Centralise design tokens.
-   Keep global state understandable.
-   Avoid unnecessary dependencies.
-   Do not rewrite a working project from scratch just to match a
    preferred architecture.
-   Do not delete or overwrite existing files without checking their
    role.
-   Do not expose API keys in browser code.
-   Use stable IDs for lessons, questions, badges, and progress.
-   Make progression deterministic and testable.
-   Handle malformed or missing local progress safely.
-   If using local storage for a demo, do not store secrets or
    unnecessary personal information.
-   Add a reset/demo mechanism only if useful and keep it separate from
    normal learner behaviour.

## Demo reliability

The main journey should not depend on external APIs. Prebuild lesson
content and quizzes. Keep simulations local. The placement test must
work offline once the app is loaded. The tutor can call a configured AI
provider, but must have loading/error handling and a deterministic
fallback. Avoid fragile external image URLs.

------------------------------------------------------------------------

# 24. Suggested project structure

Respect the existing structure if one exists. For an empty project, a
possible shape is:

``` text
Space Kaksha/
├── images/                 # Approved visual references
├── public/assets/           # Optimised assets used by the app
├── src/
│   ├── app/ or pages/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── space/
│   │   ├── learning/
│   │   └── tutor/
│   ├── content/
│   │   ├── lessons/
│   │   ├── questions/
│   │   └── locales/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css
│   └── types/
├── DESIGN.md
├── README.md
└── package.json
```

This is guidance, not permission to reorganise a working repository
unnecessarily.

------------------------------------------------------------------------

# 25. Quality assurance checklist

## Visual

-   [ ] Correct reference image inspected for this page.
-   [ ] Section order and overall composition match the reference.
-   [ ] Main illustration/focal point is present and correctly scaled.
-   [ ] Warm paper/ink palette remains dominant where expected.
-   [ ] Accent colours are restrained.
-   [ ] Type hierarchy and line breaks feel intentional.
-   [ ] Text density is low and easy to scan.
-   [ ] Doodles and orbit curves are consistent and purposeful.
-   [ ] Whitespace is balanced.
-   [ ] No generic AI-template appearance.
-   [ ] No random neon gradients or unnecessary glass effects.
-   [ ] No overlapping text or controls.
-   [ ] No fake metrics or placeholder copy.

## Functionality

-   [ ] All buttons do what their labels promise.
-   [ ] Routes and navigation work.
-   [ ] Quiz answers can be selected and recorded.
-   [ ] Test result is calculated from actual answers.
-   [ ] Progress indicators reflect real state.
-   [ ] Locked lessons remain locked.
-   [ ] Lesson completion is stored once.
-   [ ] Level checks pass/fail based on answers.
-   [ ] XP and unlocks cannot be farmed by refresh.
-   [ ] Profile reflects actual progress.
-   [ ] Tutor loading/error/fallback states work.
-   [ ] Language toggle changes supported copy.
-   [ ] Empty states exist.

## Responsive and accessible

-   [ ] No horizontal overflow at 360px.
-   [ ] No clipped labels or controls.
-   [ ] Path remains understandable on mobile.
-   [ ] Tutor panel fits the viewport.
-   [ ] Keyboard navigation works.
-   [ ] Focus is visible.
-   [ ] Inputs have labels.
-   [ ] Contrast is sufficient.
-   [ ] Reduced motion is respected.
-   [ ] Meaningful images have suitable alt text.

------------------------------------------------------------------------

# 26. Agent workflow

Do not try to implement everything in one unverified pass.

## Phase A --- Audit

1.  Inspect repository structure and package scripts.
2.  Identify framework and existing routes.
3.  Inspect every image in `images/`.
4.  Map images to pages/states.
5.  Identify logo, illustration, font, and other assets.
6.  Preserve existing working code.

## Phase B --- Design foundation

1.  Implement central design tokens.
2.  Build the page container and typography.
3.  Build navbar, footer, buttons, badges, progress, and illustration
    helpers.
4.  Compare a representative section to the reference.
5.  Correct the visual foundation before creating every page.

## Phase C --- Homepage

1.  Build the complete scrollable homepage.
2.  Compare section order, hero proportions, type, illustration, and
    whitespace.
3.  Verify desktop and mobile.
4.  Iterate until the main composition is credible.

## Phase D --- Main journey

Implement and connect: 1. Placement Test. 2. Test Results. 3. My
Learning Path. 4. Lesson Experience. 5. Level Check. 6. Student Profile.

## Phase E --- Additional states

Implement Lesson Complete, Level Up, and Space Tutor using the same
system.

## Phase F --- Data and behaviour

Implement question bank, adaptive scoring, level assignment, lesson
completion, unlock rules, XP, badges, persistence, locales, and tutor
fallback.

## Phase G --- Verification

Run the project's available lint, type-check, and build commands. Visit
every route. Complete a test, finish a lesson, pass a level check,
refresh the app, test both languages, and test the tutor's failure path.

------------------------------------------------------------------------

# 27. Reference comparison protocol

For every page: 1. Open its reference image. 2. Open the implemented
page at a matching viewport. 3. Compare overall composition first. 4.
Compare section order and content density. 5. Compare main illustration
and crop. 6. Compare typography and line breaks. 7. Compare spacing and
alignment. 8. Compare card shape, size, and density. 9. Compare colour
balance. 10. Compare doodles and curves. 11. Test interactive states
separately. 12. Fix the three largest visible mismatches and repeat.

Prioritise: 1. wrong layout or section order, 2. missing/wrong focal
illustration, 3. wrong proportions, 4. excessive text, 5.
spacing/typography, 6. colour, 7. small icons/borders/animation.

Do not polish tiny stars while the page structure is still wrong.

------------------------------------------------------------------------

# 28. Acceptance criteria

The implementation is complete only when: 1. All seven core pages exist
and navigate correctly. 2. Lesson Complete, Level Up, and Space Tutor
states exist. 3. All pages share one coherent Kaksha design language. 4.
The homepage is a complete scrolling page, not a static screenshot. 5.
The placement test records answers and assigns a starting level. 6.
Results reflect the test. 7. The learning path shows correct
completed/unlocked/locked states. 8. Lessons contain real reviewed
content and working interactions. 9. Mini quizzes provide feedback and
record completion. 10. Level Checks can pass or fail based on answers.
11. XP and unlocks are not awarded repeatedly on refresh. 12. Profile
reflects actual stored progress. 13. Language support works for the
implemented content. 14. Tutor errors are handled without breaking the
rest of the product. 15. No important button is dead. 16. Keyboard
navigation is usable. 17. Mobile layouts work without horizontal
overflow. 18. No fake data is presented as verified impact or real
activity. 19. The available build/type-check passes. 20. Every page has
been compared to its reference image. 21. The product still feels warm,
editorial, illustrated, curious, calm, and unmistakably Kaksha.

------------------------------------------------------------------------

# 29. Final directive

When asked to build Kaksha, **inspect the repository and the actual
reference images first, then implement the real website, connect its
interactions, test it, and iterate on visual fidelity**.

Do not merely produce a plan. Do not replace the design with personal
preference. Do not add effects because they are trendy. Do not increase
text density to fill space. Do not use a full-page screenshot as the
implementation. Do not invent missing assets or facts before checking
the project.

When uncertain: 1. inspect the relevant reference again, 2. inspect
existing code and assets, 3. reuse the closest established Kaksha
pattern, 4. choose the simplest accessible implementation that preserves
the design, 5. document meaningful deviations.

**Kaksha --- Seekho orbit se.**

------------------------------------------------------------------------

# 30. Component language v2

Refined editorial, ink-drawn design system replacing generic template cards:

1. **Cards**:
   - Ink border: 1.5px solid `--ink` (`#171715`).
   - Radii: small radius between 6px and 10px (never above 12px; default 8px `--radius-card`).
   - Fill: Flat `--surface` (`#FFFEFA`) or contextual tints (`--paper-warm`, `--mint-tint`).
   - Hard offset shadow: `3px 3px 0 var(--ink)` (`--shadow-editorial`) that expands to `5px 5px 0 var(--ink)` on hover.
   - Vary card shapes and fills by role; never use identical cards everywhere.
   - Night cards use `--night-soft` with `1.5px solid var(--night-line)` and `3px 3px 0 var(--night-line)`.

2. **Buttons**:
   - Primary: Ink-filled (`--ink`) or Orange-filled (`--orange-bg`).
   - Border: 2px solid `--ink`.
   - Hard offset shadow: `3px 3px 0 var(--ink)`.
   - Interaction: Presses flat on click (`translate(2px, 2px)` with `1px 1px 0 var(--ink)` shadow).
   - Radius: 8px (`--radius-btn`). Pills reserved exclusively for chips and the language toggle.

3. **Display Typography & Layout**:
   - Large, tight display headings: `clamp(2.6rem, 5vw, 4.8rem)`, line-height 0.95, letter-spacing -0.02em, `text-wrap: balance`.
   - Body copy: at least 17px with comfortable 1.6 line height.
   - Accent color: Orange reserved for a single short emphasized phrase or tactical marker.
   - 8px spacing rhythm applied consistently across grids and components.

4. **Illustrations as Focal Points**:
   - Hero artwork bleeds organically from the page contour inside an ink contour rather than a generic rounded box.
   - Organic wavy SVG dividers (`WavyDivider`) separate paper and night sections.
   - Live handwritten annotations in Caveat (`font-hand`).
