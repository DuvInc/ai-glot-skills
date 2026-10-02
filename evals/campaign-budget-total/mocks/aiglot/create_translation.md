---
type: fixed
---
{
  "id": "11111111-1111-4111-8111-111111111111",
  "status": "awaiting_approval",
  "next_action": "review_plan",
  "plan": {
    "summary": "Fill French and German columns from text",
    "will_translate": "Source text into French and German destination columns",
    "will_not_touch": "Source text, headers and column order",
    "special_rules": [],
    "assumptions": [],
    "not_included": [],
    "languages": [
      {
        "source": "en-US",
        "target": "fr",
        "segments": 1,
        "words": 8
      },
      {
        "source": "en-US",
        "target": "de",
        "segments": 1,
        "words": 8
      }
    ],
    "totals": {
      "segments": 2,
      "words": 16,
      "files": 1
    },
    "credits": {
      "standard": 16,
      "lite": 6
    },
    "preview": [
      {
        "location": "row 1, column fr",
        "source_text": "Hello friend your new messages are available today",
        "source_lang": "en-US",
        "target_lang": "fr"
      },
      {
        "location": "row 1, column de",
        "source_text": "Hello friend your new messages are available today",
        "source_lang": "en-US",
        "target_lang": "de"
      }
    ],
    "instruction": "Fill fr and de from text, preserve source"
  },
  "file_name": "campaign.csv"
}
