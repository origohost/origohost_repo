import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Search, Award, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/certificates/")({
  head: () =>
    buildSeo({
      title: "Verify Certificate — OrigoHOST Community",
      description:
        "Verify certificates issued for eligible OrigoHOST events, programs, bootcamps, and learning experiences.",
      path: "/certificates",
    }),
  component: CertificatesPage,
});

function CertificatesPage() {
  const [credentialId, setCredentialId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentialId.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            OFFICIAL VERIFICATION
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Verify an OrigoHOST Certificate
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Verify certificates issued for eligible OrigoHOST events, programs, bootcamps, and
            learning experiences.
          </p>
        </div>
      </section>

      {/* VERIFICATION FORM */}
      <section className="py-16 px-6 lg:px-8 max-w-2xl mx-auto text-center">
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="text-left">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Credential ID
            </label>
            <div className="relative">
              <Input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="Enter Credential ID (e.g. OH-2026-KSS-9941)"
                className="h-14 rounded-full pl-6 pr-32 text-slate-900 border-slate-300"
              />
              <Button
                type="submit"
                className="absolute right-1.5 top-1.5 h-11 rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-6"
              >
                Verify
              </Button>
            </div>
          </div>
        </form>

        {searched && (
          <div className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8 text-left">
            <div className="flex items-center gap-3 text-emerald-700 font-bold text-lg mb-4">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              <span>Valid OrigoHOST Verified Credential</span>
            </div>
            <div className="space-y-2 text-xs text-slate-700 border-t border-emerald-200/80 pt-4 font-medium">
              <div className="flex justify-between">
                <span>Credential ID:</span> <strong>{credentialId}</strong>
              </div>
              <div className="flex justify-between">
                <span>Status:</span> <strong className="text-emerald-700">Verified & Active</strong>
              </div>
              <div className="flex justify-between">
                <span>Issued By:</span> <strong>OrigoHOST Tech Ecosystem</strong>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
