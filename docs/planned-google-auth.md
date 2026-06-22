# Google Authentication

Local development uses Google sign-in through Google Identity Services:

1. The React app renders the Google sign-in button with the web client ID.
2. The browser sends Google's returned identity credential to the local API.
3. The API verifies the Google ID token signature, issuer, expiration, verified email, and audience.
4. The API links the Google identity to an existing active `gbs-users` record by `googleSubject` or matching email.
5. The API returns one auth payload with either the client dashboard data or the admin dashboard data.

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

Temporary-code login has been removed. Existing numeric user IDs are treated only as legacy internal database keys.

Admin access is based on the verified Google email allowlist:

- `neerkuchlous@gmail.com`
- `pmrajvansh@gmail.com`
