# Newsletter – Empfehlung & Prozess

## Welches Tool? → Empfehlung: **Brevo** (früher Sendinblue)

Warum Brevo für dich am besten passt:

- **EU-Anbieter, DSGVO-freundlich** (Server in der EU) – wichtig für deine Zielgruppe im öffentlichen Dienst.
- **Kostenloser Tarif**: bis 300 E-Mails/Tag, unbegrenzt Kontakte – reicht zum Start locker.
- **Double-Opt-in** ist eingebaut (rechtlich Pflicht in DE).
- Einfaches **Anmeldeformular**, das du direkt in die Website einbinden kannst.

Alternativen: **Kit** (sehr gut für Creator/Funnels, US-Anbieter), **CleverReach** (DE), **Mailchimp** (US, teurer). Für dich ist Brevo der beste Kompromiss aus DSGVO, Preis und Einfachheit.

---

## Einrichtung in 6 Schritten

1. **Konto anlegen** auf brevo.com (kostenlos), Absender-E-Mail `info@sk-finanzberatung.de` verifizieren (DNS-Eintrag setzen – Brevo führt dich durch).
2. **Kontaktliste** erstellen, z. B. „Newsletter Öffentlicher Dienst".
3. **Double-Opt-in aktivieren** (Brevo → Kontakte → Formulare → DOI). Bestätigungs-Mail + Danke-Seite einstellen.
4. **Anmeldeformular** in Brevo bauen → Brevo gibt dir eine **Formular-Action-URL** (oder HTML/Embed-Code).
5. Diese **Action-URL** in die `.env` der Website eintragen:
   ```
   PUBLIC_NEWSLETTER_ACTION=https://….brevo-formular-url….
   ```
   Danach `npm run build`. Das Newsletter-Formular auf der Seite sendet dann direkt an Brevo. (Ohne URL nutzt das Formular einen E-Mail-Fallback.)
6. **Felder abgleichen**: Das Seitenformular sendet `EMAIL`, `VORNAME` und `OPT_IN` – diese Feldnamen in Brevo genauso anlegen.

---

## Inhalts-Prozess (damit es auch läuft)

**Rhythmus:** alle 2–4 Wochen. Lieber selten und gut als oft und belanglos.

**Aufbau einer Ausgabe (kurz halten, mobil lesbar):**
1. Ein Haupt-Thema (1 Tipp, 1 Erklärung) – z. B. „Dienstunfähigkeit: der häufigste Fehler von Referendaren".
2. Ein kurzer „Schon gewusst?"-Block (1–2 Sätze).
3. Ein klarer Call-to-Action: kostenloses Erstgespräch buchen (dein Calendly-Link).

**Content-Recycling (Strategie der Großen):** Finanzfluss, Finanztip & Talerbox machen genau das – sie verwandeln Social-Media-Inhalte in Newsletter und umgekehrt. Mach es genauso:
- Jeden guten **Instagram-/TikTok-Post** → als Mini-Artikel in den Newsletter.
- Jede **Kundenfrage** aus Beratungen → eine Newsletter-Ausgabe (anonymisiert).
- Verlinke immer zurück auf einen **Ratgeber-Artikel** deiner Website (gut für SEO + Terminbuchung).

**Wachstum:** Der Lead-Magnet (Beamten-Checkliste-PDF) ist der Türöffner – wer ihn herunterlädt, kann gleich den Newsletter abonnieren. So baust du die Liste organisch auf.

---

## Rechtliches (kurz)
- **Double-Opt-in ist Pflicht** – Brevo macht das automatisch.
- **Abmeldelink** in jeder Mail (Brevo fügt ihn automatisch ein).
- Im **Impressum/Datenschutz** ist der Newsletter bereits erwähnt (Datenschutz-Abschnitt „Newsletter").
