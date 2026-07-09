# ADR 0001: Adopt Root AI Workflow Files

## Status

Accepted

## Date

2026-07-08

## Context

RetroFi / Green Business Solution already had useful agent instructions, deployment notes, workspace architecture docs, and a combined architecture resource map.
The `ai-workflow` reference repository recommends durable root files for agent instructions, architecture, resource mapping, review gates, task tracking, and ADRs.
Future AI-assisted sessions need reliable repo memory for source-to-runtime mapping, AWS boundaries, review evidence, and deployment decisions.
The previous workflow also required agents to maintain `AI_CHANGELOG.md`, which had become a large manual narrative log and duplicated commit history.

## Decision

Adopt the highest-value root workflow files from `ai-workflow` and customize them for RetroFi.
Keep GitHub as the source of truth for code, docs, workflow files, and infrastructure templates.
Keep AWS as the source of truth for runtime data and cloud resource state.
Use root `AGENTS.md`, `CLAUDE.md`, `AGENT_WORKFLOW.md`, `ARCHITECTURE.md`, `RESOURCE_MAP.md`, `review.md`, `TASK_LIST.md`, `template.md`, `ADRS/`, and `AI_RESOURCES/` as the agent workflow entry points.
Remove the manual `AI_CHANGELOG.md` workflow and put meaningful history in commits, pull requests, ADRs, product docs, resource maps, or task notes.

## Alternatives Considered

- Copy the `ai-workflow` repository structure wholesale.
  This was rejected because RetroFi already has project-specific docs, selectors, deployment scripts, and AWS resource maps that should remain authoritative.
- Keep only the existing `AGENTS.md` and `AGENT_WORKFLOW.md`.
  This was rejected because review gates, root-level architecture discovery, resource routing, and durable task tracking would remain incomplete.
- Keep `AI_CHANGELOG.md` and only add new root docs.
  This was rejected because the changelog requirement contradicts the new commit, PR, and review evidence workflow.
- Move all existing architecture content into new root files immediately.
  This was rejected for the first pass because `docs/architecture-resource-map.md` already contains detailed operational inventory and can be linked from root entry points.

## Consequences

Future agents have stable root files to read before editing.
Workflow changes are easier to review because process expectations live in dedicated files instead of a growing changelog.
Runtime app architecture is unchanged by this decision.
Detailed resource inventory still needs to stay synchronized between root workflow entry points and existing docs.

## Follow-Up

- [ ] Audit docs and scripts that still assume the legacy `gbs` profile or account `448016109714` for production.
- [ ] Keep `RESOURCE_MAP.md` and `docs/architecture-resource-map.md` synchronized as ownership changes.
- [ ] Add more ADRs when future infrastructure, architecture, or workflow decisions need durable context.
- [ ] Populate `AI_RESOURCES/Skills/` or `AI_RESOURCES/Scripts/` only when RetroFi has real reusable repo-specific agent assets to store there.
