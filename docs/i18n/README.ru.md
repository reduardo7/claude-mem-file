🌐 Это машинный перевод. Исправления от сообщества приветствуются!

---

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
> **Это форк репозитория [claude-mem](https://github.com/thedotmack/claude-mem)** от [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Этот форк заменяет SQLite/двоичный бэкенд хранилища **подходом только для файловой системы**: вся память хранится как простые файлы Markdown в директории `<project-root>/docs/vault/`, полностью управляемые через git и совместно используемые всеми членами вашей команды. Никаких локальных баз данных, никаких двоичных объектов — просто файлы, которые вы можете читать, редактировать, коммитить и объединять.

<h4 align="center">claude-mem-file — система сжатия постоянной памяти, созданная для <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#быстрый-старт">Быстрый старт</a> •
  <a href="#как-это-работает">Как это работает</a> •
  <a href="#инструменты-поиска-mcp">Инструменты поиска</a> •
  <a href="#документация">Документация</a> •
  <a href="#конфигурация">Конфигурация</a> •
  <a href="#устранение-неполадок">Устранение неполадок</a> •
  <a href="#лицензия">Лицензия</a>
</p>

<p align="center">
  Claude-Mem-File бесшовно сохраняет контекст между сеансами, захватывая наблюдения об использовании инструментов, генерируя семантические сводки и сохраняя всё в виде управляемых версиями файлов Markdown в специальном Obsidian-совместимом хранилище на уровне проекта в директории `<project-root>/docs/vault/` — без SQLite базы данных, без двоичных объектов, полностью объединяемо через git.
</p>

---

## Быстрый старт

Установить одной командой:

```bash
npx claude-mem-file install
```

Или установить для Gemini CLI (автоматически находит `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Или установить для OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Или установить из маркетплейса плагинов в Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Перезапустите Claude Code или Gemini CLI. Контекст из предыдущих сеансов будет автоматически появляться в новых сеансах.

> **Примечание:** Claude-Mem-File также опубликован на npm, но `npm install -g claude-mem-file` устанавливает **только SDK/библиотеку** — он не регистрирует хуки плагина и не устанавливает сервис worker. Всегда устанавливайте через `npx claude-mem-file install` или через команды `/plugin` выше.

### Шлюз OpenClaw

Установите claude-mem-file как плагин постоянной памяти на шлюзы [OpenClaw](https://openclaw.ai) одной командой:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Установщик обрабатывает зависимости, настройку плагина, конфигурацию AI провайдера, запуск worker и опциональные каналы наблюдений в реальном времени к Telegram, Discord, Slack и более. Подробности см. в [Руководстве интеграции OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration).

**Ключевые функции:**

- 🧠 **Постоянная память** - Контекст сохраняется между сеансами
- 📁 **Хранилище Markdown (совместимое с Obsidian)** - Наблюдения и сеансы сохраняются как файлы `.md` в директории `<project-root>/docs/vault/`, управляемые и объединяемые через git — никаких SQLite, никакого локального двоичного состояния на машинах разработчиков
- 📊 **Прогрессивное раскрытие** - Многоуровневое извлечение памяти с видимостью стоимости токенов
- 🔍 **Поиск на основе навыков** - Запросы к истории проекта с помощью навыка mem-search (работает на основе встроенного `minisearch` над хранилищем)
- 🖥️ **Веб-интерфейс просмотра** - Поток памяти в реальном времени на http://localhost:37777
- 💻 **Навык Claude Desktop** - Поиск в памяти из разговоров Claude Desktop
- 🔒 **Контроль конфиденциальности** - Используйте теги `<private>` для исключения конфиденциального контента из хранилища
- ⚙️ **Настройка контекста** - Детальный контроль того, какой контекст внедряется
- 🤖 **Автоматическая работа** - Не требуется ручное вмешательство
- 🔗 **Цитирование** - Ссылки на прошлые наблюдения с помощью ID (доступ через http://localhost:37777/api/observation/{id} или просмотр всех в веб-интерфейсе на http://localhost:37777)
- 🧪 **Бета-канал** - Попробуйте экспериментальные функции, такие как режим Endless, путём переключения версий

## Миграция из SQLite (устаревшая версия)

Ранние версии хранили память в `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Новая схема хранилища заменяет всё это простыми файлами Markdown в `<project-root>/docs/vault/`. Ваша прошлая память не потеряна — запустите скрипт миграции один раз:

```bash
# в пределах любого проекта, который ранее использовал claude-mem-file:
npm run migrate-to-vault              # записывает docs/vault/ из устаревшей БД
npm run migrate-to-vault:dry          # просмотр без записи
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # явные пути
```

Скрипт открывает SQLite базу данных в режиме только для чтения и является идемпотентным (дубликаты обнаруживаются через хэши содержимого SHA-256, поэтому повторное выполнение безопасно). Закоммитьте получившуюся папку `docs/vault/` в свой репозиторий, чтобы поделиться памятью со своей командой.

---

## Документация

📚 **[Просмотреть полную документацию](https://docs.claude-mem-file.ai/)** - Просмотр на официальном сайте

### Начало работы

- **[Руководство по установке](https://docs.claude-mem-file.ai/installation)** - Быстрый старт и продвинутая установка
- **[Настройка Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Специальное руководство для интеграции с Google Gemini CLI
- **[Руководство по использованию](https://docs.claude-mem-file.ai/usage/getting-started)** - Как Claude-Mem-File работает автоматически
- **[Инструменты поиска](https://docs.claude-mem-file.ai/usage/search-tools)** - Запросы к истории проекта на естественном языке
- **[Бета-функции](https://docs.claude-mem-file.ai/beta-features)** - Попробуйте экспериментальные функции, такие как режим Endless

### Лучшие практики

- **[Инженерия контекста](https://docs.claude-mem-file.ai/context-engineering)** - Принципы оптимизации контекста для AI-агентов
- **[Прогрессивное раскрытие](https://docs.claude-mem-file.ai/progressive-disclosure)** - Философия стратегии подготовки контекста в Claude-Mem-File

### Архитектура

- **[Обзор](https://docs.claude-mem-file.ai/architecture/overview)** - Компоненты системы и поток данных
- **[Эволюция архитектуры](https://docs.claude-mem-file.ai/architecture-evolution)** - Путь от v3 к v5
- **[Архитектура хуков](https://docs.claude-mem-file.ai/hooks-architecture)** - Как Claude-Mem-File использует хуки жизненного цикла
- **[Справочник по хукам](https://docs.claude-mem-file.ai/architecture/hooks)** - Объяснение 7 скриптов хуков
- **[Сервис Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API и управление Bun
- **[Документация хранилища](docs/)** - Obsidian-стиль хранилище Markdown для совместного проектного знания

### Конфигурация и разработка

- **[Конфигурация](https://docs.claude-mem-file.ai/configuration)** - Переменные окружения и настройки
- **[Разработка](https://docs.claude-mem-file.ai/development)** - Сборка, тестирование, участие в разработке
- **[Устранение неполадок](https://docs.claude-mem-file.ai/troubleshooting)** - Распространенные проблемы и решения

---

## Как это работает

**Основные компоненты:**

1. **5 хуков жизненного цикла** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 скриптов хуков)
2. **Умная установка** - Проверка кешированных зависимостей (скрипт предварительного хука, не является хуком жизненного цикла)
3. **Сервис Worker** - HTTP API на порту 37777 с веб-интерфейсом просмотра и 10 конечными точками поиска, управляемый Bun
4. **Документация хранилища** (`docs/`) - Obsidian-стиль хранилище Markdown, закоммиченное в репозиторий; совместный источник истины для всех архитектурных решений, контекста и знаний между сеансами и сотрудничающими пользователями
5. **Навык mem-search** - Запросы на естественном языке с прогрессивным раскрытием

Подробности см. в [Обзоре архитектуры](https://docs.claude-mem-file.ai/architecture/overview).

---

## Инструменты поиска MCP

Claude-Mem-File предоставляет интеллектуальный поиск в памяти через **4 инструмента MCP**, следуя эффективному по токенам **шаблону 3-уровневого рабочего процесса**:

**Рабочий процесс из 3 уровней:**

1. **`search`** - Получить компактный индекс с ID (~50-100 токенов/результат)
2. **`timeline`** - Получить хронологический контекст вокруг интересующих результатов
3. **`get_observations`** - Получить полные детали ТОЛЬКО для отфильтрованных ID (~500-1,000 токенов/результат)

**Как это работает:**

- Claude использует инструменты MCP для поиска в вашей памяти
- Начните с `search`, чтобы получить индекс результатов
- Используйте `timeline` для просмотра того, что было вокруг конкретных наблюдений
- Используйте `get_observations` для получения полных деталей релевантных ID
- **~10x экономия токенов** путём фильтрации перед получением деталей

**Доступные инструменты MCP:**

1. **`search`** - Поиск в индексе памяти с полнотекстовыми запросами, фильтрацией по типу/дате/проекту
2. **`timeline`** - Получить хронологический контекст вокруг конкретного наблюдения или запроса
3. **`get_observations`** - Получить полные детали наблюдений по ID (всегда делайте пакетное получение нескольких ID)

**Пример использования:**

```typescript
// Шаг 1: Поиск в индексе
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Шаг 2: Просмотр индекса, идентификация релевантных ID (например, #123, #456)

// Шаг 3: Получение полных деталей
get_observations((ids = [123, 456]));
```

Подробные примеры см. в [Руководстве по инструментам поиска](https://docs.claude-mem-file.ai/usage/search-tools).

---

## Бета-функции

Claude-Mem-File предлагает **бета-канал** с экспериментальными функциями, такими как **режим Endless** (биомиметическая архитектура памяти для расширенных сеансов). Переключайтесь между стабильной и бета-версиями из веб-интерфейса на http://localhost:37777 → Settings.

Подробности о режиме Endless и способах его опробовать см. в **[Документации по бета-функциям](https://docs.claude-mem-file.ai/beta-features)**.

---

## Системные требования

- **Node.js**: 18.0.0 или выше
- **Claude Code**: Последняя версия с поддержкой плагинов
- **Bun**: Среда выполнения JavaScript и менеджер процессов (автоматически устанавливается при отсутствии)

---

### Примечания по настройке Windows

Если вы видите ошибку вроде:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Убедитесь, что Node.js и npm установлены и добавлены в PATH. Загрузите последний установщик Node.js с https://nodejs.org и перезагрузите терминал после установки.

---

## Конфигурация

Настройки управляются в `~/.claude-mem-file/settings.json` (автоматически создается с настройками по умолчанию при первом запуске). Настройте модель AI, порт worker, директорию данных, уровень логирования и параметры внедрения контекста.

Все доступные настройки и примеры см. в **[Руководстве по конфигурации](https://docs.claude-mem-file.ai/configuration)**.

### Конфигурация режима и языка

Claude-Mem-File поддерживает несколько режимов рабочего процесса и языков через настройку `CLAUDE_MEM_MODE`.

Этот опция контролирует:

- Поведение рабочего процесса (например, code, chill, investigation)
- Язык, используемый в генерируемых наблюдениях

#### Как настроить

Отредактируйте файл настроек на `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Режимы определены в `plugin/modes/`. Для просмотра всех доступных режимов локально:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Доступные режимы

| Режим      | Описание                    |
| ---------- | --------------------------- |
| `code`     | Режим английского по умолчанию |
| `code--zh` | Режим упрощённого китайского |
| `code--ja` | Режим японского             |

Языко-специфичные режимы следуют шаблону `code--[lang]`, где `[lang]` это ISO 639-1 код языка (например, `zh` для китайского, `ja` для японского, `es` для испанского).

> Примечание: `code--zh` (упрощённый китайский) уже встроен — никакое дополнительное обновление установки или плагина не требуется.

#### После изменения режима

Перезапустите Claude Code для применения новой конфигурации режима.

## Разработка

Инструкции по сборке, тестированию и процессу участия в разработке см. в **[Руководстве по разработке](https://docs.claude-mem-file.ai/development)**.

---

## Устранение неполадок

При возникновении проблем опишите проблему Claude, и навык устранения неполадок автоматически выполнит диагностику и предоставит исправления.

Распространенные проблемы и решения см. в **[Руководстве по устранению неполадок](https://docs.claude-mem-file.ai/troubleshooting)**.

---

## Отчеты об ошибках

Создавайте подробные отчеты об ошибках с помощью автоматического генератора:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Участие в разработке

Приветствуются вклады! Пожалуйста:

1. Форкните репозиторий
2. Создайте ветку для функции
3. Внесите изменения с тестами
4. Обновите документацию
5. Отправьте Pull Request

Процесс участия см. в [Руководстве по разработке](https://docs.claude-mem-file.ai/development).

---

## Лицензия

Этот проект лицензирован под **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Все права защищены.

Полные сведения см. в файле [LICENSE](LICENSE).

**Что это означает:**

- Вы можете свободно использовать, модифицировать и распространять это программное обеспечение
- Если вы модифицируете и развертываете на сетевом сервере, вы должны сделать свой исходный код доступным
- Производные работы также должны быть лицензированы под AGPL-3.0
- Для этого программного обеспечения НЕТ ГАРАНТИЙ

**Примечание о Ragtime**: Директория `ragtime/` лицензирована отдельно под **PolyForm Noncommercial License 1.0.0**. Подробности см. в [ragtime/LICENSE](ragtime/LICENSE).

---

## Поддержка

- **Документация**: [docs/](docs/)
- **Проблемы**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Репозиторий**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Официальный аккаунт X**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Официальный Discord**: [Присоединиться к Discord](https://discord.com/invite/J4wttp9vDu)
- **Автор**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Построено с Claude Agent SDK** | **Работает на Claude Code** | **Сделано на TypeScript**

---

### Что такое $CMEM?

$CMEM это токен solana, созданный третьей стороной без предварительного согласия Claude-Mem-File, но официально принятый создателем Claude-Mem-File (Alex Newman, @thedotmack). Токен действует как катализатор сообщества для роста и средство для предоставления данных агентов в реальном времени разработчикам и работникам знания, которые нуждаются в них больше всего. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
