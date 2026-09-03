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
  Cpu,
  Bot,
  Terminal,
  UserCircle,
  Settings,
  Megaphone,
  CreditCard,
  BarChart3,
  Layers,
  Sparkles,
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
import {
  getDashboardTrafficData,
  getDashboardDeviceData,
  getDashboardEventRegistrationData,
} from "@/actions/admin.dashboard";

const PANELS = [
  { name: "Pages", path: "/admin/pages", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Page Blocks", path: "/admin/page-blocks", icon: Layout, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Navigation", path: "/admin/navigation", icon: Link2, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Events", path: "/admin/events", icon: Calendar, color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "Event RSVPs", path: "/admin/event-registrations", icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "Certificates", path: "/admin/certificates", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "Partners", path: "/admin/partners", icon: Building2, color: "text-rose-500", bg: "bg-rose-500/10" },
  { name: "Messages", path: "/admin/messages", icon: MessageSquare, color: "text-sky-500", bg: "bg-sky-500/10" },
  { name: "Gallery", path: "/admin/gallery", icon: ImageIcon, color: "text-pink-500", bg: "bg-pink-500/10" },
  { name: "Testimonials", path: "/admin/testimonials", icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { name: "FAQ", path: "/admin/faq", icon: HelpCircle, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { name: "Blog", path: "/admin/blog", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

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
      .on("postgres_changes", { event: "*", schema: "public", table: "event_registrations_v2" }, () => {
        refetchEventData();
      })
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
        <MetricCard title="Organizations" value={metrics?.organizations} icon={Building2} trend="Pending reviews" alert />
        <MetricCard title="Total Events" value={metrics?.events} icon={Calendar} trend="+2 this month" />
        <MetricCard title="Active Jobs" value={metrics?.jobs} icon={Briefcase} trend="3 new applications" />
      </div>

      {/* VISUAL ARCHITECTURE MAP COMPONENT */}
      <div className="mb-10 rounded-3xl border border-[var(--brand-ink)]/10 bg-slate-900 text-white p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
              <Sparkles className="w-3 h-3 text-blue-400" /> ENTERPRISE ARCHITECTURE MAP
            </span>
            <h2 className="text-2xl md:text-3xl font-black mt-2 font-mono tracking-tight">ORIGOHOST ADMIN ARCHITECTURE</h2>
            <p className="text-xs text-slate-400 mt-1">
              4 Primary Domain Pillars • 13 Integrated Workspaces • Permission-Aware Boundaries
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              ● Active Platform (v2.6)
            </span>
          </div>
        </div>

        {/* 4 Pillars Tree Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. BUSINESS */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 text-blue-400 font-black text-sm uppercase tracking-wider border-b border-slate-700 pb-2">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> BUSINESS
                </span>
                <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">6 Modules</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Settings className="w-3.5 h-3.5 text-blue-400" /> Operations</span>
                  <span className="text-[10px] text-slate-400 font-mono">Users / Roles</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Users className="w-3.5 h-3.5 text-blue-400" /> Community</span>
                  <span className="text-[10px] text-slate-400 font-mono">Groups / Forums</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-blue-400" /> Events</span>
                  <span className="text-[10px] text-slate-400 font-mono">Format × Domain × Industry</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Briefcase className="w-3.5 h-3.5 text-blue-400" /> Recruitment</span>
                  <span className="text-[10px] text-slate-400 font-mono">Pipeline / Resumes</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Megaphone className="w-3.5 h-3.5 text-blue-400" /> Marketing</span>
                  <span className="text-[10px] text-slate-400 font-mono">Campaigns / SEO</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><CreditCard className="w-3.5 h-3.5 text-blue-400" /> Finance</span>
                  <span className="text-[10px] text-slate-400 font-mono">Payments / Invoices</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 2. CONTENT */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 text-emerald-400 font-black text-sm uppercase tracking-wider border-b border-slate-700 pb-2">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" /> CONTENT
                </span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">CMS Engine</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-emerald-400" /> CMS</span>
                  <span className="text-[10px] text-slate-400 font-mono">Payload CMS</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Layout className="w-3.5 h-3.5 text-emerald-400" /> Pages</span>
                  <span className="text-[10px] text-slate-400 font-mono">Landing Pages</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-emerald-400" /> Blog</span>
                  <span className="text-[10px] text-slate-400 font-mono">Articles / Editorial</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><ImageIcon className="w-3.5 h-3.5 text-emerald-400" /> Media</span>
                  <span className="text-[10px] text-slate-400 font-mono">Assets & Photos</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><HelpCircle className="w-3.5 h-3.5 text-emerald-400" /> Resources</span>
                  <span className="text-[10px] text-slate-400 font-mono">Downloads / FAQs</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> Forms</span>
                  <span className="text-[10px] text-slate-400 font-mono">Forms & Popups</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. PLATFORM */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 text-purple-400 font-black text-sm uppercase tracking-wider border-b border-slate-700 pb-2">
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> PLATFORM
                </span>
                <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded text-purple-300">4 Core Systems</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-purple-400" /> System</span>
                  <span className="text-[10px] text-slate-400 font-mono">Settings & SMTP</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Terminal className="w-3.5 h-3.5 text-purple-400" /> Developer</span>
                  <span className="text-[10px] text-slate-400 font-mono">APIs / Cron / SQL</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Bot className="w-3.5 h-3.5 text-purple-400" /> AI Center</span>
                  <span className="text-[10px] text-slate-400 font-mono">Chatbot / Prompts</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5 text-purple-400" /> Analytics</span>
                  <span className="text-[10px] text-slate-400 font-mono">Funnels / Heatmaps</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4. PERSONAL */}
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 text-amber-400 font-black text-sm uppercase tracking-wider border-b border-slate-700 pb-2">
                <span className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4" /> PERSONAL
                </span>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">Account</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><UserCircle className="w-3.5 h-3.5 text-amber-400" /> Profile</span>
                  <span className="text-[10px] text-slate-400 font-mono">Admin Info</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Settings className="w-3.5 h-3.5 text-amber-400" /> Preferences</span>
                  <span className="text-[10px] text-slate-400 font-mono">Notifications</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Award className="w-3.5 h-3.5 text-amber-400" /> Security</span>
                  <span className="text-[10px] text-slate-400 font-mono">2FA / Keys</span>
                </li>
                <li className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="font-bold text-white flex items-center gap-2"><Monitor className="w-3.5 h-3.5 text-amber-400" /> Sessions</span>
                  <span className="text-[10px] text-slate-400 font-mono">Connected Devices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
