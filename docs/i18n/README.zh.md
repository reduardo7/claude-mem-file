🌐 这是机器翻译版本。欢迎社区纠错！

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

<h4 align="center">claude-mem-file — 为 <a href="https://claude.com/claude-code" target="_blank">Claude Code</a> 构建的持久化内存压缩系统。</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/thedotmack/claude-mem-file">
        <picture>
          <img
            src="https://raw.githubusercontent.com/thedotmack/claude-mem-file/main/docs/public/cm-preview.gif"
            alt="Claude-Mem-File Preview"
            width="500"
          >
        </picture>
      </a>
    </td>
    <td align="center">
      <a href="https://www.star-history.com/#thedotmack/claude-mem-file&Date">
        <picture>
          <source
            media="(prefers-color-scheme: dark)"
            srcset="https://api.star-history.com/image?repos=thedotmack/claude-mem-file&type=date&theme=dark&legend=top-left"
          />
          <source
            media="(prefers-color-scheme: light)"
            srcset="https://api.star-history.com/image?repos=thedotmack/claude-mem-file&type=date&legend=top-left"
          />
          <img
            alt="Star History Chart"
            src="https://api.star-history.com/image?repos=thedotmack/claude-mem-file&type=date&legend=top-left"
            width="500"
          />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#快速开始">快速开始</a> •
  <a href="#工作原理">工作原理</a> •
  <a href="#mcp-搜索工具">搜索工具</a> •
  <a href="#文档">文档</a> •
  <a href="#配置">配置</a> •
  <a href="#故障排除">故障排除</a> •
  <a href="#许可证">许可证</a>
</p>

<p align="center">
  Claude-Mem-File 通过捕获工具使用观察、生成语义摘要，并将所有内容作为版本化 Markdown 文件存储在每个项目的 Obsidian 兼容仓库 <code>&lt;project-root&gt;/docs/vault/</code> 中，无缝保留跨会话的上下文——无需 SQLite 数据库，无二进制数据，完全可通过 git 合并。
</p>

---

## 快速开始

使用单个命令安装：

```bash
npx claude-mem-file install
```

或为 Gemini CLI 安装（自动检测 `~/.gemini`）：

```bash
npx claude-mem-file install --ide gemini-cli
```

或为 OpenCode 安装：

```bash
npx claude-mem-file install --ide opencode
```

或在 Claude Code 内通过插件市场安装：

```bash
/plugin marketplace add thedotmack/claude-mem-file

/plugin install claude-mem-file
```

重启 Claude Code 或 Gemini CLI。来自先前会话的上下文将自动出现在新会话中。

> **注意：** Claude-Mem-File 也发布在 npm 上，但 `npm install -g claude-mem-file` 仅安装 **SDK/库** — 不会注册插件钩子或设置 worker 服务。请始终通过 `npx claude-mem-file install` 或上述 `/plugin` 命令进行安装。

### 🦞 OpenClaw 网关

使用单个命令在 [OpenClaw](https://openclaw.ai) 网关上将 claude-mem-file 安装为持久化内存插件：

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

安装程序负责处理依赖项、插件设置、AI 提供商配置、worker 启动，以及可选的实时观察信息推送至 Telegram、Discord、Slack 等平台。详见 [OpenClaw 集成指南](https://docs.claude-mem-file.ai/openclaw-integration)。

**核心特性：**

- 🧠 **持久化内存** - 上下文跨会话保留
- 📁 **Markdown Vault（Obsidian 兼容）** - 观察和会话以 `.md` 文件形式存储在 `<project-root>/docs/vault/` 下，可通过 git 进行版本管理和合并——无 SQLite，开发机器无二进制状态
- 📊 **渐进式披露** - 分层内存检索，具有令牌成本可见性
- 🔍 **基于技能的搜索** - 使用 mem-search 技能查询项目历史（由 vault 上的内存 `minisearch` 驱动）
- 🖥️ **Web 查看器界面** - 在 http://localhost:37777 实时查看内存流
- 💻 **Claude Desktop 技能** - 从 Claude Desktop 对话中搜索内存
- 🔒 **隐私控制** - 使用 `<private>` 标签排除敏感内容的存储
- ⚙️ **上下文配置** - 精细控制注入的上下文内容
- 🤖 **自动操作** - 无需手动干预
- 🔗 **引用** - 使用 ID 引用过去的观察（通过 http://localhost:37777/api/observation/{id} 访问，或在 http://localhost:37777 的 Web 查看器中查看全部）
- 🧪 **测试版渠道** - 通过版本切换尝试实验性功能，如无尽模式

## 从 SQLite 迁移（旧版）

早期版本将内存存储在 `~/.claude-mem-file/claude-mem-file.db`（SQLite + FTS5 + ChromaDB）中。新的 vault 布局用 `<project-root>/docs/vault/` 中的纯 Markdown 替代了所有这些。您之前的记忆不会丢失——运行一次迁移脚本即可：

```bash
# 在任何之前使用过 claude-mem-file 的项目中：
npm run migrate-to-vault              # 从旧版数据库写入 docs/vault/
npm run migrate-to-vault:dry          # 预览而不写入
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # 显式路径
```

该脚本以只读方式打开 SQLite 数据库，且是幂等的（通过 SHA-256 内容哈希检测重复，重复运行是安全的）。将生成的 `docs/vault/` 文件夹提交到您的仓库，以便与团队共享内存。

---

## 文档

📚 **[查看完整文档](https://docs.claude-mem-file.ai/)** - 在官方网站浏览

### 入门指南

- **[安装指南](https://docs.claude-mem-file.ai/installation)** - 快速开始与高级安装
- **[Gemini CLI 设置](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google Gemini CLI 集成专属指南
- **[使用指南](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-File 如何自动工作
- **[搜索工具](https://docs.claude-mem-file.ai/usage/search-tools)** - 使用自然语言查询项目历史
- **[测试版功能](https://docs.claude-mem-file.ai/beta-features)** - 尝试实验性功能，如无尽模式

### 最佳实践

- **[上下文工程](https://docs.claude-mem-file.ai/context-engineering)** - AI 代理上下文优化原则
- **[渐进式披露](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-File 上下文启动策略背后的哲学

### 架构

- **[概述](https://docs.claude-mem-file.ai/architecture/overview)** - 系统组件与数据流
- **[架构演进](https://docs.claude-mem-file.ai/architecture-evolution)** - 从 v3 到 v5 的旅程
- **[钩子架构](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-File 如何使用生命周期钩子
- **[钩子参考](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 个钩子脚本详解
- **[Worker 服务](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API 与 Bun 管理
- **[Docs Vault](../)** - 用于共享项目知识的 Obsidian 风格 Markdown vault

### 配置与开发

- **[配置](https://docs.claude-mem-file.ai/configuration)** - 环境变量与设置
- **[开发](https://docs.claude-mem-file.ai/development)** - 构建、测试、贡献
- **[故障排除](https://docs.claude-mem-file.ai/troubleshooting)** - 常见问题与解决方案

---

## 工作原理

**核心组件：**

1. **5 个生命周期钩子** - SessionStart、UserPromptSubmit、PostToolUse、Stop、SessionEnd（6 个钩子脚本）
2. **智能安装** - 缓存依赖检查器（预钩子脚本，不是生命周期钩子）
3. **Worker 服务** - 在端口 37777 上的 HTTP API，带有 Web 查看器界面和 10 个搜索端点，由 Bun 管理
4. **Docs Vault**（`docs/`）- 提交到仓库的 Obsidian 风格 Markdown vault；所有跨会话和协作者的架构决策、上下文和知识的共享真实来源
5. **mem-search 技能** - 具有渐进式披露的自然语言查询

详见[架构概述](https://docs.claude-mem-file.ai/architecture/overview)。

---

## MCP 搜索工具

Claude-Mem-File 通过 **4 个 MCP 工具** 提供智能内存搜索，遵循令牌高效的 **3 层工作流模式**：

**3 层工作流：**

1. **`search`** - 获取带 ID 的紧凑索引（每个结果约 50-100 个令牌）
2. **`timeline`** - 获取感兴趣结果周围的时间顺序上下文
3. **`get_observations`** - 仅为筛选后的 ID 获取完整详情（每个结果约 500-1,000 个令牌）

**工作方式：**

- Claude 使用 MCP 工具搜索您的内存
- 从 `search` 开始获取结果索引
- 使用 `timeline` 查看特定观察周围发生的情况
- 使用 `get_observations` 获取相关 ID 的完整详情
- 通过在获取详情前先筛选，实现**约 10 倍的令牌节省**

**可用 MCP 工具：**

1. **`search`** - 使用全文查询搜索内存索引，按类型/日期/项目筛选
2. **`timeline`** - 获取特定观察或查询周围的时间顺序上下文
3. **`get_observations`** - 通过 ID 获取完整观察详情（始终批量处理多个 ID）

**使用示例：**

```typescript
// 第一步：搜索索引
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// 第二步：查看索引，识别相关 ID（例如 #123、#456）

// 第三步：获取完整详情
get_observations((ids = [123, 456]));
```

详见[搜索工具指南](https://docs.claude-mem-file.ai/usage/search-tools)的详细示例。

---

## 测试版功能

Claude-Mem-File 提供**测试版渠道**，包含实验性功能，如**无尽模式**（用于扩展会话的仿生记忆架构）。从 Web 查看器界面 http://localhost:37777 → 设置 切换稳定版和测试版。

详见 **[测试版功能文档](https://docs.claude-mem-file.ai/beta-features)** 了解无尽模式的详细信息和试用方法。

---

## 系统要求

- **Node.js**: 18.0.0 或更高版本
- **Claude Code**: 支持插件的最新版本
- **Bun**: JavaScript 运行时和进程管理器（如缺失会自动安装）

---

### Windows 设置说明

如果您看到如下错误：

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

请确保 Node.js 和 npm 已安装并添加到您的 PATH 中。从 https://nodejs.org 下载最新的 Node.js 安装程序，安装后重启终端。

---

## 配置

设置在 `~/.claude-mem-file/settings.json` 中管理（首次运行时自动创建默认设置）。可配置 AI 模型、worker 端口、数据目录、日志级别和上下文注入设置。

详见 **[配置指南](https://docs.claude-mem-file.ai/configuration)** 了解所有可用设置和示例。

### 模式与语言配置

Claude-Mem-File 通过 `CLAUDE_MEM_MODE` 设置支持多种工作流模式和语言。

此选项同时控制：

- 工作流行为（例如 code、chill、investigation）
- 生成观察时使用的语言

#### 如何配置

编辑您的设置文件 `~/.claude-mem-file/settings.json`：

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

模式定义在 `plugin/modes/` 中。查看本地所有可用模式：

```bash
ls ~/.claude/plugins/marketplaces/thedotmack/plugin/modes/
```

#### 可用模式

| 模式       | 描述             |
| ---------- | --------------- |
| `code`     | 默认英语模式    |
| `code--zh` | 简体中文模式    |
| `code--ja` | 日语模式        |

特定语言模式遵循 `code--[lang]` 模式，其中 `[lang]` 是 ISO 639-1 语言代码（例如，`zh` 表示中文，`ja` 表示日语，`es` 表示西班牙语）。

> 注意：`code--zh`（简体中文）已内置——无需额外安装或插件更新。

#### 更改模式后

## 重启 Claude Code 以应用新的模式配置。

## 开发

详见 **[开发指南](https://docs.claude-mem-file.ai/development)** 了解构建说明、测试和贡献工作流程。

---

## 故障排除

如果遇到问题，向 Claude 描述问题，troubleshoot 技能将自动诊断并提供修复方案。

详见 **[故障排除指南](https://docs.claude-mem-file.ai/troubleshooting)** 了解常见问题和解决方案。

---

## Bug 报告

使用自动生成器创建全面的 bug 报告：

```bash
cd ~/.claude/plugins/marketplaces/thedotmack
npm run bug-report
```

## 贡献

欢迎贡献！请：

1. Fork 仓库
2. 创建功能分支
3. 进行更改并添加测试
4. 更新文档
5. 提交 Pull Request

详见[开发指南](https://docs.claude-mem-file.ai/development)了解贡献工作流程。

---

## 许可证

本项目采用 **GNU Affero General Public License v3.0**（AGPL-3.0）许可。

Copyright (C) 2025 Alex Newman (@thedotmack)。保留所有权利。

详见 [LICENSE](LICENSE) 文件了解完整详情。

**这意味着什么：**

- 您可以自由使用、修改和分发本软件
- 如果您修改并部署到网络服务器上，必须公开您的源代码
- 衍生作品也必须采用 AGPL-3.0 许可
- 本软件不提供任何保证

**关于 Ragtime 的说明**：`ragtime/` 目录单独采用 **PolyForm Noncommercial License 1.0.0** 许可。详见 [ragtime/LICENSE](ragtime/LICENSE)。

---

## 支持

- **文档**：[docs/](../)
- **问题反馈**：[GitHub Issues](https://github.com/thedotmack/claude-mem-file/issues)
- **仓库**：[github.com/thedotmack/claude-mem-file](https://github.com/thedotmack/claude-mem-file)
- **官方 X 账号**：[@Claude_Memory](https://x.com/Claude_Memory)
- **官方 Discord**：[加入 Discord](https://discord.com/invite/J4wttp9vDu)
- **作者**：Alex Newman（[@thedotmack](https://github.com/thedotmack)）

---

**使用 Claude Agent SDK 构建** | **由 Claude Code 驱动** | **使用 TypeScript 制作**

---

### 关于 $CMEM？

$CMEM 是由第三方创建的 Solana 代币，未经 Claude-Mem-File 事先同意，但已获得 Claude-Mem-File 创建者（Alex Newman，@thedotmack）的官方认可。该代币作为社区增长的催化剂，也是将实时代理数据传递给最需要它的开发者和知识工作者的载体。$CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
