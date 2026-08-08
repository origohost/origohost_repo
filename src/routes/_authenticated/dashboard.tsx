import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { PortalShell, StatCard } from "@/components/portal/portal-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyPortal } from "@/lib/portal.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Member Dashboard — OrigoHOST" },
      { name: "description", content: "Your OrigoHOST member workspace." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function DashboardPage() {
  const fetchPortal = useServerFn(getMyPortal);
  const { data, isLoading } = useQuery({ queryKey: ["portal", "me"], queryFn: () => fetchPortal() });

  const firstName = (data?.profile?.full_name ?? "").split(" ")[0];

  return (
    <PortalShell
      title={firstName ? `Welcome, ${firstName}` : "Welcome"}
      description="Your membership, participation and recognition in one place."
      roles={data?.roles ?? []}
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading your workspace…</p>
      ) : (
        <div className="grid gap-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard label="Registrations" value={data?.registrations.length ?? 0} />
            <StatCard label="Certificates" value={data?.certificates.length ?? 0} />
            <StatCard label="Chapters" value={data?.chapters.length ?? 0} />
          </div>

          {!data?.profile?.onboarded_at ? (
            <section className="rounded-2xl border border-hairline bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Complete your member profile</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your skills, interests and organisation so we can match you with the right programs,
                mentors and opportunities.
              </p>
              <Button asChild className="mt-4">
                <Link to="/profile">Complete profile</Link>
              </Button>
            </section>
          ) : null}

          <section>
            <h2 className="text-lg font-semibold text-foreground">My registrations</h2>
            {data?.registrations.length ? (
              <ul className="mt-3 grid gap-2">
                {data.registrations.map((r: any) => (
                  <li key={r.id} className="rounded-2xl border border-hairline bg-card p-4">
                    <p className="font-medium text-foreground">{r.events?.title ?? "Event"}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(r.events?.starts_at)} · {r.events?.mode ?? ""}
                      {r.attended ? " · Attended" : ""}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't registered for an event yet.{" "}
                <Link to="/events" className="underline underline-offset-4">
                  Browse events
                </Link>
                .
              </p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">My certificates</h2>
            {data?.certificates.length ? (
              <ul className="mt-3 grid gap-2">
                {data.certificates.map((c: any) => (
                  <li key={c.id} className="rounded-2xl border border-hairline bg-card p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">{c.event_title}</p>
                      <Badge variant="secondary">{String(c.type).replace("_", " ")}</Badge>
                      {c.revoked_at ? <Badge variant="destructive">Revoked</Badge> : null}
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">{c.certificate_number}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Certificates appear here once your attendance is confirmed.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">My community roles</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(data?.roles ?? []).map((role) => (
                <Badge key={role} variant="outline">
                  {role.replace(/_/g, " ")}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      )}
    </PortalShell>
  );
}
