🌐 Aceasta este o traducere automată. Corecțiile comunității sunt binevenite!

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
> **Aceasta este un fork al [claude-mem](https://github.com/thedotmack/claude-mem)** de către [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Acest fork înlocuiește backend-ul de stocare SQLite/binar cu o **abordare doar pe sistem de fișiere**: toată memoria este stocată ca fișiere Markdown simple sub `<project-root>/docs/vault/`, complet versionate prin git și partajate cu fiecare membru al echipei. Fără baze de date locale, fără blob-uri binare — doar fișiere pe care le puteți citi, edita, confirma și fuziona.

<h4 align="center">claude-mem-file — Sistem persistent de compresie a memoriei construit pentru <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#start-rapid">Start Rapid</a> •
  <a href="#cum-funcționează">Cum Funcționează</a> •
  <a href="#instrumente-de-căutare-mcp">Instrumente de Căutare MCP</a> •
  <a href="#documentație">Documentație</a> •
  <a href="#configurare">Configurare</a> •
  <a href="#depanare">Depanare</a> •
  <a href="#licență">Licență</a>
</p>

<p align="center">
  Claude-Mem-File păstrează fără probleme contextul între sesiuni prin capturarea observațiilor de utilizare a instrumentelor, generarea rezumatelor semantice și stocarea totul ca Markdown versionate într-un coffre Obsidian-compatibil per-proiect la <code>&lt;project-root&gt;/docs/vault/</code> — fără bază de date SQLite, fără blob-uri binare, complet fuzionabil prin git.
</p>

---

## Start Rapid

Instalați cu o singură comandă:

```bash
npx claude-mem-file install
```

Sau instalați pentru Gemini CLI (auto-detectează `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Sau instalați pentru OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Sau instalați din piața de plugin-uri din interiorul Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Reporniți Claude Code sau Gemini CLI. Contextul din sesiunile anterioare va apărea automat în sesiunile noi.

> **Notă:** Claude-Mem-File este, de asemenea, publicat pe npm, dar `npm install -g claude-mem-file` instalează **doar SDK-ul/biblioteca** — nu înregistrează hook-urile plugin-ului sau nu configurează serviciul worker. Instalați întotdeauna prin `npx claude-mem-file install` sau comenzile `/plugin` de mai sus.

### 🦞 OpenClaw Gateway

Instalați claude-mem-file ca plugin de memorie persistentă pe gateway-uri [OpenClaw](https://openclaw.ai) cu o singură comandă:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Instalatorul gestionează dependențele, configurarea plugin-ului, configurația furnizorului AI, pornirea worker-ului și feed-uri de observații în timp real opționale la Telegram, Discord, Slack și multe altele. Consultați [Ghidul de Integrare OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) pentru detalii.

**Caracteristici Principale:**

- 🧠 **Memorie Persistentă** - Contextul supraviețuiește între sesiuni
- 📁 **Coffre Markdown (Obsidian-compatibil)** - Observații și sesiuni stocate ca fișiere `.md` sub `<project-root>/docs/vault/`, versionate și fuzionabile prin git — fără SQLite, fără stare binară pe mașinile de dezvoltare
- 📊 **Dezvăluire Progresivă** - Recuperare stratificată a memoriei cu vizibilitate asupra costurilor în tokeni
- 🔍 **Căutare Bazată pe Abilități** - Interogați istoricul proiectului cu abilitatea mem-search (alimentată de `minisearch` în memorie peste coffre)
- 🖥️ **Interfață Web Viewer** - Flux de memorie în timp real la http://localhost:37777
- 💻 **Abilitate Claude Desktop** - Căutați memoria din conversațiile Claude Desktop
- 🔒 **Control al Confidențialității** - Utilizați etichete `<private>` pentru a exclude conținut sensibil de la stocare
- ⚙️ **Configurare Context** - Control fin asupra contextului care este injectat
- 🤖 **Operare Automată** - Nu necesită intervenție manuală
- 🔗 **Citări** - Referință la observații anterioare cu ID-uri (accesați prin http://localhost:37777/api/observation/{id} sau vizualizați toate în web viewer la http://localhost:37777)
- 🧪 **Canal Beta** - Încercați funcții experimentale precum Endless Mode prin comutarea versiunii

## Migrare din SQLite (legacy)

Versiunile anterioare au stocat memoria în `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Noul layout al cofrelui înlocuiește totul cu Markdown plain în `<project-root>/docs/vault/`. Memoriile tale anterioare nu sunt pierdute — rulează scriptul de migrare o singură dată:

```bash
# dintr-un proiect care a folosit anterior claude-mem-file:
npm run migrate-to-vault              # scrie docs/vault/ din baza de date legacy
npm run migrate-to-vault:dry          # previzualizare fără scriere
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # căi explicite
```

Scriptul deschide baza de date SQLite doar în citire și este idempotent (duplicatele sunt detectate prin hash-uri de conținut SHA-256, deci re-rularea este sigură). Confirmă folderul rezultat `docs/vault/` în repo-ul tău pentru a partaja memoria cu echipa ta.

---

## Documentație

📚 **[Vizualizați Documentația Completă](https://docs.claude-mem-file.ai/)** - Răsfoiți pe site-ul oficial

### Noțiuni de Bază

- **[Ghid de Instalare](https://docs.claude-mem-file.ai/installation)** - Start rapid și instalare avansată
- **[Configurare Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Ghid dedicat pentru integrarea Google Gemini CLI
- **[Ghid de Utilizare](https://docs.claude-mem-file.ai/usage/getting-started)** - Cum funcționează Claude-Mem-File automat
- **[Instrumente de Căutare](https://docs.claude-mem-file.ai/usage/search-tools)** - Interogați istoricul proiectului cu limbaj natural
- **[Funcții Beta](https://docs.claude-mem-file.ai/beta-features)** - Încercați funcții experimentale precum Endless Mode

### Practici Recomandate

- **[Inginerie Context](https://docs.claude-mem-file.ai/context-engineering)** - Principii de optimizare a contextului pentru agenți AI
- **[Dezvăluire Progresivă](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofia din spatele strategiei de pregătire a contextului Claude-Mem-File

### Arhitectură

- **[Prezentare Generală](https://docs.claude-mem-file.ai/architecture/overview)** - Componente de sistem și flux de date
- **[Evoluția Arhitecturii](https://docs.claude-mem-file.ai/architecture-evolution)** - Parcursul de la v3 la v5
- **[Arhitectura Hook-urilor](https://docs.claude-mem-file.ai/hooks-architecture)** - Cum folosește Claude-Mem-File hook-urile de ciclu de viață
- **[Referință Hook-uri](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 scripturi de hook explicate
- **[Serviciu Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API și gestionare Bun
- **[Baza de Date Docs](docs/)** - Coffre Markdown Obsidian-style pentru cunoștințele proiectului partajate

### Configurare și Dezvoltare

- **[Configurare](https://docs.claude-mem-file.ai/configuration)** - Variabile de mediu și setări
- **[Dezvoltare](https://docs.claude-mem-file.ai/development)** - Construire, testare, contribuție
- **[Depanare](https://docs.claude-mem-file.ai/troubleshooting)** - Probleme comune și soluții

---

## Cum Funcționează

**Componente Principale:**

1. **5 Hook-uri de Ciclu de Viață** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 scripturi de hook)
2. **Instalare Inteligentă** - Verificator de dependențe în cache (script pre-hook, nu un hook de ciclu de viață)
3. **Serviciu Worker** - HTTP API pe portul 37777 cu interfață web viewer și 10 endpoint-uri de căutare, gestionat de Bun
4. **Baza de Date Docs** (`docs/`) - Coffre Markdown Obsidian-style confirmat în repository; sursa de adevăr partajată pentru toate deciziile arhitecturale, contextul și cunoștințele între sesiuni și colaboratori
5. **Abilitatea mem-search** - Interogări în limbaj natural cu dezvăluire progresivă

Consultați [Prezentarea Generală a Arhitecturii](https://docs.claude-mem-file.ai/architecture/overview) pentru detalii.

---

## Instrumente de Căutare MCP

Claude-Mem-File oferă căutare inteligentă a memoriei prin **4 instrumente MCP** urmând un **model de flux de lucru cu 3 straturi** eficient în tokeni:

**Fluxul de Lucru cu 3 Straturi:**

1. **`search`** - Obțineți index compact cu ID-uri (~50-100 tokeni/rezultat)
2. **`timeline`** - Obțineți context cronologic în jurul rezultatelor interesante
3. **`get_observations`** - Preluați detalii complete DOAR pentru ID-uri filtrate (~500-1.000 tokeni/rezultat)

**Cum Funcționează:**

- Claude folosește instrumente MCP pentru a căuta memoria
- Începeți cu `search` pentru a obține un index de rezultate
- Folosiți `timeline` pentru a vedea ce se întâmpla în jurul observațiilor specifice
- Folosiți `get_observations` pentru a prelua detalii complete pentru ID-uri relevante
- **~10x economie de tokeni** prin filtrare înainte de preluarea detaliilor

**Instrumente MCP Disponibile:**

1. **`search`** - Căutare index memorie cu interogări full-text, filtrare după tip/dată/proiect
2. **`timeline`** - Obțineți context cronologic în jurul unei observații specifice sau interogări
3. **`get_observations`** - Preluați detalii observații complete după ID-uri (întotdeauna batch-ați ID-uri multiple)

**Exemplu de Utilizare:**

```typescript
// Pasul 1: Căutare index
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Pasul 2: Revedeți indexul, identificați ID-uri relevante (ex., #123, #456)

// Pasul 3: Preluați detalii complete
get_observations((ids = [123, 456]));
```

Consultați [Ghidul Instrumentelor de Căutare](https://docs.claude-mem-file.ai/usage/search-tools) pentru exemple detaliate.

---

## Funcții Beta

Claude-Mem-File oferă un **canal beta** cu funcții experimentale precum **Endless Mode** (arhitectură de memorie biomimetică pentru sesiuni extinse). Comutați între versiunile stabile și beta din interfața web viewer la http://localhost:37777 → Settings.

Consultați **[Documentația Funcțiilor Beta](https://docs.claude-mem-file.ai/beta-features)** pentru detalii despre Endless Mode și cum să îl încercați.

---

## Cerințe de Sistem

- **Node.js**: 18.0.0 sau superior
- **Claude Code**: Versiunea cea mai recentă cu suport pentru plugin-uri
- **Bun**: Runtime JavaScript și manager de procese (instalat automat dacă lipsește)

---

### Notele de Configurare pentru Windows

Dacă vedeți o eroare ca:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Asigurați-vă că Node.js și npm sunt instalate și adăugate la PATH. Descărcați cel mai recent installer Node.js de la https://nodejs.org și reporniți terminalul după instalare.

---

## Configurare

Setările sunt gestionate în `~/.claude-mem-file/settings.json` (create automat cu valori implicite la prima rulare). Configurați modelul AI, portul worker, directorul de date, nivelul de jurnal și setările de injectare a contextului.

Consultați **[Ghidul de Configurare](https://docs.claude-mem-file.ai/configuration)** pentru toate setările disponibile și exemple.

### Configurare Mod și Limbă

Claude-Mem-File acceptă moduri de flux de lucru multiple și limbi prin setarea `CLAUDE_MEM_MODE`.

Această opțiune controlează:

- Comportamentul fluxului de lucru (ex. code, chill, investigation)
- Limba folosită în observațiile generate

#### Cum se Configurează

Editați fișierul de setări la `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Modurile sunt definite în `plugin/modes/`. Pentru a vedea toate modurile disponibile local:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Moduri Disponibile

| Mod        | Descriere              |
| ---------- | ---------------------- |
| `code`     | Mod Englez Implicit    |
| `code--zh` | Mod Chinez Simplificat |
| `code--ja` | Mod Japonez            |

Modurile specifice limbii urmează modelul `code--[lang]` unde `[lang]` este codul limbii ISO 639-1 (ex. `zh` pentru Chinez, `ja` pentru Japonez, `es` pentru Spaniolă).

> Notă: `code--zh` (Chinez Simplificat) este deja construit — nu este necesară nicio instalare suplimentară sau actualizare de plugin.

#### După Schimbarea Modului

Reporniți Claude Code pentru a aplica noua configurație de mod.

## Dezvoltare

Consultați **[Ghidul de Dezvoltare](https://docs.claude-mem-file.ai/development)** pentru instrucțiuni de construire, testare și flux de contribuție.

---

## Depanare

Dacă întâmpinați probleme, descrieți problema lui Claude și abilitatea troubleshoot va diagnostica automat și va furniza reparații.

Consultați **[Ghidul de Depanare](https://docs.claude-mem-file.ai/troubleshooting)** pentru probleme comune și soluții.

---

## Rapoarte de Bug-uri

Creați rapoarte comprehensive de bug-uri cu generatorul automat:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Contribuție

Contribuțiile sunt binevenite! Vă rugăm:

1. Faceți fork la repository
2. Creați o ramură de funcție
3. Faceți modificările cu teste
4. Actualizați documentația
5. Trimiteți un Pull Request

Consultați [Ghidul de Dezvoltare](https://docs.claude-mem-file.ai/development) pentru fluxul de contribuție.

---

## Licență

Acest proiect este licențiat sub **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Toate drepturile rezervate.

Consultați fișierul [LICENSE](LICENSE) pentru detalii complete.

**Ce Înseamnă Asta:**

- Puteți folosi, modifica și distribui acest software liber
- Dacă modificați și implementați pe un server de rețea, trebuie să faceți disponibil codul sursă
- Lucrările derivate trebuie să fie licențiate și ele sub AGPL-3.0
- NU EXISTĂ NICIO GARANȚIE pentru acest software

**Notă despre Ragtime**: Directorul `ragtime/` este licențiat separat sub **PolyForm Noncommercial License 1.0.0**. Consultați [ragtime/LICENSE](ragtime/LICENSE) pentru detalii.

---

## Sprijin

- **Documentație**: [docs/](docs/)
- **Probleme**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Cont Oficial X**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord Oficial**: [Alăturați-vă Discord](https://discord.com/invite/J4wttp9vDu)
- **Autor**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Construit cu Claude Agent SDK** | **Alimentat de Claude Code** | **Realizat cu TypeScript**

---

### Ce Spuneți despre $CMEM?

$CMEM este un token Solana creat de un terț fără consimțământul anterior al Claude-Mem-File, dar oficial îmbrățișat de creatorul Claude-Mem-File (Alex Newman, @thedotmack). Tokenul acționează ca catalizator comunitar pentru creștere și vehicul pentru aducerea datelor agentului în timp real către dezvoltatorii și lucrătorii cunoașterii care au nevoie de ea cel mai mult. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
