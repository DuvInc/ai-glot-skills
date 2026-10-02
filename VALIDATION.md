# Candidate validation

Version: 0.1.0, candidate tag v0.1.0-rc.1. Verified on 2026-10-02.

## Automated checks

- 19 Node tests passed, covering JSON structure, simple placeholders, official manifest schemas, package boundaries, file digests and reproducible archives.
- Native Claude Code 2.1.204 strict plugin validation passed.
- 11 behavioral cases passed with Claude Code 2.1.287's evaluator: attachment unavailable, authorized file, budget refusal, glossary additive update, vague glossary cleanup, missing language, missing repository target, unrelated writing, inline repository candidate, excluded scope and account connection failure.
- Each behavioral case has one passing run. These are bounded regression checks, not a universal reliability guarantee.
- A real AI Glot translation of synthetic JSON completed using 2 Lite credits. Downloaded output preserved structure and simple placeholders. This does not certify every language, file format or translation quality.

The connection-failure case initially revealed a write attempt after a failed account check. The shared instructions and file workflow now require a successful account preflight before any write; the case passed after that fix.

## Installation and host limits

The build produces self-contained individual skills and separate Claude/OpenAI plugin archives. Official portable schemas and native Claude manifest validation cover packaging.

Direct ChatGPT portal, Claude Desktop/mobile and marketplace review have not been completed. Directory approval is separate from repository publication. The static skills catalog is not served by the production MCP server.

Behavioral evaluation uses synthetic mocked tool responses. The live smoke test uses the real service. Neither includes customer documents or publishes account credentials.
