# Access Model

## GitHub

- The GitHub repository is the canonical source of code and project history.
- Collaborators who will use Codex or another LLM coding agent need write access so their agents can commit and push.
- Agents must follow `AGENT_WORKFLOW.md` before and after making changes.
- Repository: `https://github.com/green-business-solution/green-business-solution`
- Visibility: private

## AWS

- AWS accounts are isolated by project.
- Green Business Solution resources should live only in the Green Business Solution AWS member account.
- Human access should be granted through AWS IAM Identity Center.
- Project collaborators should receive access only to the Green Business Solution account unless explicitly approved otherwise.

## Dedicated RetroFi AWS Organization

- AWS Organizations management account: `retrofi_official`, `945129430686`, root email `retroficontact@gmail.com`
- Production workload account: `RetroFi Production`, `059310317821`, root email `retroficontact+aws-prod@gmail.com`
- AWS access portal: `https://d-9066740c42.awsapps.com/start`
- Local CLI profiles: `retrofi-management`, `retrofi-prod`
- Do not use a shared `@retrofi.org` forwarding alias as the AWS root email.
- After account creation, daily human access should go through AWS IAM Identity Center, not root.

## New RetroFi Identity Center access

- IAM Identity Center region: `us-east-1`
- Admin group: `RetroFi-Admins`
- Permission set: `AdministratorAccess`, 8-hour session duration
- Assigned accounts: `retrofi_official` and `RetroFi Production`
- Neer Identity Center username: `neer`

## Current AWS account

- Account name: `green-business-solution`
- Account ID: `448016109714`
- Root email: `neerkuchlous+greenbusiness@gmail.com`
- Status: active

## Current collaborators

- GitHub username: `SchrodingersCatLooks`
- GitHub access: invited as organization admin/owner; invitation pending acceptance
- AWS Identity Center user: Rajvansh Gupta, `pmrajvansh@gmail.com`
- AWS Identity Center username: `rajvansh`
- AWS Identity Center user ID: `614b3520-a0d1-702d-d1ec-c7003d30b3f9`
- AWS permission set: `AdministratorAccess` on only the Green Business Solution AWS account

- GitHub username: `PlaneCoder75367`
- GitHub access: invited with write access
- AWS Identity Center user: Ryan Shen, `rshen0210@gmail.com`
- AWS Identity Center username: `rshen0210`
- AWS Identity Center user ID: `518bd500-c071-7005-2eee-da5a920becd1`
- AWS permission set: `AdministratorAccess` on only the Green Business Solution AWS account
