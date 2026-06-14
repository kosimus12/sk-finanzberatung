/**
 * Rechner-Seite: ETF-Sparplan-/Zinseszinsrechner + Baufinanzierungs-Rechner
 * (reines JS, keine externen Abhängigkeiten). Plus Infos zu weltweiten ETFs.
 */
import { esc } from "../lib/html.mjs";
import { icon } from "../lib/icons.mjs";
import { sectionHeader, breadcrumbs, ctaBanner, faqSection, waschbaer, button } from "../lib/components.mjs";
import { breadcrumbSchema, faqSchema } from "../lib/schema.mjs";

const faqs = [
  {
    q: "Wie funktioniert der Zinseszins-Effekt?",
    a: "Deine Erträge werfen selbst wieder Erträge ab. Über lange Zeiträume wächst dein Vermögen dadurch nicht linear, sondern exponentiell - je früher du startest, desto stärker der Effekt.",
  },
  {
    q: "Welche Rendite ist realistisch?",
    a: "Ein breit gestreutes Welt-Portfolio (z. B. FTSE All World) hat langfristig im Schnitt rund 6-7 Prozent pro Jahr erzielt - vor Kosten und ohne Garantie. Kurzfristig schwanken die Kurse.",
  },
  {
    q: "Was bedeutet anfängliche Tilgung beim Baukredit?",
    a: "Die anfängliche Tilgung gibt an, welchen Anteil der Darlehenssumme du im ersten Jahr zurückzahlst. Eine höhere Tilgung bedeutet eine höhere Monatsrate, aber eine deutlich kürzere Laufzeit und weniger Zinskosten insgesamt.",
  },
  {
    q: "Ersetzt der Rechner eine Beratung?",
    a: "Nein. Die Rechner sind eine Orientierung. Deine persönliche Strategie - inkl. Versorgungslücke, Absicherung und Finanzierung - besprechen wir gern in einem kostenlosen Erstgespräch.",
  },
];

export function rechner() {
  const crumbs = [
    { label: "Start", href: "/" },
    { label: "Rechner", href: "/rechner/" },
  ];

  const body = `
    ${breadcrumbs(crumbs)}
    <section class="section page-intro">
      <div class="container">
        ${sectionHeader("Finanz-Rechner", "Spiel mit den Zahlen: Wie wächst dein Vermögen, und was kostet deine Baufinanzierung?", { eyebrow: "Selbst rechnen", as: "h1" })}
        <div class="chips">
          <a class="chip" href="#sparplan">Sparplan-Rechner</a>
          <a class="chip" href="#versorgung">Versorgungslücke</a>
          <a class="chip" href="#baukredit">Baukredit-Rechner</a>
        </div>
      </div>
    </section>

    <section class="section calc-section" id="sparplan">
      <div class="container">
        <h2 class="section-head section-head--center">ETF-Sparplan- & Zinseszinsrechner</h2>
        <div class="calc">
          <form class="calc__controls" id="calc-form">
            <div class="calc__field">
              <label for="c-start">Einmalanlage (Start)</label>
              <div class="calc__input"><input id="c-start" type="number" min="0" step="100" value="1000" /><span>EUR</span></div>
            </div>
            <div class="calc__field">
              <label for="c-rate">Monatliche Sparrate</label>
              <div class="calc__input"><input id="c-rate" type="number" min="0" step="10" value="150" /><span>EUR</span></div>
            </div>
            <div class="calc__field">
              <label for="c-years">Laufzeit: <output id="c-years-out">30</output> Jahre</label>
              <input id="c-years" type="range" min="1" max="45" step="1" value="30" />
            </div>
            <div class="calc__field">
              <label for="c-return">Erwartete Rendite: <output id="c-return-out">7</output> % p.a.</label>
              <input id="c-return" type="range" min="0" max="12" step="0.5" value="7" />
            </div>
          </form>

          <div class="calc__result" aria-live="polite">
            <p class="calc__big">Endvermögen<br/><strong id="c-total">0 EUR</strong></p>
            <ul class="calc__breakdown">
              <li><span class="dot dot--paid"></span> Eingezahlt: <strong id="c-paid">0 EUR</strong></li>
              <li><span class="dot dot--gain"></span> Erträge (Zinseszins): <strong id="c-gain">0 EUR</strong></li>
            </ul>
            <div class="calc__bar"><span id="c-bar-paid"></span><span id="c-bar-gain"></span></div>
            <p class="calc__note">Beispielrechnung, keine Anlageberatung. Erträge sind nicht garantiert.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container--narrow">
        <div class="article__section">
          <h2>Weltweit investieren: der FTSE All World</h2>
          <p>Der FTSE All World ist ein Aktienindex, der rund 4.000 Unternehmen aus Industrie- und
             Schwellenländern abbildet - von den USA über Europa bis Asien. Mit einem einzigen
             ETF auf diesen Index bist du also weltweit breit gestreut investiert.</p>
          <p>Das senkt dein Risiko: Läuft eine Region schlechter, gleichen andere das oft aus.
             Historisch hat ein solches Weltportfolio langfristig im Schnitt rund 6-7 Prozent pro Jahr
             erzielt (vor Kosten, keine Garantie). Günstige ETFs kosten dabei nur etwa 0,1-0,2 Prozent
             Gebühren im Jahr.</p>
        </div>
        <div class="compare-box">
          <div class="compare-box__col">
            <h3>${icon("chart", { size: 22 })} Welt-ETF (z. B. FTSE All World)</h3>
            <ul>
              <li>${icon("check", { size: 18, class: "check" })} Ø rund 6-7 % p.a. langfristig (ohne Garantie)</li>
              <li>${icon("check", { size: 18, class: "check" })} Breit gestreut über tausende Firmen weltweit</li>
              <li>${icon("check", { size: 18, class: "check" })} Sehr günstig, transparent, flexibel</li>
              <li>${icon("check", { size: 18, class: "check" })} Schwankt kurzfristig - ideal für lange Zeiträume</li>
            </ul>
          </div>
          <div class="compare-box__col compare-box__col--muted">
            <h3>${icon("wallet", { size: 22 })} Klassisches Sparbuch</h3>
            <ul>
              <li>${icon("close", { size: 18 })} Zins meist deutlich unter der Inflation</li>
              <li>${icon("close", { size: 18 })} Realer Wertverlust über die Jahre</li>
              <li>${icon("close", { size: 18 })} Keine Teilhabe an der Wirtschaft</li>
              <li>${icon("check", { size: 18, class: "check" })} Dafür schwankungsfrei - gut für den Notgroschen</li>
            </ul>
          </div>
        </div>
        <p class="compare-note">Kurz gesagt: Das Sparbuch eignet sich für den jederzeit verfügbaren Notgroschen.
           Für den langfristigen Vermögensaufbau ist ein breit gestreuter Welt-ETF meist die deutlich
           rentablere Wahl - genau das rechnet dir der Sparplan-Rechner oben vor.</p>
      </div>
    </section>

    <section class="section calc-section" id="versorgung">
      <div class="container">
        <h2 class="section-head section-head--center">Versorgungslücken-Rechner</h2>
        <p class="section-head__sub section-head--center">Wie groß ist die Lücke zwischen deiner Pension und deinem gewohnten Einkommen?</p>
        <div class="calc">
          <form class="calc__controls" id="gap-form">
            <div class="calc__field">
              <label for="g-netto">Heutiges Nettoeinkommen (mtl.)</label>
              <div class="calc__input"><input id="g-netto" type="number" min="0" step="100" value="2500" /><span>EUR</span></div>
            </div>
            <div class="calc__field">
              <label for="g-quote">Erwartete Pension: <output id="g-quote-out">65</output> % vom Netto</label>
              <input id="g-quote" type="range" min="40" max="75" step="1" value="65" />
            </div>
            <div class="calc__field">
              <label for="g-years">Dauer im Ruhestand: <output id="g-years-out">25</output> Jahre</label>
              <input id="g-years" type="range" min="15" max="35" step="1" value="25" />
            </div>
          </form>
          <div class="calc__result" aria-live="polite">
            <p class="calc__big">Monatliche Lücke<br/><strong id="g-monthly">0 EUR</strong></p>
            <ul class="calc__breakdown">
              <li><span class="dot dot--paid"></span> Erwartete Pension: <strong id="g-pension">0 EUR</strong></li>
              <li><span class="dot dot--gain"></span> Geschätzter Gesamtbedarf: <strong id="g-total">0 EUR</strong></li>
            </ul>
            <p class="calc__note">Vereinfachte Schätzung ohne Inflation/Steuern. Deine echte Lücke berechnen wir gemeinsam.</p>
            ${waschbaer("pension", "Finanzwaschbär entspannt im Ruhestand", { width: 110, height: 110, className: "calc__mascot" })}
          </div>
        </div>
        <p class="compare-note" style="text-align:center">Überrascht von der Lücke? Wir schließen sie mit einem günstigen ETF-Plan.</p>
        <p style="text-align:center">${button("Versorgungslücke besprechen", "/kontakt/#termin", { variant: "cta", classes: "btn--lg", icon: "calendar" })}</p>
      </div>
    </section>

    <section class="section section--muted calc-section" id="baukredit">
      <div class="container">
        <h2 class="section-head section-head--center">Baukredit-Rechner</h2>
        <p class="section-head__sub section-head--center">Schätze Monatsrate, Restschuld und Zinskosten deiner Baufinanzierung.</p>
        <div class="calc">
          <form class="calc__controls" id="loan-form">
            <div class="calc__field">
              <label for="l-amount">Darlehenssumme</label>
              <div class="calc__input"><input id="l-amount" type="number" min="10000" step="5000" value="300000" /><span>EUR</span></div>
            </div>
            <div class="calc__field">
              <label for="l-rate">Sollzins: <output id="l-rate-out">3.5</output> % p.a.</label>
              <input id="l-rate" type="range" min="0.5" max="7" step="0.1" value="3.5" />
            </div>
            <div class="calc__field">
              <label for="l-tilgung">Anfängliche Tilgung: <output id="l-tilgung-out">2</output> % p.a.</label>
              <input id="l-tilgung" type="range" min="1" max="5" step="0.5" value="2" />
            </div>
            <div class="calc__field">
              <label for="l-fix">Zinsbindung: <output id="l-fix-out">10</output> Jahre</label>
              <input id="l-fix" type="range" min="5" max="30" step="5" value="10" />
            </div>
          </form>

          <div class="calc__result" aria-live="polite">
            <p class="calc__big">Monatliche Rate<br/><strong id="l-monthly">0 EUR</strong></p>
            <ul class="calc__breakdown">
              <li><span class="dot dot--paid"></span> Restschuld nach Zinsbindung: <strong id="l-rest">0 EUR</strong></li>
              <li><span class="dot dot--gain"></span> Gezahlte Zinsen (Zinsbindung): <strong id="l-interest">0 EUR</strong></li>
              <li><span class="dot"></span> Voraussichtliche Gesamtlaufzeit: <strong id="l-term">0 Jahre</strong></li>
            </ul>
            <p class="calc__note">Vereinfachte Beispielrechnung ohne Sondertilgungen/Gebühren. Keine Finanzierungszusage.</p>
            ${waschbaer("rechner", "Finanzwaschbär mit Taschenrechner", { width: 110, height: 110, className: "calc__mascot" })}
          </div>
        </div>
        <p class="compare-note" style="text-align:center">Eine Baufinanzierung ist individuell - wir vergleichen für dich über viele Banken die besten Konditionen.</p>
        <p style="text-align:center">${button("Baufinanzierung anfragen", "/kontakt/#termin", { variant: "cta", classes: "btn--lg", icon: "calendar" })}</p>
      </div>
    </section>

    ${faqSection(faqs)}
    ${ctaBanner({ title: "Aus Zahlen einen Plan machen?" })}

    <script>
    (function () {
      var euro = function (n) { return Math.round(n).toLocaleString("de-DE") + " EUR"; };
      var num = function (id) { return parseFloat(document.getElementById(id).value) || 0; };

      // --- Sparplan ---
      var sf = document.getElementById("calc-form");
      if (sf) {
        var sparplan = function () {
          var start = num("c-start"), rate = num("c-rate"),
              years = parseInt(document.getElementById("c-years").value, 10) || 0,
              ratePct = num("c-return");
          document.getElementById("c-years-out").textContent = years;
          document.getElementById("c-return-out").textContent = ratePct;
          var months = years * 12, m = ratePct / 100 / 12, bal = start;
          for (var i = 0; i < months; i++) bal = bal * (1 + m) + rate;
          var paid = start + rate * months, gain = Math.max(0, bal - paid);
          document.getElementById("c-total").textContent = euro(bal);
          document.getElementById("c-paid").textContent = euro(paid);
          document.getElementById("c-gain").textContent = euro(gain);
          var total = paid + gain || 1;
          document.getElementById("c-bar-paid").style.flex = paid / total;
          document.getElementById("c-bar-gain").style.flex = gain / total;
        };
        sf.addEventListener("input", sparplan); sparplan();
      }

      // --- Baukredit (Annuitätendarlehen) ---
      var lf = document.getElementById("loan-form");
      if (lf) {
        var loan = function () {
          var amount = num("l-amount"),
              p = num("l-rate"), t = num("l-tilgung"),
              fix = parseInt(document.getElementById("l-fix").value, 10) || 0;
          document.getElementById("l-rate-out").textContent = p.toFixed(1);
          document.getElementById("l-tilgung-out").textContent = t;
          document.getElementById("l-fix-out").textContent = fix;
          var monthly = amount * (p + t) / 100 / 12;
          var mZins = p / 100 / 12, bal = amount, interestSum = 0;
          // Restschuld + Zinsen über die Zinsbindung
          for (var i = 0; i < fix * 12 && bal > 0; i++) {
            var zins = bal * mZins; interestSum += zins;
            bal = bal - (monthly - zins);
          }
          if (bal < 0) bal = 0;
          // Gesamtlaufzeit grob schätzen
          var b2 = amount, months = 0;
          while (b2 > 0 && months < 1200) { b2 = b2 - (monthly - b2 * mZins); months++; }
          document.getElementById("l-monthly").textContent = euro(monthly);
          document.getElementById("l-rest").textContent = euro(bal);
          document.getElementById("l-interest").textContent = euro(interestSum);
          document.getElementById("l-term").textContent = (months / 12).toFixed(1) + " Jahre";
        };
        lf.addEventListener("input", loan); loan();
      }

      // --- Versorgungslücke ---
      var gf = document.getElementById("gap-form");
      if (gf) {
        var gap = function () {
          var netto = num("g-netto"),
              quote = parseInt(document.getElementById("g-quote").value, 10) || 0,
              years = parseInt(document.getElementById("g-years").value, 10) || 0;
          document.getElementById("g-quote-out").textContent = quote;
          document.getElementById("g-years-out").textContent = years;
          var pension = netto * quote / 100;
          var luecke = Math.max(0, netto - pension);
          document.getElementById("g-pension").textContent = euro(pension);
          document.getElementById("g-monthly").textContent = euro(luecke);
          document.getElementById("g-total").textContent = euro(luecke * 12 * years);
        };
        gf.addEventListener("input", gap); gap();
      }
    })();
    </script>
  `;
  return {
    title: "Rechner: Sparplan & Baukredit | SK-Finanzberatung",
    description:
      "Kostenlose Finanz-Rechner: ETF-Sparplan- & Zinseszinsrechner und Baukredit-Rechner. Plus Infos zu weltweiten ETFs (FTSE All World) im Vergleich zum Sparbuch.",
    path: "/rechner/",
    schema: [breadcrumbSchema(crumbs), faqSchema(faqs)],
    body,
  };
}
