import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, heroItem } from "@/lib/motion";

function GradientOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="cta" className="relative section-gap px-6 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <GradientOrb className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl" />
        <GradientOrb className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-700/8 blur-3xl" />
        <GradientOrb className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-violet-800/8 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Scroll-parallax grid */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Border beam container */}
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="relative rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm p-12 sm:p-16 text-center overflow-hidden"
        >
          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "200% 0%", "0% 0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Badge */}
          <motion.div variants={heroItem} className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
              <Sparkles className="h-3 w-3" />
              Built with Craft
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={heroItem}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]"
          >
            Ready to{" "}
            <span className="text-gradient-violet">craft</span>
            {" "}your next interface?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={heroItem}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Every pattern in this showcase is production-ready. Fork the
            repository, adapt the motion system, and build something remarkable.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="xl"
                className="gap-2 shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-shadow"
              >
                Start building
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button size="xl" variant="outline" className="gap-2" asChild>
                <a href="https://github.com/BENZOOgataga/Craft" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View source
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Footer caption */}
          <motion.p
            variants={heroItem}
            className="mt-10 text-xs text-muted-foreground/60"
          >
            React 18 + TypeScript + Framer Motion + Tailwind CSS + shadcn/ui
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
