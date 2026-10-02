# Workspace operations and onboarding

## Local CLI setup

Check `aiglot --version` and `aiglot help --json`. The verified published
version is 0.3.4; use it for PDF/local binary coverage.

```sh
npm install --global @ai-glot/cli@0.3.4
aiglot --profile my-workspace auth login --scope account:read,batches:read,batches:create
aiglot --profile my-workspace auth status --json
aiglot --profile my-workspace account --json
aiglot --profile my-workspace credits --json
aiglot --profile my-workspace usage --from 2026-10-01 --to 2026-10-02 --granularity day --json
```

Use a named profile deliberately, after setup is authorized. OAuth login uses
the user's own browser; add `--device` for SSH/headless machines. Read-only
login can request just `account:read`. Default login omits `batches:create`;
request it explicitly for translations. Add `batches:write` only if intended
history edits/cancellation need it. Glossary workflows require
`account:read,glossaries:read,glossaries:write` as appropriate.

An environment `AIGLOT_API_KEY` overrides stored credentials even when a
profile is selected. A profile mismatch can therefore come from the environment.
Use `auth status` to inspect credential source; do not print the variable.
CLI OAuth refresh is handled by the CLI; do not implement your own token storage.
Use `doctor` for diagnosis and sanitize its output before sharing.

## MCP and API onboarding

MCP: connect `https://mcp.ai-glot.com/mcp` using the host OAuth flow, consent
to the intended workspace/scopes, then call `get_account`.
A stdio-only local MCP host can use `aiglot mcp` with configured CLI credentials.

REST: use `https://api.ai-glot.com/v1` with an existing OAuth/API-key client.
Create API keys in the app's Developer settings, with least required scopes.
Use the current public authentication guide for OAuth implementation:
https://ai-glot.com/docs/api/authentication. Do not build a new auth system
for a simple local workflow.

## Credit interpretation

Use returned balances/grants, not fixed price or allowance tables. Creating and
planning translations cost no credits; approval reserves the measured plan cost.
Standard and Lite are priced in each plan. Free currently has no monthly refill;
paid features are determined by live entitlements. A credit-pack purchase funds
a balance but is not a plan upgrade.

A future refill estimate is not currently available balance. For a shortage,
show the shortfall and options: reduce scope with consent, choose an entitled
quality tier with consent, wait for an actual refill, or visit app Billing.
Do not buy, upgrade or choose a partial language set implicitly.

Source of truth for workspace administration is https://app.ai-glot.com.
Public clients do not create workspaces, invite members, buy credits, change
subscriptions or mint API keys. CLI logout forgets stored credentials and
attempts OAuth revocation; an environment key can still authenticate afterward.
