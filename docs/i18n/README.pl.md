🌐 To jest automatyczne tłumaczenie. Korekty społeczności są mile widziane!

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
> **To jest fork projektu [claude-mem](https://github.com/thedotmack/claude-mem)** autorstwa [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Ten fork zastępuje backend SQLite/binarny podejściem **tylko dla systemu plików**: cała pamięć jest przechowywana jako zwykłe pliki Markdown w katalogu `<project-root>/docs/vault/`, w pełni wersjonowalne za pośrednictwem git i możliwe do udostępnienia każdemu członkowi zespołu. Brak lokalnych baz danych, brak binarnych obiektów — tylko pliki, które możesz czytać, edytować, zatwierdzać i scalać.

<h4 align="center">claude-mem-file — System kompresji trwałej pamięci zbudowany dla <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#szybki-start">Szybki Start</a> •
  <a href="#jak-to-działa">Jak to działa</a> •
  <a href="#narzędzia-wyszukiwania-mcp">Narzędzia Wyszukiwania</a> •
  <a href="#dokumentacja">Dokumentacja</a> •
  <a href="#konfiguracja">Konfiguracja</a> •
  <a href="#rozwiązywanie-problemów">Rozwiązywanie Problemów</a> •
  <a href="#licencja">Licencja</a>
</p>

<p align="center">
  Claude-Mem-File bezproblemowo zachowuje kontekst między sesjami, przechwytując obserwacje z narzędzi, generując podsumowania semantyczne i przechowując wszystko jako wersjonowany Markdown wewnątrz magazynu Obsidian-kompatybilnego na projekt w `<project-root>/docs/vault/` — bez bazy danych SQLite, bez binarnych obiektów, w pełni możliwe do scalenia za pośrednictwem git.
</p>

---

## Szybki Start

Zainstaluj jedną komendą:

```bash
npx claude-mem-file install
```

Lub zainstaluj dla Gemini CLI (automatycznie wykrywa `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Lub zainstaluj dla OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Lub zainstaluj z marketplace'u wtyczek wewnątrz Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Uruchom ponownie Claude Code lub Gemini CLI. Kontekst z poprzednich sesji pojawi się automatycznie w nowych sesjach.

> **Uwaga:** Claude-Mem-File jest również publikowany na npm, ale `npm install -g claude-mem-file` instaluje **tylko SDK/bibliotekę** — nie rejestruje haków wtyczek ani nie konfiguruje serwisu worker. Zawsze instaluj za pośrednictwem `npx claude-mem-file install` lub powyższych poleceń `/plugin`.

### 🦞 OpenClaw Gateway

Zainstaluj claude-mem-file jako wtyczkę trwałej pamięci na bramy [OpenClaw](https://openclaw.ai) za pomocą jednej komendy:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Instalator obsługuje zależności, konfigurację wtyczki, konfigurację dostawcy AI, uruchomienie workera i opcjonalne kanały obserwacji w czasie rzeczywistym do Telegram, Discord, Slack i wielu więcej. Szczegóły znajdują się w [Przewodniku Integracji OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration).

**Kluczowe Cechy:**

- 🧠 **Trwała Pamięć** - Kontekst przetrwa między sesjami
- 📁 **Magazyn Markdown (Obsidian-kompatybilny)** - Obserwacje i sesje przechowywane jako pliki `.md` w `<project-root>/docs/vault/`, wersjonowalne i scalane za pośrednictwem git — bez SQLite, bez stanu binarnego na maszynach programistów
- 📊 **Progresywne Ujawnianie** - Warstwowe pobieranie pamięci z widoczością kosztów tokenów
- 🔍 **Wyszukiwanie Oparte na Umiejętnościach** - Przeszukuj historię projektu za pomocą umiejętności mem-search (zasilane `minisearch` w pamięci magazynu)
- 🖥️ **Interfejs Przeglądarki Sieci Web** - Stream pamięci w czasie rzeczywistym na http://localhost:37777
- 💻 **Umiejętność Claude Desktop** - Przeszukuj pamięć z rozmów Claude Desktop
- 🔒 **Kontrola Prywatności** - Użyj tagów `<private>` aby wykluczyć wrażliwą zawartość z przechowywania
- ⚙️ **Konfiguracja Kontekstu** - Precyzyjna kontrola nad tym, jaki kontekst zostanie wstrzyknięty
- 🤖 **Automatyczna Operacja** - Nie wymaga ręcznej interwencji
- 🔗 **Cytowania** - Odwołuj się do przeszłych obserwacji za pomocą identyfikatorów (dostęp za pośrednictwem http://localhost:37777/api/observation/{id} lub wyświetl wszystkie w przeglądarce sieci web na http://localhost:37777)
- 🧪 **Kanał Beta** - Spróbuj eksperymentalnych funkcji, takich jak Tryb Nieskończony, za pośrednictwem przełączania wersji

## Migracja z SQLite (starszy system)

Wcześniejsze wydania przechowywały pamięć w `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Nowy układ magazynu zastępuje to wszystko zwykłym Markdown w `<project-root>/docs/vault/`. Twoje poprzednie wspomnienia nie są tracone — uruchom skrypt migracji raz:

```bash
# z projektu, który wcześniej używał claude-mem-file:
npm run migrate-to-vault              # zapisuje docs/vault/ ze starej bazy danych
npm run migrate-to-vault:dry          # podgląd bez pisania
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # ścieżki jawne
```

Skrypt otwiera bazę danych SQLite tylko do odczytu i jest idempotentny (duplikaty są wykrywane za pośrednictwem haszów zawartości SHA-256, więc ponowne uruchomienie jest bezpieczne). Zatwierdź wynikowy folder `docs/vault/` do twojego repozytorium, aby udostępnić pamięć swojemu zespołowi.

---

## Dokumentacja

📚 **[Wyświetl Pełną Dokumentację](https://docs.claude-mem-file.ai/)** - Przeglądaj na oficjalnej stronie

### Wprowadzenie

- **[Przewodnik Instalacji](https://docs.claude-mem-file.ai/installation)** - Szybki start i zaawansowana instalacja
- **[Konfiguracja Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Dedykowany przewodnik do integracji Gemini CLI Google
- **[Przewodnik Użytkowania](https://docs.claude-mem-file.ai/usage/getting-started)** - Jak Claude-Mem-File działa automatycznie
- **[Narzędzia Wyszukiwania](https://docs.claude-mem-file.ai/usage/search-tools)** - Przeszukuj historię projektu w języku naturalnym
- **[Cechy Beta](https://docs.claude-mem-file.ai/beta-features)** - Spróbuj eksperymentalnych funkcji, takich jak Tryb Nieskończony

### Najlepsze Praktyki

- **[Inżynieria Kontekstu](https://docs.claude-mem-file.ai/context-engineering)** - Zasady optymalizacji kontekstu agenta AI
- **[Progresywne Ujawnianie](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filozofia stojąca za strategią podstawienia kontekstu Claude-Mem-File

### Architektura

- **[Przegląd](https://docs.claude-mem-file.ai/architecture/overview)** - Komponenty systemu i przepływ danych
- **[Ewolucja Architektury](https://docs.claude-mem-file.ai/architecture-evolution)** - Podróż od v3 do v5
- **[Architektura Haków](https://docs.claude-mem-file.ai/hooks-architecture)** - Jak Claude-Mem-File używa haków cyklu życia
- **[Odniesienie Haków](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 skryptów haków wyjaśnionych
- **[Serwis Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API i zarządzanie Bun
- **[Magazyn Docs](docs/)** - Magazyn Markdown w stylu Obsidian dla wspólnej wiedzy projektowej

### Konfiguracja i Rozwój

- **[Konfiguracja](https://docs.claude-mem-file.ai/configuration)** - Zmienne środowiska i ustawienia
- **[Rozwój](https://docs.claude-mem-file.ai/development)** - Budowanie, testowanie, współtworzenie
- **[Rozwiązywanie Problemów](https://docs.claude-mem-file.ai/troubleshooting)** - Typowe problemy i rozwiązania

---

## Jak to działa

**Główne Komponenty:**

1. **5 Haków Cyklu Życia** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 skryptów haków)
2. **Inteligentna Instalacja** - Keszowana funkcja sprawdzania zależności (skrypt pre-hook, nie hak cyklu życia)
3. **Serwis Worker** - HTTP API na porcie 37777 z interfejsem przeglądarki web i 10 punktami końcowymi wyszukiwania, zarządzany przez Bun
4. **Magazyn Docs** (`docs/`) - Magazyn Markdown w stylu Obsidian zatwierdzony w repozytorium; wspólne źródło prawdy dla wszystkich decyzji architektonicznych, kontekstu i wiedzy między sesjami i współpracownikami
5. **Umiejętność mem-search** - Zapytania w języku naturalnym z progresywnym ujawnianiem

Szczegóły znajdują się w [Przegląd Architektury](https://docs.claude-mem-file.ai/architecture/overview).

---

## Narzędzia Wyszukiwania MCP

Claude-Mem-File zapewnia inteligentne wyszukiwanie pamięci za pośrednictwem **4 narzędzi MCP** zgodnie z wydajnym tokenami **wzorem przepływu pracy trzywarstwowego**:

**Przepływ Pracy Trzywarstwowy:**

1. **`search`** - Uzyskaj kompaktowy indeks z identyfikatorami (~50-100 tokenów/wynik)
2. **`timeline`** - Uzyskaj kontekst chronologiczny wokół interesujących wyników
3. **`get_observations`** - Pobierz pełne szczegóły TYLKO dla przefiltrowanych identyfikatorów (~500-1,000 tokenów/wynik)

**Jak to Działa:**

- Claude używa narzędzi MCP do wyszukiwania pamięci
- Zacznij od `search`, aby uzyskać indeks wyników
- Użyj `timeline`, aby zobaczyć, co się działo wokół określonych obserwacji
- Użyj `get_observations`, aby pobrać pełne szczegóły dla istotnych identyfikatorów
- **~10x oszczędność tokenów** poprzez filtrowanie przed pobraniem szczegółów

**Dostępne Narzędzia MCP:**

1. **`search`** - Wyszukiwanie indeksu pamięci za pomocą zapytań pełnotekstowych, filtrowanie wg typu/daty/projektu
2. **`timeline`** - Uzyskaj kontekst chronologiczny wokół określonej obserwacji lub zapytania
3. **`get_observations`** - Pobierz szczegóły obserwacji za pomocą identyfikatorów (zawsze łącz wiele identyfikatorów)

**Przykład Użytkowania:**

```typescript
// Krok 1: Wyszukaj indeks
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Krok 2: Przejrzyj indeks, zidentyfikuj istotne identyfikatory (np. #123, #456)

// Krok 3: Pobierz pełne szczegóły
get_observations((ids = [123, 456]));
```

Szczegóły znajdują się w [Przewodniku Narzędzi Wyszukiwania](https://docs.claude-mem-file.ai/usage/search-tools).

---

## Cechy Beta

Claude-Mem-File oferuje **kanał beta** z eksperymentalnymi funkcjami, takimi jak **Tryb Nieskończony** (biomimetyczna architektura pamięci dla rozszerzonych sesji). Przełączaj się między wersjami stabilnymi i beta z interfejsu przeglądarki web na http://localhost:37777 → Ustawienia.

Szczegóły znajdują się w **[Dokumentacji Cech Beta](https://docs.claude-mem-file.ai/beta-features)**.

---

## Wymagania Systemowe

- **Node.js**: 18.0.0 lub wyższy
- **Claude Code**: Najnowsza wersja z obsługą wtyczek
- **Bun**: Środowisko wykonawcze JavaScript i menedżer procesów (instalowany automatycznie, jeśli brakuje)

---

### Notatki Instalacji Windows

Jeśli widzisz błąd taki jak:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Upewnij się, że Node.js i npm są zainstalowane i dodane do ścieżki PATH. Pobierz najnowszy instalator Node.js z https://nodejs.org i uruchom ponownie terminal po instalacji.

---

## Konfiguracja

Ustawienia są zarządzane w `~/.claude-mem-file/settings.json` (automatycznie tworzone z wartościami domyślnymi przy pierwszym uruchomieniu). Skonfiguruj model AI, port workera, katalog danych, poziom dziennika i ustawienia wstrzyknięcia kontekstu.

Szczegóły znajdują się w **[Przewodniku Konfiguracji](https://docs.claude-mem-file.ai/configuration)**.

### Konfiguracja Trybu i Języka

Claude-Mem-File obsługuje wiele trybów przepływu pracy i języków za pośrednictwem ustawienia `CLAUDE_MEM_MODE`.

Ta opcja kontroluje zarówno:

- Zachowanie przepływu pracy (np. code, chill, investigation)
- Język używany w generowanych obserwacjach

#### Jak Skonfigurować

Edytuj plik ustawień na `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Tryby są definiowane w `plugin/modes/`. Aby zobaczyć wszystkie dostępne tryby lokalnie:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Dostępne Tryby

| Tryb       | Opis                     |
| ---------- | ----------------------- |
| `code`     | Domyślny tryb angielski  |
| `code--zh` | Tryb uproszczonego chińskiego |
| `code--ja` | Tryb japoński            |

Tryby specyficzne dla języka są zgodne ze wzorem `code--[lang]`, gdzie `[lang]` jest kodem języka ISO 639-1 (np. `zh` dla chińskiego, `ja` dla japońskiego, `es` dla hiszpańskiego).

> Uwaga: `code--zh` (Uproszczony chiński) jest już wbudowany — nie wymaga dodatkowej instalacji ani aktualizacji wtyczki.

#### Po Zmianię Trybu

Uruchom ponownie Claude Code, aby zastosować nową konfigurację trybu.

## Rozwój

Szczegóły znajdują się w **[Przewodniku Rozwoju](https://docs.claude-mem-file.ai/development)** dotyczącym instrukcji budowania, testowania i przepływu pracy współpracy.

---

## Rozwiązywanie Problemów

Jeśli doświadczasz problemów, opisz problem Claude, a umiejętność troubleshoot automatycznie zdiagnozuje i zapewni poprawki.

Szczegóły znajdują się w **[Przewodniku Rozwiązywania Problemów](https://docs.claude-mem-file.ai/troubleshooting)**.

---

## Raportowanie Błędów

Utwórz kompleksowe raporty błędów za pomocą automatycznego generatora:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Współtworzenie

Współtworzenie jest mile widziane! Prosimy:

1. Sforkuj repozytorium
2. Utwórz gałąź funkcji
3. Wprowadź zmiany z testami
4. Zaktualizuj dokumentację
5. Wyślij żądanie pull

Szczegóły znajdują się w [Przewodniku Rozwoju](https://docs.claude-mem-file.ai/development).

---

## Licencja

Ten projekt jest licencjonowany na podstawie **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Wszystkie prawa zastrzeżone.

Szczegóły znajdują się w pliku [LICENSE](LICENSE).

**Co To Oznacza:**

- Możesz swobodnie używać, modyfikować i rozpowszechniać to oprogramowanie
- Jeśli modyfikujesz i wdrażasz na serwerze sieciowym, musisz udostępnić kod źródłowy
- Dzieła pochodne muszą być również licencjonowane na podstawie AGPL-3.0
- To oprogramowanie NIE MA ŻADNEJ GWARANCJI

**Uwaga na Ragtime**: Katalog `ragtime/` jest licencjonowany oddzielnie na podstawie **PolyForm Noncommercial License 1.0.0**. Szczegóły znajdują się w [ragtime/LICENSE](ragtime/LICENSE).

---

## Pomoc

- **Dokumentacja**: [docs/](docs/)
- **Problemy**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repozytorium**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Oficjalne Konto X**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Oficjalny Discord**: [Dołącz do Discord](https://discord.com/invite/J4wttp9vDu)
- **Autor**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Zbudowany za pomocą Claude Agent SDK** | **Zasilany przez Claude Code** | **Stworzony za pomocą TypeScript**

---

### Co z $CMEM?

$CMEM jest tokenem Solana stworzonym przez stronę trzecią bez uprzedniej zgody Claude-Mem-File, ale oficjalnie zaakceptowanym przez twórcę Claude-Mem-File (Alex Newman, @thedotmack). Token działa jako katalizator społeczności dla wzrostu i pojazd do przekazywania danych agentów w czasie rzeczywistym programistom i pracownikom wiedzy, którzy ich najbardziej potrzebują. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
