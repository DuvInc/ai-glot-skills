# Compatibility

## Requirements and evidence

| Surface | Distribution path | What must be verified |
| --- | --- | --- |
| Codex/coding agents | Individual Agent Skills or portable plugin | Skill discovery, MCP/CLI connection and local file access. |
| Claude Code | Claude marketplace/plugin or individual skills | Native manifest validation, model activation cases, OAuth and file access. |
| Claude chat/Cowork | Plugin/skill ZIP plus remote connector | Account install/connect and runtime file capability; CLI validation alone does not prove it. |
| ChatGPT/Work | Portable OpenAI plugin package | Portal scans, OAuth and supported file operations; repository publication alone does not list the plugin. |

The source format is portable. Runtime tools, permissions and network/file
access vary by surface. Read the release validation report for tests actually
run. No package requires MCP Apps UI, local hooks or blanket permission grants.

Node.js 20+ is enough for the standalone JSON validator; repository development
tools require Node.js 22+. CLI examples were checked against 0.3.0 and use the
published @ai-glot/cli 0.3.4 for installation.

MCP uses https://mcp.ai-glot.com/mcp, not the experimental Code Mode endpoint.
The API's workspace limits and selected quality tiers are read live, not frozen
into the skills. Short-lived upload and result links are not permanent assets.
