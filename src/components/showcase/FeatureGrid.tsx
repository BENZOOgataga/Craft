import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Layers,
  Eye,
  Accessibility,
  Terminal,
  BarChart2,
  Zap,
  Monitor,
  Cpu,
} from "lucide-react";
import { featureCards } from "@/lib/demo-data";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layers,
  Eye,
  Accessibility,
  Terminal,
  BarChart2,
  Zap,
  Monitor,
  Cpu,
};

const tagColors: Record<string, string> = {
  "framer-motion": "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "intersection-observer": "text-sky-400 bg-sky-500/10 border-sky-500/20",
  a11y: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  cmdk: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  recharts: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  "micro-interactions": "text-pink-400 bg-pink-500/10 border-pink-500/20",
  responsive: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  performance: "text-lime-400 bg-lime-500/10 border-lime-500/20",
};

function FeatureCard({
  card,
  index,
}: {
  card: (typeof featureCards)[0];
  index: number;
}) {
  const Icon = iconMap[card.icon] ?? Layers;
  const tagColor = tagColors[card.tag] ?? "text-muted-foreground bg-white/5 border-white/10";

  return (
    <motion.div
      variants={staggerItem}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-xl border border-white/8 bg-card p-6 cursor-default overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,92,246,0.15)]"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card glow on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Icon */}
      <div className="relative mb-4 inline-flex">
        <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 transition-all duration-200 group-hover:bg-violet-500/15 group-hover:border-violet-500/30">
          <motion.div
            initial={false}
            whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
          >
            <Icon className="h-5 w-5 text-violet-400" />
          </motion.div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-foreground mb-2 group-hover:text-white transition-colors duration-200">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {card.description}
      </p>

      {/* Tag */}
      <span
        className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono border",
          tagColor,
        )}
      >
        {card.tag}
      </span>
    </motion.div>
  );
}

export function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="features" className="section-gap px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground font-mono">
              CAPABILITIES
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            What this showcase{" "}
            <span className="text-gradient-violet">demonstrates</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Every section is a working proof of concept - not a description, not
            a screenshot. Real implementations, real interactions.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {featureCards.map((card, i) => (
            <FeatureCard key={card.title} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
