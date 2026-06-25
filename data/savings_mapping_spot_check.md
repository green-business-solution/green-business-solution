# Savings Mapping Spot-Check

This report spot-checks the current full mapping file using five examples from each requested bucket. Source is inferred from the opportunity ID prefix. Administrator is shown when it is obvious from the opportunity name; otherwise it is marked as not clearly available in the mapping file.

## electric usage reduction

### Example 1

- Opportunity name: ConEd - Multifamily Energy Efficiency Incentives Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3821`
- Source/administrator: DSIRE / ConEd
- Primary savings model: `electric_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Lighting or LED opportunity maps to electric usage reduction and upfront rebate value.

### Example 2

- Opportunity name: Mass Save (Electric) - Large Commercial Retrofit Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4798`
- Source/administrator: DSIRE / Mass Save (Electric)
- Primary savings model: `electric_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `business_relevant`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: Lighting or LED opportunity maps to electric usage reduction and upfront rebate value.

### Example 3

- Opportunity name: Emergency Load Reduction Program (ELRP)
- Opportunity ID: `SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:emergency-load-reduction-program-elrp`
- Source/administrator: SCE_BUSINESS / Not clearly available in mapping file
- Primary savings model: `electric_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `mixed`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: Lighting or LED opportunity maps to electric usage reduction and upfront rebate value.

### Example 4

- Opportunity name: Baltimore Gas and Electric - EVsmart Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22323`
- Source/administrator: DSIRE / Baltimore Gas and Electric
- Primary savings model: `electric_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Lighting or LED opportunity maps to electric usage reduction and upfront rebate value.

### Example 5

- Opportunity name: Sawnee EMC - Commercial Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2279`
- Source/administrator: DSIRE / Sawnee EMC
- Primary savings model: `electric_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `business_relevant`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: Lighting or LED opportunity maps to electric usage reduction and upfront rebate value.

## HVAC electric efficiency

### Example 1

- Opportunity name: PG&E - Non-Residential Energy Efficiency Rebates
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4899`
- Source/administrator: DSIRE / PG&E
- Primary savings model: `hvac_electric_efficiency`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `peak_kw`, `demand_charges`, `rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `mixed`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: HVAC or heat-pump opportunity primarily affects electric HVAC efficiency.

### Example 2

- Opportunity name: River Falls Municipal Utilities - Residential Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4194`
- Source/administrator: DSIRE / River Falls Municipal Utilities
- Primary savings model: `hvac_electric_efficiency`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `peak_kw`, `demand_charges`, `rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: HVAC or heat-pump opportunity primarily affects electric HVAC efficiency.

### Example 3

- Opportunity name: Southern California Regional Energy Network (SoCalREN) - Multifamily Residential Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22684`
- Source/administrator: DSIRE / Southern California Regional Energy Network (SoCalREN)
- Primary savings model: `hvac_electric_efficiency`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `peak_kw`, `demand_charges`, `rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: HVAC or heat-pump opportunity primarily affects electric HVAC efficiency.

### Example 4

- Opportunity name: HVAC Optimization Program
- Opportunity ID: `SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:hvac-optimization-program`
- Source/administrator: SCE_BUSINESS / Not clearly available in mapping file
- Primary savings model: `hvac_electric_efficiency`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `peak_kw`, `demand_charges`, `rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `business_relevant`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: HVAC or heat-pump opportunity primarily affects electric HVAC efficiency.

### Example 5

- Opportunity name: Comfortably CA
- Opportunity ID: `SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com`
- Source/administrator: SDGE_BUSINESS / Not clearly available in mapping file
- Primary savings model: `hvac_electric_efficiency`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `peak_kw`, `demand_charges`, `rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `mixed`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: HVAC or heat-pump opportunity primarily affects electric HVAC efficiency.

## solar electric offset

### Example 1

- Opportunity name: Commercial Solar Rebate Program
- Opportunity ID: `SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program`
- Source/administrator: SILICON_VALLEY_POWER / Not clearly available in mapping file
- Primary savings model: `solar_electric_offset`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `monthly_kwh`, `average_cost_per_kwh`, `rate_schedule`
- Optional bill fields: `time_of_use_periods`, `demand_charges`, `generation_charges`, `delivery_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `business_relevant`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: Solar PV opportunity primarily affects electric bill offset and project cost.

### Example 2

- Opportunity name: Alameda Municipal Power - Residential Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3357`
- Source/administrator: DSIRE / Alameda Municipal Power
- Primary savings model: `solar_electric_offset`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `monthly_kwh`, `average_cost_per_kwh`, `rate_schedule`
- Optional bill fields: `time_of_use_periods`, `demand_charges`, `generation_charges`, `delivery_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Solar PV opportunity primarily affects electric bill offset and project cost.

### Example 3

- Opportunity name: Wakefield Municipal Gas & Light Department - Solar Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22494`
- Source/administrator: DSIRE / Wakefield Municipal Gas & Light Department
- Primary savings model: `solar_electric_offset`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `monthly_kwh`, `average_cost_per_kwh`, `rate_schedule`
- Optional bill fields: `time_of_use_periods`, `demand_charges`, `generation_charges`, `delivery_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `mixed`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: Solar PV opportunity primarily affects electric bill offset and project cost.

### Example 4

- Opportunity name: Ashland Electric Utility - Photovoltaic Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:421`
- Source/administrator: DSIRE / Ashland Electric Utility
- Primary savings model: `solar_electric_offset`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `monthly_kwh`, `average_cost_per_kwh`, `rate_schedule`
- Optional bill fields: `time_of_use_periods`, `demand_charges`, `generation_charges`, `delivery_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `mixed`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: Solar PV opportunity primarily affects electric bill offset and project cost.

### Example 5

- Opportunity name: Austin Energy - Multifamily Solar PV Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22089`
- Source/administrator: DSIRE / Austin Energy
- Primary savings model: `solar_electric_offset`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `monthly_kwh`, `average_cost_per_kwh`, `rate_schedule`
- Optional bill fields: `time_of_use_periods`, `demand_charges`, `generation_charges`, `delivery_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Solar PV opportunity primarily affects electric bill offset and project cost.

## EV charging site load

### Example 1

- Opportunity name: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4583`
- Source/administrator: DSIRE / Lodi Electric Utility
- Primary savings model: `ev_charging_site_load`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `rate_schedule`, `annual_kwh`, `average_cost_per_kwh`
- Optional bill fields: `peak_kw`, `demand_charge_rate`, `time_of_use_periods`, `contractor_quote_amount`, `quote_date`
- Business relevance: `mixed`
- V1 readiness: `needs_quote`
- Manual review required: `false`
- Classification reason: EV charging incentive affects charger project cost and site electric load.

### Example 2

- Opportunity name: Waverly Light & Power - Residential Energy Efficiency Rebates
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:2896`
- Source/administrator: DSIRE / Waverly Light & Power
- Primary savings model: `ev_charging_site_load`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `rate_schedule`, `annual_kwh`, `average_cost_per_kwh`
- Optional bill fields: `peak_kw`, `demand_charge_rate`, `time_of_use_periods`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: EV charging incentive affects charger project cost and site electric load.

### Example 3

- Opportunity name: Lake Region Electric Cooperative - Residential Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3576`
- Source/administrator: DSIRE / Lake Region Electric Cooperative
- Primary savings model: `ev_charging_site_load`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `rate_schedule`, `annual_kwh`, `average_cost_per_kwh`
- Optional bill fields: `peak_kw`, `demand_charge_rate`, `time_of_use_periods`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: EV charging incentive affects charger project cost and site electric load.

### Example 4

- Opportunity name: Residential Energy Efficiency Rebates (Offered by 5 Utilities)
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5100`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `ev_charging_site_load`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `rate_schedule`, `annual_kwh`, `average_cost_per_kwh`
- Optional bill fields: `peak_kw`, `demand_charge_rate`, `time_of_use_periods`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: EV charging incentive affects charger project cost and site electric load.

### Example 5

- Opportunity name: Residential Energy Efficiency Rebates (Offered by 12 Utilities)
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5141`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `ev_charging_site_load`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `rate_schedule`, `annual_kwh`, `average_cost_per_kwh`
- Optional bill fields: `peak_kw`, `demand_charge_rate`, `time_of_use_periods`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: EV charging incentive affects charger project cost and site electric load.

## water/sewer reduction

### Example 1

- Opportunity name: ComEd - Business Instant Lighting Discounts Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5317`
- Source/administrator: DSIRE / ComEd
- Primary savings model: `water_sewer_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_water_use`, `annual_water_cost`, `annual_sewer_cost`
- Optional bill fields: `monthly_water_use`, `water_unit`, `sewer_cost`, `meter_size`, `irrigation_meter_present`, `contractor_quote_amount`, `quote_date`
- Business relevance: `business_relevant`
- V1 readiness: `needs_project_scope`
- Manual review required: `false`
- Classification reason: Water-using equipment or fixture opportunity maps to water and sewer savings.

### Example 2

- Opportunity name: Orlando Utilities Commission - Efficiency Delivered®
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22482`
- Source/administrator: DSIRE / Orlando Utilities Commission
- Primary savings model: `water_sewer_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_water_use`, `annual_water_cost`, `annual_sewer_cost`
- Optional bill fields: `monthly_water_use`, `water_unit`, `sewer_cost`, `meter_size`, `irrigation_meter_present`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Water-using equipment or fixture opportunity maps to water and sewer savings.

### Example 3

- Opportunity name: OGE - Commercial Energy Efficiency Rebate Programs
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3638`
- Source/administrator: DSIRE / OGE
- Primary savings model: `water_sewer_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_water_use`, `annual_water_cost`, `annual_sewer_cost`
- Optional bill fields: `monthly_water_use`, `water_unit`, `sewer_cost`, `meter_size`, `irrigation_meter_present`, `contractor_quote_amount`, `quote_date`
- Business relevance: `business_relevant`
- V1 readiness: `needs_project_scope`
- Manual review required: `false`
- Classification reason: Water-using equipment or fixture opportunity maps to water and sewer savings.

### Example 4

- Opportunity name: City of Winter Park Energy Conservation Rebates & Incentive Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5398`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `water_sewer_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_water_use`, `annual_water_cost`, `annual_sewer_cost`
- Optional bill fields: `monthly_water_use`, `water_unit`, `sewer_cost`, `meter_size`, `irrigation_meter_present`, `contractor_quote_amount`, `quote_date`
- Business relevance: `mixed`
- V1 readiness: `needs_project_scope`
- Manual review required: `false`
- Classification reason: Water-using equipment or fixture opportunity maps to water and sewer savings.

### Example 5

- Opportunity name: CenterPoint Energy Advanced Residential Lighting Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5744`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `water_sewer_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_water_use`, `annual_water_cost`, `annual_sewer_cost`
- Optional bill fields: `monthly_water_use`, `water_unit`, `sewer_cost`, `meter_size`, `irrigation_meter_present`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Water-using equipment or fixture opportunity maps to water and sewer savings.

## gas usage reduction

### Example 1

- Opportunity name: Vermont Gas - Residential Energy Efficiency Leasing Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22537`
- Source/administrator: DSIRE / Vermont Gas
- Primary savings model: `gas_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_therms`, `annual_gas_cost`, `average_cost_per_therm`
- Optional bill fields: `monthly_therms`, `gas_rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Gas equipment opportunity primarily affects therm usage and gas cost.

### Example 2

- Opportunity name: Columbia Gas of Kentucky - Low Income Furnace Replacement Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5238`
- Source/administrator: DSIRE / Columbia Gas of Kentucky
- Primary savings model: `gas_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_therms`, `annual_gas_cost`, `average_cost_per_therm`
- Optional bill fields: `monthly_therms`, `gas_rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Gas equipment opportunity primarily affects therm usage and gas cost.

### Example 3

- Opportunity name: Orange and Rockland Utilities (Gas) - Residential Efficiency Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3905`
- Source/administrator: DSIRE / Orange and Rockland Utilities (Gas)
- Primary savings model: `gas_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_therms`, `annual_gas_cost`, `average_cost_per_therm`
- Optional bill fields: `monthly_therms`, `gas_rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Gas equipment opportunity primarily affects therm usage and gas cost.

### Example 4

- Opportunity name: Solar Water Heater Rebate
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:506`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `gas_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_therms`, `annual_gas_cost`, `average_cost_per_therm`
- Optional bill fields: `monthly_therms`, `gas_rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `mixed`
- V1 readiness: `needs_bill_data`
- Manual review required: `false`
- Classification reason: Gas equipment opportunity primarily affects therm usage and gas cost.

### Example 5

- Opportunity name: PECO Energy (Gas) - Residential Heating Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3240`
- Source/administrator: DSIRE / PECO Energy (Gas)
- Primary savings model: `gas_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_therms`, `annual_gas_cost`, `average_cost_per_therm`
- Optional bill fields: `monthly_therms`, `gas_rate_schedule`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Gas equipment opportunity primarily affects therm usage and gas cost.

## financing cash flow

### Example 1

- Opportunity name: Chicopee Electric Light - Commercial Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5239`
- Source/administrator: DSIRE / Chicopee Electric Light
- Primary savings model: `financing_cash_flow`
- Secondary savings models: `electric_usage_reduction`, `hvac_electric_efficiency`, `motor_vfd_efficiency`, `controls_building_automation`
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `peak_kw`, `demand_charges`, `demand_charge_rate`, `annual_therms`, `time_of_use_periods`
- Business relevance: `mixed`
- V1 readiness: `needs_financing_terms`
- Manual review required: `false`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

### Example 2

- Opportunity name: Taunton Municipal Lighting Plant - Residential Heat Pump & Zero-Interest Loan
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22805`
- Source/administrator: DSIRE / Taunton Municipal Lighting Plant
- Primary savings model: `financing_cash_flow`
- Secondary savings models: `electric_usage_reduction`, `hvac_electric_efficiency`, `motor_vfd_efficiency`
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `peak_kw`, `demand_charges`, `demand_charge_rate`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

### Example 3

- Opportunity name: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5313`
- Source/administrator: DSIRE / USDA
- Primary savings model: `financing_cash_flow`
- Secondary savings models: None
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`
- Business relevance: `business_relevant`
- V1 readiness: `needs_financing_terms`
- Manual review required: `true`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

### Example 4

- Opportunity name: Sales and Use Tax Exclusion for Advanced Transportation and Alternative Energy Manufacturing Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4054`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `financing_cash_flow`
- Secondary savings models: `solar_electric_offset`, `battery_tou_demand_savings`
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`, `time_of_use_periods`, `demand_charges`, `generation_charges`, `delivery_charges`, `annual_kwh`, `monthly_peak_kw`
- Business relevance: `unknown`
- V1 readiness: `unknown`
- Manual review required: `true`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

### Example 5

- Opportunity name: Energy Efficient Schools Initiative - Loans
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3801`
- Source/administrator: DSIRE / Energy Efficient Schools Initiative
- Primary savings model: `financing_cash_flow`
- Secondary savings models: `electric_usage_reduction`, `hvac_electric_efficiency`, `gas_usage_reduction`, `motor_vfd_efficiency`, `controls_building_automation`
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `peak_kw`, `demand_charges`, `monthly_therms`, `gas_rate_schedule`, `demand_charge_rate`, `annual_therms`, `time_of_use_periods`
- Business relevance: `public_nonprofit_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

## grant funding

### Example 1

- Opportunity name: Illinois - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22643`
- Source/administrator: DSIRE / Illinois
- Primary savings model: `grant_funding`
- Secondary savings models: `ev_charging_site_load`
- Required bill fields: `project_cost_estimate`
- Optional bill fields: `contractor_quote_amount`, `peak_kw`, `demand_charge_rate`, `time_of_use_periods`
- Business relevance: `unknown`
- V1 readiness: `unknown`
- Manual review required: `true`
- Classification reason: Grant or solicitation reduces upfront project cost; award amount and scope need project details.

### Example 2

- Opportunity name: Clean Fleet EV Incentive Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22200`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `grant_funding`
- Secondary savings models: `ev_charging_site_load`, `battery_tou_demand_savings`
- Required bill fields: `project_cost_estimate`
- Optional bill fields: `contractor_quote_amount`, `peak_kw`, `demand_charge_rate`, `time_of_use_periods`, `annual_kwh`, `monthly_peak_kw`
- Business relevance: `business_relevant`
- V1 readiness: `needs_quote`
- Manual review required: `false`
- Classification reason: Grant or solicitation reduces upfront project cost; award amount and scope need project details.

### Example 3

- Opportunity name: GFO-23-404 - Equitable Building Decarbonization Program Direct Install
- Opportunity ID: `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-404`
- Source/administrator: CA_ENERGY_COMMISSION / GFO-23-404
- Primary savings model: `grant_funding`
- Secondary savings models: None
- Required bill fields: `project_cost_estimate`
- Optional bill fields: `contractor_quote_amount`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Grant or solicitation reduces upfront project cost; award amount and scope need project details.

### Example 4

- Opportunity name: GFO-23-318 - BRIDGE 2024: Bringing Rapid Innovation Development to Green Energy
- Opportunity ID: `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-318`
- Source/administrator: CA_ENERGY_COMMISSION / GFO-23-318
- Primary savings model: `grant_funding`
- Secondary savings models: None
- Required bill fields: `project_cost_estimate`
- Optional bill fields: `contractor_quote_amount`
- Business relevance: `business_relevant`
- V1 readiness: `needs_quote`
- Manual review required: `false`
- Classification reason: Grant or solicitation reduces upfront project cost; award amount and scope need project details.

### Example 5

- Opportunity name: Tennessee  - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22641`
- Source/administrator: DSIRE / Tennessee
- Primary savings model: `grant_funding`
- Secondary savings models: `electric_usage_reduction`, `ev_charging_site_load`
- Required bill fields: `project_cost_estimate`
- Optional bill fields: `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `peak_kw`, `demand_charge_rate`, `time_of_use_periods`
- Business relevance: `unknown`
- V1 readiness: `unknown`
- Manual review required: `true`
- Classification reason: Grant or solicitation reduces upfront project cost; award amount and scope need project details.

## tax benefit project-cost reduction

### Example 1

- Opportunity name: Residential Renewable Energy Income Tax Credit
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:144`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `tax_benefit_project_cost_reduction`
- Secondary savings models: `electric_usage_reduction`, `solar_electric_offset`
- Required bill fields: `project_cost_estimate`, `tax_entity_type`
- Optional bill fields: `ownership_status`, `tax_appetite_unknown`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `time_of_use_periods`, `demand_charges`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Tax incentive value depends on eligible cost and taxpayer status.

### Example 2

- Opportunity name: Electric Vehicle Income Tax Credit
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22156`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `tax_benefit_project_cost_reduction`
- Secondary savings models: `motor_vfd_efficiency`
- Required bill fields: `project_cost_estimate`, `tax_entity_type`
- Optional bill fields: `ownership_status`, `tax_appetite_unknown`, `contractor_quote_amount`, `peak_kw`, `demand_charge_rate`, `monthly_kwh`
- Business relevance: `mixed`
- V1 readiness: `needs_tax_context`
- Manual review required: `false`
- Classification reason: Tax incentive value depends on eligible cost and taxpayer status.

### Example 3

- Opportunity name: Clean-Burning Motor Vehicle Fuel Property Tax Credit - Personal
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22222`
- Source/administrator: DSIRE / Clean-Burning Motor Vehicle Fuel Property Tax Credit
- Primary savings model: `tax_benefit_project_cost_reduction`
- Secondary savings models: `motor_vfd_efficiency`
- Required bill fields: `project_cost_estimate`, `tax_entity_type`
- Optional bill fields: `ownership_status`, `tax_appetite_unknown`, `contractor_quote_amount`, `peak_kw`, `demand_charge_rate`, `monthly_kwh`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Tax incentive value depends on eligible cost and taxpayer status.

### Example 4

- Opportunity name: Deduction For Energy-Conserving Investment
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:1158`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `tax_benefit_project_cost_reduction`
- Secondary savings models: `electric_usage_reduction`, `controls_building_automation`
- Required bill fields: `project_cost_estimate`, `tax_entity_type`
- Optional bill fields: `ownership_status`, `tax_appetite_unknown`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `annual_therms`, `peak_kw`, `demand_charges`, `time_of_use_periods`
- Business relevance: `mixed`
- V1 readiness: `needs_tax_context`
- Manual review required: `false`
- Classification reason: Tax incentive value depends on eligible cost and taxpayer status.

### Example 5

- Opportunity name: Summit County - Energy Smart Colorado Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5562`
- Source/administrator: DSIRE / Summit County
- Primary savings model: `tax_benefit_project_cost_reduction`
- Secondary savings models: `electric_usage_reduction`, `controls_building_automation`
- Required bill fields: `project_cost_estimate`, `tax_entity_type`
- Optional bill fields: `ownership_status`, `tax_appetite_unknown`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `annual_therms`, `peak_kw`, `demand_charges`, `time_of_use_periods`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Tax incentive value depends on eligible cost and taxpayer status.

## residential_only

### Example 1

- Opportunity name: NextZero EV Charger Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22328`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `fleet_fuel_replacement`
- Secondary savings models: `ev_charging_site_load`
- Required bill fields: `annual_gallons`, `annual_fuel_cost`, `average_cost_per_gallon`, `vehicle_count`
- Optional bill fields: `estimated_miles`, `fuel_type`, `monthly_fuel_cost`, `rate_schedule`, `average_cost_per_kwh`, `peak_kw`, `demand_charge_rate`, `time_of_use_periods`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Fleet or vehicle incentive affects fuel replacement economics.

### Example 2

- Opportunity name: ConEd - Multifamily Energy Efficiency Incentives Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3821`
- Source/administrator: DSIRE / ConEd
- Primary savings model: `electric_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Lighting or LED opportunity maps to electric usage reduction and upfront rebate value.

### Example 3

- Opportunity name: Taunton Municipal Lighting Plant - Residential Heat Pump & Zero-Interest Loan
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22805`
- Source/administrator: DSIRE / Taunton Municipal Lighting Plant
- Primary savings model: `financing_cash_flow`
- Secondary savings models: `electric_usage_reduction`, `hvac_electric_efficiency`, `motor_vfd_efficiency`
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `peak_kw`, `demand_charges`, `demand_charge_rate`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

### Example 4

- Opportunity name: Consumers Energy (Gas) - Residential Energy Efficiency Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4300`
- Source/administrator: DSIRE / Consumers Energy (Gas)
- Primary savings model: `whole_building_custom_efficiency`
- Secondary savings models: `electric_usage_reduction`, `hvac_electric_efficiency`, `gas_usage_reduction`, `controls_building_automation`, `battery_tou_demand_savings`, `water_sewer_reduction`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `annual_therms`, `average_cost_per_therm`, `peak_kw`, `demand_charge_rate`, `square_footage`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `demand_charges`, `monthly_therms`, `gas_rate_schedule`, `time_of_use_periods`, `annual_kwh`, `monthly_peak_kw`, `monthly_water_use`, `water_unit`, `sewer_cost`, `meter_size`, `irrigation_meter_present`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Broad or custom efficiency program needs site bill baseline and project-scope definition.

### Example 5

- Opportunity name: Duke Energy Indiana Off-Peak Charging Credit
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22551`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `project_cost_reduction_only`
- Secondary savings models: None
- Required bill fields: `project_cost_estimate`
- Optional bill fields: `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Rebate or performance incentive reduces project cost, but source text does not identify a specific reusable savings model.

## policy_only

### Example 1

- Opportunity name: City of San Diego - Sustainable Building Expedited Permit Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4790`
- Source/administrator: DSIRE / City of San Diego
- Primary savings model: `program_rule_value_only`
- Secondary savings models: None
- Required bill fields: None
- Optional bill fields: `service_address`, `utility_provider`
- Business relevance: `mixed`
- V1 readiness: `policy_only`
- Manual review required: `false`
- Classification reason: Program rule affects permitting, timing, or certification rather than direct financial savings.

### Example 2

- Opportunity name: Solar Alternative Energy Credits
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5682`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `renewable_generation_credit_market_value`
- Secondary savings models: `solar_electric_offset`
- Required bill fields: `annual_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `time_of_use_periods`, `demand_charges`, `generation_charges`, `delivery_charges`
- Business relevance: `mixed`
- V1 readiness: `policy_only`
- Manual review required: `false`
- Classification reason: Market-credit program creates REC/SREC value separate from direct utility bill savings.

### Example 3

- Opportunity name: Solar Renewable Energy Credits
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5686`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `renewable_generation_credit_market_value`
- Secondary savings models: `solar_electric_offset`
- Required bill fields: `annual_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `time_of_use_periods`, `demand_charges`, `generation_charges`, `delivery_charges`
- Business relevance: `mixed`
- V1 readiness: `policy_only`
- Manual review required: `false`
- Classification reason: Market-credit program creates REC/SREC value separate from direct utility bill savings.

### Example 4

- Opportunity name: Town of Ipswich Electric Light Department - Solar PV Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22497`
- Source/administrator: DSIRE / Town of Ipswich Electric Light Department
- Primary savings model: `interconnection_or_grid_access_value`
- Secondary savings models: None
- Required bill fields: None
- Optional bill fields: `utility_provider`, `service_address`, `rate_schedule`
- Business relevance: `mixed`
- V1 readiness: `policy_only`
- Manual review required: `true`
- Classification reason: Interconnection or grid-access rule affects project feasibility or delivery.

### Example 5

- Opportunity name: Building Operator Certification Training Scholarships
- Opportunity ID: `SOURCE_SILICON_VALLEY_POWER:svp_source_section:ef0850c0e097a7f9:building-operator-certification-training-scholarships`
- Source/administrator: SILICON_VALLEY_POWER / Not clearly available in mapping file
- Primary savings model: `program_rule_value_only`
- Secondary savings models: None
- Required bill fields: None
- Optional bill fields: `service_address`, `utility_provider`
- Business relevance: `business_relevant`
- V1 readiness: `policy_only`
- Manual review required: `true`
- Classification reason: Program rule affects permitting, timing, or certification rather than direct financial savings.

## manual_review_required = true

### Example 1

- Opportunity name: Xcel Energy (Electric) - Commercial Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5215`
- Source/administrator: DSIRE / Xcel Energy (Electric)
- Primary savings model: `motor_vfd_efficiency`
- Secondary savings models: None
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `peak_kw`, `demand_charge_rate`, `monthly_kwh`
- Business relevance: `business_relevant`
- V1 readiness: `needs_project_scope`
- Manual review required: `true`
- Classification reason: Motor, VFD, pump, or compressed-air opportunity maps to electric motor efficiency.

### Example 2

- Opportunity name: OTEC - Agricultural Energy Efficiency Rebate Programs
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3136`
- Source/administrator: DSIRE / OTEC
- Primary savings model: `motor_vfd_efficiency`
- Secondary savings models: None
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `peak_kw`, `demand_charge_rate`, `monthly_kwh`
- Business relevance: `agriculture_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `true`
- Classification reason: Motor, VFD, pump, or compressed-air opportunity maps to electric motor efficiency.

### Example 3

- Opportunity name: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5313`
- Source/administrator: DSIRE / USDA
- Primary savings model: `financing_cash_flow`
- Secondary savings models: None
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`
- Business relevance: `business_relevant`
- V1 readiness: `needs_financing_terms`
- Manual review required: `true`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

### Example 4

- Opportunity name: Illinois - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22643`
- Source/administrator: DSIRE / Illinois
- Primary savings model: `grant_funding`
- Secondary savings models: `ev_charging_site_load`
- Required bill fields: `project_cost_estimate`
- Optional bill fields: `contractor_quote_amount`, `peak_kw`, `demand_charge_rate`, `time_of_use_periods`
- Business relevance: `unknown`
- V1 readiness: `unknown`
- Manual review required: `true`
- Classification reason: Grant or solicitation reduces upfront project cost; award amount and scope need project details.

### Example 5

- Opportunity name: Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3312`
- Source/administrator: DSIRE / Minnesota Energy Resources (Gas)
- Primary savings model: `controls_building_automation`
- Secondary savings models: None
- Required bill fields: `annual_kwh`, `rate_schedule`
- Optional bill fields: `annual_therms`, `peak_kw`, `demand_charges`, `time_of_use_periods`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `true`
- Classification reason: Controls or automation opportunity affects electric and demand savings.

## manual_review_required = false

### Example 1

- Opportunity name: Chicopee Electric Light - Commercial Energy Efficiency Rebate Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:5239`
- Source/administrator: DSIRE / Chicopee Electric Light
- Primary savings model: `financing_cash_flow`
- Secondary savings models: `electric_usage_reduction`, `hvac_electric_efficiency`, `motor_vfd_efficiency`, `controls_building_automation`
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `peak_kw`, `demand_charges`, `demand_charge_rate`, `annual_therms`, `time_of_use_periods`
- Business relevance: `mixed`
- V1 readiness: `needs_financing_terms`
- Manual review required: `false`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

### Example 2

- Opportunity name: NextZero EV Charger Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22328`
- Source/administrator: DSIRE / Not clearly available in mapping file
- Primary savings model: `fleet_fuel_replacement`
- Secondary savings models: `ev_charging_site_load`
- Required bill fields: `annual_gallons`, `annual_fuel_cost`, `average_cost_per_gallon`, `vehicle_count`
- Optional bill fields: `estimated_miles`, `fuel_type`, `monthly_fuel_cost`, `rate_schedule`, `average_cost_per_kwh`, `peak_kw`, `demand_charge_rate`, `time_of_use_periods`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Fleet or vehicle incentive affects fuel replacement economics.

### Example 3

- Opportunity name: ConEd - Multifamily Energy Efficiency Incentives Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:3821`
- Source/administrator: DSIRE / ConEd
- Primary savings model: `electric_usage_reduction`
- Secondary savings models: `project_cost_reduction_only`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `contractor_quote_amount`, `quote_date`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Lighting or LED opportunity maps to electric usage reduction and upfront rebate value.

### Example 4

- Opportunity name: Taunton Municipal Lighting Plant - Residential Heat Pump & Zero-Interest Loan
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:22805`
- Source/administrator: DSIRE / Taunton Municipal Lighting Plant
- Primary savings model: `financing_cash_flow`
- Secondary savings models: `electric_usage_reduction`, `hvac_electric_efficiency`, `motor_vfd_efficiency`
- Required bill fields: `project_cost_estimate`, `interest_rate`, `financing_term_years`
- Optional bill fields: `down_payment`, `contractor_quote_amount`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `peak_kw`, `demand_charges`, `demand_charge_rate`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Loan or financing program affects cash flow; measure-specific savings depend on final project scope.

### Example 5

- Opportunity name: Consumers Energy (Gas) - Residential Energy Efficiency Program
- Opportunity ID: `SOURCE_DSIRE:dsire_program_id:4300`
- Source/administrator: DSIRE / Consumers Energy (Gas)
- Primary savings model: `whole_building_custom_efficiency`
- Secondary savings models: `electric_usage_reduction`, `hvac_electric_efficiency`, `gas_usage_reduction`, `controls_building_automation`, `battery_tou_demand_savings`, `water_sewer_reduction`
- Required bill fields: `annual_kwh`, `annual_electric_cost`, `average_cost_per_kwh`
- Optional bill fields: `annual_therms`, `average_cost_per_therm`, `peak_kw`, `demand_charge_rate`, `square_footage`, `monthly_kwh`, `rate_schedule`, `delivery_charges`, `generation_charges`, `demand_charges`, `monthly_therms`, `gas_rate_schedule`, `time_of_use_periods`, `annual_kwh`, `monthly_peak_kw`, `monthly_water_use`, `water_unit`, `sewer_cost`, `meter_size`, `irrigation_meter_present`
- Business relevance: `residential_only`
- V1 readiness: `not_v1_relevant`
- Manual review required: `false`
- Classification reason: Broad or custom efficiency program needs site bill baseline and project-scope definition.

