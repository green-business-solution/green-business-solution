# SES Founders Forwarding

This runbook stages an AWS SES forwarding path for `founders@retrofi.org`.
It is intentionally repo-backed and keeps the Route 53 MX change out of CloudFormation so the domain's mail routing is not changed until testing is complete.

## Template

The CloudFormation template is `infra/ses-forwarding-founders.yaml`.
It creates:

- A private S3 bucket for inbound raw message archives.
- A Lambda forwarder that reads the archived message from S3 and sends it with SES.
- A Lambda execution role with S3 read and SES send permissions.
- An SES S3 action role that SES assumes to write the archived message.
- A Lambda invoke permission scoped to the SES receipt rule.
- An SES receipt rule set and a receipt rule for `founders@retrofi.org`.

The template does not create or update any DNS records by default.
The `CreateMXRecord` parameter defaults to `false`.
The `SESInboundMXValue` output is only a later cutover value.
If `DomainName` changes from `retrofi.org`, also set `ReceiptRecipient` and `ForwardingSender` to matching verified identities.

## Region

Deploy the stack in an SES email receiving region.
`us-east-1` is the practical default for this repo because the production API Lambda already runs there.
SES receiving requires the Lambda function and other non-S3 receiving resources to be in the same AWS Region as the SES receiving endpoint.
Keep the SES identity, receipt rule set, Lambda function, and sending sandbox review in the same region.

## Sandbox Constraints

The forwarder sends mail through SES, so SES sending sandbox rules apply to forwarded mail.
If the account is still in the sandbox in the selected region, each forwarding recipient must be verified in SES.
The sandbox also limits sending volume and rate.
Before forwarding to unverified recipient addresses, request SES production access for the same region.

The `ForwardingSender` parameter must be a verified SES identity in the selected region.
The safest initial value is `founders@retrofi.org` after either that address or the `retrofi.org` domain is verified for sending in SES.
The Lambda rewrites the outbound `From` header to this verified identity and preserves the original sender in `Reply-To` and `X-Retrofi-Original-From`.

## Preflight

Use read-only checks before deployment.
Do not change MX records during preflight.

```sh
AWS_PROFILE=gbs aws sts get-caller-identity --query Account --output text
AWS_PROFILE=gbs aws sesv2 get-account --region us-east-1 --query '{productionAccess:ProductionAccessEnabled,sendQuota:SendQuota}' --output json
AWS_PROFILE=gbs aws sesv2 list-email-identities --region us-east-1 --query 'EmailIdentities[].{identity:IdentityName,type:IdentityType,verified:VerifiedForSendingStatus}' --output table
AWS_PROFILE=gbs aws ses describe-active-receipt-rule-set --region us-east-1 --query 'Metadata.Name' --output text
```

If `describe-active-receipt-rule-set` fails because no active rule set exists, that is acceptable for a fresh SES receiving setup.
If an active rule set already exists, do not deploy until the existing rules are understood because SES evaluates only the active receipt rule set in a region.

## Validate

Validate the template before deployment.

```sh
AWS_PROFILE=gbs aws cloudformation validate-template \
  --region us-east-1 \
  --template-body file://infra/ses-forwarding-founders.yaml
```

## Deploy When Ready

This is the staged deploy command, not something to run until the preflight conditions above are satisfied.
Use only sandbox-verified forwarding recipients until SES production access is approved.

```sh
AWS_PROFILE=gbs aws cloudformation deploy \
  --region us-east-1 \
  --stack-name gbs-retrofi-founders-forwarding \
  --template-file infra/ses-forwarding-founders.yaml \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    DomainName=retrofi.org \
    HostedZoneId=Z04402863EVV8FUF4EWUX \
    CreateMXRecord=false \
    ReceiptRecipient=founders@retrofi.org \
    ForwardingRecipients=verified-recipient@example.com \
    ForwardingSender=founders@retrofi.org
```

To deploy with the rule created but disabled, add `EnableReceiptRule=false`.
Enable it only after confirming the active rule set plan.

## Test Before MX

After the stack deploys, test without changing Route 53 MX.
Confirm the stack outputs and the active rule set first.

```sh
AWS_PROFILE=gbs aws cloudformation describe-stacks \
  --region us-east-1 \
  --stack-name gbs-retrofi-founders-forwarding \
  --query 'Stacks[0].Outputs' \
  --output table

AWS_PROFILE=gbs aws ses describe-active-receipt-rule-set \
  --region us-east-1 \
  --query 'Metadata.Name' \
  --output text
```

If the stack-created rule set is not active, activate it only after confirming that no other production receiving rules need to stay active.

```sh
AWS_PROFILE=gbs aws ses set-active-receipt-rule-set \
  --region us-east-1 \
  --rule-set-name retrofi-founders-forwarding
```

Then send a direct SMTP test to the SES inbound endpoint instead of relying on DNS MX.

```sh
swaks \
  --server inbound-smtp.us-east-1.amazonaws.com \
  --to founders@retrofi.org \
  --from external-test-sender@example.com \
  --header "Subject: founders forwarding smoke" \
  --body "SES direct inbound smoke test before MX cutover."
```

The test passes only when all three outcomes are true:

- The message appears in the archive S3 bucket under the `founders/` prefix.
- The Lambda log group records one forwarded message without errors.
- The configured forwarding recipients receive the message.

## MX Cutover

Change Route 53 only after the direct SES inbound test passes.
The required MX value for `retrofi.org` is the stack output named `SESInboundMXValue`, for example `10 inbound-smtp.us-east-1.amazonaws.com`.
The CloudFormation template can create the Route 53 MX record later by updating the stack with `CreateMXRecord=true`.

Coordinate this carefully because an MX record at `retrofi.org` controls mail routing for the whole domain, not only `founders@retrofi.org`.
If any other `retrofi.org` addresses are in use, create the complete SES receipt rule plan before MX cutover.

## Rollback

If forwarding fails after MX cutover, remove or revert the Route 53 MX record first.
Then disable the receipt rule or set a different active receipt rule set.
Deleting the CloudFormation stack will retain the archive bucket by design.

## AWS References

- SES email receiving setup: https://docs.aws.amazon.com/ses/latest/dg/receiving-email-setting-up.html
- SES regions and receiving resource placement: https://docs.aws.amazon.com/ses/latest/dg/regions.html
- SES receiving permissions: https://docs.aws.amazon.com/ses/latest/dg/receiving-email-permissions.html
- SES MX records: https://docs.aws.amazon.com/ses/latest/dg/receiving-email-mx-record.html
- SES sandbox and production access: https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html
- CloudFormation `AWS::SES::ReceiptRule`: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-ses-receiptrule.html
- CloudFormation `AWS::SES::ReceiptRuleSet`: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-ses-receiptruleset.html
