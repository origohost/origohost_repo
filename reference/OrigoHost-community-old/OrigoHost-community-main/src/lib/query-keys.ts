export const queryKeys = {
  events: {
    all: ["events"] as const,
    list: () => [...queryKeys.events.all, "list"] as const,
    detail: (id: string) => [...queryKeys.events.all, "detail", id] as const,
  },
  jobs: {
    all: ["jobs"] as const,
    list: () => [...queryKeys.jobs.all, "list"] as const,
    detail: (id: string) => [...queryKeys.jobs.all, "detail", id] as const,
  },
  partners: {
    all: ["partners"] as const,
    list: () => [...queryKeys.partners.all, "list"] as const,
    detail: (id: string) => [...queryKeys.partners.all, "detail", id] as const,
  },
  blog: {
    all: ["blog"] as const,
    list: () => [...queryKeys.blog.all, "list"] as const,
    detail: (id: string) => [...queryKeys.blog.all, "detail", id] as const,
  },
  admin: {
    messages: ["admin", "messages"] as const,
    metrics: ["admin", "metrics"] as const,
    table: (tableName: string) => ["admin", "table", tableName] as const,
  },
  gallery: {
    albums: ["gallery", "albums"] as const,
  },
  certificates: {
    detail: (id: string) => ["certificate", id] as const,
  },
} as const;
