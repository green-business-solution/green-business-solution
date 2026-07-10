# Local Dev Stack

Use `npm run dev:local` to start the local-only stack.

It brings up:

- DynamoDB Local on `http://127.0.0.1:8000`.
- MinIO on `http://127.0.0.1:9000`.
- The API on `http://127.0.0.1:8787`.
- The web client on `http://127.0.0.1:5173`.

Local SDK credentials are static and intentionally non-production.

- Access key: `localaccesskey`
- Secret key: `localsecretkey`
- Region: `us-east-2`

The stack seeds:

- one admin account,
- one client account,
- one `california-endowment-hq` preview account,
- local DynamoDB tables,
- local S3 buckets,
- and one sample utility upload object.

Reset behavior:

- `npm run local:down` stops the containers and removes the local volumes.
- `npm run local:reset` tears everything down and seeds the stack again.

Known AWS-only gaps:

- production Google OAuth redirect and cert behavior,
- real AWS IAM evaluation,
- production DynamoDB regional behavior,
- production S3 ownership and encryption semantics,
- SES delivery and quota notifications.
