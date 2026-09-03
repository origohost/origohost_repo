# features/

Domain-driven feature modules. Each feature is self-contained:

```
features/<name>/
  components/   UI specific to the feature
  hooks/        React hooks scoped to the feature
  services/     Data access, server-fn wrappers
  types.ts      Feature-local types
  schemas.ts    Zod schemas
  index.ts      Public API (re-exports)
```

Rules:

- Features may import from `@/components/ui`, `@/lib`, `@/utils`, `@/services`, `@/hooks`, `@/types`.
- Features must NOT import from another feature directly — go through `index.ts`.
- Route files in `src/routes/` compose features; they do not contain business logic.
