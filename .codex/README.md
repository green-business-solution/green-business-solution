# Codex Local Workspace

Use the Codex app on the repository root for the checkout you intend to edit.
For firstmate or task-runner worktrees, verify the path before editing and stay inside the isolated worktree.

What is configured here:

- `.codex/config.toml`
  - project-scoped Codex settings
  - AWS defaults for this repo
  - shell profile loading enabled for subprocesses
- `.codex/setup.sh`
  - local bootstrap check for dependencies and AWS session state

Recommended workflow:

1. Open the intended checkout in the Codex app.
2. Use `Local` mode when you intentionally want to edit the same checkout as your terminal.
3. Use a worktree only when the task runner or user explicitly asks for isolated work.
4. Run `.codex/setup.sh` once after opening the project.
5. If AWS is expired, run `aws sso login --profile gbs` or the profile named by the current task docs.

Notes:

- `Local` mode uses the same checkout as your CLI workflow.
- Worktree mode creates a separate checkout and may not share uncommitted local files.
- Codex app and CLI are separate processes, so temporary shell state is not shared unless it comes from your shell profile, environment, or the setup script.
