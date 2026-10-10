# Secure reviewer access

Prepare a dedicated AI Glot identity and workspace with synthetic data only. Do not give reviewers the founder's own login: it may expose other workspaces and customer documents.

Required setup:

- Email/password login at https://app.ai-glot.com/login, without MFA, magic links or one-time email/SMS codes.
- One review workspace, with Standard and Lite access, paid custom guidelines, sufficient credits for the five positive cases and future reviews, and a synthetic glossary.
- Seeded synthetic completed text/binary translations from the fixtures, so history and result retrieval can be reviewed immediately.
- Permissions sufficient for the requested translation and glossary tools. OAuth grants must remain bounded by the workspace and account role.

Enter email/password, workspace name and exact sign-in instructions only into each portal's secure reviewer-access fields. Do not put them in plugin.json, mcp.json, public README, fixtures, screenshots, GitHub issues or release assets. Keep a private operational record of access and available credit balance; never include credentials in the public build.

The reviewer must be able to connect through the normal OAuth flow and choose only the review workspace. Verify this account before marking the submission ready.
