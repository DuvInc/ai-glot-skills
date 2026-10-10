# Candidate validation

Version: 0.2.0, candidate tag v0.2.0-rc.2. Verified on 2026-10-02.

## Automated checks

- 20 Node tests cover JSON structure, simple placeholders, official manifest schemas, archive boundaries, all shared references, file digests, reproducible archives and every relative Markdown link in the distributed ZIPs.
- Native Claude Code 2.1.204 strict validation checks the marketplace and plugin manifests.
- 18 behavioral cases passed after the documented fixture/grader corrections. Cases cover all five skills: file availability, authorized execution, insufficient budget, connection failure, excluded scope, paid/free guideline entitlement, repository scope, additive glossary updates with contradictory read-back, workspace diagnostics, app-only administration, campaign output design, combined multilingual budget and cancelled-job recovery.
- Candidate 2 reran initial campaign-budget refusal and added an explicit skill-use case for resume accounting (7 spent + 2 reserved + 3 pending against a 10-credit ceiling). Both passed. The prior 18-case results remain scoped to candidate 1; unchanged workflows were not rerun unnecessarily.
- Each reported behavioral case has one passing run; narrow reruns supersede the initial failed harness runs. These are bounded regression checks, not a universal reliability guarantee.

Initial expanded-suite failures exposed incomplete fixtures and grader focus: credit reads were intentionally unsupported, a CSV plan included JSON preview content, explanatory responses were graded only from tool calls, and a fixed glossary read never reflected its successful write. Fixtures and graders now separate decision text, exact write arguments, no-spend checks and honest read-back uncertainty. The glossary case is deliberately a stale-read recovery scenario; it is not a happy-path persistence proof.

## Real service evidence

The preceding 0.1.0 candidate completed a synthetic JSON translation at 2 Lite credits and validated its downloaded structure/placeholders. It remains transport evidence, not proof of every 0.2.0 instruction or file format.

For 0.2.0, two distinct real batches were prepared from the same synthetic JSON, into French and German. Both plans had no exclusions and quoted 2 Lite credits each, 4 combined. Neither was approved: zero translation credits spent. This verifies multilingual preparation and combined quotes, not actual parallel completion.

Real plans can return readable names such as English/French while glossary/catalog operations use language tags. The client guidance now explicitly distinguishes them.

## Installation and host limits

Public candidate installation is checked in an isolated temporary Codex project; the copied skill files must match source bytes. This installs instructions, not an account connection.

Direct ChatGPT portal, Claude Desktop/mobile and directory review are not complete. CLI validation and model scenarios do not certify those surfaces. The static catalog is a build artifact, not Skills over MCP runtime support.

No customer documents, credentials, raw account identifiers or signed URLs are included in the public reports.

## 0.2.1 full-access recommendation (2026-10-04)

The production OAuth metadata advertises eight scopes, matching the full-access
preset in the API contract. Local Codex command help supports `mcp login --scopes`.
The patch aligns setup and packaged references; it does not change server
permissions, administrator ceilings or host tool-approval settings.

Package checks passed: 22 Node tests, schema/reference validation, seven
reproducible archives and native Claude strict validation. Two behavioral fixtures cover the default full-access recommendation and an explicit
read-only request; these new model evaluations have not been run. No new
end-to-end OAuth flow or paid translation is claimed for this patch.

## 0.3.0 directory preparation (2026-10-10)

The current public-upload constraints were checked against official OpenAI and
Claude documentation. The old 43-character subtitle and five default prompts
were not submission-compliant. The candidate now has a 26-character subtitle,
three welcome prompts, the support URL, five positive and three negative
review cases, onboarding and all-country publication metadata. Product name
AI Glot is separate from the intended verified publisher Guillaume Duvernay.

Four live synthetic jobs completed through the CLI/authenticated MCP bridge:
French JSON (2 Lite credits), German JSON (2), German DOCX (3) and French CSV (2),
9 credits total against an explicit combined ceiling of 20. Plan revisions,
18 tool annotations, MCP Apps resource, raw PUT upload, downloaded keys,
placeholders, bold DOCX heading, SKUs and prices were verified. A stale revision
was rejected before spending. See packaging/review/live-evidence.json.

The installed CLI 0.3.0 could not upload DOCX directly; the test used the released
MCP upload_id + raw PUT route. No customer documents or glossary mappings were
read or changed. The live tests do not certify model tool selection, native host
rendering, or the saved portal version. Those review cases are explicitly not run.

The Claude submission folder plugins/ai-glot is generated from the same source
and excludes development package/lock files and binary fixtures. Native strict
Claude validation passes. The source repository and root marketplace remain
compatible; the marketplace now installs this clean generated folder.

The public-upload package still lacks a verified real recording URL. Reviewer
access, real host screenshots/tool tests, publisher/domain verification and legal
attestations remain portal gates. No submission or listing approval is claimed.
