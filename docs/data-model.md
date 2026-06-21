# Data Model

The local development app writes to DynamoDB in the Green Business Solution AWS account.

## Tables

### `gbs-users`

Primary key:

- `userId` string, currently a six-digit temporary code

Representative fields:

- `role`: `client` or `admin`
- `status`: `active`
- `fullName`
- `email`
- `companyName`
- `authProvider`: currently `temporaryCode`
- `googleLinked`: boolean, currently `false`
- `createdAt`
- `updatedAt`
- `lastLoginAt`

Seeded admin users:

- Neer Kuchlous, temporary admin code `471140`
- Rajvansh Gupta, temporary admin code `768383`

### `gbs-client-intake`

Primary key:

- `userId` string, matching the user table

Representative fields:

- `submissionId`
- `contact`
- `business`
- `sustainability`
- `createdAt`
- `updatedAt`

## Local API

The browser does not receive AWS credentials. The React app calls the local Node API through Vite's `/api` proxy. The API uses the local AWS CLI SSO profile:

```text
gbs
```

Before running the app, sign in with:

```sh
aws sso login --profile gbs
```

## Diagnostics

Use this checklist when a temporary code works on one laptop but fails on another:

```sh
git pull --ff-only
npm install
aws sso login --profile gbs
aws sts get-caller-identity --profile gbs
npm run dev
curl http://127.0.0.1:8787/api/diagnostics
```

Expected:

- `aws sts get-caller-identity --profile gbs` shows account `448016109714`.
- `npm run dev` starts both the API and Vite.
- the API prints `Green Business Solution API running at http://127.0.0.1:8787`.
- `/api/diagnostics` returns `"ok": true`.

If only Vite is running, the browser can render the pages but form and code submission will fail because `/api` has nothing to talk to.
