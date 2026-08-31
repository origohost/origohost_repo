import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getApplicationById } from '@/services/crm/applications.service';
import { ApplicationDetailsView } from '@/features/crm/applications/ApplicationDetailsView';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = await getApplicationById(id);
  if (!res.data) return { title: 'Application Not Found — CRM' };
  return { title: `Application (${res.data.applicantName}) — CRM` };
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getApplicationById(id);
  if (!res.data) notFound();

  return <ApplicationDetailsView application={res.data} />;
}
