# AWS Setup Notes

The intended AWS structure mirrors the existing project-account pattern:

- Management account: existing AWS Organizations management account.
- Project account: a new Green Business Solution member account.
- Access: AWS IAM Identity Center users assigned directly to the project account.
- Permission set: `AdministratorAccess`, scoped only to the project account.

Recommended local AWS CLI profile name:

```text
gbs
```

Recommended account root email:

```text
neerkuchlous+greenbusiness@gmail.com
```

Use the collaborator email `pmrajvansh@gmail.com` for the IAM Identity Center user, not as the account root email, unless intentionally making that email the root contact for the AWS account.
