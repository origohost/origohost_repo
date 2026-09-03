import { Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/layout/admin-shell";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Users,
  Calendar,
  Briefcase,
  MessageSquare,
  FileText,
  Award,
  Image as ImageIcon,
  BookOpen,
  HelpCircle,
  Link2,
  Layout,
  Star,
  Building2,
  TrendingUp,
  Monitor,
  Smartphone,
} from "lucide-react";
import { m as motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { queryKeys } from "@/lib/query-keys";

const PANELS = [
  {
    name: "Pages",
    path: "/admin/pages",
    icon: FileText,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Page Blocks",
    path: "/admin/page-blocks",
    icon: Layout,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Navigation",
    path: "/admin/navigation",
    icon: Link2,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Events",
    path: "/admin/events",
    icon: Calendar,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    name: "Event RSVPs",
    path: "/admin/event-registrations",
    icon: Users,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    name: "Certificates",
    path: "/admin/certificates",
    icon: Award,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    name: "Partners",
    path: "/admin/partners",
    icon: Building2,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: MessageSquare,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    name: "Gallery",
    path: "/admin/gallery",
    icon: ImageIcon,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    name: "Testimonials",
    path: "/admin/testimonials",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    name: "FAQ",
    path: "/admin/faq",
    icon: HelpCircle,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    name: "Blog",
    path: "/admin/blog",
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

import {
  getDashboardTrafficData,
  getDashboardDeviceData,
  getDashboardEventRegistrationData,
} from "@/actions/admin.dashboard";

export default function AdminDashboard() {
  const { data: metrics, refetch } = useQuery({
    queryKey: queryKeys.admin.metrics,
    queryFn: async () => {
      const [eventsRes, jobsRes, usersRes, orgsRes] = await Promise.all([
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("jobs").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("organizations").select("id", { count: "exact", head: true }),
      ]);
      return {
        events: eventsRes.count || 0,
        jobs: jobsRes.count || 0,
        users: usersRes.count || 0,
        organizations: orgsRes.count || 0,
      };
    },
  });

  const { data: trafficData = [], refetch: refetchTraffic } = useQuery({
    queryKey: ["admin-traffic"],
    queryFn: async () => getDashboardTrafficData(),
  });

  const { data: deviceData = [], refetch: refetchDevices } = useQuery({
    queryKey: ["admin-devices"],
    queryFn: async () => getDashboardDeviceData(),
  });

  const { data: eventRegistrationData = [], refetch: refetchEventData } = useQuery({
    queryKey: ["admin-event-regs"],
    queryFn: async () => getDashboardEventRegistrationData(),
  });

  useEffect(() => {
    const channel = supabase
      .channel("admin-dashboard-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        refetch();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => {
        refetch();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "jobs" }, () => {
        refetch();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "organizations" }, () => {
        refetch();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "platform_visits" }, () => {
        refetchTraffic();
        refetchDevices();
      })
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "event_registrations_v2" },
        () => {
          refetchEventData();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch, refetchDevices, refetchEventData, refetchTraffic]);

  return (
    <AdminShell title="Overview" description="Master Analytics & Control Center">
      {/* Metrics Row */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-10 hide-scrollbar">
        <MetricCard title="Total Users" value={metrics?.users} icon={Users} trend="Active growth" />
        <MetricCard
          title="Organizations"
          value={metrics?.organizations}
          icon={Building2}
          trend="Pending reviews"
          alert
        />
        <MetricCard
          title="Total Events"
          value={metrics?.events}
          icon={Calendar}
          trend="+2 this month"
        />
        <MetricCard
          title="Active Jobs"
          value={metrics?.jobs}
          icon={Briefcase}
          trend="3 new applications"
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 rounded-3xl border border-[var(--brand-ink)]/10 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--brand-ink)]">Platform Traffic</h3>
            <span className="flex items-center text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-md">
              <TrendingUp className="mr-1 h-3 w-3" /> +24% YoY
            </span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "#000", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#f97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorVisitors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="rounded-3xl border border-[var(--brand-ink)]/10 bg-white p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-[var(--brand-ink)] mb-4">Device Distribution</h3>
          <div className="flex-1 min-h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs font-semibold text-[var(--brand-ink)]/60">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
              Desktop
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
              Mobile
            </div>
          </div>
        </div>
      </div>

      {/* Control Panels Grid */}
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight mb-4">Master Control Modules</h2>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 hide-scrollbar">
          {PANELS.map((p, i) => (
            <motion.div
              key={p.path}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="snap-center shrink-0 w-[40vw] sm:w-auto"
            >
              <Link
                to={p.path}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-5 text-center transition-all hover:border-[var(--brand-ink)]/20 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1"
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl ${p.bg} transition-transform group-hover:scale-110`}
                >
                  <p.icon className={`h-6 w-6 ${p.color}`} />
                </div>
                <span className="text-xs font-semibold text-[var(--brand-ink)]/80">{p.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  alert,
}: {
  title: string;
  value?: number;
  icon: React.ElementType;
  trend: string;
  alert?: boolean;
}) {
  return (
    <div className="flex flex-col rounded-3xl border border-[var(--brand-ink)]/10 bg-white p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md snap-center shrink-0 w-[80vw] sm:w-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-[var(--brand-ink)]/60">{title}</span>
        <Icon className="h-5 w-5 text-[var(--brand-ink)]/40" />
      </div>
      <div className="text-4xl font-black mb-2">{value === undefined ? "-" : value}</div>
      <div
        className={`text-xs font-medium ${alert ? "text-red-500" : "text-green-600 flex items-center"}`}
      >
        {!alert && <TrendingUp className="mr-1 h-3 w-3" />}
        {trend}
      </div>
    </div>
  );
}
