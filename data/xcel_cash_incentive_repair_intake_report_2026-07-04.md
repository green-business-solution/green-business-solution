# Xcel Cash Incentive Repair Intake Report

Generated: 2026-07-04T22:03:50.329Z

## Summary

- Opportunity: SOURCE_DSIRE:dsire_program_id:1581
- Program: Xcel Energy - Residential Energy Efficiency Rebate Programs
- Recommended action: form_input_required
- Runtime status expected after patch: needs_project_scope
- Measures imported: 12
- Required inputs imported: 33
- Trailing characters ignored after JSON: 802

## Measure Rows

| Measure | Action | Value model | Formula status |
| --- | --- | --- | --- |
| Air sealing for Xcel electric-heat or natural-gas heating customer | include_form_gated | capped_percent_of_eligible_cost | needs_quote_or_invoice |
| Wall insulation for Xcel electric-heat or natural-gas heating customer | include_form_gated | capped_percent_of_eligible_cost | needs_quote_or_invoice |
| Attic insulation for Xcel electric-heat or natural-gas heating customer | include_form_gated | capped_percent_of_eligible_cost | needs_quote_or_invoice |
| Air sealing for Xcel electric cooling-only customer | include_form_gated | fixed_amount | calculable_with_user_inputs |
| Wall insulation for Xcel electric cooling-only customer | include_form_gated | fixed_amount | calculable_with_user_inputs |
| Attic insulation for Xcel electric cooling-only customer | include_form_gated | fixed_amount | calculable_with_user_inputs |
| Insulation and air sealing before qualifying space-heating heat pump combo bonus | include_form_gated | fixed_amount | needs_project_scope |
| Non-cold-climate air-source heat pump | include_form_gated | per_unit_award | needs_project_scope |
| Cold-climate air-source heat pump | include_form_gated | per_unit_award | needs_project_scope |
| Ground-source heat pump | include_form_gated | per_unit_award | needs_project_scope |
| Heat pump water heater | include_form_gated | fixed_amount | needs_project_scope |
| Central AC, gas furnace, and boiler rows for high-efficiency HVAC replacement | exclude_row | no_calculable_value | not_calculable |

## Interpretation

- The old package-level `$600` default should not be used.
- Xcel now remains out of totals by default but is categorized as a production form/input gate.
- The package should leave `cash_incentive_runtime_repair_required` once the grant/tax coverage report is regenerated.
