🌐 Ceci est une traduction automatisée. Les corrections de la communauté sont les bienvenues !

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
> **Ceci est une branche de [claude-mem](https://github.com/thedotmack/claude-mem)** par [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Cette branche remplace le backend de stockage SQLite/binaire par une **approche basée uniquement sur le système de fichiers** : toute la mémoire est stockée sous forme de fichiers Markdown simples dans `<project-root>/docs/vault/`, complètement versionnable via git et partageable avec tous les membres de votre équipe. Pas de bases de données locales, pas de blobs binaires — juste des fichiers que vous pouvez lire, modifier, valider et fusionner.

<h4 align="center">claude-mem-file — Système de compression de mémoire persistante conçu pour <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#démarrage-rapide">Démarrage rapide</a> •
  <a href="#comment-ça-fonctionne">Comment ça fonctionne</a> •
  <a href="#outils-de-recherche-mcp">Outils de recherche</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#dépannage">Dépannage</a> •
  <a href="#licence">Licence</a>
</p>

<p align="center">
  Claude-Mem-File préserve de manière transparente le contexte d'une session à l'autre en capturant les observations d'utilisation des outils, en générant des résumés sémantiques et en stockant tout sous forme de Markdown versionné à l'intérieur d'un coffre Obsidian compatible par projet à <code>&lt;project-root&gt;/docs/vault/</code> — pas de base de données SQLite, pas de blobs binaires, complètement fusionnable via git.
</p>

---

## Démarrage rapide

Installez avec une seule commande :

```bash
npx claude-mem-file install
```

Ou installez pour Gemini CLI (détecte automatiquement `~/.gemini`) :

```bash
npx claude-mem-file install --ide gemini-cli
```

Ou installez pour OpenCode :

```bash
npx claude-mem-file install --ide opencode
```

Ou installez à partir de la place de marché des plugins à l'intérieur de Claude Code :

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Redémarrez Claude Code ou Gemini CLI. Le contexte des sessions précédentes apparaîtra automatiquement dans les nouvelles sessions.

> **Note :** Claude-Mem-File est également publié sur npm, mais `npm install -g claude-mem-file` installe **uniquement le SDK/bibliothèque** — cela n'enregistre pas les hooks du plugin ou n'établit pas le service worker. Installez toujours via `npx claude-mem-file install` ou les commandes `/plugin` ci-dessus.

### 🦞 Passerelle OpenClaw

Installez claude-mem-file en tant que plugin de mémoire persistante sur les passerelles [OpenClaw](https://openclaw.ai) avec une seule commande :

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Le programme d'installation gère les dépendances, la configuration du plugin, la configuration du fournisseur IA, le démarrage du worker et les flux d'observation en temps réel optionnels vers Telegram, Discord, Slack, etc. Voir le [Guide d'intégration OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) pour plus de détails.

**Fonctionnalités clés :**

- 🧠 **Mémoire persistante** - Le contexte survit d'une session à l'autre
- 📁 **Coffre Markdown (compatible Obsidian)** - Les observations et les sessions sont stockées sous forme de fichiers `.md` dans `<project-root>/docs/vault/`, versionnable et fusionnable via git — pas de SQLite, pas d'état binaire sur les machines de développement
- 📊 **Divulgation progressive** - Récupération de mémoire en couches avec visibilité du coût en tokens
- 🔍 **Recherche basée sur les compétences** - Interrogez l'historique de votre projet avec la compétence mem-search (alimentée par `minisearch` en mémoire sur le coffre)
- 🖥️ **Interface utilisateur Web Viewer** - Flux de mémoire en temps réel à http://localhost:37777
- 💻 **Compétence Claude Desktop** - Recherchez la mémoire à partir des conversations Claude Desktop
- 🔒 **Contrôle de la confidentialité** - Utilisez les balises `<private>` pour exclure le contenu sensible du stockage
- ⚙️ **Configuration du contexte** - Contrôle précis sur le contexte injecté
- 🤖 **Fonctionnement automatique** - Aucune intervention manuelle requise
- 🔗 **Citations** - Référencez les observations passées avec des ID (accès via http://localhost:37777/api/observation/{id} ou affichez tout dans le web viewer à http://localhost:37777)
- 🧪 **Canal bêta** - Essayez des fonctionnalités expérimentales comme le mode Endless via le changement de version

## Migration depuis SQLite (héritage)

Les versions antérieures stockaient la mémoire dans `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). La nouvelle disposition du coffre remplace tout cela par du Markdown simple dans `<project-root>/docs/vault/`. Vos mémoires antérieures ne sont pas perdues — exécutez le script de migration une fois :

```bash
# depuis n'importe quel projet qui utilisait auparavant claude-mem-file :
npm run migrate-to-vault              # écrit docs/vault/ à partir de la base de données héritage
npm run migrate-to-vault:dry          # aperçu sans écriture
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # chemins explicites
```

Le script ouvre la base de données SQLite en lecture seule et est idempotent (les doublons sont détectés via des hashes de contenu SHA-256, donc la réexécution est sûre). Validez le dossier `docs/vault/` résultant sur votre référentiel pour partager la mémoire avec votre équipe.

---

## Documentation

📚 **[Consulter la documentation complète](https://docs.claude-mem-file.ai/)** - Parcourir sur le site officiel

### Pour commencer

- **[Guide d'installation](https://docs.claude-mem-file.ai/installation)** - Démarrage rapide et installation avancée
- **[Configuration de Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Guide dédié pour l'intégration de Gemini CLI de Google
- **[Guide d'utilisation](https://docs.claude-mem-file.ai/usage/getting-started)** - Comment Claude-Mem-File fonctionne automatiquement
- **[Outils de recherche](https://docs.claude-mem-file.ai/usage/search-tools)** - Interrogez l'historique de votre projet en langage naturel
- **[Fonctionnalités bêta](https://docs.claude-mem-file.ai/beta-features)** - Essayez des fonctionnalités expérimentales comme le mode Endless

### Bonnes pratiques

- **[Ingénierie du contexte](https://docs.claude-mem-file.ai/context-engineering)** - Principes d'optimisation du contexte pour les agents IA
- **[Divulgation progressive](https://docs.claude-mem-file.ai/progressive-disclosure)** - Philosophie derrière la stratégie d'amorçage du contexte de Claude-Mem-File

### Architecture

- **[Aperçu](https://docs.claude-mem-file.ai/architecture/overview)** - Composants du système et flux de données
- **[Évolution de l'architecture](https://docs.claude-mem-file.ai/architecture-evolution)** - Le parcours de la v3 à la v5
- **[Architecture des hooks](https://docs.claude-mem-file.ai/hooks-architecture)** - Comment Claude-Mem-File utilise les hooks de cycle de vie
- **[Référence des hooks](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 scripts de hooks expliqués
- **[Service Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - API HTTP et gestion Bun
- **[Coffre de documents](docs/)** - Coffre Markdown de style Obsidian pour les connaissances partagées du projet

### Configuration et développement

- **[Configuration](https://docs.claude-mem-file.ai/configuration)** - Variables d'environnement et paramètres
- **[Développement](https://docs.claude-mem-file.ai/development)** - Compilation, tests, contribution
- **[Dépannage](https://docs.claude-mem-file.ai/troubleshooting)** - Problèmes courants et solutions

---

## Comment ça fonctionne

**Composants principaux :**

1. **5 hooks de cycle de vie** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 scripts de hooks)
2. **Installation intelligente** - Vérificateur de dépendances en cache (script pré-hook, pas un hook de cycle de vie)
3. **Service Worker** - API HTTP sur le port 37777 avec interface Web Viewer et 10 points de terminaison de recherche, géré par Bun
4. **Coffre de documents** (`docs/`) - Coffre Markdown de style Obsidian validé au référentiel ; la source de vérité partagée pour toutes les décisions architecturales, contextes et connaissances entre les sessions et les collaborateurs
5. **Compétence mem-search** - Requêtes en langage naturel avec divulgation progressive

Voir [Aperçu de l'architecture](https://docs.claude-mem-file.ai/architecture/overview) pour plus de détails.

---

## Outils de recherche MCP

Claude-Mem-File fournit une recherche de mémoire intelligente par le biais de **4 outils MCP** selon un modèle de flux de travail **3 couches** efficace en tokens :

**Le flux de travail à 3 couches :**

1. **`search`** - Obtenir un index compact avec des ID (~50-100 tokens/résultat)
2. **`timeline`** - Obtenir le contexte chronologique autour des résultats intéressants
3. **`get_observations`** - Récupérer les détails complets UNIQUEMENT pour les ID filtrés (~500-1 000 tokens/résultat)

**Comment ça fonctionne :**

- Claude utilise les outils MCP pour rechercher votre mémoire
- Commencez par `search` pour obtenir un index de résultats
- Utilisez `timeline` pour voir ce qui se passait autour d'observations spécifiques
- Utilisez `get_observations` pour récupérer les détails complets pour les ID pertinents
- **Économies de ~10x tokens** en filtrant avant de récupérer les détails

**Outils MCP disponibles :**

1. **`search`** - Rechercher l'index de mémoire avec des requêtes plein texte, filtrer par type/date/projet
2. **`timeline`** - Obtenir le contexte chronologique autour d'une observation ou d'une requête spécifique
3. **`get_observations`** - Récupérer les détails d'observation complets par ID (toujours regrouper plusieurs ID)

**Exemple d'utilisation :**

```typescript
// Étape 1 : Rechercher l'index
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Étape 2 : Examiner l'index, identifier les ID pertinents (par ex., #123, #456)

// Étape 3 : Récupérer les détails complets
get_observations((ids = [123, 456]));
```

Voir le [Guide des outils de recherche](https://docs.claude-mem-file.ai/usage/search-tools) pour des exemples détaillés.

---

## Fonctionnalités bêta

Claude-Mem-File propose un **canal bêta** avec des fonctionnalités expérimentales comme le **mode Endless** (architecture de mémoire biomimétique pour les sessions étendues). Basculez entre les versions stables et bêta à partir de l'interface Web Viewer à http://localhost:37777 → Paramètres.

Voir la **[Documentation des fonctionnalités bêta](https://docs.claude-mem-file.ai/beta-features)** pour plus de détails sur le mode Endless et comment l'essayer.

---

## Configuration système requise

- **Node.js** : 18.0.0 ou supérieur
- **Claude Code** : Dernière version avec support des plugins
- **Bun** : Runtime JavaScript et gestionnaire de processus (installé automatiquement s'il manque)

---

### Notes de configuration Windows

Si vous voyez une erreur comme :

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Assurez-vous que Node.js et npm sont installés et ajoutés à votre PATH. Téléchargez le programme d'installation Node.js le plus récent sur https://nodejs.org et redémarrez votre terminal après l'installation.

---

## Configuration

Les paramètres sont gérés dans `~/.claude-mem-file/settings.json` (créé automatiquement avec les valeurs par défaut au premier lancement). Configurez le modèle IA, le port du worker, le répertoire de données, le niveau de journalisation et les paramètres d'injection de contexte.

Voir le **[Guide de configuration](https://docs.claude-mem-file.ai/configuration)** pour tous les paramètres disponibles et des exemples.

### Configuration du mode et de la langue

Claude-Mem-File prend en charge plusieurs modes de flux de travail et langues via le paramètre `CLAUDE_MEM_MODE`.

Cette option contrôle à la fois :

- Le comportement du flux de travail (par exemple, code, chill, investigation)
- La langue utilisée dans les observations générées

#### Comment configurer

Modifiez votre fichier de paramètres à `~/.claude-mem-file/settings.json` :

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Les modes sont définis dans `plugin/modes/`. Pour voir tous les modes disponibles localement :

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Modes disponibles

| Mode       | Description                     |
| ---------- | ------------------------------- |
| `code`     | Mode anglais par défaut         |
| `code--zh` | Mode chinois simplifié          |
| `code--ja` | Mode japonais                   |

Les modes spécifiques à une langue suivent le modèle `code--[lang]` où `[lang]` est le code de langue ISO 639-1 (par ex., `zh` pour le chinois, `ja` pour le japonais, `es` pour l'espagnol).

> Note : `code--zh` (chinois simplifié) est déjà intégré — aucune installation supplémentaire ou mise à jour de plugin n'est requise.

#### Après le changement de mode

Redémarrez Claude Code pour appliquer la nouvelle configuration de mode.

## Développement

Voir le **[Guide de développement](https://docs.claude-mem-file.ai/development)** pour les instructions de compilation, les tests et le flux de contribution.

---

## Dépannage

Si vous rencontrez des problèmes, décrivez le problème à Claude et la compétence troubleshoot diagnostiquera et fournira automatiquement des corrections.

Voir le **[Guide de dépannage](https://docs.claude-mem-file.ai/troubleshooting)** pour les problèmes courants et les solutions.

---

## Rapports de bugs

Créez des rapports de bugs complets avec le générateur automatisé :

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Contribution

Les contributions sont les bienvenues ! Veuillez :

1. Forker le référentiel
2. Créer une branche de fonctionnalité
3. Effectuer vos modifications avec des tests
4. Mettre à jour la documentation
5. Soumettre une Pull Request

Voir le [Guide de développement](https://docs.claude-mem-file.ai/development) pour le flux de contribution.

---

## Licence

Ce projet est sous licence **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Tous droits réservés.

Voir le fichier [LICENSE](LICENSE) pour tous les détails.

**Ce que cela signifie :**

- Vous pouvez utiliser, modifier et distribuer ce logiciel librement
- Si vous modifiez et déployez sur un serveur réseau, vous devez rendre votre code source disponible
- Les œuvres dérivées doivent également être sous licence AGPL-3.0
- Il n'y a AUCUNE GARANTIE pour ce logiciel

**Note sur Ragtime** : Le répertoire `ragtime/` est sous licence séparée sous la **PolyForm Noncommercial License 1.0.0**. Voir [ragtime/LICENSE](ragtime/LICENSE) pour plus de détails.

---

## Support

- **Documentation** : [docs/](docs/)
- **Problèmes** : [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Référentiel** : [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Compte X officiel** : [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord officiel** : [Rejoindre Discord](https://discord.com/invite/J4wttp9vDu)
- **Auteur** : Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Construit avec Claude Agent SDK** | **Propulsé par Claude Code** | **Fait avec TypeScript**

---

### Qu'en est-il de $CMEM ?

$CMEM est un token Solana créé par un tiers sans le consentement préalable de Claude-Mem-File, mais officiellement adopté par le créateur de Claude-Mem-File (Alex Newman, @thedotmack). Le token agit comme un catalyseur communautaire pour la croissance et un véhicule pour apporter des données d'agents en temps réel aux développeurs et aux travailleurs du savoir qui en ont le plus besoin. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
