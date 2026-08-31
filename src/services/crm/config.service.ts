import type { ServiceResult } from './base.service';

export interface PipelineStageConfig {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface CustomFieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'date';
  module: 'contacts' | 'leads' | 'applications' | 'organizations';
  required?: boolean;
  options?: string[];
}

export interface AssignmentRuleConfig {
  id: string;
  name: string;
  triggerPathway?: string;
  assignToRole: string;
  assignToName: string;
  isActive: boolean;
}

export interface CrmConfigSettings {
  leadStages: PipelineStageConfig[];
  applicationStages: PipelineStageConfig[];
  tags: string[];
  customFields: CustomFieldConfig[];
  assignmentRules: AssignmentRuleConfig[];
  dataRetentionDays: number;
  autoArchiveInactiveContacts: boolean;
}

const defaultConfig: CrmConfigSettings = {
  leadStages: [
    { id: 'stg-1', name: 'NEW', color: 'blue', description: 'Inbound prospect intake' },
    { id: 'stg-2', name: 'CONTACTED', color: 'indigo', description: 'Initial discovery touchpoint logged' },
    { id: 'stg-3', name: 'QUALIFIED', color: 'amber', description: 'Technical & budget requirements verified' },
    { id: 'stg-4', name: 'PROPOSAL', color: 'purple', description: 'Formal partnership proposal submitted' },
    { id: 'stg-5', name: 'CONVERTED', color: 'emerald', description: 'Converted to active partner/member' },
    { id: 'stg-6', name: 'LOST', color: 'rose', description: 'Opportunity closed or disqualified' },
  ],
  applicationStages: [
    { id: 'app-stg-1', name: 'PENDING', color: 'blue', description: 'Awaiting operator initial review' },
    { id: 'app-stg-2', name: 'REVIEW', color: 'amber', description: 'Technical evaluation in progress' },
    { id: 'app-stg-3', name: 'APPROVED', color: 'emerald', description: 'Approved and contact onboarded' },
    { id: 'app-stg-4', name: 'REJECTED', color: 'rose', description: 'Application declined' },
  ],
  tags: [
    'Infrastructure', 'Developer', 'Node-Operator', 'Campus', 'Sponsor',
    'VIP', 'Grant-Applicant', 'Summit-2026', 'Incubator', 'Mentor'
  ],
  customFields: [
    { id: 'cf-1', name: 'GitHub Handle', key: 'githubHandle', type: 'text', module: 'contacts' },
    { id: 'cf-2', name: 'Node Public Key', key: 'nodePublicKey', type: 'text', module: 'organizations' },
    { id: 'cf-3', name: 'Target Cohort', key: 'targetCohort', type: 'select', module: 'applications', options: ['Q3 2026', 'Q4 2026', 'Q1 2027'] },
  ],
  assignmentRules: [
    { id: 'ar-1', name: 'Node Operator Intake Auto-Assign', triggerPathway: 'INFRASTRUCTURE_PARTNER', assignToRole: 'Infrastructure Ops', assignToName: 'Alex Mercer', isActive: true },
    { id: 'ar-2', name: 'Developer Grant Intake Auto-Assign', triggerPathway: 'ECOSYSTEM_DEVELOPER', assignToRole: 'Developer Relations', assignToName: 'Elena Rostova', isActive: true },
  ],
  dataRetentionDays: 365,
  autoArchiveInactiveContacts: false,
};

let currentConfig: CrmConfigSettings = { ...defaultConfig };

export async function getCrmConfig(): Promise<ServiceResult<CrmConfigSettings>> {
  return { success: true, data: currentConfig };
}

export async function updateCrmConfig(data: Partial<CrmConfigSettings>): Promise<ServiceResult<CrmConfigSettings>> {
  currentConfig = {
    ...currentConfig,
    ...data,
  };
  return { success: true, data: currentConfig };
}
