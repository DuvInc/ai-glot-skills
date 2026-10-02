---
name: aiglot-run-translations
description: Coordinate AI Glot translation campaigns across files or target languages, review the combined measured budget, run bounded parallel batches, track and resume existing work, retrieve results and manage translation history. Use for bulk or multilingual delivery and batch recovery; use the file workflow for one file in one language.
license: MIT
compatibility: Authenticated AI Glot CLI, MCP or REST; persistent local state and terminal/network access are needed for unattended orchestration.
---

# Run translation campaigns and recover batches

Read [connection](references/connection.md), [method selection](references/methods.md),
[campaign operations](references/campaign.md) and, when wording context is
requested, [paid custom guidelines](references/guidelines.md). This skill is
self-contained; it does not depend on another skill being activated.

Read [format preparation](references/formats.md) for file-family scope,
known input limits and appropriate output checks.

1. Determine source files, actual language tags, output shape/destinations,
   quality, brief, total budget and any existing batch IDs. Reuse an existing
   campaign rather than creating one on every invocation. For separate documents
   in several languages, default to one batch per source/target language.
   A document-to-many-files request is not a universal single-batch capability.
2. Successfully check the intended account, scopes, available credits, formats,
   file caps, quality tiers and custom-guideline entitlement. Prefer CLI for
   local files/scripts, available MCP for chat and REST for application clients.
   Never switch connection to bypass an auth failure.
3. If the source format already supports multiple destinations, a single plan
   can cover named language columns/slots. Verify every pair, scope, destination
   and preview. For plain JSON, DOCX or PDF requiring separate language versions,
   create independent jobs from the same original, not chained translations.
   ZIP is not a generic multilingual fan-out or arbitrary mixed-file container.
4. Prepare each distinct batch with its file-scope instruction. Retain IDs
   immediately. Get/refine each plan until it matches requested targets and
   content, with no unresolved assumptions or not_included. Mark unavailable
   targets as blocked; never drop a language silently.
5. Record each job's original source identity/hash, intended target/output,
   batch ID, verified plan, quality and measured plan.credits[quality].
   Sum distinct planned jobs exactly once, using per-batch Lite rounding rather
   than rounding a combined word total. Check the combined budget and balance
   before starting any new jobs. Do not treat budget as a limit per language.
6. Present the complete campaign when authorization is missing. Reuse standing
   authorization covering its targets, quality, exclusions and total ceiling.
   Do not start a cheap subset if the complete campaign exceeds the authorized
   budget, unless the user authorized that partial delivery or priority order.
7. Approve only awaiting_approval jobs. Launch at most two translating jobs at
   once as a conservative client default, unless the user/client has an explicit
   justified limit. This is a client policy, not an advertised workspace limit.
   Recheck credits before later launches and stop new approvals on a shortage.
   Handle 429/Retry-After with bounded backoff. Approval failures need a state
   read before retry. Parallel runs still share one balance.
8. Persist safe progress and poll each job with bounded waits. Stop on completed,
   failed or cancelled. An agent turn ending does not stop server work. Report
   active IDs and resume them later; do not create replacements for slow jobs.
   Changes to scope/brief after approval require an explicit new-job decision.
9. Download each completed result to a distinct temporary path, validate
   structure/placeholders and move it to the authorized destination without
   overwriting unrelated edits. Large/binary files need a real download; text
   content responses have a size limit. Refresh expired links if the file is
   still retained; missing retained bytes cannot be recreated from a history row.
10. Report a per-file/language ledger: ID, status, intended output, verified
    result, measured cost/returned charge and remaining problem. Partial success
    is partial, even if most languages completed. Retry only failed work after
    resolving its cause and reviewing any new budget; never retranslate successes.
11. For existing history requests, use paginated list/get, search and archived
    filters before action. Rename/archive/unarchive only requested records.
    Cancellation applies to translating work and may charge completed work;
    never offer cancel for an awaiting_approval batch. Archive is a history
    visibility change, not cancellation or file deletion.
    Do not clean up unrelated records as a side effect of a campaign.
