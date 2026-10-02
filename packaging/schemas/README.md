# Schema provenance

These unmodified JSON schemas were fetched on 2026-10-02 from:

- https://agent-plugins.org/schemas/1.0.0/plugin.schema.json
- https://agent-plugins.org/schemas/1.0.0/mcp.schema.json

They validate portable package structure. Additional host/skill checks live in
scripts/validate.mjs. Claude's native validator remains the authoritative check
for its manifest and marketplace. Refresh schemas deliberately when the
package targets a different standard version; do not fetch mutable schemas
during every build.
