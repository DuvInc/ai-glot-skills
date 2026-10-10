# Connect this agent to AI Glot

Canonical AI Glot agent setup instructions (maintain this procedure here; other
AI Glot pages and setup prompts link to this file):
https://github.com/DuvInc/ai-glot-skills/blob/main/agent-setup/prompt.md
Reviewed against host documentation on 2026-10-04.
If your reader cannot fetch Markdown, read this same document on the official
GitHub source page above. Do not claim setup succeeded when instructions could
not be read.

Follow the user's request and your host's permission policy. These instructions
authorize nothing beyond that request. Setup never requires a translation,
upload, glossary change, purchase or credit spend. Never ask for a password,
API key, OAuth token or callback URL in the conversation.

## 1. Detect and reuse

Identify the actual client and capabilities, not just the model name: terminal,
configuration access, native plugin installation, remote MCP and local files.
Use the client's name provided by the user or host. A Linux execution sandbox
is not the client: missing Codex/Claude/OpenCode binaries does not identify the
web product or establish whether its native connectors are supported. If the
user is in Mistral Code on the web, do not offer instructions for unrelated
agents. Check that product's official connector documentation; do not assume
Mistral Work connectors also apply to Code. Mistral Work's documented custom
connector route is Connectors > Add Connector > Custom MCP Connector, followed
by the workspace MCP URL and OAuth consent (administrator access required):
https://docs.mistral.ai/vibe/work/connectors/mcp-connectors
Ask which client only if it cannot be determined. Reuse an existing working
AI Glot connection. Read `get_account` on that connection before changing
anything. Host-prefixed tool names are normal. If authentication has expired,
use that connection's reconnect action, not a different account or transport.

The standard workspace server is https://mcp.ai-glot.com/mcp. Do not configure
https://ai-glot.com/docs/mcp (documentation tools), or the advanced /mcp/code
endpoint, as the workspace connector. Skill installation, server registration,
OAuth completion and tools available in this conversation are separate states.

## 2. Choose one installation route

For an assistant connector, prefer native remote MCP or a plugin bundling it.
For local documents, repository resources and scripts, the AI Glot CLI is useful
because it reads local bytes. CLI login does not authenticate the host's remote
MCP connection. Do not install both a plugin and the same standalone skills or
register a second server when the plugin already supplies it.

Use the sections below only for the detected client. Check local command help
before running a command, particularly if the installed version differs.
Do not install the agent itself. If it is unavailable, use its interface or
explain the exact missing capability. Preserve unrelated configuration; back up
an existing file before editing it, merge the named entry and avoid duplicates.
Use the active project's configuration when appropriate; do not silently make
a global installation. Never disable host approvals or change tool auto-grants.

### Recommended OAuth permissions: Full access

For a new connection, recommend **Full access** so translations, usage checks,
history management and glossary work do not require another OAuth setup later.
When the client supports explicit OAuth scopes, request all eight permissions
advertised by AI Glot:

```text
account:read,usage:read,batches:read,batches:write,batches:create,glossaries:read,glossaries:write,webhooks:write
```

If the host offers a permission preset, recommend **Full access**. Otherwise,
use its documented scope controls and let the user review the OAuth consent
screen. `webhooks:write` is advertised but not active yet; its consent description
covers the future webhook capability. Workspace administrator limits still
apply. Respect an explicit request for narrower access and do not silently
widen an existing grant. Full access grants capabilities, not permission to
start a translation or change data during setup.

### Codex with a terminal

If AI Glot is not already provided by an installed plugin:

```sh
codex mcp add aiglot --url https://mcp.ai-glot.com/mcp
codex mcp login aiglot --scopes account:read,usage:read,batches:read,batches:write,batches:create,glossaries:read,glossaries:write,webhooks:write
codex mcp list
```

Use the host's Authenticate action instead if command-line configuration is
unavailable. Newly configured tools may require a fresh session or reload.
Official guide: https://learn.chatgpt.com/docs/extend/mcp

### Claude Code

Prefer the existing skills-and-MCP plugin when plugin installation is available:

```text
/plugin marketplace add DuvInc/ai-glot-skills
/plugin install ai-glot@ai-glot-skills
/reload-plugins
```

Use these commands in Claude Code's plugin interface, not as shell commands.
Use the plugin server's authentication action in `/mcp`; do not assume its
server name is the same as a manually configured server.

If the user wants MCP alone or cannot install the plugin:

```sh
claude mcp add --transport http aiglot https://mcp.ai-glot.com/mcp
claude mcp login aiglot
claude mcp get aiglot
```

If this version lacks `mcp login`, use `/mcp` and its Authenticate action.
Official guide: https://code.claude.com/docs/en/mcp

### OpenCode

Merge this entry under `mcp` in the active `opencode.json` or `opencode.jsonc`:

```json
{
  "mcp": {
    "aiglot": {
      "type": "remote",
      "url": "https://mcp.ai-glot.com/mcp",
      "enabled": true
    }
  }
}
```

```sh
opencode mcp auth aiglot
opencode mcp list
```

OAuth may also be offered on first tool use. Preserve JSONC comments when
editing; never parse and rewrite an entire JSONC file as plain JSON.
Official guide: https://opencode.ai/docs/mcp-servers/

### Cursor

Use the host's MCP installation interface, or merge this entry in the active
`.cursor/mcp.json`. Use `~/.cursor/mcp.json` only for an intended global setup.

```json
{
  "mcpServers": {
    "aiglot": { "url": "https://mcp.ai-glot.com/mcp" }
  }
}
```

Use Cursor's Connect/authentication action to complete OAuth.
Official guides: https://cursor.com/docs/context/mcp and
https://cursor.com/docs/mcp/install-links

### GitHub Copilot in VS Code

Use the MCP installation UI or merge in `.vscode/mcp.json`. VS Code uses
`servers`, not Cursor's `mcpServers`:

```json
{
  "servers": {
    "aiglot": { "type": "http", "url": "https://mcp.ai-glot.com/mcp" }
  }
}
```

Use the server's Start/authentication action and complete OAuth.
Official guide: https://code.visualstudio.com/docs/agent-customization/mcp-servers

### ChatGPT, Claude chat and other hosted assistants

Use an existing AI Glot plugin/connector if available in this account. Otherwise,
use the host's custom remote MCP setup with https://mcp.ai-glot.com/mcp and OAuth,
when that feature is available. Availability can depend on plan and administrator
policy. Repository ZIPs are not evidence of a marketplace listing.

For ChatGPT desktop's MCP interface, use Settings > MCP servers > Add server,
choose Streamable HTTP, then Authenticate. Hosted ChatGPT surfaces may instead
require a plugin or the custom MCP interface allowed for that account.
For Claude chat, use Customize > Connectors > Add custom connector, then Connect.
An organization owner may need to add the connector first.

If the agent cannot install/configure a connection, give the user the endpoint
and the few actions to take in that host, then resume verification once tools
are available. Do not claim a prompt alone installed the connector.
Official guides: https://learn.chatgpt.com/docs/plugins and
https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp

### Another agent

Look up that client's official remote Streamable HTTP MCP and OAuth instructions.
Configure the canonical workspace endpoint using its documented mechanism.
Do not guess paths, JSON keys, install links or authentication commands.
If it has no supported MCP setup but can execute local commands, use the CLI
route below. If neither route is available, explain the limitation and point
to https://app.ai-glot.com. Do not describe an unsupported host as connected.

## 3. Optional local CLI and standalone skills

Install the CLI only when the chosen workflow needs local files/scripts or the
host needs the stdio bridge. Reuse it if already installed:

```sh
npm install --global @ai-glot/cli@0.3.4
aiglot auth login --scope account:read,usage:read,batches:read,batches:write,batches:create,glossaries:read,glossaries:write,webhooks:write
aiglot account --json
```

Use `aiglot auth login --device` with the same scopes if no browser is available
on this machine. Follow the CLI's displayed device instructions; do not collect
credentials in chat. For a host supporting only stdio, configure it to run
`aiglot mcp` using its documented format after CLI login.

Use the full-access scope list above for the recommended initial setup. The
account read used to verify the connection only needs `account:read`, but that
minimum is not the recommended onboarding grant. Default CLI login omits
`batches:create`, so pass the explicit scope list to avoid a second login for
translations. A write permission permits an operation; it does not authorize
an agent to spend credits during setup.

If the chosen host supports Agent Skills but no plugin was installed, install
the existing release using the host-specific agent value accepted by the skills
installer. Inspect `npx skills --help` and `npx skills add --help` first.
Do not guess an agent identifier or force installation into an unrelated client.
Verified example for Codex, project-local:

```sh
npx skills add https://github.com/DuvInc/ai-glot-skills/tree/v0.2.1 --skill aiglot-manage-workspace --agent codex
```

Other available skills are `aiglot-translate-file`, `aiglot-localize-repo`,
`aiglot-run-translations` and `aiglot-manage-glossary`. Install the ones relevant
to the user's work. Instructions do not grant access to chat attachments or
authenticate an account. Downloads: https://github.com/DuvInc/ai-glot-skills/releases/tag/v0.2.1

## 4. Verify without spending

Let the user sign in, select the intended workspace and accept OAuth themselves.
After any required reload, read `get_account` through MCP or `aiglot account
--json` through the chosen CLI profile. Verify workspace identity, granted
scopes, relevant entitlements and balance. Check whether the recommended full
access was granted; report any host or administrator restriction instead of
claiming full access. Do not create or approve a translation
to test access. Do not silently switch workspaces when the identity is wrong.

Report these separately: skills installed (or not requested), connector/CLI
configured, OAuth authenticated, account read succeeded, tools loaded in the
current conversation, and any remaining reload or user action. If a step is
unverified, say so. Being listed in configuration is not proof of connection.
Setup consumes no translation credits. Real-host acceptance varies; these
documented recipes do not certify untested client/version combinations.

Keep the final answer specific to the actual client. For an unavailable setup,
give only its verified manual route, in at most four steps, and the exact
remaining user action. Do not paste every client recipe or ask the user to run
commands for another agent. If no supported route for that product can be
verified, say that clearly; do not call generic MCP instructions "exact steps".
