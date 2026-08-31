'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Sliders, Tag, Database, Users, ShieldCheck, Plus, CheckCircle2, Trash2, Edit3, Lock, Zap } from 'lucide-react';
import { Heading, Text, Badge } from '@/components/ui';
import { Button } from '@/components/buttons';
import { getCrmConfig, updateCrmConfig, type CrmConfigSettings } from '@/services/crm/config.service';

export function SettingsView() {
  const [config, setConfig] = useState<CrmConfigSettings | null>(null);
  const [activeTab, setActiveTab] = useState<'pipelines' | 'tags' | 'fields' | 'teams' | 'retention'>('pipelines');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    getCrmConfig().then((res) => {
      if (res.data) setConfig(res.data);
    });
  }, []);

  if (!config) return <div className="p-8 text-center text-ink-muted">Loading CRM settings...</div>;

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim() || config.tags.includes(newTag.trim())) return;
    const updatedTags = [...config.tags, newTag.trim()];
    setConfig({ ...config, tags: updatedTags });
    updateCrmConfig({ tags: updatedTags });
    setNewTag('');
    triggerSuccess();
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = config.tags.filter((t) => t !== tagToRemove);
    setConfig({ ...config, tags: updatedTags });
    updateCrmConfig({ tags: updatedTags });
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">Control & Governance</Badge>
            <span className="text-body-xs font-mono text-ink-muted">{'// CRM CONFIGURATION'}</span>
          </div>
          <Heading as="h1" size="xl" className="tracking-tight mt-1 text-ink">
            CRM System Settings & Rules
          </Heading>
          <Text size="sm" variant="secondary" className="mt-1">
            Configure dynamic pipeline stages, tags, custom field attributes, intake assignment rules, and data retention policies.
          </Text>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-card bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-body-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> CRM Configuration settings saved successfully.
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="border-b border-border flex items-center gap-6 text-body-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('pipelines')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'pipelines' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <Sliders className="h-4 w-4" /> Pipelines & Statuses
        </button>
        <button
          onClick={() => setActiveTab('tags')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'tags' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <Tag className="h-4 w-4" /> Global Tags
        </button>
        <button
          onClick={() => setActiveTab('fields')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'fields' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <Database className="h-4 w-4" /> Custom Fields
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'teams' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <Users className="h-4 w-4" /> Assignment Rules
        </button>
        <button
          onClick={() => setActiveTab('retention')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'retention' ? 'border-primary text-primary' : 'border-transparent text-ink-muted hover:text-ink'
          }`}
        >
          <ShieldCheck className="h-4 w-4" /> Data Governance
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'pipelines' && (
        <div className="space-y-6">
          <div className="p-6 rounded-card bg-surface border border-border space-y-4">
            <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Lead Pipeline Stages</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {config.leadStages.map((stg) => (
                <div key={stg.id} className="p-3 rounded-btn bg-surface-elevated border border-border/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-body-xs text-ink">{stg.name}</span>
                    <Badge variant="info" size="sm">{stg.color}</Badge>
                  </div>
                  <span className="text-[11px] text-ink-muted block">{stg.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-card bg-surface border border-border space-y-4">
            <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Application Intake Stages</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {config.applicationStages.map((stg) => (
                <div key={stg.id} className="p-3 rounded-btn bg-surface-elevated border border-border/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-body-xs text-ink">{stg.name}</span>
                    <Badge variant="primary" size="sm">{stg.color}</Badge>
                  </div>
                  <span className="text-[11px] text-ink-muted block">{stg.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tags' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Global Tag Directory</Heading>
          <form onSubmit={handleAddTag} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter new tag name..."
              className="flex-1 px-3 py-1.5 text-body-xs bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:border-primary"
            />
            <Button type="submit" size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Tag
            </Button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {config.tags.map((t) => (
              <span key={t} className="px-3 py-1 text-body-xs font-mono font-semibold rounded-btn bg-surface-elevated border border-border text-ink flex items-center gap-2">
                <span>{t}</span>
                <button onClick={() => handleRemoveTag(t)} className="text-ink-muted hover:text-rose-500 transition-colors">
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'fields' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <Heading as="h3" size="sm" className="text-ink">Custom Attributes & Schema Extensions</Heading>
            <Button size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Create Custom Field
            </Button>
          </div>
          <div className="divide-y divide-border/60">
            {config.customFields.map((cf) => (
              <div key={cf.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-body-sm text-ink block">{cf.name}</span>
                  <span className="text-body-xs font-mono text-ink-muted">key: {cf.key} • module: {cf.module} • type: {cf.type}</span>
                </div>
                <Badge variant="secondary" size="sm">Active</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <Heading as="h3" size="sm" className="text-ink">Inbound Intake Assignment Rules</Heading>
            <Button size="sm" className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Rule
            </Button>
          </div>
          <div className="space-y-3">
            {config.assignmentRules.map((rule) => (
              <div key={rule.id} className="p-3.5 rounded-btn bg-surface-elevated border border-border/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-body-sm text-ink block">{rule.name}</span>
                  <span className="text-body-xs text-ink-muted">When Pathway = {rule.triggerPathway} → Assign to {rule.assignToName} ({rule.assignToRole})</span>
                </div>
                <Badge variant={rule.isActive ? 'success' : 'secondary'} size="sm">
                  {rule.isActive ? 'ACTIVE' : 'DISABLED'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'retention' && (
        <div className="p-6 rounded-card bg-surface border border-border space-y-4 max-w-xl">
          <Heading as="h3" size="sm" className="text-ink border-b border-border pb-2">Data Governance & Retention</Heading>
          <div className="space-y-4 text-body-sm">
            <div>
              <span className="text-body-xs text-ink-muted block font-medium mb-1">Audit Log Retention (Days)</span>
              <input
                type="number"
                value={config.dataRetentionDays}
                onChange={(e) => setConfig({ ...config, dataRetentionDays: parseInt(e.target.value, 10) || 365 })}
                className="w-full px-3 py-1.5 text-body-xs bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-btn bg-surface-elevated border border-border/60">
              <div>
                <span className="font-semibold text-body-xs text-ink block">Auto-Archive Inactive Contacts</span>
                <span className="text-[11px] text-ink-muted">Automatically archive contacts with no recorded activity for 365 days.</span>
              </div>
              <input
                type="checkbox"
                checked={config.autoArchiveInactiveContacts}
                onChange={(e) => setConfig({ ...config, autoArchiveInactiveContacts: e.target.checked })}
                className="h-4 w-4 text-primary rounded"
              />
            </div>

            <Button onClick={triggerSuccess} className="w-full gap-2">
              Save Data Governance Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
