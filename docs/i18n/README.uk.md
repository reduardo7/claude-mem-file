🌐 Це машинний переклад. Виправлення від спільноти вітаються!

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
> **Це форк проєкту [claude-mem](https://github.com/thedotmack/claude-mem)** від [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Цей форк замінює серверну частину SQLite/бінарного сховища на **підхід, що використовує лише файлову систему**: вся пам'ять зберігається як простий Markdown у `<project-root>/docs/vault/`, повністю версійована через git та спільна для всіх членів вашої команди. Жодних локальних баз даних, жодних бінарних об'єктів — просто файли, які ви можете читати, редагувати, фіксувати та об'єднувати.

<h4 align="center">claude-mem-file — Система стиснення постійної пам'яті, створена для <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#швидкий-старт">Швидкий старт</a> •
  <a href="#як-це-працює">Як це працює</a> •
  <a href="#інструменти-пошуку-mcp">Інструменти пошуку</a> •
  <a href="#документація">Документація</a> •
  <a href="#конфігурація">Конфігурація</a> •
  <a href="#усунення-несправностей">Усунення несправностей</a> •
  <a href="#ліцензія">Ліцензія</a>
</p>

<p align="center">
  Claude-Mem-File безперешкодно зберігає контекст між сесіями, фіксуючи спостереження за використанням інструментів, генеруючи семантичні резюме та зберігаючи все як версійований Markdown всередину Obsidian-сумісного сховища на <code>&lt;project-root&gt;/docs/vault/</code> — жодної SQLite бази даних, жодних бінарних об'єктів, повністю об'єднуваних через git.
</p>

---

## Швидкий старт

Встановіть однією командою:

```bash
npx claude-mem-file install
```

Або встановіть для Gemini CLI (автоматично визначає `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Або встановіть для OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Або встановіть із ринку плагінів всередину Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Перезапустіть Claude Code або Gemini CLI. Контекст з попередніх сесій автоматично з'явиться в нових сесіях.

> **Примітка:** Claude-Mem-File також опубліковано на npm, але `npm install -g claude-mem-file` встановлює **лише SDK/бібліотеку** — він не реєструє хуки плагіна та не налаштовує сервіс воркера. Завжди встановлюйте через `npx claude-mem-file install` або команди `/plugin` вище.

### 🦞 OpenClaw Gateway

Встановіть claude-mem-file як плагін постійної пам'яті на шлюзах [OpenClaw](https://openclaw.ai) однією командою:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Установник обробляє залежності, налаштування плагіна, конфігурацію постачальника AI, запуск воркера та опціональні потоки спостереження в режимі реального часу в Telegram, Discord, Slack та інше. Дивіться [Посібник з інтеграції OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) для деталей.

**Ключові можливості:**

- 🧠 **Постійна пам'ять** - Контекст зберігається між сесіями
- 📁 **Сховище Markdown (Obsidian-сумісне)** - Спостереження та сесії зберігаються як `.md` файли під `<project-root>/docs/vault/`, версійовані та об'єднувані через git — жодної SQLite, жодного локального стану на машинах розробників
- 📊 **Прогресивне розкриття** - Багаторівневе отримання пам'яти з видимістю вартості токенів
- 🔍 **Пошук на основі навичок** - Запитуйте історію свого проєкту за допомогою навички mem-search (працює з `minisearch` в пам'яті над сховищем)
- 🖥️ **Веб-інтерфейс перегляду** - Потік пам'яті в реальному часі на http://localhost:37777
- 💻 **Навичка Claude Desktop** - Шукайте в пам'яті з розмов Claude Desktop
- 🔒 **Контроль конфіденційності** - Використовуйте теги `<private>` для виключення чутливого вмісту зі зберігання
- ⚙️ **Конфігурація контексту** - Детальний контроль над тим, який контекст впроваджується
- 🤖 **Автоматична робота** - Не потребує ручного втручання
- 🔗 **Цитування** - Посилайтеся на минулі спостереження за ідентифікаторами (доступ через http://localhost:37777/api/observation/{id} або перегляд усіх у веб-переглядачі на http://localhost:37777)
- 🧪 **Бета-канал** - Спробуйте експериментальні функції на зразок Endless Mode через перемикання версій

## Мігрування з SQLite (застаріло)

Попередні випуски зберігали пам'ять у `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Нове розташування сховища замінює все це простим Markdown у `<project-root>/docs/vault/`. Ваші попередні спостереження не втрачені — запустіть сценарій міграції один раз:

```bash
# з будь-якого проєкту, який раніше використовував claude-mem-file:
npm run migrate-to-vault              # записує docs/vault/ з застарілої БД
npm run migrate-to-vault:dry          # перегляд без запису
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # явні шляхи
```

Сценарій відкриває базу даних SQLite лише для читання та є ідемпотентним (дублікати виявляються через хеші вмісту SHA-256, тому повторне запущення безпечно). Зафіксуйте отриманий каталог `docs/vault/` у вашому репозиторії, щоб ділитися пам'яттю зі своєю командою.

---

## Документація

📚 **[Переглянути повну документацію](https://docs.claude-mem-file.ai/)** - Переглянути на офіційному сайті

### Початок роботи

- **[Посібник з встановлення](https://docs.claude-mem-file.ai/installation)** - Швидкий старт і розширене встановлення
- **[Налаштування Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Спеціалізований посібник для інтеграції Google Gemini CLI
- **[Посібник з використання](https://docs.claude-mem-file.ai/usage/getting-started)** - Як Claude-Mem-File працює автоматично
- **[Інструменти пошуку](https://docs.claude-mem-file.ai/usage/search-tools)** - Запитуйте історію свого проєкту природною мовою
- **[Бета-функції](https://docs.claude-mem-file.ai/beta-features)** - Спробуйте експериментальні функції на зразок Endless Mode

### Найкращі практики

- **[Інженерія контексту](https://docs.claude-mem-file.ai/context-engineering)** - Принципи оптимізації контексту AI-агента
- **[Прогресивне розкриття](https://docs.claude-mem-file.ai/progressive-disclosure)** - Філософія стратегії підготовки контексту Claude-Mem-File

### Архітектура

- **[Огляд](https://docs.claude-mem-file.ai/architecture/overview)** - Компоненти системи та потік даних
- **[Еволюція архітектури](https://docs.claude-mem-file.ai/architecture-evolution)** - Шлях від v3 до v5
- **[Архітектура хуків](https://docs.claude-mem-file.ai/hooks-architecture)** - Як Claude-Mem-File використовує хуки життєвого циклу
- **[Довідник хуків](https://docs.claude-mem-file.ai/architecture/hooks)** - Пояснення 7 скриптів хуків
- **[Сервіс воркера](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API та управління Bun
- **[Сховище Docs](docs/)** - Obsidian-стиль Markdown сховище для спільних знань проєкту

### Конфігурація та розробка

- **[Конфігурація](https://docs.claude-mem-file.ai/configuration)** - Змінні середовища та налаштування
- **[Розробка](https://docs.claude-mem-file.ai/development)** - Збірка, тестування, внесок
- **[Усунення несправностей](https://docs.claude-mem-file.ai/troubleshooting)** - Поширені проблеми та рішення

---

## Як це працює

**Основні компоненти:**

1. **5 хуків життєвого циклу** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 скриптів хуків)
2. **Розумне встановлення** - Кешована перевірка залежностей (скрипт перед хуком, не хук життєвого циклу)
3. **Сервіс воркера** - HTTP API на порту 37777 з веб-інтерфейсом перегляду та 10 кінцевими точками пошуку, керується Bun
4. **Сховище Docs** (`docs/`) - Obsidian-стиль Markdown сховище, зафіксоване в репозиторії; спільне джерело істини для всіх архітектурних рішень, контексту та знань між сесіями та співробітниками
5. **Навичка mem-search** - Запити природною мовою з прогресивним розкриттям

Дивіться [Огляд архітектури](https://docs.claude-mem-file.ai/architecture/overview) для деталей.

---

## Інструменти пошуку MCP

Claude-Mem-File надає інтелектуальний пошук у пам'яті через **4 інструменти MCP**, дотримуючись **3-рівневої робочої схеми**, ефективної за токенами:

**3-рівневе робоче середовище:**

1. **`search`** - Отримайте компактний індекс з ID (~50-100 токенів/результат)
2. **`timeline`** - Отримайте хронологічний контекст навколо цікавих результатів
3. **`get_observations`** - Отримайте повні деталі ТІЛЬКИ для відфільтрованих ID (~500-1,000 токенів/результат)

**Як це працює:**

- Claude використовує інструменти MCP для пошуку у вашій пам'яті
- Почніть з `search` для отримання індексу результатів
- Використовуйте `timeline` для перегляду того, що відбувалося навколо конкретних спостережень
- Використовуйте `get_observations` для отримання повних деталей для відповідних ID
- **~10x заощадження токенів** через фільтрування перед отриманням деталей

**Доступні інструменти MCP:**

1. **`search`** - Пошук індексу пам'яті за допомогою повнотекстових запитів, фільтрація за типом/датою/проєктом
2. **`timeline`** - Отримайте хронологічний контекст навколо конкретного спостереження чи запиту
3. **`get_observations`** - Отримайте повні деталі спостереження за ID (завжди групуйте кілька ID)

**Приклад використання:**

```typescript
// Крок 1: Пошук індексу
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Крок 2: Перегляд індексу, визначення відповідних ID (наприклад, #123, #456)

// Крок 3: Отримання повних деталей
get_observations((ids = [123, 456]));
```

Дивіться [Посібник інструментів пошуку](https://docs.claude-mem-file.ai/usage/search-tools) для детальних прикладів.

---

## Бета-функції

Claude-Mem-File пропонує **бета-канал** з експериментальними функціями на зразок **Endless Mode** (біоміметична архітектура пам'яті для розширених сесій). Перемикайтеся між стабільною та бета-версіями з веб-інтерфейсу перегляду на http://localhost:37777 → Налаштування.

Дивіться **[Документацію бета-функцій](https://docs.claude-mem-file.ai/beta-features)** для деталей про Endless Mode та як його спробувати.

---

## Системні вимоги

- **Node.js**: 18.0.0 або вище
- **Claude Code**: Остання версія з підтримкою плагінів
- **Bun**: JavaScript середовище виконання та менеджер процесів (автоматично встановлюється, якщо відсутнє)

---

### Примітки налаштування Windows

Якщо ви бачите помилку на зразок:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Переконайтеся, що Node.js та npm встановлені та додані до вашої PATH. Завантажте останній установник Node.js з https://nodejs.org та перезапустіть термінал після встановлення.

---

## Конфігурація

Налаштування керуються в `~/.claude-mem-file/settings.json` (автоматично створюється зі стандартними значеннями при першому запуску). Налаштуйте модель AI, порт воркера, каталог даних, рівень журналювання та параметри впровадження контексту.

Дивіться **[Посібник з конфігурації](https://docs.claude-mem-file.ai/configuration)** для всіх доступних налаштувань та прикладів.

### Конфігурація режиму та мови

Claude-Mem-File підтримує кілька режимів робочого процесу та мов через налаштування `CLAUDE_MEM_MODE`.

Цей параметр контролює:

- Поведінку робочого процесу (наприклад, код, chill, розслідування)
- Мову, що використовується у генерованих спостереженнях

#### Як налаштувати

Відредагуйте файл налаштувань на `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Режими визначені в `plugin/modes/`. Щоб див усі доступні режими локально:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Доступні режими

| Режим      | Опис                      |
| ---------- | ------------------------- |
| `code`     | Стандартний англійський режим |
| `code--zh` | Режим спрощеної китайської   |
| `code--ja` | Японський режим           |

Режими, специфічні для мови, дотримуються шаблону `code--[lang]`, де `[lang]` — це код мови ISO 639-1 (наприклад, `zh` для китайської, `ja` для японської, `es` для іспанської).

> Примітка: `code--zh` (спрощена китайська) вже вбудована — додаткові встановлення або оновлення плагіна не потрібні.

#### Після зміни режиму

Перезапустіть Claude Code для застосування нової конфігурації режиму.

## Розробка

Дивіться **[Посібник з розробки](https://docs.claude-mem-file.ai/development)** для інструкцій зі збірки, тестування та робочого процесу внеску.

---

## Усунення несправностей

Якщо виникають проблеми, опишіть проблему Claude, і навичка troubleshoot автоматично діагностує та надасть виправлення.

Дивіться **[Посібник з усунення несправностей](https://docs.claude-mem-file.ai/troubleshooting)** для поширених проблем та рішень.

---

## Звіти про помилки

Створюйте вичерпні звіти про помилки за допомогою автоматизованого генератора:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Внесок

Вітаються внески! Будь ласка:

1. Створіть форк репозиторію
2. Створіть гілку функції
3. Внесіть зміни з тестами
4. Оновіть документацію
5. Надішліть Pull Request

Дивіться [Посібник з розробки](https://docs.claude-mem-file.ai/development) для робочого процесу внеску.

---

## Ліцензія

Цей проєкт ліцензовано під **GNU Affero General Public License v3.0** (AGPL-3.0).

Авторське право (C) 2025 Alex Newman (@thedotmack). Всі права захищені.

Дивіться файл [LICENSE](LICENSE) для повних деталей.

**Що це означає:**

- Ви можете використовувати, модифікувати та поширювати це програмне забезпечення вільно
- Якщо ви модифікуєте та розгортаєте на мережевому сервері, ви повинні зробити свій вихідний код доступним
- Похідні роботи також повинні бути ліцензовані під AGPL-3.0
- Для цього програмного забезпечення НЕМАЄ ГАРАНТІЇ

**Примітка про Ragtime**: Каталог `ragtime/` ліцензовано окремо під **PolyForm Noncommercial License 1.0.0**. Дивіться [ragtime/LICENSE](ragtime/LICENSE) для деталей.

---

## Підтримка

- **Документація**: [docs/](docs/)
- **Проблеми**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Репозиторій**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Офіційний X акаунт**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Офіційний Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Автор**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Створено за допомогою Claude Agent SDK** | **Працює на Claude Code** | **Зроблено з TypeScript**

---

### Що з $CMEM?

$CMEM — це токен Solana, створений третьою стороною без попередньої згоди Claude-Mem-File, але офіційно схвалений творцем Claude-Mem-File (Alex Newman, @thedotmack). Токен діє як каталізатор росту спільноти та засіб для передачі даних агентів в реальному часі розробникам та фахівцям знань, які їх потребують. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
