export interface BaseRepositoryContract<T> {
  findAll(query?: string, filter?: Record<string, unknown>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  softDelete(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
  archive(id: string): Promise<boolean>;
}
