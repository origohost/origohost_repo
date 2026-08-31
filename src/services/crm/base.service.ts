/**
 * Base Service Contract & Data Access Repository Boundary Interface.
 *
 * Architecture:
 * UI -> Feature -> Service -> Repository -> Data Provider (Supabase)
 *
 * This boundary prevents UI components from ever calling Supabase directly.
 */

export interface BaseRepositoryContract<T> {
  findAll(params?: Record<string, unknown>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  isPlaceholderData?: boolean;
}
