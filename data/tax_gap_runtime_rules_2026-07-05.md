# Tax Gap Runtime Rules

Generated: 2026-07-05T02:52:01.498Z

## Summary

- Promoted candidates compiled: 19
- Runtime rule records: 19
- Local workflows updated: 5
- Local workflows added: 0

## Runtime Support

| Bucket | Count |
| --- | --- |
| compiled_to_gated_local_workflow | 1 |
| compiled_to_local_tax_workflow | 3 |
| generic_runtime_model_supported_gated | 4 |
| program_document_tax_bill_or_assessor_gate | 11 |

## Local Workflow Changes

- Added: none
- Updated: local_tax_ca_vernon_business_license_and_parcel_tax_v1, tax_gap_nm_solar_gross_receipts_deduction_v1, tax_gap_ca_los_angeles_business_tax_v1, tax_gap_ca_san_francisco_business_tax_v1, tax_gap_oh_commercial_activity_tax_current_exclusion_v1

## Exact Required Inputs By Rule

### vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1

- Model kind: `local_business_license_or_receipts_tax`
- Runtime support: `compiled_to_local_tax_workflow`
- Runtime status when missing inputs: `needs_tax_profile`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| local_business_tax_class | Vernon business activity classification | tax_profile_or_city_license | tax_profile | blocks_calculation |
| avg_vernon_employees | Average number of employees in Vernon for the tax year | city_business_license_return | tax_profile | blocks_calculation |
| warehouse_square_feet | Qualifying Vernon warehouse square footage | city_business_license_return | retrofit_or_facility_profile | blocks_calculation |
| inorganic_hazardous_waste_gross_receipts_cents | Inorganic hazardous-waste gross receipts | tax_return_or_accounting_system | tax_profile | blocks_calculation |
| organic_or_infectious_hazardous_waste_gross_receipts_cents | Organic or infectious hazardous-waste gross receipts | tax_return_or_accounting_system | tax_profile | blocks_calculation |
| related_party_hazardous_waste_gallons | Related-party hazardous-waste gallons | city_business_license_return | tax_profile | blocks_calculation |
| actual_incoming_tons | Actual incoming tons for waste-to-energy or solid-waste activity | city_business_license_return | tax_profile | blocks_calculation |
| lead_acid_battery_recycling_tons | Lead-acid battery recycling incoming tons | city_business_license_return | tax_profile | blocks_calculation |
| adopted_warehouse_special_parcel_tax_cents_per_100_sqft | Current adopted Vernon warehouse parcel-tax rate per 100 square feet | official_city_rate_schedule_or_tax_bill | tax_profile | blocks_calculation |
| eligible_gross_land_area_sqft | Eligible parcel gross land area | assessor_or_tax_bill | tax_profile | blocks_calculation |
| adopted_public_safety_special_parcel_tax_cents_per_sqft | Current adopted Vernon public-safety parcel-tax rate per square foot | official_city_rate_schedule_or_tax_bill | tax_profile | blocks_calculation |
| taxable_parcel_area_sqft | Taxable parcel area | assessor_or_tax_bill | tax_profile | blocks_calculation |

### sales_use_tax_ambiguous_rule_1

- Model kind: `tax_abatement_or_pilot`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_program_documentation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| executed_chapter_9b_abatement_agreement | Executed Chapter 9B abatement agreement | tax_profile | tax_profile | blocks_calculation |
| certified_granting_authority_resolution | Certified granting-authority resolution | tax_profile | tax_profile | blocks_calculation |
| completed_form_co_caa_and_property_list | Completed Form CO:CAA and property list | tax_profile | tax_profile | blocks_calculation |
| completed_form_st_ex_a2_sales_and_use_tax_certificate_application | Completed Form ST:EX-A2 sales and use tax certificate application | tax_return | tax_document_upload | blocks_calculation |
| alabama_department_of_revenue_sales_and_use_tax_exemption_certificate | Alabama Department of Revenue sales and use tax exemption certificate | tax_return | tax_document_upload | blocks_calculation |
| e_verify_documentation | E-Verify documentation | tax_document_upload | tax_document_upload | blocks_calculation |
| alabama_department_of_commerce_project_notification | Alabama Department of Commerce project notification | tax_return | tax_document_upload | blocks_calculation |
| itemized_invoices_and_transaction_dates | Itemized invoices and transaction dates | invoice_or_contract | project_quote_upload | blocks_calculation |
| tax_base_for_qualifying_tangible_personal_property_and_taxable_services_incorporated_into_the_project | Tax base for qualifying tangible personal property and taxable services incorporated into the project | tax_profile | tax_profile | blocks_calculation |
| state_and_local_sales_and_use_tax_rates | State and local sales and use tax rates | tax_profile | tax_profile | blocks_calculation |
| identification_of_local_education_and_noneducation_tax_components | Identification of local education and noneducation tax components | tax_return | tax_document_upload | blocks_calculation |
| project_placed_in_service_or_completion_date | Project placed-in-service or completion date | tax_profile | tax_profile | blocks_calculation |

### sales_use_tax_ambiguous_rule_4

- Model kind: `sales_use_tax_exemption`
- Runtime support: `generic_runtime_model_supported_gated`
- Runtime status when missing inputs: `needs_tax_profile`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| qualifying_exempt_sales_price_cents | Iowa qualifying exempt invoice sales price | invoice_or_contract | project_quote_upload | blocks_calculation |
| combined_sales_use_tax_rate_decimal | Combined Iowa sales/use tax rate for the sourced transaction | tax_geography_rule_or_user_override | tax_profile | blocks_calculation |
| iowa_exemption_category_confirmed | Iowa exemption category confirmed | tax_profile_or_exemption_certificate | tax_profile | blocks_calculation |
| iowa_primary_use_or_item_eligibility_confirmed | Iowa item/use eligibility confirmed | tax_profile_or_exemption_certificate | tax_profile | blocks_calculation |
| iowa_exemption_certificate_present | Iowa exemption certificate present when required | exemption_certificate_upload | tax_document_upload | blocks_calculation |
| iowa_labor_or_service_classification | Iowa contractor labor/service classification | invoice_or_contract | project_quote_upload | blocks_calculation |

### sales_use_tax_ambiguous_rule_5

- Model kind: `tax_abatement_or_pilot`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_program_documentation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| governor_s_office_of_energy_reta_application | Governor's Office of Energy RETA application | tax_return | tax_document_upload | blocks_calculation |
| approved_public_hearing_record | Approved public hearing record | tax_profile | tax_profile | blocks_calculation |
| governor_s_office_of_energy_legal_order | Governor's Office of Energy legal order | tax_profile | tax_profile | blocks_calculation |
| executed_abatement_agreement | Executed abatement agreement | tax_profile | tax_profile | blocks_calculation |
| certificate_of_eligibility | Certificate of eligibility | tax_return | tax_document_upload | blocks_calculation |
| department_of_taxation_sales_use_tax_fiscal_note | Department of Taxation sales/use tax fiscal note | tax_profile | tax_profile | blocks_calculation |
| governor_s_finance_office_or_property_tax_fiscal_note_where_applicable | Governor's Finance Office or property tax fiscal note where applicable | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| project_county_and_current_combined_sales_use_tax_rate | Project county and current combined sales/use tax rate | tax_profile | tax_profile | blocks_calculation |
| current_local_school_support_tax_rate | Current Local School Support Tax rate | tax_profile | tax_profile | blocks_calculation |
| eligible_purchase_amounts_by_period_and_project_schedule | Eligible purchase amounts by period and project schedule | tax_profile | tax_profile | blocks_calculation |
| transaction_dates_within_the_approved_3_year_sales_use_abatement_period | Transaction dates within the approved 3-year sales/use abatement period | tax_profile | tax_profile | blocks_calculation |
| authorized_purchaser_contractor_and_subcontractor_list | Authorized purchaser, contractor, and subcontractor list | invoice_or_contract | project_quote_upload | blocks_calculation |
| facility_real_and_personal_property_tax_payable_by_year | Facility real and personal property tax payable by year | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| county_tax_district_rate_assessed_value_depreciation_or_assessment_details_and_property_tax_bill_data | County tax district rate, assessed value, depreciation or assessment details, and property tax bill data | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| annual_report_and_certified_payroll_report | Annual report and certified payroll report | tax_profile | tax_profile | blocks_calculation |
| construction_workforce_nevada_residency_wage_health_insurance_capital_investment_permits_licenses_and_non_overlap_with_other_abatements_documentation | Construction workforce, Nevada-residency, wage, health insurance, capital investment, permits, licenses, and non-overlap-with-other-abatements documentation | tax_document_upload | tax_document_upload | blocks_calculation |

### sales_use_tax_ambiguous_rule_8

- Model kind: `gross_receipts_or_bo_rate_preference`
- Runtime support: `compiled_to_local_tax_workflow`
- Runtime status when missing inputs: `needs_filing_confirmation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| eligible_solar_sale_installation_receipts_cents | Eligible New Mexico solar sale-and-installation receipts | invoice_or_contract | project_quote_upload | blocks_calculation |
| applicable_combined_gross_receipts_tax_rate_decimal | Applicable combined New Mexico gross receipts tax rate | tax_geography_rule_or_user_override | tax_profile | blocks_calculation |
| nm_solar_energy_system_eligible | Solar energy system eligibility confirmed under New Mexico rules | tax_profile_or_certificate | tax_profile | blocks_calculation |
| seller_nm_gross_receipts_taxpayer_status_confirmed | Seller/installer New Mexico gross receipts taxpayer status confirmed | seller_or_installer_confirmation | tax_profile | blocks_calculation |
| nm_solar_grt_deduction_pass_through_confirmed | Invoice confirms deduction benefit is passed through to customer | invoice_or_contract | project_quote_upload | blocks_calculation |
| seller_grt_deduction_filing_confirmed | Seller filing confirmation for New Mexico GRT deduction | seller_or_installer_confirmation | tax_document_upload | blocks_calculation |
| nm_rpd_41341_or_equivalent_documentation_present | New Mexico RPD-41341 or equivalent retained documentation present | tax_document_upload | tax_document_upload | blocks_calculation |

### az_renewable_energy_production_tax_credit_skip_v1

- Model kind: `state_income_or_franchise_tax_credit`
- Runtime support: `generic_runtime_model_supported_gated`
- Runtime status when missing inputs: `needs_filing_confirmation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| az_renewable_generator_qualified | Qualified Arizona renewable generator status confirmed | tax_certificate_or_program_document | tax_document_upload | blocks_calculation |
| qualified_resource_type | Qualified resource type | project_profile | retrofit_or_facility_profile | blocks_calculation |
| facility_first_production_date | Facility first-production date | interconnection_or_program_document | tax_document_upload | blocks_calculation |
| az_facility_location_and_land_control_confirmed | Arizona facility location and land control confirmed | program_document | tax_document_upload | blocks_calculation |
| az_grid_transmission_or_interconnection_confirmed | Grid transmission or interconnection documentation confirmed | program_document | tax_document_upload | blocks_calculation |
| az_sale_to_eligible_unrelated_entity_confirmed | Sale to eligible unrelated entity or regulated public service corporation confirmed | program_document | tax_document_upload | blocks_calculation |
| production_year_number | Production year number from 1 through 10 | tax_profile | tax_profile | blocks_calculation |
| calendar_year_kwh_produced | Calendar-year kWh produced | production_meter_or_tax_return | tax_profile | blocks_calculation |
| facility_ownership_percentage | Facility ownership percentage | title_or_tax_return | tax_profile | blocks_calculation |
| ador_certificate_approved | ADOR certificate approval confirmed | tax_certificate_upload | tax_document_upload | blocks_calculation |
| ador_certified_credit_amount_cents | ADOR certified credit amount after aggregate cap | tax_certificate_upload | tax_document_upload | blocks_calculation |
| ador_aggregate_cap_amount_certified | ADOR aggregate cap availability reflected in certificate | tax_certificate_upload | tax_document_upload | blocks_calculation |
| arizona_income_tax_liability_cents | Arizona income tax liability available to absorb the credit | tax_return | tax_document_upload | blocks_calculation |

### co_heat_pump_systems_registered_contractor_credit_skip_v1

- Model kind: `state_income_or_franchise_tax_credit`
- Runtime support: `generic_runtime_model_supported_gated`
- Runtime status when missing inputs: `needs_filing_confirmation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| co_contractor_registered_at_installation | Colorado contractor registered at installation | contractor_confirmation | tax_profile | blocks_calculation |
| co_invoice_separately_states_required_discount | Invoice separately states Colorado required discount | invoice_or_receipt | project_quote_upload | blocks_calculation |
| co_heat_pump_invoice_discount_cents | Colorado heat-pump tax-credit discount shown on invoice | invoice_or_receipt | project_quote_upload | blocks_calculation |
| co_heat_pump_technology_type | Colorado heat-pump technology category | invoice_or_equipment_scope | retrofit_or_facility_profile | blocks_calculation |
| co_heat_pump_property_type | Colorado property type for unit-count rules | project_profile | retrofit_or_facility_profile | blocks_calculation |
| co_contractor_filing_confirmation | Contractor filing confirmation | contractor_or_tax_return_confirmation | tax_document_upload | blocks_calculation |

### ct_green_buildings_credit_skip_v1

- Model kind: `state_income_or_franchise_tax_credit`
- Runtime support: `generic_runtime_model_supported_gated`
- Runtime status when missing inputs: `needs_program_documentation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| tax_year | Tax year | tax_return | tax_document_upload | blocks_calculation |
| ct_chapter_208_taxpayer_status_confirmed | Connecticut Chapter 208 taxpayer status confirmed | tax_return | tax_document_upload | blocks_calculation |
| deep_initial_credit_voucher_valid | Valid DEEP initial credit voucher | program_document | tax_document_upload | blocks_calculation |
| deep_initial_credit_voucher_amount_cents | DEEP initial credit voucher amount | program_document | tax_document_upload | blocks_calculation |
| ct_green_building_project_type | Green building project type | program_document | tax_document_upload | blocks_calculation |
| leed_or_equivalent_certification_level | LEED or equivalent certification level | certification_document | tax_document_upload | blocks_calculation |
| ct_green_building_allowable_costs_cents | Allowable green-building costs | tax_return_or_project_cost_schedule | tax_document_upload | blocks_calculation |
| qualified_square_feet | Qualified square footage | project_profile | retrofit_or_facility_profile | blocks_calculation |
| ct_green_building_available_credit_for_tax_year_cents | Credit available for the claim year | tax_return | tax_document_upload | blocks_calculation |
| ct_chapter_208_tax_after_credit_ordering_cents | Chapter 208 tax after required credit ordering | tax_return | tax_document_upload | blocks_calculation |
| ct_annual_eligibility_certificate_present | Annual eligibility certificate present | certification_document | tax_document_upload | blocks_calculation |
| ct_green_building_bonus_rate_decimal | Applicable statutory bonus rate | program_document | tax_document_upload | optional |

### mt_energy_production_development_abatement_skip_2026_v1

- Model kind: `tax_abatement_or_pilot`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_program_documentation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| deq_certification_status_and_certificate_identifier | DEQ certification status and certificate identifier | tax_return | tax_document_upload | blocks_calculation |
| facility_or_equipment_type_under_mont_code_ann_15_24_3111 | facility or equipment type under Mont. Code Ann. § 15-24-3111 | tax_profile | tax_profile | blocks_calculation |
| facility_address_and_geospatial_location | facility address and geospatial location | tax_return | tax_document_upload | blocks_calculation |
| construction_start_date | construction start date | tax_profile | tax_profile | blocks_calculation |
| operation_commencement_date_or_equipment_purchase_and_placed_in_service_date | operation commencement date or equipment purchase and placed-in-service date | tax_profile | tax_profile | blocks_calculation |
| qualifying_taxable_value_from_montana_department_of_revenue_or_tax_bill | qualifying taxable value from Montana Department of Revenue or tax bill | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| total_mill_rate_for_the_property | total mill rate for the property | tax_profile | tax_profile | blocks_calculation |
| current_year_within_qualifying_period | current year within qualifying period | tax_profile | tax_profile | blocks_calculation |
| prevailing_heavy_construction_wage_documentation | prevailing heavy construction wage documentation | tax_document_upload | tax_document_upload | blocks_calculation |
| carbon_dioxide_sequestration_or_offset_documentation_where_applicable | carbon dioxide sequestration or offset documentation where applicable | tax_document_upload | tax_document_upload | blocks_calculation |
| research_and_development_equipment_value_if_applicable | research and development equipment value if applicable | tax_profile | tax_profile | blocks_calculation |
| confirmation_that_the_same_property_is_not_also_receiving_a_conflicting_15_24_1402_abatement_for_renewable_diesel_or_sustainable_aviation_fuel | confirmation that the same property is not also receiving a conflicting § 15-24-1402 abatement for renewable diesel or sustainable aviation fuel | tax_profile | tax_profile | blocks_calculation |

### ct_uniform_solar_capacity_tax_pa26_refresh_watch_2026_v1

- Model kind: `property_tax_special_valuation`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_assessor_confirmation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| permission_to_operate_date_from_electric_distribution_company_or_municipal_electric_utility | permission-to-operate date from electric distribution company or municipal electric utility | tax_profile | tax_profile | blocks_calculation |
| solar_photovoltaic_system_owner_or_owners | solar photovoltaic system owner or owners | tax_profile | tax_profile | blocks_calculation |
| system_nameplate_capacity_in_megawatts_including_fractional_megawatts | system nameplate capacity in megawatts including fractional megawatts | tax_profile | tax_profile | blocks_calculation |
| generated_load_and_confirmation_that_system_capacity_exceeds_the_load_for_the_location | generated load and confirmation that system capacity exceeds the load for the location | tax_return | tax_document_upload | blocks_calculation |
| parcel_or_parcels_and_municipality_or_municipalities_in_which_the_system_is_located | parcel or parcels and municipality or municipalities in which the system is located | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| nameplate_capacity_allocation_by_municipality_for_multi_municipality_systems | nameplate capacity allocation by municipality for multi-municipality systems | tax_return | tax_document_upload | blocks_calculation |
| state_owned_land_brownfield_landfill_rooftop_canopy_and_critical_facility_microgrid_exclusion_flags | state-owned land, brownfield, landfill, rooftop, canopy, and critical-facility microgrid exclusion flags | tax_profile | tax_profile | blocks_calculation |
| municipal_freeze_or_stabilization_agreement_terms_if_any | municipal freeze or stabilization agreement terms if any | tax_profile | tax_profile | blocks_calculation |
| opm_developed_or_municipal_tax_form_when_available | OPM-developed or municipal tax form when available | tax_profile | tax_profile | blocks_calculation |
| municipal_tax_collector_due_dates_and_installment_schedule | municipal tax collector due dates and installment schedule | tax_profile | tax_profile | blocks_calculation |
| notification_date_and_proof_of_notice_to_the_municipality | notification date and proof of notice to the municipality | tax_return | tax_document_upload | blocks_calculation |

### local_option_followup_1

- Model kind: `property_tax_credit`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_tax_bill`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| baltimore_county_property_account_and_qualified_structure_identifier | Baltimore County property account and qualified structure identifier | tax_profile | tax_profile | blocks_calculation |
| baltimore_county_real_property_tax_amount_attributable_to_the_qualifying_building_or_home | Baltimore County real property tax amount attributable to the qualifying building or home | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| application_type_high_performance_building_or_high_performance_home | application type: high-performance building or high-performance home | tax_return | tax_document_upload | blocks_calculation |
| certification_path_leed_nc_leed_cs_leed_eb_leed_for_homes_national_green_building_standard_or_county_recognized_increased_efficiency_path | certification path: LEED-NC, LEED-CS, LEED-EB, LEED for Homes, National Green Building Standard, or county-recognized increased-efficiency path | tax_return | tax_document_upload | blocks_calculation |
| rating_level_silver_gold_platinum_emerald_or_certified_energy_efficiency_percentage | rating level: Silver, Gold, Platinum, Emerald, or certified energy-efficiency percentage | tax_profile | tax_profile | blocks_calculation |
| documentation_from_an_energy_systems_professional_or_other_required_certifying_professional | documentation from an energy systems professional or other required certifying professional | tax_document_upload | tax_document_upload | blocks_calculation |
| application_filing_date_and_approval_status | application filing date and approval status | tax_return | tax_document_upload | blocks_calculation |
| first_taxable_year_for_which_the_credit_is_sought | first taxable year for which the credit is sought | tax_profile | tax_profile | blocks_calculation |
| remaining_credit_years | remaining credit years | tax_profile | tax_profile | blocks_calculation |
| available_annual_program_cap_allocation | available annual program cap allocation | tax_return | tax_document_upload | blocks_calculation |
| whether_a_revitalization_property_credit_or_other_county_credit_applies_first | whether a revitalization property credit or other county credit applies first | tax_profile | tax_profile | blocks_calculation |
| confirmation_that_the_property_has_not_been_altered_in_a_way_that_terminates_eligibility | confirmation that the property has not been altered in a way that terminates eligibility | tax_profile | tax_profile | blocks_calculation |
| ownership_transfer_status_if_applicable | ownership transfer status if applicable | tax_profile | tax_profile | blocks_calculation |

### local_option_followup_2

- Model kind: `property_tax_credit`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_tax_bill`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| prince_george_s_county_property_tax_account_number | Prince George's County property tax account number | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| current_county_real_property_tax_bill_and_county_only_tax_amount | Current county real property tax bill and county-only tax amount | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| current_county_personal_property_tax_bill_if_claiming_green_business_personal_property_credit | Current county personal property tax bill if claiming Green Business personal property credit | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| allocation_of_county_tax_to_eligible_building_real_property_portion_personal_property_or_exclusively_used_portion | Allocation of county tax to eligible building, real property portion, personal property, or exclusively used portion | tax_return | tax_document_upload | blocks_calculation |
| credit_year_within_the_allowed_term | Credit year within the allowed term | tax_profile | tax_profile | blocks_calculation |
| green_business_certification_from_an_accepted_third_party_certifier_if_applicable | Green business certification from an accepted third-party certifier, if applicable | tax_return | tax_document_upload | blocks_calculation |
| high_performance_certification_level_and_rating_system_if_applicable | High-performance certification level and rating system, if applicable | tax_return | tax_document_upload | blocks_calculation |
| use_and_occupancy_permit_or_other_county_required_property_documentation | Use and occupancy permit or other county-required property documentation | tax_document_upload | tax_document_upload | blocks_calculation |
| lease_and_contractual_property_tax_liability_documentation_if_the_claimant_is_a_lessee | Lease and contractual property-tax liability documentation if the claimant is a lessee | tax_return | tax_document_upload | blocks_calculation |
| confirmation_that_no_prohibited_overlapping_property_tax_credit_is_claimed_for_the_same_property_and_year | Confirmation that no prohibited overlapping property tax credit is claimed for the same property and year | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| county_application_approval_and_funding_availability | County application approval and funding availability | tax_return | tax_document_upload | blocks_calculation |

### local_option_followup_3

- Model kind: `property_tax_credit`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_tax_bill`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| anne_arundel_county_property_account_number | Anne Arundel County property account number | tax_profile | tax_profile | blocks_calculation |
| current_county_real_property_tax_bill | Current County real property tax bill | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| county_tax_amount_attributable_to_the_dwelling_or_building_excluding_land | County tax amount attributable to the dwelling or building excluding land | tax_profile | tax_profile | blocks_calculation |
| remaining_county_property_tax_liability_after_any_other_credits | Remaining County property-tax liability after any other credits | tax_return | tax_document_upload | blocks_calculation |
| solar_or_geothermal_total_paid_cost_for_materials_installation_and_construction | Solar or geothermal total paid cost for materials, installation, and construction | tax_profile | tax_profile | blocks_calculation |
| federal_and_state_grants_and_state_solar_or_geothermal_tax_credits_applied_to_the_project | Federal and State grants and State solar or geothermal tax credits applied to the project | tax_profile | tax_profile | blocks_calculation |
| solar_or_geothermal_installation_date_and_final_inspection_date | Solar or geothermal installation date and final inspection date | tax_profile | tax_profile | blocks_calculation |
| paid_receipts_and_invoices_for_solar_or_geothermal_equipment | Paid receipts and invoices for solar or geothermal equipment | invoice_or_contract | project_quote_upload | blocks_calculation |
| high_performance_building_residential_or_commercial_classification | High-performance building residential or commercial classification | tax_return | tax_document_upload | blocks_calculation |
| high_performance_rating_level_and_certification_documentation | High-performance rating level and certification documentation | tax_return | tax_document_upload | blocks_calculation |
| application_approval_year_for_high_performance_building_credit | Application approval year for high-performance building credit | tax_return | tax_document_upload | blocks_calculation |
| other_county_credits_claimed_for_the_same_property_and_tax_year | Other County credits claimed for the same property and tax year | tax_profile | tax_profile | blocks_calculation |

### local_option_followup_4

- Model kind: `property_tax_exemption`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_assessor_confirmation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| parcel_address_and_tax_map_section_block_lot_identifier | Parcel address and tax map/section-block-lot identifier | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| all_overlapping_taxing_jurisdictions_for_the_parcel_including_county_city_or_town_village_if_applicable_and_school_district | All overlapping taxing jurisdictions for the parcel, including county, city or town, village if applicable, and school district | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| eligible_technology_category | Eligible technology category | tax_return | tax_document_upload | blocks_calculation |
| construction_date_or_contract_interconnection_evidence_satisfying_rptl_487_construction_rules | Construction date or contract/interconnection evidence satisfying RPTL §487 construction rules | invoice_or_contract | project_quote_upload | blocks_calculation |
| taxable_status_date_for_the_assessing_unit | Taxable status date for the assessing unit | tax_profile | tax_profile | blocks_calculation |
| form_rp_487_filing_confirmation | Form RP-487 filing confirmation | tax_return | tax_document_upload | blocks_calculation |
| assessor_approval_and_assessor_approved_exempt_assessed_value | Assessor approval and assessor-approved exempt assessed value | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| incremental_cost_and_total_cost_if_the_rp_487_incremental_cost_calculation_applies | Incremental cost and total cost if the RP-487 incremental-cost calculation applies | tax_profile | tax_profile | blocks_calculation |
| current_official_rptl_487_opt_out_status_for_each_overlapping_taxing_jurisdiction_and_technology_category | Current official RPTL §487 opt-out status for each overlapping taxing jurisdiction and technology category | tax_return | tax_document_upload | blocks_calculation |
| pilot_notice_pilot_agreement_or_official_confirmation_that_no_pilot_is_required | PILOT notice, PILOT agreement, or official confirmation that no PILOT is required | tax_profile | tax_profile | blocks_calculation |
| current_tax_rates_for_each_applicable_non_opt_out_taxing_jurisdiction | Current tax rates for each applicable non-opt-out taxing jurisdiction | tax_profile | tax_profile | blocks_calculation |

### local_option_followup_5

- Model kind: `property_tax_exemption`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_assessor_confirmation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| virginia_locality | Virginia locality | tax_profile | tax_profile | blocks_calculation |
| property_address_and_tax_account_number | Property address and tax account number | tax_profile | tax_profile | blocks_calculation |
| owner_title_holder_confirmation | Owner/title-holder confirmation | tax_profile | tax_profile | blocks_calculation |
| system_type_and_capacity | System type and capacity | tax_profile | tax_profile | blocks_calculation |
| installation_date | Installation date | tax_profile | tax_profile | blocks_calculation |
| whether_the_system_qualifies_for_the_separate_25_kw_or_less_statewide_wholly_exempt_treatment | Whether the system qualifies for the separate 25 kW-or-less statewide wholly exempt treatment | tax_profile | tax_profile | blocks_calculation |
| plans_specifications_narrative_description_and_cost_documentation | Plans, specifications, narrative description, and cost documentation | tax_return | tax_document_upload | blocks_calculation |
| material_and_labor_cost_receipts_invoices_or_contracts | Material and labor cost receipts, invoices, or contracts | invoice_or_contract | project_quote_upload | blocks_calculation |
| permit_and_inspection_records | Permit and inspection records | tax_profile | tax_profile | blocks_calculation |
| local_building_department_certification | Local building-department certification | tax_return | tax_document_upload | blocks_calculation |
| assessor_determined_certified_exemption_value | Assessor-determined certified exemption value | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| current_locality_real_property_tax_rate_and_tax_bill | Current locality real property tax rate and tax bill | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| for_city_of_fairfax_confirmation_that_installation_occurred_on_or_after_january_1_2022 | For City of Fairfax, confirmation that installation occurred on or after January 1, 2022 | tax_profile | tax_profile | blocks_calculation |
| for_non_alexandria_and_non_city_of_fairfax_localities_official_local_ordinance_application_eligible_system_definitions_exemption_percentage_or_valuation_formula_term_and_assessor_workflow | For non-Alexandria and non-City-of-Fairfax localities, official local ordinance, application, eligible system definitions, exemption percentage or valuation formula, term, and assessor workflow | tax_bill_or_assessor | tax_document_upload | blocks_calculation |

### skip_prince_georges_MD_green_business_amount_unverified_v1

- Model kind: `property_tax_credit`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_filing_confirmation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| property_type | property type | tax_profile | tax_profile | blocks_calculation |
| credit_year_index | credit year index | tax_profile | tax_profile | blocks_calculation |
| county_tax_on_eligible_property_portion | County tax on eligible property/portion | tax_profile | tax_profile | blocks_calculation |
| exclusive_use_percentage | exclusive-use percentage | tax_profile | tax_profile | blocks_calculation |
| green_business_certification | green business certification | tax_return | tax_document_upload | blocks_calculation |
| application_approval_and_funding_status | application approval and funding status | tax_return | tax_document_upload | blocks_calculation |
| lease_pass_through_proof_if_leased | lease pass-through proof if leased | tax_profile | tax_profile | blocks_calculation |
| no_overlapping_credit_exemption | no overlapping credit/exemption | tax_profile | tax_profile | blocks_calculation |

### skip_unverified_ca_city_business_license_rates

- Model kind: `local_business_license_or_receipts_tax`
- Runtime support: `compiled_to_gated_local_workflow`
- Runtime status when missing inputs: `needs_tax_profile`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| verified_city | verified city | tax_profile | tax_profile | blocks_calculation |
| business_address_and_nexus_within_city | business address and nexus within city | tax_profile | tax_profile | blocks_calculation |
| tax_period_or_fiscal_year_schedule | tax period or fiscal-year schedule | tax_profile | tax_profile | blocks_calculation |
| business_classification_fund_class_activity_category_or_code_classification | business classification, fund class, activity category, or code classification | tax_return | tax_document_upload | blocks_calculation |
| taxable_gross_receipts_by_city_and_activity_class | taxable gross receipts by city and activity class | tax_return | tax_document_upload | blocks_calculation |
| worldwide_gross_receipts_where_city_exemption_rules_require_them | worldwide gross receipts where city exemption rules require them | tax_return | tax_document_upload | blocks_calculation |
| employee_count_or_average_number_employed | employee count or average number employed | tax_profile | tax_profile | blocks_calculation |
| professional_principals_and_professional_non_professional_employee_counts_where_applicable | professional principals and professional/non-professional employee counts where applicable | tax_profile | tax_profile | blocks_calculation |
| business_location_count | business location count | tax_return | tax_document_upload | blocks_calculation |
| contract_valuation_square_footage_units_machines_tons_gallons_or_other_special_tax_measure_where_applicable | contract valuation, square footage, units, machines, tons, gallons, or other special tax measure where applicable | invoice_or_contract | project_quote_upload | blocks_calculation |
| san_francisco_allocation_apportionment_receipts_and_payroll_inputs | San Francisco allocation/apportionment receipts and payroll inputs | tax_return | tax_document_upload | blocks_calculation |
| current_registration_renewal_or_certificate_status | current registration, renewal, or certificate status | tax_return | tax_document_upload | blocks_calculation |
| proof_of_timely_filing_when_claiming_city_exemptions | proof of timely filing when claiming city exemptions | tax_return | tax_document_upload | blocks_calculation |

### skip_mi_rerz_customer_facing_savings_without_approved_zone_docs

- Model kind: `tax_abatement_or_pilot`
- Runtime support: `program_document_tax_bill_or_assessor_gate`
- Runtime status when missing inputs: `needs_program_documentation`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| state_administrative_board_designation_or_official_designation_record | State Administrative Board designation or official designation record | tax_profile | tax_profile | blocks_calculation |
| michigan_strategic_fund_recommendation_or_approval_documentation | Michigan Strategic Fund recommendation or approval documentation | tax_document_upload | tax_document_upload | blocks_calculation |
| local_unit_consent_or_resolution | local unit consent or resolution | tax_profile | tax_profile | blocks_calculation |
| approved_company_name_and_taxpayer_identifiers | approved company name and taxpayer identifiers | tax_profile | tax_profile | blocks_calculation |
| renewable_energy_facility_type_and_qualifying_operations | renewable energy facility type and qualifying operations | tax_profile | tax_profile | blocks_calculation |
| development_agreement_where_required | development agreement where required | tax_profile | tax_profile | blocks_calculation |
| legal_boundary_parcel_or_facility_map | legal boundary, parcel, or facility map | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| confirmation_that_the_taxpayer_s_operation_is_inside_the_approved_geographic_boundary | confirmation that the taxpayer's operation is inside the approved geographic boundary | tax_profile | tax_profile | blocks_calculation |
| term_start_date_term_end_date_and_current_zone_year | term start date, term end date, and current zone year | tax_profile | tax_profile | blocks_calculation |
| phaseout_schedule_or_applicable_multiplier | phaseout schedule or applicable multiplier | tax_profile | tax_profile | blocks_calculation |
| current_compliance_status_and_proof_taxpayer_is_current_with_state_and_local_taxes | current compliance status and proof taxpayer is current with state and local taxes | tax_profile | tax_profile | blocks_calculation |
| tax_bills_returns_or_assessor_treasury_documents_identifying_eligible_tax_lines | tax bills, returns, or assessor/Treasury documents identifying eligible tax lines | tax_bill_or_assessor | tax_document_upload | blocks_calculation |
| exclusion_of_federal_taxes_local_bond_obligations_school_sinking_fund_special_assessments_sales_use_tax_and_non_exempt_taxes | exclusion of federal taxes, local bond obligations, school sinking fund, special assessments, sales/use tax, and non-exempt taxes | tax_profile | tax_profile | blocks_calculation |
| annual_reporting_or_program_documentation_status | annual reporting or program-documentation status | tax_document_upload | tax_document_upload | blocks_calculation |

### skip_oh_cat_current_exclusion_amount_without_current_return_confirmation

- Model kind: `gross_receipts_or_bo_rate_preference`
- Runtime support: `compiled_to_local_tax_workflow`
- Runtime status when missing inputs: `needs_tax_return`

| Input key | Label | Source strategy | UI placement | Severity |
| --- | --- | --- | --- | --- |
| tax_year | Ohio CAT tax year | tax_return | tax_document_upload | blocks_calculation |
| annual_ohio_taxable_gross_receipts_cents | Annual Ohio taxable gross receipts | tax_return | tax_document_upload | blocks_calculation |
| quarterly_ohio_taxable_gross_receipts_cents | Quarterly Ohio taxable gross receipts | tax_return | tax_document_upload | optional |
| oh_cat_filing_confirmation | Ohio CAT filing/registration confirmation | tax_return | tax_document_upload | blocks_calculation |
| oh_cat_group_taxpayer_status | Single, combined, or consolidated taxpayer group status | tax_return | tax_document_upload | optional |
| oh_cat_exclusion_used_in_prior_quarters_cents | CAT exclusion already used in prior quarters | tax_return | tax_document_upload | optional |

## Interpretation

- GPT Pro research has now been converted into runtime-facing rule and input records.
- Customer-facing inclusion is still disabled by default; these models calculate only when the relevant tax forms, invoices, certificates, or tax-profile values are present.
- The next implementation pass can wire these inputs into the form/upload layer and create or update test cases for jurisdictions that still have no matching profile.
