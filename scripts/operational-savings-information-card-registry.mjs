const CARD_COPY = {
  "ITC-01": {
    title: "Commercial Building Upgrade Resource Savings",
    overview: "These building envelope, lighting, heating, cooling, and ventilation upgrades reduce annual electricity or fuel use compared with a matched commercial-building baseline."
  },
  "ITC-02": {
    title: "Exterior Lighting Replacement",
    overview: "Exterior lighting replacement reduces electricity use by lowering fixture input power while preserving the required lighting application and operating schedule."
  },
  "ITC-03": {
    title: "High-Efficiency Furnace Replacement",
    overview: "A high-efficiency furnace supplies the same heating service with less annual fuel by improving the certified conversion efficiency."
  },
  "ITC-04": {
    title: "Boiler Controls and Burner Improvements",
    overview: "Improved boiler controls and burner operation reduce fuel use by changing how the boiler responds to load and operating conditions."
  },
  "ITC-05": {
    title: "Duct Sealing and Insulation",
    overview: "Duct sealing and insulation reduce heating and cooling losses between the HVAC equipment and the occupied space."
  },
  "ITC-06": {
    title: "Heat Pump Water Heater",
    overview: "A heat pump water heater replaces part or all of the existing water-heating fuel or electricity with efficient electric heat-pump operation."
  },
  "ITC-07": {
    title: "High-Efficiency Gas Water Heater",
    overview: "A higher-efficiency gas water heater reduces the gas required to deliver the same annual hot-water load."
  },
  "ITC-08": {
    title: "Solar Water Heating",
    overview: "A solar water-heating system supplies useful thermal energy that displaces electricity, gas, or liquid fuel otherwise used by the backup water heater."
  },
  "ITC-09": {
    title: "Water-Heating Recirculation Controls",
    overview: "Recirculation controls reduce pipe heat loss and pump electricity by limiting hot-water circulation to the periods when it is needed."
  },
  "ITC-10": {
    title: "High-Efficiency Refrigeration Equipment",
    overview: "Certified high-efficiency refrigeration equipment reduces annual electricity use for the same refrigerated service."
  },
  "ITC-11": {
    title: "Refrigeration Controls and Heat-Loss Reduction",
    overview: "Refrigeration controls, anti-sweat heater controls, gaskets, curtains, and night covers reduce the affected refrigeration load."
  },
  "ITC-12": {
    title: "Refrigeration EC Motor Replacement",
    overview: "Electronically commutated refrigeration motors reduce input power while providing the same motor and fan duty."
  },
  "ITC-13": {
    title: "Efficient Ice Machine",
    overview: "An efficient ice machine uses less electricity and potable water for the same annual quantity and type of ice production."
  },
  "ITC-14": {
    title: "Building Envelope and Control Upgrade Screening",
    overview: "These envelope, roof, door, automation, and energy-management measures reduce modeled building electricity or fuel use when an exact supported measure and building segment are available."
  },
  "ITC-15": {
    title: "Studies, Monitoring, Certifications, and Enabling Work",
    overview: "These activities may identify or enable future improvements, but they do not directly reduce a purchased operating resource on their own."
  },
  "ITC-16": {
    title: "Automated Demand Response",
    overview: "Automated demand response changes interval electric load during eligible events and can reduce utility charges under the applicable tariff."
  },
  "ITC-17": {
    title: "Solar Photovoltaic Generation",
    overview: "Rooftop, ground-mounted, and carport solar arrays generate electricity that offsets site purchases and may create credited exports."
  },
  "ITC-18": {
    title: "Community Solar Subscription",
    overview: "A community solar subscription changes the electric bill through contracted energy credits and subscription charges."
  },
  "ITC-19": {
    title: "Small Wind Generation",
    overview: "A small wind turbine generates electricity that offsets site purchases and may create credited exports when the wind resource and turbine are specified."
  },
  "ITC-20": {
    title: "Fuel Cell Electricity Generation",
    overview: "A fuel cell converts purchased fuel into onsite electricity, reducing grid purchases while adding fuel use."
  },
  "ITC-21": {
    title: "Combined Heat and Power",
    overview: "Combined heat and power produces onsite electricity and useful heat from fuel, displacing grid electricity and boiler fuel when both outputs coincide with site demand."
  },
  "ITC-22": {
    title: "Biomass or Biogas Energy System",
    overview: "A biomass or biogas system converts an available fuel into electricity and useful heat that can displace purchased site resources."
  },
  "ITC-23": {
    title: "Battery Storage Dispatch",
    overview: "Battery storage shifts electric imports across time and changes energy and demand charges under a complete interval tariff."
  },
  "ITC-24": {
    title: "Solar Plus Storage",
    overview: "A combined solar and battery system coordinates onsite generation, charging, discharging, imports, and exports to change the annual electric bill."
  },
  "ITC-25": {
    title: "Thermal Energy Storage",
    overview: "Thermal storage shifts heating or cooling production across time and changes the electricity required during different tariff periods."
  },
  "ITC-26": {
    title: "Microgrid System",
    overview: "A microgrid coordinates selected generation, storage, fuel, and grid resources as one interval system to change direct energy purchases."
  },
  "ITC-27": {
    title: "Public Electric Vehicle Charging",
    overview: "Public charging equipment adds active charging and standby electricity to the site load, producing an annual bill impact rather than an automatic savings value."
  },
  "ITC-28": {
    title: "Fleet Charging Infrastructure",
    overview: "Fleet charging infrastructure converts vehicle travel needs and charging schedules into added interval electric load and utility cost."
  },
  "ITC-29": {
    title: "Electric Vehicle Purchase",
    overview: "Replacing a light-duty fuel vehicle with an electric vehicle avoids gasoline use and adds electricity use for the same confirmed annual service."
  },
  "ITC-30": {
    title: "Electric Forklift or Material Handling Equipment",
    overview: "Electric material-handling equipment replaces hourly fuel use with charging electricity for the same operating duty."
  },
  "ITC-31": {
    title: "Managed Fleet Charging",
    overview: "Managed charging shifts fleet electricity use within vehicle availability windows to reduce tariff costs without missing required departure energy."
  },
  "ITC-32": {
    title: "Low-Flow Plumbing Fixtures",
    overview: "Low-flow fixtures reduce potable water use and may also reduce the energy needed to heat the avoided hot water."
  },
  "ITC-33": {
    title: "High-Efficiency Toilets and Urinals",
    overview: "High-efficiency toilets and urinals reduce potable water use by lowering gallons per flush for the same annual use."
  },
  "ITC-34": {
    title: "Efficient Irrigation and Smart Controls",
    overview: "Efficient irrigation methods and smart controls reduce the modeled landscape water allowance for the same climate and planted area."
  },
  "ITC-35": {
    title: "Measured Water Leak Repair",
    overview: "A leak detection system produces attributable water savings only after a measured leak is identified and repaired."
  },
  "ITC-36": {
    title: "Cooling Tower Optimization",
    overview: "Cooling tower optimization reduces makeup water through improved cycles of concentration and may reduce fan electricity through better control."
  },
  "ITC-37": {
    title: "Demand-Controlled Kitchen Ventilation",
    overview: "Demand-controlled kitchen ventilation reduces fan power and conditioned makeup-air load by matching airflow to cooking activity."
  },
  "ITC-38": {
    title: "High-Efficiency Motor Replacement",
    overview: "A high-efficiency motor reduces electric input while delivering the same shaft power, speed, load, and operating hours."
  },
  "ITC-39": {
    title: "Variable Frequency Drives and Pump or Fan Controls",
    overview: "Variable-speed controls reduce pump or fan electricity by matching equipment speed and input power to the annual load profile."
  },
  "ITC-40": {
    title: "Efficient Pump Replacement",
    overview: "An efficient pump and motor reduce electric input while preserving the required flow and total dynamic head."
  },
  "ITC-41": {
    title: "Efficient Fan or Ventilation System",
    overview: "An efficient fan, blower, or ventilation system reduces electric input while preserving required airflow and pressure."
  },
  "ITC-42": {
    title: "Efficient Air Compressor",
    overview: "An efficient air compressor reduces electricity per unit of delivered compressed air at the required pressure."
  },
  "ITC-43": {
    title: "Compressed Air Leak Repair",
    overview: "Repairing measured compressed-air leaks avoids the compressor electricity previously required to supply the lost air."
  },
  "ITC-44": {
    title: "Compressed Air Controls",
    overview: "Improved compressor controls reduce input power across the annual load profile while preserving flow and pressure requirements."
  },
  "ITC-45": {
    title: "Waste Heat Recovery",
    overview: "Waste heat recovery captures otherwise discarded thermal energy to displace purchased heating resources, net of auxiliary electricity."
  },
  "ITC-46": {
    title: "Industrial Process Electrification",
    overview: "Industrial heat pumps and other thermal process electrification replace purchased fuel with electricity for the same useful process heat."
  },
  "ITC-47": {
    title: "Steam Trap Replacement",
    overview: "Replacing failed steam traps reduces steam loss and the boiler fuel needed to produce that lost steam."
  },
  "ITC-48": {
    title: "Induction Cooking Equipment",
    overview: "Induction cooking replaces an existing cooking fuel with electricity for an identical tested cooking duty."
  },
  "ITC-49": {
    title: "Walk-In Cooler or Freezer Upgrade",
    overview: "A walk-in refrigeration upgrade reduces whole-system annual electricity for the same box load and operating duty."
  },
  "ITC-50": {
    title: "High-Efficiency Commercial Cooking Equipment",
    overview: "Efficient fryers, ovens, and steamers reduce active and idle electricity or gas use for the same certified cooking duty."
  },
  "ITC-51": {
    title: "Air Filtration System",
    overview: "An air filtration project changes fan electricity through its airflow, filter pressure rise, fan efficiency, and operating schedule."
  },
  "ITC-52": {
    title: "High-Efficiency Commercial Dishwasher",
    overview: "An efficient commercial dishwasher reduces water, water-heating input, and idle electricity for the same certified washing activity."
  },
  "ITC-53": {
    title: "High-Efficiency Commercial Laundry Equipment",
    overview: "Efficient commercial laundry equipment reduces water, machine electricity, and water-heating input for the same annual cycle duty."
  },
  "ITC-54": {
    title: "Backup Power Routine Resource Use",
    overview: "Backup power equipment can add routine testing fuel and standby electricity even when outage operation and resilience value are excluded."
  }
};

const PROCESS_LIBRARY = {
  "STD-COMSTOCK-ANNUAL-DELTA": {
    name: "Commercial Building Upgrade Resource Model",
    sourceName: "National Laboratory of the Rockies - ComStock 2025 Release 3",
    valueNeeded: "Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units",
    match: /ComStock/i,
    strategy: "Versioned local dataset lookup with an approved retrofit-to-measure crosswalk.",
    method: "Download the documented ComStock release, apply the reviewed building and measure filters, and calculate the eligible weighted resource delta locally.",
    difficulty: "Medium to Hard",
    validation: "The official release pages, upgrade documentation, and reference method were checked. A retained aggregate fixture and reviewed category crosswalk do not yet exist, so this process cannot currently return a project estimate or claim project-specific equipment performance."
  },
  "STD-SCOUT-ECM-SCREEN": {
    name: "Building Measure Performance Screen",
    sourceName: "U.S. Department of Energy - Scout",
    valueNeeded: "Documented resource-reduction factor for the approved measure and market segment, with source version and units",
    match: /Scout|ECM factor/i,
    strategy: "Versioned local lookup of an explicitly approved Scout measure and market segment.",
    method: "Load the pinned Scout definitions, apply the reviewed retrofit crosswalk and segment filters, and return the documented resource-reduction factor.",
    difficulty: "Medium",
    validation: "The official Scout program, summaries, and source repository were checked. The exact category crosswalk and performance-field fixtures remain unverified, so keyword matching and generic reduction defaults are not supported."
  },
  "STD-DOE-CCMS-RATINGS": {
    name: "DOE Certified Equipment Rating Lookup",
    sourceName: "U.S. Department of Energy - Compliance Certification Database",
    valueNeeded: "Certified performance fields for one exact compatible basic model, with units and record provenance",
    match: /DOE|CCMS|certified|rating/i,
    strategy: "Product-specific certification export matched to an exact basic model.",
    method: "Download the applicable product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family.",
    difficulty: "Medium",
    validation: "The public certification database and product-specific templates were checked. A retained product export and category adapter are not yet present, and the source does not provide a representative installed-equipment baseline, so only a later exact-record path can be supported."
  },
  "STD-ENERGY-STAR-PRODUCT-DATA": {
    name: "ENERGY STAR Product Rating Lookup",
    sourceName: "U.S. Environmental Protection Agency - ENERGY STAR Product Finder",
    valueNeeded: "Current certified product performance fields for one exact compatible model, with units and record provenance",
    match: /ENERGY STAR|charger|product|certified/i,
    strategy: "Product-family dataset lookup with exact model and specification filters.",
    method: "Use the official download or API, normalize product identifiers, filter to the applicable active specification, reject ambiguous matches, and return the required certified fields.",
    difficulty: "Easy to Medium",
    validation: "The official Product Finder access path and product-family datasets were checked. The commercial dishwasher fixture validates selected proposed-product fields, but other product-family adapters and all generic existing-equipment baselines remain unverified."
  },
  "STD-DOE-MEASUR": {
    name: "DOE MEASUR Engineering Calculation",
    sourceName: "U.S. Department of Energy - MEASUR",
    valueNeeded: "Existing and proposed annual resource use or avoided resource use, with calculator version, input units, and warnings",
    match: /MEASUR|motor performance|pump assessment|fan assessment|compressed-air|steam-loss|process-heat/i,
    strategy: "Pinned local execution of the exact MEASUR calculator for this category.",
    method: "Map the supplied project facts and units to the named calculator, run the versioned open-source calculation locally, reject incomplete or incompatible inputs, and return its existing and proposed resource results.",
    difficulty: "Medium to Hard",
    validation: "The official MEASUR tool page, calculator descriptions, and open-source implementation were checked, so local automation is feasible. The exact category module, input and output mapping, and golden example have not yet been pinned, so this process must not imply executable validation."
  },
  "STD-SAM-SOLAR-THERMAL": {
    name: "Solar Thermal Production Simulation",
    sourceName: "National Laboratory of the Rockies - System Advisor Model",
    valueNeeded: "Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version",
    match: /SAM solar|solar-thermal/i,
    strategy: "Versioned local SAM simulation using explicit system, weather, load, and backup inputs.",
    method: "Validate the project configuration, select the site weather data, run the solar water-heating model, cap useful output at the delivered load, and convert displaced backup energy to its billed unit.",
    difficulty: "Hard",
    validation: "The official SAM tool and open-source repository were checked, and local simulation is possible. No retained category fixture or golden calculation exists, and SAM does not supply missing collector design, hot-water load, or backup-system inputs."
  },
  "STD-PVWATTS-V8": {
    name: "PVWatts Solar Production Calculation",
    sourceName: "National Laboratory of the Rockies - PVWatts V8",
    valueNeeded: "Interval or annual AC electricity generation, with model inputs, warnings, units, and source version",
    match: /PVWatts|PV .*generation/i,
    strategy: "PVWatts V8 API or pinned local SAM execution with the same explicit array inputs.",
    method: "Validate site coordinates and array design, run the documented V8 field contract, check warnings, and return interval or annual AC generation with source provenance.",
    difficulty: "Medium",
    validation: "The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project. The category adapter and formula-level golden test have not yet been added."
  },
  "STD-WIND-SAM": {
    name: "Small Wind Production Simulation",
    sourceName: "National Laboratory of the Rockies - WIND Toolkit and System Advisor Model",
    valueNeeded: "Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance",
    match: /WIND|wind .*generation/i,
    strategy: "Versioned wind-resource retrieval followed by a local SAM turbine power-curve simulation.",
    method: "Resolve site resource data at the selected height and year, validate the exact turbine power curve and losses, run the model, and return interval and annual AC generation.",
    difficulty: "Hard",
    validation: "The official WIND Toolkit access path and SAM implementation were checked. A retained turbine and resource fixture is still absent, and the source cannot choose the turbine, power curve, hub height, or losses for the project."
  },
  "STD-REOPT-LOCAL-DISPATCH": {
    name: "Interval Dispatch and Bill Comparison",
    sourceName: "National Laboratory of the Rockies - REopt V3 and REopt.jl",
    valueNeeded: "Baseline and proposed annual bills and interval dispatch results, with tariff, solver, input, and unit provenance",
    match: /REopt|dispatch|bill result/i,
    strategy: "Pinned local REopt.jl optimization after complete chronological load, tariff, and technology inputs pass validation.",
    method: "Align the interval load and tariff calendar, apply the category constraints, solve baseline and proposed cases, compare bill components, and retain solver and input provenance.",
    difficulty: "Hard",
    validation: "The official V3 input documentation and open-source solver were checked, so local optimization is technically possible. No category dispatch adapter or golden result is retained, and REopt cannot supply a missing load profile, tariff, or technology design."
  },
  "STD-EPA-CHP-PERFORMANCE": {
    name: "Onsite Generation Performance Balance",
    sourceName: "U.S. Environmental Protection Agency - CHP technologies and calculator",
    valueNeeded: "Annual electricity generation, input fuel, and useful recovered heat for the selected technology and capacity",
    match: /CHP|fuel-cell|technology and fuel|performance by technology|Electric efficiency/i,
    strategy: "Versioned technology-class lookup followed by a transparent heat-and-power energy balance.",
    method: "Select the compatible technology and capacity row, apply the explicit operating and coincidence constraints, calculate electricity, fuel, and useful heat, and cap outputs at site loads.",
    difficulty: "Medium to Hard",
    validation: "The official technology pages, efficiency method, and calculator download were checked. The category adapter and retained source fixture are still absent, and the source does not identify an exact unit or supply site capacity, schedule, or thermal coincidence."
  },
  "STD-FUELECONOMY-VEHICLES": {
    name: "Exact Vehicle Efficiency Lookup",
    sourceName: "U.S. Department of Energy and U.S. Environmental Protection Agency - FuelEconomy.gov",
    valueNeeded: "Exact-record fuel economy or electricity use per distance, with units and vehicle-record provenance",
    match: /Vehicle|FuelEconomy/i,
    strategy: "Local exact-record lookup from the official downloadable vehicle table.",
    method: "Normalize make, model, approximate year, and needed drivetrain details, require one compatible existing and proposed record, convert the returned efficiencies to per-mile use, and store the matched record provenance.",
    difficulty: "Easy to Medium",
    validation: "The official downloadable schema and exact records were checked. The retained fixture validates record identity, efficiency fields, units, source version, and the golden calculation. Class-based estimates remain disabled because no compatible population and sample-size fixture has been reviewed."
  },
  "STD-WATERSENSE-FIXTURES": {
    name: "WaterSense Fixture Rating Resolution",
    sourceName: "U.S. Environmental Protection Agency - WaterSense",
    valueNeeded: "Applicable proposed flow rate or flush volume for the exact product or compatible requirement set, with units and source provenance",
    match: /Rated flow|Rated gallons|fixture performance/i,
    strategy: "Specification lookup for an exact proposed fixture or a compatible WaterSense requirement.",
    method: "Identify the fixture type and application, validate an exact model or requirement set, return the applicable rated flow or flush volume, and retain the specification and source location.",
    difficulty: "Easy to Medium",
    validation: "The official WaterSense commercial resources, best-practice guide, and fixture criteria were checked. Proposed performance can be supported after an exact specification match, but existing installed ratings and commercial usage frequency remain separate unresolved inputs."
  },
  "STD-WATERSENSE-LANDSCAPE": {
    name: "Landscape Water Budget Calculation",
    sourceName: "U.S. Environmental Protection Agency - WaterSense Water Budget Tool",
    valueNeeded: "Baseline and proposed annual design water allowances, with climate, hydrozone, efficiency, unit, and method provenance",
    match: /Water Budget|Climate data/i,
    strategy: "Deterministic implementation of the versioned Water Budget Tool equations.",
    method: "Resolve climate data, validate hydrozone areas and plant factors, apply existing and proposed irrigation efficiencies, and compare the two annual design allowances.",
    difficulty: "Medium",
    validation: "The official Version 2.0 scope and equations were checked, and the retained fixture validates the design-method boundary. The tool compares designed allowances and does not prove actual existing consumption, irrigation scheduling, or whole-site bill allocation. The category adapter and formula-level golden test have not yet been added."
  },
  "STD-WATERSENSE-CI-OPERATIONS": {
    name: "WaterSense Commercial Operations Calculation",
    sourceName: "U.S. Environmental Protection Agency - WaterSense at Work",
    valueNeeded: "Annual avoidable water for the selected commercial-facility equation, with measured inputs, units, and dates",
    match: /WaterSense|water balance|measured-leak/i,
    strategy: "Deterministic implementation of the exact applicable WaterSense commercial-facility equation.",
    method: "Validate measured project inputs, apply the selected equation with explicit units and dates, reject missing physical observations, and return annual avoidable water.",
    difficulty: "Medium",
    validation: "The official commercial best-practice and facility-tool pages were checked. Exact page, equation, and worked-example fixtures have not yet been retained, so the process cannot use generic site defaults or claim an executable default path."
  },
  "STD-FEMP-EXTERIOR-LIGHTING": {
    name: "Exterior Lighting Product Resolution",
    sourceName: "U.S. Department of Energy FEMP and DesignLights Consortium",
    valueNeeded: "Documented input watts for the compatible exterior-lighting product or requirement path",
    match: /fixture|lighting|Product Resolution/i,
    strategy: "Application-specific source lookup with explicit exact-product or requirement-based routing.",
    method: "Identify the lighting application, apply the opportunity restrictions, query an approved product source when available, reject incompatible candidates, and return documented fixture input power.",
    difficulty: "Medium",
    validation: "The reviewed FEMP tables validate proposed efficacy requirements and one narrow wall-mounted example. They do not supply a general installed legacy-wattage distribution or an exact product catalog, so those paths must return no value until separate sources are fixture-validated."
  },
  "STD-OPERATING-SCHEDULE": {
    name: "Annual Operating Hours Calculation",
    sourceName: "U.S. Department of Energy reference buildings and U.S. Naval Observatory daylight data",
    valueNeeded: "Annual operating hours, exact or estimated status, schedule formula, analysis year, uncertainty, and source provenance",
    match: /operating-hours|Schedule Resolution|Annual operating hours/i,
    strategy: "Deterministic calendar or daylight calculation from a recognizable operating pattern.",
    method: "Route the stated pattern to a fixed-schedule or daylight method, apply all supplied days and seasonal details, validate the annual-hour result, and retain the method and analysis year.",
    difficulty: "Easy to Medium",
    validation: "The DOE schedule context and USNO daylight definitions and API were checked. Exact calendar arithmetic and daylight calculation are feasible when all inputs are supplied, but a business label alone is not a validated annual-hours value and no category golden fixture exists."
  }
};

const PRODUCT_CATEGORY_LABELS = {
  "ITC-03": "Furnace",
  "ITC-06": "Water Heater",
  "ITC-07": "Gas Water Heater",
  "ITC-10": "Refrigeration Equipment",
  "ITC-13": "Ice Machine",
  "ITC-50": "Cooking Equipment",
  "ITC-52": "Commercial Dishwasher",
  "ITC-53": "Commercial Washer"
};

const ENERGY_STAR_LINK_SELECTIONS = {
  "ITC-06": ["ENERGY STAR Product Finder datasets and API"],
  "ITC-07": ["ENERGY STAR Product Finder datasets and API"],
  "ITC-10": ["ENERGY STAR Product Finder datasets and API"],
  "ITC-13": ["ENERGY STAR Product Finder datasets and API", "commercial ice machine dataset"],
  "ITC-27": ["ENERGY STAR Product Finder datasets and API", "EV charger product criteria and finder"],
  "ITC-28": ["ENERGY STAR Product Finder datasets and API", "EV charger product criteria and finder"],
  "ITC-50": [
    "ENERGY STAR Product Finder datasets and API",
    "commercial fryer dataset",
    "commercial oven dataset",
    "commercial steam cooker dataset"
  ],
  "ITC-52": ["ENERGY STAR Product Finder datasets and API", "commercial dishwasher dataset"],
  "ITC-53": ["ENERGY STAR Product Finder datasets and API", "commercial clothes washer dataset"]
};

const CCMS_LINK_SELECTIONS = [
  "Compliance Certification Database",
  "CCMS and database description",
  "product-specific certification and test-result templates"
];

const MEASUR_CATEGORY_MODULES = {
  "ITC-04": "Steam System Assessment Tool boiler and operating-state model",
  "ITC-09": "Pumping System Assessment Tool for pump electricity plus the displayed local thermal-loss calculation",
  "ITC-12": "Motor Inventory and Motor Performance calculators",
  "ITC-36": "Cooling Tower Water Assessment",
  "ITC-37": "Fan System Assessment Tool",
  "ITC-38": "Motor Inventory and Motor Performance calculators",
  "ITC-39": "Pumping System Assessment Tool for pumps or Fan System Assessment Tool for fans",
  "ITC-40": "Pumping System Assessment Tool",
  "ITC-41": "Fan System Assessment Tool",
  "ITC-42": "Compressed Air Assessment",
  "ITC-43": "Compressed Air Assessment leak-loss calculation",
  "ITC-44": "Compressed Air Assessment control-profile calculation",
  "ITC-45": "Process Heating Assessment waste-heat calculation",
  "ITC-46": "Process Heating Assessment",
  "ITC-47": "Steam System Assessment Tool steam-loss calculation",
  "ITC-51": "Fan System Assessment Tool"
};

const USER_LIKELY_KNOWN_PATTERN =
  /(?:count|type or application|make and model|model year|business activity|business hours|hours per operating day|days per week|weeks per year|operating pattern|usage pattern|control type|fuel type|vehicle class|service need|same business service|landscape area|plant or landscape type|sessions per operating day|uses per operating day|flushes per operating day|racks per operating day|annual miles|fleet miles|annual cycles|operating days|backup technology)/i;

const PROJECT_DOCUMENT_PATTERN =
  /(?:nameplate|measurement|measured|documented|uploaded|audit|commissioning|controls trend|operating record|manufacturer|label|test information|if known)/i;

const IDENTIFIER_LABELS = new Map([
  ["annual_energized_hours_per_unit", "Annual Energized Hours per Unit"],
  ["annual_active_wash_hours_per_unit", "Annual Active Wash Hours per Unit"],
  ["annual_idle_hours_per_unit", "Annual Idle Hours per Unit"],
  ["baseline_design_allowance_gallons", "Baseline Design Water Allowance"],
  ["proposed_design_allowance_gallons", "Proposed Design Water Allowance"],
  ["current_annual_refrigeration_kWh", "Current Annual Refrigeration Electricity"],
  ["proposed_annual_refrigeration_kWh", "Proposed Annual Refrigeration Electricity"],
  ["current_annual_cooking_fuel", "Current Annual Cooking Fuel"],
  ["proposed_annual_induction_kWh", "Proposed Annual Induction Electricity"],
  ["annual_cooking_activity", "Annual Cooking Activity"],
  ["proposed_tested_kWh_per_activity_unit", "Proposed Tested Electricity per Activity Unit"],
  ["annual_hot_water_load", "Annual Hot-Water Load"],
  ["SAM_output", "Simulated Solar Thermal Output"],
  ["useful_solar_thermal_output", "Useful Solar Thermal Output"],
  ["avoided_backup_resource", "Avoided Backup Resource"],
  ["backup_efficiency", "Backup-System Efficiency"],
  ["backup_resource_unit", "Backup-Resource Unit"],
  ["annual_delivered_hot_water_load", "Annual Delivered Hot-Water Load"],
  ["avoided_distribution_heat", "Avoided Distribution Heat"],
  ["existing_distribution_heat", "Existing Distribution Heat"],
  ["proposed_distribution_heat", "Proposed Distribution Heat"],
  ["avoided_thermal_input", "Avoided Heating Input"],
  ["heater_efficiency", "Water-Heater Efficiency"],
  ["heating_resource_unit", "Heating-Resource Unit"],
  ["avoided_pump_kWh", "Avoided Pump Electricity"],
  ["pump_kW", "Pump Input Power"],
  ["avoided_run_hours", "Avoided Pump Run Hours"],
  ["state_of_charge_t", "Battery State of Charge in Each Interval"],
  ["state_of_charge_(t-1)", "Battery State of Charge in the Prior Interval"],
  ["thermal_state_t", "Thermal Storage State in Each Interval"],
  ["thermal_state_(t-1)", "Thermal Storage State in the Prior Interval"],
  ["charging_input_kWh_t", "Charging Electricity in Each Interval"],
  ["standby_kWh_t", "Standby Electricity in Each Interval"],
  ["charge_t", "Charging Energy in Each Interval"],
  ["discharge_t", "Discharging Energy in Each Interval"],
  ["standing_loss_t", "Standing Thermal Loss in Each Interval"],
  ["delivered_kWh_t", "Delivered Charging Energy in Each Interval"],
  ["active_efficiency", "Active Charging Efficiency"],
  ["standby_power_kW", "Standby Power"],
  ["noncharging_interval_hours_t", "Noncharging Hours in Each Interval"],
  ["vehicle_kWh_per_mile", "Vehicle Electricity per Mile"],
  ["proposed_combE", "Proposed Vehicle Electricity per 100 Miles"],
  ["annual_vehicle_kWh", "Annual Vehicle Electricity"],
  ["fleet_annual_miles", "Annual Fleet Miles"],
  ["standby_kWh", "Annual Standby Electricity"],
  ["installed_ports", "Installed Charging Ports"],
  ["standby_kW_per_port", "Standby Power per Port"],
  ["noncharging_hours", "Annual Noncharging Hours"],
  ["avoided_gallons", "Avoided Gallons"],
  ["annual_miles", "Annual Miles"],
  ["existing_combined_mpg", "Existing Vehicle Combined Fuel Economy"],
  ["added_kWh", "Added Electricity"],
  ["annual_racks_per_unit", "Annual Racks per Unit"],
  ["water_per_rack_existing", "Existing Water per Rack"],
  ["water_per_rack_proposed", "Proposed Water per Rack"],
  ["idle_kW_existing", "Existing Idle Power"],
  ["idle_kW_proposed", "Proposed Idle Power"],
  ["water_per_cycle_existing", "Existing Water per Cycle"],
  ["water_per_cycle_proposed", "Proposed Water per Cycle"],
  ["machine_kWh_per_cycle_existing", "Existing Machine Electricity per Cycle"],
  ["machine_kWh_per_cycle_proposed", "Proposed Machine Electricity per Cycle"],
  ["quantity", "In-Scope Equipment Count"],
  ["annual_hours", "Annual Operating Hours"],
  ["annual_on_hours", "Annual Operating Hours"],
  ["annual_operating_hours", "Annual Operating Hours"],
  ["annual_pressurized_hours", "Annual Pressurized Hours"],
  ["annual_test_hours_per_unit", "Annual Test Hours per Unit"],
  ["annual_billed_R_r", "Annual Billed Resource Use"],
  ["billed_displaced_resource", "Billed Displaced Resource Use"],
  ["current_annual_fuel", "Current Annual Fuel Use"],
  ["measured_equipment_fuel", "Measured Equipment Fuel Use"],
  ["current_annual_gas", "Current Annual Gas Use"],
  ["current_annual_input", "Current Annual Water-Heating Input"],
  ["annual_boiler_fuel", "Annual Boiler Fuel Use"],
  ["annual_HVAC_R_r", "Annual HVAC Resource Use"],
  ["annual_affected_refrigeration_kWh", "Affected Annual Refrigeration Electricity"],
  ["existing_annual_kWh", "Existing Annual Electricity"],
  ["proposed_annual_kWh", "Proposed Annual Electricity"],
  ["annual_ice_100lb_units_per_machine", "Annual Hundred-Pound Ice Units per Machine"],
  ["annual_ice_production_lb_per_machine", "Annual Ice Production per Machine"],
  ["kWh_per_100lb_existing", "Existing Electricity per 100 Pounds of Ice"],
  ["kWh_per_100lb_proposed", "Proposed Electricity per 100 Pounds of Ice"],
  ["water_gallons_per_100lb_existing", "Existing Water per 100 Pounds of Ice"],
  ["water_gallons_per_100lb_proposed", "Proposed Water per 100 Pounds of Ice"],
  ["baseline_annual_kWh", "Baseline Annual Electricity"],
  ["Scout_reduction_fraction_r", "Scout Resource-Reduction Fraction"],
  ["annual_flow_hours", "Annual Delivered-Air Volume"],
  ["mean_flow", "Mean Airflow"],
  ["annual_hours", "Annual Operating Hours"],
  ["existing_input_kW", "Existing Input Power"],
  ["proposed_input_kW", "Proposed Input Power"],
  ["existing_fan_kW_period", "Existing Fan Input Power by Period"],
  ["proposed_fan_kW_period", "Proposed Fan Input Power by Period"],
  ["hours_period", "Operating Hours by Period"],
  ["avoided_makeup_air_R_r", "Avoided Makeup-Air Resource Use"],
  ["shaft_kW", "Shaft Power"],
  ["load_fraction", "Operating Load Fraction"],
  ["existing_kW_i", "Existing Input Power in Each Load Bin"],
  ["proposed_kW_i", "Proposed Input Power in Each Load Bin"],
  ["hours_i", "Annual Hours in Each Load Bin"],
  ["specific_power_existing", "Existing Specific Power"],
  ["specific_power_proposed", "Proposed Specific Power"],
  ["leak_flow", "Measured Leak Flow"],
  ["compressor_specific_power", "Compressor Specific Power"],
  ["test_fuel_per_hour", "Test Fuel Use per Hour"],
  ["standby_kW_per_unit", "Standby Power per Unit"],
  ["annual_test_fuel", "Annual Test Fuel"],
  ["annual_standby_kWh", "Annual Standby Electricity"],
  ["control_reduction_fraction", "Control Resource-Reduction Fraction"],
  ["duct_loss_reduction_fraction", "Duct-Loss Reduction Fraction"],
  ["reduction_fraction", "Resource-Reduction Fraction"],
  ["existing_duct_loss_fraction", "Existing Duct-Loss Fraction"],
  ["proposed_duct_loss_fraction", "Proposed Duct-Loss Fraction"],
  ["existing_kW", "Existing Input Power"],
  ["proposed_kW", "Proposed Input Power"],
  ["fixture_input_W", "Fixture Input Watts"],
  ["fixture_input_kW", "Fixture Input Kilowatts"],
  ["existing_resource_unit", "Existing Resource Unit"],
  ["avoided_existing_resource", "Avoided Existing Resource"],
  ["added_fuel", "Added Fuel"],
  ["annual_generation", "Annual Onsite Generation"],
  ["generation", "Annual Onsite Generation"],
  ["capacity_kW", "Installed Capacity"],
  ["load_fraction", "Operating Load Fraction"],
  ["electric_efficiency", "Electric Efficiency"],
  ["coincident_onsite_electric_load", "Coincident Onsite Electric Load"],
  ["avoided_grid_kWh", "Avoided Grid Electricity"],
  ["useful_heat", "Useful Recovered Heat"],
  ["recoverable_heat_ratio", "Recoverable Heat Ratio"],
  ["coincident_thermal_load", "Coincident Thermal Load"],
  ["avoided_boiler_fuel", "Avoided Boiler Fuel"],
  ["existing_boiler_efficiency", "Existing Boiler Efficiency"],
  ["total_capacity_kW", "Installed Capacity"],
  ["annual_capacity_factor", "Annual Capacity Factor"],
  ["CHP_input_fuel", "CHP Input Fuel"],
  ["annual_available_fuel", "Annual Available Fuel"],
  ["scheduled_input_fuel", "Scheduled Input Fuel"],
  ["input_biomass_or_biogas", "Biomass or Biogas Input"],
  ["lower_heating_value", "Fuel Lower Heating Value"],
  ["recoverable_heat_fraction", "Recoverable Heat Fraction"],
  ["available_waste_heat", "Available Waste Heat"],
  ["recovery_efficiency", "Recovery Efficiency"],
  ["coincident_useful_heat_load", "Coincident Useful-Heat Load"],
  ["useful_recovered_heat", "Useful Recovered Heat"],
  ["displaced_system_efficiency", "Displaced-System Efficiency"],
  ["displaced_resource_unit", "Displaced-Resource Unit"],
  ["avoided_displaced_resource", "Avoided Displaced Resource"],
  ["added_auxiliary_kWh", "Added Auxiliary Electricity"],
  ["current_fuel_input", "Current Fuel Input"],
  ["proposed_electric_input", "Proposed Electric Input"],
  ["useful_process_heat", "Useful Process Heat"],
  ["current_fuel_unit", "Current Fuel Unit"],
  ["current_efficiency", "Current Process Efficiency"],
  ["proposed_COP_or_efficiency", "Proposed Coefficient of Performance or Efficiency"],
  ["electricity_unit", "Electricity Unit"],
  ["avoided_steam_loss", "Avoided Steam Loss"],
  ["steam_loss_rate", "Steam Loss Rate"],
  ["boiler_fuel_per_steam_unit", "Boiler Fuel per Unit of Steam"],
  ["steam_enthalpy_rise", "Steam Enthalpy Rise"],
  ["boiler_efficiency", "Boiler Efficiency"],
  ["boiler_fuel_unit", "Boiler Fuel Unit"],
  ["avoided_water", "Avoided Water"],
  ["avoided_hot_water_input", "Avoided Water-Heating Input"],
  ["hot_fraction", "Hot-Water Fraction"],
  ["thermal_energy_per_gallon", "Thermal Energy per Gallon"],
  ["uses_per_year", "Annual Uses per Fixture"],
  ["duration_minutes", "Minutes per Use"],
  ["gpm_existing", "Existing Flow Rate"],
  ["gpm_proposed", "Proposed Flow Rate"],
  ["flushes_per_year", "Annual Flushes per Fixture"],
  ["gpf_existing", "Existing Gallons per Flush"],
  ["gpf_proposed", "Proposed Gallons per Flush"],
  ["measured_leak_gpm", "Measured Leak Flow"],
  ["confirmed_leak_minutes_per_year", "Confirmed Annual Leak Duration"],
  ["avoided_makeup_gallons", "Avoided Cooling-Tower Makeup Water"],
  ["avoided_fan_kWh", "Avoided Fan Electricity"],
  ["annual_activity_per_unit", "Annual Activity per Unit"],
  ["active_intensity_existing,r", "Existing Active Resource Intensity"],
  ["active_intensity_proposed,r", "Proposed Active Resource Intensity"],
  ["annual_idle_hours", "Annual Idle Hours"],
  ["idle_rate_existing,r", "Existing Idle Resource Rate"],
  ["idle_rate_proposed,r", "Proposed Idle Resource Rate"],
  ["avoided_water_heating_R_r", "Avoided Water-Heating Resource"],
  ["water_heating_R_per_rack_existing", "Existing Water-Heating Resource per Rack"],
  ["water_heating_R_per_rack_proposed", "Proposed Water-Heating Resource per Rack"],
  ["avoided_idle_kWh", "Avoided Idle Electricity"],
  ["avoided_machine_kWh", "Avoided Machine Electricity"],
  ["avoided_water_heating_input", "Avoided Water-Heating Input"],
  ["baseline_annual_bill", "Baseline Annual Bill"],
  ["proposed_annual_bill", "Proposed Annual Bill"],
  ["proposed_unmanaged_charging_bill", "Proposed Unmanaged-Charging Bill"],
  ["unmanaged_annual_bill", "Unmanaged Annual Bill"],
  ["managed_annual_bill", "Managed Annual Bill"],
  ["baseline_grid_and_fuel_bill", "Baseline Grid and Fuel Bill"],
  ["proposed_grid_and_fuel_bill", "Proposed Grid and Fuel Bill"],
  ["annual_bill_credits", "Annual Bill Credits"],
  ["annual_subscription_charges", "Annual Subscription Charges"],
  ["credited_kWh_period", "Credited Electricity by Period"],
  ["contract_credit_rate_period", "Contract Credit Rate by Period"],
  ["onsite_offset_kWh_t", "Onsite Electricity Offset in Each Interval"],
  ["export_kWh_t", "Exported Electricity in Each Interval"],
  ["baseline_import_kWh_t", "Baseline Imported Electricity in Each Interval"],
  ["PV_AC_kWh_t", "Solar AC Generation in Each Interval"],
  ["wind_kWh_t", "Wind Generation in Each Interval"],
  ["import_rate_t", "Import Rate in Each Interval"],
  ["export_credit_t", "Export Credit in Each Interval"],
  ["baseline_load_t", "Baseline Load in Each Interval"],
  ["proposed_load_t", "Proposed Load in Each Interval"],
  ["shed_t", "Shed Load in Each Interval"],
  ["rebound_t", "Rebound Load in Each Interval"],
  ["p_electric", "Bill-Derived Electricity Rate"],
  ["p_gas", "Bill-Derived Gas Rate"],
  ["p_fuel", "Current Fuel Price"],
  ["p_existing", "Existing Resource Rate"],
  ["p_backup_resource", "Backup-Resource Rate"],
  ["p_heating_resource", "Heating-Resource Rate"],
  ["p_water", "Bill-Derived Water Rate"],
  ["p_water_sewer", "Bill-Derived Water and Sewer Rate"],
  ["p_displaced_resource", "Displaced-Resource Rate"],
  ["p_input_fuel", "Input-Fuel Price"],
  ["p_CHP_fuel", "CHP Fuel Price"],
  ["p_r", "Bill-Derived Resource Rate"],
  ["makeup", "Makeup Water"],
  ["evaporation", "Evaporation Water"],
  ["blowdown", "Blowdown Water"],
  ["drift", "Drift Water"],
  ["airflow", "Airflow"],
  ["water_per_cycle_case", "Water per Cycle for Each Case"],
  ["hot_water_per_cycle_case", "Hot Water per Cycle for Each Case"],
  ["hot_fraction_case", "Hot-Water Fraction for Each Case"],
  ["η_existing", "Existing Efficiency"],
  ["η_proposed", "Proposed Efficiency"],
  ["η_charge", "Charge Efficiency"],
  ["η_discharge", "Discharge Efficiency"],
  ["ΔR_r", "Annual Resource Reduction by Resource"],
  ["valued_R_r", "Bill-Capped Annual Resource Reduction"],
  ["billed_R_r", "Annual Billed Resource Use"],
  ["floor_area", "Building Area"],
  ["median_ComStock_delta_r_per_ft²", "Median ComStock Resource Change per Square Foot"],
  ["S", "Annual Operational Savings"]
]);

export function buildInformationCardProjection(category) {
  const copy = CARD_COPY[category.id];
  if (!copy) throw new Error(`Missing Information Card copy for ${category.id}`);
  const processDefinitions = buildProcessDefinitions(category);
  const tree = buildPresentationTree(category, processDefinitions);
  const referencedKeys = collectProcessReferences(tree);
  const processByKey = new Map(processDefinitions.map((process) => [process.key, process]));
  const orderedProcesses = referencedKeys.map((key) => processByKey.get(key)).filter(Boolean);
  const numbers = assignProcessNumbers(category.id, orderedProcesses);
  for (const process of orderedProcesses) process.displayNumber = numbers.get(process.key);
  return {
    categoryId: category.id,
    title: copy.title,
    retrofitNames: category.retrofits.map((retrofit) => retrofit.name),
    overview: copy.overview,
    broaderFormula: buildBroaderFormula(category),
    expandedFormula: buildExpandedFormula(category),
    tree,
    processes: orderedProcesses
  };
}

export function renderPresentationTree(root, processByKey) {
  const lines = [];
  const visit = (node, prefix, isLast, isRoot) => {
    const process = node.processKey ? processByKey.get(node.processKey) : null;
    const text = process
      ? `Standard ${process.displayNumber} — ${process.name}`
      : node.text;
    lines.push(isRoot ? text : `${prefix}${isLast ? "└─ " : "├─ "}${text}`);
    const nextPrefix = isRoot ? "" : `${prefix}${isLast ? "   " : "│  "}`;
    node.children.forEach((child, index) => {
      visit(child, nextPrefix, index === node.children.length - 1, false);
    });
  };
  visit(root, "", true, true);
  return lines.join("\n");
}

function buildProcessDefinitions(category) {
  if (category.id === "ITC-02") return buildExteriorLightingProcesses(category);
  if (category.id === "ITC-29") {
    return [
      makeProcess(
        category,
        "STD-FUELECONOMY-VEHICLES",
        "fueleconomy_vehicles",
        "Exact Vehicle Efficiency Lookup",
        {
          purpose: "Match the existing and proposed light-duty vehicles to exact official records and return comparable fuel and electricity use per mile.",
          lookupInputs: [
            "Existing vehicle make and model",
            "Proposed vehicle make and model",
            "Approximate model years",
            "Version or drivetrain details only when needed to resolve an ambiguous match"
          ],
          valueNeeded: [
            "Existing combined fuel economy in miles per gallon",
            "Proposed electricity use in kilowatt-hours per 100 miles at the wall"
          ],
          validation: "The official downloadable schema and the two exact vehicle records were checked. The retained fixture validates record identity, efficiency fields, units, source version, and the exact-model golden calculation of $1,617 per year. Class-based estimates remain disabled because no compatible population and sample-size fixture has been reviewed."
        }
      )
    ];
  }
  if (PRODUCT_CATEGORY_LABELS[category.id]) return buildCertifiedProductProcesses(category);

  const processes = [];
  for (const standard of category.tracedStandards) {
    if (
      standard.id === "STD-WATERSENSE-FIXTURES" &&
      ["ITC-32", "ITC-33"].includes(category.id)
    ) {
      const fixtureLabel = category.id === "ITC-32" ? "Flow Fixture" : "Flush Fixture";
      const ratedValue = category.id === "ITC-32" ? "rated flow" : "rated gallons per flush";
      processes.push(
        makeProcess(category, standard.id, "exact-proposed-fixture-rating", `Exact Proposed ${fixtureLabel} Rating Lookup`, {
          sourceLinkLabels: category.id === "ITC-32"
            ? ["WaterSense commercial-building resources", "WaterSense at Work best-management-practice guide"]
            : undefined,
          purpose: `Resolve the proposed ${ratedValue} when the linked opportunity names an exact fixture.`,
          lookupInputs: ["Exact proposed fixture make and model from the linked opportunity", "Fixture type and application"],
          valueNeeded: [`Proposed ${ratedValue} with units and product provenance`],
          validation: `The official WaterSense commercial guidance and fixture criteria were checked. An exact product specification can supply proposed ${ratedValue}, but no retained exact-product fixture or category adapter currently proves the lookup. The source does not supply existing installed performance or usage frequency.`
        }),
        makeProcess(category, standard.id, "requirement-proposed-fixture-rating", `Requirement-Based Proposed ${fixtureLabel} Resolution`, {
          sourceLinkLabels: category.id === "ITC-32"
            ? ["WaterSense commercial-building resources", "WaterSense at Work best-management-practice guide"]
            : undefined,
          purpose: `Interpret the linked opportunity requirements and determine whether they identify a compatible ${fixtureLabel.toLowerCase()} rating.`,
          lookupInputs: ["Fixture requirements from the linked opportunity", "Fixture type and application", "Required water-use criterion"],
          valueNeeded: [`Eligible compatible proposed fixture population and a documented low, median, and high ${ratedValue}, or no value when no compatible fixture remains`],
          validation: `The official WaterSense criteria define compatible proposed ${ratedValue} requirements. No retained qualified-product population currently proves the requirement filters, population size, or low, median, and high result, and the source does not supply existing ratings or usage frequency.`
        })
      );
      continue;
    }
    if (
      standard.id === "STD-ENERGY-STAR-PRODUCT-DATA" &&
      ["ITC-27", "ITC-28"].includes(category.id)
    ) {
      processes.push(
        makeProcess(category, standard.id, "exact-charger-rating", "Exact Charger Rating Lookup", {
          sourceLinkLabels: ENERGY_STAR_LINK_SELECTIONS[category.id],
          purpose: "Resolve active charging efficiency, standby power, and rated capacity when the opportunity names an exact certified charger.",
          lookupInputs: ["Exact charger make and model", "Rated charger power and application", "Opportunity product information"],
          valueNeeded: ["Certified active efficiency, standby power, and rated capacity with units"],
          validation: "The official ENERGY STAR EV charger criteria and Product Finder access path were checked. Exact active-model lookup is technically possible, but the category-specific adapter, retained EV charger record, and formula-level golden test have not yet been added."
        }),
        makeProcess(category, standard.id, "requirement-charger-rating", "Requirement-Based Charger Resolution", {
          sourceLinkLabels: ENERGY_STAR_LINK_SELECTIONS[category.id],
          purpose: "Interpret charger requirements from the opportunity and determine whether a compatible certified product record can supply the needed performance values.",
          lookupInputs: ["Charger class and intended application", "Rated power requirement", "Opportunity performance requirements"],
          valueNeeded: ["Eligible compatible certified charger population with documented low, median, and high performance, or no value when no compatible record remains"],
          validation: "The official ENERGY STAR EV charger criteria and Product Finder access path were checked. No retained category export currently proves the requirement filters, eligible population, population size, or low, median, and high result."
        })
      );
      continue;
    }
    const publicChargingDispatch =
      category.id === "ITC-27" &&
      standard.id === "STD-REOPT-LOCAL-DISPATCH";
    processes.push(makeProcess(category, standard.id, processKeyForStandard(standard.id), processNameForCategory(category, standard.id), {
      sourceName: standard.id === "STD-OPERATING-SCHEDULE"
        ? "U.S. Department of Energy - Commercial Reference Buildings"
        : undefined,
      sourceLinkLabels: standard.id === "STD-ENERGY-STAR-PRODUCT-DATA"
        ? ENERGY_STAR_LINK_SELECTIONS[category.id]
        : standard.id === "STD-OPERATING-SCHEDULE"
          ? ["Commercial Reference Buildings"]
          : undefined,
      selectedStrategy: standard.id === "STD-OPERATING-SCHEDULE"
        ? "Deterministic calendar calculation from a recognizable business, shift, seasonal, or usage pattern."
        : publicChargingDispatch
          ? "Pinned local REopt.jl bill comparison using a documented site-study or contractor charging profile."
        : undefined,
      automationMethod: standard.id === "STD-OPERATING-SCHEDULE"
        ? "Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation."
        : publicChargingDispatch
          ? "Validate the uploaded interval load, verified tariff mapping, documented charging profile, and resolved charger ratings; add the charging profile to baseline load and compare the versioned REopt.jl bill cases."
        : undefined,
      lookupInputs: publicChargingDispatch
        ? [
            "Timestamped interval utility data from the uploaded utility artifact",
            "Time zone and daylight-saving metadata from the uploaded utility artifact",
            "Authoritative tariff mapping, which is not yet verified",
            "Installed charger count",
            "Public operating hours",
            "Expected sessions per operating day from a site study or opportunity design",
            "Average delivered energy per session from a site study or opportunity design",
            "Documented interval charging profile from the same site study or contractor design",
            "Resolved charger efficiency, standby power, and rated capacity from the connected product process"
          ]
        : undefined,
      howToUse: publicChargingDispatch
        ? [
            "Validate the timestamped utility load, timezone treatment, monthly reconciliation, and authoritative tariff mapping before any dollar calculation.",
            "Require one site study or contractor design that states expected daily sessions, delivered energy per session, and a compatible interval charging profile; daily averages alone do not define interval demand.",
            "Resolve charger active efficiency, standby power, and rated capacity through the exact-product or requirements-based charger process.",
            "Apply charger-count and public-hours limits to the documented charging profile, add the resulting import load to the baseline, and run the pinned REopt.jl baseline and proposed bill cases.",
            "Retain the utility artifact, tariff source, charging-study version, charger-rating records, solver version, warnings, and monthly bill reconciliation; otherwise return no interval dollar estimate."
          ]
        : undefined,
      validation: standard.id === "STD-OPERATING-SCHEDULE"
        ? "The DOE commercial reference-building schedule context was checked. Calendar arithmetic is deterministic when the operating pattern is complete, but a business label alone is not a validated annual-hours value and no category golden fixture exists."
        : undefined
    }));
  }
  return processes;
}

function buildCertifiedProductProcesses(category) {
  const label = PRODUCT_CATEGORY_LABELS[category.id];
  const canonicalStandardIds = category.tracedStandards.map((standard) => standard.id);
  const includesEnergyStar = canonicalStandardIds.includes("STD-ENERGY-STAR-PRODUCT-DATA");
  const combinedSourceOverrides = {
    sourceName: includesEnergyStar
      ? "U.S. Department of Energy CCMS and U.S. Environmental Protection Agency ENERGY STAR Product Finder"
      : "U.S. Department of Energy - Compliance Certification Database",
    sourceLinkLabels: [
      ...CCMS_LINK_SELECTIONS,
      ...(includesEnergyStar
        ? ENERGY_STAR_LINK_SELECTIONS[category.id] || ["ENERGY STAR Product Finder datasets and API"]
        : [])
    ]
  };
  return [
    makeCombinedProcess(category, canonicalStandardIds, "existing-product-rating", `Existing ${label} Rating Resolution`, {
      ...combinedSourceOverrides,
      purpose: `Resolve the existing ${label.toLowerCase()} performance only from a documented exact model or retained certification record.`,
      lookupInputs: [`Existing ${label.toLowerCase()} type or application`, "Existing make and model, when available", "Existing capacity or size class"],
      valueNeeded: [`Existing certified ${label.toLowerCase()} performance with its exact unit, or no value when no exact record is supported`],
      validation: `The official certification access paths and native product-family fields were checked. Current efficient-product records do not represent the installed baseline, so this process may use only one documented exact existing model. The category-specific exact-record adapter and golden test have not yet been added.`
    }),
    makeCombinedProcess(category, canonicalStandardIds, "exact-proposed-product-rating", `Exact Proposed ${label} Rating Lookup`, {
      ...combinedSourceOverrides,
      purpose: `Resolve proposed ${label.toLowerCase()} performance when the linked opportunity names an exact product.`,
      lookupInputs: ["Exact proposed make and model from the linked opportunity", "Product type and capacity", "Applicable certified test method"],
      valueNeeded: [`Proposed certified ${label.toLowerCase()} performance with its exact unit`],
      validation: category.id === "ITC-52"
        ? "The official commercial dishwasher dataset and access method were checked. The retained fixture validates model, machine-type, sanitation, water-use, active-energy, idle-power, date, unit, version, and checksum fields. The exact-product adapter and formula-level golden test have not yet been added, and rack and flight-machine units must remain separate."
        : `The official certification access path and applicable ${label.toLowerCase()} product-family fields were checked. Exact active-model matching is technically possible, but the category-specific adapter, retained product fixture, and golden test have not yet been added.`,
      evidenceState: category.id === "ITC-52"
        ? "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
        : undefined
    }),
    makeCombinedProcess(category, canonicalStandardIds, "requirement-proposed-product-rating", `Requirement-Based Proposed ${label} Resolution`, {
      ...combinedSourceOverrides,
      purpose: `Interpret the linked opportunity requirements and determine whether they identify a compatible certified ${label.toLowerCase()} record.`,
      lookupInputs: ["Product requirements from the linked opportunity", "Required application and capacity", "Applicable efficiency or resource-use criteria"],
      valueNeeded: [`Eligible compatible proposed ${label.toLowerCase()} population with documented low, median, and high native-unit performance, or no value when no compatible record remains`],
      validation: category.id === "ITC-52"
        ? "The official commercial dishwasher dataset and access method were checked, and the retained schema fixture validates the fields required to filter machine type, sanitation method, water use, active energy, and idle power. A retained candidate population and category golden test have not yet been added, so the requirements path cannot claim an implemented selection."
        : `The official certification access path and applicable ${label.toLowerCase()} product-family filters were checked. Candidate-set automation is technically possible, but no retained category export proves the eligible population, filters, population size, or low, median, and high result.`
    })
  ];
}

function buildExteriorLightingProcesses(category) {
  return [
    makeProcess(category, "STD-FEMP-EXTERIOR-LIGHTING", "exact-new-fixture-watts", "Exact New Fixture Wattage Lookup", {
      sourceName: "DesignLights Consortium - Solid-State Lighting Qualified Products List",
      sourceLinkLabels: [
        "DLC API and data download user guide",
        "SSL V6.0 and LUNA V2.0 Technical Requirements"
      ],
      purpose: "Resolve input watts when the linked opportunity names an exact replacement luminaire.",
      lookupInputs: ["Exact replacement product information from the linked opportunity", "Exterior lighting application"],
      valueNeeded: ["Exact proposed input watts per fixture with product provenance"],
      validation: "The official DLC data-access guide documents tokenized SSL QPL CSV downloads, and the technical requirements define model, application, light-output, efficacy, input-power, status, and version fields. No authenticated QPL extract, retained exact-product fixture, or category adapter is present, so implementation execution is not yet proved."
    }),
    makeProcess(category, "STD-FEMP-EXTERIOR-LIGHTING", "requirement-new-fixture-watts", "Requirement-Based New Fixture Wattage Resolution", {
      sourceName: "DesignLights Consortium - Solid-State Lighting Qualified Products List",
      sourceLinkLabels: [
        "DLC API and data download user guide",
        "SSL V6.0 and LUNA V2.0 Technical Requirements"
      ],
      purpose: "Interpret performance requirements when the linked opportunity does not name an exact replacement product.",
      lookupInputs: ["Product requirements from the linked opportunity", "Exterior lighting application", "Required light output or performance criteria"],
      valueNeeded: ["Eligible compatible QPL population with documented low, median, and high input watts, or no value when no compatible product remains"],
      validation: "The official DLC data-access guide and SSL technical requirements establish a candidate-filtering method. No retained QPL population currently proves the application, light-output, distribution, mounting, controls, active-status, and version filters or the resulting low, median, and high wattage values."
    }),
    makeProcess(category, "STD-OPERATING-SCHEDULE", "fixed-lighting-hours", "Fixed-Schedule Lighting Hours", {
      sourceName: "U.S. Department of Energy - Commercial Reference Buildings",
      sourceLinkLabels: ["Commercial Reference Buildings"],
      purpose: "Calculate annual exterior-lighting hours for a fixed business or calendar schedule.",
      lookupInputs: ["Lighting hours per operating day", "Operating days per week", "Active weeks per year"],
      valueNeeded: ["Annual operating hours"],
      selectedStrategy: "Deterministic calendar calculation from an explicit fixed operating schedule.",
      automationMethod: "Calculate annual hours from operating hours per day, operating days per week, active weeks, holidays, and any declared seasonal exceptions.",
      validation: "The DOE commercial reference-building schedule context was checked. The calendar arithmetic is deterministic when all schedule inputs are supplied, but no category golden fixture exists and a business label alone is not a validated annual-hours value."
    }),
    makeProcess(category, "STD-OPERATING-SCHEDULE", "daylight-lighting-hours", "Daylight-Based Lighting Hours", {
      sourceName: "U.S. Naval Observatory - daylight definitions and data services",
      sourceLinkLabels: ["Rise, Set, and Twilight Definitions", "Data Services API"],
      purpose: "Calculate annual exterior-lighting hours for dusk-to-dawn or photocell control.",
      lookupInputs: ["Control type and timing offset", "Site location", "Analysis year"],
      valueNeeded: ["Annual daylight-based operating hours"],
      selectedStrategy: "Versioned daylight calculation from site location, analysis year, and the declared exterior-lighting control rule.",
      automationMethod: "Resolve local sunrise, sunset, or civil-twilight times, apply the control offset and timezone rules for every day, and sum the resulting annual operating hours.",
      validation: "The USNO daylight definitions and data-services interface were checked. Location-specific calculation is feasible when location, year, timezone, and control offset are supplied, but no category golden fixture exists."
    }),
    makeCombinedProcess(
      category,
      ["STD-FEMP-EXTERIOR-LIGHTING", "STD-OPERATING-SCHEDULE"],
      "lighting-replacement-calculation",
      "Lighting-Replacement Calculation",
      {
        sourceName: "DOE FEMP, DesignLights Consortium, DOE reference buildings, and U.S. Naval Observatory",
        purpose: "Calculate annual electricity reduction from fixture count, existing and proposed watts, and the resolved annual schedule.",
        lookupInputs: ["Replacement fixture count", "Existing fixture watts", "New fixture watts", "Annual operating hours"],
        valueNeeded: ["Annual electricity reduction in kilowatt-hours"],
        howToUse: [
          "Confirm that all fixtures in the row share the same existing watts, proposed watts, and operating schedule.",
          "Subtract proposed fixture watts from existing fixture watts and divide the difference by 1,000.",
          "Multiply the kilowatt difference by fixture count and annual operating hours.",
          "Return annual electricity reduction in kilowatt-hours and keep negative results when the proposed design adds load.",
          "Store the fixture and schedule sources used by the calculation."
        ],
        selectedStrategy: "Deterministic local arithmetic after all connected fixture and schedule processes resolve.",
        automationMethod: "Apply the displayed replacement formula once to each homogeneous fixture group, then sum the annual electricity results.",
        difficulty: "Easy",
        validation: "The arithmetic and unit conversion are deterministic and correspond to the displayed formula. The result is executable only when fixture count, existing watts, proposed watts, and annual operating hours have all been resolved. A category-level golden test has not yet been added, and the reviewed source gaps for those inputs remain visible in the connected processes."
      }
    )
  ];
}

function makeProcess(category, standardId, key, name, overrides = {}) {
  return makeCombinedProcess(category, [standardId], key, name, overrides);
}

function makeCombinedProcess(category, standardIds, key, name, overrides = {}) {
  const primary = PROCESS_LIBRARY[standardIds[0]];
  if (!primary) throw new Error(`Missing process library entry for ${standardIds[0]}`);
  const valueNeeded = overrides.valueNeeded || [primary.valueNeeded];
  const lookupInputs = overrides.lookupInputs || inferLookupInputs(category, standardIds);
  const outputSummary = valueNeeded.join("; ").replace(/\.$/, "");
  const processSpecific = buildProcessSpecificContent(
    category,
    standardIds,
    key,
    name,
    lookupInputs,
    valueNeeded,
    primary
  );
  const process = {
    key,
    name,
    canonicalStandardIds: standardIds,
    sourceName: overrides.sourceName || primary.sourceName,
    purpose: overrides.purpose || `Use ${primary.sourceName} to resolve ${lowercaseFirst(outputSummary)} from the listed category inputs.`,
    lookupInputs,
    valueNeeded,
    howToUse: overrides.howToUse || processSpecific.howToUse,
    automation: {
      selectedStrategy: overrides.selectedStrategy || processSpecific.selectedStrategy || primary.strategy,
      automationMethod: overrides.automationMethod || processSpecific.automationMethod || primary.method,
      difficulty: overrides.difficulty || primary.difficulty
    },
    validation: overrides.validation || buildValidation(category, standardIds),
    evidenceState: overrides.evidenceState || processSpecific.evidenceState
  };
  if (overrides.sourceLinkLabels) process.sourceLinkLabels = overrides.sourceLinkLabels;
  return process;
}

function buildValidation(category, standardIds) {
  const summaries = standardIds.map((standardId) => PROCESS_LIBRARY[standardId].validation);
  if (standardIds.includes("STD-ENERGY-STAR-PRODUCT-DATA") && category.id !== "ITC-52") {
    summaries[summaries.indexOf(PROCESS_LIBRARY["STD-ENERGY-STAR-PRODUCT-DATA"].validation)] =
      "The official Product Finder access path and applicable product-family datasets were checked. The category adapter and generic existing-equipment baseline remain unverified, so only a later exact compatible product-record path can be supported.";
  }
  if (standardIds.includes("STD-ENERGY-STAR-PRODUCT-DATA") && category.id === "ITC-52") {
    summaries[summaries.indexOf(PROCESS_LIBRARY["STD-ENERGY-STAR-PRODUCT-DATA"].validation)] =
      "The official commercial dishwasher dataset was checked, and the retained fixture validates its source schema, units, source version, water-per-cycle field, and idle-energy fields. Existing installed-equipment baselines, annual rack activity, and the complete category adapter remain unverified.";
  }
  if (standardIds.includes("STD-FUELECONOMY-VEHICLES") && category.id !== "ITC-29") {
    summaries[summaries.indexOf(PROCESS_LIBRARY["STD-FUELECONOMY-VEHICLES"].validation)] =
      "The official downloadable vehicle schema and exact-record method were checked, and the retained source fixture validates the technical fields and units. The fleet-charging category adapter and formula-level golden test have not yet been added, and class-based estimates remain disabled.";
  }
  return [...new Set(summaries)].join(" ");
}

function buildProcessSpecificContent(
  category,
  standardIds,
  key,
  name,
  lookupInputs,
  valueNeeded,
  library
) {
  const categoryName = CARD_COPY[category.id].title;
  const outputSummary = lowercaseFirst(valueNeeded.join("; ").replace(/\.$/, ""));
  const inputSummary = lookupInputs.join("; ");
  const exactProduct = /^exact-|^fueleconomy_vehicles$/.test(key);
  const requirementProduct = /^requirement-/.test(key);
  const existingProduct = /^existing-product-rating$/.test(key);
  const measurModule = standardIds.includes("STD-DOE-MEASUR")
    ? MEASUR_CATEGORY_MODULES[category.id]
    : null;

  if (existingProduct) {
    return {
      howToUse: [
        `Normalize the documented existing manufacturer and model for the ${categoryName.toLowerCase()}; do not infer a rating from equipment type alone.`,
        `Search the applicable certification export for that exact model and filter by the displayed product type, capacity or size class, and native test procedure.`,
        "Require one compatible record; return no existing rating when the model is absent, ambiguous, inactive, or from a different product family.",
        `Return ${outputSummary} without substituting a current efficient-product distribution for the installed baseline.`,
        "Retain the dataset version, record identity, native field names, units, model match, and rejection reason."
      ],
      selectedStrategy: `Exact-record lookup for documented existing ${categoryName.toLowerCase()} models only.`,
      automationMethod: `Normalize the submitted model, query the applicable certification export, apply product-family and capacity filters, and accept only one native-unit record.`,
      evidenceState: "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
    };
  }

  if (exactProduct) {
    return {
      howToUse: [
        `Read the exact manufacturer, model, and product configuration from the linked ${categoryName.toLowerCase()} opportunity.`,
        `Query the official source for the exact model and filter by application, capacity, active specification, and the native certified fields required by this formula.`,
        "Require one compatible record; reject partial model matches, inactive listings, incompatible configurations, and records whose native test unit does not match the formula.",
        `Return ${outputSummary}.`,
        "Retain the source version, exact record identity, matched model text, returned native fields and units, and any ambiguity decision."
      ],
      selectedStrategy: `Exact linked-opportunity product match against the official ${library.sourceName} records.`,
      automationMethod: `Normalize the opportunity model identifiers, perform an exact active-record lookup, apply category compatibility filters, and return only the required native source fields.`,
      evidenceState: category.id === "ITC-29"
        ? "EXECUTABLE_PROOF_PRESENT"
        : "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
    };
  }

  if (requirementProduct) {
    return {
      howToUse: [
        `Extract the application, capacity, certification, and performance limits from the linked ${categoryName.toLowerCase()} opportunity requirements.`,
        "Filter the official current-product population by every mandatory requirement, product-family boundary, active specification, and native test unit.",
        "Reject the path when no compatible record remains; when several records remain, keep the eligible population and calculate a documented low, median, and high value without selecting the contractor's future product.",
        `Return ${outputSummary}.`,
        "Retain the source version, complete filters, eligible record identities, population size, native units, summary rule, and no-result reason."
      ],
      selectedStrategy: `Requirement-based candidate-set resolution from the official ${library.sourceName} population.`,
      automationMethod: `Parse the opportunity requirements, apply exact product-family and performance filters, preserve the eligible population, and calculate deterministic low, median, and high native-unit results.`,
      evidenceState: "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
    };
  }

  if (measurModule) {
    return {
      howToUse: [
        `Load the ${categoryName} project facts from documented nameplates, measurements, controls trends, or contractor specifications and map their units to the MEASUR ${measurModule}.`,
        `Run the pinned open-source ${measurModule} baseline and proposed cases using the category formula boundary shown in this card.`,
        `Return no result when the ${measurModule} requires a flow, pressure, load profile, duty point, efficiency, or schedule that is absent from the project evidence.`,
        `Return ${outputSummary}.`,
        `Retain the MEASUR version, ${measurModule} input object, unit conversions, warnings, baseline and proposed outputs, and project-document provenance.`
      ],
      selectedStrategy: `Pinned local execution of the MEASUR ${measurModule} for ${categoryName}.`,
      automationMethod: `Map reviewed project evidence into the ${measurModule} input schema, execute the versioned local module, and preserve its warnings and native outputs without supplying missing design inputs.`,
      evidenceState: "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
    };
  }

  return {
    howToUse: [
      `Map the ${categoryName} inputs to the documented ${name} source fields or model inputs: ${inputSummary}.`,
      library.method,
      `Reject the ${categoryName} path when a required source field, project design input, compatible record, or native unit is absent; do not insert a cross-category default.`,
      `Return ${outputSummary}.`,
      `Retain the ${name} source version, exact fields or model inputs, native units, selected records, warnings, and category-specific rejection reason.`
    ],
    selectedStrategy: library.strategy,
    automationMethod: library.method,
    evidenceState: "METHOD_VERIFIED_IMPLEMENTATION_PENDING"
  };
}

function lowercaseFirst(value) {
  return value ? `${value.charAt(0).toLowerCase()}${value.slice(1)}` : value;
}

const LOOKUP_INPUT_PATTERNS_BY_STANDARD = {
  "STD-OPERATING-SCHEDULE": /(?:schedule|pattern|operating days|shifts|active season|annual operating hours|site location|business activity)/i,
  "STD-PVWATTS-V8": /(?:DC capacity|module type|array type|system losses|tilt|azimuth|site location)/i,
  "STD-WIND-SAM": /(?:wind turbine|turbine model|power curve|hub height|loss factor|analysis year|site location)/i,
  "STD-EPA-CHP-PERFORMANCE": /(?:prime[- ]mover|input fuel|unit model|installed capacity|operating load|capacity factor|fuel availability|fuel unit|heating value|conversion technology|coincident|thermal load|boiler)/i,
  "STD-FUELECONOMY-VEHICLES": /(?:vehicle class|vehicle model|kWh per mile)/i,
  "STD-WATERSENSE-CI-OPERATIONS": /(?:leak|cycles of concentration|evaporation|heat rejection)/i
};

function inferLookupInputs(category, standardIds) {
  const inputs = [];
  for (const value of category.inputs.User) {
    const label = semanticLookupInput(
      category.id,
      friendlyTechnicalInput(
      friendlyTreeLabel(value.split(" > ").at(-1), category.id),
      "User"
      )
    );
    if (!label) continue;
    if (!inputs.includes(label)) inputs.push(label);
  }
  for (const value of category.inputs.Profile) {
    const label = friendlyTreeLabel(value.split(" > ").at(-1), category.id);
    if (!inputs.includes(label)) inputs.push(label);
  }
  const standardId = standardIds[0];
  if (standardId === "STD-DOE-MEASUR") {
    const engineeringInputs = inputs.filter(
      (input) =>
        !/(?:Timestamped interval|Time zone|tariff mapping|current project fuel price)/i.test(
          input
        ) &&
        !(
          category.standardIds.includes("STD-OPERATING-SCHEDULE") &&
          LOOKUP_INPUT_PATTERNS_BY_STANDARD["STD-OPERATING-SCHEDULE"].test(input)
        )
    );
    if (category.standardIds.includes("STD-OPERATING-SCHEDULE")) {
      engineeringInputs.push("Annual operating hours from the connected schedule process");
    }
    return engineeringInputs;
  }
  if (standardId === "STD-REOPT-LOCAL-DISPATCH") {
    const dispatchInputs = inputs.filter((input) =>
      /(?:Timestamped interval|Time zone|tariff mapping|power capacity|energy capacity|efficiency|state of charge|state constraint|dispatch|reserve|availability|thermal capacity|charge limit|discharge limit|standing loss|thermal state|component types|annual operating profile|site power|charger power|arrival|departure|required energy|charging template|uncontrolled charging|port count|fleet miles|depot allocation|vehicle class|kWh per mile)/i.test(
        input
      )
    );
    if (category.id === "ITC-24") {
      dispatchInputs.push("Interval solar generation from the connected PVWatts process");
    }
    if (category.id === "ITC-26") {
      dispatchInputs.push(
        "Interval generation and resource profiles from the connected PVWatts, wind, and onsite-generation processes"
      );
    }
    if (category.id === "ITC-28") {
      dispatchInputs.push(
        "Resolved vehicle electricity intensity from the connected vehicle process",
        "Resolved charger efficiency, standby power, and rated capacity from the connected product process"
      );
    }
    return [...new Set(dispatchInputs)];
  }
  const standardPattern = LOOKUP_INPUT_PATTERNS_BY_STANDARD[standardId];
  if (standardPattern) {
    const selected = inputs.filter((input) => standardPattern.test(input));
    if (
      standardId === "STD-EPA-CHP-PERFORMANCE" &&
      category.standardIds.includes("STD-OPERATING-SCHEDULE")
    ) {
      selected.push("Annual operating hours from the connected schedule process");
    }
    return [...new Set(selected)];
  }
  return inputs;
}

function semanticLookupInput(categoryId, input) {
  const label = String(input || "").replace(/\s+\((?:User|Profile|Bill|Linked Opportunity)\)$/, "");
  if (/^Timestamped Interval Electricity Data$/i.test(label)) {
    return "Timestamped interval utility data from the uploaded utility artifact";
  }
  if (/^Time Zone and Daylight-Saving Treatment/i.test(label)) {
    return "Time zone and daylight-saving metadata from the uploaded utility artifact";
  }
  if (/^(?:Complete Tariff Calendar and Billing Rules|Billing-Demand and Ratchet Rules)$/i.test(label)) {
    return "Authoritative tariff mapping, which is not yet verified";
  }
  if (/(?:distribution|load or speed fraction|load fraction|annual hours for each bin)/i.test(label)) {
    return `${label} from an uploaded site study, controls trend, or engineering audit`;
  }
  if (
    categoryId === "ITC-28" &&
    /^(?:Measured kWh per Mile|Vehicle-arrival schedule|Vehicle-departure schedule|Uncontrolled charging rule)$/i.test(label)
  ) {
    return `${label} from the fleet study or contractor charging design`;
  }
  if (
    /(?:specific power|pressure|flow|efficiency|temperature|load fraction|standby|tested fuel|heating value|rated shaft|rated speed)/i.test(
      label
    )
  ) {
    return `${label} from a nameplate, measurement, audit, or contractor specification`;
  }
  return label;
}

function processKeyForStandard(standardId) {
  return standardId.toLowerCase().replace(/^std-/, "").replaceAll("-", "_");
}

function processNameForCategory(category, standardId) {
  const base = PROCESS_LIBRARY[standardId].name;
  if (standardId === "STD-DOE-MEASUR") {
    return `${shortCategorySubject(category)} Engineering Calculation`;
  }
  if (standardId === "STD-OPERATING-SCHEDULE") {
    return `${shortCategorySubject(category)} Annual Operating Hours`;
  }
  if (standardId === "STD-REOPT-LOCAL-DISPATCH") {
    return `${shortCategorySubject(category)} Interval Bill Calculation`;
  }
  if (standardId === "STD-EPA-CHP-PERFORMANCE") {
    return `${shortCategorySubject(category)} Performance Balance`;
  }
  return base;
}

function shortCategorySubject(category) {
  return CARD_COPY[category.id].title
    .replace(/High-Efficiency /, "")
    .replace(/ Resource Savings$/, "")
    .replace(/ Routine Resource Use$/, "");
}

function buildPresentationTree(category, processes) {
  if (category.id === "ITC-02") return buildExteriorLightingTree();
  if (category.id === "ITC-15") {
    return node("Annual Direct Operational Savings: $0", [
      node("Study, Monitoring, Certification, or Enabling Activity (Linked Opportunity)"),
      node("No direct purchased-resource reduction is assigned to this activity (Derived)")
    ]);
  }
  if (category.id === "ITC-29") return buildVehicleTree();
  if (category.id === "ITC-27") return buildPublicChargingTree();
  if (category.id === "ITC-32") return buildFlowFixtureTree();
  if (category.id === "ITC-33") return buildFlushFixtureTree();
  if (category.id === "ITC-39") return buildVariableSpeedTree();
  if (category.id === "ITC-52") return buildDishwasherTree();
  if (category.id === "ITC-54") return buildBackupPowerTree();

  const transformed = transformTreeNode(category.expandedTree, category, processes);
  transformed.text = rootLabelFor(category);
  ensureEveryProcessIsReferenced(transformed, processes);
  return applySemanticOwnership(category.id, transformed);
}

function buildExteriorLightingTree() {
  return node("Annual Operational Savings", [
    node("Annual Electricity Reduction", [
      node("Replacement Fixture Count (User)"),
      node("Existing Fixture Watts", [
        node("Existing Fixture Type or Application (User)"),
        node("Existing Nameplate, Photometric Report, or Field Measurement (User)"),
        node("No Existing Wattage Value Without Documentation or Measurement (Derived)")
      ]),
      node("New Fixture Watts", [
        node("Linked Opportunity names an exact replacement product", [
          node("Exact Product Information (Linked Opportunity)"),
          processNode("exact-new-fixture-watts")
        ]),
        node("Linked Opportunity specifies requirements but no exact product", [
          node("Product Requirements (Linked Opportunity)"),
          processNode("requirement-new-fixture-watts")
        ])
      ]),
      node("Annual Operating Hours", [
        node("Exterior Lighting Operating Pattern (User)", [
          node("Lighting follows a fixed or business schedule", [
            node("Lighting Hours per Operating Day (User)"),
            node("Operating Days per Week (User)"),
            node("Active Weeks per Year (User)"),
            processNode("fixed-lighting-hours")
          ]),
          node("Lighting is dusk-to-dawn or photocell-controlled", [
            node("Control Type and Timing Offset (User)"),
            node("Site Location (Profile)"),
            processNode("daylight-lighting-hours")
          ])
        ])
      ]),
      processNode("lighting-replacement-calculation")
    ]),
    node("Bill-Derived Electricity Rate", [
      node("Electricity Use (Bill)"),
      node("Variable Delivery Charges (Bill)"),
      node("Variable Generation Charges (Bill)"),
      node("Avoidable Electricity Rate (Derived)")
    ])
  ]);
}

function buildPublicChargingTree() {
  return node("Annual Operational Cost Impact", [
    buildIntervalLoadTree(),
    node("Installed Charger Count (User)"),
    node("Public Operating Hours (User)"),
    node("Expected Charging Activity", [
      node("Expected Sessions per Operating Day from Site Study or Opportunity Design (Linked Opportunity)"),
      node("Average Delivered Energy per Session from Site Study or Opportunity Design (Linked Opportunity)"),
      node("Documented Interval Charging Profile from Site Study or Contractor Design (Linked Opportunity)"),
      node("No Utilization Estimate Without a Site Study or Contractor Design (Derived)")
    ]),
    node("Charger Performance", [
      node("Linked Opportunity names an exact charger", [
        node("Exact Charger Product Information (Linked Opportunity)"),
        processNode("exact-charger-rating")
      ]),
      node("Linked Opportunity specifies charger requirements but no exact product", [
        node("Charger Requirements (Linked Opportunity)"),
        processNode("requirement-charger-rating")
      ])
    ]),
    node("Charging-Station Interval Load Profile (Derived)"),
    processNode("reopt_local_dispatch")
  ]);
}

function buildFlowFixtureTree() {
  return node("Annual Operational Savings", [
    node("Annual Water and Heating-Resource Reduction", [
      node("In-Scope Fixture Count (User)"),
      node("Observed Fixture Activity", [
        node("Approximate Uses per Operating Day (User)"),
        node("Operating Days per Week (User)"),
        node("Active Weeks per Year (User)"),
        node("Typical Minutes per Use (User)"),
        node("No Usage Estimate Without Observed or Documented Activity (Derived)")
      ]),
      node("Existing Fixture", [
        node("Existing Fixture Type or Application (User)"),
        node("Existing Rated Flow from Label, Specification, or Measurement (User)"),
        node("No Existing Flow Value Without a Label, Specification, or Measurement (Derived)")
      ]),
      node("Water-Heating Service", [
        node("Fixture Uses Hot Water (User)"),
        node("Water-Heating Fuel Type (User)"),
        node("Water-Heater Nameplate or Commissioning Information, if available (User)"),
        node("No Heating-Resource Estimate Without Documented Temperature and Efficiency Inputs (Derived)")
      ]),
      node("Flow Fixture Performance", [
        node("Linked Opportunity names an exact flow fixture", [
          node("Exact Flow Fixture Product Information (Linked Opportunity)"),
          processNode("exact-proposed-fixture-rating")
        ]),
        node("Linked Opportunity specifies flow fixture requirements but no exact product", [
          node("Flow Fixture Requirements (Linked Opportunity)"),
          processNode("requirement-proposed-fixture-rating")
        ])
      ])
    ]),
    buildBillRateTreeForComponents([
      "electric-volumetric",
      "gas-volumetric",
      "water-volumetric",
      "sewer-volumetric"
    ])
  ]);
}

function buildFlushFixtureTree() {
  return node("Annual Operational Savings", [
    node("Annual Water Reduction", [
      node("In-Scope Fixture Count (User)"),
      node("Observed Flush Activity", [
        node("Approximate Flushes per Operating Day (User)"),
        node("Operating Days per Week (User)"),
        node("Active Weeks per Year (User)"),
        node("No Usage Estimate Without Observed or Documented Activity (Derived)")
      ]),
      node("Existing Fixture", [
        node("Existing Toilet or Urinal Type (User)"),
        node("Existing Gallons per Flush from Label, Specification, or Measurement (User)"),
        node("No Existing Flush-Volume Value Without a Label, Specification, or Measurement (Derived)")
      ]),
      node("Flush Fixture Performance", [
        node("Linked Opportunity names an exact flush fixture", [
          node("Exact Flush Fixture Product Information (Linked Opportunity)"),
          processNode("exact-proposed-fixture-rating")
        ]),
        node("Linked Opportunity specifies flush fixture requirements but no exact product", [
          node("Flush Fixture Requirements (Linked Opportunity)"),
          processNode("requirement-proposed-fixture-rating")
        ])
      ])
    ]),
    buildBillRateTreeForComponents(["water-volumetric", "sewer-volumetric"])
  ]);
}

function buildVariableSpeedTree() {
  return node("Annual Operational Savings", [
    node("Annual Variable-Speed Electricity Reduction", [
      node("In-Scope Equipment Count (User)"),
      node("Existing Equipment Nameplate and Load Information from Uploaded Audit or Measurement (Linked Opportunity)"),
      node("Measured Load-Bin Profile", [
        node("Load or Speed Fractions from Controls Trends or Engineering Audit (Linked Opportunity)"),
        node("Annual Hours by Bin from Controls Trends or Engineering Audit (Linked Opportunity)"),
        node("No Load-Bin Estimate Without Measured or Audited Operating Data (Derived)")
      ]),
      node("Proposed Minimum Speed and Control Rule (Linked Opportunity)"),
      processNode("doe_measur")
    ]),
    buildBillRateTreeForComponents(["electric-volumetric"])
  ]);
}

function buildDishwasherTree() {
  return node("Annual Operational Savings", [
    node("Annual Commercial Dishwasher Resource Reduction", [
      node("In-Scope Equipment Count (User)"),
      buildCertifiedProductTreeForLabel("Commercial Dishwasher"),
      node("Certified Activity Basis", [
        node("Rack Machines", [
          node("Approximate Racks per Operating Day (User)"),
          node("Operating Days per Week (User)"),
          node("Active Weeks per Year (User)")
        ]),
        node("Flight or Conveyor Machines", [
          node("Documented Conveyor Operating Hours and Throughput from Controls or Audit (Linked Opportunity)")
        ]),
        node("Do Not Convert Gallons per Rack to Gallons per Hour (Derived)")
      ]),
      node("Idle Operation", [
        node("Documented Energized and Active-Wash Hours from Controls or Operating Records (User)"),
        node("Annual Idle Hours (Derived)")
      ]),
      node("Certified Native Performance Difference (Derived)"),
      node("Separate Water-Heating Resource Impact", [
        node("No Estimate Without a Documented Engineering Conversion Outside the Product Dataset (Derived)")
      ])
    ]),
    buildBillRateTreeForComponents([
      "electric-volumetric",
      "gas-volumetric",
      "water-volumetric",
      "sewer-volumetric"
    ])
  ]);
}

function buildBackupPowerTree() {
  return node("Annual Routine Backup-Power Resource Cost", [
    node("In-Scope Equipment Count (User)"),
    node("Backup Technology and Fuel Type (User)"),
    node("Routine Test Fuel", [
      node("Test Fuel Use from Product Label, Manufacturer Document, or Commissioning Record (Linked Opportunity)"),
      node("Scheduled Test Hours from Maintenance Plan or Contractor Specification (Linked Opportunity)"),
      node("No Routine Fuel Estimate Without Both Documented Values (Derived)")
    ]),
    node("Standby Electricity", [
      node("Standby Input from Product Label, Manufacturer Document, or Commissioning Record (Linked Opportunity)"),
      node("Energized Hours from Controls Schedule or Commissioning Record (Linked Opportunity)"),
      node("No Standby Electricity Estimate Without Both Documented Values (Derived)")
    ]),
    node("Blocked Until Routine-Use Documentation Is Available (Derived)"),
    buildBillRateTreeForComponents(["electric-volumetric", "gas-volumetric", "fuel-price"])
  ]);
}

function buildVehicleTree() {
  return node("Annual Operational Savings", [
    node("Avoided Gasoline Cost", [
      node("Vehicles Replaced (User)"),
      node("Annual Miles per Vehicle (User)"),
      node("Existing Vehicle Make and Model (User)"),
      node("Approximate Model Year (User)"),
      node("Additional Version or Drivetrain Details, only when the match is ambiguous (User)"),
      processNode("fueleconomy_vehicles"),
      node("Avoided Gasoline Use (Derived)"),
      node("Current Gasoline Price (User)")
    ]),
    node("Added Electricity Cost", [
      node("Proposed Vehicle Make and Model (Linked Opportunity)"),
      node("Approximate Model Year (Linked Opportunity)"),
      node("Additional Version or Drivetrain Details, only when the match is ambiguous (Linked Opportunity)"),
      processNode("fueleconomy_vehicles"),
      node("Added Electricity Use (Derived)"),
      node("Bill-Derived Electricity Rate", [
        node("Electricity Use (Bill)"),
        node("Variable Delivery Charges (Bill)"),
        node("Variable Generation Charges (Bill)"),
        node("Avoidable Electricity Rate (Derived)")
      ])
    ]),
    node("Equivalent Required Vehicle Service Confirmed (User)")
  ]);
}

function transformTreeNode(original, category, processes) {
  const clean = stripInternalTreeText(original.text);
  if (/^Annual billed resource/i.test(clean)) return buildAnnualBillTree(category);
  if (/^Avoidable marginal resource price/i.test(clean)) return buildBillRateTree(category);
  if (/^Chronological load and tariff/i.test(clean)) return buildIntervalLoadTree();
  if (/^In-scope quantity/i.test(clean)) return node("In-Scope Equipment Count (User)");
  if (/^Certified existing and proposed product resolution/i.test(clean)) {
    return buildCertifiedProductTree(category);
  }

  const children = [];
  for (const child of original.children) {
    const childClean = stripInternalTreeText(child.text);
    if (
      ["ITC-27", "ITC-28"].includes(category.id) &&
      /^(?:Linked Opportunity|Charger Class or Intended Application|Selected Charger Model, if known|Rated (?:Charger )?Power or Capacity)(?:\s*\(User\))?$/i.test(childClean)
    ) {
      continue;
    }
    if (
      ["ITC-32", "ITC-33"].includes(category.id) &&
      /^Fixture selection$/i.test(clean) &&
      /^(?:Linked Opportunity|Proposed fixture type|Proposed rated)/i.test(childClean)
    ) {
      continue;
    }
    if (
      PRODUCT_CATEGORY_LABELS[category.id] &&
      child.children.length === 0 &&
      /\(Standard\)$/.test(childClean) &&
      /certified|rating/i.test(childClean)
    ) {
      children.push(node("Certified Performance Difference (Derived)"));
      continue;
    }
    const transformed = transformTreeNode(child, category, processes);
    if (Array.isArray(transformed)) children.push(...transformed);
    else children.push(transformed);
  }

  if (category.id === "ITC-34" && /^Proposed irrigation configuration$/i.test(clean)) {
    return node(
      friendlyTreeLabel(clean, category.id),
      children.map((child) => relabelLeafSource(child, "User", "Linked Opportunity"))
    );
  }

  if (/\(Standard\)$/.test(clean)) {
    const matches = matchProcesses(clean, processes);
    if (matches.length === 1) return processNode(matches[0].key);
    if (matches.length > 1) {
      if (matches.some((match) => /^(?:exact|requirement)-.*(?:charger|fixture)-rating$/.test(match.key))) {
        return buildExactRequirementTree(category, matches);
      }
      return node(friendlyTreeLabel(clean.replace(/\s*\(Standard\)$/, ""), category.id), matches.map((match) => processNode(match.key)));
    }
  }
  if (/\{\{intermediate:/.test(original.text)) {
    if (/Linked Opportunity|Canonical retrofit ID/i.test(clean)) {
      return node("Opportunity Equipment or Performance Requirements (Linked Opportunity)");
    }
    return node(`${friendlyTreeLabel(clean, category.id)} (Derived)`, children);
  }
  return node(friendlyTreeLabel(clean, category.id), children);
}

function buildExactRequirementTree(category, matches) {
  const exact = matches.find((match) => /^exact-.*(?:charger|fixture)-rating$/.test(match.key));
  const requirement = matches.find((match) => /^requirement-.*(?:charger|fixture)-rating$/.test(match.key));
  const otherProcesses = matches.filter((match) => ![exact?.key, requirement?.key].includes(match.key));
  const subject = ["ITC-27", "ITC-28"].includes(category.id)
    ? "Charger"
    : category.id === "ITC-32"
      ? "Flow Fixture"
      : "Flush Fixture";
  return node(`${subject} Performance`, [
    ...otherProcesses.map((process) => processNode(process.key)),
    node(`Linked Opportunity names an exact ${subject.toLowerCase()}`, [
      node(`Exact ${subject} Product Information (Linked Opportunity)`),
      processNode(exact.key)
    ]),
    node(`Linked Opportunity specifies ${subject.toLowerCase()} requirements but no exact product`, [
      node(`${subject} Requirements (Linked Opportunity)`),
      processNode(requirement.key)
    ])
  ]);
}

function relabelLeafSource(treeNode, from, to) {
  if (treeNode.processKey) return treeNode;
  return node(
    treeNode.text.replace(new RegExp(`\\s*\\(${from}\\)$`), ` (${to})`),
    treeNode.children.map((child) => relabelLeafSource(child, from, to))
  );
}

function buildCertifiedProductTree(category) {
  const label = PRODUCT_CATEGORY_LABELS[category.id];
  return buildCertifiedProductTreeForLabel(label);
}

function buildCertifiedProductTreeForLabel(label) {
  return node(`${label} Performance`, [
    node(`Existing ${label}`, [
      node(`Existing ${label} Type or Application (User)`),
      node("Existing Make and Model, when available (User)"),
      node("Existing Capacity or Size Class, when available (User)"),
      processNode("existing-product-rating")
    ]),
    node(`Proposed ${label}`, [
      node("Linked Opportunity names an exact product", [
        node("Exact Product Information (Linked Opportunity)"),
        processNode("exact-proposed-product-rating")
      ]),
      node("Linked Opportunity specifies requirements but no exact product", [
        node("Product Requirements (Linked Opportunity)"),
        processNode("requirement-proposed-product-rating")
      ])
    ])
  ]);
}

function buildAnnualBillTree(category) {
  const children = [];
  if (category.resources.includes("electricity")) children.push(node("Annual Electricity Use (Bill)"));
  if (category.resources.includes("gas")) children.push(node("Annual Gas Use (Bill)"));
  if (category.resources.includes("water-sewer")) children.push(node("Annual Water Use and Unit (Bill)"));
  children.push(node("Billing Period Coverage (Bill)"));
  return node("Annual Billed Resource Use", children);
}

function buildBillRateTree(category) {
  return buildBillRateTreeForComponents(category.semanticContract.rate_components || []);
}

function buildBillRateTreeForComponents(rateComponents) {
  const components = new Set(rateComponents);
  const children = [];
  if (components.has("electric-volumetric")) {
    children.push(node("Bill-Derived Electricity Rate", [
      node("Electricity Use (Bill)"),
      node("Variable Delivery Charges (Bill)"),
      node("Variable Generation Charges (Bill)"),
      node("Avoidable Electricity Rate (Derived)")
    ]));
  }
  if (
    components.has("electric-time-of-use") ||
    components.has("electric-demand") ||
    components.has("electric-export") ||
    components.has("electric-export-non-bypassable")
  ) {
    children.push(node("Interval Tariff Value", [
      node("Rate Schedule and Customer Class (Bill)"),
      node("Authoritative Tariff Mapping Is Not Yet Verified (Derived)"),
      node("No Interval Dollar Estimate Until Tariff Rules Are Resolved (Derived)")
    ]));
  }
  if (components.has("gas-volumetric")) {
    children.push(node("Bill-Derived Gas Rate", [
      node("Gas Use (Bill)"),
      node("Variable Delivery Charges (Bill)"),
      node("Variable Procurement Charges (Bill)"),
      node("Avoidable Gas Rate (Derived)")
    ]));
  }
  if (components.has("water-volumetric")) {
    children.push(node("Bill-Derived Water Rate", [
      node("Water Use and Unit (Bill)"),
      node("Variable Water Charges (Bill)"),
      node("Avoidable Water Rate (Derived)")
    ]));
  }
  if (components.has("sewer-volumetric")) {
    children.push(node("Bill-Derived Sewer Rate", [
      node("Sewer-Billed Water Use (Bill)"),
      node("Variable Sewer Charges (Bill)"),
      node("Avoidable Sewer Rate (Derived)")
    ]));
  }
  if (components.has("fuel-price")) children.push(node("Documented Current Fuel Price (User)"));
  return node("Applicable Resource Rates", children);
}

function buildIntervalLoadTree() {
  return node("Chronological Electricity Load and Tariff", [
    node("Timestamped Interval Utility Data (Bill)"),
    node("Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)"),
    node("Rate Schedule and Customer Class (Bill)"),
    node("Authoritative Tariff Mapping Is Not Yet Verified (Derived)"),
    node("No Interval Dollar Estimate Until Tariff Rules Are Resolved (Derived)"),
    node("Monthly Bill Reconciliation When Tariff Mapping Exists (Derived)")
  ]);
}

function applySemanticOwnership(categoryId, treeNode) {
  if (treeNode.processKey) return treeNode;
  const children = treeNode.children.map((child) => applySemanticOwnership(categoryId, child));
  if (!treeNode.text.endsWith("(User)")) return node(treeNode.text, children);

  const label = treeNode.text.replace(/\s+\(User\)$/, "");
  if (/^Timestamped Interval Electricity Data$/i.test(label)) {
    return node("Timestamped Interval Utility Data (Bill)", children);
  }
  if (/^Time Zone and Daylight-Saving Treatment/i.test(label)) {
    return node("Time Zone and Daylight-Saving Metadata from the Uploaded Utility Artifact (Bill)", children);
  }
  if (/^(?:Complete Tariff Calendar and Billing Rules|Billing-Demand and Ratchet Rules)$/i.test(label)) {
    return node("No Interval Dollar Estimate Until an Authoritative Tariff Mapping Is Verified (Derived)", children);
  }
  if (
    /(?:session-(?:arrival|duration)|delivered-kWh) distribution|probability distribution/i.test(label)
  ) {
    return node(`Documented ${label.replace(/ distribution/i, " profile")} from Site Study or Contractor Design (Linked Opportunity)`, children);
  }
  if (/(?:load or speed fraction|load fraction|annual hours for each bin|load-bin)/i.test(label)) {
    return node(`Documented ${label} from Controls Trends or Engineering Audit (Linked Opportunity)`, children);
  }
  if (
    /(?:specific power|pressure rise|total dynamic head|required pressure|required flow|required airflow|system pressure|steam pressure|mean flow|water-heater efficiency|temperature rise|hot-water fraction|purchased water-heating input per certified|certified resource input per|standby electric input|tested fuel use)/i.test(
      label
    )
  ) {
    return node(`Documented ${label} from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)`, children);
  }
  if (
    categoryId === "ITC-28" &&
    /^(?:Measured kWh per Mile|Vehicle-arrival schedule|Vehicle-departure schedule|Uncontrolled charging rule)$/i.test(label)
  ) {
    return node(`${label} from Fleet Study or Contractor Charging Design (Linked Opportunity)`, children);
  }
  if (
    /(?:\befficiency\b|\bCOP\b|\bpower\b|\bkW\b|\bkWh\b|\bflow\b|\bpressure\b|\btemperature\b|\bheat loss\b|\bload fraction\b|\bcapacity factor\b|\bheating value\b|\bcycles of concentration\b|\bevaporation\b|\bthermal-load constraint\b|\belectric-load constraint\b|\bcontrol sequence\b|\bcontrol profile\b|\bsite power limit\b|\bdepot allocation fraction\b|\brebound or recovery constraint\b|\bmaximum shed\b|\bmaximum event duration\b|\bevent-availability schedule\b|\bcontrollable-load definition\b)/i.test(
      label
    )
  ) {
    return node(`Documented ${label} from Nameplate, Measurement, Audit, or Contractor Specification (Linked Opportunity)`, children);
  }
  if (
    /(?:share of billed|Affected-load share|Coincident (?:Onsite Electric|Useful-Heat) Load|Interval HVAC thermal load|Existing Design Airflow|Existing airflow schedule|Motor rated speed|Useful Process Load|(?:Certified Test|Tested Duty) Unit|Annual Idle Hours|Existing fuel use per operating hour|Required energy by departure|Managed charging template|Unmanaged charging template|Vehicle-(?:arrival|departure) schedule|Water-heating share)/i.test(
      label
    )
  ) {
    return node(`Documented ${label} from Submeter, Controls Trend, Audit, or Contractor Specification (Linked Opportunity)`, children);
  }
  return node(treeNode.text, children);
}

function matchProcesses(text, processes) {
  const matches = processes.filter((process) =>
    process.canonicalStandardIds.some((standardId) => PROCESS_LIBRARY[standardId].match.test(text))
  );
  if (matches.length > 0) return matches;
  return processes.length === 1 ? processes : [];
}

function ensureEveryProcessIsReferenced(root, processes) {
  const referenced = new Set(collectProcessReferences(root));
  const missing = processes.filter((process) => !referenced.has(process.key));
  if (missing.length === 0) return;
  const target = root.children.find((child) => !/Rate|Price|Tariff/.test(child.text)) || root;
  target.children.push(...missing.map((process) => processNode(process.key)));
}

function collectProcessReferences(root, ordered = [], seen = new Set()) {
  if (root.processKey && !seen.has(root.processKey)) {
    seen.add(root.processKey);
    ordered.push(root.processKey);
  }
  for (const child of root.children) collectProcessReferences(child, ordered, seen);
  return ordered;
}

function assignProcessNumbers(categoryId, processes) {
  if (categoryId === "ITC-02") {
    return new Map([
      ["exact-new-fixture-watts", "1.1"],
      ["requirement-new-fixture-watts", "1.2"],
      ["fixed-lighting-hours", "2.1"],
      ["daylight-lighting-hours", "2.2"],
      ["lighting-replacement-calculation", "3.1"]
    ]);
  }
  return new Map(processes.map((process, index) => [process.key, `1.${index + 1}`]));
}

function buildBroaderFormula(category) {
  if (category.id === "ITC-15") return "Annual Direct Operational Savings = $0";
  if (
    /baseline_annual_bill - proposed(?:_[a-z]+)*_bill|unmanaged_annual_bill - managed_annual_bill|baseline_grid_and_fuel_bill - proposed_grid_and_fuel_bill/.test(
      category.primaryFormula
    )
  ) {
    return "Annual Operational Savings =\nBaseline Annual Bill − Proposed Annual Bill";
  }
  if (/annual_bill_credits - annual_subscription_charges/.test(category.primaryFormula)) {
    return "Annual Operational Savings =\nAnnual Bill Credits − Annual Subscription Charges";
  }
  if (/^`S = -\(/.test(category.primaryFormula)) {
    return "Annual Operational Impact =\n− Routine Fuel and Electricity Cost";
  }
  if (/ - |−/.test(category.primaryFormula) && /(added_|proposed_electric|CHP_input|input_biomass|annual_induction)/.test(category.primaryFormula)) {
    return "Annual Operational Savings =\nAvoided Existing Resource Cost − Added New Resource Cost";
  }
  if (/Σ_t/.test(category.primaryFormula)) {
    return "Annual Operational Savings =\nOnsite Electricity Offset Value + Credited Export Value";
  }
  if (category.id === "ITC-08") {
    return "Annual Operational Savings =\nAnnual Backup-Resource Reduction × Applicable Backup-Resource Rate";
  }
  const rateComponents = new Set(category.semanticContract.rate_components || []);
  if (
    category.resources.length === 1 &&
    category.resources[0] === "electricity" &&
    [...rateComponents].every((component) => component.startsWith("electric-"))
  ) {
    return "Annual Operational Savings =\nAnnual Electricity Reduction × Bill-Derived Electricity Rate";
  }
  if (
    category.resources.length === 1 &&
    category.resources[0] === "gas" &&
    [...rateComponents].every((component) => component === "gas-volumetric")
  ) {
    return "Annual Operational Savings =\nAnnual Gas Reduction × Bill-Derived Gas Rate";
  }
  if (
    category.resources.length === 1 &&
    category.resources[0] === "water-sewer"
  ) {
    return rateComponents.has("sewer-volumetric")
      ? "Annual Operational Savings =\nAnnual Water Reduction × Applicable Bill-Derived Water and Sewer Rate"
      : "Annual Operational Savings =\nAnnual Water Reduction × Bill-Derived Water Rate";
  }
  return "Annual Operational Savings =\nAnnual Resource Reduction × Applicable Bill-Derived Resource Rate";
}

function buildExpandedFormula(category) {
  const formulas = [category.primaryFormula];
  if (!/^No (?:additional|supporting) formula is required\.$/i.test(category.supportingFormulas.trim())) {
    formulas.push(category.supportingFormulas);
  }
  return formulas
    .join("\n\n")
    .replaceAll("`", "")
    .split("\n")
    .map((line) => humanizeFormulaLine(line))
    .map((line) => applyCategoryFormulaLabels(line, category))
    .filter((line, index, lines) => line || (index > 0 && lines[index - 1]))
    .join("\n");
}

function humanizeFormulaLine(line) {
  let output = line;
  const sorted = [...IDENTIFIER_LABELS.entries()].sort(([left], [right]) => right.length - left.length);
  for (const [identifier, label] of sorted) {
    const escaped = identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    output = output.replace(
      new RegExp(`(?<![A-Za-z0-9_])${escaped}(?![A-Za-z0-9_])`, "g"),
      label
    );
  }
  output = output
    .replaceAll("BR-ANNUAL-BILL-RESOURCE", "Annual Billed Resource Use")
    .replaceAll("BR-AVOIDABLE-RESOURCE-RATE", "Applicable Bill-Derived Resource Rate")
    .replaceAll("Σ_available_intervals", "Sum Across Available Intervals of")
    .replaceAll("Σ_period", "Sum Across Billing Periods of")
    .replaceAll("Σ_bins", "Sum Across Load Bins of")
    .replaceAll("Σ_r", "Sum Across Resources of")
    .replaceAll("Σ_t", "Sum Across Intervals of")
    .replaceAll("to_energy", "Convert to Common Energy Units")
    .replaceAll("to_billed_unit", "Convert to Billed Resource Units")
    .replaceAll("min(", "Minimum of (")
    .replaceAll("max(", "Maximum of (")
    .replace(/\b[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)+\b/g, (identifier) => humanizeIdentifier(identifier))
    .replace(/\bperiod\b/g, "Billing Period")
    .replace(/\bbins\b/g, "Load Bins")
    .replace(/\br\b/g, "Resource")
    .replace(/\bt\b/g, "Interval")
    .replace(/\bKWh\b/g, "kWh")
    .replace(/\bKW\b/g, "kW")
    .replace(/\b100lb\b/g, "100 Pounds")
    .replace(/\b(Convert to (?:Common Energy Units|Billed Resource Units))\(/g, "$1 (");
  return output.trimEnd();
}

function applyCategoryFormulaLabels(line, category) {
  if (category.id === "ITC-54") {
    return line.replace(/^Annual Operational Savings = -\(/, "Annual Operational Impact = -(");
  }
  const rateComponents = new Set(category.semanticContract.rate_components || []);
  if (rateComponents.has("gas-volumetric") && !rateComponents.has("fuel-price")) {
    return line.replaceAll("Current Fuel Price", "Bill-Derived Gas Rate");
  }
  return line;
}

function humanizeIdentifier(value) {
  return IDENTIFIER_LABELS.get(value) ||
    value
      .replace(/[,_]/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
}

function rootLabelFor(category) {
  if (category.id === "ITC-54") return "Annual Routine Backup-Power Resource Cost";
  if (["ITC-27", "ITC-28", "ITC-51"].includes(category.id)) return "Annual Operational Cost Impact";
  return "Annual Operational Savings";
}

function friendlyTreeLabel(value, categoryId) {
  let text = stripInternalTreeText(value)
    .replace(/\s*\((?:User|Profile|Bill|Standard)\)$/, "")
    .replace(/\s*\[[A-Z0-9-]+\]\s*$/, "")
    .replace(/\bCanonical retrofit ID from linked-opportunity taxonomy match\b/i, "Applicable Upgrade Requirements")
    .replace(/\bLinked Opportunity\b/i, "Opportunity Equipment or Performance Requirements")
    .replace(/\bClimate zone resolved from site\.geo\.coordinates or site\.geo\.countyFips\b/i, "Site Climate Zone")
    .replace(/\bsite\.geo\.coordinates and business\.primaryActivityText\b/i, "Site Location and Business Activity")
    .replace(/\bsite\.geo coordinates and business\.primaryActivityText\b/i, "Site Location and Business Activity")
    .replace(/\bsite\.buildingTypes and site\.squareFootage\.value\b/i, "Building Type and Area")
    .replace(/\bsite\.geo\.coordinates(?:, verified rather than address-only)?\b/i, "Site Location")
    .replace(/\bsite\.geo\.stateCode or site\.geo\.countyFips\b/i, "Site State or County")
    .replace(/\bsite\.buildingTypes(?: canonical)? commercial building type\b/i, "Building Type")
    .replace(/\bsite\.buildingTypes canonical building type\b/i, "Building Type")
    .replace(/\bsite\.squareFootage\.value[^,]*/i, "Building Area")
    .replace(/\bbusiness\.primaryActivityText usage context\b/i, "Business Activity")
    .replace(/\bsite\.addressStructured\.zip5[^,]*/i, "Site ZIP Code")
    .replace(/\bsite\.geo coordinates\b/i, "Site Location")
    .replace(/\bFuelEconomy\.gov ID\b/gi, "Approximate Model Year")
    .replace(/\bcomb08\b/gi, "Existing Vehicle Combined Fuel Economy")
    .replace(/\bcombE\b/gi, "Proposed Vehicle Electricity per 100 Miles")
    .replace(/\bEVSE interval load profile\b/i, "Charging-Station Interval Load Profile")
    .replace(/\bBR-[A-Z0-9-]+\b/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  text = text.replace(/^Site ZIP Code, approximate only when parsed from an unmatched raw address$/i, "Site ZIP Code");

  text = text
    .replace(/^Existing-condition selector$/i, "Existing Building Condition")
    .replace(/^Proposed-option selector$/i, "Proposed Upgrade Option");
  if (categoryId === "ITC-08") {
    text = text.replace(
      /^Annual delivered hot-water thermal load$/i,
      "Hot-Water Load from Project Design or Measurement"
    );
  }

  const source = /\(Profile\)$/.test(value)
    ? "Profile"
    : /\(Bill\)$/.test(value)
      ? "Bill"
      : /\(User\)$/.test(value)
        ? proposedSpecificationSource(text, categoryId)
        : null;
  if (source) text = `${friendlyTechnicalInput(text, source)} (${source})`;
  return text;
}

function proposedSpecificationSource(text, categoryId) {
  if (
    categoryId === "ITC-18" &&
    /^(?:Allocated or credited|Credit rate|Subscription charge|Contract escalation|Contract term)/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    categoryId === "ITC-08" &&
    /^(?:Collector|Tilt$|Azimuth$|Storage volume$|Hot-Water Load from Project Design or Measurement$)/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (/^Proposed Upgrade Option$/i.test(text)) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-17", "ITC-24", "ITC-26"].includes(categoryId) &&
    /^(?:DC capacity|Module Type|Array type|System losses|Tilt|Azimuth)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-19", "ITC-26"].includes(categoryId) &&
    /^(?:Wind Turbine Class or Intended Application|Exact Turbine Model or Power Curve|Hub Height|Loss factor)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-23", "ITC-24", "ITC-26"].includes(categoryId) &&
    /^(?:Power capacity|Usable-energy capacity|Charge efficiency|Discharge efficiency|Initial state of charge|Terminal state-of-charge constraint|Dispatch-availability schedule|Reserve constraint)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    categoryId === "ITC-25" &&
    /^(?:Thermal capacity|Charge limit|Discharge limit|Charge efficiency|Discharge efficiency|Standing loss|Initial Thermal State|Terminal thermal-state constraint)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-20", "ITC-21", "ITC-22", "ITC-26"].includes(categoryId) &&
    /^(?:Prime mover|Prime-mover type|Input fuel|Conversion technology|Total installed capacity|Installed capacity|Annual capacity factor|Annual operating profile)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    ["ITC-27", "ITC-28"].includes(categoryId) &&
    /^(?:Charger Class or Intended Application|Rated (?:Charger )?Power or Capacity|Installed port count)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    categoryId === "ITC-45" &&
    /^(?:Recovery-equipment efficiency|Recovery auxiliary power)$/i.test(text)
  ) {
    return "Linked Opportunity";
  }
  if (
    /^(?:Proposed .*(?:efficiency|input|power|rating|rated|model|capacity|configuration|COP|type|class|mode|rule|technology|schedule|profile|minimum speed|cycles of concentration|kWh)|Selected .*(?:model|capacity|configuration)|New .*(?:efficiency|input|power|rating|model|capacity|configuration|COP)|Collector |PV array|Battery configuration)/i.test(text) &&
    !["ITC-30", "ITC-48", "ITC-49", "ITC-54"].includes(categoryId)
  ) {
    return "Linked Opportunity";
  }
  return "User";
}

function friendlyTechnicalInput(text, source) {
  if (source !== "User") return text;
  return text
    .replace(/\bCount of identical units in project scope\b/i, "In-Scope Equipment Count")
    .replace(/\bTimestamped Green Button interval kW or kWh artifact; no current canonical bill-dictionary field\b/i, "Timestamped Interval Electricity Data")
    .replace(/\bInterval timezone and daylight-saving treatment from the uploaded interval artifact\b/i, "Time Zone and Daylight-Saving Treatment from Uploaded Interval Data")
    .replace(/\bVerified tariff calendar for the modeled interval import energy; the current bill parser has no complete canonical tariff artifact\b/i, "Complete Tariff Calendar and Billing Rules")
    .replace(/\bVerified billing-demand and ratchet rules applied to interval kW\b/i, "Billing-Demand and Ratchet Rules")
    .replace(/\bExisting full-load input kW\b/i, "Existing Equipment Nameplate and Load Information")
    .replace(/\bExisting motor input or shaft rating\b/i, "Existing Motor Nameplate or Measurement")
    .replace(/\bPump input kW\b/i, "Pump Nameplate or Measured Input")
    .replace(/\bExisting fan input power\b/i, "Existing Fan Nameplate or Measured Input")
    .replace(/\bExisting compressor specific power\b/i, "Existing Compressor Nameplate or Test Information")
    .replace(/\bProposed compressor specific power\b/i, "Proposed Compressor Specifications")
    .replace(/\bExisting pump efficiency\b/i, "Existing Pump Nameplate or Test Information")
    .replace(/\bExisting motor efficiency\b/i, "Existing Motor Nameplate or Test Information")
    .replace(/\bProposed pump efficiency\b/i, "Proposed Pump Specifications")
    .replace(/\bProposed motor efficiency\b/i, "Proposed Motor Specifications")
    .replace(/\bExisting fan efficiency\b/i, "Existing Fan Nameplate or Test Information")
    .replace(/\bProposed fan efficiency\b/i, "Proposed Fan Specifications")
    .replace(/\bBackup efficiency\b/i, "Backup-System Nameplate or Test Information")
    .replace(/\bExisting water-heating system efficiency\b/i, "Existing Water-Heater Nameplate or Test Information")
    .replace(/\bBoiler efficiency\b/i, "Boiler Nameplate or Combustion-Test Information")
    .replace(/\bExisting process efficiency\b/i, "Existing Process Nameplate or Test Information");
}

function stripInternalTreeText(value) {
  return String(value || "")
    .replace(/\s*\{\{(?:lookup|constant|output|input|resource|component|intermediate):\s*[^}]+\}\}/g, "")
    .replace(/\s*\[BR-[A-Z0-9-]+\]\s*/g, " ")
    .trim();
}

function node(text, children = []) {
  return { text, children };
}

function processNode(processKey) {
  return { text: "", children: [], processKey };
}

export function buildUserInputRealismEntries(categoryId, tree, processes) {
  const entries = [];
  const processByKey = new Map(processes.map((process) => [process.key, process]));

  const visit = (treeNode, path) => {
    const nextPath = [...path, treeNode];
    if (
      !treeNode.processKey &&
      treeNode.children.length === 0 &&
      treeNode.text.endsWith("(User)")
    ) {
      const visibleLabel = treeNode.text.replace(/\s+\(User\)$/, "");
      const connectedProcessKey = findConnectedProcessKey(nextPath, processByKey);
      const documentedSource = PROJECT_DOCUMENT_PATTERN.test(visibleLabel);
      const likelyKnown =
        USER_LIKELY_KNOWN_PATTERN.test(visibleLabel) && !documentedSource;
      const alternateSource = likelyKnown
        ? "NONE"
        : /(?:share of billed|current .* price)/i.test(visibleLabel)
          ? "BILL"
          : documentedSource
            ? "PROJECT_DOCUMENT"
            : connectedProcessKey
              ? "STANDARD"
              : "PROJECT_DOCUMENT";
      const valueImportance = /(?:if known|if available|optional|additional version)/i.test(
        visibleLabel
      )
        ? "MODERATE"
        : /(?:count|hours|days|weeks|miles|activity|type|model|fuel|price|measurement|documented)/i.test(
            visibleLabel
          )
          ? "HIGH"
          : "MODERATE";
      const entry = {
        category_id: categoryId,
        tree_path: nextPath
          .filter((item) => !item.processKey)
          .map((item) => item.text.replace(/\s+\((?:User|Profile|Bill|Linked Opportunity|Derived)\)$/, ""))
          .join(" > "),
        visible_label: visibleLabel,
        knowledge_likelihood: likelyKnown ? "LIKELY_KNOWN" : "MAY_KNOW",
        recognizable_to_ordinary_user: true,
        reason_the_user_would_have_it: likelyKnown
          ? "This is a recognizable project, equipment, vehicle, schedule, or operating fact that a business representative can ordinarily describe."
          : alternateSource === "BILL"
            ? "The user may recognize the value, but the preferred proof is a bill, invoice, or utility record."
            : alternateSource === "STANDARD"
              ? "The user may know the recognizable selector, while the connected process resolves the technical value."
              : "The user may have access to a label, nameplate, measurement, operating record, uploaded audit, or contractor document that states the value.",
        value_importance: valueImportance,
        alternate_source: alternateSource,
        missing_value_behavior: alternateSource === "NONE"
          ? "Do not infer the fact. Follow the connected branch or return no estimate when the formula cannot proceed without it."
          : alternateSource === "BILL"
            ? "Use the documented bill, invoice, or utility value when present; otherwise return no dollar estimate for the affected component."
            : alternateSource === "STANDARD"
              ? "Use the connected Standard only within its supported source scope; otherwise return no value."
              : "Require a label, measurement, uploaded project document, or contractor specification; otherwise return no value."
      };
      if (connectedProcessKey && alternateSource === "STANDARD") {
        entry.connected_process_key = connectedProcessKey;
      }
      entries.push(entry);
    }
    for (const child of treeNode.children) visit(child, nextPath);
  };

  visit(tree, []);
  return entries;
}

function findConnectedProcessKey(path, processByKey) {
  for (const ancestor of [...path].reverse()) {
    const keys = collectProcessReferences(ancestor).filter((key) => processByKey.has(key));
    if (keys.length === 1) return keys[0];
  }
  return null;
}

export const INFORMATION_CARD_REGISTRY_METADATA = {
  registryType: "operational_savings_information_card_registry",
  schemaVersion: "1.1.0",
  categoryCount: Object.keys(CARD_COPY).length,
  requiredCardFields: [
    "categoryId",
    "title",
    "retrofitNames",
    "overview",
    "broaderFormula",
    "expandedFormula",
    "tree",
    "processes"
  ],
  requiredProcessFields: [
    "key",
    "displayNumber",
    "name",
    "canonicalStandardIds",
    "sourceName",
    "purpose",
    "lookupInputs",
    "valueNeeded",
    "howToUse",
    "automation",
    "validation",
    "evidenceState"
  ]
};
