🌐 這是機器翻譯版本。歡迎社群糾錯！

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
> **這是 [claude-mem](https://github.com/thedotmack/claude-mem) 的分支** 由 [Alex Newman (@thedotmack)](https://github.com/thedotmack) 開發。
>
> 此分支將 SQLite/二進制存儲後端替換為**純文件系統方法**：所有記憶都存儲為 `<project-root>/docs/vault/` 下的純 Markdown 文件，完全通過 git 版本控制並可與團隊每個成員共享。無本地數據庫、無二進制 blob — 只是可以讀取、編輯、提交和合併的文件。

<h4 align="center">claude-mem-file — 為 <a href="https://claude.com/claude-code" target="_blank">Claude Code</a> 構建的持久記憶壓縮系統。</h4>

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
  <a href="#快速開始">快速開始</a> •
  <a href="#工作原理">工作原理</a> •
  <a href="#mcp-搜尋工具">搜尋工具</a> •
  <a href="#文檔">文檔</a> •
  <a href="#配置">配置</a> •
  <a href="#故障排除">故障排除</a> •
  <a href="#許可證">許可證</a>
</p>

<p align="center">
  Claude-Mem-File 通過捕獲工具使用觀察、生成語義摘要，並將所有內容存儲為版本控制的 Markdown 文件，無縫地跨會話保留上下文，位於每個項目的 Obsidian 兼容保管庫 <code>&lt;project-root&gt;/docs/vault/</code> — 無 SQLite 數據庫、無二進制 blob、完全可通過 git 合併。
</p>

---

## 快速開始

使用單個命令安裝：

```bash
npx claude-mem-file install
```

或為 Gemini CLI 安裝（自動檢測 `~/.gemini`）：

```bash
npx claude-mem-file install --ide gemini-cli
```

或為 OpenCode 安裝：

```bash
npx claude-mem-file install --ide opencode
```

或從 Claude Code 內的插件市場安裝：

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

重新啟動 Claude Code 或 Gemini CLI。前一個會話的上下文將自動出現在新會話中。

> **注意：** Claude-Mem-File 也發佈在 npm 上，但 `npm install -g claude-mem-file` 只安裝 **SDK/庫** — 它不會註冊插件鉤子或設置工作服務。始終通過 `npx claude-mem-file install` 或上述 `/plugin` 命令安裝。

### 🦞 OpenClaw 網關

使用單個命令在 [OpenClaw](https://openclaw.ai) 網關上安裝 claude-mem-file 作為持久記憶插件：

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

安裝程序處理依賴項、插件設置、AI 提供商配置、工作服務啟動和可選的實時觀察源到 Telegram、Discord、Slack 等。詳見 [OpenClaw 集成指南](https://docs.claude-mem-file.ai/openclaw-integration)。

**主要功能：**

- 🧠 **持久記憶** - 上下文在會話間保持
- 📁 **Markdown 保管庫 (Obsidian 兼容)** - 觀察和會話存儲為 `.md` 文件，位於 `<project-root>/docs/vault/`，版本控制並可通過 git 合併 — 無 SQLite、開發機上無二進制狀態
- 📊 **漸進披露** - 分層記憶檢索，具有標記成本可見性
- 🔍 **基於技能的搜尋** - 使用 mem-search 技能查詢您的項目歷史（由保管庫上的內存中 `minisearch` 驅動）
- 🖥️ **Web 查看器 UI** - 實時記憶流在 http://localhost:37777
- 💻 **Claude 桌面技能** - 從 Claude 桌面對話搜尋記憶
- 🔒 **隱私控制** - 使用 `<private>` 標籤排除敏感內容不存儲
- ⚙️ **上下文配置** - 對注入什麼上下文的精細控制
- 🤖 **自動操作** - 無需手動干預
- 🔗 **引用** - 使用 ID 參考過去的觀察（通過 http://localhost:37777/api/observation/{id} 訪問或在 http://localhost:37777 的 web 查看器中查看全部）
- 🧪 **測試版通道** - 通過版本切換嘗試實驗功能，如無限模式

## 從 SQLite（舊版）遷移

早期版本將記憶存儲在 `~/.claude-mem-file/claude-mem-file.db`（SQLite + FTS5 + ChromaDB）。新的保管庫布局將所有內容替換為 `<project-root>/docs/vault/` 中的純 Markdown。您的先前記憶不會丟失 — 運行遷移腳本一次：

```bash
# 從之前使用 claude-mem-file 的任何項目中：
npm run migrate-to-vault              # 從舊 DB 寫入 docs/vault/
npm run migrate-to-vault:dry          # 不寫入預覽
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # 明確路徑
```

該腳本以只讀方式打開 SQLite 數據庫，是冪等的（通過 SHA-256 內容哈希檢測重複項，因此重新運行是安全的）。將生成的 `docs/vault/` 文件夾提交到您的倉庫，以與您的團隊共享記憶。

---

## 文檔

📚 **[查看完整文檔](https://docs.claude-mem-file.ai/)** - 在官方網站上瀏覽

### 快速開始

- **[安裝指南](https://docs.claude-mem-file.ai/installation)** - 快速開始和高級安裝
- **[Gemini CLI 設置](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google 的 Gemini CLI 集成專用指南
- **[使用指南](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-File 如何自動工作
- **[搜尋工具](https://docs.claude-mem-file.ai/usage/search-tools)** - 使用自然語言查詢您的項目歷史
- **[測試版功能](https://docs.claude-mem-file.ai/beta-features)** - 嘗試實驗功能，如無限模式

### 最佳實踐

- **[上下文工程](https://docs.claude-mem-file.ai/context-engineering)** - AI 代理上下文優化原則
- **[漸進披露](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-File 上下文引導策略背後的哲學

### 架構

- **[概述](https://docs.claude-mem-file.ai/architecture/overview)** - 系統組件和數據流
- **[架構演變](https://docs.claude-mem-file.ai/architecture-evolution)** - 從 v3 到 v5 的歷程
- **[鉤子架構](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-File 如何使用生命週期鉤子
- **[鉤子參考](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 個鉤子腳本解釋
- **[工作服務](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API 和 Bun 管理
- **[文檔保管庫](docs/)** - 用於共享項目知識的 Obsidian 式 Markdown 保管庫

### 配置和開發

- **[配置](https://docs.claude-mem-file.ai/configuration)** - 環境變量和設置
- **[開發](https://docs.claude-mem-file.ai/development)** - 構建、測試、貢獻
- **[故障排除](https://docs.claude-mem-file.ai/troubleshooting)** - 常見問題和解決方案

---

## 工作原理

**核心組件：**

1. **5 個生命週期鉤子** - SessionStart、UserPromptSubmit、PostToolUse、Stop、SessionEnd（6 個鉤子腳本）
2. **智能安裝** - 緩存依賴項檢查器（前置鉤子腳本，不是生命週期鉤子）
3. **工作服務** - 端口 37777 上的 HTTP API，具有 web 查看器 UI 和 10 個搜尋端點，由 Bun 管理
4. **文檔保管庫** (`docs/`) - 提交到倉庫的 Obsidian 式 Markdown 保管庫；所有架構決策、上下文和知識跨會話和協作者的共享源真相
5. **mem-search 技能** - 具有漸進披露的自然語言查詢

詳見 [架構概述](https://docs.claude-mem-file.ai/architecture/overview)。

---

## MCP 搜尋工具

Claude-Mem-File 通過 **4 個 MCP 工具** 提供智能記憶搜尋，遵循標記高效的 **3 層工作流程模式**：

**3 層工作流程：**

1. **`search`** - 獲取緊湊索引，含 ID（約 50-100 個標記/結果）
2. **`timeline`** - 在有趣結果周圍獲取時間順序上下文
3. **`get_observations`** - 僅為過濾的 ID 獲取完整詳細信息（約 500-1,000 個標記/結果）

**工作方式：**

- Claude 使用 MCP 工具搜尋您的記憶
- 從 `search` 開始獲取結果索引
- 使用 `timeline` 查看特定觀察周圍發生的情況
- 使用 `get_observations` 獲取相關 ID 的完整詳細信息
- **在獲取詳細信息前過濾節省約 10 倍標記**

**可用 MCP 工具：**

1. **`search`** - 使用全文查詢搜尋記憶索引，按類型/日期/項目過濾
2. **`timeline`** - 獲取特定觀察或查詢周圍的時間順序上下文
3. **`get_observations`** - 按 ID 獲取完整觀察詳細信息（始終批量處理多個 ID）

**使用示例：**

```typescript
// 第 1 步：搜尋索引
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// 第 2 步：查看索引，識別相關 ID（例如，#123、#456）

// 第 3 步：獲取完整詳細信息
get_observations((ids = [123, 456]));
```

詳見 [搜尋工具指南](https://docs.claude-mem-file.ai/usage/search-tools)。

---

## 測試版功能

Claude-Mem-File 提供 **測試版通道**，具有實驗功能，如 **無限模式**（用於擴展會話的仿生記憶架構）。從 web 查看器 UI http://localhost:37777 → 設置中的穩定版和測試版之間切換。

詳見 **[測試版功能文檔](https://docs.claude-mem-file.ai/beta-features)** 瞭解無限模式詳情以及如何嘗試它。

---

## 系統要求

- **Node.js**：18.0.0 或更高版本
- **Claude Code**：最新版本，帶有插件支持
- **Bun**：JavaScript 運行時和進程管理器（如果缺少則自動安裝）

---

### Windows 設置注意事項

如果您看到類似以下錯誤：

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

確保 Node.js 和 npm 已安裝並添加到您的 PATH。從 https://nodejs.org 下載最新 Node.js 安裝程序，並在安裝後重新啟動您的終端。

---

## 配置

設置在 `~/.claude-mem-file/settings.json` 中進行管理（首次運行時自動創建默認值）。配置 AI 模型、工作服務端口、數據目錄、日誌級別和上下文注入設置。

詳見 **[配置指南](https://docs.claude-mem-file.ai/configuration)** 瞭解所有可用設置和示例。

### 模式和語言配置

Claude-Mem-File 通過 `CLAUDE_MEM_MODE` 設置支持多個工作流程模式和語言。

此選項控制：

- 工作流程行為（例如 code、chill、investigation）
- 生成的觀察中使用的語言

#### 如何配置

編輯您位於 `~/.claude-mem-file/settings.json` 的設置文件：

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

模式定義在 `plugin/modes/` 中。要查看本地所有可用模式：

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### 可用模式

| 模式       | 描述             |
| ---------- | ----------------------- |
| `code`     | 默認英文模式    |
| `code--zh` | 簡體中文模式 |
| `code--ja` | 日文模式           |

語言特定模式遵循 `code--[lang]` 模式，其中 `[lang]` 是 ISO 639-1 語言代碼（例如，`zh` 代表中文、`ja` 代表日文、`es` 代表西班牙文）。

> 注意：`code--zh`（簡體中文）已內置 — 無需額外安裝或插件更新。

#### 更改模式後

重新啟動 Claude Code 以應用新的模式配置。

## 開發

詳見 **[開發指南](https://docs.claude-mem-file.ai/development)** 瞭解構建說明、測試和貢獻工作流程。

---

## 故障排除

如果遇到問題，向 Claude 描述問題，故障排除技能將自動診斷並提供修復。

詳見 **[故障排除指南](https://docs.claude-mem-file.ai/troubleshooting)** 瞭解常見問題和解決方案。

---

## 錯誤報告

使用自動化生成器創建綜合錯誤報告：

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## 貢獻

歡迎貢獻！請：

1. Fork 倉庫
2. 創建功能分支
3. 使用測試進行更改
4. 更新文檔
5. 提交拉取請求

詳見 [開發指南](https://docs.claude-mem-file.ai/development) 瞭解貢獻工作流程。

---

## 許可證

該項目在 **GNU Affero 通用公共許可證 v3.0** (AGPL-3.0) 下許可。

版權所有 (C) 2025 Alex Newman (@thedotmack)。版權所有。

詳見 [LICENSE](LICENSE) 文件瞭解完整詳情。

**這意味著什麼：**

- 您可以自由使用、修改和分發此軟件
- 如果您修改並在網絡服務器上部署，您必須提供源代碼
- 衍生作品也必須在 AGPL-3.0 下許可
- 此軟件無任何保證

**關於 Ragtime 的注意：** `ragtime/` 目錄在 **PolyForm 非商業許可證 1.0.0** 下單獨許可。詳見 [ragtime/LICENSE](ragtime/LICENSE)。

---

## 支持

- **文檔**：[docs/](docs/)
- **問題**：[GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **倉庫**：[github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **官方 X 帳戶**：[@Claude_Memory](https://x.com/Claude_Memory)
- **官方 Discord**：[加入 Discord](https://discord.com/invite/J4wttp9vDu)
- **作者**：Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**使用 Claude Agent SDK 構建** | **由 Claude Code 驅動** | **使用 TypeScript 製作**

---

### 關於 $CMEM？

$CMEM 是由第三方創建的 Solana 代幣，未經 Claude-Mem-File 事先同意，但由 Claude-Mem-File 創建者（Alex Newman、@thedotmack）正式贊同。該代幣充當社區增長的催化劑和將實時代理數據帶給最需要它的開發人員和知識工作者的工具。$CMEM：2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
