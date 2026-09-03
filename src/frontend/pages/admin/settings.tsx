import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "settings",
  singular: "setting",
  fields: [
    { key: "id", label: "ID (Unique)", type: "text", required: true, defaultValue: "global" },
    { key: "site_name", label: "Site Name", type: "text", required: true },
    { key: "support_email", label: "Support Email", type: "text", required: true },
    { key: "maintenance_mode", label: "Maintenance Mode", type: "boolean", defaultValue: false },
  ],
  listColumns: [
    { key: "id", label: "Configuration Key" },
    { key: "site_name", label: "Site Name" },
    { key: "support_email", label: "Support Email" },
    { key: "maintenance_mode", label: "Maintenance Mode" },
  ],
};

export default function AdminSettingsPage() {
  return (
    <AdminShell
      title="Global Settings"
      description="Configure platform-wide variables and branding."
    >
      <AdminCrud config={config} />
    </AdminShell>
  );
}
