---
type: fixed
---
{
  "id": "11111111-1111-4111-8111-111111111111",
  "status": "awaiting_approval",
  "next_action": "review_plan",
  "plan": {
    "summary": "Translate the provided JSON values into French.",
    "will_translate": "All text values",
    "will_not_touch": "Keys and placeholders",
    "special_rules": [
      "Keep {name} and {count} unchanged"
    ],
    "assumptions": [],
    "not_included": [],
    "languages": [
      {
        "source": "en-US",
        "target": "fr",
        "segments": 2,
        "words": 8
      }
    ],
    "totals": {
      "segments": 2,
      "words": 8,
      "files": 1
    },
    "credits": {
      "standard": 8,
      "lite": 3
    },
    "preview": [
      {
        "location": "greeting",
        "source_text": "Hello {name}",
        "source_lang": "en-US",
        "target_lang": "fr"
      }
    ]
  }
}
