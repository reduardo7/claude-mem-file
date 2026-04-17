🌐 यह एक स्वचालित अनुवाद है। समुदाय के सुधार का स्वागत है!

---

<h1 align="center">
  <br>
  <a href="https://github.com/reduardo7/claude-mem-file">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/claude-mem-file-logo-for-dark-mode.webp">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/claude-mem-file-logo-for-light-mode.webp">
      <img src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/claude-mem-file-logo-for-light-mode.webp" alt="Claude-Mem-File" width="400">
    </picture>
  </a>
  <br>
</h1>

<p align="center">
  <a href="README.zh.md">🇨🇳 中文</a> •
  <a href="README.zh-tw.md">🇹🇼 繁體中文</a> •
  <a href="README.ja.md">🇯🇵 日本語</a> •
  <a href="README.pt.md">🇵🇹 Português</a> •
  <a href="README.pt-br.md">🇧🇷 Português</a> •
  <a href="README.ko.md">🇰🇷 한국어</a> •
  <a href="README.es.md">🇪🇸 Español</a> •
  <a href="README.de.md">🇩🇪 Deutsch</a> •
  <a href="README.fr.md">🇫🇷 Français</a> •
  <a href="README.he.md">🇮🇱 עברית</a> •
  <a href="README.ar.md">🇸🇦 العربية</a> •
  <a href="README.ru.md">🇷🇺 Русский</a> •
  <a href="README.pl.md">🇵🇱 Polski</a> •
  <a href="README.cs.md">🇨🇿 Čeština</a> •
  <a href="README.nl.md">🇳🇱 Nederlands</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a> •
  <a href="README.uk.md">🇺🇦 Українська</a> •
  <a href="README.vi.md">🇻🇳 Tiếng Việt</a> •
  <a href="README.tl.md">🇵🇭 Tagalog</a> •
  <a href="README.id.md">🇮🇩 Indonesia</a> •
  <a href="README.th.md">🇹🇭 ไทย</a> •
  <a href="README.hi.md">🇮🇳 हिन्दी</a> •
  <a href="README.bn.md">🇧🇩 বাংলা</a> •
  <a href="README.ur.md">🇵🇰 اردو</a> •
  <a href="README.ro.md">🇷🇴 Română</a> •
  <a href="README.sv.md">🇸🇪 Svenska</a> •
  <a href="README.it.md">🇮🇹 Italiano</a> •
  <a href="README.el.md">🇬🇷 Ελληνικά</a> •
  <a href="README.hu.md">🇭🇺 Magyar</a> •
  <a href="README.fi.md">🇫🇮 Suomi</a> •
  <a href="README.da.md">🇩🇰 Dansk</a> •
  <a href="README.no.md">🇳🇴 Norsk</a>
</p>

> [!NOTE]
> **यह [claude-mem](https://github.com/thedotmack/claude-mem) का एक फोर्क है** जिसे [Alex Newman (@thedotmack)](https://github.com/thedotmack) द्वारा बनाया गया था।
>
> यह फोर्क SQLite/बाइनरी स्टोरेज बैकएंड को **केवल फाइलसिस्टम दृष्टिकोण** से बदलता है: सभी मेमोरी को `<project-root>/docs/vault/` के अंतर्गत plain Markdown फ़ाइलों के रूप में संग्रहीत किया जाता है, git के माध्यम से पूरी तरह से संस्करणीय और आपकी टीम के प्रत्येक सदस्य के साथ साझा करने योग्य। कोई स्थानीय डेटाबेस नहीं, कोई बाइनरी ब्लॉब नहीं — केवल वे फ़ाइलें जिन्हें आप पढ़ सकते हैं, संपादित कर सकते हैं, प्रतिबद्ध कर सकते हैं, और merge कर सकते हैं।

<h4 align="center">claude-mem-file — <a href="https://claude.com/claude-code" target="_blank">Claude Code</a> के लिए बनाई गई स्थायी मेमोरी संपीड़न प्रणाली।</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/reduardo7/claude-mem-file">
        <picture>
          <img
            src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/cm-preview.gif"
            alt="Claude-Mem-File Preview"
            width="500"
          >
        </picture>
      </a>
    </td>
    <td align="center">
      <a href="https://www.star-history.com/#reduardo7/claude-mem-file&Date">
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcset="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&theme=dark&legend=top-left"
          />
          <source
            media="(prefers-color-scheme: light)"
            srcset="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left"
          />
          <img
            alt="Star History Chart"
            src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left"
            width="500"
          />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#त्वरित-शुरुआत">त्वरित शुरुआत</a> •
  <a href="#यह-कैसे-काम-करता-है">यह कैसे काम करता है</a> •
  <a href="#mcp-खोज-उपकरण">खोज उपकरण</a> •
  <a href="#दस्तावेज़ीकरण">दस्तावेज़ीकरण</a> •
  <a href="#कॉन्फ़िगरेशन">कॉन्फ़िगरेशन</a> •
  <a href="#समस्या-निवारण">समस्या निवारण</a> •
  <a href="#लाइसेंस">लाइसेंस</a>
</p>

<p align="center">
  Claude-Mem-File सभी मेमोरी को `<project-root>/docs/vault/` के अंतर्गत एक प्रति-परियोजना Obsidian-संगत vault में plain Markdown के रूप में संग्रहीत करके सत्रों में संदर्भ को निर्बाध रूप से संरक्षित करता है — कोई SQLite डेटाबेस नहीं, कोई बाइनरी blobs नहीं, पूरी तरह से git के माध्यम से mergeable।
</p>

---

## त्वरित शुरुआत

एक एकल कमांड के साथ इंस्टॉल करें:

```bash
npx claude-mem-file install
```

या Gemini CLI के लिए इंस्टॉल करें (स्वचालित रूप से `~/.gemini` का पता लगाता है):

```bash
npx claude-mem-file install --ide gemini-cli
```

या OpenCode के लिए इंस्टॉल करें:

```bash
npx claude-mem-file install --ide opencode
```

या Claude Code के अंदर प्लगइन marketplace से इंस्टॉल करें:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Claude Code या Gemini CLI को पुनः आरंभ करें। पिछले सत्रों का संदर्भ स्वचालित रूप से नए सत्रों में दिखाई देगा।

> **नोट:** Claude-Mem-File npm पर भी प्रकाशित है, लेकिन `npm install -g claude-mem-file` **केवल SDK/library को इंस्टॉल करता है** — यह प्लगइन hooks को रजिस्टर नहीं करता या worker service को सेटअप नहीं करता है। हमेशा `npx claude-mem-file install` या ऊपर दिए गए `/plugin` कमांड के माध्यम से इंस्टॉल करें।

### 🦞 OpenClaw Gateway

एक एकल कमांड के साथth OpenClaw gateways पर claude-mem-file को एक persistent memory plugin के रूप में इंस्टॉल करें:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

इंस्टॉलर dependencies को संभालता है, प्लगइन सेटअप, AI provider कॉन्फ़िगरेशन, worker startup, और Telegram, Discord, Slack, और अन्य के लिए वैकल्पिक real-time observation feeds। विवरण के लिए [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) देखें।

**मुख्य विशेषताएं:**

- 🧠 **स्थायी मेमोरी** - संदर्भ सत्रों में बना रहता है
- 📁 **Markdown Vault (Obsidian-संगत)** - Observations और sessions को `<project-root>/docs/vault/` के अंतर्गत `.md` फ़ाइलों के रूप में संग्रहीत किया जाता है, संस्करणीय और git के माध्यम से mergeable — कोई SQLite नहीं, dev मशीनों पर कोई बाइनरी state नहीं
- 📊 **प्रगतिशील प्रकटीकरण** - टोकन लागत दृश्यता के साथ स्तरित मेमोरी पुनर्प्राप्ति
- 🔍 **Skill-आधारित खोज** - mem-search skill के साथ अपने प्रोजेक्ट इतिहास को क्वेरी करें (vault पर in-memory `minisearch` द्वारा संचालित)
- 🖥️ **वेब व्यूअर UI** - http://localhost:37777 पर real-time मेमोरी स्ट्रीम
- 💻 **Claude Desktop Skill** - Claude Desktop वार्तालापों से मेमोरी खोजें
- 🔒 **गोपनीयता नियंत्रण** - संवेदनशील सामग्री को storage से बाहर रखने के लिए `<private>` tags का उपयोग करें
- ⚙️ **संदर्भ कॉन्फ़िगरेशन** - किस संदर्भ को inject किया जाता है, इस पर fine-grained नियंत्रण
- 🤖 **स्वचालित संचालन** - कोई manual intervention की आवश्यकता नहीं
- 🔗 **उद्धरण** - IDs के साथ पिछले observations का संदर्भ दें (http://localhost:37777/api/observation/{id} के माध्यम से एक्सेस करें या http://localhost:37777 पर web viewer में सभी देखें)
- 🧪 **बीटा चैनल** - Version switching के माध्यम से Endless Mode जैसी प्रायोगिक सुविधाओं को आज़माएं

## SQLite से Migration (legacy)

पूर्ववर्ती releases memory को `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB) में संग्रहीत करते थे। नया vault layout इस सब को `<project-root>/docs/vault/` में plain Markdown से बदल देता है। आपकी पूर्व मेमोरीज खोई नहीं गई हैं — migration script को एक बार चलाएं:

```bash
# किसी भी परियोजना के अंदर से जो पहले claude-mem-file का उपयोग करती थी:
npm run migrate-to-vault              # legacy DB से docs/vault/ लिखता है
npm run migrate-to-vault:dry          # लिखे बिना पूर्वावलोकन करता है
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # explicit paths
```

Script SQLite डेटाबेस को read-only खोलता है और idempotent है (SHA-256 content hashes के माध्यम से duplicates का पता लगाया जाता है, इसलिए re-running सुरक्षित है)। अपने repo में परिणामी `docs/vault/` फ़ोल्डर को commit करें अपनी टीम के साथ memory साझा करने के लिए।

---

## दस्तावेज़ीकरण

📚 **[पूर्ण दस्तावेज़ीकरण देखें](https://docs.claude-mem-file.ai/)** - official website पर browse करें

### शुरुआत करना

- **[Installation Guide](https://docs.claude-mem-file.ai/installation)** - Quick start & advanced installation
- **[Gemini CLI Setup](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google के Gemini CLI integration के लिए dedicated guide
- **[Usage Guide](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-File स्वचालित रूप से कैसे काम करता है
- **[Search Tools](https://docs.claude-mem-file.ai/usage/search-tools)** - अपने प्रोजेक्ट इतिहास को natural language के साथ क्वेरी करें
- **[Beta Features](https://docs.claude-mem-file.ai/beta-features)** - Endless Mode जैसी प्रायोगिक सुविधाओं को आज़माएं

### सर्वोत्तम अभ्यास

- **[Context Engineering](https://docs.claude-mem-file.ai/context-engineering)** - AI agent context optimization सिद्धांत
- **[Progressive Disclosure](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-File की context priming strategy के पीछे दर्शन

### आर्किटेक्चर

- **[Overview](https://docs.claude-mem-file.ai/architecture/overview)** - System components & data flow
- **[Architecture Evolution](https://docs.claude-mem-file.ai/architecture-evolution)** - v3 से v5 तक की यात्रा
- **[Hooks Architecture](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-File lifecycle hooks का उपयोग कैसे करता है
- **[Hooks Reference](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook scripts समझाई गई
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API & Bun management
- **[Docs Vault](docs/)** - साझा परियोजना ज्ञान के लिए Obsidian-style Markdown vault

### कॉन्फ़िगरेशन & विकास

- **[Configuration](https://docs.claude-mem-file.ai/configuration)** - Environment variables & settings
- **[Development](https://docs.claude-mem-file.ai/development)** - Building, testing, contributing
- **[Troubleshooting](https://docs.claude-mem-file.ai/troubleshooting)** - सामान्य समस्याएं & समाधान

---

## यह कैसे काम करता है

**मुख्य घटक:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook scripts)
2. **Smart Install** - Cached dependency checker (pre-hook script, lifecycle hook नहीं)
3. **Worker Service** - HTTP API on port 37777 with web viewer UI and 10 search endpoints, Bun द्वारा managed
4. **Docs Vault** (`docs/`) - Obsidian-style Markdown vault repository में committed; सभी architectural decisions, context, और knowledge के लिए shared source of truth across sessions and collaborators
5. **mem-search Skill** - Progressive disclosure के साथ natural language queries

विवरण के लिए [Architecture Overview](https://docs.claude-mem-file.ai/architecture/overview) देखें।

---

## MCP खोज उपकरण

Claude-Mem-File एक token-efficient **3-layer workflow pattern** का पालन करते हुए **4 MCP tools** के माध्यम से intelligent मेमोरी खोज प्रदान करता है:

**3-Layer Workflow:**

1. **`search`** - Compact index with IDs प्राप्त करें (~50-100 tokens/result)
2. **`timeline`** - Interesting results के आसपास chronological context प्राप्त करें
3. **`get_observations`** - Full details को केवल filtered IDs के लिए fetch करें (~500-1,000 tokens/result)

**यह कैसे काम करता है:**

- Claude MCP tools का उपयोग करके आपकी memory को खोजता है
- `search` के साथ शुरुआत करके results का एक index प्राप्त करें
- `timeline` का उपयोग करके specific observations के आसपास क्या हो रहा था यह देखें
- `get_observations` का उपयोग करके relevant IDs के लिए full details fetch करें
- **~10x टोकन बचत** details fetch करने से पहले filtering करके

**उपलब्ध MCP Tools:**

1. **`search`** - Full-text queries के साथ मेमोरी index को खोजें, type/date/project द्वारा filter करें
2. **`timeline`** - एक specific observation या query के आसपास chronological context प्राप्त करें
3. **`get_observations`** - IDs द्वारा full observation details fetch करें (हमेशा multiple IDs को batch करें)

**उपयोग उदाहरण:**

```typescript
// Step 1: Search के लिए index प्राप्त करें
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Step 2: Index को review करें, relevant IDs identify करें (e.g., #123, #456)

// Step 3: Full details fetch करें
get_observations((ids = [123, 456]));
```

विस्तृत उदाहरणों के लिए [Search Tools Guide](https://docs.claude-mem-file.ai/usage/search-tools) देखें।

---

## बीटा विशेषताएं

Claude-Mem-File **बीटा चैनल** के साथ **Endless Mode** (extended sessions के लिए biomimetic memory architecture) जैसी प्रायोगिक सुविधाएं प्रदान करता है। Web viewer UI at http://localhost:37777 → Settings से stable और beta versions के बीच switch करें।

Endless Mode के विवरण और इसे आज़माने के तरीके के लिए **[Beta Features Documentation](https://docs.claude-mem-file.ai/beta-features)** देखें।

---

## सिस्टम आवश्यकताएं

- **Node.js**: 18.0.0 या higher
- **Claude Code**: Plugin support के साथ नवीनतम संस्करण
- **Bun**: JavaScript runtime और process manager (यदि गायब हो तो auto-installed)

---

### Windows सेटअप नोट्स

यदि आप एक error जैसे देखते हैं:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

सुनिश्चित करें कि Node.js और npm इंस्टॉल हैं और आपके PATH में जोड़े गए हैं। https://nodejs.org से नवीनतम Node.js इंस्टॉलर डाउनलोड करें और इंस्टॉलेशन के बाद अपने terminal को restart करें।

---

## कॉन्फ़िगरेशन

Settings को `~/.claude-mem-file/settings.json` में managed किया जाता है (पहली बार चलने पर defaults के साथ auto-created)। AI model, worker port, data directory, log level, और context injection settings को configure करें।

सभी उपलब्ध settings और examples के लिए **[Configuration Guide](https://docs.claude-mem-file.ai/configuration)** देखें।

### Mode & Language कॉन्फ़िगरेशन

Claude-Mem-File `CLAUDE_MEM_MODE` setting के माध्यम से multiple workflow modes और languages को support करता है।

यह option दोनों को नियंत्रित करता है:

- The workflow behavior (e.g. code, chill, investigation)
- Generated observations में उपयोग की जाने वाली language

#### कैसे configure करें

`~/.claude-mem-file/settings.json` पर अपनी settings file को edit करें:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Modes को `plugin/modes/` में defined किया जाता है। सभी उपलब्ध modes को locally देखने के लिए:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### उपलब्ध Modes

| Mode       | Description             |
| ---------- | ----------------------- |
| `code`     | Default English mode    |
| `code--zh` | Simplified Chinese mode |
| `code--ja` | Japanese mode           |

Language-specific modes pattern `code--[lang]` का पालन करते हैं जहां `[lang]` ISO 639-1 language code है (e.g., `zh` for Chinese, `ja` for Japanese, `es` for Spanish)।

> नोट: `code--zh` (Simplified Chinese) पहले से ही built-in है — कोई अतिरिक्त installation या plugin update की आवश्यकता नहीं है।

#### Mode बदलने के बाद

नई mode configuration को apply करने के लिए Claude Code को Restart करें।

## विकास

Build instructions, testing, और contribution workflow के लिए **[Development Guide](https://docs.claude-mem-file.ai/development)** देखें।

---

## समस्या निवारण

यदि समस्याओं का सामना कर रहे हैं, तो Claude को समस्या का वर्णन करें और troubleshoot skill स्वचालित रूप से निदान करेगी और सुधार प्रदान करेगी।

सामान्य समस्याओं और समाधानों के लिए **[Troubleshooting Guide](https://docs.claude-mem-file.ai/troubleshooting)** देखें।

---

## Bug रिपोर्ट्स

Automated generator के साथ comprehensive bug reports बनाएं:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## योगदान

योगदान का स्वागत है! कृपया:

1. Repository को fork करें
2. एक feature branch बनाएं
3. Tests के साथ अपने परिवर्तन करें
4. Documentation को update करें
5. एक Pull Request सबमिट करें

Contribution workflow के लिए [Development Guide](https://docs.claude-mem-file.ai/development) देखें।

---

## लाइसेंस

यह project **GNU Affero General Public License v3.0** (AGPL-3.0) के अंतर्गत licensed है।

Copyright (C) 2025 Alex Newman (@thedotmack)। सर्वाधिकार सुरक्षित।

Full details के लिए [LICENSE](LICENSE) file देखें।

**इसका क्या अर्थ है:**

- आप इस software को freely use, modify, और distribute कर सकते हैं
- यदि आप modify और network server पर deploy करते हैं, तो आपको अपना source code उपलब्ध कराना चाहिए
- Derivative works को भी AGPL-3.0 के अंतर्गत licensed होना चाहिए
- इस software के लिए कोई WARRANTY नहीं है

**Ragtime पर नोट**: `ragtime/` directory को separately **PolyForm Noncommercial License 1.0.0** के अंतर्गत licensed किया गया है। Details के लिए [ragtime/LICENSE](ragtime/LICENSE) देखें।

---

## समर्थन

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Official X Account**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Official Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Author**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Claude Agent SDK के साथ निर्मित** | **Claude Code द्वारा संचालित** | **TypeScript के साथ बनाया गया**

---

### $CMEM के बारे में क्या है?

$CMEM एक solana token है जिसे एक 3rd party द्वारा Claude-Mem-File की prior consent के बिना बनाया गया था, लेकिन officially Claude-Mem-File के creator (Alex Newman, @thedotmack) द्वारा embraced किया गया। Token समुदाय के विकास के लिए एक catalyst के रूप में कार्य करता है और developers और knowledge workers को real-time agent data लाने का एक vehicle है। $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
