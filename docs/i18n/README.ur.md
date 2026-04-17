🌐 یہ خودکار ترجمہ ہے۔ کمیونٹی کی اصلاحات کا خیر مقدم ہے!

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
> **یہ [claude-mem](https://github.com/thedotmack/claude-mem) کا فارک ہے** [Alex Newman (@thedotmack)](https://github.com/thedotmack) کی طرف سے۔
>
> یہ فارک SQLite/بائنری اسٹوریج بیک اینڈ کو **فائل سسٹم کے ساتھ بدل دیتا ہے**: تمام میموری `<project-root>/docs/vault/` کے تحت سادہ Markdown فائلوں کے طور پر محفوظ ہے، git کے ذریعے مکمل طور پر ورژن کے قابل اور آپ کی ٹیم کے ہر رکن کے ساتھ قابلِ اشتراک۔ کوئی مقامی ڈیٹا بیسز نہیں، کوئی بائنری بلاب نہیں — صرف فائلیں جو آپ پڑھ، ترمیم، کمٹ اور merge کر سکتے ہیں۔

<h4 align="center"><a href="https://claude.com/claude-code" target="_blank">Claude Code</a> کے لیے بنایا گیا مستقل میموری کمپریشن سسٹم۔</h4>

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
  <a href="#تیز-رفتار-شروعات">تیز رفتار شروعات</a> •
  <a href="#یہ-کیسے-کام-کرتا-ہے">یہ کیسے کام کرتا ہے</a> •
  <a href="#mcp-تلاش-کے-اوزار">تلاش کے اوزار</a> •
  <a href="#دستاویزات">دستاویزات</a> •
  <a href="#ترتیبات">ترتیبات</a> •
  <a href="#مسائل-کی-تشخیص">مسائل کی تشخیص</a> •
  <a href="#لائسنس">لائسنس</a>
</p>

<p align="center">
  Claude-Mem-File سیشنز میں تناسب کو بغیر کسی رکاوٹ کے محفوظ کرتا ہے اور ٹول کے استعمال کے بعد کے مشاہدات کو کیپچر کرتا ہے، سیمانٹک خلاصے تیار کرتا ہے، اور <code>&lt;project-root&gt;/docs/vault/</code> میں ورژن شدہ Markdown کے طور پر ہر منصوبے کے Obsidian-compatible vault میں سب کچھ محفوظ کرتا ہے — کوئی SQLite ڈیٹا بیس نہیں، کوئی بائنری بلاب نہیں، git کے ذریعے مکمل طور پر mergeable۔
</p>

---

## تیز رفتار شروعات

ایک کمانڈ کے ساتھ انسٹال کریں:

```bash
npx claude-mem-file install
```

یا Gemini CLI کے لیے انسٹال کریں (خودکار طور پر `~/.gemini` کو شناخت کرتا ہے):

```bash
npx claude-mem-file install --ide gemini-cli
```

یا OpenCode کے لیے انسٹال کریں:

```bash
npx claude-mem-file install --ide opencode
```

یا Claude Code کے اندر پلگ ان مارکیٹ پلیس سے انسٹال کریں:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Claude Code یا Gemini CLI کو دوبارہ شروع کریں۔ پچھلے سیشنز سے تناسب خودکار طور پر نئے سیشنز میں نظر آئے گا۔

> **نوٹ:** Claude-Mem-File npm پر بھی شائع ہے، لیکن `npm install -g claude-mem-file` صرف **SDK/لائبریری** انسٹال کرتا ہے — یہ پلگ ان ہکس رجسٹر نہیں کرتا یا ورکر سروس سیٹ اپ نہیں کرتا۔ ہمیشہ `npx claude-mem-file install` یا اوپر دی گئی `/plugin` کمانڈز کے ذریعے انسٹال کریں۔

### 🦞 OpenClaw Gateway

ایک کمانڈ کے ساتھ [OpenClaw](https://openclaw.ai) gateways پر claude-mem-file کو مستقل میموری پلگ ان کے طور پر انسٹال کریں:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

انسٹالر منحصرات، پلگ ان سیٹ اپ، AI فراہم کار کی ترتیبات، ورکر کی شروعات، اور Telegram، Discord، Slack وغیرہ میں حقیقی وقت کے مشاہدات کے feeds کو ہینڈل کرتا ہے۔ تفصیلات کے لیے [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) دیکھیں۔

**اہم خصوصیات:**

- 🧠 **مستقل میموری** - تناسب سیشنز میں برقرار رہتا ہے
- 📁 **Markdown Vault (Obsidian-compatible)** - مشاہدات اور سیشنز `<project-root>/docs/vault/` کے تحت `.md` فائلوں کے طور پر محفوظ ہیں، git کے ذریعے ورژن شدہ اور mergeable — کوئی SQLite نہیں، ڈیو مشینز پر کوئی بائنری state نہیں
- 📊 **بتدریج ظہور** - لیئرڈ میموری کی بازیافت ٹوکن کی لاگت کی نمائندگی کے ساتھ
- 🔍 **مہارت پر مبنی تلاش** - mem-search مہارت کے ساتھ اپنے منصوبے کی تاریخ میں تلاش کریں (vault کے اوپر `minisearch` سے طاقت ور)
- 🖥️ **ویب ویور UI** - http://localhost:37777 پر حقیقی وقت میموری اسٹریم
- 💻 **Claude Desktop مہارت** - Claude Desktop بات چیت سے میموری تلاش کریں
- 🔒 **رازداری کنٹرول** - حساس مواد کو اسٹوریج سے خارج کرنے کے لیے `<private>` ٹیگز استعمال کریں
- ⚙️ **تناسب کی ترتیبات** - کون سا تناسب انجیکٹ کیا جائے اس پر باریک کنٹرول
- 🤖 **خودکار آپریشن** - کسی دستی مداخلت کی ضرورت نہیں
- 🔗 **حوالہ جات** - IDs کے ساتھ ماضی کے مشاہدات کا حوالہ دیں (http://localhost:37777/api/observation/{id} کے ذریعے رسائی یا تمام کو http://localhost:37777 پر ویب ویور میں دیکھیں)
- 🧪 **بیٹا چینل** - ورژن تبدیل کرنے کے ذریعے Endless Mode جیسی تجرباتی خصوصیات آزمائیں

## SQLite سے منتقلی (وراثت)

پہلی رہائیوں میں میموری `~/.claude-mem-file/claude-mem-file.db` میں محفوظ تھی (SQLite + FTS5 + ChromaDB)۔ نیا vault layout ان سب کو `<project-root>/docs/vault/` میں سادہ Markdown کے ساتھ بدل دیتا ہے۔ آپ کے پہلے کے میموری ضائع نہیں ہیں — منتقلی اسکرپٹ کو ایک بار چلائیں:

```bash
# کسی بھی منصوبے کے اندر جو پہلے claude-mem-file استعمال کرتا تھا:
npm run migrate-to-vault              # legacy DB سے docs/vault/ لکھتا ہے
npm run migrate-to-vault:dry          # لکھنے کے بغیر پریویو
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # واضح پاتھز
```

اسکرپٹ SQLite ڈیٹا بیس کو read-only کھولتا ہے اور idempotent ہے (نقلیں SHA-256 مواد ہیش کے ذریعے شناخت کی جاتی ہیں، تو دوبارہ چلانا محفوظ ہے)۔ نتیجے میں آنے والے `docs/vault/` فولڈر کو اپنے repo میں commit کریں تاکہ میموری اپنی ٹیم کے ساتھ شیئر کریں۔

---

## دستاویزات

📚 **[مکمل دستاویزات دیکھیں](https://docs.claude-mem-file.ai/)** - سرکاری ویب سائٹ پر براؤز کریں

### شروعات کرنا

- **[انسٹالیشن گائیڈ](https://docs.claude-mem-file.ai/installation)** - تیز رفتار شروعات اور اعلیٰ درجے کی انسٹالیشن
- **[Gemini CLI سیٹ اپ](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google کے Gemini CLI انضمام کے لیے وقف گائیڈ
- **[استعمال گائیڈ](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-File خودکار طور پر کیسے کام کرتا ہے
- **[تلاش کے اوزار](https://docs.claude-mem-file.ai/usage/search-tools)** - قدرتی زبان سے اپنے منصوبے کی تاریخ میں تلاش کریں
- **[بیٹا خصوصیات](https://docs.claude-mem-file.ai/beta-features)** - Endless Mode جیسی تجرباتی خصوصیات آزمائیں

### بہترین طریقہ کار

- **[تناسب انجینیئرنگ](https://docs.claude-mem-file.ai/context-engineering)** - AI ایجنٹ تناسب کی اہمیت کے اصول
- **[بتدریج ظہور](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-File کی تناسب کی تیاری کی حکمت عملی کے پیچھے فلسفہ

### تعمیر

- **[جائزہ](https://docs.claude-mem-file.ai/architecture/overview)** - نظام کے اجزاء اور ڈیٹا کے بہاؤ
- **[تعمیر کا ارتقاء](https://docs.claude-mem-file.ai/architecture-evolution)** - v3 سے v5 تک کا سفر
- **[ہکس تعمیر](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-File lifecycle hooks کا استعمال کیسے کرتا ہے
- **[ہکس حوالہ](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 ہک اسکرپٹس کی تشریح
- **[ورکر سروس](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API اور Bun management
- **[Docs Vault](docs/)** - Obsidian-style Markdown vault منصوبے کے مشترکہ علم کے لیے

### ترتیبات اور ترقی

- **[ترتیبات](https://docs.claude-mem-file.ai/configuration)** - ماحول کے متغیرات اور سیٹنگز
- **[ترقی](https://docs.claude-mem-file.ai/development)** - تعمیر، جانچ، حصہ داری
- **[مسائل کی تشخیص](https://docs.claude-mem-file.ai/troubleshooting)** - عام مسائل اور حل

---

## یہ کیسے کام کرتا ہے

**بنیادی اجزاء:**

1. **5 Lifecycle Hooks** - SessionStart، UserPromptSubmit، PostToolUse، Stop، SessionEnd (6 ہک اسکرپٹس)
2. **Smart Install** - کیشڈ منحصرات چیکر (pre-hook اسکرپٹ، lifecycle hook نہیں)
3. **ورکر سروس** - ویب ویور UI اور 10 تلاش endpoints کے ساتھ پورٹ 37777 پر HTTP API، Bun سے منظم
4. **Docs Vault** (`docs/`) - Obsidian-style Markdown vault repository میں commit شدہ؛ تمام تعمیری فیصلوں، تناسب، اور علم کے لیے سیشنز اور تعاون کاروں میں مشترکہ source of truth
5. **mem-search مہارت** - بتدریج ظہور کے ساتھ قدرتی زبان کے سوالات

تفصیلات کے لیے [Architecture Overview](https://docs.claude-mem-file.ai/architecture/overview) دیکھیں۔

---

## MCP تلاش کے اوزار

Claude-Mem-File ٹوکن سے بچاتے ہوئے **3-لیئر ورک فلو پیٹرن** کی پیروی کرتے ہوئے **4 MCP اوزار** کے ذریعے ذہین میموری تلاش فراہم کرتا ہے:

**3-لیئر ورک فلو:**

1. **`search`** - IDs کے ساتھ کمپیکٹ انڈیکس حاصل کریں (~50-100 ٹوکن/نتیجہ)
2. **`timeline`** - دلچسپ نتائج کے آس پاس زمانی تناسب حاصل کریں
3. **`get_observations`** - فلٹر شدہ IDs کے لیے صرف مکمل تفصیلات حاصل کریں (~500-1,000 ٹوکن/نتیجہ)

**یہ کیسے کام کرتا ہے:**

- Claude آپ کی میموری میں تلاش کے لیے MCP اوزار استعمال کرتا ہے
- نتائج کے انڈیکس حاصل کرنے کے لیے `search` سے شروع کریں
- مخصوص مشاہدات کے آس پاس کیا ہو رہا تھا دیکھنے کے لیے `timeline` استعمال کریں
- متعلقہ IDs کے لیے مکمل تفصیلات حاصل کرنے کے لیے `get_observations` استعمال کریں
- تفصیلات حاصل کرنے سے پہلے فلٹرنگ سے **~10x ٹوکن کی بچت**

**دستیاب MCP اوزار:**

1. **`search`** - مکمل متن کی تلاش کے سوالات کے ساتھ میموری انڈیکس تلاش کریں، قسم/تاریخ/منصوبے کے لحاظ سے فلٹر کریں
2. **`timeline`** - مخصوص مشاہدہ یا سوال کے آس پاس زمانی تناسب حاصل کریں
3. **`get_observations`** - IDs کے ذریعے مکمل مشاہدہ کی تفصیلات حاصل کریں (ہمیشہ متعدد IDs کو بیچ کریں)

**استعمال کی مثال:**

```typescript
// مرحلہ 1: انڈیکس کے لیے تلاش کریں
search(query = 'authentication bug', type = 'bugfix', limit = 10);

// مرحلہ 2: انڈیکس کا جائزہ لیں، متعلقہ IDs کی شناخت کریں (جیسے، #123، #456)

// مرحلہ 3: مکمل تفصیلات حاصل کریں
get_observations(ids = [123, 456]);
```

تفصیلی مثالوں کے لیے [Search Tools Guide](https://docs.claude-mem-file.ai/usage/search-tools) دیکھیں۔

---

## بیٹا خصوصیات

Claude-Mem-File ایک **بیٹا چینل** فراہم کرتا ہے جس میں **Endless Mode** جیسی تجرباتی خصوصیات ہیں (لمبے سیشنز کے لیے biomimetic میموری کی تعمیر)۔ http://localhost:37777 → Settings میں ویب ویور UI سے مستحکم اور بیٹا ورژنز کے درمیان سوئچ کریں۔

Endless Mode اور اسے کیسے آزمائیں اس کی تفصیلات کے لیے **[Beta Features Documentation](https://docs.claude-mem-file.ai/beta-features)** دیکھیں۔

---

## نظام کی ضروریات

- **Node.js**: 18.0.0 یا اس سے اوپر
- **Claude Code**: پلگ ان سپورٹ کے ساتھ جدید ترین ورژن
- **Bun**: JavaScript رن ٹائم اور پروسیس مینیجر (غیر موجود ہو تو خودکار طور پر انسٹال ہوگا)

---

### Windows سیٹ اپ نوٹس

اگر آپ کو یہ خرابی نظر آئے:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

یقینی بنائیں کہ Node.js اور npm انسٹال ہیں اور آپ کے PATH میں شامل ہیں۔ https://nodejs.org سے جدید ترین Node.js انسٹالر ڈاؤن نلوڈ کریں اور انسٹالیشن کے بعد اپنے ٹرمنل کو دوبارہ شروع کریں۔

---

## ترتیبات

سیٹنگز `~/.claude-mem-file/settings.json` میں منظم ہیں (پہلی رن میں ڈیفالٹ کے ساتھ خودکار طور پر بنائی جاتی ہے)۔ AI ماڈل، ورکر پورٹ، ڈیٹا ڈائریکٹری، لاگ لیول، اور تناسب انجیکشن سیٹنگز کی ترتیبات دیں۔

تمام دستیاب سیٹنگز اور مثالوں کے لیے **[Configuration Guide](https://docs.claude-mem-file.ai/configuration)** دیکھیں۔

### موڈ اور زبان کی ترتیب

Claude-Mem-File `CLAUDE_MEM_MODE` سیٹنگ کے ذریعے متعدد ورک فلو موڈز اور زبانوں کو سپورٹ کرتا ہے۔

یہ آپشن دونوں کو کنٹرول کرتا ہے:

- ورک فلو کا رویہ (جیسے کوڈ، آرام، تحقیق)
- تیار کیے گئے مشاہدات میں استعمال شدہ زبان

#### کیسے ترتیب دیں

`~/.claude-mem-file/settings.json` میں اپنی سیٹنگز فائل میں ترمیم کریں:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

موڈز `plugin/modes/` میں متعین ہیں۔ تمام دستیاب موڈز کو مقامی طور پر دیکھنے کے لیے:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### دستیاب موڈز

| موڈ       | تفصیل             |
| ---------- | ----------------------- |
| `code`     | ڈیفالٹ انگریزی موڈ    |
| `code--zh` | سادہ چینی موڈ |
| `code--ja` | جاپانی موڈ           |

زبان سے مخصوص موڈز `code--[lang]` پیٹرن کی پیروی کرتے ہیں جہاں `[lang]` ISO 639-1 زبان کوڈ ہے (مثلاً، چینی کے لیے `zh`، جاپانی کے لیے `ja`، اسپانوی کے لیے `es`)۔

> نوٹ: `code--zh` (سادہ چینی) پہلے سے بنا ہوا ہے — کوئی اضافی انسٹالیشن یا پلگ ان اپڈیٹ کی ضرورت نہیں۔

#### موڈ تبدیل کرنے کے بعد

Claude Code کو دوبارہ شروع کریں تاکہ نیا موڈ ترتیب لاگو ہو۔

## ترقی

تعمیر کی ہدایات، جانچ، اور حصہ داری کے ورک فلو کے لیے **[Development Guide](https://docs.claude-mem-file.ai/development)** دیکھیں۔

---

## مسائل کی تشخیص

اگر مسائل کا سامنا ہو تو مسئلہ Claude کو بتائیں اور troubleshoot مہارت خودکار طور پر تشخیص دے گی اور حل فراہم کرے گی۔

عام مسائل اور حل کے لیے **[Troubleshooting Guide](https://docs.claude-mem-file.ai/troubleshooting)** دیکھیں۔

---

## خرابی کی رپورٹ

خودکار جنریٹر کے ساتھ جامع خرابی کی رپورٹ بنائیں:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## حصہ داری

حصہ داری کا خیر مقدم ہے! براہ کرم:

1. رپوزیٹری کو fork کریں
2. ایک خصوصیت کی برانچ بنائیں
3. ٹیسٹ کے ساتھ اپنی تبدیلیاں کریں
4. دستاویزات کو اپڈیٹ کریں
5. ایک Pull Request جمع کریں

حصہ داری کے ورک فلو کے لیے [Development Guide](https://docs.claude-mem-file.ai/development) دیکھیں۔

---

## لائسنس

یہ منصوبہ **GNU Affero General Public License v3.0** (AGPL-3.0) کے تحت لائسنس ہے۔

Copyright (C) 2025 Alex Newman (@thedotmack)۔ تمام حقوق محفوظ ہیں۔

مکمل تفصیلات کے لیے [LICENSE](LICENSE) فائل دیکھیں۔

**اس کا مطلب کیا ہے:**

- آپ یہ سافٹ ویئر آزادی سے استعمال، ترمیم، اور تقسیم کر سکتے ہیں
- اگر آپ اسے ترمیم کریں اور نیٹ ورک سرور پر تعینات کریں تو آپ کو اپنا source code دستیاب کرنا ہوگا
- مشتق کام بھی AGPL-3.0 کے تحت لائسنس ہونے چاہیں
- اس سافٹ ویئر کے لیے کوئی وارنٹی نہیں

**Ragtime کے بارے میں نوٹ**: `ragtime/` ڈائریکٹری الگ سے **PolyForm Noncommercial License 1.0.0** کے تحت لائسنس ہے۔ تفصیلات کے لیے [ragtime/LICENSE](ragtime/LICENSE) دیکھیں۔

---

## معاونت

- **دستاویزات**: [docs/](docs/)
- **مسائل**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **رپوزیٹری**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **سرکاری X اکاؤنٹ**: [@Claude_Memory](https://x.com/Claude_Memory)
- **سرکاری Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **مصنف**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Claude Agent SDK کے ساتھ بنایا گیا** | **Claude Code سے طاقت ور** | **TypeScript کے ساتھ بنایا گیا**

---

### $CMEM کے بارے میں کیا ہے؟

$CMEM ایک Solana ٹوکن ہے جو کسی تیسری فریق کے ذریعے Claude-Mem-File کی پہلے سے اطلاع کے بغیر بنایا گیا تھا، لیکن Claude-Mem-File کے خالق (Alex Newman، @thedotmack) کے ذریعے سرکاری طور پر قبول کیا گیا۔ یہ ٹوکن کمیونٹی کی ترقی کے لیے ایک محرک اور developers اور علم کار کے لیے حقیقی وقت کے agent ڈیٹا لانے کا ایک گاڑی ہے جو اسے سب سے زیادہ چاہتے ہیں۔ $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
