🌐 Ez gépi fordítás. A közösségi javítások üdvözöltek!

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
> **Ez az [claude-mem](https://github.com/thedotmack/claude-mem) fork-ja** készítette [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Ez a fork az SQLite/bináris tárolási hátteret egy **fájlrendszer-alapú megközelítéssel** helyettesíti: az összes memória egyszerű Markdown-fájlként kerül tárolásra a `<project-root>/docs/vault/` alatt, teljes mértékben verzióváltoztatható a git-en és megosztható a csapata minden tagjával. Nincs helyi adatbázis, nincs bináris blob – csak olyan fájlok, amelyeket el lehet olvasni, szerkeszteni, véglegesíteni és egyesíteni.

<h4 align="center">claude-mem-file — Tartós memóriákat tömörítő rendszer a <a href="https://claude.com/claude-code" target="_blank">Claude Code</a> számára.</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/reduardo7/claude-mem-file">
        <picture>
          <img
            src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/cm-preview.gif"
            alt="Claude-Mem-File Előnézet"
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
            alt="Csillag történeti diagram"
            src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left"
            width="500"
          />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#gyors-kezdés">Gyors kezdés</a> •
  <a href="#hogyan-működik">Hogyan működik</a> •
  <a href="#mcp-keresési-eszközök">Keresési eszközök</a> •
  <a href="#dokumentáció">Dokumentáció</a> •
  <a href="#konfiguráció">Konfiguráció</a> •
  <a href="#hibaelhárítás">Hibaelhárítás</a> •
  <a href="#licenc">Licenc</a>
</p>

<p align="center">
  A Claude-Mem-File zökkenőmentesen megőrzi a kontextust a munkamenetek között azáltal, hogy automatikusan rögzíti az eszközhasználati megfigyeléseket, szemantikus összefoglalókat generál, és az összes adatot verzióváltozott Markdown-ként tárolja egy projekt-specifikus Obsidian-kompatibilis tárolóban a <code>&lt;project-root&gt;/docs/vault/</code> alatt — nincs SQLite adatbázis, nincs bináris blob, teljes mértékben egyesíthető a git-en keresztül.
</p>

---

## Gyors kezdés

Telepítés egyetlen paranccsal:

```bash
npx claude-mem-file install
```

Vagy telepítés a Gemini CLI-hez (automatikus észlelés `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Vagy telepítés az OpenCode-hoz:

```bash
npx claude-mem-file install --ide opencode
```

Vagy telepítés a plugin piactérről a Claude Code-ban:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Indítsa újra a Claude Code-ot vagy a Gemini CLI-t. A korábbi munkamenetek kontextusa automatikusan megjelenik az új munkamenetekben.

> **Megjegyzés:** A Claude-Mem-File az npm-en is elérhető, de az `npm install -g claude-mem-file` telepítés **csak az SDK/könyvtárat** telepíti — ez nem regisztrál plugin hook-okat vagy nem állítja be a worker szolgáltatást. Mindig az `npx claude-mem-file install` vagy a fenti `/plugin` parancsok segítségével telepítsen.

### 🦞 OpenClaw Gateway

Telepítse a claude-mem-file-t tartós memória plugin-ként az [OpenClaw](https://openclaw.ai) átjárókban egyetlen paranccsal:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

A telepítő kezeli a függőségeket, a plugin beállítást, az AI-szolgáltató konfigurációját, a worker indítást és az opcionális valós idejű megfigyelési csatornákat a Telegram, Discord, Slack és egyéb platformokra. Részletekért lásd az [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) dokumentumot.

**Kulcsfunkciók:**

- 🧠 **Tartós memória** - A kontextus túléli a munkameneteket
- 📁 **Markdown Vault (Obsidian-kompatibilis)** - Megfigyelések és munkamenetek tárolva `.md` fájlként a `<project-root>/docs/vault/` alatt, verzióváltoztatható és egyesíthető a git-en — nincs SQLite, nincs bináris állapot a fejlesztési gépeken
- 📊 **Progresszív felfedés** - Rétegzett memória-visszakeresés token-költség láthatósággal
- 🔍 **Skill-alapú keresés** - Lekérdezheti projekt előzményeit a mem-search skill segítségével (a tárolóban lévő `minisearch` memória által támogatva)
- 🖥️ **Web megjelenítő felület** - Valós idejű memória stream a http://localhost:37777 címen
- 💻 **Claude Desktop Skill** - Memória keresése Claude Desktop beszélgetésekből
- 🔒 **Adatvédelmi kontroll** - Az `<private>` címkék segítségével zárja ki az érzékeny tartalmakat a tárolásból
- ⚙️ **Kontextus konfiguráció** - Finomhangolt kontroll afelett, hogy milyen kontextus kerül beillesztésre
- 🤖 **Automatikus működés** - Nincs szükség manuális beavatkozásra
- 🔗 **Hivatkozások** - Hivatkozzon múltbeli megfigyelésekre ID-kkal (hozzáférés az http://localhost:37777/api/observation/{id} címen vagy az összes megtekintése a web megjelenítőben a http://localhost:37777 címen)
- 🧪 **Béta csatorna** - Kísérleti funkciók, mint az Endless Mode kipróbálása verzióváltás révén

## SQLite-ről való átmigrálás (Legacy)

A korábbi kiadások a memóriát az `~/.claude-mem-file/claude-mem-file.db` fájlban tárolták (SQLite + FTS5 + ChromaDB). Az új vault elrendezés ezt az összes egyszerű Markdown-nal helyettesíti a `<project-root>/docs/vault/` alatt. A korábbi memóriái nem vesznek el — futtassa a migrálási szkriptet egyszer:

```bash
# a claude-mem-file-t korábban használó projekten belülről:
npm run migrate-to-vault              # docs/vault/ írása az örökölt adatbázisból
npm run migrate-to-vault:dry          # előnézet írás nélkül
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # explicit útvonalak
```

A szkript csak olvasható módon megnyitja az SQLite adatbázist és idempotens (ismétlődések SHA-256 tartalmi hash-ek segítségével deduplicálódnak, így az újrafuttatás biztonságos). Véglegesítse az eredményül kapott `docs/vault/` mappát az adatraktárban, hogy megosztsa a memóriát a csapatával.

---

## Dokumentáció

📚 **[Teljes dokumentáció megtekintése](https://docs.claude-mem-file.ai/)** - Böngészés a hivatalos weboldalon

### Első lépések

- **[Telepítési útmutató](https://docs.claude-mem-file.ai/installation)** - Gyors indítás és haladó telepítés
- **[Gemini CLI beállítás](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Dedikált útmutató a Google Gemini CLI integrációjához
- **[Használati útmutató](https://docs.claude-mem-file.ai/usage/getting-started)** - Hogyan működik a Claude-Mem-File automatikusan
- **[Keresési eszközök](https://docs.claude-mem-file.ai/usage/search-tools)** - Lekérdezheti projekt előzményeit természetes nyelvvel
- **[Béta funkciók](https://docs.claude-mem-file.ai/beta-features)** - Kísérleti funkciók, mint az Endless Mode kipróbálása

### Ajánlott eljárások

- **[Kontextus tervezés](https://docs.claude-mem-file.ai/context-engineering)** - AI ügynök kontextus optimalizálási elvei
- **[Progresszív felfedés](https://docs.claude-mem-file.ai/progressive-disclosure)** - A Claude-Mem-File kontextus előkészítési stratégiájának filozofiája

### Architektúra

- **[Áttekintés](https://docs.claude-mem-file.ai/architecture/overview)** - Rendszerkomponensek és adatfolyam
- **[Architektúra fejlődése](https://docs.claude-mem-file.ai/architecture-evolution)** - Az út a v3-tól az v5-ig
- **[Hooks architektúra](https://docs.claude-mem-file.ai/hooks-architecture)** - Hogyan használja a Claude-Mem-File az életciklus hook-okat
- **[Hooks referencia](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook szkript magyarázata
- **[Worker szolgáltatás](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API és Bun kezelés
- **[Dokumentációs Vault](docs/)** - Obsidian-stílusú Markdown vault a megosztott projekt tudásához

### Konfiguráció és fejlesztés

- **[Konfiguráció](https://docs.claude-mem-file.ai/configuration)** - Környezeti változók és beállítások
- **[Fejlesztés](https://docs.claude-mem-file.ai/development)** - Építés, tesztelés, hozzájárulás
- **[Hibaelhárítás](https://docs.claude-mem-file.ai/troubleshooting)** - Gyakori problémák és megoldások

---

## Hogyan működik

**Fő komponensek:**

1. **5 életciklus hook** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook szkript)
2. **Okos telepítés** - Gyorsítótárazott függőség ellenőrző (pre-hook szkript, nem az életciklus hook)
3. **Worker szolgáltatás** - HTTP API a 37777-es porton web megjelenítő felülettel és 10 keresési végponttal, Bun által kezelve
4. **Dokumentációs Vault** (`docs/`) - Obsidian-stílusú Markdown vault a tárolóban véglegesítve; az összes építészeti döntés, kontextus és tudás közös igazsága a munkamenetek és az együttműködők között
5. **mem-search Skill** - Természetes nyelvi lekérdezések progresszív felfedéssel

Részletekért lásd az [Architektúra áttekintést](https://docs.claude-mem-file.ai/architecture/overview).

---

## MCP keresési eszközök

A Claude-Mem-File intelligens memóriakeresést biztosít **4 MCP eszköz** segítségével, amely egy token-hatékony **3 rétegű munkafolyamot** követez:

**A 3 rétegű munkafolyamat:**

1. **`search`** - Kompakt index lekérése ID-kkal (~50-100 token/eredmény)
2. **`timeline`** - Kronológiai kontextus lekérése az érdekes eredmények körül
3. **`get_observations`** - Teljes részletek lekérése **csak** a szűrt ID-khoz (~500-1000 token/eredmény)

**Hogyan működik:**

- Claude az MCP eszközöket használja a memória keresésére
- Indítson a `search`-sel az eredmények indexének lekéréséhez
- Használja a `timeline`-t, hogy lássa, mi történt az adott megfigyelések körül
- Használja a `get_observations`-t a releváns ID-k teljes részleteihez
- **~10x token megtakarítás** szűréssel a részletek lekérése előtt

**Elérhető MCP eszközök:**

1. **`search`** - Memória indexének keresése teljes szöveges lekérdezésekkel, szűrés típus/dátum/projekt alapján
2. **`timeline`** - Kronológiai kontextus lekérése egy adott megfigyelés vagy lekérdezés körül
3. **`get_observations`** - Megfigyelési részletek lekérése ID-k alapján (mindig kötegelt több ID-t)

**Használati példa:**

```typescript
// 1. lépés: Index keresése
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// 2. lépés: Index áttekintése, releváns ID-k azonosítása (pl. #123, #456)

// 3. lépés: Teljes részletek lekérése
get_observations((ids = [123, 456]));
```

Részletes példákért lásd a [Keresési eszközök útmutatót](https://docs.claude-mem-file.ai/usage/search-tools).

---

## Béta funkciók

A Claude-Mem-File **béta csatornát** kínál kísérleti funkciókkal, mint az **Endless Mode** (biomimetikus memória architektúra kiterjesztett munkamenetekhez). Váltson a stabil és béta verziók között a web megjelenítő felületről a http://localhost:37777 → Settings címen.

Részletekért az Endless Mode-ról és annak kipróbálásáról lásd a **[Béta funkciók dokumentációt](https://docs.claude-mem-file.ai/beta-features)**.

---

## Rendszerkövetelmények

- **Node.js**: 18.0.0 vagy újabb
- **Claude Code**: Legújabb verzió plugin támogatással
- **Bun**: JavaScript futtatókörnyezet és folyamatkezelő (automatikusan települ, ha hiányzik)

---

### Windows telepítési megjegyzések

Ha olyan hibaüzenetet lát, mint:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Győződjön meg róla, hogy a Node.js és az npm telepítve van és hozzáadva van az PATH-hoz. Töltse le a legújabb Node.js telepítőt a https://nodejs.org-ról, és indítsa újra a terminált a telepítés után.

---

## Konfiguráció

A beállítások a `~/.claude-mem-file/settings.json` fájlban kezelhetők (automatikusan létrejön alapértelmezett értékekkel az első futtatáskor). Konfigurálható az AI modell, worker port, adatkönyvtár, naplózási szint és kontextus beillesztési beállítások.

Az összes elérhető beállításért és példákért lásd a **[Konfigurációs útmutatót](https://docs.claude-mem-file.ai/configuration)**.

### Mód és nyelvbeállítás

A Claude-Mem-File több munkafolyamat módot és nyelvet támogat a `CLAUDE_MEM_MODE` beállításon keresztül.

Ez az opció az alábbiakat vezérli:

- A munkafolyamat viselkedése (pl. code, chill, investigation)
- A generált megfigyelésekben használt nyelv

#### Konfigurálás módja

Szerkessze a beállítási fájlt a `~/.claude-mem-file/settings.json` címen:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

A módok a `plugin/modes/` könyvtárban vannak meghatározva. Az összes elérhető mód helyi megtekintéséhez:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Elérhető módok

| Mód        | Leírás                    |
| ---------- | ------------------------- |
| `code`     | Alapértelmezett angol mód |
| `code--zh` | Egyszerűsített kínai mód  |
| `code--ja` | Japán mód                 |

A nyelvspecifikus módok követik a `code--[lang]` mintát, ahol `[lang]` az ISO 639-1 nyelvkód (pl. `zh` kínaira, `ja` japánra, `es` spanyolra).

> Megjegyzés: a `code--zh` (egyszerűsített kínai) már beépített — nincs szükség további telepítésre vagy plugin frissítésre.

#### Mód megváltoztatása után

## Indítsa újra a Claude Code-ot az új módbeállítás alkalmazásához.

## Fejlesztés

Az építési utasításokért, tesztelésért és hozzájárulási munkafolyamatért lásd a **[Fejlesztési útmutatót](https://docs.claude-mem-file.ai/development)**.

---

## Hibaelhárítás

Ha problémákat tapasztal, írja le a problémát Claude-nak, és a troubleshoot skill automatikusan diagnosztizálja és biztosítja a javításokat.

Gyakori problémákért és megoldásokért lásd a **[Hibaelhárítási útmutatót](https://docs.claude-mem-file.ai/troubleshooting)**.

---

## Hibajelentések

Átfogó hibajelentések készítése az automatikus generátorral:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Hozzájárulás

A hozzájárulásokat szívesen fogadjuk! Kérjük:

1. Fork-olja az adattárat
2. Hozzon létre egy feature branch-et
3. Végezze el a módosításait tesztekkel
4. Frissítse a dokumentációt
5. Nyújtson be egy Pull Requestet

Lásd a [Fejlesztési útmutatót](https://docs.claude-mem-file.ai/development) a hozzájárulási munkafolyamatért.

---

## Licenc

Ez a projekt a **GNU Affero General Public License v3.0** (AGPL-3.0) alatt licencelt.

Copyright (C) 2025 Alex Newman (@thedotmack). Minden jog fenntartva.

A teljes részletekért lásd a [LICENSE](LICENSE) fájlt.

**Mit jelent ez:**

- Szabadon használhatja, módosíthatja és terjesztheti ezt a szoftvert
- Ha módosítja és hálózati szerveren telepíti, elérhetővé kell tennie a forráskódot
- A származékos munkáknak szintén AGPL-3.0 alatt kell licencelve lenniük
- Ehhez a szoftverhez NINCS GARANCIA

**Megjegyzés a Ragtime-ról**: A `ragtime/` könyvtár külön licencelt a **PolyForm Noncommercial License 1.0.0** alatt. Részletekért lásd a [ragtime/LICENSE](ragtime/LICENSE) fájlt.

---

## Támogatás

- **Dokumentáció**: [docs/](docs/)
- **Hibák**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Adattár**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Hivatalos X fiók**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Hivatalos Discord**: [Csatlakozzon a Discord-hoz](https://discord.com/invite/J4wttp9vDu)
- **Szerző**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Claude Agent SDK-val építve** | **Claude Code által hajtva** | **TypeScript-tel készítve**

---

### Mi a helyzet a $CMEM-mel?

A $CMEM egy harmadik fél által létrehozott Solana token, amely a Claude-Mem-File előzetes engedélye nélkül jött létre, de a Claude-Mem-File alkotója (Alex Newman, @thedotmack) által hivatalosan támogatott. A token a közösség növekedésének katalizátoraként működik, és az azoknak a fejlesztőknek és tudásmunkásoknak hozza meg a valós idejű ügynök adatokat, akiknek a legjobban szükségük van rá. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
