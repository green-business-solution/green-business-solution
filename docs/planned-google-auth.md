# Planned Google Authentication

The current development version uses six-digit temporary codes as user IDs.

Future Google login should add:

1. A Google OAuth sign-in flow.
2. A way for users to enter their existing temporary code after Google sign-in.
3. A backend endpoint that verifies the Google identity and links it to the existing `gbs-users` record.
4. A permanent identity field on the user record, such as:

```json
{
  "authProvider": "google",
  "googleLinked": true,
  "googleSubject": "google-oauth-sub",
  "googleEmail": "user@example.com",
  "linkedAt": "ISO timestamp"
}
```

Admin access should move away from temporary codes before any public deployment. A future production version should grant admin access based on verified Google identity and an allowlist of admin emails:

- `neerkuchlous@gmail.com`
- `pmrajvansh@gmail.com`
