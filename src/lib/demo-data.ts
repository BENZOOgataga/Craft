// Demo data for dashboard and showcase sections

export const revenueData = [
  { month: "Jan", revenue: 42000, users: 1200 },
  { month: "Feb", revenue: 47500, users: 1350 },
  { month: "Mar", revenue: 43200, users: 1180 },
  { month: "Apr", revenue: 58900, users: 1620 },
  { month: "May", revenue: 61400, users: 1750 },
  { month: "Jun", revenue: 71200, users: 2100 },
  { month: "Jul", revenue: 68800, users: 1980 },
  { month: "Aug", revenue: 79500, users: 2340 },
  { month: "Sep", revenue: 84200, users: 2510 },
  { month: "Oct", revenue: 91000, users: 2720 },
  { month: "Nov", revenue: 88500, users: 2640 },
  { month: "Dec", revenue: 103400, users: 3100 },
];

export const activityData = [
  { day: "Mon", deploys: 12, reviews: 8, commits: 47 },
  { day: "Tue", deploys: 19, reviews: 14, commits: 63 },
  { day: "Wed", deploys: 8, reviews: 11, commits: 38 },
  { day: "Thu", deploys: 24, reviews: 18, commits: 82 },
  { day: "Fri", deploys: 16, reviews: 9, commits: 54 },
  { day: "Sat", deploys: 4, reviews: 2, commits: 11 },
  { day: "Sun", deploys: 3, reviews: 1, commits: 8 },
];

export const metricCards = [
  {
    label: "Total Revenue",
    value: 103400,
    prefix: "$",
    change: "+18.2%",
    positive: true,
  },
  {
    label: "Active Users",
    value: 3100,
    prefix: "",
    change: "+12.4%",
    positive: true,
  },
  {
    label: "Conversion Rate",
    value: 4.7,
    prefix: "",
    suffix: "%",
    change: "+0.8%",
    positive: true,
  },
  {
    label: "Avg. Response",
    value: 142,
    prefix: "",
    suffix: "ms",
    change: "-23ms",
    positive: true,
  },
];

export const activityFeed = [
  {
    id: 1,
    user: "Alex Chen",
    action: "deployed",
    target: "production v2.4.1",
    time: "2 min ago",
    avatar: "AC",
    color: "bg-violet-500",
  },
  {
    id: 2,
    user: "Sarah Kim",
    action: "merged PR",
    target: "#482 - Auth refactor",
    time: "14 min ago",
    avatar: "SK",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    user: "Marcus Reid",
    action: "opened issue",
    target: "Rate limit on /api/search",
    time: "31 min ago",
    avatar: "MR",
    color: "bg-amber-500",
  },
  {
    id: 4,
    user: "Priya Patel",
    action: "reviewed",
    target: "Dashboard redesign",
    time: "1 hr ago",
    avatar: "PP",
    color: "bg-pink-500",
  },
  {
    id: 5,
    user: "Jordan Lee",
    action: "commented on",
    target: "Q4 performance report",
    time: "2 hr ago",
    avatar: "JL",
    color: "bg-blue-500",
  },
];

export const tableData = [
  {
    id: "USR-001",
    name: "Aria Nova",
    plan: "Enterprise",
    status: "Active",
    revenue: 4200,
    joined: "Jan 2024",
  },
  {
    id: "USR-002",
    name: "Liam Voss",
    plan: "Pro",
    status: "Active",
    revenue: 890,
    joined: "Mar 2024",
  },
  {
    id: "USR-003",
    name: "Zoe Hart",
    plan: "Starter",
    status: "Churned",
    revenue: 0,
    joined: "Feb 2024",
  },
  {
    id: "USR-004",
    name: "Ravi Mehta",
    plan: "Pro",
    status: "Active",
    revenue: 1180,
    joined: "Apr 2024",
  },
  {
    id: "USR-005",
    name: "Clara Thorn",
    plan: "Enterprise",
    status: "Trial",
    revenue: 0,
    joined: "May 2024",
  },
];

export const featureCards = [
  {
    icon: "Layers",
    title: "Shared Layout Animation",
    description:
      "Framer Motion layoutId enables seamless element transitions across component boundaries without manual coordinate tracking.",
    tag: "framer-motion",
  },
  {
    icon: "Eye",
    title: "Scroll Reveal Systems",
    description:
      "Intersection Observer paired with animated variants creates performant, accessible scroll-triggered entrance animations.",
    tag: "intersection-observer",
  },
  {
    icon: "Accessibility",
    title: "Accessible Motion Design",
    description:
      "respects prefers-reduced-motion at the animation system level - every variant degrades gracefully without breaking layout.",
    tag: "a11y",
  },
  {
    icon: "Terminal",
    title: "Command Palette",
    description:
      "cmdk-powered fuzzy search with keyboard navigation, animated presence, and deep-link actions across the interface.",
    tag: "cmdk",
  },
  {
    icon: "BarChart2",
    title: "Animated Dashboard UI",
    description:
      "Recharts with animated draw-in effects, count-up metrics, skeleton loading, and interactive sort/filter patterns.",
    tag: "recharts",
  },
  {
    icon: "Zap",
    title: "Interaction Feedback",
    description:
      "Every interactive element has tactile hover and tap states, loading indicators, and success/error confirmations.",
    tag: "micro-interactions",
  },
  {
    icon: "Monitor",
    title: "Responsive Architecture",
    description:
      "Adaptive layouts that change behavior - not just scale - across breakpoints, with motion tuned per viewport size.",
    tag: "responsive",
  },
  {
    icon: "Cpu",
    title: "Motion Performance",
    description:
      "GPU-accelerated transforms only, layoutId scoped correctly, AnimatePresence exit animations, no layout thrash.",
    tag: "performance",
  },
];
