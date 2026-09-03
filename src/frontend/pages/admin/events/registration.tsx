import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "event_registrations_v2",
  singular: "registration",
  orderBy: { column: "created_at", ascending: false },
  fields: [
    { key: "event_id", label: "Event ID", type: "text", required: true },
    { key: "user_id", label: "User ID", type: "text", required: true },
    {
      key: "status",
      label: "Status",
      type: "select",
      required: true,
      options: ["confirmed", "waitlisted", "cancelled"],
      defaultValue: "confirmed",
    },
    { key: "checked_in", label: "Checked In", type: "boolean", defaultValue: false },
    { key: "ticket_id", label: "Ticket ID", type: "text" },
  ],
  listColumns: [
    { key: "event_id", label: "Event ID" },
    { key: "user_id", label: "User ID" },
    { key: "status", label: "Status", format: (v) => String(v).toUpperCase() },
    { key: "checked_in", label: "Checked In" },
    {
      key: "created_at",
      label: "Registered At",
      format: (v) => new Date(String(v)).toLocaleString(),
    },
  ],
};

export default function AdminEventsRegistrationPage() {
  return (
    <AdminShell
      title="Event Registrations V2"
      description="Manage attendees, waitlists, and check-ins."
    >
      <AdminCrud config={config} />
    </AdminShell>
  );
}
