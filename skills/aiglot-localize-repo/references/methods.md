# Choose CLI, MCP or REST API

These are three clients of the same workspace and translation lifecycle. Do
not repeat a write through a second client after an uncertain response.

| Situation | Recommended method | Why |
| --- | --- | --- |
| Local documents, repository files, scripts or repeatable campaigns | CLI | Local text and binary upload, OAuth browser/device login, named profiles, structured output and downloads without handling tokens manually. |
| Assistant with a connected AI Glot MCP and usable source | MCP | Native tool calls and host-managed OAuth; no terminal or package installation needed. |
| Application, service or existing HTTP automation | REST API | Explicit HTTP integration; reuse the application's authenticated client and secret manager. |
| No terminal and no usable MCP/file access | Web app | Complete the user interaction at https://app.ai-glot.com. |

Prefer an already working authorized client when it meets the task. Recommend
CLI for local automation, not as a requirement for chat users. Do not install
software or replace a connection when the existing client is adequate. A failed
account preflight must be resolved on the intended connection before writes;
changing clients is not a permission bypass.

## Equivalent operations

| Task | CLI | MCP tool | REST path under https://api.ai-glot.com/v1 |
| --- | --- | --- | --- |
| Identity, plan, capabilities, scopes | `account --json` | `get_account` | `GET /account` |
| Balance, credit grants and expiry | `credits --json` | `get_credit_balance` | `GET /credits` |
| Usage over a period | `usage --from DATE --to DATE --granularity day --json` | `get_usage` | `GET /usage?from=DATE&to=DATE&granularity=day` |
| Supported language tags | `languages --json` | Host-exposed language resource if available | `GET /languages`, public |
| Create with scope | `batches create FILE --instruction TEXT --json` (from 0.4.0, `--idempotency-key KEY` to retry safely) | `create_translation` (`idempotency_key`) | `POST /batches` (`Idempotency-Key` header) |
| Plan/refine | `batches plan ID --instruction TEXT` or `--refine TEXT` | `plan_translation` | `POST /batches/ID/plan` |
| Approve | `batches approve ID --quality standard` (from 0.4.0: confirms first, `--yes` without a terminal) | `approve_translation` (`expected_plan_revision` required) | `POST /batches/ID/approve` (`expected_plan_revision` recommended) |
| Read state/plan | `batches get ID --json` | `get_batch` | `GET /batches/ID` |
| Find past work | `batches list --all --json` | `list_batches` | `GET /batches`, cursor pagination |
| Retrieve output | `batches download ID --output PATH` | `get_batch_result_link` | `GET /batches/ID/result?format=link`, `content` or `file` |
| Rename/archive | `batches rename ID NAME`, `archive ID [--undo]` | `update_batch` | `PATCH /batches/ID` |
| Stop running work | `batches cancel ID` | `cancel_translation` | `POST /batches/ID/cancel` |
| List/read glossaries | `glossaries list --all`, `get PAIR` | `list_glossaries`, `get_glossary` | `GET /glossaries`, `GET /glossaries/PAIR` |
| Add/remove specified terms | `glossaries add/remove PAIR` | `edit_glossary_terms` | `PATCH /glossaries/PAIR` |
| Full glossary replacement/delete | `glossaries replace/delete PAIR` | `edit_glossary_terms` with replacement / `delete_glossary` | `PUT /glossaries/PAIR`, `DELETE /glossaries/PAIR` |

Plan languages can be human-readable names such as English/French, while the
public language catalog and glossary pairs use BCP 47 tags such as en-US/fr.
Compare the requested language semantically and use catalog-confirmed tags
where the operation needs tags. Do not reject a correct plan just because
French is not literally equal to fr, or guess a regional variant.

Approval spends credits, so bind it to the plan the user reviewed:

- MCP: `expected_plan_revision` is required. Pass the `plan_revision` returned
  by `create_translation` (when it was called with an instruction),
  `plan_translation` and `get_batch`. If the plan changed since, the call is
  refused with `plan_changed`: read the batch again and show the new plan, scope
  and cost to the user before approving. Never reuse an old revision.
- REST: `expected_plan_revision` is optional but recommended, with the same
  `plan_changed` refusal.
- CLI: `batches approve` reads the current plan and pins its revision itself.
  From CLI 0.4.0 it also asks for confirmation, and without a terminal it needs
  `--yes`: without it the command exits 2 and spends nothing. Review the plan
  with `batches get ID` first, then add `--yes` only for an authorized plan. CLI
  0.3.x does not prompt and does not know `--yes`, so do not pass it there.

To retry a create after a lost response, send the same `Idempotency-Key` (CLI
`--idempotency-key KEY` from CLI 0.4.0, MCP `idempotency_key`; any 1 to 255 printable
characters, a UUID works well). A repeat returns the first batch without
planning again or costing credits. The same key with a different file, name or
instruction is refused with HTTP 409 `idempotency_key_reused`: use a new key for
new work.

CLI examples omit the `aiglot` prefix in the table. Inspect installed help and
the current OpenAPI/tool schema for request fields. Do not invent bulk endpoints,
webhooks, workspace-creation endpoints or target-language flags.

REST JSON responses use a `data` envelope; lists have pagination metadata.
The CLI unwraps single objects: batch `id`, `status` and `plan` are at the
top level, not `data.id`. CLI lists retain `data` plus cursor metadata.
Check the actual MCP structured result rather than assuming an HTTP envelope.

CLI `aiglot api GET /v1/account` and `aiglot api POST
/v1/batches/ID/approve --data @approval.json` let scripts use REST with the
CLI's stored authentication. Raw REST integrations provide their own Bearer
credential through their secret manager; do not collect or print it in chat.
Binary REST intake is multipart/form-data with `file`; text intake is JSON
`content` and a supported `filename`, or permitted HTTPS `file_url`.
MCP binary intake uses a temporary upload session and an external raw PUT.
The CLI handles local intake automatically.

Canonical usage reference: https://ai-glot.com/docs/cli/commands and
https://ai-glot.com/docs/mcp/standard-tools. Resolve unfamiliar behavior against
the live response and current public docs, not remembered limits.
