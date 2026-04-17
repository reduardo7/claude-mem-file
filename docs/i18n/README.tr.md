🌐 Bu otomatik bir çevirisidir. Topluluk düzeltmeleri memnuniyetle karşılanır!

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
> **Bu, [claude-mem](https://github.com/thedotmack/claude-mem) projesinin bir fork'u** [Alex Newman (@thedotmack)](https://github.com/thedotmack) tarafından.
>
> Bu fork, SQLite/binary depolama arka ucunu **yalnızca dosya sistemi yaklaşımı** ile değiştirir: tüm bellek `<project-root>/docs/vault/` altında düz Markdown dosyaları olarak depolanır, git üzerinden tamamen sürümlenebilir ve ekibinizin her üyesi ile paylaşılabilir. Yerel veritabanı yok, ikili blob'lar yok — sadece okuyabileceğiniz, düzenleyebileceğiniz, kaydedebileceğiniz ve birleştirebileceğiniz dosyalar.

<h4 align="center">claude-mem-file — <a href="https://claude.com/claude-code" target="_blank">Claude Code</a> için yerleşik kalıcı bellek sıkıştırma sistemi.</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/reduardo7/claude-mem-file">
        <picture>
          <img src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/cm-preview.gif" alt="Claude-Mem-File Önizlemesi" width="500">
        </picture>
      </a>
    </td>
    <td align="center">
      <a href="https://www.star-history.com/#reduardo7/claude-mem-file&Date">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&theme=dark&legend=top-left" />
          <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left" />
          <img alt="Star History Grafiği" src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left" width="500" />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#hızlı-başlangıç">Hızlı Başlangıç</a> •
  <a href="#nasıl-çalışır">Nasıl Çalışır</a> •
  <a href="#mcp-arama-araçları">Arama Araçları</a> •
  <a href="#dokümantasyon">Dokümantasyon</a> •
  <a href="#yapılandırma">Yapılandırma</a> •
  <a href="#sorun-giderme">Sorun Giderme</a> •
  <a href="#lisans">Lisans</a>
</p>

<p align="center">
  Claude-Mem-File, araç kullanım gözlemlerini yakalayarak, anlamsal özetler oluşturarak ve her proje için `<project-root>/docs/vault/` altında sürümlü bir Obsidian uyumlu kasaya depolayarak oturumlar arası bağlamı sorunsuzca korur — SQLite veritabanı yok, ikili blob yok, git üzerinden tamamen birleştirilebilir.
</p>

---

## Hızlı Başlangıç

Tek bir komutla yükleyin:

```bash
npx claude-mem-file install
```

Ya da Gemini CLI için yükleyin (`~/.gemini` otomatik olarak algılanır):

```bash
npx claude-mem-file install --ide gemini-cli
```

Ya da OpenCode için yükleyin:

```bash
npx claude-mem-file install --ide opencode
```

Ya da Claude Code içinde eklenti pazarından yükleyin:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Claude Code veya Gemini CLI'ı yeniden başlatın. Önceki oturumlardan bağlam otomatik olarak yeni oturumlarda görünecektir.

> **Not:** Claude-Mem-File ayrıca npm'de yayımlanır, ancak `npm install -g claude-mem-file` **yalnızca SDK/kütüphaneyi** yükler — eklenti hook'larını kaydetmez ya da worker servisini kurmaz. Daima `npx claude-mem-file install` veya yukarıdaki `/plugin` komutlarını kullanarak yükleyin.

### 🦞 OpenClaw Ağ Geçidi

Claude-mem-file'ı tek bir komutla [OpenClaw](https://openclaw.ai) ağ geçitlerine kalıcı bellek eklentisi olarak yükleyin:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Yükleyici bağımlılıkları, eklenti kurulumunu, AI sağlayıcı yapılandırmasını, worker başlatmayı ve Telegram, Discord, Slack'e isteğe bağlı gerçek zamanlı gözlem beslemesini işler. Ayrıntılar için [OpenClaw Entegrasyon Kılavuzu](https://docs.claude-mem-file.ai/openclaw-integration) bölümüne bakın.

**Temel Özellikler:**

- 🧠 **Kalıcı Bellek** - Bağlam oturumlar arası hayatta kalır
- 📁 **Markdown Kasa (Obsidian uyumlu)** - Gözlemler ve oturumlar `<project-root>/docs/vault/` altında `.md` dosyaları olarak depolanır, git üzerinden sürümlü ve birleştirilebilir — SQLite yok, geliştirici makinalarında ikili durum yok
- 📊 **Aşamalı Açıklama** - Token maliyeti görünürlüğü ile katmanlı bellek erişimi
- 🔍 **Beceri Tabanlı Arama** - mem-search becerisi ile proje geçmişinizi sorgulayın (kasa üzerinde bellek içi `minisearch` tarafından desteklenir)
- 🖥️ **Web Görüntüleyici Arayüzü** - http://localhost:37777 adresinde gerçek zamanlı bellek akışı
- 💻 **Claude Desktop Becerisi** - Claude Desktop konuşmalarından bellek araması yapın
- 🔒 **Gizlilik Kontrolü** - Hassas içeriği depolamadan hariç tutmak için `<private>` etiketlerini kullanın
- ⚙️ **Bağlam Yapılandırması** - Hangi bağlamın enjekte edileceği üzerinde detaylı kontrol
- 🤖 **Otomatik İşlem** - Manuel müdahale gerektirmez
- 🔗 **Alıntılar** - ID'lerle geçmiş gözlemlere referans verin (http://localhost:37777/api/observation/{id} üzerinden erişin veya http://localhost:37777 adresindeki web görüntüleyicide tümünü görüntüleyin)
- 🧪 **Beta Kanalı** - Sürüm değiştirme yoluyla Endless Mode gibi deneysel özellikleri deneyin

## SQLite'ten Geçiş (eski versiyon)

Önceki sürümler belleği `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB) adresinde depolardı. Yeni kasa düzeni tümünü `<project-root>/docs/vault/` altında düz Markdown ile değiştirir. Önceki belleğiniz kaybedilmemiştir — geçiş betiğini bir kez çalıştırın:

```bash
# daha önce claude-mem-file kullanmış herhangi bir proje içinde:
npm run migrate-to-vault              # eski DB'den docs/vault/ yazar
npm run migrate-to-vault:dry          # yazı yazmadan önizleyin
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # açık yollar
```

Betik, SQLite veritabanını salt okunur şekilde açar ve idempotent'tir (yineleniler SHA-256 içerik hash'leri aracılığıyla algılanır, bu nedenle yeniden çalıştırmak güvenlidir). Elde edilen `docs/vault/` klasörünü depoya kaydederek belleği ekibinizle paylaşın.

---

## Dokümantasyon

📚 **[Tam Dokümantasyonu Görüntüle](https://docs.claude-mem-file.ai/)** - Resmi web sitesinde göz atın

### Başlarken

- **[Kurulum Kılavuzu](https://docs.claude-mem-file.ai/installation)** - Hızlı başlangıç ve gelişmiş kurulum
- **[Gemini CLI Kurulumu](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Google'ın Gemini CLI entegrasyonu için özel kılavuz
- **[Kullanım Kılavuzu](https://docs.claude-mem-file.ai/usage/getting-started)** - Claude-Mem-File otomatik olarak nasıl çalışır
- **[Arama Araçları](https://docs.claude-mem-file.ai/usage/search-tools)** - Doğal dil ile proje geçmişinizi sorgulayın
- **[Beta Özellikleri](https://docs.claude-mem-file.ai/beta-features)** - Endless Mode gibi deneysel özellikleri deneyin

### En İyi Uygulamalar

- **[Bağlam Mühendisliği](https://docs.claude-mem-file.ai/context-engineering)** - AI ajanı bağlam optimizasyonu ilkeleri
- **[Aşamalı Açıklama](https://docs.claude-mem-file.ai/progressive-disclosure)** - Claude-Mem-File'in bağlam hazırlama stratejisinin ardındaki felsefe

### Mimari

- **[Genel Bakış](https://docs.claude-mem-file.ai/architecture/overview)** - Sistem bileşenleri ve veri akışı
- **[Mimari Evrimi](https://docs.claude-mem-file.ai/architecture-evolution)** - v3'ten v5'e yolculuk
- **[Hooks Mimarisi](https://docs.claude-mem-file.ai/hooks-architecture)** - Claude-Mem-File yaşam döngüsü hook'larını nasıl kullanır
- **[Hooks Referansı](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 hook betiği açıklandı
- **[Worker Servisi](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API ve Bun yönetimi
- **[Docs Kasa](docs/)** - Paylaşılan proje bilgisi için Obsidian tarzı Markdown kasa

### Yapılandırma ve Geliştirme

- **[Yapılandırma](https://docs.claude-mem-file.ai/configuration)** - Ortam değişkenleri ve ayarlar
- **[Geliştirme](https://docs.claude-mem-file.ai/development)** - Derleme, test etme, katkıda bulunma
- **[Sorun Giderme](https://docs.claude-mem-file.ai/troubleshooting)** - Yaygın sorunlar ve çözümler

---

## Nasıl Çalışır

**Temel Bileşenler:**

1. **5 Yaşam Döngüsü Hook'u** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook betiği)
2. **Akıllı Kurulum** - Önbelleğe alınmış bağımlılık kontrolcüsü (ön-hook betiği, yaşam döngüsü hook'u değil)
3. **Worker Servisi** - Web görüntüleyici arayüzü ve 10 arama uç noktası ile 37777 portunda HTTP API, Bun tarafından yönetilir
4. **Docs Kasa** (`docs/`) - Depoya kaydedilen Obsidian tarzı Markdown kasa; tüm mimari kararlar, bağlam ve oturumlar ile işbirlikçiler arası bilginin paylaşılan gerçeklik kaynağı
5. **mem-search Becerisi** - Aşamalı açıklama ile doğal dil sorguları

Ayrıntılar için [Mimari Genel Bakış](https://docs.claude-mem-file.ai/architecture/overview) bölümüne bakın.

---

## MCP Arama Araçları

Claude-Mem-File, token açısından verimli **3 katmanlı iş akışı** deseni ile **4 MCP aracı** aracılığıyla akıllı bellek araması sağlar:

**3 Katmanlı İş Akışı:**

1. **`search`** - Kompakt indeks ile ID'ler al (~50-100 token/sonuç)
2. **`timeline`** - İlginç sonuçlar etrafında kronolojik bağlam al
3. **`get_observations`** - Filtrelenen ID'ler için tam detaylar al (~500-1,000 token/sonuç)

**Nasıl Çalışır:**

- Claude, belleğinizi aramak için MCP araçlarını kullanır
- Sonuçların indeksini almak için `search` ile başlayın
- Belirli gözlemler etrafında ne olduğunu görmek için `timeline` kullanın
- İlgili ID'ler için `get_observations` ile tam detaylar alın
- **Detaylar alınmadan önce filtreleme ile ~10x token tasarrufu**

**Mevcut MCP Araçları:**

1. **`search`** - Tam metin sorguları ile bellek indeksini arayın, türe/tarihe/projeye göre filtreleyin
2. **`timeline`** - Belirli bir gözlem veya sorgu etrafında kronolojik bağlam alın
3. **`get_observations`** - ID'lere göre tam gözlem detaylarını alın (daima birden fazla ID'yi toplu olarak alın)

**Örnek Kullanım:**

```typescript
// Adım 1: İndeks için ara
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Adım 2: İndeksi gözden geçirin, ilgili ID'leri belirleyin (örn. #123, #456)

// Adım 3: Tam detayları al
get_observations((ids = [123, 456]));
```

Ayrıntılı örnekler için [Arama Araçları Kılavuzu](https://docs.claude-mem-file.ai/usage/search-tools) bölümüne bakın.

---

## Beta Özellikleri

Claude-Mem-File, **Endless Mode** (genişletilmiş oturumlar için biyomimetik bellek mimarisi) gibi deneysel özellikler içeren bir **beta kanalı** sunar. http://localhost:37777 → Settings adresindeki web görüntüleyici arayüzünden kararlı ve beta sürümleri arasında geçiş yapın.

Endless Mode hakkında ayrıntılar ve nasıl deneyeceğiniz için **[Beta Özellikleri Dokümantasyonu](https://docs.claude-mem-file.ai/beta-features)** bölümüne bakın.

---

## Sistem Gereksinimleri

- **Node.js**: 18.0.0 veya üzeri
- **Claude Code**: Plugin desteği olan en son sürüm
- **Bun**: JavaScript çalışma zamanı ve işlem yöneticisi (eksikse otomatik kurulur)

---

### Windows Kurulum Notları

Aşağıdakine benzer bir hata görürseniz:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Node.js ve npm'nin kurulu olduğundan ve PATH'a eklendiğinden emin olun. En son Node.js yükleyicisini https://nodejs.org adresinden indirin ve kurulumdan sonra terminalinizi yeniden başlatın.

---

## Yapılandırma

Ayarlar `~/.claude-mem-file/settings.json` dosyasında yönetilir (ilk çalıştırmada varsayılanlarla otomatik oluşturulur). AI modelini, worker portunu, veri dizinini, log seviyesini ve bağlam enjeksiyon ayarlarını yapılandırın.

Tüm mevcut ayarlar ve örnekler için **[Yapılandırma Kılavuzu](https://docs.claude-mem-file.ai/configuration)** bölümüne bakın.

### Mod ve Dil Yapılandırması

Claude-Mem-File, `CLAUDE_MEM_MODE` ayarı aracılığıyla birden fazla iş akışı modu ve dili destekler.

Bu seçenek her ikisini de kontrol eder:

- İş akışı davranışı (örn. code, chill, investigation)
- Oluşturulan gözlemlerde kullanılan dil

#### Nasıl Yapılandırılır

`~/.claude-mem-file/settings.json` adresindeki ayarlar dosyasını düzenleyin:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Modlar `plugin/modes/` içinde tanımlanır. Yerel olarak tüm mevcut modları görmek için:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Mevcut Modlar

| Mod        | Açıklama                |
| ---------- | ----------------------- |
| `code`     | Varsayılan İngilizce modu |
| `code--zh` | Basitleştirilmiş Çince modu |
| `code--ja` | Japonca modu            |

Dile özel modlar `code--[lang]` deseni izler, `[lang]` ise ISO 639-1 dil kodu (örn. `zh` Çince için, `ja` Japonca için, `es` İspanyolca için).

> Not: `code--zh` (Basitleştirilmiş Çince) zaten yerleşiktir — ek kurulum veya eklenti güncellenmesi gerekli değildir.

#### Modu Değiştirdikten Sonra

## Yeni mod yapılandırmasını uygulamak için Claude Code'u yeniden başlatın.

## Geliştirme

Derleme talimatları, test etme ve katkı iş akışı için **[Geliştirme Kılavuzu](https://docs.claude-mem-file.ai/development)** bölümüne bakın.

---

## Sorun Giderme

Sorunlarla karşılaşırsanız, sorunu Claude'a açıklayın ve troubleshoot becerisi otomatik olarak teşhis edip düzeltmeleri sağlayacaktır.

Yaygın sorunlar ve çözümler için **[Sorun Giderme Kılavuzu](https://docs.claude-mem-file.ai/troubleshooting)** bölümüne bakın.

---

## Hata Raporları

Otomatik oluşturucu ile kapsamlı hata raporları oluşturun:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen:

1. Depoyu fork edin
2. Bir özellik dalı oluşturun
3. Testlerle değişikliklerinizi yapın
4. Dokümantasyonu güncelleyin
5. Pull Request gönderin

Katkı iş akışı için [Geliştirme Kılavuzu](https://docs.claude-mem-file.ai/development) bölümüne bakın.

---

## Lisans

Bu proje **GNU Affero General Public License v3.0** (AGPL-3.0) altında lisanslanmıştır.

Telif Hakkı (C) 2025 Alex Newman (@thedotmack). Tüm hakları saklıdır.

Tam detaylar için [LICENSE](LICENSE) dosyasına bakın.

**Bu Ne Anlama Gelir:**

- Bu yazılımı özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz
- Değiştirip bir ağ sunucusunda dağıtırsanız, kaynak kodunuzu kullanılabilir hale getirmelisiniz
- Türev çalışmalar da AGPL-3.0 altında lisanslanmalıdır
- Bu yazılım için HİÇBİR GARANTİ yoktur

**Ragtime Hakkında Not**: `ragtime/` dizini ayrı olarak **PolyForm Noncommercial License 1.0.0** altında lisanslanmıştır. Ayrıntılar için [ragtime/LICENSE](ragtime/LICENSE) dosyasına bakın.

---

## Destek

- **Dokümantasyon**: [docs/](docs/)
- **Sorunlar**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Depo**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Resmi X Hesabı**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Resmi Discord**: [Discord'a Katılın](https://discord.com/invite/J4wttp9vDu)
- **Yazar**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Claude Agent SDK ile Yapılmıştır** | **Claude Code tarafından Desteklenmektedir** | **TypeScript ile Geliştirilmiştir**

---

### $CMEM Hakkında Ne?

$CMEM, Claude-Mem-File'in önceden rızası olmaksızın bir 3. taraf tarafından oluşturulan ancak Claude-Mem-File'in yaratıcısı (Alex Newman, @thedotmack) tarafından resmi olarak kabul edilen bir Solana token'ı. Token, büyüme için bir topluluk katalizörü ve gerçek zamanlı ajan verilerini en çok ihtiyaç duyan geliştiriciler ve bilgi çalışanlarına getirmek için bir araç olarak hareket eder. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
