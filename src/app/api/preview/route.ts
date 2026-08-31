import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const slug = request.nextUrl.searchParams.get('slug');

  const expectedSecret = process.env.PAYLOAD_SECRET || 'origohost-payload-secret-key-3.x';

  if (secret !== expectedSecret || !slug) {
    return NextResponse.json({ error: 'Invalid preview parameters' }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug.startsWith('/') ? slug : `/${slug}`);
}
