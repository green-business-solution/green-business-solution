#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "Codex local workspace setup"
echo "Repo: $ROOT_DIR"
echo "Mode: use Codex App in Local mode on this same directory"
echo

export AWS_PROFILE="${AWS_PROFILE:-gbs}"
export GBS_AWS_REGION="${GBS_AWS_REGION:-us-east-2}"
export GBS_ENERGY_DATA_BUCKET_REGION="${GBS_ENERGY_DATA_BUCKET_REGION:-us-east-1}"

if [ ! -d node_modules ]; then
  echo "Installing dependencies with npm install..."
  npm install
else
  echo "Dependencies already present."
fi

echo
echo "Environment"
echo "  AWS_PROFILE=$AWS_PROFILE"
echo "  GBS_AWS_REGION=$GBS_AWS_REGION"
echo "  GBS_ENERGY_DATA_BUCKET_REGION=$GBS_ENERGY_DATA_BUCKET_REGION"

if command -v aws >/dev/null 2>&1; then
  if aws sts get-caller-identity --profile "$AWS_PROFILE" >/tmp/codex-aws-identity.json 2>/tmp/codex-aws-identity.err; then
    echo
    echo "AWS session: active for profile $AWS_PROFILE"
    cat /tmp/codex-aws-identity.json
  else
    echo
    echo "AWS session: not active for profile $AWS_PROFILE"
    cat /tmp/codex-aws-identity.err
    echo "Run: aws sso login --profile $AWS_PROFILE"
  fi
else
  echo
  echo "AWS CLI not found in PATH."
fi

echo
echo "Common commands"
echo "  npm run dev"
echo "  npm run typecheck"
echo "  npm run build"
