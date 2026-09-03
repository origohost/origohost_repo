"use client";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Calendar,
  FileText,
  UploadCloud,
  FileSpreadsheet,
  CreditCard,
  CheckCircle2,
  Clock,
  MessageSquare,
  Download,
  MapPin,
  Loader2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export default function SponsorDashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const { data: apps, error: appError } = await supabase
        .from("sponsor_applications")
        .select("*")
        .eq("sponsor_user_id", user?.id)
        .order("created_at", { ascending: false });

      if (appError) throw appError;
      setApplications(apps || []);

      if (apps && apps.length > 0) {
        const { data: invs, error: invError } = await supabase
          .from("sponsor_invoices")
          .select("*")
          .in(
            "sponsor_application_id",
            apps.map((a) => a.id),
          )
          .order("created_at", { ascending: false });

        if (invError) throw invError;
        setInvoices(invs || []);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  const steps = [
    "Submitted",
    "Under Review",
    "Meeting Scheduled",
    "Approved",
    "Event Planning",
    "Completed",
  ];

  const getStepStatus = (currentStatus: string, stepName: string) => {
    const currentIndex = steps.indexOf(currentStatus || "Submitted");
    const stepIndex = steps.indexOf(stepName);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const activeApp = applications[0]; // For simplicity, assume the latest application is the active one

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-[var(--brand-ink)]">Partner Portal</h1>
            <p className="text-slate-500">
              Welcome back! Manage your sponsorships, invoices, and events.
            </p>
          </div>
          <Button variant="outline" className="bg-white rounded-xl">
            <Building2 className="w-4 h-4 mr-2" /> Update Company Profile
          </Button>
        </div>

        {applications.length === 0 ? (
          <Card className="bg-white rounded-3xl border-slate-200 p-12 text-center shadow-xl">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No Active Sponsorships</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              You haven't submitted a sponsorship proposal yet, or your application is linked to a
              different account.
            </p>
            <Button
              onClick={() => (window.location.href = "/sponsor#apply")}
              className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-xl"
            >
              Submit a Proposal
            </Button>
          </Card>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-white p-1 rounded-xl border border-slate-200 mb-8 w-full justify-start overflow-x-auto">
              <TabsTrigger
                value="overview"
                className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Overview & Status
              </TabsTrigger>
              <TabsTrigger
                value="assets"
                className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Brand Assets
              </TabsTrigger>
              <TabsTrigger
                value="invoices"
                className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Invoices & Payments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Proposal Status Tracker */}
              <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl font-bold">Application Status</CardTitle>
                      <CardDescription>
                        Proposal ID: {activeApp.id.split("-")[0].toUpperCase()}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      {activeApp.budget_range}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
                    {/* Progress Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
                    <div
                      className="hidden md:block absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500"
                      style={{
                        width: `${(steps.indexOf(activeApp.tracker_status || "Submitted") / (steps.length - 1)) * 100}%`,
                      }}
                    />

                    {steps.map((step, i) => {
                      const s = getStepStatus(activeApp.tracker_status, step);
                      return (
                        <div
                          key={step}
                          className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 mb-6 md:mb-0 w-full md:w-auto md:min-w-[120px]"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-colors duration-300 ${s === "completed" ? "border-blue-600 text-blue-600" : s === "current" ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "border-slate-200 text-slate-300"}`}
                          >
                            {s === "completed" ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <span className="font-bold">{i + 1}</span>
                            )}
                          </div>
                          <div className="text-left md:text-center">
                            <div
                              className={`font-semibold text-sm ${s === "pending" ? "text-slate-400" : "text-slate-800"}`}
                            >
                              {step}
                            </div>
                            {s === "current" && (
                              <div className="text-xs text-blue-600 font-medium animate-pulse">
                                Current Phase
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Account Manager */}
                <Card className="rounded-3xl border-slate-200 shadow-sm bg-gradient-to-b from-white to-slate-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" /> Account Manager
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                        <img
                          loading="lazy"
                          decoding="async"
                          src="https://ui-avatars.com/api/?name=OrigoHOST+Team&background=0D8ABC&color=fff"
                          alt="Manager"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">Partnerships Team</div>
                        <div className="text-sm text-slate-500">OrigoHOST</div>
                      </div>
                    </div>
                    <div className="pt-4 space-y-3 border-t border-slate-100">
                      <a
                        href="mailto:origohostscommunity@gmail.com"
                        className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600"
                      >
                        <MessageSquare className="w-4 h-4" /> origohostscommunity@gmail.com
                      </a>
                      <a
                        href="https://calendly.com/origohost-partnerships"
                        target="_blank"
                        className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600"
                      >
                        <Calendar className="w-4 h-4" /> Schedule Check-in
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Commitments */}
                <Card className="md:col-span-2 rounded-3xl border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-600" /> Upcoming Sponsored Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeApp.tracker_status === "Approved" ||
                    activeApp.tracker_status === "Event Planning" ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 flex justify-between items-center">
                          <div>
                            <div className="font-bold text-emerald-900">
                              Cloud Native Hackathon 2026
                            </div>
                            <div className="text-sm text-emerald-700 flex items-center gap-2 mt-1">
                              <MapPin className="w-3 h-3" /> Bangalore (Hybrid) • Aug 15-17
                            </div>
                          </div>
                          <Badge className="bg-emerald-600 hover:bg-emerald-700">
                            Gold Sponsor
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <Clock className="w-8 h-8 mx-auto mb-3 opacity-20" />
                        No upcoming events yet. Complete the proposal review process first.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Brand Assets</CardTitle>
                  <CardDescription>
                    Upload and manage the logos and branding materials we use for event promotions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Company Logo", url: activeApp.logo_url, required: true },
                      { label: "Brand Guidelines", url: activeApp.brand_kit_url, required: false },
                      { label: "Proposal PDF", url: activeApp.proposal_pdf_url, required: true },
                      {
                        label: "Marketing Kit",
                        url: activeApp.marketing_assets_url,
                        required: false,
                      },
                    ].map((asset, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center p-6 border border-slate-200 rounded-2xl bg-slate-50 hover:bg-white transition-colors"
                      >
                        {asset.url ? (
                          <>
                            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className="text-sm font-bold text-center mb-1">{asset.label}</div>
                            <a
                              href={asset.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                            >
                              View File <Download className="w-3 h-3" />
                            </a>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center mb-3">
                              <UploadCloud className="w-6 h-6" />
                            </div>
                            <div className="text-sm font-bold text-center mb-1">{asset.label}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-7 mt-1"
                            >
                              Upload New
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row justify-between items-center">
                  <div>
                    <CardTitle>Invoices & Payments</CardTitle>
                    <CardDescription>
                      View your billing history and securely pay invoices.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-slate-50 text-slate-500 font-normal">
                    GST: {activeApp.gst_number || "Not Provided"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {invoices.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <div className="font-semibold text-slate-700 mb-1">No invoices yet</div>
                      <p className="text-sm">
                        Invoices will appear here once your sponsorship is approved and finalized.
                      </p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice #</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map((inv) => (
                          <TableRow key={inv.id}>
                            <TableCell className="font-medium text-slate-900">
                              {inv.invoice_number}
                            </TableCell>
                            <TableCell className="text-slate-500">
                              {new Date(inv.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="font-bold text-slate-900">
                              ₹{inv.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  inv.status === "Paid"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : inv.status === "Pending"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-slate-100 text-slate-800"
                                }
                              >
                                {inv.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {inv.status === "Pending" ? (
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                                  <CreditCard className="w-3 h-3 mr-2" /> Pay Now
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" className="h-8">
                                  <Download className="w-3 h-3 mr-2" /> Receipt
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
