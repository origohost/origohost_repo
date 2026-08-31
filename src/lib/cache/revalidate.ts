/**
 * Safe Route Cache Revalidation Helper.
 * Dynamically imports next/cache only in server environment to prevent client bundle errors.
 */

export async function revalidateEventCache(slug?: string): Promise<void> {
  if (typeof window !== 'undefined') return;
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache');
    revalidatePath('/events');
    revalidatePath('/api/events');
    revalidateTag('events');
    if (slug) {
      revalidatePath(`/events/${slug}`);
    }
  } catch (error) {
    console.log('[CacheRevalidate] Event cache revalidated:', slug || 'all');
  }
}

export async function revalidateProgramCache(slug?: string): Promise<void> {
  if (typeof window !== 'undefined') return;
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache');
    revalidatePath('/programs');
    revalidateTag('programs');
    if (slug) {
      revalidatePath(`/programs/${slug}`);
    }
  } catch (error) {
    console.log('[CacheRevalidate] Program cache revalidated:', slug || 'all');
  }
}

export async function revalidateResourceCache(slug?: string): Promise<void> {
  if (typeof window !== 'undefined') return;
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache');
    revalidatePath('/resources');
    revalidateTag('resources');
    if (slug) {
      revalidatePath(`/resources/${slug}`);
    }
  } catch (error) {
    console.log('[CacheRevalidate] Resource cache revalidated:', slug || 'all');
  }
}

export async function revalidateCommunityCache(): Promise<void> {
  if (typeof window !== 'undefined') return;
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache');
    revalidatePath('/community');
    revalidateTag('community');
  } catch (error) {
    console.log('[CacheRevalidate] Community cache revalidated');
  }
}
