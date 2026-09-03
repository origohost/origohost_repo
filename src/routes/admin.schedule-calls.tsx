import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, Calendar, Mail, Building2, User } from "lucide-react";

export const Route = createFileRoute("/admin/schedule-calls")({
  component: AdminScheduleCalls,
});

function AdminScheduleCalls() {
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCalls() {
      const { data, error } = await supabase
        .from("schedule_calls")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setCalls(data);
      }
      setLoading(false);
    }
    fetchCalls();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scheduled Calls</h1>
          <p className="text-muted-foreground text-slate-500">
            Manage incoming requests for calls, sponsorships, and partnerships.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-slate-500">Loading calls...</p>
        ) : calls.length === 0 ? (
          <p className="text-slate-500">No calls scheduled yet.</p>
        ) : (
          calls.map((call) => (
            <Card key={call.id} className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant={call.status === "pending" ? "default" : "secondary"}>
                  {call.status}
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <CardTitle className="text-lg">{call.topic}</CardTitle>
                </div>
                <CardDescription className="flex flex-col gap-1 mt-2">
                  <span className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" /> {call.full_name}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" /> {call.email}
                  </span>
                  {call.organization && (
                    <span className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4" /> {call.organization}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="pt-4 border-t border-slate-100">
                  <span className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    {call.preferred_date
                      ? new Date(call.preferred_date).toLocaleString()
                      : "No preference"}
                  </span>
                  {call.notes && (
                    <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg mt-3">
                      {call.notes}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-4">
                    Submitted on {new Date(call.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
