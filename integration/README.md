# Firefly III integration for ca$h zentrale (development only)

This is **original read-only adapter code**; no Firefly III application code was copied. The existing iPhone design 2.1 and its public PWA remain unchanged.

## Firefly III
- License: AGPL-3.0-or-later (check the upstream repository/license before redistributing any upstream source).
- Install Firefly III **privately** on the Windows PC using the official Docker instructions.
- Enable a private API token; keep it **only on the private backend**, never in this public GitHub repository, PWA, JS bundle, URLs, or browser localStorage.
- This adapter calls \`GET /api/v1/accounts\` and \`GET /api/v1/transactions\` with authenticated read-only requests. It is not an API server and it does not expose credentials to mobile clients.
- Node.js >=20 is required. Run checks using \`node --test integration/firefly-adapter.test.mjs\`.

## Critical integration constraints
- **Not yet deployed:** There is no connected Firefly server, private API gateway, secure iPhone authentication, or persistent encrypted cache.
- Never call the Firefly API directly from the public GitHub Pages frontend.
- A future gateway must use HTTPS/private network, authenticated session, strict CORS, rate limiting, read-only methods, access logs without tokens, and appropriate security controls.
- Balances require a source date and reconciliation; current balances must not be inferred from incomplete historical exports.
- This adapter treats Firefly "transfer" separately from income and expense, uses integer cents, rejects unsupported currencies, and refuses partial paginated results.
- Split transactions are normalized individually; deduplication and account-level reconciling are additional work.
- Before real financial data, require verified encrypted storage, backup restore test, permission gateway and Security Watchdog acceptance.

References:
- https://github.com/firefly-iii/firefly-iii
- https://api-docs.firefly-iii.org/
- https://docs.firefly-iii.org/
