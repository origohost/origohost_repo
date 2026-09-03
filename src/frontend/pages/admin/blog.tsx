import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "blog_posts",
  singular: "post",
  orderBy: { column: "published_at", ascending: false },
  fields: [
    { key: "slug", label: "Slug", type: "text", required: true, placeholder: "my-first-post" },
    { key: "title", label: "Title", type: "text", required: true },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "body", label: "Body (Markdown)", type: "textarea", required: true },
    { key: "cover_url", label: "Cover image URL", type: "text" },
    { key: "published_at", label: "Publish at (leave empty = draft)", type: "datetime" },
  ],
  listColumns: [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    {
      key: "published_at",
      label: "Published",
      format: (v) => (v ? new Date(String(v)).toLocaleString() : "Draft"),
    },
  ],
};

export default function AdminBlogPage() {
  return (
    <AdminShell title="Blog" description="Create and edit blog posts.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
