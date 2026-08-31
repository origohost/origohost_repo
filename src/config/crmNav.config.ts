import {
  TrendingUp, Users, Building2, Target, FileText,
  Activity, Mail, CalendarCheck, Calendar, Compass,
  CheckSquare, BarChart3, Settings, Zap, Filter,
  Upload, Download, Search, UserCheck, ShieldCheck,
  GitMerge, FileCode, Clock, LucideIcon
} from 'lucide-react';
import type { CRMRole } from '@/types/crm/auth.types';

export interface CrmNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  requiredRoles?: CRMRole[];
}

export interface CrmNavSection {
  title: string;
  items: CrmNavItem[];
}

export const crmNavConfig: CrmNavSection[] = [
  {
    title: 'Command Center',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/crm/dashboard', icon: TrendingUp },
      { id: 'search', label: 'Global Search', href: '/crm/search', icon: Search },
    ],
  },
  {
    title: 'Ecosystem Workspace',
    items: [
      { id: 'contacts', label: 'Contacts', href: '/crm/contacts', icon: Users },
      { id: 'organizations', label: 'Organizations', href: '/crm/organizations', icon: Building2 },
      { id: 'leads', label: 'Leads Pipeline', href: '/crm/leads', icon: Target },
      { id: 'applications', label: 'Applications', href: '/crm/applications', icon: FileText },
      { id: 'community', label: 'Community Members', href: '/crm/community', icon: UserCheck },
    ],
  },
  {
    title: 'Engagement Operations',
    items: [
      { id: 'activities', label: 'Activities Log', href: '/crm/activities', icon: Activity },
      { id: 'tasks', label: 'Tasks & To-Dos', href: '/crm/tasks', icon: CheckSquare },
      { id: 'communications', label: 'Communications', href: '/crm/communications', icon: Mail },
      { id: 'templates', label: 'Templates', href: '/crm/templates', icon: FileCode },
      { id: 'segments', label: 'Segmentation', href: '/crm/segments', icon: Filter },
      { id: 'automations', label: 'Automations', href: '/crm/automations', icon: Zap },
      { id: 'scheduled-actions', label: 'Scheduled Actions', href: '/crm/scheduled-actions', icon: Clock },
    ],
  },
  {
    title: 'Events & Programs',
    items: [
      { id: 'events', label: 'Events Operations', href: '/crm/events', icon: Calendar },
      { id: 'registrations', label: 'Registrations', href: '/crm/registrations', icon: CalendarCheck },
      { id: 'programs', label: 'Program Cohorts', href: '/crm/programs', icon: Compass },
    ],
  },
  {
    title: 'Data & Governance',
    items: [
      { id: 'reports', label: 'Reports & Analytics', href: '/crm/reports', icon: BarChart3 },
      { id: 'data-quality', label: 'Data Quality & Duplicates', href: '/crm/data-quality', icon: GitMerge },
      { id: 'imports', label: 'Data Import', href: '/crm/imports', icon: Upload },
      { id: 'exports', label: 'Data Export', href: '/crm/exports', icon: Download },
      { id: 'audit', label: 'Audit Log Trail', href: '/crm/audit', icon: ShieldCheck },
      { id: 'settings', label: 'CRM Settings', href: '/crm/settings', icon: Settings },
    ],
  },
];


