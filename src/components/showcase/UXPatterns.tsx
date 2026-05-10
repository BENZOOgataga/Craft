import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Check,
  AlertCircle,
  Loader2,
  ChevronRight,
  ChevronDown,
  Bell,
  X,
  ToggleLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { staggerContainer, fadeUp, scaleInBounce, shake, presenceScale, presenceFade } from "@/lib/motion";
import { cn } from "@/lib/utils";

function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const steps = [
    { title: "Create account", desc: "Set up your profile and preferences" },
    { title: "Connect tools", desc: "Integrate with your existing workflow" },
    { title: "Invite your team", desc: "Collaborate with colleagues" },
  ];

  if (done) {
    return (
      <motion.div
        variants={scaleInBounce}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-3 py-2"
      >
        <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <Check className="h-6 w-6 text-emerald-400" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-sm">Setup complete!</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            You're ready to go.
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={() => { setStep(0); setDone(false); }}>
          Reset
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Step {step + 1} of {steps.length}</span>
          <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
        </div>
        <Progress value={((step + 1) / steps.length) * 100} />
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={presenceScale}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="rounded-lg border border-white/8 bg-white/3 p-4"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="h-5 w-5 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs text-violet-400 font-bold">
              {step + 1}
            </div>
            <p className="text-sm font-medium">{steps[step].title}</p>
          </div>
          <p className="text-xs text-muted-foreground pl-7">{steps[step].desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* Step dots */}
      <div className="flex justify-center gap-1.5">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === step ? 20 : 6, backgroundColor: i <= step ? "#8b5cf6" : "rgba(255,255,255,0.1)" }}
            transition={{ duration: 0.2 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {step > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setStep((p) => p - 1)}>
            Back
          </Button>
        )}
        <Button
          size="sm"
          className="flex-1"
          onClick={() => {
            if (step < steps.length - 1) setStep((p) => p + 1);
            else setDone(true);
          }}
        >
          {step < steps.length - 1 ? (
            <>Next <ChevronRight className="h-3 w-3" /></>
          ) : (
            "Finish setup"
          )}
        </Button>
      </div>
    </div>
  );
}

function LoadingStates() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const run = () => {
    setState("loading");
    setTimeout(() => {
      setState(Math.random() > 0.3 ? "success" : "error");
      setTimeout(() => setState("idle"), 2500);
    }, 1800);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {/* Spinner */}
        <div className={cn("h-5 w-5 rounded-full border-2 border-t-violet-500", state === "loading" ? "animate-spin border-white/10" : "border-white/10")} />
        {/* Pulse bar */}
        <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
          {state === "loading" && (
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-violet-500 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          )}
          {state === "success" && (
            <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.4 }}
            />
          )}
          {state === "error" && (
            <motion.div className="h-full bg-red-500 w-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} />
          )}
        </div>
        {/* Icon */}
        <AnimatePresence mode="wait">
          {state === "success" && (
            <motion.div key="ok" variants={scaleInBounce} initial="hidden" animate="visible">
              <Check className="h-4 w-4 text-emerald-400" />
            </motion.div>
          )}
          {state === "error" && (
            <motion.div key="err" variants={shake} initial="hidden" animate="visible">
              <AlertCircle className="h-4 w-4 text-red-400" />
            </motion.div>
          )}
          {state === "loading" && (
            <motion.div key="loading" {...presenceFade}>
              <Loader2 className="h-4 w-4 text-violet-400 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {state === "error" && (
          <motion.p
            variants={presenceScale}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded px-2 py-1"
          >
            Request failed. Please try again.
          </motion.p>
        )}
        {state === "success" && (
          <motion.p
            variants={presenceScale}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-1"
          >
            Successfully saved.
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        size="sm"
        className="w-full"
        onClick={run}
        disabled={state === "loading"}
      >
        {state === "loading" ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing...
          </span>
        ) : (
          "Trigger request"
        )}
      </Button>
    </div>
  );
}

function NotificationSystem() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Deployment complete", read: false, color: "bg-emerald-500" },
    { id: 2, text: "PR ready for review", read: false, color: "bg-violet-500" },
    { id: 3, text: "Usage limit at 80%", read: true, color: "bg-amber-500" },
  ]);

  const unread = notifications.filter((n) => !n.read).length;

  const markAll = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifications((p) => p.filter((n) => n.id !== id));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Notifications</span>
          <AnimatePresence>
            {unread > 0 && (
              <motion.span
                variants={scaleInBounce}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-violet-500 text-xs text-white font-bold"
              >
                {unread}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {unread > 0 && (
          <button
            onClick={markAll}
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-1.5">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              layout
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-2 text-xs transition-colors",
                notif.read
                  ? "border-white/5 bg-white/2 text-muted-foreground"
                  : "border-white/10 bg-white/5 text-foreground",
              )}
            >
              <div className={cn("h-2 w-2 rounded-full shrink-0", notif.color, notif.read && "opacity-40")} />
              <span className="flex-1">{notif.text}</span>
              <button
                onClick={() => dismiss(notif.id)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProgressiveDisclosure() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Our platform uses industry-leading encryption to protect your data. Every
        request is authenticated and authorized.
      </p>
      <AnimatePresence>
        {expanded && (
          <motion.div
            variants={presenceScale}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-2"
          >
            <p className="text-sm text-muted-foreground">
              Advanced security features include: zero-knowledge architecture,
              end-to-end encryption, SOC2 compliance, and automatic key rotation
              every 90 days.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["SOC2", "ISO 27001", "GDPR", "HIPAA"].map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-0.5 rounded text-xs border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
      >
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3 w-3" />
        </motion.span>
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center py-6 text-center"
    >
      <div className="h-12 w-12 rounded-2xl border border-dashed border-white/15 flex items-center justify-center mb-3">
        <ToggleLeft className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium mb-1">No items yet</p>
      <p className="text-xs text-muted-foreground mb-4 max-w-36">
        Add your first item to get started.
      </p>
      <Button size="sm" variant="outline">Add item</Button>
    </motion.div>
  );
}

const patterns = [
  { id: "onboarding", label: "Multi-step onboarding", component: OnboardingFlow },
  { id: "loading", label: "Loading + error states", component: LoadingStates },
  { id: "notifications", label: "Notification system", component: NotificationSystem },
  { id: "disclosure", label: "Progressive disclosure", component: ProgressiveDisclosure },
  { id: "empty", label: "Empty state", component: EmptyState },
];

export function UXPatterns() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [active, setActive] = useState("onboarding");

  const ActiveComponent = patterns.find((p) => p.id === active)?.component ?? OnboardingFlow;

  return (
    <section id="ux-patterns" className="section-gap px-6">
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
              UX PATTERNS
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Polished{" "}
            <span className="text-gradient-violet">interaction systems</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The details that separate good products from great ones - feedback,
            continuity, and clarity.
          </motion.p>
        </motion.div>

        {/* Pattern selector */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          {/* Left: pattern list */}
          <div className="space-y-2">
            {patterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => setActive(pattern.id)}
                className={cn(
                  "w-full text-left rounded-xl border px-4 py-3 text-sm transition-all duration-200",
                  active === pattern.id
                    ? "border-violet-500/30 bg-violet-500/8 text-foreground"
                    : "border-white/8 bg-white/2 text-muted-foreground hover:border-white/12 hover:text-foreground",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{pattern.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      active === pattern.id ? "text-violet-400 translate-x-0.5" : "opacity-30",
                    )}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Right: live demo */}
          <div className="rounded-xl border border-white/8 bg-card p-6">
            <p className="text-xs text-muted-foreground font-mono mb-4 border-b border-white/8 pb-3">
              {patterns.find((p) => p.id === active)?.label}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={presenceScale}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
