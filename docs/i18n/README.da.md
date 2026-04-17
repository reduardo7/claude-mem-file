🌐 Dette er en automatisk oversættelse. Fællesskabskorrektioner er velkomne!

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
> **Dette er en fork af [claude-mem](https://github.com/thedotmack/claude-mem)** af [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Denne fork erstatter SQLite/binær lagringsbaggrund med en **filsystem-kun tilgang**: al hukommelse gemmes som almindelige Markdown-filer under `<project-root>/docs/vault/`, fuldt versionerbar via git og deles med alle medlemmer af dit hold. Ingen lokale databaser, ingen binære blobs — kun filer, du kan læse, redigere, committe og merge.

<h4 align="center">claude-mem-file — Vedvarende hukommelseskomprimeringsystem bygget til <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/reduardo7/claude-mem-file">
        <picture>
          <img
            src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/cm-preview.gif"
            alt="Claude-Mem-File Forhåndsvisning"
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
            alt="Star History Diagram"
            src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left"
            width="500"
          />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#hurtig-start">Hurtig Start</a> •
  <a href="#sådan-virker-det">Sådan Virker Det</a> •
  <a href="#mcp-søgeværktøjer">Søgeværktøjer</a> •
  <a href="#dokumentation">Dokumentation</a> •
  <a href="#konfiguration">Konfiguration</a> •
  <a href="#fejlfinding">Fejlfinding</a> •
  <a href="#licens">Licens</a>
</p>

<p align="center">
  Claude-Mem-File bevarer problemfrit kontekst på tværs af sessioner ved at fange værktøjsobservationer, generere semantiske sammenfatninger og gemme alt som versioneret Markdown inden i en per-projekt Obsidian-kompatibel vault på <code>&lt;project-root&gt;/docs/vault/</code> — ingen SQLite-database, ingen binære blobs, fuldt merkbar via git.
</p>

---

## Hurtig Start

Installér med en enkelt kommando:

```bash
npx claude-mem-file install
```

Eller installer til Gemini CLI (registrerer automatisk `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Eller installer til OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Eller installer fra plugin-markedsplads inde i Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Genstart Claude Code eller Gemini CLI. Kontekst fra tidligere sessioner vil automatisk vises i nye sessioner.

> **Bemærk:** Claude-Mem-File udgives også på npm, men `npm install -g claude-mem-file` installerer kun **SDK/biblioteket** — det registrerer ikke plugin-hooks eller opsætter worker-servicen. Installér altid via `npx claude-mem-file install` eller `/plugin`-kommandoerne ovenfor.

### 🦞 OpenClaw Gateway

Installér claude-mem-file som persistent hukommelse plugin på [OpenClaw](https://openclaw.ai) gateways med en enkelt kommando:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Installationsprogrammet håndterer afhængigheder, plugin-opsætning, AI-udbyder konfiguration, worker-start og valgfri realtids observationsfeed til Telegram, Discord, Slack og meget mere. Se [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) for detaljer.

**Nøglefunktioner:**

- 🧠 **Vedvarende Hukommelse** - Kontekst overlever på tværs af sessioner
- 📁 **Markdown Vault (Obsidian-kompatibel)** - Observationer og sessioner gemmes som `.md`-filer under `<project-root>/docs/vault/`, versionerbar og merkbar via git — ingen SQLite, ingen binær tilstand på udviklersmaskiner
- 📊 **Progressiv Afsløring** - Lagdelt hukommelseshentning med token-omkostningssynlighed
- 🔍 **Færdighedsbaseret Søgning** - Spørg projekthistorikken med mem-search-færdighed (drevet af in-memory `minisearch` over vaulten)
- 🖥️ **Web Viewer UI** - Realtids hukommelsesstream på http://localhost:37777
- 💻 **Claude Desktop Færdighed** - Søg hukommelsen fra Claude Desktop-samtaler
- 🔒 **Privatkontrol** - Brug `<private>`-tags til at udelukke følsomt indhold fra lagring
- ⚙️ **Kontekstkonfiguration** - Finjusteret kontrol over, hvad kontekst bliver injiceret
- 🤖 **Automatisk Drift** - Ingen manuel indgriben påkrævet
- 🔗 **Citationer** - Referér til tidligere observationer med ID'er (få adgang via http://localhost:37777/api/observation/{id} eller se alle i web viewer på http://localhost:37777)
- 🧪 **Beta-kanal** - Prøv eksperimentelle funktioner som Endless Mode via versionsudskiftning

## Migration fra SQLite (legacy)

Tidligere versioner gemte hukommelse i `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Det nye vault-layout erstatter alt det med almindelig Markdown i `<project-root>/docs/vault/`. Din tidligere hukommelse går ikke tabt — kør migratisskriptet en gang:

```bash
# fra ethvert projekt, der tidligere brugte claude-mem-file:
npm run migrate-to-vault              # skriver docs/vault/ fra den gamle DB
npm run migrate-to-vault:dry          # forhåndsvis uden skrivning
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # eksplicitte stier
```

Skriptet åbner SQLite-databasen skrivebeskyttet og er idempotent (duplikater detekteres via SHA-256 indholdshashes, så gen-kørsel er sikker). Commit den resulterende `docs/vault/`-mappe til dit repo for at dele hukommelsen med dit hold.

---

## Dokumentation

📚 **[Se Fuld Dokumentation](https://docs.claude-mem-file.ai/)** - Gennemse på officiel hjemmeside

### Kom Godt I Gang

- **[Installationsguide](https://docs.claude-mem-file.ai/installation)** - Hurtig start & avanceret installation
- **[Gemini CLI-opsætning](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Dedikeret vejledning til Google's Gemini CLI-integration
- **[Brugervejledning](https://docs.claude-mem-file.ai/usage/getting-started)** - Sådan fungerer Claude-Mem-File automatisk
- **[Søgeværktøjer](https://docs.claude-mem-file.ai/usage/search-tools)** - Spørg projekthistorikken med naturligt sprog
- **[Beta-funktioner](https://docs.claude-mem-file.ai/beta-features)** - Prøv eksperimentelle funktioner som Endless Mode

### Bedste Praksis

- **[Kontekstudvikling](https://docs.claude-mem-file.ai/context-engineering)** - AI-agent kontekstoptimeringsprincipper
- **[Progressiv Afsløring](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofi bag Claude-Mem-Files kontekst-priming-strategi

### Arkitektur

- **[Oversigt](https://docs.claude-mem-file.ai/architecture/overview)** - Systemkomponenter & dataflow
- **[Arkitekturudvikling](https://docs.claude-mem-file.ai/architecture-evolution)** - Rejsen fra v3 til v5
- **[Hooks-arkitektur](https://docs.claude-mem-file.ai/hooks-architecture)** - Hvordan Claude-Mem-File bruger livscyklus-hooks
- **[Hooks-reference](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook-scripts forklaret
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API & Bun-administration
- **[Dokumenter Vault](docs/)** - Obsidian-stil Markdown vault til delt projektkundskab

### Konfiguration & Udvikling

- **[Konfiguration](https://docs.claude-mem-file.ai/configuration)** - Miljøvariabler & indstillinger
- **[Udvikling](https://docs.claude-mem-file.ai/development)** - Bygning, testning, bidrag
- **[Fejlfinding](https://docs.claude-mem-file.ai/troubleshooting)** - Almindelige problemer & løsninger

---

## Sådan Virker Det

**Kernekomponenter:**

1. **5 Livscyklus-hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook-scripts)
2. **Smart Installation** - Cached dependency checker (pre-hook script, ikke en livscyklus-hook)
3. **Worker Service** - HTTP API på port 37777 med web viewer UI og 10 søge-endpoints, administreret af Bun
4. **Dokumenter Vault** (`docs/`) - Obsidian-stil Markdown vault committed til repositoriet; den delte kildeofwahrhed for alle arkitekturelle beslutninger, kontekst og viden på tværs af sessioner og samarbejdspartnere
5. **mem-search Færdighed** - Naturlige sprogforespørgsler med progressiv afsløring

Se [Arkitekturoversigt](https://docs.claude-mem-file.ai/architecture/overview) for detaljer.

---

## MCP Søgeværktøjer

Claude-Mem-File leverer intelligent hukommelsessøgning gennem **4 MCP-værktøjer** efter et token-effektivt **3-lag arbejdsflowmønster**:

**3-Lag Arbejdsflowet:**

1. **`search`** - Få kompakt indeks med ID'er (~50-100 tokens/resultat)
2. **`timeline`** - Få kronologisk kontekst omkring interessante resultater
3. **`get_observations`** - Hent fulde detaljer KUN for filtrerede ID'er (~500-1.000 tokens/resultat)

**Sådan Virker Det:**

- Claude bruger MCP-værktøjer til at søge i hukommelsen
- Start med `search` for at få et indeks over resultater
- Brug `timeline` for at se, hvad der skete omkring specifikke observationer
- Brug `get_observations` for at hente fulde detaljer for relevante ID'er
- **~10x token besparelser** ved at filtrere før hentning af detaljer

**Tilgængelige MCP-værktøjer:**

1. **`search`** - Søg hukommelsesindeks med fuldtekstforespørgsler, filtrer efter type/dato/projekt
2. **`timeline`** - Få kronologisk kontekst omkring en specifik observation eller forespørgsel
3. **`get_observations`** - Hent fulde observationsdetaljer efter ID'er (batch altid flere ID'er)

**Eksempel Brug:**

```typescript
// Trin 1: Søg efter indeks
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Trin 2: Gennemse indeks, identificer relevante ID'er (f.eks. #123, #456)

// Trin 3: Hent fulde detaljer
get_observations((ids = [123, 456]));
```

Se [Søgeværktøjsguide](https://docs.claude-mem-file.ai/usage/search-tools) for detaljerede eksempler.

---

## Beta-funktioner

Claude-Mem-File tilbyder en **beta-kanal** med eksperimentelle funktioner som **Endless Mode** (biomimetisk hukommelsesarkitektur til udvidede sessioner). Skift mellem stabile og beta-versioner fra web viewer UI på http://localhost:37777 → Settings.

Se **[Beta-funktionsdokumentation](https://docs.claude-mem-file.ai/beta-features)** for detaljer om Endless Mode og hvordan du prøver det.

---

## Systemkrav

- **Node.js**: 18.0.0 eller højere
- **Claude Code**: Seneste version med plugin-support
- **Bun**: JavaScript runtime og procesmanager (auto-installeres hvis manglende)

---

### Windows Opsætning Bemærkninger

Hvis du ser en fejl som:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Sørg for, at Node.js og npm er installeret og føjet til PATH. Download den seneste Node.js installationsprogram fra https://nodejs.org og genstart din terminal efter installation.

---

## Konfiguration

Indstillinger administreres i `~/.claude-mem-file/settings.json` (auto-oprettet med standarder ved første kørsel). Konfigurer AI-model, worker-port, datakatalog, log-niveau og kontekstindsprøjtningsindstillinger.

Se **[Konfigurationsguide](https://docs.claude-mem-file.ai/configuration)** for alle tilgængelige indstillinger og eksempler.

### Tilstands- og Sprogkonfiguration

Claude-Mem-File understøtter flere arbejdsflowstilstande og sprog via `CLAUDE_MEM_MODE`-indstillingen.

Denne mulighed steuert både:

- Arbejdsflowadferden (f.eks. code, chill, investigation)
- Sproget brugt i genererede observationer

#### Sådan Konfigurerer Du

Rediger dine indstillingsfil på `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Tilstande er defineret i `plugin/modes/`. For at se alle tilgængelige tilstande lokalt:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Tilgængelige Tilstande

| Tilstand   | Beskrivelse           |
| ---------- | --------------------- |
| `code`     | Standard Engelsk tilstand |
| `code--zh` | Forenklet kinesisk tilstand |
| `code--ja` | Japansk tilstand      |

Sprogspecifikke tilstande følger mønsteret `code--[lang]`, hvor `[lang]` er ISO 639-1-sprokkoden (f.eks. `zh` for kinesisk, `ja` for japansk, `es` for spansk).

> Bemærk: `code--zh` (Forenklet kinesisk) er allerede indbygget — ingen yderligere installation eller plugin-opdatering er nødvendig.

#### Efter At Ændre Tilstand

## Genstart Claude Code for at anvende den nye tilstandskonfiguration.

## Udvikling

Se **[Udviklingsguide](https://docs.claude-mem-file.ai/development)** for bygningsinstruktioner, testning og bidragsworkflow.

---

## Fejlfinding

Hvis du oplever problemer, beskriv problemet for Claude, og fejlfindingsfærdigeden vil automatisk diagnosticere og give rettelser.

Se **[Fejlfindingsguide](https://docs.claude-mem-file.ai/troubleshooting)** for almindelige problemer og løsninger.

---

## Fejlrapporter

Opret omfattende fejlrapporter med den automatiserede generator:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Bidrag

Bidrag er velkomne! Venligst:

1. Fork repositoriet
2. Opret en feature-branch
3. Lav dine ændringer med tests
4. Opdater dokumentation
5. Indsend en Pull Request

Se [Udviklingsguide](https://docs.claude-mem-file.ai/development) for bidragsworkflow.

---

## Licens

Dette projekt er licenseret under **GNU Affero General Public License v3.0** (AGPL-3.0).

Ophavsret (C) 2025 Alex Newman (@thedotmack). Alle rettigheder forbeholdes.

Se [LICENSE](LICENSE)-filen for fulde detaljer.

**Hvad Dette Betyder:**

- Du kan bruge, modificere og distribuere denne software frit
- Hvis du modificerer og implementerer på en netværksserver, skal du gøre din kildekode tilgængelig
- Afledte værker skal også licenseres under AGPL-3.0
- Der er INGEN GARANTI for denne software

**Bemærkning om Ragtime**: `ragtime/`-katalogen er licenseret separat under **PolyForm Noncommercial License 1.0.0**. Se [ragtime/LICENSE](ragtime/LICENSE) for detaljer.

---

## Support

- **Dokumentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Officiel X Konto**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Officiel Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Forfatter**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Bygget med Claude Agent SDK** | **Drevet af Claude Code** | **Lavet med TypeScript**

---

### Hvad Med $CMEM?

$CMEM er en Solana-token oprettet af en tredjepart uden Claude-Mem-Files forudgående samtykke, men officielt godkendt af skaberen af Claude-Mem-File (Alex Newman, @thedotmack). Tokenet fungerer som katalysator for vækst og et middel til at bringe realtids-agent-data til udvikler og vidensarbejdere, der har mest brug for det. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
