# Cost and feasibility

These are planning estimates for the complete source-family program.
They include source acquisition, normalization, adapters, tests, refresh controls, and provenance, but exclude the unchanged production calculation engine.

| Standard | Verdict | Engineering hours | Raw GB | Published GB | External monthly | 100 calculations | 1,000 calculations | 10,000 calculations | Refresh effort | Maintenance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| STD-COMSTOCK-ANNUAL-DELTA | FEASIBLE_AFTER_ADAPTER_WORK | 100-160 | 60 | 3 | $0 | $2.50 | $3 | $6 | 12-24 per release | Medium |
| STD-SCOUT-ECM-SCREEN | FEASIBLE_AFTER_ADAPTER_WORK | 80-130 | 3 | 0.1 | $0 | $0.15 | $0.20 | $0.50 | 8-16 per release | Medium |
| STD-DOE-CCMS-RATINGS | FEASIBLE_AFTER_MANUAL_SEED | 100-170 | 2 | 1 | $0 | $0.20 | $0.30 | $0.80 | 6-12 monthly plus operator time | High |
| STD-ENERGY-STAR-PRODUCT-DATA | FEASIBLE_NOW | 80-140 | 2 | 1 | $0 | $0.15 | $0.25 | $0.80 | 2-4 weekly | Medium |
| STD-DOE-MEASUR | FEASIBLE_AFTER_ADAPTER_WORK | 220-360 | 1 | 0.5 | $0 | $0.20 | $0.60 | $3 | 16-32 per release | High |
| STD-SAM-SOLAR-THERMAL | FEASIBLE_AFTER_ADAPTER_WORK | 100-170 | 15 | 2 | $0 | $0.80 | $1.20 | $4 | 12-24 per model release | Medium |
| STD-PVWATTS-V8 | FEASIBLE_AFTER_ADAPTER_WORK | 80-130 | 25 | 3 | $0 | $1 | $1.50 | $5 | 8-16 per model or weather release | Medium |
| STD-WIND-SAM | FEASIBLE_AFTER_ADAPTER_WORK | 130-220 | 80 | 8 | $0 | $2.50 | $4 | $10 | 16-32 per resource or model release | High |
| STD-INTERVAL-TARIFF | FEASIBLE_AFTER_ADAPTER_WORK | 280-460 | 4 | 2 | $0 | $0.50 | $1 | $4 | 20-40 monthly including approval | High |
| STD-REOPT-LOCAL-DISPATCH | FEASIBLE_AFTER_ADAPTER_WORK | 220-360 | 3 | 1 | $0 | $1 | $6 | $45 | 20-40 per release | High |
| STD-EPA-CHP-PERFORMANCE | FEASIBLE_AFTER_ADAPTER_WORK | 90-150 | 0.2 | 0.02 | $0 | $0.05 | $0.10 | $0.40 | 8-16 per catalog update | Medium |
| STD-FUELECONOMY-VEHICLES | FEASIBLE_NOW | 40-70 | 0.1 | 0.1 | $0 | $0.03 | $0.05 | $0.20 | 1-2 monthly | Low |
| STD-WATERSENSE-FIXTURES | FEASIBLE_AFTER_MANUAL_SEED | 70-120 | 0.5 | 0.3 | $0 | $0.08 | $0.12 | $0.40 | 3-6 monthly plus operator time | Medium |
| STD-WATERSENSE-LANDSCAPE | FEASIBLE_AFTER_ADAPTER_WORK | 100-170 | 0.1 | 0.03 | $0 | $0.04 | $0.08 | $0.30 | 6-12 per workbook update | Medium |
| STD-WATERSENSE-CI-OPERATIONS | PARTIALLY_FEASIBLE | 90-150 | 0.1 | 0.02 | $0 | $0.03 | $0.05 | $0.20 | 4-8 per guidance update | Low |
| STD-FEMP-EXTERIOR-LIGHTING | FEASIBLE_NOW | 30-50 | 0.01 | 0.001 | $0 | $0.01 | $0.02 | $0.08 | 2-4 per update | Low |
| STD-OPERATING-SCHEDULE | FEASIBLE_AFTER_ADAPTER_WORK | 60-100 | 0.2 | 0.05 | $0 | $0.04 | $0.08 | $0.30 | 4-8 annually | Medium |
| STD-DISHWASHER-WATER-HEATING | FEASIBLE_NOW | 40-70 | 0.01 | 0.001 | $0 | $0.01 | $0.02 | $0.08 | 4-8 per calculator release | Low |
| STD-CONTEXT-BENCHMARKS | PARTIALLY_FEASIBLE | 240-400 | 5 | 0.5 | $0 | $0.25 | $0.50 | $2 | 24-48 quarterly across sources | High |

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
| FEASIBLE_NOW | 4 |
| FEASIBLE_AFTER_MANUAL_SEED | 2 |
| FEASIBLE_AFTER_ADAPTER_WORK | 11 |
| PARTIALLY_FEASIBLE | 2 |
| NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES | 0 |

The dominant cost is engineering and source maintenance, not usage-based external fees.
REopt optimization and large weather or building-stock snapshots are the main variable compute and storage components.
Manual seed does not mean paid source access, but it does create recurring operator cost.
