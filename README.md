# Craft - Premium Frontend Showcase

A production-quality interactive frontend showcase demonstrating advanced React UI engineering, Framer Motion animation systems, shadcn/ui, and modern design patterns.

---

## Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite** - SPA, no SSR
- **Tailwind CSS v3** - dark mode only, CSS variable token system
- **Framer Motion v11** - centralized animation system
- **shadcn/ui** - Radix UI primitives with custom motion extensions
- **Recharts** - animated dashboard charts
- **lucide-react** - icon set

---

## Getting started

```bash
npm install
npm run dev
```

---

## Showcased capabilities

### 1. Hero section

- Word-by-word headline reveal with blur filter transitions
- Mouse-tracking radial gradient spotlight (spring physics via `useSpring`)
- Floating particle field with staggered idle animations
- Staggered entrance choreography using `heroContainer` / `heroItem` variants
- Animated status chip with pulse indicator
- Tech badge row with scroll-stagger

### 2. Feature Grid

- 8-card capability grid with scroll-reveal via `IntersectionObserver`
- `staggerChildren` reveal on scroll enter
- Per-card hover: lift (`y: -4`), border glow, icon micro-animation
- Gradient top border reveals on hover

### 3. Interactive Component Lab

- Sidebar nav with `layoutId` shared indicator transition
- `AnimatePresence mode="wait"` for panel transitions between demos
- 9 component demos: Buttons (with loading/success state machine), Badges, Switch/Slider, Progress, Dialog, Dropdown, Accordion, Toast queue, Tooltip
- Every component has hover/tap micro-interactions

### 4. Motion Showcase

- 8 labeled live demos of distinct Framer Motion techniques
- `layoutId` shared element transition
- `AnimatePresence` exit animations
- `staggerChildren` list reveal
- `drag` with elastic constraints
- `whileHover` / `whileTap` states
- Animated counters via `useMotionValue` + `useSpring` + `useTransform`
- Smooth height expand/collapse via `animate={{ height: "auto" }}`
- SVG `pathLength` draw-in animation

### 5. Dashboard Preview

- Collapsible animated sidebar (width transition via `animate`)
- Count-up metric cards using `useSpring` triggered by `useInView`
- Recharts `AreaChart` + `BarChart` with animated draw-in
- Sortable data table with `AnimatePresence mode="popLayout"` row reordering
- Activity feed with staggered entrance
- Skeleton loaders transitioning to live content

### 6. UX Pattern Showcase

- Multi-step onboarding with progress bar, step indicator dots, animated transitions
- Loading/error/success state machine with animated feedback
- Notification system with badge count-up, `AnimatePresence` dismiss, mark-all-read
- Progressive disclosure with animated height reveal
- Empty state with illustrated placeholder

### 7. Responsive Showcase

- Viewport switcher with `layoutId` indicator
- Scaled device previews showing layout adaptation at 375/768/1280px
- Documents responsive motion rules: reduced particles, shorter stagger, disabled mouse tracking on touch

### 8. Experimental - 3D Depth Tilt System

- CSS `perspective(800px)` + Framer Motion `rotateX`/`rotateY` on hover
- `useSpring` with damping:20, stiffness:200 for smooth physics
- Specular highlight (`radial-gradient`) tracks cursor position
- Layered `translateZ` content at different depths
- Idle "breathing" animation when mouse is away
- Zero WebGL - pure CSS transforms

### 9. Final CTA

- Animated border beam (gradient scan)
- Scroll-parallax grid via `useScroll` + `useTransform`
- Pulsing gradient orbs
- Spring-physics entrance choreography

---

## Architecture decisions

### Motion system (`src/lib/motion.ts`)

All animation variants centralized in one file. Components import and compose named variants - no inline ad-hoc motion definitions. Variants include entrance (`fadeUp`, `scaleIn`, `slideInLeft`), stagger containers (`staggerContainer`, `staggerContainerFast`), interactive (`hoverLift`, `hoverGlow`, `tapScale`), and presence variants for `AnimatePresence`.

Standard easing curve: `[0.16, 1, 0.3, 1]` (spring-like cubic bezier).
Standard duration: 0.4s entrances, 0.2s interactions, 0.6s complex sequences.

### Design tokens (`src/index.css`)

HSL CSS variables for all colors, matching the shadcn/ui convention. Custom properties for violet glow shadows, card shadows, and section gap. Utility classes: `.glass`, `.glass-strong`, `.text-gradient`, `.text-gradient-violet`, `.glow-violet`.

### Component architecture

- `SectionWrapper` - scroll reveal wrapper using `useInView` + animated variants
- shadcn/ui primitives in `src/components/ui/` - all extended with motion and dark-mode-first styling
- Showcase sections in `src/components/showcase/` - each under ~250 lines, self-contained
- Demo data in `src/lib/demo-data.ts` - no fake fetching, no mock backends
