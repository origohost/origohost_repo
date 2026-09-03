import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { m as motion } from "framer-motion";
import { Trophy, Users, Calendar, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AmbassadorProfile {
  xp: number;
  level: number;
  events_hosted: number;
  members_referred: number;
  college: string;
}

export default function AmbassadorDashboardPage() {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<AmbassadorProfile | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: "/ambassador" } });
      return;
    }

    // In production, we enforce this server-side via RLS and middleware
    if (
      !roles.includes("ambassador") &&
      !roles.includes("admin") &&
      !roles.includes("super_admin")
    ) {
      navigate({ to: "/dashboard" });
      return;
    }

    const loadProfile = async () => {
      const { data } = await supabase
        .from("ambassador_profiles_v2")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setProfile(data as AmbassadorProfile);
      }
    };

    loadProfile();
  }, [user, roles, isLoading, navigate]);

  if (isLoading || !user) return null;

  return (
    <DashboardShell
      title="Ambassador Portal"
      description={`Welcome back, ${user.user_metadata?.full_name || "Ambassador"}!`}
    >
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[var(--brand-ink)] to-gray-900 rounded-[2rem] p-8 sm:p-12 mb-8 relative overflow-hidden text-white"
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm font-medium mb-4 backdrop-blur-md">
              <Trophy className="h-4 w-4 text-[var(--brand-orange)]" /> Level {profile?.level || 1}{" "}
              Ambassador
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-2">
              {user.user_metadata?.full_name || "Campus Ambassador"}
            </h2>
            <p className="text-white/60 text-lg">
              {profile?.college || "Assigned College Pending"}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center min-w-[150px]">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">
              Total XP
            </p>
            <p className="text-4xl font-black text-[var(--brand-orange)]">{profile?.xp || 0}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Events Hosted",
            value: profile?.events_hosted || 0,
            icon: Calendar,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: "Members Joined",
            value: profile?.members_referred || 0,
            icon: Users,
            color: "text-green-500",
            bg: "bg-green-500/10",
          },
          {
            label: "Certificates",
            value: profile ? (profile as any).certificates?.length || 0 : 0,
            icon: Award,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
          {
            label: "Pending Swag",
            value: profile
              ? (profile as any).swags?.filter((s: any) => s.status === "pending").length || 0
              : 0,
            icon: Trophy,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[var(--brand-ink)]/5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-4 ${stat.bg}`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <p className="text-2xl font-black text-[var(--brand-ink)]">{stat.value}</p>
            <p className="text-sm font-medium text-[var(--brand-ink)]/60">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-[var(--brand-ink)]/5 shadow-sm">
          <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-6">Recent Activity</h3>
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-16 w-16 bg-[var(--brand-ink)]/5 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-[var(--brand-ink)]/40" />
            </div>
            <p className="text-[var(--brand-ink)]/60 font-medium">No recent activity yet.</p>
            <Button variant="outline" className="mt-4 rounded-xl border-[var(--brand-ink)]/10">
              Host your first event
            </Button>
          </div>
        </div>

        <div className="bg-[var(--brand-ink)] text-white p-8 rounded-[2rem] shadow-sm relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-orange)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h3 className="text-xl font-bold mb-4 relative z-10">Referral Link</h3>
          <p className="text-white/60 text-sm mb-6 relative z-10">
            Invite students to join OrigoHOST using your unique link to earn XP and rewards.
          </p>
          <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center justify-between relative z-10">
            <span className="text-sm font-mono truncate mr-2">
              origohost.com/join/{user.id.substring(0, 8)}
            </span>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white text-[var(--brand-ink)] hover:bg-gray-100"
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
