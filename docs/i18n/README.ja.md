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

<h4 align="center">claude-mem-file — <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>向けに構築された永続的メモリ圧縮システム。</h4>

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
  <a href="#クイックスタート">クイックスタート</a> •
  <a href="#仕組み">仕組み</a> •
  <a href="#mcp検索ツール">検索ツール</a> •
  <a href="#ドキュメント">ドキュメント</a> •
  <a href="#設定">設定</a> •
  <a href="#トラブルシューティング">トラブルシューティング</a> •
  <a href="#ライセンス">ライセンス</a>
</p>

<p align="center">
  Claude-Mem-Fileは、ツール使用の観察をキャプチャし、セマンティックサマリーを生成し、プロジェクトごとのObsidian互換ボルト<code>&lt;project-root&gt;/docs/vault/</code>にバージョン管理されたMarkdownとしてすべてを保存することで、セッション間のコンテキストをシームレスに保持します — SQLiteデータベースなし、バイナリブロブなし、gitで完全にマージ可能。
</p>

---

## クイックスタート

1つのコマンドでインストール:

```bash
npx claude-mem-file install
```

または Gemini CLI 向けにインストール(`~/.gemini`を自動検出):

```bash
npx claude-mem-file install --ide gemini-cli
```

または OpenCode 向けにインストール:

```bash
npx claude-mem-file install --ide opencode
```

または Claude Code 内のプラグインマーケットプレイスからインストール:

```bash
/plugin marketplace add thedotmack/claude-mem-file

/plugin install claude-mem-file
```

Claude Code または Gemini CLI を再起動します。以前のセッションからのコンテキストが新しいセッションに自動的に表示されます。

> **注意:** Claude-Mem-Fileはnpmでも公開されていますが、`npm install -g claude-mem-file`は**SDKライブラリのみ**をインストールします — プラグインフックの登録やワーカーサービスのセットアップは行いません。常に`npx claude-mem-file install`または上記の`/plugin`コマンドでインストールしてください。

### 🦞 OpenClaw ゲートウェイ

1つのコマンドで[OpenClaw](https://openclaw.ai)ゲートウェイにclaude-mem-fileを永続メモリプラグインとしてインストール:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

インストーラーは依存関係、プラグインのセットアップ、AIプロバイダーの設定、ワーカーの起動、Telegram、Discord、Slackなどへのオプションのリアルタイム観察フィードを処理します。詳細は[OpenClaw統合ガイド](https://docs.claude-mem-file.ai/openclaw-integration)を参照してください。

**主な機能:**

- 🧠 **永続的メモリ** - セッション間でコンテキストが保持される
- 📁 **Markdownボルト（Obsidian互換）** - 観察とセッションが`<project-root>/docs/vault/`の下に`.md`ファイルとして保存され、gitでバージョン管理・マージ可能 — SQLiteなし、開発マシンにバイナリ状態なし
- 📊 **プログレッシブディスクロージャー** - トークンコストの可視性を持つ階層的メモリ取得
- 🔍 **スキルベース検索** - mem-searchスキルでプロジェクト履歴をクエリ（ボルト上のインメモリ`minisearch`で動作）
- 🖥️ **Webビューア UI** - http://localhost:37777 でリアルタイムメモリストリームを表示
- 💻 **Claude Desktopスキル** - Claude Desktopの会話からメモリを検索
- 🔒 **プライバシー制御** - `<private>`タグを使用して機密コンテンツをストレージから除外
- ⚙️ **コンテキスト設定** - どのコンテキストが注入されるかを細かく制御
- 🤖 **自動動作** - 手動介入不要
- 🔗 **引用** - IDで過去の観察を参照（http://localhost:37777/api/observation/{id} でアクセス、またはhttp://localhost:37777 のWebビューアですべて表示）
- 🧪 **ベータチャネル** - バージョン切り替えでEndless Modeなどの実験的機能を試す

## SQLite（レガシー）からの移行

以前のリリースでは`~/.claude-mem-file/claude-mem-file.db`（SQLite + FTS5 + ChromaDB）にメモリを保存していました。新しいボルトレイアウトは、`<project-root>/docs/vault/`のプレーンMarkdownですべてを置き換えます。以前のメモリは失われません — 移行スクリプトを一度実行してください:

```bash
# 以前にclaude-mem-fileを使用していたプロジェクト内から:
npm run migrate-to-vault              # レガシーDBからdocs/vault/を書き込む
npm run migrate-to-vault:dry          # 書き込まずにプレビュー
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # 明示的なパス
```

スクリプトはSQLiteデータベースを読み取り専用で開き、べき等です（重複はSHA-256コンテンツハッシュで検出されるため、再実行は安全）。結果の`docs/vault/`フォルダをリポジトリにコミットしてチームとメモリを共有してください。

---

## ドキュメント

📚 **[完全なドキュメントを見る](https://docs.claude-mem-file.ai/)** - 公式ウェブサイトで閲覧

### はじめに

- **[インストールガイド](https://docs.claude-mem-file.ai/installation)** - クイックスタートと高度なインストール
- **[Gemini CLI セットアップ](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google の Gemini CLI 統合専用ガイド
- **[使用ガイド](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-Fileが自動的に動作する仕組み
- **[検索ツール](https://docs.claude-mem-file.ai/usage/search-tools)** - 自然言語でプロジェクト履歴をクエリ
- **[ベータ機能](https://docs.claude-mem-file.ai/beta-features)** - Endless Modeなどの実験的機能を試す

### ベストプラクティス

- **[コンテキストエンジニアリング](https://docs.claude-mem-file.ai/context-engineering)** - AIエージェントのコンテキスト最適化原則
- **[プログレッシブディスクロージャー](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-Fileのコンテキストプライミング戦略の背後にある哲学

### アーキテクチャ

- **[概要](https://docs.claude-mem-file.ai/architecture/overview)** - システムコンポーネントとデータフロー
- **[アーキテクチャの進化](https://docs.claude-mem-file.ai/architecture-evolution)** - v3からv5への道のり
- **[フックアーキテクチャ](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-Fileがライフサイクルフックを使用する方法
- **[フックリファレンス](https://docs.claude-mem-file.ai/architecture/hooks)** - 7つのフックスクリプトの説明
- **[ワーカーサービス](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP APIとBun管理
- **[Docs Vault](../)** - 共有プロジェクト知識のためのObsidianスタイルMarkdownボルト

### 設定と開発

- **[設定](https://docs.claude-mem-file.ai/configuration)** - 環境変数と設定
- **[開発](https://docs.claude-mem-file.ai/development)** - ビルド、テスト、コントリビューション
- **[トラブルシューティング](https://docs.claude-mem-file.ai/troubleshooting)** - よくある問題と解決策

---

## 仕組み

**コアコンポーネント:**

1. **5つのライフサイクルフック** - SessionStart、UserPromptSubmit、PostToolUse、Stop、SessionEnd（6つのフックスクリプト）
2. **スマートインストール** - キャッシュされた依存関係チェッカー（プレフックスクリプト、ライフサイクルフックではない）
3. **ワーカーサービス** - ポート37777上のHTTP API、WebビューアUIと10の検索エンドポイント、Bunで管理
4. **Docsボルト**（`docs/`） - リポジトリにコミットされたObsidianスタイルのMarkdownボルト。すべてのアーキテクチャ上の決定、コンテキスト、セッションや協力者間の知識の共有ソースとなる
5. **mem-searchスキル** - プログレッシブディスクロージャーを備えた自然言語クエリ

詳細は[アーキテクチャ概要](https://docs.claude-mem-file.ai/architecture/overview)を参照してください。

---

## MCP検索ツール

Claude-Mem-Fileは、トークン効率の高い**3層ワークフローパターン**に従う**4つのMCPツール**を通じてインテリジェントなメモリ検索を提供します:

**3層ワークフロー:**

1. **`search`** - IDを含むコンパクトなインデックスを取得（〜50〜100トークン/結果）
2. **`timeline`** - 興味深い結果周辺の時系列コンテキストを取得
3. **`get_observations`** - フィルタリングされたIDの完全な詳細のみを取得（〜500〜1,000トークン/結果）

**仕組み:**

- ClaudeはMCPツールを使用してメモリを検索
- `search`から始めて結果のインデックスを取得
- `timeline`を使用して特定の観察の周辺で何が起きていたかを確認
- `get_observations`を使用して関連するIDの完全な詳細を取得
- 詳細を取得する前にフィルタリングすることで**〜10倍のトークン節約**

**利用可能なMCPツール:**

1. **`search`** - タイプ/日付/プロジェクトでフィルタリングした全文クエリでメモリインデックスを検索
2. **`timeline`** - 特定の観察またはクエリ周辺の時系列コンテキストを取得
3. **`get_observations`** - IDで完全な観察詳細を取得（常に複数のIDをバッチ処理）

**使用例:**

```typescript
// ステップ1: インデックスを検索
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// ステップ2: インデックスを確認し、関連するIDを特定（例: #123、#456）

// ステップ3: 完全な詳細を取得
get_observations((ids = [123, 456]));
```

詳細な例は[検索ツールガイド](https://docs.claude-mem-file.ai/usage/search-tools)を参照してください。

---

## ベータ機能

Claude-Mem-Fileは、**Endless Mode**（拡張セッション用の生体模倣メモリアーキテクチャ）などの実験的機能を備えた**ベータチャネル**を提供します。http://localhost:37777 → SettingsのWebビューアUIから安定版とベータ版を切り替えます。

Endless Modeと試用方法の詳細については、**[ベータ機能ドキュメント](https://docs.claude-mem-file.ai/beta-features)** を参照してください。

---

## システム要件

- **Node.js**: 18.0.0以上
- **Claude Code**: プラグインサポートを備えた最新バージョン
- **Bun**: JavaScriptランタイムおよびプロセスマネージャー（不足している場合は自動インストール）

---

### Windowsセットアップの注意

次のようなエラーが表示された場合:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Node.jsとnpmがインストールされ、PATHに追加されていることを確認してください。https://nodejs.org から最新のNode.jsインストーラーをダウンロードし、インストール後にターミナルを再起動してください。

---

## 設定

設定は`~/.claude-mem-file/settings.json`で管理されます（初回実行時にデフォルト値で自動作成）。AIモデル、ワーカーポート、データディレクトリ、ログレベル、コンテキスト注入設定を構成します。

利用可能なすべての設定と例については、**[設定ガイド](https://docs.claude-mem-file.ai/configuration)** を参照してください。

### モードと言語の設定

Claude-Mem-Fileは`CLAUDE_MEM_MODE`設定を通じて複数のワークフローモードと言語をサポートします。

このオプションは次の両方を制御します:

- ワークフローの動作（例: code、chill、investigation）
- 生成された観察で使用される言語

#### 設定方法

`~/.claude-mem-file/settings.json`の設定ファイルを編集:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

モードは`plugin/modes/`で定義されています。ローカルで利用可能なすべてのモードを確認するには:

```bash
ls ~/.claude/plugins/marketplaces/thedotmack/plugin/modes/
```

#### 利用可能なモード

| モード       | 説明                        |
| ------------ | --------------------------- |
| `code`       | デフォルト英語モード        |
| `code--zh`   | 簡体字中国語モード          |
| `code--ja`   | 日本語モード                |

言語固有のモードは`code--[lang]`のパターンに従います。`[lang]`はISO 639-1言語コードです（例: 中国語は`zh`、日本語は`ja`、スペイン語は`es`）。

> 注意: `code--zh`（簡体字中国語）はすでに組み込まれています — 追加のインストールやプラグインの更新は不要です。

#### モード変更後

## 新しいモード設定を適用するには、Claude Codeを再起動してください。

## 開発

ビルド手順、テスト、コントリビューションワークフローについては、**[開発ガイド](https://docs.claude-mem-file.ai/development)** を参照してください。

---

## トラブルシューティング

問題が発生した場合は、Claudeに問題を説明すると、troubleshootスキルが自動的に診断して修正を提供します。

よくある問題と解決策については、**[トラブルシューティングガイド](https://docs.claude-mem-file.ai/troubleshooting)** を参照してください。

---

## バグレポート

自動ジェネレーターで包括的なバグレポートを作成します:

```bash
cd ~/.claude/plugins/marketplaces/thedotmack
npm run bug-report
```

## コントリビューション

コントリビューションを歓迎します! 以下の手順に従ってください:

1. リポジトリをフォーク
2. 機能ブランチを作成
3. テストと共に変更を加える
4. ドキュメントを更新
5. プルリクエストを提出

コントリビューションワークフローについては[開発ガイド](https://docs.claude-mem-file.ai/development)を参照してください。

---

## ライセンス

このプロジェクトは**GNU Affero General Public License v3.0**（AGPL-3.0）の下でライセンスされています。

Copyright (C) 2025 Alex Newman (@thedotmack). All rights reserved.

詳細は[LICENSE](LICENSE)ファイルを参照してください。

**これが意味すること:**

- このソフトウェアを自由に使用、変更、配布できます
- ネットワークサーバーで変更して展開する場合、ソースコードを利用可能にする必要があります
- 派生作品もAGPL-3.0の下でライセンスする必要があります
- このソフトウェアには保証がありません

**Ragtimeに関する注意**: `ragtime/`ディレクトリは**PolyForm Noncommercial License 1.0.0**の下で個別にライセンスされています。詳細は[ragtime/LICENSE](ragtime/LICENSE)を参照してください。

---

## サポート

- **ドキュメント**: [docs/](../)
- **Issues**: [GitHub Issues](https://github.com/thedotmack/claude-mem-file/issues)
- **リポジトリ**: [github.com/thedotmack/claude-mem-file](https://github.com/thedotmack/claude-mem-file)
- **公式Xアカウント**: [@Claude_Memory](https://x.com/Claude_Memory)
- **公式Discord**: [Discordに参加](https://discord.com/invite/J4wttp9vDu)
- **作者**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Claude Agent SDKで構築** | **Claude Codeで動作** | **TypeScriptで作成**

---

### $CMEMについて

$CMEMはClaude-Mem-Fileの事前同意なしにサードパーティによって作成されたSolanaトークンですが、Claude-Mem-Fileの作成者（Alex Newman、@thedotmack）によって公式に受け入れられています。このトークンは成長のためのコミュニティ触媒として、また最も必要としている開発者やナレッジワーカーにリアルタイムのエージェントデータを届けるための手段として機能します。$CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
