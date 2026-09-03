import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Admin users response schema
export const adminUserSchema = z.object({
  id: z.string(),
  email: z.string().nullable().optional(),
  full_name: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  role: z.string(),
  created_at: z.string(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;

const getAdminSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    "";

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase Service Role Key for Admin API");
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
};

export const getAdminUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async (ctx) => {
    try {
      const supabase = getAdminSupabase();

      // Verify Admin Role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", ctx.context.userId)
        .single();
        
      if (roleError || (roleData?.role !== "admin" && roleData?.role !== "super_admin")) {
        throw new Error("Unauthorized: Admin access required.");
      }

      // Query auth.users natively, and join with user_roles (which was created via trigger)
    // Note: @supabase/supabase-js with service_role key allows calling auth.admin.listUsers()
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) throw authError;

    // We need roles for these users
    const { data: rolesData, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id, role, created_at");

    if (rolesError) throw rolesError;

    const rolesMap = new Map(rolesData.map((r: any) => [r.user_id, r]));

    const users: AdminUser[] = authData.users.map((u) => {
      const userRole = rolesMap.get(u.id);
      return {
        id: u.id,
        email: u.email,
        full_name: u.user_metadata?.full_name || "Anonymous",
        avatar_url: u.user_metadata?.avatar_url || null,
        role: userRole?.role || "student",
        created_at: userRole?.created_at || u.created_at,
      };
    });

    return users;
  } catch (error: any) {
    console.error("[Admin API] Failed to fetch users:", error);
    throw new Error("Admin API Error: " + error.message);
  }
});

export const updateAdminUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { userId: string; newRole: string }) => data)
  .handler(async (ctx) => {
    try {
      const supabase = getAdminSupabase();
      
      // Verify Admin Role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", ctx.context.userId)
        .single();
        
      if (roleError || (roleData?.role !== "admin" && roleData?.role !== "super_admin")) {
        throw new Error("Unauthorized: Admin access required.");
      }

      const { userId, newRole } = ctx.data;

      const { error } = await supabase
        .from("user_roles")
        .update({ role: newRole })
        .eq("user_id", userId);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error("[Admin API] Failed to update role:", error);
      throw new Error("Admin API Error: " + error.message);
    }
  });
