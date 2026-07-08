# Task List

This file is the lightweight workflow task index for agents.
Use GitHub issues, product docs, or dedicated runbooks for large planning.
Use [docs/product-todos.md](./docs/product-todos.md) for product backlog details.

## Active Sources

- Product and data-quality backlog: [docs/product-todos.md](./docs/product-todos.md).
- Current restart handoff: [docs/restart-handoff-2026-07-07.md](./docs/restart-handoff-2026-07-07.md).
- Architecture and deployment routing: [ARCHITECTURE.md](./ARCHITECTURE.md), [RESOURCE_MAP.md](./RESOURCE_MAP.md), and [docs/architecture-resource-map.md](./docs/architecture-resource-map.md).

## Active Workflow Follow-Ups

- [ ] Audit docs and scripts that still assume the legacy `gbs` profile or account `448016109714` for production.
  - Owner: unassigned
  - Status: not started
  - Branch: none
  - Blocker: requires AWS/profile migration review
  - Notes: Preserve explicit legacy-account commands that are still needed for rollback or data-copy history.
- [ ] Keep `RESOURCE_MAP.md` and `docs/architecture-resource-map.md` synchronized as ownership changes.
  - Owner: agents as needed
  - Status: ongoing
  - Branch: none
  - Blocker: none
  - Notes: Current root map summarizes the detailed docs map.
- [ ] Add ADRs when a future architecture, infrastructure, or workflow decision needs durable context.
  - Owner: agents as needed
  - Status: ongoing
  - Branch: none
  - Blocker: none
  - Notes: Use [ADRS/README.md](./ADRS/README.md) before adding a record.
- [ ] Add `AI_RESOURCES/` only when RetroFi has reusable repo-specific skills, scripts, or templates that are not already covered by committed scripts or docs.
  - Owner: agents as needed
  - Status: deferred
  - Branch: none
  - Blocker: none
  - Notes: The first workflow pass intentionally avoids empty template folders.

## Blocked

- [ ] None.
  - Owner: unassigned
  - Status: not blocked
  - Branch: none
  - Blocker: none
  - Notes: Replace this item when real blocked work exists.

## Done

- [x] Adopt first-pass root workflow structure from `ai-workflow`.
  - Owner: Codex
  - Status: done
  - Branch: `fm/adopt-ai-workflow-f4`
  - Notes: Added root workflow docs and ADRs, added task and review gates, and removed the manual AI changelog process.
