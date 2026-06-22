#!/usr/bin/env bash
set -euo pipefail

PROFILE="${AWS_PROFILE:-gbs}"
STACK_NAME="${STACK_NAME:-gbs-retrofi-production}"
DOMAIN_NAME="${DOMAIN_NAME:-retrofi.org}"
HOSTED_ZONE_ID="${HOSTED_ZONE_ID:-Z04402863EVV8FUF4EWUX}"
REGION="${AWS_DEPLOY_REGION:-us-east-1}"
DATA_REGION="${GBS_AWS_REGION:-us-east-2}"
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID:-754037986401-dgklhhhtjr2k8u9jcj47fdf1jrf9baep.apps.googleusercontent.com}"
ADMIN_EMAILS="${GBS_ADMIN_EMAILS:-neerkuchlous@gmail.com,pmrajvansh@gmail.com}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/build"
LAMBDA_PACKAGE_DIR="${BUILD_DIR}/lambda-package"
LAMBDA_ZIP="${BUILD_DIR}/gbs-api-lambda.zip"

aws_global() {
  aws --profile "${PROFILE}" "$@"
}

aws_region() {
  aws --profile "${PROFILE}" --region "${REGION}" "$@"
}

stack_output() {
  local key="$1"
  aws_region cloudformation describe-stacks \
    --stack-name "${STACK_NAME}" \
    --query "Stacks[0].Outputs[?OutputKey=='${key}'].OutputValue | [0]" \
    --output text
}

cd "${ROOT_DIR}"

ACCOUNT_ID="$(aws_global sts get-caller-identity --query Account --output text)"
ARTIFACT_BUCKET="${ARTIFACT_BUCKET:-gbs-retrofi-org-artifacts-${ACCOUNT_ID}-${REGION}}"
LAMBDA_CODE_KEY="lambda/gbs-api-$(date -u +%Y%m%d%H%M%S).zip"

echo "Building frontend..."
npm run build

echo "Packaging API Lambda..."
rm -rf "${LAMBDA_PACKAGE_DIR}" "${LAMBDA_ZIP}"
mkdir -p "${LAMBDA_PACKAGE_DIR}"
cp package.json package-lock.json "${LAMBDA_PACKAGE_DIR}/"
cp -R server "${LAMBDA_PACKAGE_DIR}/server"

(
  cd "${LAMBDA_PACKAGE_DIR}"
  npm ci --omit=dev --omit=optional
  zip -qr "${LAMBDA_ZIP}" .
)

echo "Preparing artifact bucket ${ARTIFACT_BUCKET}..."
if ! aws_region s3api head-bucket --bucket "${ARTIFACT_BUCKET}" >/dev/null 2>&1; then
  aws_region s3api create-bucket --bucket "${ARTIFACT_BUCKET}"
  aws_region s3api put-public-access-block \
    --bucket "${ARTIFACT_BUCKET}" \
    --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
fi

aws_region s3 cp "${LAMBDA_ZIP}" "s3://${ARTIFACT_BUCKET}/${LAMBDA_CODE_KEY}"

echo "Deploying CloudFormation stack ${STACK_NAME}..."
aws_region cloudformation deploy \
  --stack-name "${STACK_NAME}" \
  --template-file infra/production-hosting.yaml \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    DomainName="${DOMAIN_NAME}" \
    HostedZoneId="${HOSTED_ZONE_ID}" \
    LambdaCodeBucket="${ARTIFACT_BUCKET}" \
    LambdaCodeKey="${LAMBDA_CODE_KEY}" \
    GoogleClientId="${GOOGLE_CLIENT_ID}" \
    AdminEmails="${ADMIN_EMAILS}" \
    DataRegion="${DATA_REGION}"

FRONTEND_BUCKET="$(stack_output FrontendBucketName)"
DISTRIBUTION_ID="$(stack_output CloudFrontDistributionId)"
SITE_URL="$(stack_output SiteUrl)"

echo "Uploading frontend assets to s3://${FRONTEND_BUCKET}..."
aws_region s3 sync dist/ "s3://${FRONTEND_BUCKET}/" \
  --delete \
  --cache-control "public,max-age=60"

if [ -d dist/assets ]; then
  aws_region s3 sync dist/assets/ "s3://${FRONTEND_BUCKET}/assets/" \
    --delete \
    --cache-control "public,max-age=31536000,immutable"
fi

echo "Invalidating CloudFront distribution ${DISTRIBUTION_ID}..."
aws_region cloudfront create-invalidation \
  --distribution-id "${DISTRIBUTION_ID}" \
  --paths "/*" >/dev/null

echo "Production deploy submitted."
echo "Site: ${SITE_URL}"
