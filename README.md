# SK-Finanzberatung – Website

Unternehmenswebsite für **SK-Finanzberatung** (Simon Kuper): unabhängige Honorar-Finanzberatung, deutschlandweit per Video. Mobile-first, SEO- und LLMO-optimiert, DSGVO-konform.

Die Seite ist als **abhängigkeitsfreier statischer Generator** gebaut (nur Node-Bordmittel, **keine npm-Pakete**). Das bedeutet: kein `npm install` nötig, extrem schnelle Builds und beste Core Web Vitals (0 KB Framework-JavaScript).

---

## Schnellstart

```bash
# 1. (einmalig) .env anlegen
cp .env.example .env      # danach Werte eintragen (Calendly-Link, API-Keys ...)

# 2. Website bauen  ->  Ausgabe in dist/
npm run build

# 3. Lokale Vorschau auf http://localhost:4321
npm run dev               # baut + startet Vorschauserver
#   oder nur Server:  npm run serve

# 4. Tests ausführen
npm test
```

> Es werden **keine** externen Pakete installiert. `npm run build` ruft nur Node auf.

---

## Projektstruktur

```
sk-finanzberatung/
├── build.mjs              # Statischer Generator (Einstiegspunkt)
├── src/
│   ├── data/              # Inhalte & Konfiguration (hier pflegst du Texte!)
│   │   ├── site.mjs       # Kontaktdaten, Navigation, Trust-Signale, Legal
│   │   ├── services.mjs   # Leistungen + Detailseiten-Inhalte
│   │   ├── ratgeber.mjs   # Ratgeber-Artikel
│   │   ├── vergleiche.mjs # Vergleichsrechner-Karten
│   │   └── testimonials.mjs
│   ├── lib/               # Bausteine: Layout, SEO, Schema.org, Komponenten, Icons
│   ├── pages/             # Eine Datei pro Seite/Seitentyp
│   ├── styles/styles.css  # Komplettes Design-System (Navy/Akzent/CTA)
│   └── client/main.js     # Progressive Enhancement (Nav, Cookie-Consent, Calendly)
├── public/                # Statische Assets (werden 1:1 nach dist kopiert)
│   ├── images/            # Optimierte WebP-Bilder (Logo, Avatare, Foto)
│   └── downloads/         # Checkliste (PDF-Lead-Magnet)
├── scripts/               # Hilfsskripte (Bilder, Server, Higgsfield)
├── tests/                 # Tests (node:test)
└── dist/                  # Build-Ausgabe (deploybar)
```

**Texte ändern?** In den meisten Fällen reicht eine Datei in `src/data/`. Danach `npm run build`.

---

## Konfiguration (`.env`)

Alle Schlüssel/Links stehen ausschließlich in `.env` – **niemals im Code** und **nicht in Git** (`.gitignore`).

| Variable | Zweck |
|---|---|
| `PUBLIC_SITE_URL` | Domain (für Canonical/Sitemap/Schema) |
| `PUBLIC_CALENDLY_URL` | Calendly-Link für die Terminbuchung |
| `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` | YouTube-Videos (optional) |
| `INSTAGRAM_ACCESS_TOKEN` | Instagram-Feed (optional) |
| `HF_API_KEY`, `HF_SECRET` | Higgsfield (Icon-Generierung, optional) |
| `GITHUB_TOKEN` | GitHub-Deployment (optional) |
| `PUBLIC_CONTACT_FORM_ENDPOINT` | Endpoint fürs Kontaktformular (z. B. Formspree) |

Variablen mit Präfix `PUBLIC_` werden zur Buildzeit eingelesen. Damit Node die `.env` lädt, beim Bauen optional:

```bash
node --env-file=.env build.mjs
```

(Alternativ setzt deine Hosting-/CI-Umgebung die Variablen.)

---

## Terminbuchung (Calendly)

1. Calendly-Account anlegen und mit **Google Calendar** verbinden.
2. Öffentlichen Event-Link (z. B. `.../erstberatung`) in `PUBLIC_CALENDLY_URL` eintragen.
3. Die Buchung lädt **erst nach Cookie-Zustimmung** (DSGVO). Ohne Link erscheint automatisch ein **Fallback** mit Telefon-/E-Mail-Kontakt.

---

## Bilder & Maskottchen

Die optimierten WebP-Bilder liegen bereits fertig in `public/images/` (committet) – du musst nichts tun.

Neu-Erzeugung aus den Originalen (benötigt ImageMagick):

```bash
npm run images
```

Zusätzliche Maskottchen-Icons per Higgsfield (lokal, mit Internet + Keys in `.env`):

```bash
node --env-file=.env scripts/generate-icons.mjs
npm run images   # erzeugt daraus WebP
```

---

## SEO & LLMO

- Pro Seite eindeutiger Title (≤ 60) + Description (≤ 160), Open-Graph/Twitter-Tags, Canonical.
- **Schema.org (JSON-LD):** Organization (FinancialService), Person, Service, FAQPage, BreadcrumbList, Article, WebSite.
- FAQ-Section auf jeder Inhaltsseite, H1 = klare Aussage, saubere Permalinks ohne Umlaute.
- `sitemap.xml` und `robots.txt` werden automatisch erzeugt.

---

## Deployment

`dist/` ist eine fertige statische Seite. Sie kann u. a. auf **Netlify, Vercel, GitHub Pages, Cloudflare Pages** oder klassischem Webspace liegen.

Beispiel (statischer Upload): Inhalt von `dist/` auf den Webserver kopieren. Vor dem Build `PUBLIC_SITE_URL` auf die echte Domain setzen.

---

## Tests

`npm test` prüft u. a.:

- Build erzeugt alle erwarteten Seiten und korrektes HTML-Grundgerüst
- Titles eindeutig & ≤ 60, Descriptions ≤ 160, genau eine H1 pro Seite
- JSON-LD ist valides JSON; Pflicht-Schemata vorhanden
- Permalinks ohne Umlaute, keine toten internen Links
- Alle referenzierten Avatar-Bilder existieren
- Pflicht-Elemente (Cookie-Banner, WhatsApp, Impressum/Datenschutz/Vorabinformation, Kontaktformular, Booking-Fallback)

---

## Noch offen (vor dem Live-Gang)

- Echte **Kundenbewertungen** in `src/data/testimonials.mjs` eintragen (DSGVO beachten).
- **GWB-/Vermittler-Registernummer** im Impressum ergänzen (`src/data/site.mjs` → `legal.registerNumber`).
- **Calendly-Link** und ggf. Social-/Formular-Keys in `.env` setzen.
- Optional: VDH-Mitgliedsnummer ergänzen.
