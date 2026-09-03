import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Mail,
  ExternalLink,
  Calendar,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Application {
  id: string;
  user_id: string;
  name: string;
  email: string;
  college: string;
  status: string;
  created_at: string;
  resume: string;
  linkedin: string;
}

export default function AdminCommunityCampusAmbassadorPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ambassador_applications_v2")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      setActionLoading(`approve-${id}`);
      const { data, error } = await supabase.rpc("approve_ambassador_application", {
        application_id: id,
      });

      if (error) throw error;

      toast.success("Application approved! Role updated to Ambassador.");
      fetchApplications();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to approve application");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setActionLoading(`reject-${id}`);
      const { error } = await supabase
        .from("ambassador_applications_v2")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;

      toast.success("Application rejected.");
      fetchApplications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject application");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredApps = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.college.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[var(--brand-ink)]">
            Ambassador Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Review and manage Campus Ambassador applications.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applicants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 border-[var(--brand-ink)]/10"
          />
        </div>
      </div>

      <div className="rounded-[1rem] border border-[var(--brand-ink)]/5 bg-white/60 backdrop-blur-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-[var(--brand-ink)]/5">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-[var(--brand-ink)]/70">Applicant</TableHead>
              <TableHead className="font-semibold text-[var(--brand-ink)]/70">College</TableHead>
              <TableHead className="font-semibold text-[var(--brand-ink)]/70">
                Applied Date
              </TableHead>
              <TableHead className="font-semibold text-[var(--brand-ink)]/70">Status</TableHead>
              <TableHead className="text-right font-semibold text-[var(--brand-ink)]/70">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading applications...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredApps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                  No applications found.
                </TableCell>
              </TableRow>
            ) : (
              <AnimatePresence>
                {filteredApps.map((app) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group border-b border-[var(--brand-ink)]/5 hover:bg-[var(--brand-ink)]/5 transition-colors"
                  >
                    <TableCell>
                      <div className="font-semibold text-[var(--brand-ink)]">{app.name}</div>
                      <div className="text-xs text-muted-foreground">{app.email}</div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{app.college}</TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(app.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          app.status === "approved"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : app.status === "rejected"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }
                      >
                        {app.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="View Application"
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Contact"
                          className="h-8 w-8 text-gray-600 hover:bg-gray-100"
                          onClick={() => window.open(`mailto:${app.email}`)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        {app.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Approve"
                              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleApprove(app.id)}
                              disabled={actionLoading !== null}
                            >
                              {actionLoading === `approve-${app.id}` ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Reject"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleReject(app.id)}
                              disabled={actionLoading !== null}
                            >
                              {actionLoading === `reject-${app.id}` ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
