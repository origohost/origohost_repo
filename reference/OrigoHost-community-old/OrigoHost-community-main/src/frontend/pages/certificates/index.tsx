import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Search } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export default function VerifyCertificatePage() {
  const [certId, setCertId] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    navigate({ to: `/certificates/${certId.trim()}` });
  };

  return (
    <PageShell
      title="Verify Certificate"
      description="Enter a certificate ID to verify its authenticity."
    >
      <div className="mx-auto max-w-xl py-24 px-6 text-center">
        <ShieldCheck className="mx-auto h-16 w-16 text-[var(--brand-green)] mb-8" />
        <h1 className="font-serif text-4xl font-bold text-[var(--brand-ink)] mb-4">
          Verify a Credential
        </h1>
        <p className="text-[var(--brand-ink)]/70 mb-8">
          OrigoHOST issues verifiable certificates for events, bootcamps, and programs. Enter the
          unique Credential ID below.
        </p>

        <form onSubmit={handleVerify} className="flex gap-2">
          <Input
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="e.g. 123e4567-e89b-12d3..."
            className="flex-1"
          />
          <Button type="submit" className="bg-[var(--brand-ink)] text-white">
            <Search className="mr-2 h-4 w-4" />
            Verify
          </Button>
        </form>
      </div>
    </PageShell>
  );
}
