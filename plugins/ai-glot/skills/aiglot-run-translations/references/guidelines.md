# Translation brief and paid custom guidelines

## Two inputs with different jobs

The create/plan `instruction` selects the file content, source/target languages
and output shape. Examples: translate only the Description column, preserve
SKU, translate slide notes as well as visible text, or fill named language
columns. Check `plan.will_translate`, `will_not_touch`, `languages`, `preview`,
`assumptions` and `not_included` to verify that the request was understood.

Approval `custom_instructions` guides how each selected string is translated.
CLI calls this `--instructions`; MCP and REST use `custom_instructions`.
The public maximum is 2,000 characters for either instruction input. Keep the
brief concise; do not silently truncate an important requirement.

Read `account.entitlements.custom_guidelines` before sending nonempty approval
guidelines. Paid plans currently offer them; trust the live entitlement rather
than the name of a plan. If unavailable, explain the option to proceed without
them or upgrade through the app. If the requested translation depends on those
rules, stop for a decision. Do not hide paid stylistic instructions inside the
plan instruction to evade this entitlement, or silently discard them.

## Useful context to ask for or reuse

Do not turn every translation into a questionnaire. Use relevant context already
provided; ask only when ambiguity materially changes the result.

| Context | Example of a compact string-level guideline |
| --- | --- |
| Domain and meaning | "This is a checkout UI for a B2B inventory product. Cart means shopping cart." |
| Audience and register | "For professional French-speaking buyers; formal vous, clear wording." |
| Voice and style | "Friendly, concise product copy; no invented benefits or extra information." |
| Locale conventions | "Use the requested locale's spelling and natural punctuation. Do not convert currency or physical units." |
| Protected tokens | "Keep AI Glot, SKUs, in-content URLs, {count}, ${name} and %s exactly as written." |
| Markup visible in a string | "Preserve HTML tags, Markdown link destinations and interpolation syntax. Translate visible prose." |
| Disambiguating example | "In this product, 'workspace' means a team area, not a physical office." |
| Existing terminology | "Apply the workspace glossary and use the supplied preferred terms consistently." |

A short source/target example supplied by the user can clarify style. Do not
invent a target-language example yourself or promise an uploaded style-guide
document is automatically available to every string. Relevant reference material
must be distilled into this explicit brief, within the limit and the user's
permitted use of it. Avoid irrelevant personal information.

No cross-string document context, whole-file memory or preservation guarantee
is implied by guidelines. Sentence wording may need context that is not visible
inside one string. Translation retains meaning; guidelines are not a request
to add facts, summarize, proofread unrelated text or change numerical data.

Do not put "translate column B", "skip page 1", "return three separate files",
or "translate every cell" in approval guidelines. These need a verified plan or
separate jobs. Guidelines cannot add omitted tasks or create output files.

Glossaries are workspace terminology for a language pair, not a per-request
glossary-ID attachment field. Prepare intentional glossary updates before
planning/approval, then verify the language pair. Do not edit the user's
glossary silently to improve a single translation. Changes made after a run
starts must not be promised to affect that run.

## Equivalent approval examples, only after plan/cost authorization

CLI:
```sh
aiglot batches approve BATCH_ID --quality standard --instructions "For a professional audience. Keep AI Glot and {count} unchanged." --json
```

MCP arguments:
```json
{"batch_id":"BATCH_ID","quality":"standard","custom_instructions":"For a professional audience. Keep AI Glot and {count} unchanged."}
```

REST body for `POST /v1/batches/BATCH_ID/approve`:
```json
{"quality":"standard","custom_instructions":"For a professional audience. Keep AI Glot and {count} unchanged."}
```

On Free, omit the custom field entirely and approve only a plan whose required
scope/protections are already accepted. Standard is the default; Lite is a
separate live entitlement and a cost/quality choice, not required for guidelines.
