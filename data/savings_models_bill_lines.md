# Savings Models and Required Bill Lines

This document explains each savings model and the bill/document fields RetroFi may need to calculate savings, incentives, ROI, payback, or readiness. It is generated from `savings_models.json`, `bill_field_dictionary.json`, and the current full dry-run mapping in `opportunity_savings_mapping.json`.

Field names are written in plain English first, followed by the stable field ID used by the data system. Required fields are the minimum fields the model normally needs for a useful calculation; optional fields improve confidence or make the estimate more precise.

## Battery TOU and demand savings

* Model ID: `battery_tou_demand_savings`
* Plain-English purpose: Estimates savings from battery storage through demand charge reduction, TOU arbitrage, resilience value, and paired-solar value.
* Typical opportunities: battery storage, lithium-ion, resilience
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill, no utility bill required
* Observed mapped opportunities: 197
* Required bill/document lines:
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Demand charges - `demand_charges` - Total demand charges
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Optional bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Monthly peak kW - `monthly_peak_kw` - Peak demand by month
  * Quote date - `quote_date` - Date of contractor quote
* Non-bill inputs needed: contractor quote amount, equipment category, equipment make model, ownership status, project cost estimate, quantity
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Commercial kitchen equipment efficiency

* Model ID: `commercial_kitchen_equipment_efficiency`
* Plain-English purpose: Estimates electric, gas, and water savings from efficient commercial food-service equipment.
* Typical opportunities: commercial cooking, food service, dishwashers, water heaters
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill, water/sewer bill
* Observed mapped opportunities: 146
* Required bill/document lines:
  * Annual electric cost - `annual_electric_cost` - Total electric charges over 12 months
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
* Optional bill/document lines:
  * Annual sewer cost - `annual_sewer_cost` - Total sewer charges over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Annual water cost - `annual_water_cost` - Total water charges over 12 months
  * Annual water use - `annual_water_use` - Total water usage over 12 months
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
  * Irrigation meter present - `irrigation_meter_present` - Whether a separate irrigation meter exists
  * Meter size - `meter_size` - Water meter size
  * Monthly water use - `monthly_water_use` - Water usage by month
  * Sewer cost - `sewer_cost` - Sewer charges for a bill period
  * Water unit - `water_unit` - Unit used for water consumption
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, equipment make model, quantity, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Controls and building automation

* Model ID: `controls_building_automation`
* Plain-English purpose: Estimates electric and gas savings from controls, thermostats, building automation, and load management.
* Typical opportunities: controls, thermostats, building automation, load management
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill
* Observed mapped opportunities: 267
* Required bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Optional bill/document lines:
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Demand charges - `demand_charges` - Total demand charges
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: equipment category, equipment make model, project cost estimate, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Custom incentive per kWh saved

* Model ID: `custom_incentive_per_kwh_saved`
* Plain-English purpose: Calculates incentive value for custom programs that pay per verified kWh or kW saved.
* Typical opportunities: custom efficiency, whole-building, performance incentives
* Value roles: bill savings, upfront cost reduction
* Affected bill/document types: electric bill
* Observed mapped opportunities: 0
* Required bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
* Optional bill/document lines:
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, project cost estimate
* Notes: Usually combines measured or estimated kWh savings with an incentive formula that pays per verified unit of energy saved.

## Electric demand reduction

* Model ID: `electric_demand_reduction`
* Plain-English purpose: Estimates peak kW and demand charge savings from demand-management measures.
* Typical opportunities: demand response, load management, controls
* Value roles: bill savings
* Affected bill/document types: electric bill
* Observed mapped opportunities: 0
* Required bill/document lines:
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Demand charges - `demand_charges` - Total demand charges
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Optional bill/document lines:
  * Monthly peak kW - `monthly_peak_kw` - Peak demand by month
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: equipment category, project timing, square footage
* Notes: Usually estimates operating-cost savings from lower peak demand charges.

## Electric usage reduction

* Model ID: `electric_usage_reduction`
* Plain-English purpose: Estimates kWh and electric cost savings from measures that reduce electricity consumption.
* Typical opportunities: lighting, plug load, custom electric efficiency
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill, no utility bill required
* Observed mapped opportunities: 421
* Required bill/document lines:
  * Annual electric cost - `annual_electric_cost` - Total electric charges over 12 months
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
* Optional bill/document lines:
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Quote date - `quote_date` - Date of contractor quote
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Non-bill inputs needed: equipment category, equipment efficiency rating, equipment make model, ownership status, quantity, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Envelope and insulation savings

* Model ID: `envelope_insulation_savings`
* Plain-English purpose: Estimates heating and cooling savings from insulation, air sealing, windows, roofs, and envelope improvements.
* Typical opportunities: insulation, windows, doors, air sealing, roofs
* Value roles: bill savings, upfront cost reduction
* Affected bill/document types: gas bill, no utility bill required
* Observed mapped opportunities: 12
* Required bill/document lines:
  * Annual gas cost - `annual_gas_cost` - Total gas charges over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
* Optional bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Quote date - `quote_date` - Date of contractor quote
  * Square footage - `square_footage` - Facility or affected area square footage
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, ownership status, quantity, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## EV charging site load

* Model ID: `ev_charging_site_load`
* Plain-English purpose: Estimates site electric load, operating cost, and incentive value for EV charging infrastructure.
* Typical opportunities: EV charging, make-ready, EVSE
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill, no utility bill required
* Observed mapped opportunities: 388
* Required bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Optional bill/document lines:
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Quote date - `quote_date` - Date of contractor quote
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: contractor quote amount, equipment category, ownership status, parking spaces, project cost estimate, quantity
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Financing cash flow

* Model ID: `financing_cash_flow`
* Plain-English purpose: Estimates project cash flow under loans, leases, or other financing terms.
* Typical opportunities: loans, financing, on-bill financing
* Value roles: bill savings, financing
* Affected bill/document types: electric bill, gas bill, no utility bill required, water/sewer bill
* Observed mapped opportunities: 217
* Required bill/document lines:
  * Financing term years - `financing_term_years` - Loan or financing term
  * Interest rate - `interest_rate` - Loan or financing interest rate
  * Project cost estimate - `project_cost_estimate` - Estimated total project cost
* Optional bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Annual sewer cost - `annual_sewer_cost` - Total sewer charges over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Annual water cost - `annual_water_cost` - Total water charges over 12 months
  * Annual water use - `annual_water_use` - Total water usage over 12 months
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Demand charges - `demand_charges` - Total demand charges
  * Down payment - `down_payment` - Upfront payment for financing
  * Gas rate schedule - `gas_rate_schedule` - Gas tariff or rate plan
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Irrigation meter present - `irrigation_meter_present` - Whether a separate irrigation meter exists
  * Meter size - `meter_size` - Water meter size
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Monthly peak kW - `monthly_peak_kw` - Peak demand by month
  * Monthly therms - `monthly_therms` - Gas usage by month
  * Monthly water use - `monthly_water_use` - Water usage by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Sewer cost - `sewer_cost` - Sewer charges for a bill period
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
  * Water unit - `water_unit` - Unit used for water consumption
* Non-bill inputs needed: annual electric cost, annual gas cost, annual water cost, contractor quote amount, equipment category, equipment efficiency rating, equipment make model, parking spaces, project cost estimate, quantity, square footage
* Notes: Usually estimates operating-cost savings from lower utility, fuel, water, waste, or demand charges.

## Fleet fuel replacement

* Model ID: `fleet_fuel_replacement`
* Plain-English purpose: Estimates avoided gasoline or diesel cost and added charging cost from fleet electrification.
* Typical opportunities: fleet electrification, clean vehicles, medium-duty EV, heavy-duty EV
* Value roles: bill savings, upfront cost reduction
* Affected bill/document types: electric bill, fuel/fleet records
* Observed mapped opportunities: 115
* Required bill/document lines:
  * Annual fuel cost - `annual_fuel_cost` - Fleet fuel cost over 12 months
  * Annual gallons - `annual_gallons` - Fleet fuel gallons over 12 months
  * Average cost per gallon - `average_cost_per_gallon` - Blended cost per gallon
  * Vehicle count - `vehicle_count` - Number of vehicles in scope
* Optional bill/document lines:
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Estimated miles - `estimated_miles` - Annual miles for fleet vehicles
  * Fuel type - `fuel_type` - Fleet fuel type
  * Monthly fuel cost - `monthly_fuel_cost` - Fleet fuel cost by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: contractor quote amount, equipment category, parking spaces, project cost estimate, quantity, vehicle count
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Gas usage reduction

* Model ID: `gas_usage_reduction`
* Plain-English purpose: Estimates therm and gas cost savings from gas efficiency measures.
* Typical opportunities: furnaces, boilers, water heaters, steam systems
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: gas bill, no utility bill required
* Observed mapped opportunities: 257
* Required bill/document lines:
  * Annual gas cost - `annual_gas_cost` - Total gas charges over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
* Optional bill/document lines:
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Gas rate schedule - `gas_rate_schedule` - Gas tariff or rate plan
  * Monthly therms - `monthly_therms` - Gas usage by month
  * Quote date - `quote_date` - Date of contractor quote
* Non-bill inputs needed: equipment category, equipment efficiency rating, equipment make model, ownership status, quantity
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Gas-to-electric replacement

* Model ID: `gas_to_electric_replacement`
* Plain-English purpose: Estimates net utility impact from electrification projects that displace gas with electric equipment.
* Typical opportunities: heat pumps, heat pump water heaters, commercial kitchen electrification
* Value roles: bill savings, upfront cost reduction
* Affected bill/document types: electric bill, gas bill
* Observed mapped opportunities: 0
* Required bill/document lines:
  * Annual electric cost - `annual_electric_cost` - Total electric charges over 12 months
  * Annual gas cost - `annual_gas_cost` - Total gas charges over 12 months
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
* Optional bill/document lines:
  * Gas rate schedule - `gas_rate_schedule` - Gas tariff or rate plan
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Monthly therms - `monthly_therms` - Gas usage by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Non-bill inputs needed: equipment category, equipment efficiency rating, project cost estimate, quantity, square footage
* Notes: Use this model when the listed inputs are enough to estimate savings, incentive value, or readiness for the opportunity type.

## Grant funding

* Model ID: `grant_funding`
* Plain-English purpose: Estimates grant award value and remaining net project cost.
* Typical opportunities: grants, solicitations, public funding
* Value roles: bill savings, upfront cost reduction
* Affected bill/document types: electric bill, gas bill, no utility bill required
* Observed mapped opportunities: 336
* Required bill/document lines:
  * Project cost estimate - `project_cost_estimate` - Estimated total project cost
* Optional bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Annual sewer cost - `annual_sewer_cost` - Total sewer charges over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Annual water cost - `annual_water_cost` - Total water charges over 12 months
  * Annual water use - `annual_water_use` - Total water usage over 12 months
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Demand charges - `demand_charges` - Total demand charges
  * Gas rate schedule - `gas_rate_schedule` - Gas tariff or rate plan
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Monthly peak kW - `monthly_peak_kw` - Peak demand by month
  * Monthly therms - `monthly_therms` - Gas usage by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, equipment make model, ownership status, parking spaces, project cost estimate, project timing, quantity, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## HVAC electric efficiency

* Model ID: `hvac_electric_efficiency`
* Plain-English purpose: Estimates electric savings from high-efficiency cooling, ventilation, heat pumps, and related HVAC upgrades that do not primarily switch fuels.
* Typical opportunities: HVAC, air conditioners, chillers, heat pumps
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill, no utility bill required
* Observed mapped opportunities: 360
* Required bill/document lines:
  * Annual electric cost - `annual_electric_cost` - Total electric charges over 12 months
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
* Optional bill/document lines:
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Demand charges - `demand_charges` - Total demand charges
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Quote date - `quote_date` - Date of contractor quote
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, equipment make model, ownership status, quantity, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Interconnection or grid access value

* Model ID: `interconnection_or_grid_access_value`
* Plain-English purpose: Classifies interconnection, grid access, make-ready, and queue/tariff rules that affect whether or how a distributed energy project can proceed.
* Typical opportunities: interconnection, grid access, make-ready, distributed generation rules
* Value roles: policy or permitting
* Affected bill/document types: no utility bill required
* Observed mapped opportunities: 34
* Required bill/document lines:
  * No bill/document fields are required for this model.
* Optional bill/document lines:
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Service address - `service_address` - Address associated with the utility account
  * Utility provider - `utility_provider` - Electric utility serving the site
* Non-bill inputs needed: equipment category, ownership status, project cost estimate, project timing
* Notes: Usually tracks rule, permitting, interconnection, or eligibility value rather than direct dollar savings.

## Motor and VFD efficiency

* Model ID: `motor_vfd_efficiency`
* Plain-English purpose: Estimates electric savings from motors, VFDs, compressed air, pumps, and variable-speed controls.
* Typical opportunities: motors, VFDs, compressed air, pumps
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill
* Observed mapped opportunities: 451
* Required bill/document lines:
  * Annual electric cost - `annual_electric_cost` - Total electric charges over 12 months
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
* Optional bill/document lines:
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
* Non-bill inputs needed: equipment category, equipment efficiency rating, equipment make model, quantity
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Net metering or export value

* Model ID: `net_metering_or_export_value`
* Plain-English purpose: Estimates value of exported generation under net metering, net billing, or tariffed export compensation.
* Typical opportunities: net metering, net billing, export credit
* Value roles: bill savings, policy or permitting
* Affected bill/document types: electric bill
* Observed mapped opportunities: 27
* Required bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Optional bill/document lines:
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charges - `demand_charges` - Total demand charges
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: contractor quote amount, equipment category, ownership status, parking spaces, project cost estimate, roof area
* Notes: Usually estimates operating-cost savings from lower utility, fuel, water, waste, or demand charges.

## No direct savings

* Model ID: `no_direct_savings`
* Plain-English purpose: Flags records that do not provide enough financial linkage or do not directly affect utility bills, project costs, taxes, financing, or permitting.
* Typical opportunities: information-only, unclear programs
* Value roles: no direct savings
* Affected bill/document types: no utility bill required
* Observed mapped opportunities: 26
* Required bill/document lines:
  * No bill/document fields are required for this model.
* Optional bill/document lines:
  * No optional bill/document fields are currently defined for this model.
* Non-bill inputs needed: None beyond the bill/document fields listed above.
* Notes: No direct savings model is currently available; these records are primarily taxonomy or eligibility placeholders.

## PACE or on-bill financing

* Model ID: `pace_or_on_bill_financing`
* Plain-English purpose: Estimates cash-flow impact from PACE assessments or utility on-bill financing.
* Typical opportunities: PACE, on-bill financing
* Value roles: financing
* Affected bill/document types: no utility bill required
* Observed mapped opportunities: 52
* Required bill/document lines:
  * Financing term years - `financing_term_years` - Loan or financing term
  * Interest rate - `interest_rate` - Loan or financing interest rate
  * Project cost estimate - `project_cost_estimate` - Estimated total project cost
* Optional bill/document lines:
  * Annual electric cost - `annual_electric_cost` - Total electric charges over 12 months
  * Annual gas cost - `annual_gas_cost` - Total gas charges over 12 months
  * Down payment - `down_payment` - Upfront payment for financing
  * Ownership status - `ownership_status` - Whether business owns, leases, or manages the property
* Non-bill inputs needed: landlord approval status, ownership status, project timing
* Notes: Usually evaluates cash flow, payment terms, and project affordability rather than direct bill savings.

## Per-unit or equipment-count rebate

* Model ID: `rebate_per_unit_or_equipment_count`
* Plain-English purpose: Calculates incentive value when rebate is based on eligible equipment count.
* Typical opportunities: prescriptive rebates, equipment replacement
* Value roles: upfront cost reduction
* Affected bill/document types: no utility bill required
* Observed mapped opportunities: 0
* Required bill/document lines:
  * Quantity - `quantity` - Number of eligible units
* Optional bill/document lines:
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Project cost estimate - `project_cost_estimate` - Estimated total project cost
* Non-bill inputs needed: equipment category, equipment efficiency rating, equipment make model
* Notes: Usually estimates incentive value from eligible equipment count, project scope, and program rebate rules rather than from bill savings alone.

## Policy or permitting value

* Model ID: `policy_or_permitting_value`
* Plain-English purpose: Classifies policies, expedited permitting, net metering, interconnection, certification, and non-cash rules that affect project feasibility or value.
* Typical opportunities: policy, permitting, interconnection, net metering, green building
* Value roles: policy or permitting
* Affected bill/document types: no utility bill required
* Observed mapped opportunities: 0
* Required bill/document lines:
  * No bill/document fields are required for this model.
* Optional bill/document lines:
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Service address - `service_address` - Address associated with the utility account
  * Utility provider - `utility_provider` - Electric utility serving the site
* Non-bill inputs needed: equipment category, landlord approval status, ownership status, project timing
* Notes: Usually depends on program rules or permitting context rather than bill lines.

## Program rule value only

* Model ID: `program_rule_value_only`
* Plain-English purpose: Classifies rules, eligibility provisions, or administrative program benefits that have value but no direct bill, tax, grant, financing, or market-credit calculation.
* Typical opportunities: eligibility rule, program rule, certification, administrative benefit
* Value roles: policy or permitting
* Affected bill/document types: no utility bill required
* Observed mapped opportunities: 96
* Required bill/document lines:
  * No bill/document fields are required for this model.
* Optional bill/document lines:
  * Service address - `service_address` - Address associated with the utility account
  * Utility provider - `utility_provider` - Electric utility serving the site
* Non-bill inputs needed: equipment category, ownership status, project timing
* Notes: Usually tracks rule, permitting, interconnection, or eligibility value rather than direct dollar savings.

## Project cost reduction only

* Model ID: `project_cost_reduction_only`
* Plain-English purpose: Estimates incentive value for programs that reduce upfront project cost but do not define direct bill savings.
* Typical opportunities: rebates, buydowns, equipment incentives
* Value roles: bill savings, upfront cost reduction
* Affected bill/document types: electric bill, no utility bill required
* Observed mapped opportunities: 487
* Required bill/document lines:
  * Project cost estimate - `project_cost_estimate` - Estimated total project cost
* Optional bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Demand charges - `demand_charges` - Total demand charges
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Monthly peak kW - `monthly_peak_kw` - Peak demand by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Quote date - `quote_date` - Date of contractor quote
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, equipment make model, ownership status, project cost estimate, quantity
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Refrigeration electric efficiency

* Model ID: `refrigeration_electric_efficiency`
* Plain-English purpose: Estimates electric savings from refrigeration, freezer, case controls, and related equipment.
* Typical opportunities: refrigeration, freezers, vending controls
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill
* Observed mapped opportunities: 184
* Required bill/document lines:
  * Annual electric cost - `annual_electric_cost` - Total electric charges over 12 months
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
* Optional bill/document lines:
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charges - `demand_charges` - Total demand charges
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Non-bill inputs needed: equipment category, equipment efficiency rating, equipment make model, quantity, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Renewable generation credit market value

* Model ID: `renewable_generation_credit_market_value`
* Plain-English purpose: Estimates SREC, REC, or other renewable generation credit value when a market-credit mechanism is separate from utility bill savings.
* Typical opportunities: SREC, REC, renewable energy credits, performance credits
* Value roles: bill savings, market credit, policy or permitting
* Affected bill/document types: electric bill, no utility bill required
* Observed mapped opportunities: 10
* Required bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
* Optional bill/document lines:
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charges - `demand_charges` - Total demand charges
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: contractor quote amount, equipment category, ownership status, parking spaces, project cost estimate, project timing, roof area
* Notes: Usually estimates operating-cost savings from lower utility, fuel, water, waste, or demand charges.

## Sales or property tax exemption

* Model ID: `sales_or_property_tax_exemption`
* Plain-English purpose: Estimates avoided sales tax or property tax value for eligible equipment or renewable energy assets.
* Typical opportunities: sales tax exemptions, property tax exemptions
* Value roles: bill savings, tax benefit
* Affected bill/document types: electric bill, gas bill, no utility bill required, water/sewer bill
* Observed mapped opportunities: 135
* Required bill/document lines:
  * Project cost estimate - `project_cost_estimate` - Estimated total project cost
* Optional bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Annual sewer cost - `annual_sewer_cost` - Total sewer charges over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Annual water cost - `annual_water_cost` - Total water charges over 12 months
  * Annual water use - `annual_water_use` - Total water usage over 12 months
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Demand charges - `demand_charges` - Total demand charges
  * Gas rate schedule - `gas_rate_schedule` - Gas tariff or rate plan
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Irrigation meter present - `irrigation_meter_present` - Whether a separate irrigation meter exists
  * Meter size - `meter_size` - Water meter size
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Monthly peak kW - `monthly_peak_kw` - Peak demand by month
  * Monthly therms - `monthly_therms` - Gas usage by month
  * Monthly water use - `monthly_water_use` - Water usage by month
  * Ownership status - `ownership_status` - Whether business owns, leases, or manages the property
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Sewer cost - `sewer_cost` - Sewer charges for a bill period
  * Tax entity type - `tax_entity_type` - Tax-paying entity type
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
  * Water unit - `water_unit` - Unit used for water consumption
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, equipment make model, parking spaces, project cost estimate, project timing, quantity, square footage
* Notes: Usually estimates operating-cost savings from lower utility, fuel, water, waste, or demand charges.

## Solar electric offset

* Model ID: `solar_electric_offset`
* Plain-English purpose: Estimates electric bill savings from onsite solar generation.
* Typical opportunities: solar PV, solar thermal electric
* Value roles: bill savings, financing, market credit, policy or permitting, tax benefit, upfront cost reduction
* Affected bill/document types: electric bill, no utility bill required
* Observed mapped opportunities: 189
* Required bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
* Optional bill/document lines:
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charges - `demand_charges` - Total demand charges
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Quote date - `quote_date` - Date of contractor quote
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
* Non-bill inputs needed: contractor quote amount, ownership status, parking spaces, project cost estimate, quantity, roof area
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Tax benefit project-cost reduction

* Model ID: `tax_benefit_project_cost_reduction`
* Plain-English purpose: Estimates tax credit or deduction value tied to eligible project cost.
* Typical opportunities: tax credits, tax deductions, renewable energy tax benefits
* Value roles: bill savings, tax benefit
* Affected bill/document types: electric bill, gas bill, no utility bill required, water/sewer bill
* Observed mapped opportunities: 51
* Required bill/document lines:
  * Project cost estimate - `project_cost_estimate` - Estimated total project cost
  * Tax entity type - `tax_entity_type` - Tax-paying entity type
* Optional bill/document lines:
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Annual sewer cost - `annual_sewer_cost` - Total sewer charges over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Annual water cost - `annual_water_cost` - Total water charges over 12 months
  * Annual water use - `annual_water_use` - Total water usage over 12 months
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Demand charges - `demand_charges` - Total demand charges
  * Gas rate schedule - `gas_rate_schedule` - Gas tariff or rate plan
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Irrigation meter present - `irrigation_meter_present` - Whether a separate irrigation meter exists
  * Meter size - `meter_size` - Water meter size
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Monthly peak kW - `monthly_peak_kw` - Peak demand by month
  * Monthly therms - `monthly_therms` - Gas usage by month
  * Monthly water use - `monthly_water_use` - Water usage by month
  * Ownership status - `ownership_status` - Whether business owns, leases, or manages the property
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Sewer cost - `sewer_cost` - Sewer charges for a bill period
  * Tax appetite unknown - `tax_appetite_unknown` - Whether tax appetite is unknown
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
  * Water unit - `water_unit` - Unit used for water consumption
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, equipment make model, parking spaces, project cost estimate, project timing, quantity, quote date, square footage
* Notes: Usually estimates operating-cost savings from lower utility, fuel, water, waste, or demand charges.

## Waste hauling cost reduction

* Model ID: `waste_hauling_cost_reduction`
* Plain-English purpose: Estimates savings from reducing landfill, recycling, organics, contamination, or overage charges.
* Typical opportunities: waste, recycling, organics, food waste
* Value roles: bill savings
* Affected bill/document types: waste bill or hauling invoice
* Observed mapped opportunities: 0
* Required bill/document lines:
  * Bin size - `bin_size` - Waste container size
  * Pickup frequency - `pickup_frequency` - Waste pickup frequency
  * Total waste cost - `total_waste_cost` - Total waste hauling cost
* Optional bill/document lines:
  * Contamination fees - `contamination_fees` - Fees for contaminated recycling or organics
  * Landfill service cost - `landfill_service_cost` - Landfill waste service cost
  * Organics service cost - `organics_service_cost` - Organics or compost service cost
  * Overage fees - `overage_fees` - Fees for excess waste volume
  * Recycling service cost - `recycling_service_cost` - Recycling service cost
* Non-bill inputs needed: equipment category, quantity
* Notes: Use this model when the listed inputs are enough to estimate savings, incentive value, or readiness for the opportunity type.

## Water and sewer reduction

* Model ID: `water_sewer_reduction`
* Plain-English purpose: Estimates water, sewer, and related utility savings from efficiency measures.
* Typical opportunities: water fixtures, dishwashers, laundry, cooling towers, irrigation
* Value roles: bill savings, financing, tax benefit, upfront cost reduction
* Affected bill/document types: no utility bill required, water/sewer bill
* Observed mapped opportunities: 175
* Required bill/document lines:
  * Annual sewer cost - `annual_sewer_cost` - Total sewer charges over 12 months
  * Annual water cost - `annual_water_cost` - Total water charges over 12 months
  * Annual water use - `annual_water_use` - Total water usage over 12 months
* Optional bill/document lines:
  * Contractor quote amount - `contractor_quote_amount` - Quoted contractor amount
  * Irrigation meter present - `irrigation_meter_present` - Whether a separate irrigation meter exists
  * Meter size - `meter_size` - Water meter size
  * Monthly water use - `monthly_water_use` - Water usage by month
  * Quote date - `quote_date` - Date of contractor quote
  * Sewer cost - `sewer_cost` - Sewer charges for a bill period
  * Water unit - `water_unit` - Unit used for water consumption
* Non-bill inputs needed: equipment category, equipment efficiency rating, ownership status, quantity, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Whole-building custom efficiency

* Model ID: `whole_building_custom_efficiency`
* Plain-English purpose: Estimates savings for custom C&I or whole-building programs where eligible measures are broad and savings are verified through engineering analysis.
* Typical opportunities: custom C&I, whole building, market transformation, energy study
* Value roles: bill savings, upfront cost reduction
* Affected bill/document types: electric bill, gas bill, water/sewer bill
* Observed mapped opportunities: 175
* Required bill/document lines:
  * Annual electric cost - `annual_electric_cost` - Total electric charges over 12 months
  * Annual kWh - `annual_kwh` - Total electricity usage over 12 months
  * Average cost per kWh - `average_cost_per_kwh` - Blended electric cost divided by kWh
* Optional bill/document lines:
  * Annual sewer cost - `annual_sewer_cost` - Total sewer charges over 12 months
  * Annual therms - `annual_therms` - Total gas usage over 12 months
  * Annual water cost - `annual_water_cost` - Total water charges over 12 months
  * Annual water use - `annual_water_use` - Total water usage over 12 months
  * Average cost per therm - `average_cost_per_therm` - Blended gas cost divided by therms
  * Delivery charges - `delivery_charges` - Electric delivery charges
  * Demand charge rate - `demand_charge_rate` - Demand charge price per kW
  * Demand charges - `demand_charges` - Total demand charges
  * Gas rate schedule - `gas_rate_schedule` - Gas tariff or rate plan
  * Generation charges - `generation_charges` - Electric generation/supply charges
  * Irrigation meter present - `irrigation_meter_present` - Whether a separate irrigation meter exists
  * Meter size - `meter_size` - Water meter size
  * Monthly kWh - `monthly_kwh` - Electricity usage by month
  * Monthly peak kW - `monthly_peak_kw` - Peak demand by month
  * Monthly therms - `monthly_therms` - Gas usage by month
  * Monthly water use - `monthly_water_use` - Water usage by month
  * Peak kW - `peak_kw` - Peak demand for a bill period or interval
  * Rate schedule - `rate_schedule` - Electric tariff or rate plan
  * Sewer cost - `sewer_cost` - Sewer charges for a bill period
  * Square footage - `square_footage` - Facility or affected area square footage
  * Time-of-use periods - `time_of_use_periods` - TOU energy periods and prices
  * Water unit - `water_unit` - Unit used for water consumption
* Non-bill inputs needed: contractor quote amount, equipment category, equipment efficiency rating, equipment make model, project cost estimate, quantity, square footage
* Notes: Usually combines utility bill savings with an upfront rebate, grant, or incentive that lowers project cost.

## Appendix: Unused Bill/Document Fields

These fields exist in `bill_field_dictionary.json` but are not currently referenced by any savings model or full-run opportunity mapping. They may still be useful for future models, document extraction, audit trails, or higher-confidence calculations.

* Billing period end - `billing_period_end` - End date for bill period
* Billing period start - `billing_period_start` - Start date for bill period
* Customer class - `customer_class` - Utility customer class
* Equipment category - `equipment_category` - Equipment or measure type
* Equipment efficiency rating - `equipment_efficiency_rating` - Efficiency rating for proposed equipment
* Equipment make/model - `equipment_make_model` - Equipment manufacturer and model
* Fixed customer charge - `fixed_customer_charge` - Fixed recurring electric customer charge
* Fixed gas charge - `fixed_gas_charge` - Fixed recurring gas charge
* Fuel card provider - `fuel_card_provider` - Fuel card or telematics provider
* Gas delivery charges - `gas_delivery_charges` - Gas distribution or delivery charges
* Gas procurement charges - `gas_procurement_charges` - Gas supply or procurement charges
* Gas utility provider - `gas_utility_provider` - Gas utility serving the site
* Landlord approval status - `landlord_approval_status` - Approval status for leased sites
* Masked account number - `account_number_masked` - Masked utility account identifier
* Monthly gallons - `monthly_gallons` - Fleet fuel gallons by month
* Parking spaces - `parking_spaces` - Number of parking spaces or charging stalls
* Project timing - `project_timing` - Expected project timing or deadline
* Roof area - `roof_area` - Usable roof area for solar or envelope projects
* Stormwater fee - `stormwater_fee` - Stormwater charges
* Taxes and fees - `taxes_and_fees` - Taxes and public-purpose fees on utility bills
* Total electric cost - `total_electric_cost` - Electric charges for a bill period
* Total gas cost - `total_gas_cost` - Gas charges for a bill period
* Total water cost - `total_water_cost` - Water charges for a bill period
* Waste hauler - `waste_hauler` - Waste service provider
* Water provider - `water_provider` - Water utility or provider
