import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "testimonials",
  singular: "testimonial",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "role", label: "Role", type: "text" },
    { key: "quote", label: "Quote", type: "textarea", required: true },
    { key: "avatar_url", label: "Avatar URL", type: "text" },
    { key: "rating", label: "Rating (1-5)", type: "number", defaultValue: 5 },
    { key: "published", label: "Published", type: "boolean", defaultValue: true },
    { key: "sort_order", label: "Sort order", type: "number", defaultValue: 0 },
  ],
  listColumns: [
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    { key: "rating", label: "Rating" },
    { key: "published", label: "Live" },
  ],
};

export default function AdminTestimonialsPage() {
  return (
    <AdminShell title="Testimonials" description="Manage community reviews and success stories.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
