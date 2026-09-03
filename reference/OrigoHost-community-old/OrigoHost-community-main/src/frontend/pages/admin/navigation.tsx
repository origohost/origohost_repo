import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "navigation_links",
  singular: "navigation link",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { key: "label", label: "Label", type: "text", required: true },
    { key: "url", label: "URL (Path)", type: "text", required: true, placeholder: "/about" },
    {
      key: "location",
      label: "Location (header/footer/both)",
      type: "text",
      defaultValue: "header",
    },
    { key: "parent_id", label: "Parent ID (for dropdowns)", type: "text" },
    { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
    { key: "published", label: "Published", type: "boolean", defaultValue: true },
  ],
  listColumns: [
    { key: "label", label: "Label" },
    { key: "location", label: "Location" },
    { key: "url", label: "URL" },
    { key: "published", label: "Live" },
  ],
};

export default function AdminNavigationPage() {
  return (
    <AdminShell title="Navigation" description="Create and organize header and footer links.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
