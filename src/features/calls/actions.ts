import { supabase } from "@/integrations/supabase/client";

export interface ScheduleCallData {
  full_name: string;
  email: string;
  organization?: string;
  topic: string;
  preferred_date?: string;
  notes?: string;
}

export async function submitScheduleCall(data: ScheduleCallData) {
  const { error } = await supabase.from("schedule_calls").insert([
    {
      full_name: data.full_name,
      email: data.email,
      organization: data.organization,
      topic: data.topic,
      preferred_date: data.preferred_date ? new Date(data.preferred_date).toISOString() : null,
      notes: data.notes,
      status: "pending",
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
