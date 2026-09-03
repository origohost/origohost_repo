import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "job_applications",
  singular: "application",
  orderBy: { column: "created_at", ascending: false },
  fields: [
    { key: "job_id", label: "Job ID (UUID)", type: "text", required: true },
    { key: "user_id", label: "User ID (UUID)", type: "text", required: true },
    { key: "portfolio_url", label: "Portfolio URL", type: "text" },
    {
      key: "status",
      label: "Status (pending/reviewed/rejected/accepted)",
      type: "text",
      defaultValue: "pending",
    },
  ],
  listColumns: [
    { key: "job_id", label: "Job ID" },
    { key: "user_id", label: "Applicant ID" },
    { key: "status", label: "Status" },
  ],
};

export default function AdminJobApplicationsPage() {
  return (
    <AdminShell
      title="Job Applications"
      description="Review candidates and update application statuses."
    >
      <AdminCrud config={config} />
    </AdminShell>
  );
}
