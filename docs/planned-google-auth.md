# Google Authentication

RetroFi uses Google's OAuth authorization-code redirect flow:

1. The React sign-in button sends the browser to `/api/auth/google/start`.
2. The API creates a short-lived state cookie and redirects the browser to Google.
3. Google redirects back to `/api/auth/google/callback` with an authorization code.
4. The API exchanges the code with Google using the backend-only client secret.
5. The API verifies Google's returned ID token signature, issuer, expiration, verified email, and audience.
6. The API links the Google identity to an existing active `gbs-users` record by `googleSubject` or matching email.
7. The API creates an app session token, stores the auth payload in `sessionStorage` through the callback page, and sends the browser to either `/admin` or `/portal`.

The Google client ID is public OAuth metadata. The Google client secret is required only on the backend and must not be committed:

```sh
GOOGLE_CLIENT_ID=google-web-client-id
GOOGLE_CLIENT_SECRET=google-web-client-secret
GOOGLE_REDIRECT_URI=https://retrofi.org/api/auth/google/callback
```

## Google Console Setup

Use an OAuth 2.0 Web client, then add these Authorized redirect URIs:

```text
https://retrofi.org/api/auth/google/callback
https://www.retrofi.org/api/auth/google/callback
```

For local development, also add the Vite-proxied callback origins you use:

```text
http://localhost:5173/api/auth/google/callback
http://127.0.0.1:5173/api/auth/google/callback
```

Authorized JavaScript origins are not required for this redirect flow, though leaving the older entries in the Google Console is harmless.

If the OAuth consent screen is in testing mode, add Neer, Rajvansh, and any other test account under the Google Auth Platform audience/test users settings.

## Troubleshooting

- If the Google button redirects to an app error before account selection, confirm `GOOGLE_CLIENT_SECRET` is set on the API server.
- If Google account selection succeeds but the app shows a redirect mismatch, compare the current callback URL with the Authorized redirect URIs above.
- If Google account selection succeeds but the app shows an account error, check `/api/health` and `/api/diagnostics` for the configured client ID hint and redirect URI.
- If an admin can authenticate with Google but lands on an error page, check Lambda logs for response-size errors. The admin payload intentionally returns a bounded DSIRE preview so sign-in stays below AWS Lambda synchronous response limits.
- If a non-admin Google user sees "No profile was found," that user needs to complete the intake form first with the same email address.
- If public password signup reports an existing account for an admin email, that is expected fail-closed behavior while the account-claim repair protection keeps the record from being attached to a caller-chosen password.

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
