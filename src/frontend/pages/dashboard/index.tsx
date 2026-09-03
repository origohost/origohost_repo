import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarDays,
  Mail,
  Calendar,
  CheckCircle2,
  LayoutDashboard,
  Clock,
  Target,
  ArrowRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { m as motion, Variants } from "framer-motion";

const data = [
  { name: "Jan", events: 1 },
  { name: "Feb", events: 2 },
  { name: "Mar", events: 1 },
  { name: "Apr", events: 4 },
  { name: "May", events: 2 },
  { name: "Jun", events: 5 },
  { name: "Jul", events: 3 },
];

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/login" });
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: registrations, isLoading: loadingRegs } = useQuery({
    queryKey: ["user-registrations", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("event_registrations")
        .select(
          `
          id, 
          status, 
          registered_at,
          events (
            id,
            title,
            starts_at,
            mode,
            location
          )
        `,
        )
        .eq("user_id", user.id)
        .order("registered_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: attendance, isLoading: loadingAttendance } = useQuery({
    queryKey: ["user-attendance", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("event_attendance")
        .select("id")
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) return null;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const xpScore = (registrations?.length || 0) * 10 + (attendance?.length || 0) * 20;
  const currentLevel = Math.floor(xpScore / 100) + 1;
  const xpForNextLevel = currentLevel * 100;
  const progressPercent = (xpScore / xpForNextLevel) * 100;

  return (
    <DashboardShell
      title="Welcome to your Dashboard"
      description="Track your community progress and event registrations."
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8 pb-12 relative z-10"
      >
        {/* Profile Completion Banner - Premium */}
        <motion.div
          variants={itemAnim}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900 via-purple-900 to-[#0f172a] p-6 md:p-10 text-white shadow-2xl border border-white/10"
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
            <div className="space-y-2 md:space-y-3">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                Complete your profile
              </h2>
              <p className="text-purple-100/80 max-w-lg text-base md:text-lg font-medium leading-relaxed">
                Add your GitHub, LinkedIn, and portfolio to unlock the{" "}
                <span className="text-white font-bold">"Verified Member"</span> badge and earn 50
                XP.
              </p>
            </div>
            <button className="w-full md:w-auto whitespace-nowrap rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-6 md:px-8 py-3 md:py-3.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Update Profile
            </button>
          </div>
          {/* Glassmorphism decorative circles */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/30 blur-[80px]" />
          <div className="absolute -bottom-32 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[80px]" />
        </motion.div>

        {/* Profile & XP Header - Premium Dark Card */}
        <motion.div
          variants={itemAnim}
          className="relative flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8 bg-gray-900 overflow-hidden p-6 md:p-10 rounded-[2rem] border border-gray-800 shadow-2xl group"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-500/20 transition-colors duration-700" />

          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 blur opacity-70"></div>
            <Avatar className="relative h-24 w-24 lg:h-32 lg:w-32 border-4 border-gray-900 shadow-2xl">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white text-5xl font-black">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="relative z-10 flex-1 text-center lg:text-left space-y-4 w-full">
            <h1 className="text-2xl lg:text-4xl font-black tracking-tight text-white">
              {user.user_metadata?.full_name || "Welcome back!"}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 lg:gap-8 text-gray-400">
              <span className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Mail className="h-4 w-4 text-blue-400" />
                {user.email}
              </span>
              <span className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <CalendarDays className="h-4 w-4 text-green-400" />
                Member since {format(new Date(user.created_at), "MMM yyyy")}
              </span>
            </div>

            {/* XP Progress Bar */}
            <div className="pt-6 max-w-2xl w-full mx-auto lg:mx-0">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-black text-white flex items-center gap-2 tracking-wide uppercase">
                  Level {currentLevel} <Target className="h-4 w-4 text-cyan-400" />
                </span>
                <span className="text-xs font-bold text-gray-400 tracking-wider">
                  {xpScore} / {xpForNextLevel} XP
                </span>
              </div>
              <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid - Premium Minimal */}
        <motion.div variants={itemAnim} className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 hide-scrollbar">
          <Card className="snap-center shrink-0 w-[75vw] md:w-auto border-gray-100 shadow-[var(--shadow-soft)] bg-white rounded-3xl hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50 mb-4">
              <CardTitle className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Registered Events
              </CardTitle>
              <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                <Calendar className="h-5 w-5 text-blue-500 group-hover:text-white transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              {loadingRegs ? (
                <Skeleton className="h-10 w-16" />
              ) : (
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600">
                  {registrations?.length || 0}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="snap-center shrink-0 w-[75vw] md:w-auto border-gray-100 shadow-[var(--shadow-soft)] bg-white rounded-3xl hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50 mb-4">
              <CardTitle className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Events Attended
              </CardTitle>
              <div className="h-10 w-10 rounded-2xl bg-green-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500 transition-all duration-300">
                <CheckCircle2 className="h-5 w-5 text-green-500 group-hover:text-white transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              {loadingAttendance ? (
                <Skeleton className="h-10 w-16" />
              ) : (
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600">
                  {attendance?.length || 0}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="snap-center shrink-0 w-[75vw] md:w-auto border-gray-100 shadow-[var(--shadow-soft)] bg-white rounded-3xl hover:shadow-lg transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-50 mb-4">
              <CardTitle className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Community Rank
              </CardTitle>
              <div className="h-10 w-10 rounded-2xl bg-purple-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 transition-all duration-300">
                <LayoutDashboard className="h-5 w-5 text-purple-500 group-hover:text-white transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600">
                #42
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemAnim} className="grid gap-8 md:grid-cols-7">
          {/* Chart Section */}
          <Card className="md:col-span-4 border-gray-100 shadow-[var(--shadow-soft)] bg-white rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-gray-50 bg-gray-50/50 p-6">
              <CardTitle className="text-lg font-black text-gray-900">Activity Overview</CardTitle>
              <CardDescription className="font-medium text-gray-500">
                Your event registrations over time
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[320px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis
                      dataKey="name"
                      stroke="#9ca3af"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dx={-10}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        border: "1px solid #f3f4f6",
                        boxShadow:
                          "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
                        fontWeight: "bold",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="events"
                      stroke="#3b82f6"
                      strokeWidth={4}
                      activeDot={{ r: 8, fill: "#3b82f6", stroke: "#fff", strokeWidth: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Registrations List */}
          <Card className="md:col-span-3 border-gray-100 shadow-[var(--shadow-soft)] bg-white rounded-3xl flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 bg-gray-50/50 p-6">
              <div>
                <CardTitle className="text-lg font-black text-gray-900">Recent Activity</CardTitle>
                <CardDescription className="font-medium text-gray-500">
                  Your latest event sign-ups
                </CardDescription>
              </div>
              <button className="h-10 w-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-100 hover:bg-blue-50 transition-all">
                <ArrowRight className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <div className="space-y-4">
                {loadingRegs ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-4 p-4 border border-gray-50 rounded-2xl"
                    >
                      <Skeleton className="h-12 w-12 rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[180px]" />
                        <Skeleton className="h-3 w-[120px]" />
                      </div>
                    </div>
                  ))
                ) : registrations?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center h-full space-y-4 text-gray-400 py-12">
                    <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="font-medium text-sm">No event registrations yet.</p>
                  </div>
                ) : (
                  registrations?.slice(0, 4).map((reg) => (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      key={reg.id}
                      className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <p className="text-sm font-bold text-gray-900 line-clamp-1">
                          {/* @ts-ignore */}
                          {(reg.events as any)?.title || "Unknown Event"}
                        </p>
                        <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-blue-400" />
                          {/* @ts-ignore */}
                          {(reg.events as any)?.starts_at
                            ? format(new Date((reg.events as any).starts_at), "MMM d, yyyy")
                            : "TBD"}
                        </p>
                      </div>
                      <div className="flex items-center ml-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-black shadow-sm ${
                            reg.status === "registered"
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : reg.status === "attended"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardShell>
  );
}
