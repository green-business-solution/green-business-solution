# Review

This file defines the review process agents should use after each slice of progress.
A slice of progress is a small coherent unit of work, such as one bug fix, one feature increment, one refactor step, one docs update, or one deployable change.

The review process has three gates:

1. A1: Integration Gate.
2. A2: Correctness Gate.
3. A3: Release Readiness Gate.

Each gate must either pass or produce concrete follow-up work.
If a gate fails, investigate the failure, fix the issue when practical, and rerun the relevant gate.

## A1: Integration Gate

A1 verifies that the branch is integrated with the latest main branch and that local work is not based on stale code.

Required steps:

1. Run `git status --short --branch`.
2. If the working tree is clean, fetch the latest remote state.
3. Sync with `origin/main`.
4. Resolve any conflicts carefully.
5. Rerun relevant A2 checks after conflict resolution.

Typical workflow:

```sh
git fetch origin
git rebase origin/main
```

If the repository is already in the middle of a rebase or merge, finish or explicitly report that state before starting new work.
Do not overwrite another person's local changes.

## A2: Correctness Gate

A2 verifies that the change is logically correct in a fresh and adversarial review context.
Inspect the diff and look for ways the change could fail.

The adversarial review should check for:

- Incorrect logic.
- Missing edge cases.
- Broken user flows.
- Security or privacy issues.
- Bad abstractions.
- Incorrect assumptions about AWS, Google OAuth, browser trust, DNS, GitHub Actions, or external systems.
- Missing tests.
- Regressions in adjacent behavior.
- Poor error handling.
- Stale docs or resource maps.

Choose checks from `RESOURCE_MAP.md`.
Selector command:

```sh
node scripts/select-ci-checks.mjs --format lines BASE_REF HEAD_REF
```

Common local checks:

```sh
npm run check -w @gbs/api
npm run typecheck
npm test
npm run build
```

For targeted script work, prefer the relevant script test or dry run.
For docs-only changes, A2 can be limited to diff review, Markdown readability, and link/path sanity checks.
Record what was run and whether each command passed.

## A3: Release Readiness Gate

A3 verifies that the change is ready for broader review, CI, and deployment.
This is the full code review stage.

The full review should check:

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

For GitHub projects, check PR or Actions results when available:

```sh
gh pr checks
gh run list --limit 10
```

Run end-to-end or browser smoke checks when the change affects user flows, integrations, infrastructure, authentication, permissions, data movement, or deployment behavior.
After production deployment, smoke-check the affected public route or API endpoint.
Documentation-only changes normally do not require deployment.

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

Every completed review should leave a short evidence trail in the final agent message, PR comment, or task update.

Recommended format:

```md
## Review Evidence

A1 Integration Gate:
- Synced with main: yes
- Method: rebase
- Conflicts: none

A2 Correctness Gate:
- Adversarial review: completed
- Type checks: passed
- Smoke tests: not applicable
- Unit tests: passed
- Lint: not configured

A3 Release Readiness Gate:
- Full code review: completed
- CI/CD checks: not run locally
- E2E tests: not applicable
- Deployment: not required

Notes:
- No known remaining review risks.
```
