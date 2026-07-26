# DOE CCMS source adapter

The official unauthenticated certification-data endpoint returned HTTP 403 during the retained 2026-07-23 access probe.
This adapter verifies the exact retained response headers and body and reports `HTTP_403_MANUAL_EXPORT_REQUIRED`.
It does not treat the error response as a certification-data artifact or observed product schema.

The adapter also defines a fail-closed envelope validator for a future operator export.
That validator requires a product-family-specific official template version, template SHA-256, exact ordered headers, export SHA-256, export byte size, timestamp, and original filename.
No product-family contract is bundled because no official template or certification export has been acquired.

All DOE CCMS process contributions remain `ACCESS_BLOCKED`.
The supported next step is a lawful manual export from the official interface followed by a separate exact parser and fixture for each product family.
Browser scraping and a universal inferred CCMS schema are explicitly unsupported.
