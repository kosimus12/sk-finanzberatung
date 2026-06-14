/** Rechtliche Pflichtseiten: Impressum, Datenschutz, Vorabinformation. */
import { esc } from "../lib/html.mjs";
import { breadcrumbs } from "../lib/components.mjs";
import { breadcrumbSchema } from "../lib/schema.mjs";
import { site } from "../data/site.mjs";

/** Gemeinsames Layout für Textseiten. */
function legalPage({ title, metaTitle, metaDescription, path, contentHtml }) {
  const crumbs = [
    { label: "Start", href: "/" },
    { label: title, href: path },
  ];
  const body = `
    ${breadcrumbs(crumbs)}
    <article class="section legal">
      <div class="container container--narrow">
        <h1>${esc(title)}</h1>
        ${contentHtml}
        <p class="legal__updated">Stand: ${new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}</p>
      </div>
    </article>`;
  return {
    title: metaTitle,
    description: metaDescription,
    path,
    noindex: false,
    schema: [breadcrumbSchema(crumbs)],
    body,
  };
}

export function impressum() {
  const l = site.legal;
  const content = `
    <h2>Angaben gemäß &sect; 5 DDG (Digitale-Dienste-Gesetz)</h2>
    <p>
      ${esc(l.fullName)}<br />
      ${esc(l.addressLine)}<br />
      Deutschland
    </p>

    <h2>Kontakt</h2>
    <p>
      Telefon: <a href="tel:${esc(site.contact.phoneIntl)}">${esc(l.phone)}</a><br />
      E-Mail: <a href="mailto:${esc(l.email)}">${esc(l.email)}</a>
    </p>

    <h2>Umsatzsteuer / Steuernummer</h2>
    <p>Steuernummer: ${esc(l.taxNumber)}</p>

    <h2>Berufsbezeichnung &amp; berufsrechtliche Angaben</h2>
    <p>Tätigkeiten: Versicherungsmakler und Finanzanlagenfachmann; freiberuflicher Dozent; Spezialist für Investment.</p>
    <p>
      <strong>Versicherungsmakler</strong> mit Erlaubnis nach &sect; 34d Abs. 1 GewO<br />
      Registrierungs-Nr.: ${esc(l.regInsurance)}
    </p>
    <p>
      <strong>Finanzanlagenfachmann</strong> mit Erlaubnis nach &sect; 34f Abs. 1 GewO<br />
      Registrierungs-Nr.: ${esc(l.regInvestment)}
    </p>
    <p>
      Aufsichtsbehörde: ${esc(l.supervisoryAuthority)}<br />
      Berufsbezeichnung verliehen in: Deutschland
    </p>
    <p>Nachprüfbar im Vermittlerregister:
       <a href="${esc(l.registerCheck)}" target="_blank" rel="noopener">vermittlerregister.info</a></p>

    <h2>Berufshaftpflichtversicherung</h2>
    <p>
      Name &amp; Sitz: ${esc(l.liabilityInsurer)}<br />
      Geltungsraum: Versicherungen &amp; Geldanlage in Deutschland
    </p>

    <h2>Schlichtungsstelle</h2>
    <p>
      ${esc(l.ombudsman)}<br />
      <a href="${esc(l.ombudsmanUrl)}" target="_blank" rel="noopener">versicherungsombudsmann.de</a>
    </p>
    <p>Plattform der EU-Kommission zur Online-Streitbeilegung:
       <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">ec.europa.eu/consumers/odr</a></p>

    <h2>Haftung für Inhalte und Links</h2>
    <p>Als Diensteanbieter sind wir gemäß &sect; 7 Abs. 1 DDG für eigene Inhalte verantwortlich. Nach
       &sect;&sect; 8-10 DDG sind wir nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen
       zu überwachen. Für Inhalte externer Links sind ausschließlich deren Betreiber verantwortlich; zum
       Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar.</p>

    <h2>Urheberrecht</h2>
    <p>Die Inhalte dieser Website unterliegen dem deutschen Urheberrecht. Vervielfältigung nur für den
       privaten, nicht kommerziellen Gebrauch. Inhalte Dritter sind als solche gekennzeichnet.</p>
  `;
  return legalPage({
    title: "Impressum",
    metaTitle: "Impressum | SK-Finanzberatung",
    metaDescription: "Impressum der SK-Finanzberatung (Simon Kuper): Anbieterkennzeichnung, Kontakt, Berufsangaben und Berufshaftpflicht.",
    path: "/impressum/",
    contentHtml: content,
  });
}

export function datenschutz() {
  const content = `
    <p>Der Schutz deiner Daten ist uns wichtig. Diese Erklärung informiert dich gemäß
       Datenschutz-Grundverordnung (DSGVO) über die Verarbeitung personenbezogener Daten auf dieser Website.</p>

    <h2>1. Verantwortlicher</h2>
    <p>
      ${esc(site.legal.fullName)}<br />
      ${esc(site.legal.addressLine)}<br />
      E-Mail: <a href="mailto:${esc(site.legal.email)}">${esc(site.legal.email)}</a>
    </p>

    <h2>2. Cookies und Einwilligung</h2>
    <p>Wir verwenden nur technisch notwendige Cookies. Optionale Dienste (z. B. Videos, Social-Media-Inhalte,
       Statistik) werden erst nach deiner ausdrücklichen Einwilligung über den Cookie-Banner geladen
       (Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO). Deine Auswahl kannst du jederzeit ändern.</p>

    <h2>3. Kontaktformular und Terminbuchung</h2>
    <p>Wenn du uns über das Formular oder die Terminbuchung kontaktierst, verarbeiten wir die von dir
       angegebenen Daten (Name, E-Mail, Thema, Nachricht) ausschließlich zur Bearbeitung deiner Anfrage
       und zur Vorbereitung der Beratung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>
    <p><strong>Speicherdauer:</strong> Anfragedaten werden nach Abschluss spätestens nach 3 Monaten gelöscht,
       sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
    <p>Für den technischen Versand des Kontaktformulars setzen wir den Dienst FormSubmit ein. Dabei werden die
       von dir eingegebenen Daten verarbeitet und als E-Mail an uns weitergeleitet. Rechtsgrundlage ist
       Art. 6 Abs. 1 lit. b und f DSGVO.</p>

    <h2>4. Terminbuchung (Calendly)</h2>
    <p>Für die Online-Terminbuchung kann der Dienst Calendly eingesetzt werden. Calendly wird erst nach
       deiner Einwilligung geladen. Dabei können Daten an den Anbieter übermittelt werden. Details findest
       du in der Datenschutzerklärung von Calendly.</p>

    <h2>5. Vergleichsrechner</h2>
    <p>Auf der Seite "Vergleiche" binden wir Vergleichsrechner unseres Technikpartners
       (form.partner-versicherung.de) ein. Wenn du einen Rechner nutzt, werden deine Eingaben zur
       Tarifberechnung an den Anbieter übermittelt. Rechtsgrundlage ist dein Interesse an einem
       Tarifvergleich (Art. 6 Abs. 1 lit. b und f DSGVO).</p>

    <h2>6. Newsletter (Double-Opt-in)</h2>
    <p>Für den Newsletter verarbeiten wir deine E-Mail-Adresse und optional deinen Vornamen. Die Anmeldung
       erfolgt im Double-Opt-in-Verfahren: Du erhältst zunächst eine Bestätigungs-E-Mail. Rechtsgrundlage
       ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die du jederzeit über den Abmeldelink widerrufen
       kannst. Der Versand erfolgt über einen Dienstleister, der die Daten in unserem Auftrag verarbeitet.</p>

    <h2>7. Social Media und Videos (YouTube, TikTok, Instagram)</h2>
    <p>Eingebettete Inhalte dieser Plattformen werden erst nach deiner Einwilligung geladen. Vorher findet
       keine Datenübertragung statt. Das Tracking dieser Dienste kannst du jederzeit über den Cookie-Banner
       deaktivieren (Opt-out).</p>

    <h2>8. Webanalyse (Google Analytics 4)</h2>
    <p>Sofern eine Reichweitenmessung (z. B. Google Analytics) eingesetzt wird, geschieht dies nur mit deiner
       Einwilligung. Du kannst dieser jederzeit widersprechen (Opt-out).</p>

    <h2>9. Hosting und Server-Logfiles</h2>
    <p>Beim Aufruf der Website werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt, abgerufene
       Seite) in Server-Logfiles verarbeitet, um den sicheren Betrieb zu gewährleisten
       (Art. 6 Abs. 1 lit. f DSGVO).</p>

    <h2>10. Deine Rechte</h2>
    <p>Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
       Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Erteilte
       Einwilligungen kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Wende dich dafür an die
       oben genannte Kontaktadresse.</p>
    <p>Zudem steht dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.</p>
  `;
  return legalPage({
    title: "Datenschutzerklärung",
    metaTitle: "Datenschutz | SK-Finanzberatung",
    metaDescription: "Datenschutzerklärung der SK-Finanzberatung: DSGVO-konforme Informationen zu Cookies, Kontaktformular, Terminbuchung, Social Media und deinen Rechten.",
    path: "/datenschutz/",
    contentHtml: content,
  });
}

export function vorabinformation() {
  const content = `
    <p>Damit du von Anfang an weißt, woran du bist, informieren wir dich hier vorab über Art und Umfang
       unserer Beratung.</p>

    <h2>Unabhängige Beratung ohne Provisionen</h2>
    <p>Du erhältst eine unabhängige Beratung ohne Provisionen. Wir sind an keinen Versicherer oder Anbieter
       gebunden.</p>

    <h2>Produktauswahl nach deiner Situation</h2>
    <p>Die Produktauswahl basiert allein auf deiner individuellen Situation, deinen Zielen und deinem Bedarf -
       nicht auf Vertriebsvorgaben.</p>

    <h2>Kostenfreie Erstberatung</h2>
    <p>Die Erstberatung ist für dich kostenfrei und unverbindlich. Ein etwaiges Honorar für eine
       weitergehende Beratung vereinbaren wir vorher transparent und schriftlich.</p>

    <h2>Keine Bindung an bestimmte Versicherer</h2>
    <p>Wir vergleichen neutral die Angebote der führenden Anbieter. Es besteht keine Bindung an bestimmte
       Versicherer oder Produktgeber.</p>
  `;
  return legalPage({
    title: "Vorabinformation",
    metaTitle: "Vorabinformation zur Beratung | SK",
    metaDescription: "Vorabinformation zur Finanzberatung: unabhängig, ohne Provisionen, kostenfreie Erstberatung und keine Bindung an bestimmte Versicherer.",
    path: "/vorabinformation/",
    contentHtml: content,
  });
}
