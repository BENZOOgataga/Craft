import { useRef, useState, useCallback } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Architecture",
    subtitle: "System Design",
    tag: "Infrastructure",
    gradient: "from-violet-600/60 to-indigo-800/60",
    border: "border-violet-500/30",
    glow: "rgba(139,92,246,0.3)",
    lines: [
      { w: "75%", opacity: 0.6 },
      { w: "55%", opacity: 0.4 },
      { w: "85%", opacity: 0.3 },
    ],
  },
  {
    title: "Performance",
    subtitle: "60fps Rendering",
    tag: "GPU-Accelerated",
    gradient: "from-sky-600/60 to-blue-800/60",
    border: "border-sky-500/30",
    glow: "rgba(56,189,248,0.25)",
    lines: [
      { w: "90%", opacity: 0.6 },
      { w: "65%", opacity: 0.4 },
      { w: "45%", opacity: 0.3 },
    ],
  },
  {
    title: "Animation",
    subtitle: "Spring Physics",
    tag: "Framer Motion",
    gradient: "from-emerald-600/60 to-teal-800/60",
    border: "border-emerald-500/30",
    glow: "rgba(52,211,153,0.25)",
    lines: [
      { w: "60%", opacity: 0.6 },
      { w: "80%", opacity: 0.4 },
      { w: "50%", opacity: 0.3 },
    ],
  },
  {
    title: "Interaction",
    subtitle: "Tactile Design",
    tag: "Micro-UX",
    gradient: "from-pink-600/60 to-rose-800/60",
    border: "border-pink-500/30",
    glow: "rgba(236,72,153,0.25)",
    lines: [
      { w: "70%", opacity: 0.6 },
      { w: "90%", opacity: 0.4 },
      { w: "55%", opacity: 0.3 },
    ],
  },
  {
    title: "Composition",
    subtitle: "Layout Systems",
    tag: "Grid + Flex",
    gradient: "from-amber-600/60 to-orange-800/60",
    border: "border-amber-500/30",
    glow: "rgba(251,191,36,0.25)",
    lines: [
      { w: "80%", opacity: 0.6 },
      { w: "50%", opacity: 0.4 },
      { w: "70%", opacity: 0.3 },
    ],
  },
  {
    title: "Accessibility",
    subtitle: "Inclusive Design",
    tag: "WCAG 2.1 AA",
    gradient: "from-cyan-600/60 to-sky-800/60",
    border: "border-cyan-500/30",
    glow: "rgba(34,211,238,0.25)",
    lines: [
      { w: "65%", opacity: 0.6 },
      { w: "85%", opacity: 0.4 },
      { w: "45%", opacity: 0.3 },
    ],
  },
];

function TiltCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawRotateX = useSpring(0, { damping: 20, stiffness: 200 });
  const rawRotateY = useSpring(0, { damping: 20, stiffness: 200 });
  const rawGlowX = useSpring(50, { damping: 20, stiffness: 200 });
  const rawGlowY = useSpring(50, { damping: 20, stiffness: 200 });

  const rotateX = useTransform(rawRotateX, (v) => v);
  const rotateY = useTransform(rawRotateY, (v) => v);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rawRotateY.set((x - 0.5) * 18);
      rawRotateX.set(-(y - 0.5) * 18);
      rawGlowX.set(x * 100);
      rawGlowY.set(y * 100);
    },
    [rawRotateX, rawRotateY, rawGlowX, rawGlowY],
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawGlowX.set(50);
    rawGlowY.set(50);
  }, [rawRotateX, rawRotateY, rawGlowX, rawGlowY]);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: hovered ? 0 : [0, -4, 0],
        }}
        transition={
          hovered
            ? { duration: 0.1 }
            : {
                duration: 3 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.15,
              }
        }
        className={cn(
          "relative rounded-2xl border overflow-hidden transition-shadow duration-300",
          card.border,
          hovered
            ? "shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            : "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
        )}
      >
        {/* Gradient background */}
        <div className={cn("absolute inset-0 bg-gradient-to-br", card.gradient)} />

        {/* Specular highlight - follows mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${rawGlowX.get()}% ${rawGlowY.get()}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Card content - different depths via translateZ */}
        <div className="relative p-5" style={{ transform: "translateZ(20px)" }}>
          {/* Tag */}
          <div className="mb-4 flex justify-end">
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
              {card.tag}
            </span>
          </div>

          {/* Simulated content lines */}
          <div className="space-y-2 mb-5" style={{ transform: "translateZ(8px)" }}>
            {card.lines.map((line, i) => (
              <div
                key={i}
                className="h-2 rounded-full bg-white/20"
                style={{ width: line.w, opacity: line.opacity }}
              />
            ))}
          </div>

          {/* Title block - highest depth */}
          <div style={{ transform: "translateZ(16px)" }}>
            <p className="text-xs text-white/60 mb-0.5 font-mono">{card.subtitle}</p>
            <h3 className="text-lg font-bold text-white">{card.title}</h3>
          </div>
        </div>

        {/* Bottom glow line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${card.glow}, transparent)`,
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ExperimentalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="experimental" className="section-gap px-6">
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
              EXPERIMENTAL
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            3D depth{" "}
            <span className="text-gradient-violet">tilt system</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            CSS perspective + Framer Motion spring physics. Specular highlight
            tracks cursor. Idle breathing animation. Zero WebGL.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-3">
            <span className="text-xs font-mono text-muted-foreground bg-white/5 border border-white/8 px-3 py-1 rounded">
              hover each card
            </span>
          </motion.div>
        </motion.div>

        {/* Card grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cards.map((card, i) => (
            <TiltCard key={card.title} card={card} index={i} />
          ))}
        </motion.div>

        {/* Technique label */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-mono text-muted-foreground"
        >
          {["CSS perspective(800px)", "rotateX / rotateY", "useSpring damping:20", "translateZ layers", "radial-gradient specular"].map((t) => (
            <span key={t} className="bg-white/3 border border-white/8 px-3 py-1 rounded">
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
