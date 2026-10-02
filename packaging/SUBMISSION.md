# Directory submissions

This repository can be installed from source before it is listed in a directory.
A built package is not an approved marketplace listing.

## OpenAI

Upload the portable ai-glot-openai ZIP through the Plugins portal, with the
remote MCP integration included from the start. It contains plugin.json,
mcp.json, three skills and existing AI Glot branding. It has no app-ID reference
or hooks, which are currently excluded from public ZIP submission.

Complete publisher verification, OAuth connection setup, domain challenge and
reviewer access in the portal. Never commit reviewer passwords or tokens.
Use the supplied positive/negative cases and actual eval report; do not claim
unrun cases passed. A demo account must contain synthetic data and enough
credits for the reviewer. A video/demo URL and screenshots may be requested;
supply real ones rather than fabricated example URLs.

Skills imported from MCP at Scan Tools are snapshots. The static catalog in
dist is prepared for a future server distribution path; this repository's
release does not itself add that extension to production.

## Claude

Submit this public repository as a plugin bundle and register its remote MCP
connector through the directory flow. The Claude manifest references the
same skills and canonical MCP URL. Test the install and OAuth flow for the
surfaces advertised. CLI manifest validation is not a Desktop/mobile UI test.

Account/publisher identity, directory attestations and review acceptance are
portal-specific. Track the listing status independently of GitHub releases.

## Release checklist

- npm ci; npm run check; native Claude validation.
- Review package contents and SHA256SUMS.
- Record the exact source commit and CLI compatibility.
- Verify the public install command from an isolated environment.
- Use a dedicated reviewer workspace before submitting private-data tools.
- Prepare submission details and get the publisher's final approval before
  submitting attestations or publishing a reviewed directory listing.

Official references:
https://developers.openai.com/plugins/build/plugins
https://developers.openai.com/plugins/deploy/submission
https://claude.com/docs/directory/publish
