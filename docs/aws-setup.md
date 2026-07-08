# AWS Setup Notes

The current AWS structure mirrors the existing project-account pattern:

- Management account: existing AWS Organizations management account.
- Project account: Green Business Solution member account `448016109714`.
- Access: AWS IAM Identity Center users assigned directly to the project account.
- Permission set: `AdministratorAccess`, scoped only to the project account.

## Dedicated RetroFi AWS Organization

The new RetroFi AWS Organizations management account uses this root email:

```text
retroficontact@gmail.com
```

Do not use a shared `@retrofi.org` forwarding address as the root email for the new AWS Organization.
Use IAM Identity Center users for daily access.

New AWS account structure:

| Purpose | Account name | Account ID | Root email |
| --- | --- | --- | --- |
| Management | `retrofi_official` | `945129430686` | `retroficontact@gmail.com` |
| Production workloads | `RetroFi Production` | `059310317821` | `retroficontact+aws-prod@gmail.com` |

AWS access portal:

```text
https://d-9066740c42.awsapps.com/start
```

Local AWS CLI profile names:

```text
retrofi-management
retrofi-prod
```

Detailed setup and handoff steps are in [AWS Organization Migration Runbook](./aws-organization-migration-runbook.md).

Current local AWS CLI profile name:

```text
gbs
```

Registered production domain:

```text
retrofi.org
```

Route 53 hosted zone:

```text
Z04402863EVV8FUF4EWUX
```

Current project account root email:

```text
neerkuchlous+greenbusiness@gmail.com
```

Use collaborator emails for IAM Identity Center users, not as the account root email.

## Current Identity Center assignments

The following users are assigned `AdministratorAccess` on only account `448016109714`:

- Neer Kuchlous, username `neer`
- Rajvansh Gupta, username `rajvansh`
- Ryan Shen, username `rshen0210`
