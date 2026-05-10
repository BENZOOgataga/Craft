import type { Variants, Transition } from "framer-motion";

// Standard easing curves
export const ease = {
  spring: [0.16, 1, 0.3, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  snappy: [0.2, 0, 0, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
} as const;

// Standard durations
export const duration = {
  instant: 0.15,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 0.9,
} as const;

// Base transitions
export const transitions: Record<string, Transition> = {
  spring: { duration: duration.normal, ease: ease.spring },
  smooth: { duration: duration.normal, ease: ease.smooth },
  fast: { duration: duration.fast, ease: ease.smooth },
  slow: { duration: duration.slow, ease: ease.spring },
  bounce: { duration: duration.normal, ease: ease.bounce },
};

// --- Entrance variants ---

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.spring },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.spring },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: ease.smooth },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: ease.spring },
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: ease.bounce },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: ease.spring },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.normal, ease: ease.spring },
  },
};

// --- Stagger containers ---

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

// stagger item - compose with any entrance variant
export const staggerItem: Variants = fadeUp;

// --- Interactive variants ---

export const hoverLift = {
  y: -4,
  transition: transitions.fast,
};

export const hoverScale = {
  scale: 1.03,
  transition: transitions.fast,
};

export const tapScale = {
  scale: 0.97,
  transition: { duration: duration.instant, ease: ease.smooth },
};

export const hoverGlow = {
  boxShadow: "0 0 20px rgba(139, 92, 246, 0.3), 0 4px 24px rgba(0,0,0,0.5)",
};

// --- Presence variants (for AnimatePresence) ---

export const presenceScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.fast, ease: ease.spring },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: duration.fast, ease: ease.smooth },
  },
};

export const presenceFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

export const presenceSlideDown: Variants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: duration.fast, ease: ease.spring },
  },
  exit: {
    opacity: 0,
    y: -8,
    scaleY: 0.95,
    transition: { duration: duration.fast, ease: ease.smooth },
  },
};

export const presenceSlideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.normal, ease: ease.spring },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: duration.fast, ease: ease.smooth },
  },
};

// --- Section reveal (triggered by scroll via useInView) ---

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.spring },
  },
};

// --- Hero-specific choreography ---

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.spring },
  },
};

// --- Shake (for error states) ---

export const shake: Variants = {
  hidden: { x: 0 },
  visible: {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
