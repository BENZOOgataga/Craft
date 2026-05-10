import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { staggerContainer, staggerItem, fadeUp, presenceScale } from "@/lib/motion";
import { cn } from "@/lib/utils";

const viewports = [
  {
    id: "desktop",
    label: "Desktop",
    icon: Monitor,
    width: 1280,
    containerClass: "w-full max-w-[600px]",
    scale: 1,
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: Tablet,
    width: 768,
    containerClass: "w-[360px]",
    scale: 0.75,
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    width: 375,
    containerClass: "w-[200px]",
    scale: 0.55,
  },
] as const;

type ViewportId = typeof viewports[number]["id"];

function MiniNav({ mobile }: { mobile: boolean }) {
  return (
    <div className={cn("flex items-center justify-between bg-zinc-900/80 border-b border-white/8", mobile ? "px-3 py-2" : "px-4 py-2.5")}>
      <div className="flex items-center gap-1.5">
        <div className="h-4 w-4 rounded bg-violet-500 opacity-90" />
        {!mobile && <span className="text-white text-xs font-bold">Craft</span>}
      </div>
      {mobile ? (
        <div className="flex flex-col gap-0.5">
          <div className="h-0.5 w-4 bg-white/50 rounded" />
          <div className="h-0.5 w-3 bg-white/50 rounded" />
          <div className="h-0.5 w-4 bg-white/50 rounded" />
        </div>
      ) : (
        <div className="flex gap-2">
          {["Features", "Motion", "Dashboard"].map((l) => (
            <span key={l} className="text-xs text-white/50">{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniHero({ compact }: { compact: boolean }) {
  return (
    <div className={cn("flex flex-col items-center text-center bg-zinc-950", compact ? "px-3 py-5 gap-2" : "px-6 py-8 gap-3")}>
      <div className="px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/25">
        <span className="text-violet-300" style={{ fontSize: compact ? 6 : 8 }}>Frontend Showcase v1.0</span>
      </div>
      <div className="space-y-1">
        <div className="h-2 bg-white/80 rounded" style={{ width: compact ? 80 : 120 }} />
        <div className="h-2 bg-violet-400/70 rounded" style={{ width: compact ? 60 : 90 }} />
      </div>
      <div className="h-1 bg-white/30 rounded w-4/5" />
      <div className="flex gap-1.5">
        <div className={cn("bg-violet-600 rounded text-white font-bold", compact ? "px-2 py-0.5" : "px-3 py-1")} style={{ fontSize: compact ? 6 : 8 }}>
          Explore
        </div>
        <div className={cn("border border-white/20 rounded", compact ? "px-2 py-0.5" : "px-3 py-1")} style={{ fontSize: compact ? 6 : 8 }}>
          Source
        </div>
      </div>
    </div>
  );
}

function MiniCards({ cols }: { cols: number }) {
  const cards = Array.from({ length: cols === 1 ? 2 : cols === 2 ? 4 : 6 });
  return (
    <div
      className="bg-zinc-900 p-2 gap-1.5"
      style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {cards.map((_, i) => (
        <div key={i} className="rounded bg-zinc-800 border border-white/5 p-2 space-y-1">
          <div className="h-3 w-3 rounded bg-violet-500/40" />
          <div className="h-1 bg-white/30 rounded w-3/4" />
          <div className="h-1 bg-white/15 rounded w-full" />
          <div className="h-1 bg-white/15 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

function DevicePreview({ viewportId }: { viewportId: ViewportId }) {
  const isMobile = viewportId === "mobile";
  const isTablet = viewportId === "tablet";
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <div className="rounded-lg border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl">
      <MiniNav mobile={isMobile} />
      <MiniHero compact={isMobile} />
      <MiniCards cols={cols} />
    </div>
  );
}

const breakpointFacts = [
  {
    icon: Monitor,
    label: "Desktop - 1280px+",
    desc: "3-column grid, full sidebar, expanded nav. All motion effects active.",
    color: "text-violet-400",
  },
  {
    icon: Tablet,
    label: "Tablet - 768px+",
    desc: "2-column grid, collapsible nav, adapted motion timing.",
    color: "text-sky-400",
  },
  {
    icon: Smartphone,
    label: "Mobile - 375px+",
    desc: "Single column, hamburger menu, reduced particle count.",
    color: "text-emerald-400",
  },
];

export function ResponsiveShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [active, setActive] = useState<ViewportId>("desktop");

  const viewport = viewports.find((v) => v.id === active) ?? viewports[0];

  return (
    <section id="responsive" className="section-gap px-6">
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
              RESPONSIVE
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Adaptive{" "}
            <span className="text-gradient-violet">at every breakpoint</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Not just scaling - the layout, grid columns, navigation, and motion
            behavior adapt meaningfully across viewports.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
        >
          {/* Left: viewport switcher + preview */}
          <motion.div variants={staggerItem} className="space-y-4">
            {/* Switcher */}
            <div className="flex rounded-lg border border-white/8 bg-card p-1 gap-1 w-fit mx-auto">
              {viewports.map((vp) => {
                const Icon = vp.icon;
                return (
                  <button
                    key={vp.id}
                    onClick={() => setActive(vp.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative",
                      active === vp.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active === vp.id && (
                      <motion.div
                        layoutId="viewport-indicator"
                        className="absolute inset-0 bg-white/10 rounded-md"
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className="relative flex items-center gap-1.5">
                      <Icon className="h-4 w-4" />
                      {vp.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Device preview */}
            <div className="flex justify-center">
              <div className={cn("transition-all duration-500", viewport.containerClass)}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    variants={presenceScale}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <DevicePreview viewportId={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Viewport info */}
            <p className="text-center text-xs text-muted-foreground font-mono">
              {viewport.width}px breakpoint
            </p>
          </motion.div>

          {/* Right: breakpoint facts */}
          <motion.div variants={staggerItem} className="space-y-4">
            {breakpointFacts.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-4 rounded-xl border border-white/8 bg-card p-5"
                >
                  <div className="shrink-0">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/8">
                      <Icon className={cn("h-4 w-4", fact.color)} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">{fact.label}</p>
                    <p className="text-sm text-muted-foreground">{fact.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            <div className="rounded-xl border border-white/8 bg-card p-5">
              <p className="text-sm font-semibold mb-3">Responsive motion rules</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Reduced particle count on mobile",
                  "Shorter stagger delays on small viewports",
                  "Mouse tracking disabled on touch devices",
                  "AnimatePresence exit times shortened on mobile",
                  "prefers-reduced-motion respected globally",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
