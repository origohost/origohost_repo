import { AdminShell } from "@/components/layout/admin-shell";
import { AdminCrud, type CrudConfig } from "@/components/admin/admin-crud";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const subscribersConfig: CrudConfig = {
  table: "newsletter_subscribers",
  singular: "subscriber",
  orderBy: { column: "subscribed_at", ascending: false },
  fields: [
    { key: "email", label: "Email Address", type: "text", required: true },
    {
      key: "status",
      label: "Status",
      type: "select",
      required: true,
      options: ["active", "unsubscribed"],
    },
  ],
  listColumns: [
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
    {
      key: "subscribed_at",
      label: "Subscribed Date",
      format: (v) => (v ? new Date(String(v)).toLocaleDateString() : "—"),
    },
  ],
};

const campaignsConfig: CrudConfig = {
  table: "newsletter_campaigns",
  singular: "campaign",
  orderBy: { column: "created_at", ascending: false },
  fields: [
    { key: "subject", label: "Campaign Subject", type: "text", required: true },
    { key: "content", label: "Content (HTML/Markdown)", type: "textarea", required: true },
    { key: "status", label: "Status", type: "select", required: true, options: ["draft", "sent"] },
    { key: "sent_at", label: "Sent At", type: "datetime" },
  ],
  listColumns: [
    { key: "subject", label: "Subject" },
    { key: "status", label: "Status" },
    {
      key: "sent_at",
      label: "Sent At",
      format: (v) => (v ? new Date(String(v)).toLocaleDateString() : "—"),
    },
  ],
};

export default function AdminNewsletterPage() {
  return (
    <AdminShell
      title="Newsletter"
      description="Manage your mailing list subscribers and broadcast campaigns."
    >
      <Tabs defaultValue="subscribers" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-[400px] grid-cols-2 h-12 rounded-xl bg-white border border-[var(--brand-ink)]/10 shadow-sm p-1">
          <TabsTrigger
            value="subscribers"
            className="rounded-lg font-semibold data-[state=active]:bg-[var(--brand-orange)]/10 data-[state=active]:text-[var(--brand-orange)] data-[state=active]:shadow-none"
          >
            Subscribers
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="rounded-lg font-semibold data-[state=active]:bg-[var(--brand-orange)]/10 data-[state=active]:text-[var(--brand-orange)] data-[state=active]:shadow-none"
          >
            Campaigns
          </TabsTrigger>
        </TabsList>
        <TabsContent value="subscribers" className="mt-0 outline-none">
          <AdminCrud config={subscribersConfig} />
        </TabsContent>
        <TabsContent value="campaigns" className="mt-0 outline-none">
          <AdminCrud config={campaignsConfig} />
        </TabsContent>
      </Tabs>
    </AdminShell>
  );
}
