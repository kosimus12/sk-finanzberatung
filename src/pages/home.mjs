/** Startseite - ausgerichtet auf Beamte, Referendare & öffentlichen Dienst. */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import {
  button,
  serviceCard,
  testimonialCard,
  trustBadges,
  ctaBanner,
  sectionHeader,
  waschbaer,
  socialEmbeds,
  faqSection,
  newsletterSection,
} from "../lib/components.mjs";
import { organizationSchema, personSchema, faqSchema } from "../lib/schema.mjs";
import { site } from "../data/site.mjs";
import { services } from "../data/services.mjs";
import { testimonials } from "../data/testimonials.mjs";
import { photo, video, mascot } from "../data/images.mjs";

// Action-Buttons im Hero (visuelle Säulen)
const heroActions = [
  { label: "Dienstunfähigkeit", href: "/berufsunfaehigkeit-dienstunfaehigkeit/", icon: "shield" },
  { label: "PKV & Beihilfe", href: "/private-krankenversicherung-beihilfe/", icon: "health" },
  { label: "ETF starten", href: "/etf-vermoegensaufbau/", icon: "chart" },
  { label: "Vergleiche nutzen", href: "/vergleiche/", icon: "grid" },
];

const checklistItems = [
  "Dienstunfähigkeit (DU) prüfen",
  "PKV & Beihilfe prüfen",
  "Rent-/Vorsorgeverträge prüfen",
  "Sachversicherungen prüfen",
];

const usps = [
  {
    title: "Unabhängig & ehrlich",
    text: "Wir sind an keinen Anbieter gebunden und vergleichen neutral. Deine Situation entscheidet - nicht eine Provision.",
    icon: "compass",
  },
  {
    title: "Spezialisiert auf den öffentlichen Dienst",
    text: "Dienstunfähigkeit, Beihilfe, Versorgungslücke: Wir kennen die Themen von Beamten, Referendaren und Anwärtern genau.",
    icon: "shield",
  },
  {
    title: "Digital & auf Augenhöhe",
    text: "Beratung per Video, Unterlagen in einer App, klare Sprache ohne Fachchinesisch - deutschlandweit und weltweit.",
    icon: "grid",
  },
];

const processSteps = [
  { title: "Datenaufnahme", text: "Wir nehmen deine individuelle Situation auf - ideal zu Berufsstart, bei Verbeamtung, Hauskauf oder Familienplanung." },
  { title: "Konzepterstellung", text: "Wir erstellen im Hintergrund dein persönliches Finanzkonzept und vergleichen viele Anbieter für beste Konditionen." },
  { title: "Partnerschaft", text: "Wir begleiten dich langfristig: digitale Vertragsverwaltung per App, direkter Kontakt und Updates bei Marktänderungen." },
];

const homeFaqs = [
  {
    q: "Für wen ist SK-Finanzberatung gemacht?",
    a: "Vor allem für junge Menschen im öffentlichen Dienst - Beamtinnen und Beamte, Referendare, Anwärter und Angestellte. Wir kennen die Besonderheiten von Dienstunfähigkeit, Beihilfe und Pension genau.",
  },
  {
    q: "Was kostet die Erstberatung?",
    a: "Die Erstberatung ist kostenfrei und unverbindlich. Du lernst uns kennen, schilderst deine Situation und entscheidest danach in Ruhe, ob du weitermachen möchtest.",
  },
  {
    q: "Findet die Beratung wirklich komplett online statt?",
    a: "Ja. Wir beraten dich deutschlandweit und weltweit per Videocall - flexibel, ortsunabhängig und ohne Anfahrt. Alle Unterlagen tauschst du digital mit uns aus.",
  },
  {
    q: "Warum schon als Referendar oder Anwärter starten?",
    a: "Wer früh startet, hat nicht nur hinten raus den größten Hebel beim Vermögensaufbau, sondern bekommt meist auch die günstigsten Konditionen bei der Absicherung.",
  },
  {
    q: "Wie läuft die Online-Beratung konkret ab?",
    a: "Du buchst einen Termin, wir sprechen per Videocall über deine Situation und Ziele, und du bekommst danach ein verständliches Finanzkonzept. Unterlagen tauschst du bequem digital aus - ganz ohne Papierkram und Anfahrt.",
  },
  {
    q: "Was unterscheidet euch von klassischen Versicherungsvertrieben?",
    a: "Wir sind an keinen Anbieter gebunden und denken nicht in Produkten, sondern in deinem Bedarf. Statt teurer Provisionsprodukte setzen wir auf günstige, transparente Lösungen wie ETFs. Du bekommst eine ehrliche Empfehlung, kein Verkaufsgespräch.",
  },
  {
    q: "Können auch Angestellte oder Selbstständige zu euch kommen?",
    a: "Ja. Unser Schwerpunkt liegt auf dem öffentlichen Dienst, aber wir beraten alle, die ihre Finanzen unabhängig und verständlich regeln möchten - deutschlandweit per Video.",
  },
  {
    q: "Ist die Beratung wirklich kostenlos - wie verdient ihr Geld?",
    a: "Das Erstgespräch ist kostenfrei. Für die Vermittlung von Versicherungen erhalten wir - wie üblich - eine Vergütung vom Anbieter, ohne dass für dich Mehrkosten entstehen. Bei der Geldanlage setzen wir bewusst auf günstige, provisionsarme Produkte. Transparenz ist uns dabei wichtig.",
  },
];

export function home() {
  const body = `
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="eyebrow eyebrow--light">Für Beamte, Referendare & den öffentlichen Dienst</p>
          <h1 class="hero__title">Finanzielle Sicherheit, planbar gemacht</h1>
          <p class="hero__sub">Unabhängige Beratung auf Augenhöhe - ohne Provisionen, ohne Fachjargon.
             Damit du deine Absicherung und deinen Vermögensaufbau endlich verstehst und ruhig schlafen kannst.</p>

          <ul class="hero__targets" aria-label="Für wen">
            <li>Referendar:innen</li>
            <li>Anwärter:innen</li>
            <li>Ende des Studiums</li>
            <li>Öffentlicher Dienst</li>
          </ul>

          <div class="hero__actions">
            ${heroActions
              .map(
                (a) =>
                  `<a class="pillar" href="${esc(a.href)}">${icon(a.icon, { size: 24 })}<span>${esc(a.label)}</span></a>`,
              )
              .join("\n            ")}
          </div>

          <div class="hero__cta-row">
            ${button("Kostenloses Erstgespräch sichern", "/kontakt/#termin", { variant: "cta", classes: "btn--lg", icon: "calendar" })}
            <p class="hero__reassure">✓ 100 % kostenlos &amp; unverbindlich&nbsp;&nbsp;·&nbsp;&nbsp;✓ ca. 15 Minuten&nbsp;&nbsp;·&nbsp;&nbsp;✓ deutschlandweit per Video</p>
          </div>

          ${trustBadges()}
        </div>

        <div class="hero__media">
          <div class="hero__photo-wrap">
            <img class="hero__photo" src="${esc(photo("hero"))}" width="460" height="575"
                 alt="Simon Kuper, unabhängiger Finanzberater für den öffentlichen Dienst"
                 loading="eager" decoding="async" fetchpriority="high" />
          </div>
        </div>
      </div>
    </section>

    <section class="section services" aria-labelledby="services-title">
      <div class="container">
        ${sectionHeader("Unsere Leistungen", "Klar erklärt, fair verglichen - die Absicherung, die wirklich zu deinem Dienst passt.", { eyebrow: "Was wir für dich tun" })}
        <div class="grid grid--cards">
          ${services.map(serviceCard).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section vergleiche-teaser" aria-labelledby="vgl-teaser-title">
      <div class="container">
        ${sectionHeader("Beliebte Vergleiche", "Schnell und unabhängig die besten Tarife und Konditionen finden.", { eyebrow: "Selbst vergleichen" })}
        <div class="grid grid--cards">
          ${[
            { key: "kfz", title: "Kfz-Versicherung", short: "Auto-Tarife vergleichen und wechseln.", iconKey: "wallet" },
            { key: "giro", title: "Girokonto", short: "Kostenlose Konten ohne versteckte Gebühren.", iconKey: "wallet" },
            { key: "cc", title: "Kreditkarte", short: "Faire Karten für Alltag und Reise.", iconKey: "card" },
            { key: "gkv", title: "GKV-Vergleich", short: "Krankenkassen nach Zusatzbeitrag vergleichen.", iconKey: "health" },
          ]
            .map(
              (v) => `<article class="card card--compare">
            <div class="card__icon card__icon--svg">${icon(v.iconKey, { size: 30 })}</div>
            <h3 class="card__title">${esc(v.title)}</h3>
            <p class="card__text">${esc(v.short)}</p>
            <a class="card__link" href="/vergleiche/${v.key}/">Informieren & vergleichen ${icon("arrowRight", { size: 16 })}</a>
          </article>`,
            )
            .join("\n          ")}
        </div>
        <p class="vergleiche-teaser__all" style="text-align:center;margin-top:1.25rem">${button("Alle Vergleiche ansehen", "/vergleiche/", { variant: "outline" })}</p>
      </div>
    </section>

    <section class="section section--muted check" aria-labelledby="check-title">
      <div class="container check__inner">
        <div class="check__media">
          ${waschbaer("check", "Finanzwaschbär prüft Verträge mit einer Checkliste", { width: 300, height: 300 })}
        </div>
        <div class="check__content">
          <h2 id="check-title">Du hast schon Verträge? Lass sie kostenlos prüfen.</h2>
          <p>Wir schauen uns deine bestehenden Verträge an und sagen dir ehrlich,
             was passt und wo du sparen kannst - kostenlos und unverbindlich.</p>
          <ul class="check__list">
            ${checklistItems.map((c) => `<li>${icon("check", { size: 20, class: "check" })}<span>${esc(c)}</span></li>`).join("\n            ")}
          </ul>
          <div class="check__actions">
            ${button("Checkliste herunterladen (PDF)", "/downloads/checkliste-beamte.pdf", { variant: "outline", icon: "download", external: true })}
            ${button("Vertrag prüfen lassen", "/kontakt/#termin", { variant: "cta" })}
          </div>
        </div>
      </div>
    </section>

    <section class="section usp" aria-labelledby="usp-title">
      <div class="container">
        ${sectionHeader("Was uns unterscheidet", "Drei Prinzipien, auf die du dich bei uns verlassen kannst.", { eyebrow: "Unser Versprechen" })}
        <div class="grid grid--usp">
          ${usps
            .map(
              (u, i) => `
            <article class="usp__block usp__block--plain">
              <div class="usp__icon">${icon(u.icon, { size: 28 })}</div>
              <h3>${esc(u.title)}</h3>
              <p>${esc(u.text)}</p>
            </article>`,
            )
            .join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section section--muted process" aria-labelledby="process-title">
      <div class="container">
        ${sectionHeader("So läuft deine Beratung", "In drei einfachen Schritten zu deinem persönlichen Finanzkonzept.", { eyebrow: "Dein Weg" })}
        <ol class="process__list">
          ${processSteps
            .map(
              (s, i) => `
            <li class="process__step">
              <span class="process__num">${i + 1}</span>
              <div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
            </li>`,
            )
            .join("\n          ")}
        </ol>
      </div>
    </section>

    <section class="section testimonials" aria-labelledby="testi-title">
      <div class="container">
        ${sectionHeader("Das sagen Kunden zu unserer Beratung", null, { eyebrow: `${site.trust.googleRating.toFixed(1)} / 5 bei Google` })}
        <div class="grid grid--testimonials">
          ${testimonials.map(testimonialCard).join("\n          ")}
        </div>
      </div>
    </section>

    ${socialEmbeds()}

    ${newsletterSection()}

    ${faqSection(homeFaqs, { title: "Häufige Fragen" })}

    ${ctaBanner()}
  `;

  return {
    title: "Finanzberatung für Beamte & öffentlichen Dienst | SK",
    description:
      "Unabhängige Beratung für Beamte, Referendare & öffentlichen Dienst: Dienstunfähigkeit, Beihilfe-PKV, ETF & Vorsorge - ohne Provision, kostenlos.",
    path: "/",
    bodyClass: "page-home",
    schema: [organizationSchema(), personSchema(), faqSchema(homeFaqs)],
    body,
  };
}
