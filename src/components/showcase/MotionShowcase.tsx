import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  LayoutGroup,
} from "framer-motion";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

function DemoBox({
  label,
  tag,
  children,
}: {
  label: string;
  tag: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">
          {tag}
        </span>
      </div>
      <div className="p-6 flex items-center justify-center min-h-32">
        {children}
      </div>
    </div>
  );
}

function SharedLayoutDemo() {
  const [selected, setSelected] = useState<string | null>("A");
  const tabs = ["A", "B", "C"];

  return (
    <LayoutGroup>
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelected(tab)}
            className={cn(
              "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selected === tab ? "text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {selected === tab && (
              <motion.div
                layoutId="shared-tab"
                className="absolute inset-0 bg-violet-600 rounded-lg"
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}

function AnimatePresenceDemo() {
  const [show, setShow] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            key="box"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          />
        )}
      </AnimatePresence>
      <button
        onClick={() => setShow((p) => !p)}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-white/8 rounded px-2 py-1"
      >
        {show ? "Exit" : "Enter"}
      </button>
    </div>
  );
}

function StaggerDemo() {
  const [key, setKey] = useState(0);
  const items = ["Design", "Build", "Ship", "Repeat"];

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.ul
        key={key}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="space-y-1.5"
      >
        {items.map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, x: -16 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
            }}
            className="flex items-center gap-2 text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            {item}
          </motion.li>
        ))}
      </motion.ul>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-white/8 rounded px-2 py-1"
      >
        Replay
      </button>
    </div>
  );
}

function DragDemo() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={constraintsRef}
      className="w-full h-full min-h-24 rounded-lg border border-dashed border-white/15 flex items-center justify-center relative overflow-hidden"
    >
      <span className="text-xs text-muted-foreground absolute top-2 right-2">
        drag me
      </span>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 cursor-grab shadow-[0_0_16px_rgba(139,92,246,0.4)] flex items-center justify-center"
      >
        <span className="text-white text-xs font-bold">drag</span>
      </motion.div>
    </div>
  );
}

function AnimatedCounter({ from, to, label }: { from: number; to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const spring = useSpring(count, { damping: 30, stiffness: 80 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString());

  if (isInView) count.set(to);

  return (
    <div ref={ref} className="text-center">
      <motion.span className="text-2xl font-bold text-gradient-violet">
        {rounded}
      </motion.span>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

function CounterDemo() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div key={key} className="flex gap-8">
        <AnimatedCounter from={0} to={12540} label="Users" />
        <AnimatedCounter from={0} to={98.7} label="Score" />
        <AnimatedCounter from={0} to={842} label="Deploys" />
      </div>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-white/8 rounded px-2 py-1"
      >
        Replay
      </button>
    </div>
  );
}

function HoverTapDemo() {
  return (
    <div className="flex gap-3">
      {[
        { label: "Hover", hover: { scale: 1.15, rotate: 5, y: -4 } },
        { label: "Tap", tap: { scale: 0.85 } },
        { label: "Both", hover: { scale: 1.1, y: -3 }, tap: { scale: 0.9 } },
      ].map(({ label, hover, tap }) => (
        <motion.div
          key={label}
          whileHover={hover}
          whileTap={tap}
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600/60 to-violet-800/60 border border-violet-500/30 flex items-center justify-center cursor-pointer select-none"
        >
          <span className="text-xs text-violet-200 font-medium">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ExpandCollapseDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => setOpen((p) => !p)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Expand / Collapse</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground"
        >
          ↓
        </motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="rounded-lg bg-white/5 border border-white/8 p-3 text-sm text-muted-foreground">
          Height animates from 0 to auto using Framer Motion. No fixed heights
          needed - works for any content size.
        </div>
      </motion.div>
    </div>
  );
}

function PathAnimation() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg key={key} width="80" height="80" viewBox="0 0 80 80">
        <motion.circle
          cx="40"
          cy="40"
          r="32"
          fill="none"
          stroke="rgba(139,92,246,0.2)"
          strokeWidth="4"
        />
        <motion.circle
          cx="40"
          cy="40"
          r="32"
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: "40px", originY: "40px" }}
        />
        <motion.text
          x="40"
          y="45"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          100%
        </motion.text>
      </svg>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-white/8 rounded px-2 py-1"
      >
        Replay
      </button>
    </div>
  );
}

const demos = [
  {
    label: "Shared Layout (layoutId)",
    tag: "layoutId",
    component: SharedLayoutDemo,
  },
  {
    label: "Animated Presence (exit)",
    tag: "AnimatePresence",
    component: AnimatePresenceDemo,
  },
  {
    label: "Stagger Children",
    tag: "staggerChildren",
    component: StaggerDemo,
  },
  {
    label: "Drag with Constraints",
    tag: "drag",
    component: DragDemo,
  },
  {
    label: "Hover / Tap States",
    tag: "whileHover/Tap",
    component: HoverTapDemo,
  },
  {
    label: "Animated Counters",
    tag: "useSpring",
    component: CounterDemo,
  },
  {
    label: "Smooth Expand/Collapse",
    tag: "layout",
    component: ExpandCollapseDemo,
  },
  {
    label: "SVG Path Animation",
    tag: "motion.path",
    component: PathAnimation,
  },
];

export function MotionShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="motion" className="section-gap px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground font-mono">
              MOTION SHOWCASE
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Framer Motion{" "}
            <span className="text-gradient-violet">patterns</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every technique labeled and interactive. Real implementations, not
            code screenshots.
          </motion.p>
        </motion.div>

        {/* Demo grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {demos.map((demo) => {
            const Component = demo.component;
            return (
              <motion.div key={demo.tag} variants={staggerItem}>
                <DemoBox label={demo.label} tag={demo.tag}>
                  <Component />
                </DemoBox>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
