# Repository write-back

For plain JSON, the engine can translate the source directly with a plan that
preserves keys and non-string values. If using a flat extracted bundle, retain
stable source identifiers and map results by key. Array position or paragraph
index is not a stable identity when source documents change.

When localizing Markdown/MDX, use the existing chunker/importer where present.
Translate alt text and prose in caption/title attributes; preserve component
names, property names, paths, imports, placeholders and code. Do not replace a
full page with a summary. A moved localized file can require relative-path
adjustments that belong to its importer.

For a JSON result, the self-contained helper invocation is:

```sh
node /path/to/aiglot-localize-repo/scripts/validate-json.mjs source.json translated.json
```

The helper exits nonzero on a missing/extra key, changed non-string primitive,
array shape, emptying non-empty text, or a changed simple brace/printf
placeholder. A pass does not prove linguistic accuracy, unchanged word order or
valid complex ICU expressions. Use the project's own parser/build for these.
Do not overwrite source English or an existing target with unreviewed output.

Cost is measured across selected content and targets. Reuse existing glossary
mappings from the authorized workspace; do not invent product-name spellings,
plan benefits, numeric promises or a different target locale to make a result
fit. If no content needs translation, report that and do not create a batch.
