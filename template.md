# Template

This repository uses a durable AI-assisted project workflow.
GitHub is the source of truth for code and project history.
AWS is the source of truth for deployed runtime state and durable data.

## Project Files

Root workflow files:

```text
AGENTS.md
AGENT_WORKFLOW.md
ARCHITECTURE.md
RESOURCE_MAP.md
TASK_LIST.md
review.md
template.md

ADRS/
AI_RESOURCES/
```

## Root Files

`AGENTS.md` tells agents how to work in this repository.
It includes repo-specific rules, test commands, protected boundaries, review expectations, and deployment notes.

`AGENT_WORKFLOW.md` defines the start, change, verify, review, and finish loop for AI-assisted work.

`ARCHITECTURE.md` summarizes the major architecture of the codebase.
It covers the npm workspace layout, React/Vite frontend, Express/Lambda backend, DynamoDB/S3 data boundary, and deployment shape.

`RESOURCE_MAP.md` explains how source paths map to runtime surfaces, AWS resources, deploy targets, and checks.
It must not contain secrets, tokens, passwords, private keys, or raw secret values.

`TASK_LIST.md` is the lightweight workflow task list for agents and humans.
Use `docs/product-todos.md` for product backlog detail.

`review.md` defines the A1, A2, and A3 review gates.

`ADRS/` stores architecture decision records.

`AI_RESOURCES/` stores reusable agent assets, scripts, skills, and templates.

## Modular Build And Deploy Boundaries

Keep frontend, backend, data, infrastructure, and shared-code paths modular.
Editing one area should not force unrelated areas to be rebuilt, redeployed, or reviewed unless shared contracts, package inputs, generated fixtures, or runtime configuration are affected.

Use `RESOURCE_MAP.md` and the selector scripts to select checks and deploy targets.
If a change cannot be confidently classified, run broader checks and use the broader deploy path.

## Review Discipline

After a meaningful slice of progress, apply the review gates in `review.md`.
For docs-only work, a diff review and Markdown/link sanity check can satisfy A2.
For runtime or AWS-facing work, run the relevant local checks, push, deploy when required, and smoke-check the affected runtime surface.

## Secret Safety

Do not commit secrets.
Keep OAuth client secrets, AWS credentials, session tokens, private keys, database credentials, and raw secret values out of docs, frontend code, fixtures, prompts, and Git history.
