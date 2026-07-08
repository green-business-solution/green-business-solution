#!/usr/bin/env bash
set -euo pipefail

PROFILE="${AWS_PROFILE-gbs}"
if [ -z "${PROFILE}" ]; then
  unset AWS_PROFILE
fi
STACK_NAME="${STACK_NAME:-gbs-retrofi-production}"
API_STACK_NAME="${API_STACK_NAME:-gbs-retrofi-api}"
GITHUB_ACTIONS_STACK_NAME="${GITHUB_ACTIONS_STACK_NAME:-gbs-github-actions-deploy}"
RUNTIME_DATA_STACK_NAME="${RUNTIME_DATA_STACK_NAME:-gbs-retrofi-runtime-data}"
RUNTIME_BUCKETS_STACK_NAME="${RUNTIME_BUCKETS_STACK_NAME:-gbs-retrofi-runtime-buckets}"
DOMAIN_NAME="${DOMAIN_NAME:-retrofi.org}"
HOSTED_ZONE_ID="${HOSTED_ZONE_ID:-Z10326481HHLW5TKN20XQ}"
ENABLE_CUSTOM_DOMAIN="${GBS_ENABLE_CUSTOM_DOMAIN:-true}"
CERTIFICATE_ARN="${GBS_CERTIFICATE_ARN:-arn:aws:acm:us-east-1:059310317821:certificate/2c45fa03-2cb3-4cd7-8455-d098174d1e73}"
MANAGE_ROUTE53_RECORDS="${GBS_MANAGE_ROUTE53_RECORDS:-false}"
REGION="${AWS_DEPLOY_REGION:-us-east-1}"
DATA_REGION="${GBS_AWS_REGION:-us-east-2}"
MANAGE_CORE_RUNTIME_TABLES="${GBS_MANAGE_CORE_RUNTIME_TABLES:-false}"
MANAGE_DEV_WORK_BUCKET="${GBS_MANAGE_DEV_WORK_BUCKET:-false}"
USERS_TABLE="${GBS_USERS_TABLE:-gbs-users}"
INTAKE_TABLE="${GBS_INTAKE_TABLE:-gbs-client-intake}"
OPPORTUNITIES_TABLE="${GBS_OPPORTUNITIES_TABLE:-gbs-opportunity-candidates}"
DASHBOARD_PERFORMANCE_TABLE="${GBS_DASHBOARD_PERFORMANCE_TABLE:-gbs-dashboard-performance}"
RETROFIT_RECOMMENDATION_CACHE_TABLE="${GBS_RETROFIT_RECOMMENDATION_CACHE_TABLE:-gbs-retrofit-recommendation-cache}"
APPLICATION_PROFILES_TABLE="${GBS_APPLICATION_PROFILES_TABLE:-gbs-application-profiles}"
API_RUNTIME_STATE_TABLE="${GBS_API_RUNTIME_STATE_TABLE:-gbs-api-runtime-state}"
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID:-754037986401-dgklhhhtjr2k8u9jcj47fdf1jrf9baep.apps.googleusercontent.com}"
GOOGLE_CLIENT_SECRET="${GOOGLE_CLIENT_SECRET:-}"
GEOCODIO_API_KEY="${GBS_GEOCODIO_API_KEY:-${GEOCODIO_API_KEY:-}}"
GEOCODIO_DAILY_LIMIT="${GBS_GEOCODIO_DAILY_LIMIT:-2500}"
GEOCODIO_QUOTA_ALERT_EMAIL_TO="${GBS_GEOCODIO_QUOTA_ALERT_EMAIL_TO:-neerkuchlous@gmail.com}"
ALERT_EMAIL_FROM="${GBS_ALERT_EMAIL_FROM:-${GBS_GEOCODIO_QUOTA_ALERT_EMAIL_FROM:-neerkuchlous@gmail.com}}"
GOOGLE_REDIRECT_URI="${GOOGLE_REDIRECT_URI:-https://${DOMAIN_NAME}/api/auth/google/callback}"
ADMIN_EMAILS="${GBS_ADMIN_EMAILS:-neerkuchlous@gmail.com,pmrajvansh@gmail.com,rshen0210@gmail.com}"
LEGACY_API_FUNCTION_NAME="${LEGACY_API_FUNCTION_NAME:-gbs-retrofi-api}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/build"
LAMBDA_PACKAGE_DIR="${BUILD_DIR}/lambda-package"
LAMBDA_ZIP="${BUILD_DIR}/gbs-api-lambda.zip"
ARTIFACT_RETENTION_DAYS="${GBS_ARTIFACT_RETENTION_DAYS:-30}"
RUNTIME_CACHE_RETENTION_DAYS="${GBS_RUNTIME_CACHE_RETENTION_DAYS:-90}"
FORM_CATALOG_VERSION_RETENTION_DAYS="${GBS_FORM_CATALOG_VERSION_RETENTION_DAYS:-30}"
RUN_FRONTEND=0
RUN_API=0
RUN_INFRA=0
RUN_DATA=0
RUN_CI=0

aws_profile_args() {
  if [ -n "${PROFILE}" ]; then
    printf '%s\n' --profile "${PROFILE}"
  fi
}

aws_global() {
  aws $(aws_profile_args) "$@"
}

aws_region() {
  aws $(aws_profile_args) --region "${REGION}" "$@"
}

aws_data_region() {
  aws $(aws_profile_args) --region "${DATA_REGION}" "$@"
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

api_stack_exists() {
  aws_region cloudformation describe-stacks --stack-name "${API_STACK_NAME}" >/dev/null 2>&1
}

api_stack_output() {
  local key="$1"
  aws_region cloudformation describe-stacks \
    --stack-name "${API_STACK_NAME}" \
    --query "Stacks[0].Outputs[?OutputKey=='${key}'].OutputValue | [0]" \
    --output text
}

api_stack_parameter() {
  local key="$1"
  aws_region cloudformation describe-stacks \
    --stack-name "${API_STACK_NAME}" \
    --query "Stacks[0].Parameters[?ParameterKey=='${key}'].ParameterValue | [0]" \
    --output text
}

usage() {
  cat <<EOF
Usage:
  AWS_PROFILE=gbs ./scripts/deploy-production.sh [auto|full|ci|frontend|api|infra|data]...

Targets:
  auto      Select minimal targets from changed paths. Uses GBS_DEPLOY_BASE_SHA and GBS_DEPLOY_HEAD_SHA when set.
  full      Run CI bootstrap, data prerequisites, package/deploy API, update edge stack, sync frontend, and invalidate CloudFront. Default.
  ci        Deploy the GitHub Actions OIDC/deploy role bootstrap stack only.
  frontend  Build Vite, sync the frontend S3 bucket, and invalidate CloudFront only.
  api       Package/upload the Lambda zip and deploy the API stack with the new Lambda code.
  infra     Deploy the API and edge CloudFormation templates using the existing Lambda zip.
  data      Ensure non-CloudFormation runtime prerequisites only.

Environment:
  GBS_ARTIFACT_RETENTION_DAYS=${ARTIFACT_RETENTION_DAYS}
  GBS_RUNTIME_CACHE_RETENTION_DAYS=${RUNTIME_CACHE_RETENTION_DAYS}
  GBS_FORM_CATALOG_VERSION_RETENTION_DAYS=${FORM_CATALOG_VERSION_RETENTION_DAYS}
  GBS_MANAGE_CORE_RUNTIME_TABLES=${MANAGE_CORE_RUNTIME_TABLES}
  GBS_MANAGE_DEV_WORK_BUCKET=${MANAGE_DEV_WORK_BUCKET}
  GBS_ENABLE_CUSTOM_DOMAIN=${ENABLE_CUSTOM_DOMAIN}
  GBS_CERTIFICATE_ARN=${CERTIFICATE_ARN:-}
  GBS_MANAGE_ROUTE53_RECORDS=${MANAGE_ROUTE53_RECORDS}
  GBS_DEPLOY_STATE_PREFIX=${GBS_DEPLOY_STATE_PREFIX:-deploy-state}
EOF
}

set_full_targets() {
  RUN_CI=1
  RUN_FRONTEND=1
  RUN_API=1
  RUN_INFRA=1
  RUN_DATA=1
}

select_targets() {
  if [ "$#" -eq 0 ]; then
    set_full_targets
    return
  fi

  for target in "$@"; do
    case "${target}" in
      auto|--auto)
        select_auto_targets
        ;;
      full|--full|all|--all)
        set_full_targets
        ;;
      ci|--ci|bootstrap|--bootstrap)
        RUN_CI=1
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

select_auto_targets() {
  local auto_targets
  if [ -n "${GBS_DEPLOY_BASE_SHA:-}" ] && [ -n "${GBS_DEPLOY_HEAD_SHA:-}" ]; then
    auto_targets="$(node scripts/select-production-deploy-targets.mjs --format shell "${GBS_DEPLOY_BASE_SHA}" "${GBS_DEPLOY_HEAD_SHA}")"
  else
    auto_targets="$(node scripts/select-production-deploy-targets.mjs --format shell)"
  fi

  if [ -z "${auto_targets}" ] || [ "${auto_targets}" = "none" ]; then
    echo "No production deploy target selected from changed paths."
    exit 0
  fi

  echo "Auto-selected production deploy target(s): ${auto_targets}"
  select_targets ${auto_targets}
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

deploy_runtime_data_stack() {
  echo "Deploying runtime DynamoDB stack ${RUNTIME_DATA_STACK_NAME} in ${DATA_REGION}..."
  aws_data_region cloudformation deploy \
    --stack-name "${RUNTIME_DATA_STACK_NAME}" \
    --template-file infra/runtime-data.yaml \
    --parameter-overrides \
      "ManageCoreRuntimeTables=${MANAGE_CORE_RUNTIME_TABLES}" \
      "UsersTable=${USERS_TABLE}" \
      "IntakeTable=${INTAKE_TABLE}" \
      "OpportunitiesTable=${OPPORTUNITIES_TABLE}" \
      "DashboardPerformanceTable=${DASHBOARD_PERFORMANCE_TABLE}" \
      "RetrofitRecommendationCacheTable=${RETROFIT_RECOMMENDATION_CACHE_TABLE}" \
      "ApplicationProfilesTable=${APPLICATION_PROFILES_TABLE}" \
      "ApiRuntimeStateTable=${API_RUNTIME_STATE_TABLE}"

  echo "Deploying runtime bucket stack ${RUNTIME_BUCKETS_STACK_NAME} in ${REGION}..."
  aws_region cloudformation deploy \
    --stack-name "${RUNTIME_BUCKETS_STACK_NAME}" \
    --template-file infra/runtime-buckets.yaml \
    --parameter-overrides \
      "RuntimeCacheBucketName=${RUNTIME_CACHE_BUCKET}" \
      "TestFixturesBucketName=${TEST_FIXTURES_BUCKET}" \
      "ManageDevWorkBucket=${MANAGE_DEV_WORK_BUCKET}" \
      "DevWorkBucketName=${DEV_WORK_BUCKET}" \
      "RuntimeCacheRetentionDays=${RUNTIME_CACHE_RETENTION_DAYS}" \
      "FormQuestionCatalogVersionRetentionDays=${FORM_CATALOG_VERSION_RETENTION_DAYS}"
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
  if [ -n "${PROFILE}" ]; then
    AWS_PROFILE="${PROFILE}" AWS_REGION="${REGION}" GBS_GENERATED_FIXTURE_BUCKET="${TEST_FIXTURES_BUCKET}" npm run fixtures:generated:download
  else
    AWS_REGION="${REGION}" GBS_GENERATED_FIXTURE_BUCKET="${TEST_FIXTURES_BUCKET}" npm run fixtures:generated:download
  fi
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
  cp -R apps/api/server "${LAMBDA_PACKAGE_DIR}/server"
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

hash_directory() {
  local directory="$1"
  (
    cd "${directory}"
    find . -type f | LC_ALL=C sort | while IFS= read -r file_path; do
      shasum -a 256 "${file_path}"
    done | shasum -a 256 | awk '{print $1}'
  )
}

s3_object_text() {
  local bucket="$1"
  local key="$2"
  aws_region s3 cp "s3://${bucket}/${key}" - 2>/dev/null | tr -d '\r\n' || true
}

put_s3_text() {
  local bucket="$1"
  local key="$2"
  local value="$3"
  printf '%s\n' "${value}" | aws_region s3 cp - "s3://${bucket}/${key}" >/dev/null
}

upload_lambda_package() {
  echo "Uploading Lambda package to s3://${ARTIFACT_BUCKET}/${LAMBDA_CODE_KEY}..."
  aws_region s3 cp "${LAMBDA_ZIP}" "s3://${ARTIFACT_BUCKET}/${LAMBDA_CODE_KEY}"
}

ensure_data_prerequisites() {
  deploy_runtime_data_stack
  ensure_alert_email_identity
  ensure_energy_data_bucket
}

deploy_github_actions_stack() {
  echo "Deploying GitHub Actions deploy role stack ${GITHUB_ACTIONS_STACK_NAME}..."
  aws_region cloudformation deploy \
    --stack-name "${GITHUB_ACTIONS_STACK_NAME}" \
    --template-file infra/github-actions-deploy-role.yaml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides \
      "GitHubRepository=green-business-solution/green-business-solution"
}

existing_lambda_env_value() {
  local variable_name="$1"
  local value
  value="$(aws_region lambda get-function-configuration \
    --function-name "${LEGACY_API_FUNCTION_NAME}" \
    --query "Environment.Variables.${variable_name}" \
    --output text 2>/dev/null || true)"
  if [ "${value}" = "None" ]; then
    value=""
  fi
  printf '%s' "${value}"
}

hydrate_first_api_stack_secrets() {
  if api_stack_exists; then
    return
  fi

  if [ -z "${GOOGLE_CLIENT_SECRET}" ]; then
    GOOGLE_CLIENT_SECRET="$(existing_lambda_env_value GOOGLE_CLIENT_SECRET)"
  fi

  if [ -z "${GEOCODIO_API_KEY}" ]; then
    GEOCODIO_API_KEY="$(existing_lambda_env_value GBS_GEOCODIO_API_KEY)"
  fi

  if [ -z "${GOOGLE_CLIENT_SECRET}" ]; then
    echo "GOOGLE_CLIENT_SECRET is required to create the new API stack and could not be copied from ${LEGACY_API_FUNCTION_NAME}." >&2
    exit 1
  fi
}

deploy_api_stack() {
  local lambda_code_bucket="$1"
  local lambda_code_key="$2"

  if [ -z "${lambda_code_bucket}" ] || [ "${lambda_code_bucket}" = "None" ] || [ -z "${lambda_code_key}" ] || [ "${lambda_code_key}" = "None" ]; then
    echo "LambdaCodeBucket and LambdaCodeKey are required. Run the api or full target first if the API stack has no existing Lambda package." >&2
    exit 1
  fi

  hydrate_first_api_stack_secrets

  echo "Deploying API stack ${API_STACK_NAME}..."
  parameter_overrides=(
    "LambdaCodeBucket=${lambda_code_bucket}"
    "LambdaCodeKey=${lambda_code_key}"
    "GoogleClientId=${GOOGLE_CLIENT_ID}"
    "GoogleRedirectUri=${GOOGLE_REDIRECT_URI}"
    "AdminEmails=${ADMIN_EMAILS}"
    "DataRegion=${DATA_REGION}"
    "UsersTable=${USERS_TABLE}"
    "IntakeTable=${INTAKE_TABLE}"
    "OpportunitiesTable=${OPPORTUNITIES_TABLE}"
    "DashboardPerformanceTable=${DASHBOARD_PERFORMANCE_TABLE}"
    "RetrofitRecommendationCacheTable=${RETROFIT_RECOMMENDATION_CACHE_TABLE}"
    "ApplicationProfilesTable=${APPLICATION_PROFILES_TABLE}"
    "ApiRuntimeStateTable=${API_RUNTIME_STATE_TABLE}"
    "EnergyDataBucketName=${ENERGY_DATA_BUCKET}"
    "RuntimeCacheBucketName=${RUNTIME_CACHE_BUCKET}"
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
    --stack-name "${API_STACK_NAME}" \
    --template-file infra/api-hosting.yaml \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides "${parameter_overrides[@]}"
}

deploy_edge_stack() {
  local api_origin_domain_name="$1"

  if [ -z "${api_origin_domain_name}" ] || [ "${api_origin_domain_name}" = "None" ]; then
    echo "ApiOriginDomainName is required. Deploy the API stack first." >&2
    exit 1
  fi

  echo "Deploying edge/frontend stack ${STACK_NAME}..."
  aws_region cloudformation deploy \
    --stack-name "${STACK_NAME}" \
    --template-file infra/production-hosting.yaml \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
      "DomainName=${DOMAIN_NAME}" \
      "HostedZoneId=${HOSTED_ZONE_ID}" \
      "EnableCustomDomain=${ENABLE_CUSTOM_DOMAIN}" \
      "CertificateArn=${CERTIFICATE_ARN}" \
      "ManageRoute53Records=${MANAGE_ROUTE53_RECORDS}" \
      "ApiOriginDomainName=${api_origin_domain_name}"
}

sync_frontend() {
  local frontend_bucket
  local distribution_id
  local site_url
  local deployed_hash
  frontend_bucket="$(stack_output FrontendBucketName)"
  distribution_id="$(stack_output CloudFrontDistributionId)"
  site_url="$(stack_output SiteUrl)"

  if [ -z "${FRONTEND_DIST_HASH}" ]; then
    FRONTEND_DIST_HASH="$(hash_directory dist)"
  fi

  deployed_hash="$(s3_object_text "${frontend_bucket}" "${FRONTEND_DIST_STATE_KEY}")"
  if [ -n "${deployed_hash}" ] && [ "${deployed_hash}" = "${FRONTEND_DIST_HASH}" ]; then
    echo "Frontend dist hash unchanged (${FRONTEND_DIST_HASH}); skipping S3 sync and CloudFront invalidation."
    echo "Site: ${site_url}"
    return
  fi

  echo "Frontend dist hash: ${FRONTEND_DIST_HASH}"
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

  put_s3_text "${frontend_bucket}" "${FRONTEND_DIST_STATE_KEY}" "${FRONTEND_DIST_HASH}"
  echo "Site: ${site_url}"
}

cd "${ROOT_DIR}"
select_targets "$@"

ACCOUNT_ID="$(aws_global sts get-caller-identity --query Account --output text)"
ARTIFACT_BUCKET="${ARTIFACT_BUCKET:-gbs-retrofi-org-artifacts-${ACCOUNT_ID}-${REGION}}"
ENERGY_DATA_BUCKET="${GBS_ENERGY_DATA_BUCKET:-gbs-retrofi-org-energy-data-${ACCOUNT_ID}}"
RUNTIME_CACHE_BUCKET="${GBS_RUNTIME_CACHE_BUCKET:-gbs-retrofi-org-runtime-cache-${ACCOUNT_ID}}"
TEST_FIXTURES_BUCKET="${GBS_TEST_FIXTURES_BUCKET:-${GBS_GENERATED_FIXTURE_BUCKET:-gbs-retrofi-test-fixtures-${ACCOUNT_ID}-${REGION}}}"
DEV_WORK_BUCKET="${GBS_DEV_WORK_BUCKET:-gbs-retrofi-dev-work-${ACCOUNT_ID}-${REGION}}"
LAMBDA_CODE_KEY="lambda/gbs-api-$(date -u +%Y%m%d%H%M%S).zip"
DEPLOY_STATE_PREFIX="${GBS_DEPLOY_STATE_PREFIX:-deploy-state}"
API_PACKAGE_STATE_KEY="${DEPLOY_STATE_PREFIX}/api-package.sha256"
FRONTEND_DIST_STATE_KEY="${DEPLOY_STATE_PREFIX}/frontend-dist.sha256"
DEPLOYED_LAMBDA_CODE_BUCKET=""
DEPLOYED_LAMBDA_CODE_KEY=""
API_PACKAGE_HASH=""
API_PACKAGE_CHANGED=0
FRONTEND_DIST_HASH=""

if [ "${RUN_CI}" -eq 1 ]; then
  deploy_github_actions_stack
fi

if [ "${RUN_DATA}" -eq 1 ]; then
  ensure_data_prerequisites
fi

if [ "${RUN_FRONTEND}" -eq 1 ] || [ "${RUN_API}" -eq 1 ]; then
  ensure_generated_fixtures
fi

if [ "${RUN_FRONTEND}" -eq 1 ]; then
  build_frontend
  FRONTEND_DIST_HASH="$(hash_directory dist)"
fi

if [ "${RUN_API}" -eq 1 ]; then
  package_api_lambda
fi

if [ "${RUN_API}" -eq 1 ]; then
  ensure_artifact_bucket
  API_PACKAGE_HASH="$(hash_directory "${LAMBDA_PACKAGE_DIR}")"
  DEPLOYED_API_PACKAGE_HASH="$(s3_object_text "${ARTIFACT_BUCKET}" "${API_PACKAGE_STATE_KEY}")"
  if [ -n "${DEPLOYED_API_PACKAGE_HASH}" ] && [ "${DEPLOYED_API_PACKAGE_HASH}" = "${API_PACKAGE_HASH}" ]; then
    echo "API package hash unchanged (${API_PACKAGE_HASH}); skipping Lambda upload and API stack update."
    RUN_API=0
  else
    echo "API package hash: ${API_PACKAGE_HASH}"
    upload_lambda_package
    DEPLOYED_LAMBDA_CODE_BUCKET="${ARTIFACT_BUCKET}"
    DEPLOYED_LAMBDA_CODE_KEY="${LAMBDA_CODE_KEY}"
    API_PACKAGE_CHANGED=1
  fi
fi

if [ "${RUN_API}" -eq 0 ] && [ "${RUN_INFRA}" -eq 1 ]; then
  if api_stack_exists; then
    DEPLOYED_LAMBDA_CODE_BUCKET="$(api_stack_parameter LambdaCodeBucket)"
    DEPLOYED_LAMBDA_CODE_KEY="$(api_stack_parameter LambdaCodeKey)"
  else
    DEPLOYED_LAMBDA_CODE_BUCKET="$(stack_parameter LambdaCodeBucket)"
    DEPLOYED_LAMBDA_CODE_KEY="$(stack_parameter LambdaCodeKey)"
  fi
fi

if [ "${RUN_API}" -eq 1 ] || [ "${RUN_INFRA}" -eq 1 ]; then
  deploy_api_stack "${DEPLOYED_LAMBDA_CODE_BUCKET}" "${DEPLOYED_LAMBDA_CODE_KEY}"
  if [ "${API_PACKAGE_CHANGED}" -eq 1 ]; then
    put_s3_text "${ARTIFACT_BUCKET}" "${API_PACKAGE_STATE_KEY}" "${API_PACKAGE_HASH}"
  fi
fi

if [ "${RUN_INFRA}" -eq 1 ]; then
  deploy_edge_stack "$(api_stack_output ApiDomainName)"
fi

if [ "${RUN_FRONTEND}" -eq 1 ]; then
  sync_frontend
fi

echo "Production deploy target(s) completed."
