🌐 هذه ترجمة آلية. تصحيحات المجتمع مرحب بها!

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
> **هذا فرع من [claude-mem](https://github.com/thedotmack/claude-mem)** بواسطة [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> يستبدل هذا الفرع خلفية تخزين SQLite/الثنائية برهج **يعتمد على نظام الملفات فقط**: يتم تخزين جميع الذاكرة كملفات Markdown عادية تحت `<project-root>/docs/vault/`، وقابلة للإصدار بالكامل عبر git وقابلة للمشاركة مع كل عضو في فريقك. لا قواعد بيانات محلية، لا نقوش ثنائية — فقط الملفات التي يمكنك قراءتها وتعديلها والالتزام بها ودمجها.

<h4 align="center">claude-mem-file — نظام ضغط الذاكرة المستمر المبني لـ <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#البداية-السريعة">البداية السريعة</a> •
  <a href="#كيف-يعمل">كيف يعمل</a> •
  <a href="#أدوات-البحث-mcp">أدوات البحث</a> •
  <a href="#التوثيق">التوثيق</a> •
  <a href="#الإعدادات">الإعدادات</a> •
  <a href="#استكشاف-الأخطاء-وإصلاحها">استكشاف الأخطاء وإصلاحها</a> •
  <a href="#الترخيص">الترخيص</a>
</p>

<p align="center">
يحافظ Claude-Mem-File بسلاسة على السياق عبر الجلسات بالتقاط ملاحظات استخدام الأدوات، وإنشاء ملخصات دلالية، وتخزين كل شيء كـ Markdown مرقم داخل قبو Obsidian متوافق لكل مشروع في `<project-root>/docs/vault/` — بدون قاعدة بيانات SQLite، بدون نقوش ثنائية، قابل للدمج بالكامل عبر git.
</p>

---

## البداية السريعة

ثبّت بأمر واحد:

```bash
npx claude-mem-file install
```

أو ثبّت لـ Gemini CLI (كشف تلقائي لـ `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

أو ثبّت لـ OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

أو ثبّت من سوق المكونات الإضافية داخل Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

أعد تشغيل Claude Code أو Gemini CLI. سيظهر السياق من الجلسات السابقة تلقائياً في الجلسات الجديدة.

> **ملاحظة:** Claude-Mem-File منشور أيضاً على npm، لكن `npm install -g claude-mem-file` يثبّت فقط **مكتبة SDK** — لا يسجل خطافات المكونات الإضافية أو ينشئ خدمة العامل. ثبّت دائماً عبر `npx claude-mem-file install` أو أوامر `/plugin` أعلاه.

### 🦞 بوابة OpenClaw

ثبّت claude-mem-file كمكون إضافي للذاكرة المستمرة على بوابات [OpenClaw](https://openclaw.ai) بأمر واحد:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

يتعامل المثبِّت مع التبعيات، إعداد المكونات الإضافية، إعدادات مزود الذكاء الاصطناعي، بدء العامل، وخلاصات الملاحظات في الوقت الفعلي إلى Telegram و Discord و Slack والمزيد. انظر [دليل تكامل OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) للتفاصيل.

**المزايا الرئيسية:**

- 🧠 **ذاكرة مستمرة** - السياق ينجو عبر الجلسات
- 📁 **قبو Markdown (متوافق مع Obsidian)** - الملاحظات والجلسات مخزنة كملفات `.md` تحت `<project-root>/docs/vault/`، قابلة للإصدار والدمج عبر git — بدون SQLite، بدون حالة ثنائية على آلات التطوير
- 📊 **الكشف التدريجي** - استرجاع الذاكرة المطبق على طبقات برؤية تكلفة الرموز
- 🔍 **بحث مبني على المهارات** - استعلم عن سجل مشروعك باستخدام مهارة mem-search (مدعومة بـ `minisearch` في الذاكرة على القبو)
- 🖥️ **واجهة مستخدم Web Viewer** - تدفق الذاكرة في الوقت الفعلي في http://localhost:37777
- 💻 **مهارة Claude Desktop** - ابحث عن الذاكرة من محادثات Claude Desktop
- 🔒 **التحكم في الخصوصية** - استخدم علامات `<private>` لاستبعاد المحتوى الحساس من التخزين
- ⚙️ **إعدادات السياق** - تحكم دقيق على ما يتم حقنه من السياق
- 🤖 **التشغيل التلقائي** - لا تدخل يدوي مطلوب
- 🔗 **الاستشهادات** - اشر إلى الملاحظات السابقة برقم معرّف (access via http://localhost:37777/api/observation/{id} or view all in the web viewer at http://localhost:37777)
- 🧪 **قناة بيتا** - جرّب الميزات التجريبية مثل Endless Mode عبر تبديل الإصدار

## الهجرة من SQLite (قديم)

خزنت الإصدارات السابقة الذاكرة في `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). يستبدل التخطيط الجديد كل هذا بـ Markdown عادي في `<project-root>/docs/vault/`. لم تضع ذاكرتك السابقة — شغّل سكريبت الهجرة مرة واحدة:

```bash
# من داخل أي مشروع استخدم claude-mem-file سابقاً:
npm run migrate-to-vault              # يكتب docs/vault/ من قاعدة البيانات القديمة
npm run migrate-to-vault:dry          # معاينة بدون كتابة
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # مسارات صريحة
```

يفتح السكريبت قاعدة بيانات SQLite للقراءة فقط وهو سائمي (يتم اكتشاف النسخ المكررة عبر تجزئات محتوى SHA-256، لذا إعادة التشغيل آمنة). التزم مجلد `docs/vault/` الناتج لمشاركة الذاكرة مع فريقك.

---

## التوثيق

📚 **[عرض التوثيق الكامل](https://docs.claude-mem-file.ai/)** - تصفح الموقع الرسمي

### البدء

- **[دليل التثبيت](https://docs.claude-mem-file.ai/installation)** - البدء السريع والتثبيت المتقدم
- **[إعداد Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - دليل مخصص لتكامل Google Gemini CLI
- **[دليل الاستخدام](https://docs.claude-mem-file.ai/usage/getting-started)** - كيف يعمل Claude-Mem-File تلقائياً
- **[أدوات البحث](https://docs.claude-mem-file.ai/usage/search-tools)** - استعلم عن سجل مشروعك باللغة الطبيعية
- **[ميزات بيتا](https://docs.claude-mem-file.ai/beta-features)** - جرّب ميزات تجريبية مثل Endless Mode

### أفضل الممارسات

- **[هندسة السياق](https://docs.claude-mem-file.ai/context-engineering)** - مبادئ تحسين سياق وكيل الذكاء الاصطناعي
- **[الكشف التدريجي](https://docs.claude-mem-file.ai/progressive-disclosure)** - الفلسفة وراء استراتيجية تهيئة السياق في Claude-Mem-File

### البنية المعمارية

- **[نظرة عامة](https://docs.claude-mem-file.ai/architecture/overview)** - مكونات النظام وتدفق البيانات
- **[تطور البنية المعمارية](https://docs.claude-mem-file.ai/architecture-evolution)** - الرحلة من v3 إلى v5
- **[بنية الخطافات](https://docs.claude-mem-file.ai/hooks-architecture)** - كيف يستخدم Claude-Mem-File خطافات دورة الحياة
- **[مرجع الخطافات](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 سكريبتات خطافات مشروحة
- **[خدمة العامل](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API وإدارة Bun
- **[قبو الوثائق](docs/)** - قبو Markdown على طراز Obsidian للمعرفة المشتركة للمشروع

### الإعدادات والتطوير

- **[الإعدادات](https://docs.claude-mem-file.ai/configuration)** - متغيرات البيئة والإعدادات
- **[التطوير](https://docs.claude-mem-file.ai/development)** - تعليمات البناء والاختبار والمساهمة
- **[استكشاف الأخطاء وإصلاحها](https://docs.claude-mem-file.ai/troubleshooting)** - المشكلات الشائعة والحلول

---

## كيف يعمل

**المكونات الأساسية:**

1. **5 خطافات دورة الحياة** - SessionStart و UserPromptSubmit و PostToolUse و Stop و SessionEnd (6 سكريبتات خطافات)
2. **التثبيت الذكي** - فاحص التبعيات المخزن مؤقتاً (سكريبت ما قبل الخطاف، وليس خطاف دورة حياة)
3. **خدمة العامل** - HTTP API على المنفذ 37777 مع واجهة مستخدم عارض الويب و 10 نقاط نهاية بحث، تديرها Bun
4. **قبو الوثائق** (`docs/`) - قبو Markdown على طراز Obsidian مرتكب في المستودع؛ مصدر الحقيقة المشترك لجميع القرارات المعمارية والسياق والمعرفة عبر الجلسات والمتعاونين
5. **مهارة mem-search** - استعلامات اللغة الطبيعية مع الكشف التدريجي

انظر [نظرة عامة على البنية المعمارية](https://docs.claude-mem-file.ai/architecture/overview) للتفاصيل.

---

## أدوات البحث MCP

يوفر Claude-Mem-File بحثاً ذكياً عن الذاكرة من خلال **4 أدوات MCP** باتباع نمط سير عمل **3 طبقات** فعال من حيث الرموز:

**سير العمل 3 طبقات:**

1. **`search`** - احصل على فهرس مضغوط برقم معرّف (~50-100 رموز/نتيجة)
2. **`timeline`** - احصل على السياق الزمني حول النتائج المثيرة للاهتمام
3. **`get_observations`** - جلب التفاصيل الكاملة فقط لأرقام المعرّفات المرشحة (~500-1,000 رموز/نتيجة)

**كيف يعمل:**

- يستخدم Claude أدوات MCP للبحث في ذاكرتك
- ابدأ بـ `search` للحصول على فهرس النتائج
- استخدم `timeline` لرؤية ما حدث حول ملاحظات محددة
- استخدم `get_observations` لجلب التفاصيل الكاملة لأرقام المعرّفات ذات الصلة
- **توفير ~10 مرات من الرموز** بتصفية قبل جلب التفاصيل

**أدوات MCP المتاحة:**

1. **`search`** - ابحث عن فهرس الذاكرة باستعلامات نص كامل، وصفّي حسب النوع/التاريخ/المشروع
2. **`timeline`** - احصل على السياق الزمني حول ملاحظة محددة أو استعلام
3. **`get_observations`** - جلب تفاصيل الملاحظات الكاملة برقم معرّف (ضع في دفعة أرقام معرّفات متعددة دائماً)

**مثال الاستخدام:**

```typescript
// الخطوة 1: البحث عن فهرس
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// الخطوة 2: راجع الفهرس، حدد أرقام المعرّفات ذات الصلة (مثل #123 و #456)

// الخطوة 3: جلب التفاصيل الكاملة
get_observations((ids = [123, 456]));
```

انظر [دليل أدوات البحث](https://docs.claude-mem-file.ai/usage/search-tools) لأمثلة مفصلة.

---

## ميزات بيتا

يوفر Claude-Mem-File **قناة بيتا** مع ميزات تجريبية مثل **Endless Mode** (بنية ذاكرة بيوميمتية للجلسات الممتدة). بدّل بين الإصدارات المستقرة والتجريبية من واجهة مستخدم الويب في http://localhost:37777 → الإعدادات.

انظر **[توثيق ميزات بيتا](https://docs.claude-mem-file.ai/beta-features)** للتفاصيل على Endless Mode وكيفية تجربته.

---

## متطلبات النظام

- **Node.js**: 18.0.0 أو أعلى
- **Claude Code**: أحدث إصدار مع دعم المكونات الإضافية
- **Bun**: عداء JavaScript ومدير عمليات (يُثبّت تلقائياً إذا كان مفقوداً)

---

### ملاحظات إعداد Windows

إذا رأيت خطأ مثل:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

تأكد من تثبيت Node.js و npm وإضافتهما إلى PATH الخاص بك. حمّل أحدث مثبِّت Node.js من https://nodejs.org وأعد تشغيل المحطة الطرفية بعد التثبيت.

---

## الإعدادات

تُدار الإعدادات في `~/.claude-mem-file/settings.json` (يُنشأ تلقائياً مع القيم الافتراضية عند التشغيل الأول). كوّن نموذج الذكاء الاصطناعي ومنفذ العامل ودليل البيانات ومستوى السجل وإعدادات حقن السياق.

انظر **[دليل الإعدادات](https://docs.claude-mem-file.ai/configuration)** لجميع الإعدادات المتاحة والأمثلة.

### إعدادات الوضع واللغة

يدعم Claude-Mem-File أوضاع سير عمل ولغات متعددة عبر إعداد `CLAUDE_MEM_MODE`.

يتحكم هذا الخيار في كليهما:

- سلوك سير العمل (مثل code و chill و investigation)
- اللغة المستخدمة في الملاحظات المُنشأة

#### كيفية التكوين

عدّل ملف الإعدادات الخاص بك في `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

تُعرّف الأوضاع في `plugin/modes/`. لرؤية جميع الأوضاع المتاحة محلياً:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### الأوضاع المتاحة

| الوضع      | الوصف                  |
| ---------- | ---------------------- |
| `code`     | الوضع الإنجليزي الافتراضي |
| `code--zh` | الوضع الصيني المبسط      |
| `code--ja` | الوضع الياباني           |

تتبع الأوضاع الخاصة باللغة النمط `code--[lang]` حيث `[lang]` هو رمز ISO 639-1 للغة (مثل `zh` للصينية و `ja` لليابانية و `es` للإسبانية).

> ملاحظة: `code--zh` (الصينية المبسطة) مدمج بالفعل — لا توجد حاجة لتحديث إضافي أو المكون الإضافي.

#### بعد تغيير الوضع

أعد تشغيل Claude Code لتطبيق إعدادات الوضع الجديد.

## التطوير

انظر **[دليل التطوير](https://docs.claude-mem-file.ai/development)** لتعليمات البناء والاختبار وسير عمل المساهمة.

---

## استكشاف الأخطاء وإصلاحها

عند مواجهة المشاكل، اشرح المشكلة لـ Claude وستقوم مهارة استكشاف الأخطاء تلقائياً بالتشخيص والإصلاح.

انظر **[دليل استكشاف الأخطاء وإصلاحها](https://docs.claude-mem-file.ai/troubleshooting)** للمشكلات الشائعة والحلول.

---

## تقارير الأخطاء

أنشئ تقارير أخطاء شاملة باستخدام المولّد الآلي:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## المساهمة

المساهمات مرحب بها! يرجى:

1. عمل Fork للمستودع
2. إنشاء فرع ميزة
3. إجراء التغييرات مع الاختبارات
4. تحديث التوثيق
5. تقديم Pull Request

انظر [دليل التطوير](https://docs.claude-mem-file.ai/development) لسير عمل المساهمة.

---

## الترخيص

هذا المشروع مرخص بموجب **رخصة GNU Affero العام الإصدار 3.0** (AGPL-3.0).

حقوق النشر (C) 2025 Alex Newman (@thedotmack). جميع الحقوق محفوظة.

انظر ملف [LICENSE](LICENSE) للتفاصيل الكاملة.

**ما يعنيه هذا:**

- يمكنك استخدام وتعديل وتوزيع هذا البرنامج بحرية
- إذا عدّلت ونشرت على خادم شبكة، يجب عليك توفير كود المصدر الخاص بك
- الأعمال المشتقة يجب أن تُرخص أيضاً بموجب AGPL-3.0
- لا يوجد ضمان لهذا البرنامج

**ملاحظة حول Ragtime**: دليل `ragtime/` مرخص بشكل منفصل بموجب **رخصة PolyForm Noncommercial 1.0.0**. انظر [ragtime/LICENSE](ragtime/LICENSE) للتفاصيل.

---

## الدعم

- **التوثيق**: [docs/](docs/)
- **المشاكل**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **المستودع**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **حساب X الرسمي**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord الرسمي**: [انضم إلى Discord](https://discord.com/invite/J4wttp9vDu)
- **المؤلف**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**مبني باستخدام Claude Agent SDK** | **مدعوم بواسطة Claude Code** | **صُنع باستخدام TypeScript**

---

### ماذا عن $CMEM؟

$CMEM هو رمز solana أنشأته جهة خارجية بدون موافقة Claude-Mem-File المسبقة، لكن تبنّاه منشئ Claude-Mem-File (Alex Newman و @thedotmack). يعمل الرمز كمحفز مجتمع للنمو ومركبة لإحضار بيانات الوكيل في الوقت الفعلي للمطورين وعمال المعرفة الذين يحتاجون إليها أكثر. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
