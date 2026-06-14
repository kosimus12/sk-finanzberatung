/** Leistungen: Übersichtsseite + Detailseiten-Template. */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import {
  serviceCard,
  sectionHeader,
  breadcrumbs,
  faqSection,
  button,
  waschbaer,
  ctaBanner,
} from "../lib/components.mjs";
import {
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  organizationSchema,
} from "../lib/schema.mjs";
import { services, getService } from "../data/services.mjs";

const leistungenFaqs = [
  {
    q: "Welche Leistungen bietet SK-Finanzberatung an?",
    a: "Wir beraten unabhängig zu Berufsunfähigkeit, privater Krankenversicherung, Altersvorsorge mit ETFs, Sachversicherungen sowie Zusatzkrankenversicherungen - immer ohne Provision und neutral verglichen.",
  },
  {
    q: "Sind die Beratungen wirklich kostenlos?",
    a: "Die Erstberatung und das Kennenlernen sind kostenfrei und unverbindlich. Ein etwaiges Honorar für eine tiefergehende Beratung vereinbaren wir vorher transparent.",
  },
  {
    q: "Kann ich mehrere Themen in einem Termin besprechen?",
    a: "Ja. Gerade die Kombination aus Absicherung und Geldanlage ergibt oft Sinn. Wir schauen ganzheitlich auf deine Situation statt auf Einzelprodukte.",
  },
  {
    q: "In welcher Reihenfolge sollte ich meine Finanzen angehen?",
    a: "Zuerst die existenziellen Risiken absichern (Arbeitskraft, Haftpflicht), dann einen Notgroschen aufbauen und anschließend mit dem Vermögensaufbau starten. Wir priorisieren gemeinsam, was für dich gerade am wichtigsten ist.",
  },
  {
    q: "Übernehmt ihr auch bestehende Verträge?",
    a: "Ja. Wir prüfen deine vorhandenen Verträge kostenlos, optimieren sie bei Bedarf und betreuen sie anschließend digital - alles an einem Ort.",
  },
];

/** Übersichtsseite /leistungen/ */
export function leistungenIndex() {
  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Leistungen", href: "/leistungen/" },
  ];
  const body = `
    ${breadcrumbs(crumbs)}
    <section class="section page-intro">
      <div class="container">
        ${sectionHeader("Unsere Leistungen", "Von der Absicherung deiner Arbeitskraft bis zur ETF-Rente - alles unabhängig und verständlich.", { eyebrow: "Beratung & Vergleich", as: "h1" })}
        <div class="grid grid--cards">
          ${services.map(serviceCard).join("\n          ")}
        </div>
      </div>
    </section>
    ${faqSection(leistungenFaqs)}
    ${ctaBanner()}
  `;
  return {
    title: "Leistungen: Versicherung & Geldanlage unabhängig | SK",
    description:
      "Unsere Leistungen im Ueberblick: Berufsunfähigkeit, PKV, ETF-Rente, Sach- und Zusatzversicherungen. Unabhängig verglichen, ohne Provision. Jetzt informieren.",
    path: "/leistungen/",
    schema: [breadcrumbSchema(crumbs), faqSchema(leistungenFaqs)],
    body,
  };
}

/** Detailseiten-Template für eine Leistung. */
export function serviceDetail(slug) {
  const s = getService(slug);
  if (!s) throw new Error(`Service nicht gefunden: ${slug}`);

  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Leistungen", href: "/leistungen/" },
    { label: s.shortTitle, href: `/${s.slug}/` },
  ];

  const steps = s.steps
    .map(
      (step, i) => `
        <li class="process__step">
          <span class="process__num">${i + 1}</span>
          <div>
            <h3>${esc(step.title)}</h3>
            <p>${esc(step.text)}</p>
          </div>
        </li>`,
    )
    .join("");

  const benefits = s.benefits
    .map((b) => `<li>${icon("check", { size: 20, class: "check" })}<span>${esc(b)}</span></li>`)
    .join("");

  const related = (s.related || [])
    .map((r) => getService(r))
    .filter(Boolean)
    .map(
      (rs) =>
        `<a class="related__link" href="/${esc(rs.slug)}/">${esc(rs.shortTitle)} ${icon("arrowRight", { size: 16 })}</a>`,
    )
    .join("");

  const body = `
    ${breadcrumbs(crumbs)}
    <section class="service-hero">
      <div class="container service-hero__inner">
        <div class="service-hero__content">
          <h1>${esc(s.title)}</h1>
          <div class="service-hero__intro">${s.intro
            .split(/\n\s*\n/)
            .map((p) => `<p>${esc(p.trim())}</p>`)
            .join("")}</div>
          <ul class="benefits">${benefits}</ul>
          ${button("Kostenloser Beratungstermin", "/kontakt/#termin", { variant: "cta", classes: "btn--lg", icon: "calendar" })}
        </div>
        <div class="service-hero__media">
          ${waschbaer(s.icon, s.iconAlt, { width: 320, height: 320, eager: true })}
        </div>
      </div>
    </section>

    <section class="section section--muted process" aria-labelledby="process-title">
      <div class="container">
        <h2 id="process-title" class="section-head section-head--center">So einfach geht's</h2>
        <ol class="process__list">${steps}</ol>
      </div>
    </section>

    ${
      s.infoSections && s.infoSections.length
        ? `<section class="section article">
            <div class="container container--narrow">
              ${s.infoSections
                .map(
                  (sec) => `<section class="article__section">
                    <h2>${esc(sec.heading)}</h2>
                    ${sec.body.split(/\n\s*\n/).map((p) => `<p>${esc(p.trim())}</p>`).join("\n                ")}
                  </section>`,
                )
                .join("\n              ")}
            </div>
          </section>`
        : ""
    }

    ${faqSection(s.faqs, { title: "Häufige Fragen" })}

    ${
      related
        ? `<section class="section related"><div class="container">
            <h2 class="section-head section-head--center">Das könnte dich auch interessieren</h2>
            <div class="related__links">${related}</div>
          </div></section>`
        : ""
    }

    ${ctaBanner()}
  `;

  return {
    title: truncateTitle(s.shortTitle),
    description: s.metaDescription,
    path: `/${s.slug}/`,
    type: "article",
    schema: [
      breadcrumbSchema(crumbs),
      serviceSchema(s),
      faqSchema(s.faqs),
      organizationSchema(),
    ],
    body,
  };
}

// Title für Detailseiten unter 60 Zeichen halten
function truncateTitle(shortTitle) {
  const suffix = " | SK-Finanzberatung";
  const max = 60;
  const base = shortTitle;
  if ((base + suffix).length <= max) return base + suffix;
  return base.slice(0, max - 3) + "...";
}
