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
  ChevronRight,
  ExternalLink,
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

      {/* FULL TREE INTERACTIVE ARCHITECTURE MAP */}
      <div className="mb-10 rounded-3xl border border-[var(--brand-ink)]/10 bg-slate-950 text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden font-sans">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
              <Sparkles className="w-3 h-3 text-blue-400" /> INTERACTIVE PLATFORM TREE MAP
            </span>
            <h2 className="text-2xl md:text-3xl font-black mt-2 font-mono tracking-tight text-white">ORIGOHOST ADMIN PLATFORM</h2>
            <p className="text-xs text-slate-400 mt-1">
              Click any node or sub-module to jump directly to its workspace
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
              ● System Active (13 Workspaces)
            </span>
          </div>
        </div>

        {/* 4 Pillar Sections */}
        <div className="space-y-8 font-mono text-xs">
          {/* 1. BUSINESS PILLAR */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5">
            <div className="flex items-center justify-between text-blue-400 font-bold text-sm mb-4 border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> 💼 BUSINESS PILLAR
              </span>
              <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">6 Workspaces</span>
            </div>

            <div className="space-y-4 text-slate-300">
              {/* Operations */}
              <div>
                <Link to="/admin/users" className="font-bold text-white hover:text-blue-300 transition-colors inline-flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-blue-400" /> ⚙️ Operations (/admin/operations/*)
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-[11px]">
                  <TreeLink to="/admin/users" label="Users (/admin/users)" />
                  <TreeLink to="/admin/operations/students" label="Students" />
                  <TreeLink to="/admin/operations/organizations" label="Organizations" />
                  <TreeLink to="/admin/operations/host-requests" label="Host Requests" />
                  <TreeLink to="/admin/schedule-calls" label="Schedule Calls" />
                  <TreeLink to="/admin/sponsors" label="Sponsors" />
                  <TreeLink to="/admin/operations/recruiters" label="Recruiters" />
                  <TreeLink to="/admin/operations/mentors" label="Mentors" />
                  <TreeLink to="/admin/operations/volunteers" label="Volunteers" />
                  <TreeLink to="/admin/operations/speakers" label="Speakers" />
                  <TreeLink to="/admin/operations/admins" label="Admins" />
                  <TreeLink to="/admin/operations/roles" label="Roles" />
                  <TreeLink to="/admin/operations/permissions" label="Permissions" />
                  <TreeLink to="/admin/event-registrations" label="Registration Management" />
                  <TreeLink to="/admin/operations/verification-center" label="Verification Center" />
                  <TreeLink to="/admin/operations/activity-timeline" label="Activity Timeline" />
                  <TreeLink to="/admin/operations/sessions" label="Sessions" />
                  <TreeLink to="/admin/operations/device-manager" label="Device Manager" />
                  <TreeLink to="/admin/audit" label="Audit Logs" />
                  <TreeLink to="/admin/operations/recycle-bin" label="Recycle Bin" />
                </div>
              </div>

              {/* Community */}
              <div className="border-t border-slate-800/80 pt-3">
                <Link to="/admin/community/community-members" className="font-bold text-white hover:text-blue-300 transition-colors inline-flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-400" /> 👥 Community (/admin/community/*)
                </Link>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <TreeLink to="/admin/community/community-members" label="Members" />
                  <TreeLink to="/admin/community/groups" label="Groups" />
                  <TreeLink to="/admin/community/communities" label="Communities" />
                  <TreeLink to="/admin/community/forums" label="Forums" />
                  <TreeLink to="/admin/community/discussions" label="Discussions" />
                  <TreeLink to="/admin/community/mentorship" label="Mentorship" />
                  <TreeLink to="/admin/community/campus-ambassador" label="Ambassadors" />
                  <TreeLink to="/admin/community/leaderboard" label="Leaderboard" />
                  <TreeLink to="/admin/community/badges" label="Badges" />
                  <TreeLink to="/admin/certificates" label="Certificates" />
                </div>
              </div>

              {/* Events */}
              <div className="border-t border-slate-800/80 pt-3">
                <Link to="/admin/events" className="font-bold text-white hover:text-blue-300 transition-colors inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" /> 📅 Events (/admin/events/*)
                </Link>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <TreeLink to="/admin/events" label="Events" />
                  <TreeLink to="/admin/events/schedules" label="Schedules" />
                  <TreeLink to="/admin/events/venues" label="Venues" />
                  <TreeLink to="/admin/events/speakers" label="Speakers" />
                  <TreeLink to="/admin/events/sponsors" label="Sponsors" />
                  <TreeLink to="/admin/partners" label="Partners" />
                  <TreeLink to="/admin/event-registrations" label="Registrations" />
                  <TreeLink to="/admin/events/attendance" label="Attendance" />
                  <TreeLink to="/admin/events/qr-check-in" label="QR Check-in" />
                  <TreeLink to="/admin/events/qr-tickets" label="QR Tickets" />
                  <TreeLink to="/admin/events/reports" label="Reports" />
                </div>
              </div>

              {/* Recruitment, Marketing, Finance Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800/80 pt-3">
                <div>
                  <Link to="/admin/recruitment/companies" className="font-bold text-white hover:text-blue-300 transition-colors flex items-center gap-1.5 mb-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" /> 💼 Recruitment
                  </Link>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <TreeLink to="/admin/recruitment/companies" label="Companies" />
                    <TreeLink to="/admin/recruitment/interview-pipeline" label="Pipeline" />
                    <TreeLink to="/admin/recruitment/resume-database" label="Resumes" />
                    <TreeLink to="/admin/recruitment/offer-letters" label="Offers" />
                  </div>
                </div>

                <div>
                  <Link to="/admin/marketing/newsletter" className="font-bold text-white hover:text-blue-300 transition-colors flex items-center gap-1.5 mb-1.5">
                    <Megaphone className="w-3.5 h-3.5 text-blue-400" /> 📣 Marketing
                  </Link>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <TreeLink to="/admin/newsletter" label="Newsletter" />
                    <TreeLink to="/admin/marketing/subscribers" label="Subscribers" />
                    <TreeLink to="/admin/seo" label="SEO Manager" />
                    <TreeLink to="/admin/marketing/campaigns" label="Campaigns" />
                  </div>
                </div>

                <div>
                  <Link to="/admin/finance/payments" className="font-bold text-white hover:text-blue-300 transition-colors flex items-center gap-1.5 mb-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-400" /> 💳 Finance
                  </Link>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <TreeLink to="/admin/finance/payments" label="Payments" />
                    <TreeLink to="/admin/finance/invoices" label="Invoices" />
                    <TreeLink to="/admin/finance/transactions" label="Transactions" />
                    <TreeLink to="/admin/finance/revenue" label="Revenue" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. CONTENT PILLAR */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5">
            <div className="flex items-center justify-between text-emerald-400 font-bold text-sm mb-4 border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> 📝 CONTENT PILLAR
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">CMS & Content Operations</span>
            </div>

            <div className="space-y-3 text-slate-300">
              <Link to="/admin/content/cms" className="font-bold text-white hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> 📝 CMS & Content Operations (/admin/content/*)
              </Link>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-[11px]">
                <TreeLink to="/admin/content/cms" label="CMS Engine (Payload)" color="emerald" />
                <TreeLink to="/admin/pages" label="Homepage & Page Builder" color="emerald" />
                <TreeLink to="/admin/content/landing-pages" label="Landing Pages" color="emerald" />
                <TreeLink to="/admin/blog" label="Blog & Categories" color="emerald" />
                <TreeLink to="/admin/gallery" label="Gallery & Media Library" color="emerald" />
                <TreeLink to="/admin/faq" label="Resources & FAQs" color="emerald" />
                <TreeLink to="/admin/navigation" label="Navigation & Footer" color="emerald" />
                <TreeLink to="/admin/content/forms-builder" label="Forms Builder & Popups" color="emerald" />
              </div>
            </div>
          </div>

          {/* 3. PLATFORM PILLAR */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5">
            <div className="flex items-center justify-between text-purple-400 font-bold text-sm mb-4 border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4" /> 🖥️ PLATFORM PILLAR
              </span>
              <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20">4 Platform Systems</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-300">
              <div>
                <Link to="/admin/settings" className="font-bold text-white hover:text-purple-300 transition-colors flex items-center gap-1.5 mb-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" /> 🖥️ System (/admin/system/*)
                </Link>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <TreeLink to="/admin/settings" label="Settings" color="purple" />
                  <TreeLink to="/admin/system/branding" label="Branding" color="purple" />
                  <TreeLink to="/admin/system/email" label="Email/SMTP" color="purple" />
                  <TreeLink to="/admin/system/system-health" label="Health" color="purple" />
                </div>
              </div>

              <div>
                <Link to="/admin/developer/api-explorer" className="font-bold text-white hover:text-purple-300 transition-colors flex items-center gap-1.5 mb-1.5">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" /> 🧑💻 Developer (/admin/developer/*)
                </Link>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <TreeLink to="/admin/developer/api-explorer" label="API Explorer" color="purple" />
                  <TreeLink to="/admin/developer/webhook-manager" label="Webhooks" color="purple" />
                  <TreeLink to="/admin/developer/sql-explorer" label="SQL Explorer" color="purple" />
                  <TreeLink to="/admin/developer/cron-jobs" label="Cron Jobs" color="purple" />
                </div>
              </div>

              <div>
                <Link to="/admin/ai-center/ai-dashboard" className="font-bold text-white hover:text-purple-300 transition-colors flex items-center gap-1.5 mb-1.5">
                  <Bot className="w-3.5 h-3.5 text-purple-400" /> 🤖 AI Center (/admin/ai-center/*)
                </Link>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <TreeLink to="/admin/ai-center/ai-search" label="AI Search" color="purple" />
                  <TreeLink to="/admin/ai-center/ai-chatbot" label="Chatbot" color="purple" />
                  <TreeLink to="/admin/ai-center/ai-moderation" label="Moderation" color="purple" />
                  <TreeLink to="/admin/ai-center/prompt-library" label="Prompts" color="purple" />
                </div>
              </div>

              <div>
                <Link to="/admin/analytics/dashboard" className="font-bold text-white hover:text-purple-300 transition-colors flex items-center gap-1.5 mb-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-purple-400" /> 📊 Analytics (/admin/analytics/*)
                </Link>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <TreeLink to="/admin/analytics/traffic" label="Traffic" color="purple" />
                  <TreeLink to="/admin/analytics/conversions" label="Conversions" color="purple" />
                  <TreeLink to="/admin/analytics/funnels" label="Funnels" color="purple" />
                  <TreeLink to="/admin/analytics/realtime" label="Realtime" color="purple" />
                </div>
              </div>
            </div>
          </div>

          {/* 4. PERSONAL PILLAR */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5">
            <div className="flex items-center justify-between text-amber-400 font-bold text-sm mb-4 border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" /> 👤 PERSONAL PILLAR
              </span>
              <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">Personal Account Settings</span>
            </div>

            <div className="space-y-3 text-slate-300">
              <Link to="/admin/personal/my-profile" className="font-bold text-white hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <UserCircle className="w-3.5 h-3.5 text-amber-400" /> 👤 Personal Account (/admin/personal/*)
              </Link>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <TreeLink to="/admin/personal/my-profile" label="My Profile (/admin/personal/my-profile)" color="amber" />
                <TreeLink to="/admin/personal/appearance" label="Appearance & Preferences" color="amber" />
                <TreeLink to="/admin/personal/security" label="Security & 2FA" color="amber" />
                <TreeLink to="/admin/personal/sessions" label="Active Sessions & Connected Accounts" color="amber" />
              </div>
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

function TreeLink({ to, label, color = "blue" }: { to: string; label: string; color?: string }) {
  const colorMap: Record<string, string> = {
    blue: "hover:bg-blue-500/20 text-slate-200 hover:text-blue-300 border-slate-800",
    emerald: "hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-300 border-slate-800",
    purple: "hover:bg-purple-500/20 text-slate-200 hover:text-purple-300 border-slate-800",
    amber: "hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border-slate-800",
  };

  return (
    <Link
      to={to}
      className={`px-2.5 py-1.5 rounded-lg bg-slate-950/70 border transition-all inline-flex items-center justify-between group ${
        colorMap[color] || colorMap.blue
      }`}
    >
      <span>{label}</span>
      <ChevronRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ml-1" />
    </Link>
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
        <span className="text-sm font-semibold text-[var(--brand-ink)]/85">{title}</span>
        <Icon className="h-5 w-5 text-[var(--brand-ink)]/60" />
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
