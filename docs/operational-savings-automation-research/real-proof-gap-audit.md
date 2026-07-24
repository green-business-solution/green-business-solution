# Real automation proof gap audit

This audit evaluates the evidence present at commit `75df7f7153e860475d3c20c07d09031a685c4b95`.
It deliberately separates source discovery from source-backed automation.
A generated report, URL response, source-code inspection, hardcoded record, or generic arithmetic function does not satisfy an end-to-end proof gate.

## Proof definitions used in this audit

- `REAL_SOURCE_END_TO_END` means a real official artifact or package was parsed or executed, normalized data was published, an actual Standard output was produced, an exact formula term was reached, and the same path passed offline.
- `REAL_SOURCE_PARTIAL` means a real artifact was acquired and at least one substantive source-specific step was completed, but the complete chain did not pass.
- `SOURCE_INSPECTION_ONLY` means a real artifact or repository was inspected, but no source-specific parser or model produced the declared output through the internal publication path.
- `SYNTHETIC_SAMPLE_ONLY` means the demonstration used only manually authored records or generic arithmetic.
- `ACCESS_BLOCKED` means the required official artifact was not lawfully available in the current environment.

## Starting evidence assessment

| Standard | Starting proof | Artifact actually acquired | Actual schema inspected | Parser or model actually executed | Internal data published | Declared output and formula term reached | Precise missing proof |
| --- | --- | --- | --- | --- | --- | --- | --- |
| STD-COMSTOCK-ANNUAL-DELTA | SOURCE_INSPECTION_ONLY | Release 3 `upgrades_lookup.json` | Upgrade lookup only, not the annual-result Parquet schema | No | No | No | Acquire bounded real baseline and upgrade Parquet data, join by building identifier, apply weights, publish a real segment statistic, and map it to `median_ComStock_delta_r_per_ft²`. |
| STD-SCOUT-ECM-SCREEN | SOURCE_INSPECTION_ONLY | Pinned Scout repository | ECM examples and repository schemas | No real Scout preparation or evaluation | No | No | Execute a shipped compatible commercial ECM through the pinned Scout path and publish its real structured result. |
| STD-DOE-CCMS-RATINGS | ACCESS_BLOCKED | HTTP 403 response only | No genuine product-family export schema | No | No | No | Obtain an authorized operator export, fingerprint its genuine headers, normalize its rows, and demonstrate exact lookup. |
| STD-ENERGY-STAR-PRODUCT-DATA | REAL_SOURCE_PARTIAL | Five live dishwasher records from Socrata | Dishwasher response fields | No general source-specific ingestion pipeline | No | A hardcoded copy reached sample outputs only | Implement real pagination or bulk acquisition, publish normalized rows, cover required product families, and map resolved fields to each exact category term. |
| STD-DOE-MEASUR | SOURCE_INSPECTION_ONLY | Pinned AMO Tools Suite repository | C++ declarations and upstream tests | No official calculator executable or library call | No | No | Build or install the pinned implementation and execute actual official module test cases used by the cards. |
| STD-SAM-SOLAR-THERMAL | SOURCE_INSPECTION_ONLY | Pinned SSC repository | Solar-water-heating module declarations and test inputs | No | No | No | Execute the real pinned module with real weather and official test inputs, then publish `SAM_output`. |
| STD-PVWATTS-V8 | REAL_SOURCE_PARTIAL | Hosted V8 response and pinned SSC repository | Hosted response and SSC module interface | Hosted API ran once, but no local model ran | No | A manual sum reached `PV_AC_kWh_t` only synthetically | Install pinned SSC or PySAM, retain permitted weather, execute locally, compare to the hosted regression case, and rerun offline. |
| STD-WIND-SAM | SOURCE_INSPECTION_ONLY | Pinned SSC repository | Wind module declarations | No | No | No | Acquire permitted wind resource data and a real turbine curve, execute the SSC wind module, and publish interval and annual generation. |
| STD-INTERVAL-TARIFF | REAL_SOURCE_PARTIAL | Full URDB CSV gzip | Header and one manually selected historical row | No full nested tariff parser or bill calculator | No | A date gate reached no tariff formula input | Stream the full artifact, normalize tariff structures and schedules, approve a current California SMB tariff, and reconcile a bill or official example. |
| STD-REOPT-LOCAL-DISPATCH | SOURCE_INSPECTION_ONLY | Pinned REopt.jl repository | Julia input and result declarations and shipped scenarios | No solver run | No | No | Install Julia and HiGHS, execute a shipped scenario, then execute a bounded RetroFi-shaped scenario using internal load and tariff inputs. |
| STD-EPA-CHP-PERFORMANCE | SOURCE_INSPECTION_ONLY | Official CHP catalog PDF | Method prose and table locations | No table extractor or table-backed resolver | No | A generic equation reached sample values only | Extract exact technology and size-class table rows, publish them, resolve a compatible row, and calculate from real table values. |
| STD-FUELECONOMY-VEHICLES | SOURCE_INSPECTION_ONLY | Full official `vehicles.csv.zip` | CSV header and selected fields | No full bulk parser or internal publisher | No | Hardcoded values reached `existing_combined_mpg` and `proposed_combE` only | Parse the full archive, publish real versioned vehicle rows, resolve compatible real records, and map exact fields to both formula terms. |
| STD-WATERSENSE-FIXTURES | ACCESS_BLOCKED | Public application page, but no genuine product export | No genuine export schema | No | No | No | Obtain an authorized full product-list export and test schema fingerprinting, normalization, exact lookup, and requirements filtering against genuine records. |
| STD-WATERSENSE-LANDSCAPE | SOURCE_INSPECTION_ONLY | Official climate workbook | Workbook-level inspection only | No bounded source-row extractor | No | A generic water-budget equation reached sample values only | Extract exact sheets, columns, types, ZIP and monthly climate fields, implement the Version 2.0 branch logic, and compare with an official example. |
| STD-WATERSENSE-CI-OPERATIONS | SOURCE_INSPECTION_ONLY | Official commercial assessment workbook | Sheet names and selected columns | No workbook-backed method adapter | No | Generic measured-input arithmetic only | Parse real sheets, publish supported method parameters, execute measured-input methods, and keep missing project measurements unavailable. |
| STD-FEMP-EXTERIOR-LIGHTING | SOURCE_INSPECTION_ONLY | Official FEMP HTML | Relevant table and wall-mounted example inspected | No HTML table parser or published local artifact | No | Generic lighting arithmetic only | Parse exact table rows and scope, publish the local table, and execute a table-backed applicable calculation. |
| STD-OPERATING-SCHEDULE | SOURCE_INSPECTION_ONLY | Official USNO definitions HTML | Definition prose only | No timezone, holiday, daylight-saving, or astronomy engine | No | Weekly arithmetic reached schedule terms only | Build a deterministic calendar and astronomy engine, compare to official values, and ingest an approved DOE reference schedule for benchmark use. |
| STD-DISHWASHER-WATER-HEATING | SOURCE_INSPECTION_ONLY | Official ENERGY STAR CFS workbook | Sheet names, selected cells, and formulas inspected | No workbook parser or workbook-equivalent branch execution | No | Generic heat-per-gallon arithmetic only | Parse exact workbook formulas and machine-type branches, publish parameters, and reproduce official workbook outputs. |
| STD-CONTEXT-BENCHMARKS | REAL_SOURCE_PARTIAL | Several retained official source fixtures already present in the repository | Some benchmark families have exact reviewed fields | Only narrow existing fixture validations | No shared real publication path | A subset of process terms has source evidence, but the generic prototype does not prove them | Split every distinct benchmark family into a source-specific subadapter and leave unsupported processes explicitly incomplete. |

## Starting verdict correction

No Standard at the starting commit satisfies the continuation definition of `FEASIBLE_NOW`.
The prior four `FEASIBLE_NOW` labels reflected source availability or synthetic contract execution, not real source-to-formula automation.
The two manual-seed labels also lack genuine exported datasets, so they do not yet satisfy `FEASIBLE_AFTER_MANUAL_SEED`.
Feasibility must be regenerated only from source-backed proof manifests after the implementation work in this continuation.
