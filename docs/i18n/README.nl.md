🌐 Dit is een automatische vertaling. Gemeenschapscorrecties zijn welkom!

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
> **Dit is een fork van [claude-mem](https://github.com/thedotmack/claude-mem)** door [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Deze fork vervangt de SQLite/binaire opslagbackend met een **alleen bestandssysteem benadering**: alle geheugen wordt opgeslagen als gewone Markdown-bestanden onder `<project-root>/docs/vault/`, volledig versioneerbaar via git en deelbaar met elk lid van je team. Geen lokale databases, geen binaire blobs — alleen bestanden die je kunt lezen, bewerken, committen en samenvoegen.

<h4 align="center">claude-mem-file — Persistent geheugencompressiesysteem gebouwd voor <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/reduardo7/claude-mem-file">
        <picture>
          <img src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/cm-preview.gif" alt="Claude-Mem-File Preview" width="500">
        </picture>
      </a>
    </td>
    <td align="center">
      <a href="https://www.star-history.com/#reduardo7/claude-mem-file&Date">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&theme=dark&legend=top-left" />
          <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left" />
          <img alt="Star History Chart" src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left" width="500" />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#snel-starten">Snel Starten</a> •
  <a href="#hoe-het-werkt">Hoe Het Werkt</a> •
  <a href="#mcp-zoektools">Zoektools</a> •
  <a href="#documentatie">Documentatie</a> •
  <a href="#configuratie">Configuratie</a> •
  <a href="#probleemoplossing">Probleemoplossing</a> •
  <a href="#licentie">Licentie</a>
</p>

<p align="center">
  Claude-Mem-File behoudt naadloos context tussen sessies door waarnemingen van toolgebruik vast te leggen, semantische samenvattingen te genereren en alles op te slaan als versioneerde Markdown in een per-project Obsidian-compatibele kluis op <code>&lt;project-root&gt;/docs/vault/</code> — geen SQLite-database, geen binaire blobs, volledig samenvoegebaarvia git.
</p>

---

## Snel Starten

Installeer met één commando:

```bash
npx claude-mem-file install
```

Of installeer voor Gemini CLI (detecteert automatisch `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Of installeer voor OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Of installeer vanuit de plugin marketplace in Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Start Claude Code of Gemini CLI opnieuw. Context van vorige sessies verschijnt automatisch in nieuwe sessies.

> **Opmerking:** Claude-Mem-File wordt ook gepubliceerd op npm, maar `npm install -g claude-mem-file` installeert alleen de **SDK/bibliotheek** — het registreert de plugin hooks of stelt de worker service niet in. Installeer altijd via `npx claude-mem-file install` of de `/plugin` commando's hierboven.

### 🦞 OpenClaw Gateway

Installeer claude-mem-file als een persistent geheugenplugin op [OpenClaw](https://openclaw.ai) gateways met één commando:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Het installatieprogramma verwerkt afhankelijkheden, plugin setup, AI-provider configuratie, worker startup en optionele real-time observatiefeeds naar Telegram, Discord, Slack en meer. Zie de [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) voor details.

**Sleutelfuncties:**

- 🧠 **Persistent Geheugen** - Context blijft behouden tussen sessies
- 📁 **Markdown Vault (Obsidian-compatibel)** - Waarnemingen en sessies opgeslagen als `.md` bestanden onder `<project-root>/docs/vault/`, versioneerbaar en samenvoegebaarvia git — geen SQLite, geen binaire status op dev machines
- 📊 **Progressive Disclosure** - Gelaagde geheugenophaling met zichtbaarheid van tokenkosten
- 🔍 **Vaardigheidgebaseerd Zoeken** - Bevraag je projectgeschiedenis met mem-search skill (aangedreven door in-memory `minisearch` over de kluis)
- 🖥️ **Web Viewer UI** - Real-time geheugenstroom op http://localhost:37777
- 💻 **Claude Desktop Skill** - Zoek geheugen uit Claude Desktop gesprekken
- 🔒 **Privacycontrole** - Gebruik `<private>` tags om gevoelige content uit te sluiten van opslag
- ⚙️ **Context Configuratie** - Fijnmazige controle over welke context wordt geïnjecteerd
- 🤖 **Automatische Werking** - Geen handmatige tussenkomst vereist
- 🔗 **Citaten** - Verwijs naar vorige waarnemingen met ID's (toegang via http://localhost:37777/api/observation/{id} of bekijk alles in de web viewer op http://localhost:37777)
- 🧪 **Bètakanaal** - Probeer experimentele functies zoals Endless Mode via versieschakeling

## Migratie van SQLite (legacy)

Eerdere releases sloegen geheugen op in `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). De nieuwe vault layout vervangt dit alles met gewone Markdown in `<project-root>/docs/vault/`. Je vorige herinneringen gaan niet verloren — voer het migratiescript eenmaal uit:

```bash
# vanuit elk project dat eerder claude-mem-file gebruikte:
npm run migrate-to-vault              # schrijft docs/vault/ uit de legacy DB
npm run migrate-to-vault:dry          # voorbeeld zonder te schrijven
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # expliciete paden
```

Het script opent de SQLite-database alleen-lezen en is idempotent (duplicaten worden gedetecteerd via SHA-256 content hashes, dus herhaald uitvoeren is veilig). Commit de resulterende `docs/vault/` map naar je repo om geheugen met je team te delen.

---

## Documentatie

📚 **[Bekijk Volledige Documentatie](https://docs.claude-mem-file.ai/)** - Blader op officiële website

### Aan de Slag

- **[Installatiegids](https://docs.claude-mem-file.ai/installation)** - Snel starten & geavanceerde installatie
- **[Gemini CLI Setup](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Speciale gids voor Google's Gemini CLI integratie
- **[Gebruikersgids](https://docs.claude-mem-file.ai/usage/getting-started)** - Hoe Claude-Mem-File automatisch werkt
- **[Zoektools](https://docs.claude-mem-file.ai/usage/search-tools)** - Bevraag je projectgeschiedenis met natuurlijke taal
- **[Bètafuncties](https://docs.claude-mem-file.ai/beta-features)** - Probeer experimentele functies zoals Endless Mode

### Beste Praktijken

- **[Context Engineering](https://docs.claude-mem-file.ai/context-engineering)** - AI agent context optimalisatieprincipes
- **[Progressive Disclosure](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofie achter Claude-Mem-File's context priming strategie

### Architectuur

- **[Overzicht](https://docs.claude-mem-file.ai/architecture/overview)** - Systeemcomponenten & gegevensstroom
- **[Architectuurevolutie](https://docs.claude-mem-file.ai/architecture-evolution)** - De reis van v3 naar v5
- **[Hooks Architectuur](https://docs.claude-mem-file.ai/hooks-architecture)** - Hoe Claude-Mem-File lifecycle hooks gebruikt
- **[Hooks Referentie](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook scripts uitgelegd
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API & Bun beheer
- **[Docs Vault](docs/)** - Obsidian-stijl Markdown kluis voor gedeelde projectkennis

### Configuratie & Ontwikkeling

- **[Configuratie](https://docs.claude-mem-file.ai/configuration)** - Omgevingsvariabelen & instellingen
- **[Ontwikkeling](https://docs.claude-mem-file.ai/development)** - Bouwen, testen, bijdragen
- **[Probleemoplossing](https://docs.claude-mem-file.ai/troubleshooting)** - Veelvoorkomende problemen & oplossingen

---

## Hoe Het Werkt

**Kerncomponenten:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook scripts)
2. **Slimme Installatie** - Gecachte afhankelijkheidscontrole (pre-hook script, geen lifecycle hook)
3. **Worker Service** - HTTP API op poort 37777 met web viewer UI en 10 zoekeindpunten, beheerd door Bun
4. **Docs Vault** (`docs/`) - Obsidian-stijl Markdown kluis gecommit naar de repository; de gedeelde bron van waarheid voor alle architectonische besluiten, context en kennis tussen sessies en medewerkers
5. **mem-search Skill** - Natuurlijke taal queries met progressive disclosure

Zie [Architectuuroverzicht](https://docs.claude-mem-file.ai/architecture/overview) voor details.

---

## MCP Zoektools

Claude-Mem-File biedt intelligent geheugenzoekenvia **4 MCP-tools** volgens een tokenefficiënt **3-lagen workflow patroon**:

**Het 3-lagen workflow:**

1. **`search`** - Krijg compacte index met ID's (~50-100 tokens/resultaat)
2. **`timeline`** - Krijg chronologische context rond interessante resultaten
3. **`get_observations`** - Haal volledige details ALLEEN op voor gefilterde ID's (~500-1.000 tokens/resultaat)

**Hoe Het Werkt:**

- Claude gebruikt MCP-tools om je geheugen te doorzoeken
- Begin met `search` om een index van resultaten te krijgen
- Gebruik `timeline` om te zien wat er gebeurde rond specifieke waarnemingen
- Gebruik `get_observations` om volledige details op te halen voor relevante ID's
- **~10x tokenbesparing** door te filteren voordat je details ophaalt

**Beschikbare MCP-tools:**

1. **`search`** - Zoek geheugenindex met volledige-tekst queries, filter op type/datum/project
2. **`timeline`** - Krijg chronologische context rond een specifieke waarneming of query
3. **`get_observations`** - Haal volledige waarnemingsdetails op met ID's (batch altijd meerdere ID's)

**Voorbeeldgebruik:**

```typescript
// Stap 1: Zoek naar index
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Stap 2: Bekijk index, identificeer relevante ID's (bijv. #123, #456)

// Stap 3: Haal volledige details op
get_observations((ids = [123, 456]));
```

Zie [Zoektools Gids](https://docs.claude-mem-file.ai/usage/search-tools) voor gedetailleerde voorbeelden.

---

## Bètafuncties

Claude-Mem-File biedt een **bètakanaal** met experimentele functies zoals **Endless Mode** (biomimetische geheugenarchitectuur voor uitgebreide sessies). Schakel tussen stabiele en bètaversies vanuit de web viewer UI op http://localhost:37777 → Settings.

Zie **[Bètafuncties Documentatie](https://docs.claude-mem-file.ai/beta-features)** voor details over Endless Mode en hoe je het kunt proberen.

---

## Systeemvereisten

- **Node.js**: 18.0.0 of hoger
- **Claude Code**: Nieuwste versie met plugin ondersteuning
- **Bun**: JavaScript runtime en procesbeheer (automatisch geïnstalleerd indien ontbreekt)

---

### Windows Setup Opmerkingen

Als je een fout ziet zoals:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Zorg ervoor dat Node.js en npm zijn geïnstalleerd en toegevoegd aan je PATH. Download het meeste recente Node.js installatieprogramma van https://nodejs.org en herstart je terminal na de installatie.

---

## Configuratie

Instellingen worden beheerd in `~/.claude-mem-file/settings.json` (automatisch aangemaakt met standaardinstellingen bij eerste run). Configureer AI model, worker poort, data directory, logniveau en context injectie-instellingen.

Zie de **[Configuratiegids](https://docs.claude-mem-file.ai/configuration)** voor alle beschikbare instellingen en voorbeelden.

### Modus & Taalconfiguratie

Claude-Mem-File ondersteunt meerdere workflowmodi en talen via de `CLAUDE_MEM_MODE` instelling.

Deze optie controleert beide:

- Het workflowgedrag (bijv. code, chill, onderzoek)
- De taal die in gegenereerde waarnemingen wordt gebruikt

#### Hoe te Configureren

Bewerk je instellingenbestand op `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Modi worden gedefinieerd in `plugin/modes/`. Om alle beschikbare modi lokaal te zien:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Beschikbare Modi

| Modus     | Beschrijving              |
| --------- | ------------------------- |
| `code`    | Standaard Engelse modus   |
| `code--zh` | Vereenvoudigd Chinees modus |
| `code--ja` | Japanse modus            |

Taalspecifieke modi volgen het patroon `code--[lang]` waarbij `[lang]` de ISO 639-1 taalcode is (bijv. `zh` voor Chinees, `ja` voor Japans, `es` voor Spaans).

> Opmerking: `code--zh` (Vereenvoudigd Chinees) is al ingebouwd — geen aanvullende installatie of plugin update vereist.

#### Na het Wijzigen van Modus

Start Claude Code opnieuw om de nieuwe modusconfiguratie toe te passen.

## Ontwikkeling

Zie de **[Ontwikkelingsgids](https://docs.claude-mem-file.ai/development)** voor bouwinstructies, testen en bijdrageworkflow.

---

## Probleemoplossing

Als je problemen ervaart, beschrijf het probleem aan Claude en de troubleshoot skill zal automatisch diagnosticeren en oplossingen bieden.

Zie de **[Probleemoplossingsgids](https://docs.claude-mem-file.ai/troubleshooting)** voor veelvoorkomende problemen en oplossingen.

---

## Bugrapporten

Maak uitgebreide bugrapporten met de geautomatiseerde generator:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Bijdragen

Bijdragen zijn welkom! Gelieve:

1. Fork de repository
2. Maak een feature branch
3. Maak je wijzigingen met tests
4. Update documentatie
5. Dien een Pull Request in

Zie [Ontwikkelingsgids](https://docs.claude-mem-file.ai/development) voor bijdrageworkflow.

---

## Licentie

Dit project is gelicentieerd onder de **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Alle rechten voorbehouden.

Zie het [LICENSE](LICENSE) bestand voor volledige details.

**Wat Dit Betekent:**

- Je kunt deze software vrijelijk gebruiken, aanpassen en distribueren
- Als je aanpast en implementeert op een netwerkserver, moet je je broncode beschikbaar maken
- Afgeleide werken moeten ook gelicentieerd zijn onder AGPL-3.0
- Er is GEEN GARANTIE voor deze software

**Opmerking over Ragtime**: De `ragtime/` directory is afzonderlijk gelicentieerd onder de **PolyForm Noncommercial License 1.0.0**. Zie [ragtime/LICENSE](ragtime/LICENSE) voor details.

---

## Ondersteuning

- **Documentatie**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Officiële X Account**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Officiële Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Auteur**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Gebouwd met Claude Agent SDK** | **Aangedreven door Claude Code** | **Gemaakt met TypeScript**

---

### Wat Over $CMEM?

$CMEM is een solana token aangemaakt door een derde partij zonder voorafgaande toestemming van Claude-Mem-File, maar officieel omarmd door de schepper van Claude-Mem-File (Alex Newman, @thedotmack). Het token fungeert als een community catalyst voor groei en een voertuig voor het brengen van real-time agent data naar de developers en kenniswerkers die het het meest nodig hebben. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
