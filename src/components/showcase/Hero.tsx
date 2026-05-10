import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Github,
  Sparkles,
  Layers,
  Zap,
  MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroContainer, heroItem, staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const techBadges = [
  { label: "React 18", color: "text-sky-400 border-sky-500/20 bg-sky-500/10" },
  { label: "Framer Motion", color: "text-violet-400 border-violet-500/20 bg-violet-500/10" },
  { label: "Tailwind CSS", color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10" },
  { label: "shadcn/ui", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" },
  { label: "TypeScript", color: "text-blue-400 border-blue-500/20 bg-blue-500/10" },
  { label: "Recharts", color: "text-orange-400 border-orange-500/20 bg-orange-500/10" },
];

const floatingParticles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

const headlineWords = ["Build", "interfaces", "that", "feel", "alive."];

function MouseSpotlightInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const rawY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const x = useSpring(rawX, { damping: 25, stiffness: 80 });
  const y = useSpring(rawY, { damping: 25, stiffness: 80 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="fixed w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(109,40,217,0.05) 40%, transparent 70%)",
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}

export function Hero() {
  const [wordsVisible, setWordsVisible] = useState<boolean[]>(
    headlineWords.map(() => false),
  );

  useEffect(() => {
    headlineWords.forEach((_, i) => {
      setTimeout(
        () => {
          setWordsVisible((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
        200 + i * 100,
      );
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Background layers */}
      <MouseSpotlightInner />

      {/* Static gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/8 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-violet-800/6 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-indigo-700/6 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-violet-400/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        {/* Status chip */}
        <motion.div variants={heroItem} className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
            </span>
            <Sparkles className="h-3 w-3" />
            Frontend Showcase v1.0
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={heroItem}
          className="text-6xl sm:text-7xl md:text-8xl font-black leading-[1.0] tracking-tight mb-6"
        >
          <span className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {headlineWords.map((word, i) => (
              <AnimatePresence key={word}>
                <motion.span
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={
                    wordsVisible[i]
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 32, filter: "blur(8px)" }
                  }
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    i === headlineWords.length - 1
                      ? "text-gradient-violet"
                      : "text-gradient",
                  )}
                >
                  {word}
                </motion.span>
              </AnimatePresence>
            ))}
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={heroItem}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          A premium interactive showcase of React, Framer Motion, shadcn/ui, and
          modern frontend engineering - crafted to production quality standards.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroItem}
          className="flex flex-col sm:flex-row gap-4 mb-14"
        >
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="gap-2 text-base font-semibold h-12 px-7 shadow-[0_0_24px_rgba(139,92,246,0.3)]"
              onClick={() =>
                document
                  .querySelector("#features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore the showcase
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Button size="lg" variant="outline" className="gap-2 text-base h-12 px-7" asChild>
              <a href="https://github.com/BENZOOgataga/Craft" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View source
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-2"
        >
          {techBadges.map((badge, i) => (
            <motion.div
              key={badge.label}
              variants={fadeUp}
              custom={i}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span
                className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
                  badge.color,
                )}
              >
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={heroItem}
          className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
        >
          {[
            { icon: Layers, value: "9", label: "Showcase sections" },
            { icon: Zap, value: "50+", label: "Motion patterns" },
            { icon: MousePointer2, value: "100%", label: "Interactive" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="h-4 w-4 text-violet-400 mb-1" />
              <span className="text-2xl font-bold text-gradient">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
