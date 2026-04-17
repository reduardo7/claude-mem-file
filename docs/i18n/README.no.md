🌐 Dette er en automatisk oversettelse. Bidrag fra fellesskapet er velkomne!

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
> **Dette er en fork av [claude-mem](https://github.com/thedotmack/claude-mem)** av [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Denne forken erstatter SQLite/binær lagringsbakstøtte med en **filsystem-kun tilnærming**: alt minne er lagret som vanlige Markdown-filer under `<project-root>/docs/vault/`, fullt versjonerbart via git og delebart med alle medlemmer av teamet ditt. Ingen lokale databaser, ingen binære blob-filer — bare filer du kan lese, redigere, committe og flette.

<h4 align="center">claude-mem-file — Vedvarende minnekomprimeringssystem bygget for <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
            alt="Stjernhistorikk-diagram"
            src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left"
            width="500"
          />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#hurtigstart">Hurtigstart</a> •
  <a href="#hvordan-det-fungerer">Hvordan Det Fungerer</a> •
  <a href="#mcp-søkeverktøy">Søkeverktøy</a> •
  <a href="#dokumentasjon">Dokumentasjon</a> •
  <a href="#konfigurasjon">Konfigurasjon</a> •
  <a href="#feilsøking">Feilsøking</a> •
  <a href="#lisens">Lisens</a>
</p>

<p align="center">
  Claude-Mem-File bevarer sømløst kontekst på tvers av økter ved automatisk å fange opp observasjoner av verktøybruk, generere semantiske sammendrag, og lagre alt som versjonert Markdown inne i et per-prosjekt Obsidian-kompatibelt vault på <code>&lt;project-root&gt;/docs/vault/</code> — ingen SQLite-database, ingen binære blob-filer, fullt flettbar via git.
</p>

---

## Hurtigstart

Installer med en enkelt kommando:

```bash
npx claude-mem-file install
```

Eller installer for Gemini CLI (auto-detekterer `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Eller installer for OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Eller installer fra plugin-markedplassen inne i Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Start Claude Code eller Gemini CLI på nytt. Kontekst fra tidligere økter vil automatisk vises i nye økter.

> **Merk:** Claude-Mem-File er også publisert på npm, men `npm install -g claude-mem-file` installerer kun **SDK/biblioteket** — det registrerer ikke plugin-hooks eller setter opp worker-tjenesten. Installer alltid via `npx claude-mem-file install` eller `/plugin`-kommandoene ovenfor.

### 🦞 OpenClaw Gateway

Installer claude-mem-file som vedvarende minneplugin på [OpenClaw](https://openclaw.ai) gateways med en enkelt kommando:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Installatøren håndterer avhengigheter, plugin-oppsett, AI-leverandørkonfigurasjon, worker-oppstart, og valgfri sanntids-observasjonsfeeds til Telegram, Discord, Slack og mer. Se [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) for detaljer.

**Nøkkelfunksjoner:**

- 🧠 **Vedvarende Minne** - Kontekst overlever på tvers av økter
- 📁 **Markdown Vault (Obsidian-kompatibel)** - Observasjoner og økter lagret som `.md`-filer under `<project-root>/docs/vault/`, versjonerbart og flettbart via git — ingen SQLite, ingen binær tilstand på utviklingsmaskiner
- 📊 **Progressiv Avsløring** - Lagdelt minnehenting med tokenkostnads-synlighet
- 🔍 **Ferdighetsbasert Søk** - Spør om prosjekthistorikken din med mem-search-ferdigheten (drevet av in-memory `minisearch` over vaulten)
- 🖥️ **Web Viewer UI** - Sanntids minnestrøm på http://localhost:37777
- 💻 **Claude Desktop-ferdighet** - Søk i minne fra Claude Desktop-samtaler
- 🔒 **Personvernkontroll** - Bruk `<private>`-tagger for å ekskludere sensitivt innhold fra lagring
- ⚙️ **Kontekstkonfigurasjon** - Finjustert kontroll over hvilken kontekst som injiseres
- 🤖 **Automatisk Drift** - Ingen manuell inngripen nødvendig
- 🔗 **Kildehenvisninger** - Referer til tidligere observasjoner med ID-er (tilgang via http://localhost:37777/api/observation/{id} eller se alle i nettviseren på http://localhost:37777)
- 🧪 **Beta-kanal** - Prøv eksperimentelle funksjoner som Endless Mode via versjonsbytte

## Migrer fra SQLite (eldre versjon)

Tidligere utgivelser lagret minne i `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Det nye vault-oppsettet erstatter alt av det med vanlig Markdown i `<project-root>/docs/vault/`. Dine tidligere minner er ikke tapt — kjør migrasjons-skriptet en gang:

```bash
# fra innenfor ethvert prosjekt som tidligere brukte claude-mem-file:
npm run migrate-to-vault              # skriver docs/vault/ fra den eldre databasen
npm run migrate-to-vault:dry          # forhåndsvisning uten å skrive
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # eksplisitte baner
```

Skriptet åpner SQLite-databasen skrivebeskyttet og er idempotent (duplikater detekteres via SHA-256 innholds-hashes, så å kjøre på nytt er trygt). Commit den resulterende `docs/vault/`-mappen til ditt repo for å dele minne med teamet ditt.

---

## Dokumentasjon

📚 **[Se Full Dokumentasjon](https://docs.claude-mem-file.ai/)** - Bla gjennom på offisielt nettsted

### Komme I Gang

- **[Installasjonsveiledning](https://docs.claude-mem-file.ai/installation)** - Hurtigstart og avansert installasjon
- **[Gemini CLI-oppsett](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Dedikert veiledning for Google Gemini CLI-integrasjon
- **[Brukerveiledning](https://docs.claude-mem-file.ai/usage/getting-started)** - Hvordan Claude-Mem-File fungerer automatisk
- **[Søkeverktøy](https://docs.claude-mem-file.ai/usage/search-tools)** - Spør om prosjekthistorikken din med naturlig språk
- **[Beta-funksjoner](https://docs.claude-mem-file.ai/beta-features)** - Prøv eksperimentelle funksjoner som Endless Mode

### Beste Praksis

- **[Kontekst Engineering](https://docs.claude-mem-file.ai/context-engineering)** - AI-agentkontekst-optimaliseringsprinsipper
- **[Progressiv Avsløring](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofien bak Claude-Mem-Files kontekst-priming-strategi

### Arkitektur

- **[Oversikt](https://docs.claude-mem-file.ai/architecture/overview)** - Systemkomponenter og dataflyt
- **[Arkitekturutvikling](https://docs.claude-mem-file.ai/architecture-evolution)** - Reisen fra v3 til v5
- **[Hooks-arkitektur](https://docs.claude-mem-file.ai/hooks-architecture)** - Hvordan Claude-Mem-File bruker livssyklus-hooks
- **[Hooks-referanse](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook-skript forklart
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API og Bun-administrasjon
- **[Docs Vault](docs/)** - Obsidian-stil Markdown vault for delt prosjektkunnskap

### Konfigurasjon og Utvikling

- **[Konfigurasjon](https://docs.claude-mem-file.ai/configuration)** - Miljøvariabler og innstillinger
- **[Utvikling](https://docs.claude-mem-file.ai/development)** - Bygging, testing, bidragsflyt
- **[Feilsøking](https://docs.claude-mem-file.ai/troubleshooting)** - Vanlige problemer og løsninger

---

## Hvordan Det Fungerer

**Kjernekomponenter:**

1. **5 Livssyklus-Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook-skript)
2. **Smart Installasjon** - Bufret avhengighetssjekker (pre-hook-skript, ikke en livssyklus-hook)
3. **Worker Service** - HTTP API på port 37777 med web viewer UI og 10 søkeendepunkter, administrert av Bun
4. **Docs Vault** (`docs/`) - Obsidian-stil Markdown vault committed til repositoriet; den delte sannhetskilden for alle arkitektur-beslutninger, kontekst og kunnskap på tvers av økter og samarbeidspartnere
5. **mem-search-ferdighet** - Naturligspråk-spørringer med progressiv avsløring

Se [Arkitekturoversikt](https://docs.claude-mem-file.ai/architecture/overview) for detaljer.

---

## MCP-søkeverktøy

Claude-Mem-File tilbyr intelligent minnesoek gjennom **4 MCP-verktøy** som følger et token-effektivt **3-lag arbeidsflyt-mønster**:

**3-Lag Arbeidsflyten:**

1. **`search`** - Få kompakt indeks med ID-er (~50-100 tokens/resultat)
2. **`timeline`** - Få kronologisk kontekst rundt interessante resultater
3. **`get_observations`** - Hent fullstendige detaljer BARE for filtrerte ID-er (~500-1,000 tokens/resultat)

**Hvordan Det Fungerer:**

- Claude bruker MCP-verktøy til å søke i minnet ditt
- Start med `search` for å få en indeks over resultater
- Bruk `timeline` til å se hva som skjedde rundt spesifikke observasjoner
- Bruk `get_observations` til å hente fullstendige detaljer for relevante ID-er
- **~10x tokenbesparing** ved å filtrere før du henter detaljer

**Tilgjengelige MCP-verktøy:**

1. **`search`** - Søk minneindeks med fulltekst-spørringer, filtrer etter type/dato/prosjekt
2. **`timeline`** - Få kronologisk kontekst rundt en spesifikk observasjon eller spørring
3. **`get_observations`** - Hent fullstendige observasjons-detaljer etter ID-er (batch alltid flere ID-er)

**Eksempel Bruk:**

```typescript
// Trinn 1: Søk etter indeks
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Trinn 2: Gjennomgå indeks, identifiser relevante ID-er (f.eks. #123, #456)

// Trinn 3: Hent fullstendige detaljer
get_observations((ids = [123, 456]));
```

Se [Søkeverktøy-veiledning](https://docs.claude-mem-file.ai/usage/search-tools) for detaljerte eksempler.

---

## Beta-funksjoner

Claude-Mem-File tilbyr en **beta-kanal** med eksperimentelle funksjoner som **Endless Mode** (biomimetisk minnearkitektur for utvidede økter). Bytt mellom stabile og beta-versjoner fra web viewer UI på http://localhost:37777 → Settings.

Se **[Beta-funksjoner Dokumentasjon](https://docs.claude-mem-file.ai/beta-features)** for detaljer om Endless Mode og hvordan du prøver det.

---

## Systemkrav

- **Node.js**: 18.0.0 eller høyere
- **Claude Code**: Nyeste versjon med plugin-støtte
- **Bun**: JavaScript-runtime og prosessadministrator (autoinstalleres hvis mangler)

---

### Windows-oppsettmerknader

Hvis du ser en feil som:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Pass på at Node.js og npm er installert og lagt til i PATH-en din. Last ned den nyeste Node.js-installatøren fra https://nodejs.org og start terminalen på nytt etter installasjonen.

---

## Konfigurasjon

Innstillinger administreres i `~/.claude-mem-file/settings.json` (opprettes automatisk med standardverdier ved første kjøring). Konfigurer AI-modell, worker-port, datakatalog, loggnivå og innstillinger for kontekst-injeksjon.

Se **[Konfigurasjonsveiledning](https://docs.claude-mem-file.ai/configuration)** for alle tilgjengelige innstillinger og eksempler.

### Modus og Språkkonfigurasjon

Claude-Mem-File støtter flere arbeidsflyt-modi og språk via `CLAUDE_MEM_MODE`-innstillingen.

Dette alternativet kontrollerer både:

- Arbeidsflyt-oppførselen (f.eks. code, chill, investigation)
- Språket som brukes i genererte observasjoner

#### Hvordan Du Konfigurerer

Rediger innstillingsfilen din på `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Modi er definert i `plugin/modes/`. For å se alle tilgjengelige modi lokalt:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Tilgjengelige Modi

| Modus      | Beskrivelse             |
| ---------- | ----------------------- |
| `code`     | Standard engelsk modus  |
| `code--zh` | Forenklet kinesisk modus |
| `code--ja` | Japansk modus           |

Språkspesifikke modi følger mønsteret `code--[lang]` hvor `[lang]` er ISO 639-1-språkkoden (f.eks. `zh` for kinesisk, `ja` for japansk, `es` for spansk).

> Merk: `code--zh` (forenklet kinesisk) er allerede innebygd — ingen ekstra installasjon eller plugin-oppdatering er nødvendig.

#### Etter Å Ha Endret Modus

Start Claude Code på nytt for å påføre den nye modus-konfigurasjonen.

## Utvikling

Se **[Utviklingsveiledning](https://docs.claude-mem-file.ai/development)** for byggeinstruksjoner, testing og bidragsflyt.

---

## Feilsøking

Hvis du opplever problemer, beskriv problemet til Claude og troubleshoot-ferdigheten vil automatisk diagnostisere og gi løsninger.

Se **[Feilsøkingsveiledning](https://docs.claude-mem-file.ai/troubleshooting)** for vanlige problemer og løsninger.

---

## Feilrapporter

Opprett omfattende feilrapporter med den automatiserte generatoren:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Bidra

Bidrag er velkomne! Vennligst:

1. Fork repositoryet
2. Opprett en feature-gren
3. Gjør endringene dine med tester
4. Oppdater dokumentasjonen
5. Send inn en Pull Request

Se [Utviklingsveiledning](https://docs.claude-mem-file.ai/development) for bidragsflyt.

---

## Lisens

Dette prosjektet er lisensiert under **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Alle rettigheter reservert.

Se [LICENSE](LICENSE)-filen for fullstendige detaljer.

**Hva Dette Betyr:**

- Du kan bruke, modifisere og distribuere denne programvaren fritt
- Hvis du modifiserer og distribuerer på en nettverkstjener, må du gjøre kildekoden din tilgjengelig
- Avledede verk må også være lisensiert under AGPL-3.0
- Det er INGEN GARANTI for denne programvaren

**Merknad om Ragtime**: Katalogen `ragtime/` er lisensiert separat under **PolyForm Noncommercial License 1.0.0**. Se [ragtime/LICENSE](ragtime/LICENSE) for detaljer.

---

## Støtte

- **Dokumentasjon**: [docs/](docs/)
- **Problemer**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Offisiell X-konto**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Offisiell Discord**: [Bli med Discord](https://discord.com/invite/J4wttp9vDu)
- **Forfatter**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Bygget med Claude Agent SDK** | **Drevet av Claude Code** | **Laget med TypeScript**

---

### Hva Med $CMEM?

$CMEM er en Solana-token opprettet av en tredjeparti uten Claude-Mem-Files forutgående samtykke, men offisielt omfavnet av skaperen av Claude-Mem-File (Alex Newman, @thedotmack). Tokenet fungerer som en fellesskap-katalysator for vekst og et kjøretøy for å bringe sanntids agent-data til utviklerne og kunnskapsarbeiderne som trenger det mest. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
