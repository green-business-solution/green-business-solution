# AWS Setup Notes

The intended AWS structure mirrors the existing project-account pattern:

- Management account: existing AWS Organizations management account.
- Project account: Green Business Solution member account `448016109714`.
- Access: AWS IAM Identity Center users assigned directly to the project account.
- Permission set: `AdministratorAccess`, scoped only to the project account.

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

Account root email:

```text
neerkuchlous+greenbusiness@gmail.com
```

Use the collaborator email `pmrajvansh@gmail.com` for the IAM Identity Center user, not as the account root email.

## Current Identity Center assignments

The following users are assigned `AdministratorAccess` on only account `448016109714`:

- Neer Kuchlous, username `neer`
- Rajvansh Gupta, username `rajvansh`
