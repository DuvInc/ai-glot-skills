# Prepare and validate by file family

Read the connected account's supported_formats and per-format byte caps, and
the current guide https://ai-glot.com/docs/platform/files-and-formats. Do not
freeze a count of formats or one global upload cap into a workflow.

| Family | Scope to put in the plan | Validation and practical advice |
| --- | --- | --- |
| CSV, Excel, OpenDocument spreadsheets | Exact columns/sheets, source/target columns, missing-only vs full replacement; preserve identifiers, formulas, prices and source cells. | Use unique headers and stable row IDs. CSV needs UTF-8 and consistent rows; upload XLSX directly rather than converting unnecessarily. Verify the plan's actual destinations. |
| JSON/ARB, YAML, TOML | Translate selected human-readable values; preserve keys, nesting, arrays and non-string data. | Use the existing repo importer. JSON may be reformatted; YAML comments are not retained. Validate before overwriting. |
| XLIFF, PO, Qt, Android, Apple and other resource formats | Target language and eligible untranslated/selected entries, according to the actual resource structure. | Preserve IDs/placeholders/inline tags and use format-specific plural/parser validation. A Qt .ts resource is not arbitrary TypeScript source code. Do not use a simple JSON checker as an ICU/plural proof. |
| Word, PowerPoint, OpenDocument, EPUB | Whole text or an explicit subset, including whether slide notes/headers/footnotes matter. | Inspect excluded content in the plan. Text in images, comments, tracked changes or charts must not be assumed translated. Review layout where longer wording matters. |
| Text-based PDF | Eligible text, target and any supported scope. | CLI needs 0.3.4+. Scans need OCR outside this workflow; protected/encrypted/signed PDFs and unsupported forms may be refused. Do not claim OCR or perfect visual/accessible layout verification. |
| Markdown/MDX/HTML/text | Visible prose and human-readable attributes; preserve code, tags, imports and link destinations. | Use the project's parser/build. Do not translate executable syntax or count a non-empty file as a successful round trip. |
| Subtitles | Cue text into the requested language; preserve timecodes, cue numbers and styling. | Validate subtitle parsing/timings. Translation is not audio transcription, dubbing or retiming. |
| ZIP | A common instruction across compatible same-structure supported members. | Preserve folder tree/filenames. Mixed formats or differing per-file instructions need separate batches; file-count/value limits can apply besides byte size. |

Keep originals and write translated results to separate paths first. Converting
a refused legacy Office/Apple file to its supported modern export is a user
preparation step; renaming the extension does not convert the content.

If content exceeds a limit, split at meaningful file/record boundaries using
the project's exporter, preserving keys/IDs and a reconstruction map. Do not
truncate strings, discard pages or divide binary files into arbitrary byte chunks.
Splitting adds distinct jobs to the combined budget and changes delivery, so
verify the requested scope and outputs before starting.

Check every requested target and excluded part against the actual priced plan.
A preview is a sample, not evidence that every field/page was translated.
Validate the downloaded result with the format's parser or importer; a structure
check is different from linguistic review and visual inspection.
