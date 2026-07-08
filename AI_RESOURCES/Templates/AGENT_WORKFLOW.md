# Agent Workflow

Use this checklist for meaningful AI-assisted changes.
Customize it for the project.

## Start

1. Check the current branch and working tree.
2. Read the user request carefully.
3. Inspect relevant docs, code, scripts, and infrastructure files.
4. Identify whether the change affects local code only or deployed infrastructure.
5. If the repo has a resource map or deploy selector, identify the affected check and deploy targets before editing.

## Change

1. Make the smallest coherent change.
2. Follow existing project patterns.
3. Avoid unrelated refactors.
4. Keep secrets out of Git.
5. Update docs when architecture, deployment behavior, resource ownership, or review expectations change.

## Verify

1. Run the most relevant tests, builds, linters, or smoke checks.
2. If the repo has routed CI/check scripts, use the smallest safe check set selected by those scripts.
3. If deployment changed, verify the deployed endpoint or resource.
4. Record any tests that could not be run.

## Finish

1. Apply the A1, A2, and A3 gates from `review.md` when the change is meaningful.
2. Commit with a clear message when the project workflow requires it.
3. Push or deploy only when requested or when the project workflow requires it.
4. Leave a concise summary with changed files, verification, deployment target, and remaining risks.
