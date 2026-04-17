🌐 Detta är en maskinöversättning. Gemenskapskorrigeringar välkomnas!

---

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
> **Det här är en fork av [claude-mem](https://github.com/thedotmack/claude-mem)** av [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Denna fork ersätter SQLite/binär lagringsservlet med ett **filsystemiserat tillvägagångssätt**: allt minne lagras som enkla Markdown-filer under `<project-root>/docs/vault/`, fullständigt versionsbart via git och delbart med varje medlem av ditt team. Ingen lokala databaser, ingen binär blobb — bara filer som du kan läsa, redigera, bekräfta och slå samman.

<h4 align="center">claude-mem-file — Persistent minneskomprimeringssystem byggt för <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#snabbstart">Snabbstart</a> •
  <a href="#hur-det-fungerar">Hur det fungerar</a> •
  <a href="#mcp-sökverktyg">Sökverktyg</a> •
  <a href="#dokumentation">Dokumentation</a> •
  <a href="#konfiguration">Konfiguration</a> •
  <a href="#felsökning">Felsökning</a> •
  <a href="#licens">Licens</a>
</p>

<p align="center">
  Claude-Mem-File bevarar sömlöst kontext mellan sessioner genom att fånga observationer av verktygsanvändning, generera semantiska sammanfattningar och lagra allt som versionerad Markdown inuti en per-projekt Obsidian-kompatibel vault på <code>&lt;project-root&gt;/docs/vault/</code> — ingen SQLite-databas, ingen binär blob, helt sammanslutningsbar via git.
</p>

---

## Snabbstart

Installera med ett enda kommando:

```bash
npx claude-mem-file install
```

Eller installera för Gemini CLI (auto-detekterar `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Eller installera för OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Eller installera från plugin-marknadsplatsen inuti Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Starta om Claude Code eller Gemini CLI. Kontext från tidigare sessioner kommer automatiskt att visas i nya sessioner.

> **Notering:** Claude-Mem-File publiceras också på npm, men `npm install -g claude-mem-file` installerar bara **SDK/biblioteket** — det registrerar inte plugin-kroken eller konfigurerar arbetarservern. Installera alltid via `npx claude-mem-file install` eller `/plugin`-kommandona ovan.

### 🦞 OpenClaw Gateway

Installera claude-mem-file som en persistent minnesinsticksprogram på [OpenClaw](https://openclaw.ai)-gateways med ett enda kommando:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Installationsprogrammet hanterar beroenden, instickskonfiguration, AI-leverantörkonfiguration, arbetarstart och valfria feedbackflöden för realtidsobservation till Telegram, Discord, Slack och mer. Se [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) för detaljer.

**Huvudfunktioner:**

- 🧠 **Persistent minne** - Kontext överlever mellan sessioner
- 📁 **Markdown Vault (Obsidian-kompatibel)** - Observationer och sessioner lagras som `.md`-filer under `<project-root>/docs/vault/`, versionsbar och sammanslutningsbar via git — ingen SQLite, ingen binär tillstånd på dev-datorer
- 📊 **Progressiv utmaning** - Skiktad minnesökning med synlighet för tokenkostnad
- 🔍 **Färdighetsbaserad sökning** - Sök i din projekthistorik med mem-search-färdigheten (drivs av in-memory `minisearch` över vaulten)
- 🖥️ **Web Viewer UI** - Realtidsminnesström på http://localhost:37777
- 💻 **Claude Desktop Skill** - Sök i minnet från Claude Desktop-samtal
- 🔒 **Integritetsövervakning** - Använd `<private>`-taggar för att utesluta känsligt innehål från lagring
- ⚙️ **Kontextkonfiguration** - Detaljerad kontroll över vilken kontext som injiceras
- 🤖 **Automatisk drift** - Ingen manuell inblandning krävs
- 🔗 **Citeringar** - Referera till tidigare observationer med ID:n (åtkomst via http://localhost:37777/api/observation/{id} eller visa alla i webbvyn på http://localhost:37777)
- 🧪 **Betakanal** - Testa experimentella funktioner som Endless Mode via versionsväxling

## Migration från SQLite (äldre)

Tidigare utgåvor lagrade minne i `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Den nya vault-layouten ersätter allt med ren Markdown i `<project-root>/docs/vault/`. Dina tidigare minnen går inte förlorade — kör migrationsskriptet en gång:

```bash
# från inom något projekt som tidigare använde claude-mem-file:
npm run migrate-to-vault              # skriver docs/vault/ från den äldre DB:n
npm run migrate-to-vault:dry          # förhandsvisning utan att skriva
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # explicit sökvägar
```

Skriptet öppnar SQLite-databasen skrivskyddad och är idempotent (dubbletter detekteras via SHA-256-innehållshashningar, så omkörning är säker). Bekräfta mappen `docs/vault/` till ditt repo för att dela minne med ditt team.

---

## Dokumentation

📚 **[Visa fullständig dokumentation](https://docs.claude-mem-file.ai/)** - Bläddra på officiell webbplats

### Komma igång

- **[Installationsguide](https://docs.claude-mem-file.ai/installation)** - Snabbstart och avancerad installation
- **[Gemini CLI Setup](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Dedikerad guide för Google:s Gemini CLI-integration
- **[Användarguide](https://docs.claude-mem-file.ai/usage/getting-started)** - Hur Claude-Mem-File fungerar automatiskt
- **[Sökverktyg](https://docs.claude-mem-file.ai/usage/search-tools)** - Sök i din projekthistorik med naturligt språk
- **[Betafunktioner](https://docs.claude-mem-file.ai/beta-features)** - Testa experimentella funktioner som Endless Mode

### Bästa praxis

- **[Context Engineering](https://docs.claude-mem-file.ai/context-engineering)** - Optimeringsmetoder för AI-agentkontext
- **[Progressiv utmaning](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofin bakom Claude-Mem-Files kontextpriming-strategi

### Arkitektur

- **[Översikt](https://docs.claude-mem-file.ai/architecture/overview)** - Systemkomponenter och dataflöde
- **[Arkitekturutveckling](https://docs.claude-mem-file.ai/architecture-evolution)** - Resan från v3 till v5
- **[Hooks-arkitektur](https://docs.claude-mem-file.ai/hooks-architecture)** - Hur Claude-Mem-File använder livscykelkrokar
- **[Hooks-referens](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook-skript förklarade
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API och Bun-hantering
- **[Docs Vault](docs/)** - Obsidian-style Markdown-vault för delad projektkunskap

### Konfiguration och utveckling

- **[Konfiguration](https://docs.claude-mem-file.ai/configuration)** - Miljövariabler och inställningar
- **[Utveckling](https://docs.claude-mem-file.ai/development)** - Bygga, testa, bidra
- **[Felsökning](https://docs.claude-mem-file.ai/troubleshooting)** - Vanliga problem och lösningar

---

## Hur det fungerar

**Kärnkomponenter:**

1. **5 livscykelkrokar** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook-skript)
2. **Smart installation** - Cachad beroendekontrolla (pre-hook-skript, inte en livscykelkrok)
3. **Worker Service** - HTTP API på port 37777 med webbvy-gränssnitt och 10 sökändpunkter, hanterat av Bun
4. **Docs Vault** (`docs/`) - Obsidian-style Markdown-vault som bekräftas till arkivet; den delade kunskapskällan för alla arkitektoniska beslut, kontext och kunskap mellan sessioner och medarbetare
5. **mem-search Skill** - Naturligspråkfrågor med progressiv utmaning

Se [Architecture Overview](https://docs.claude-mem-file.ai/architecture/overview) för detaljer.

---

## MCP-sökverktyg

Claude-Mem-File tillhandahåller intelligent minnesökning genom **4 MCP-verktyg** som följer ett tokenefficerat **3-skiktat arbetsflödesmönster**:

**3-skiktat arbetsflöde:**

1. **`search`** - Få kompakt index med ID:n (~50-100 tokens/resultat)
2. **`timeline`** - Få kronologisk kontext kring intressanta resultat
3. **`get_observations`** - Hämta fullständiga detaljer ENDAST för filtrerade ID:n (~500-1,000 tokens/resultat)

**Hur det fungerar:**

- Claude använder MCP-verktyg för att söka i ditt minne
- Börja med `search` för att få ett index över resultat
- Använd `timeline` för att se vad som hände omkring specifika observationer
- Använd `get_observations` för att hämta fullständiga detaljer för relevanta ID:n
- **~10x tokenbesparing** genom att filtrera före hämtning av detaljer

**Tillgängliga MCP-verktyg:**

1. **`search`** - Sök minnesindex med fulltextsökningar, filtrera efter typ/datum/projekt
2. **`timeline`** - Få kronologisk kontext omkring en specifik observation eller fråga
3. **`get_observations`** - Hämta fullständiga observationsdetaljer efter ID:n (slå alltid ihop flera ID:n)

**Exempel på användning:**

```typescript
// Steg 1: Sök efter index
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Steg 2: Granska index, identifiera relevanta ID:n (t.ex. #123, #456)

// Steg 3: Hämta fullständiga detaljer
get_observations((ids = [123, 456]));
```

Se [Search Tools Guide](https://docs.claude-mem-file.ai/usage/search-tools) för detaljerade exempel.

---

## Betafunktioner

Claude-Mem-File erbjuder en **betakanal** med experimentella funktioner som **Endless Mode** (biomimetisk minnesarkitektur för utökade sessioner). Växla mellan stabil- och betaversioner från webbvy-gränssnittet på http://localhost:37777 → Settings.

Se **[Betafunktionsdokumentation](https://docs.claude-mem-file.ai/beta-features)** för detaljer om Endless Mode och hur du testar det.

---

## Systemkrav

- **Node.js**: 18.0.0 eller högre
- **Claude Code**: Senaste versionen med plugin-stöd
- **Bun**: JavaScript-runtime och processhanterare (installeras automatiskt om det saknas)

---

### Anteckningar för Windows-inställning

Om du ser ett fel som:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Se till att Node.js och npm är installerade och lägga till i din PATH. Hämta det senaste Node.js-installationsprogrammet från https://nodejs.org och starta om terminalen efter installation.

---

## Konfiguration

Inställningar hanteras i `~/.claude-mem-file/settings.json` (skapas automatiskt med standardvärden vid första körning). Konfigurera AI-modell, worker-port, datakatalog, loggnivå och kontextinjektionsinställningar.

Se **[Konfigurationsguide](https://docs.claude-mem-file.ai/configuration)** för alla tillgängliga inställningar och exempel.

### Läges- och språkkonfiguration

Claude-Mem-File stöder flera arbetsflödeslägen och språk via inställningen `CLAUDE_MEM_MODE`.

Det här alternativet styr båda:

- Arbetsflödets beteende (t.ex. kod, lugn, undersökning)
- Språket som används i genererade observationer

#### Hur man konfigurerar

Redigera inställningsfilen på `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Lägen definieras i `plugin/modes/`. För att se alla tillgängliga lägen lokalt:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Tillgängliga lägen

| Läge       | Beskrivning             |
| ---------- | ----------------------- |
| `code`     | Standard engelskläge     |
| `code--zh` | Förenklat kinesiskt läge |
| `code--ja` | Japanskt läge           |

Språkspecifika lägen följer mönstret `code--[lang]` där `[lang]` är ISO 639-1-språkkoden (t.ex. `zh` för kinesiska, `ja` för japanska, `es` för spanska).

> Notering: `code--zh` (Förenklad kinesiska) är redan inbyggd — ingen ytterligare installation eller plugin-uppdatering krävs.

#### Efter att ha bytt läge

## Starta om Claude Code för att tillämpa den nya modskonfigurationen.

## Utveckling

Se **[Utvecklingsguide](https://docs.claude-mem-file.ai/development)** för bygginstruktioner, testning och bidragsarbetsflöde.

---

## Felsökning

Om du upplever problem, beskriv problemet för Claude och felsökningsfärdigheten diagnostiserar och tillhandahåller automatiskt lösningar.

Se **[Felsökningsguide](https://docs.claude-mem-file.ai/troubleshooting)** för vanliga problem och lösningar.

---

## Felrapporter

Skapa omfattande felrapporter med den automatiserade generatorn:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Bidrag

Bidrag är välkomna! Vänligen:

1. Forka arkivet
2. Skapa en feature-gren
3. Gör dina ändringar med test
4. Uppdatera dokumentationen
5. Skicka in en Pull Request

Se [Utvecklingsguide](https://docs.claude-mem-file.ai/development) för bidragsarbetsflöde.

---

## Licens

Detta projekt är licensierat under **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Alla rättigheter förbehållna.

Se [LICENSE](LICENSE)-filen för fullständiga detaljer.

**Vad detta betyder:**

- Du kan använda, modifiera och distribuera denna programvara fritt
- Om du modifierar och distribuerar på en nätverksserver måste du göra din källkod tillgänglig
- Härledda verk måste också licensieras under AGPL-3.0
- Det finns INGEN GARANTI för denna programvara

**Anmärkning om Ragtime**: Katalogen `ragtime/` är licensierad separat under **PolyForm Noncommercial License 1.0.0**. Se [ragtime/LICENSE](ragtime/LICENSE) för detaljer.

---

## Support

- **Dokumentation**: [docs/](docs/)
- **Problem**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Arkiv**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Officiell X-konto**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Officiell Discord**: [Gå med Discord](https://discord.com/invite/J4wttp9vDu)
- **Författare**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Byggd med Claude Agent SDK** | **Driven av Claude Code** | **Gjord med TypeScript**

---

### Vad gäller $CMEM?

$CMEM är en Solana-token som skapades av en tredje part utan Claude-Mem-Files tidigare samtycke, men officiellt omfamnad av skaparen av Claude-Mem-File (Alex Newman, @thedotmack). Tokenen fungerar som en gemenskapskatalysator för tillväxt och ett fordon för att föra realtidsagentdata till utvecklare och kunskapsarbetare som behöver det mest. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
