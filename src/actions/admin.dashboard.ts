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

export const getDashboardTrafficData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
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

    // In a real app we'd group by month. Since this is new, we'll just group by date.
  // However, to keep it simple and aligned with the UI expectation, we'll return
  // some recent days of data based on the created_at column.
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data, error } = await supabase
    .from("platform_visits")
    .select("created_at")
    .gte("created_at", thirtyDaysAgo.toISOString());

  if (error) throw error;

  // Group by month name (e.g. "Jan", "Feb")
  const monthCounts: Record<string, number> = {};
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize the last 7 months so the chart doesn't look completely empty if there's no data
  const currentMonthIndex = new Date().getMonth();
  for (let i = 6; i >= 0; i--) {
    const m = (currentMonthIndex - i + 12) % 12;
    monthCounts[months[m]] = 0;
  }

  data.forEach((visit) => {
    const date = new Date(visit.created_at);
    const monthName = months[date.getMonth()];
    if (monthCounts[monthName] !== undefined) {
      monthCounts[monthName]++;
    } else {
      monthCounts[monthName] = 1;
    }
  });

  const result = Object.entries(monthCounts).map(([name, visitors]) => ({
    name,
    visitors,
  }));

  return result;
});

export const getDashboardDeviceData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
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

    const { data, error } = await supabase.from("platform_visits").select("device_type");

  if (error) throw error;

  let desktop = 0,
    mobile = 0,
    tablet = 0;
  data.forEach((visit) => {
    if (visit.device_type === "Desktop") desktop++;
    else if (visit.device_type === "Mobile") mobile++;
    else if (visit.device_type === "Tablet") tablet++;
  });

  // Avoid completely empty charts
  if (desktop === 0 && mobile === 0 && tablet === 0) {
    return [
      { name: "Desktop", value: 1, color: "#f97316" },
      { name: "Mobile", value: 0, color: "#3b82f6" },
      { name: "Tablet", value: 0, color: "#10b981" },
    ];
  }

  return [
    { name: "Desktop", value: desktop, color: "#f97316" }, // orange-500
    { name: "Mobile", value: mobile, color: "#3b82f6" }, // blue-500
    { name: "Tablet", value: tablet, color: "#10b981" }, // emerald-500
  ];
});

export const logPlatformVisit = createServerFn({ method: "POST" })
  .validator((data: { path: string; device_type: "Desktop" | "Mobile" | "Tablet" }) => data)
  .handler(async ({ data: { path, device_type } }) => {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from("platform_visits").insert({
      path,
      device_type,
    });

    if (error) {
      console.error("Failed to log visit:", error);
    }
    return { success: true };
  });

export const getDashboardEventRegistrationData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
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

    // Get registrations from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await supabase
      .from("event_registrations_v2")
      .select("created_at")
      .gte("created_at", sevenDaysAgo.toISOString());

    if (error) {
      // fallback if event_registrations_v2 doesn't exist
      console.log("Could not fetch event_registrations_v2", error);
      return [
        { name: "Mon", rsvps: 0 },
        { name: "Tue", rsvps: 0 },
        { name: "Wed", rsvps: 0 },
        { name: "Thu", rsvps: 0 },
        { name: "Fri", rsvps: 0 },
        { name: "Sat", rsvps: 0 },
        { name: "Sun", rsvps: 0 },
      ];
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayCounts: Record<string, number> = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    data.forEach((reg) => {
      const dayName = days[new Date(reg.created_at).getDay()];
      dayCounts[dayName]++;
    });

    // Sort correctly starting from Monday
    return [
      { name: "Mon", rsvps: dayCounts["Mon"] },
      { name: "Tue", rsvps: dayCounts["Tue"] },
      { name: "Wed", rsvps: dayCounts["Wed"] },
      { name: "Thu", rsvps: dayCounts["Thu"] },
      { name: "Fri", rsvps: dayCounts["Fri"] },
      { name: "Sat", rsvps: dayCounts["Sat"] },
      { name: "Sun", rsvps: dayCounts["Sun"] },
    ];
  },
);
