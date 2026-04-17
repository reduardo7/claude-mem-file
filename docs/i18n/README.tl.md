🌐 Ito ay awtomatikong pagsasalin. Ang mga pagwawasto ng komunidad ay tinatanggap!

# claude-mem-file

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
> **Ito ay isang fork ng [claude-mem](https://github.com/thedotmack/claude-mem)** ng [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Ang fork na ito ay nagpapalit ng SQLite/binary storage backend sa pamamagitan ng isang **filesystem-only approach**: lahat ng memory ay nakaimbak bilang plain Markdown files sa ilalim ng `<project-root>/docs/vault/`, ganap na versionable sa pamamagitan ng git at shareable sa bawat miyembro ng iyong team. Walang local databases, walang binary blobs — lamang mga files na maaari mong basahin, baguhin, i-commit, at i-merge.

<h4 align="center">claude-mem-file — Sistema ng persistent memory compression na binuo para sa <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#mabilis-na-pagsisimula">Mabilis na Pagsisimula</a> •
  <a href="#paano-ito-gumagana">Paano Ito Gumagana</a> •
  <a href="#mga-search-tool-ng-mcp">Mga Search Tool</a> •
  <a href="#dokumentasyon">Dokumentasyon</a> •
  <a href="#konpigurasyon">Konpigurasyon</a> •
  <a href="#pag-troubleshoot">Pag-troubleshoot</a> •
  <a href="#lisensya">Lisensya</a>
</p>

<p align="center">
  Pinapanatili ng Claude-Mem-File ang konteksto sa pagitan ng mga session sa pamamagitan ng pagkuha ng mga obserbasyon sa paggamit ng tools, pagbuo ng mga semantic summaries, at pag-iimbak ng lahat bilang versionned Markdown sa loob ng isang per-project Obsidian-compatible vault sa <code>&lt;project-root&gt;/docs/vault/</code> — walang SQLite database, walang binary blobs, ganap na mergeable sa pamamagitan ng git.
</p>

---

## Mabilis na Pagsisimula

Mag-install gamit ang isang command:

```bash
npx claude-mem-file install
```

O mag-install para sa Gemini CLI (auto-detects `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

O mag-install para sa OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

O mag-install mula sa plugin marketplace sa loob ng Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

I-restart ang Claude Code o Gemini CLI. Ang konteksto mula sa mga nakaraang session ay awtomatikong lalabas sa mga bagong session.

> **Tala:** Ang Claude-Mem-File ay inilathala rin sa npm, ngunit ang `npm install -g claude-mem-file` ay nag-install lamang ng **SDK/library** — hindi ito nagre-register ng plugin hooks o nag-setup ng worker service. Laging mag-install sa pamamagitan ng `npx claude-mem-file install` o ang mga `/plugin` commands sa itaas.

### 🦞 OpenClaw Gateway

I-install ang claude-mem-file bilang persistent memory plugin sa [OpenClaw](https://openclaw.ai) gateways gamit ang isang command:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Ang installer ay nag-hahandle ng mga dependencies, plugin setup, AI provider configuration, worker startup, at optional real-time observation feeds sa Telegram, Discord, Slack, at iba pa. Tingnan ang [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) para sa detalye.

**Mga Pangunahing Feature:**

- 🧠 **Persistent Memory** - Nananatili ang konteksto sa pagitan ng mga session
- 📁 **Markdown Vault (Obsidian-compatible)** - Ang mga obserbasyon at session ay nakaimbak bilang `.md` files sa ilalim ng `<project-root>/docs/vault/`, versionable at mergeable sa pamamagitan ng git — walang SQLite, walang binary state sa dev machines
- 📊 **Progressive Disclosure** - Layered na memory retrieval na may token cost visibility
- 🔍 **Skill-Based Search** - I-query ang iyong project history gamit ang mem-search skill (powered ng in-memory `minisearch` sa buong vault)
- 🖥️ **Web Viewer UI** - Real-time memory stream sa http://localhost:37777
- 💻 **Claude Desktop Skill** - Maghanap sa memory mula sa Claude Desktop conversations
- 🔒 **Privacy Control** - Gumamit ng `<private>` tags para maiwasan ang pag-store ng sensitibong nilalaman
- ⚙️ **Context Configuration** - Fine-grained na kontrol sa kung anong konteksto ang ini-inject
- 🤖 **Automatic Operation** - Walang kailangang manual na intervention
- 🔗 **Citations** - Mag-refer ng mga lumang obserbasyon gamit ang IDs (i-access sa http://localhost:37777/api/observation/{id} o tingnan lahat sa web viewer sa http://localhost:37777)
- 🧪 **Beta Channel** - Subukan ang mga experimental feature gaya ng Endless Mode sa pamamagitan ng version switching

## Migrante mula sa SQLite (legacy)

Ang mga nakaraang release ay nag-store ng memory sa `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Ang bagong vault layout ay nagpapalit ng lahat ng iyon ng plain Markdown sa `<project-root>/docs/vault/`. Ang iyong mga lumang memories ay hindi nawala — tungkol ang migration script nang isang beses:

```bash
# mula sa anumang proyekto na nakaraan gumagamit ng claude-mem-file:
npm run migrate-to-vault              # nagsusulat ng docs/vault/ mula sa legacy DB
npm run migrate-to-vault:dry          # preview nang walang pagsusulat
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # explicit paths
```

Ang script ay bumubukas ng SQLite database sa read-only at ay idempotent (mga duplicate ay natutuklasan sa pamamagitan ng SHA-256 content hashes, kaya ang muling pagpapatakbo ay ligtas). I-commit ang nagreresultang `docs/vault/` folder sa iyong repo upang ibahagi ang memory sa iyong team.

---

## Dokumentasyon

📚 **[Tingnan ang Buong Dokumentasyon](https://docs.claude-mem-file.ai/)** - I-browse sa opisyal na website

### Pagsisimula

- **[Installation Guide](https://docs.claude-mem-file.ai/installation)** - Mabilis na pagsisimula at advanced installation
- **[Gemini CLI Setup](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Dedicated guide para sa Google's Gemini CLI integration
- **[Usage Guide](https://docs.claude-mem-file.ai/usage/getting-started)** - Paano awtomatikong gumagana ang Claude-Mem-File
- **[Search Tools](https://docs.claude-mem-file.ai/usage/search-tools)** - I-query ang iyong project history gamit ang natural language
- **[Beta Features](https://docs.claude-mem-file.ai/beta-features)** - Subukan ang mga experimental feature gaya ng Endless Mode

### Best Practices

- **[Context Engineering](https://docs.claude-mem-file.ai/context-engineering)** - AI agent context optimization principles
- **[Progressive Disclosure](https://docs.claude-mem-file.ai/progressive-disclosure)** - Pilosopiya sa likod ng Claude-Mem-File's context priming strategy

### Arkitektura

- **[Overview](https://docs.claude-mem-file.ai/architecture/overview)** - Mga component ng sistema at data flow
- **[Architecture Evolution](https://docs.claude-mem-file.ai/architecture-evolution)** - Ang paglalakbay mula v3 hanggang v5
- **[Hooks Architecture](https://docs.claude-mem-file.ai/hooks-architecture)** - Paano gumagamit ang Claude-Mem-File ng lifecycle hooks
- **[Hooks Reference](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook scripts explained
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API at Bun management
- **[Docs Vault](docs/)** - Obsidian-style Markdown vault para sa shared project knowledge

### Konpigurasyon at Pagbuo

- **[Configuration](https://docs.claude-mem-file.ai/configuration)** - Environment variables at settings
- **[Development](https://docs.claude-mem-file.ai/development)** - Building, testing, contributing
- **[Troubleshooting](https://docs.claude-mem-file.ai/troubleshooting)** - Karaniwang isyu at solusyon

---

## Paano Ito Gumagana

**Mga Pangunahing Bahagi:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook scripts)
2. **Smart Install** - Cached dependency checker (pre-hook script, hindi lifecycle hook)
3. **Worker Service** - HTTP API sa port 37777 na may web viewer UI at 10 search endpoints, pinamamahalaan ng Bun
4. **Docs Vault** (`docs/`) - Obsidian-style Markdown vault na naka-commit sa repository; ang shared source ng truth para sa lahat ng architectural decisions, context, at knowledge sa pagitan ng sessions at collaborators
5. **mem-search Skill** - Natural language queries na may progressive disclosure

Tingnan ang [Architecture Overview](https://docs.claude-mem-file.ai/architecture/overview) para sa detalye.

---

## Mga Search Tool ng MCP

Nagbibigay ang Claude-Mem-File ng intelligent memory search sa pamamagitan ng **4 MCP tools** na sumusunod sa token-efficient na **3-layer workflow pattern**:

**Ang 3-Layer Workflow:**

1. **`search`** - Kumuha ng compact index na may IDs (~50-100 tokens/result)
2. **`timeline`** - Kumuha ng chronological context sa paligid ng mga interesting na result
3. **`get_observations`** - Kunin ang full details LAMANG para sa mga na-filter na IDs (~500-1,000 tokens/result)

**Paano Ito Gumagana:**

- Gumagamit si Claude ng MCP tools para maghanap sa iyong memory
- Magsimula sa `search` para makakuha ng index ng mga result
- Gamitin ang `timeline` para makita kung ano ang nangyari sa paligid ng mga specific na obserbasyon
- Gamitin ang `get_observations` para kunin ang full details ng mga relevant na IDs
- **~10x token savings** sa pamamagitan ng pag-filter bago ang pag-fetch ng mga detalye

**Available na MCP Tools:**

1. **`search`** - Hanapin ang memory index gamit ang full-text queries, filters by type/date/project
2. **`timeline`** - Kumuha ng chronological context sa paligid ng isang specific na obserbasyon o query
3. **`get_observations`** - Kunin ang full observation details sa pamamagitan ng IDs (laging i-batch ang maraming IDs)

**Halimbawa ng Paggamit:**

```typescript
// Step 1: Search for index
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Step 2: Review index, identify relevant IDs (e.g., #123, #456)

// Step 3: Fetch full details
get_observations((ids = [123, 456]));
```

Tingnan ang [Search Tools Guide](https://docs.claude-mem-file.ai/usage/search-tools) para sa detalyadong mga halimbawa.

---

## Mga Beta Feature

May **beta channel** ang Claude-Mem-File na may mga experimental feature gaya ng **Endless Mode** (biomimetic memory architecture para sa mga extended session). Magpalit sa pagitan ng stable at beta versions mula sa web viewer UI sa http://localhost:37777 → Settings.

Tingnan ang **[Beta Features Documentation](https://docs.claude-mem-file.ai/beta-features)** para sa detalye sa Endless Mode at kung paano ito subukan.

---

## Mga Pangangailangan ng Sistema

- **Node.js**: 18.0.0 o mas mataas
- **Claude Code**: Pinakabagong bersyon na may plugin support
- **Bun**: JavaScript runtime at process manager (auto-installed kung wala)

---

### Mga Tala sa Windows Setup

Kung makakita ka ng error gaya ng:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Siguraduhing naka-install ang Node.js at npm at naidagdag sa iyong PATH. I-download ang pinakabagong Node.js installer mula sa https://nodejs.org at i-restart ang iyong terminal matapos mag-install.

---

## Konpigurasyon

Ang mga setting ay pinamamahalaan sa `~/.claude-mem-file/settings.json` (auto-created na may mga defaults sa unang run). I-configure ang AI model, worker port, data directory, log level, at context injection settings.

Tingnan ang **[Configuration Guide](https://docs.claude-mem-file.ai/configuration)** para sa lahat ng available na setting at mga halimbawa.

### Mode at Language Configuration

Sinusuportahan ng Claude-Mem-File ang maraming workflow modes at mga wika sa pamamagitan ng `CLAUDE_MEM_MODE` setting.

Ang opsyon na ito ay nag-control ng pareho:

- Ang workflow behavior (e.g. code, chill, investigation)
- Ang wika na ginagamit sa mga generated observations

#### Paano Mag-configure

I-edit ang iyong settings file sa `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Ang mga mode ay tinukoy sa `plugin/modes/`. Upang makita ang lahat ng available na modes locally:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Available na Modes

| Mode       | Paglalarawan             |
| ---------- | ----------------------- |
| `code`     | Default English mode    |
| `code--zh` | Simplified Chinese mode |
| `code--ja` | Japanese mode           |

Ang mga language-specific modes ay sumusunod sa pattern `code--[lang]` kung saan ang `[lang]` ay ang ISO 639-1 language code (e.g., `zh` para sa Chinese, `ja` para sa Japanese, `es` para sa Spanish).

> Tala: Ang `code--zh` (Simplified Chinese) ay already built-in — walang kailangang additional installation o plugin update.

#### Pagkatapos Baguhin ang Mode

I-restart ang Claude Code upang ilapat ang bagong mode configuration.

## Pagbuo

Tingnan ang **[Development Guide](https://docs.claude-mem-file.ai/development)** para sa build instructions, testing, at contribution workflow.

---

## Pag-troubleshoot

Kung may karanasan ka ng mga isyu, ilarawan ang problema sa Claude at ang troubleshoot skill ay awtomatikong magdi-diagnose at magbibigay ng mga ayus.

Tingnan ang **[Troubleshooting Guide](https://docs.claude-mem-file.ai/troubleshooting)** para sa karaniwang mga isyu at solusyon.

---

## Bug Reports

Gumawa ng komprehensibong bug reports gamit ang automated generator:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Pag-aambag

Ang mga kontribusyon ay malugod na tinatanggap! Mangyaring:

1. I-fork ang repository
2. Lumikha ng feature branch
3. Gawin ang iyong mga pagbabago na may mga test
4. I-update ang dokumentasyon
5. Magpadala ng Pull Request

Tingnan ang [Development Guide](https://docs.claude-mem-file.ai/development) para sa contribution workflow.

---

## Lisensya

Ang proyektong ito ay licensed sa ilalim ng **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). All rights reserved.

Tingnan ang [LICENSE](LICENSE) file para sa buong detalye.

**Ano ang ibig sabihin nito:**

- Maaari mong gamitin, baguhin, at ipamahagi ang software na ito nang walang bayad
- Kung ito ay babaguhin mo at i-deploy sa isang network server, dapat mong gawing available ang iyong source code
- Dapat ding naka-license sa AGPL-3.0 ang mga derivative works
- WALANG WARRANTY para sa software na ito

**Tala tungkol sa Ragtime**: Ang `ragtime/` directory ay may hiwalay na lisensya sa ilalim ng **PolyForm Noncommercial License 1.0.0**. Tingnan ang [ragtime/LICENSE](ragtime/LICENSE) para sa detalye.

---

## Suporta

- **Dokumentasyon**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Official X Account**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Official Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Author**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Built with Claude Agent SDK** | **Powered by Claude Code** | **Made with TypeScript**

---

### Ano ang tungkol sa $CMEM?

Ang $CMEM ay isang solana token na ginawa ng isang third party nang walang prior consent ng Claude-Mem-File, ngunit opisyal na tinanggap ng creator ng Claude-Mem-File (Alex Newman, @thedotmack). Ang token ay gumaganap bilang isang community catalyst para sa paglaki at isang vehicle para sa pagdadala ng real-time agent data sa mga developer at knowledge workers na kailangan nito ang pinakamarami. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
