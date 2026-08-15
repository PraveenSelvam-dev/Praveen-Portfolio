// Praveen S — contact form handler (mailto, no backend required)
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("praveenContactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameField = document.getElementById("praveenName");
      var emailField = document.getElementById("praveenEmail");
      var messageField = document.getElementById("praveenMessage");

      var name = nameField ? nameField.value.trim() : "";
      var email = emailField ? emailField.value.trim() : "";
      var message = messageField ? messageField.value.trim() : "";

      if (!name || !email || !message) {
        return;
      }

      var subject = encodeURIComponent("Portfolio contact from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      window.location.href =
        "mailto:slpraveen13@gmail.com?subject=" + subject + "&body=" + body;
      form.reset();
    });
  });
})();
