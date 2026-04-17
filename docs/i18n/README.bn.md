🌐 এটি একটি স্বয়ংক্রিয় অনুবাদ। সম্প্রদায়ের সংশোধন স্বাগত!

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
> **এটি [claude-mem](https://github.com/thedotmack/claude-mem) এর একটি ফর্ক** [Alex Newman (@thedotmack)](https://github.com/thedotmack) দ্বারা।
>
> এই ফর্কটি SQLite/বাইনারি স্টোরেজ ব্যাকএন্ডকে একটি **ফাইলসিস্টেম-শুধুমাত্র পদ্ধতি** দিয়ে প্রতিস্থাপন করে: সমস্ত মেমরি `<project-root>/docs/vault/` এর অধীনে সাধারণ Markdown ফাইল হিসেবে সংরক্ষিত হয়, সম্পূর্ণভাবে git এর মাধ্যমে সংস্করণযোগ্য এবং আপনার দলের প্রতিটি সদস্যের সাথে শেয়ারযোগ্য। কোন স্থানীয় ডাটাবেস নেই, কোন বাইনারি ব্লব নেই — শুধু ফাইল যা আপনি পড়তে, সম্পাদনা করতে, কমিট করতে এবং মার্জ করতে পারেন।

<h4 align="center">claude-mem-file — <a href="https://claude.com/claude-code" target="_blank">Claude Code</a> এর জন্য নির্মিত স্থায়ী মেমরি কম্প্রেশন সিস্টেম।</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/reduardo7/claude-mem-file">
        <picture>
          <img
            src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/cm-preview.gif"
            alt="Claude-Mem-File প্রিভিউ"
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
            alt="স্টার ইতিহাস চার্ট"
            src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left"
            width="500"
          />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#দ্রুত-শুরু">দ্রুত শুরু</a> •
  <a href="#এটি-কীভাবে-কাজ-করে">এটি কীভাবে কাজ করে</a> •
  <a href="#mcp-অনুসন্ধান-টুল">অনুসন্ধান টুল</a> •
  <a href="#ডকুমেন্টেশন">ডকুমেন্টেশন</a> •
  <a href="#কনফিগারেশন">কনফিগারেশন</a> •
  <a href="#সমস্যা-সমাধান">সমস্যা সমাধান</a> •
  <a href="#লাইসেন্স">লাইসেন্স</a>
</p>

<p align="center">
  Claude-Mem-File টুল-ব্যবহারের পর্যবেক্ষণ ক্যাপচার করে, শব্দার্থগত সারসংক্ষেপ তৈরি করে এবং সবকিছু একটি প্রকল্প-প্রতি Obsidian-সামঞ্জস্যপূর্ণ ভল্টে সংরক্ষণ করে <code>&lt;project-root&gt;/docs/vault/</code>-এ — কোন SQLite ডাটাবেস নেই, কোন বাইনারি ব্লব নেই, সম্পূর্ণভাবে git এর মাধ্যমে মার্জযোগ্য।
</p>

---

## দ্রুত শুরু

একটি একক কমান্ড দিয়ে ইনস্টল করুন:

```bash
npx claude-mem-file install
```

অথবা Gemini CLI এর জন্য ইনস্টল করুন (স্বয়ংক্রিয়ভাবে `~/.gemini` সনাক্ত করে):

```bash
npx claude-mem-file install --ide gemini-cli
```

অথবা OpenCode এর জন্য ইনস্টল করুন:

```bash
npx claude-mem-file install --ide opencode
```

অথবা Claude Code এর প্লাগইন মার্কেটপ্লেস থেকে ইনস্টল করুন:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Claude Code বা Gemini CLI পুনরায় চালু করুন। পূর্ববর্তী সেশনের প্রসঙ্গ স্বয়ংক্রিয়ভাবে নতুন সেশনে উপস্থিত হবে।

> **নোট:** Claude-Mem-File npm এ প্রকাশিত হয়েছে, কিন্তু `npm install -g claude-mem-file` শুধুমাত্র **SDK/লাইব্রেরি** ইনস্টল করে — এটি প্লাগইন হুক নিবন্ধন বা ওয়ার্কার সার্ভিস সেটআপ করে না। সর্বদা `npx claude-mem-file install` বা উপরের `/plugin` কমান্ডের মাধ্যমে ইনস্টল করুন।

### 🦞 OpenClaw গেটওয়ে

একটি একক কমান্ড দিয়ে [OpenClaw](https://openclaw.ai) গেটওয়েতে claude-mem-file-কে স্থায়ী মেমরি প্লাগইন হিসেবে ইনস্টল করুন:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

ইনস্টলারটি ডিপেন্ডেন্সি, প্লাগইন সেটআপ, AI প্রোভাইডার কনফিগারেশন, ওয়ার্কার স্টার্টআপ এবং Telegram, Discord, Slack এবং আরও অনেক কিছুর জন্য ঐচ্ছিক রিয়েল-টাইম পর্যবেক্ষণ ফিড পরিচালনা করে। বিস্তারিত জানতে [OpenClaw ইন্টিগ্রেশন গাইড](https://docs.claude-mem-file.ai/openclaw-integration) দেখুন।

**মূল বৈশিষ্ট্যসমূহ:**

- 🧠 **স্থায়ী মেমরি** - প্রসঙ্গ সেশন জুড়ে টিকে থাকে
- 📁 **Markdown ভল্ট (Obsidian-সামঞ্জস্যপূর্ণ)** - পর্যবেক্ষণ এবং সেশন `.md` ফাইল হিসেবে `<project-root>/docs/vault/` এর অধীনে সংরক্ষিত হয়, git এর মাধ্যমে সংস্করণযোগ্য এবং মার্জযোগ্য — কোন SQLite নেই, ডেভেলপ মেশিনে কোন বাইনারি অবস্থা নেই
- 📊 **প্রগতিশীল প্রকাশ** - টোকেন খরচ দৃশ্যমানতা সহ স্তরযুক্ত মেমরি পুনরুদ্ধার
- 🔍 **দক্ষতা-ভিত্তিক অনুসন্ধান** - mem-search দক্ষতা দিয়ে আপনার প্রকল্পের ইতিহাস অনুসন্ধান করুন (ভল্টের উপর মধ্য-স্মৃতি `minisearch` দ্বারা চালিত)
- 🖥️ **ওয়েব ভিউয়ার UI** - http://localhost:37777 এ রিয়েল-টাইম মেমরি স্ট্রিম
- 💻 **Claude Desktop দক্ষতা** - Claude Desktop কথোপকথন থেকে মেমরি অনুসন্ধান করুন
- 🔒 **গোপনীয়তা নিয়ন্ত্রণ** - সংবেদনশীল বিষয়বস্তু স্টোরেজ থেকে বাদ দিতে `<private>` ট্যাগ ব্যবহার করুন
- ⚙️ **প্রসঙ্গ কনফিগারেশন** - কোন প্রসঙ্গ ইনজেক্ট করা হবে তার উপর সূক্ষ্ম নিয়ন্ত্রণ
- 🤖 **স্বয়ংক্রিয় অপারেশন** - কোন ম্যানুয়াল হস্তক্ষেপ প্রয়োজন নেই
- 🔗 **উদ্ধৃতি** - ID দিয়ে পূর্ববর্তী পর্যবেক্ষণ রেফারেন্স করুন (http://localhost:37777/api/observation/{id} এর মাধ্যমে অ্যাক্সেস করুন অথবা http://localhost:37777 এ ওয়েব ভিউয়ারে সব দেখুন)
- 🧪 **বিটা চ্যানেল** - ভার্সন স্যুইচিং এর মাধ্যমে Endless Mode-এর মতো পরীক্ষামূলক বৈশিষ্ট্য চেষ্টা করুন

## SQLite থেকে মাইগ্রেশন (লিগ্যাসি)

আগের রিলিজগুলি `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB) এ মেমরি সংরক্ষণ করেছিল। নতুন ভল্ট লেআউট সেই সবকিছুকে `<project-root>/docs/vault/` এ সাধারণ Markdown দিয়ে প্রতিস্থাপন করে। আপনার পূর্ববর্তী মেমরি হারিয়ে যায়নি — মাইগ্রেশন স্ক্রিপ্ট একবার চালান:

```bash
# যেকোনো প্রকল্পের মধ্যে যা পূর্বে claude-mem-file ব্যবহার করেছে:
npm run migrate-to-vault              # লিগ্যাসি DB থেকে docs/vault/ লেখে
npm run migrate-to-vault:dry          # লেখা ছাড়া প্রিভিউ করুন
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # স্পষ্ট পথ
```

স্ক্রিপ্টটি SQLite ডাটাবেস শুধুমাত্র-পড়ার জন্য খুলে এবং idempotent (SHA-256 কন্টেন্ট হ্যাশ এর মাধ্যমে ডুপ্লিকেট শনাক্ত করা হয়, তাই পুনরায় চালানো নিরাপদ)। ফলস্বরূপ `docs/vault/` ফোল্ডার আপনার রেপোতে কমিট করুন আপনার দলের সাথে মেমরি শেয়ার করতে।

---

## ডকুমেন্টেশন

📚 **[সম্পূর্ণ ডকুমেন্টেশন দেখুন](https://docs.claude-mem-file.ai/)** - অফিসিয়াল ওয়েবসাইটে ব্রাউজ করুন

### শুরু করা

- **[ইনস্টলেশন গাইড](https://docs.claude-mem-file.ai/installation)** - দ্রুত শুরু এবং উন্নত ইনস্টলেশন
- **[Gemini CLI সেটআপ](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google এর Gemini CLI ইন্টিগ্রেশনের জন্য ডেডিকেটেড গাইড
- **[ব্যবহার গাইড](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-File কীভাবে স্বয়ংক্রিয়ভাবে কাজ করে
- **[অনুসন্ধান টুল](https://docs.claude-mem-file.ai/usage/search-tools)** - প্রাকৃতিক ভাষা দিয়ে আপনার প্রকল্পের ইতিহাস অনুসন্ধান করুন
- **[বিটা বৈশিষ্ট্য](https://docs.claude-mem-file.ai/beta-features)** - Endless Mode-এর মতো পরীক্ষামূলক বৈশিষ্ট্য চেষ্টা করুন

### সর্বোত্তম অনুশীলন

- **[প্রসঙ্গ প্রকৌশল](https://docs.claude-mem-file.ai/context-engineering)** - AI এজেন্ট প্রসঙ্গ অপটিমাইজেশন নীতি
- **[প্রগতিশীল প্রকাশ](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-File-এর প্রসঙ্গ প্রাইমিং কৌশলের পিছনে দর্শন

### আর্কিটেকচার

- **[সারসংক্ষেপ](https://docs.claude-mem-file.ai/architecture/overview)** - সিস্টেম উপাদান এবং ডেটা প্রবাহ
- **[আর্কিটেকচার বিবর্তন](https://docs.claude-mem-file.ai/architecture-evolution)** - v3 থেকে v5 পর্যন্ত যাত্রা
- **[হুকস আর্কিটেকচার](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-File কীভাবে লাইফসাইকেল হুক ব্যবহার করে
- **[হুকস রেফারেন্স](https://docs.claude-mem-file.ai/architecture/hooks)** - 7টি হুক স্ক্রিপ্ট ব্যাখ্যা করা হয়েছে
- **[ওয়ার্কার সার্ভিস](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API এবং Bun ম্যানেজমেন্ট
- **[ডাকস ভল্ট](docs/)** - শেয়ারড প্রকল্প জ্ঞানের জন্য Obsidian-স্টাইল Markdown ভল্ট

### কনফিগারেশন এবং ডেভেলপমেন্ট

- **[কনফিগারেশন](https://docs.claude-mem-file.ai/configuration)** - পরিবেশ ভেরিয়েবল এবং সেটিংস
- **[ডেভেলপমেন্ট](https://docs.claude-mem-file.ai/development)** - নির্মাণ, পরীক্ষা, অবদান
- **[সমস্যা সমাধান](https://docs.claude-mem-file.ai/troubleshooting)** - সাধারণ সমস্যা এবং সমাধান

---

## এটি কীভাবে কাজ করে

**মূল উপাদানসমূহ:**

1. **5টি লাইফসাইকেল হুক** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6টি হুক স্ক্রিপ্ট)
2. **স্মার্ট ইনস্টল** - ক্যাশড ডিপেন্ডেন্সি চেকার (প্রি-হুক স্ক্রিপ্ট, লাইফসাইকেল হুক নয়)
3. **ওয়ার্কার সার্ভিস** - ওয়েব ভিউয়ার UI এবং 10টি অনুসন্ধান এন্ডপয়েন্ট সহ পোর্ট 37777-এ HTTP API, Bun দ্বারা পরিচালিত
4. **ডাকস ভল্ট** (`docs/`) - রিপোজিটরিতে কমিট করা Obsidian-স্টাইল Markdown ভল্ট; সমস্ত স্থাপত্য সিদ্ধান্ত, প্রসঙ্গ এবং জ্ঞানের জন্য সেশন এবং সহযোগীদের জুড়ে শেয়ারড সত্যের উৎস
5. **mem-search দক্ষতা** - প্রগতিশীল প্রকাশ সহ প্রাকৃতিক ভাষা প্রশ্ন

বিস্তারিত জানতে [আর্কিটেকচার সারসংক্ষেপ](https://docs.claude-mem-file.ai/architecture/overview) দেখুন।

---

## MCP অনুসন্ধান টুল

Claude-Mem-File একটি টোকেন-দক্ষ **3-স্তরীয় ওয়ার্কফ্লো প্যাটার্ন** অনুসরণ করে **4টি MCP টুল** এর মাধ্যমে বুদ্ধিমান মেমরি অনুসন্ধান প্রদান করে:

**3-স্তরীয় ওয়ার্কফ্লো:**

1. **`search`** - কমপ্যাক্ট ইন্ডেক্স পান ID সহ (~50-100 টোকেন/ফলাফল)
2. **`timeline`** - আকর্ষণীয় ফলাফলের চারপাশে কালানুক্রমিক প্রসঙ্গ পান
3. **`get_observations`** - ফিল্টার করা ID গুলির জন্য শুধুমাত্র সম্পূর্ণ বিবরণ আনুন (~500-1,000 টোকেন/ফলাফল)

**এটি কীভাবে কাজ করে:**

- Claude আপনার মেমরি অনুসন্ধান করতে MCP টুল ব্যবহার করে
- `search` দিয়ে ফলাফলের ইন্ডেক্স পেতে শুরু করুন
- নির্দিষ্ট পর্যবেক্ষণের চারপাশে কী ঘটছিল তা দেখতে `timeline` ব্যবহার করুন
- প্রাসঙ্গিক ID গুলির জন্য সম্পূর্ণ বিবরণ আনতে `get_observations` ব্যবহার করুন
- **বিবরণ আনার আগে ফিল্টার করে ~10x টোকেন সঞ্চয়**

**উপলব্ধ MCP টুল:**

1. **`search`** - সম্পূর্ণ-পাঠ্য প্রশ্ন, টাইপ/তারিখ/প্রকল্প দ্বারা ফিল্টার সহ মেমরি ইন্ডেক্স অনুসন্ধান করুন
2. **`timeline`** - নির্দিষ্ট পর্যবেক্ষণ বা প্রশ্নের চারপাশে কালানুক্রমিক প্রসঙ্গ পান
3. **`get_observations`** - ID দ্বারা সম্পূর্ণ পর্যবেক্ষণ বিবরণ আনুন (সর্বদা একাধিক ID ব্যাচ করুন)

**ব্যবহারের উদাহরণ:**

```typescript
// ধাপ 1: ইন্ডেক্সের জন্য অনুসন্ধান করুন
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// ধাপ 2: ইন্ডেক্স পর্যালোচনা করুন, প্রাসঙ্গিক ID শনাক্ত করুন (যেমন, #123, #456)

// ধাপ 3: সম্পূর্ণ বিবরণ আনুন
get_observations((ids = [123, 456]));
```

বিস্তারিত উদাহরণের জন্য [অনুসন্ধান টুল গাইড](https://docs.claude-mem-file.ai/usage/search-tools) দেখুন।

---

## বিটা বৈশিষ্ট্য

Claude-Mem-File একটি **বিটা চ্যানেল** অফার করে যাতে **Endless Mode**-এর মতো পরীক্ষামূলক বৈশিষ্ট্য রয়েছে (বর্ধিত সেশনের জন্য বায়োমিমেটিক মেমরি আর্কিটেকচার)। http://localhost:37777 → Settings-এ ওয়েব ভিউয়ার UI থেকে স্থিতিশীল এবং বিটা সংস্করণের মধ্যে স্যুইচ করুন।

Endless Mode এবং এটি কীভাবে চেষ্টা করবেন সে সম্পর্কে বিস্তারিত জানতে **[বিটা বৈশিষ্ট্য ডকুমেন্টেশন](https://docs.claude-mem-file.ai/beta-features)** দেখুন।

---

## সিস্টেম প্রয়োজনীয়তা

- **Node.js**: 18.0.0 বা উচ্চতর
- **Claude Code**: প্লাগইন সাপোর্ট সহ সর্বশেষ সংস্করণ
- **Bun**: JavaScript রানটাইম এবং প্রসেস ম্যানেজার (অনুপস্থিত থাকলে স্বয়ংক্রিয়ভাবে ইনস্টল হয়)

---

### Windows সেটআপ নোট

যদি আপনি এই মতো একটি ত্রুটি দেখেন:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

নিশ্চিত করুন যে Node.js এবং npm ইনস্টল করা এবং আপনার PATH এ যোগ করা হয়েছে। https://nodejs.org থেকে সর্বশেষ Node.js ইনস্টলার ডাউনলোড করুন এবং ইনস্টলেশনের পরে আপনার টার্মিনাল পুনরায় শুরু করুন।

---

## কনফিগারেশন

সেটিংস `~/.claude-mem-file/settings.json` এ পরিচালিত হয় (প্রথম রানে ডিফল্ট সহ স্বয়ংক্রিয়ভাবে তৈরি হয়)। AI মডেল, ওয়ার্কার পোর্ট, ডেটা ডিরেক্টরি, লগ লেভেল এবং প্রসঙ্গ ইনজেকশন সেটিংস কনফিগার করুন।

সমস্ত উপলব্ধ সেটিংস এবং উদাহরণের জন্য **[কনফিগারেশন গাইড](https://docs.claude-mem-file.ai/configuration)** দেখুন।

### মোড এবং ভাষা কনফিগারেশন

Claude-Mem-File `CLAUDE_MEM_MODE` সেটিং এর মাধ্যমে একাধিক ওয়ার্কফ্লো মোড এবং ভাষা সমর্থন করে।

এই অপশনটি উভয় নিয়ন্ত্রণ করে:

- ওয়ার্কফ্লো আচরণ (যেমন code, chill, investigation)
- উত্পন্ন পর্যবেক্ষণে ব্যবহৃত ভাষা

#### কনফিগার কীভাবে করবেন

আপনার সেটিংস ফাইল সম্পাদনা করুন `~/.claude-mem-file/settings.json` এ:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

মোডগুলি `plugin/modes/` এ সংজ্ঞায়িত করা হয়। স্থানীয়ভাবে সমস্ত উপলব্ধ মোড দেখতে:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### উপলব্ধ মোড

| মোড        | বর্ণনা              |
| ---------- | ------------------- |
| `code`     | ডিফল্ট ইংরেজি মোড    |
| `code--zh` | সহজীকৃত চীনা মোড    |
| `code--ja` | জাপানী মোড         |

ভাষা-নির্দিষ্ট মোডগুলি প্যাটার্ন অনুসরণ করে `code--[lang]` যেখানে `[lang]` হল ISO 639-1 ভাষা কোড (যেমন, `zh` চীনা এর জন্য, `ja` জাপানী এর জন্য, `es` স্প্যানিশ এর জন্য)।

> নোট: `code--zh` (সহজীকৃত চীনা) ইতিমধ্যে নির্মিত রয়েছে — কোন অতিরিক্ত ইনস্টলেশন বা প্লাগইন আপডেট প্রয়োজন নেই।

#### মোড পরিবর্তনের পরে

Claude Code পুনরায় চালু করুন নতুন মোড কনফিগারেশন প্রয়োগ করতে।

## ডেভেলপমেন্ট

নির্মাণ নির্দেশাবলী, পরীক্ষা এবং অবদান ওয়ার্কফ্লোর জন্য **[ডেভেলপমেন্ট গাইড](https://docs.claude-mem-file.ai/development)** দেখুন।

---

## সমস্যা সমাধান

যদি সমস্যার সম্মুখীন হন, Claude-কে সমস্যাটি বর্ণনা করুন এবং troubleshoot দক্ষতা স্বয়ংক্রিয়ভাবে নির্ণয় করবে এবং সমাধান প্রদান করবে।

সাধারণ সমস্যা এবং সমাধানের জন্য **[সমস্যা সমাধান গাইড](https://docs.claude-mem-file.ai/troubleshooting)** দেখুন।

---

## বাগ রিপোর্ট

স্বয়ংক্রিয় জেনারেটর দিয়ে ব্যাপক বাগ রিপোর্ট তৈরি করুন:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## অবদান

অবদান স্বাগত! অনুগ্রহ করে:

1. রিপোজিটরি ফর্ক করুন
2. একটি ফিচার ব্র্যাঞ্চ তৈরি করুন
3. পরীক্ষা সহ আপনার পরিবর্তনগুলি করুন
4. ডকুমেন্টেশন আপডেট করুন
5. একটি Pull Request জমা দিন

অবদান ওয়ার্কফ্লোর জন্য [ডেভেলপমেন্ট গাইড](https://docs.claude-mem-file.ai/development) দেখুন।

---

## লাইসেন্স

এই প্রকল্পটি **GNU Affero General Public License v3.0** (AGPL-3.0) এর অধীনে লাইসেন্সপ্রাপ্ত।

Copyright (C) 2025 Alex Newman (@thedotmack)। সর্বস্বত্ব সংরক্ষিত।

সম্পূর্ণ বিবরণের জন্য [LICENSE](LICENSE) ফাইল দেখুন।

**এর অর্থ কী:**

- আপনি এই সফটওয়্যারটি অবাধে ব্যবহার, পরিবর্তন এবং বিতরণ করতে পারেন
- যদি আপনি পরিবর্তন করেন এবং একটি নেটওয়ার্ক সার্ভারে স্থাপন করেন, আপনাকে আপনার সোর্স কোড উপলব্ধ করতে হবে
- ডেরিভেটিভ কাজগুলিও AGPL-3.0 এর অধীনে লাইসেন্সপ্রাপ্ত হতে হবে
- এই সফটওয়্যারের জন্য কোন ওয়ারেন্টি নেই

**Ragtime সম্পর্কে নোট**: `ragtime/` ডিরেক্টরি আলাদাভাবে **PolyForm Noncommercial License 1.0.0** এর অধীনে লাইসেন্সপ্রাপ্ত। বিস্তারিত জানতে [ragtime/LICENSE](ragtime/LICENSE) দেখুন।

---

## সাপোর্ট

- **ডকুমেন্টেশন**: [docs/](docs/)
- **ইস্যু**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **রিপোজিটরি**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **অফিসিয়াল X অ্যাকাউন্ট**: [@Claude_Memory](https://x.com/Claude_Memory)
- **অফিসিয়াল Discord**: [Discord যোগ দিন](https://discord.com/invite/J4wttp9vDu)
- **লেখক**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Claude Agent SDK দিয়ে নির্মিত** | **Claude Code দ্বারা চালিত** | **TypeScript দিয়ে তৈরি**

---

### $CMEM সম্পর্কে কী?

$CMEM একটি solana টোকেন যা একটি তৃতীয় পক্ষ দ্বারা Claude-Mem-File এর পূর্ব সম্মতি ছাড়াই তৈরি করা হয়েছে, কিন্তু Claude-Mem-File এর নির্মাতা (Alex Newman, @thedotmack) দ্বারা অফিসিয়ালভাবে গৃহীত। টোকেনটি বৃদ্ধির জন্য একটি সম্প্রদায় অনুঘটক হিসেবে এবং এজেন্ট ডেটা সবচেয়ে বেশি দরকারী ডেভেলপার এবং জ্ঞান কর্মীদের কাছে আনার জন্য একটি যান হিসাবে কাজ করে। $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
