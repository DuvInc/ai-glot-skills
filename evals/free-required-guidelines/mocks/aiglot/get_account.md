---
type: fixed
---
{
  "workspace": {
    "id": "synthetic-workspace",
    "name": "Synthetic review workspace",
    "plan": "free"
  },
  "credit_balance": 100,
  "entitlements": {
    "quality_tiers": [
      "standard"
    ],
    "custom_guidelines": false,
    "max_upload_bytes_by_format": {
      "json": 8388608,
      "xlsx": 52428800
    },
    "max_glossaries": 10,
    "max_terms_per_glossary": 50
  },
  "capabilities": {
    "batch_creation": true,
    "supported_formats": [
      "json",
      "xlsx"
    ]
  },
  "credential": {
    "kind": "oauth",
    "scopes": [
      "account:read",
      "batches:read",
      "batches:create",
      "batches:write",
      "glossaries:read",
      "glossaries:write"
    ]
  }
}
