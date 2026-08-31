# OrigoHOST — Deployment Documentation Index

This folder documents environments, deployment workflow, pre-launch checklist and release gates.

---

## Documents in This Folder

| Document | Purpose |
|----------|---------|
| [environments.md](./environments.md) | Environment definitions and configuration rules |
| [deployment-checklist.md](./deployment-checklist.md) | Full pre-launch and release checklist |
| [release-gates.md](./release-gates.md) | Quality and approval gates required before release |

---

## Deployment Principles

1. No code goes directly to production — it must pass development → staging → production.
2. Every deployment must have a rollback strategy.
3. Environment-specific configuration must never be hardcoded.
4. All secrets and credentials must be managed via environment variables, not source code.
5. Analytics and privacy consent must be reviewed and approved before launch.
6. Security baseline must be confirmed before any public launch.
