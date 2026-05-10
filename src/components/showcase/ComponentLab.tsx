import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Check,
  Bell,
  ChevronDown,
  Settings,
  User,
  LogOut,
  Search,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  scaleInBounce,
  presenceFade,
  presenceScale,
} from "@/lib/motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function ButtonsDemo() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Button>Default</Button>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Button variant="outline">Outline</Button>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Button variant="ghost">Ghost</Button>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Button variant="destructive">Destructive</Button>
        </motion.div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
        <Button
          className="w-full relative overflow-hidden"
          onClick={handleClick}
          disabled={loading}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.span
                key="loading"
                {...presenceFade}
                className="flex items-center gap-2"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </motion.span>
            ) : success ? (
              <motion.span
                key="success"
                variants={scaleInBounce}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2 text-emerald-400"
              >
                <Check className="h-4 w-4" />
                Success!
              </motion.span>
            ) : (
              <motion.span key="idle" {...presenceFade}>
                Click to load
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
}

function BadgesDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {(
        [
          ["Default", "default"],
          ["Success", "success"],
          ["Warning", "warning"],
          ["Destructive", "destructive"],
          ["Outline", "outline"],
          ["Ghost", "ghost"],
        ] as const
      ).map(([label, variant]) => (
        <motion.div
          key={label}
          whileHover={{ scale: 1.06, y: -1 }}
          whileTap={{ scale: 0.96 }}
        >
          <Badge variant={variant}>{label}</Badge>
        </motion.div>
      ))}
    </div>
  );
}

function SwitchSliderDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [volume, setVolume] = useState([65]);

  return (
    <div className="space-y-4">
      {[
        { label: "Notifications", value: notifications, set: setNotifications },
        { label: "Dark mode", value: darkMode, set: setDarkMode },
        { label: "Auto-save", value: autoSave, set: setAutoSave },
      ].map(({ label, value, set }) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <Switch checked={value} onCheckedChange={set} />
        </div>
      ))}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Volume</span>
          <span className="text-sm font-mono text-violet-400">{volume[0]}%</span>
        </div>
        <Slider
          value={volume}
          onValueChange={setVolume}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
}

function ProgressDemo() {
  const values = [
    { label: "React", value: 95, color: "bg-sky-500" },
    { label: "TypeScript", value: 88, color: "bg-blue-500" },
    { label: "Framer Motion", value: 82, color: "bg-violet-500" },
    { label: "Tailwind", value: 91, color: "bg-cyan-500" },
  ];

  return (
    <div className="space-y-4">
      {values.map(({ label, value }) => (
        <div key={label} className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-mono text-xs text-violet-400">{value}%</span>
          </div>
          <Progress value={value} />
        </div>
      ))}
    </div>
  );
}

function ToastDemo() {
  const { toast } = useToast();

  const toasts = [
    {
      label: "Default",
      fn: () =>
        toast({
          title: "Notification",
          description: "This is a default toast notification.",
        }),
    },
    {
      label: "Success",
      fn: () =>
        toast({
          variant: "success",
          title: "Success!",
          description: "Your changes have been saved.",
        }),
    },
    {
      label: "Error",
      fn: () =>
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        }),
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {toasts.map(({ label, fn }) => (
        <motion.div key={label} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Button variant="outline" size="sm" onClick={fn}>
            <Bell className="h-3 w-3 mr-1.5" />
            {label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {[
        {
          value: "item-1",
          q: "What is Framer Motion?",
          a: "Framer Motion is a production-ready motion library for React. It makes it easy to create complex animations with a declarative API.",
        },
        {
          value: "item-2",
          q: "How does shadcn/ui work?",
          a: "shadcn/ui is a collection of re-usable components built using Radix UI and Tailwind CSS. You copy components directly into your project.",
        },
        {
          value: "item-3",
          q: "Why Tailwind CSS?",
          a: "Tailwind enables rapid UI development with utility classes, consistent design tokens, and excellent dark mode support out of the box.",
        },
      ].map(({ value, q, a }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>{q}</AccordionTrigger>
          <AccordionContent>{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Open modal
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Animated dialog</DialogTitle>
          <DialogDescription>
            This modal uses Radix Dialog with custom Tailwind animations for
            smooth scale + fade entrance and exit.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <div className="rounded-lg border border-white/8 bg-white/3 p-3 text-sm text-muted-foreground">
            Zoom-in entrance + blur backdrop. Exit animation plays on close via
            Radix state transitions.
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-xs">
              Esc
            </kbd>
            to close
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DropdownDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account options
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="h-4 w-4" />
          Profile
          <DropdownMenuShortcut>P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4" />
          Settings
          <DropdownMenuShortcut>S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="h-4 w-4" />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-400 focus:text-red-400">
          <LogOut className="h-4 w-4" />
          Sign out
          <DropdownMenuShortcut>Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TooltipDemo() {
  const items = [
    { label: "Add", icon: Plus, tip: "Add new item (Ctrl+N)" },
    { label: "Search", icon: Search, tip: "Search (Ctrl+K)" },
    { label: "Settings", icon: Settings, tip: "Open settings (Ctrl+,)" },
    { label: "Delete", icon: Trash2, tip: "Delete selected (Del)" },
  ];
  return (
    <div className="flex gap-2 flex-wrap">
      {items.map(({ label, icon: Icon, tip }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
              <Button variant="outline" size="icon">
                <Icon className="h-4 w-4" />
                <span className="sr-only">{label}</span>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tip}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

const demoSections = [
  { id: "buttons", label: "Buttons", component: ButtonsDemo },
  { id: "badges", label: "Badges", component: BadgesDemo },
  { id: "controls", label: "Controls", component: SwitchSliderDemo },
  { id: "progress", label: "Progress", component: ProgressDemo },
  { id: "dialog", label: "Dialog", component: DialogDemo },
  { id: "dropdown", label: "Dropdown", component: DropdownDemo },
  { id: "accordion", label: "Accordion", component: AccordionDemo },
  { id: "toast", label: "Toast", component: ToastDemo },
  { id: "tooltip", label: "Tooltip", component: TooltipDemo },
];

export function ComponentLab() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [activeDemo, setActiveDemo] = useState("buttons");

  const ActiveComponent =
    demoSections.find((s) => s.id === activeDemo)?.component ?? ButtonsDemo;

  return (
    <section id="components" className="section-gap px-6">
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
              COMPONENT LAB
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Interactive{" "}
            <span className="text-gradient-violet">component playground</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every component polished with micro-interactions, custom motion
            states, and dark-mode-first styling.
          </motion.p>
        </motion.div>

        {/* Lab interface */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4"
        >
          {/* Sidebar nav */}
          <motion.div
            variants={staggerItem}
            className="rounded-xl border border-white/8 bg-card p-2 h-fit lg:sticky lg:top-24"
          >
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Components
            </p>
            {demoSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveDemo(section.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150 relative",
                  activeDemo === section.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )}
              >
                {activeDemo === section.id && (
                  <motion.div
                    layoutId="lab-indicator"
                    className="absolute inset-0 bg-white/8 rounded-lg"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative">{section.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Preview pane */}
          <motion.div variants={staggerItem} className="rounded-xl border border-white/8 bg-card overflow-hidden">
            {/* Pane header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {demoSections.find((s) => s.id === activeDemo)?.label}
              </span>
              <div className="w-16" />
            </div>

            {/* Component area */}
            <div className="p-8 min-h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  variants={presenceScale}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
