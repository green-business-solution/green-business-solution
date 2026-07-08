# Task List

This file tracks active workflow-level project work for humans and agents.
Keep entries short, concrete, and easy to update.
Use `docs/product-todos.md` for product backlog details.

## Active

- [ ] Audit docs and scripts that still assume the legacy `gbs` profile or account `448016109714` for production.
  - Owner: unassigned
  - Status: not started
  - Branch: none
  - Blocker: requires AWS/profile migration review
  - Notes: Preserve explicit legacy-account commands that are still needed for rollback or data-copy history.

- [ ] Decide whether `docs/architecture-resource-map.md` should be merged into root `RESOURCE_MAP.md`.
  - Owner: unassigned
  - Status: not started
  - Branch: none
  - Blocker: none
  - Notes: Current root map summarizes the detailed docs map.

## Blocked

- [ ] None.
  - Owner: unassigned
  - Status: not blocked
  - Branch: none
  - Blocker: none
  - Notes: Replace this item when real blocked work exists.

## Done

- [x] Adopt the reusable AI workflow documentation structure.
  - Owner: codex
  - Status: done
  - Branch: codex/ai-workflow-docs
  - Notes: Added root workflow docs, ADRs, resource map, task list, and AI resource starter folders.
