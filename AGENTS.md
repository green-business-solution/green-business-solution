# Repository Agent Instructions

All coding agents working in this repository must follow `AGENT_WORKFLOW.md`.
Read `review.md` before finalizing a meaningful change.

## Project Context

- `ARCHITECTURE.md` summarizes the current npm workspace, React/Vite frontend, Express/Lambda API, DynamoDB/S3 data model, and deployment shape.
- `RESOURCE_MAP.md` maps source paths to runtime surfaces, checks, deploy targets, and AWS resources.
- `docs/workspace-architecture.md` and `docs/architecture-resource-map.md` are detailed operational references.
- `TASK_LIST.md` tracks active workflow-level follow-ups.
- `ADRS/` records architecture decisions that future agents should preserve.
- `AI_CHANGELOG.md` records meaningful LLM-authored changes.

## Source Of Truth

- GitHub is the source of truth for code and project history.
- AWS is the source of truth for deployed runtime state and durable data.
- Do not leave useful changes only on one laptop during this early development phase.
- Do not make direct AWS changes without committing the corresponding source or documentation update when one is needed.

## Working Rules

- Run `git status --short --branch` before editing.
- If the working tree is clean, fetch and sync with `origin/main` before starting meaningful work.
- If the working tree is dirty, identify existing local changes and avoid overwriting them.
- Keep changes scoped to the user's request.
- Prefer existing project patterns over new abstractions.
- Do not commit secrets, `.env` files, credentials, tokens, private keys, local dumps, or raw secret values.
- Keep browser clients untrusted.
- Never expose AWS credentials, backend secrets, database credentials, OAuth client secrets, or raw secret values to frontend code.
- Use the backend API, IAM roles, or presigned URLs for AWS access.
- Update `AI_CHANGELOG.md` for meaningful LLM-authored changes.

## Checks

Use the smallest safe check set from `RESOURCE_MAP.md`.
Common commands:

```sh
npm run typecheck
npm test
npm run build
npm run check -w @gbs/api
```

For docs-only changes, inspect the diff and run a focused readability/link sanity check.
For code, shared data, deployment, or infrastructure changes, run the relevant typecheck, test, build, script dry run, or smoke check before pushing.

## Review Rules

- Use the A1, A2, and A3 gates in `review.md` after each slice of progress.
- If a review gate fails, investigate, fix the issue when practical, and rerun the relevant gate.
- Record what was checked, what passed, what failed, and what remains risky.

## Deployment Rules

- GitHub Actions deploys path-selected production targets on pushes to `main`.
- Local production deploy commands are documented in `docs/production-deployment.md` and exposed as `npm run deploy:production:*`.
- Before any local production deploy, confirm the intended AWS profile and account with `aws sts get-caller-identity`.
- Documentation-only and instruction-only changes normally require only a GitHub push.
- Use the full deploy path for shared or unclear runtime changes.
- Run post-deploy smoke checks after deployment.
