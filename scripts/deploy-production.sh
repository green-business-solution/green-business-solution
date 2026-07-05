#!/usr/bin/env bash
set -euo pipefail

PROFILE="${AWS_PROFILE:-gbs}"
STACK_NAME="${STACK_NAME:-gbs-retrofi-production}"
DOMAIN_NAME="${DOMAIN_NAME:-retrofi.org}"
HOSTED_ZONE_ID="${HOSTED_ZONE_ID:-Z04402863EVV8FUF4EWUX}"
REGION="${AWS_DEPLOY_REGION:-us-east-1}"
DATA_REGION="${GBS_AWS_REGION:-us-east-2}"
RUNTIME_STATE_TABLE="${GBS_RUNTIME_STATE_TABLE:-gbs-runtime-state}"
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID:-754037986401-dgklhhhtjr2k8u9jcj47fdf1jrf9baep.apps.googleusercontent.com}"
GOOGLE_CLIENT_SECRET="${GOOGLE_CLIENT_SECRET:-}"
GEOCODIO_API_KEY="${GBS_GEOCODIO_API_KEY:-${GEOCODIO_API_KEY:-}}"
GEOCODIO_DAILY_LIMIT="${GBS_GEOCODIO_DAILY_LIMIT:-2500}"
GEOCODIO_QUOTA_ALERT_EMAIL_TO="${GBS_GEOCODIO_QUOTA_ALERT_EMAIL_TO:-neerkuchlous@gmail.com}"
ALERT_EMAIL_FROM="${GBS_ALERT_EMAIL_FROM:-${GBS_GEOCODIO_QUOTA_ALERT_EMAIL_FROM:-neerkuchlous@gmail.com}}"
GOOGLE_REDIRECT_URI="${GOOGLE_REDIRECT_URI:-https://${DOMAIN_NAME}/api/auth/google/callback}"
ADMIN_EMAILS="${GBS_ADMIN_EMAILS:-neerkuchlous@gmail.com,pmrajvansh@gmail.com,rshen0210@gmail.com}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/build"
LAMBDA_PACKAGE_DIR="${BUILD_DIR}/lambda-package"
LAMBDA_ZIP="${BUILD_DIR}/gbs-api-lambda.zip"
ARTIFACT_RETENTION_DAYS="${GBS_ARTIFACT_RETENTION_DAYS:-30}"
RUN_FRONTEND=0
RUN_API=0
RUN_INFRA=0
RUN_DATA=0

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

stack_parameter() {
  local key="$1"
  aws_region cloudformation describe-stacks \
    --stack-name "${STACK_NAME}" \
    --query "Stacks[0].Parameters[?ParameterKey=='${key}'].ParameterValue | [0]" \
    --output text
}

usage() {
  cat <<EOF
Usage:
  AWS_PROFILE=gbs ./scripts/deploy-production.sh [full|frontend|api|infra|data]...

Targets:
  full      Run data prerequisites, package/deploy API stack, sync frontend, and invalidate CloudFront. Default.
  frontend  Build Vite, sync the frontend S3 bucket, and invalidate CloudFront only.
  api       Package/upload the Lambda zip and deploy the stack with the new Lambda code.
  infra     Deploy the CloudFormation template using the existing Lambda zip.
  data      Ensure non-CloudFormation runtime prerequisites only.

Environment:
  GBS_ARTIFACT_RETENTION_DAYS=${ARTIFACT_RETENTION_DAYS}
EOF
}

set_full_targets() {
  RUN_FRONTEND=1
  RUN_API=1
  RUN_DATA=1
}

select_targets() {
  if [ "$#" -eq 0 ]; then
    set_full_targets
    return
  fi

  for target in "$@"; do
    case "${target}" in
      full|--full|all|--all)
        set_full_targets
        ;;
      frontend|--frontend)
        RUN_FRONTEND=1
        ;;
      api|--api)
        RUN_API=1
        ;;
      infra|--infra)
        RUN_INFRA=1
        ;;
      data|--data)
        RUN_DATA=1
        ;;
      -h|--help|help)
        usage
        exit 0
        ;;
      *)
        echo "Unknown deploy target: ${target}" >&2
        usage >&2
        exit 1
        ;;
    esac
  done

  if [ "${RUN_API}" -eq 1 ] || [ "${RUN_INFRA}" -eq 1 ]; then
    RUN_DATA=1
  fi
}

ensure_runtime_state_table() {
  if aws_data_region dynamodb describe-table --table-name "${RUNTIME_STATE_TABLE}" >/dev/null 2>&1; then
    return
  fi

  echo "Creating DynamoDB table ${RUNTIME_STATE_TABLE} in ${DATA_REGION}..."
  aws_data_region dynamodb create-table \
    --table-name "${RUNTIME_STATE_TABLE}" \
    --attribute-definitions \
      AttributeName=stateScope,AttributeType=S \
      AttributeName=stateKey,AttributeType=S \
    --key-schema \
      AttributeName=stateScope,KeyType=HASH \
      AttributeName=stateKey,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST >/dev/null

  aws_data_region dynamodb wait table-exists --table-name "${RUNTIME_STATE_TABLE}"
}

ensure_alert_email_identity() {
  if [ -z "${ALERT_EMAIL_FROM}" ]; then
    return
  fi

  if aws_region sesv2 get-email-identity --email-identity "${ALERT_EMAIL_FROM}" >/dev/null 2>&1; then
    return
  fi

  echo "Creating SES email identity for ${ALERT_EMAIL_FROM}. Complete the verification email before quota alerts can be delivered."
  aws_region sesv2 create-email-identity --email-identity "${ALERT_EMAIL_FROM}" >/dev/null
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

ensure_artifact_bucket() {
  echo "Preparing artifact bucket ${ARTIFACT_BUCKET}..."
  if ! aws_region s3api head-bucket --bucket "${ARTIFACT_BUCKET}" >/dev/null 2>&1; then
    aws_region s3api create-bucket --bucket "${ARTIFACT_BUCKET}"
  fi

  aws_region s3api put-public-access-block \
    --bucket "${ARTIFACT_BUCKET}" \
    --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

  aws_region s3api put-bucket-lifecycle-configuration \
    --bucket "${ARTIFACT_BUCKET}" \
    --lifecycle-configuration "{
      \"Rules\": [
        {
          \"ID\": \"expire-lambda-artifacts\",
          \"Status\": \"Enabled\",
          \"Filter\": { \"Prefix\": \"lambda/\" },
          \"Expiration\": { \"Days\": ${ARTIFACT_RETENTION_DAYS} },
          \"AbortIncompleteMultipartUpload\": { \"DaysAfterInitiation\": 7 }
        }
      ]
    }"
}

ensure_generated_fixtures() {
  echo "Ensuring generated test fixtures are available..."
  AWS_PROFILE="${PROFILE}" AWS_REGION="${REGION}" npm run fixtures:generated:download
}

build_frontend() {
  echo "Building frontend..."
  npm run build
}

package_api_lambda() {
  echo "Packaging API Lambda..."
  rm -rf "${LAMBDA_PACKAGE_DIR}" "${LAMBDA_ZIP}"
  mkdir -p "${LAMBDA_PACKAGE_DIR}"
  cp apps/api/package.json "${LAMBDA_PACKAGE_DIR}/package.json"
  cp apps/api/package-lock.json "${LAMBDA_PACKAGE_DIR}/package-lock.json"
  cp -R server "${LAMBDA_PACKAGE_DIR}/server"
  mkdir -p "${LAMBDA_PACKAGE_DIR}/data"
  mkdir -p "${LAMBDA_PACKAGE_DIR}/public"

  copy_data_file data/bill_field_dictionary.json
  copy_data_file data/savings_models.json
  copy_data_file data/opportunity_savings_mapping.json
  copy_data_file data/opportunity_incentive_rules.json
  copy_data_file data/opportunity_incentive_calculation_packages_v2.json
  copy_data_file data/tax_geography_rules.json
  copy_data_file data/tax_local_workflow_rules.json
  copy_data_file data/calculation_requirements.json optional
  copy_data_file data/project_cost_benchmarks.json optional
  copy_data_file data/savings_calculation_methods.json optional

  if [ -f public/sample_matching_test_cases.json ]; then
    cp public/sample_matching_test_cases.json "${LAMBDA_PACKAGE_DIR}/public/"
  else
    echo "Required deploy public fixture is missing: public/sample_matching_test_cases.json" >&2
    exit 1
  fi

  (
    cd "${LAMBDA_PACKAGE_DIR}"
    npm ci --omit=dev --omit=optional
    zip -qr "${LAMBDA_ZIP}" .
  )
}

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

upload_lambda_package() {
  echo "Uploading Lambda package to s3://${ARTIFACT_BUCKET}/${LAMBDA_CODE_KEY}..."
  aws_region s3 cp "${LAMBDA_ZIP}" "s3://${ARTIFACT_BUCKET}/${LAMBDA_CODE_KEY}"
}

ensure_data_prerequisites() {
  ensure_runtime_state_table
  ensure_alert_email_identity
  ensure_energy_data_bucket
}

deploy_stack() {
  local lambda_code_bucket="$1"
  local lambda_code_key="$2"

  if [ -z "${lambda_code_bucket}" ] || [ "${lambda_code_bucket}" = "None" ] || [ -z "${lambda_code_key}" ] || [ "${lambda_code_key}" = "None" ]; then
    echo "LambdaCodeBucket and LambdaCodeKey are required. Run the api or full target first if the stack has no existing Lambda package." >&2
    exit 1
  fi

  echo "Deploying CloudFormation stack ${STACK_NAME}..."
  parameter_overrides=(
    "DomainName=${DOMAIN_NAME}"
    "HostedZoneId=${HOSTED_ZONE_ID}"
    "LambdaCodeBucket=${lambda_code_bucket}"
    "LambdaCodeKey=${lambda_code_key}"
    "GoogleClientId=${GOOGLE_CLIENT_ID}"
    "GoogleRedirectUri=${GOOGLE_REDIRECT_URI}"
    "AdminEmails=${ADMIN_EMAILS}"
    "DataRegion=${DATA_REGION}"
    "RuntimeStateTable=${RUNTIME_STATE_TABLE}"
    "EnergyDataBucketName=${ENERGY_DATA_BUCKET}"
    "GeocodioDailyLimit=${GEOCODIO_DAILY_LIMIT}"
    "GeocodioQuotaAlertEmailTo=${GEOCODIO_QUOTA_ALERT_EMAIL_TO}"
    "AlertEmailFrom=${ALERT_EMAIL_FROM}"
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
}

sync_frontend() {
  local frontend_bucket
  local distribution_id
  local site_url
  frontend_bucket="$(stack_output FrontendBucketName)"
  distribution_id="$(stack_output CloudFrontDistributionId)"
  site_url="$(stack_output SiteUrl)"

  echo "Uploading frontend assets to s3://${frontend_bucket}..."
  aws_region s3 sync dist/ "s3://${frontend_bucket}/" \
    --delete \
    --cache-control "public,max-age=60"

  if [ -d dist/assets ]; then
    aws_region s3 sync dist/assets/ "s3://${frontend_bucket}/assets/" \
      --delete \
      --cache-control "public,max-age=31536000,immutable"
  fi

  echo "Invalidating CloudFront distribution ${distribution_id}..."
  aws_region cloudfront create-invalidation \
    --distribution-id "${distribution_id}" \
    --paths "/*" >/dev/null

  echo "Site: ${site_url}"
}

cd "${ROOT_DIR}"
select_targets "$@"

ACCOUNT_ID="$(aws_global sts get-caller-identity --query Account --output text)"
ARTIFACT_BUCKET="${ARTIFACT_BUCKET:-gbs-retrofi-org-artifacts-${ACCOUNT_ID}-${REGION}}"
ENERGY_DATA_BUCKET="${GBS_ENERGY_DATA_BUCKET:-gbs-retrofi-org-energy-data-${ACCOUNT_ID}}"
LAMBDA_CODE_KEY="lambda/gbs-api-$(date -u +%Y%m%d%H%M%S).zip"
DEPLOYED_LAMBDA_CODE_BUCKET=""
DEPLOYED_LAMBDA_CODE_KEY=""

if [ "${RUN_FRONTEND}" -eq 1 ] || [ "${RUN_API}" -eq 1 ]; then
  ensure_generated_fixtures
fi

if [ "${RUN_FRONTEND}" -eq 1 ]; then
  build_frontend
fi

if [ "${RUN_API}" -eq 1 ]; then
  package_api_lambda
fi

if [ "${RUN_API}" -eq 1 ]; then
  ensure_artifact_bucket
  upload_lambda_package
  DEPLOYED_LAMBDA_CODE_BUCKET="${ARTIFACT_BUCKET}"
  DEPLOYED_LAMBDA_CODE_KEY="${LAMBDA_CODE_KEY}"
elif [ "${RUN_INFRA}" -eq 1 ]; then
  DEPLOYED_LAMBDA_CODE_BUCKET="$(stack_parameter LambdaCodeBucket)"
  DEPLOYED_LAMBDA_CODE_KEY="$(stack_parameter LambdaCodeKey)"
fi

if [ "${RUN_DATA}" -eq 1 ]; then
  ensure_data_prerequisites
fi

if [ "${RUN_API}" -eq 1 ] || [ "${RUN_INFRA}" -eq 1 ]; then
  deploy_stack "${DEPLOYED_LAMBDA_CODE_BUCKET}" "${DEPLOYED_LAMBDA_CODE_KEY}"
fi

if [ "${RUN_FRONTEND}" -eq 1 ]; then
  sync_frontend
fi

echo "Production deploy target(s) completed."
