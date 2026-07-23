# Information Card — Compressed Air Controls

**Retrofits included:** Compressed air controls

**Overview:** Improved compressor controls reduce input power across the annual load profile while preserving flow and pressure requirements.

**Broader Formula**

```text
Annual Operational Savings =
Annual Electricity Reduction × Bill-Derived Electricity Rate
```

**Expanded Formula**

```text
Annual Operational Savings = In-Scope Equipment Count × Sum Across Load Bins of Annual Hours in Each Load Bin × (Existing Input Power in Each Load Bin - Proposed Input Power in Each Load Bin) × Bill-Derived Electricity Rate

MEASUR resolves input kW from compressor type, control mode, pressure, and load fraction.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual compressed-air control electricity reduction
│  ├─ In-Scope Equipment Count (User)
│  ├─ Compressor type (User)
│  ├─ Documented Rated input power from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Documented Rated flow from Nameplate, Measurement, Audit, or Contractor Specification (Project Document)
│  ├─ Existing control mode (User)
│  ├─ Proposed control mode (Linked Opportunity)
│  ├─ Repeatable annual load profile
│  │  ├─ Documented Load fraction for each bin from Controls Trends or Engineering Audit (Project Document)
│  │  └─ Documented Annual hours for each bin from Controls Trends or Engineering Audit (Project Document)
│  └─ Standard 1.1 — Compressed Air Controls Engineering Calculation
└─ Applicable Resource Rates
   └─ Bill-Derived Electricity Rate
      ├─ Electricity Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Generation Charges (Bill)
      └─ Avoidable Electricity Rate (Derived)
```

**■ Standard 1.1 — Compressed Air Controls Engineering Calculation**

**Purpose:**
Use U.S. Department of Energy - MEASUR to resolve existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings from the listed category inputs.

**Source:**
U.S. Department of Energy - MEASUR

**MEASUR tool and downloads:**
[https://www.energy.gov/cmei/ito/measur](https://www.energy.gov/cmei/ito/measur)

**Calculator list and descriptions:**
[https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions](https://www.energy.gov/cmei/amo/measur-calculator-list-and-descriptions)

**ORNL MEASUR source repository:**
[https://github.com/ORNL-AMO/AMO-Tools-Desktop](https://github.com/ORNL-AMO/AMO-Tools-Desktop)

**Lookup Inputs:**

* In-Scope Equipment Count
* Compressor type
* Rated input power
* Rated flow from a nameplate, measurement, audit, or contractor specification
* Existing control mode
* Proposed control mode
* Load fraction for each bin from an uploaded site study, controls trend, or engineering audit
* Annual hours for each bin from an uploaded site study, controls trend, or engineering audit

**Value Needed:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings

**Input Bindings:**

* In-Scope Equipment Count ← User at `Annual Operational Savings > Annual compressed-air control electricity reduction > In-Scope Equipment Count`. Pass the exact bound In-Scope Equipment Count to Compressed Air Controls Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Compressor type ← User at `Annual Operational Savings > Annual compressed-air control electricity reduction > Compressor type`. Pass the exact bound Compressor type to Compressed Air Controls Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Rated input power ← Project Document at `Annual Operational Savings > Annual compressed-air control electricity reduction > Documented Rated input power from Nameplate, Measurement, Audit, or Contractor Specification`. Pass the exact bound Rated input power to Compressed Air Controls Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Rated flow from a nameplate, measurement, audit, or contractor specification ← Project Document at `Annual Operational Savings > Annual compressed-air control electricity reduction > Documented Rated flow from Nameplate, Measurement, Audit, or Contractor Specification`. Pass the exact bound Rated flow from a nameplate, measurement, audit, or contractor specification to Compressed Air Controls Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Existing control mode ← User at `Annual Operational Savings > Annual compressed-air control electricity reduction > Existing control mode`. Pass the exact bound Existing control mode to Compressed Air Controls Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Proposed control mode ← Linked Opportunity at `Annual Operational Savings > Annual compressed-air control electricity reduction > Proposed control mode`. Pass the exact bound Proposed control mode to Compressed Air Controls Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Load fraction for each bin from an uploaded site study, controls trend, or engineering audit ← Project Document at `Annual Operational Savings > Annual compressed-air control electricity reduction > Repeatable annual load profile > Documented Load fraction for each bin from Controls Trends or Engineering Audit`. Pass the exact bound Load fraction for each bin from an uploaded site study, controls trend, or engineering audit to Compressed Air Controls Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.
* Annual hours for each bin from an uploaded site study, controls trend, or engineering audit ← Project Document at `Annual Operational Savings > Annual compressed-air control electricity reduction > Repeatable annual load profile > Documented Annual hours for each bin from Controls Trends or Engineering Audit`. Pass the exact bound Annual hours for each bin from an uploaded site study, controls trend, or engineering audit to Compressed Air Controls Engineering Calculation when computing Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings; do not substitute a value from another tree path.

**Output Bindings:**

* Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings → `existing_kW_i` (kW; PER_YEAR) at `Annual Operational Savings > Annual compressed-air control electricity reduction > Standard 1.1 - Compressed Air Controls Engineering Calculation`.

**How to Use:**

1. Load the Compressed Air Controls project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR Compressed Air Assessment control-profile calculation.
2. When an exact technical input is unavailable, use only a source-specific retained equipment or application population with documented filters, numeric rule, unit, scope, and version before running the Compressed Air Assessment control-profile calculation; otherwise report the implementation limitation.
3. Run the pinned open-source Compressed Air Assessment control-profile calculation baseline and proposed cases using the category formula boundary shown in this card.
4. Return one selected existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings.
5. Retain the MEASUR version, Compressed Air Assessment control-profile calculation input object, exact and benchmark input provenance, context filters, eligible populations, selection rules, unit conversions, warnings, and baseline and proposed outputs.

**Automation:**

* **Selected Strategy:** Pinned local execution of the MEASUR Compressed Air Assessment control-profile calculation for Compressed Air Controls.
* **Automation Method:** Map reviewed project evidence into the Compressed Air Assessment control-profile calculation input schema, fill unresolved inputs through the single-value authoritative benchmark policy, execute the versioned local module, and preserve its warnings and native outputs.
* **Difficulty:** Medium to Hard

**Validation:**
The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation.
