# Fake Green Button Seed Report

Generated at: 2026-06-26T22:52:57.914Z
Mode: dry-run
Count requested: 5
Seed: 123
Customer type filter: mixed

## Summary

- Fake clients generated: 5
- Customer types generated: business_commercial, other, agriculture, government_public_agency, industrial_manufacturing
- Fixture files used: TestGBDataHourlyNineDaysBinnedDaily.xml, TestGBDataOneYearDailyBinnedMonthly.xml, TestGBDataThirteenMonthsBinnedDailyWCost.xml
- Extracted fields found: annual_kwh, billing_period_end, billing_period_start, monthly_kwh, rate_schedule, utility_provider
- Failed parses or writes: 0

## Results

| Email | Customer type | Fixture | Status | Extracted fields |
| --- | --- | --- | --- | --- |
| seed-123-business-commercial-0-riley-rivera@example.com | business_commercial | TestGBDataHourlyNineDaysBinnedDaily.xml | dry-run | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, rate_schedule, utility_provider |
| seed-123-other-1-alex-garcia@example.com | other | TestGBDataOneYearDailyBinnedMonthly.xml | dry-run | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, utility_provider |
| seed-123-agriculture-2-parker-rivera@example.com | agriculture | TestGBDataThirteenMonthsBinnedDailyWCost.xml | dry-run | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, rate_schedule, utility_provider |
| seed-123-government-public-agency-3-casey-martinez@example.com | government_public_agency | TestGBDataHourlyNineDaysBinnedDaily.xml | dry-run | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, rate_schedule, utility_provider |
| seed-123-industrial-manufacturing-4-parker-kim@example.com | industrial_manufacturing | TestGBDataOneYearDailyBinnedMonthly.xml | dry-run | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, utility_provider |

## Failures

- None
