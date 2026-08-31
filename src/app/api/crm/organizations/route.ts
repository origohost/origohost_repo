import { NextResponse } from 'next/server';
import { authorizeCRMAction } from '@/lib/security/auth.boundary';
import { getOrganizations, createOrganization } from '@/services/crm/organizations.service';

export async function GET(request: Request) {
  const auth = await authorizeCRMAction('organizations.read', request.headers);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  const result = await getOrganizations();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const auth = await authorizeCRMAction('organizations.create', request.headers);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const result = await createOrganization(body);
  return NextResponse.json(result, { status: 201 });
}
