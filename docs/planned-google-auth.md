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

## Google Console Setup

Use an OAuth 2.0 Web client, then add these Authorized JavaScript origins:

```text
http://localhost:5173
http://127.0.0.1:5173
https://retrofi.org
https://www.retrofi.org
```

Do not add a redirect URI for the current implementation. The browser receives an ID token from Google Identity Services and posts it to `/api/auth/google`; the API verifies that token directly. A redirect URI would only be needed if the app is changed later to an OAuth authorization-code flow.

If the OAuth consent screen is in testing mode, add Neer, Rajvansh, and any other test account under the Google Auth Platform audience/test users settings.

## Troubleshooting

- If the Google button fails before account selection, compare the current browser origin with the Authorized JavaScript origins above.
- If Google account selection succeeds but the app shows an error, check `/api/health` and `/api/diagnostics` for the configured client ID hint and admin allowlist.
- If an admin can authenticate with Google but lands on an error page, check Lambda logs for response-size errors. The admin payload intentionally returns a bounded DSIRE preview so sign-in stays below AWS Lambda synchronous response limits.
- If a non-admin Google user sees "No profile was found," that user needs to complete the intake form first with the same email address.

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
