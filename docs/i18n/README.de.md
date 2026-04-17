🌐 Dies ist eine maschinelle Übersetzung. Community-Korrektionen sind willkommen!

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
> **Dies ist ein Fork von [claude-mem](https://github.com/thedotmack/claude-mem)** von [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Dieser Fork ersetzt das SQLite/Binary-Speicher-Backend durch einen **dateisystemgestützten Ansatz**: Der gesamte Speicher wird als einfache Markdown-Dateien unter `<project-root>/docs/vault/` gespeichert, vollständig über git versionierbar und mit jedem Mitglied Ihres Teams teilbar. Keine lokalen Datenbanken, keine Binär-Blobs – nur Dateien, die Sie lesen, bearbeiten, committen und zusammenführen können.

<h4 align="center">claude-mem-file — Persistentes Speicherkompressionssystem für <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#schnellstart">Schnellstart</a> •
  <a href="#wie-es-funktioniert">Wie es funktioniert</a> •
  <a href="#mcp-suchwerkzeuge">Suchwerkzeuge</a> •
  <a href="#dokumentation">Dokumentation</a> •
  <a href="#konfiguration">Konfiguration</a> •
  <a href="#fehlerbehebung">Fehlerbehebung</a> •
  <a href="#lizenz">Lizenz</a>
</p>

<p align="center">
  Claude-Mem-File bewahrt Kontext nahtlos über Sitzungen hinweg, indem es Beobachtungen zu Toolnutzung erfasst, semantische Zusammenfassungen generiert und alles als versioniertes Markdown in einem per-Projekt-Obsidian-kompatiblen Vault unter <code>&lt;project-root&gt;/docs/vault/</code> speichert — keine SQLite-Datenbank, keine Binär-Blobs, vollständig über git zusammenführbar.
</p>

---

## Schnellstart

Installieren Sie mit einem einzigen Befehl:

```bash
npx claude-mem-file install
```

Oder installieren Sie für Gemini CLI (erkennt automatisch `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Oder installieren Sie für OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Oder installieren Sie aus dem Plugin-Marketplace in Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Starten Sie Claude Code oder Gemini CLI neu. Kontext aus vorherigen Sitzungen wird automatisch in neuen Sitzungen angezeigt.

> **Hinweis:** Claude-Mem-File wird auch auf npm veröffentlicht, aber `npm install -g claude-mem-file` installiert nur die **SDK/Bibliothek** – es registriert nicht die Plugin-Hooks oder richtet den Worker-Service ein. Installieren Sie immer über `npx claude-mem-file install` oder die `/plugin`-Befehle oben.

### 🦞 OpenClaw Gateway

Installieren Sie claude-mem-file als persistentes Speicher-Plugin auf [OpenClaw](https://openclaw.ai) Gateways mit einem einzigen Befehl:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Das Installationsskript verwaltet Abhängigkeiten, Plugin-Setup, KI-Provider-Konfiguration, Worker-Start und optionale Echtzeit-Beobachtungs-Feeds zu Telegram, Discord, Slack und mehr. Weitere Details finden Sie im [OpenClaw-Integrationsleitfaden](https://docs.claude-mem-file.ai/openclaw-integration).

**Hauptmerkmale:**

- 🧠 **Persistenter Speicher** - Kontext bleibt über Sitzungen hinweg erhalten
- 📁 **Markdown Vault (Obsidian-kompatibel)** - Beobachtungen und Sitzungen werden als `.md`-Dateien unter `<project-root>/docs/vault/` gespeichert, versionierbar und über git zusammenführbar — keine SQLite, kein Binär-Status auf Entwicklungsmaschinen
- 📊 **Progressive Offenlegung** - Schichtweise Speicherabruf mit Token-Kostensichtbarkeit
- 🔍 **Skill-basierte Suche** - Durchsuchen Sie Ihre Projekthistorie mit dem mem-search Skill (unterstützt durch In-Memory `minisearch` über den Vault)
- 🖥️ **Web-Viewer-UI** - Echtzeit-Speicher-Stream unter http://localhost:37777
- 💻 **Claude Desktop Skill** - Durchsuchen Sie den Speicher aus Claude Desktop-Konversationen
- 🔒 **Datenschutzkontrolle** - Verwenden Sie `<private>`-Tags, um sensible Inhalte von der Speicherung auszuschließen
- ⚙️ **Kontextkonfiguration** - Feinkörnige Kontrolle darüber, welcher Kontext eingefügt wird
- 🤖 **Automatischer Betrieb** - Keine manuelle Intervention erforderlich
- 🔗 **Zitate** - Referenzieren Sie frühere Beobachtungen mit IDs (Zugriff über http://localhost:37777/api/observation/{id} oder alle in der Web-Viewer unter http://localhost:37777 anzeigen)
- 🧪 **Beta-Kanal** - Probieren Sie experimentelle Funktionen wie Endless Mode über Versionswechsel

## Migration von SQLite (legacy)

Frühere Versionen speicherten Speicher in `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Das neue Vault-Layout ersetzt all dies durch einfaches Markdown in `<project-root>/docs/vault/`. Ihre vorherigen Erinnerungen gehen nicht verloren – führen Sie das Migrationsskript einmal aus:

```bash
# aus einem Projekt, das zuvor claude-mem-file verwendet:
npm run migrate-to-vault              # schreibt docs/vault/ aus der legacy DB
npm run migrate-to-vault:dry          # Vorschau ohne zu schreiben
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # explizite Pfade
```

Das Skript öffnet die SQLite-Datenbank schreibgeschützt und ist idempotent (Duplikate werden über SHA-256-Content-Hashes erkannt, daher ist erneutes Ausführen sicher). Committen Sie den resultierenden `docs/vault/`-Ordner in Ihr Repo, um den Speicher mit Ihrem Team zu teilen.

---

## Dokumentation

📚 **[Vollständige Dokumentation anzeigen](https://docs.claude-mem-file.ai/)** - Auf der offiziellen Website durchsuchen

### Erste Schritte

- **[Installationsanleitung](https://docs.claude-mem-file.ai/installation)** - Schnellstart & erweiterte Installation
- **[Gemini CLI Setup](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Dedizierter Leitfaden für die Integration der Google Gemini CLI
- **[Nutzungsanleitung](https://docs.claude-mem-file.ai/usage/getting-started)** - Wie Claude-Mem-File automatisch funktioniert
- **[Suchwerkzeuge](https://docs.claude-mem-file.ai/usage/search-tools)** - Durchsuchen Sie Ihre Projekthistorie mit natürlicher Sprache
- **[Beta-Funktionen](https://docs.claude-mem-file.ai/beta-features)** - Probieren Sie experimentelle Funktionen wie Endless Mode

### Best Practices

- **[Context Engineering](https://docs.claude-mem-file.ai/context-engineering)** - Prinzipien der KI-Agenten-Kontextoptimierung
- **[Progressive Disclosure](https://docs.claude-mem-file.ai/progressive-disclosure)** - Philosophie hinter Claude-Mem-Files Kontext-Priming-Strategie

### Architektur

- **[Übersicht](https://docs.claude-mem-file.ai/architecture/overview)** - Systemkomponenten & Datenfluss
- **[Architekturentwicklung](https://docs.claude-mem-file.ai/architecture-evolution)** - Die Reise von v3 zu v5
- **[Hooks-Architektur](https://docs.claude-mem-file.ai/hooks-architecture)** - Wie Claude-Mem-File Lifecycle-Hooks verwendet
- **[Hooks-Referenz](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 Hook-Skripte erklärt
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API & Bun-Verwaltung
- **[Docs Vault](docs/)** - Obsidian-ähnlicher Markdown-Vault für gemeinsames Projektwissen

### Konfiguration & Entwicklung

- **[Konfiguration](https://docs.claude-mem-file.ai/configuration)** - Umgebungsvariablen & Einstellungen
- **[Entwicklung](https://docs.claude-mem-file.ai/development)** - Erstellen, Testen, Beitragen
- **[Fehlerbehebung](https://docs.claude-mem-file.ai/troubleshooting)** - Häufige Probleme & Lösungen

---

## Wie es funktioniert

**Kernkomponenten:**

1. **5 Lifecycle-Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 Hook-Skripte)
2. **Smart Install** - Gecachter Abhängigkeitsprüfer (Pre-Hook-Skript, kein Lifecycle-Hook)
3. **Worker Service** - HTTP API auf Port 37777 mit Web-Viewer-UI und 10 Such-Endpunkten, verwaltet von Bun
4. **Docs Vault** (`docs/`) - Obsidian-ähnlicher Markdown-Vault, der in das Repository committed wird; die gemeinsame Quelle der Wahrheit für alle architektonischen Entscheidungen, Kontexte und Wissen über Sitzungen und Mitarbeiter
5. **mem-search Skill** - Natürlichsprachliche Abfragen mit progressiver Offenlegung

Weitere Details finden Sie unter [Architecture Overview](https://docs.claude-mem-file.ai/architecture/overview).

---

## MCP-Suchwerkzeuge

Claude-Mem-File bietet intelligente Speichersuche durch **4 MCP-Tools**, die einem tokeneffizienten **3-Schichten-Workflow-Muster** folgen:

**Der 3-Schichten-Workflow:**

1. **`search`** - Erhalten Sie einen kompakten Index mit IDs (~50-100 Token/Ergebnis)
2. **`timeline`** - Erhalten Sie chronologischen Kontext um interessante Ergebnisse
3. **`get_observations`** - Vollständige Details NUR für gefilterte IDs abrufen (~500-1.000 Token/Ergebnis)

**Wie es funktioniert:**

- Claude nutzt MCP-Tools, um Ihren Speicher zu durchsuchen
- Beginnen Sie mit `search`, um einen Index von Ergebnissen zu erhalten
- Verwenden Sie `timeline`, um zu sehen, was um spezifische Beobachtungen herum passierte
- Verwenden Sie `get_observations`, um vollständige Details für relevante IDs abzurufen
- **~10x Token-Ersparnis** durch Filterung vor dem Abrufen von Details

**Verfügbare MCP-Tools:**

1. **`search`** - Speicherindex mit Volltextabfragen durchsuchen, nach Typ/Datum/Projekt filtern
2. **`timeline`** - Chronologischen Kontext um eine spezifische Beobachtung oder Abfrage erhalten
3. **`get_observations`** - Vollständige Beobachtungsdetails nach IDs abrufen (immer mehrere IDs stapeln)

**Beispielverwendung:**

```typescript
// Schritt 1: Index durchsuchen
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Schritt 2: Index überprüfen, relevante IDs identifizieren (z.B. #123, #456)

// Schritt 3: Vollständige Details abrufen
get_observations((ids = [123, 456]));
```

Weitere Beispiele finden Sie im [Suchwerkzeuge-Leitfaden](https://docs.claude-mem-file.ai/usage/search-tools).

---

## Beta-Funktionen

Claude-Mem-File bietet einen **Beta-Kanal** mit experimentellen Funktionen wie **Endless Mode** (biomimetische Speicherarchitektur für erweiterte Sitzungen). Wechseln Sie zwischen stabilen und Beta-Versionen über die Web-Viewer-UI unter http://localhost:37777 → Settings.

Weitere Details zu Endless Mode und wie Sie es ausprobieren können, finden Sie in der **[Beta-Funktionen-Dokumentation](https://docs.claude-mem-file.ai/beta-features)**.

---

## Systemanforderungen

- **Node.js**: 18.0.0 oder höher
- **Claude Code**: Neueste Version mit Plugin-Unterstützung
- **Bun**: JavaScript-Laufzeitumgebung und Prozessmanager (wird automatisch installiert, falls fehlend)

---

### Windows-Setup-Hinweise

Wenn Sie einen Fehler wie diesen sehen:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Stellen Sie sicher, dass Node.js und npm installiert sind und zu Ihrem PATH hinzugefügt wurden. Laden Sie das neueste Node.js-Installationsprogramm von https://nodejs.org herunter und starten Sie Ihr Terminal nach der Installation neu.

---

## Konfiguration

Einstellungen werden in `~/.claude-mem-file/settings.json` verwaltet (wird beim ersten Start automatisch mit Standardwerten erstellt). Konfigurieren Sie KI-Modell, Worker-Port, Datenverzeichnis, Log-Level und Kontext-Injektionseinstellungen.

Weitere Informationen zu allen verfügbaren Einstellungen und Beispielen finden Sie im **[Konfigurationsleitfaden](https://docs.claude-mem-file.ai/configuration)**.

### Modus & Sprachkonfiguration

Claude-Mem-File unterstützt mehrere Workflow-Modi und Sprachen über die Einstellung `CLAUDE_MEM_MODE`.

Diese Option steuert beide:

- Das Workflow-Verhalten (z.B. code, chill, investigation)
- Die in generierten Beobachtungen verwendete Sprache

#### Wie man konfiguriert

Bearbeiten Sie Ihre Einstellungsdatei unter `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Modi werden in `plugin/modes/` definiert. Um alle verfügbaren Modi lokal zu sehen:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Verfügbare Modi

| Modus      | Beschreibung              |
| ---------- | ------------------------- |
| `code`     | Standard-English-Modus    |
| `code--zh` | Vereinfachter Chinesischer Modus |
| `code--ja` | Japanischer Modus         |

Sprachspezifische Modi folgen dem Muster `code--[lang]`, wobei `[lang]` der ISO 639-1-Sprachcode ist (z.B. `zh` für Chinesisch, `ja` für Japanisch, `es` für Spanisch).

> Hinweis: `code--zh` (Vereinfachtes Chinesisch) ist bereits integriert – keine zusätzliche Installation oder Plugin-Aktualisierung erforderlich.

#### Nach Modus-Änderung

## Starten Sie Claude Code neu, um die neue Moduskonfiguration anzuwenden.

## Entwicklung

Weitere Informationen zu Build-Anweisungen, Tests und Beitrags-Workflow finden Sie im **[Entwicklungsleitfaden](https://docs.claude-mem-file.ai/development)**.

---

## Fehlerbehebung

Wenn Sie Probleme haben, beschreiben Sie das Problem gegenüber Claude und die troubleshoot Skill wird automatisch diagnostizieren und Lösungen bereitstellen.

Weitere Informationen zu häufigen Problemen und Lösungen finden Sie im **[Fehlerbehebungsleitfaden](https://docs.claude-mem-file.ai/troubleshooting)**.

---

## Fehlerberichte

Erstellen Sie umfassende Fehlerberichte mit dem automatisierten Generator:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Beiträge

Beiträge sind willkommen! Bitte:

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch
3. Nehmen Sie Ihre Änderungen mit Tests vor
4. Aktualisieren Sie die Dokumentation
5. Reichen Sie einen Pull Request ein

Weitere Informationen zum Beitrags-Workflow finden Sie im [Entwicklungsleitfaden](https://docs.claude-mem-file.ai/development).

---

## Lizenz

Dieses Projekt ist unter der **GNU Affero General Public License v3.0** (AGPL-3.0) lizenziert.

Copyright (C) 2025 Alex Newman (@thedotmack). Alle Rechte vorbehalten.

Weitere Details finden Sie in der [LICENSE](LICENSE)-Datei.

**Was das bedeutet:**

- Sie können diese Software frei verwenden, modifizieren und verteilen
- Wenn Sie sie modifizieren und auf einem Netzwerkserver bereitstellen, müssen Sie Ihren Quellcode verfügbar machen
- Abgeleitete Werke müssen ebenfalls unter AGPL-3.0 lizenziert werden
- Es gibt KEINE GEWÄHRLEISTUNG für diese Software

**Hinweis zu Ragtime**: Das `ragtime/`-Verzeichnis ist separat unter der **PolyForm Noncommercial License 1.0.0** lizenziert. Weitere Details finden Sie unter [ragtime/LICENSE](ragtime/LICENSE).

---

## Unterstützung

- **Dokumentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Offizielles X-Konto**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Offizieller Discord**: [Discord beitreten](https://discord.com/invite/J4wttp9vDu)
- **Autor**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Erstellt mit Claude Agent SDK** | **Powered by Claude Code** | **Made with TypeScript**

---

### Was ist mit $CMEM?

$CMEM ist ein Solana-Token, der von einem Dritten ohne vorherige Zustimmung von Claude-Mem-File erstellt wurde, aber offiziell vom Schöpfer von Claude-Mem-File (Alex Newman, @thedotmack) akzeptiert wurde. Der Token fungiert als Community-Katalysator für Wachstum und als Fahrzeug, um Echtzeit-Agent-Daten zu den Entwicklern und Knowledge Workern zu bringen, die sie am meisten brauchen. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
