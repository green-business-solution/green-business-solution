import fs from "node:fs";
import path from "node:path";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const repoRoot = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(repoRoot, "data");
const scanPath = process.env.OPPORTUNITY_SCAN_PATH || "/tmp/retrofi-opportunity-scan-all.json";

const financialImpactTypes = {
  electric_usage_reduction: ["electric"],
  electric_demand_reduction: ["electric"],
  gas_usage_reduction: ["gas"],
  gas_to_electric_replacement: ["electric", "gas"],
  water_sewer_reduction: ["water_sewer"],
  solar_offset: ["electric"],
  battery_tou_demand_savings: ["electric"],
  fleet_fuel_replacement: ["fuel", "electric"],
  waste_cost_reduction: ["waste"],
  project_cost_reduction_only: ["none"],
  tax_benefit: ["none"],
  financing_cash_flow: ["none"],
  policy_or_permitting_value: ["none"],
  no_direct_savings: ["none"]
};

const savingsModels = [
  model("electric_usage_reduction", "Electric usage reduction", "Estimates kWh and electric cost savings from measures that reduce electricity consumption.", "electric_usage_reduction", ["annual_kwh", "annual_electric_cost", "average_cost_per_kwh"], ["monthly_kwh", "rate_schedule", "delivery_charges", "generation_charges"], ["equipment_category"], ["equipment_make_model", "equipment_efficiency_rating", "quantity", "square_footage"], ["lighting", "plug load", "custom electric efficiency"], "Estimate baseline annual kWh, apply deemed or custom percentage savings, and multiply avoided kWh by average or rate-specific avoided electric cost.", ["cost_per_unit", "cost_per_sqft", "contractor_quote_required"], ["per_kwh_saved", "per_unit", "capped_percent_of_project_cost"], prompts(["annual_kwh", "average_cost_per_kwh", "equipment_category"])),
  model("electric_demand_reduction", "Electric demand reduction", "Estimates peak kW and demand charge savings from demand-management measures.", "electric_demand_reduction", ["peak_kw", "demand_charges", "demand_charge_rate", "rate_schedule"], ["monthly_peak_kw", "time_of_use_periods"], ["equipment_category"], ["project_timing", "square_footage"], ["demand response", "load management", "controls"], "Estimate reducible peak kW and multiply by applicable monthly demand charge rate and affected billing periods.", ["benchmark_range", "contractor_quote_required"], ["per_kw", "custom"], prompts(["peak_kw", "demand_charge_rate", "rate_schedule"])),
  model("hvac_electric_efficiency", "HVAC electric efficiency", "Estimates electric savings from high-efficiency cooling, ventilation, heat pumps, and related HVAC upgrades that do not primarily switch fuels.", "electric_usage_reduction", ["annual_kwh", "annual_electric_cost", "average_cost_per_kwh"], ["monthly_kwh", "peak_kw", "demand_charges", "rate_schedule"], ["equipment_category", "square_footage"], ["equipment_make_model", "equipment_efficiency_rating", "quantity", "contractor_quote_amount"], ["HVAC", "air conditioners", "chillers", "heat pumps"], "Estimate cooling or HVAC electric load share, apply equipment efficiency improvement, and value kWh and optional kW reductions.", ["cost_per_ton", "cost_per_unit", "contractor_quote_required"], ["per_ton", "per_unit", "per_kwh_saved"], prompts(["annual_kwh", "square_footage", "equipment_efficiency_rating"])),
  model("gas_usage_reduction", "Gas usage reduction", "Estimates therm and gas cost savings from gas efficiency measures.", "gas_usage_reduction", ["annual_therms", "annual_gas_cost", "average_cost_per_therm"], ["monthly_therms", "gas_rate_schedule"], ["equipment_category"], ["equipment_make_model", "equipment_efficiency_rating", "quantity"], ["furnaces", "boilers", "water heaters", "steam systems"], "Estimate baseline therm use for the affected end use, apply deemed or modeled efficiency improvement, and multiply saved therms by avoided gas cost.", ["cost_per_unit", "contractor_quote_required"], ["per_unit", "per_therm_saved", "capped_percent_of_project_cost"], prompts(["annual_therms", "average_cost_per_therm", "equipment_category"])),
  model("gas_to_electric_replacement", "Gas-to-electric replacement", "Estimates net utility impact from electrification projects that displace gas with electric equipment.", "gas_to_electric_replacement", ["annual_therms", "annual_gas_cost", "annual_kwh", "annual_electric_cost", "average_cost_per_therm", "average_cost_per_kwh"], ["monthly_therms", "monthly_kwh", "rate_schedule", "gas_rate_schedule", "peak_kw"], ["equipment_category", "equipment_efficiency_rating"], ["project_cost_estimate", "quantity", "square_footage"], ["heat pumps", "heat pump water heaters", "commercial kitchen electrification"], "Estimate displaced gas therms, added electric kWh, avoided gas cost, added electric cost, and net annual operating cost change.", ["cost_per_unit", "cost_per_ton", "contractor_quote_required"], ["per_unit", "tax_credit", "capped_percent_of_project_cost"], prompts(["annual_therms", "annual_kwh", "average_cost_per_therm", "average_cost_per_kwh"])),
  model("solar_electric_offset", "Solar electric offset", "Estimates electric bill savings from onsite solar generation.", "solar_offset", ["annual_kwh", "monthly_kwh", "average_cost_per_kwh", "rate_schedule"], ["time_of_use_periods", "demand_charges", "generation_charges", "delivery_charges"], ["roof_area", "ownership_status"], ["project_cost_estimate", "contractor_quote_amount", "parking_spaces"], ["solar PV", "solar thermal electric"], "Estimate system size from roof or quote, estimate annual generation, cap offset by site load, and value generation using average or TOU-adjusted electric rates.", ["cost_per_kw", "contractor_quote_required", "benchmark_range"], ["per_kw", "performance_based", "tax_credit", "sales_tax_exemption"], prompts(["annual_kwh", "rate_schedule", "roof_area", "ownership_status"])),
  model("battery_tou_demand_savings", "Battery TOU and demand savings", "Estimates savings from battery storage through demand charge reduction, TOU arbitrage, resilience value, and paired-solar value.", "battery_tou_demand_savings", ["rate_schedule", "time_of_use_periods", "peak_kw", "demand_charges", "demand_charge_rate", "monthly_kwh"], ["annual_kwh", "monthly_peak_kw"], ["equipment_category"], ["project_cost_estimate", "equipment_make_model", "quantity", "contractor_quote_amount"], ["battery storage", "lithium-ion", "resilience"], "Estimate storage capacity and dispatch value against demand peaks and TOU periods; include incentive value as a project-cost reduction when applicable.", ["cost_per_kwh_storage", "contractor_quote_required"], ["per_kwh_storage", "percent_of_project_cost", "tax_exemption"], prompts(["rate_schedule", "time_of_use_periods", "peak_kw", "demand_charge_rate"])),
  model("ev_charging_site_load", "EV charging site load", "Estimates site electric load, operating cost, and incentive value for EV charging infrastructure.", "electric_usage_reduction", ["rate_schedule", "annual_kwh", "average_cost_per_kwh"], ["peak_kw", "demand_charge_rate", "time_of_use_periods"], ["parking_spaces", "ownership_status", "equipment_category"], ["project_cost_estimate", "quantity", "contractor_quote_amount"], ["EV charging", "make-ready", "EVSE"], "Estimate charger count and utilization, added kWh, possible demand impacts, make-ready cost, and incentive offset.", ["cost_per_unit", "contractor_quote_required"], ["per_unit", "grant_amount", "capped_percent_of_project_cost"], prompts(["parking_spaces", "rate_schedule", "project_cost_estimate"])),
  model("fleet_fuel_replacement", "Fleet fuel replacement", "Estimates avoided gasoline or diesel cost and added charging cost from fleet electrification.", "fleet_fuel_replacement", ["annual_gallons", "annual_fuel_cost", "average_cost_per_gallon", "vehicle_count"], ["estimated_miles", "fuel_type", "monthly_fuel_cost", "rate_schedule", "average_cost_per_kwh"], ["vehicle_count"], ["parking_spaces", "project_cost_estimate", "equipment_category"], ["fleet electrification", "clean vehicles", "medium-duty EV", "heavy-duty EV"], "Estimate avoided fuel gallons and fuel cost, estimate replacement electric usage, and compare net annual operating cost after incentives.", ["cost_per_unit", "contractor_quote_required"], ["per_unit", "grant_amount", "tax_credit"], prompts(["vehicle_count", "annual_gallons", "average_cost_per_gallon"])),
  model("water_sewer_reduction", "Water and sewer reduction", "Estimates water, sewer, and related utility savings from efficiency measures.", "water_sewer_reduction", ["annual_water_use", "annual_water_cost", "annual_sewer_cost"], ["monthly_water_use", "water_unit", "sewer_cost", "meter_size", "irrigation_meter_present"], ["equipment_category"], ["quantity", "square_footage", "equipment_efficiency_rating"], ["water fixtures", "dishwashers", "laundry", "cooling towers", "irrigation"], "Estimate avoided water volume and avoided sewer volume, then multiply by blended water and sewer costs.", ["cost_per_unit", "contractor_quote_required"], ["per_unit", "capped_percent_of_project_cost"], prompts(["annual_water_use", "annual_water_cost", "annual_sewer_cost"])),
  model("waste_hauling_cost_reduction", "Waste hauling cost reduction", "Estimates savings from reducing landfill, recycling, organics, contamination, or overage charges.", "waste_cost_reduction", ["total_waste_cost", "pickup_frequency", "bin_size"], ["landfill_service_cost", "recycling_service_cost", "organics_service_cost", "contamination_fees", "overage_fees"], ["equipment_category"], ["quantity"], ["waste", "recycling", "organics", "food waste"], "Estimate service changes and avoided hauling, overage, or contamination fees from waste diversion or volume reduction.", ["benchmark_range", "contractor_quote_required"], ["grant_amount", "per_unit"], prompts(["total_waste_cost", "pickup_frequency", "bin_size"])),
  model("commercial_kitchen_equipment_efficiency", "Commercial kitchen equipment efficiency", "Estimates electric, gas, and water savings from efficient commercial food-service equipment.", "electric_usage_reduction", ["annual_kwh", "annual_electric_cost", "average_cost_per_kwh"], ["annual_therms", "average_cost_per_therm", "annual_water_use", "annual_water_cost", "annual_sewer_cost"], ["equipment_category", "quantity"], ["equipment_make_model", "equipment_efficiency_rating", "contractor_quote_amount"], ["commercial cooking", "food service", "dishwashers", "water heaters"], "Use equipment type to choose electric, gas, and water end-use savings factors, then value each avoided utility stream.", ["cost_per_unit", "contractor_quote_required"], ["per_unit", "capped_percent_of_project_cost"], prompts(["equipment_category", "quantity", "annual_kwh"])),
  model("refrigeration_electric_efficiency", "Refrigeration electric efficiency", "Estimates electric savings from refrigeration, freezer, case controls, and related equipment.", "electric_usage_reduction", ["annual_kwh", "annual_electric_cost", "average_cost_per_kwh"], ["monthly_kwh", "peak_kw", "demand_charges"], ["equipment_category", "quantity"], ["equipment_make_model", "equipment_efficiency_rating"], ["refrigeration", "freezers", "vending controls"], "Estimate refrigeration baseline load, apply deemed savings by equipment or controls, and value avoided kWh plus optional demand savings.", ["cost_per_unit", "contractor_quote_required"], ["per_unit", "per_kwh_saved"], prompts(["annual_kwh", "equipment_category", "quantity"])),
  model("motor_vfd_efficiency", "Motor and VFD efficiency", "Estimates electric savings from motors, VFDs, compressed air, pumps, and variable-speed controls.", "electric_usage_reduction", ["annual_kwh", "annual_electric_cost", "average_cost_per_kwh"], ["peak_kw", "demand_charge_rate", "monthly_kwh"], ["equipment_category", "quantity"], ["equipment_make_model", "equipment_efficiency_rating"], ["motors", "VFDs", "compressed air", "pumps"], "Estimate motor horsepower or connected load, operating hours, and VFD or efficiency savings factor; value avoided kWh and optional kW.", ["cost_per_unit", "contractor_quote_required", "benchmark_range"], ["per_hp", "per_unit", "per_kwh_saved"], prompts(["annual_kwh", "equipment_category", "quantity"])),
  model("controls_building_automation", "Controls and building automation", "Estimates electric and gas savings from controls, thermostats, building automation, and load management.", "electric_demand_reduction", ["annual_kwh", "rate_schedule"], ["annual_therms", "peak_kw", "demand_charges", "time_of_use_periods"], ["square_footage", "equipment_category"], ["project_cost_estimate", "equipment_make_model"], ["controls", "thermostats", "building automation", "load management"], "Apply controls savings percentage to affected electric and gas end uses and include demand reduction where schedule control affects peak load.", ["cost_per_sqft", "contractor_quote_required"], ["per_unit", "per_kwh_saved", "per_kw"], prompts(["annual_kwh", "rate_schedule", "square_footage"])),
  model("envelope_insulation_savings", "Envelope and insulation savings", "Estimates heating and cooling savings from insulation, air sealing, windows, roofs, and envelope improvements.", "gas_usage_reduction", ["annual_therms", "annual_gas_cost", "average_cost_per_therm"], ["annual_kwh", "average_cost_per_kwh", "square_footage"], ["square_footage", "equipment_category"], ["contractor_quote_amount", "equipment_efficiency_rating"], ["insulation", "windows", "doors", "air sealing", "roofs"], "Estimate heating and cooling load reduction from envelope measure type, then value avoided therms and optional avoided kWh.", ["cost_per_sqft", "contractor_quote_required"], ["per_unit", "capped_percent_of_project_cost"], prompts(["square_footage", "annual_therms", "average_cost_per_therm"])),
  model("project_cost_reduction_only", "Project cost reduction only", "Estimates incentive value for programs that reduce upfront project cost but do not define direct bill savings.", "project_cost_reduction_only", ["project_cost_estimate"], ["contractor_quote_amount", "quote_date"], ["equipment_category"], ["quantity", "ownership_status"], ["rebates", "buydowns", "equipment incentives"], "Calculate incentive value from stated amount, percentage, cap, or eligible project-cost basis; do not estimate operational savings without a secondary model.", ["contractor_quote_required", "benchmark_range"], ["fixed_amount", "percent_of_project_cost", "capped_percent_of_project_cost", "per_unit"], prompts(["project_cost_estimate", "equipment_category"])),
  model("rebate_per_unit_or_equipment_count", "Per-unit or equipment-count rebate", "Calculates incentive value when rebate is based on eligible equipment count.", "project_cost_reduction_only", ["quantity"], ["project_cost_estimate", "contractor_quote_amount"], ["equipment_category"], ["equipment_make_model", "equipment_efficiency_rating"], ["prescriptive rebates", "equipment replacement"], "Multiply eligible quantity by the applicable per-unit rebate and cap by program rules when present.", ["cost_per_unit", "contractor_quote_required"], ["per_unit"], prompts(["quantity", "equipment_category"])),
  model("custom_incentive_per_kwh_saved", "Custom incentive per kWh saved", "Calculates incentive value for custom programs that pay per verified kWh or kW saved.", "electric_usage_reduction", ["annual_kwh", "average_cost_per_kwh"], ["peak_kw", "demand_charge_rate", "rate_schedule"], ["project_cost_estimate", "equipment_category"], ["contractor_quote_amount", "equipment_efficiency_rating"], ["custom efficiency", "whole-building", "performance incentives"], "Estimate verified annual kWh savings, multiply by incentive rate, and apply project-cost or program caps.", ["contractor_quote_required", "benchmark_range"], ["per_kwh_saved", "per_kw"], prompts(["annual_kwh", "project_cost_estimate", "equipment_category"])),
  model("tax_benefit_project_cost_reduction", "Tax benefit project-cost reduction", "Estimates tax credit or deduction value tied to eligible project cost.", "tax_benefit", ["project_cost_estimate", "tax_entity_type"], ["ownership_status", "tax_appetite_unknown", "contractor_quote_amount"], ["equipment_category"], ["quote_date", "project_timing"], ["tax credits", "tax deductions", "renewable energy tax benefits"], "Apply credit, deduction, or depreciation assumptions to eligible project cost and flag tax-review needs.", ["contractor_quote_required", "benchmark_range"], ["tax_credit", "tax_deduction"], prompts(["project_cost_estimate", "tax_entity_type", "ownership_status"])),
  model("sales_or_property_tax_exemption", "Sales or property tax exemption", "Estimates avoided sales tax or property tax value for eligible equipment or renewable energy assets.", "tax_benefit", ["project_cost_estimate"], ["ownership_status", "tax_entity_type", "contractor_quote_amount"], ["equipment_category"], ["project_timing"], ["sales tax exemptions", "property tax exemptions"], "Estimate taxable eligible cost and apply jurisdiction tax rate or exemption rules; property tax value requires assessed-value assumptions.", ["contractor_quote_required", "benchmark_range"], ["tax_exemption"], prompts(["project_cost_estimate", "ownership_status", "tax_entity_type"])),
  model("grant_funding", "Grant funding", "Estimates grant award value and remaining net project cost.", "project_cost_reduction_only", ["project_cost_estimate"], ["contractor_quote_amount"], ["equipment_category", "project_timing"], ["ownership_status"], ["grants", "solicitations", "public funding"], "Estimate grant value from stated award amount or eligible-cost percentage and cap; treat competitiveness and award uncertainty separately.", ["contractor_quote_required", "benchmark_range"], ["grant_amount", "percent_of_project_cost", "capped_percent_of_project_cost"], prompts(["project_cost_estimate", "project_timing", "equipment_category"])),
  model("financing_cash_flow", "Financing cash flow", "Estimates project cash flow under loans, leases, or other financing terms.", "financing_cash_flow", ["project_cost_estimate", "interest_rate", "financing_term_years"], ["down_payment", "contractor_quote_amount"], ["equipment_category"], ["annual_electric_cost", "annual_gas_cost", "annual_water_cost"], ["loans", "financing", "on-bill financing"], "Calculate estimated debt service and compare annual payments to modeled utility savings and incentive-adjusted project cost.", ["contractor_quote_required", "benchmark_range"], ["financing"], prompts(["project_cost_estimate", "interest_rate", "financing_term_years"])),
  model("pace_or_on_bill_financing", "PACE or on-bill financing", "Estimates cash-flow impact from PACE assessments or utility on-bill financing.", "financing_cash_flow", ["project_cost_estimate", "financing_term_years", "interest_rate"], ["ownership_status", "down_payment", "annual_electric_cost", "annual_gas_cost"], ["ownership_status"], ["landlord_approval_status", "project_timing"], ["PACE", "on-bill financing"], "Estimate assessment or on-bill payment, term, and cash-flow effect against expected utility savings.", ["contractor_quote_required", "benchmark_range"], ["financing"], prompts(["project_cost_estimate", "ownership_status", "financing_term_years"])),
  model("policy_or_permitting_value", "Policy or permitting value", "Classifies policies, expedited permitting, net metering, interconnection, certification, and non-cash rules that affect project feasibility or value.", "policy_or_permitting_value", [], ["service_address", "utility_provider", "rate_schedule"], ["equipment_category", "project_timing"], ["ownership_status", "landlord_approval_status"], ["policy", "permitting", "interconnection", "net metering", "green building"], "Do not estimate bill savings directly; record compliance, timeline, eligibility, or compensation effect and attach a secondary savings model if project economics are affected.", ["unknown"], ["unknown"], prompts(["service_address", "utility_provider", "project_timing"])),
  model("no_direct_savings", "No direct savings", "Flags records that do not provide enough financial linkage or do not directly affect utility bills, project costs, taxes, financing, or permitting.", "no_direct_savings", [], [], [], [], ["information-only", "unclear programs"], "No deterministic calculation until a program-specific value path is identified.", ["unknown"], ["unknown"], prompts(["source program details"]))
];

function model(id, displayName, description, impact, requiredBillFields, optionalBillFields, requiredNonBillInputs, optionalNonBillInputs, categories, calculationMethod, costMethods, incentiveMethods, missingDataPrompts) {
  return {
    id,
    display_name: displayName,
    description,
    financial_impact_type: impact,
    affected_bill_types: financialImpactTypes[impact],
    required_bill_fields: requiredBillFields,
    optional_bill_fields: optionalBillFields,
    required_non_bill_inputs: requiredNonBillInputs,
    optional_non_bill_inputs: optionalNonBillInputs,
    typical_opportunity_categories: categories,
    calculation_method: calculationMethod,
    project_cost_estimation_methods: costMethods,
    incentive_value_methods: incentiveMethods,
    confidence_rules: {
      low: "Only opportunity metadata and broad benchmark assumptions are available.",
      medium: "Core bill fields and basic project inputs are available, but equipment-level or quote details are missing.",
      high: "Required bill fields, project scope, equipment or quote details, and program incentive rules are available."
    },
    missing_data_prompts: missingDataPrompts,
    notes: ""
  };
}

function prompts(fields) {
  return fields.map((field) => `Provide ${field.replaceAll("_", " ")}.`);
}

const fieldTuples = [
  ["utility_provider", "Utility provider", "electric", "Electric utility serving the site", ["Utility", "Electric Supplier", "Service Provider"], "text", "critical"],
  ["service_address", "Service address", "electric", "Address associated with the utility account", ["Service Address", "Premise Address"], "text", "critical"],
  ["account_number_masked", "Masked account number", "electric", "Masked utility account identifier", ["Account Number", "Customer Number"], "masked text", "medium"],
  ["billing_period_start", "Billing period start", "electric", "Start date for bill period", ["Billing From", "Service From"], "date", "high"],
  ["billing_period_end", "Billing period end", "electric", "End date for bill period", ["Billing To", "Service To"], "date", "high"],
  ["monthly_kwh", "Monthly kWh", "electric", "Electricity usage by month", ["kWh", "Monthly Usage", "Energy Usage"], "kWh", "critical"],
  ["annual_kwh", "Annual kWh", "electric", "Total electricity usage over 12 months", ["kWh", "Total Usage", "Usage History"], "kWh", "critical"],
  ["total_electric_cost", "Total electric cost", "electric", "Electric charges for a bill period", ["Total Electric Charges", "Amount Due"], "USD", "high"],
  ["annual_electric_cost", "Annual electric cost", "electric", "Total electric charges over 12 months", ["Annual Cost", "Total Electric Cost"], "USD", "critical"],
  ["average_cost_per_kwh", "Average cost per kWh", "electric", "Blended electric cost divided by kWh", ["Average Rate", "$/kWh"], "USD/kWh", "critical"],
  ["rate_schedule", "Rate schedule", "electric", "Electric tariff or rate plan", ["Rate Schedule", "Tariff", "Rate Code"], "text", "high"],
  ["customer_class", "Customer class", "electric", "Utility customer class", ["Customer Class", "Service Class"], "text", "medium"],
  ["peak_kw", "Peak kW", "electric", "Peak demand for a bill period or interval", ["Peak Demand", "Billing Demand", "kW"], "kW", "high"],
  ["monthly_peak_kw", "Monthly peak kW", "electric", "Peak demand by month", ["Monthly Demand", "Peak kW"], "kW", "high"],
  ["demand_charge_rate", "Demand charge rate", "electric", "Demand charge price per kW", ["Demand Rate", "$/kW"], "USD/kW", "high"],
  ["demand_charges", "Demand charges", "electric", "Total demand charges", ["Demand Charges", "Facilities Demand"], "USD", "high"],
  ["time_of_use_periods", "Time-of-use periods", "electric", "TOU energy periods and prices", ["TOU", "On Peak", "Off Peak"], "structured rate periods", "high"],
  ["delivery_charges", "Delivery charges", "electric", "Electric delivery charges", ["Delivery", "Distribution"], "USD", "medium"],
  ["generation_charges", "Generation charges", "electric", "Electric generation/supply charges", ["Generation", "Supply"], "USD", "medium"],
  ["fixed_customer_charge", "Fixed customer charge", "electric", "Fixed recurring electric customer charge", ["Customer Charge", "Basic Charge"], "USD", "low"],
  ["taxes_and_fees", "Taxes and fees", "electric", "Taxes and public-purpose fees on utility bills", ["Taxes", "Fees", "Surcharges"], "USD", "low"],
  ["gas_utility_provider", "Gas utility provider", "gas", "Gas utility serving the site", ["Gas Utility", "Gas Provider"], "text", "critical"],
  ["monthly_therms", "Monthly therms", "gas", "Gas usage by month", ["Therms", "Usage"], "therms", "critical"],
  ["annual_therms", "Annual therms", "gas", "Total gas usage over 12 months", ["Annual Therms", "Therms"], "therms", "critical"],
  ["total_gas_cost", "Total gas cost", "gas", "Gas charges for a bill period", ["Total Gas Charges"], "USD", "high"],
  ["annual_gas_cost", "Annual gas cost", "gas", "Total gas charges over 12 months", ["Annual Gas Cost"], "USD", "critical"],
  ["average_cost_per_therm", "Average cost per therm", "gas", "Blended gas cost divided by therms", ["Average Rate", "$/therm"], "USD/therm", "critical"],
  ["gas_rate_schedule", "Gas rate schedule", "gas", "Gas tariff or rate plan", ["Gas Rate", "Tariff"], "text", "high"],
  ["fixed_gas_charge", "Fixed gas charge", "gas", "Fixed recurring gas charge", ["Customer Charge", "Basic Charge"], "USD", "low"],
  ["gas_delivery_charges", "Gas delivery charges", "gas", "Gas distribution or delivery charges", ["Delivery", "Distribution"], "USD", "medium"],
  ["gas_procurement_charges", "Gas procurement charges", "gas", "Gas supply or procurement charges", ["Procurement", "Supply"], "USD", "medium"],
  ["water_provider", "Water provider", "water_sewer", "Water utility or provider", ["Water Provider", "Utility"], "text", "critical"],
  ["monthly_water_use", "Monthly water use", "water_sewer", "Water usage by month", ["Usage", "Consumption"], "gallons or CCF", "critical"],
  ["annual_water_use", "Annual water use", "water_sewer", "Total water usage over 12 months", ["Annual Usage", "Water Use"], "gallons or CCF", "critical"],
  ["water_unit", "Water unit", "water_sewer", "Unit used for water consumption", ["Units", "CCF", "Gallons"], "text", "high"],
  ["total_water_cost", "Total water cost", "water_sewer", "Water charges for a bill period", ["Water Charges"], "USD", "high"],
  ["annual_water_cost", "Annual water cost", "water_sewer", "Total water charges over 12 months", ["Annual Water Cost"], "USD", "critical"],
  ["sewer_cost", "Sewer cost", "water_sewer", "Sewer charges for a bill period", ["Sewer Charges"], "USD", "high"],
  ["annual_sewer_cost", "Annual sewer cost", "water_sewer", "Total sewer charges over 12 months", ["Annual Sewer Cost"], "USD", "critical"],
  ["stormwater_fee", "Stormwater fee", "water_sewer", "Stormwater charges", ["Stormwater", "Drainage Fee"], "USD", "low"],
  ["meter_size", "Meter size", "water_sewer", "Water meter size", ["Meter Size"], "inches", "medium"],
  ["irrigation_meter_present", "Irrigation meter present", "water_sewer", "Whether a separate irrigation meter exists", ["Irrigation Meter"], "boolean", "medium"],
  ["waste_hauler", "Waste hauler", "waste", "Waste service provider", ["Hauler", "Provider"], "text", "critical"],
  ["landfill_service_cost", "Landfill service cost", "waste", "Landfill waste service cost", ["Trash", "Landfill"], "USD", "high"],
  ["recycling_service_cost", "Recycling service cost", "waste", "Recycling service cost", ["Recycling"], "USD", "medium"],
  ["organics_service_cost", "Organics service cost", "waste", "Organics or compost service cost", ["Organics", "Compost"], "USD", "medium"],
  ["pickup_frequency", "Pickup frequency", "waste", "Waste pickup frequency", ["Pickup", "Service Frequency"], "pickups/week", "critical"],
  ["bin_size", "Bin size", "waste", "Waste container size", ["Bin Size", "Container"], "yards or gallons", "critical"],
  ["contamination_fees", "Contamination fees", "waste", "Fees for contaminated recycling or organics", ["Contamination"], "USD", "medium"],
  ["overage_fees", "Overage fees", "waste", "Fees for excess waste volume", ["Overage"], "USD", "medium"],
  ["total_waste_cost", "Total waste cost", "waste", "Total waste hauling cost", ["Total Waste", "Amount Due"], "USD", "critical"],
  ["fuel_type", "Fuel type", "fuel", "Fleet fuel type", ["Fuel Type"], "text", "high"],
  ["monthly_gallons", "Monthly gallons", "fuel", "Fleet fuel gallons by month", ["Gallons"], "gallons", "high"],
  ["annual_gallons", "Annual gallons", "fuel", "Fleet fuel gallons over 12 months", ["Annual Gallons"], "gallons", "critical"],
  ["monthly_fuel_cost", "Monthly fuel cost", "fuel", "Fleet fuel cost by month", ["Fuel Cost"], "USD", "high"],
  ["annual_fuel_cost", "Annual fuel cost", "fuel", "Fleet fuel cost over 12 months", ["Annual Fuel Cost"], "USD", "critical"],
  ["average_cost_per_gallon", "Average cost per gallon", "fuel", "Blended cost per gallon", ["$/gal", "Average Fuel Cost"], "USD/gallon", "critical"],
  ["vehicle_count", "Vehicle count", "fuel", "Number of vehicles in scope", ["Vehicle Count", "Fleet Size"], "count", "critical"],
  ["estimated_miles", "Estimated miles", "fuel", "Annual miles for fleet vehicles", ["Miles", "Odometer"], "miles", "medium"],
  ["fuel_card_provider", "Fuel card provider", "fuel", "Fuel card or telematics provider", ["Fuel Card"], "text", "low"],
  ["project_cost_estimate", "Project cost estimate", "project", "Estimated total project cost", ["Project Cost", "Estimate"], "USD", "critical"],
  ["contractor_quote_amount", "Contractor quote amount", "project", "Quoted contractor amount", ["Quote", "Proposal Amount"], "USD", "high"],
  ["quote_date", "Quote date", "project", "Date of contractor quote", ["Quote Date"], "date", "medium"],
  ["equipment_category", "Equipment category", "project", "Equipment or measure type", ["Equipment", "Measure"], "text", "critical"],
  ["equipment_make_model", "Equipment make/model", "project", "Equipment manufacturer and model", ["Make", "Model"], "text", "high"],
  ["equipment_efficiency_rating", "Equipment efficiency rating", "project", "Efficiency rating for proposed equipment", ["SEER", "EER", "AFUE", "ENERGY STAR"], "text", "high"],
  ["quantity", "Quantity", "project", "Number of eligible units", ["Quantity", "Count"], "count", "critical"],
  ["square_footage", "Square footage", "project", "Facility or affected area square footage", ["Square Feet", "Area"], "sq ft", "high"],
  ["roof_area", "Roof area", "project", "Usable roof area for solar or envelope projects", ["Roof Area"], "sq ft", "high"],
  ["parking_spaces", "Parking spaces", "project", "Number of parking spaces or charging stalls", ["Parking Spaces", "Stalls"], "count", "high"],
  ["ownership_status", "Ownership status", "project", "Whether business owns, leases, or manages the property", ["Own", "Lease", "Manage"], "text", "critical"],
  ["landlord_approval_status", "Landlord approval status", "project", "Approval status for leased sites", ["Landlord Approval"], "text", "medium"],
  ["project_timing", "Project timing", "project", "Expected project timing or deadline", ["Timing", "Install Date"], "text", "medium"],
  ["tax_entity_type", "Tax entity type", "project", "Tax-paying entity type", ["Entity Type", "Tax Status"], "text", "critical"],
  ["tax_appetite_unknown", "Tax appetite unknown", "project", "Whether tax appetite is unknown", ["Tax Appetite"], "boolean", "medium"],
  ["financing_term_years", "Financing term years", "project", "Loan or financing term", ["Term", "Years"], "years", "critical"],
  ["interest_rate", "Interest rate", "project", "Loan or financing interest rate", ["Interest Rate", "APR"], "percent", "critical"],
  ["down_payment", "Down payment", "project", "Upfront payment for financing", ["Down Payment"], "USD", "medium"]
];

const modelById = new Map(savingsModels.map((item) => [item.id, item]));
const billFields = fieldTuples.map(([id, displayName, billType, description, labels, unit, priority]) => ({
  id,
  display_name: displayName,
  bill_type: billType,
  description,
  common_bill_labels: labels,
  unit,
  extraction_priority: priority,
  used_by_savings_models: savingsModels
    .filter((modelItem) => modelItem.required_bill_fields.includes(id) || modelItem.optional_bill_fields.includes(id))
    .map((modelItem) => modelItem.id),
  source_evidence_required: true
}));

const sampleClassifications = [
  ["SOURCE_DSIRE:dsire_program_id:3831", "electric_usage_reduction", ["hvac_electric_efficiency", "motor_vfd_efficiency", "controls_building_automation"], "per_kwh_saved", "benchmark_range", "needs_bill", "medium", "Commercial program includes lighting, HVAC, motors, controls, and custom measures; primary value starts with electric kWh reduction."],
  ["SOURCE_DSIRE:dsire_program_id:5170", "electric_usage_reduction", ["controls_building_automation", "hvac_electric_efficiency"], "per_kwh_saved", "benchmark_range", "needs_bill", "medium", "School efficiency program includes LED lighting and controls; bill savings are electric-usage driven."],
  ["SOURCE_DSIRE:dsire_program_id:5171", "electric_usage_reduction", ["refrigeration_electric_efficiency", "motor_vfd_efficiency"], "per_kwh_saved", "benchmark_range", "needs_bill", "medium", "CitySmart covers LED lighting, refrigeration, HVAC, and VFD measures; primary model is electric usage reduction."],
  ["SOURCE_DSIRE:dsire_program_id:3659", "electric_usage_reduction", ["commercial_kitchen_equipment_efficiency", "refrigeration_electric_efficiency", "motor_vfd_efficiency"], "per_unit", "cost_per_unit", "needs_equipment_details", "medium", "Prescriptive commercial rebates span LED lighting, refrigeration, kitchen equipment, VFDs, and envelope measures."],
  ["SOURCE_DSIRE:dsire_program_id:3654", "electric_usage_reduction", ["ev_charging_site_load", "refrigeration_electric_efficiency"], "per_unit", "cost_per_unit", "needs_equipment_details", "medium", "SWEPCO program includes LEDs, controls, refrigeration, pools, and EVSE; electric usage reduction is the dominant reusable model."],
  ["SOURCE_DSIRE:dsire_program_id:5513", "financing_cash_flow", ["hvac_electric_efficiency", "solar_electric_offset", "gas_usage_reduction"], "financing", "contractor_quote_required", "needs_quote", "medium", "Agricultural energy loan affects cash flow for many eligible renewable and efficiency project types."],
  ["SOURCE_DSIRE:dsire_program_id:4971", "hvac_electric_efficiency", ["project_cost_reduction_only"], "per_unit", "cost_per_unit", "needs_bill", "medium", "Commercial rebate covers heat pumps, boilers, air conditioners, geothermal, and LEDs; HVAC efficiency is the clearest primary model."],
  ["SOURCE_DSIRE:dsire_program_id:5512", "financing_cash_flow", ["hvac_electric_efficiency", "solar_electric_offset"], "financing", "contractor_quote_required", "needs_quote", "medium", "Commercial energy loan changes project affordability and can pair with several savings models depending on final project scope."],
  ["SOURCE_DSIRE:dsire_program_id:3801", "financing_cash_flow", ["hvac_electric_efficiency", "controls_building_automation", "motor_vfd_efficiency"], "financing", "contractor_quote_required", "needs_quote", "medium", "Loan program for school efficiency upgrades primarily requires cash-flow modeling plus measure-specific savings after project selection."],
  ["SOURCE_DSIRE:dsire_program_id:4633", "financing_cash_flow", ["gas_to_electric_replacement", "commercial_kitchen_equipment_efficiency", "refrigeration_electric_efficiency"], "financing", "contractor_quote_required", "needs_quote", "medium", "Business financing program supports many measures, so financing cash flow is primary and utility models are secondary."],
  ["SOURCE_DSIRE:dsire_program_id:4365", "refrigeration_electric_efficiency", ["hvac_electric_efficiency", "commercial_kitchen_equipment_efficiency", "controls_building_automation"], "per_unit", "cost_per_unit", "needs_equipment_details", "medium", "Business incentives include refrigeration, controls, HVAC, compressed air, and food-service equipment."],
  ["SOURCE_DSIRE:dsire_program_id:1613", "electric_usage_reduction", ["motor_vfd_efficiency"], "per_unit", "cost_per_unit", "needs_equipment_details", "medium", "Commercial rebate includes lighting, controls, windows, VFDs, and water heaters; primary value is avoided electric usage."],
  ["SOURCE_DSIRE:dsire_program_id:4698", "refrigeration_electric_efficiency", ["hvac_electric_efficiency", "commercial_kitchen_equipment_efficiency", "envelope_insulation_savings"], "per_unit", "cost_per_unit", "needs_equipment_details", "medium", "Ameren program explicitly covers commercial refrigeration, HVAC, food service, insulation, windows, and water heaters."],
  ["SOURCE_DSIRE:dsire_program_id:5307", "financing_cash_flow", ["solar_electric_offset", "water_sewer_reduction", "refrigeration_electric_efficiency"], "financing", "contractor_quote_required", "needs_quote", "medium", "Energy loan covers solar, water-using appliances, motors, food service, and refrigeration; financing is the direct program effect."],
  ["SOURCE_DSIRE:dsire_program_id:630", "solar_electric_offset", ["project_cost_reduction_only"], "per_kw", "cost_per_kw", "needs_bill", "medium", "Green energy incentive includes solar PV and solar thermal; electric bill offset is the primary value path for PV."],
  ["SOURCE_DSIRE:dsire_program_id:4387", "solar_electric_offset", ["project_cost_reduction_only"], "per_kw", "cost_per_kw", "needs_bill", "medium", "Municipal green energy incentive includes solar PV and solar thermal, so solar offset plus project-cost reduction applies."],
  ["SOURCE_DSIRE:dsire_program_id:21861", "grant_funding", ["battery_tou_demand_savings", "motor_vfd_efficiency", "solar_electric_offset"], "grant_amount", "contractor_quote_required", "needs_quote", "medium", "Agricultural grant funds efficiency and renewable measures including lithium-ion storage; grant value is primary until project scope is known."],
  ["SOURCE_DSIRE:dsire_program_id:1931", "battery_tou_demand_savings", ["refrigeration_electric_efficiency", "commercial_kitchen_equipment_efficiency"], "per_unit", "cost_per_kwh_storage", "needs_equipment_details", "medium", "Commercial incentives include lithium-ion, refrigeration, food service, HVAC, and lighting; battery value needs rate and demand inputs."],
  ["SOURCE_DSIRE:dsire_program_id:22773", "sales_or_property_tax_exemption", ["battery_tou_demand_savings"], "tax_exemption", "cost_per_kwh_storage", "needs_tax_review", "high", "Battery storage business equipment property tax exemption directly reduces tax/project ownership cost; storage savings are secondary."],
  ["SOURCE_DSIRE:dsire_program_id:22529", "ev_charging_site_load", ["grant_funding"], "grant_amount", "cost_per_unit", "needs_quote", "high", "Community EV charging grant covers make-ready, Level 2, and DC fast charging infrastructure."],
  ["SOURCE_DSIRE:dsire_program_id:22523", "ev_charging_site_load", ["project_cost_reduction_only"], "per_unit", "cost_per_unit", "needs_quote", "high", "PSE&G EV charging rebate affects EVSE and make-ready project cost while adding site electric load."],
  ["SOURCE_DSIRE:dsire_program_id:22546", "ev_charging_site_load", ["project_cost_reduction_only"], "per_unit", "cost_per_unit", "needs_quote", "high", "Make-ready program covers Level 2 and DC fast charging equipment; site load and project-cost offset both apply."],
  ["SOURCE_DSIRE:dsire_program_id:1935", "water_sewer_reduction", ["gas_to_electric_replacement", "solar_electric_offset"], "per_unit", "cost_per_unit", "needs_equipment_details", "low", "Residential program includes washers, dishwashers, water heaters, HVAC, solar, and EVSE; water savings are possible but business fit requires review."],
  ["SOURCE_DSIRE:dsire_program_id:1939", "water_sewer_reduction", ["gas_to_electric_replacement", "electric_usage_reduction"], "per_unit", "cost_per_unit", "needs_equipment_details", "low", "Residential rebate includes washers and dishwashers plus electric equipment; mapped to water/sewer with low confidence due residential focus."],
  ["SOURCE_DSIRE:dsire_program_id:4723", "water_sewer_reduction", ["hvac_electric_efficiency", "gas_usage_reduction"], "per_unit", "cost_per_unit", "needs_equipment_details", "low", "Residential efficiency rebate includes water heaters, washers, dishwashers, HVAC, and insulation; business applicability is uncertain."],
  ["SOURCE_DSIRE:dsire_program_id:3284", "commercial_kitchen_equipment_efficiency", ["gas_usage_reduction", "water_sewer_reduction"], "per_unit", "cost_per_unit", "needs_equipment_details", "high", "Commercial gas efficiency program includes food service equipment, dishwashers, clothes washers, water heaters, furnaces, and boilers."],
  ["SOURCE_DSIRE:dsire_program_id:5832", "commercial_kitchen_equipment_efficiency", ["hvac_electric_efficiency", "electric_usage_reduction"], "per_unit", "cost_per_unit", "needs_equipment_details", "high", "Commercial program includes dishwasher and commercial cooking equipment along with lighting and HVAC."],
  ["SOURCE_DSIRE:dsire_program_id:22561", "commercial_kitchen_equipment_efficiency", ["refrigeration_electric_efficiency", "motor_vfd_efficiency"], "per_unit", "cost_per_unit", "needs_equipment_details", "high", "Bright Energy Solutions program includes food service, dishwashers, refrigeration, VFDs, lighting, and HVAC for commercial customers."],
  ["SOURCE_DSIRE:dsire_program_id:4429", "motor_vfd_efficiency", ["controls_building_automation", "hvac_electric_efficiency"], "per_unit", "cost_per_unit", "needs_equipment_details", "high", "Commercial and industrial rebate includes VFDs, compressed air, lighting controls, and HVAC."],
  ["SOURCE_DSIRE:dsire_program_id:22560", "motor_vfd_efficiency", ["commercial_kitchen_equipment_efficiency", "refrigeration_electric_efficiency"], "per_unit", "cost_per_unit", "needs_equipment_details", "high", "Commercial efficiency rebate includes Motor VFDs, compressed air, food service, refrigeration, lighting, and HVAC."],
  ["SOURCE_DSIRE:dsire_program_id:2260", "motor_vfd_efficiency", ["commercial_kitchen_equipment_efficiency", "refrigeration_electric_efficiency"], "per_unit", "cost_per_unit", "needs_equipment_details", "high", "Commercial/industrial program includes motors, VFDs, compressed air, refrigeration, food service, and geothermal."],
  ["SOURCE_DSIRE:dsire_program_id:1544", "controls_building_automation", ["hvac_electric_efficiency", "motor_vfd_efficiency", "refrigeration_electric_efficiency"], "per_kwh_saved", "benchmark_range", "needs_bill", "medium", "Market transformation program covers controls, thermostats, VFDs, HVAC, refrigeration, insulation, and custom measures."],
  ["SOURCE_DSIRE:dsire_program_id:2458", "controls_building_automation", ["motor_vfd_efficiency", "hvac_electric_efficiency"], "per_unit", "benchmark_range", "needs_equipment_details", "medium", "Business incentives include energy management systems, thermostats, VFDs, chillers, and custom efficiency measures."],
  ["SOURCE_DSIRE:dsire_program_id:3154", "controls_building_automation", ["hvac_electric_efficiency", "refrigeration_electric_efficiency"], "per_unit", "cost_per_unit", "needs_equipment_details", "medium", "Commercial program includes thermostats, building controls, lighting controls, HVAC, and refrigeration equipment."],
  ["SOURCE_DSIRE:dsire_program_id:22183", "grant_funding", ["fleet_fuel_replacement"], "grant_amount", "cost_per_unit", "needs_quote", "high", "Clean fuels grant supports electric vehicles; grant value and fleet fuel replacement are the relevant models."],
  ["SOURCE_DSIRE:dsire_program_id:3677", "grant_funding", ["project_cost_reduction_only"], "grant_amount", "contractor_quote_required", "incentive_only", "medium", "Hydropower grant primarily reduces project cost; operational model depends on site-specific generation economics outside this sample."],
  ["SOURCE_DSIRE:dsire_program_id:5888", "grant_funding", ["solar_electric_offset", "electric_usage_reduction"], "grant_amount", "contractor_quote_required", "needs_quote", "medium", "Grant covers energy efficiency and solar; funding is primary with electric usage and solar offset as secondary models."],
  ["SOURCE_DSIRE:dsire_program_id:917", "grant_funding", ["solar_electric_offset"], "grant_amount", "contractor_quote_required", "needs_quote", "medium", "REAP grants reduce eligible renewable energy project cost; specific savings depend on selected technology."],
  ["SOURCE_DSIRE:dsire_program_id:3543", "sales_or_property_tax_exemption", ["solar_electric_offset", "battery_tou_demand_savings"], "tax_exemption", "contractor_quote_required", "needs_tax_review", "high", "Sales tax exemption applies to wind, solar, and storage high-impact business projects."],
  ["SOURCE_DSIRE:dsire_program_id:2742", "sales_or_property_tax_exemption", ["solar_electric_offset"], "tax_exemption", "contractor_quote_required", "needs_tax_review", "high", "Large-scale renewable project tax exemption reduces tax cost for eligible solar and other generation projects."],
  ["SOURCE_DSIRE:dsire_program_id:1596", "sales_or_property_tax_exemption", [], "tax_exemption", "benchmark_range", "needs_tax_review", "medium", "Property tax exemption reduces ownership cost for energy conservation improvements; bill impact depends on the underlying project."],
  ["SOURCE_DSIRE:dsire_program_id:2501", "sales_or_property_tax_exemption", ["solar_electric_offset"], "tax_exemption", "benchmark_range", "needs_tax_review", "medium", "Local-option property tax exemption applies to renewable energy systems, likely reducing project ownership cost."],
  ["SOURCE_DSIRE:dsire_program_id:3187", "pace_or_on_bill_financing", ["electric_usage_reduction", "gas_usage_reduction"], "financing", "contractor_quote_required", "needs_quote", "high", "How$mart on-bill program finances efficiency improvements and should compare payment to utility savings."],
  ["SOURCE_DSIRE:dsire_program_id:4250", "pace_or_on_bill_financing", ["project_cost_reduction_only"], "financing", "contractor_quote_required", "needs_quote", "high", "SCE on-bill financing directly affects project cash flow for non-residential efficiency projects."],
  ["SOURCE_DSIRE:dsire_program_id:5735", "financing_cash_flow", ["electric_usage_reduction", "gas_usage_reduction"], "financing", "contractor_quote_required", "needs_quote", "high", "Commercial and industrial loan program finances efficient electric and gas equipment upgrades."],
  ["SOURCE_DSIRE:dsire_program_id:679", "financing_cash_flow", ["solar_electric_offset", "controls_building_automation"], "financing", "contractor_quote_required", "needs_quote", "medium", "Loan program supports renewable energy, controls, lighting, fuel cells, and other distributed generation projects."],
  ["SOURCE_DSIRE:dsire_program_id:2628", "solar_electric_offset", ["project_cost_reduction_only", "policy_or_permitting_value"], "per_kw", "cost_per_kw", "needs_bill", "medium", "Solar rebate affects solar project economics and may depend on interconnection or compensation rules."],
  ["SOURCE_DSIRE:dsire_program_id:2526", "solar_electric_offset", ["policy_or_permitting_value"], "per_kw", "cost_per_kw", "needs_bill", "medium", "Solar electric rebate maps to solar offset; current incentive availability and future application timing require review."],
  ["SOURCE_DSIRE:dsire_program_id:5686", "policy_or_permitting_value", ["solar_electric_offset"], "unknown", "unknown", "policy_only", "low", "Solar renewable energy credit program creates policy/market value rather than straightforward bill savings; REC treatment requires review."],
  ["SOURCE_DSIRE:dsire_program_id:4790", "policy_or_permitting_value", [], "unknown", "unknown", "policy_only", "high", "Expedited sustainable building permit program affects project timeline and feasibility, not direct bill savings."]
];

if (!fs.existsSync(scanPath)) {
  throw new Error(`Opportunity scan file not found: ${scanPath}`);
}

const scan = JSON.parse(fs.readFileSync(scanPath, "utf8"));
const opportunities = scan.Items.map((item) => unmarshall(item));
const opportunityById = new Map(opportunities.map((item) => [item.opportunityId, item]));

const mapping = sampleClassifications.map(([opportunityId, primary, secondary, incentiveMethod, costMethod, readiness, confidence, reason]) => {
  const opportunity = opportunityById.get(opportunityId);
  if (!opportunity) {
    throw new Error(`Sample opportunity was not present in scan: ${opportunityId}`);
  }

  const models = [primary, ...secondary].map((id) => modelById.get(id)).filter(Boolean);
  const primaryModel = modelById.get(primary);

  return {
    opportunity_id: opportunityId,
    opportunity_name: opportunity.canonicalTitle || opportunity.normalizedTitle || opportunityId,
    primary_savings_model_id: primary,
    secondary_savings_model_ids: secondary,
    affected_bill_types: unique(models.flatMap((item) => item.affected_bill_types)),
    required_bill_fields: unique(primaryModel.required_bill_fields),
    optional_bill_fields: unique(models.flatMap((item) => item.optional_bill_fields)),
    required_non_bill_inputs: unique(primaryModel.required_non_bill_inputs),
    optional_non_bill_inputs: unique(models.flatMap((item) => item.optional_non_bill_inputs)),
    incentive_value_method: incentiveMethod,
    project_cost_estimation_method: costMethod,
    calculation_readiness: readiness,
    confidence,
    classification_reason: reason,
    missing_data_prompts: primaryModel.missing_data_prompts,
    manual_review_required: true
  };
});

writeJson("savings_models.json", savingsModels);
writeJson("bill_field_dictionary.json", billFields);
writeJson("opportunity_savings_mapping.sample.json", mapping);
writeCsv("opportunity_savings_mapping_import.sample.csv", mapping);
writeReport("savings_model_coverage_report.sample.md", mapping, opportunities);

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function writeJson(filename, value) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(path.join(dataDir, filename), `${JSON.stringify(value, null, 2)}\n`);
}

function writeCsv(filename, records) {
  const columns = [
    "opportunity_id",
    "primary_savings_model_id",
    "secondary_savings_model_ids",
    "affected_bill_types",
    "required_bill_fields",
    "optional_bill_fields",
    "required_non_bill_inputs",
    "incentive_value_method",
    "project_cost_estimation_method",
    "calculation_readiness",
    "confidence",
    "manual_review_required"
  ];
  const lines = [
    columns.join(","),
    ...records.map((record) =>
      columns
        .map((column) => {
          const value = record[column];
          const normalized = Array.isArray(value) ? value.join("|") : String(value ?? "");
          return `"${normalized.replaceAll('"', '""')}"`;
        })
        .join(",")
    )
  ];
  fs.writeFileSync(path.join(dataDir, filename), `${lines.join("\n")}\n`);
}

function writeReport(filename, records, allOpportunities) {
  const byModel = countBy(records, (record) => record.primary_savings_model_id);
  const byConfidence = countBy(records, (record) => record.confidence);
  const manualReviewCount = records.filter((record) => record.manual_review_required).length;
  const uncertain = records.filter((record) => record.confidence === "low" || record.calculation_readiness === "unknown" || record.calculation_readiness === "policy_only");
  const lines = [
    "# Savings Model Coverage Report - Sample",
    "",
    "## Source Database",
    "",
    "- Source table inspected: `gbs-opportunity-candidates`",
    "- Source route using the table: `/database`, backed by admin-protected `/api/database/*` endpoints",
    `- DynamoDB rows available in read-only scan: ${allOpportunities.length}`,
    "- Production opportunity records were not mutated.",
    "",
    "## Available Opportunity Fields",
    "",
    "The current opportunity candidate rows include `opportunityId`, `sourceKey`, `sourceName`, `sourceUrl`, `externalId`, `externalIdType`, `canonicalTitle`, `normalizedTitle`, `status`, `state`, `stateName`, `category`, `categoryId`, `programType`, `programTypeId`, `summary`, `summaryHtml`, `websiteUrl`, `lastUpdated`, `sourceCreatedAt`, `startDate`, `endDate`, `fundingSource`, `budget`, `details`, `geography`, `administrator`, `implementingSector`, `sectors`, `eligibleSectors`, `technologies`, `technologyRecords`, `parameterSets`, `ingestionMode`, `recordKind`, `contentHash`, `previousContentHash`, `dsire`, `dsireClone`, `evidence`, `raw`, `dataQuality`, `reviewStatus`, `reviewNotes`, `duplicateOf`, `reviewedAt`, `reviewedBy`, `ingestRunId`, `firstSeenAt`, `lastSeenAt`, `createdAt`, and `updatedAt`.",
    "",
    "## Sample Summary",
    "",
    `- Sampled opportunities analyzed: ${records.length}`,
    `- Savings models in library: ${savingsModels.length}`,
    `- Bill/document fields in dictionary: ${billFields.length}`,
    `- Manual-review mappings: ${manualReviewCount}`,
    "",
    "## Primary Model Coverage",
    "",
    "| Savings model | Count | Percent |",
    "| --- | ---: | ---: |",
    ...Object.entries(byModel)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([modelId, count]) => `| \`${modelId}\` | ${count} | ${Math.round((count / records.length) * 100)}% |`),
    "",
    "## Confidence Coverage",
    "",
    "| Confidence | Count |",
    "| --- | ---: |",
    ...["high", "medium", "low"].map((key) => `| ${key} | ${byConfidence[key] || 0} |`),
    "",
    "## Unmapped Or Uncertain Opportunities",
    "",
    ...uncertain.map((record) => `- \`${record.opportunity_id}\` - ${record.opportunity_name}: ${record.confidence} confidence, ${record.calculation_readiness}.`),
    "",
    "## Ambiguous Categories",
    "",
    "- Broad commercial energy-efficiency programs often include lighting, HVAC, refrigeration, controls, motors, and custom measures in one record. These should keep one primary model and multiple secondary models until a matched business selects a concrete project scope.",
    "- Loans, PACE, and on-bill financing do not create direct utility savings by themselves. They should attach to `financing_cash_flow` or `pace_or_on_bill_financing`, then add measure-specific secondary models after project scope is known.",
    "- Tax exemptions and credits usually require tax-review inputs even when the underlying project has clear bill savings.",
    "- Residential-only programs appeared in the sample because the source database contains them. They are mapped with low confidence where business applicability is uncertain.",
    "- SREC, net-metering, interconnection, and expedited-permit records should stay in `policy_or_permitting_value` unless an explicit cash compensation formula is captured.",
    "",
    "## Recommended Savings Model Library Changes",
    "",
    "- Add a future `renewable_generation_credit_market_value` model if SREC, REC, or performance-credit programs become common in business matches.",
    "- Add program-rule fields for incentive caps, eligible-cost percentage, maximum award, and application deadline before importing mappings into production tables.",
    "- Consider a final `whole_building_custom_efficiency` model for custom C&I programs that require engineering studies instead of prescriptive equipment inputs.",
    "",
    "## Recommendation",
    "",
    "The sample is good enough to review the model taxonomy and import shape, but not yet good enough to run automatically across the full database. Recommended next step: review these 50 mappings with Neer, add any missing model types, then run a dry-run classifier over the full database with all low-confidence rows queued for manual review."
  ];
  fs.writeFileSync(path.join(dataDir, filename), `${lines.join("\n")}\n`);
}

function countBy(records, keyFn) {
  return records.reduce((counts, record) => {
    const key = keyFn(record);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}
