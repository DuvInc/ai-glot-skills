# Evaluation

npm test validates package contracts, archive contents and JSON preservation.
It does not measure whether a model activates or follows a skill.

Behavior cases under evals/ use Claude Code's native plugin eval format and
fixed MCP mocks. The mocks use synthetic data and cannot spend AI Glot credits.
Run with read tools/Skill and fixed MCP mocks. Real servers are not enabled:

```sh
npx @anthropic-ai/claude-code@2.1.287 plugin eval . --runs 1 --ablation none --no-publish --output-dir evals/results/local
```

The harness may require an interactive trust decision on first use. Never skip
an access/trust restriction silently. Record agent model, number of runs, case
scores and any unavailable surfaces. A passing schema test is not a behavioral
evaluation. An obvious missing-language/target clarification may happen before
loading a skill; those cases grade safe questioning and no side effects, while
complete workflows explicitly grade skill activation and tool usage. Do not publish private transcripts or account identifiers.

A live smoke uses the user's already configured CLI, a tiny synthetic JSON
file and an explicit credit ceiling:
`npm run smoke -- --approve --max-credits 5`.
Without --approve it plans only. The script checks exclusions, structure and
simple placeholders; it does not certify linguistic quality.

The expanded suite covers workspace diagnostics, app-only administration,
paid/free guideline boundaries, multilingual campaign budgets and cancelled-job
recovery. Explanatory answers are graded from the final message, operations
from tool calls, and no-spend boundaries with deterministic checks. A direct
read of a known batch need not activate a skill to be correct. The glossary additive case intentionally returns a stale read after a successful
edit; it checks the exact additive call and an honest discrepancy report.
It is a recovery scenario, not evidence of a verified happy-path glossary save.
