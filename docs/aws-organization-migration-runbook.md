# AWS Organization Migration Runbook

This runbook is for moving RetroFi and Green Business Solution AWS ownership out of Neer's personal AWS footprint and into a dedicated RetroFi AWS Organization.
The new AWS Organizations management account root email is:

```text
retroficontact@gmail.com
```

## Target Model

- Neer's personal AWS account keeps Neer's personal projects.
- RetroFi and Green Business Solution resources move into a dedicated RetroFi AWS Organization.
- `retroficontact@gmail.com` owns the RetroFi AWS Organizations management account root user.
- Production workloads live in a separate member account, not in the management account.
- Daily human access goes through AWS IAM Identity Center, not root credentials.

## Non-Automatable Setup

An agent cannot safely complete the AWS signup flow because it requires access to the Gmail inbox, payment details, account contact data, phone verification, root password creation, and MFA enrollment.
Complete these steps in a browser before asking an agent to continue with CLI or infrastructure work.

## Phase 1: Create The Management Account

1. Go to the AWS account signup page.
2. Use `retroficontact@gmail.com` as the root email.
3. Use an account name such as `RetroFi Management`.
4. Choose a strong root password and store it in the shared company password manager.
5. Complete contact, payment, phone verification, and support-plan setup.
6. Sign in as the root user once setup completes.
7. Enable MFA on the root user immediately.
8. Add more than one root MFA device if practical.
9. Do not create root access keys.

The management account should stay mostly empty.
Use it for Organization, billing, security, and account-management tasks only.

## Phase 2: Create The Organization

1. Open AWS Organizations from the new management account.
2. Create an Organization with all features enabled.
3. Enable IAM Identity Center from the management account.
4. Choose an IAM Identity Center home region and keep it consistent.
5. Create an admin group such as `RetroFi-Admins`.
6. Add Neer, Rajvansh, and Ryan as IAM Identity Center users.
7. Assign an administrator permission set only where needed.

If AWS offers centralized root access management for member accounts, enable it after the Organization is stable.
New member accounts should avoid recoverable root credentials unless a root-only task requires temporary recovery.

## Phase 3: Create The Production Member Account

Create a separate AWS Organizations member account for production workloads.
Use an account name such as:

```text
RetroFi Production
```

Use a unique root email that can receive mail through the same controlled mailbox.
For example, use a verified plus-address alias such as:

```text
retroficontact+aws-prod@gmail.com
```

Do not use `retroficontact@gmail.com` again because every AWS account root email must be unique.
Do not deploy app resources into the management account.

## Phase 4: Configure Local SSO Profiles

After the Organization and Identity Center users exist, configure local AWS CLI profiles.

```sh
aws configure sso --profile retrofi-management
aws configure sso --profile retrofi-prod
```

Verify both profiles:

```sh
aws sts get-caller-identity --profile retrofi-management --output json
aws sts get-caller-identity --profile retrofi-prod --output json
```

Record these values before continuing:

- Management account ID.
- Production member account ID.
- IAM Identity Center start URL.
- IAM Identity Center region.
- Production member account root email.

## Phase 5: Agent Handoff Point

After Phase 4 is complete, an agent can continue the technical migration.
Provide the production profile name and account ID.
The expected production profile name is:

```text
retrofi-prod
```

The agent can then:

- Add missing DynamoDB table coverage to CloudFormation.
- Bootstrap the GitHub OIDC deploy role in the new production account.
- Update GitHub Actions to assume the new deploy role ARN.
- Recreate runtime S3 buckets and DynamoDB tables in the new account.
- Copy DynamoDB data from the current account.
- Copy required S3 data from the current account.
- Recreate the API, frontend, ACM certificate, and CloudFront distribution.
- Move or recreate Route 53 DNS and domain registration ownership.
- Cut over `retrofi.org` only after the new stack is verified.

## Migration Constraints

The current Green Business Solution AWS account is still:

```text
448016109714
```

The current production domain is:

```text
retrofi.org
```

The current hosted zone is:

```text
Z04402863EVV8FUF4EWUX
```

Do not delete or disable the current account until the new production account is serving traffic and data has been verified.
Do not change CloudFront aliases or Route 53 name servers until the new distribution and ACM certificate are ready.
Do not assume ACM certificates, CloudFront distributions, or S3 bucket names can be transferred directly.
Plan to recreate most infrastructure and copy data.

## Secrets To Prepare

The migration will need these values at deploy time.
Do not commit them to Git.

- Google OAuth client secret.
- Geocodio API key, if still used.
- Any updated Google OAuth redirect URI settings.
- Any billing or support contact details needed in AWS.

## References

- AWS root user best practices: https://docs.aws.amazon.com/IAM/latest/UserGuide/root-user-best-practices.html
- Enable MFA for the root user: https://docs.aws.amazon.com/IAM/latest/UserGuide/enable-mfa-for-root.html
- AWS Organizations account creation: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_create.html
- IAM Identity Center and AWS Organizations: https://docs.aws.amazon.com/singlesignon/latest/userguide/identity-center-and-orgs.html
- AWS Organizations management account best practices: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_best-practices_mgmt-acct.html
