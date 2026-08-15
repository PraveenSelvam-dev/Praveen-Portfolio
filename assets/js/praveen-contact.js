// Praveen S — contact + navigation helpers
(function () {
  "use strict";

  var OWNER_EMAIL = "slpraveen13@gmail.com";
  var OWNER_PHONE = "918270073249";
  var WHATSAPP_MESSAGE = "Hi Praveen, I found your portfolio and would like to connect with you.";

  function gmailComposeUrl(subject, body) {
    var url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(OWNER_EMAIL);
    if (subject) url += "&su=" + encodeURIComponent(subject);
    if (body) url += "&body=" + encodeURIComponent(body);
    return url;
  }

  function whatsappUrl(message) {
    return "https://wa.me/" + OWNER_PHONE + "?text=" + encodeURIComponent(message || WHATSAPP_MESSAGE);
  }

  function closeOffcanvas() {
    var area = document.querySelector(".tw-offcanvas-2-area");
    if (area) area.classList.remove("opened");
    var overlay = document.querySelector(".body-overlay");
    if (overlay) overlay.classList.remove("opened", "apply");
    document.body.classList.remove("overflow-hidden");
  }

  function scrollToSection(hash) {
    var target = document.querySelector(hash);
    if (!target) return;
    var headerOffset = 0;
    var y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    if (history.replaceState) history.replaceState(null, "", hash);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("praveenContactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = (document.getElementById("praveenName") || {}).value || "";
        var email = (document.getElementById("praveenEmail") || {}).value || "";
        var message = (document.getElementById("praveenMessage") || {}).value || "";
        name = name.trim();
        email = email.trim();
        message = message.trim();

        if (!name || !email || !message) {
          form.reportValidity();
          return;
        }

        var subject = "Portfolio contact from " + name;
        var body = "Hello Praveen,\n\n" +
          message + "\n\n" +
          "Sender name: " + name + "\n" +
          "Sender email: " + email;

        // mailto opens the visitor's configured email client. It cannot send an email silently from a static site.
        window.location.href = "mailto:" + OWNER_EMAIL +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
      });
    }

    // Email links -> Gmail compose.
    document.querySelectorAll(".js-gmail-contact").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var href = gmailComposeUrl();
        window.open(href, "_blank", "noopener,noreferrer");
      });
    });

    // Phone links -> WhatsApp chat.
    document.querySelectorAll(".js-whatsapp-contact").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        window.open(whatsappUrl(), "_blank", "noopener,noreferrer");
      });
    });

    // Menu/section links: close the offcanvas first, then navigate to the clicked section.
    document.addEventListener("click", function (e) {
      var link = e.target.closest("a.js-section-link");
      if (!link) return;
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeOffcanvas();
      setTimeout(function () { scrollToSection(href); }, 60);
    });
  });
})();
