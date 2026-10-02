---
name: aiglot-localize-repo
description: Localize repository JSON resources, application strings or documentation through AI Glot, preserve source keys and placeholders, write validated target files and show a reviewable diff. Use when an agent has repository files and must produce complete locale resources without translating them by hand.
license: MIT
compatibility: Repository read/write access, authenticated AI Glot CLI, MCP or REST, and the project's validation tools. The bundled JSON checker needs Node.js 20 or later.
---

# Localize repository resources

Do not translate strings yourself. AI Glot executes the translation; repository
tools extract, assemble and validate content.

Read [connection guidance](references/connection.md) if setup or scopes need
attention, and [repository checks](references/repository.md) before extraction
or write-back. If MCP cannot transfer local bytes, use the CLI's local create
command with the same scope/cost review. Read [method selection](references/methods.md)
for client recommendations and [custom guidelines](references/guidelines.md) for
paid style/context guidance. Prefer CLI for repository automation; preserve a
working authorized pipeline regardless of its client.

Read [format preparation](references/formats.md) for file-family scope,
known input limits and appropriate output checks.

1. Read repository instructions and the existing localization pipeline. Locate
   the English/source files, actual target locales, output paths and existing
   extraction/import tools. Reuse those tools. Do not create a competing i18n
   system, new locales or a new CI workflow just to perform this request.
2. Inspect uncommitted work and source/target hashes before writing. Preserve
   changes outside the task. If a destination has changed since it was read,
   resolve that conflict before replacement; use a temporary output first.
3. Determine scope and exact locale tags from the project and verified plan.
   Missing target/destination information that materially changes the result
   needs a question. Distinguish missing-only, changed-only and full translation
   requests. Do not silently truncate content or reduce localized detail.
4. Keep JSON keys as structure; translate eligible values, preserving non-string
   primitives, arrays and ordering where significant. For documentation, preserve
   imports, MDX component/attribute names, code and link targets, while including
   headings, body text, alt text and human-readable attributes. Use the project's
   extractor when source code mixes executable syntax with prose.
5. Successfully check the intended account/scopes and quality entitlements
   before writes; stop on auth failure. Create and review an AI Glot plan for the
   selected payload, all targets and preserved content. File scope belongs in
   the plan; content-visible placeholder/markup rules belong in approval
   custom_instructions only when entitlements.custom_guidelines is true.
   Inspect plan.not_included and plan.credits[quality]. For several locales,
   prepare all plans and sum their measured costs before any approvals.
   Default to independent source-to-locale batches with bounded parallelism
   (two active jobs), never chained translations or a per-locale reading of
   the total budget. Preserve every ID for partial-failure recovery.
6. Start only if the current plan, cost and destination are within user
   authorization. Existing standing permission is sufficient when it covers
   them. Otherwise present the measured decision. Keep one batch ID for this
   plan and follow actual status to completion.
7. Download to a temporary path and verify every requested locale/key returned.
   Import through the project's existing writer. For plain JSON, run
   [the bundled validator](scripts/validate-json.mjs) before writing the target.
   It checks keys, primitive values, array shape and simple placeholders, not
   translation quality or complete ICU grammar.
8. Run the project's relevant parser/build checks. Use its ICU/MDX validators
   for syntax that the JSON helper does not understand. Preserve the English
   source and original permissions; do not accept success from non-empty output
   alone.
9. Show a diff, the files/locales changed, real translation cost when returned,
   structural checks and any remaining language-review limits. Commit, push or
   open a PR only when the user/repository workflow authorizes it.
