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
