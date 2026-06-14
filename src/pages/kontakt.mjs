/** Kontakt-Seite: Formular, direkte Kontaktdaten, Terminbuchung. */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { breadcrumbs, bookingWidget, button, faqSection } from "../lib/components.mjs";
import { breadcrumbSchema, organizationSchema, faqSchema } from "../lib/schema.mjs";
import { site, SITE_URL } from "../data/site.mjs";

// Kontaktformular-Ziel: Standardmaessig FormSubmit (kostenlos, ohne Account),
// das die Nachricht direkt an die hinterlegte E-Mail sendet.
// Hinweis: Beim ersten Absenden bestaetigt FormSubmit die Adresse einmalig per E-Mail.
const CONTACT_ENDPOINT =
  process.env.PUBLIC_CONTACT_FORM_ENDPOINT || `https://formsubmit.co/${site.contact.email}`;

const faqs = [
  {
    q: "Wie schnell bekomme ich eine Antwort?",
    a: "Per WhatsApp meist innerhalb weniger Stunden - oft auch am Wochenende. Anrufe und E-Mails beantworten wir werktags von 9 bis 18 Uhr.",
  },
  {
    q: "Muss ich für ein Erstgespräch etwas vorbereiten?",
    a: "Nein. Komm einfach mit deinen Fragen. Wenn du bestehende Verträge prüfen lassen möchtest, halte sie gern bereit - das ist aber kein Muss.",
  },
  {
    q: "Kostet mich das Erstgespräch etwas?",
    a: "Nein, das Erstgespräch ist kostenfrei und unverbindlich. Du entscheidest danach in Ruhe, ob du weitermachen möchtest.",
  },
  {
    q: "Findet das Gespräch online oder vor Ort statt?",
    a: "In der Regel per Videocall - das ist flexibel, ortsunabhängig und deutschlandweit möglich. Auf Wunsch geht natürlich auch ein Telefonat.",
  },
  {
    q: "Wie schnell bekomme ich nach dem Formular eine Rückmeldung?",
    a: "Deine Nachricht erreicht uns direkt per E-Mail. Werktags melden wir uns in der Regel innerhalb von 24 Stunden bei dir.",
  },
];

const subjects = [
  "Allgemeine Anfrage",
  "Berufsunfähigkeitsversicherung",
  "Private Krankenversicherung",
  "Altersvorsorge / ETF-Rente",
  "Bestehende Verträge prüfen",
  "Sonstiges",
];

export function kontakt() {
  const c = site.contact;
  const wa = c.whatsapp.replace(/[^0-9]/g, "");
  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Kontakt", href: "/kontakt/" },
  ];

  // Formular sendet per POST an FormSubmit -> Nachricht landet in deinem Postfach.
  const formAttrs = `action="${esc(CONTACT_ENDPOINT)}" method="post"`;
  // Steuerfelder für FormSubmit (kein Captcha-Redirect, Betreff, Dank-Seite, Tabellen-Layout).
  const hiddenFields = `
            <input type="hidden" name="_subject" value="Neue Kontaktanfrage über sk-finanzberatung.de" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="${esc(SITE_URL)}/kontakt/?gesendet=1" />
            <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" />`;

  const body = `
    ${breadcrumbs(crumbs)}
    <section class="section contact">
      <div class="container">
        <header class="section-head section-head--center">
          <p class="eyebrow">Kontakt</p>
          <h1>Lass uns sprechen</h1>
          <p class="section-head__sub">Kostenlos, unverbindlich und auf Augenhöhe. Wähle den Weg, der dir am liebsten ist.</p>
        </header>

        <div class="contact__grid">
          <form class="contact__form card" ${formAttrs}>
            ${hiddenFields}
            <div class="field">
              <label for="name">Name</label>
              <input id="name" name="name" type="text" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="email">E-Mail</label>
              <input id="email" name="email" type="email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="subject">Thema</label>
              <select id="subject" name="subject">
                ${subjects.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join("\n                ")}
              </select>
            </div>
            <div class="field">
              <label for="message">Nachricht</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <div class="field field--check">
              <input id="privacy" name="privacy" type="checkbox" required />
              <label for="privacy">Ich habe die <a href="/datenschutz/">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu.</label>
            </div>
            <button class="btn btn--cta btn--lg" type="submit">Nachricht senden</button>
            <p class="contact__hint">Deine Nachricht geht direkt an ${esc(c.email)}. Wir melden uns werktags innerhalb von 24 Stunden.</p>
          </form>

          <aside class="contact__info">
            <h2>Direkter Draht</h2>
            <ul class="contact__list">
              <li>${icon("phone", { size: 22 })}<div><a href="tel:${esc(c.phoneIntl)}">${esc(c.phone)}</a><small>${esc(c.hours)}</small></div></li>
              <li>${icon("mail", { size: 22 })}<div><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></div></li>
              <li>${icon("whatsapp", { size: 22 })}<div><a href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a><small>${esc(c.whatsappNote)}</small></div></li>
              <li>${icon("location", { size: 22 })}<div><span>${esc(c.address.street)}</span><small>${esc(c.address.zip)} ${esc(c.address.city)}</small></div></li>
            </ul>
            ${button("Book A Free Call", "#termin", { variant: "cta", icon: "calendar", classes: "contact__book" })}
          </aside>
        </div>
      </div>
    </section>

    ${bookingWidget()}

    ${faqSection(faqs)}
  `;
  return {
    title: "Kontakt & Terminbuchung | SK-Finanzberatung",
    description:
      "Kontaktiere SK-Finanzberatung: Telefon, E-Mail, WhatsApp oder direkt online einen kostenlosen Beratungstermin buchen. Mo-Fr 9-18 Uhr, deutschlandweit per Video.",
    path: "/kontakt/",
    schema: [breadcrumbSchema(crumbs), organizationSchema(), faqSchema(faqs)],
    body,
  };
}
