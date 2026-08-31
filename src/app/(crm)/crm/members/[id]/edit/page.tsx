'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { CrmPageHeader, LoadingState } from '@/features/crm/components';
import { getMemberById, updateMember } from '@/services/crm/members.service';
import type { MemberRole, MemberStatus, ChapterName } from '@/types/crm';

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<MemberRole>('Developer');
  const [status, setStatus] = useState<MemberStatus>('Active');
  const [chapter, setChapter] = useState<ChapterName>('Independent');
  const [organization, setOrganization] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      getMemberById(id).then((res) => {
        if (res.data) {
          setFullName(res.data.fullName);
          setEmail(res.data.email || '');
          setPhone(res.data.phone || '');
          setRole(res.data.role || 'Developer');
          setStatus(res.data.status || 'Active');
          setChapter(res.data.chapter || 'Independent');
          setOrganization(res.data.organization || '');
          setGithubUrl(res.data.githubUrl || '');
          setLinkedinUrl(res.data.linkedinUrl || '');
          setSkillsInput((res.data.skills || []).join(', '));
          setNotes(res.data.notes || '');
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !fullName.trim() || !email.trim()) return;
    setIsSubmitting(true);

    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    await updateMember(id, {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      status,
      chapter,
      organization: organization.trim(),
      githubUrl: githubUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      skills,
      notes: notes.trim(),
    });

    router.push(`/crm/members/${id}`);
  };

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href={`/crm/members/${id}`}
          className="inline-flex items-center gap-1.5 text-body-xs font-semibold text-primary hover:underline mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Member Profile
        </Link>
        <CrmPageHeader
          title={`Edit Member — ${fullName}`}
          subtitle="Update community role, chapter affiliation, technical skills, or contact info."
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-card bg-surface border border-border space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Organization / University</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Community Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as MemberRole)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Student" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Student</option>
              <option value="Developer" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Developer</option>
              <option value="Chapter Lead" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Chapter Lead</option>
              <option value="Speaker" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Speaker</option>
              <option value="Mentor" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Mentor</option>
              <option value="Organizer" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Organizer</option>
              <option value="Contributor" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Contributor</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Campus / Hub Chapter</label>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value as ChapterName)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="DTU Chapter" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">DTU Chapter</option>
              <option value="GL Bajaj Chapter" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">GL Bajaj Chapter</option>
              <option value="OpenSource India Hub" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">OpenSource India Hub</option>
              <option value="Global Developer Network" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Global Developer Network</option>
              <option value="Independent" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Independent</option>
            </select>
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as MemberStatus)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="Active" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Active</option>
              <option value="Pending" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Pending</option>
              <option value="Alumni" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Alumni</option>
              <option value="Inactive" className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">GitHub Profile URL</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="block text-body-xs font-semibold text-ink mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Technical Skills (comma-separated)</label>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="block text-body-xs font-semibold text-ink mb-1">Community Notes & Contributions</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 text-body-sm bg-surface-elevated border border-border rounded-btn text-ink focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary-hover transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? 'Saving Changes...' : 'Save Member Changes'}
        </button>
      </form>
    </div>
  );
}
