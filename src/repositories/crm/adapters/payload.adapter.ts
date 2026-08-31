/**
 * Payload CMS Data Adapter Layer for OrigoHOST CRM.
 * Manages CMS content references (Media assets, CMS Program Cohorts, Public Articles)
 * without coupling operational CRM logic to CMS internals.
 */

export interface PayloadCMSContentRef {
  id: string;
  collection: 'programs' | 'articles' | 'media' | 'events';
  slug: string;
  title: string;
  updatedAt: string;
}

export class PayloadAdapter {
  /**
   * Resolves a CMS program cohort reference by ID or slug.
   */
  static async resolveProgramReference(programIdOrSlug: string): Promise<PayloadCMSContentRef | null> {
    // Adapter boundary pattern - connects Payload CMS when available
    return {
      id: programIdOrSlug,
      collection: 'programs',
      slug: programIdOrSlug,
      title: 'Infrastructure Partner Program Cohort Q4',
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Resolves CMS media/asset reference URL.
   */
  static async resolveMediaUrl(mediaId: string): Promise<string> {
    return `/media/assets/${mediaId}.png`;
  }
}
