---
type: fixed
---
{
  "id": "11111111-1111-4111-8111-111111111111",
  "status": "awaiting_approval",
  "next_action": "review_plan",
  "plan": {
    "summary": "Only greeting is supported in this synthetic plan.",
    "not_included": [
      "The requested count value will remain untranslated."
    ],
    "will_translate": "greeting",
    "will_not_touch": "count",
    "credits": {
      "standard": 8,
      "lite": 3
    },
    "preview": [
      {
        "location": "greeting",
        "source_text": "Hello {name}",
        "target_lang": "fr"
      }
    ],
    "languages": [
      {
        "source": "en-US",
        "target": "fr",
        "segments": 1,
        "words": 2
      }
    ],
    "totals": {
      "segments": 1,
      "words": 2
    }
  }
}
