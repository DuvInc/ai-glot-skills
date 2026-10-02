# Campaign design, parallel execution and recovery

## Choose the output shape first

| Requested delivery | Recommended route |
| --- | --- |
| report.fr.docx, report.de.docx, report.es.docx | Three independent batches from report.docx; one verified target in each plan. |
| catalogue with named fr/de/es destination columns | One batch if the format and verified plan support all columns without changing protected source fields. |
| Separate locale JSON files | Independent source-to-target batches, or the project's existing extractor/importer via the repository skill. |
| Many files, same structure and same instruction | Consider a supported ZIP only after archive compatibility is verified; otherwise separate batches. |
| Different instructions/formats per file | Separate batches. Do not force unrelated jobs into a ZIP. |

Translate every target directly from the source. fr -> de -> es amplifies errors
and changes the source meaning. If language tags or output paths are unknown,
resolve them before creating a campaign. One multi-target plan returns the
planned file shape; it does not imply an API returning one document per target.
ZIP must contain compatible supported members of the same structure with one
common instruction; use the current public ZIP guidance and honor refusals.

## Prepare plans first, then spend

For one document in two languages, prepare both without spending:

```sh
aiglot account --json
aiglot credits --json
aiglot batches create ./report.docx --instruction "Translate all eligible English text into French. Preserve structure, identifiers and in-content URLs." --json
aiglot batches create ./report.docx --instruction "Translate all eligible English text into German. Preserve structure, identifiers and in-content URLs." --json
```

Save both returned IDs, inspect both full plans, confirm target/output shape and
sum `plan.credits[quality]`. For example, Standard quotes of 4 and 5 credits cost
9 credits together. An 8-credit campaign ceiling is a refusal before approval,
not permission to start the first job. No `--languages`, `--parallel` or bulk
REST endpoint is assumed: the caller owns orchestration.

Only after the entire campaign is authorized and affordable:

```sh
aiglot batches approve FRENCH_BATCH_ID --quality standard --json
aiglot batches approve GERMAN_BATCH_ID --quality standard --json
aiglot batches get FRENCH_BATCH_ID --json
aiglot batches get GERMAN_BATCH_ID --json
```

Approval starts remote work and returns; the translations can run concurrently
even when approval calls are sequential. These commands are a recipe, not an
unconditional spend script. Attach entitled custom guidelines independently
to each approval when needed. Use target-specific batches for different styles.

MCP equivalent: distinct `create_translation` calls with each instruction,
then account/plan review and `approve_translation` for the accepted IDs.
REST equivalent: distinct `POST /v1/batches`, then `POST
/v1/batches/ID/approve`. Use one credential/workspace throughout.

## Implement a bounded queue in an existing script

Use the existing project runner. Do not install a new scheduler solely to run
these jobs. If a small runner is needed, the algorithm is:

1. Build a source/target/output manifest. Persist each created ID atomically.
2. Prepare all plans, reject unresolved exclusions, and compute the total.
3. Verify campaign authorization and current balance.
4. Maintain a queue with at most two translating jobs; launch the next only
   when a slot and sufficient current credits are available.
5. Poll with a modest interval/backoff, deadline and explicit terminal statuses.
6. Persist state after transitions; never store tokens, raw content or signed URLs.
7. Download/validate successes and keep failures explicit. Resume by saved IDs.

Store the manifest only in the permitted project location, exclude it from
public commits if filenames/client metadata are sensitive, and preserve the
workspace identity, source hash, target tag, instruction identity, quality,
quoted cost and ID. On resume verify those match the current task. A changed
file/plan is a changed job, not permission to silently reuse old approval.

A network error or ambiguous write response is not proof that creation/approval
failed. Reconcile saved IDs and history by filename/time; read each state.
Do not blindly repeat create or approve. A refused approval may follow successful
approvals of other jobs; report those as active and stop new starts, do not claim
the whole campaign was rolled back. Server reservations protect the balance,
but do not enforce the user's combined campaign budget.

## Budget on resume and retry

Keep one commitment per job: its confirmed settled charge if complete, its
current reservation if active, or its quote if not approved. A reservation that
becomes a final charge replaces that commitment; it is not added a second time.

For a 10-credit campaign ceiling, 7 credits already spent plus a 2-credit active
reservation leaves 1 credit for new work. A pending 3-credit job must not launch,
even if the workspace has 100 credits available. The total would be 12.
Current workspace balance answers affordability; the campaign ledger answers
the user's authorization.

Do not compare the full historical total with the current balance on resume:
already spent/reserved credits are not available anymore. Compare pending new
approvals with current available balance, then separately check the full
campaign commitments against its ceiling.

Refunded failed jobs can release commitments only after refund is verified and
the user's ceiling permits net accounting. Cancellation can leave a partial
charge; cancelled/failed status alone does not provide a reusable budget figure.
If the receipt/account evidence is incomplete, report uncertainty before retry.
A replacement batch is a new commitment, never a free continuation by default.

## Existing work and history

```sh
aiglot batches list --search "report" --all --json
aiglot batches list --archived --search "report" --all --json
aiglot batches get BATCH_ID --json
aiglot batches download FRENCH_BATCH_ID --output ./report.fr.docx
aiglot batches download GERMAN_BATCH_ID --output ./report.de.docx
```

Follow next_action/status rather than polling only for completed.
awaiting_instructions requires planning; awaiting_approval requires the decision;
translating/analyzing require waiting; completed/failed/cancelled end polling.
Result links expire separately from stored-file retention. Use the current
retention/error response, not a fixed permanent-download promise.

For authorized history edits use rename/archive/--undo, MCP update_batch or REST
PATCH with name/archived. For an explicitly requested stop use cancel_translation
or the CLI cancel command. Cancel can charge work already translated. Neither
history archiving nor logging out cancels a running translation.

For escalation share sanitized operation, batch ID, error code/request ID and
the failed step. Do not send support feedback/messages unless the user has
authorized sending it. Never include credentials, signed URLs or file content.
