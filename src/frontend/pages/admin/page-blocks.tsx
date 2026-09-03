import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "page_blocks",
  singular: "page block",
  orderBy: { column: "sort_order", ascending: true },
  fields: [
    { key: "page_id", label: "Page ID (UUID)", type: "text", required: true },
    { key: "block_type", label: "Block Type (e.g. hero, features)", type: "text", required: true },
    {
      key: "content_jsonb",
      label: "Content JSON",
      type: "textarea",
      required: true,
      defaultValue: "{}",
    },
    { key: "sort_order", label: "Sort Order", type: "number", defaultValue: 0 },
  ],
  listColumns: [
    { key: "page_id", label: "Page ID" },
    { key: "block_type", label: "Block Type" },
  ],
};

export default function AdminPageBlocksPage() {
  return (
    <AdminShell title="Page Blocks" description="Edit JSON payloads for specific page blocks.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
