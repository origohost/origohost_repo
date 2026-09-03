import { AdminShell } from "@/components/layout/admin-shell";
import { Hammer, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function PlaceholderModule({
  workspace,
  moduleName,
  description,
}: {
  workspace: string;
  moduleName: string;
  description?: string;
}) {
  return (
    <AdminShell
      title={moduleName}
      description={description || `Manage ${moduleName} for the ${workspace} workspace.`}
    >
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-[var(--brand-ink)]/5 text-[var(--brand-ink)] mb-6 shadow-sm border border-[var(--brand-ink)]/10">
          <Hammer className="h-10 w-10 opacity-70" />
        </div>

        <h2 className="text-2xl font-black text-[var(--brand-ink)] mb-2">Module In Development</h2>
        <p className="max-w-md text-[var(--brand-ink)]/60 mb-8 leading-relaxed">
          The <strong>{moduleName}</strong> interface is currently being scaffolded. The routing,
          permissions, and layout are established. Business logic will be implemented in future
          phases.
        </p>
        <div className="flex gap-4">
          <Button
            asChild
            variant="outline"
            className="border-[var(--brand-ink)]/20 text-[var(--brand-ink)]"
          >
            <Link to="/admin">Return to Dashboard</Link>
          </Button>
          <Button
            asChild
            className="bg-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/90 text-white gap-2"
          >
            <Link to="/admin/settings">
              System Settings <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </AdminShell>
  );
}
