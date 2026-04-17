🌐 Đây là bản dịch tự động. Chúng tôi hoan nghênh các đóng góp từ cộng đồng!

---

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
> **Đây là một fork của [claude-mem](https://github.com/thedotmack/claude-mem)** của [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Fork này thay thế backend lưu trữ SQLite/nhị phân bằng cách **tiếp cận chỉ hệ thống tập tin**: tất cả bộ nhớ được lưu trữ dưới dạng các tệp Markdown thuần túy tại `<project-root>/docs/vault/`, có thể quản lý phiên bản hoàn toàn qua git và chia sẻ với mọi thành viên trong nhóm của bạn. Không có cơ sở dữ liệu cục bộ, không có blob nhị phân — chỉ những tệp bạn có thể đọc, chỉnh sửa, commit và merge.

<h4 align="center">claude-mem-file — Hệ thống nén bộ nhớ liên tục được xây dựng cho <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#bắt-đầu-nhanh">Bắt Đầu Nhanh</a> •
  <a href="#cách-hoạt-động">Cách Hoạt Động</a> •
  <a href="#công-cụ-tìm-kiếm-mcp">Công Cụ Tìm Kiếm</a> •
  <a href="#tài-liệu">Tài Liệu</a> •
  <a href="#cấu-hình">Cấu Hình</a> •
  <a href="#khắc-phục-sự-cố">Khắc Phục Sự Cố</a> •
  <a href="#giấy-phép">Giấy Phép</a>
</p>

<p align="center">
  Claude-Mem-File duy trì ngữ cảnh liền mạch qua các phiên làm việc bằng cách nắm bắt các quan sát sử dụng công cụ, tạo tóm tắt ngữ nghĩa, và lưu trữ tất cả dưới dạng Markdown được quản lý phiên bản bên trong một kho lưu trữ (vault) tương thích Obsidian mỗi dự án tại <code>&lt;project-root&gt;/docs/vault/</code> — không có cơ sở dữ liệu SQLite, không có blob nhị phân, có thể merge hoàn toàn qua git.
</p>

---

## Bắt Đầu Nhanh

Cài đặt bằng một lệnh duy nhất:

```bash
npx claude-mem-file install
```

Hoặc cài đặt cho Gemini CLI (tự động phát hiện `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Hoặc cài đặt cho OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Hoặc cài đặt từ kho marketplace plugin bên trong Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Khởi động lại Claude Code hoặc Gemini CLI. Ngữ cảnh từ các phiên trước sẽ tự động xuất hiện trong các phiên mới.

> **Lưu Ý:** Claude-Mem-File cũng được xuất bản trên npm, nhưng `npm install -g claude-mem-file` chỉ cài đặt **SDK/thư viện** — nó không đăng ký các hook plugin hoặc thiết lập dịch vụ worker. Luôn cài đặt thông qua `npx claude-mem-file install` hoặc các lệnh `/plugin` ở trên.

### 🦞 Cổng OpenClaw

Cài đặt claude-mem-file làm plugin bộ nhớ liên tục trên các cổng [OpenClaw](https://openclaw.ai) bằng một lệnh duy nhất:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Trình cài đặt xử lý các phụ thuộc, thiết lập plugin, cấu hình nhà cung cấp AI, khởi động worker, và các feed quan sát tùy chọn theo thời gian thực cho Telegram, Discord, Slack, v.v. Xem [Hướng Dẫn Tích Hợp OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) để biết chi tiết.

**Tính Năng Chính:**

- 🧠 **Bộ Nhớ Liên Tục** - Ngữ cảnh tồn tại qua các phiên
- 📁 **Kho Markdown (tương thích Obsidian)** - Các quan sát và phiên được lưu trữ dưới dạng tệp `.md` tại `<project-root>/docs/vault/`, có thể quản lý phiên bản và merge qua git — không có SQLite, không có trạng thái nhị phân trên máy dev
- 📊 **Tiết Lộ Tuần Tự** - Truy xuất bộ nhớ theo lớp với khả năng hiển thị chi phí token
- 🔍 **Tìm Kiếm Dựa Trên Kỹ Năng** - Truy vấn lịch sử dự án bằng kỹ năng mem-search (được hỗ trợ bằng `minisearch` trong bộ nhớ trên vault)
- 🖥️ **Giao Diện Web Viewer** - Luồng bộ nhớ thời gian thực tại http://localhost:37777
- 💻 **Kỹ Năng Claude Desktop** - Tìm kiếm bộ nhớ từ các cuộc trò chuyện Claude Desktop
- 🔒 **Kiểm Soát Quyền Riêng Tư** - Sử dụng thẻ `<private>` để loại trừ nội dung nhạy cảm khỏi lưu trữ
- ⚙️ **Cấu Hình Ngữ Cảnh** - Kiểm soát chi tiết về ngữ cảnh nào được chèn vào
- 🤖 **Hoạt Động Tự Động** - Không cần can thiệp thủ công
- 🔗 **Trích Dẫn** - Tham chiếu các quan sát trong quá khứ bằng ID (truy cập qua http://localhost:37777/api/observation/{id} hoặc xem tất cả trong web viewer tại http://localhost:37777)
- 🧪 **Kênh Beta** - Dùng thử các tính năng thử nghiệm như Endless Mode thông qua chuyển đổi phiên bản

## Chuyển Từ SQLite (kế thừa)

Các bản phát hành trước đây lưu trữ bộ nhớ trong `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Bố cục kho lưu trữ mới thay thế tất cả điều đó bằng Markdown thuần túy trong `<project-root>/docs/vault/`. Các bộ nhớ trước đây của bạn không bị mất — chạy tập lệnh migration một lần:

```bash
# từ bên trong bất kỳ dự án nào đã sử dụng claude-mem-file trước đây:
npm run migrate-to-vault              # ghi docs/vault/ từ cơ sở dữ liệu kế thừa
npm run migrate-to-vault:dry          # xem trước mà không ghi
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # đường dẫn rõ ràng
```

Tập lệnh mở cơ sở dữ liệu SQLite ở chế độ chỉ đọc và là idempotent (các bản sao được phát hiện qua hash nội dung SHA-256, vì vậy chạy lại là an toàn). Commit thư mục `docs/vault/` kết quả vào repo của bạn để chia sẻ bộ nhớ với nhóm.

---

## Tài Liệu

📚 **[Xem Tài Liệu Đầy Đủ](https://docs.claude-mem-file.ai/)** - Duyệt trên trang web chính thức

### Bắt Đầu

- **[Hướng Dẫn Cài Đặt](https://docs.claude-mem-file.ai/installation)** - Bắt đầu nhanh & cài đặt nâng cao
- **[Thiết Lập Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Hướng dẫn dành riêng cho tích hợp Gemini CLI của Google
- **[Hướng Dẫn Sử Dụng](https://docs.claude-mem-file.ai/usage/getting-started)** - Cách Claude-Mem-File hoạt động tự động
- **[Công Cụ Tìm Kiếm](https://docs.claude-mem-file.ai/usage/search-tools)** - Truy vấn lịch sử dự án bằng ngôn ngữ tự nhiên
- **[Tính Năng Beta](https://docs.claude-mem-file.ai/beta-features)** - Dùng thử các tính năng thử nghiệm như Endless Mode

### Thực Hành Tốt Nhất

- **[Kỹ Thuật Ngữ Cảnh](https://docs.claude-mem-file.ai/context-engineering)** - Nguyên tắc tối ưu hóa ngữ cảnh cho agent AI
- **[Tiết Lộ Tuần Tự](https://docs.claude-mem-file.ai/progressive-disclosure)** - Triết lý đằng sau chiến lược chuẩn bị ngữ cảnh của Claude-Mem-File

### Kiến Trúc

- **[Tổng Quan](https://docs.claude-mem-file.ai/architecture/overview)** - Các thành phần hệ thống & luồng dữ liệu
- **[Tiến Hóa Kiến Trúc](https://docs.claude-mem-file.ai/architecture-evolution)** - Hành trình từ v3 đến v5
- **[Kiến Trúc Hooks](https://docs.claude-mem-file.ai/hooks-architecture)** - Cách Claude-Mem-File sử dụng lifecycle hooks
- **[Tham Chiếu Hooks](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook scripts được giải thích
- **[Dịch Vụ Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API & quản lý Bun
- **[Docs Vault](docs/)** - Kho lưu trữ Markdown kiểu Obsidian cho kiến thức dự án chia sẻ

### Cấu Hình & Phát Triển

- **[Cấu Hình](https://docs.claude-mem-file.ai/configuration)** - Biến môi trường & cài đặt
- **[Phát Triển](https://docs.claude-mem-file.ai/development)** - Xây dựng, kiểm thử, đóng góp
- **[Khắc Phục Sự Cố](https://docs.claude-mem-file.ai/troubleshooting)** - Các vấn đề thường gặp & giải pháp

---

## Cách Hoạt Động

**Các Thành Phần Cốt Lõi:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook scripts)
2. **Smart Install** - Trình kiểm tra phụ thuộc được cache (pre-hook script, không phải lifecycle hook)
3. **Worker Service** - HTTP API trên cổng 37777 với giao diện web viewer và 10 điểm cuối tìm kiếm, được quản lý bởi Bun
4. **Docs Vault** (`docs/`) - Kho lưu trữ Markdown kiểu Obsidian được commit vào repository; nguồn sự thật được chia sẻ cho tất cả các quyết định kiến trúc, ngữ cảnh, và kiến thức qua các phiên và cộng tác viên
5. **mem-search Skill** - Truy vấn ngôn ngữ tự nhiên với tiết lộ tuần tự

Xem [Tổng Quan Kiến Trúc](https://docs.claude-mem-file.ai/architecture/overview) để biết chi tiết.

---

## Công Cụ Tìm Kiếm MCP

Claude-Mem-File cung cấp tìm kiếm bộ nhớ thông minh thông qua **4 công cụ MCP** theo mô hình quy trình công việc **3 lớp** tiết kiệm token:

**Quy Trình 3 Lớp:**

1. **`search`** - Lấy chỉ mục nhỏ gọn với ID (~50-100 token/kết quả)
2. **`timeline`** - Lấy ngữ cảnh theo thứ tự thời gian xung quanh kết quả thú vị
3. **`get_observations`** - Lấy chi tiết đầy đủ CHỈ cho các ID được lọc (~500-1,000 token/kết quả)

**Cách Hoạt Động:**

- Claude sử dụng công cụ MCP để tìm kiếm bộ nhớ của bạn
- Bắt đầu với `search` để lấy chỉ mục kết quả
- Sử dụng `timeline` để xem những gì đang xảy ra xung quanh các quan sát cụ thể
- Sử dụng `get_observations` để lấy chi tiết đầy đủ cho các ID liên quan
- **~10x tiết kiệm token** bằng cách lọc trước khi lấy chi tiết

**Công Cụ MCP Có Sẵn:**

1. **`search`** - Tìm kiếm chỉ mục bộ nhớ bằng truy vấn toàn văn, lọc theo type/date/project
2. **`timeline`** - Lấy ngữ cảnh theo thứ tự thời gian xung quanh một quan sát hoặc truy vấn cụ thể
3. **`get_observations`** - Lấy chi tiết quan sát đầy đủ bằng ID (luôn batch nhiều ID)

**Ví Dụ Sử Dụng:**

```typescript
// Bước 1: Tìm kiếm chỉ mục
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Bước 2: Xem xét chỉ mục, xác định các ID liên quan (ví dụ: #123, #456)

// Bước 3: Lấy chi tiết đầy đủ
get_observations((ids = [123, 456]));
```

Xem [Hướng Dẫn Công Cụ Tìm Kiếm](https://docs.claude-mem-file.ai/usage/search-tools) để biết các ví dụ chi tiết.

---

## Tính Năng Beta

Claude-Mem-File cung cấp **kênh beta** với các tính năng thử nghiệm như **Endless Mode** (kiến trúc bộ nhớ sinh học mô phỏng cho các phiên mở rộng). Chuyển đổi giữa các phiên bản ổn định và beta từ giao diện web viewer tại http://localhost:37777 → Settings.

Xem **[Tài Liệu Tính Năng Beta](https://docs.claude-mem-file.ai/beta-features)** để biết chi tiết về Endless Mode và cách dùng thử.

---

## Yêu Cầu Hệ Thống

- **Node.js**: 18.0.0 hoặc cao hơn
- **Claude Code**: Phiên bản mới nhất có hỗ trợ plugin
- **Bun**: JavaScript runtime và trình quản lý tiến trình (tự động cài đặt nếu thiếu)

---

### Ghi Chú Thiết Lập Windows

Nếu bạn thấy lỗi như:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Hãy chắc chắn rằng Node.js và npm được cài đặt và thêm vào PATH của bạn. Tải xuống trình cài đặt Node.js mới nhất từ https://nodejs.org và khởi động lại terminal sau khi cài đặt.

---

## Cấu Hình

Cài đặt được quản lý trong `~/.claude-mem-file/settings.json` (tự động tạo với giá trị mặc định khi chạy lần đầu). Cấu hình mô hình AI, cổng worker, thư mục dữ liệu, mức độ log, và cài đặt chèn ngữ cảnh.

Xem **[Hướng Dẫn Cấu Hình](https://docs.claude-mem-file.ai/configuration)** để biết tất cả các cài đặt có sẵn và ví dụ.

### Cấu Hình Chế Độ & Ngôn Ngữ

Claude-Mem-File hỗ trợ nhiều chế độ quy trình công việc và ngôn ngữ thông qua cài đặt `CLAUDE_MEM_MODE`.

Tùy chọn này kiểm soát cả hai điều:

- Hành vi quy trình công việc (ví dụ: code, chill, investigation)
- Ngôn ngữ được sử dụng trong các quan sát được tạo

#### Cách Cấu Hình

Chỉnh sửa tệp cài đặt của bạn tại `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Các chế độ được định nghĩa trong `plugin/modes/`. Để xem tất cả các chế độ có sẵn cục bộ:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Các Chế Độ Có Sẵn

| Chế Độ     | Mô Tả                 |
| ---------- | ----------------------- |
| `code`     | Chế độ Tiếng Anh mặc định |
| `code--zh` | Chế độ Tiếng Trung Giản thể |
| `code--ja` | Chế độ Tiếng Nhật |

Các chế độ dành riêng cho ngôn ngữ theo mô hình `code--[lang]` nơi `[lang]` là mã ngôn ngữ ISO 639-1 (ví dụ: `zh` cho Tiếng Trung, `ja` cho Tiếng Nhật, `es` cho Tiếng Tây Ban Nha).

> Lưu Ý: `code--zh` (Tiếng Trung Giản thể) đã được tích hợp sẵn — không cần cài đặt hoặc cập nhật plugin bổ sung.

#### Sau Khi Thay Đổi Chế Độ

Khởi động lại Claude Code để áp dụng cấu hình chế độ mới.

## Phát Triển

Xem **[Hướng Dẫn Phát Triển](https://docs.claude-mem-file.ai/development)** để biết hướng dẫn xây dựng, kiểm thử, và quy trình đóng góp.

---

## Khắc Phục Sự Cố

Nếu gặp sự cố, mô tả vấn đề cho Claude và kỹ năng khắc phục sự cố sẽ tự động chẩn đoán và cung cấp các bản sửa lỗi.

Xem **[Hướng Dẫn Khắc Phục Sự Cố](https://docs.claude-mem-file.ai/troubleshooting)** để biết các vấn đề thường gặp và giải pháp.

---

## Báo Cáo Lỗi

Tạo báo cáo lỗi toàn diện bằng trình tạo tự động:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Đóng Góp

Chúng tôi hoan nghênh các đóng góp! Vui lòng:

1. Fork repository
2. Tạo nhánh tính năng
3. Thực hiện thay đổi của bạn kèm kiểm thử
4. Cập nhật tài liệu
5. Gửi Pull Request

Xem [Hướng Dẫn Phát Triển](https://docs.claude-mem-file.ai/development) để biết quy trình đóng góp.

---

## Giấy Phép

Dự án này được cấp phép theo **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Bảo lưu mọi quyền.

Xem tệp [LICENSE](LICENSE) để biết chi tiết đầy đủ.

**Điều Này Có Nghĩa Là:**

- Bạn có thể sử dụng, sửa đổi và phân phối phần mềm này tự do
- Nếu bạn sửa đổi và triển khai trên máy chủ mạng, bạn phải cung cấp mã nguồn của mình
- Các tác phẩm phái sinh cũng phải được cấp phép theo AGPL-3.0
- KHÔNG CÓ BẢO HÀNH cho phần mềm này

**Lưu Ý Về Ragtime**: Thư mục `ragtime/` được cấp phép riêng theo **PolyForm Noncommercial License 1.0.0**. Xem [ragtime/LICENSE](ragtime/LICENSE) để biết chi tiết.

---

## Hỗ Trợ

- **Tài Liệu**: [docs/](docs/)
- **Vấn Đề**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Tài Khoản X Chính Thức**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord Chính Thức**: [Tham Gia Discord](https://discord.com/invite/J4wttp9vDu)
- **Tác Giả**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Được Xây Dựng với Claude Agent SDK** | **Được Hỗ Trợ bởi Claude Code** | **Được Tạo với TypeScript**

---

### Chuyện Gì Với $CMEM?

$CMEM là một token Solana được tạo bởi bên thứ ba mà không có sự đồng ý trước của Claude-Mem-File, nhưng được chính thức ủng hộ bởi người tạo Claude-Mem-File (Alex Newman, @thedotmack). Token này hoạt động như một chất xúc tác cộng đồng cho sự phát triển và một phương tiện để mang dữ liệu agent thời gian thực cho các nhà phát triển và công nhân kiến thức cần nó nhất. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
