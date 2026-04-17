🌐 Ini adalah terjemahan otomatis. Koreksi komunitas disambut!

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
> **Ini adalah fork dari [claude-mem](https://github.com/thedotmack/claude-mem)** oleh [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Fork ini menggantikan backend penyimpanan SQLite/biner dengan **pendekatan hanya sistem file**: semua memori disimpan sebagai file Markdown biasa di bawah `<project-root>/docs/vault/`, sepenuhnya dapat diversi melalui git dan dapat dibagikan dengan setiap anggota tim Anda. Tidak ada database lokal, tidak ada blob biner — hanya file yang dapat Anda baca, edit, commit, dan merge.

<h4 align="center">claude-mem-file — Sistem kompresi memori persisten yang dibangun untuk <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

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
  <a href="#mulai-cepat">Mulai Cepat</a> •
  <a href="#cara-kerja">Cara Kerja</a> •
  <a href="#alat-pencarian-mcp">Alat Pencarian</a> •
  <a href="#dokumentasi">Dokumentasi</a> •
  <a href="#konfigurasi">Konfigurasi</a> •
  <a href="#pemecahan-masalah">Pemecahan Masalah</a> •
  <a href="#lisensi">Lisensi</a>
</p>

<p align="center">
  Claude-Mem-File secara mulus mempertahankan konteks di seluruh sesi dengan menangkap observasi penggunaan alat, menghasilkan ringkasan semantik, dan menyimpan semuanya sebagai Markdown yang diversi di dalam vault Obsidian-kompatibel per-proyek di <code>&lt;project-root&gt;/docs/vault/</code> — tanpa database SQLite, tanpa blob biner, sepenuhnya dapat digabungkan melalui git.
</p>

---

## Mulai Cepat

Instal dengan satu perintah:

```bash
npx claude-mem-file install
```

Atau instal untuk Gemini CLI (deteksi otomatis `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Atau instal untuk OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

Atau instal dari marketplace plugin di dalam Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Restart Claude Code atau Gemini CLI. Konteks dari sesi sebelumnya akan secara otomatis muncul di sesi baru.

> **Catatan:** Claude-Mem-File juga dipublikasikan di npm, tetapi `npm install -g claude-mem-file` hanya menginstal **SDK/library** — tidak mendaftarkan hook plugin atau menyiapkan worker service. Selalu instal melalui `npx claude-mem-file install` atau perintah `/plugin` di atas.

### 🦞 OpenClaw Gateway

Instal claude-mem-file sebagai plugin memori persisten di gateway [OpenClaw](https://openclaw.ai) dengan satu perintah:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Installer menangani dependensi, setup plugin, konfigurasi penyedia AI, startup worker, dan feed observasi real-time opsional ke Telegram, Discord, Slack, dan lainnya. Lihat [Panduan Integrasi OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) untuk detail.

**Fitur Utama:**

- 🧠 **Memori Persisten** - Konteks bertahan di seluruh sesi
- 📁 **Markdown Vault (Kompatibel Obsidian)** - Observasi dan sesi disimpan sebagai file `.md` di bawah `<project-root>/docs/vault/`, dapat diversi dan digabungkan melalui git — tidak ada SQLite, tidak ada state biner di mesin dev
- 📊 **Progressive Disclosure** - Pengambilan memori berlapis dengan visibilitas biaya token
- 🔍 **Pencarian Berbasis Skill** - Query riwayat proyek Anda dengan mem-search skill (powered by `minisearch` dalam memori di atas vault)
- 🖥️ **Web Viewer UI** - Stream memori real-time di http://localhost:37777
- 💻 **Claude Desktop Skill** - Cari memori dari percakapan Claude Desktop
- 🔒 **Kontrol Privasi** - Gunakan tag `<private>` untuk mengecualikan konten sensitif dari penyimpanan
- ⚙️ **Konfigurasi Konteks** - Kontrol yang detail atas konteks apa yang diinjeksikan
- 🤖 **Operasi Otomatis** - Tidak memerlukan intervensi manual
- 🔗 **Kutipan** - Referensi observasi masa lalu dengan ID (akses melalui http://localhost:37777/api/observation/{id} atau lihat semua di web viewer di http://localhost:37777)
- 🧪 **Beta Channel** - Coba fitur eksperimental seperti Endless Mode melalui peralihan versi

## Migrasi dari SQLite (legacy)

Rilis sebelumnya menyimpan memori di `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Layout vault baru menggantikan semua itu dengan Markdown biasa di `<project-root>/docs/vault/`. Memori sebelumnya Anda tidak hilang — jalankan skrip migrasi sekali:

```bash
# dari dalam proyek apa pun yang sebelumnya menggunakan claude-mem-file:
npm run migrate-to-vault              # menulis docs/vault/ dari DB legacy
npm run migrate-to-vault:dry          # pratinjau tanpa menulis
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # path eksplisit
```

Skrip membuka database SQLite read-only dan idempoten (duplikat terdeteksi melalui hash konten SHA-256, jadi menjalankan kembali aman). Commit folder `docs/vault/` yang dihasilkan ke repo Anda untuk berbagi memori dengan tim Anda.

---

## Dokumentasi

📚 **[Lihat Dokumentasi Lengkap](https://docs.claude-mem-file.ai/)** - Jelajahi di situs web resmi

### Memulai

- **[Panduan Instalasi](https://docs.claude-mem-file.ai/installation)** - Mulai cepat & instalasi lanjutan
- **[Setup Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Panduan khusus untuk integrasi Google Gemini CLI
- **[Panduan Penggunaan](https://docs.claude-mem-file.ai/usage/getting-started)** - Bagaimana Claude-Mem-File bekerja secara otomatis
- **[Alat Pencarian](https://docs.claude-mem-file.ai/usage/search-tools)** - Query riwayat proyek Anda dengan bahasa alami
- **[Fitur Beta](https://docs.claude-mem-file.ai/beta-features)** - Coba fitur eksperimental seperti Endless Mode

### Praktik Terbaik

- **[Context Engineering](https://docs.claude-mem-file.ai/context-engineering)** - Prinsip optimisasi konteks agen AI
- **[Progressive Disclosure](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofi di balik strategi priming konteks Claude-Mem-File

### Arsitektur

- **[Ringkasan](https://docs.claude-mem-file.ai/architecture/overview)** - Komponen sistem & aliran data
- **[Evolusi Arsitektur](https://docs.claude-mem-file.ai/architecture-evolution)** - Perjalanan dari v3 ke v5
- **[Arsitektur Hooks](https://docs.claude-mem-file.ai/hooks-architecture)** - Bagaimana Claude-Mem-File menggunakan lifecycle hooks
- **[Referensi Hooks](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 skrip hook dijelaskan
- **[Worker Service](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API & manajemen Bun
- **[Docs Vault](docs/)** - Vault Markdown gaya Obsidian untuk pengetahuan proyek bersama

### Konfigurasi & Pengembangan

- **[Konfigurasi](https://docs.claude-mem-file.ai/configuration)** - Variabel lingkungan & pengaturan
- **[Pengembangan](https://docs.claude-mem-file.ai/development)** - Membangun, testing, berkontribusi
- **[Pemecahan Masalah](https://docs.claude-mem-file.ai/troubleshooting)** - Masalah umum & solusi

---

## Cara Kerja

**Komponen Inti:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 skrip hook)
2. **Smart Install** - Pemeriksa dependensi yang di-cache (skrip pre-hook, bukan lifecycle hook)
3. **Worker Service** - HTTP API di port 37777 dengan web viewer UI dan 10 endpoint pencarian, dikelola oleh Bun
4. **Docs Vault** (`docs/`) - Vault Markdown gaya Obsidian yang dicommit ke repositori; sumber kebenaran bersama untuk semua keputusan arsitektur, konteks, dan pengetahuan di seluruh sesi dan kolaborator
5. **mem-search Skill** - Query bahasa alami dengan progressive disclosure

Lihat [Ringkasan Arsitektur](https://docs.claude-mem-file.ai/architecture/overview) untuk detail.

---

## Alat Pencarian MCP

Claude-Mem-File menyediakan pencarian memori cerdas melalui **4 alat MCP** mengikuti pola alur kerja **3-layer yang efisien token**:

**Alur Kerja 3-Layer:**

1. **`search`** - Dapatkan indeks kompak dengan ID (~50-100 token/hasil)
2. **`timeline`** - Dapatkan konteks kronologis di sekitar hasil yang menarik
3. **`get_observations`** - Ambil detail lengkap HANYA untuk ID yang difilter (~500-1,000 token/hasil)

**Cara Kerja:**

- Claude menggunakan alat MCP untuk mencari memori Anda
- Mulai dengan `search` untuk mendapatkan indeks hasil
- Gunakan `timeline` untuk melihat apa yang terjadi di sekitar observasi tertentu
- Gunakan `get_observations` untuk mengambil detail lengkap untuk ID yang relevan
- **~10x penghematan token** dengan memfilter sebelum mengambil detail

**Alat MCP yang Tersedia:**

1. **`search`** - Cari indeks memori dengan query teks lengkap, filter berdasarkan tipe/tanggal/proyek
2. **`timeline`** - Dapatkan konteks kronologis di sekitar observasi atau query tertentu
3. **`get_observations`** - Ambil detail observasi lengkap berdasarkan ID (selalu batch beberapa ID)

**Contoh Penggunaan:**

```typescript
// Langkah 1: Cari indeks
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Langkah 2: Tinjau indeks, identifikasi ID yang relevan (mis. #123, #456)

// Langkah 3: Ambil detail lengkap
get_observations((ids = [123, 456]));
```

Lihat [Panduan Alat Pencarian](https://docs.claude-mem-file.ai/usage/search-tools) untuk contoh detail.

---

## Fitur Beta

Claude-Mem-File menawarkan **beta channel** dengan fitur eksperimental seperti **Endless Mode** (arsitektur memori biomimetik untuk sesi yang diperpanjang). Beralih antara versi stabil dan beta dari web viewer UI di http://localhost:37777 → Settings.

Lihat **[Dokumentasi Fitur Beta](https://docs.claude-mem-file.ai/beta-features)** untuk detail tentang Endless Mode dan cara mencobanya.

---

## Persyaratan Sistem

- **Node.js**: 18.0.0 atau lebih tinggi
- **Claude Code**: Versi terbaru dengan dukungan plugin
- **Bun**: Runtime JavaScript dan process manager (otomatis diinstal jika tidak ada)

---

### Catatan Setup Windows

Jika Anda melihat kesalahan seperti:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Pastikan Node.js dan npm diinstal dan ditambahkan ke PATH Anda. Download installer Node.js terbaru dari https://nodejs.org dan restart terminal Anda setelah instalasi.

---

## Konfigurasi

Pengaturan dikelola di `~/.claude-mem-file/settings.json` (otomatis dibuat dengan default saat pertama kali dijalankan). Konfigurasi model AI, port worker, direktori data, level log, dan pengaturan injeksi konteks.

Lihat **[Panduan Konfigurasi](https://docs.claude-mem-file.ai/configuration)** untuk semua pengaturan dan contoh yang tersedia.

### Konfigurasi Mode & Bahasa

Claude-Mem-File mendukung beberapa mode alur kerja dan bahasa melalui pengaturan `CLAUDE_MEM_MODE`.

Opsi ini mengontrol keduanya:

- Perilaku alur kerja (mis. code, chill, investigation)
- Bahasa yang digunakan dalam observasi yang dihasilkan

#### Cara Mengonfigurasi

Edit file pengaturan Anda di `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Mode didefinisikan di `plugin/modes/`. Untuk melihat semua mode yang tersedia secara lokal:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Mode yang Tersedia

| Mode       | Deskripsi            |
| ---------- | -------------------- |
| `code`     | Mode Inggris default  |
| `code--zh` | Mode Cina Sederhana   |
| `code--ja` | Mode Jepang           |

Mode khusus bahasa mengikuti pola `code--[lang]` di mana `[lang]` adalah kode bahasa ISO 639-1 (mis. `zh` untuk Cina, `ja` untuk Jepang, `es` untuk Spanyol).

> Catatan: `code--zh` (Cina Sederhana) sudah built-in — tidak diperlukan instalasi tambahan atau pembaruan plugin.

#### Setelah Mengubah Mode

Restart Claude Code untuk menerapkan konfigurasi mode baru.

## Pengembangan

Lihat **[Panduan Pengembangan](https://docs.claude-mem-file.ai/development)** untuk instruksi build, testing, dan alur kerja kontribusi.

---

## Pemecahan Masalah

Jika mengalami masalah, jelaskan masalah ke Claude dan skill troubleshoot akan secara otomatis mendiagnosis dan memberikan perbaikan.

Lihat **[Panduan Pemecahan Masalah](https://docs.claude-mem-file.ai/troubleshooting)** untuk masalah umum dan solusi.

---

## Laporan Bug

Buat laporan bug yang komprehensif dengan generator otomatis:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Kontribusi

Kontribusi sangat dipersilakan! Silakan:

1. Fork repositori
2. Buat branch fitur
3. Buat perubahan Anda dengan tes
4. Perbarui dokumentasi
5. Kirim Pull Request

Lihat [Panduan Pengembangan](https://docs.claude-mem-file.ai/development) untuk alur kerja kontribusi.

---

## Lisensi

Proyek ini dilisensikan di bawah **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Semua hak dilindungi.

Lihat file [LICENSE](LICENSE) untuk detail lengkap.

**Apa Artinya:**

- Anda dapat menggunakan, memodifikasi, dan mendistribusikan perangkat lunak ini dengan bebas
- Jika Anda memodifikasi dan men-deploy di server jaringan, Anda harus membuat kode sumber Anda tersedia
- Karya turunan juga harus dilisensikan di bawah AGPL-3.0
- TIDAK ADA JAMINAN untuk perangkat lunak ini

**Catatan tentang Ragtime**: Direktori `ragtime/` dilisensikan secara terpisah di bawah **PolyForm Noncommercial License 1.0.0**. Lihat [ragtime/LICENSE](ragtime/LICENSE) untuk detail.

---

## Dukungan

- **Dokumentasi**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repositori**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Akun X Resmi**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord Resmi**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Penulis**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Built with Claude Agent SDK** | **Powered by Claude Code** | **Made with TypeScript**

---

### Bagaimana Dengan $CMEM?

$CMEM adalah token solana yang dibuat oleh pihak ketiga tanpa persetujuan sebelumnya dari Claude-Mem-File, tetapi secara resmi diadopsi oleh pembuat Claude-Mem-File (Alex Newman, @thedotmack). Token bertindak sebagai katalis komunitas untuk pertumbuhan dan kendaraan untuk membawa data agen real-time ke pengembang dan pekerja pengetahuan yang membutuhkannya paling banyak. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
