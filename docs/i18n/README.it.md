🌐 Questa è una traduzione automatica. Le correzioni della comunità sono benvenute!

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
> **Questo è un fork di [claude-mem](https://github.com/thedotmack/claude-mem)** di [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Questo fork sostituisce il backend di archiviazione SQLite/binario con un **approccio solo filesystem**: tutta la memoria è archiviata come file Markdown semplici sotto `<project-root>/docs/vault/`, completamente versionabile via git e condivisibile con ogni membro del tuo team. Nessun database locale, nessun blob binario — solo file che puoi leggere, modificare, fare commit e unire.

<h4 align="center">claude-mem-file — Sistema di compressione della memoria persistente creato per <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#avvio-rapido">Avvio Rapido</a> •
  <a href="#come-funziona">Come Funziona</a> •
  <a href="#strumenti-di-ricerca-mcp">Strumenti di Ricerca</a> •
  <a href="#documentazione">Documentazione</a> •
  <a href="#configurazione">Configurazione</a> •
  <a href="#risoluzione-dei-problemi">Risoluzione dei Problemi</a> •
  <a href="#licenza">Licenza</a>
</p>

<p align="center">
  Claude-Mem-File preserva il contesto in modo fluido tra le sessioni catturando le osservazioni sull'utilizzo degli strumenti, generando riepiloghi semantici e archiviando tutto come Markdown versionato all'interno di un vault per progetto compatibile con Obsidian in <code>&lt;project-root&gt;/docs/vault/</code> — nessun database SQLite, nessun blob binario, completamente unibile tramite git.
</p>

---

## Avvio Rapido

Installa con un singolo comando:

```bash
npx claude-mem-file install
```

Oppure installa per Gemini CLI (rileva automaticamente `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Oppure installa per OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Oppure installa dal marketplace dei plugin all'interno di Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Riavvia Claude Code o Gemini CLI. Il contesto delle sessioni precedenti apparirà automaticamente nelle nuove sessioni.

> **Nota:** Claude-Mem-File è pubblicato anche su npm, ma `npm install -g claude-mem-file` installa **solo l'SDK/libreria** — non registra gli hook del plugin né configura il servizio worker. Installa sempre tramite `npx claude-mem-file install` o i comandi `/plugin` sopra indicati.

### 🦞 OpenClaw Gateway

Installa claude-mem-file come plugin di memoria persistente sui gateway [OpenClaw](https://openclaw.ai) con un singolo comando:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Il programma di installazione gestisce dipendenze, configurazione del plugin, configurazione del provider AI, avvio del worker e feed di osservazioni in tempo reale verso Telegram, Discord, Slack e altro. Consulta la [Guida all'Integrazione OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) per i dettagli.

**Caratteristiche Principali:**

- 🧠 **Memoria Persistente** - Il contesto sopravvive tra le sessioni
- 📁 **Vault Markdown (compatibile con Obsidian)** - Osservazioni e sessioni archiviate come file `.md` in `<project-root>/docs/vault/`, versionabili e unibili tramite git — niente SQLite, nessuno stato binario sulle macchine di sviluppo
- 📊 **Divulgazione Progressiva** - Recupero della memoria a strati con visibilità del costo in token
- 🔍 **Ricerca Basata su Skill** - Interroga la cronologia del tuo progetto con la skill mem-search (basata su `minisearch` in-memory sul vault)
- 🖥️ **Interfaccia Web Viewer** - Stream della memoria in tempo reale su http://localhost:37777
- 💻 **Skill per Claude Desktop** - Cerca nella memoria dalle conversazioni di Claude Desktop
- 🔒 **Controllo della Privacy** - Usa i tag `<private>` per escludere contenuti sensibili dall'archiviazione
- ⚙️ **Configurazione del Contesto** - Controllo granulare su quale contesto viene iniettato
- 🤖 **Funzionamento Automatico** - Nessun intervento manuale richiesto
- 🔗 **Citazioni** - Fai riferimento a osservazioni passate con ID (accedi tramite http://localhost:37777/api/observation/{id} o visualizza tutto nel web viewer su http://localhost:37777)
- 🧪 **Canale Beta** - Prova funzionalità sperimentali come Endless Mode tramite il cambio di versione

## Migrazione da SQLite (legacy)

Le versioni precedenti archiviavano la memoria in `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Il nuovo layout vault sostituisce tutto ciò con Markdown semplice in `<project-root>/docs/vault/`. Le tue memorie precedenti non sono perse — esegui lo script di migrazione una volta:

```bash
# da qualsiasi progetto che usava precedentemente claude-mem-file:
npm run migrate-to-vault              # scrive docs/vault/ dal DB legacy
npm run migrate-to-vault:dry          # anteprima senza scrivere
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # percorsi espliciti
```

Lo script apre il database SQLite in sola lettura ed è idempotente (i duplicati vengono rilevati tramite hash del contenuto SHA-256, quindi rieseguire è sicuro). Fai il commit della cartella `docs/vault/` risultante nel tuo repository per condividere la memoria con il tuo team.

---

## Documentazione

📚 **[Visualizza Documentazione Completa](https://docs.claude-mem-file.ai/)** - Sfoglia sul sito ufficiale

### Per Iniziare

- **[Guida all'Installazione](https://docs.claude-mem-file.ai/installation)** - Avvio rapido e installazione avanzata
- **[Configurazione Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Guida dedicata per l'integrazione con Gemini CLI di Google
- **[Guida all'Uso](https://docs.claude-mem-file.ai/usage/getting-started)** - Come funziona automaticamente Claude-Mem-File
- **[Strumenti di Ricerca](https://docs.claude-mem-file.ai/usage/search-tools)** - Interroga la cronologia del progetto con linguaggio naturale
- **[Funzionalità Beta](https://docs.claude-mem-file.ai/beta-features)** - Prova funzionalità sperimentali come Endless Mode

### Best Practice

- **[Context Engineering](https://docs.claude-mem-file.ai/context-engineering)** - Principi di ottimizzazione del contesto per agenti AI
- **[Progressive Disclosure](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofia alla base della strategia di priming del contesto di Claude-Mem-File

### Architettura

- **[Panoramica](https://docs.claude-mem-file.ai/architecture/overview)** - Componenti del sistema e flusso dei dati
- **[Evoluzione dell'Architettura](https://docs.claude-mem-file.ai/architecture-evolution)** - Il percorso dalla v3 alla v5
- **[Architettura degli Hook](https://docs.claude-mem-file.ai/hooks-architecture)** - Come Claude-Mem-File utilizza gli hook del ciclo di vita
- **[Riferimento Hook](https://docs.claude-mem-file.ai/architecture/hooks)** - Spiegazione dei 7 script hook
- **[Servizio Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - API HTTP e gestione Bun
- **[Docs Vault](docs/)** - Vault Markdown in stile Obsidian per la conoscenza condivisa del progetto

### Configurazione e Sviluppo

- **[Configurazione](https://docs.claude-mem-file.ai/configuration)** - Variabili d'ambiente e impostazioni
- **[Sviluppo](https://docs.claude-mem-file.ai/development)** - Build, test e flusso di contribuzione
- **[Risoluzione dei Problemi](https://docs.claude-mem-file.ai/troubleshooting)** - Problemi comuni e soluzioni

---

## Come Funziona

**Componenti Principali:**

1. **5 Hook del Ciclo di Vita** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 script hook)
2. **Installazione Intelligente** - Controllo delle dipendenze in cache (script pre-hook, non un hook del ciclo di vita)
3. **Servizio Worker** - API HTTP sulla porta 37777 con interfaccia web viewer e 10 endpoint di ricerca, gestita da Bun
4. **Docs Vault** (`docs/`) - Vault Markdown in stile Obsidian incluso nel repository; fonte di verità condivisa per tutte le decisioni architetturali, il contesto e la conoscenza tra sessioni e collaboratori
5. **Skill mem-search** - Query in linguaggio naturale con divulgazione progressiva

Vedi [Panoramica dell'Architettura](https://docs.claude-mem-file.ai/architecture/overview) per i dettagli.

---

## Strumenti di Ricerca MCP

Claude-Mem-File offre una ricerca intelligente della memoria tramite **4 strumenti MCP** seguendo un **pattern di workflow a 3 livelli** efficiente in termini di token:

**Il Workflow a 3 Livelli:**

1. **`search`** - Ottieni un indice compatto con ID (~50-100 token/risultato)
2. **`timeline`** - Ottieni il contesto cronologico attorno ai risultati interessanti
3. **`get_observations`** - Recupera i dettagli completi SOLO per gli ID filtrati (~500-1.000 token/risultato)

**Come Funziona:**

- Claude usa gli strumenti MCP per cercare nella tua memoria
- Inizia con `search` per ottenere un indice dei risultati
- Usa `timeline` per vedere cosa stava succedendo attorno a osservazioni specifiche
- Usa `get_observations` per recuperare i dettagli completi degli ID rilevanti
- **~10x risparmio di token** filtrando prima di recuperare i dettagli

**Strumenti MCP Disponibili:**

1. **`search`** - Cerca nell'indice di memoria con query full-text, filtri per tipo/data/progetto
2. **`timeline`** - Ottieni il contesto cronologico attorno a un'osservazione o query specifica
3. **`get_observations`** - Recupera i dettagli completi delle osservazioni per ID (raggruppa sempre più ID)

**Esempio di Utilizzo:**

```typescript
// Passo 1: Cerca l'indice
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Passo 2: Esamina l'indice, identifica gli ID rilevanti (es. #123, #456)

// Passo 3: Recupera i dettagli completi
get_observations((ids = [123, 456]));
```

Vedi [Guida agli Strumenti di Ricerca](https://docs.claude-mem-file.ai/usage/search-tools) per esempi dettagliati.

---

## Funzionalità Beta

Claude-Mem-File offre un **canale beta** con funzionalità sperimentali come **Endless Mode** (architettura di memoria biomimetica per sessioni estese). Passa dalla versione stabile a quella beta dall'interfaccia web viewer su http://localhost:37777 → Settings.

Vedi **[Documentazione delle Funzionalità Beta](https://docs.claude-mem-file.ai/beta-features)** per dettagli su Endless Mode e come provarlo.

---

## Requisiti di Sistema

- **Node.js**: 18.0.0 o superiore
- **Claude Code**: Ultima versione con supporto plugin
- **Bun**: Runtime JavaScript e process manager (installato automaticamente se mancante)

---

### Note per la Configurazione su Windows

Se vedi un errore come:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Assicurati che Node.js e npm siano installati e aggiunti al tuo PATH. Scarica l'ultimo installer di Node.js da https://nodejs.org e riavvia il terminale dopo l'installazione.

---

## Configurazione

Le impostazioni sono gestite in `~/.claude-mem-file/settings.json` (creato automaticamente con valori predefiniti alla prima esecuzione). Configura il modello AI, la porta del worker, la directory dei dati, il livello di log e le impostazioni di iniezione del contesto.

Vedi la **[Guida alla Configurazione](https://docs.claude-mem-file.ai/configuration)** per tutte le impostazioni disponibili ed esempi.

### Configurazione Modalità e Lingua

Claude-Mem-File supporta più modalità di workflow e lingue tramite l'impostazione `CLAUDE_MEM_MODE`.

Questa opzione controlla sia:

- Il comportamento del workflow (es. code, chill, investigation)
- La lingua usata nelle osservazioni generate

#### Come Configurare

Modifica il file delle impostazioni in `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Le modalità sono definite in `plugin/modes/`. Per vedere tutte le modalità disponibili localmente:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Modalità Disponibili

| Modalità   | Descrizione                  |
| ---------- | ---------------------------- |
| `code`     | Modalità inglese predefinita |
| `code--zh` | Modalità cinese semplificato |
| `code--ja` | Modalità giapponese          |

Le modalità specifiche per lingua seguono il pattern `code--[lang]` dove `[lang]` è il codice lingua ISO 639-1 (es. `zh` per cinese, `ja` per giapponese, `es` per spagnolo).

> Nota: `code--zh` (cinese semplificato) è già integrato — non è richiesta alcuna installazione aggiuntiva o aggiornamento del plugin.

#### Dopo aver Cambiato Modalità

Riavvia Claude Code per applicare la nuova configurazione della modalità.

## Sviluppo

Vedi la **[Guida allo Sviluppo](https://docs.claude-mem-file.ai/development)** per le istruzioni di build, test e flusso di contribuzione.

---

## Risoluzione dei Problemi

Se riscontri problemi, descrivi il problema a Claude e la skill troubleshoot diagnosticherà automaticamente e fornirà correzioni.

Vedi la **[Guida alla Risoluzione dei Problemi](https://docs.claude-mem-file.ai/troubleshooting)** per problemi comuni e soluzioni.

---

## Segnalazione Bug

Crea report di bug completi con il generatore automatizzato:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Contribuire

I contributi sono benvenuti! Per favore:

1. Fai il fork del repository
2. Crea un branch per la funzionalità
3. Apporta le tue modifiche con i test
4. Aggiorna la documentazione
5. Invia una Pull Request

Vedi [Guida allo Sviluppo](https://docs.claude-mem-file.ai/development) per il flusso di contribuzione.

---

## Licenza

Questo progetto è rilasciato sotto la **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Tutti i diritti riservati.

Vedi il file [LICENSE](LICENSE) per i dettagli completi.

**Cosa Significa:**

- Puoi usare, modificare e distribuire questo software liberamente
- Se modifichi e distribuisci su un server di rete, devi rendere disponibile il tuo codice sorgente
- Le opere derivate devono anche essere rilasciate sotto AGPL-3.0
- NON c'è GARANZIA per questo software

**Nota su Ragtime**: La directory `ragtime/` è rilasciata separatamente sotto la **PolyForm Noncommercial License 1.0.0**. Vedi [ragtime/LICENSE](ragtime/LICENSE) per i dettagli.

---

## Supporto

- **Documentazione**: [docs/](../)
- **Problemi**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Account X Ufficiale**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord Ufficiale**: [Unisciti a Discord](https://discord.com/invite/J4wttp9vDu)
- **Autore**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Creato con Claude Agent SDK** | **Alimentato da Claude Code** | **Realizzato con TypeScript**

---

### E $CMEM?

$CMEM è un token Solana creato da una terza parte senza il previo consenso di Claude-Mem-File, ma ufficialmente abbracciato dal creatore di Claude-Mem-File (Alex Newman, @thedotmack). Il token funge da catalizzatore comunitario per la crescita e un veicolo per portare dati di agenti in tempo reale agli sviluppatori e ai lavoratori della conoscenza che ne hanno più bisogno. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
