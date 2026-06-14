# Deployment: GitHub → Cloudflare Pages

Diese Anleitung bringt die Website live: erst zu **GitHub**, dann automatisch über **Cloudflare Pages**.
Alle Befehle führst du auf **deinem Mac** im Ordner `sk-finanzberatung/` aus (Terminal).

---

## 0. Vorbereitung (einmalig, empfohlen)

**Bilder selbst hosten** (statt über das Higgsfield-CDN zu laden):

```bash
cd "/Users/skuper/Desktop/Claude - Website 2.0/sk-finanzberatung"
npm run download-images
```

Danach in der Datei `.env` setzen:

```
PUBLIC_USE_LOCAL_IMAGES=true
```

Kurz testen, dass alles baut:

```bash
npm run build   # erzeugt dist/
npm test        # sollte grün sein (16 Tests)
```

---

## 1. Auf GitHub hochladen

1. Auf **github.com** einloggen → oben rechts **+ → New repository**.
   - Name: `sk-finanzberatung`
   - **Privat** oder Public (egal)
   - **Keine** README/.gitignore/Lizenz hinzufügen (wir haben schon welche)
   - **Create repository**

2. Im Terminal (im Ordner `sk-finanzberatung/`):

```bash
git add -A
git commit -m "Website 2.0 SK-Finanzberatung"
git branch -M main
git remote add origin https://github.com/DEIN-NUTZERNAME/sk-finanzberatung.git
git push -u origin main
```

> `git init` und deine Git-Identität sind bereits gesetzt. Falls Git nach Login fragt:
> bei GitHub einen **Personal Access Token** (Settings → Developer settings → Tokens) als Passwort verwenden.

---

## 2. Über Cloudflare mit GitHub verbinden (Cloudflare Pages)

1. Auf **dash.cloudflare.com** → **Workers & Pages → Create → Pages → Connect to Git**.
2. GitHub autorisieren und das Repo **sk-finanzberatung** auswählen.
3. **Build-Einstellungen:**
   - **Framework preset:** `None`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** leer lassen (Repo-Wurzel)
4. **Umgebungsvariablen** (unter „Environment variables") setzen:

   | Variable | Wert |
   |---|---|
   | `PUBLIC_SITE_URL` | `https://www.sk-finanzberatung.de` |
   | `PUBLIC_CALENDLY_URL` | dein Calendly-Link |
   | `PUBLIC_USE_LOCAL_IMAGES` | `true` (falls Schritt 0 gemacht) |
   | `PUBLIC_GA4_ID` | deine GA4-Mess-ID (optional) |
   | `PUBLIC_NEWSLETTER_ACTION` | Brevo-Formular-URL (optional) |
   | `PUBLIC_CONTACT_FORM_ENDPOINT` | leer lassen (nutzt FormSubmit) |

   Die Node-Version steckt bereits in `.node-version` (22).

5. **Save and Deploy.** Cloudflare baut die Seite und vergibt eine `*.pages.dev`-Adresse.

> Ab jetzt gilt: **Jeder `git push` deployt automatisch neu.**

---

## 3. Eigene Domain verbinden (sk-finanzberatung.de)

1. In Cloudflare Pages → dein Projekt → **Custom domains → Set up a domain**.
2. `www.sk-finanzberatung.de` (und `sk-finanzberatung.de`) eintragen.
3. Liegt die Domain bereits bei Cloudflare, werden die DNS-Einträge automatisch gesetzt.
   Andernfalls die angezeigten **CNAME-Einträge** bei deinem Domain-Anbieter hinterlegen.
4. SSL/HTTPS aktiviert Cloudflare automatisch.

---

## Danach noch erledigen
- **Calendly-Link** in `.env` / Cloudflare-Variable eintragen.
- **FormSubmit** einmalig aktivieren: erste Testnachricht über das Kontaktformular senden und die Bestätigungs-E-Mail von FormSubmit bestätigen.
- **GKV-Vergleichscode** (wenn vorhanden) einbinden lassen.
- Optional: **Brevo-Newsletter** einrichten (siehe `NEWSLETTER.md`).
