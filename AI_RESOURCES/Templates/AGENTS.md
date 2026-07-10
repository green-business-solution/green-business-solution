# AGENTS.md

This file tells agents how to work in a repository.
Keep it specific to the project.
Update it when the workflow, checks, deployment process, protected files, or architecture rules change.
`CLAUDE.md` can be a compatibility symlink to this file when Claude-family agents need the same entry point.

## Project Context

- Read `ARCHITECTURE.md` before making architecture-sensitive changes.
- Read `RESOURCE_MAP.md` before touching infrastructure, deployment, data, cloud resources, or path-routed checks.
- Read `review.md` before finalizing a meaningful change.
- Use `TASK_LIST.md` to understand active work and unresolved follow-ups.
- Use `ADRS/` to understand why major architectural decisions were made.

## Working Rules

- Check `git status --short --branch` before editing.
- Read relevant docs and nearby code before making changes.
- Keep changes scoped to the user's request.
- Do not overwrite user changes.
- Prefer existing project patterns over new abstractions.
- Do not commit secrets, `.env` files, credentials, tokens, private keys, or local dumps.
- Keep browser clients untrusted.
- Never expose AWS credentials or backend secrets to frontend code.
- Run relevant checks before finishing.
- Use conservative full checks for shared, unknown, or cross-cutting changes.

## Review Rules

- Use the A1, A2, and A3 gates in `review.md` after each slice of progress.
- If a review gate fails, investigate, fix the issue when practical, and rerun the relevant gate.
- Record what was checked, what passed, what failed, and what remains risky.
