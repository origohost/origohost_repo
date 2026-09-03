import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminUsers, updateAdminUserRole, type AdminUser } from "@/actions/admin.users";
import { AdminShell } from "@/components/layout/admin-shell";
import { m as motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, MoreVertical, ShieldAlert, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

interface UserWithRole {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const {
    data: users = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const data = await getAdminUsers();
      return data;
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to fetch users");
      console.error(error);
    }
  }, [error]);

  // Set up real-time subscription for UI updates
  useEffect(() => {
    const channel = supabase
      .channel("admin-users-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "user_roles" }, () => {
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleRoleChange = async (userId: string, newRole: string, email: string) => {
    if (email === "ritikgoswami34@gmail.com" && newRole !== "super_admin") {
      toast.error("Action denied: Cannot remove Super Admin access from system owner.");
      return;
    }

    try {
      setActionLoading(`role-${userId}`);
      await updateAdminUserRole({ data: { userId, newRole } });

      toast.success(`Role updated to ${newRole}`);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminShell
      title="Role & User Management"
      description="Manage access levels and permissions for all platform users."
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 border-[var(--brand-ink)]/10"
            />
          </div>
        </div>

        <div className="rounded-[1rem] border border-[var(--brand-ink)]/5 bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-[var(--brand-ink)]/5">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-[var(--brand-ink)]/70">
                  User Details
                </TableHead>
                <TableHead className="font-semibold text-[var(--brand-ink)]/70">
                  Current Role
                </TableHead>
                <TableHead className="font-semibold text-[var(--brand-ink)]/70">
                  Joined Date
                </TableHead>
                <TableHead className="text-right font-semibold text-[var(--brand-ink)]/70">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center">
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Loading users...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="group border-b border-[var(--brand-ink)]/5 hover:bg-[var(--brand-ink)]/5 transition-colors"
                  >
                    <TableCell>
                      <div className="font-semibold text-[var(--brand-ink)]">{user.full_name}</div>
                      <div className="text-xs text-[var(--brand-ink)]/60 group-hover:text-[var(--brand-ink)]/80 transition-colors">
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "super_admin"
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : user.role === "admin"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : user.role === "ambassador"
                                ? "bg-orange-100 text-orange-700 border-orange-200"
                                : user.role === "mentor"
                                  ? "bg-blue-100 text-blue-700 border-blue-200"
                                  : "bg-gray-100 text-gray-700 border-gray-200"
                        }
                      >
                        {user.role === "super_admin" && <ShieldAlert className="h-3 w-3 mr-1" />}
                        {user.role === "admin" && <ShieldCheck className="h-3 w-3 mr-1" />}
                        {user.role.toUpperCase().replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-[var(--brand-ink)]/70 group-hover:text-[var(--brand-ink)]/90 transition-colors">
                      {format(new Date(user.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      {actionLoading === `role-${user.id}` ? (
                        <Loader2 className="h-4 w-4 animate-spin inline-block mr-4" />
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-[var(--brand-ink)]"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              className="font-semibold text-xs text-muted-foreground"
                              disabled
                            >
                              Change Role
                            </DropdownMenuItem>
                            {[
                              "member",
                              "ambassador",
                              "mentor",
                              "college_admin",
                              "admin",
                              "super_admin",
                            ].map((role) => (
                              <DropdownMenuItem
                                key={role}
                                onClick={() => handleRoleChange(user.id, role, user.email ?? "")}
                                disabled={user.role === role}
                              >
                                Make {role.replace("_", " ")}
                              </DropdownMenuItem>
                            ))}
                            <div className="h-px bg-gray-100 my-1" />
                            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700">
                              Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminShell>
  );
}
