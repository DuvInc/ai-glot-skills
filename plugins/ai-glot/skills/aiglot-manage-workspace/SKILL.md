---
name: aiglot-manage-workspace
description: Set up or diagnose AI Glot access, identify the connected workspace, inspect plan entitlements, scopes, credit balance, expiring grants and usage, and guide supported workspace administration. Use for onboarding, credit checks and access problems, not to start translations or change billing without an explicit request.
license: MIT
compatibility: AI Glot CLI, authenticated MCP or REST client. Workspace creation, invitations, billing and credential administration require the AI Glot web app.
---

# Set up and manage your AI Glot workspace

Use [connection guidance](references/connection.md), [method selection](references/methods.md)
and [workspace operations](references/workspace.md). Prefer CLI for local scripts
and files, MCP for a connected assistant, REST for an existing application.

1. Identify the requested outcome: connect, verify identity, check credits,
   inspect usage, diagnose access or guide administration. Onboarding a
   connection is distinct from creating a workspace. Do not start a translation
   as a connectivity test or silently create credentials.
2. Reuse the user's configured connection/profile. If disconnected, recommend
   the appropriate supported OAuth flow with Full access for a new setup,
   unless the user explicitly requests narrower access. Follow the full scope
   list in connection guidance. Do not ask for a token in chat.
   For headless CLI use device OAuth; for unattended CI use an administrator-
   provisioned scoped key in the CI secret manager. Do not initiate interactive
   login on a user's behalf unless their request covers setup.
3. Successfully read account on the intended connection before any writes.
   Report workspace name/slug, plan, credential kind/scopes and relevant
   entitlements; keep raw credential IDs/prefixes out of unnecessary reports.
   Verify this is the workspace the user intends. Resolve mismatch instead of
   changing profiles or workspace implicitly.
4. Check actual scopes as well as capabilities. Read-only diagnostics need
   account:read. Translation additionally needs batches:read and batches:create;
   history changes/cancellation need batches:write; glossary access needs its
   specific read/write scopes. Ask the administrator to resolve member ceilings.
5. For credits read the credit response, not just a historical balance:
   balance, monthly_allowance, next_refill_estimated_at, and grants with
   remaining/expires_at. Null refill means no provided estimate, not a promise
   of immediate replenishment. Expiring grants and the current available balance
   are different facts. Recheck before spending; another batch can reserve it.
6. For usage use an explicit date range and day/week/month grouping appropriate
   to the question. Report totals and period; default is last 30 days.
   Do not infer per-member/channel breakdown from a response that only provides
   aggregate totals. Refer to app Usage for richer available breakdowns.
7. Explain relevant entitlements: quality_tiers, custom_guidelines, supported
   formats, per-format upload caps, max_glossaries and max_terms_per_glossary.
   Null glossary caps mean no numerical cap in that response. Do not assume
   every plan has monthly credits or that buying credits unlocks paid features.
8. For creating a workspace, members/invites, API-key creation/revocation,
   subscription changes or purchasing credits, guide the authenticated app
   and appropriate administrator. These are not public API/MCP write endpoints.
   Do not invent workspace-management calls or promise a completed purchase.
9. Summarize readiness and the exact remaining action. Resolve errors with
   sanitized error codes/request IDs, never secrets or customer file content.
   Logout/revocation affects a real connection: do it only when requested.
   An account/credit check costs no translation credits.
