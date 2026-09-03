import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "audit_logs",
  singular: "log",
  orderBy: { column: "created_at", ascending: false },
  readonly: true, // Enterprise feature: Logs are strictly read-only
  fields: [],
  listColumns: [
    { key: "actor_email", label: "Actor" },
    { key: "action", label: "Action Taken" },
    { key: "entity", label: "Entity" },
    { key: "ip_address", label: "IP Address" },
    {
      key: "created_at",
      label: "Timestamp",
      format: (v) => (v ? new Date(String(v)).toLocaleString() : "—"),
    },
  ],
};

export default function AdminAuditPage() {
  return (
    <AdminShell
      title="Security & Audit Logs"
      description="Immutable ledger of all administrative and destructive actions taken on the platform."
    >
      <AdminCrud config={config} />
    </AdminShell>
  );
}
