import { AdminCrud, CrudConfig } from "@/components/admin/admin-crud";
import { Building2 } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";

const config: CrudConfig = {
  table: "organizations",
  singular: "Organization",
  fields: [
    { key: "name", label: "Company Name", type: "text", required: true },
    { key: "industry", label: "Industry", type: "text" },
    { key: "website", label: "Website", type: "text" },
    { key: "logo_url", label: "Logo URL", type: "text" },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: ["pending", "approved", "rejected"],
    },
  ],
  listColumns: [
    { key: "name", label: "Name" },
    { key: "industry", label: "Industry" },
    { key: "status", label: "Status" },
  ],
};

export default function AdminOperationsOrganizationsPage() {
  return (
    <AdminShell title="Organizations" description="Manage platform partners and hiring companies.">
      <AdminCrud config={config} />
    </AdminShell>
  );
}
