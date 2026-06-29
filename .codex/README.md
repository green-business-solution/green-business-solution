# Codex Local Workspace

Use the Codex app in `Local` mode on this exact directory:

- `/Users/RyanShen/Code/Green Business Solution`

What is configured here:

- `.codex/config.toml`
  - project-scoped Codex settings
  - AWS defaults for this repo
  - shell profile loading enabled for subprocesses
- `.codex/setup.sh`
  - local bootstrap check for dependencies and AWS session state

Recommended workflow:

1. Open this folder in the Codex app.
2. Start a `Local` thread, not a `Worktree`.
3. Run `.codex/setup.sh` once after opening the project.
4. If AWS is expired, run `aws sso login --profile gbs` in a terminal on this machine.

Notes:

- `Local` mode uses the same checkout as your CLI workflow.
- `Worktree` mode creates a separate checkout and is not the same workspace.
- Codex app and CLI are still separate processes, so temporary shell state is not shared unless it comes from your shell profile, environment, or the setup script.
