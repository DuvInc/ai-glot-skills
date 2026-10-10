# OpenAI and Claude directory submissions

Source: version 0.3.0 candidate. Prepared 2026-10-10 from the current official documentation. A valid package is not an approved listing or proof of in-host behavior.

## Deliverables

- OpenAI ZIP: plugin.json, mcp.json, five skills, branding and onboarding. Listing metadata contains the four public URLs, a <=30-character subtitle, three welcome prompts, five positive and three negative cases, external-commerce explanation, all-country targeting and release notes.
- Claude ZIP: native manifest, remote .mcp.json, skills and branding.
- Claude GitHub submission folder: plugins/ai-glot. This generated folder contains no package.json/lockfile or development dependency install. Source remains in skills/ and shared/; npm run check rebuilds the distribution.
- Claude connector details: claude-connector.json. Submit the MCP connector and the skills bundle separately from the same intended organization, then pair them.

The product display name is AI Glot. The intended legal publisher is Guillaume Duvernay (freelance identity). Verify the portal's actual displayed developer name: the verified identity can override a package label. Select the personal/intended organization, never an employer organization by accident.

## Preparation evidence

See [review/CASE-RESULTS.md](review/CASE-RESULTS.md), [review/DEMO.md](review/DEMO.md) and [review/REVIEWER-ACCESS.md](review/REVIEWER-ACCESS.md). Do not mark unrun assistant cases passed. The live service tests prove the transport/lifecycle only.

Public URLs checked for content and access: AI Glot MCP documentation, support contact page, privacy policy and terms. The existing privacy policy names the legal owner, uploaded translation data, Neon/R2 and model providers, retention and deletion contact. Its wording predates the current MCP/plugin surfaces and lists CSV-era examples; review explicit connector disclosure before attesting that policy coverage is complete. Do not silently add legal commitments in this package.

## OpenAI final portal steps

After the real recording and dedicated account exist, upload the OpenAI ZIP as a draft at https://chatgpt.com/plugins. Convert/connect the remote MCP, complete OAuth, scan tools and verify the imported skills, listing/cases and exact saved version. Verify domain/publisher, enter reviewer access through secure fields, run the eight cases against this saved version, and complete required scans. The authorized publisher completes legal/policy attestations. Submit for review only after those gates are satisfied; publication after approval is a separate action.

## Claude final portal steps

At https://claude.ai/directory/manage, use the intended personal/paid Claude organization. First submit the remote MCP connector; separately submit the public repository folder plugins/ai-glot as a plugin bundle. Keep the same MCP URL. Connector authentication uses OAuth/DCR. Declare only owned link origins from claude-connector.json. Enter test access securely, provide 3-5 real MCP App carousel PNGs (>=1000px, app response only) and paired prompts, and run every tool in Claude or Inspector. The publisher must complete the seven required compliance acknowledgments. Verify the listing status independently of GitHub/npm releases.

## Remaining mandatory gates

- Real OpenAI demo recording, hosted and access verified.
- Actual in-host connection/tool/UI tests and saved-version portal tests.
- Dedicated reviewer credentials/workspace seeded and validated, never public.
- Claude carousel screenshots and paired prompts.
- Verified publisher/domain and selected organization; legal/policy attestations by the publisher.

No demo URL, screenshot, reviewer credential, portal draft or review status is fabricated. npm run submission:check -- --strict deliberately fails until required package recording evidence exists. It cannot certify private portal gates.

References:
https://developers.openai.com/plugins/deploy/submission
https://developers.openai.com/plugins/build/plugins
https://claude.com/docs/directory/publish
https://claude.com/docs/plugins/pre-submission-checklist
https://claude.com/docs/connectors/building/review-criteria
https://claude.com/docs/connectors/building/submission
