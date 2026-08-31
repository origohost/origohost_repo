import { NextResponse } from 'next/server';
import { authorizeCRMAction } from '@/lib/security/auth.boundary';
import { getContacts, createContact } from '@/services/crm/contacts.service';

export async function GET(request: Request) {
  const auth = await authorizeCRMAction('contacts.read', request.headers);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  const result = await getContacts();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const auth = await authorizeCRMAction('contacts.create', request.headers);
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error || 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const result = await createContact(body);
  return NextResponse.json(result, { status: 201 });
}
