🌐 Toto je strojový překlad. Komunitní opravy jsou vítány!

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
> **Toto je fork [claude-mem](https://github.com/thedotmack/claude-mem)** od [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Tento fork nahrazuje backend úložiště SQLite/binární **přístupem pouze k souborům**: všechna paměť je ukládána jako prostý Markdown pod `<project-root>/docs/vault/`, plně verzovatelná přes git a sdílitelná s každým členem vašeho týmu. Žádné lokální databáze, žádné binární objekty — jen soubory, které můžete číst, upravovat, commitovat a slučovat.

<h4 align="center">claude-mem-file — Systém trvalé komprese paměti vytvořený pro <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#rychlý-start">Rychlý start</a> •
  <a href="#jak-to-funguje">Jak to funguje</a> •
  <a href="#vyhledávací-nástroje-mcp">Vyhledávací nástroje</a> •
  <a href="#dokumentace">Dokumentace</a> •
  <a href="#konfigurace">Konfigurace</a> •
  <a href="#řešení-problémů">Řešení problémů</a> •
  <a href="#licence">Licence</a>
</p>

<p align="center">
  Claude-Mem-File bezproblémově zachovává kontext napříč sezeními zaznamenáváním pozorování použití nástrojů, generováním sémantických souhrnů a ukládáním všeho jako verzovaného Markdownu uvnitř trezoru Obsidian kompatibilního se sezenímy na bázi projektu v `<project-root>/docs/vault/` — žádná SQLite databáze, žádné binární objekty, plně slučitelné přes git.
</p>

---

## Rychlý start

Instalace jedním příkazem:

```bash
npx claude-mem-file install
```

Nebo instalace pro Gemini CLI (automaticky detekuje `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Nebo instalace pro OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Nebo instalace z tržiště pluginů v Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Restartujte Claude Code nebo Gemini CLI. Kontext z předchozích sezení se automaticky zobrazí v nových sezeních.

> **Poznámka:** Claude-Mem-File je také publikován na npm, ale `npm install -g claude-mem-file` instaluje **pouze SDK/knihovnu** — neregistruje zásuvné hooky ani nenastavuje worker service. Vždy instalujte pomocí `npx claude-mem-file install` nebo příkazů `/plugin` výše.

### 🦞 OpenClaw Gateway

Instalujte claude-mem-file jako plugin trvalé paměti na [OpenClaw](https://openclaw.ai) gateways jedním příkazem:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Instalátor zpracovává závislosti, nastavení pluginu, konfiguraci poskytovatele AI, spuštění workeru a volitelné informační kanály v reálném čase na Telegram, Discord, Slack a další. Podrobnosti najdete v [Průvodci integrací OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration).

**Klíčové vlastnosti:**

- 🧠 **Trvalá paměť** - Kontext přetrvává napříč sezeními
- 📁 **Markdown Vault (kompatibilní s Obsidian)** - Pozorování a sezení uložena jako `.md` soubory pod `<project-root>/docs/vault/`, verzovatelné a slučitelné přes git — bez SQLite, bez binárního stavu na vývojových počítačích
- 📊 **Postupné odhalování** - Vrstvené vyhledávání paměti s viditelností nákladů na tokeny
- 🔍 **Vyhledávání založené na dovednostech** - Dotazujte se na historii projektu s dovedností mem-search (poháněno in-memory `minisearch` nad trezorem)
- 🖥️ **Webové uživatelské rozhraní** - Proud paměti v reálném čase na http://localhost:37777
- 💻 **Dovednost Claude Desktop** - Vyhledávejte paměť z konverzací Claude Desktop
- 🔒 **Kontrola soukromí** - Používejte značky `<private>` k vyloučení citlivého obsahu z úložiště
- ⚙️ **Konfigurace kontextu** - Jemně odstupňovaná kontrola nad tím, jaký kontext se vkládá
- 🤖 **Automatický provoz** - Není vyžadován žádný manuální zásah
- 🔗 **Citace** - Odkazujte na minulá pozorování s ID (přístup přes http://localhost:37777/api/observation/{id} nebo zobrazit vše ve webovém prohlížeči na http://localhost:37777)
- 🧪 **Beta kanál** - Vyzkoušejte experimentální funkce jako Endless Mode přepnutím verze

## Migrace z SQLite (starší verze)

Starší verze ukládaly paměť v `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Nový layout trezoru nahrazuje vše prostým Markdownem v `<project-root>/docs/vault/`. Vaše starší paměti nejsou ztraceny — spusťte skript migrace jednou:

```bash
# z libovolného projektu, který dříve používal claude-mem-file:
npm run migrate-to-vault              # zapisuje docs/vault/ ze starší DB
npm run migrate-to-vault:dry          # náhled bez zápisu
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # explicitní cesty
```

Skript otevírá SQLite databázi pouze pro čtení a je idempotentní (duplikáty jsou detekována přes SHA-256 hash obsahu, takže opětovné spuštění je bezpečné). Commitujte výslednou složku `docs/vault/` do vašeho repozitáře, abyste mohli sdílet paměť se svým týmem.

---

## Dokumentace

📚 **[Zobrazit kompletní dokumentaci](https://docs.claude-mem-file.ai/)** - Procházet na oficiálních stránkách

### Začínáme

- **[Průvodce instalací](https://docs.claude-mem-file.ai/installation)** - Rychlý start a pokročilá instalace
- **[Nastavení Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Vyhrazený průvodce integrací Google Gemini CLI
- **[Průvodce použitím](https://docs.claude-mem-file.ai/usage/getting-started)** - Jak Claude-Mem-File funguje automaticky
- **[Vyhledávací nástroje](https://docs.claude-mem-file.ai/usage/search-tools)** - Dotazujte se na historii projektu v přirozeném jazyce
- **[Beta funkce](https://docs.claude-mem-file.ai/beta-features)** - Vyzkoušejte experimentální funkce jako Endless Mode

### Osvědčené postupy

- **[Inženýrství kontextu](https://docs.claude-mem-file.ai/context-engineering)** - Principy optimalizace kontextu AI agenta
- **[Postupné odhalování](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filozofie strategie přípravy kontextu Claude-Mem-File

### Architektura

- **[Přehled](https://docs.claude-mem-file.ai/architecture/overview)** - Systémové komponenty a tok dat
- **[Evoluce architektury](https://docs.claude-mem-file.ai/architecture-evolution)** - Cesta z v3 na v5
- **[Architektura háčků](https://docs.claude-mem-file.ai/hooks-architecture)** - Jak Claude-Mem-File používá lifecycle hooky
- **[Reference háčků](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 skriptů háčků vysvětleno
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API a správa Bun
- **[Trezor dokumentů](docs/)** - Markdown trezor ve stylu Obsidian pro sdílené znalosti projektu

### Konfigurace a vývoj

- **[Konfigurace](https://docs.claude-mem-file.ai/configuration)** - Proměnné prostředí a nastavení
- **[Vývoj](https://docs.claude-mem-file.ai/development)** - Stavba, testování, přispívání
- **[Řešení problémů](https://docs.claude-mem-file.ai/troubleshooting)** - Běžné problémy a řešení

---

## Jak to funguje

**Hlavní komponenty:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook skriptů)
2. **Chytrá instalace** - Kontrola cachovaných závislostí (pre-hook skript, ne lifecycle hook)
3. **Worker Service** - HTTP API na portu 37777 s webovým prohlížečem UI a 10 vyhledávacími endpointy, spravováno Bun
4. **Trezor dokumentů** (`docs/`) - Markdown trezor ve stylu Obsidian commitnutý do repozitáře; sdílený zdroj pravdy pro všechna architekturní rozhodnutí, kontext a znalosti napříč sezeními a spolupracovníky
5. **Dovednost mem-search** - Dotazy v přirozeném jazyce s postupným odhalováním

Podrobnosti najdete v [Přehledu architektury](https://docs.claude-mem-file.ai/architecture/overview).

---

## Vyhledávací nástroje MCP

Claude-Mem-File poskytuje inteligentní vyhledávání paměti přes **4 MCP nástroje** podle token-efektivního **3-vrstvého pracovního postupu**:

**3-vrstvý pracovní postup:**

1. **`search`** - Získejte kompaktní index s ID (~50-100 tokenů/výsledek)
2. **`timeline`** - Získejte chronologický kontext kolem zajímavých výsledků
3. **`get_observations`** - Načtěte úplné detaily POUZE pro filtrované ID (~500-1,000 tokenů/výsledek)

**Jak to funguje:**

- Claude používá MCP nástroje k vyhledávání vaší paměti
- Začněte s `search` k získání indexu výsledků
- Použijte `timeline` k zobrazení, co se dělo kolem konkrétních pozorování
- Použijte `get_observations` k načtení úplných detailů pro relevantní ID
- **~10x úspora tokenů** filtrováním před načtením detailů

**Dostupné MCP nástroje:**

1. **`search`** - Vyhledávejte index paměti s fulltextovými dotazy, filtrováním podle typu/data/projektu
2. **`timeline`** - Získejte chronologický kontext kolem konkrétního pozorování nebo dotazu
3. **`get_observations`** - Načtěte úplné detaily pozorování podle ID (vždy dávkově více ID)

**Příklad použití:**

```typescript
// Krok 1: Vyhledávejte index
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Krok 2: Zkontrolujte index, identifikujte relevantní ID (např. #123, #456)

// Krok 3: Načtěte úplné detaily
get_observations((ids = [123, 456]));
```

Podrobné příklady najdete v [Průvodci vyhledávacími nástroji](https://docs.claude-mem-file.ai/usage/search-tools).

---

## Beta funkce

Claude-Mem-File nabízí **beta kanál** s experimentálními funkcemi jako **Endless Mode** (biomimetická architektura paměti pro prodloužená sezení). Přepínejte mezi stabilní a beta verzí z webového rozhraní na http://localhost:37777 → Settings.

Podrobnosti o Endless Mode a jak jej vyzkoušet najdete v **[Dokumentaci beta funkcí](https://docs.claude-mem-file.ai/beta-features)**.

---

## Systémové požadavky

- **Node.js**: 18.0.0 nebo vyšší
- **Claude Code**: Nejnovější verze s podporou pluginů
- **Bun**: JavaScript runtime a správce procesů (automaticky nainstalován, pokud chybí)

---

### Poznámky k nastavení Windows

Pokud se zobrazí chyba typu:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Ujistěte se, že je nainstalován Node.js a npm a jsou přidány do PATH. Stáhněte si nejnovější instalátor Node.js z https://nodejs.org a po instalaci restartujte svůj terminál.

---

## Konfigurace

Nastavení jsou spravována v `~/.claude-mem-file/settings.json` (automaticky vytvořeno s výchozími hodnotami při prvním spuštění). Konfigurujte AI model, port workeru, datový adresář, úroveň logování a nastavení vkládání kontextu.

Všechna dostupná nastavení a příklady najdete v **[Průvodci konfigurací](https://docs.claude-mem-file.ai/configuration)**.

### Konfigurace režimu a jazyka

Claude-Mem-File podporuje více pracovních režimů a jazyků přes nastavení `CLAUDE_MEM_MODE`.

Tato volba řídí obojí:

- Chování pracovního postupu (např. code, chill, investigation)
- Jazyk používaný v generovaných pozorováních

#### Jak nakonfigurovat

Upravte svůj soubor nastavení v `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--cs"
}
```

Režimy jsou definovány v `plugin/modes/`. Chcete-li vidět všechny dostupné režimy místně:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Dostupné režimy

| Režim      | Popis                      |
| ---------- | -------------------------- |
| `code`     | Výchozí angličtina režim   |
| `code--zh` | Režim zjednodušené čštiny  |
| `code--ja` | Japonský režim             |

Jazykově specifické režimy následují vzor `code--[lang]` kde `[lang]` je kód jazyka ISO 639-1 (např. `cs` pro češtinu, `ja` pro japonštinu, `es` pro španělštinu).

> Poznámka: `code--cs` (Čeština) může být také vestavěn — není nutná další instalace nebo aktualizace pluginu.

#### Po změně režimu

Restartujte Claude Code, aby se nová konfigurace režimu uplatnila.

---

## Vývoj

Podrobnosti o stavbě, testování a pracovnímu postupu pro přispívání najdete v **[Průvodci vývojem](https://docs.claude-mem-file.ai/development)**.

---

## Řešení problémů

Pokud se vyskytnou problémy, popište problém Claude a dovednost troubleshoot automaticky diagnostikuje a poskytne opravy.

Běžné problémy a řešení najdete v **[Průvodci řešením problémů](https://docs.claude-mem-file.ai/troubleshooting)**.

---

## Hlášení chyb

Vytvořte komplexní hlášení chyby pomocí automatického generátoru:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Přispívání

Příspěvky jsou vítány! Prosím:

1. Forkněte repositář
2. Vytvořte feature branch
3. Proveďte změny s testy
4. Aktualizujte dokumentaci
5. Odešlete Pull Request

Pracovní postup pro přispívání najdete v [Průvodci vývojem](https://docs.claude-mem-file.ai/development).

---

## Licence

Tento projekt je licencován pod **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Všechna práva vyhrazena.

Úplné podrobnosti najdete v souboru [LICENSE](LICENSE).

**Co to znamená:**

- Software můžete volně používat, upravovat a distribuovat
- Pokud jej upravíte a nasadíte na síťovém serveru, musíte zpřístupnit svůj zdrojový kód
- Odvozená díla musí být také licencována pod AGPL-3.0
- Pro tento software neexistuje ŽÁDNÁ ZÁRUKA

**Poznámka k Ragtime**: Adresář `ragtime/` je licencován samostatně pod **PolyForm Noncommercial License 1.0.0**. Podrobnosti najdete v [ragtime/LICENSE](ragtime/LICENSE).

---

## Podpora

- **Dokumentace**: [docs/](docs/)
- **Problémy**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repositář**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Oficiální účet X**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Oficiální Discord**: [Připojit se k Discord](https://discord.com/invite/J4wttp9vDu)
- **Autor**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Vytvořeno s Claude Agent SDK** | **Poháněno Claude Code** | **Vyrobeno s TypeScript**

---

### Co je $CMEM?

$CMEM je solana token vytvořený třetí stranou bez předchozího souhlasu Claude-Mem-File, ale oficiálně přijat tvůrcem Claude-Mem-File (Alex Newman, @thedotmack). Token funguje jako katalyzátor komunity pro růst a vozidlo pro přinesení dat agenta v reálném čase vývojářům a znalostním pracovníkům, kteří je potřebují nejvíce. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
