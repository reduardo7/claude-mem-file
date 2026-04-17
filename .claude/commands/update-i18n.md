# Update i18n README files

Rewrite all i18n README files under `docs/i18n/` so their content matches the root `README.md`, translated into each file's respective language.

## How it works

1. Read `README.md` (source of truth) and all files in `docs/i18n/README.*.md`
2. Detect the target language from each file's locale code and its existing content header
3. Launch one sub-agent per file **in parallel** — each sub-agent translates and rewrites its assigned file

## Language map

| File | Language |
|------|----------|
| README.zh.md | Simplified Chinese (简体中文) |
| README.zh-tw.md | Traditional Chinese (繁體中文) |
| README.ja.md | Japanese (日本語) |
| README.pt.md | Portuguese (Português) |
| README.pt-br.md | Brazilian Portuguese (Português do Brasil) |
| README.ko.md | Korean (한국어) |
| README.es.md | Spanish (Español) |
| README.de.md | German (Deutsch) |
| README.fr.md | French (Français) |
| README.he.md | Hebrew (עברית) |
| README.ar.md | Arabic (العربية) |
| README.ru.md | Russian (Русский) |
| README.pl.md | Polish (Polski) |
| README.cs.md | Czech (Čeština) |
| README.nl.md | Dutch (Nederlands) |
| README.tr.md | Turkish (Türkçe) |
| README.uk.md | Ukrainian (Українська) |
| README.vi.md | Vietnamese (Tiếng Việt) |
| README.tl.md | Tagalog |
| README.id.md | Indonesian (Indonesia) |
| README.th.md | Thai (ไทย) |
| README.hi.md | Hindi (हिन्दी) |
| README.bn.md | Bengali (বাংলা) |
| README.ur.md | Urdu (اردو) |
| README.ro.md | Romanian (Română) |
| README.sv.md | Swedish (Svenska) |
| README.it.md | Italian (Italiano) |
| README.el.md | Greek (Ελληνικά) |
| README.hu.md | Hungarian (Magyar) |
| README.fi.md | Finnish (Suomi) |
| README.da.md | Danish (Dansk) |
| README.no.md | Norwegian (Norsk) |

## Instructions for each sub-agent

Each sub-agent must:

1. Read `README.md` to get the current source content
2. Read the target i18n file to understand its current structure and the translation disclaimer header
3. Rewrite the target file with:
   - Keep the disclaimer header at the top: the first line must be the machine-translation notice in the target language, followed by `---`
   - All links in the language list at the top must be **relative** (no `docs/i18n/` prefix), since the file lives inside `docs/i18n/`
   - Translate **all prose, headings, table content, and button/badge labels** into the target language
   - Keep **all code blocks, URLs, command examples, package names, file paths, and technical identifiers** in English unchanged
   - Preserve the exact markdown structure, tables, and HTML tags from the source

## Execution

Read `README.md` first, then spawn one Agent per i18n file in a **single parallel batch**. Each agent receives:
- The full content of `README.md`
- The path to its target file
- The target language name
- The instructions above

Each Agent call **must** include `"model": "haiku"` to reduce cost.

Do not process files sequentially — launch all agents simultaneously.
