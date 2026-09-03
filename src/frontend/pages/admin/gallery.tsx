import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "gallery_images",
  singular: "gallery image",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "image_url", label: "Image URL", type: "text", required: true },
    { key: "category", label: "Category", type: "text", required: true },
    { key: "is_featured", label: "Featured", type: "boolean", defaultValue: false },
    { key: "sort_order", label: "Sort order", type: "number", defaultValue: 0 },
  ],
  listColumns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "is_featured", label: "Featured" },
  ],
};

export default function AdminGalleryPage() {
  return (
    <AdminShell title="Gallery" description="Create and edit gallery items.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
