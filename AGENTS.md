# Repository Agent Instructions

All coding agents working in this repository must follow `AGENT_WORKFLOW.md`.

Before editing, check the Git status and current branch. Pull from GitHub when the working tree is clean. Do not overwrite another person's local changes.

During this early development phase, agents should optimize for fast shared iteration. After making a meaningful change, commit and push to GitHub immediately. If the change affects deployed app behavior, infrastructure, AWS data, or AWS configuration, also deploy/apply the corresponding AWS change immediately. Do not leave useful changes only on one laptop.

Local testing is optional unless the user explicitly asks for it or the change is clearly risky. Do not delay GitHub/AWS sharing to do broad local test passes.

After editing, review the diff, update `AI_CHANGELOG.md` for meaningful LLM-authored changes, commit, push, apply any needed AWS change, and explain:

- files changed
- behavior changed
- tests/checks run, or note that local testing was intentionally skipped for fast iteration
- any deployment or AWS changes made

GitHub is the source of truth. AWS is a deployment target, not the canonical copy of code.
