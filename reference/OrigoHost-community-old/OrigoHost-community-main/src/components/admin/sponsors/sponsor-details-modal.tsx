import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { sponsorApi } from "@/features/sponsors/sponsor.api";
import { toast } from "sonner";
import {
  Loader2,
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Target,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SponsorDetailsModal({
  sponsor,
  children,
  onUpdate,
}: {
  sponsor: any;
  children: React.ReactNode;
  onUpdate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(sponsor.status);
  const [internalNotes, setInternalNotes] = useState(sponsor.internal_notes || "");

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      if (status !== sponsor.status) {
        await sponsorApi.updateStatus(sponsor.id, status);
      }
      if (internalNotes !== sponsor.internal_notes) {
        await sponsorApi.addInternalNote(sponsor.id, internalNotes);
      }
      toast.success("Sponsor application updated successfully");
      onUpdate();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "in_review":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="border-b pb-4 mb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {sponsor.company_name}
              <Badge className={getStatusColor(sponsor.status)}>
                {sponsor.status.toUpperCase().replace("_", " ")}
              </Badge>
            </DialogTitle>
            <div className="text-sm text-slate-500">
              Applied on {new Date(sponsor.created_at).toLocaleDateString()}
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Company Information
              </h3>
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <div className="text-xs text-slate-500 uppercase">Website</div>
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {sponsor.website} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Industry</div>
                  <div className="font-medium">{sponsor.industry || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Company Size</div>
                  <div className="font-medium">{sponsor.company_size || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase">Location</div>
                  <div className="font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {sponsor.headquarters || "N/A"}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" /> Partnership Details
              </h3>
              <div className="space-y-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div>
                  <div className="text-xs text-slate-500 uppercase mb-1">Interested In</div>
                  <div className="flex flex-wrap gap-2">
                    {sponsor.interested_in?.map((i: string) => (
                      <Badge variant="outline" key={i} className="bg-white">
                        {i}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Budget Range</div>
                    <div className="font-bold text-blue-700">{sponsor.budget_range}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Timeline</div>
                    <div className="font-bold text-blue-700">{sponsor.timeline}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase mb-1">Detailed Proposal</div>
                  <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border">
                    {sponsor.detailed_message || "No detailed message provided."}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Uploaded Assets</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Logo", url: sponsor.logo_url },
                  { label: "Brand Kit", url: sponsor.brand_kit_url },
                  { label: "Proposal", url: sponsor.proposal_pdf_url },
                  { label: "Marketing", url: sponsor.marketing_assets_url },
                ].map((asset, i) =>
                  asset.url ? (
                    <a
                      key={i}
                      href={asset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center p-4 border rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <Download className="w-6 h-6 text-slate-400 mb-2" />
                      <span className="text-sm font-medium">{asset.label}</span>
                    </a>
                  ) : (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-center p-4 border border-dashed rounded-xl opacity-50 bg-slate-50"
                    >
                      <span className="text-sm font-medium text-slate-500">No {asset.label}</span>
                    </div>
                  ),
                )}
              </div>
            </section>
          </div>

          {/* Sidebar / Admin Actions */}
          <div className="space-y-6">
            <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-4">Primary Contact</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-bold">{sponsor.contact_name}</div>
                  <div className="text-sm text-slate-500">{sponsor.contact_designation}</div>
                </div>
                <a
                  href={`mailto:${sponsor.contact_email}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <Mail className="w-4 h-4" /> {sponsor.contact_email}
                </a>
                <a
                  href={`tel:${sponsor.contact_phone}`}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <Phone className="w-4 h-4" /> {sponsor.contact_phone}
                </a>
              </div>
            </section>

            <section className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <h3 className="font-bold text-slate-800 mb-4">Admin Actions</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-500 uppercase mb-2">Update Status</div>
                  <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_review">In Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="text-xs text-slate-500 uppercase mb-2">Internal Notes</div>
                  <Textarea
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Add notes for the team..."
                    className="bg-white min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleUpdate}
                  disabled={
                    isUpdating ||
                    (status === sponsor.status && internalNotes === sponsor.internal_notes)
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
