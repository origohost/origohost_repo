import { useState, useEffect } from "react";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export function SecurePdfViewer({ bucket, path }: { bucket: string; path: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSecureUrl() {
      try {
        // Create a short-lived signed URL for the admin to view
        const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 60); // 60 seconds expiry

        if (error || !data) {
          throw new Error("Unable to access secure file.");
        }
        setUrl(data.signedUrl);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSecureUrl();
  }, [bucket, path]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-xl border border-slate-200">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        <p className="text-sm font-semibold text-slate-500 mt-4">Loading secure document...</p>
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-xl border border-red-200 text-red-600">
        <ShieldAlert className="w-8 h-8 mb-2" />
        <p className="font-bold text-sm text-center">Security Policy Violation or Access Denied</p>
        <p className="text-xs opacity-80 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
        <div className="text-sm">
          <p className="font-bold">Sandboxed PDF Viewer Active</p>
          <p className="opacity-80 mt-1">
            This document is rendered without execution privileges. Active content and JavaScript
            are strictly disabled by security policies.
          </p>
        </div>
        <Button
          variant="outline"
          className="ml-auto bg-white"
          onClick={() => window.open(url, "_blank")}
        >
          Download (Warning)
        </Button>
      </div>

      {/* Sandbox completely strips allow-scripts, preventing XSS payloads embedded in PDFs via browser plugins */}
      <iframe
        src={url}
        className="w-full h-[600px] rounded-xl border border-slate-200 bg-white"
        title="Secure Document Viewer"
        sandbox="allow-same-origin"
      />
    </div>
  );
}
