# Craft - Premium Frontend Showcase: Design Spec

**Date:** 2026-05-10
**Status:** Approved

---

## Overview

"Craft" is a premium interactive frontend showcase built to demonstrate what elite React UI engineering looks like. It is not a product landing page - it is a technical demonstration of motion design, interaction systems, and component architecture running at production quality.

Single-page application. No backend. No fake API calls. Pure frontend excellence.

---

## Tech Stack

| Tool | Version/Notes |
|------|---------------|
| Vite | Latest, React SPA |
| React | 18+ |
| TypeScript | Strict mode |
| Tailwind CSS | v3, dark mode class strategy |
| Framer Motion | v11 |
| shadcn/ui | Latest, manually installed components |
| lucide-react | Icon set |
| Recharts | Dashboard charts |

---

## Architecture

### File Structure

```
src/
  components/
    showcase/
      Hero.tsx
      FeatureGrid.tsx
      ComponentLab.tsx
      MotionShowcase.tsx
      DashboardPreview.tsx
      UXPatterns.tsx
      ResponsiveShowcase.tsx
      ExperimentalSection.tsx
      FinalCTA.tsx
    ui/                      # shadcn/ui primitives
    layout/
      Nav.tsx
      SectionWrapper.tsx
  lib/
    motion.ts                # shared animation variants
    demo-data.ts             # fake dashboard/chart data
    utils.ts                 # cn() and helpers
  App.tsx
  main.tsx
  index.css
```

### Key Principles

- Every animation variant lives in `lib/motion.ts` - no inline ad-hoc variants
- `SectionWrapper` handles scroll reveal, section padding, and id anchors consistently
- shadcn components are base - each is extended with motion and custom styling
- No monolithic component files - cap at ~250 lines per file, split if larger
- TypeScript strict throughout - no `any`, proper prop types on every component

---

## Design System

### Colors

Dark mode first. CSS variables defined in `index.css`:

- **Background:** zinc-950 base, zinc-900 card surface
- **Border:** white/8 to white/12 (subtle glass edges)
- **Accent:** violet-500 primary, violet-400 hover
- **Text:** white primary, zinc-400 secondary, zinc-600 muted
- **Success:** emerald-500
- **Warning:** amber-500
- **Error:** red-500

### Typography

- **Display:** Inter or system-ui, 700-900 weight, tight tracking
- **Body:** 400-500 weight, relaxed leading
- **Mono:** JetBrains Mono or system-mono for code labels

### Spacing / Radius / Shadow

- Consistent 8px base grid
- Radius: sm(4px), md(8px), lg(12px), xl(16px), 2xl(24px)
- Shadows: layered - sm ambient + md focus glow (violet tint on interactive)

### Glassmorphism Rules

- Used sparingly: nav, modal overlays, card hovers only
- Max: `backdrop-blur-md bg-white/5 border border-white/10`
- Never stack glass inside glass

---

## Motion System (`lib/motion.ts`)

All variants exported from one file. Components import and compose them.

```ts
// Core variants
fadeUp          // entrance: y:20 -> 0, opacity:0 -> 1
fadeIn          // opacity only
scaleIn         // scale:0.95 -> 1 + opacity
slideInLeft     // x:-20 -> 0
slideInRight    // x:20 -> 0
staggerContainer // staggerChildren: 0.08
staggerItem     // used as child in stagger containers

// Interactive
hoverLift       // y:-2, shadow increase
hoverGlow       // box-shadow with violet tint
tapScale        // scale:0.97 on tap

// Page-level
sectionReveal   // used by SectionWrapper, triggered by scroll
```

Easing standard: `[0.16, 1, 0.3, 1]` (spring-like cubic bezier) for entrances.
Duration standard: 0.4s entrances, 0.2s interactions, 0.6s complex sequences.

---

## Navigation

Fixed top nav with:
- Logo "Craft" left
- Section links center (desktop), hamburger menu (mobile)
- Glassmorphism background on scroll
- Animated underline indicator for active section (Framer Motion layout animation)
- "View Source" CTA button right

Mobile: slide-down animated menu with AnimatePresence.

---

## Section 1: Hero

**Purpose:** First impression. Establishes visual identity and motion quality.

**Layout:**
- Full viewport height
- Centered content column, max-w-4xl
- Animated radial gradient background (mouse-reactive)
- Floating particle field (subtle, 20-30 dots, motion-driven)

**Content:**
- Status chip: animated pulse, "Frontend Showcase v1.0"
- Headline: "Craft" in large display type, word-by-word stagger reveal
- Subheadline: single line, fade-up after headline
- Two CTAs: "Explore the showcase" (primary) + "View source" (ghost)
- Tech stack badges row: animated entrance, hover glow

**Mouse tracking:**
- Radial gradient follows cursor with 60fps spring physics
- Subtle parallax on floating elements (2 layers, different speeds)

**Motion choreography (sequence):**
1. Status chip fade-in (0ms)
2. Headline words stagger (100ms delay each)
3. Subheadline fade-up (400ms after headline complete)
4. CTAs scale-in (200ms after sub)
5. Badge row stagger (100ms after CTAs)
6. Background animation starts immediately, continuous

---

## Section 2: Feature Grid

**Purpose:** Communicate what the showcase demonstrates through premium cards.

**Layout:** Responsive grid - 3 cols desktop, 2 tablet, 1 mobile.

**Cards (6-8 total):**
1. Shared Layout Animation
2. Scroll Reveal Systems
3. Accessible Motion Design
4. Command Palette System
5. Animated Dashboard UI
6. Interaction Feedback Systems
7. Responsive Architecture
8. Motion Performance

Each card:
- Icon (lucide, animated on hover)
- Title + short description
- Subtle gradient top border
- Hover: lift (y:-4), border glow, icon spin/bounce
- Stagger reveal on scroll enter

---

## Section 3: Interactive Component Lab

**Purpose:** Showcase polished shadcn components with micro-interactions.

**Layout:** Two-column - component list left, live preview right (desktop). Stack on mobile.

**Components demonstrated:**
- Buttons (variants: default, outline, ghost, destructive + loading state)
- Cards (default, interactive, glass variant)
- Dialog/Modal (animated open/close)
- Dropdown Menu (animated presence)
- Accordion (smooth expand)
- Tabs (layout animation indicator)
- Switch + Slider (tactile feedback)
- Badge variants
- Progress bar (animated fill)
- Tooltip (spring entrance)
- Toast notification (queue system)
- Command palette (fuzzy search, keyboard nav)

Every component:
- Custom motion enhancement on top of shadcn base
- Hover/tap feedback
- Demonstrates at least one state change
- Dark-polished, not "unstyled demo" appearance

---

## Section 4: Motion Showcase

**Purpose:** Explicit demonstration of Framer Motion capabilities, each labeled.

**Layout:** Grid of labeled demo boxes. Each box = one technique.

**Techniques demonstrated (each with label):**
1. `layoutId` shared element transition
2. `AnimatePresence` exit animations
3. `useScroll` + `useTransform` parallax
4. `staggerChildren` list reveal
5. `drag` with constraints + momentum
6. `whileHover` / `whileTap` states
7. Animated counter (`useSpring` + `useMotionValue`)
8. `sticky` motion section (scroll-pinned)
9. Smooth expand/collapse (`layout` prop)
10. `motion.path` SVG animation

---

## Section 5: Dashboard Preview

**Purpose:** Simulate a real premium admin interface.

**Layout:** Sidebar (fixed left, animated) + main content area.

**Sidebar:**
- Animated open/close (width transition)
- Nav items with active state (layout animation)
- User avatar + status

**Main content:**
- 4 metric cards (animated count-up on enter)
- Recharts area chart (revenue trend, animated draw-in)
- Recharts bar chart (activity breakdown)
- Activity feed (scroll, skeleton -> content transition)
- Data table (sortable columns, row hover, animated sort indicator)
- Loading skeleton states that transition to real content

**States demonstrated:** loading -> populated -> sort interaction -> filter.

---

## Section 6: UX Pattern Showcase

**Purpose:** Demonstrate polished UX systems beyond components.

**Patterns (each interactive):**
1. Multi-step onboarding flow (3 steps, animated progress, back/forward)
2. Loading states (skeleton, spinner, progress bar variants)
3. Empty states (illustrated, with CTA)
4. Success confirmation (animated checkmark, confetti-lite)
5. Error handling (shake animation, inline message)
6. Settings panel (animated drawer, toggle groups)
7. Notification system (badge count, dropdown list, mark-read)
8. Keyboard shortcut hints (badge overlays on hover)
9. Progressive disclosure (read more, advanced options reveal)

---

## Section 7: Responsive Showcase

**Purpose:** Prove responsive implementation, not just claim it.

**Approach:** Embedded iframe-style device frames showing the same content at:
- Mobile (375px)
- Tablet (768px)
- Desktop (1280px)

User can click to switch between frames. Animated transition between frames. Shows: nav, hero, cards, dashboard.

Also: animated resize demo - live CSS Grid reflow on slider drag.

---

## Section 8: Experimental Section

**Choice:** Depth-based 3D tilt card scene.

Mouse-reactive grid of cards with:
- CSS `perspective` + Framer Motion `rotateX`/`rotateY` on hover
- Each card has layered content at different z-depths (parallax layers)
- Specular highlight follows mouse (CSS radial gradient)
- Cards "breathe" with idle animation when mouse away
- Grid layout animated on scroll enter
- Label: "Depth System"

This is ambitious but stays performant - CSS transforms only, no WebGL.

---

## Section 9: Final CTA

**Purpose:** Memorable conclusion that reinforces brand quality.

**Content:**
- Large display headline with animated gradient text
- Subtext
- Two CTAs
- Animated border beam effect around section
- Motion-driven background: slow-moving gradient orbs
- Scroll-triggered entrance with spring physics

---

## Interaction Requirements Checklist

- [x] Shared layout animation (tabs indicator, modal, nav active)
- [x] Animated modal (Component Lab dialog)
- [x] Command palette (Component Lab)
- [x] Drag interaction (Motion Showcase)
- [x] Toast interaction (Component Lab)
- [x] Animated counters (Dashboard metric cards)
- [x] Hover/tap feedback (everywhere)
- [x] Skeleton loaders (Dashboard)
- [x] Responsive navigation (Nav hamburger menu)
- [x] Keyboard-friendly interactions (Command palette, tabs, accordion)
- [x] Interactive state switching (Component Lab tabs/switches)
- [x] Animated section transitions (SectionWrapper scroll reveal)

---

## Git Workflow

- Conventional Commits throughout
- Commit after each section completion
- No push, no pull
- Format: `feat(<scope>): <description>`

---

## README Deliverable

Final README covers:
- Showcased frontend capabilities
- Motion systems used
- Major UI/UX techniques demonstrated
- Architectural decisions

---

## Out of Scope

- Backend of any kind
- Authentication
- Real data fetching
- Deployment config (Vercel/Netlify)
- Unit tests (showcase project, not production app)
- Light mode (dark mode only per spec)
