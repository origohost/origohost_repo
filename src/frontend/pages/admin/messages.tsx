import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, Loader2, Mail, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { queryKeys } from "@/lib/query-keys";

/**
 * /admin/messages
 *
 * Admin-only inbox for contact-form submissions. Inline auth + admin gate
 * (no _authenticated layout). Reads are gated by RLS so a non-admin who
 * somehow reaches this page still sees nothing.
 */
interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  handled: boolean;
  created_at: string;
}

async function fetchSubmissions(): Promise<Submission[]> {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("id, name, email, message, handled, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data ?? []) as Submission[];
}

export default function AdminMessagesPage() {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Realtime: refresh the list whenever a submission is inserted, updated,
  // or deleted. Scoped to admin sessions so RLS doesn't reject the channel.
  useEffect(() => {
    if (!user || !isAdmin) return;
    const channel = supabase
      .channel("contact_submissions_admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_submissions" },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: queryKeys.admin.table("contact_submissions") });
          if (payload.eventType === "INSERT") {
            const row = payload.new as { name?: string };
            toast.info(`New message from ${row.name ?? "someone"}`);
          }
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin, queryClient]);

  const query = useQuery({
    queryKey: queryKeys.admin.table("contact_submissions"),
    queryFn: fetchSubmissions,
    enabled: !!user && isAdmin,
  });

  async function toggleHandled(id: string, handled: boolean) {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ handled: !handled })
      .eq("id", id);
    if (error) return toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: queryKeys.admin.table("contact_submissions") });
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    queryClient.invalidateQueries({ queryKey: queryKeys.admin.table("contact_submissions") });
  }

  return (
    <AdminShell title="Contact submissions" description="Messages sent from the /contact form.">
      <div className="mb-6">
        <p className="text-sm text-[var(--brand-ink)]/60">
          {query.data ? `${query.data.length} message${query.data.length === 1 ? "" : "s"}` : "—"}
        </p>
      </div>

      {query.isLoading && (
        <div className="flex items-center gap-2 text-sm text-[var(--brand-ink)]/60">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}

      {query.isError && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load messages: {(query.error as Error).message}
        </p>
      )}

      {query.data && query.data.length === 0 && (
        <p className="rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-8 text-center text-sm text-[var(--brand-ink)]/60">
          No messages yet.
        </p>
      )}

      <ul className="space-y-3">
        {query.data?.map((s) => (
          <li
            key={s.id}
            className="rounded-2xl border border-[var(--brand-ink)]/10 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-[var(--brand-ink)]">{s.name}</p>
                  <a
                    href={`mailto:${s.email}`}
                    className="inline-flex items-center gap-1 text-sm text-[var(--brand-orange)] hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" /> {s.email}
                  </a>
                  {s.handled && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      <Check className="h-3 w-3" /> handled
                    </span>
                  )}
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--brand-ink)]/80">
                  {s.message}
                </p>
                <p className="mt-2 text-xs text-[var(--brand-ink)]/40">
                  {new Date(s.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <Button
                  size="sm"
                  variant={s.handled ? "outline" : "default"}
                  onClick={() => toggleHandled(s.id, s.handled)}
                >
                  {s.handled ? "Mark unhandled" : "Mark handled"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => remove(s.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
