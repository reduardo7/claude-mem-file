🌐 Esta é uma tradução automática. Correções da comunidade são bem-vindas!

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
> **Este é um fork de [claude-mem](https://github.com/thedotmack/claude-mem)** por [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Este fork substitui o backend de armazenamento SQLite/binário por uma **abordagem apenas do sistema de arquivos**: toda a memória é armazenada como arquivos Markdown simples em `<project-root>/docs/vault/`, totalmente versionáveis via git e compartilháveis com todos os membros da sua equipe. Sem bancos de dados locais, sem blobs binários — apenas arquivos que você pode ler, editar, fazer commit e mesclar.

<h4 align="center">claude-mem-file — Sistema de compressão de memória persistente construído para <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#início-rápido">Início Rápido</a> •
  <a href="#como-funciona">Como Funciona</a> •
  <a href="#ferramentas-de-busca-mcp">Ferramentas de Busca</a> •
  <a href="#documentação">Documentação</a> •
  <a href="#configuração">Configuração</a> •
  <a href="#solução-de-problemas">Solução de Problemas</a> •
  <a href="#licença">Licença</a>
</p>

<p align="center">
  Claude-Mem-File preserva o contexto perfeitamente entre sessões capturando observações de uso de ferramentas, gerando resumos semânticos e armazenando tudo como Markdown versionado dentro de um vault por projeto compatível com Obsidian em <code>&lt;project-root&gt;/docs/vault/</code> — sem banco de dados SQLite, sem blobs binários, totalmente mesclável via git.
</p>

---

## Início Rápido

Instale com um único comando:

```bash
npx claude-mem-file install
```

Ou instale para o Gemini CLI (detecta automaticamente `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Ou instale para o OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Ou instale pelo marketplace de plugins dentro do Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Reinicie o Claude Code ou o Gemini CLI. O contexto de sessões anteriores aparecerá automaticamente em novas sessões.

> **Nota:** Claude-Mem-File também está publicado no npm, mas `npm install -g claude-mem-file` instala apenas o **SDK/biblioteca** — ele não registra os hooks do plugin nem configura o serviço worker. Sempre instale via `npx claude-mem-file install` ou pelos comandos `/plugin` acima.

### 🦞 OpenClaw Gateway

Instale o claude-mem-file como plugin de memória persistente em gateways [OpenClaw](https://openclaw.ai) com um único comando:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

O instalador cuida das dependências, configuração do plugin, configuração do provedor de IA, inicialização do worker e feeds opcionais de observação em tempo real para Telegram, Discord, Slack e mais. Veja o [Guia de Integração OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) para detalhes.

**Principais Recursos:**

- 🧠 **Memória Persistente** - O contexto sobrevive entre sessões
- 📁 **Vault Markdown (compatível com Obsidian)** - Observações e sessões armazenadas como arquivos `.md` em `<project-root>/docs/vault/`, versionáveis e mesclávéis via git — sem SQLite, sem estado binário nas máquinas de desenvolvimento
- 📊 **Divulgação Progressiva** - Recuperação de memória em camadas com visibilidade de custo de tokens
- 🔍 **Busca Baseada em Skill** - Consulte seu histórico de projeto com a skill mem-search (alimentada por `minisearch` em memória sobre o vault)
- 🖥️ **Interface Web de Visualização** - Fluxo de memória em tempo real em http://localhost:37777
- 💻 **Skill para Claude Desktop** - Busque memória em conversas do Claude Desktop
- 🔒 **Controle de Privacidade** - Use tags `<private>` para excluir conteúdo sensível do armazenamento
- ⚙️ **Configuração de Contexto** - Controle refinado sobre qual contexto é injetado
- 🤖 **Operação Automática** - Nenhuma intervenção manual necessária
- 🔗 **Citações** - Referencie observações passadas com IDs (acesse via http://localhost:37777/api/observation/{id} ou visualize todas no visualizador web em http://localhost:37777)
- 🧪 **Canal Beta** - Experimente recursos experimentais como o Endless Mode através da troca de versões

## Migrando do SQLite (legado)

Versões anteriores armazenavam memória em `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). O novo layout de vault substitui tudo isso por Markdown simples em `<project-root>/docs/vault/`. Suas memórias anteriores não se perdem — execute o script de migração uma vez:

```bash
# dentro de qualquer projeto que usou claude-mem-file anteriormente:
npm run migrate-to-vault              # escreve docs/vault/ a partir do banco legado
npm run migrate-to-vault:dry          # visualize sem escrever
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # caminhos explícitos
```

O script abre o banco de dados SQLite somente leitura e é idempotente (duplicatas são detectadas via hashes de conteúdo SHA-256, portanto reexecutar é seguro). Faça commit da pasta `docs/vault/` resultante no seu repositório para compartilhar memória com sua equipe.

---

## Documentação

📚 **[Ver Documentação Completa](https://docs.claude-mem-file.ai/)** - Navegar no site oficial

### Primeiros Passos

- **[Guia de Instalação](https://docs.claude-mem-file.ai/installation)** - Início rápido e instalação avançada
- **[Configuração do Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Guia dedicado para integração com o Gemini CLI do Google
- **[Guia de Uso](https://docs.claude-mem-file.ai/usage/getting-started)** - Como o Claude-Mem-File funciona automaticamente
- **[Ferramentas de Busca](https://docs.claude-mem-file.ai/usage/search-tools)** - Consulte seu histórico de projeto com linguagem natural
- **[Recursos Beta](https://docs.claude-mem-file.ai/beta-features)** - Experimente recursos experimentais como o Endless Mode

### Melhores Práticas

- **[Engenharia de Contexto](https://docs.claude-mem-file.ai/context-engineering)** - Princípios de otimização de contexto para agentes de IA
- **[Divulgação Progressiva](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofia por trás da estratégia de preparação de contexto do Claude-Mem-File

### Arquitetura

- **[Visão Geral](https://docs.claude-mem-file.ai/architecture/overview)** - Componentes do sistema e fluxo de dados
- **[Evolução da Arquitetura](https://docs.claude-mem-file.ai/architecture-evolution)** - A jornada da v3 à v5
- **[Arquitetura de Hooks](https://docs.claude-mem-file.ai/hooks-architecture)** - Como o Claude-Mem-File usa hooks de ciclo de vida
- **[Referência de Hooks](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 scripts de hook explicados
- **[Serviço Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - API HTTP e gerenciamento do Bun
- **[Docs Vault](../)** - Vault Markdown estilo Obsidian para conhecimento compartilhado do projeto

### Configuração e Desenvolvimento

- **[Configuração](https://docs.claude-mem-file.ai/configuration)** - Variáveis de ambiente e configurações
- **[Desenvolvimento](https://docs.claude-mem-file.ai/development)** - Build, testes e contribuição
- **[Solução de Problemas](https://docs.claude-mem-file.ai/troubleshooting)** - Problemas comuns e soluções

---

## Como Funciona

**Componentes Principais:**

1. **5 Hooks de Ciclo de Vida** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 scripts de hook)
2. **Instalação Inteligente** - Verificador de dependências em cache (script pré-hook, não um hook de ciclo de vida)
3. **Serviço Worker** - API HTTP na porta 37777 com interface de visualização web e 10 endpoints de busca, gerenciado pelo Bun
4. **Docs Vault** (`docs/`) - Vault Markdown estilo Obsidian commitado no repositório; a fonte compartilhada de verdade para todas as decisões arquiteturais, contexto e conhecimento entre sessões e colaboradores
5. **Skill mem-search** - Consultas em linguagem natural com divulgação progressiva

Veja [Visão Geral da Arquitetura](https://docs.claude-mem-file.ai/architecture/overview) para detalhes.

---

## Ferramentas de Busca MCP

Claude-Mem-File fornece busca inteligente de memória através de **4 ferramentas MCP** seguindo um padrão de fluxo de trabalho de **3 camadas** eficiente em tokens:

**O Fluxo de Trabalho de 3 Camadas:**

1. **`search`** - Obtenha índice compacto com IDs (~50-100 tokens/resultado)
2. **`timeline`** - Obtenha contexto cronológico em torno de resultados interessantes
3. **`get_observations`** - Busque detalhes completos APENAS para IDs filtrados (~500-1.000 tokens/resultado)

**Como Funciona:**

- Claude usa ferramentas MCP para pesquisar sua memória
- Comece com `search` para obter um índice de resultados
- Use `timeline` para ver o que estava acontecendo em torno de observações específicas
- Use `get_observations` para buscar detalhes completos de IDs relevantes
- **~10x economia de tokens** filtrando antes de buscar detalhes

**Ferramentas MCP Disponíveis:**

1. **`search`** - Pesquisa índice de memória com consultas de texto completo, filtra por tipo/data/projeto
2. **`timeline`** - Obtém contexto cronológico em torno de uma observação ou consulta específica
3. **`get_observations`** - Busca detalhes completos de observações por IDs (sempre agrupe múltiplos IDs)

**Exemplo de Uso:**

```typescript
// Passo 1: Buscar índice
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Passo 2: Revisar índice, identificar IDs relevantes (ex.: #123, #456)

// Passo 3: Buscar detalhes completos
get_observations((ids = [123, 456]));
```

Veja o [Guia de Ferramentas de Busca](https://docs.claude-mem-file.ai/usage/search-tools) para exemplos detalhados.

---

## Recursos Beta

Claude-Mem-File oferece um **canal beta** com recursos experimentais como **Endless Mode** (arquitetura de memória biomimética para sessões estendidas). Alterne entre versões estável e beta pela interface de visualização web em http://localhost:37777 → Settings.

Veja **[Documentação de Recursos Beta](https://docs.claude-mem-file.ai/beta-features)** para detalhes sobre o Endless Mode e como experimentá-lo.

---

## Requisitos do Sistema

- **Node.js**: 18.0.0 ou superior
- **Claude Code**: Versão mais recente com suporte a plugins
- **Bun**: Runtime JavaScript e gerenciador de processos (instalado automaticamente se ausente)

---

### Notas de Configuração no Windows

Se você ver um erro como:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Certifique-se de que o Node.js e o npm estejam instalados e adicionados ao seu PATH. Baixe o instalador mais recente do Node.js em https://nodejs.org e reinicie seu terminal após a instalação.

---

## Configuração

As configurações são gerenciadas em `~/.claude-mem-file/settings.json` (criado automaticamente com valores padrão na primeira execução). Configure modelo de IA, porta do worker, diretório de dados, nível de log e configurações de injeção de contexto.

Veja o **[Guia de Configuração](https://docs.claude-mem-file.ai/configuration)** para todas as configurações disponíveis e exemplos.

### Configuração de Modo e Idioma

Claude-Mem-File suporta múltiplos modos de fluxo de trabalho e idiomas através da configuração `CLAUDE_MEM_MODE`.

Esta opção controla:

- O comportamento do fluxo de trabalho (ex.: code, chill, investigation)
- O idioma usado nas observações geradas

#### Como Configurar

Edite seu arquivo de configurações em `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Os modos são definidos em `plugin/modes/`. Para ver todos os modos disponíveis localmente:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Modos Disponíveis

| Modo       | Descrição                    |
| ---------- | ---------------------------- |
| `code`     | Modo padrão em inglês        |
| `code--zh` | Modo em chinês simplificado  |
| `code--ja` | Modo em japonês              |

Modos específicos de idioma seguem o padrão `code--[lang]` onde `[lang]` é o código de idioma ISO 639-1 (ex.: `zh` para chinês, `ja` para japonês, `es` para espanhol).

> Nota: `code--zh` (chinês simplificado) já está integrado — nenhuma instalação adicional ou atualização do plugin é necessária.

#### Após Alterar o Modo

Reinicie o Claude Code para aplicar a nova configuração de modo.

---

## Desenvolvimento

Veja o **[Guia de Desenvolvimento](https://docs.claude-mem-file.ai/development)** para instruções de build, testes e fluxo de contribuição.

---

## Solução de Problemas

Se estiver enfrentando problemas, descreva o problema para Claude e a skill de solução de problemas diagnosticará automaticamente e fornecerá correções.

Veja o **[Guia de Solução de Problemas](https://docs.claude-mem-file.ai/troubleshooting)** para problemas comuns e soluções.

---

## Relatos de Bug

Crie relatos de bug abrangentes com o gerador automatizado:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do repositório
2. Crie uma branch de feature
3. Faça suas alterações com testes
4. Atualize a documentação
5. Envie um Pull Request

Veja o [Guia de Desenvolvimento](https://docs.claude-mem-file.ai/development) para o fluxo de contribuição.

---

## Licença

Este projeto está licenciado sob a **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Todos os direitos reservados.

Veja o arquivo [LICENSE](LICENSE) para detalhes completos.

**O Que Isso Significa:**

- Você pode usar, modificar e distribuir este software livremente
- Se você modificar e implantar em um servidor de rede, você deve disponibilizar seu código-fonte
- Trabalhos derivados também devem ser licenciados sob AGPL-3.0
- NÃO HÁ GARANTIA para este software

**Nota sobre Ragtime**: O diretório `ragtime/` é licenciado separadamente sob a **PolyForm Noncommercial License 1.0.0**. Veja [ragtime/LICENSE](ragtime/LICENSE) para detalhes.

---

## Suporte

- **Documentação**: [docs/](../)
- **Issues**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repositório**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Conta Oficial no X**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord Oficial**: [Entrar no Discord](https://discord.com/invite/J4wttp9vDu)
- **Autor**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Construído com Claude Agent SDK** | **Desenvolvido por Claude Code** | **Feito com TypeScript**

---

### E o $CMEM?

$CMEM é um token Solana criado por um terceiro sem o consentimento prévio do Claude-Mem-File, mas oficialmente abraçado pelo criador do Claude-Mem-File (Alex Newman, @thedotmack). O token atua como catalisador comunitário para crescimento e um veículo para levar dados de agentes em tempo real aos desenvolvedores e trabalhadores do conhecimento que mais precisam. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
