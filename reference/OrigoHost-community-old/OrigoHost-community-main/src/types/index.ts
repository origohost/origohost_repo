/**
 * Shared application types. Feature-specific types live in
 * src/features/<feature>/types.ts.
 */

export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
