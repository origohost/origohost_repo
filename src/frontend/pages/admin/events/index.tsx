import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";

const config: CrudConfig = {
  table: "events_v2",
  singular: "event",
  orderBy: { column: "date", ascending: false },
  fields: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "slug", label: "Slug", type: "text", required: true },
    { key: "short_description", label: "Short Description", type: "textarea", required: true },
    { key: "long_description", label: "Long Description (Markdown)", type: "textarea" },
    { key: "banner_url", label: "Banner Image URL", type: "image" },
    { key: "thumbnail_url", label: "Thumbnail Image URL", type: "image" },
    { key: "date", label: "Date", type: "date", required: true },
    { key: "start_time", label: "Start Time", type: "time", required: true },
    { key: "end_time", label: "End Time", type: "time", required: true },
    { key: "timezone", label: "Timezone", type: "text", defaultValue: "UTC" },
    {
      key: "mode",
      label: "Mode",
      type: "select",
      required: true,
      options: ["online", "offline", "hybrid"],
    },
    { key: "venue_name", label: "Venue Name", type: "text" },
    { key: "address", label: "Address", type: "text" },
    { key: "google_maps_link", label: "Google Maps Link", type: "text" },
    { key: "price", label: "Price (₹)", type: "number", defaultValue: 0 },
    { key: "max_seats", label: "Maximum Seats", type: "number" },
    { key: "category", label: "Category", type: "text" },
    { key: "is_published", label: "Published", type: "boolean", defaultValue: false },
  ],
  listColumns: [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "date", label: "Date" },
    { key: "mode", label: "Mode", format: (v) => String(v).toUpperCase() },
    { key: "is_published", label: "Live" },
  ],
};

export default function AdminEventsPage() {
  return (
    <AdminShell title="Events V2" description="Create and edit Enterprise Events.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
