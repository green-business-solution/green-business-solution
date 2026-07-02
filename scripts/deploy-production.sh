#!/usr/bin/env bash
set -euo pipefail

PROFILE="${AWS_PROFILE:-gbs}"
STACK_NAME="${STACK_NAME:-gbs-retrofi-production}"
DOMAIN_NAME="${DOMAIN_NAME:-retrofi.org}"
HOSTED_ZONE_ID="${HOSTED_ZONE_ID:-Z04402863EVV8FUF4EWUX}"
REGION="${AWS_DEPLOY_REGION:-us-east-1}"
DATA_REGION="${GBS_AWS_REGION:-us-east-2}"
ENERGY_DATA_TABLE="${GBS_ENERGY_DATA_TABLE:-gbs-energy-data}"
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID:-754037986401-dgklhhhtjr2k8u9jcj47fdf1jrf9baep.apps.googleusercontent.com}"
GOOGLE_CLIENT_SECRET="${GOOGLE_CLIENT_SECRET:-}"
GEOCODIO_API_KEY="${GBS_GEOCODIO_API_KEY:-${GEOCODIO_API_KEY:-}}"
GOOGLE_REDIRECT_URI="${GOOGLE_REDIRECT_URI:-https://${DOMAIN_NAME}/api/auth/google/callback}"
ADMIN_EMAILS="${GBS_ADMIN_EMAILS:-neerkuchlous@gmail.com,pmrajvansh@gmail.com,rshen0210@gmail.com}"
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

aws_data_region() {
  aws --profile "${PROFILE}" --region "${DATA_REGION}" "$@"
}

stack_output() {
  local key="$1"
  aws_region cloudformation describe-stacks \
    --stack-name "${STACK_NAME}" \
    --query "Stacks[0].Outputs[?OutputKey=='${key}'].OutputValue | [0]" \
    --output text
}

ensure_energy_data_table() {
  if aws_data_region dynamodb describe-table --table-name "${ENERGY_DATA_TABLE}" >/dev/null 2>&1; then
    return
  fi

  echo "Creating DynamoDB table ${ENERGY_DATA_TABLE} in ${DATA_REGION}..."
  aws_data_region dynamodb create-table \
    --table-name "${ENERGY_DATA_TABLE}" \
    --attribute-definitions \
      AttributeName=userId,AttributeType=S \
      AttributeName=energyDataId,AttributeType=S \
    --key-schema \
      AttributeName=userId,KeyType=HASH \
      AttributeName=energyDataId,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST >/dev/null

  aws_data_region dynamodb wait table-exists --table-name "${ENERGY_DATA_TABLE}"
}

ensure_energy_data_bucket() {
  if ! aws_region s3api head-bucket --bucket "${ENERGY_DATA_BUCKET}" >/dev/null 2>&1; then
    echo "Creating S3 bucket ${ENERGY_DATA_BUCKET} in ${REGION}..."
    if [ "${REGION}" = "us-east-1" ]; then
      aws_region s3api create-bucket --bucket "${ENERGY_DATA_BUCKET}"
    else
      aws_region s3api create-bucket \
        --bucket "${ENERGY_DATA_BUCKET}" \
        --create-bucket-configuration "LocationConstraint=${REGION}"
    fi
  fi

  aws_region s3api put-public-access-block \
    --bucket "${ENERGY_DATA_BUCKET}" \
    --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

  aws_region s3api put-bucket-cors \
    --bucket "${ENERGY_DATA_BUCKET}" \
    --cors-configuration '{
      "CORSRules": [
        {
          "AllowedHeaders": ["*"],
          "AllowedMethods": ["GET", "PUT"],
          "AllowedOrigins": [
            "https://retrofi.org",
            "https://www.retrofi.org",
            "http://localhost:5173",
            "http://127.0.0.1:5173"
          ],
          "ExposeHeaders": ["ETag"],
          "MaxAgeSeconds": 3600
        }
      ]
    }'
}

cd "${ROOT_DIR}"

ACCOUNT_ID="$(aws_global sts get-caller-identity --query Account --output text)"
ARTIFACT_BUCKET="${ARTIFACT_BUCKET:-gbs-retrofi-org-artifacts-${ACCOUNT_ID}-${REGION}}"
ENERGY_DATA_BUCKET="${GBS_ENERGY_DATA_BUCKET:-gbs-retrofi-org-energy-data-${ACCOUNT_ID}}"
LAMBDA_CODE_KEY="lambda/gbs-api-$(date -u +%Y%m%d%H%M%S).zip"

echo "Building frontend..."
npm run build

echo "Packaging API Lambda..."
rm -rf "${LAMBDA_PACKAGE_DIR}" "${LAMBDA_ZIP}"
mkdir -p "${LAMBDA_PACKAGE_DIR}"
cp package.json package-lock.json "${LAMBDA_PACKAGE_DIR}/"
cp -R server "${LAMBDA_PACKAGE_DIR}/server"
mkdir -p "${LAMBDA_PACKAGE_DIR}/data"

copy_data_file() {
  local file_path="$1"
  local required="${2:-required}"
  if [ -f "${file_path}" ]; then
    cp "${file_path}" "${LAMBDA_PACKAGE_DIR}/data/"
  elif [ "${required}" = "required" ]; then
    echo "Required deploy data file is missing: ${file_path}" >&2
    exit 1
  else
    echo "Skipping optional deploy data file not present: ${file_path}"
  fi
}

copy_data_file data/bill_field_dictionary.json
copy_data_file data/savings_models.json
copy_data_file data/opportunity_savings_mapping.json
copy_data_file data/opportunity_incentive_rules.json
copy_data_file data/opportunity_incentive_calculation_packages_v2.json
copy_data_file data/calculation_requirements.json optional
copy_data_file data/project_cost_benchmarks.json optional
copy_data_file data/savings_calculation_methods.json optional

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

ensure_energy_data_table
ensure_energy_data_bucket

echo "Deploying CloudFormation stack ${STACK_NAME}..."
parameter_overrides=(
  "DomainName=${DOMAIN_NAME}"
  "HostedZoneId=${HOSTED_ZONE_ID}"
  "LambdaCodeBucket=${ARTIFACT_BUCKET}"
  "LambdaCodeKey=${LAMBDA_CODE_KEY}"
  "GoogleClientId=${GOOGLE_CLIENT_ID}"
  "GoogleRedirectUri=${GOOGLE_REDIRECT_URI}"
  "AdminEmails=${ADMIN_EMAILS}"
  "DataRegion=${DATA_REGION}"
  "EnergyDataTable=${ENERGY_DATA_TABLE}"
  "EnergyDataBucketName=${ENERGY_DATA_BUCKET}"
)

if [ -n "${GOOGLE_CLIENT_SECRET}" ]; then
  parameter_overrides+=("GoogleClientSecret=${GOOGLE_CLIENT_SECRET}")
else
  echo "GOOGLE_CLIENT_SECRET not set; reusing the existing CloudFormation parameter value."
fi

if [ -n "${GEOCODIO_API_KEY}" ]; then
  parameter_overrides+=("GeocodioApiKey=${GEOCODIO_API_KEY}")
else
  echo "GEOCODIO_API_KEY not set; deploying with Geocodio fallback disabled unless an existing parameter value is present."
fi

aws_region cloudformation deploy \
  --stack-name "${STACK_NAME}" \
  --template-file infra/production-hosting.yaml \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides "${parameter_overrides[@]}"

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
