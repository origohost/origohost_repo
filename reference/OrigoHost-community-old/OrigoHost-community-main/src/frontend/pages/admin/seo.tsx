import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "seo_redirects",
  singular: "redirect",
  fields: [
    { key: "source_path", label: "Source Path (e.g. /old-page)", type: "text", required: true },
    { key: "destination_url", label: "Destination URL", type: "text", required: true },
    { key: "permanent", label: "Is Permanent (301)", type: "boolean", defaultValue: true },
    { key: "active", label: "Is Active", type: "boolean", defaultValue: true },
  ],
  listColumns: [
    { key: "source_path", label: "Source" },
    { key: "destination_url", label: "Destination" },
    { key: "permanent", label: "301" },
    { key: "active", label: "Active" },
  ],
};

export default function AdminSeoPage() {
  return (
    <AdminShell
      title="SEO Manager"
      description="Manage URL redirects for marketing campaigns and legacy routes."
    >
      <AdminCrud config={config} />
    </AdminShell>
  );
}
