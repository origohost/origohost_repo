import { useState, useEffect, useMemo } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { sponsorApi } from "@/features/sponsors/sponsor.api";
import { lazy, Suspense } from "react";
const SponsorDetailsModal = lazy(() =>
  import("@/components/admin/sponsors/sponsor-details-modal").then((m) => ({
    default: m.SponsorDetailsModal,
  })),
);
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/layout/admin-shell";

export default function SponsorsDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const data = await sponsorApi.getApplications();
      setApplications(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load sponsors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const filteredApps = useMemo(
    () =>
      applications.filter(
        (app) =>
          app.company_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          app.contact_email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          app.industry?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      ),
    [applications, debouncedSearchQuery],
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "in_review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Company Name,Contact Email,Status,Date\n";
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers +
      filteredApps
        .map(
          (a) =>
            `${a.id},${a.company_name},${a.contact_email},${a.status},${new Date(a.created_at).toLocaleDateString()}`,
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sponsors_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminShell
      title="Sponsor Applications"
      description="Manage partnership requests, budgets, and status."
    >
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-end items-center gap-3">
          <Button
            variant="outline"
            className="rounded-xl border-slate-200"
            onClick={handleExportCSV}
          >
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button className="rounded-xl bg-[var(--brand-orange)] hover:bg-[var(--brand-orange)]/90 text-white">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Applications", value: applications.length, trend: "+12%" },
            {
              label: "Pending Review",
              value: applications.filter((a) => a.status === "pending").length,
              trend: "-5%",
            },
            {
              label: "Approved Partners",
              value: applications.filter((a) => a.status === "approved").length,
              trend: "+20%",
            },
            { label: "Pipeline Value", value: "Est. ₹15L+", trend: "+8%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
              <div className="flex items-end justify-between mt-2">
                <div className="text-3xl font-black text-[var(--brand-ink)]">{stat.value}</div>
                <div className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> {stat.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search companies or emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-200 h-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Budget Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-slate-400" />
                    </TableCell>
                  </TableRow>
                ) : filteredApps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                      No applications found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApps.map((app) => (
                    <TableRow key={app.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="font-bold text-slate-800">{app.company_name}</div>
                        <div className="text-xs text-slate-500">{app.industry || "N/A"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{app.contact_name}</div>
                        <div className="text-xs text-blue-600">{app.contact_email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-white text-slate-700">
                          {app.budget_range}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.toUpperCase().replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">
                        {new Date(app.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Suspense
                          fallback={
                            <Button variant="ghost" size="sm" disabled>
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              Loading...
                            </Button>
                          }
                        >
                          <SponsorDetailsModal sponsor={app} onUpdate={fetchApplications}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              View Details
                            </Button>
                          </SponsorDetailsModal>
                        </Suspense>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
