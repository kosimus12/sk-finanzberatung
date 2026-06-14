/** Über-mich-Seite. */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { sectionHeader, breadcrumbs, ctaBanner, faqSection, button } from "../lib/components.mjs";
import { breadcrumbSchema, personSchema, faqSchema } from "../lib/schema.mjs";
import { site } from "../data/site.mjs";
import { photo } from "../data/images.mjs";

const stats = [
  { value: `${site.yearsExperience} Jahre`, label: "Erfahrung" },
  { value: `${site.consultations}+`, label: "Onlineberatungen" },
  { value: `${site.trust.googleRating.toFixed(1)} / 5`, label: "Google-Bewertung" },
  { value: "100 %", label: "digital & unabhängig" },
];

const faqs = [
  {
    q: "Wer steht hinter SK-Finanzberatung?",
    a: "Simon Kuper - Finanzanlagen- und Versicherungsfachmann mit Master-Abschluss und freiberuflicher Dozent. Der Fokus liegt auf unabhängiger, digitaler Beratung für den öffentlichen Dienst.",
  },
  {
    q: "Warum die Spezialisierung auf Beamte und Referendare?",
    a: "Weil gerade hier viel Halbwissen kursiert: Dienstunfähigkeit, Beihilfe und Versorgungslücke sind komplex. Mit klarer, ehrlicher Beratung sorgen wir für echte Sicherheit.",
  },
];

export function ueberUns() {
  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Über mich", href: "/ueber-uns/" },
  ];
  const body = `
    ${breadcrumbs(crumbs)}
    <section class="section about-hero">
      <div class="container about-hero__inner">
        <div class="about-hero__media">
          <img src="${esc(photo("flipchart"))}" width="460" height="575"
               alt="Simon Kuper erklärt den Zinseszins-Effekt am Flipchart"
               loading="eager" decoding="async" class="about-hero__photo" />
        </div>
        <div class="about-hero__content">
          <p class="eyebrow">Über mich</p>
          <h1>Finanzberatung auf Augenhöhe</h1>
          <p class="about-hero__lead">Ich möchte, dass wir besser sind als jede Versicherung, jede Bank und jeder Finanzvertrieb.</p>
          <p>Ich bin Simon Kuper - ${esc(site.owner.qualifications)}. Zu oft habe ich erlebt,
             wie Menschen Produkte verkauft bekommen, die sie nicht verstehen und nicht brauchen.</p>
          <p>Mein Ansatz ist ein anderer: unabhängig, verständlich und digital. Ich erkläre,
             vergleiche neutral und begleite meine Mandanten bei allen finanziellen Fragen -
             ein Berufsleben lang und darüber hinaus.</p>
        </div>
      </div>
    </section>

    <section class="section section--muted">
      <div class="container">
        <div class="stats">
          ${stats
            .map(
              (s) => `<div class="stats__item"><span class="stats__value">${esc(s.value)}</span><span class="stats__label">${esc(s.label)}</span></div>`,
            )
            .join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section mission">
      <div class="container container--narrow">
        ${sectionHeader("Warum ich das mache", null)}
        <p class="mission__text">Eine echte Beratung bedeutet für mich, dass meine Kunden glücklich mit ihrem
           individuellen Finanzkonzept sind. Keine Angst vor Fachbegriffen, keine versteckten Kosten,
           keine faulen Kompromisse - sondern echte finanzielle Sicherheit. Schritt für Schritt, in deinem Tempo.</p>
        <div class="mission__cta">
          ${button("Lerne mich kennen", "/kontakt/#termin", { variant: "cta", icon: "calendar" })}
        </div>
      </div>
    </section>

    ${faqSection(faqs)}
    ${ctaBanner()}
  `;
  return {
    title: "Über mich: Simon Kuper | SK-Finanzberatung",
    description:
      "Lerne Simon Kuper kennen: unabhängiger Finanz- und Versicherungsfachmann (M.Sc.) mit Fokus auf Beamte. Digital, ehrlich und auf Augenhöhe.",
    path: "/ueber-uns/",
    schema: [breadcrumbSchema(crumbs), personSchema(), faqSchema(faqs)],
    body,
  };
}
