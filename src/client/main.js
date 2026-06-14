/* =============================================================================
   Client-JS - Progressive Enhancement.
   Die Seite funktioniert auch ohne JavaScript; dieses Skript ergänzt:
   - mobile Navigation
   - aktiven Navigationspunkt markieren
   - DSGVO-Cookie-Consent (Speicherung der Auswahl)
   - Laden von Calendly & Social-Embeds erst nach Zustimmung
   ============================================================================= */
(function () {
  "use strict";

  var CONSENT_KEY = "sk_consent_v1";

  /* ---------- Mobile-Navigation ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });

    // Bei Klick auf einen Link das Menü schließen (mobil)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Aktiven Navigationspunkt markieren ---------- */
  function initActiveLink() {
    var path = window.location.pathname;
    var links = document.querySelectorAll(".nav__link");
    links.forEach(function (link) {
      var href = link.getAttribute("data-path");
      if (!href) return;
      var isActive = href === "/" ? path === "/" : path.indexOf(href) === 0;
      if (isActive) link.setAttribute("aria-current", "page");
    });
  }

  /* ---------- Consent-Speicher ---------- */
  function getConsent() {
    try {
      return JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    } catch (e) {
      return null;
    }
  }
  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    } catch (e) {
      /* localStorage evtl. blockiert - dann nur für diese Sitzung */
    }
  }

  /* ---------- Cookie-Banner ---------- */
  function initCookieBanner() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;
    var consent = getConsent();

    if (!consent) {
      banner.hidden = false;
    } else if (consent.marketing) {
      loadConsentedContent();
    }

    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cookie]");
      if (!btn) return;
      var action = btn.getAttribute("data-cookie");

      if (action === "accept" || action === "customize") {
        setConsent({ necessary: true, marketing: true, ts: Date.now() });
        loadConsentedContent();
      } else {
        setConsent({ necessary: true, marketing: false, ts: Date.now() });
      }
      banner.hidden = true;
    });
  }

  /* ---------- Calendly nach Zustimmung laden ---------- */
  function loadCalendly() {
    var widget = document.querySelector(".booking__widget[data-calendly]");
    if (!widget) return;
    var url = widget.getAttribute("data-calendly");
    if (!url) return; // kein Link konfiguriert -> Fallback bleibt sichtbar
    if (widget.dataset.loaded === "true") return;

    var inline = document.createElement("div");
    inline.className = "calendly-inline-widget";
    inline.setAttribute("data-url", url);
    inline.style.minWidth = "320px";
    inline.style.height = "680px";
    widget.innerHTML = "";
    widget.appendChild(inline);

    var script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onerror = function () {
      widget.innerHTML =
        '<p class="booking__fallback">Die Terminbuchung konnte nicht geladen werden. ' +
        'Bitte <a href="' + url + '" target="_blank" rel="noopener">oeffne den Kalender direkt</a> ' +
        "oder kontaktiere uns telefonisch.</p>";
    };
    document.body.appendChild(script);
    widget.dataset.loaded = "true";
  }

  /* ---------- Social-Embeds nach Zustimmung ---------- */
  function loadSocialEmbeds() {
    // Ohne API-Keys bleiben die statischen Profil-Karten bestehen (Fallback).
    // Mit konfigurierten Embeds koennte hier z. B. ein YouTube-/TikTok-iframe
    // dynamisch nachgeladen werden. Die Karten verlinken bereits aufs Profil.
    document.querySelectorAll(".social-card[data-embed]").forEach(function (card) {
      card.dataset.consented = "true";
    });
  }

  /* ---------- Google Analytics 4 nach Zustimmung ---------- */
  function loadAnalytics() {
    var cfg = window.SK_CONFIG || {};
    if (!cfg.gaId) return; // keine Mess-ID gesetzt
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.gaId);
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    // IP-Anonymisierung aktiv, datensparsam
    gtag("config", cfg.gaId, { anonymize_ip: true });
  }

  function loadConsentedContent() {
    loadCalendly();
    loadSocialEmbeds();
    loadAnalytics();
  }

  /* ---------- Init ---------- */
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    initNav();
    initActiveLink();
    initCookieBanner();
  });
})();
