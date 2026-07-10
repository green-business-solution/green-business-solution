# Durable Fixture Manifest Report

Status: ready.

PR: https://github.com/green-business-solution/green-business-solution/pull/21

Commit: `6b0154d`

## Outcome

The tracked generated-fixture manifest now matches the validated production bucket and the current production Site EUI fixture checksum.

Checksum validation remains strict.

No validation bypass was introduced.

## Verification Matrix

| Local path | Manifest size | Manifest SHA-256 | S3 size | S3 SHA-256 | Result |
| --- | ---: | --- | ---: | --- | --- |
| `public/sample_matching_test_cases.json` | `86104006` | `916ee9ad5e54fc93d2901c1d9ee6ebd2acce79a9b3c457f088fbf8d93ae7d857` | `86104006` | `916ee9ad5e54fc93d2901c1d9ee6ebd2acce79a9b3c457f088fbf8d93ae7d857` | OK |
| `data/sample_user_profiles.json` | `17123050` | `17c1a345fe9f36a97a36073210f3e2adad879dd08788d9301519fdc80f113660` | `17123050` | `17c1a345fe9f36a97a36073210f3e2adad879dd08788d9301519fdc80f113660` | OK |
| `data/retrofi_patch_profiles_01_10.json` | `653268` | `45a368acf657bef5611704e3d9785fbbf5211f705562cbba417b16e3a0682ed4` | `653268` | `45a368acf657bef5611704e3d9785fbbf5211f705562cbba417b16e3a0682ed4` | OK |
| `data/retrofi_patch_profiles_11_20.json` | `948376` | `9e3a0e67abe9b5da79b0aa7a6b0b416c86f21c50b1c0735e73f6788b0720c48b` | `948376` | `9e3a0e67abe9b5da79b0aa7a6b0b416c86f21c50b1c0735e73f6788b0720c48b` | OK |
| `data/retrofi_patch_profiles_21_30.json` | `1056101` | `95f651c6b5c22424856f8945d5043639cf61f867fc57b92370e5023a452a019f` | `1056101` | `95f651c6b5c22424856f8945d5043639cf61f867fc57b92370e5023a452a019f` | OK |
| `data/retrofi_patch_profiles_31_40.json` | `1057645` | `6b04c6f8839377a0d46bcd65abae13061d07e038f0b4ef603cda09b487a36116` | `1057645` | `6b04c6f8839377a0d46bcd65abae13061d07e038f0b4ef603cda09b487a36116` | OK |
| `data/retrofi_patch_profiles_41_50.json` | `1028995` | `b4cfe763b3b81c8e85ceb2f5fbe11828e871e40f52032aef498f056f6909802a` | `1028995` | `b4cfe763b3b81c8e85ceb2f5fbe11828e871e40f52032aef498f056f6909802a` | OK |
| `data/retrofi_patch_profiles_all_50.json` | `4933434` | `3bf18ef738b5fd765de0eb1690d129bafd65f5eb704ea50afbc2557ac7fd2e0e` | `4933434` | `3bf18ef738b5fd765de0eb1690d129bafd65f5eb704ea50afbc2557ac7fd2e0e` | OK |

## Checks

- `aws sts get-caller-identity` with `AWS_PROFILE=retrofi-prod` and `AWS_REGION=us-east-1`.
- `aws s3api list-object-versions` for the production fixture prefix.
- `aws s3api get-object` for all 8 manifest objects using the latest version IDs.
- `node scripts/select-ci-checks.mjs --format lines origin/main HEAD` returned `none`.
- Local manifest JSON validation against the production checksum and size values.

## Notes

The manifest now points at `gbs-retrofi-test-fixtures-059310317821-us-east-1`.

The validated Site EUI fixture is `public/sample_matching_test_cases.json`.

No deploy was performed.
