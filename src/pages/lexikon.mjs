/**
 * Beamten-Finanzlexikon: erklärt die wichtigsten Begriffe einfach.
 * Starker SEO-/LLMO-Hebel (viele Long-Tail-Suchanfragen, klare Definitionen).
 */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { sectionHeader, breadcrumbs, ctaBanner } from "../lib/components.mjs";
import { breadcrumbSchema, faqSchema } from "../lib/schema.mjs";

// term = Begriff, def = Erklärung, link = optional weiterführende Seite
const terms = [
  { term: "Dienstunfähigkeit (DU)", def: "Eine Beamtin oder ein Beamter ist dienstunfähig, wenn sie oder er den Dienst aus gesundheitlichen Gründen dauerhaft nicht mehr ausüben kann und vom Dienstherrn in den Ruhestand versetzt wird. Eine private Absicherung mit echter DU-Klausel zahlt in diesem Fall eine monatliche Rente.", link: "/berufsunfaehigkeit-dienstunfaehigkeit/" },
  { term: "Berufsunfähigkeit (BU)", def: "Berufsunfähig ist, wer den zuletzt ausgeübten Beruf zu mindestens 50 % nicht mehr ausüben kann - egal ob durch Krankheit oder Unfall. Für Angestellte ist die BU die zentrale Absicherung der Arbeitskraft.", link: "/berufsunfaehigkeit-dienstunfaehigkeit/" },
  { term: "DU-Klausel", def: "Eine Dienstunfähigkeitsklausel in der BU-Versicherung sorgt dafür, dass die Versetzung in den Ruhestand durch den Dienstherrn automatisch als Leistungsfall gilt. Ohne echte DU-Klausel droht eine Versorgungslücke." },
  { term: "Beihilfe", def: "Die Beihilfe ist ein Zuschuss des Dienstherrn zu den Krankheitskosten von Beamtinnen und Beamten. Sie übernimmt einen prozentualen Anteil (oft 50-70 %); den Rest deckt eine private Krankenversicherung ab.", link: "/private-krankenversicherung-beihilfe/" },
  { term: "Beihilfekonforme PKV", def: "Eine private Krankenversicherung, die genau den Teil der Kosten absichert, den die Beihilfe nicht übernimmt. So bist du zu 100 % abgesichert, ohne doppelt zu zahlen.", link: "/private-krankenversicherung-beihilfe/" },
  { term: "Anwärter / Beamter auf Probe / auf Lebenszeit", def: "Stationen der Beamtenlaufbahn: Anwärter (in Ausbildung/Referendariat), Beamter auf Probe (meist erste Jahre) und Beamter auf Lebenszeit. In der Probezeit besteht bei Dienstunfähigkeit ohne Dienstunfall meist noch kein Versorgungsanspruch." },
  { term: "Versorgungslücke", def: "Die Differenz zwischen deinem letzten Nettoeinkommen und deiner späteren Pension. Sie entsteht fast immer - besonders bei später Verbeamtung, Teilzeit oder Dienstherrnwechsel.", link: "/altersvorsorge-versorgungsluecke/" },
  { term: "Ruhegehalt / Pension / Höchstsatz", def: "Das Ruhegehalt ist die Pension von Beamten. Den Höchstsatz von rund 71,75 % der ruhegehaltfähigen Bezüge erreichst du erst nach etwa 40 anrechenbaren Dienstjahren." },
  { term: "ETF", def: "Ein ETF (Exchange Traded Fund) ist ein börsengehandelter Fonds, der einen Index nachbildet - etwa tausende Unternehmen weltweit. ETFs sind günstig, breit gestreut und transparent.", link: "/etf-vermoegensaufbau/" },
  { term: "FTSE All World", def: "Ein weltweiter Aktienindex mit rund 4.000 Unternehmen aus Industrie- und Schwellenländern. Mit einem einzigen ETF darauf bist du global breit gestreut investiert." },
  { term: "Thesaurierend vs. ausschüttend", def: "Thesaurierende ETFs legen Erträge automatisch wieder an (ideal fürs langfristige Wachstum). Ausschüttende ETFs zahlen Erträge aus - praktisch, um den Sparerpauschbetrag zu nutzen." },
  { term: "Sparerpauschbetrag", def: "Der jährliche Steuerfreibetrag auf Kapitalerträge (aktuell 1.000 Euro pro Person). Mit einem Freistellungsauftrag bei deiner Bank bleiben Erträge bis zu dieser Grenze steuerfrei." },
  { term: "Nettopolice", def: "Eine Versicherung bzw. ein Vorsorgeprodukt ohne einkalkulierte Abschlussprovision. Dadurch fließt mehr von deinem Geld in den Vertrag statt in Vertriebskosten." },
  { term: "Altersvorsorgedepot", def: "Geplante, staatlich geförderte Form der privaten Altersvorsorge (Riester-Nachfolge): Statt starrer Beitragsgarantie soll direkt in renditestärkere ETFs investiert werden können - mit Zulagen vom Staat. Details werden noch gesetzlich festgelegt.", link: "/altersvorsorge-versorgungsluecke/" },
  { term: "Diensthaftpflicht", def: "Sichert Beamte gegen Rückgriffansprüche des Dienstherrn ab, wenn im Dienst grob fahrlässig ein Schaden entsteht (z. B. Schlüsselverlust). Die private Haftpflicht greift hier in der Regel nicht.", link: "/diensthaftpflicht/" },
];

export function lexikon() {
  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Lexikon", href: "/lexikon/" },
  ];

  const entries = terms
    .map(
      (t) => `
      <article class="lex-item" id="${esc(slugify(t.term))}">
        <h2>${esc(t.term)}</h2>
        <p>${esc(t.def)}</p>
        ${t.link ? `<a class="card__link" href="${esc(t.link)}">Mehr dazu ${icon("arrowRight", { size: 16 })}</a>` : ""}
      </article>`,
    )
    .join("\n");

  const body = `
    ${breadcrumbs(crumbs)}
    <section class="section page-intro">
      <div class="container container--narrow">
        ${sectionHeader("Beamten-Finanzlexikon", "Die wichtigsten Begriffe rund um Absicherung, Beihilfe und Vorsorge - einfach erklärt, ohne Fachchinesisch.", { eyebrow: "Einfach erklärt", as: "h1" })}
      </div>
    </section>
    <section class="section lex-list">
      <div class="container container--narrow">
        ${entries}
      </div>
    </section>
    ${ctaBanner({ title: "Noch Fragen? Frag uns einfach." })}
  `;

  // FAQPage-Schema fürs Lexikon (gut für Google & KI-Antworten)
  const faqs = terms.map((t) => ({ q: `Was bedeutet ${t.term.replace(/\s*\(.*\)/, "")}?`, a: t.def }));

  return {
    title: "Beamten-Finanzlexikon: Begriffe einfach erklärt | SK",
    description:
      "Dienstunfähigkeit, Beihilfe, Versorgungslücke, ETF & mehr - das Beamten-Finanzlexikon erklärt die wichtigsten Begriffe einfach und verständlich.",
    path: "/lexikon/",
    schema: [breadcrumbSchema(crumbs), faqSchema(faqs)],
    body,
  };
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[()\/]/g, "")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
