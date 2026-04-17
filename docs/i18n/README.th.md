🌐 นี่คือการแปลอัตโนมัติ ยินดีรับการแก้ไขจากชุมชน!

<h1 align="center">
  <br>
  <a href="https://github.com/reduardo7/claude-mem-file">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/claude-mem-file-logo-for-dark-mode.webp">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/claude-mem-file-logo-for-light-mode.webp">
      <img src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/claude-mem-file-logo-for-light-mode.webp" alt="Claude-Mem-File" width="400">
    </picture>
  </a>
  <br>
</h1>

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
> **นี่คือ fork ของ [claude-mem](https://github.com/thedotmack/claude-mem)** โดย [Alex Newman (@thedotmack)](https://github.com/thedotmack)
>
> Fork นี้แทนที่ SQLite/binary storage backend ด้วย **filesystem-only approach**: หน่วยความจำทั้งหมดจัดเก็บเป็นไฟล์ Markdown ปกติภายใต้ `<project-root>/docs/vault/` สามารถเวอร์ชันผ่าน git ได้อย่างเต็มที่และแชร์ได้กับสมาชิกทุกคนของทีม ไม่มีฐานข้อมูลในเครื่อง ไม่มี binary blobs — เพียงไฟล์ที่คุณสามารถอ่าน แก้ไข commit และ merge

<h4 align="center">claude-mem-file — ระบบการบีบอัดหน่วยความจำถาวรที่สร้างขึ้นสำหรับ <a href="https://claude.com/claude-code" target="_blank">Claude Code</a></h4>

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
  <a href="#เริ่มต้นอย่างรวดเร็ว">เริ่มต้นอย่างรวดเร็ว</a> •
  <a href="#วิธีการทำงาน">วิธีการทำงาน</a> •
  <a href="#mcp-เครื่องมือค้นหา">เครื่องมือค้นหา</a> •
  <a href="#เอกสาร">เอกสาร</a> •
  <a href="#การกำหนดค่า">การกำหนดค่า</a> •
  <a href="#การแก้ไขปัญหา">การแก้ไขปัญหา</a> •
  <a href="#ใบอนุญาต">ใบอนุญาต</a>
</p>

<p align="center">
  Claude-Mem-File รักษาบริบทข้ามเซสชันได้อย่างราบรื่นโดยการบันทึกการสังเกตการใช้เครื่องมือ สร้างสรุปความหมาย และจัดเก็บทุกอย่างเป็นไฟล์ Markdown ที่เวอร์ชันได้ภายใน per-project Obsidian-compatible vault ที่ <code>&lt;project-root&gt;/docs/vault/</code> — ไม่มีฐานข้อมูล SQLite ไม่มี binary blobs สามารถ merge ผ่าน git ได้อย่างเต็มที่
</p>

---

## เริ่มต้นอย่างรวดเร็ว

ติดตั้งด้วยคำสั่งเดียว:

```bash
npx claude-mem-file install
```

หรือติดตั้งสำหรับ Gemini CLI (auto-detects `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

หรือติดตั้งสำหรับ OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

หรือติดตั้งจากปลั๊กอิน marketplace ภายใน Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

รีสตาร์ท Claude Code หรือ Gemini CLI บริบทจากเซสชันก่อนหน้าจะปรากฏในเซสชันใหม่โดยอัตโนมัติ

> **หมายเหตุ:** Claude-Mem-File ยังเผยแพร่บน npm แต่ `npm install -g claude-mem-file` ติดตั้ง **SDK/library เท่านั้น** — ไม่ได้ลงทะเบียน plugin hooks หรือตั้งค่า worker service ติดตั้งเสมอผ่าน `npx claude-mem-file install` หรือคำสั่ง `/plugin` ข้างต้น

### 🦞 OpenClaw Gateway

ติดตั้ง claude-mem-file เป็นปลั๊กอิน persistent memory บน [OpenClaw](https://openclaw.ai) gateways ด้วยคำสั่งเดียว:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

ตัวติดตั้งจัดการการพึ่งพา การตั้งค่าปลั๊กอิน การกำหนดค่า AI provider การเริ่มต้น worker และการป้อนการสังเกตแบบเรียลไทม์ที่เลือกได้ไปยัง Telegram Discord Slack เป็นต้น ดู [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) สำหรับรายละเอียด

**คุณสมบัติหลัก:**

- 🧠 **หน่วยความจำถาวร** - บริบทยังคงอยู่ข้ามเซสชัน
- 📁 **Markdown Vault (Obsidian-compatible)** - การสังเกตและเซสชันจัดเก็บเป็นไฟล์ `.md` ภายใต้ `<project-root>/docs/vault/` สามารถเวอร์ชันและ merge ผ่าน git ได้ — ไม่มี SQLite ไม่มี binary state บนเครื่องพัฒนา
- 📊 **Progressive Disclosure** - การดึงหน่วยความจำแบบชั้นพร้อมการมองเห็นต้นทุนโทเค็น
- 🔍 **Skill-Based Search** - สืบค้นประวัติโปรเจกต์ของคุณด้วยทักษะ mem-search (ขับเคลื่อนโดย in-memory `minisearch` บน vault)
- 🖥️ **Web Viewer UI** - สตรีมหน่วยความจำแบบเรียลไทม์ที่ http://localhost:37777
- 💻 **Claude Desktop Skill** - ค้นหาหน่วยความจำจากการสนทนา Claude Desktop
- 🔒 **Privacy Control** - ใช้แท็ก `<private>` เพื่อยกเว้นเนื้อหาที่ละเอียดอ่อนจากการจัดเก็บ
- ⚙️ **Context Configuration** - ควบคุมอย่างละเอียดว่าบริบทใดได้รับการฉีด
- 🤖 **Automatic Operation** - ไม่ต้องแทรกแซงด้วยตนเอง
- 🔗 **Citations** - อ้างอิงการสังเกตในอดีตด้วย IDs (เข้าถึงผ่าน http://localhost:37777/api/observation/{id} หรือดูทั้งหมดใน web viewer ที่ http://localhost:37777)
- 🧪 **Beta Channel** - ลองคุณสมบัติทดลองเช่น Endless Mode ผ่านการสลับเวอร์ชัน

## การย้ายจาก SQLite (legacy)

รีลิสก่อนหน้าจัดเก็บหน่วยความจำใน `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB) layout vault ใหม่แทนที่ทั้งหมดนั้นด้วย Markdown ปกติใน `<project-root>/docs/vault/` หน่วยความจำก่อนหน้าของคุณไม่สูญหาย — รันสคริปต์การย้ายครั้งเดียว:

```bash
# จากภายในโปรเจกต์ใดๆ ที่ใช้ claude-mem-file ก่อนหน้านี้:
npm run migrate-to-vault              # เขียน docs/vault/ จากฐานข้อมูล legacy
npm run migrate-to-vault:dry          # แสดงตัวอย่างโดยไม่เขียน
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # เส้นทางชัดเจน
```

สคริปต์เปิดฐานข้อมูล SQLite ในโหมดอ่านเท่านั้นและมี idempotent (ซ้ำซ้อนตรวจพบผ่าน SHA-256 content hashes ดังนั้นการรันใหม่จึงปลอดภัย) Commit `docs/vault/` ที่ได้ไปยังเนื้อที่ของคุณเพื่อแชร์หน่วยความจำกับทีมของคุณ

---

## เอกสาร

📚 **[ดูเอกสารฉบับเต็ม](https://docs.claude-mem-file.ai/)** - เรียกดูบนเว็บไซต์อย่างเป็นทางการ

### เริ่มต้นใช้งาน

- **[คู่มือการติดตั้ง](https://docs.claude-mem-file.ai/installation)** - เริ่มต้นอย่างรวดเร็วและการติดตั้งขั้นสูง
- **[การตั้งค่า Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - คู่มือโดยเฉพาะสำหรับการรวม Gemini CLI ของ Google
- **[คู่มือการใช้งาน](https://docs.claude-mem-file.ai/usage/getting-started)** - วิธีที่ Claude-Mem-File ทำงานโดยอัตโนมัติ
- **[เครื่องมือค้นหา](https://docs.claude-mem-file.ai/usage/search-tools)** - สืบค้นประวัติโปรเจกต์ของคุณด้วยภาษาธรรมชาติ
- **[คุณสมบัติ Beta](https://docs.claude-mem-file.ai/beta-features)** - ลองคุณสมบัติทดลองเช่น Endless Mode

### แนวปฏิบัติที่ดี

- **[Context Engineering](https://docs.claude-mem-file.ai/context-engineering)** - หลักการปรับบริบท AI agent
- **[Progressive Disclosure](https://docs.claude-mem-file.ai/progressive-disclosure)** - ปรัชญาเบื้องหลังกลยุทธ์ context priming ของ Claude-Mem-File

### สถาปัตยกรรม

- **[ภาพรวม](https://docs.claude-mem-file.ai/architecture/overview)** - ส่วนประกอบของระบบและการไหลของข้อมูล
- **[วิวัฒนาการของสถาปัตยกรรม](https://docs.claude-mem-file.ai/architecture-evolution)** - การเดินทางจาก v3 สู่ v5
- **[สถาปัตยกรรม Hooks](https://docs.claude-mem-file.ai/hooks-architecture)** - วิธีที่ Claude-Mem-File ใช้ lifecycle hooks
- **[Hooks Reference](https://docs.claude-mem-file.ai/architecture/hooks)** - Hook scripts 7 ตัวอธิบาย
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API และการจัดการ Bun
- **[Docs Vault](docs/)** - Obsidian-style Markdown vault สำหรับความรู้โปรเจกต์ที่แชร์

### การกำหนดค่าและการพัฒนา

- **[การกำหนดค่า](https://docs.claude-mem-file.ai/configuration)** - ตัวแปรสภาพแวดล้อมและการตั้งค่า
- **[การพัฒนา](https://docs.claude-mem-file.ai/development)** - การสร้าง การทดสอบ การมีส่วนร่วม
- **[การแก้ไขปัญหา](https://docs.claude-mem-file.ai/troubleshooting)** - ปัญหาและการแก้ไขทั่วไป

---

## วิธีการทำงาน

**ส่วนประกอบหลัก:**

1. **5 Lifecycle Hooks** - SessionStart UserPromptSubmit PostToolUse Stop SessionEnd (6 hook scripts)
2. **Smart Install** - Cached dependency checker (pre-hook script ไม่ใช่ lifecycle hook)
3. **Worker Service** - HTTP API บนพอร์ต 37777 พร้อม web viewer UI และ 10 search endpoints จัดการโดย Bun
4. **Docs Vault** (`docs/`) - Obsidian-style Markdown vault ที่ commit ไปยังที่เก็บ; shared source of truth สำหรับการตัดสินใจด้านสถาปัตยกรรม บริบท และความรู้ข้ามเซสชันและผู้ร่วมมือ
5. **mem-search Skill** - คิวรีภาษาธรรมชาติพร้อม progressive disclosure

ดู [Architecture Overview](https://docs.claude-mem-file.ai/architecture/overview) สำหรับรายละเอียด

---

## MCP เครื่องมือค้นหา

Claude-Mem-File ให้บริการการค้นหาหน่วยความจำอัจฉริยะผ่าน **4 MCP tools** ตามรูปแบบ workflow **3-layer** ที่ประหยัดโทเค็น:

**The 3-Layer Workflow:**

1. **`search`** - ได้รับ compact index พร้อม IDs (~50-100 tokens/result)
2. **`timeline`** - ได้รับบริบท chronological รอบผลลัพธ์ที่น่าสนใจ
3. **`get_observations`** - ดึงรายละเอียดเต็ม เฉพาะสำหรับ IDs ที่กรอง (~500-1,000 tokens/result)

**วิธีการทำงาน:**

- Claude ใช้ MCP tools เพื่อค้นหาหน่วยความจำของคุณ
- เริ่มด้วย `search` เพื่อรับดัชนีผลลัพธ์
- ใช้ `timeline` เพื่อดูสิ่งที่เกิดขึ้นรอบ observations เฉพาะ
- ใช้ `get_observations` เพื่อดึงรายละเอียดเต็มสำหรับ IDs ที่เกี่ยวข้อง
- **~10x token savings** โดยการกรองก่อนดึงรายละเอียด

**MCP Tools ที่มีอยู่:**

1. **`search`** - ค้นหา memory index ด้วยคิวรี full-text กรองตามประเภท/วันที่/โปรเจกต์
2. **`timeline`** - ได้รับบริบท chronological รอบ observation หรือคิวรีเฉพาะ
3. **`get_observations`** - ดึงรายละเอียด observation เต็มโดย IDs (บatch IDs หลายรายการเสมอ)

**ตัวอย่างการใช้:**

```typescript
// Step 1: ค้นหาสำหรับดัชนี
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Step 2: ตรวจสอบดัชนี ระบุ IDs ที่เกี่ยวข้อง (เช่น #123, #456)

// Step 3: ดึงรายละเอียดเต็ม
get_observations((ids = [123, 456]));
```

ดู [Search Tools Guide](https://docs.claude-mem-file.ai/usage/search-tools) สำหรับตัวอย่างโดยละเอียด

---

## คุณสมบัติ Beta

Claude-Mem-File นำเสนอ **beta channel** พร้อมคุณสมบัติทดลองเช่น **Endless Mode** (biomimetic memory architecture สำหรับเซสชันที่ขยายออก) สลับระหว่างเวอร์ชันเสถียรและเบต้าจาก web viewer UI ที่ http://localhost:37777 → Settings

ดู **[Beta Features Documentation](https://docs.claude-mem-file.ai/beta-features)** สำหรับรายละเอียดเกี่ยวกับ Endless Mode และวิธีการลอง

---

## ความต้องการของระบบ

- **Node.js**: 18.0.0 หรือสูงกว่า
- **Claude Code**: เวอร์ชันล่าสุดพร้อมการสนับสนุนปลั๊กอิน
- **Bun**: JavaScript runtime และตัวจัดการกระบวนการ (ติดตั้งอัตโนมัติหากไม่มี)

---

### หมายเหตุการตั้งค่า Windows

หากคุณเห็นข้อผิดพลาดเช่น:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

ตรวจสอบให้แน่ใจว่ามีการติดตั้ง Node.js และ npm และเพิ่มไปยัง PATH ของคุณ ดาวน์โหลดตัวติดตั้ง Node.js เวอร์ชันล่าสุดจาก https://nodejs.org และรีสตาร์ทเทอร์มินัลของคุณหลังการติดตั้ง

---

## การกำหนดค่า

การตั้งค่าจะถูกจัดการใน `~/.claude-mem-file/settings.json` (สร้างอัตโนมัติพร้อมค่าเริ่มต้นในการรันครั้งแรก) กำหนดค่าโมเดล AI พอร์ต worker ไดเรกทอรีข้อมูล ระดับ log และการตั้งค่าการฉีดบริบท

ดู **[Configuration Guide](https://docs.claude-mem-file.ai/configuration)** สำหรับการตั้งค่าทั้งหมดที่มีและตัวอย่าง

### การกำหนดค่า Mode และ Language

Claude-Mem-File สนับสนุนโหมด workflow หลายหลากและภาษาผ่านการตั้งค่า `CLAUDE_MEM_MODE`

ตัวเลือกนี้ควบคุม:

- พฤติกรรม workflow (เช่น code chill investigation)
- ภาษาที่ใช้ในการสังเกตที่สร้างขึ้น

#### วิธีการกำหนดค่า

แก้ไขไฟล์การตั้งค่าของคุณที่ `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Modes ถูกกำหนดใน `plugin/modes/` เพื่อดู all available modes ในพื้นที่:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Modes ที่มีอยู่

| Mode       | คำอธิบาย             |
| ---------- | ----------------------- |
| `code`     | Default English mode    |
| `code--zh` | Simplified Chinese mode |
| `code--ja` | Japanese mode           |

Language-specific modes ตามรูปแบบ `code--[lang]` โดยที่ `[lang]` เป็น ISO 639-1 language code (เช่น `zh` สำหรับจีน `ja` สำหรับญี่ปุ่น `es` สำหรับสเปน)

> หมายเหตุ: `code--zh` (Simplified Chinese) ได้รับการสร้างแล้ว — ไม่ต้องการการติดตั้งเพิ่มเติมหรือการอัปเดตปลั๊กอิน

#### หลังจากเปลี่ยน Mode

รีสตาร์ท Claude Code เพื่อใช้การกำหนดค่า mode ใหม่

## การพัฒนา

ดู **[Development Guide](https://docs.claude-mem-file.ai/development)** สำหรับคำแนะนำการสร้าง การทดสอบ และขั้นตอนการมีส่วนร่วม

---

## การแก้ไขปัญหา

หากพบปัญหา อธิบายปัญหาให้ Claude ฟังและทักษะ troubleshoot จะวินิจฉัยและให้การแก้ไขโดยอัตโนมัติ

ดู **[Troubleshooting Guide](https://docs.claude-mem-file.ai/troubleshooting)** สำหรับปัญหาและการแก้ไขทั่วไป

---

## รายงานบั๊ก

สร้างรายงานบั๊กที่ครอบคลุมด้วยตัวสร้างอัตโนมัติ:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## การมีส่วนร่วม

ยินดีรับการมีส่วนร่วม! กรุณา:

1. Fork ที่เก็บ
2. สร้าง feature branch
3. ทำการเปลี่ยนแปลงพร้อมการทดสอบ
4. อัปเดตเอกสาร
5. ส่ง Pull Request

ดู [Development Guide](https://docs.claude-mem-file.ai/development) สำหรับขั้นตอนการมีส่วนร่วม

---

## ใบอนุญาต

โปรเจกต์นี้ได้รับอนุญาตภายใต้ **GNU Affero General Public License v3.0** (AGPL-3.0)

Copyright (C) 2025 Alex Newman (@thedotmack) สงวนลิขสิทธิ์ทั้งหมด

ดูไฟล์ [LICENSE](LICENSE) สำหรับรายละเอียดทั้งหมด

**ความหมาย:**

- คุณสามารถใช้ ดัดแปลง และแจกจ่ายซอฟต์แวร์นี้ได้อย่างอิสระ
- หากคุณดัดแปลงและปรับใช้บนเซิร์ฟเวอร์เครือข่าย คุณต้องทำให้ซอร์สโค้ดของคุณพร้อมใช้งาน
- งานที่เป็นอนุพันธ์ต้องได้รับอนุญาตภายใต้ AGPL-3.0 ด้วย
- ไม่มีการรับประกันสำหรับซอฟต์แวร์นี้

**หมายเหตุเกี่ยวกับ Ragtime**: ไดเรกทอรี `ragtime/` ได้รับอนุญาตแยกต่างหากภายใต้ **PolyForm Noncommercial License 1.0.0** ดู [ragtime/LICENSE](ragtime/LICENSE) สำหรับรายละเอียด

---

## การสนับสนุน

- **เอกสาร**: [docs/](docs/)
- **ปัญหา**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **ที่เก็บ**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Official X Account**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Official Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **ผู้เขียน**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**สร้างด้วย Claude Agent SDK** | **ขับเคลื่อนโดย Claude Code** | **สร้างด้วย TypeScript**

---

### $CMEM คืออะไร?

$CMEM เป็น solana token ที่สร้างโดยบุคคลที่สามโดยไม่ได้รับความยินยอมจากสัญญา Claude-Mem-File ล่วงหน้า แต่ได้รับการยอมรับโดยผู้สร้าง Claude-Mem-File อย่างเป็นทางการ (Alex Newman @thedotmack) token นี้ทำหน้าที่เป็นตัวเร่งปฏิกิริยาชุมชนสำหรับการเติบโตและยานพาหนะสำหรับการนำข้อมูล agent แบบเรียลไทม์ไปยังผู้พัฒนาและคนที่ทำงานความรู้ที่ต้องการมากที่สุด $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
