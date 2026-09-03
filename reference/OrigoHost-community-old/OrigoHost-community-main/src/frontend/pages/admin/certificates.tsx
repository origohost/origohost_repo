import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "certificates",
  singular: "certificate",
  orderBy: { column: "created_at", ascending: false },
  fields: [
    { key: "recipient_name", label: "Recipient Name", type: "text", required: true },
    { key: "user_id", label: "User ID (Optional UUID)", type: "text" },
    { key: "event_name", label: "Event/Course Name", type: "text", required: true },
    {
      key: "issue_date",
      label: "Issue Date",
      type: "datetime",
      defaultValue: new Date().toISOString(),
    },
  ],
  listColumns: [
    { key: "recipient_name", label: "Recipient" },
    { key: "event_name", label: "Event" },
    {
      key: "issue_date",
      label: "Issued On",
      format: (v) => (v ? new Date(String(v)).toLocaleDateString() : "—"),
    },
  ],
};

export default function AdminCertificatesPage() {
  return (
    <AdminShell
      title="Certificates"
      description="Issue verifiable certificates to students and attendees."
    >
      <AdminCrud config={config} />
    </AdminShell>
  );
}
