# Agent Workflow

GitHub is the source of truth for this project.
AWS is the source of truth for deployed runtime state and durable data.

## Fast-Iteration Rule

This project is in early development.
Agents should optimize for fast shared iteration over local-only polish.

After making a meaningful change:

1. Commit and push it to GitHub immediately.
2. If the change affects deployed app behavior, infrastructure, AWS data, or AWS configuration, deploy/apply the corresponding AWS change immediately.
3. Do not leave useful changes only on one laptop.
4. Do not wait on human/user testing before sharing changes.
5. Run quick practical smoke checks before pushing and deploying when the change affects code, configuration, infrastructure, AWS data, or runtime behavior.
6. Do not delay GitHub/AWS sharing for broad or slow local test passes unless the user explicitly asks for deeper testing or the change is clearly risky.
7. If quick agent-run checks are skipped, say so plainly in the final response and explain why.

For documentation-only or instruction-only changes, a GitHub push is usually enough.
For code or configuration that changes runtime behavior, assume AWS should be updated too unless there is no deployed AWS surface for that change yet.

## Start

1. Run `git status --short --branch`.
2. Identify the current branch.
3. If the working tree is clean, fetch and sync with `origin/main`.
4. If the working tree is dirty, summarize local changes before editing.
5. Read the user request carefully.
6. Inspect the relevant docs, code, scripts, data files, and infrastructure files.
7. Read `ARCHITECTURE.md` for architecture-sensitive changes.
8. Read `RESOURCE_MAP.md` before touching infrastructure, deployment, AWS data, path-routed checks, or deploy targets.

## Change

1. Make the smallest coherent change.
2. Follow existing project patterns.
3. Avoid unrelated refactors.
4. Keep secrets out of Git.
5. Update docs when architecture, deployment behavior, resource ownership, review expectations, or AWS resources change.
6. Update `AI_CHANGELOG.md` for meaningful LLM-authored changes.

## Verify

1. Review `git diff`.
2. Use `RESOURCE_MAP.md` and the selector scripts to choose the smallest safe check set.
3. Run targeted tests for touched logic.
4. Run broader checks for shared, unknown, or cross-cutting changes.
5. If deployment changed, verify the deployed endpoint or resource after deployment.
6. Record checks that could not be run.

Common checks:

```sh
node scripts/select-ci-checks.mjs --format lines HEAD^ HEAD
npm run check -w @gbs/api
npm run typecheck
npm test
npm run build
```

## Review Gates

Apply the A1, A2, and A3 gates from `review.md` after each meaningful slice of progress.
For a small docs-only change, A2 may be limited to diff review and targeted link/readability checks.
For runtime, data, infrastructure, auth, billing, deployment, or user-flow changes, run the relevant local checks and perform a broader A3 review.

## Finish

1. Commit the corresponding changes to Git with a clear message.
2. Push the commit to GitHub immediately.
3. Deploy or apply the matching AWS change immediately when runtime behavior, infrastructure, AWS data, or AWS configuration changed.
4. Prefer scoped deploy targets when the repository defines them.
5. Use a full deploy for shared or unclear changes.
6. Leave a concise summary with files changed, behavior changed, checks run, deployment target, and remaining risks.

If an agent changes code directly on AWS, the same change must be copied back into the GitHub repo as soon as possible.
Direct AWS edits should be treated as temporary hotfixes until they are committed and pushed.

Agents should avoid working on overlapping files at the same time.
If overlap is necessary, one agent should finish, commit, and push before the next agent starts.

Exploratory local edits do not need to be committed if they are discarded before affecting the app, deployment, AWS, or shared repo state.
