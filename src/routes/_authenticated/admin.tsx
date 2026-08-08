import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { PortalShell, StatCard } from "@/components/portal/portal-shell";
import { getAdminOverview, getMyPortal } from "@/lib/portal.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — OrigoHOST" },
      { name: "description", content: "Platform overview for OrigoHOST administrators." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const fetchPortal = useServerFn(getMyPortal);
  const fetchOverview = useServerFn(getAdminOverview);
  const { data: portal } = useQuery({ queryKey: ["portal", "me"], queryFn: () => fetchPortal() });
  const { data, isLoading, error } = useQuery({ queryKey: ["admin", "overview"], queryFn: () => fetchOverview() });

  return (
    <PortalShell
      title="Admin Portal"
      description="Platform-wide operations across members, events, chapters and partnerships."
      roles={portal?.roles ?? []}
    >
      {error ? (
        <p className="text-sm text-muted-foreground">You don't have access to the admin portal.</p>
      ) : isLoading ? (
        <p className="text-sm text-muted-foreground">Loading overview…</p>
      ) : (
        <div className="grid gap-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Members" value={data?.metrics.members ?? 0} />
            <StatCard label="Upcoming events" value={data?.metrics.upcomingEvents ?? 0} />
            <StatCard label="Chapters" value={data?.metrics.chapters ?? 0} />
            <StatCard label="Open leads" value={data?.metrics.openLeads ?? 0} />
          </div>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Recent activity</h2>
            {data?.recentAudit?.length ? (
              <ul className="mt-3 grid gap-2">
                {data.recentAudit.map((entry: any) => (
                  <li key={entry.id} className="rounded-2xl border border-hairline bg-card p-4 text-sm">
                    <span className="font-medium text-foreground">{entry.action}</span>{" "}
                    <span className="text-muted-foreground">
                      on {entry.entity_type} · {new Date(entry.created_at).toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">No recorded activity yet.</p>
            )}
          </section>
        </div>
      )}
    </PortalShell>
  );
}
