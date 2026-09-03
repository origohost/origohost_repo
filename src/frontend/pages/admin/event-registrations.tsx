import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "event_registrations",
  singular: "registration",
  orderBy: { column: "created_at", ascending: false },
  fields: [
    { key: "event_id", label: "Event ID (UUID)", type: "text", required: true },
    { key: "user_id", label: "User ID (UUID)", type: "text", required: true },
    {
      key: "status",
      label: "Status (confirmed/waitlisted/cancelled)",
      type: "text",
      defaultValue: "confirmed",
    },
  ],
  listColumns: [
    { key: "event_id", label: "Event" },
    { key: "user_id", label: "User" },
    { key: "status", label: "Status" },
  ],
};

export default function AdminEventRegistrationsPage() {
  return (
    <AdminShell title="Event RSVPs" description="Track and manage event registrations.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
