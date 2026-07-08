# AWS Setup Notes

RetroFi production now runs in the dedicated RetroFi AWS Organization.

The old Green Business Solution account `448016109714` remains active for rollback history and for the Route 53 hosted zone until domain and hosted-zone ownership are intentionally migrated.

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

Route 53 hosted zone:

```text
Z04402863EVV8FUF4EWUX
```

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
