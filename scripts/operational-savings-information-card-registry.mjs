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
    validation: "The official V8 field contract was checked and the retained fixture validates required fields, units, source version, and unsupported defaults. The source can calculate generation but cannot choose system capacity or array configuration for the project."
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
    validation: "The official Version 2.0 scope and equations were checked, and the retained fixture validates the design-method boundary. The tool compares designed allowances and does not prove actual existing consumption, irrigation scheduling, or whole-site bill allocation."
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
          valueNeeded: [`Proposed ${ratedValue} with units and product provenance`]
        }),
        makeProcess(category, standard.id, "requirement-proposed-fixture-rating", `Requirement-Based Proposed ${fixtureLabel} Resolution`, {
          sourceLinkLabels: category.id === "ITC-32"
            ? ["WaterSense commercial-building resources", "WaterSense at Work best-management-practice guide"]
            : undefined,
          purpose: `Interpret the linked opportunity requirements and determine whether they identify a compatible ${fixtureLabel.toLowerCase()} rating.`,
          lookupInputs: ["Fixture requirements from the linked opportunity", "Fixture type and application", "Required water-use criterion"],
          valueNeeded: [`One compatible proposed ${ratedValue}, or no value when the requirements do not identify a supported product`]
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
          valueNeeded: ["Certified active efficiency, standby power, and rated capacity with units"]
        }),
        makeProcess(category, standard.id, "requirement-charger-rating", "Requirement-Based Charger Resolution", {
          sourceLinkLabels: ENERGY_STAR_LINK_SELECTIONS[category.id],
          purpose: "Interpret charger requirements from the opportunity and determine whether a compatible certified product record can supply the needed performance values.",
          lookupInputs: ["Charger class and intended application", "Rated power requirement", "Opportunity performance requirements"],
          valueNeeded: ["One compatible certified product result, or no value when the requirements do not identify a supported record"]
        })
      );
      continue;
    }
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
        : undefined,
      automationMethod: standard.id === "STD-OPERATING-SCHEDULE"
        ? "Apply the supplied operating days, shifts, active weeks, holidays, and measured-hour overrides to a versioned local calendar calculation."
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
    ],
    selectedStrategy: includesEnergyStar
      ? "Product-family lookup across the applicable DOE certification export and ENERGY STAR dataset, matched to an exact model or explicit requirement set."
      : "Product-specific DOE certification export matched to an exact basic model.",
    automationMethod: includesEnergyStar
      ? "Query the applicable CCMS and ENERGY STAR product-family datasets, normalize manufacturer and model identifiers, apply the active specification and required capacity filters, reject ambiguous matches, and return only compatible certified fields."
      : "Download the applicable DOE product export, normalize manufacturer and model details, require one active compatible record, and return only the certified fields for that product family."
  };
  return [
    makeCombinedProcess(category, canonicalStandardIds, "existing-product-rating", `Existing ${label} Rating Resolution`, {
      ...combinedSourceOverrides,
      purpose: `Resolve the existing ${label.toLowerCase()} performance only from a documented exact model or retained certification record.`,
      lookupInputs: [`Existing ${label.toLowerCase()} type or application`, "Existing make and model, when available", "Existing capacity or size class"],
      valueNeeded: [`Existing certified ${label.toLowerCase()} performance with its exact unit, or no value when no exact record is supported`]
    }),
    makeCombinedProcess(category, canonicalStandardIds, "exact-proposed-product-rating", `Exact Proposed ${label} Rating Lookup`, {
      ...combinedSourceOverrides,
      purpose: `Resolve proposed ${label.toLowerCase()} performance when the linked opportunity names an exact product.`,
      lookupInputs: ["Exact proposed make and model from the linked opportunity", "Product type and capacity", "Applicable certified test method"],
      valueNeeded: [`Proposed certified ${label.toLowerCase()} performance with its exact unit`]
    }),
    makeCombinedProcess(category, canonicalStandardIds, "requirement-proposed-product-rating", `Requirement-Based Proposed ${label} Resolution`, {
      ...combinedSourceOverrides,
      purpose: `Interpret the linked opportunity requirements and determine whether they identify a compatible certified ${label.toLowerCase()} record.`,
      lookupInputs: ["Product requirements from the linked opportunity", "Required application and capacity", "Applicable efficiency or resource-use criteria"],
      valueNeeded: [`One compatible proposed ${label.toLowerCase()} result, or no value when the requirements do not identify a supported record`]
    })
  ];
}

function buildExteriorLightingProcesses(category) {
  return [
    makeProcess(category, "STD-FEMP-EXTERIOR-LIGHTING", "existing-fixture-watts", "Existing Fixture Wattage Estimate", {
      purpose: "Determine whether recognizable existing fixture information is sufficient to resolve installed input watts.",
      lookupInputs: ["Existing fixture type or application", "Existing nameplate or measured watts, when available"],
      valueNeeded: ["Existing input watts per fixture, or no value when no supported installed-baseline source applies"]
    }),
    makeProcess(category, "STD-FEMP-EXTERIOR-LIGHTING", "exact-new-fixture-watts", "Exact New Fixture Wattage Lookup", {
      purpose: "Resolve input watts when the linked opportunity names an exact replacement luminaire.",
      lookupInputs: ["Exact replacement product information from the linked opportunity", "Exterior lighting application"],
      valueNeeded: ["Exact proposed input watts per fixture with product provenance"]
    }),
    makeProcess(category, "STD-FEMP-EXTERIOR-LIGHTING", "requirement-new-fixture-watts", "Requirement-Based New Fixture Wattage Resolution", {
      purpose: "Interpret performance requirements when the linked opportunity does not name an exact replacement product.",
      lookupInputs: ["Product requirements from the linked opportunity", "Exterior lighting application", "Required light output or performance criteria"],
      valueNeeded: ["Compatible proposed input watts, or no value when the requirements do not identify a supported product"]
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
        validation: "The arithmetic and unit conversion are deterministic and correspond to the displayed formula. The result is executable only when fixture count, existing watts, proposed watts, and annual operating hours have all been resolved; the reviewed source gaps for those inputs remain visible in the connected processes."
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
  const lookupInputs = overrides.lookupInputs || inferLookupInputs(category);
  const outputSummary = valueNeeded.join("; ").replace(/\.$/, "");
  const process = {
    key,
    name,
    canonicalStandardIds: standardIds,
    sourceName: overrides.sourceName || primary.sourceName,
    purpose: overrides.purpose || `Use ${primary.sourceName} to resolve ${lowercaseFirst(outputSummary)} from the listed category inputs.`,
    lookupInputs,
    valueNeeded,
    howToUse: overrides.howToUse || buildHowToUse(primary, lookupInputs, valueNeeded),
    automation: {
      selectedStrategy: overrides.selectedStrategy || primary.strategy,
      automationMethod: overrides.automationMethod || primary.method,
      difficulty: overrides.difficulty || primary.difficulty
    },
    validation: overrides.validation || buildValidation(category, standardIds)
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
  return [...new Set(summaries)].join(" ");
}

function buildHowToUse(library, lookupInputs, valueNeeded) {
  const inputSummary = lookupInputs.slice(0, 3).join("; ");
  const outputSummary = valueNeeded.join("; ").replace(/\.$/, "");
  return [
    inputSummary
      ? `Validate these inputs and preserve the source of each supplied value: ${inputSummary}.`
      : "Validate the required project information and preserve the source of each supplied value.",
    library.method,
    "Reject missing, ambiguous, incompatible, or out-of-scope records instead of inserting a generic default.",
    `Return ${lowercaseFirst(outputSummary)}.`,
    "Store the source version, selected record or method, input units, and any warnings with the result."
  ];
}

function lowercaseFirst(value) {
  return value ? `${value.charAt(0).toLowerCase()}${value.slice(1)}` : value;
}

function inferLookupInputs(category) {
  const inputs = [];
  for (const value of category.inputs.User) {
    const label = friendlyTechnicalInput(
      friendlyTreeLabel(value.split(" > ").at(-1), category.id),
      "User"
    );
    if (!inputs.includes(label)) inputs.push(label);
  }
  for (const value of category.inputs.Profile) {
    const label = friendlyTreeLabel(value.split(" > ").at(-1), category.id);
    if (!inputs.includes(label)) inputs.push(label);
  }
  return inputs.slice(0, 8);
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

  const transformed = transformTreeNode(category.expandedTree, category, processes);
  transformed.text = rootLabelFor(category);
  ensureEveryProcessIsReferenced(transformed, processes);
  return transformed;
}

function buildExteriorLightingTree() {
  return node("Annual Operational Savings", [
    node("Annual Electricity Reduction", [
      node("Replacement Fixture Count (User)"),
      node("Existing Fixture Watts", [
        node("Existing Fixture Type or Application (User)"),
        processNode("existing-fixture-watts")
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
  const components = new Set(category.semanticContract.rate_components || []);
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
      node("Complete Time-of-Use, Demand, and Export Rules (User)"),
      node("Interval Rate Application (Derived)")
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
    node("Timestamped Interval Electricity Data (User)"),
    node("Time Zone and Daylight-Saving Treatment from the Uploaded Data (User)"),
    node("Rate Schedule and Customer Class (Bill)"),
    node("Complete Tariff Calendar and Billing Rules (User)"),
    node("Monthly Bill Reconciliation (Derived)")
  ]);
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
      ["existing-fixture-watts", "1.1"],
      ["exact-new-fixture-watts", "1.2"],
      ["requirement-new-fixture-watts", "1.3"],
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

export const INFORMATION_CARD_REGISTRY_METADATA = {
  registryType: "operational_savings_information_card_registry",
  schemaVersion: "1.0.0",
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
    "validation"
  ]
};
