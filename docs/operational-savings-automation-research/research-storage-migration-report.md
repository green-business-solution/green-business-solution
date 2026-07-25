# Operational savings research storage migration

Generated from repository commit `1d6fc1aa4b0c2dd7b26b423b857ecc9cd2c0159a` on 2026-07-24.

This report plans the migration and does not prove that any remote object or container exists.

No AWS call, upload, local deletion, deployment, or production-resource change was performed by inventory generation.

## Destination status

The authorized research S3 destination is `retrofi-operational-savings-research-945129430686-us-east-1` in account `945129430686` and region `us-east-1`.

The only accepted CLI profile is `retrofi-operational-savings-research`, and execution must resolve to the dedicated `RetroFiOperationalSavingsResearchRole` assumed role.

Remote verification remains pending: This local inventory did not call AWS. The first execution must verify the dedicated profile, exact assumed-role ARN, bucket location, versioning, Block Public Access, object ownership, default encryption, HTTPS-only policy, lifecycle retention, object encryption, and checksum behavior before any package can become cleanup-eligible.

The planned IAM role is `RetroFiOperationalSavingsResearchRole`.

Raw artifacts, probes, license payloads, and source archives use `raw/<source>/<release>/<sha256>/<filename>`.

Normalized databases and outputs use `normalized/<source>/<release>/<adapter-version>/<filename>`.

The other authorized top-level namespaces are `model-assets/`, `manual-exports/`, `model-inputs/`, `model-outputs/`, `database-exports/`, `manifests/`, `licenses/`, and `temporary/`, but no current cache package requires them.

The ECR repository names are `retrofi-research-reopt`, `retrofi-research-ssc`, `retrofi-research-measur`, `retrofi-research-scout`.

No runnable research container is currently built.

No ECR image digest, tag, URI, push verification, or deletion eligibility is claimed.

## Inventory summary

| Measure | Count or size |
| --- | --- |
| Logical migration packages | 41 |
| Standalone files and databases | 37 |
| Pinned repository packages | 4 |
| Exact-allowlisted packages outside the cache | 1 |
| Discovered cache files | 4745 |
| Exact logical cache size | 3523411601 bytes (3.28 GiB) |
| Proof-critical nested files | 24 |
| Compiled binaries | 7 |
| Proof-required compiled binaries | 1 |
| Model fixtures and resource files | 10 |
| Source archives still needed | 4 |
| Normalized database and output fixtures | 3 |
| Packages needing license metadata review | 18 |
| Packages needing ingestion metadata review | 18 |

The manifest covers every discovered cache file through either one exact-file package, one recursive repository package, or an explicit operational control-file exclusion.

The uncovered path list is empty.

Outside `.cache`, migration discovery is exact-allowlist-only.

The only current outside-cache package is `docs/operational-savings-automation-research/fixtures/research-database.compact.json`; tracked product data, adapters, tests, migrations, documentation, proof ledgers, and temporary rendering files are explicitly excluded from inference-based migration.

## Pinned repository packages

| Repository | Physical files | Physical size | Commit | Git tree | Archive status |
| --- | --- | --- | --- | --- | --- |
| scripts/research/operational-savings/.cache/repos/amo-tools-suite | 529 | 16663266 bytes (15.89 MiB) | bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b | 8c9c6c3f81ea8f938642ff52d54dcafeeba42914 | SOURCE_ARCHIVE_REQUIRED |
| scripts/research/operational-savings/.cache/repos/reopt | 1372 | 715535052 bytes (682.39 MiB) | f952cabdf3e60f6e88eef80bb7bc9e7e24bac643 | e807b62ab249fca7b59ac6ab7bb71725f504cc5f | SOURCE_ARCHIVE_REQUIRED |
| scripts/research/operational-savings/.cache/repos/scout | 768 | 910073817 bytes (867.91 MiB) | 72bcf419eb1cb37379f163563344b0ec61507fd3 | 569d2f41ce883cb475f8f1cb8009f5f14ba76ee6 | SOURCE_ARCHIVE_REQUIRED |
| scripts/research/operational-savings/.cache/repos/ssc | 2039 | 1777112227 bytes (1.66 GiB) | ba7a7968a115baa0c250597ce2381c7ffb27fbf2 | 96139bdb4b541e7198cec6dec9793e062e2f3330 | SOURCE_ARCHIVE_REQUIRED |

Each repository parent entry covers every file under the clone, including local Git metadata for footprint accounting.

The planned source archives contain the exact pinned Git tree and intentionally omit `.git` metadata.

For a repository archive, the canonical key's SHA-256 segment is the deterministic Git index-listing digest shown in the manifest, while the materialized tar file receives a separate exact object-byte SHA-256 before upload.

Archive upload and repository cleanup are blocked until each archive is materialized, checksummed, sized, reviewed, uploaded without overwrite, and verified remotely.

## Standalone migration packages

| Type | Path | Size | SHA-256 | Planned immutable key |
| --- | --- | --- | --- | --- |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/comstock-ca-g0600750-upgrade0.parquet | 16866929 bytes | df4d4e40099a4c73f128fcc621cfc5b7facc6eb621e13eddf21a43bc87afdc40 | raw/oedi-comstock/2025-comstock-release-3/df4d4e40099a4c73f128fcc621cfc5b7facc6eb621e13eddf21a43bc87afdc40/comstock-ca-g0600750-upgrade0.parquet |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/comstock-ca-g0600750-upgrade43.parquet | 19572532 bytes | 1c658e2a59a83f24f55fab04187cd0cde6546c6bf5e43dc8beb456479403dbde | raw/oedi-comstock/2025-comstock-release-3/1c658e2a59a83f24f55fab04187cd0cde6546c6bf5e43dc8beb456479403dbde/comstock-ca-g0600750-upgrade43.parquet |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/comstock-data-dictionary.tsv | 250000 bytes | 11c03e4794ed12c5d8fc81c1253d97c033f217c79cc217e00110052b2d23ea4b | raw/oedi-comstock/2025-comstock-release-3/11c03e4794ed12c5d8fc81c1253d97c033f217c79cc217e00110052b2d23ea4b/comstock-data-dictionary.tsv |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/comstock-enumeration-dictionary.tsv | 30953 bytes | 0d721355dc3f1cee2f42e6db750c0de2daef1773404bab3125d1bda1960e007e | raw/oedi-comstock/2025-comstock-release-3/0d721355dc3f1cee2f42e6db750c0de2daef1773404bab3125d1bda1960e007e/comstock-enumeration-dictionary.tsv |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/comstock-measure-name-crosswalk.csv | 20900 bytes | cf87e5905df7291b4d2bbbd9491ad3f0cde55b3e5e43298308c429c9454b4462 | raw/oedi-comstock/2025-comstock-release-3/cf87e5905df7291b4d2bbbd9491ad3f0cde55b3e5e43298308c429c9454b4462/comstock-measure-name-crosswalk.csv |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/comstock-upgrades.json | 3752 bytes | c3ba607e650d3b78cd86f08ef3cd6e632b7e622797a970cd8f16812e41a1ce5a | raw/oedi-comstock/2025-comstock-release-3/c3ba607e650d3b78cd86f08ef3cd6e632b7e622797a970cd8f16812e41a1ce5a/comstock-upgrades.json |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/energy-star-cfs-calculator.xlsx | 403484 bytes | 3d2abed1938bd1400378a2e0ca2095058fe490b2b599ef15f09056639f06fcd6 | raw/energy-star/workbook-published-march-2024/3d2abed1938bd1400378a2e0ca2095058fe490b2b599ef15f09056639f06fcd6/energy-star-cfs-calculator.xlsx |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/energy-star-dishwashers.json | 3772 bytes | 3a48590aea34a8b63696488c052cb31cb059502356a2dc51a68122528fb28ae5 | raw/energy-star/five-row-api-response-acquired-2026-07-23/3a48590aea34a8b63696488c052cb31cb059502356a2dc51a68122528fb28ae5/energy-star-dishwashers.json |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/epa-chp-catalog.pdf | 4135792 bytes | eccea396f5bcc5c86c16a75b8d41b1a4a7b43df064b7363ee7054d53063f0d09 | raw/epa/september-2017/eccea396f5bcc5c86c16a75b8d41b1a4a7b43df064b7363ee7054d53063f0d09/epa-chp-catalog.pdf |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/femp-exterior-lighting.html | 148626 bytes | cb50171c667e44e0c8fe1681fac57fcfe22d6adffe6ba1229bd9d103b8fc547a | raw/doe/page-snapshot-acquired-2026-07-23-guidance-updated-june-2023/cb50171c667e44e0c8fe1681fac57fcfe22d6adffe6ba1229bd9d103b8fc547a/femp-exterior-lighting.html |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/openei-rate.json | 131 bytes | d6d2c58ce65723a4db64e3e8683f8c3786eaefc147ddfda41a1327ba44f28035 | raw/unclassified/unversioned/d6d2c58ce65723a4db64e3e8683f8c3786eaefc147ddfda41a1327ba44f28035/openei-rate.json |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/pvwatts-v8-response.json | 1680 bytes | 88e37dd4aa5fb6ac1a633989f8f5eb6015691e08ae326d4ad61d60fb83ff671b | raw/unclassified/unversioned/88e37dd4aa5fb6ac1a633989f8f5eb6015691e08ae326d4ad61d60fb83ff671b/pvwatts-v8-response.json |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/sdge-sdcp-joint-rate-comparison-2026-06-01.pdf | 543670 bytes | bfde9c41b8daed07eeb293a1e5ac6348f2a290ae1de022b34a7c5055a858e89e | raw/sdge/sdg-e-rates-effective-2026-06-01/bfde9c41b8daed07eeb293a1e5ac6348f2a290ae1de022b34a7c5055a858e89e/sdge-sdcp-joint-rate-comparison-2026-06-01.pdf |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/sdge-sdcp-joint-rate-comparison-2026-06-01.txt | 72964 bytes | aca4e13f320b6df529bef9cef916aaf751200f8e86b4bfbdc65be7218a346004 | raw/unclassified/unversioned/aca4e13f320b6df529bef9cef916aaf751200f8e86b4bfbdc65be7218a346004/sdge-sdcp-joint-rate-comparison-2026-06-01.txt |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/sdge-small-commercial-rates-2026-06-01.pdf | 403420 bytes | 1d2474baa2c253e803c5966fa30a8c58f8ee88e0d338a006df3c8f47a49c0cf9 | raw/sdge/effective-2026-06-01/1d2474baa2c253e803c5966fa30a8c58f8ee88e0d338a006df3c8f47a49c0cf9/sdge-small-commercial-rates-2026-06-01.pdf |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/usno-rise-set.html | 27057 bytes | 178f7024fdbce65bf3c3ee80f758ec3429e0115dff4d538cf54c59a978f58281 | raw/unclassified/unversioned/178f7024fdbce65bf3c3ee80f758ec3429e0115dff4d538cf54c59a978f58281/usno-rise-set.html |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/usno-sf-2026-06-21.json | 1271 bytes | e096159b03d9fe91f287898142a567809a83d794f6c8aaad6b8809bb2378f812 | raw/usno/usno-api-4.0.1-response-acquired-2026-07-24/e096159b03d9fe91f287898142a567809a83d794f6c8aaad6b8809bb2378f812/usno-sf-2026-06-21.json |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/usurdb.csv.gz | 12218163 bytes | 89081ef124080ea322516040dc6b2c1945f9f754eced63f3130d4a8f14947032 | raw/openei/bulk-snapshot-acquired-2026-07-23/89081ef124080ea322516040dc6b2c1945f9f754eced63f3130d4a8f14947032/usurdb.csv.gz |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/vehicles.csv.zip | 2185627 bytes | 83ee4bf48e65e8e962e55952e0bfbdc6ab94d4bf63f42e2d38aa39143d6f1ecc | raw/fueleconomy/bulk-snapshot-acquired-2026-07-23/83ee4bf48e65e8e962e55952e0bfbdc6ab94d4bf63f42e2d38aa39143d6f1ecc/vehicles.csv.zip |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/watersense-calculator.xls | 39424 bytes | 202444f3d87a693467c140c8ed9fcb440b90812d715c86f2f3164adf800195d1 | raw/unclassified/unversioned/202444f3d87a693467c140c8ed9fcb440b90812d715c86f2f3164adf800195d1/watersense-calculator.xls |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/watersense-ci-worksheets.xlsx | 89786 bytes | f69facc89beb2073fdaba88206d20e32151b2f30c53a7f21f7981eeab8c0ab52 | raw/unclassified/unversioned/f69facc89beb2073fdaba88206d20e32151b2f30c53a7f21f7981eeab8c0ab52/watersense-ci-worksheets.xlsx |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/watersense-climate.xlsx | 10078683 bytes | 77afb36cff3dcb77eacad4db34a8dba44bd48eb24485c886958afd58e1846273 | raw/unclassified/unversioned/77afb36cff3dcb77eacad4db34a8dba44bd48eb24485c886958afd58e1846273/watersense-climate.xlsx |
| SOURCE_ARTIFACT | scripts/research/operational-savings/.cache/artifacts/watersense-partner-calculator.xlsx | 560097 bytes | 996670ce12a177189d5c7ed0847a90e91e1084680587c350bef3563687caa075 | raw/unclassified/unversioned/996670ce12a177189d5c7ed0847a90e91e1084680587c350bef3563687caa075/watersense-partner-calculator.xlsx |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/ccms.headers | 118 bytes | 126e0d5e2cb4449613f1a274a714076f122f81fd738c0137934803e34f3b6b9a | raw/doe-ccms/unauthenticated-access-probe-retained-2026-07-23/126e0d5e2cb4449613f1a274a714076f122f81fd738c0137934803e34f3b6b9a/ccms.headers |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/ccms.html | 118 bytes | 58bf2215b395dcac74c009aa98701854e43cbe54a1cd3a95fee6a647ca9910d4 | raw/doe-ccms/unauthenticated-access-probe-retained-2026-07-23/58bf2215b395dcac74c009aa98701854e43cbe54a1cd3a95fee6a647ca9910d4/ccms.html |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/comstock.headers | 454 bytes | 8ed98ac54476d42345c108cf153b0b3dd9aca8cab21ff89015a62ced2f09de9d | raw/unclassified/unversioned/8ed98ac54476d42345c108cf153b0b3dd9aca8cab21ff89015a62ced2f09de9d/comstock.headers |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/energy-star.headers | 1916 bytes | e9c72691f41afebe564e2bab02f91f0f091757bb164c3dbd773b12c6720cc4d5 | raw/unclassified/unversioned/e9c72691f41afebe564e2bab02f91f0f091757bb164c3dbd773b12c6720cc4d5/energy-star.headers |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/fueleconomy.headers | 410 bytes | 2934596798661055bfb722161fe40fbf0f52157cfc1a3080fc00464295410ff2 | raw/unclassified/unversioned/2934596798661055bfb722161fe40fbf0f52157cfc1a3080fc00464295410ff2/fueleconomy.headers |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/openei.headers | 445 bytes | 506b4432267ba46e6a5735a700cb8e18903f67e686d95afca134b9ad304c4299 | raw/unclassified/unversioned/506b4432267ba46e6a5735a700cb8e18903f67e686d95afca134b9ad304c4299/openei.headers |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/pvwatts.headers | 967 bytes | 30accbd37cf077193a1ed33c12d919443fb3e14abb982bf4efd2c11d80502e05 | raw/unclassified/unversioned/30accbd37cf077193a1ed33c12d919443fb3e14abb982bf4efd2c11d80502e05/pvwatts.headers |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/watersense-common.js | 32988 bytes | 394a1d631f667a07576dc9928f96ee70516aa57870493f1c589049c1e9c42b44 | raw/unclassified/unversioned/394a1d631f667a07576dc9928f96ee70516aa57870493f1c589049c1e9c42b44/watersense-common.js |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/watersense-product.headers | 787 bytes | 74e2dfab384a505c92892a7df61ea7bcc88c4e0ab591d4e217a75d3b08ac75c8 | raw/unclassified/unversioned/74e2dfab384a505c92892a7df61ea7bcc88c4e0ab591d4e217a75d3b08ac75c8/watersense-product.headers |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/watersense-product.html | 55399 bytes | 25b7f23f3a094c0eb81bc52510977672da547984709ec85be55c64c20db72ce4 | raw/epa/product-search-page-acquired-2026-07-23/25b7f23f3a094c0eb81bc52510977672da547984709ec85be55c64c20db72ce4/watersense-product.html |
| ACCESS_PROBE | scripts/research/operational-savings/.cache/probes/watersense-products.headers | 734 bytes | 24f2c0cf8059e9d146edd4bef883db7d10eaa2e1299b350e3c4f82db75f6b7da | raw/unclassified/unversioned/24f2c0cf8059e9d146edd4bef883db7d10eaa2e1299b350e3c4f82db75f6b7da/watersense-products.headers |
| NORMALIZED_DATABASE | scripts/research/operational-savings/.cache/proof/test.sqlite | 417792 bytes | 0d764e29535495d76e59a0f0a1d2e611b5f8ef658ea277c521eb6898e928e570 | normalized/operational-savings-research/snapshot-2026-07-24-0d764e295354/proof-database-v1/test.sqlite |
| NORMALIZED_DATABASE | scripts/research/operational-savings/.cache/research-database.sqlite | 35856384 bytes | 4c3935c0fe834b0c090ad97843a603c3ccf714905bb110baa873e423abfc43ba | normalized/operational-savings-research/snapshot-2026-07-24-4c3935c0fe83/research-database-v1/research-database.sqlite |
| NORMALIZED_OUTPUT_FIXTURE | docs/operational-savings-automation-research/fixtures/research-database.compact.json | 393503 bytes | e819bd4f8796e72892fc90ac45397cd45adde97958d2cfdbec87828c3fca6e83 | normalized/operational-savings-research/snapshot-2026-07-24-e819bd4f8796/compact-database-v1/research-database.compact.json |

## Proof-required compiled binaries

| Path | Size | SHA-256 | Parent package |
| --- | --- | --- | --- |
| scripts/research/operational-savings/.cache/repos/reopt/src/sam/libssc.dylib | 37852576 bytes | db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f | git-repository:reopt |

All other discovered shared libraries remain covered by their repository parent package and are listed in the JSON manifest.

Proof-critical binaries are not planned as duplicate S3 objects.

## Official model fixtures and resources

| Kind | Path | Size | SHA-256 | Roles |
| --- | --- | --- | --- | --- |
| WEATHER_OR_RESOURCE_FILE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/pvsamv1_data/USA AZ Phoenix (TMY2).csv | 501341 bytes | 311b8871e989b40d0016f7019dcabc06ebf38e16509c51842fce4bf1e6f8c591 | solar weather |
| OFFICIAL_MODEL_FIXTURE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/pvwatts_cases.h | 3419 bytes | b806b704a8542aa22ab2ad9c06ece19dcd766eee75777b426039b73f23dfaa61 | fixture |
| OFFICIAL_MODEL_FIXTURE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/swh_common.h | 22073 bytes | 5bc2ecd5a6e241a4f653dfda60d5c02b502ec7700358392ad923e7207f5b119d | fixture |
| MODEL_RESOURCE_FILE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/swh_residential_data/custom_mains.csv | 164880 bytes | 0d7a553d3eeca206aa89e01ddc1e5b9225a217119c550c3184fd46273c9cd938 | hourly mains temperature |
| MODEL_RESOURCE_FILE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/swh_residential_data/custom_set.csv | 26280 bytes | cfc31bfa47a35034c9905e8a9f612396c9ae1840e849942bd20c9cd1ccc06b7f | hourly set temperature |
| WEATHER_OR_RESOURCE_FILE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/swh_residential_data/fargo_nd_46.9_-96.8_mts1_60_tmy.csv | 414632 bytes | 3228bdb487135d66debfd9a4fb215820ae236592e25c508e22e449139e098069 | solar weather |
| MODEL_RESOURCE_FILE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/swh_residential_data/load.csv | 170135 bytes | 56817eea7f8200e923f08841dd9706d3803e845a586353ceec44b5263d16ac0d | fixture |
| MODEL_RESOURCE_FILE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/swh_residential_data/scaled_draw.csv | 166423 bytes | 130b36ba452062931cc26c1b5ea1b6d23c9c12ced926dbb49dad12b16ae3f931 | hourly hot-water draw |
| OFFICIAL_MODEL_FIXTURE | scripts/research/operational-savings/.cache/repos/ssc/test/input_cases/windpower_cases.h | 5769 bytes | 99d80bffaa75def04d38cca4cb8f5e1e3befd043ce950513fb116d82cb479cf6 | fixture |
| WEATHER_OR_RESOURCE_FILE | scripts/research/operational-savings/.cache/repos/ssc/test/input_docs/wind.srw | 122828 bytes | 94ebc09260d80bcc6796d89407248c39d9599aa9a046d01533fb8083737314b2 | hourly wind resource |

These files remain children of their pinned repository archives.

## Source archive needs

| Package | Commit | Tree digest | Planned key | Status |
| --- | --- | --- | --- | --- |
| git-repository:amo-tools-suite | bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b | ebe75d23396cbc0480d4f13118536741a4f55d8cd0c97abb2a29ce467188cc25 | raw/ornl-amo-amo-tools-suite/git-bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b/ebe75d23396cbc0480d4f13118536741a4f55d8cd0c97abb2a29ce467188cc25/amo-tools-suite-bdc33b837d39e3b30d2ad802cde9f49ec5df1e6b.tar | NOT_MATERIALIZED |
| git-repository:reopt | f952cabdf3e60f6e88eef80bb7bc9e7e24bac643 | f44546112e043b267e5afdfe2e8927146b3ce7b028f03d4a4c2ce164ca9f4015 | raw/natlabrockies-reopt.jl/git-f952cabdf3e60f6e88eef80bb7bc9e7e24bac643/f44546112e043b267e5afdfe2e8927146b3ce7b028f03d4a4c2ce164ca9f4015/reopt-f952cabdf3e60f6e88eef80bb7bc9e7e24bac643.tar | NOT_MATERIALIZED |
| git-repository:scout | 72bcf419eb1cb37379f163563344b0ec61507fd3 | 58254672ca61977ed3acaa42976cda49f738b2bda227dea2e997962bf2ca5c80 | raw/trynthink-scout/git-72bcf419eb1cb37379f163563344b0ec61507fd3/58254672ca61977ed3acaa42976cda49f738b2bda227dea2e997962bf2ca5c80/scout-72bcf419eb1cb37379f163563344b0ec61507fd3.tar | NOT_MATERIALIZED |
| git-repository:ssc | ba7a7968a115baa0c250597ce2381c7ffb27fbf2 | a47684c2f96489142c8ec912aa3e968c4a2ccf1985356e0e303dbceae2fed7cf | raw/natlabrockies-ssc/git-ba7a7968a115baa0c250597ce2381c7ffb27fbf2/a47684c2f96489142c8ec912aa3e968c4a2ccf1985356e0e303dbceae2fed7cf/ssc-ba7a7968a115baa0c250597ce2381c7ffb27fbf2.tar | NOT_MATERIALIZED |

## Normalized databases and output fixtures

| Role | Path | Status | Size | SHA-256 | Git status |
| --- | --- | --- | --- | --- | --- |
| LOCAL_NORMALIZED_DATABASE | scripts/research/operational-savings/.cache/research-database.sqlite | PRESENT | 35856384 | 4c3935c0fe834b0c090ad97843a603c3ccf714905bb110baa873e423abfc43ba | UNTRACKED |
| LOCAL_PROOF_DATABASE_FIXTURE | scripts/research/operational-savings/.cache/proof/test.sqlite | PRESENT | 417792 | 0d764e29535495d76e59a0f0a1d2e611b5f8ef658ea277c521eb6898e928e570 | UNTRACKED |
| COMPACT_NORMALIZED_OUTPUT_FIXTURE | docs/operational-savings-automation-research/fixtures/research-database.compact.json | PRESENT | 393503 | e819bd4f8796e72892fc90ac45397cd45adde97958d2cfdbec87828c3fca6e83 | UNTRACKED |

## Upload, verification, and cleanup gates

The companion CLI is dry-run-only unless `--execute` is supplied.

Repository archives are prepared locally with `git archive`, an exclusive final-path link, exact size, and SHA-256 recording before they become upload-ready.

Execution requires an explicitly named research profile, the exact authorized research bucket, region, and one package identifier.

Known production, management, legacy, and generic profiles are rejected.

An existing object is never overwritten.

An existing object is accepted only when remote size, SHA-256 metadata, and the S3 checksum all match the manifest.

A new upload uses an S3 conditional write and is re-read with checksum mode enabled before it is considered verified.

Execution verifies the research account and assumed role, bucket location, versioning, all four Block Public Access controls, BucketOwnerEnforced ownership, AES256 default encryption, the HTTPS-only bucket policy, and lifecycle retention for every non-temporary prefix before object access.

Every uploaded object must independently report server-side encryption, a durable version ID, exact length, SHA-256 metadata, and the S3 SHA-256 checksum.

Verification restores each exact recorded S3 version into a mode-0600 temporary file, hashes the restored bytes, compares exact size and SHA-256, and removes only that temporary restore.

The batch workflow prepares all repository archives, uploads all packages, verifies all exact remote versions, and writes one manifest update per phase.

Final cleanup eligibility requires a clean committed manifest with every exact remote version and restored-byte proof, one successful recorded final tests/build command, explicit confirmation that no consumer is active, and an unchanged tracked repository tree digest excluding only the migration manifest.

Cleanup-all preflights every local package and exact-version remote restore before any deletion starts.

Repository cleanup additionally rechecks the exact commit, Git tree, deterministic index digest, and clean working tree before removing the clone and its staged archive.

The compact source-controlled database fixture is uploaded and verified but retained locally by policy.

The restore command hydrates a deleted exact file or extracts a pinned repository archive without overwrite, then invalidates cleanup eligibility until final validation is run again.

## Current blockers

- This local inventory did not call AWS. The first execution must verify the dedicated profile, exact assumed-role ARN, bucket location, versioning, Block Public Access, object ownership, default encryption, HTTPS-only policy, lifecycle retention, object encryption, and checksum behavior before any package can become cleanup-eligible.

- No runnable research container is currently built, so there is no image to push or verify.

- 18 package entries require license metadata review before publication.

- 18 package entries lack a proof-manifest ingestion reference.

- 4 pinned repositories still require deterministic source archives.

No local cache is deletion-eligible in this generated state.
