import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "partners",
  singular: "partner",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "type", label: "Type (e.g., logo, institute)", type: "text", defaultValue: "logo" },
    { key: "domain", label: "Domain (for Logo.dev)", type: "text" },
    { key: "image_url", label: "Custom Image URL", type: "text" },
    { key: "published", label: "Published", type: "boolean", defaultValue: true },
    { key: "sort_order", label: "Sort order", type: "number", defaultValue: 0 },
  ],
  listColumns: [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "domain", label: "Domain" },
    { key: "published", label: "Live" },
  ],
};

export default function AdminPartnersPage() {
  return (
    <AdminShell
      title="Partners"
      description="Manage the hiring partners, universities, and sponsors."
    >
      <AdminCrud config={config} />
    </AdminShell>
  );
}
