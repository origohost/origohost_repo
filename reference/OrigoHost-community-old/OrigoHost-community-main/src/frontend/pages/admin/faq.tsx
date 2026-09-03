import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "faq_items",
  singular: "FAQ item",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { key: "question", label: "Question", type: "text", required: true },
    { key: "answer", label: "Answer", type: "textarea", required: true },
    { key: "category", label: "Category", type: "text" },
    { key: "published", label: "Published", type: "boolean", defaultValue: true },
    { key: "sort_order", label: "Sort order", type: "number", defaultValue: 0 },
  ],
  listColumns: [
    { key: "question", label: "Question" },
    { key: "category", label: "Category" },
    { key: "published", label: "Live" },
  ],
};

export default function AdminFaqPage() {
  return (
    <AdminShell title="FAQ" description="Create and edit frequently asked questions.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
