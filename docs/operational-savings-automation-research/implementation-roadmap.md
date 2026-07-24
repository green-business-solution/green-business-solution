# Implementation roadmap

Implementation is grouped by shared source family rather than Information Card number.
The sequence optimizes reusable ingestion, exact-value resolution, California launch value, and validation leverage.

## 1. Exact public product and tabular methods

Standards: STD-ENERGY-STAR-PRODUCT-DATA, STD-FUELECONOMY-VEHICLES, STD-FEMP-EXTERIOR-LIGHTING, STD-DISHWASHER-WATER-HEATING.
Categories touched: ITC-02, ITC-06, ITC-07, ITC-10, ITC-13, ITC-27, ITC-28, ITC-29, ITC-50, ITC-52, ITC-53.
Estimated effort: 190-330 hours.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: Unknown installed-equipment baselines and cross-family field assumptions; Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels; Existing fixture wattage inferred from FEMP proposed-efficiency requirements; Treating all machine water as hot water without the building and booster boundary or converting flight gallons per hour to racks.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: All four scheduled ingestions or compact artifacts pass exact-record, unit, checksum, schema-drift, and offline golden tests.

## 2. Operator-seeded certifications and fixtures

Standards: STD-DOE-CCMS-RATINGS, STD-WATERSENSE-FIXTURES.
Categories touched: ITC-03, ITC-06, ITC-07, ITC-10, ITC-13, ITC-32, ITC-33, ITC-50, ITC-52, ITC-53.
Estimated effort: 170-290 hours.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: Unknown existing equipment, historical status without retained exports, and requirement-based baselines inferred from current certified products; Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: Two independent official exports import without manual data editing and reproduce exact active-product lookups.

## 3. California tariffs

Standards: STD-INTERVAL-TARIFF.
Categories touched: ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31.
Estimated effort: 280-460 hours.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: Raw historical URDB records treated as current, missing ratchets or non-bypassable charges, and tariff selection based only on geography.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: At least one current SMB tariff for each launch utility reconciles to test bills and includes energy, demand, fixed, minimum, export, ratchet, and non-bypassable treatment.

## 4. Building stock and ECM screens

Standards: STD-COMSTOCK-ANNUAL-DELTA, STD-SCOUT-ECM-SCREEN.
Categories touched: ITC-01, ITC-05, ITC-11, ITC-14.
Estimated effort: 180-290 hours.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: Project-specific equipment performance, combined upgrade arithmetic, and any percentile without retained population size and weights; Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: Approved one-to-one crosswalks and retained eligible populations reproduce weighted results from pinned releases.

## 5. Local renewable models

Standards: STD-SAM-SOLAR-THERMAL, STD-PVWATTS-V8, STD-WIND-SAM.
Categories touched: ITC-08, ITC-17, ITC-19, ITC-24, ITC-26.
Estimated effort: 310-520 hours.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: Automatic system sizing, missing draw profiles, and pool-specific or otherwise incompatible thermal systems; System sizing, tariff value, missing geometry, and assumed losses presented as source outputs; Turbine selection, hub-height inference, and generic statewide wind production.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: Pinned local model outputs match official or upstream regression oracles within approved tolerances with network disabled.

## 6. Industrial engineering models

Standards: STD-DOE-MEASUR, STD-EPA-CHP-PERFORMANCE.
Categories touched: ITC-04, ITC-09, ITC-12, ITC-20, ITC-21, ITC-22, ITC-26, ITC-36, ITC-37, ITC-38, ITC-39, ITC-40, ITC-41, ITC-42, ITC-43, ITC-44, ITC-45, ITC-46, ITC-47, ITC-51.
Estimated effort: 310-510 hours.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: Generic MEASUR calls, inferred equipment design inputs, or reuse of one module's output contract for another module; Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: Each category names one exact module or catalog class and passes both upstream and RetroFi category fixtures.

## 7. Dispatch optimization

Standards: STD-REOPT-LOCAL-DISPATCH.
Categories touched: ITC-16, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31.
Estimated effort: 220-360 hours.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: Incomplete tariff screens represented as detailed optimization and inferred charging or storage constraints.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: Local solver results are reproducible, tariff-complete, bounded in runtime, and accepted for every enabled dispatch category.

## 8. Water, schedules, and remaining context

Standards: STD-WATERSENSE-LANDSCAPE, STD-WATERSENSE-CI-OPERATIONS, STD-OPERATING-SCHEDULE, STD-CONTEXT-BENCHMARKS.
Categories touched: ITC-02, ITC-08, ITC-09, ITC-12, ITC-16, ITC-20, ITC-23, ITC-27, ITC-28, ITC-30, ITC-32, ITC-33, ITC-34, ITC-35, ITC-36, ITC-37, ITC-38, ITC-39, ITC-40, ITC-41, ITC-42, ITC-43, ITC-47, ITC-48, ITC-49, ITC-51, ITC-52, ITC-54.
Estimated effort: 490-820 hours.
External source fees: $0 for the selected routes.
Prerequisites: source license review, immutable raw storage, shared release registry, unit registry, and typed adapter envelope.
Primary risk: Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs; Default leak rates, default duration, and automatic savings from a checklist item alone; A generic building-type schedule presented as actual operation and daylight without coordinates or event definition; A universal fallback, a cross-category median, or any context process without a pinned population and exact selection rule.
Required fixtures: one source schema fixture per source family, one exact-path fixture per process shape, and category golden fixtures for every enabled calculation path.
Acceptance and deployment criterion: Every enabled benchmark has a pinned population and every measured method rejects missing evidence.


## California SMB launch sequence

Start with exact ENERGY STAR products, FuelEconomy records, FEMP lighting tables, and the dishwasher water-heating method because their artifacts are small, official, and already inspectable.
Build the California tariff publication system next because PV, storage, charging, demand response, and dispatch categories cannot produce defensible bill value without it.
Add CCMS and WaterSense operator exports after the shared product schema exists.
Then add ComStock and Scout screening, followed by PVWatts and the other local models.
Defer broad context fallbacks until each category has a source-specific population and golden fixture.

No full category should be called production-ready merely because one of its Standard processes is easy.
The first customer-visible path should be an exact-input path with explicit schedule or activity, not a generic benchmark path.
