import { useEffect, useState, useMemo } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { AdminShell } from "@/components/layout/admin-shell";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import {
  Loader2,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  CheckCircle2,
  XCircle,
  Calendar,
  Users,
  Building2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminOperationsHostRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("host_requests")
        .select(
          `
          *,
          organizations (*),
          event_requirements (*),
          host_request_files (*)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from("host_requests").update({ status }).eq("id", id);

      if (error) throw error;
      toast.success(`Status updated to ${status}`);
      fetchRequests();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
      case "Reviewing":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Meeting Scheduled":
        return "bg-purple-50 text-purple-600 border-purple-200";
      case "Approved":
        return "bg-green-50 text-green-600 border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-600 border-red-200";
      case "Completed":
        return "bg-[var(--brand-ink)]/5 text-[var(--brand-ink)] border-[var(--brand-ink)]/10";
      default:
        return "bg-zinc-100 text-zinc-600";
    }
  };

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const filteredRequests = useMemo(
    () =>
      requests.filter(
        (req) =>
          req.event_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          req.organizations?.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          req.request_number.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      ),
    [requests, debouncedSearchQuery],
  );

  return (
    <AdminShell
      title="Host Requests"
      description="Manage and review incoming event hosting proposals."
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search proposals by org or event..."
            className="pl-9 bg-white border-zinc-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="bg-white w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-[var(--brand-ink)]/5 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-orange)]" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[var(--brand-ink)]/50 uppercase bg-zinc-50/50 border-b border-[var(--brand-ink)]/5">
                <tr>
                  <th className="px-6 py-4 font-bold tracking-wider">ID</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Organization</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Event Details</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                  <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--brand-ink)]/5">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-[var(--brand-ink)]/70">
                      {req.request_number}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[var(--brand-ink)]">
                        {req.organizations?.name}
                      </div>
                      <div className="text-[var(--brand-ink)]/50 text-xs">
                        {req.organizations?.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--brand-ink)]">{req.event_name}</div>
                      <div className="text-[var(--brand-ink)]/50 text-xs">
                        {req.format} • {req.event_type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(req.status)}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--brand-ink)]/60">
                      {format(new Date(req.created_at), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Dialog
                        open={isDialogOpen && selectedRequest?.id === req.id}
                        onOpenChange={(open) => {
                          setIsDialogOpen(open);
                          if (open) setSelectedRequest(req);
                        }}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem onClick={() => updateStatus(req.id, "Reviewing")}>
                              Mark as Reviewing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateStatus(req.id, "Meeting Scheduled")}
                            >
                              Schedule Meeting
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => updateStatus(req.id, "Approved")}
                              className="text-green-600 focus:text-green-600 focus:bg-green-50"
                            >
                              Approve Proposal
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateStatus(req.id, "Rejected")}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              Reject Proposal
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Proposal Details Modal */}
                        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-black">
                              {selectedRequest?.event_name}
                            </DialogTitle>
                            <DialogDescription>
                              Proposal {selectedRequest?.request_number} from{" "}
                              {selectedRequest?.organizations?.name}
                            </DialogDescription>
                          </DialogHeader>

                          {selectedRequest && (
                            <div className="mt-6 space-y-8">
                              {/* Org Info */}
                              <div>
                                <h4 className="text-sm font-bold text-[var(--brand-ink)]/50 uppercase tracking-wider mb-4 border-b pb-2">
                                  Organization Details
                                </h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-[var(--brand-ink)]/50 block">Name</span>
                                    <span className="font-medium">
                                      {selectedRequest.organizations.name}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[var(--brand-ink)]/50 block">Type</span>
                                    <span className="font-medium">
                                      {selectedRequest.organizations.type}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[var(--brand-ink)]/50 block">Email</span>
                                    <span className="font-medium">
                                      {selectedRequest.organizations.email}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[var(--brand-ink)]/50 block">
                                      Location
                                    </span>
                                    <span className="font-medium">
                                      {selectedRequest.organizations.city},{" "}
                                      {selectedRequest.organizations.country}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Event Info */}
                              <div>
                                <h4 className="text-sm font-bold text-[var(--brand-ink)]/50 uppercase tracking-wider mb-4 border-b pb-2">
                                  Event Information
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                                  <div>
                                    <span className="text-[var(--brand-ink)]/50 block">
                                      Type & Format
                                    </span>
                                    <span className="font-medium">
                                      {selectedRequest.event_type} ({selectedRequest.format})
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[var(--brand-ink)]/50 block">
                                      Expected Date
                                    </span>
                                    <span className="font-medium">
                                      {selectedRequest.expected_date
                                        ? format(
                                            new Date(selectedRequest.expected_date),
                                            "MMM d, yyyy",
                                          )
                                        : "N/A"}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-[var(--brand-ink)]/50 block">
                                      Expected Attendees
                                    </span>
                                    <span className="font-medium">
                                      {selectedRequest.seats || "N/A"}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-sm">
                                  <span className="text-[var(--brand-ink)]/50 block mb-1">
                                    Description
                                  </span>
                                  <p className="text-[var(--brand-ink)]/80 leading-relaxed bg-zinc-50 p-4 rounded-xl border">
                                    {selectedRequest.description || "No description provided."}
                                  </p>
                                </div>
                              </div>

                              {/* Files */}
                              {selectedRequest.host_request_files &&
                                selectedRequest.host_request_files.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-bold text-[var(--brand-ink)]/50 uppercase tracking-wider mb-4 border-b pb-2">
                                      Attachments
                                    </h4>
                                    <div className="flex flex-col gap-2">
                                      {selectedRequest.host_request_files.map((f: any) => (
                                        <a
                                          key={f.id}
                                          href={f.file_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-zinc-50 transition-colors"
                                        >
                                          <FileText className="h-5 w-5 text-[var(--brand-blue)]" />
                                          <span className="text-sm font-medium">{f.file_type}</span>
                                          <span className="text-xs text-[var(--brand-ink)]/40 ml-auto">
                                            {(f.file_size_bytes / 1024 / 1024).toFixed(2)} MB
                                          </span>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              <div className="flex justify-end gap-3 pt-6">
                                <Button
                                  variant="outline"
                                  onClick={() => updateStatus(selectedRequest.id, "Rejected")}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                >
                                  Reject
                                </Button>
                                <Button
                                  onClick={() => updateStatus(selectedRequest.id, "Approved")}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  Approve Proposal
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}

                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[var(--brand-ink)]/50">
                      No host requests found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
