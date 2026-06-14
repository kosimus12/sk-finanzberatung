/**
 * Ratgeber-Artikel. Jeder Artikel erzeugt eine SEO-/LLMO-optimierte Unterseite
 * unter /ratgeber/[slug]/.
 *
 * sections: [{ heading, body }] - body unterstützt Absätze (durch Leerzeile getrennt)
 */

export const ratgeber = [
  {
    slug: "lerne-zu-investieren",
    title: "Lerne zu investieren: dein einfacher Einstieg",
    excerpt: "In wenigen Schritten vom Sparbuch zum eigenen ETF-Portfolio - ohne Vorwissen.",
    icon: "tablet",
    iconAlt: "Finanzwaschbär mit Tablet lernt zu investieren",
    metaDescription:
      "Investieren lernen für Anfänger: So startest du Schritt für Schritt mit ETFs - verständlich erklärt, ohne Fachjargon und ohne Vorwissen.",
    readingMinutes: 6,
    intro:
      "Investieren klingt kompliziert - ist es aber nicht. Mit ein paar Grundlagen kann jeder starten.\n\nIn diesem Ratgeber zeigen wir dir, wie du ruhig und ohne Stress den ersten Schritt machst.",
    sections: [
      {
        heading: "Warum sich Investieren lohnt",
        body: "Geld auf dem Sparkonto verliert durch die Inflation jedes Jahr an Wert. Wer langfristig Vermögen aufbauen will, kommt am Investieren kaum vorbei.\n\nDie gute Nachricht: Du brauchst kein großes Startkapital. Schon kleine, regelmäßige Beträge wachsen über die Jahre kräftig.",
      },
      {
        heading: "Der erste Schritt: das Fundament",
        body: "Bevor du investierst, sollte ein Notgroschen von etwa drei Nettogehältern auf einem Tagesgeldkonto liegen.\n\nSo musst du deine Geldanlage nie in einem schlechten Moment auflösen, wenn unerwartet die Waschmaschine kaputtgeht.",
      },
      {
        heading: "Breit streuen mit ETFs",
        body: "Ein ETF ist ein Korb aus vielen Aktien. Statt auf einzelne Unternehmen zu setzen, investierst du in hunderte oder tausende auf einmal.\n\nDas senkt dein Risiko deutlich und ist günstig. Ein weltweit streuender ETF ist für die meisten ein solider Start.",
      },
      {
        heading: "Dranbleiben statt zocken",
        body: "Der größte Fehler ist es, bei jedem Kursrückgang nervös zu verkaufen. Erfolgreiches Investieren ist langweilig: einmal einrichten, regelmäßig einzahlen, laufen lassen.\n\nZeit im Markt schlägt das Timing des Marktes.",
      },
    ],
    faqs: [
      {
        q: "Wie viel Geld brauche ich, um mit dem Investieren zu starten?",
        a: "Du kannst bei vielen Anbietern schon ab etwa 25 Euro im Monat mit einem ETF-Sparplan starten. Wichtiger als die Höhe ist, dass du überhaupt regelmäßig anfängst.",
      },
      {
        q: "Ist Investieren nicht zu riskant?",
        a: "Kurzfristig schwanken Kurse, das stimmt. Über lange Zeiträume und mit breiter Streuung sinkt das Risiko aber deutlich. Geld, das du in den nächsten Jahren brauchst, gehört allerdings nicht an die Börse.",
      },
    ],
    related: ["unnoetige-gebuehren-sparen", "notgroschen-aufbauen"],
  },

  {
    slug: "unnoetige-gebuehren-sparen",
    title: "Spare unnötige Gebühren bei deiner Geldanlage",
    excerpt: "Versteckte Kosten fressen deine Rendite. So erkennst und vermeidest du sie.",
    icon: "rechner",
    iconAlt: "Finanzwaschbär mit Taschenrechner gegen hohe Gebühren",
    metaDescription:
      "Gebühren bei der Geldanlage senken: Ausgabeaufschläge, Verwaltungskosten und teure Fonds erkennen und vermeiden. So bleibt mehr Rendite bei dir.",
    readingMinutes: 5,
    intro:
      "Ein Prozent Gebühren klingt wenig - kostet dich über 30 Jahre aber oft zehntausende Euro.\n\nWir zeigen dir, wo Kosten lauern und wie du sie vermeidest.",
    sections: [
      {
        heading: "Warum Gebühren so teuer sind",
        body: "Kosten wirken wie ein Zins gegen dich. Sie schmälern nicht nur deine Einzahlung, sondern auch alle zukünftigen Gewinne darauf.\n\nUeber Jahrzehnte summiert sich selbst ein kleiner Unterschied zu einem großen Betrag.",
      },
      {
        heading: "Diese Kostenfallen solltest du kennen",
        body: "Achte auf Ausgabeaufschläge, hohe laufende Fondskosten und teure Provisionsprodukte. Aktiv gemanagte Fonds kosten oft das Zehnfache eines günstigen ETFs - bei meist schlechterer Leistung.\n\nAuch Depotgebühren mancher Banken lassen sich leicht vermeiden.",
      },
      {
        heading: "So sparst du konkret",
        body: "Setze auf günstige ETFs mit niedrigen laufenden Kosten und ein kostenfreies Depot bei einem Online-Broker.\n\nVergleiche vor jedem Abschluss die Gesamtkosten - nicht nur den Preis im Schaufenster.",
      },
    ],
    faqs: [
      {
        q: "Woran erkenne ich, ob ein Fonds zu teuer ist?",
        a: "Achte auf die laufenden Kosten (TER). Günstige ETFs liegen oft bei 0,1 bis 0,3 Prozent pro Jahr, viele aktive Fonds bei 1,5 Prozent oder mehr. Je niedriger die Kosten, desto besser für deine Rendite.",
      },
      {
        q: "Lohnt sich ein Depotwechsel wegen der Gebühren?",
        a: "Oft ja. Viele Online-Broker führen Depots kostenlos und bieten günstige Sparpläne. Ein Wechsel ist meist unkompliziert - wir helfen dir dabei, die Gesamtkosten ehrlich zu vergleichen.",
      },
    ],
    related: ["lerne-zu-investieren", "honorarberatung-vs-provision"],
  },

  {
    slug: "welche-versicherungen-sind-wichtig",
    title: "Welche Versicherungen sind wirklich wichtig?",
    excerpt: "Existenziell, sinnvoll oder überflüssig? Der ehrliche Ueberblick.",
    icon: "check",
    iconAlt: "Finanzwaschbär mit Checkliste erklärt wichtige Versicherungen",
    metaDescription:
      "Welche Versicherungen wirklich wichtig sind: existenzielle Risiken zuerst absichern, überflüssige Policen vermeiden. Ehrlicher Ueberblick ohne Verkaufsdruck.",
    readingMinutes: 6,
    intro:
      "Es gibt unzählige Versicherungen - aber nur wenige sind wirklich wichtig.\n\nWir sortieren für dich, was existenziell ist, was sinnvoll sein kann und worauf du verzichten kannst.",
    sections: [
      {
        heading: "Existenziell: diese drei zuerst",
        body: "An erster Stelle steht die Privathaftpflicht - sie schützt vor Schäden, die dich sonst ein Leben lang belasten könnten.\n\nGenauso wichtig ist die Absicherung deiner Arbeitskraft (Berufsunfähigkeit). Wer eine Familie hat, sollte zusätzlich über eine Risikolebensversicherung nachdenken.",
      },
      {
        heading: "Sinnvoll, je nach Lebenssituation",
        body: "Hausrat lohnt sich bei wertvollem Besitz, eine Wohngebäudeversicherung ist bei Eigentum Pflicht.\n\nZusatzkrankenversicherungen wie der Zahnschutz können sich rechnen, wenn dir die Leistung wichtig ist.",
      },
      {
        heading: "Meist überflüssig",
        body: "Auf viele kleine Policen kannst du verzichten: Handyversicherung, Brillenversicherung oder Sterbegeldversicherung kosten oft mehr, als sie bringen.\n\nFaustregel: Versichere nur Risiken, die dich finanziell überfordern würden.",
      },
    ],
    faqs: [
      {
        q: "Was ist die wichtigste Versicherung überhaupt?",
        a: "Die Privathaftpflichtversicherung. Sie ist günstig und schützt dich vor Schadenersatzforderungen, die schnell in die Millionen gehen können. Direkt danach kommt die Absicherung deiner Arbeitskraft.",
      },
      {
        q: "Welche Versicherungen kann ich mir sparen?",
        a: "Versicherungen für kleine, gut verkraftbare Schäden - etwa für Handy, Brille oder Gepäck - lohnen sich meist nicht. Solche Kosten kannst du im Zweifel selbst tragen.",
      },
    ],
    related: ["notgroschen-aufbauen", "honorarberatung-vs-provision"],
  },

  {
    slug: "etf-fuer-einsteiger",
    title: "ETFs einfach erklärt: was Einsteiger wissen müssen",
    excerpt: "Was ist ein ETF, wie funktioniert er und worauf solltest du achten?",
    icon: "tablet",
    iconAlt: "Finanzwaschbär erklärt ETFs",
    metaDescription:
      "ETFs einfach erklärt: Was ist ein ETF, wie funktioniert er und wie wählst du den richtigen aus? Verständlicher Einstieg für Anfänger.",
    readingMinutes: 5,
    intro:
      "ETF ist eines der wichtigsten Wörter beim Vermögensaufbau - und eines der am meisten missverstandenen.\n\nHier erklären wir es so einfach wie möglich.",
    sections: [
      {
        heading: "Was ist ein ETF?",
        body: "ETF steht für Exchange Traded Fund, also einen börsengehandelten Fonds. Er bildet einen Index nach - zum Beispiel die 1.600 größten Unternehmen der Industrieländer.\n\nKaufst du einen Anteil, bist du automatisch an all diesen Unternehmen beteiligt.",
      },
      {
        heading: "Warum ETFs so beliebt sind",
        body: "ETFs sind günstig, transparent und breit gestreut. Du brauchst keine Aktien selbst auszuwählen und kein teures Fondsmanagement.\n\nGenau diese Einfachheit macht sie für den langfristigen Vermögensaufbau so stark.",
      },
      {
        heading: "Worauf du achten solltest",
        body: "Achte auf eine breite Streuung, niedrige laufende Kosten und ein ausreichend großes Fondsvolumen.\n\nOb ausschüttend oder thesaurierend hängt von deinen Zielen ab - das klären wir gern gemeinsam.",
      },
    ],
    faqs: [
      {
        q: "Sind ETFs sicher?",
        a: "ETFs sind als Sondervermögen geschützt - selbst bei einer Pleite des Anbieters bleibt dein Geld dein Eigentum. Kursschwankungen gibt es trotzdem, deshalb sind ETFs vor allem für langfristiges Anlegen gedacht.",
      },
      {
        q: "Wie viele ETFs brauche ich?",
        a: "Für den Start reicht oft schon ein einziger, weltweit streuender ETF. Mehr ist nicht automatisch besser - Einfachheit ist hier ein Vorteil.",
      },
    ],
    related: ["lerne-zu-investieren", "unnoetige-gebuehren-sparen"],
  },

  {
    slug: "notgroschen-aufbauen",
    title: "Notgroschen aufbauen: dein finanzielles Sicherheitsnetz",
    excerpt: "Warum ein Puffer wichtiger ist als jede Geldanlage - und wie hoch er sein sollte.",
    icon: "pension",
    iconAlt: "Finanzwaschbär entspannt dank Notgroschen",
    metaDescription:
      "Notgroschen aufbauen: Wie hoch der finanzielle Puffer sein sollte, wo du ihn parkst und warum er vor jeder Geldanlage kommt. Einfach erklärt.",
    readingMinutes: 4,
    intro:
      "Bevor du investierst, brauchst du ein Sicherheitsnetz. Der Notgroschen ist dein finanzielles Fundament.\n\nEr sorgt dafür, dass dich unerwartete Ausgaben nicht aus der Bahn werfen.",
    sections: [
      {
        heading: "Warum ein Puffer so wichtig ist",
        body: "Eine kaputte Waschmaschine, eine Autoreparatur oder ein längerer Verdienstausfall - so etwas passiert. Mit einem Notgroschen musst du dafür keine Schulden machen und keine Geldanlage in einem schlechten Moment verkaufen.\n\nDas gibt dir Ruhe und Handlungsfreiheit.",
      },
      {
        heading: "Wie hoch sollte der Notgroschen sein?",
        body: "Als Faustregel gelten drei bis sechs Nettogehälter. Wer eine sichere Anstellung hat, kommt mit weniger aus, Selbstständige sollten eher mehr zurücklegen.\n\nWichtig ist, dass du dich mit dem Betrag wohlfühlst.",
      },
      {
        heading: "Wo parke ich das Geld?",
        body: "Der Notgroschen gehört auf ein Tagesgeldkonto - jederzeit verfügbar und nicht an der Börse.\n\nHier geht es nicht um Rendite, sondern um Sicherheit und schnellen Zugriff.",
      },
    ],
    faqs: [
      {
        q: "Soll ich erst den Notgroschen aufbauen oder gleich investieren?",
        a: "Zuerst der Notgroschen. Er ist dein Sicherheitsnetz und sorgt dafür, dass du deine langfristige Geldanlage nie in einem ungünstigen Moment auflösen musst.",
      },
      {
        q: "Wo bekomme ich aktuell die besten Tagesgeld-Zinsen?",
        a: "Die Konditionen ändern sich regelmäßig. Mit unserem Tagesgeld-Vergleich findest du aktuelle Angebote - wichtiger als der letzte Zinspunkt ist aber, dass das Geld sicher und verfügbar ist.",
      },
    ],
    related: ["lerne-zu-investieren", "welche-versicherungen-sind-wichtig"],
  },

  {
    slug: "honorarberatung-vs-provision",
    title: "Honorarberatung statt Provision: der entscheidende Unterschied",
    excerpt: "Warum unabhängige Beratung ohne Provision oft die bessere Wahl ist.",
    icon: "handshake",
    iconAlt: "Finanzwaschbär reicht die Hand - faire unabhängige Beratung",
    metaDescription:
      "Honorarberatung vs. Provision: Was der Unterschied für dich bedeutet und warum unabhängige Beratung ohne Provision oft günstiger und ehrlicher ist.",
    readingMinutes: 5,
    intro:
      "Nicht jeder Berater verdient auf die gleiche Weise. Und genau das macht einen großen Unterschied für dich.\n\nWir erklären, was hinter Honorar- und Provisionsberatung steckt.",
    sections: [
      {
        heading: "So funktioniert Provisionsberatung",
        body: "Bei der klassischen Provisionsberatung verdient der Berater an den Produkten, die er vermittelt. Je teurer das Produkt, desto höher oft die Provision.\n\nDas kann zu einem Interessenkonflikt führen - nicht jede Empfehlung ist dann zwingend in deinem Sinne.",
      },
      {
        heading: "So funktioniert Honorarberatung",
        body: "Bei der Honorarberatung zahlst du für die Beratung selbst, nicht für den Abschluss. Der Berater hat dadurch kein Interesse daran, dir ein teures Produkt zu verkaufen.\n\nDas Ergebnis ist eine neutrale Empfehlung, die sich an deiner Situation orientiert.",
      },
      {
        heading: "Was das für dich bedeutet",
        body: "Mit unabhängiger Beratung bekommst du Zugang zu günstigen, provisionsfreien Produkten - etwa ETFs statt teurer Policen.\n\nUeber die Jahre kann das einen spürbaren Unterschied für dein Vermögen machen.",
      },
    ],
    faqs: [
      {
        q: "Was kostet eine Honorarberatung?",
        a: "Das Honorar wird transparent vereinbart - entweder als Pauschale oder nach Aufwand. Die Erstberatung ist bei uns kostenfrei, sodass du in Ruhe prüfen kannst, ob es passt.",
      },
      {
        q: "Lohnt sich Honorarberatung wirklich?",
        a: "In vielen Fällen ja. Wer provisionsfreie, günstige Produkte nutzt, spart oft mehr, als die Beratung kostet - vor allem langfristig beim Vermögensaufbau.",
      },
    ],
    related: ["unnoetige-gebuehren-sparen", "welche-versicherungen-sind-wichtig"],
  },
];

export function getArticle(slug) {
  return ratgeber.find((a) => a.slug === slug);
}
