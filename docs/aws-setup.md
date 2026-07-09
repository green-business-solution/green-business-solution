# AWS Setup Notes

RetroFi production now runs in the dedicated RetroFi AWS Organization.

The old Green Business Solution account `448016109714` remains active only for explicit rollback history.

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

Legacy local AWS CLI profile name:

```text
gbs
```

Registered production domain:

```text
retrofi.org
```

Current Route 53 hosted zone:

```text
Z10326481HHLW5TKN20XQ
```

Legacy Route 53 hosted zone:

```text
Z04402863EVV8FUF4EWUX
```

The legacy hosted zone was kept through the July 7, 2026 Pacific time nameserver cache window and is now legacy rollback context only.

Legacy project account root email:

```text
neerkuchlous+greenbusiness@gmail.com
```

Use collaborator emails for IAM Identity Center users, not as the account root email.

## Current RetroFi Identity Center assignments

The following users are members of `RetroFi-Admins`.
That group is assigned `AdministratorAccess` on `retrofi_official` and `RetroFi Production`.

- Neer Kuchlous, username `neer`
- Rajvansh Gupta, username `rajvansh`
- Ryan Shen, username `ryan`
