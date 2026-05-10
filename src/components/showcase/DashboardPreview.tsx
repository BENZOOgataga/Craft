import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart2,
  Bell,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { revenueData, activityData, metricCards, activityFeed, tableData } from "@/lib/demo-data";
import { staggerContainer, staggerItem, fadeUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

function MetricCount({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 80 });
  const display = useTransform(spring, (v) => {
    if (suffix === "%") return `${prefix}${v.toFixed(1)}${suffix}`;
    if (suffix === "ms") return `${prefix}${Math.round(v)}${suffix}`;
    return `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
  });

  if (isInView) motionValue.set(value);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded bg-white/5 animate-pulse", className)} />
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
  collapsed,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  collapsed: boolean;
}) {
  return (
    <motion.button
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
        active
          ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
          : "text-muted-foreground hover:text-foreground hover:bg-white/5",
        collapsed && "justify-center",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

type SortField = "name" | "plan" | "revenue";
type SortDir = "asc" | "desc";

function DataTable() {
  const [sort, setSort] = useState<{ field: SortField; dir: SortDir }>({
    field: "revenue",
    dir: "desc",
  });

  const sorted = [...tableData].sort((a, b) => {
    const aVal = a[sort.field];
    const bVal = b[sort.field];
    const cmp = typeof aVal === "string" ? aVal.localeCompare(bVal as string) : (aVal as number) - (bVal as number);
    return sort.dir === "asc" ? cmp : -cmp;
  });

  const handleSort = (field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { field, dir: "asc" },
    );
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sort.field !== field) return <ChevronUp className="h-3 w-3 opacity-20" />;
    return sort.dir === "asc" ? (
      <ChevronUp className="h-3 w-3 text-violet-400" />
    ) : (
      <ChevronDown className="h-3 w-3 text-violet-400" />
    );
  };

  const statusColors: Record<string, string> = {
    Active: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Churned: "text-red-400 bg-red-500/10 border-red-500/20",
    Trial: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/8">
            <th className="text-left px-3 py-2.5 text-xs text-muted-foreground font-medium">ID</th>
            {(["name", "plan", "revenue"] as const).map((field) => (
              <th
                key={field}
                className="text-left px-3 py-2.5 text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort(field)}
              >
                <span className="flex items-center gap-1 capitalize">
                  {field}
                  <SortIcon field={field} />
                </span>
              </th>
            ))}
            <th className="text-left px-3 py-2.5 text-xs text-muted-foreground font-medium">Status</th>
            <th className="text-left px-3 py-2.5 text-xs text-muted-foreground font-medium">Joined</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {sorted.map((row, i) => (
              <motion.tr
                key={row.id}
                layout
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className="border-b border-white/5 hover:bg-white/3 transition-colors"
              >
                <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">{row.id}</td>
                <td className="px-3 py-2.5 font-medium">{row.name}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{row.plan}</td>
                <td className="px-3 py-2.5 font-mono">
                  {row.revenue > 0 ? `$${row.revenue.toLocaleString()}` : "-"}
                </td>
                <td className="px-3 py-2.5">
                  <span className={cn("px-2 py-0.5 rounded-full text-xs border", statusColors[row.status])}>
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-muted-foreground text-xs">{row.joined}</td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-card shadow-xl p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-semibold">${(payload[0]?.value ?? 0).toLocaleString()}</p>
    </div>
  );
};

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [collapsed, setCollapsed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (isInView && !loaded) setTimeout(() => setLoaded(true), 600);

  return (
    <section id="dashboard" className="section-gap px-6">
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
              DASHBOARD PREVIEW
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          >
            Premium{" "}
            <span className="text-gradient-violet">admin interface</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Animated charts, count-up metrics, sortable tables, skeleton loaders,
            and collapsible sidebar - all production-quality.
          </motion.p>
        </motion.div>

        {/* Dashboard shell */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={scaleIn}
          className="rounded-2xl border border-white/8 bg-card overflow-hidden shadow-[0_8px_48px_rgba(0,0,0,0.6)]"
        >
          {/* Titlebar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-white/2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-amber-500/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-0.5 rounded bg-white/5 border border-white/8 text-xs text-muted-foreground font-mono">
                craft.app/dashboard
              </div>
            </div>
            <div className="w-16" />
          </div>

          <div className="flex min-h-[600px]">
            {/* Sidebar */}
            <motion.aside
              animate={{ width: collapsed ? 60 : 200 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="border-r border-white/8 bg-white/2 flex flex-col overflow-hidden shrink-0"
            >
              <div className="p-3 flex flex-col gap-1 flex-1">
                <SidebarItem icon={LayoutDashboard} label="Overview" active collapsed={collapsed} />
                <SidebarItem icon={Users} label="Users" collapsed={collapsed} />
                <SidebarItem icon={BarChart2} label="Analytics" collapsed={collapsed} />
                <SidebarItem icon={Bell} label="Alerts" collapsed={collapsed} />
                <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
              </div>
              <button
                onClick={() => setCollapsed((p) => !p)}
                className="flex items-center justify-center p-3 border-t border-white/8 text-muted-foreground hover:text-foreground transition-colors"
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>
            </motion.aside>

            {/* Main content */}
            <div className="flex-1 overflow-auto p-6 space-y-6 min-w-0">
              {/* Metric cards */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              >
                {metricCards.map((card) => (
                  <motion.div
                    key={card.label}
                    variants={staggerItem}
                    className="rounded-xl border border-white/8 bg-background p-4"
                  >
                    {loaded ? (
                      <>
                        <p className="text-xs text-muted-foreground mb-1">
                          {card.label}
                        </p>
                        <p className="text-xl font-bold">
                          <MetricCount
                            value={card.value}
                            prefix={card.prefix}
                            suffix={"suffix" in card ? (card.suffix ?? "") : ""}
                          />
                        </p>
                        <div
                          className={cn(
                            "flex items-center gap-1 text-xs mt-1",
                            card.positive ? "text-emerald-400" : "text-red-400",
                          )}
                        >
                          {card.positive ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {card.change}
                        </div>
                      </>
                    ) : (
                      <>
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-6 w-16 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Area chart */}
                <div className="lg:col-span-2 rounded-xl border border-white/8 bg-background p-4">
                  <p className="text-sm font-medium mb-4">Revenue trend</p>
                  {loaded ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#71717a" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#71717a" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}K`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#revenueGrad)" animationDuration={1000} />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <Skeleton className="h-44 w-full" />
                  )}
                </div>

                {/* Activity bar chart */}
                <div className="rounded-xl border border-white/8 bg-background p-4">
                  <p className="text-sm font-medium mb-4">Weekly activity</p>
                  {loaded ? (
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#71717a" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#71717a" }} axisLine={false} tickLine={false} />
                        <Bar dataKey="commits" fill="#7c3aed" radius={[3, 3, 0, 0]} animationDuration={800} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <Skeleton className="h-44 w-full" />
                  )}
                </div>
              </div>

              {/* Activity feed + table */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Activity feed */}
                <div className="rounded-xl border border-white/8 bg-background p-4">
                  <p className="text-sm font-medium mb-4">Activity</p>
                  <div className="space-y-3">
                    {loaded ? (
                      activityFeed.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 + 0.3 }}
                          className="flex items-start gap-3"
                        >
                          <div className={cn("h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0", item.color)}>
                            {item.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs">
                              <span className="font-medium">{item.user}</span>{" "}
                              <span className="text-muted-foreground">{item.action}</span>{" "}
                              <span className="text-violet-400">{item.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex gap-3">
                          <Skeleton className="h-7 w-7 rounded-full shrink-0" />
                          <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-2.5 w-16" />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Data table */}
                <div className="lg:col-span-2 rounded-xl border border-white/8 bg-background p-4">
                  <p className="text-sm font-medium mb-4">
                    Users{" "}
                    <span className="text-xs text-muted-foreground ml-1">
                      (click column to sort)
                    </span>
                  </p>
                  {loaded ? (
                    <DataTable />
                  ) : (
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
