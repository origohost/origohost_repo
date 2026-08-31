import { NextResponse } from 'next/server';
import { getCRMSession } from '@/lib/security/auth.boundary';
import { getOrganizationById, updateOrganization, deleteOrganization } from '@/services/crm/organizations.service';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getCRMSession();
  if (!session.isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const result = await getOrganizationById(id);
  if (!result.data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(result);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getCRMSession();
  if (!session.isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const result = await updateOrganization(id, body);
  return NextResponse.json(result);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getCRMSession();
  if (!session.isAuthenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const result = await deleteOrganization(id);
  return NextResponse.json(result);
}
