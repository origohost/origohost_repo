import { SITE_CONFIG } from "@/config/site";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Plus, Calendar, MapPin, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function DashboardProposalsPage() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProposals() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("host_requests")
          .select(
            `
            *,
            organizations (
              name
            )
          `,
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProposals(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProposals();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
      case "Reviewing":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Meeting Scheduled":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Approved":
        return "bg-green-50 text-green-600 border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-600 border-red-200";
      case "Completed":
        return "bg-[var(--brand-ink)]/5 text-[var(--brand-ink)] border-[var(--brand-ink)]/10";
      default:
        return "bg-zinc-100 text-zinc-600";
    }
  };

  return (
    <DashboardShell
      title="My Proposals"
      description="Track the status of your event hosting requests."
    >
      <div className="flex justify-end mb-6">
        <Button
          asChild
          className="bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white"
        >
          <Link to="/host/apply">
            <Plus className="mr-2 h-4 w-4" /> New Proposal
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-orange)]" />
        </div>
      ) : proposals.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-[var(--brand-ink)]/5 shadow-sm">
          <div className="h-16 w-16 bg-[var(--brand-ink)]/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-[var(--brand-ink)]/30" />
          </div>
          <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-2">No proposals yet</h3>
          <p className="text-[var(--brand-ink)]/60 mb-6">
            You haven't submitted any event proposals.
          </p>
          <Button asChild variant="outline" className="border-[var(--brand-ink)]/20">
            <Link to="/host/apply">Submit a Proposal</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-2xl p-6 md:p-8 border border-[var(--brand-ink)]/5 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-[var(--brand-ink)]/50 uppercase tracking-wider">
                      {prop.request_number}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(prop.status)}`}
                    >
                      {prop.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[var(--brand-ink)] mb-1">
                    {prop.event_name}
                  </h3>
                  <p className="text-[var(--brand-ink)]/60 font-medium">
                    {prop.organizations?.name}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium text-[var(--brand-ink)]/40 mb-1">
                    Submitted on
                  </div>
                  <div className="text-[var(--brand-ink)]/80 flex items-center justify-end gap-1 font-medium">
                    <Clock className="h-4 w-4" />
                    {format(new Date(prop.created_at), "MMM d, yyyy")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-[var(--brand-ink)]/5 mb-6">
                <div>
                  <div className="text-xs text-[var(--brand-ink)]/50 font-bold uppercase mb-1">
                    Format
                  </div>
                  <div className="font-medium text-[var(--brand-ink)]">
                    {prop.format} {prop.event_type}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--brand-ink)]/50 font-bold uppercase mb-1">
                    Date
                  </div>
                  <div className="font-medium text-[var(--brand-ink)]">
                    {prop.expected_date
                      ? format(new Date(prop.expected_date), "MMM d, yyyy")
                      : "TBD"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--brand-ink)]/50 font-bold uppercase mb-1">
                    Location
                  </div>
                  <div className="font-medium text-[var(--brand-ink)] flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {prop.venue || "TBD"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--brand-ink)]/50 font-bold uppercase mb-1">
                    Expected
                  </div>
                  <div className="font-medium text-[var(--brand-ink)]">
                    {prop.seats || "TBD"} attendees
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" className="border-[var(--brand-ink)]/20" asChild>
                  <a
                    href={`mailto:\${SITE_CONFIG.emails.partnerships}?subject=Regarding ${prop.request_number}`}
                  >
                    Contact Support
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  className="text-[var(--brand-blue)] hover:bg-[var(--brand-blue)]/5 hover:text-[var(--brand-blue)]"
                >
                  View Details <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
