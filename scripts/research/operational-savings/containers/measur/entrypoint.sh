#!/bin/sh

set -eu

if [ "$#" -lt 1 ]; then
  echo "expected a MEASUR proof mode" >&2
  exit 64
fi

case "$1" in
  compressed-air)
    model="CompressedAirLeakSurvey"
    fixture="compressed-air-estimate-v1"
    executable="/usr/local/libexec/measur-compressed-air"
    ;;
  equipment)
    model="MotorEfficiency+PSATResult+FanResult+CoolingTower"
    fixture="equipment-golden-v1"
    executable="/usr/local/libexec/measur-equipment"
    ;;
  *)
    echo "unsupported MEASUR proof mode: $1" >&2
    exit 64
    ;;
esac

shift
outputs="$("${executable}" "$@")"

printf \
  '{"schemaVersion":1,"sourceCommit":"%s","model":"%s","fixture":"%s","outputs":%s}\n' \
  "${MEASUR_SOURCE_COMMIT}" \
  "${model}" \
  "${fixture}" \
  "${outputs}"
