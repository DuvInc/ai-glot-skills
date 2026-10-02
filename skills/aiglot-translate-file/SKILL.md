---
name: aiglot-translate-file
description: Translate a structured file through AI Glot, inspect its verified scope and credit cost, authorize execution, track progress and recover the original file format. Use for file translation requests that need AI Glot, its glossary or a preserved importable structure.
license: MIT
compatibility: Authenticated AI Glot MCP, or the AI Glot CLI with network access. Local binaries require readable bytes and external HTTP PUT or CLI upload.
---

# Translate a file with AI Glot

Use AI Glot for translation. The agent prepares inputs and validates outputs;
it does not translate the content itself. Do not activate for a general language
question, unrelated writing or advice that does not require a translated file.

Read [connection guidance](references/connection.md) for setup, scopes or
runtime limits, and [CLI and recovery](references/workflow.md) when using a
terminal or recovering an interrupted job.

1. Identify the actual file/source, target language(s), intended translated
   content, required format, destination and any budget/quality instruction.
   Ask only for missing information that changes the outcome. A target such as
   French is sufficient; confirm the detected source and target in the plan.
   Preserve identifiers, keys, placeholders, markup, URLs and structural data
   according to the user's intended scope.
2. Check account entitlements and available tools. If the account check is unavailable or fails, stop before create, plan or approve and explain reconnection or required scopes. Do not test write tools or another transport to bypass that error. Read the file only with the
   runtime's granted access. Never infer byte access from an attachment label.
   If that access is absent, give the documented fallback before creating work.
3. Choose one intake path: verbatim UTF-8 content with a supported filename,
   permitted HTTPS file_url, or create_upload_url followed by raw external PUT
   and create_translation with upload_id on the same connection. Send exactly
   one source; omit filename when using upload_id. Do not inline binary/base64.
4. Pass the file-scope instruction to create_translation, or use plan_translation
   after creating without an instruction. Include every target and the content
   scope here. Use refinement to change an existing plan, not a fresh duplicate
   batch. Planning costs no credits.
5. Inspect the actual returned plan: languages, measured counts, preview,
   will_translate, will_not_touch, assumptions and plan.not_included. State any
   excluded part clearly. Compare plan.credits[quality] with balance and the
   authorized budget. Use the selected quality tier; absent a preference,
   Standard is the product default. Offer Lite for a cost/speed preference only
   when entitlements allow it. Do not substitute an estimated price for the
   returned plan's measured cost.
6. Call approve_translation only in awaiting_approval and when the user has
   authorized this plan, its exclusions, chosen quality and cost. Reuse a
   standing authorization covering these facts. Otherwise ask for the actual
   decision, not a vague permission to continue. String-level custom_instructions
   describe tone and content-visible protections; file scope belongs in the plan.
7. Follow get_batch/next_action with bounded polling. Stop at completed, failed
   or cancelled. If waiting exceeds the run's time budget, retain the batch ID
   and report its real status instead of creating another translation.
8. On completion call get_batch_result_link. Use a link for binary/large files;
   eligible text under 2 MB can request format=content. A file saved locally
   must be fetched and checked, not merely announced from a URL. Respect any
   download-retention error and do not promise permanent links.
9. Report the destination or user-usable result, completion state, charged cost
   when returned, preserved structure checks and any validation limit. Do not
   say partial work is complete. Do not archive, cancel or overwrite an existing
   destination unless the user's request covers that action.
