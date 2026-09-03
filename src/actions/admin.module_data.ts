import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

export const getModuleRecords = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((moduleKey: string) => moduleKey)
  .handler(async (ctx) => {
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

    const { data, error } = await supabase
      .from("admin_module_data")
      .select("*")
      .eq("module_name", ctx.data)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  });

export const createModuleRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { module_name: string; data: Record<string, unknown> }) => data)
  .handler(async (ctx) => {
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

    const { error } = await supabase.from("admin_module_data").insert({
      module_name: ctx.data.module_name,
      data: ctx.data.data,
    });
    if (error) throw error;
    return { success: true };
  });

export const updateModuleRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { id: string; data: Record<string, unknown> }) => data)
  .handler(async (ctx) => {
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

    const { error } = await supabase
      .from("admin_module_data")
      .update({ data: ctx.data.data, updated_at: new Date().toISOString() })
      .eq("id", ctx.data.id);
    if (error) throw error;
    return { success: true };
  });

export const deleteModuleRecord = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((id: string) => id)
  .handler(async (ctx) => {
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

    const { error } = await supabase.from("admin_module_data").delete().eq("id", ctx.data);
    if (error) throw error;
    return { success: true };
  });

export const bulkDeleteModuleRecords = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((ids: string[]) => ids)
  .handler(async (ctx) => {
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

    const { error } = await supabase.from("admin_module_data").delete().in("id", ctx.data);
    if (error) throw error;
    return { success: true };
  });
