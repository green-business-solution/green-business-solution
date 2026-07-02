# Fake Green Button Seed Report

Generated at: 2026-06-26T23:10:01.859Z
Mode: write
Count requested: 5
Seed: 124
Customer type filter: mixed

## Summary

- Fake clients generated: 5
- Customer types generated: business_commercial, other, nonprofit, industrial_manufacturing
- Fixture files used: TestGBDataHourlyNineDaysBinnedDaily.xml, TestGBDataOneYearDailyBinnedMonthly.xml, TestGBDataThirteenMonthsBinnedDailyWCost.xml
- Extracted fields found: annual_kwh, billing_period_end, billing_period_start, monthly_kwh, rate_schedule, utility_provider
- Failed parses or writes: 5

## Results

| Email | Customer type | Fixture | Status | Extracted fields |
| --- | --- | --- | --- | --- |
| seed-124-business-commercial-0-casey-lee@example.com | business_commercial | TestGBDataHourlyNineDaysBinnedDaily.xml | failed | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, rate_schedule, utility_provider |
| seed-124-other-1-morgan-martinez@example.com | other | TestGBDataOneYearDailyBinnedMonthly.xml | failed | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, utility_provider |
| seed-124-business-commercial-2-logan-garcia@example.com | business_commercial | TestGBDataThirteenMonthsBinnedDailyWCost.xml | failed | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, rate_schedule, utility_provider |
| seed-124-nonprofit-3-logan-rivera@example.com | nonprofit | TestGBDataHourlyNineDaysBinnedDaily.xml | failed | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, rate_schedule, utility_provider |
| seed-124-industrial-manufacturing-4-jordan-martinez@example.com | industrial_manufacturing | TestGBDataOneYearDailyBinnedMonthly.xml | failed | annual_kwh, billing_period_end, billing_period_start, monthly_kwh, utility_provider |

## Failures

- seed-124-business-commercial-0-casey-lee@example.com: Upload PUT failed with HTTP 301
- seed-124-other-1-morgan-martinez@example.com: Upload PUT failed with HTTP 301
- seed-124-business-commercial-2-logan-garcia@example.com: Upload PUT failed with HTTP 301
- seed-124-nonprofit-3-logan-rivera@example.com: Upload PUT failed with HTTP 301
- seed-124-industrial-manufacturing-4-jordan-martinez@example.com: Upload PUT failed with HTTP 301
