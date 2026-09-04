import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { CrmService, CrmContact, CrmLead } from "@/domains/crm/crm.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Building2,
  TrendingUp,
  PhoneCall,
  Mail,
  Plus,
  Search,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/crm/")({
  head: () =>
    buildSeo({
      title: "CRM Portal — Internal Member & Lead Operations",
      description: "Manage member contacts, partnership leads, sponsor pipelines, and community activities.",
      path: "/crm",
    }),
  component: CrmDashboardPage,
});

function CrmDashboardPage() {
  const { user, roles, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<CrmContact[]>([]);
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"contacts" | "pipeline" | "activities">("contacts");

  const isAuthorized = Boolean(
    user && (isAdmin || roles.includes("admin") || roles.includes("super_admin") || roles.includes("crm_manager"))
  );

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: "/crm" } });
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (isAuthorized) {
      loadCrmData();
    }
  }, [isAuthorized]);

  const loadCrmData = async () => {
    setLoadingData(true);
    const [contactData, leadData] = await Promise.all([
      CrmService.getContacts(),
      CrmService.getLeads(),
    ]);
    setContacts(contactData);
    setLeads(leadData);
    setLoadingData(false);
  };

  if (isLoading || (!isAuthorized && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-4">
          <ShieldCheck className="h-12 w-12 text-blue-400 mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold">Verifying CRM Authorization...</h2>
          <p className="text-xs text-slate-400">Restricted operational workspace for authorized team members.</p>
        </div>
      </div>
    );
  }

  const filteredContacts = contacts.filter(
    (c) =>
      c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company_name && c.company_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-white pt-24 pb-20">
      {/* CRM HEADER */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
              <Sparkles className="w-3 h-3 text-blue-400" /> INTERNAL CRM OPERATIONS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mt-3 font-mono tracking-tight text-white">
              OrigoHOST CRM Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Member Directory, Partnership Pipelines, Sponsor Relations & Task Tracking
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => loadCrmData()}
              variant="outline"
              className="rounded-xl border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 text-xs font-bold"
            >
              Refresh Data
            </Button>
            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs">
              <Plus className="w-4 h-4 mr-1.5" /> Add Contact
            </Button>
          </div>
        </div>

        {/* METRICS DASHBOARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Contacts</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">{contacts.length}</div>
            <div className="text-[10px] text-emerald-400 font-medium mt-1">Active Community Leads</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Open Leads</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{leads.length}</div>
            <div className="text-[10px] text-emerald-400 font-medium mt-1">Sponsor & Partnership Deals</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Organizations</span>
              <Building2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white">24</div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">Partner Companies & Academies</div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Security Status</span>
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400">RBAC Enforced</div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">Isolated Private Data Realm</div>
          </div>
        </div>
      </section>

      {/* WORKSPACE NAVIGATION TABS & SEARCH */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "contacts" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Contacts ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "pipeline" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Leads & Pipelines ({leads.length})
            </button>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search contacts, emails, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 rounded-xl bg-slate-900 border-slate-800 text-xs text-white placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>

      {/* TAB CONTENT: CONTACTS TABLE */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        {activeTab === "contacts" && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Contact Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Company / Org</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500 italic">
                        No contacts found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                            {c.full_name.charAt(0).toUpperCase()}
                          </div>
                          <span>{c.full_name}</span>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-300">{c.email}</td>
                        <td className="px-6 py-4 text-slate-300">{c.company_name || "—"}</td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded border border-blue-500/20">
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 capitalize">{c.source}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <a
                            href={`mailto:${c.email}`}
                            className="inline-flex items-center text-[11px] font-bold text-blue-400 hover:text-blue-300"
                          >
                            <Mail className="w-3.5 h-3.5 mr-1" /> Email
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "pipeline" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4 border-b border-slate-800 pb-2">
                New Leads
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="font-bold text-white">Sponsor Tier Proposal</div>
                  <div className="text-slate-400 text-[11px]">AgriTech Innovation Lab</div>
                  <div className="text-emerald-400 font-mono mt-2 text-[11px]">₹1,50,000</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 border-b border-slate-800 pb-2">
                In Discussion
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="font-bold text-white">Campus Ambassador Partnership</div>
                  <div className="text-slate-400 text-[11px]">Tech University NCR</div>
                  <div className="text-emerald-400 font-mono mt-2 text-[11px]">₹50,000</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 border-b border-slate-800 pb-2">
                Won & Active
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div className="font-bold text-white">Hackathon Gold Sponsor</div>
                  <div className="text-slate-400 text-[11px]">Cloud Infra Solutions</div>
                  <div className="text-emerald-400 font-mono mt-2 text-[11px]">₹3,00,000</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
