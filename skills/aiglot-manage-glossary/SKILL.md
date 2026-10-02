---
name: aiglot-manage-glossary
description: Inspect or update an AI Glot workspace glossary for an explicit language pair, add preferred or protected terms, and preserve unrelated mappings. Use for glossary and terminology requests; require a precise intended deletion or replacement before removing terms.
license: MIT
compatibility: Authenticated AI Glot CLI, MCP or REST with glossary scopes. Translation is a separate workflow and is not started by this skill.
---

# Manage workspace terminology

Read [connection guidance](references/connection.md) for access and
[glossary operations](references/operations.md) for command details.
Read [method selection](references/methods.md) for CLI/MCP/REST equivalents.
Prefer the connected client; CLI is convenient for importing term-map files.
For one-run wording guidance rather than lasting workspace terminology, read
[paid custom guidelines](references/guidelines.md).

1. Identify the requested language pair and intended operation. Use the actual
   catalog tags from the language resource, CLI languages or public languages
   endpoint when available. Do not guess a regional language tag or create an
   arbitrary pair. If an ambiguity changes the mapping, ask the smallest
   necessary question.
2. Successfully check the intended account, glossary limits and scopes before
   writes. Stop on authentication failure. Read list_glossaries and
   get_glossary as needed before modifying an existing glossary. Resolve a
   permission/connection problem; do not use another workspace or credential.
3. Build the smallest explicit source-to-target map. A protected product term
   maps to itself when that is the user's intention. Glossaries guide contextual
   wording, not byte-level substitutions. If the user asks for new translations
   of terms they have not supplied, obtain them through AI Glot's file workflow
   or ask for the intended mappings; do not translate terms by hand.
4. Add/update with edit_glossary_terms and only the requested terms. Keep
   replace_all unset/false. Do not remove terms the user did not name, and do
   not interpret "clean up" as permission to empty or replace a glossary.
5. For removal, full replacement or delete_glossary, enumerate the affected
   terms/pair and verify the user's authorization covers that exact effect.
   Ask if a vague request does not resolve it. Reuse an explicit authorization
   already given rather than repeatedly asking.
6. Respect pair and term caps. A cap refusal does not authorize deleting older
   terms or splitting across invented pairs to bypass the entitlement.
7. Read the result back and report added/updated/removed mappings and any
   discrepancy. Prepare requested glossary updates before planning/approving
   translations; do not promise edits affect a run already in progress.
   Do not start a translation, change billing or archive history
   as a side effect of glossary maintenance.
