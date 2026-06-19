# Access Model

## GitHub

- The GitHub repository is the canonical source of code and project history.
- Collaborators who will use Codex or another LLM coding agent need write access so their agents can commit and push.
- Agents must follow `AGENT_WORKFLOW.md` before and after making changes.

## AWS

- AWS accounts are isolated by project.
- Green Business Solution resources should live only in the Green Business Solution AWS member account.
- Human access should be granted through AWS IAM Identity Center.
- Project collaborators should receive access only to the Green Business Solution account unless explicitly approved otherwise.

## Current intended collaborator

- GitHub username: `SchrodingersCatLooks`
- AWS Identity Center user: Rajvansh, `pmrajvansh@gmail.com`
- Intended AWS permission set: `AdministratorAccess` on only the Green Business Solution AWS account
