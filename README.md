# AI Glot skills

Translate structured files with your own AI Glot workspace from a compatible
assistant or coding agent. These skills teach the workflow around AI Glot's
existing API, MCP server and CLI. Translation runs in AI Glot; installing a
skill does not connect an account or grant file access.

## Skills

| Skill | Outcome |
| --- | --- |
| `aiglot-manage-workspace` | Connect and diagnose access; inspect workspace, entitlements, credits and usage. |
| `aiglot-run-translations` | Coordinate multilingual/bulk campaigns, combined budgets, parallel jobs and recovery. |
| `aiglot-translate-file` | Upload a file, inspect the priced plan, authorize it and recover the result. |
| `aiglot-localize-repo` | Translate repository resources, preserve keys and placeholders, validate and show a diff. |
| `aiglot-manage-glossary` | Read and update terminology without an accidental full replacement. |

## Install

Use the [official AI Glot agent setup instructions](https://github.com/DuvInc/ai-glot-skills/blob/main/agent-setup/prompt.md).
This GitHub file is the single source for client-by-client setup; the AI Glot docs
link here instead of maintaining duplicate instructions. For a human-friendly
overview of AI Glot skills and MCP, see [Connect AI Glot with MCP](https://ai-glot.com/docs/mcp/overview).

Stable version: `v0.2.1`. See the validation report for verified environments
and directory-review limits.

Install a selected skill in a compatible coding agent:

```sh
npx skills add https://github.com/DuvInc/ai-glot-skills/tree/v0.2.1 --skill aiglot-localize-repo --agent codex
```

For Claude Code, clone the release and add its local marketplace:

```sh
git clone --branch v0.2.1 --depth 1 https://github.com/DuvInc/ai-glot-skills.git
```

```text
/plugin marketplace add ./ai-glot-skills
/plugin install ai-glot@ai-glot-skills
```

You can also download individual skill ZIPs or the Claude/OpenAI plugin ZIPs
from Releases. Only call a surface supported after checking [COMPATIBILITY.md](COMPATIBILITY.md).
Source installation and plugin installation are alternatives; installing both
can present the same workflow twice.

## Which method to use

Prefer the CLI for local files, repository work and scripts: it handles binary
upload, OAuth browser/device login, profiles and structured output. Use connected
MCP for assistant workflows without a terminal; use REST for applications and
existing HTTP automations. Reuse an already working authorized client.

Every skill includes self-contained method and paid-guideline references.
For separate document versions in several languages, run one batch per target
from the same source, verify the combined quoted cost before approvals, and
use bounded parallelism. Named multilingual columns may fit one verified plan.

## Connect your own workspace

The remote MCP endpoint is `https://mcp.ai-glot.com/mcp`. Use the host's OAuth
connection flow. Tool names can be prefixed by the host; keep their base names
unchanged. An individual skill installation may require a separate MCP setup.

For a local-file workflow, install the CLI from the official npm package and
sign in on your machine:

```sh
npm install --global @ai-glot/cli@0.3.4
aiglot auth login --scope account:read,usage:read,batches:read,batches:write,batches:create,glossaries:read,glossaries:write,webhooks:write
aiglot account --json
```

Recommend **Full access** when connecting an agent so translations, usage,
history and glossaries do not need another OAuth setup. The command requests
all eight advertised scopes, including `webhooks:write`, which is not active
yet. Default CLI login omits `batches:create`, so use the explicit scope list.
The user reviews consent and can request narrower access. Setup never starts
a translation or spends credits.
Workspace membership and administrator scope ceilings still apply. Do not
paste an API key into a conversation or copy someone else's workspace credential.

## Example requests

- "Check my AI Glot workspace, credits, expiring grants and permissions without starting a translation."
- "Translate this report into French, German and Spanish as separate documents, with a total budget of 500 credits."
- "Translate this JSON into French. Keep its keys and {count} placeholders, and show the plan and price before starting."
- "Localize messages/en.json into German, write messages/de.json, and show the validated diff."
- "Add AI Glot as a protected term to my English-to-French glossary. Preserve every other term."

Planning does not spend credits. Approval starts work and reserves the measured
cost for the selected quality tier. Respect any existing user authorization that
covers that plan and budget; ask when an unresolved choice would change cost,
scope or the destination.

MCP binary upload needs file bytes and an external HTTP PUT client. MCP alone
does not make arbitrary chat attachments readable. When the host lacks these
capabilities, use the AI Glot app, a permitted HTTPS file URL or the local CLI.
The skills do not claim access they do not have.

## Development and releases

These commands require a source checkout. ZIPs are host installation packages,
not npm development checkouts.

```sh
npm ci
npm run check
claude plugin validate . --strict
```

Generated reference copies and host manifests are checked against their source.
Builds create deterministic plugin/skill ZIPs, a static skills catalog with file
digests and SHA256SUMS in `dist/`. Packages contain no credentials, hooks or
automatic approval grants. The static catalog is a build artifact, not a claim
that the production MCP server currently serves Skills over MCP.

See [VALIDATION.md](VALIDATION.md), [CONTRIBUTING.md](CONTRIBUTING.md), [evaluation guide](https://github.com/DuvInc/ai-glot-skills/blob/v0.2.1/evals/README.md) and
[packaging/SUBMISSION.md](packaging/SUBMISSION.md).

## Documentation and support

[AI Glot documentation](https://ai-glot.com/docs),
[MCP file handoff](https://ai-glot.com/docs/mcp/standard-tools),
[CLI commands](https://ai-glot.com/docs/cli/commands),
[contact](https://ai-glot.com/contact),
[privacy](https://ai-glot.com/privacy-policy),
[terms](https://ai-glot.com/terms-and-conditions).

The MIT license covers these instructions and helper code. Use of the hosted
AI Glot service follows its terms, account permissions and credit entitlements.
