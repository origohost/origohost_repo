import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Target,
  Edit,
  Clock,
  DollarSign,
  TrendingUp,
  FileText,
  CheckCircle2,
  AlertCircle,
  Tag,
  Share2,
} from 'lucide-react';
import { getLeadById } from '@/services/crm/leads.service';
import { Heading, Text, Badge } from '@/components/ui';
import type { LeadStatus, LeadPriority } from '@/types/crm';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = await getLeadById(id);
  if (!res.data) return { title: 'Lead Not Found — CRM' };
  return { title: `${res.data.title} — Lead Profile | OrigoHOST CRM` };
}

const pipelineStages: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'CONVERTED'];

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getLeadById(id);
  if (!res.data) notFound();
  const lead = res.data;

  const formattedCreated = new Date(lead.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getStatusBadgeVariant = (status: LeadStatus) => {
    switch (status) {
      case 'CONVERTED':
        return 'success';
      case 'LOST':
        return 'error';
      case 'PROPOSAL':
      case 'QUALIFIED':
        return 'warning';
      case 'CONTACTED':
      case 'NEW':
      default:
        return 'primary';
    }
  };

  const getPriorityBadgeVariant = (priority: LeadPriority) => {
    switch (priority) {
      case 'Urgent':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
      default:
        return 'secondary';
    }
  };

  const currentStageIndex = pipelineStages.indexOf(lead.status);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Navigation */}
      <Link
        href="/crm/leads"
        className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Leads Pipeline
      </Link>

      {/* Main Profile Header */}
      <div className="p-6 rounded-card bg-surface border border-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
            <Target className="h-7 w-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Heading as="h1" size="xl" className="text-ink font-bold">
                {lead.title}
              </Heading>
              <Badge variant={getStatusBadgeVariant(lead.status)} size="sm">
                {lead.status}
              </Badge>
              <Badge variant={getPriorityBadgeVariant(lead.priority)} size="sm">
                {lead.priority} Priority
              </Badge>
            </div>
            <Text size="xs" variant="muted" className="mt-1 flex items-center gap-2">
              <span>Source: {lead.source}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Logged {formattedCreated}
              </span>
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/crm/leads/${lead.id}/edit`}
            className="px-4 py-2 rounded-btn bg-primary text-white text-body-xs font-semibold flex items-center gap-1.5 hover:bg-primary-hover transition-colors shadow-xs"
          >
            <Edit className="h-3.5 w-3.5" /> Edit Lead
          </Link>
        </div>
      </div>

      {/* Pipeline Stage Stepper Visualizer */}
      <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <Heading as="h3" size="sm" className="text-ink">
            Pipeline Qualification Stage
          </Heading>
          <span className="text-body-xs font-mono text-primary font-bold">
            Est. Value: ₹{(lead.estimatedValue || 0).toLocaleString('en-IN')}
          </span>
        </div>

        {lead.status === 'LOST' ? (
          <div className="p-4 rounded-lg bg-accent-rose/10 border border-accent-rose/30 text-accent-rose text-body-sm font-semibold flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            This lead inquiry was marked as LOST / Closed.
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-2 pt-2">
            {pipelineStages.map((stage, idx) => {
              const isCompleted = currentStageIndex >= idx;
              const isCurrent = currentStageIndex === idx;

              return (
                <div key={stage} className="space-y-1.5 text-center">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isCompleted ? 'bg-primary' : 'bg-surface-elevated border border-border'
                    } ${isCurrent ? 'ring-2 ring-primary/40' : ''}`}
                  />
                  <span
                    className={`text-[11px] font-semibold block ${
                      isCurrent ? 'text-primary font-bold' : isCompleted ? 'text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lead Info & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Tag className="h-4 w-4 text-primary" />
            <Heading as="h3" size="sm" className="text-ink">
              Lead Parameters
            </Heading>
          </div>

          <div className="space-y-3 text-body-sm">
            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Lead ID</span>
              <span className="text-ink font-mono font-medium block mt-0.5">{lead.id}</span>
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Intake Source</span>
              <span className="text-ink font-medium block mt-0.5">{lead.source}</span>
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Priority</span>
              <span className="text-ink font-medium block mt-0.5">{lead.priority} Priority</span>
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Assigned Operator</span>
              <span className="text-ink font-mono text-body-xs block mt-0.5">{lead.ownerId || 'System Operator'}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-card bg-surface border border-border space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <Heading as="h3" size="sm" className="text-ink">
              Financial Metric
            </Heading>
          </div>

          <div className="space-y-3 text-body-sm">
            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Estimated Deal Value</span>
              <span className="text-heading-sm font-bold font-mono text-primary mt-1 block">
                ₹{(lead.estimatedValue || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div>
              <span className="text-body-xs text-ink-muted block font-medium">Deal Classification</span>
              <span className="text-ink font-medium block mt-0.5">
                {lead.estimatedValue && lead.estimatedValue > 100000 ? 'High-Value Enterprise Deal' : 'Standard Intake Inquiry'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Details Card */}
      <div className="p-6 rounded-card bg-surface border border-border space-y-3 shadow-xs">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <FileText className="h-4 w-4 text-primary" />
          <Heading as="h3" size="sm" className="text-ink">
            Inquiry Details & Operational Notes
          </Heading>
        </div>
        <p className="text-body-sm text-ink-secondary leading-relaxed">
          {lead.notes || 'No detailed inquiry notes recorded yet for this lead.'}
        </p>
      </div>
    </div>
  );
}
