# AWS Organization Migration Runbook

This runbook is for moving RetroFi and Green Business Solution AWS ownership out of Neer's personal AWS footprint and into a dedicated RetroFi AWS Organization.
The new AWS Organizations management account root email is:

```text
retroficontact@gmail.com
```

For the current restart/resume checklist after the July 2026 cutover, see
[Restart Handoff - 2026-07-07](./restart-handoff-2026-07-07.md). That document lists the remaining
migration cleanup tasks plus the product/data work that should continue after the account move.

The new account structure has been created:

| Purpose | Account name | Account ID | Root email |
| --- | --- | --- | --- |
| Management | `retrofi_official` | `945129430686` | `retroficontact@gmail.com` |
| Production workloads | `RetroFi Production` | `059310317821` | `retroficontact+aws-prod@gmail.com` |

IAM Identity Center is enabled in `us-east-1`.
The AWS access portal is:

```text
https://d-9066740c42.awsapps.com/start
```

## Target Model

- Neer's personal AWS account keeps Neer's personal projects.
- RetroFi and Green Business Solution resources move into a dedicated RetroFi AWS Organization.
- `retroficontact@gmail.com` owns the RetroFi AWS Organizations management account root user.
- Production workloads live in a separate member account, not in the management account.
- Daily human access goes through AWS IAM Identity Center, not root credentials.

## Completed Browser Setup

These browser-only setup steps are complete.
They are kept here as historical setup notes and as a checklist for future audits.

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
On Neer's machine, these profiles are already configured in `~/.aws/config`.

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

- Management account ID: `945129430686`.
- Production member account ID: `059310317821`.
- IAM Identity Center start URL: `https://d-9066740c42.awsapps.com/start`.
- IAM Identity Center region: `us-east-1`.
- Production member account root email: `retroficontact+aws-prod@gmail.com`.

## Phase 5: Agent Handoff Point

Phase 4 is complete on Neer's machine.
An agent can continue the technical migration with these profiles.
The expected production profile name is:

```text
retrofi-prod
```

The expected management profile name is:

```text
retrofi-management
```

Verify access before making changes:

```sh
aws sts get-caller-identity --profile retrofi-prod --output json
aws sts get-caller-identity --profile retrofi-management --output json
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

## Collaborator Access Timing

Add Rajvansh and Ryan to IAM Identity Center before DNS cutover so production access is not dependent on Neer alone.
This is not a blocker for account bootstrap or data migration prep.
Use the existing `RetroFi-Admins` group unless a narrower permission set has been created.

## New Account Bootstrap

The new production account is empty by design.
Bootstrap the GitHub OIDC role, runtime DynamoDB tables, runtime S3 buckets, and versioned development artifact bucket before copying data:

```sh
AWS_PROFILE=retrofi-prod \
  GBS_MANAGE_CORE_RUNTIME_TABLES=true \
  GBS_MANAGE_DEV_WORK_BUCKET=true \
  ./scripts/deploy-production.sh ci data
```

The deploy script leaves `GBS_MANAGE_CORE_RUNTIME_TABLES` at its default `false`.
That is intentional so legacy-account deploys do not try to import or recreate externally managed tables.
Set it to `true` only for a new account where the core user, intake, and opportunity tables do not already exist.
The deploy script also leaves `GBS_MANAGE_DEV_WORK_BUCKET` at its default `false` so legacy-account deploys do not try to adopt the existing dev-work bucket.
Set it to `true` only in the new production account.

## DynamoDB Data Copy

Run a dry-run first:

```sh
node scripts/copy-dynamodb-tables-between-profiles.mjs \
  --source-profile gbs \
  --target-profile retrofi-prod \
  --region us-east-2
```

Copy the data:

```sh
node scripts/copy-dynamodb-tables-between-profiles.mjs \
  --source-profile gbs \
  --target-profile retrofi-prod \
  --region us-east-2 \
  --write
```

Verify the result with exact scans and item hashes:

```sh
node scripts/copy-dynamodb-tables-between-profiles.mjs \
  --source-profile gbs \
  --target-profile retrofi-prod \
  --region us-east-2 \
  --verify
```

Run the copy again during the final cutover window so records changed during migration prep are not missed.

## S3 Data Copy

Current live runtime objects have been copied to the new production account.
For versioned buckets, preserve object history separately because a plain `aws s3 sync` only copies current objects.

Dry-run the versioned bucket replay:

```sh
node scripts/copy-s3-bucket-versions-between-profiles.mjs
```

Replay versioned buckets from the old account into the new account:

```sh
node scripts/copy-s3-bucket-versions-between-profiles.mjs --write --reset-target
```

The default replay covers:

- `gbs-retrofi-test-fixtures-448016109714-us-east-1` to `gbs-retrofi-test-fixtures-059310317821-us-east-1`
- `gbs-retrofi-dev-work-448016109714-us-east-1` to `gbs-retrofi-dev-work-059310317821-us-east-1`

Use `--reset-target` only on the new account staging buckets.
Never run target-history reset against the old source account.

Keep the old account buckets intact until after the new production stack is live and a rollback window has passed.

## Data Verification Checkpoint

As of July 7, 2026, the first new-account data copy has been verified.

Exact DynamoDB scans and full typed item hashes match between source account `448016109714` and target account `059310317821`:

| Table | Source count | Target count |
| --- | ---: | ---: |
| `gbs-users` | 54 | 54 |
| `gbs-client-intake` | 68 | 68 |
| `gbs-opportunity-candidates` | 2,096 | 2,096 |
| `gbs-dashboard-performance` | 7,872 | 7,872 |
| `gbs-retrofit-recommendation-cache` | 51 | 51 |
| `gbs-application-profiles` | 10 | 10 |
| `gbs-api-runtime-state` | 1 | 1 |

Current S3 object copies also match by key, object count, and byte count:

| Bucket data | Source count / bytes | Target count / bytes |
| --- | ---: | ---: |
| Energy data | 17 / 6,013,182 | 17 / 6,013,182 |
| Runtime cache | 103 / 42,717,661 | 103 / 42,717,661 |
| Generated test fixtures, current objects | 8 / 98,136,801 | 8 / 98,136,801 |

The generated test fixture and dev-work buckets are versioned.
Their historical object versions were replayed into the new production account after the initial current-object copy.

| Versioned bucket data | Source versions / bytes | Target versions / bytes | Source delete markers | Target delete markers |
| --- | ---: | ---: | ---: | ---: |
| Generated test fixtures | 40 / 488,849,407 | 40 / 488,849,407 | 0 | 0 |
| Dev work archives | 1,150 / 921,724,784 | 1,150 / 921,724,784 | 12 | 12 |

Run one final DynamoDB copy, S3 current-object sync, S3 version replay, and verification pass during the cutover window.

## Live Cutover Checkpoint

As of July 7, 2026 Pacific time, `retrofi.org` and `www.retrofi.org` are serving from the new RetroFi production account `059310317821`.

The new CloudFront distribution is:

```text
EDUJMKVIUDD3Z
```

The new CloudFront domain is:

```text
d1l4o8icodiv1l.cloudfront.net
```

The old CloudFront distribution in account `448016109714` is disabled and no longer owns the `retrofi.org` aliases.

The old CloudFront distribution ID is:

```text
E3IN1F29FNWPZH
```

Route 53 alias records for `retrofi.org` and `www.retrofi.org` were later copied into the new production hosted zone `Z10326481HHLW5TKN20XQ`.
Those records point to `d1l4o8icodiv1l.cloudfront.net`.

The production frontend CloudFormation stack in the new account is `gbs-retrofi-production`.
It is configured with `EnableCustomDomain=true`, `ManageRoute53Records=false`, and the externally validated ACM certificate in account `059310317821`.

The domain registration has been internally transferred to the RetroFi management account `945129430686`.
The registered nameservers now point at the production hosted zone `Z10326481HHLW5TKN20XQ`.
Do not delete the old hosted zone until the old nameserver delegation has aged out of recursive resolver caches.
The old hosted zone had a 172,800 second NS TTL, so keep it at least 48 hours after the July 7, 2026 Pacific time nameserver update.

Final cutover data verification passed before DNS was updated.
Exact DynamoDB scans and item hashes matched for all seven production tables.
Current S3 object manifests matched for the energy-data and runtime-cache buckets.
Version summaries matched for the generated-test-fixtures and dev-work buckets.

## Old Account Cleanup Checkpoint

As of July 7, 2026 Pacific time, the first safe cleanup pass in old account `448016109714` is complete.

Deleted resources:

- CloudFormation stack `gbs-retrofi-api` in `us-east-1`.
- CloudFormation stack `gbs-github-actions-deploy` in `us-east-1`.
- S3 artifact bucket `gbs-retrofi-org-artifacts-448016109714-us-east-1`.

The deleted API stack removed the old API Gateway, Lambda function, Lambda execution role, Lambda permission, and API log group that served the old account.
The deleted GitHub deploy stack removed the old GitHub OIDC deploy role and old account OIDC provider.

Resources intentionally retained:

- Hosted zone `Z04402863EVV8FUF4EWUX`, because recursive resolvers can cache the old nameserver delegation for up to 48 hours after the nameserver update.
- CloudFormation stack `gbs-retrofi-production`, because it still owns the old hosted-zone Route 53 records and disabled old CloudFront distribution until the old hosted zone can be retired.
- CloudFormation stack `gbs-retrofi-runtime-buckets`, because it owns old copied S3 data buckets.
- CloudFormation stack `gbs-retrofi-runtime-data`, because it owns old copied DynamoDB tables.
- Old copied S3 data buckets and DynamoDB tables, as a short rollback/data-retention buffer.

Before the next cleanup pass, verify that public DNS no longer returns the old nameservers for `retrofi.org`.
Then delete the old hosted zone records and old hosting stack, followed by old copied data stores after the retention decision is explicit.

## Final Old Account Cleanup Checkpoint

As of July 7, 2026 Pacific time, the remaining old RetroFi and Green Business Solution resources in old account `448016109714` have been deleted after an explicit final verification pass.

The final pre-delete data verification confirmed:

- All seven DynamoDB tables matched exactly by item count and typed item hash between source account `448016109714` and target account `059310317821`.
- Current S3 objects in the energy-data bucket matched by key, size, and ETag, with 17 objects and 6,013,182 bytes on both sides.
- Current S3 objects in the runtime-cache bucket matched by key, size, and ETag, with 103 objects and 42,717,661 bytes on both sides.
- The generated-test-fixtures version history matched with 40 versions, 488,849,407 bytes, and no delete markers on both sides.
- The dev-work version history matched with 1,150 versions, 921,724,784 bytes, and 12 delete markers on both sides.

Deleted in the final cleanup pass:

- CloudFormation stack `gbs-retrofi-production` in old account `us-east-1`.
- CloudFormation stack `gbs-retrofi-runtime-buckets` in old account `us-east-1`.
- CloudFormation stack `gbs-retrofi-runtime-data` in old account `us-east-2`.
- DynamoDB tables `gbs-users`, `gbs-client-intake`, `gbs-opportunity-candidates`, `gbs-dashboard-performance`, `gbs-retrofit-recommendation-cache`, `gbs-application-profiles`, and `gbs-api-runtime-state` in old account `us-east-2`.
- S3 buckets `gbs-retrofi-org-frontend-448016109714`, `gbs-retrofi-org-runtime-cache-448016109714`, `gbs-retrofi-test-fixtures-448016109714-us-east-1`, `gbs-retrofi-org-energy-data-448016109714`, and `gbs-retrofi-dev-work-448016109714-us-east-1`.
- Old hosted zone `Z04402863EVV8FUF4EWUX` after deleting its non-NS/SOA records.
- Old account ACM certificates and CloudFront distribution resources owned by the deleted hosting stack.

Post-cleanup verification found no remaining old-account `gbs-*` or RetroFi resources in DynamoDB, S3, active CloudFormation stacks, Route 53 hosted zones, CloudFront distributions, Lambda functions, API Gateway APIs, or ACM certificates.
The live public health endpoint at `https://retrofi.org/api/health` returned `ok: true` and references the new production account buckets `gbs-retrofi-org-energy-data-059310317821` and `gbs-retrofi-org-runtime-cache-059310317821`.

The `retrofi.org` domain registration in account `945129430686` is delegated to the new production hosted zone nameservers.
Recursive resolvers can still show cached old nameservers for a while because the old hosted zone had a long NS TTL before deletion.
Treat that as DNS cache propagation unless live resolution fails after cache expiry.

## New Account API And Frontend Staging

Deploy the API in the new production account before touching DNS:

```sh
AWS_PROFILE=retrofi-prod \
  AWS_DEPLOY_REGION=us-east-1 \
  GBS_AWS_REGION=us-east-2 \
  GBS_MANAGE_CORE_RUNTIME_TABLES=true \
  GBS_MANAGE_DEV_WORK_BUCKET=true \
  GOOGLE_CLIENT_SECRET=... \
  GBS_GEOCODIO_API_KEY=... \
  ./scripts/deploy-production.sh api
```

Smoke test the raw API Gateway endpoint from the API stack output before continuing.

Then deploy the frontend and CloudFront distribution in staging mode.
This creates the new CloudFront distribution without claiming `retrofi.org` aliases or changing Route 53:

```sh
AWS_PROFILE=retrofi-prod \
  AWS_DEPLOY_REGION=us-east-1 \
  GBS_AWS_REGION=us-east-2 \
  GBS_ENABLE_CUSTOM_DOMAIN=false \
  ./scripts/deploy-production.sh infra frontend
```

Smoke test the CloudFront default domain from the `SiteUrl` stack output.
Only enable custom domain mode for the new account during the final DNS/CloudFront cutover window.

When the hosted zone remains in the old account during cutover, use an already validated ACM certificate from the new production account and keep Route 53 record changes separate:

```sh
AWS_PROFILE=retrofi-prod \
  AWS_DEPLOY_REGION=us-east-1 \
  GBS_AWS_REGION=us-east-2 \
  GBS_ENABLE_CUSTOM_DOMAIN=true \
  GBS_CERTIFICATE_ARN=arn:aws:acm:us-east-1:059310317821:certificate/... \
  GBS_MANAGE_ROUTE53_RECORDS=false \
  ./scripts/deploy-production.sh infra
```

The Route 53 records for `retrofi.org` are still in the old account until the hosted zone or domain registration is moved.
Update those records with the `gbs` profile during the cutover window.

After the domain registration and hosted zone move, default production deploys use:

```text
HostedZoneId=Z10326481HHLW5TKN20XQ
CertificateArn=arn:aws:acm:us-east-1:059310317821:certificate/2c45fa03-2cb3-4cd7-8455-d098174d1e73
ManageRoute53Records=false
```

Keep `ManageRoute53Records=false` until the manually migrated Route 53 records are intentionally imported into CloudFormation or recreated by CloudFormation during a planned DNS maintenance step.

## Migration Constraints

The current Green Business Solution AWS account is still:

```text
448016109714
```

The current production domain is:

```text
retrofi.org
```

The legacy hosted zone is:

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
