# Information Card — Induction Cooking Equipment

**Retrofits included:** Induction cooking equipment

**Overview:** Induction cooking replaces an existing cooking fuel with electricity for an identical tested cooking duty.

**Broader Formula**

```text
Annual Operational Savings =
Annual Resource Reduction × Applicable Bill-Derived Resource Rate
```

**Expanded Formula**

```text
Annual Operational Savings = Sum Across Resources of (Annual Cooking Activity × (Existing Resource Per Activity R - Proposed Resource Per Activity R) × Bill-Derived Resource Rate)

Annual Cooking Activity must use the same batch, temperature rise, product, and tested-duty unit as both resource-intensity terms.
```

**Information Tree**

```text
Annual Operational Savings
├─ Annual Comparable-Duty Cooking Resource Difference
│  ├─ Existing Cooking Equipment Type and Resource (User)
│  ├─ Proposed Induction Equipment Requirements (Linked Opportunity)
│  ├─ Identical Tested Cooking Duty Definition (Project Document)
│  ├─ Exact Existing and Proposed Comparable Test Records (Project Document)
│  ├─ Annual Activity in the Identical Tested Duty Unit (User)
│  └─ Standard 1.1 — Comparable Cooking-Duty Resolver
└─ Applicable Resource Rates
   ├─ Bill-Derived Electricity Rate
   │  ├─ Electricity Use (Bill)
   │  ├─ Variable Delivery Charges (Bill)
   │  ├─ Variable Generation Charges (Bill)
   │  └─ Avoidable Electricity Rate (Derived)
   └─ Bill-Derived Gas Rate
      ├─ Gas Use (Bill)
      ├─ Variable Delivery Charges (Bill)
      ├─ Variable Procurement Charges (Bill)
      └─ Avoidable Gas Rate (Derived)
```

**■ Standard 1.1 — Comparable Cooking-Duty Resolver**

**Purpose:**
Resolve existing and proposed cooking input only when both values represent the same published or project-tested cooking duty.

**Source:**
U.S. DOE, U.S. EPA, and National Laboratory of the Rockies benchmark sources

**ENERGY STAR CFS Equipment Calculator:**
[https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx](https://www.energystar.gov/sites/default/files/2024-03/CFS%20Equipment%20Calculator.xlsx)

**Lookup Inputs:**

* Existing cooking equipment type and resource
* Proposed induction equipment type and resource
* Identical tested cooking duty definition
* Annual activity in that tested duty unit
* Exact project test records when available

**Value Needed:**

* One existing resource intensity per identical tested cooking duty
* One proposed resource intensity per identical tested cooking duty

**Input Bindings:**

* Existing cooking equipment type and resource ← User at `Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Existing Cooking Equipment Type and Resource`. Pass the exact bound Existing cooking equipment type and resource to Comparable Cooking-Duty Resolver when computing One existing resource intensity per identical tested cooking duty and One proposed resource intensity per identical tested cooking duty; do not substitute a value from another tree path.
* Proposed induction equipment type and resource ← Linked Opportunity at `Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Proposed Induction Equipment Requirements`. Pass the exact bound Proposed induction equipment type and resource to Comparable Cooking-Duty Resolver when computing One existing resource intensity per identical tested cooking duty and One proposed resource intensity per identical tested cooking duty; do not substitute a value from another tree path.
* Identical tested cooking duty definition ← Project Document at `Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Identical Tested Cooking Duty Definition`. Pass the exact bound Identical tested cooking duty definition to Comparable Cooking-Duty Resolver when computing One existing resource intensity per identical tested cooking duty and One proposed resource intensity per identical tested cooking duty; do not substitute a value from another tree path.
* Annual activity in that tested duty unit ← User at `Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Annual Activity in the Identical Tested Duty Unit`. Pass the exact bound Annual activity in that tested duty unit to Comparable Cooking-Duty Resolver when computing One existing resource intensity per identical tested cooking duty and One proposed resource intensity per identical tested cooking duty; do not substitute a value from another tree path.
* Exact project test records when available ← Project Document at `Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Exact Existing and Proposed Comparable Test Records`. Pass the exact bound Exact project test records when available to Comparable Cooking-Duty Resolver when computing One existing resource intensity per identical tested cooking duty and One proposed resource intensity per identical tested cooking duty; do not substitute a value from another tree path.

**Output Bindings:**

* One existing resource intensity per identical tested cooking duty → `existing_resource_per_activity_r` (resource/certified activity; PER_EVENT) at `Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Standard 1.1 - Comparable Cooking-Duty Resolver`.
* One proposed resource intensity per identical tested cooking duty → `proposed_resource_per_activity_r` (resource/certified activity; PER_EVENT) at `Annual Operational Savings > Annual Comparable-Duty Cooking Resource Difference > Standard 1.1 - Comparable Cooking-Duty Resolver`.

**How to Use:**

1. Use exact project test records when existing and proposed equipment were measured under the same duty boundary.
2. Otherwise require the commercial electric-cooktop scope and the retained 20-pound water-boil duty from 70 to 200 degrees Fahrenheit.
3. For that compatible duty only, use the retained ENERGY STAR calculator values of 1.03 kWh per conventional electric boil and 0.91 kWh per efficient electric boil.
4. Reject gas-to-electric, different batch, different temperature rise, different product family, and unmatched food-duty comparisons.
5. Multiply the selected intensity difference by annual activity in the same duty unit and retain the source version, exact filters, native units, and unsupported-scope warning.

**Automation:**

* **Selected Strategy:** Category-specific deterministic selection from an explicitly implemented and evidenced compatible source population or equation.
* **Automation Method:** Apply the category's documented source-version and compatibility filters, execute its exact numeric rule, and retain the selected output, unit, scope, fixture, and population or equation provenance. Report a limitation when that source-specific implementation is absent.
* **Difficulty:** Medium

**Validation:**
The retained ENERGY STAR CFS calculator fixture proves the electric-cooktop 20-pound water-boil duty, conventional and efficient cooking efficiencies, 1.03 and 0.91 kWh per boil values, and annualization equation. It does not prove gas-to-induction savings or a different cooking duty, so those cases remain blocked without exact comparable project tests. No category calculation golden fixture is retained, so end-to-end execution proof remains pending.
