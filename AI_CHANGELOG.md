# AI Changelog

## 2026-06-19 - Codex (GPT-5)

- Initialized the Green Business Solution repository structure.
- Added the project agent workflow that makes GitHub the source of truth and requires LLM-authored changes to be explained.
- Scaffolded a React + Vite + TypeScript app without copying Efficient Hypothesis product content.

## 2026-06-19 - Codex (GPT-5) AWS setup

- Created the Green Business Solution AWS Organizations member account.
- Created Rajvansh Gupta as an AWS IAM Identity Center user.
- Assigned `AdministratorAccess` on only the Green Business Solution AWS account to Neer Kuchlous and Rajvansh Gupta.
- Configured the local AWS CLI profile `gbs` for the Green Business Solution account.
- Documented the GitHub organization creation step required before pushing the private repository.

## 2026-06-19 - Codex (GPT-5) GitHub setup

- Created the private GitHub repository `green-business-solution/green-business-solution`.
- Pushed the local `main` branch to GitHub and configured `origin`.
- Invited `SchrodingersCatLooks` with write access to the repository.

## 2026-06-19 - Codex (GPT-5) agent instructions

- Added `AGENTS.md` so Codex automatically loads the project's GitHub source-of-truth and change-explanation requirements.

## 2026-06-20 - Codex (GPT-5) DynamoDB intake prototype

- Created DynamoDB tables `gbs-users` and `gbs-client-intake` in the Green Business Solution AWS account.
- Seeded temporary admin users for Neer Kuchlous and Rajvansh Gupta.
- Added a local Node API that writes intake form submissions to DynamoDB using the `gbs` AWS profile.
- Reworked the React app into a version 1 banner page, required intake form, temporary-code user portal, and admin portal.
- Documented the DynamoDB model and planned Google OAuth account-linking path.

## 2026-06-20 - Codex (GPT-5) local setup diagnostics

- Verified Rajvansh Gupta's temporary admin code `768383` exists in DynamoDB and works through the local API.
- Added clearer browser/API error messages for missing local API, expired AWS SSO credentials, and AWS profile access issues.
- Added `/api/diagnostics` and documented the local troubleshooting checklist for collaborators.
