# Cost and feasibility

These are planning estimates for the complete source-family program.
They include source acquisition, normalization, adapters, tests, refresh controls, and provenance, but exclude the unchanged production calculation engine.

| Standard | Verdict | Bound processes | End-to-end real | Source verified | Evidence basis | Engineering hours | Raw GB | Published GB | External monthly | 100 calculations | 1,000 calculations | 10,000 calculations | Refresh effort | Maintenance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| STD-COMSTOCK-ANNUAL-DELTA | FEASIBLE_NOW | 1 | 1 | 1 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 100-160 | 60 | 3 | $0 | $2.50 | $3 | $6 | 12-24 per release | Medium |
| STD-SCOUT-ECM-SCREEN | PARTIALLY_FEASIBLE | 3 | 1 | 1 | At least one bound process is proved end to end, but the complete Standard process set is not. | 80-130 | 3 | 0.1 | $0 | $0.15 | $0.20 | $0.50 | 8-16 per release | Medium |
| STD-DOE-CCMS-RATINGS | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | 24 | 0 | 0 | No genuine official export reaches the complete source-to-Standard gate set, so an access probe or planned operator workflow is not counted as a manual seed. | 100-170 | 2 | 1 | $0 | $0.20 | $0.30 | $0.80 | 6-12 monthly plus operator time | High |
| STD-ENERGY-STAR-PRODUCT-DATA | FEASIBLE_AFTER_ADAPTER_WORK | 25 | 0 | 2 | Real source evidence reaches a source-specific parser or Standard output, but no bound process is proved end to end. | 80-140 | 2 | 1 | $0 | $0.15 | $0.25 | $0.80 | 2-4 weekly | Medium |
| STD-DOE-MEASUR | PARTIALLY_FEASIBLE | 17 | 5 | 5 | At least one bound process is proved end to end, but the complete Standard process set is not. | 220-360 | 1 | 0.5 | $0 | $0.20 | $0.60 | $3 | 16-32 per release | High |
| STD-SAM-SOLAR-THERMAL | FEASIBLE_NOW | 1 | 1 | 1 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 100-170 | 15 | 2 | $0 | $0.80 | $1.20 | $4 | 12-24 per model release | Medium |
| STD-PVWATTS-V8 | FEASIBLE_NOW | 3 | 3 | 3 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 80-130 | 25 | 3 | $0 | $1 | $1.50 | $5 | 8-16 per model or weather release | Medium |
| STD-WIND-SAM | FEASIBLE_NOW | 2 | 2 | 2 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 130-220 | 80 | 8 | $0 | $2.50 | $4 | $10 | 16-32 per resource or model release | High |
| STD-INTERVAL-TARIFF | FEASIBLE_NOW | 10 | 10 | 10 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 280-460 | 4 | 2 | $0 | $0.50 | $1 | $4 | 20-40 monthly including approval | High |
| STD-REOPT-LOCAL-DISPATCH | PARTIALLY_FEASIBLE | 8 | 2 | 2 | At least one bound process is proved end to end, but the complete Standard process set is not. | 220-360 | 3 | 1 | $0 | $1 | $6 | $45 | 20-40 per release | High |
| STD-EPA-CHP-PERFORMANCE | FEASIBLE_NOW | 4 | 4 | 4 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 90-150 | 0.2 | 0.02 | $0 | $0.05 | $0.10 | $0.40 | 8-16 per catalog update | Medium |
| STD-FUELECONOMY-VEHICLES | FEASIBLE_NOW | 2 | 2 | 2 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 40-70 | 0.1 | 0.1 | $0 | $0.03 | $0.05 | $0.20 | 1-2 monthly | Low |
| STD-WATERSENSE-FIXTURES | NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | 4 | 0 | 0 | No genuine official export reaches the complete source-to-Standard gate set, so an access probe or planned operator workflow is not counted as a manual seed. | 70-120 | 0.5 | 0.3 | $0 | $0.08 | $0.12 | $0.40 | 3-6 monthly plus operator time | Medium |
| STD-WATERSENSE-LANDSCAPE | FEASIBLE_NOW | 1 | 1 | 1 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 100-170 | 0.1 | 0.03 | $0 | $0.04 | $0.08 | $0.30 | 6-12 per workbook update | Medium |
| STD-WATERSENSE-CI-OPERATIONS | PARTIALLY_FEASIBLE | 2 | 1 | 1 | At least one bound process is proved end to end, but the complete Standard process set is not. | 90-150 | 0.1 | 0.02 | $0 | $0.03 | $0.05 | $0.20 | 4-8 per guidance update | Low |
| STD-FEMP-EXTERIOR-LIGHTING | PARTIALLY_FEASIBLE | 3 | 2 | 2 | At least one bound process is proved end to end, but the complete Standard process set is not. | 30-50 | 0.01 | 0.001 | $0 | $0.01 | $0.02 | $0.08 | 2-4 per update | Low |
| STD-OPERATING-SCHEDULE | PARTIALLY_FEASIBLE | 15 | 1 | 2 | At least one bound process is proved end to end, but the complete Standard process set is not. | 60-100 | 0.2 | 0.05 | $0 | $0.04 | $0.08 | $0.30 | 4-8 annually | Medium |
| STD-DISHWASHER-WATER-HEATING | FEASIBLE_NOW | 1 | 1 | 1 | Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests. | 40-70 | 0.01 | 0.001 | $0 | $0.01 | $0.02 | $0.08 | 4-8 per calculator release | Low |
| STD-CONTEXT-BENCHMARKS | PARTIALLY_FEASIBLE | 20 | 6 | 7 | At least one bound process is proved end to end, but the complete Standard process set is not. | 240-400 | 5 | 0.5 | $0 | $0.25 | $0.50 | $2 | 24-48 quarterly across sources | High |

## Portfolio estimate

One-time engineering effort is approximately 2,150 to 3,580 hours.
Raw source storage is approximately 201.2 GB before retention multipliers.
Published query and model storage is approximately 22.6 GB.
Direct external-source fees are estimated at $0 per month for the selected public routes.
Internal source-specific storage and compute are approximately $9.54 at 100 calculations per month, $19.07 at 1,000, and $83.06 at 10,000.
Shared database, object storage, backups, observability, and staff review are additional.

## Verdict counts

| Verdict | Count |
| --- | --- |
| FEASIBLE_NOW | 9 |
| FEASIBLE_AFTER_MANUAL_SEED | 0 |
| FEASIBLE_AFTER_ADAPTER_WORK | 1 |
| PARTIALLY_FEASIBLE | 7 |
| NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | 2 |

The dominant cost is engineering and source maintenance, not usage-based external fees.
REopt optimization and large weather or building-stock snapshots are the main variable compute and storage components.
Manual seed does not mean paid source access, but it does create recurring operator cost.
