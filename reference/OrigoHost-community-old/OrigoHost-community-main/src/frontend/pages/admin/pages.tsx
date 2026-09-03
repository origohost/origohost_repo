import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "pages",
  singular: "page",
  orderBy: { column: "slug", ascending: true },
  fields: [
    { key: "slug", label: "Slug", type: "text", required: true, placeholder: "about" },
    { key: "title", label: "Title", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "seo_metadata", label: "SEO Metadata (JSON)", type: "textarea", defaultValue: "{}" },
  ],
  listColumns: [
    { key: "slug", label: "Slug" },
    { key: "title", label: "Title" },
  ],
};

export default function AdminPagesPage() {
  return (
    <AdminShell title="Pages" description="Create and edit core pages and their SEO metadata.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
