🌐 これは機械翻訳です。コミュニティによる修正を歓迎します！

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
> **これは [claude-mem](https://github.com/thedotmack/claude-mem) のフォークです** ([Alex Newman (@thedotmack)](https://github.com/thedotmack)による)。
>
> このフォークは SQLite/バイナリストレージバックエンドを **ファイルシステムのみのアプローチ** に置き換えています。すべてのメモリは `<project-root>/docs/vault/` の下のプレーンな Markdown ファイルとして保存され、git で完全にバージョン管理でき、チームのすべてのメンバーと共有できます。ローカルデータベースなし、バイナリブロブなし — 読み取り、編集、コミット、マージできるファイルだけです。

<h4 align="center">claude-mem-file — <a href="https://claude.com/claude-code" target="_blank">Claude Code</a> 向けに構築された永続メモリ圧縮システム。</h4>

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
  <a href="#クイックスタート">クイックスタート</a> •
  <a href="#動作仕組み">動作仕組み</a> •
  <a href="#mcpサーチツール">サーチツール</a> •
  <a href="#ドキュメンテーション">ドキュメンテーション</a> •
  <a href="#設定">設定</a> •
  <a href="#トラブルシューティング">トラブルシューティング</a> •
  <a href="#ライセンス">ライセンス</a>
</p>

<p align="center">
  Claude-Mem-File はツール使用の観察を捕捉し、セマンティック要約を生成し、すべてを `<project-root>/docs/vault/` のプロジェクトごとの Obsidian 互換保管庫内のバージョン管理されたマークダウンとして保存することにより、セッション間でコンテキストをシームレスに保存します — SQLite データベースなし、バイナリブロブなし、git で完全にマージ可能です。
</p>

---

## クイックスタート

1つのコマンドでインストール：

```bash
npx claude-mem-file install
```

または Gemini CLI 用にインストール(`~/.gemini`自動検出)：

```bash
npx claude-mem-file install --ide gemini-cli
```

または OpenCode 用にインストール：

```bash
npx claude-mem-file install --ide opencode
```

または Claude Code 内のプラグインマーケットプレイスからインストール：

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Claude Code または Gemini CLI を再起動します。前のセッションからのコンテキストが新しいセッションに自動的に表示されます。

> **注:** Claude-Mem-File は npm に公開されていますが、`npm install -g claude-mem-file` はプラグインフックを登録したりワーカーサービスをセットアップしたりしません。常に `npx claude-mem-file install` または上記の `/plugin` コマンドを使用してインストールしてください。

### 🦞 OpenClaw Gateway

[OpenClaw](https://openclaw.ai) ゲートウェイに単一のコマンドで claude-mem-file を永続メモリプラグインとしてインストール：

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

インストーラは依存関係、プラグインセットアップ、AI プロバイダ設定、ワーカー起動、および Telegram、Discord、Slack などへのオプションのリアルタイム観察フィード処理を行います。詳細については [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) を参照してください。

**主な機能：**

- 🧠 **永続メモリ** - コンテキストはセッション間で保存
- 📁 **マークダウン保管庫 (Obsidian 互換)** - 観察およびセッションが `<project-root>/docs/vault/` の下の `.md` ファイルとして保存され、git でバージョン管理でき、マージ可能です — SQLite なし、開発マシン上のバイナリ状態なし
- 📊 **段階的開示** - トークンコスト可視性を備えた多層メモリ取得
- 🔍 **スキルベースの検索** - mem-search スキルを使用してプロジェクト履歴を照会(保管庫上のメモリ内 `minisearch` による)
- 🖥️ **Web ビューアー UI** - http://localhost:37777 のリアルタイムメモリストリーム
- 💻 **Claude Desktop スキル** - Claude Desktop の会話からメモリを検索
- 🔒 **プライバシー制御** - `<private>` タグを使用して機密コンテンツをストレージから除外
- ⚙️ **コンテキスト構成** - 注入されるコンテキストについての細かい制御
- 🤖 **自動操作** - 手動介入は不要
- 🔗 **引用** - ID で過去の観察を参照 (http://localhost:37777/api/observation/{id} でアクセスするか、http://localhost:37777 の web ビューアーですべてを表示)
- 🧪 **ベータチャネル** - Endless Mode などの試験的機能を試す (バージョン切り替えで試行可能)

## SQLite からの移行 (レガシー)

以前のリリースはメモリを `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB) に保存していました。新しい保管庫レイアウトはそのすべてを `<project-root>/docs/vault/` のプレーンなマークダウンに置き換えます。以前のメモリは失われていません — 1 回だけ移行スクリプトを実行：

```bash
# 以前 claude-mem-file を使用していたプロジェクト内で実行：
npm run migrate-to-vault              # docs/vault/ をレガシー DB から書き込み
npm run migrate-to-vault:dry          # 書き込みなしでプレビュー
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # 明示的なパス
```

スクリプトは SQLite データベースを読み取り専用で開き、べき等です (SHA-256 コンテンツハッシュで重複を検出するため、再実行は安全です)。`docs/vault/` フォルダをコミットしてリポジトリに送信し、チームとメモリを共有します。

---

## ドキュメンテーション

📚 **[完全なドキュメンテーションを表示](https://docs.claude-mem-file.ai/)** - 公式ウェブサイトで閲覧

### はじめに

- **[インストールガイド](https://docs.claude-mem-file.ai/installation)** - クイックスタート & 高度なインストール
- **[Gemini CLI セットアップ](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google の Gemini CLI 統合専用ガイド
- **[使用ガイド](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-File がどのように自動的に動作するか
- **[サーチツール](https://docs.claude-mem-file.ai/usage/search-tools)** - 自然言語でプロジェクト履歴を照会
- **[ベータ機能](https://docs.claude-mem-file.ai/beta-features)** - Endless Mode などの試験的機能を試す

### ベストプラクティス

- **[コンテキストエンジニアリング](https://docs.claude-mem-file.ai/context-engineering)** - AI エージェントコンテキスト最適化原理
- **[段階的開示](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-File のコンテキストプライミング戦略の背景

### アーキテクチャ

- **[概要](https://docs.claude-mem-file.ai/architecture/overview)** - システムコンポーネント & データフロー
- **[アーキテクチャの進化](https://docs.claude-mem-file.ai/architecture-evolution)** - v3 から v5 への道
- **[フック アーキテクチャ](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-File がどのようにライフサイクルフックを使用するか
- **[フック リファレンス](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 つのフックスクリプト説明
- **[ワーカー サービス](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API & Bun 管理
- **[ドキュメント保管庫](docs/)** - 共有プロジェクト知識用の Obsidian スタイルマークダウン保管庫

### 設定 & 開発

- **[設定](https://docs.claude-mem-file.ai/configuration)** - 環境変数 & 設定
- **[開発](https://docs.claude-mem-file.ai/development)** - ビルド、テスト、貢献
- **[トラブルシューティング](https://docs.claude-mem-file.ai/troubleshooting)** - 一般的な問題 & 解決策

---

## 動作仕組み

**コアコンポーネント：**

1. **5 つのライフサイクルフック** - SessionStart、UserPromptSubmit、PostToolUse、Stop、SessionEnd (6 つのフックスクリプト)
2. **スマートインストール** - キャッシュされた依存関係チェッカー (ライフサイクルフックではないプリフックスクリプト)
3. **ワーカー サービス** - ポート 37777 上の HTTP API (web ビューアー UI および 10 つの検索エンドポイント)、Bun で管理
4. **ドキュメント保管庫** (`docs/`) - リポジトリにコミットされた Obsidian スタイルマークダウン保管庫；セッションおよび協力者間のすべての建築上の決定、コンテキスト、知識の共有ソース
5. **mem-search スキル** - 段階的開示による自然言語クエリ

詳細については [Architecture Overview](https://docs.claude-mem-file.ai/architecture/overview) を参照してください。

---

## MCP サーチツール

Claude-Mem-File はトークン効率的な **3 層ワークフローパターン** に従う **4 つの MCP ツール** を通じてインテリジェントなメモリ検索を提供します：

**3 層ワークフロー：**

1. **`search`** - コンパクトインデックス取得 (~50-100 トークン/結果)
2. **`timeline`** - 興味深い結果周辺の時系列コンテキスト取得
3. **`get_observations`** - フィルター処理された ID のフルディテール取得のみ (~500-1,000 トークン/結果)

**動作方法：**

- Claude が MCP ツールを使用してメモリを検索
- `search` を開始してインデックスを取得
- `timeline` を使用して特定の観察周辺の状況を確認
- `get_observations` を使用して関連 ID のフルディテール取得
- **詳細取得前にフィルター処理することで ~10 倍のトークン節約**

**利用可能な MCP ツール：**

1. **`search`** - フルテキストクエリ、タイプ/日付/プロジェクト別フィルタでメモリインデックス検索
2. **`timeline`** - 特定の観察またはクエリ周辺の時系列コンテキスト取得
3. **`get_observations`** - ID でフル観察詳細を取得 (常に複数 ID をバッチ処理)

**使用例：**

```typescript
// ステップ 1: インデックス検索
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// ステップ 2: インデックス確認、関連 ID 特定 (例：#123、#456)

// ステップ 3: フルディテール取得
get_observations((ids = [123, 456]));
```

詳細な例については [Search Tools Guide](https://docs.claude-mem-file.ai/usage/search-tools) を参照してください。

---

## ベータ機能

Claude-Mem-File は **Endless Mode** (拡張セッション用バイオミメティックメモリアーキテクチャ) などの試験的機能を備えた **ベータチャネル** を提供します。Web ビューアー UI (http://localhost:37777 → 設定) から安定版とベータ版を切り替えます。

詳細については **[ベータ機能ドキュメンテーション](https://docs.claude-mem-file.ai/beta-features)** を参照してください。

---

## システム要件

- **Node.js**: 18.0.0 以上
- **Claude Code**: プラグインサポート付きの最新版
- **Bun**: JavaScript ランタイムおよびプロセスマネージャー (不足している場合は自動インストール)

---

### Windows セットアップ注

次のようなエラーが表示される場合：

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Node.js および npm がインストールされ、PATH に追加されていることを確認してください。https://nodejs.org から最新の Node.js インストーラをダウンロードし、インストール後にターミナルを再起動してください。

---

## 設定

設定は `~/.claude-mem-file/settings.json` で管理されます (最初の実行時に自動作成されます)。AI モデル、ワーカーポート、データディレクトリ、ログレベル、コンテキスト注入設定を設定します。

すべての利用可能な設定および例については **[Configuration Guide](https://docs.claude-mem-file.ai/configuration)** を参照してください。

### モードと言語の設定

Claude-Mem-File は `CLAUDE_MEM_MODE` 設定を通じて複数のワークフローモードと言語をサポートします。

このオプションは以下の両方を制御します：

- ワークフロー動作 (例：code、chill、investigation)
- 生成された観察で使用される言語

#### 設定方法

`~/.claude-mem-file/settings.json` の設定ファイルを編集：

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

モードは `plugin/modes/` で定義されます。利用可能なすべてのモードをローカルで表示するには：

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### 利用可能なモード

| モード      | 説明                 |
| ----------- | -------------------- |
| `code`      | デフォルト英語モード |
| `code--zh`  | 簡体中国語モード     |
| `code--ja`  | 日本語モード         |

言語固有のモードは `code--[lang]` パターンに従い、`[lang]` は ISO 639-1 言語コード (例：zh は中国語、ja は日本語、es はスペイン語)。

> 注：`code--zh` (簡体中国語) は既に組み込まれており、追加のインストールやプラグイン更新は不要です。

#### モード変更後

Claude Code を再起動して新しいモード設定を適用します。

## 開発

ビルド命令、テスト、貢献ワークフローについては **[Development Guide](https://docs.claude-mem-file.ai/development)** を参照してください。

---

## トラブルシューティング

問題が発生している場合は、Claude に問題を説明し、troubleshoot スキルが自動的に診断と修正を提供します。

一般的な問題と解決策については **[Troubleshooting Guide](https://docs.claude-mem-file.ai/troubleshooting)** を参照してください。

---

## バグレポート

自動生成ツールで包括的なバグレポートを作成：

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## 貢献

貢献を歓迎します！お願い：

1. リポジトリをフォーク
2. フィーチャーブランチを作成
3. テスト付きで変更を実施
4. ドキュメンテーション更新
5. プルリクエストを送信

詳細については [Development Guide](https://docs.claude-mem-file.ai/development) を参照してください。

---

## ライセンス

このプロジェクトは **GNU Affero General Public License v3.0** (AGPL-3.0) の下でライセンスされています。

著作権 (C) 2025 Alex Newman (@thedotmack)。著作権所有。

完全な詳細については [LICENSE](LICENSE) ファイルを参照してください。

**これの意味：**

- このソフトウェアを自由に使用、変更、配布できます
- 変更してネットワークサーバーに展開する場合は、ソースコードを利用可能にする必要があります
- 派生作品も AGPL-3.0 の下でライセンスされている必要があります
- このソフトウェアに対する保証はありません

**Ragtime に関する注：** `ragtime/` ディレクトリは **PolyForm Noncommercial License 1.0.0** の下で別途ライセンスされています。詳細については [ragtime/LICENSE](ragtime/LICENSE) を参照してください。

---

## サポート

- **ドキュメンテーション**: [docs/](docs/)
- **イシュー**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **リポジトリ**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **公式 X アカウント**: [@Claude_Memory](https://x.com/Claude_Memory)
- **公式 Discord**: [Discord に参加](https://discord.com/invite/J4wttp9vDu)
- **作者**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Claude Agent SDK で構築** | **Claude Code で動作** | **TypeScript で作成**

---

### $CMEM について？

$CMEM は Claude-Mem-File の事前の同意なしに第 3 者によって作成された Solana トークンですが、Claude-Mem-File の作成者 (Alex Newman、@thedotmack) により公式に支持されています。トークンはコミュニティの触媒として機能し、リアルタイムエージェントデータをそれを最も必要とする開発者とナレッジワーカーにもたらすための手段として機能します。$CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
