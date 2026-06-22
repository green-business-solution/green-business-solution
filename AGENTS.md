# Repository Agent Instructions

All coding agents working in this repository must follow `AGENT_WORKFLOW.md`.

Before editing, check the Git status and current branch. Pull from GitHub when the working tree is clean. Do not overwrite another person's local changes.

During this early development phase, agents should optimize for fast shared iteration. After making a meaningful change, commit and push to GitHub immediately. If the change affects deployed app behavior, infrastructure, AWS data, or AWS configuration, also deploy/apply the corresponding AWS change immediately. Do not leave useful changes only on one laptop.

Human/user testing is not required before GitHub/AWS sharing during early iteration. AI agents should still run quick practical smoke checks before pushing and deploying when a change affects code, configuration, infrastructure, AWS data, or runtime behavior. Do not delay GitHub/AWS sharing for broad or slow local test passes unless the user explicitly asks for deeper testing or the change is clearly risky.

After editing, review the diff, update `AI_CHANGELOG.md` for meaningful LLM-authored changes, commit, push, apply any needed AWS change, and explain:

- files changed
- behavior changed
- quick agent-run tests/checks, or note why checks were intentionally skipped
- any deployment or AWS changes made

GitHub is the source of truth. AWS is a deployment target, not the canonical copy of code.
