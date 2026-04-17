🌐 זהו תרגום אוטומטי. תיקונים מהקהילה יתקבלו בברכה!

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
> **זהו fork של [claude-mem](https://github.com/thedotmack/claude-mem)** מאת [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> ה-fork הזה מחליף את התשתית האחסון SQLite/בינארית בגישה **קובצית בלבד**: כל הזיכרון מאוחסן כקבצי Markdown רגילים תחת `<project-root>/docs/vault/`, ניתן לגרסה מלא דרך git והשגה עם כל חברי הצוות. לא מסדי נתונים מקומיים, לא blob בינאריים — רק קבצים שאתה יכול לקרוא, לערוך, לבצע ולמזג.

<h4 align="center">claude-mem-file — מערכת דחיסת זיכרון מתמשך שנבנתה עבור <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#התחלה-מהירה">התחלה מהירה</a> •
  <a href="#איך-זה-עובד">איך זה עובד</a> •
  <a href="#כלי-חיפוש-mcp">כלי חיפוש</a> •
  <a href="#תיעוד">תיעוד</a> •
  <a href="#הגדרות">הגדרות</a> •
  <a href="#פתרון-בעיות">פתרון בעיות</a> •
  <a href="#רישיון">רישיון</a>
</p>

<p align="center">
  claude-mem-file משמר הקשר בצורה חלקה בין הפעלות על ידי לכידה אוטומטית של תצפיות על שימוש בכלים, יצירת סיכומים סמנטיים, ואחסון הכל כקובצי Markdown מגורסנים בתוך vault Obsidian-תואם לכל פרויקט ב-`<project-root>/docs/vault/` — ללא מסד נתונים SQLite, ללא blob בינאריים, ניתן למזג לחלוטין דרך git.
</p>

---

## התחלה מהירה

התקן בפקודה אחת:

```bash
npx claude-mem-file install
```

או התקן עבור Gemini CLI (זיהוי אוטומטי של `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

או התקן עבור OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

או התקן מחנות התוספים בתוך Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

הפעל מחדש את Claude Code או Gemini CLI. הקשר מהפעלות קודמות יופיע אוטומטית בהפעלות חדשות.

> **הערה:** claude-mem-file מפורסם גם ב-npm, אך `npm install -g claude-mem-file` מתקין **רק את SDK/הספרייה** — הוא לא רושם את hook התוספים או מגדיר את שירות העובד. תמיד התקן דרך `npx claude-mem-file install` או הפקודות `/plugin` למעלה.

### 🦞 OpenClaw Gateway

התקן את claude-mem-file כתוסף זיכרון מתמשך על שערי [OpenClaw](https://openclaw.ai) בפקודה אחת:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

המתקין מטפל בתלויות, הגדרת התוספים, הגדרת ספק AI, התחלת עובד, ועדכוני תצפיות בזמן אמת אופציוני ל-Telegram, Discord, Slack ועוד. ראה את [מדריך אינטגרציית OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) לפרטים.

**תכונות עיקריות:**

- 🧠 **זיכרון מתמשך** - הקשר שורד בין הפעלות
- 📁 **Markdown Vault (תואם Obsidian)** - תצפיות והפעלות מאוחסנות כקבצי `.md` תחת `<project-root>/docs/vault/`, ניתן לגרסה ומיזוג דרך git — לא SQLite, ללא מצב בינארי בסביבת פיתוח
- 📊 **גילוי מדורג** - אחזור זיכרון רב-שכבתי עם נראות עלות טוקנים
- 🔍 **חיפוש מבוסס-מיומנויות** - שאל את היסטוריית הפרויקט שלך עם מיומנות mem-search (מופעל על ידי `minisearch` בזיכרון על ה-vault)
- 🖥️ **ממשק צופה אינטרנט** - זרימת זיכרון בזמן אמת ב-http://localhost:37777
- 💻 **מיומנות Claude Desktop** - חפש זיכרון משיחות Claude Desktop
- 🔒 **בקרת פרטיות** - השתמש בתגיות `<private>` כדי להוציא תוכן רגיש מהאחסון
- ⚙️ **הגדרות הקשר** - בקרה מדויקת על איזה הקשר מוזרק
- 🤖 **פעולה אוטומטית** - אין צורך בהתערבות ידנית
- 🔗 **ציטוטים** - הפנה לתצפיות קודמות עם מזהים (גישה דרך http://localhost:37777/api/observation/{id} או צפה בהן בצופה האינטרנט ב-http://localhost:37777)
- 🧪 **ערוץ בטא** - נסה תכונות ניסיוניות כמו Endless Mode דרך החלפת גרסאות

## הגירה מ-SQLite (עדכני)

הרלוזות הקודמות אחסנו זיכרון ב-`~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). פריסת ה-vault החדשה מחליפה הכל בקובצי Markdown רגילים ב-`<project-root>/docs/vault/`. הזיכרונות הקודמים שלך לא אבדו — הרץ את סקריפט ההגירה פעם אחת:

```bash
# מתוך כל פרויקט שהשתמש בעבר ב-claude-mem-file:
npm run migrate-to-vault              # כותב docs/vault/ מה-DB העדכני
npm run migrate-to-vault:dry          # תצוגה מקדימה ללא כתיבה
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # נתיבים מפורשים
```

הסקריפט פותח את מסד הנתונים SQLite לקריאה בלבד והוא idempotent (כפילויות מתגלות דרך hash SHA-256, כך שהרצה חוזרת בטוחה). בצע את תיקייה `docs/vault/` המתקבלת לכל ריפו שלך כדי לשתף זיכרון עם הצוות שלך.

---

## תיעוד

📚 **[צפה בתיעוד המלא](https://docs.claude-mem-file.ai/)** - דפדף באתר הרשמי

### תחילת העבודה

- **[מדריך התקנה](https://docs.claude-mem-file.ai/installation)** - התחלה מהירה והתקנה מתקדמת
- **[הגדרת Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - מדריך ייעודי לאינטגרציית Gemini CLI של Google
- **[מדריך שימוש](https://docs.claude-mem-file.ai/usage/getting-started)** - איך claude-mem-file עובד אוטומטית
- **[כלי חיפוש](https://docs.claude-mem-file.ai/usage/search-tools)** - שאל את היסטוריית הפרויקט שלך בשפה טבעית
- **[תכונות בטא](https://docs.claude-mem-file.ai/beta-features)** - נסה תכונות ניסיוניות כמו Endless Mode

### שיטות מומלצות

- **[הנדסת הקשר](https://docs.claude-mem-file.ai/context-engineering)** - עקרונות אופטימיזציה של הקשר לסוכן AI
- **[גילוי מדורג](https://docs.claude-mem-file.ai/progressive-disclosure)** - הפילוסופיה מאחורי אסטרטגיית הכנת ההקשר של claude-mem-file

### ארכיטקטורה

- **[סקירה כללית](https://docs.claude-mem-file.ai/architecture/overview)** - רכיבי המערכת וזרימת הנתונים
- **[התפתחות הארכיטקטורה](https://docs.claude-mem-file.ai/architecture-evolution)** - המסע מגרסה 3 לגרסה 5
- **[ארכיטקטורת Hooks](https://docs.claude-mem-file.ai/hooks-architecture)** - איך claude-mem-file משתמש ב-lifecycle hooks
- **[הפניית Hooks](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 סקריפטי hook מוסברים
- **[שירות Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API וניהול Bun
- **[Docs Vault](docs/)** - Vault Markdown בסגנון Obsidian לידע פרויקט משותף

### הגדרות ופיתוח

- **[הגדרות](https://docs.claude-mem-file.ai/configuration)** - משתני סביבה והגדרות
- **[פיתוח](https://docs.claude-mem-file.ai/development)** - בנייה, בדיקה, תרומה
- **[פתרון בעיות](https://docs.claude-mem-file.ai/troubleshooting)** - בעיות נפוצות ופתרונות

---

## איך זה עובד

**רכיבי ליבה:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 סקריפטי hook)
2. **התקנה חכמה** - בודק תלויות עם מטמון (סקריפט pre-hook, לא lifecycle hook)
3. **שירות Worker** - HTTP API על פורט 37777 עם ממשק צופה אינטרנט ו-10 נקודות קצה לחיפוש, מנוהל על ידי Bun
4. **Docs Vault** (`docs/`) - Vault Markdown בסגנון Obsidian מובטח בריפו; המקור האמת המשותף לכל ההחלטות הארכיטקטוריות, הקשר והידע בחזות הפעלות וחברי צוות
5. **מיומנות mem-search** - שאילתות בשפה טבעית עם גילוי מדורג

ראה [סקירה כללית של הארכיטקטורה](https://docs.claude-mem-file.ai/architecture/overview) לפרטים.

---

## כלי חיפוש MCP

claude-mem-file מספק חיפוש זיכרון אינטליגנטי דרך **4 כלים MCP** בעקבות דפוס זרימת עבודה יעיל **3-שכבתי**:

**זרימת העבודה 3-שכבתית:**

1. **`search`** - קבל אינדקס קומפקטי עם מזהים (~50-100 טוקנים/תוצאה)
2. **`timeline`** - קבל הקשר כרונולוגי סביב תוצאות מעניינות
3. **`get_observations`** - הבא פרטים מלאים ONLY עבור מזהים מסוננים (~500-1,000 טוקנים/תוצאה)

**איך זה עובד:**

- Claude משתמש בכלים MCP כדי לחפש את הזיכרון שלך
- התחל ב-`search` כדי לקבל אינדקס של תוצאות
- השתמש ב-`timeline` כדי לראות מה קרה סביב תצפיות ספציפיות
- השתמש ב-`get_observations` כדי להביא פרטים מלאים עבור מזהים רלוונטיים
- **חיסכון של ~10 כפול בטוקנים** על ידי סינון לפני הבאת פרטים

**כלים MCP זמינים:**

1. **`search`** - חפש אינדקס זיכרון עם שאילתות טקסט מלא, סנן לפי סוג/תאריך/פרויקט
2. **`timeline`** - קבל הקשר כרונולוגי סביב תצפית ספציפית או שאילתה
3. **`get_observations`** - הבא פרטי תצפית מלאים לפי מזהים (תמיד באצווה מזהים מרובים)

**דוגמה שימוש:**

```typescript
// שלב 1: חפש אינדקס
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// שלב 2: בדוק אינדקס, זהה מזהים רלוונטיים (למשל, #123, #456)

// שלב 3: הבא פרטים מלאים
get_observations((ids = [123, 456]));
```

ראה את [מדריך כלי חיפוש](https://docs.claude-mem-file.ai/usage/search-tools) לדוגמאות מפורטות.

---

## תכונות בטא

claude-mem-file מציע **ערוץ בטא** עם תכונות ניסיוניות כמו **Endless Mode** (ארכיטקטורת זיכרון ביומימטית להפעלות מורחבות). החלף בין גרסאות יציבות ובטא מממשק הצופה האינטרנט ב-http://localhost:37777 → Settings.

ראה את **[תיעוד תכונות בטא](https://docs.claude-mem-file.ai/beta-features)** לפרטים על Endless Mode ואיך לנסות אותו.

---

## דרישות המערכת

- **Node.js**: 18.0.0 או גבוה יותר
- **Claude Code**: גרסה אחרונה עם תמיכה בתוספים
- **Bun**: סביבת ריצה ומנהל תהליכים של JavaScript (מותקן אוטומטית אם חסר)

---

### הערות הגדרה ל-Windows

אם ראית שגיאה כמו:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

ודא שהתקנת Node.js ו-npm והוסיפו אותם ל-PATH שלך. הורד את מתקין Node.js האחרון מ-https://nodejs.org ואתחל מחדש את הטרמינל שלך לאחר ההתקנה.

---

## הגדרות

ההגדרות מנוהלות ב-`~/.claude-mem-file/settings.json` (נוצר אוטומטית עם ברירות מחדל בהפעלה הראשונה). הגדר מודל AI, פורט worker, ספריית נתונים, רמת לוג, והגדרות הזרקת הקשר.

ראה את **[מדריך הגדרות](https://docs.claude-mem-file.ai/configuration)** לכל ההגדרות הזמינות ודוגמאות.

### הגדרות מצב ושפה

claude-mem-file תומך במצבי זרימת עבודה מרובים ובשפות דרך הגדרת `CLAUDE_MEM_MODE`.

אפשרות זו שולטת ב:

- התנהגות זרימת העבודה (למשל קוד, chill, חקירה)
- השפה שהשתמשה בתצפיות שנוצרו

#### איך להגדיר

ערוך את קובץ ההגדרות שלך ב-`~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

מצבים מוגדרים ב-`plugin/modes/`. כדי לראות את כל המצבים הזמינים מקומי:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### מצבים זמינים

| מצב        | תיאור             |
| ---------- | ----------------- |
| `code`     | מצב אנגלית ברירת מחדל |
| `code--zh` | מצב סינית מפושטת |
| `code--ja` | מצב יפני           |

מצבים ספציפיים לשפה עוקבים אחרי הדפוס `code--[lang]` כאשר `[lang]` הוא קוד ISO 639-1 של השפה (למשל, `zh` עבור סינית, `ja` עבור יפנית, `es` עבור ספרדית).

> הערה: `code--zh` (סינית מפושטת) כבר בנוי — לא נדרשת התקנה נוספת או עדכון תוספן.

#### לאחר שינוי מצב

## הפעל מחדש את Claude Code כדי להחיל את הגדרת המצב החדשה.

## פיתוח

ראה את **[מדריך פיתוח](https://docs.claude-mem-file.ai/development)** להוראות בנייה, בדיקה, וזרימת עבודה של תרומה.

---

## פתרון בעיות

אם אתה נתקל בבעיות, תאר את הבעיה ל-Claude ומיומנות troubleshoot תאבחן אוטומטית ותספק תיקונים.

ראה את **[מדריך פתרון בעיות](https://docs.claude-mem-file.ai/troubleshooting)** לבעיות נפוצות ופתרונות.

---

## דיווחי באגים

צור דיווחי באגים מקיפים עם המחולל האוטומטי:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## תרומה

תרומות מתקבלות בברכה! אנא:

1. עשה Fork למאגר
2. צור ענף תכונה
3. בצע את השינויים שלך עם בדיקות
4. עדכן תיעוד
5. שלח Pull Request

ראה את [מדריך פיתוח](https://docs.claude-mem-file.ai/development) לזרימת עבודה של תרומה.

---

## רישיון

פרויקט זה מורשה תחת **GNU Affero General Public License v3.0** (AGPL-3.0).

זכויות יוצרים (C) 2025 Alex Newman (@thedotmack). כל הזכויות שמורות.

ראה את קובץ [LICENSE](LICENSE) לפרטים מלאים.

**משמעות הדבר:**

- אתה יכול להשתמש, לשנות ולהפיץ תוכנה זו בחופשיות
- אם אתה משנה ומפרסם על שרת רשת, עליך להנגיש את קוד המקור שלך
- יצירות נגזרות חייבות להיות מורשות גם תחת AGPL-3.0
- אין אחריות לתוכנה זו

**הערה על Ragtime**: תיקיית `ragtime/` מורשית בנפרד תחת **PolyForm Noncommercial License 1.0.0**. ראה את [ragtime/LICENSE](ragtime/LICENSE) לפרטים.

---

## תמיכה

- **תיעוד**: [docs/](docs/)
- **בעיות**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **מאגר**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **חשבון X רשמי**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord רשמי**: [הצטרף ל-Discord](https://discord.com/invite/J4wttp9vDu)
- **מחבר**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**בנוי עם Claude Agent SDK** | **מופעל על ידי Claude Code** | **נעשה עם TypeScript**

---

### מה עם $CMEM?

$CMEM הוא טוקן Solana שנוצר על ידי צד שלישי ללא הסכמתו הקודמת של claude-mem-file, אך אומץ בפורמט על ידי יוצר claude-mem-file (Alex Newman, @thedotmack). הטוקן משמש כקטליזטור קהילה לגדילה וכרכב להבאת נתוני סוכן בזמן אמת למפתחים ובעלי ידע שזקוקים להם ביותר. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
