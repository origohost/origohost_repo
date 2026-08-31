import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');
  const tag = request.nextUrl.searchParams.get('tag');

  const expectedSecret = process.env.PAYLOAD_SECRET || 'origohost-payload-secret-key-3.x';

  if (secret !== expectedSecret) {
    return NextResponse.json({ error: 'Invalid revalidation token' }, { status: 401 });
  }

  if (path) {
    revalidatePath(path);
  }

  if (tag) {
    revalidateTag(tag);
  }

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    path: path || null,
    tag: tag || null,
  });
}
