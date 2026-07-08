# ADR 0001: Adopt Durable AI Workflow Docs

## Status

Accepted

## Date

2026-07-08

## Context

Green Business Solution already had project-specific agent instructions and a fast-iteration workflow.
The project also had detailed docs for workspace architecture and resource mapping.
It did not yet have the full durable root structure recommended by the reusable AI workflow template: root architecture docs, resource map, task list, review gates, ADRs, and AI resource starter folders.

Future AI-assisted sessions need reliable repo memory for source-to-runtime mapping, AWS boundaries, review evidence, and deployment decisions.

## Decision

Adopt the reusable AI workflow structure in this repository and customize it for the existing npm workspace, React/Vite frontend, Express/Lambda API, DynamoDB, S3, CloudFormation, GitHub Actions, and deploy-selector workflow.

The adopted files are:

- `AGENTS.md`
- `AGENT_WORKFLOW.md`
- `ARCHITECTURE.md`
- `RESOURCE_MAP.md`
- `TASK_LIST.md`
- `review.md`
- `template.md`
- `ADRS/`
- `AI_RESOURCES/`

## Alternatives Considered

- Keep only the existing `AGENTS.md` and `AGENT_WORKFLOW.md`: rejected because review gates and root-level agent discovery would remain incomplete.
- Copy the workflow template without customization: rejected because agents need this project's actual workspace paths, checks, selectors, AWS accounts, stacks, and deploy commands.
- Move all operational docs into `docs/`: rejected because the workflow template expects root files that agents discover quickly.

## Consequences

Future agents have a clearer starting point and a safer path for code, data, infrastructure, and deployment work.
The project now has more documentation to keep current when resources or workflows change.
Review and deploy decisions should reference `RESOURCE_MAP.md`, `docs/architecture-resource-map.md`, and `review.md` instead of relying on one-off chat context.

## Follow-Up

- [ ] Audit docs and scripts that still assume legacy `gbs` profile or account `448016109714` for production.
- [ ] Decide whether `docs/architecture-resource-map.md` should be merged into root `RESOURCE_MAP.md`.
