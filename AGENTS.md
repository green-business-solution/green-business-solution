# Repository Agent Instructions

This file is the entry point for coding agents working in the RetroFi / Green Business Solution repository.
Keep it specific to this project and update it when workflow, checks, deployment rules, protected files, or project boundaries change.

All coding agents working in this repository must follow [AGENT_WORKFLOW.md](./AGENT_WORKFLOW.md).
Read [review.md](./review.md) before finalizing a meaningful change.

## Project Context

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) before architecture-sensitive changes.
- Read [RESOURCE_MAP.md](./RESOURCE_MAP.md) before touching infrastructure, deployment, AWS data, runtime data, path-routed checks, or deploy selectors.
- Use [review.md](./review.md) for the A1, A2, and A3 review gates after each coherent slice of work.
- Use [TASK_LIST.md](./TASK_LIST.md) and [docs/product-todos.md](./docs/product-todos.md) for active work and product follow-ups.
- Use [ADRS/](./ADRS/) to understand durable architecture and workflow decisions.
- Use [docs/homepage-design-system.md](./docs/homepage-design-system.md) before changing homepage-adjacent public UI.
- Use [docs/workspace-architecture.md](./docs/workspace-architecture.md) and [docs/architecture-resource-map.md](./docs/architecture-resource-map.md) as detailed operational references.

## Source Of Truth

- GitHub is the source of truth for code, docs, workflow files, infrastructure templates, and project history.
- AWS is the deployment target and the source of truth for runtime data, customer uploads, runtime cache payloads, generated fixture archives, and durable cloud state.
- Do not make direct AWS changes that are missing from GitHub unless the change is an emergency hotfix.
- If a direct AWS hotfix is unavoidable, copy the matching change back into GitHub as soon as possible.
- During early development, meaningful changes should be committed and pushed promptly unless a supervising workflow explicitly asks for a local commit handoff first.
- Deploy or apply AWS changes only when runtime app behavior, infrastructure, AWS data, or AWS configuration changed.
- Do not deploy for docs-only, workflow-only, or instruction-only changes.

## Working Rules

- Check `git status` and the current branch before editing.
- Pull or rebase from GitHub when the working tree is clean and the current task allows it.
- Do not overwrite or revert another person's local changes unless the user explicitly asks for that.
- Read relevant docs, tests, scripts, and nearby code before editing.
- Keep changes scoped to the request and avoid unrelated runtime refactors.
- Prefer existing project patterns over new abstractions.
- Do not commit secrets, `.env` files, credentials, tokens, private keys, local dumps, dependency folders, build output, deployment output, or cache files.
- Treat browser clients as untrusted.
- Never expose AWS credentials, OAuth client secrets, backend secrets, database credentials, or raw secret values to frontend code.
- Use backend IAM roles, API routes, or presigned URLs for AWS access.

## Verification Rules

- Use `scripts/select-ci-checks.mjs` to choose focused checks when the changed paths are not obvious.
- Use `scripts/select-production-deploy-targets.mjs` before any production deploy.
- Run relevant checks before finishing and record what passed, failed, or was intentionally skipped.
- Run quick practical smoke checks before pushing or deploying runtime, infrastructure, AWS data, or configuration changes.
- Do not delay GitHub or AWS sharing for broad slow checks unless the user asks for deeper validation or the change is clearly risky.
- `AI_CHANGELOG.md` is no longer used.
- Put meaningful history in commits, pull requests, ADRs, product docs, resource maps, or task notes as appropriate.

Common commands:

```sh
npm run typecheck
npm test
npm run build
npm run check -w @gbs/api
```

For docs-only changes, inspect the diff and run a focused readability or link sanity check.
For code, shared data, deployment, or infrastructure changes, run the relevant typecheck, test, build, script dry run, or smoke check before pushing.

## Review Rules

- Use the A1, A2, and A3 gates in [review.md](./review.md) after each slice of progress.
- If a review gate fails, investigate, fix the issue when practical, and rerun the relevant gate.
- Record what was checked, what passed, what failed, and what remains risky.

## Deployment Rules

- GitHub Actions deploys path-selected production targets on pushes to `main`.
- Local production deploy commands are documented in [docs/production-deployment.md](./docs/production-deployment.md) and exposed as `npm run deploy:production:*`.
- Before any local production deploy, confirm the intended AWS profile and account with `aws sts get-caller-identity`.
- Documentation-only and instruction-only changes normally require only a GitHub push.
- Use the full deploy path for shared or unclear runtime changes.
- Run post-deploy smoke checks after deployment.

## Finish Summary

Every meaningful change summary should include:

- Files changed.
- Behavior changed.
- Checks or smoke tests run.
- Deployment or AWS changes made, or an explicit note that none were made.
- Remaining risks or follow-ups.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
