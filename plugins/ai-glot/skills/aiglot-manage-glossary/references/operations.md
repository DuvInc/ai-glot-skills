# Glossary operations

Use namespaced MCP tools by their base names: list_glossaries, get_glossary,
edit_glossary_terms and delete_glossary. Read the existing pair before replacing
it. The editing tool is additive by default; replace_all=true deletes every
term not supplied, and remove deletes the explicitly named source terms.

Equivalent CLI commands:

```sh
aiglot languages --json
aiglot glossaries list --expand-terms --json
aiglot glossaries get en-US-fr --json
aiglot glossaries add en-US-fr --term "AI Glot=AI Glot" --json
aiglot glossaries replace en-US-fr --from reviewed-terms.csv --dry-run --json
```

The last command is a preview. Applying replacement or deletion must be within
explicit user authorization, and a non-interactive destructive command can
require --force. Consult --help for the actual command before use; do not add
--force to overcome a refusal whose impact has not been reviewed.

Do not add a common word as a universal protected product term without checking
the user's intent. A mapping meant to protect a named product can damage normal
sentences if applied to the same word used in its ordinary sense.
