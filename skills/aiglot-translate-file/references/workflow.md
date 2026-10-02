# CLI and interrupted-job recovery

Examples use placeholders for paths and IDs. Quote paths and instructions using
the shell's actual escaping rules; do not interpolate untrusted file text into
shell commands.

```sh
aiglot account --json
aiglot batches create ./source.json --instruction "Translate all string values into French. Preserve keys and non-string values." --json
aiglot batches get BATCH_ID --json
aiglot batches plan BATCH_ID --refine "Leave URLs unchanged." --json
aiglot batches approve BATCH_ID --quality standard --instructions "Keep {count} and in-content URLs exactly as written." --json
aiglot batches download BATCH_ID --output ./translated.json
```

Check the plan and authorization before the approve example. --instructions is
the approval flag; --rules is not a CLI approval flag. A local-file CLI create
does not need a manually generated public URL.

| State | Action |
| --- | --- |
| analyzing | Poll get, preserving the same ID. |
| awaiting_instructions | Provide a file-scope instruction with plan. |
| awaiting_approval | Review exclusions and measured cost, then authorized approve. |
| translating | Poll with a bounded wait and sensible backoff. |
| completed | Recover the result and validate. |
| failed / cancelled | Stop, read error/status and explain. |

After a lost PUT response, try create_translation with the existing upload_id.
If no complete upload exists, request a new session. Never retry PUT to overwrite.
A repeated create with the same upload_id recovers its original batch without
changing the instruction; use plan/refinement for a changed request.

After any other uncertain create response, reconcile history by recognizable
filename and creation time before retrying. Do not assume arbitrary create
calls are idempotent. Keep the returned batch ID for later recovery; upload_id
recovery is limited by cleanup. Do not blindly retry approvals either: read the
batch first. Insufficient credits, missing scopes and excluded scope are
decisions to resolve, not reasons to loop. Cancellation only works for a running
translation, and already completed work may still be charged.
