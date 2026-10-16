# Changelog

## Unreleased

- MCP `approve_translation` requires `expected_plan_revision` (the `plan_revision` returned with the plan); `plan_changed` means re-read and show the plan again. REST keeps it optional and recommended.
- Document `Idempotency-Key` for batch creation (CLI `--idempotency-key` and MCP `idempotency_key`): a retry returns the first batch, a different request with the same key is `idempotency_key_reused`.
- Describe CLI 0.4.0 approval (confirmation, `--yes` without a terminal, exit 2 and no spend otherwise) next to 0.3.x behaviour.
- Update the eval mocks and the live smoke to match.

## 0.2.1

- Recommend Full access for agent onboarding, using all eight advertised OAuth scopes.
- Align the canonical setup guide, CLI examples and packaged skill references.
- Preserve user consent, administrator limits and setup verification without credit spend.

## 0.2.0

- Publish the five validated skills and host packages as the first stable release.
- Directory approval and direct ChatGPT/Claude Desktop tests remain separate.

## 0.2.0 candidate 2

- Include linked usage/review guides in plugin ZIPs and check every local Markdown link in archives.
- Distinguish settled charges, active reservations and pending costs when resuming a campaign.
- Keep the budget example at one quality tier and clarify that external PUT is an MCP requirement.

## 0.2.0 candidate 1

- Add workspace onboarding, credit/usage diagnostics and translation campaign skills.
- Recommend CLI, MCP and REST by actual runtime and task; document equivalent operations.
- Cover paid custom-guideline entitlement and domain/audience/style context.
- Add combined campaign budgets, separate multilingual output and bounded parallel recovery.
- Keep each of five skills self-contained and update generated package validation.

## 0.1.0

- Three workflows: file translation, repository localization and glossary management.
- Portable OpenAI package, Claude package and individual skill archives.
- Explicit plan/cost authorization, binary-upload fallback and interrupted-job recovery.
- Structure and placeholder validation for JSON locale results.
