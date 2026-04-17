🌐 Αυτή είναι αυτόματη μετάφραση. Οι διορθώσεις της κοινότητας είναι ευπρόσδεκτες!

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
> **Αυτό είναι ένα fork του [claude-mem](https://github.com/thedotmack/claude-mem)** από τον [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Αυτό το fork αντικαθιστά το backend αποθήκευσης SQLite/binary με μια **προσέγγιση μόνο στο σύστημα αρχείων**: όλη η μνήμη αποθηκεύεται ως απλά αρχεία Markdown κάτω από το `<project-root>/docs/vault/`, πλήρως έκδοσης μέσω git και μοιράσιμη με κάθε μέλος της ομάδας σας. Χωρίς τοπικές βάσεις δεδομένων, χωρίς δυαδικά αρχεία — απλώς αρχεία που μπορείτε να διαβάσετε, να επεξεργαστείτε, να δεσμεύσετε και να συγχωνεύσετε.

<h4 align="center">claude-mem-file — Σύστημα συμπίεσης μόνιμης μνήμης κατασκευασμένο για το <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#γρήγορη-εκκίνηση">Γρήγορη Εκκίνηση</a> •
  <a href="#πώς-λειτουργεί">Πώς Λειτουργεί</a> •
  <a href="#εργαλεία-αναζήτησης-mcp">Εργαλεία Αναζήτησης</a> •
  <a href="#τεκμηρίωση">Τεκμηρίωση</a> •
  <a href="#διαμόρφωση">Διαμόρφωση</a> •
  <a href="#αντιμετώπιση-προβλημάτων">Αντιμετώπιση Προβλημάτων</a> •
  <a href="#άδεια-χρήσης">Άδεια Χρήσης</a>
</p>

<p align="center">
  Το Claude-Mem-File διατηρεί απρόσκοπτα το πλαίσιο μεταξύ συνεδριών καταγράφοντας παρατηρήσεις χρήσης εργαλείων, δημιουργώντας σημασιολογικές περιλήψεις, και αποθηκεύοντας τα πάντα ως έκδοσης Markdown μέσα σε ένα ανά-έργο Obsidian-συμβατό vault στο <code>&lt;project-root&gt;/docs/vault/</code> — χωρίς SQLite βάση δεδομένων, χωρίς δυαδικά αρχεία, πλήρως συγχωνεύσιμο μέσω git.
</p>

---

## Γρήγορη Εκκίνηση

Εγκαταστήστε με μία εντολή:

```bash
npx claude-mem-file install
```

Ή εγκαταστήστε για το Gemini CLI (αυτόματη ανίχνευση `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Ή εγκαταστήστε για το OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Ή εγκαταστήστε από την αγορά plugin μέσα στο Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Επανεκκινήστε το Claude Code ή το Gemini CLI. Το πλαίσιο από προηγούμενες συνεδρίες θα εμφανιστεί αυτόματα σε νέες συνεδρίες.

> **Σημείωση:** Το Claude-Mem-File δημοσιεύεται επίσης στο npm, αλλά το `npm install -g claude-mem-file` εγκαθιστά μόνο το **SDK/library** — δεν καταχωρεί τα hook plugin ή δεν ρυθμίζει την υπηρεσία worker. Πάντα εγκαταστήστε μέσω της `npx claude-mem-file install` ή των `/plugin` εντολών παραπάνω.

### 🦞 OpenClaw Gateway

Εγκαταστήστε το claude-mem-file ως ένα σταθερό plugin μνήμης σε [OpenClaw](https://openclaw.ai) gateways με μία εντολή:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Ο εγκαταστάτης χειρίζεται τις εξαρτήσεις, την ρύθμιση plugin, τη διαμόρφωση παρόχου AI, την εκκίνηση worker, και προαιρετικές ροές πραγματικού χρόνου σε Telegram, Discord, Slack και άλλα. Δείτε το [OpenClaw Integration Guide](https://docs.claude-mem-file.ai/openclaw-integration) για λεπτομέρειες.

**Βασικά Χαρακτηριστικά:**

- 🧠 **Μόνιμη Μνήμη** - Το πλαίσιο διατηρείται μεταξύ συνεδριών
- 📁 **Markdown Vault (Obsidian-συμβατό)** - Παρατηρήσεις και συνεδρίες αποθηκεύονται ως αρχεία `.md` κάτω από `<project-root>/docs/vault/`, έκδοσης και συγχωνευτής μέσω git — χωρίς SQLite, χωρίς δυαδική κατάσταση σε μηχανές ανάπτυξης
- 📊 **Προοδευτική Αποκάλυψη** - Ανάκτηση μνήμης σε στρώματα με ορατότητα κόστους token
- 🔍 **Αναζήτηση Βασισμένη σε Δεξιότητες** - Ερωτηθείτε το ιστορικό του έργου σας με τη δεξιότητα mem-search (τροφοδοτείται από το εν μνήμη `minisearch` πάνω από το vault)
- 🖥️ **Web Viewer UI** - Ροή μνήμης σε πραγματικό χρόνο στο http://localhost:37777
- 💻 **Claude Desktop Skill** - Αναζήτηση μνήμης από συνομιλίες Claude Desktop
- 🔒 **Έλεγχος Απορρήτου** - Χρησιμοποιήστε ετικέτες `<private>` για να εξαιρέσετε ευαίσθητο περιεχόμενο από την αποθήκευση
- ⚙️ **Διαμόρφωση Πλαισίου** - Λεπτομερής έλεγχος για το ποιο πλαίσιο εισάγεται
- 🤖 **Αυτόματη Λειτουργία** - Δεν απαιτείται χειροκίνητη παρέμβαση
- 🔗 **Αναφορές** - Αναφορά σε παλαιότερες παρατηρήσεις με IDs (πρόσβαση μέσω http://localhost:37777/api/observation/{id} ή προβολή όλων στο web viewer στο http://localhost:37777)
- 🧪 **Κανάλι Beta** - Δοκιμάστε πειραματικά χαρακτηριστικά όπως το Endless Mode μέσω εναλλαγής έκδοσης

## Μεταγραφή από SQLite (legacy)

Οι προηγούμενες εκδόσεις αποθήκευσαν την μνήμη στο `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Η νέα διάταξη vault αντικαθιστά όλα αυτά με απλό Markdown στο `<project-root>/docs/vault/`. Οι προηγούμενες μνήμες σας δεν χάνονται — εκτελέστε το σενάριο μεταγραφής μία φορά:

```bash
# από μέσα σε οποιοδήποτε έργο που χρησιμοποίησε προηγουμένως claude-mem-file:
npm run migrate-to-vault              # γράφει docs/vault/ από το legacy DB
npm run migrate-to-vault:dry          # προεπισκόπηση χωρίς γραφή
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # ρητές διαδρομές
```

Το σενάριο ανοίγει τη βάση δεδομένων SQLite μόνο για ανάγνωση και είναι ιδεμπόδυν (τα διπλότυπα ανιχνεύονται μέσω SHA-256 περιλήψεων περιεχομένου, επομένως η ξανα-εκτέλεση είναι ασφαλής). Δεσμεύστε τον φάκελο `docs/vault/` που προκύπτει στο repo σας για να μοιράσετε την μνήμη με την ομάδα σας.

---

## Τεκμηρίωση

📚 **[Προβολή Πλήρους Τεκμηρίωσης](https://docs.claude-mem-file.ai/)** - Περιήγηση στον επίσημο ιστότοπο

### Ξεκινώντας

- **[Οδηγός Εγκατάστασης](https://docs.claude-mem-file.ai/installation)** - Γρήγορη εκκίνηση & προηγμένη εγκατάσταση
- **[Ρύθμιση Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Αποκλειστικός οδηγός για την ενοποίηση Google's Gemini CLI
- **[Οδηγός Χρήσης](https://docs.claude-mem-file.ai/usage/getting-started)** - Πώς λειτουργεί αυτόματα το Claude-Mem-File
- **[Εργαλεία Αναζήτησης](https://docs.claude-mem-file.ai/usage/search-tools)** - Ερωτηθείτε το ιστορικό του έργου σας με φυσική γλώσσα
- **[Χαρακτηριστικά Beta](https://docs.claude-mem-file.ai/beta-features)** - Δοκιμάστε πειραματικά χαρακτηριστικά όπως το Endless Mode

### Βέλτιστες Πρακτικές

- **[Μηχανική Πλαισίου](https://docs.claude-mem-file.ai/context-engineering)** - Αρχές βελτιστοποίησης πλαισίου AI agent
- **[Προοδευτική Αποκάλυψη](https://docs.claude-mem-file.ai/progressive-disclosure)** - Φιλοσοφία πίσω από τη στρατηγική προετοιμασίας πλαισίου του Claude-Mem-File

### Αρχιτεκτονική

- **[Επισκόπηση](https://docs.claude-mem-file.ai/architecture/overview)** - Συστατικά στοιχεία συστήματος & ροή δεδομένων
- **[Εξέλιξη Αρχιτεκτονικής](https://docs.claude-mem-file.ai/architecture-evolution)** - Το ταξίδι από το v3 στο v5
- **[Αρχιτεκτονική Hooks](https://docs.claude-mem-file.ai/hooks-architecture)** - Πώς το Claude-Mem-File χρησιμοποιεί lifecycle hooks
- **[Αναφορά Hooks](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook scripts επεξηγημένα
- **[Υπηρεσία Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API & διαχείριση Bun
- **[Docs Vault](docs/)** - Obsidian-style Markdown vault για μοιρασμένη γνώση έργου

### Διαμόρφωση & Ανάπτυξη

- **[Διαμόρφωση](https://docs.claude-mem-file.ai/configuration)** - Μεταβλητές περιβάλλοντος & ρυθμίσεις
- **[Ανάπτυξη](https://docs.claude-mem-file.ai/development)** - Κατασκευή, δοκιμή, συνεισφορά
- **[Αντιμετώπιση Προβλημάτων](https://docs.claude-mem-file.ai/troubleshooting)** - Συνήθη προβλήματα & λύσεις

---

## Πώς Λειτουργεί

**Βασικά Συστατικά:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook scripts)
2. **Έξυπνη Εγκατάσταση** - Έλεγχος εξαρτήσεων με cache (pre-hook script, όχι lifecycle hook)
3. **Υπηρεσία Worker** - HTTP API στη θύρα 37777 με διεπαφή web viewer και 10 endpoints αναζήτησης, διαχειριζόμενη από το Bun
4. **Docs Vault** (`docs/`) - Obsidian-style Markdown vault δεσμευμένο στο repository· η μοιρασμένη πηγή αλήθειας για όλες τις αρχιτεκτονικές αποφάσεις, το πλαίσιο και τη γνώση μεταξύ συνεδριών και συνεργατών
5. **mem-search Skill** - Ερωτήματα φυσικής γλώσσας με προοδευτική αποκάλυψη

Δείτε [Architecture Overview](https://docs.claude-mem-file.ai/architecture/overview) για λεπτομέρειες.

---

## Εργαλεία Αναζήτησης MCP

Το Claude-Mem-File παρέχει έξυπνη αναζήτηση μνήμης μέσω **4 εργαλείων MCP** ακολουθώντας ένα token-efficient **3-layer workflow pattern**:

**Το 3-Layer Workflow:**

1. **`search`** - Λήψη συμπαγούς ευρετηρίου με IDs (~50-100 tokens/result)
2. **`timeline`** - Λήψη χρονολογικού πλαισίου γύρω από ενδιαφέροντα αποτελέσματα
3. **`get_observations`** - Λήψη πλήρων λεπτομερειών ΜΟΝΟ για φιλτραρισμένα IDs (~500-1,000 tokens/result)

**Πώς Λειτουργεί:**

- Ο Claude χρησιμοποιεί εργαλεία MCP για αναζήτηση της μνήμης σας
- Ξεκινήστε με το `search` για να λάβετε ένα ευρετήριο αποτελεσμάτων
- Χρησιμοποιήστε το `timeline` για να δείτε τι συνέβαινε γύρω από συγκεκριμένες παρατηρήσεις
- Χρησιμοποιήστε το `get_observations` για λήψη πλήρων λεπτομερειών για σχετικά IDs
- **~10x εξοικονόμηση token** με φιλτράρισμα πριν από λήψη λεπτομερειών

**Διαθέσιμα Εργαλεία MCP:**

1. **`search`** - Αναζήτηση ευρετηρίου μνήμης με ερωτήματα πλήρους κειμένου, φίλτρα κατά τύπο/ημερομηνία/έργο
2. **`timeline`** - Λήψη χρονολογικού πλαισίου γύρω από μια συγκεκριμένη παρατήρηση ή ερώτημα
3. **`get_observations`** - Λήψη πλήρων λεπτομερειών παρατήρησης κατά IDs (πάντα batch πολλαπλά IDs)

**Παράδειγμα Χρήσης:**

```typescript
// Βήμα 1: Αναζήτηση ευρετηρίου
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Βήμα 2: Ανασκόπηση ευρετηρίου, ταυτοποίηση σχετικών IDs (π.χ., #123, #456)

// Βήμα 3: Λήψη πλήρων λεπτομερειών
get_observations((ids = [123, 456]));
```

Δείτε [Search Tools Guide](https://docs.claude-mem-file.ai/usage/search-tools) για λεπτομερή παραδείγματα.

---

## Χαρακτηριστικά Beta

Το Claude-Mem-File προσφέρει ένα **κανάλι beta** με πειραματικά χαρακτηριστικά όπως το **Endless Mode** (βιομιμητική αρχιτεκτονική μνήμης για εκτεταμένες συνεδρίες). Εναλλαγή μεταξύ σταθερών και beta εκδόσεων από τη διεπαφή web viewer στο http://localhost:37777 → Settings.

Δείτε **[Beta Features Documentation](https://docs.claude-mem-file.ai/beta-features)** για λεπτομέρειες σχετικά με το Endless Mode και πώς να το δοκιμάσετε.

---

## Απαιτήσεις Συστήματος

- **Node.js**: 18.0.0 ή νεότερο
- **Claude Code**: Τελευταία έκδοση με υποστήριξη plugin
- **Bun**: JavaScript runtime και διαχειριστής διεργασιών (εγκαθίσταται αυτόματα αν λείπει)

---

### Σημειώσεις Ρύθμισης Windows

Αν δείτε σφάλμα όπως:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Βεβαιωθείτε ότι το Node.js και npm είναι εγκατεστημένα και προστέθηκαν στη διαδρομή PATH σας. Κατεβάστε το τελευταίο Node.js installer από τη https://nodejs.org και επανεκκινήστε το τερματικό σας μετά την εγκατάσταση.

---

## Διαμόρφωση

Οι ρυθμίσεις διαχειρίζονται στο `~/.claude-mem-file/settings.json` (αυτόδημιουργία με προεπιλογές κατά την πρώτη εκτέλεση). Διαμορφώστε το μοντέλο AI, τη θύρα worker, τον κατάλογο δεδομένων, το επίπεδο καταγραφής και τις ρυθμίσεις εισαγωγής πλαισίου.

Δείτε τον **[Configuration Guide](https://docs.claude-mem-file.ai/configuration)** για όλες τις διαθέσιμες ρυθμίσεις και παραδείγματα.

### Διαμόρφωση Τρόπου & Γλώσσας

Το Claude-Mem-File υποστηρίζει πολλαπλούς τρόπους ροής εργασίας και γλώσσες μέσω της ρύθμισης `CLAUDE_MEM_MODE`.

Αυτή η επιλογή ελέγχει και τα δύο:

- Η συμπεριφορά ροής εργασίας (π.χ. code, chill, investigation)
- Η γλώσσα που χρησιμοποιείται στις δημιουργημένες παρατηρήσεις

#### Πώς να Διαμορφώσετε

Επεξεργαστείτε το αρχείο ρυθμίσεών σας στο `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Οι τρόποι ορίζονται στο `plugin/modes/`. Για να δείτε όλες τις διαθέσιμες τρόπους τοπικά:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Διαθέσιμοι Τρόποι

| Τρόπος     | Περιγραφή               |
| ---------- | ----------------------- |
| `code`     | Default English mode    |
| `code--zh` | Simplified Chinese mode |
| `code--ja` | Japanese mode           |

Οι τρόποι ειδικοί γλώσσας ακολουθούν το μοτίβο `code--[lang]` όπου `[lang]` είναι ο κωδικός γλώσσας ISO 639-1 (π.χ., `zh` για Κινέζικα, `ja` για Ιαπωνικά, `es` για Ισπανικά).

> Σημείωση: Το `code--zh` (Simplified Chinese) είναι ήδη ενσωματωμένο — δεν απαιτείται πρόσθετη εγκατάσταση ή ενημέρωση plugin.

#### Μετά την Αλλαγή Τρόπου

Επανεκκινήστε το Claude Code για εφαρμογή της νέας διαμόρφωσης τρόπου.

## Ανάπτυξη

Δείτε τον **[Development Guide](https://docs.claude-mem-file.ai/development)** για οδηγίες κατασκευής, δοκιμών και ροής εργασίας συνεισφοράς.

---

## Αντιμετώπιση Προβλημάτων

Εάν αντιμετωπίζετε προβλήματα, περιγράψτε το πρόβλημα στο Claude και η δεξιότητα troubleshoot θα διαγνώσει αυτόματα και θα παράσχει λύσεις.

Δείτε τον **[Troubleshooting Guide](https://docs.claude-mem-file.ai/troubleshooting)** για συνήθη προβλήματα και λύσεις.

---

## Αναφορές Σφαλμάτων

Δημιουργήστε περιεκτικές αναφορές σφαλμάτων με τη γεννήτρια αυτοματοποίησης:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Συνεισφορά

Οι συνεισφορές είναι ευπρόσδεκτες! Παρακαλώ:

1. Fork το repository
2. Δημιουργήστε ένα feature branch
3. Κάντε τις αλλαγές σας με δοκιμές
4. Ενημερώστε την τεκμηρίωση
5. Υποβάλετε ένα Pull Request

Δείτε [Development Guide](https://docs.claude-mem-file.ai/development) για τη ροή εργασίας συνεισφοράς.

---

## Άδεια Χρήσης

Αυτό το έργο διατίθεται με άδεια **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Με επιφύλαξη παντός δικαιώματος.

Δείτε το αρχείο [LICENSE](LICENSE) για πλήρεις λεπτομέρειες.

**Τι Σημαίνει Αυτό:**

- Μπορείτε να χρησιμοποιήσετε, να τροποποιήσετε και να διανείμετε ελεύθερα αυτό το λογισμικό
- Αν τροποποιήσετε και αναπτύξετε σε διακομιστή δικτύου, πρέπει να καταστήσετε διαθέσιμο τον πηγαίο κώδικά σας
- Τα παράγωγα έργα πρέπει επίσης να διατίθενται με άδεια AGPL-3.0
- ΔΕΝ υπάρχει ΕΓΓΥΗΣΗ για αυτό το λογισμικό

**Σημείωση για το Ragtime**: Ο κατάλογος `ragtime/` διατίθεται χωριστά με άδεια **PolyForm Noncommercial License 1.0.0**. Δείτε [ragtime/LICENSE](ragtime/LICENSE) για λεπτομέρειες.

---

## Υποστήριξη

- **Τεκμηρίωση**: [docs/](docs/)
- **Ζητήματα**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repository**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Επίσημος X Account**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Επίσημο Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Συγγραφέας**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Κατασκευασμένο με Claude Agent SDK** | **Τροφοδοτείται από Claude Code** | **Φτιαγμένο με TypeScript**

---

### Τι Γίνεται με το $CMEM;

Το $CMEM είναι ένα solana token δημιουργημένο από ένα 3rd party χωρίς την προηγούμενη συγκατάθεση του Claude-Mem-File, αλλά επισήμως αγκαλιασμένο από τον δημιουργό του Claude-Mem-File (Alex Newman, @thedotmack). Το token ενεργεί ως καταλύτης κοινότητας για ανάπτυξη και όχημα για φέρνοντας δεδομένα πραγματικού χρόνου στους προγραμματιστές και γνώσης εργάτες που τα χρειάζονται περισσότερο. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
