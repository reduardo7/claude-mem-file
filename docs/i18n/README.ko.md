🌐 이것은 기계 번역입니다. 커뮤니티의 수정을 환영합니다!

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
> **이것은 [claude-mem](https://github.com/thedotmack/claude-mem)의 포크입니다** [Alex Newman (@thedotmack)](https://github.com/thedotmack)에 의해 작성되었습니다.
>
> 이 포크는 SQLite/바이너리 스토리지 백엔드를 **파일시스템 전용 접근법**으로 대체합니다: 모든 메모리는 `<project-root>/docs/vault/`의 일반 Markdown 파일로 저장되며, git을 통해 완전히 버전 관리 가능하고 팀의 모든 구성원과 공유할 수 있습니다. 로컬 데이터베이스 없음, 바이너리 블롭 없음 — 읽기, 편집, 커밋 및 병합할 수 있는 파일만 있습니다.

<h4 align="center">claude-mem-file — <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>를 위해 구축된 지속적인 메모리 압축 시스템.</h4>

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
  <a href="#빠른-시작">빠른 시작</a> •
  <a href="#작동-방식">작동 방식</a> •
  <a href="#mcp-검색-도구">검색 도구</a> •
  <a href="#문서">문서</a> •
  <a href="#설정">설정</a> •
  <a href="#문제-해결">문제 해결</a> •
  <a href="#라이선스">라이선스</a>
</p>

<p align="center">
  Claude-Mem-File은 도구 사용 관찰을 캡처하고 의미론적 요약을 생성하며 모든 것을 프로젝트별 Obsidian 호환 볼트(<code>&lt;project-root&gt;/docs/vault/</code>)에 버전화된 Markdown으로 저장하여 세션 간 컨텍스트를 원활하게 보존합니다 — SQLite 데이터베이스 없음, 바이너리 블롭 없음, git을 통해 완전히 병합 가능합니다.
</p>

---

## 빠른 시작

단일 명령으로 설치:

```bash
npx claude-mem-file install
```

또는 Gemini CLI용으로 설치 (`~/.gemini` 자동 감지):

```bash
npx claude-mem-file install --ide gemini-cli
```

또는 OpenCode용으로 설치:

```bash
npx claude-mem-file install --ide opencode
```

또는 Claude Code 내부 플러그인 마켓플레이스에서 설치:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Claude Code 또는 Gemini CLI를 재시작하세요. 이전 세션의 컨텍스트가 자동으로 새 세션에 나타납니다.

> **참고:** Claude-Mem-File은 npm에도 게시되어 있지만, `npm install -g claude-mem-file`은 **SDK/라이브러리만** 설치합니다 — 플러그인 훅을 등록하거나 워커 서비스를 설정하지 않습니다. 항상 `npx claude-mem-file install` 또는 위의 `/plugin` 명령을 통해 설치하세요.

### 🦞 OpenClaw 게이트웨이

단일 명령으로 [OpenClaw](https://openclaw.ai) 게이트웨이에 claude-mem-file을 지속적인 메모리 플러그인으로 설치:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

설치 프로그램은 종속성, 플러그인 설정, AI 공급자 구성, 워커 시작, Telegram, Discord, Slack 등으로의 실시간 관찰 피드를 처리합니다. 자세한 내용은 [OpenClaw 통합 가이드](https://docs.claude-mem-file.ai/openclaw-integration)를 참조하세요.

**주요 기능:**

- 🧠 **지속적인 메모리** - 세션 간 컨텍스트 유지
- 📁 **Markdown 볼트 (Obsidian 호환)** - 관찰 및 세션이 `<project-root>/docs/vault/` 아래 `.md` 파일로 저장, git을 통해 버전 관리 및 병합 가능 — 개발 머신에 SQLite 없음, 바이너리 상태 없음
- 📊 **점진적 공개** - 토큰 비용 가시성을 갖춘 계층화된 메모리 검색
- 🔍 **스킬 기반 검색** - mem-search 스킬로 프로젝트 기록 쿼리 (볼트 위의 인메모리 `minisearch`로 구동)
- 🖥️ **웹 뷰어 UI** - http://localhost:37777 에서 실시간 메모리 스트림 확인
- 💻 **Claude Desktop 스킬** - Claude Desktop 대화에서 메모리 검색
- 🔒 **개인정보 제어** - `<private>` 태그를 사용하여 민감한 콘텐츠를 저장소에서 제외
- ⚙️ **컨텍스트 설정** - 주입되는 컨텍스트에 대한 세밀한 제어
- 🤖 **자동 작동** - 수동 개입 불필요
- 🔗 **인용** - ID로 과거 관찰 참조 (http://localhost:37777/api/observation/{id} 를 통해 액세스하거나 http://localhost:37777 의 웹 뷰어에서 모두 보기)
- 🧪 **베타 채널** - 버전 전환을 통해 Endless Mode와 같은 실험적 기능 사용

## SQLite에서 마이그레이션 (레거시)

이전 릴리스는 `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB)에 메모리를 저장했습니다. 새 볼트 레이아웃은 `<project-root>/docs/vault/`의 일반 Markdown으로 모든 것을 대체합니다. 이전 메모리는 손실되지 않습니다 — 마이그레이션 스크립트를 한 번 실행하세요:

```bash
# claude-mem-file을 이전에 사용한 프로젝트 내에서:
npm run migrate-to-vault              # 레거시 DB에서 docs/vault/ 작성
npm run migrate-to-vault:dry          # 작성 없이 미리보기
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # 명시적 경로
```

스크립트는 SQLite 데이터베이스를 읽기 전용으로 열고 멱등적입니다 (중복은 SHA-256 콘텐츠 해시로 감지되므로 재실행이 안전합니다). 결과 `docs/vault/` 폴더를 저장소에 커밋하여 팀과 메모리를 공유하세요.

---

## 문서

📚 **[전체 문서 보기](https://docs.claude-mem-file.ai/)** - 공식 웹사이트에서 찾아보기

### 시작하기

- **[설치 가이드](https://docs.claude-mem-file.ai/installation)** - 빠른 시작 및 고급 설치
- **[Gemini CLI 설정](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google Gemini CLI 통합을 위한 전용 가이드
- **[사용 가이드](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-File이 자동으로 작동하는 방법
- **[검색 도구](https://docs.claude-mem-file.ai/usage/search-tools)** - 자연어로 프로젝트 기록 쿼리
- **[베타 기능](https://docs.claude-mem-file.ai/beta-features)** - Endless Mode와 같은 실험적 기능 시도

### 모범 사례

- **[컨텍스트 엔지니어링](https://docs.claude-mem-file.ai/context-engineering)** - AI 에이전트 컨텍스트 최적화 원칙
- **[점진적 공개](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-File의 컨텍스트 프라이밍 전략의 철학

### 아키텍처

- **[개요](https://docs.claude-mem-file.ai/architecture/overview)** - 시스템 구성 요소 및 데이터 흐름
- **[아키텍처 진화](https://docs.claude-mem-file.ai/architecture-evolution)** - v3에서 v5로의 여정
- **[훅 아키텍처](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-File이 라이프사이클 훅을 사용하는 방법
- **[훅 참조](https://docs.claude-mem-file.ai/architecture/hooks)** - 7개 훅 스크립트 설명
- **[워커 서비스](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API 및 Bun 관리
- **[Docs Vault](../docs/)** - 공유 프로젝트 지식을 위한 Obsidian 스타일 Markdown 볼트

### 설정 및 개발

- **[설정](https://docs.claude-mem-file.ai/configuration)** - 환경 변수 및 설정
- **[개발](https://docs.claude-mem-file.ai/development)** - 빌드, 테스트, 기여
- **[문제 해결](https://docs.claude-mem-file.ai/troubleshooting)** - 일반적인 문제 및 해결 방법

---

## 작동 방식

**핵심 구성 요소:**

1. **5개 라이프사이클 훅** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6개 훅 스크립트)
2. **스마트 설치** - 캐시된 종속성 검사기 (사전 훅 스크립트, 라이프사이클 훅 아님)
3. **워커 서비스** - 웹 뷰어 UI와 10개 검색 엔드포인트를 갖춘 포트 37777의 HTTP API, Bun으로 관리
4. **Docs Vault** (`docs/`) - 저장소에 커밋된 Obsidian 스타일 Markdown 볼트; 세션 및 협업자 간 모든 아키텍처 결정, 컨텍스트 및 지식의 공유 원천
5. **mem-search 스킬** - 점진적 공개를 통한 자연어 쿼리

자세한 내용은 [아키텍처 개요](https://docs.claude-mem-file.ai/architecture/overview)를 참조하세요.

---

## MCP 검색 도구

Claude-Mem-File은 토큰 효율적인 **3계층 워크플로우 패턴**을 따르는 **4개 MCP 도구**를 통해 지능형 메모리 검색을 제공합니다:

**3계층 워크플로우:**

1. **`search`** - ID가 포함된 컴팩트 인덱스 가져오기 (~50-100 토큰/결과)
2. **`timeline`** - 흥미로운 결과 주변의 시간순 컨텍스트 가져오기
3. **`get_observations`** - 필터링된 ID에 대한 전체 세부 정보만 가져오기 (~500-1,000 토큰/결과)

**작동 방식:**

- Claude가 MCP 도구를 사용하여 메모리를 검색합니다
- `search`로 시작하여 결과 인덱스 가져오기
- `timeline`을 사용하여 특정 관찰 주변에서 무슨 일이 있었는지 확인
- `get_observations`를 사용하여 관련 ID에 대한 전체 세부 정보 가져오기
- 세부 정보를 가져오기 전에 필터링하여 **~10배 토큰 절약**

**사용 가능한 MCP 도구:**

1. **`search`** - 전체 텍스트 쿼리로 메모리 인덱스 검색, 유형/날짜/프로젝트별 필터링
2. **`timeline`** - 특정 관찰 또는 쿼리 주변의 시간순 컨텍스트 가져오기
3. **`get_observations`** - ID로 전체 관찰 세부 정보 가져오기 (항상 여러 ID를 일괄 처리)

**사용 예제:**

```typescript
// 1단계: 인덱스 검색
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// 2단계: 인덱스 검토, 관련 ID 식별 (예: #123, #456)

// 3단계: 전체 세부 정보 가져오기
get_observations((ids = [123, 456]));
```

자세한 예제는 [검색 도구 가이드](https://docs.claude-mem-file.ai/usage/search-tools)를 참조하세요.

---

## 베타 기능

Claude-Mem-File은 **Endless Mode**(확장된 세션을 위한 생체모방 메모리 아키텍처)와 같은 실험적 기능을 제공하는 **베타 채널**을 제공합니다. http://localhost:37777 → Settings의 웹 뷰어 UI에서 안정 버전과 베타 버전 간 전환이 가능합니다.

Endless Mode 및 사용 방법에 대한 자세한 내용은 **[베타 기능 문서](https://docs.claude-mem-file.ai/beta-features)**를 참조하세요.

---

## 시스템 요구 사항

- **Node.js**: 18.0.0 이상
- **Claude Code**: 플러그인 지원이 있는 최신 버전
- **Bun**: JavaScript 런타임 및 프로세스 관리자 (누락 시 자동 설치)

---

### Windows 설정 참고 사항

다음과 같은 오류가 표시되는 경우:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Node.js와 npm이 설치되어 있고 PATH에 추가되어 있는지 확인하세요. https://nodejs.org 에서 최신 Node.js 설치 프로그램을 다운로드하고 설치 후 터미널을 재시작하세요.

---

## 설정

설정은 `~/.claude-mem-file/settings.json`에서 관리됩니다 (첫 실행 시 기본값으로 자동 생성). AI 모델, 워커 포트, 데이터 디렉토리, 로그 수준 및 컨텍스트 주입 설정을 구성할 수 있습니다.

사용 가능한 모든 설정 및 예제는 **[설정 가이드](https://docs.claude-mem-file.ai/configuration)**를 참조하세요.

### 모드 및 언어 설정

Claude-Mem-File은 `CLAUDE_MEM_MODE` 설정을 통해 여러 워크플로우 모드와 언어를 지원합니다.

이 옵션은 다음 두 가지를 제어합니다:

- 워크플로우 동작 (예: code, chill, investigation)
- 생성된 관찰에 사용되는 언어

#### 설정 방법

`~/.claude-mem-file/settings.json`에서 설정 파일을 편집하세요:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

모드는 `plugin/modes/`에 정의되어 있습니다. 로컬에서 사용 가능한 모든 모드를 보려면:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### 사용 가능한 모드

| 모드       | 설명                    |
| ---------- | ----------------------- |
| `code`     | 기본 영어 모드          |
| `code--zh` | 중국어 간체 모드        |
| `code--ja` | 일본어 모드             |

언어별 모드는 `code--[lang]` 패턴을 따릅니다. 여기서 `[lang]`은 ISO 639-1 언어 코드입니다 (예: 중국어는 `zh`, 일본어는 `ja`, 스페인어는 `es`).

> 참고: `code--zh` (중국어 간체)는 이미 내장되어 있습니다 — 추가 설치나 플러그인 업데이트가 필요하지 않습니다.

#### 모드 변경 후

Claude Code를 재시작하여 새 모드 설정을 적용하세요.

## 개발

빌드 지침, 테스트 및 기여 워크플로우는 **[개발 가이드](https://docs.claude-mem-file.ai/development)**를 참조하세요.

---

## 문제 해결

문제가 발생하면 Claude에게 문제를 설명하면 troubleshoot 스킬이 자동으로 진단하고 수정 사항을 제공합니다.

일반적인 문제 및 해결 방법은 **[문제 해결 가이드](https://docs.claude-mem-file.ai/troubleshooting)**를 참조하세요.

---

## 버그 보고

자동화된 생성기로 포괄적인 버그 보고서를 작성하세요:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## 기여

기여를 환영합니다! 다음 절차를 따라주세요:

1. 저장소 포크
2. 기능 브랜치 생성
3. 테스트와 함께 변경 사항 작성
4. 문서 업데이트
5. Pull Request 제출

기여 워크플로우는 [개발 가이드](https://docs.claude-mem-file.ai/development)를 참조하세요.

---

## 라이선스

이 프로젝트는 **GNU Affero General Public License v3.0** (AGPL-3.0)에 따라 라이선스가 부여됩니다.

Copyright (C) 2025 Alex Newman (@thedotmack). All rights reserved.

전체 세부 정보는 [LICENSE](LICENSE) 파일을 참조하세요.

**의미:**

- 이 소프트웨어를 자유롭게 사용, 수정 및 배포할 수 있습니다
- 수정하여 네트워크 서버에 배포하는 경우 소스 코드를 공개해야 합니다
- 파생 작업물도 AGPL-3.0에 따라 라이선스가 부여되어야 합니다
- 이 소프트웨어에는 보증이 없습니다

**Ragtime에 대한 참고 사항**: `ragtime/` 디렉토리는 **PolyForm Noncommercial License 1.0.0**에 따라 별도로 라이선스가 부여됩니다. 자세한 내용은 [ragtime/LICENSE](ragtime/LICENSE)를 참조하세요.

---

## 지원

- **문서**: [docs/](../)
- **이슈**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **저장소**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **공식 X 계정**: [@Claude_Memory](https://x.com/Claude_Memory)
- **공식 Discord**: [Discord 참여](https://discord.com/invite/J4wttp9vDu)
- **작성자**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Claude Agent SDK로 구축** | **Claude Code 기반** | **TypeScript로 제작**

---

### $CMEM에 대하여

$CMEM은 Claude-Mem-File의 사전 동의 없이 제3자가 만든 솔라나 토큰이지만, Claude-Mem-File 창작자(Alex Newman, @thedotmack)가 공식적으로 수용했습니다. 이 토큰은 성장을 위한 커뮤니티 촉매제이자 실시간 에이전트 데이터를 가장 필요로 하는 개발자와 지식 근로자에게 전달하는 수단으로 작동합니다. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
