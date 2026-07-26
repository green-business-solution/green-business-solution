# Operational-savings research infrastructure

This runbook covers the isolated research template at `infra/operational-savings-research.json`.
The template is not connected to any production workflow, production stack, runtime service, or automatic deploy selector.
No AWS command was run while preparing it.

## Scope

The stack is limited to:

- The named `RetroFiOperationalSavingsResearchRole`.
- The `RetroFiOperationalSavingsResearchBoundary` managed policy used both as the role permission grant and its non-removable maximum-permission boundary.
- One private, versioned S3 research bucket.
- The four `retrofi-research-reopt`, `retrofi-research-ssc`, `retrofi-research-measur`, and `retrofi-research-scout` ECR repositories.
- Permissions for the `/retrofi/research/operational-savings/` CloudWatch Logs prefix.

The bucket and repositories use retention policies so a stack deletion cannot silently delete research data or tagged container images.
The HTTPS-only bucket policy is retained with the bucket.
The role and permissions boundary are also retained so retained research objects do not lose their access path.

## Live deployment

The stack `retrofi-operational-savings-research` reached `CREATE_COMPLETE` in account `945129430686` and region `us-east-1` on 2026-07-24.
The stack ID is `arn:aws:cloudformation:us-east-1:945129430686:stack/retrofi-operational-savings-research/a8967580-878c-11f1-95c2-1202e89b7109`.
The private bucket is `retrofi-operational-savings-research-945129430686-us-east-1`.
The role ARN is `arn:aws:iam::945129430686:role/RetroFiOperationalSavingsResearchRole`.
The permissions boundary ARN is `arn:aws:iam::945129430686:policy/RetroFiOperationalSavingsResearchBoundary`.
The four ECR repository URIs use registry `945129430686.dkr.ecr.us-east-1.amazonaws.com` and the repository names listed above.
AWS Access Analyzer returned no findings for deployed boundary version `v2`.
Live verification confirmed S3 versioning, AES256 default encryption, all four public-access blocks, `BucketOwnerEnforced`, the HTTPS-only policy, and temporary-only expiration.
Live verification also confirmed immutable ECR tags, scan-on-push, AES256 encryption, and untagged-only expiration.
The ten required S3 prefixes have versioned, checksum-bearing marker objects.

## Required operator identity

`OperatorRoleArn` has no default.
Supply the exact current operator IAM role ARN that is authorized to assume the research role.
Do not supply an STS `assumed-role` session ARN, an account root ARN, an IAM user ARN, a wildcard, or a production deploy role.
The repository does not guess this value because no exact operator role ARN is checked in and this work did not query AWS.

`ResearchBucketName` is optional.
When omitted, CloudFormation uses `retrofi-operational-savings-research-${AWS::AccountId}-${AWS::Region}`.
An explicit override must still be a valid globally unique private S3 bucket name.

## Local validation

Run the static control suite before requesting any AWS change:

```bash
npx vitest run scripts/research/operational-savings/tests/research-infrastructure.test.mjs
node -e 'JSON.parse(require("node:fs").readFileSync("infra/operational-savings-research.json", "utf8"))'
```

The tests reject missing privacy controls, broad Allow statements, mutable ECR tags, tagged-image expiration, non-temporary S3 expiration, static operator trust, known production identifiers, and `AdministratorAccess`.

## Authorized deployment procedure

The bootstrap identity is the authenticated `retrofi-management` SSO profile in account `945129430686`.
The profile name is explicit on every command, and ambient credential variables must be removed before the first call.
The exact normalized operator role is `arn:aws:iam::945129430686:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_AdministratorAccess_9c95defda88c7073`.
Stop immediately if the STS account or assumed-role name differs.

```bash
research_stack_name="retrofi-operational-savings-research"
research_template_path="infra/operational-savings-research.json"
research_change_set_name="operational-savings-research-initial"
research_bootstrap_profile="retrofi-management"
research_account_id="945129430686"
research_operator_role_name="AWSReservedSSO_AdministratorAccess_9c95defda88c7073"
research_operator_role_arn="arn:aws:iam::945129430686:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_AdministratorAccess_9c95defda88c7073"
research_region="us-east-1"

unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
unset AWS_SECURITY_TOKEN AWS_ROLE_ARN AWS_WEB_IDENTITY_TOKEN_FILE
unset AWS_CONTAINER_CREDENTIALS_FULL_URI
unset AWS_CONTAINER_CREDENTIALS_RELATIVE_URI
unset AWS_PROFILE AWS_DEFAULT_PROFILE AWS_REGION AWS_DEFAULT_REGION
unset AWS_ENDPOINT_URL AWS_ENDPOINT_URL_S3 AWS_ENDPOINT_URL_STS

research_identity="$(
  aws sts get-caller-identity \
    --profile "${research_bootstrap_profile}" \
    --region "${research_region}" \
    --no-cli-pager \
    --output json
)"

test "$(jq -r '.Account' <<<"${research_identity}")" = "${research_account_id}"
research_caller_arn="$(jq -r '.Arn' <<<"${research_identity}")"
case "${research_caller_arn}" in
  "arn:aws:sts::${research_account_id}:assumed-role/${research_operator_role_name}/"*) ;;
  *) exit 1 ;;
esac

aws cloudformation validate-template \
  --template-body "file://${research_template_path}" \
  --profile "${research_bootstrap_profile}" \
  --region "${research_region}" \
  --no-cli-pager

aws cloudformation create-change-set \
  --stack-name "${research_stack_name}" \
  --change-set-name "${research_change_set_name}" \
  --change-set-type CREATE \
  --template-body "file://${research_template_path}" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameters \
    "ParameterKey=OperatorRoleArn,ParameterValue=${research_operator_role_arn}" \
  --profile "${research_bootstrap_profile}" \
  --region "${research_region}" \
  --no-cli-pager

aws cloudformation wait change-set-create-complete \
  --stack-name "${research_stack_name}" \
  --change-set-name "${research_change_set_name}" \
  --profile "${research_bootstrap_profile}" \
  --region "${research_region}"

aws cloudformation describe-change-set \
  --stack-name "${research_stack_name}" \
  --change-set-name "${research_change_set_name}" \
  --profile "${research_bootstrap_profile}" \
  --region "${research_region}" \
  --no-cli-pager
```

Review the generated change set before running `execute-change-set`.
Pass `ResearchBucketName=<approved-override>` only when the generated name cannot be used.
Do not reuse a production account profile, production stack name, production bucket, or production ECR repository.
For later changes, use change-set type `UPDATE` and `UsePreviousValue=true` for both parameters.

## Expected controls

- S3 public access is fully blocked, ACLs are disabled with `BucketOwnerEnforced`, default encryption is AES256, versioning is enabled, and non-HTTPS requests are denied.
- Incomplete multipart uploads are aborted after seven days.
- Only objects under `temporary/`, including their noncurrent versions, expire after 14 days.
- Other bucket data has no expiration rule.
- ECR tags are immutable, scan-on-push is enabled, AES256 encryption is enabled, and only untagged images older than 14 days expire.
- The managed permissions boundary caps the role to the designated bucket, `retrofi-research-*` repositories, research log prefix, and its own role ARN.
- Self-written inline policies cannot grant any permission outside that boundary.
- The only global Allow resource is `ecr:GetAuthorizationToken`, which ECR requires for registry authentication.

Use the stack outputs for the final bucket name, role ARN, boundary ARN, log prefix, and repository ARNs and URIs.
