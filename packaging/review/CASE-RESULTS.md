# Review cases and evidence

Checked on 2026-10-10. This report separates deterministic live transport tests from assistant behavior and portal acceptance.

## Live checks completed

See [live-evidence.json](live-evidence.json) for measured credits and structure checks. The four synthetic jobs cover JSON into French/German, raw PUT + upload_id DOCX into German, and CSV descriptions into French. All approvals were pinned to the authoritative plan revision, an intentionally stale revision was rejected, all results were downloaded and checked, and the combined quote was measured before any approval.

The native Codex connection exposes only account:read. Its account call succeeds, but it cannot exercise translation tools or the UI. The authenticated CLI MCP bridge has the necessary scopes and was used for the transport tests. This does not prove tool selection or rendering inside Claude or ChatGPT.

## Dedicated reviewer verification

A separate synthetic-only reviewer workspace was confirmed through its browser account menu and normal OAuth device consent. A named CLI profile is bound to that workspace and has the requested read, translation creation/management and glossary scopes. Four Standard runs repeated the JSON, DOCX and CSV checks successfully, spending 26 credits. Combined initiative spend is 35 against the founder-authorized ceiling of 100, including the earlier 9 Lite credits. A synthetic brand-preservation glossary was created and read back.

The reviewer workspace is currently Free: Standard works, Lite and custom guidelines are unavailable. Paid feature coverage remains a reviewer-access gap. In the available Claude Team account, Add custom connector is disabled, so in-host cards, response screenshots and recording remain unverified.

## Manifest review case status

| Case | Service evidence | Assistant/portal case |
| --- | --- | --- |
| Workspace readiness | Passed through MCP: account, credits and usage | Not run against saved portal version |
| French JSON | Passed: keys and placeholders checked | Not run against saved portal version |
| German DOCX | Passed: raw upload, bold heading and placeholder checked | Not run against saved portal version |
| Separate language versions | Passed: two distinct JSON jobs and combined quote | Not run against saved portal version |
| Existing result retrieval | Passed: get_batch/show_translation/result download for synthetic jobs | Not run against saved portal version |
| Unrelated video generation | Drafted expectation, not a service operation | Not run |
| Missing target language | Drafted clarification expectation | Not run |
| Another customer's workspace | Drafted refusal expectation | Not run |

No customer files, raw account identifiers, signed download URLs or credentials are included here. Reviewer MCP checks additionally passed glossary list/get/edit, plan refinement, batch rename/archive/restore and Free Lite refusal without starting a translation. Cancellation before approval returned batch_not_editable; the disposable batch was archived without spending credits. Running cancellation, glossary deletion, feedback submission, cross-workspace access and every-tool Claude conversation acceptance have not been marked passed.
