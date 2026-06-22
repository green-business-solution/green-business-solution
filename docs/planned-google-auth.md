# Planned Google Authentication

The current development version uses six-digit temporary codes as user IDs.

Local development now supports Google sign-in through Google Identity Services:

1. The React app renders the Google sign-in button with the web client ID.
2. The browser sends Google's returned identity credential to the local API.
3. The API verifies the Google ID token signature, issuer, expiration, verified email, and audience.
4. The API links the Google identity to an existing active `gbs-users` record by `googleSubject` or matching email.

The default local web client ID is embedded because it is public OAuth metadata, not a secret. It can be overridden with:

```sh
VITE_GOOGLE_CLIENT_ID=google-web-client-id
GOOGLE_CLIENT_ID=google-web-client-id
```

The Google client secret is not needed for this browser ID-token flow and must not be committed.

Linked user records include:

```json
{
  "authProvider": "google",
  "googleLinked": true,
  "googleSubject": "google-oauth-sub",
  "googleEmail": "user@example.com",
  "linkedAt": "ISO timestamp"
}
```

Admin access should move away from temporary codes before any public deployment. The local admin Google endpoint grants admin access only when the matched app user already has `role: "admin"`. A future production version should also keep an explicit allowlist of admin emails:

- `neerkuchlous@gmail.com`
- `pmrajvansh@gmail.com`
