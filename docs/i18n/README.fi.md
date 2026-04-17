🌐 Tämä on automaattinen käännös. Yhteisön korjaukset ovat tervetulleita!

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
> **Tämä on [claude-mem](https://github.com/thedotmack/claude-mem)-projektin haara** tekijältä [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Tämä haara korvaa SQLite/binäärivarastointimoduulin **tiedostojärjestelmäpohjaisella lähestymistavalla**: kaikki muisti tallennetaan tavallisina Markdown-tiedostoina `<project-root>/docs/vault/` -hakemistoon, täysin versionoitavissa Git-repositoriolla ja jaettavissa tiimin jokaisen jäsenen kanssa. Ei paikallisia tietokantoja, ei binääriblotteja – vain tiedostoja, joita voit lukea, muokata, sitoa ja yhdistää.

<h4 align="center">claude-mem-file — Pysyvä muistinpakkaamisjärjestelmä, joka on rakennettu <a href="https://claude.com/claude-code" target="_blank">Claude Code</a> -ympäristölle.</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/reduardo7/claude-mem-file">
        <picture>
          <img
            src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/cm-preview.gif"
            alt="Claude-Mem-File Esikatselu"
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
            alt="Tähtien historian kaavio"
            src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left"
            width="500"
          />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#pikaopas">Pikaopas</a> •
  <a href="#miten-se-toimii">Miten se toimii</a> •
  <a href="#mcp-hakutyökalut">Hakutyökalut</a> •
  <a href="#dokumentaatio">Dokumentaatio</a> •
  <a href="#asetukset">Asetukset</a> •
  <a href="#vianmääritys">Vianmääritys</a> •
  <a href="#lisenssi">Lisenssi</a>
</p>

<p align="center">
  Claude-Mem-File säilyttää kontekstin saumattomasti istuntojen välillä tallentamalla työkalujen käyttöhavaintoja, luomalla semanttisia yhteenvetoja ja varastoimalla kaikki versionoiduiksi Markdown-tiedostoiksi per-projektin Obsidian-yhteensopivassa vaultissa osoitteessa <code>&lt;project-root&gt;/docs/vault/</code> — ilman SQLite-tietokantaa, ilman binääriblokkeja, täysin yhdistettävät Git-repositoriolla.
</p>

---

## Pikaopas

Asenna yhdellä komennolla:

```bash
npx claude-mem-file install
```

Tai asenna Gemini CLI:lle (automaattinen tunnistus `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

Tai asenna OpenCode:lle:

```bash
npx claude-mem-file install --ide opencode
```

Tai asenna Claude Code -sovelluskaupasta:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Käynnistä Claude Code tai Gemini CLI uudelleen. Aiempien istuntojen konteksti ilmestyy automaattisesti uusiin istuntoihin.

> **Huomautus:** Claude-Mem-File on julkaistu myös npm:ssä, mutta `npm install -g claude-mem-file` asentaa vain **SDK/kirjaston** — se ei rekisteröi plugin-koukku- tai konfiguroi worker-palvelua. Asenna aina käyttämällä `npx claude-mem-file install` tai `/plugin`-komentoja edellä.

### 🦞 OpenClaw-yhdyskäytävä

Asenna claude-mem-file pysyväksi muistilaajennukseksi [OpenClaw](https://openclaw.ai)-yhdyskäytäville yhdellä komennolla:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

Asennusohjelma käsittelee riippuvuudet, plugin-määrityksen, tekoälytoimittajien konfiguraation, worker-käynnistyksen ja vapaaehtoiset reaaliaikaiset havaintosyötteet Telegramiin, Discordiin, Slackiin ja muihin. Katso [OpenClaw-integraatioopas](https://docs.claude-mem-file.ai/openclaw-integration) lisätiedoista.

**Keskeiset ominaisuudet:**

- 🧠 **Pysyvä muisti** - Konteksti säilyy istuntojen välillä
- 📁 **Markdown Vault (Obsidian-yhteensopiva)** - Havainnot ja istunnot tallennetaan `.md`-tiedostoiksi `<project-root>/docs/vault/` -hakemistoon, versionoitavissa ja yhdistettävissä Git-repositoriolla — ei SQLite:tä, ei binääritilaa kehityskoneiden kanssa
- 📊 **Asteittainen paljastaminen** - Kerrostettu muistin haku token-kustannusten näkyvyydellä
- 🔍 **Taitopohjainen haku** - Kysy projektihistoriaasi mem-search-taidolla (ohjattu muistissa olevalla `minisearch`-haulla vaultissa)
- 🖥️ **Web-katselukäyttöliittymä** - Reaaliaikainen muistivirta osoitteessa http://localhost:37777
- 💻 **Claude Desktop -taito** - Hae muistista Claude Desktop -keskusteluissa
- 🔒 **Yksityisyyden hallinta** - Käytä `<private>`-tageja arkaluonteisen sisällön poissulkemiseen tallennuksesta
- ⚙️ **Kontekstin määrittely** - Tarkka hallinta siitä, mikä konteksti injektoidaan
- 🤖 **Automaattinen toiminta** - Ei manuaalista puuttumista vaadita
- 🔗 **Viittaukset** - Viittaa aiempiin havaintoihin ID:llä (käytettävissä osoitteessa http://localhost:37777/api/observation/{id} tai näytä kaikki web-katselussa osoitteessa http://localhost:37777)
- 🧪 **Beta-kanava** - Kokeile kokeellisia ominaisuuksia kuten Endless Mode versionvaihdolla

## SQLite-tietokannasta siirtyminen (perintö)

Aikaisemmat versiot tallensi muistin osoitteeseen `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). Uusi vault-asettelu korvaa kaiken tavallisilla Markdown-tiedostoilla `<project-root>/docs/vault/` -hakemistossa. Aiemmat muistosi eivät ole kadonneet — suorita siirtoskripti kerran:

```bash
# mistä tahansa projektista, joka käytti aiemmin claude-mem-file:a:
npm run migrate-to-vault              # kirjoittaa docs/vault/ perintö-DB:stä
npm run migrate-to-vault:dry          # esikatsele kirjoittamatta
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # eksplisiittiset polut
```

Skripti avaa SQLite-tietokannan vain luettavaksi ja on idempotentti (duplikaatit tunnistetaan SHA-256-sisällön tiivisteellä, joten uudelleensuoritus on turvallista). Sitoudu tuloksena olevaan `docs/vault/` -kansioon repositorioosi jakaaksesi muistin tiimisi kanssa.

---

## Dokumentaatio

📚 **[Näytä täydellinen dokumentaatio](https://docs.claude-mem-file.ai/)** - Selaa virallisella verkkosivustolla

### Aloitus

- **[Asennusopas](https://docs.claude-mem-file.ai/installation)** - Pikaopas ja edistynyt asennus
- **[Gemini CLI -määritys](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Erityinen opas Google Gemini CLI -integraatioon
- **[Käyttöopas](https://docs.claude-mem-file.ai/usage/getting-started)** - Miten Claude-Mem-File toimii automaattisesti
- **[Hakutyökalut](https://docs.claude-mem-file.ai/usage/search-tools)** - Kysy projektihistoriaasi luonnollisella kielellä
- **[Beta-ominaisuudet](https://docs.claude-mem-file.ai/beta-features)** - Kokeile kokeellisia ominaisuuksia kuten Endless Mode

### Parhaat käytännöt

- **[Kontekstisuunnittelu](https://docs.claude-mem-file.ai/context-engineering)** - Tekoäly-agentin konteksti-optimointiperiaatteet
- **[Asteittainen paljastaminen](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofia Claude-Mem-File-kontekstin valmistelustrategian takana

### Arkkitehtuuri

- **[Yleiskatsaus](https://docs.claude-mem-file.ai/architecture/overview)** - Järjestelmän komponentit ja datavirta
- **[Arkkitehtuurin kehitys](https://docs.claude-mem-file.ai/architecture-evolution)** - Matka versiosta v3 versioon v5
- **[Koukku-arkkitehtuuri](https://docs.claude-mem-file.ai/hooks-architecture)** - Miten Claude-Mem-File käyttää elinkaarikkoukkuja
- **[Koukku-viittaus](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 koukku-skriptiä selitettynä
- **[Worker-palvelu](https://docs.claude-mem-file.ai/architecture/worker-service)** - HTTP API ja Bun-hallinta
- **[Tietokanta](docs/)** - Obsidian-tyylinen Markdown-vault jaettuun projektin tietoon

### Määritys ja kehitys

- **[Määritys](https://docs.claude-mem-file.ai/configuration)** - Ympäristömuuttujat ja asetukset
- **[Kehitys](https://docs.claude-mem-file.ai/development)** - Rakentaminen, testaus, osallistuminen
- **[Vianmääritys](https://docs.claude-mem-file.ai/troubleshooting)** - Yleiset ongelmat ja ratkaisut

---

## Miten se toimii

**Keskeiset komponentit:**

1. **5 elinkaarikkoukkua** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 koukku-skriptiä)
2. **Älykäs asennus** - Välimuistettu riippuvuuksien tarkistaja (esikoukku-skripti, ei elinkaarikkoukkua)
3. **Worker-palvelu** - HTTP API portissa 37777 web-katselukäyttöliittymällä ja 10 hakupäätepisteellä, Bun-hallinnoimana
4. **Tietokanta** (`docs/`) - Obsidian-tyylinen Markdown-vault, joka on sitoutunut repositorioon; jaettu totuuden lähde kaikille arkkitehtuurisille päätöksille, kontekstille ja tiedolle istuntojen ja yhteistyötekijöiden yli
5. **mem-search-taito** - Luonnollisen kielen kyselyt asteittaisella paljastamisella

Katso [Arkkitehtuurin yleiskatsaus](https://docs.claude-mem-file.ai/architecture/overview) lisätiedoista.

---

## MCP-hakutyökalut

Claude-Mem-File tarjoaa älykkään muistinhaun neljän **MCP-työkalun** avulla seuraten token-tehokasta **3-kerroksista työnkulkumallia**:

**3-kerroksinen työnkulku:**

1. **`search`** - Hanki kompakti indeksi ID:llä (~50-100 tokenia/tulos)
2. **`timeline`** - Hanki kronologinen konteksti mielenkiintoisien tulosten ympärillä
3. **`get_observations`** - Hae koko tiedot VAIN suodatetuille ID:ille (~500-1 000 tokenia/tulos)

**Miten se toimii:**

- Claude käyttää MCP-työkaluja muistissasi hakuun
- Aloita `search`:llä saadaksesi tulosindeksin
- Käytä `timeline`:a nähdäksesi, mitä tapahtui tiettyjen havaintojen ympärillä
- Käytä `get_observations`:a hakeaksesi koko tiedot relevanteille ID:ille
- **~10x token-säästöt** suodattamalla ennen tietojen hakemista

**Saatavilla olevat MCP-työkalut:**

1. **`search`** - Hae muistiindeksi koko tekstin kyselyillä, suodatuksilla tyypin/päivämäärän/projektin mukaan
2. **`timeline`** - Hanki kronologinen konteksti tietyn havainnon tai kyselyn ympärillä
3. **`get_observations`** - Hae koko havainnon tiedot ID:llä (aina erä useita ID:itä)

**Esimerkki käytöstä:**

```typescript
// Vaihe 1: Hae indeksi
search((query = 'autentikointivirhe'), (type = 'bugfix'), (limit = 10));

// Vaihe 2: Tarkista indeksi, tunnista relevanttien ID:t (esim. #123, #456)

// Vaihe 3: Hae koko tiedot
get_observations((ids = [123, 456]));
```

Katso [Hakutyökalujen opas](https://docs.claude-mem-file.ai/usage/search-tools) yksityiskohtaisista esimerkeistä.

---

## Beta-ominaisuudet

Claude-Mem-File tarjoaa **beta-kanavan** kokeellisilla ominaisuuksilla kuten **Endless Mode** (biomimeettinen muistiarkkitehtuuri pidennetyille istunnoille). Vaihda vakaan ja beta-version välillä web-katselukäyttöliittymästä osoitteessa http://localhost:37777 → Settings.

Katso **[Beta-ominaisuuksien dokumentaatio](https://docs.claude-mem-file.ai/beta-features)** lisätiedoista Endless Modesta ja sen kokeilemisesta.

---

## Järjestelmävaatimukset

- **Node.js**: 18.0.0 tai uudempi
- **Claude Code**: Uusin versio plugin-tuella
- **Bun**: JavaScript-ajoympäristö ja prosessinhallinta (asennetaan automaattisesti jos puuttuu)

---

### Windows-määrityshuomautukset

Jos näet virheen kuten:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Varmista, että Node.js ja npm on asennettu ja lisätty PATH-polkuihisi. Lataa uusin Node.js-asennusohjelma osoitteesta https://nodejs.org ja käynnistä terminaali uudelleen asennuksen jälkeen.

---

## Asetukset

Asetuksia hallitaan `~/.claude-mem-file/settings.json` -tiedostossa (luodaan automaattisesti oletusarvoilla ensimmäisellä suorituskerralla). Määritä tekoälymalli, worker-portti, datahakemisto, lokitaso ja kontekstin injektointiasetukset.

Katso **[Asetusopas](https://docs.claude-mem-file.ai/configuration)** kaikista saatavilla olevista asetuksista ja esimerkeistä.

### Tilan ja kielen määritys

Claude-Mem-File tukee useita työnkulkutiloja ja kieliä `CLAUDE_MEM_MODE`-asetuksen avulla.

Tämä vaihtoehto ohjaa sekä:

- Työnkulun käyttäytymistä (esim. code, chill, investigation)
- Luoduissa havainnoissa käytettyä kieltä

#### Kuinka määrittää

Muokkaa asetustiedostoasi osoitteessa `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Tilat määritetään `plugin/modes/` -hakemistossa. Nähdäksesi kaikki saatavilla olevat tilat paikallisesti:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Saatavilla olevat tilat

| Tila       | Kuvaus              |
| ---------- | ------------------- |
| `code`     | Oletusarvoinen englannin tila    |
| `code--zh` | Yksinkertaistetun kiinan tila |
| `code--ja` | Japanin tila           |

Kielikohtaiset tilat noudattavat mallia `code--[lang]` missä `[lang]` on ISO 639-1 -kielikoodi (esim. `zh` kiinaa varten, `ja` japania varten, `es` espanjaa varten).

> Huomautus: `code--zh` (yksinkertaistettu kiina) on jo sisäänrakennettu — mitään lisäasentamista tai plugin-päivitystä ei vaadita.

#### Tilan muuttamisen jälkeen

## Käynnistä Claude Code uudelleen sovellaaksesi uuden tilakonfiguraation.

## Kehitys

Katso **[Kehitysopas](https://docs.claude-mem-file.ai/development)** rakennusohjeista, testauksesta ja osallistumisen työnkulusta.

---

## Vianmääritys

Jos kohtaat ongelmia, kuvaile ongelma Claudelle ja troubleshoot-taito diagnosoi automaattisesti ja tarjoaa korjauksia.

Katso **[Vianmääritysopas](https://docs.claude-mem-file.ai/troubleshooting)** yleisistä ongelmista ja ratkaisuista.

---

## Bugiraportit

Luo kattavia bugiraportteja automaattisella generaattorilla:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Osallistuminen

Osallistuminen on tervetullutta! Ole hyvä:

1. Haarukoi repositorio
2. Luo ominaisuushaara
3. Tee muutoksesi testeineen
4. Päivitä dokumentaatio
5. Lähetä Pull Request

Katso [Kehitysopas](https://docs.claude-mem-file.ai/development) osallistumisen työnkulusta.

---

## Lisenssi

Tämä projekti on lisensoitu **GNU Affero General Public License v3.0** (AGPL-3.0) -lisenssillä.

Copyright (C) 2025 Alex Newman (@thedotmack). Kaikki oikeudet pidätetään.

Katso [LICENSE](LICENSE)-tiedosto täydellisistä yksityiskohdista.

**Mitä tämä tarkoittaa:**

- Voit käyttää, muokata ja jakaa tätä ohjelmistoa vapaasti
- Jos muokkaat ja otat käyttöön verkkopalvelimella, sinun on asetettava lähdekoodisi saataville
- Johdannaiset teokset on myös lisensoitava AGPL-3.0-lisenssillä
- Tälle ohjelmistolle EI OLE TAKUUTA

**Huomautus Ragtimesta**: `ragtime/` -hakemisto on erikseen lisensoitu **PolyForm Noncommercial License 1.0.0** -lisenssillä. Katso [ragtime/LICENSE](ragtime/LICENSE) yksityiskohdista.

---

## Tuki

- **Dokumentaatio**: [docs/](docs/)
- **Ongelmat**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repositorio**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Virallinen X-tili**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Virallinen Discord**: [Liity Discordiin](https://discord.com/invite/J4wttp9vDu)
- **Tekijä**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Rakennettu Claude Agent SDK:lla** | **Claude Coden voimalla** | **Tehty TypeScriptillä**

---

### Entä $CMEM?

$CMEM on Solana-token, jonka loi kolmas osapuoli Claude-Mem-File-ohjelmiston luvan saaneesta, mutta Claude-Mem-File-luoja (Alex Newman, @thedotmack) omaksui virallisesti. Token toimii yhteisön kasvun katalyysinä ja välineenä tuodakseen reaaliaikaisia agenttitietoja kehittäjille ja tietotyöläisille, jotka sitä eniten tarvitsevat. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
