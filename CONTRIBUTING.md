# Contributing

Keep changes focused on a user outcome. The canonical skill instructions live in
`skills/*/SKILL.md`; shared connection guidance lives in `shared/connection.md`.
Run `npm run generate` to refresh shared copies and host manifests, then
`npm run check`. Never edit generated references or host manifests by hand.

Use fictional fixtures. Do not include credentials, signed URLs, private file
contents, customer data or local account paths. Avoid hooks, permission
pre-approvals and unrelated product promotion.

A behavioral change needs a positive case and a relevant failure case under
`evals/`. Record actual model-eval results separately from structural checks.
Live tests are opt-in and have a measured credit ceiling.

Bump the version in package.json and regenerate before releasing. Packages must
remain useful without UI; UI and host-specific features belong to the host
integration, not to a new translation engine.
