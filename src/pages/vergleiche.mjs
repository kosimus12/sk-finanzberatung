/**
 * Vergleiche: Übersichtsseite + eine eigene Info-/Vergleichsseite pro Sparte.
 * Jede Detailseite informiert über die Produktsparte UND bindet den passenden
 * Vergleichsrechner (form.partner-versicherung.de, Account 149722) ein.
 */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { sectionHeader, breadcrumbs, ctaBanner, faqSection, button } from "../lib/components.mjs";
import { breadcrumbSchema, faqSchema } from "../lib/schema.mjs";

const WIDGET_BASE = "https://form.partner-versicherung.de/widgets/149722";

// Sparten. key = tcpp-Slug des Widgets = URL-Slug der Detailseite.
export const vergleiche = [
  {
    key: "kfz",
    title: "Kfz-Versicherung",
    short: "Auto-Versicherung schnell vergleichen und wechseln.",
    iconKey: "wallet",
    intro:
      "Die Kfz-Haftpflicht ist in Deutschland gesetzlich vorgeschrieben - ohne sie darf kein Auto fahren. Teil- und Vollkasko sind freiwillig, können sich aber je nach Fahrzeugwert lohnen.",
    bullets: [
      "Haftpflicht ist Pflicht, Kasko optional",
      "Teilkasko bei älteren, Vollkasko bei neuen/finanzierten Autos",
      "Jährlich vergleichen - der Wechsel spart oft mehrere Hundert Euro",
      "Schadenfreiheitsklasse (SF) nimmst du zum neuen Versicherer mit",
    ],
    faqs: [
      { q: "Bis wann kann ich die Kfz-Versicherung wechseln?", a: "Meist zum Jahresende - Stichtag für die ordentliche Kündigung ist in der Regel der 30. November. Nach einer Beitragserhöhung oder einem Schaden hast du ein Sonderkündigungsrecht." },
      { q: "Teilkasko oder Vollkasko - was brauche ich?", a: "Teilkasko deckt z. B. Diebstahl, Glasbruch und Wildschäden und lohnt sich bei älteren Autos. Vollkasko umfasst zusätzlich selbst verschuldete Schäden und ist bei neuen oder finanzierten Fahrzeugen sinnvoll." },
    ],
  },
  {
    key: "phv",
    title: "Privathaftpflicht",
    short: "Die wichtigste Versicherung - günstig und stark im Schutz.",
    iconKey: "shield",
    intro:
      "Wer einem anderen einen Schaden zufügt, haftet dafür unbegrenzt - mit dem gesamten Vermögen. Die Privathaftpflicht übernimmt berechtigte Forderungen und wehrt unberechtigte ab.",
    bullets: [
      "Deckt Personen-, Sach- und Vermögensschäden",
      "Deckungssumme von mindestens 10-50 Mio. Euro empfohlen",
      "Partner und Kinder lassen sich günstig mitversichern",
      "Schon ab oft unter 60 Euro im Jahr",
    ],
    faqs: [
      { q: "Ist die Privathaftpflicht Pflicht?", a: "Nein, aber sie ist die wichtigste freiwillige Versicherung überhaupt. Ein einziger großer Schaden - etwa ein Personenschaden - kann sonst den finanziellen Ruin bedeuten." },
      { q: "Sind meine Kinder mitversichert?", a: "In den meisten Familientarifen sind der Partner und die Kinder kostenlos mitversichert - auch volljährige Kinder in der ersten Ausbildung. Achte auf eine Mitversicherung deliktunfähiger Kinder." },
    ],
  },
  {
    key: "hr",
    title: "Hausratversicherung",
    short: "Dein Hab und Gut zum fairen Preis absichern.",
    iconKey: "health",
    intro:
      "Die Hausratversicherung ersetzt deinen Besitz, wenn er durch Feuer, Leitungswasser, Sturm oder Einbruchdiebstahl beschädigt oder gestohlen wird - zum Neuwert.",
    bullets: [
      "Schutz bei Feuer, Wasser, Sturm und Einbruch",
      "Versicherungssumme = Wiederbeschaffungswert deines Hausrats",
      "Unterversicherung vermeiden (Faustregel: ca. 650 Euro je m²)",
      "Fahrraddiebstahl und Elementarschäden optional einschließbar",
    ],
    faqs: [
      { q: "Brauche ich eine Hausratversicherung?", a: "Sie lohnt sich, sobald der Wiederbeschaffungswert deiner Einrichtung hoch ist. Bei sehr wenig Besitz kann sie verzichtbar sein - wir schauen uns deinen Fall individuell an." },
      { q: "Ist mein Fahrrad mitversichert?", a: "Fahrräder lassen sich gegen Einbruchdiebstahl mitversichern; Diebstahl von unterwegs ist oft ein optionaler Zusatzbaustein. Bei teuren Rädern lohnt sich der Blick auf die Entschädigungsgrenze." },
    ],
  },
  {
    key: "wg",
    title: "Wohngebäude",
    short: "Für Eigentümer: Schutz für dein Haus.",
    iconKey: "shield",
    intro:
      "Die Wohngebäudeversicherung schützt das Gebäude selbst - also Mauern, Dach und fest Verbautes - vor Schäden durch Feuer, Leitungswasser und Sturm. Für Eigentümer ist sie nahezu unverzichtbar.",
    bullets: [
      "Schutz für das Gebäude (nicht den Hausrat)",
      "Feuer, Leitungswasser, Sturm und Hagel abgedeckt",
      "Elementarschäden (Hochwasser, Starkregen) optional - zunehmend wichtig",
      "Bei finanzierten Immobilien meist von der Bank verlangt",
    ],
    faqs: [
      { q: "Was ist der Unterschied zur Hausratversicherung?", a: "Die Wohngebäudeversicherung deckt das Gebäude, die Hausratversicherung dein bewegliches Eigentum darin. Als Eigentümer brauchst du in der Regel beides." },
      { q: "Brauche ich zusätzlich einen Elementarschutz?", a: "Angesichts zunehmender Starkregen- und Hochwasserereignisse ist der Elementarschutz immer wichtiger. Er ist meist ein Zusatzbaustein und hängt stark von der Lage deines Hauses ab." },
    ],
  },
  {
    key: "rs",
    title: "Rechtsschutz",
    short: "Im Streitfall auf der sicheren Seite.",
    iconKey: "shield",
    intro:
      "Eine Rechtsschutzversicherung übernimmt Anwalts-, Gerichts- und Gutachterkosten, wenn du dein Recht durchsetzen musst - vom Arbeitsstreit bis zum Verkehrsunfall.",
    bullets: [
      "Bausteine: Privat, Beruf, Verkehr und Wohnen frei kombinierbar",
      "Deckt Anwalt, Gericht und Sachverständige",
      "Meist gilt eine Wartezeit von drei Monaten",
      "Für den öffentlichen Dienst oft mit günstigen Konditionen",
    ],
    faqs: [
      { q: "Lohnt sich Rechtsschutz?", a: "Vor allem der Berufs- und Verkehrsrechtsschutz ist sinnvoll, da Streitigkeiten hier schnell teuer werden. Wegen der Wartezeit gilt: vor dem Konflikt abschließen, nicht währenddessen." },
      { q: "Gibt es eine Wartezeit?", a: "Ja, meist drei Monate - bei Verkehrsrechtsschutz oft ohne Wartezeit. Ein bereits laufender oder absehbarer Streit ist nicht versicherbar, deshalb früh abschließen." },
    ],
  },
  {
    key: "unf",
    title: "Unfallversicherung",
    short: "Finanzielle Sicherheit nach einem Unfall.",
    iconKey: "health",
    intro:
      "Die private Unfallversicherung zahlt weltweit und rund um die Uhr - auch in der Freizeit. Sie leistet vor allem bei bleibender Invalidität nach einem Unfall.",
    bullets: [
      "Schutz 24/7, weltweit, auch in der Freizeit",
      "Kapital bei bleibender Invalidität",
      "Sinnvoll für Kinder und Senioren (dort greift keine BU/DU)",
      "Hohe Progression sorgt für mehr Leistung bei schwerer Invalidität",
    ],
    faqs: [
      { q: "Ersetzt die Unfallversicherung die Berufs-/Dienstunfähigkeit?", a: "Nein. Die BU/DU zahlt bei Berufs-/Dienstunfähigkeit aus jeder Ursache (auch Krankheit), die Unfallversicherung nur nach Unfällen. Sie ist eine sinnvolle Ergänzung, kein Ersatz." },
      { q: "Was bedeutet Progression?", a: "Die Progression erhöht die Leistung überproportional bei schwerer Invalidität. So steht bei besonders gravierenden Unfallfolgen ein deutlich höheres Kapital zur Verfügung." },
    ],
  },
  {
    key: "giro",
    title: "Girokonto",
    short: "Kostenlose Konten ohne versteckte Gebühren.",
    iconKey: "wallet",
    intro:
      "Ein gutes Girokonto kostet nichts und bietet trotzdem alles, was du brauchst. Besonders Direktbanken punkten mit kostenloser Kontoführung und Karten.",
    bullets: [
      "Kostenlose Kontoführung - oft ganz ohne Mindesteingang",
      "Gratis Debit-/Kreditkarte je nach Anbieter",
      "Kostenlos Geld abheben im In- und Ausland",
      "Wechselservice nimmt dir den Umzug von Daueraufträgen ab",
    ],
    faqs: [
      { q: "Lohnt sich ein Kontowechsel?", a: "Ja - viele zahlen unnötig Kontoführungsgebühren. Der Wechsel ist dank gesetzlichem Wechselservice unkompliziert, und manche Banken zahlen sogar eine Prämie." },
      { q: "Sind kostenlose Konten wirklich kostenlos?", a: "Bei guten Anbietern ja - achte aber auf Bedingungen wie einen Mindestgeldeingang sowie auf Gebühren fürs Bargeldabheben. Genau das zeigt dir der Vergleich transparent." },
    ],
  },
  {
    key: "cc",
    title: "Kreditkarte",
    short: "Faire Kreditkarten für Alltag und Reise.",
    iconKey: "card",
    intro:
      "Mit einer guten Kreditkarte zahlst du weltweit, hebst kostenlos Geld ab und nutzt oft nützliche Zusatzleistungen - idealerweise ohne Jahresgebühr.",
    bullets: [
      "Echte Kreditkarte vs. Debitkarte - auf Akzeptanz achten",
      "Kostenlos im Alltag und auf Reisen einsetzbar",
      "Oft mit Reise- oder Versicherungsleistungen",
      "Günstige Konditionen bei Fremdwährung",
    ],
    faqs: [
      { q: "Echte Kreditkarte oder Debitkarte?", a: "Eine echte Kreditkarte wird (z. B. bei Mietwagen und im Ausland) breiter akzeptiert und bietet oft mehr Leistungen. Für den Alltag reicht häufig auch eine kostenlose Debitkarte." },
      { q: "Worauf sollte ich bei Reisen achten?", a: "Wichtig sind kostenlose Zahlungen und Abhebungen in Fremdwährung sowie ein günstiger Wechselkurs. Manche Karten bringen zusätzlich Reiseversicherungen mit." },
    ],
  },
  {
    key: "mot",
    title: "Motorrad",
    short: "Bike-Versicherung im Vergleich.",
    iconKey: "wallet",
    intro:
      "Wie beim Auto ist die Haftpflicht fürs Motorrad Pflicht. Mit einem Saisonkennzeichen sparst du, wenn du nur in den warmen Monaten fährst.",
    bullets: [
      "Haftpflicht ist Pflicht, Teil-/Vollkasko optional",
      "Saisonkennzeichen senkt den Beitrag deutlich",
      "Schadenfreiheitsklasse zählt auch hier",
      "Sonderausstattung mitversichern nicht vergessen",
    ],
    faqs: [
      { q: "Was bringt ein Saisonkennzeichen?", a: "Du zahlst Versicherung und Steuer nur für die angemeldeten Monate. Außerhalb der Saison ist das Motorrad in der Ruhephase beitragsfrei mitversichert, wenn es sicher abgestellt ist." },
    ],
  },
  {
    key: "tkv",
    title: "Tierkrankenversicherung",
    short: "Schutz für die Gesundheit deines Tieres.",
    iconKey: "health",
    intro:
      "Tierarztkosten können schnell vierstellig werden - besonders bei Operationen. Eine Tierkrankenversicherung übernimmt Behandlungs- und OP-Kosten für Hund und Katze.",
    bullets: [
      "OP-Schutz oder umfassender Vollschutz wählbar",
      "Wichtig seit der höheren Gebührenordnung (GOT) für Tierärzte",
      "Früh abschließen - vor ersten Vorerkrankungen",
      "Auf Erstattungssatz und Jahreshöchstgrenzen achten",
    ],
    faqs: [
      { q: "OP-Schutz oder Vollschutz?", a: "Der OP-Schutz deckt teure Operationen ab und ist günstig. Der Vollschutz übernimmt zusätzlich normale Behandlungen. Was sinnvoll ist, hängt von Tier und Budget ab." },
    ],
  },
  {
    key: "tie",
    title: "Tierhalterhaftpflicht",
    short: "Pflicht für Hundehalter - günstig vergleichen.",
    iconKey: "shield",
    intro:
      "Für Schäden, die dein Tier verursacht, haftest du als Halter - in unbegrenzter Höhe. Für Hunde ist die Tierhalterhaftpflicht in vielen Bundesländern sogar Pflicht.",
    bullets: [
      "Deckt Schäden, die dein Tier anderen zufügt",
      "Für Hunde je nach Bundesland gesetzlich vorgeschrieben",
      "Auch für Pferde sinnvoll bzw. nötig",
      "Günstig - oft deutlich unter 100 Euro im Jahr",
    ],
    faqs: [
      { q: "Ist die Hundehaftpflicht Pflicht?", a: "Das regeln die Bundesländer unterschiedlich. In mehreren Ländern ist sie für alle Hunde Pflicht, in anderen nur für bestimmte Rassen. Sinnvoll ist sie in jedem Fall." },
    ],
  },
  {
    key: "gkv",
    title: "Gesetzliche Krankenversicherung",
    short: "Krankenkassen nach Zusatzbeitrag und Leistung vergleichen.",
    iconKey: "health",
    noWidget: true,
    intro:
      "Die gesetzlichen Krankenkassen bieten ähnliche Grundleistungen, unterscheiden sich aber deutlich beim Zusatzbeitrag und bei den Extraleistungen. Ein Wechsel ist einfach und spart oft bares Geld.",
    bullets: [
      "Gleiche gesetzliche Grundleistungen bei allen Kassen",
      "Unterschiede beim Zusatzbeitrag und bei Bonus-/Extraleistungen",
      "Wechsel nach 12 Monaten Mitgliedschaft jederzeit möglich",
      "Relevant für Angestellte - Beamte sind meist über Beihilfe + PKV versichert",
    ],
    faqs: [
      { q: "Wann kann ich die Krankenkasse wechseln?", a: "Nach mindestens zwölf Monaten Mitgliedschaft kannst du mit zwei Monaten Frist wechseln. Erhöht deine Kasse den Zusatzbeitrag, hast du ein Sonderkündigungsrecht." },
      { q: "Worin unterscheiden sich die Kassen?", a: "Vor allem im Zusatzbeitrag und bei freiwilligen Extraleistungen wie Bonusprogrammen, Zuschüssen für Zahnreinigung, Osteopathie oder Vorsorge. Die gesetzlichen Grundleistungen sind überall gleich." },
    ],
  },
];

export function getVergleich(key) {
  return vergleiche.find((v) => v.key === key);
}

const indexFaqs = [
  {
    q: "Sind die Vergleiche unabhängig und kostenlos?",
    a: "Ja. Du kannst die Tarife direkt online und kostenlos vergleichen. Auf Wunsch helfen wir dir persönlich und unabhängig bei der Auswahl.",
  },
  {
    q: "Was passiert mit meinen Eingaben in den Rechnern?",
    a: "Die Vergleichsrechner werden von unserem Technikpartner bereitgestellt. Deine Eingaben werden zur Tarifberechnung verarbeitet. Details findest du in unserer Datenschutzerklärung.",
  },
  {
    q: "Wie oft sollte ich meine Versicherungen vergleichen?",
    a: "Einmal im Jahr lohnt sich ein kurzer Blick - besonders bei Kfz und Sachversicherungen. Auch nach Lebensereignissen wie Umzug, Heirat oder Hauskauf solltest du deine Tarife prüfen.",
  },
  {
    q: "Hilft mir jemand bei der Auswahl?",
    a: "Ja. Du kannst alles selbst vergleichen - oder uns einfach fragen. Wir beraten dich unabhängig und kostenlos und finden gemeinsam den Tarif, der wirklich zu dir passt.",
  },
];

/** Übersicht /vergleiche/ - Karten verlinken auf die Detailseiten. */
export function vergleicheIndex() {
  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Vergleiche", href: "/vergleiche/" },
  ];
  const cards = vergleiche
    .map(
      (v) => `
      <article class="card card--compare">
        <div class="card__icon card__icon--svg">${icon(v.iconKey, { size: 30 })}</div>
        <h3 class="card__title">${esc(v.title)}</h3>
        <p class="card__text">${esc(v.short)}</p>
        <a class="card__link" href="/vergleiche/${esc(v.key)}/">Informieren & vergleichen ${icon("arrowRight", { size: 16 })}</a>
      </article>`,
    )
    .join("\n          ");

  const body = `
    ${breadcrumbs(crumbs)}
    <section class="section page-intro">
      <div class="container">
        ${sectionHeader("Unsere Vergleiche", "Wähle eine Sparte: Auf jeder Seite informierst du dich kurz und vergleichst dann direkt online die besten Tarife.", { eyebrow: "Informieren & vergleichen", as: "h1" })}
        <div class="grid grid--cards">
          ${cards}
        </div>
      </div>
    </section>
    ${faqSection(indexFaqs)}
    ${ctaBanner({ title: "Unsicher bei der Auswahl?" })}
  `;
  return {
    title: "Vergleiche: Kfz, Haftpflicht, Konto & mehr | SK",
    description:
      "Versicherungen & Konten unabhängig vergleichen: Kfz, Haftpflicht, Hausrat, Rechtsschutz, Unfall, Girokonto, Kreditkarte u. v. m. - mit Infos zu jeder Sparte.",
    path: "/vergleiche/",
    schema: [breadcrumbSchema(crumbs), faqSchema(indexFaqs)],
    body,
  };
}

/** Detailseite /vergleiche/[key]/ - Info + eingebetteter Rechner. */
export function vergleicheDetail(key) {
  const v = getVergleich(key);
  if (!v) throw new Error(`Vergleich nicht gefunden: ${key}`);
  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Vergleiche", href: "/vergleiche/" },
    { label: v.title, href: `/vergleiche/${v.key}/` },
  ];
  const bullets = v.bullets.map((b) => `<li>${icon("check", { size: 20, class: "check" })}<span>${esc(b)}</span></li>`).join("\n          ");
  const related = vergleiche
    .filter((o) => o.key !== v.key)
    .slice(0, 4)
    .map((o) => `<a class="related__link" href="/vergleiche/${esc(o.key)}/">${esc(o.title)} ${icon("arrowRight", { size: 16 })}</a>`)
    .join("");

  const body = `
    ${breadcrumbs(crumbs)}
    <section class="section">
      <div class="container container--narrow">
        <header class="section-head">
          <p class="eyebrow">Vergleich</p>
          <h1>${esc(v.title)} vergleichen</h1>
        </header>
        <p class="lead">${esc(v.intro)}</p>
        <ul class="benefits">${bullets}</ul>
      </div>
    </section>

    <section class="section section--muted" aria-labelledby="vgl-rechner">
      <div class="container container--narrow">
        <h2 id="vgl-rechner">Jetzt ${esc(v.title)} vergleichen</h2>
        <p class="section-head__sub">Tarife in wenigen Minuten vergleichen - kostenlos und unverbindlich.</p>
        <div class="vgl-card__widget">
          ${
            v.noWidget
              ? `<div class="vgl-soon"><p>Der Vergleichsrechner wird in Kürze hier eingebunden.</p>${button("Jetzt persönlich beraten lassen", "/kontakt/#termin", { variant: "cta", icon: "calendar" })}</div>`
              : `<div style="width: 100%" id="tcpp-iframe-${esc(v.key)}"></div>
          <script src="${WIDGET_BASE}/tcpp-iframe-${esc(v.key)}/${esc(v.key)}-iframe.js"></script>`
          }
        </div>
      </div>
    </section>

    ${faqSection(v.faqs)}

    <section class="section related"><div class="container">
      <h2 class="section-head section-head--center">Weitere Vergleiche</h2>
      <div class="related__links">${related}</div>
      <p class="related__back" style="text-align:center;margin-top:1rem">${button("Alle Vergleiche ansehen", "/vergleiche/", { variant: "outline" })}</p>
    </div></section>

    ${ctaBanner({ title: "Lieber persönlich beraten lassen?" })}
  `;
  return {
    title: truncate(`${v.title} vergleichen | SK`, 60),
    description: `${v.title} unabhängig vergleichen: ${v.short} Jetzt kostenlos online Tarife vergleichen oder persönlich beraten lassen.`.slice(0, 158),
    path: `/vergleiche/${v.key}/`,
    schema: [breadcrumbSchema(crumbs), faqSchema(v.faqs)],
    body,
  };
}

function truncate(s, max) {
  return s.length <= max ? s : s.slice(0, max - 1) + "…";
}
