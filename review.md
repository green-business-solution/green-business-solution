# Review

Use these gates after each meaningful slice of progress.
A slice can be a bug fix, feature increment, workflow refactor, infrastructure change, data repair, docs update, or deployable change.

Each gate should pass or produce concrete follow-up work.
If a gate fails, investigate, fix when practical, and rerun the relevant check.

## A1: Integration Gate

A1 verifies that the change was reviewed against current `main` and that local work is not based on stale code.

Required steps:

1. Run `git status --short --branch`.
2. Fetch remote state when the task allows it.
3. Sync the working branch with `origin/main` when the task allows it.
4. Resolve conflicts carefully if they occur.
5. Rerun relevant A2 checks after any conflict resolution.

Typical commands:

```sh
git fetch origin
git rebase origin/main
```

Use merge instead of rebase only when repository policy or the supervising workflow requires it.
If a firstmate or no-mistakes workflow explicitly asks for a local commit handoff before pushing or rebasing, follow that workflow.
If the repository is already in the middle of a rebase or merge, finish or explicitly report that state before starting new work.
Do not overwrite another person's local changes.

## A2: Correctness Gate

A2 verifies that the change is logically correct and locally checked.
Review the diff before trusting the implementation.
Inspect the diff in a fresh and adversarial review context.

Look for:

- Broken user flows.
- Incorrect logic or missing edge cases.
- Incorrect assumptions about AWS, GitHub Actions, auth, routing, DNS, Google OAuth, external systems, or path selectors.
- Security or privacy regressions.
- Browser credential boundary violations.
- Missing tests for changed behavior.
- Regressions in adjacent behavior.
- Poor error handling.
- Stale docs, resource maps, or workflow references.
- Bad abstractions.
- Generated, build, dependency, cache, secret, or deployment output accidentally staged.

Use the CI selector when scope is unclear:

```sh
node scripts/select-ci-checks.mjs --format lines origin/main HEAD
```

Relevant local checks:

```sh
npm run check -w @gbs/api
npm run typecheck
npm run build
npx vitest run apps/api
npx vitest run apps/web
npx vitest run scripts
npm test
```

Docs-only and workflow-only changes usually need diff review plus targeted selector tests rather than full runtime checks.
If a selector script changes, run its test file.
For targeted script work, prefer the relevant script test or dry run.
Record what was run and whether each command passed.

## A3: Release Readiness Gate

A3 verifies that the branch is ready for review, CI, and any required deployment.

Required steps:

1. Confirm the final diff is scoped and coherent.
2. Confirm commit history is clear.
3. Confirm CI checks are expected for the changed paths.
4. Confirm deploy targets are selected only when runtime, infrastructure, AWS data, or AWS configuration changed.
5. Confirm post-deploy smoke checks are known for any deployment that will run.

Review for:

- Architecture fit.
- API compatibility.
- Data model and migration safety.
- Deployment risk.
- Rollback risk.
- Observability.
- Error handling.
- Security and privacy impact.
- Documentation updates.
- User-facing behavior.
- UI quality when applicable.
- Test coverage.

Use the deploy selector before any production deploy:

```sh
node scripts/select-production-deploy-targets.mjs --format lines origin/main HEAD
```

For GitHub checks and pull requests, agents should use `gh-axi` or the current repository workflow tooling.
For production deploys, use the npm deploy commands documented in [RESOURCE_MAP.md](./RESOURCE_MAP.md) and [docs/production-deployment.md](./docs/production-deployment.md).
Do not deploy for docs-only, workflow-only, or instruction-only changes.
Run end-to-end or browser checks when the change affects user flows, authentication, API integration, UI behavior, deployment routing, or production infrastructure.
After production deployment, smoke-check the affected public route or API endpoint.

## Failure Handling

When any gate fails:

1. Identify the failing command, review finding, conflict, or CI/CD check.
2. Inspect the relevant code, logs, test output, or diff.
3. Determine whether the failure is caused by the current change.
4. Fix the issue when practical.
5. Rerun the smallest relevant check that proves the issue is fixed.
6. Rerun broader checks if the fix touches shared behavior or high-risk code.
7. Record what failed, what changed, and what passed afterward.

If the issue cannot be fixed in the current session, explain the blocker clearly.

## Review Evidence

Leave concise evidence in the PR, task status, or final agent response.

Recommended format:

```md
## Review Evidence

A1 Integration Gate:
- Synced with main: yes or no
- Method: rebase, merge, already current, or not applicable
- Conflicts: none or describe

A2 Correctness Gate:
- Diff review: completed
- Checks run: list commands and results
- Checks skipped: list with reason

A3 Release Readiness Gate:
- CI expected: describe selected checks
- Deploy target: none, ci, data, api, infra, frontend, auto, or full
- Post-deploy smoke: not applicable or describe

Remaining Risk:
- No known remaining review risks, or list concrete risks.
```
