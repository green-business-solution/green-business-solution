# Agent Workflow

Use this workflow for meaningful AI-assisted changes in this repository.
It adapts the `ai-workflow` review structure to RetroFi's monorepo, AWS deployment model, and fast shared iteration rule.

GitHub is the source of truth for code, docs, workflow files, infrastructure templates, and project history.
AWS is the source of truth for deployed runtime state, durable data, customer uploads, generated fixtures, and cloud resource state.

## Start

1. Verify the current checkout, branch, and working tree with `git status --short --branch`.
2. Pull, rebase, or fast-forward from GitHub when the working tree is clean and the current task allows synchronization.
3. If the working tree is dirty, summarize local changes before editing and avoid overwriting work you did not make.
4. Read the user request and identify whether it affects frontend code, API code, scripts, data, infrastructure, docs, workflow files, or AWS resources.
5. Read [ARCHITECTURE.md](./ARCHITECTURE.md) and [RESOURCE_MAP.md](./RESOURCE_MAP.md) when the change touches system boundaries, deploy targets, AWS resources, runtime data, or path-routed checks.
6. Inspect relevant docs, tests, scripts, and nearby code before editing.
7. If the change may affect production routing, run or inspect the selector commands documented in [RESOURCE_MAP.md](./RESOURCE_MAP.md).

## Change

1. Make the smallest coherent change that satisfies the request.
2. Follow existing project patterns and avoid unrelated runtime refactors.
3. Keep browser code untrusted and keep secrets out of Git.
4. Update docs when architecture, deployment behavior, resource ownership, product direction, review expectations, or workflow expectations change.
5. Use ADRs for durable decisions that future agents should understand before changing the same area.
6. Do not update `AI_CHANGELOG.md`; it has been removed from the workflow.

## Verify

1. Review the diff before running checks.
2. Use `node scripts/select-ci-checks.mjs --format lines origin/main HEAD` or the changed-file stdin mode to select focused checks when the correct scope is not obvious.
3. Run the smallest relevant command set that proves the change:
   - API syntax: `npm run check -w @gbs/api`
   - API tests: `npx vitest run apps/api`
   - frontend typecheck: `npm run typecheck`
   - frontend build: `npm run build`
   - frontend tests: `npx vitest run apps/web`
   - script tests: `npx vitest run scripts`
   - all tests: `npm test`
4. For docs-only and workflow-only changes, a diff review plus targeted selector tests is usually enough.
5. Record checks that could not be run and explain why.

## Review

1. Apply the A1, A2, and A3 gates in [review.md](./review.md) for every meaningful slice of progress.
2. If a gate fails, investigate, fix when practical, and rerun the relevant check.
3. If a failure is unrelated to the current change, report it clearly and preserve the evidence.
4. Leave review evidence in the pull request, task status, or final agent response.

## Finish

1. Commit meaningful repository changes with a clear message.
2. During early development, push useful changes to GitHub promptly unless a supervising workflow explicitly asks for a local commit handoff first.
3. Never push to the default branch from an agent task branch.
4. Use `node scripts/select-production-deploy-targets.mjs --format lines origin/main HEAD` before deploying production changes.
5. Deploy or apply AWS changes only when runtime app behavior, infrastructure, AWS data, or AWS configuration changed.
6. Do not deploy for docs-only, workflow-only, or instruction-only changes.
7. Provide a concise final summary with changed files, behavior changes, checks, deployment or AWS actions, and remaining risks.

## Fast Shared Iteration

RetroFi is still in early development.
Do not leave useful changes only on one laptop when the task expects shared progress.
Human testing is not required before GitHub or AWS sharing, but agent-run checks and smoke tests still matter.
Broad or slow local checks should not block sharing unless the user asks for deeper validation or the change is clearly risky.

If an agent changes code directly on AWS, the same change must be copied back into GitHub as soon as possible.
Direct AWS edits are temporary hotfixes until they are committed and pushed.

Agents should avoid overlapping edits to the same files.
If overlap is necessary, one agent should finish, commit, and push before the next agent starts.

Exploratory local edits do not need to be committed if they are discarded before affecting the app, deployment, AWS, or shared repo state.
