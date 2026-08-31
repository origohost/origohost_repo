import { NextResponse } from 'next/server';
import { authorizeCRMAction } from '@/lib/security/auth.boundary';
import { getLeads, createLead } from '@/services/crm/leads.service';

export async function GET(request: Request) {
  const auth = await authorizeCRMAction('leads.read', request.headers);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  const result = await getLeads();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const auth = await authorizeCRMAction('leads.create', request.headers);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const result = await createLead(body);
  return NextResponse.json(result, { status: 201 });
}
