/*!
 *
 * Copyright 2014 DUNCKELFELD GmbH
 * Matthias Kurte <mk@dunckelfeld.de>; Tom Kirchhartz <tk@dunckelfeld.de>
 *
 * Leasing-Rechner
 * Errechnet normalen Leasingpreis und Preis für Leasing per Gehaltsumwandlung
 *
 * UST
 *
 */

(function ($) {
  $(function () {
    var leasingCalculator;

    // console.log(LeasingCalculator);
    if ($("#lur_main_layout").length > 0) {
      if ($("#calculator-container").length > 0)
        $("#calculator-container").append($("#lur_main_layout"));
      leasingCalculator = new LeasingCalculator($("#lur_main_layout"));
    }

    $(".expand-btn").on("click", function (e) {
      e.preventDefault();
      $($(this).data("show")).toggleClass("active");
      $($(this).data("hide")).removeClass("active");
      if ($($(this).data("show")).hasClass("active"))
        $(this).text($(this).data("text-active"));
      else $(this).text($(this).data("text"));
      return false;
    });
  });
})(jQuery); // EO jq-wrapper
