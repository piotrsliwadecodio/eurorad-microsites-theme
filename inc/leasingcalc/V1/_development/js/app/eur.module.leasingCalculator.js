/*
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

// *******************************
// LeasingCalculator
// *******************************

var LeasingCalculator = function (elm) {
  this.init(elm);
};
LeasingCalculator.prototype = {
  // initialize the whole stuff
  init: function (elm) {
    var t = this;
    t.$elm = elm;

    leasingCalc = t;

    t.prepareDataObject();

    // get prices
    t.resetParams();

    t.calculate();

    // Bind Events
    if (typeof t.$elm !== "undefined" && t.$elm !== null) t.bindEvents();
  },

  prepareDataObject: function () {
    var t = this;

    // prices
    t.bikesPrice = 0;
    t.bikesPriceBrutto = 0;
    t.bikesPriceNetto = 0;
    t.leasingPriceNetto = 0;
    t.leasingPriceBrutto = 0;
    t.leasingPriceBarumwandlung = 0;
    t.ersparnis = 0;
    t.ersparnisProz = 0;
    t.lohnBrutto = 0;
    t.lohnBruttoBarumwandlung = 0;

    t.aVers = 0;
    t.rVers = 0;
    t.pVers = 0;
    t.agPVers = 0;
    t.agKVers = 0;
    t.agVers = 0;
    t.vers = 0;
    t.kSteuer = 0;
    t.steuern = 0;
    t.abgaben = 0;
    t.lohnSteuer = 0;
    t.soli = 0;

    // leasing Parameters
    t.laufzeit = 36;
    t.anzahlung = 0;

    t.factorObject = t.$elm.data("factorobject");
    t.verspraemie = t.$elm.data("insuranceobject");

    t.maxBikes = t.$elm.data("max-bikes");
    t.calctype = t.$elm.data("calctype");
    t.noTaxOnInsurance = t.$elm.data("no-tax-on-insurance");
    t.subtractTaxAfterEmployershare = t.$elm.data(
      "subtract-tax-after-employershare"
    );
    t.noSavings = t.$elm.data("nosavings");
    t.noSavings = t.$elm.data("nosavings");
    t.employersshareType = t.$elm.data("employersshare");
    t.subtractEmployersShareInResult = t.$elm.data(
      "subtract-employersshare-in-result"
    );

    // input elements
    if (typeof t.$elm !== "undefined" && t.$elm !== null) {
      t.$inputFields = t.$elm.find("input, select");
      t.$switches = t.$elm.find(".switch");
      t.$submit = t.$elm.find("#btn-calculate");
      t.$switchKinder = t.$elm.find("#lur_kinder_switch");
      t.$switchKinderSpan = t.$elm.find("#lur_kinder_switch span");
      t.$anzahlKinder = t.$elm.find("#lur_content_anzkinder");
      t.$anzahlKinder2 = t.$elm.find("#lur_content_anzkinder_2");
      t.$inputKinder = t.$elm.find("#lur_kinder");
      t.$inputKinder2 = t.$elm.find("#lur_kinder_2");
      t.$switchKirche = t.$elm.find("#lur_kirche_switch");
      t.$switchBeamte = t.$elm.find("#lur_beamte_switch");
      t.$switchUst = t.$elm.find("#lur_ust_switch");
      t.$switchReverse = t.$elm.find("#lur_reverse_switch");
      t.$calcReverse = t.$elm.find("#lur_reverse_calc");
      t.$selectSteuerklasse = t.$elm.find("#lur_steuerklasse");
      t.$rowSteuerFaktor = t.$elm.find("#lur_content_faktor");
      t.$inputSteuerFaktor = t.$elm.find("#lur_faktor");
      t.$selectKrankenkasse = t.$elm.find("#lur_krankenkasse");
      t.$selectJahr = t.$elm.find("#lur_jahr");
      t.$krankenkasseRow = t.$elm.find("#lur_content_kraka");
      t.$kvZusatzRow = t.$elm.find("#lur_content_kvzusatz");
      t.$renteRow = t.$elm.find("#lur_content_rente");
      t.$anKrankenkasse = t.$elm.find("#lur_content_ankraka");
      t.$inputPrice = t.$elm.find("#price");
      t.$inputPriceUvp = t.$elm.find("#price-uvp");
      t.$inputBruttoLohn = t.$elm.find("#lur_bruttolohn");
      t.$employersshare = t.$elm.find("#lur_employersshare");
      t.$subventionAdd = t.$elm.find("#lur_subvention_add");
      t.$subventionInternet = t.$elm.find("#lur_subvention_internet");
      t.$subventionPhone = t.$elm.find("#lur_subvention_phone");
      t.$selectBundesland = t.$elm.find("#lur_bundesland");
      t.$optionNRW = t.$elm.find('option[value="NRW"]');
      t.$selectBikeType = t.$elm.find(".lur_type");
      t.$kvZusatz = t.$elm.find("#lur_kvzusatz");
      t.$inputGeburtsjahr = t.$elm.find("#lur_gebjahr");
      t.$inputPrivKrankenkassenBeitrag = t.$elm.find("#lur_priv_kassenbeitrag");
      t.$selectRente = t.$elm.find(".lur_rente");
      t.$calcTable = t.$elm.find("#calculation-tables");
      t.$addBike = t.$elm.find(".lur_add_bike");
      t.$addBikeRow = t.$elm.find(".lur_content_row_add");
      t.$bikeRowDummy = t.$elm.find(".lur_content_row_bike").clone();
      t.$bikesPopout = t.$elm.find(".lur_open_popout_bikes");
      t.$openPopout = t.$elm.find(".lur_open_popout");
      t.$versicherung = t.$elm.find("#lur_versicherung");
      t.$leasingRow = t.$elm.find("#leasingRow");
      t.$employersshareMinus = t.$elm.find(".employersshare-minus");
      t.$employersshareMinusValue = t.$employersshareMinus.find(
        ".employersshare-minus-value"
      );
      t.$maxLeasingRateButton = t.$elm.find("#lur_max_bike_price_button");
      t.$takeoverLeasingRateButton = t.$elm.find(
        "#lur_takeover_bike_price_button"
      );

      t.$maxLeasingRateInput = t.$elm.find("#lur_max_bike_price");
      t.$maxLeasingRateResult = t.$elm.find("#lur_max_bike_price_result");
      t.$maxLeasingRateResultNumber = t.$elm.find(
        "#lur_max_bike_price_result_number"
      );
      t.$versRow = t.$elm.find(".versRow").detach();

      // output elements
      t.$outputLeasingMonat = t.$elm.find(".lur_leasing_monat");
      t.$outputLeasingMonatNetto = t.$elm.find("#lur_leasing_monat_netto");
      t.$outputSummeMonat = t.$elm.find(".lur_summe_monat");
      t.$outputSummeMonatNetto = t.$elm.find("#lur_summe_monat_netto");

      t.$outputLeasingUmlage = t.$elm.find("#lur_leasing_umlage");
      // t.$outputErsparnisMonat = t.$elm.find('#lur_ersparnis')
      t.$outputErsparnisProzent = t.$elm.find("#lur_ersparnis_proz");
      t.$outputErsparnisAbsolut = t.$elm.find("#lur_ersparnis_abs");
      t.employersshareStandard = t.$employersshare.val();
      t.$employersshareAdditional = t.$elm.find(
        ".lur_employersshare_additional"
      );

      t.employerssharePercent = t.$elm.data("employersshare-value");
      t.employerssharePercent2 = t.$elm.data("employersshare-value-2");
      t.employersshareBikeCount = t.$elm.data("employersshare-bike-count");
      t.employersshareMultiply = t.$elm.data("employersshare-multiply");
      t.useFullBikeUvpPrice = t.$elm.data("use-full-bike-uvp");

      t.year = parseInt(t.$elm.data("year"));
      if (typeof t.$selectJahr.val() !== "undefined") {
        parseInt((t.year = t.$selectJahr.val()));
      }
    }

    t.getBMF();
  },

  getBMF: function () {
    var t = this;

    t.bmfSteuerRechner = new BmfSteuerRechner();
  },

  bindEvents: function () {
    var t = this,
      price,
      $currentRow;

    t.$switches.on("click", function () {
      jQuery(this).toggleClass("opt-yes");
      t.calculate();
    });

    t.$submit.on("click", function (e) {
      e.preventDefault();
      t.calculate();
    });

    jQuery(document).on("click", ".lur_open_popout", function (e) {
      e.preventDefault();
      jQuery(".lur_popout")
        .not(jQuery(this).children(".lur_popout"))
        .removeClass("active");

      jQuery(".lur_popout--" + jQuery(this).data("ref")).toggleClass("active");
    });

    jQuery(document).on("click", ".lur_popout", function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    jQuery(document).on("click", ".close", function (e) {
      e.preventDefault();
      jQuery(this).parents(".lur_popout").removeClass("active");
      e.stopPropagation();
      return false;
    });

    jQuery(document).on("click", function (e) {
      if (
        !jQuery(e.target).hasClass("lur_open_popout") &&
        jQuery(e.target).parents(".lur_open_popout").length <= 0
      ) {
        jQuery(".lur_popout").removeClass("active");
      }
    });

    t.$switchKinder.on("click", function () {
      if (jQuery(this).hasClass("opt-yes")) {
        t.$anzahlKinder.show();
        t.$anzahlKinder2.show();
        t.$inputKinder2.val(1);
      } else {
        t.$anzahlKinder.hide();
        t.$anzahlKinder2.hide();
        t.$inputKinder2.val(0);
      }
      t.calculate();
    });

    t.$switchReverse.on("click", function () {
      if (jQuery(this).hasClass("opt-yes")) {
        t.$calcReverse.show();
      } else {
        t.$calcReverse.hide();
      }
    });

    t.$switchBeamte.on("click", function () {
      t.calculate();
    });

    t.$selectSteuerklasse.on("change", function () {
      if (t.$selectSteuerklasse.val() == 5) {
        t.$rowSteuerFaktor.show();
      } else {
        t.$rowSteuerFaktor.hide();
      }
    });

    t.$selectKrankenkasse.on("change", function () {
      if (t.$selectKrankenkasse.val() == 1) {
        t.$anKrankenkasse.hide();
      } else {
        t.$anKrankenkasse.show();
      }
    });

    t.$selectJahr.on("change", function () {
      t.year = t.$selectJahr.val();
      if (t.year >= 2018) {
        t.$kvZusatz.val(1);
        t.$elm.removeClass("jahr2017");
        t.$elm.addClass("jahr2018");
      } else {
        t.$kvZusatz.val(1.1);
        t.$elm.removeClass("jahr2018");
        t.$elm.addClass("jahr2017");
      }
      t.getBMF();
    });

    t.$versicherung.on("change", function () {
      t.checkVers();
      t.paket = t.$versicherung.val();
      var maxBikePrice = t.getPackageValue("maxBikePrice");
      jQuery(".lur_bike_price").attr("max", maxBikePrice);
    });
    t.$elm.addClass("paket-" + t.$versicherung.val());
    t.checkVers();

    t.$addBike.on("click", function (e) {
      e.preventDefault();
      $currentRow = t.$bikeRowDummy.clone();
      $currentRow.insertAfter(jQuery(".lur_content_row_bike").last());
      var count = t.$elm.find(".bikeNo").length;
      $currentRow.find(".bikeNo").html("# " + count);
      t.testBikeCount();
      t.checkVers();
      t.calculate();
    });

    jQuery(document).on("change", ".lur_bike_price", function () {
      var priceMax = jQuery(this).attr("max");
      var priceMin = jQuery(this).attr("min");
      if (parseFloat(jQuery(this).val()) < parseFloat(priceMin)) {
        jQuery(this).attr("value", priceMin).val(priceMin);
      }
      if (parseFloat(jQuery(this).val()) > parseFloat(priceMax)) {
        jQuery(this).attr("value", priceMax).val(priceMax);
      }
    });

    jQuery(document).on("keyup change", ".lur_bike_price", function () {
      jQuery(this)
        .parents(".lur_content_row")
        .find(".lur_bike_price-uvp")
        .val(jQuery(this).val());
    });

    jQuery(document).on("change", ".lur_bike_price-uvp", function () {
      var price = jQuery(this)
        .parents(".lur_content_row")
        .find(".lur_bike_price")
        .val();
      if (parseFloat(jQuery(this).val()) < parseFloat(price)) {
        jQuery(this).attr("value", price).val(price);
      }
    });

    jQuery(document).on(
      "keyup change",
      "#lur_main_layout input, #lur_main_layout select",
      function () {
        t.calculate();
      }
    );

    jQuery(document).on("click", ".lur_remove_bike", function (e) {
      e.preventDefault();
      jQuery(this).parents(".lur_content_row_bike").remove();
      t.testBikeCount();
      t.calculate();
    });

    jQuery(document).on("keyup change", ".lur_bike_count", function (e) {
      var oldval =
        typeof jQuery(this).data("oldval") !== "undefined"
          ? jQuery(this).data("oldval")
          : 1;
      var toomany = t.testBikeCount();
      if (toomany) {
        jQuery(this).attr("value", oldval).val(oldval);
      } else {
        jQuery(this).data("oldval", jQuery(this).val());
      }
      t.testBikeCount();
      t.calculate();
    });
    t.testBikeCount();

    t.$maxLeasingRateButton.on("click", function (e) {
      e.preventDefault();
      t.getMaxBikePrice(parseFloat(t.$maxLeasingRateInput.val()));
      return false;
    });

    t.$takeoverLeasingRateButton.on("click", function (e) {
      e.preventDefault();
      const bikeCount = t.$elm.find(".lur_bike_price").length;
      if (
        !confirm(
          "Es werden die aktuellen Einstellungen für das erste Fahrrad übernommen und alle weiteren Fahrräder gelöscht. Sind Sie sicher?"
        )
      ) {
        return false;
      }

      t.$elm.find(".lur_bike_price").each(function (i, elm) {
        if (i > 0) {
          jQuery(elm).parents(".lur_content_row_bike").remove();
        } else {
          jQuery(elm).val(t.maxBikePrice).trigger("change");
        }
      });

      return false;
    });

    t.$maxLeasingRateInput.on("change", function () {
      t.$maxLeasingRateResult.hide();
    });
  },

  checkVers: function () {
    var t = this,
      paket = t.$versicherung.val();

    var zuschuss = t.$elm.data(
      "agzuschuss-" + t.$versicherung.val().toLowerCase()
    );
    if (t.employersshareStandard <= 0) {
      if (typeof zuschuss !== "undefined" && parseFloat(zuschuss) > 0) {
        t.$employersshare.val(zuschuss);
      } else {
        t.$employersshare.val(0);
      }
    }

    t.$elm
      .removeClass("paket-premiumPlus")
      .removeClass("paket-premium")
      .removeClass("paket-basis")
      .removeClass("paket-alt");
    t.$elm.addClass("paket-" + paket);

    if (paket == "alt") {
      t.$elm.find(".lur_content_col_type").removeClass("nodisplay");
    } else {
      t.$elm.find(".lur_content_col_type").addClass("nodisplay");
    }
  },

  testBikeCount: function () {
    var t = this,
      toomany,
      bikeCount = t.getBikeCount();

    if (bikeCount >= t.maxBikes) {
      t.$addBikeRow.addClass("nodisplay");
    } else {
      t.$addBikeRow.removeClass("nodisplay");
    }

    toomany = bikeCount > t.maxBikes;

    if (toomany) {
      t.$bikesPopout.addClass("active");

      setTimeout(function () {
        t.$bikesPopout.removeClass("active");
      }, 2000);
    }

    return toomany;
  },

  resetParams: function () {
    var t = this;

    t.setEingabeparameter();
    t.getBikePrices();
  },

  setEingabeparameter: function () {
    var t = this,
      b = t.bmfSteuerRechner,
      steuerFaktor,
      currentYear;

    b.initParams();

    // Parameter für Steuerrechner
    if (typeof t.$selectSteuerklasse !== "undefined") {
      steuerFaktor = t.$inputSteuerFaktor.val().replace(",", ".");
      b.AF = t.$selectSteuerklasse.val() == 5 ? 1 : 0;
      b.F = t.$selectSteuerklasse.val() == 5 ? steuerFaktor : 1;
    } else {
      b.AF = 0;
      b.F = 1;
    }

    if (typeof t.$switchKirche !== "undefined") {
      t.kirche = t.$switchKirche.hasClass("opt-yes") ? 1 : 0;
      b.R = t.kirche;
    } else {
      b.R = 1;
      t.kirche = 1;
    }

    if (typeof t.$switchUst !== "undefined") {
      t.ust = t.$switchUst.hasClass("opt-yes") ? 0 : 1;
      if (!t.$switchUst.hasClass("opt-yes")) t.$elm.addClass("with-ust");
      else t.$elm.removeClass("with-ust");
    } else {
      t.ust = 0;
    }

    if (typeof t.$inputBruttoLohn !== "undefined") {
      if (
        t.$inputBruttoLohn.val() !== "" &&
        typeof t.$inputBruttoLohn.val() !== "undefined"
      ) {
        t.lohnBrutto = parseFloat(t.$inputBruttoLohn.val().replace(",", "."));
      } else {
        t.lohnBrutto = 0;
      }
      b.RE4 = t.lohnBrutto * 100;
    } else {
      b.RE4 = typeof t.lohnBrutto !== "undefined" ? t.lohnBrutto : 3000;
    }

    if (isNaN(t.employersshareBikeCount)) {
      t.employersshareBikeCount = t.getBikeCount();
    }
    if (typeof t.$employersshare !== "undefined") {
      if (
        t.$employersshare.val() !== "" &&
        typeof t.$employersshare.val() !== "undefined"
      ) {
        var employersshareBikeCount =
          t.employersshareBikeCount < t.getBikeCount()
            ? t.employersshareBikeCount
            : t.getBikeCount();

            if (t.employersshareMultiply === 0) {
              t.employersshare =
              parseFloat(t.$employersshare.val().replace(",", "."));
            } else {
              t.employersshare =
              employersshareBikeCount *
              parseFloat(t.$employersshare.val().replace(",", "."));
            }
      } else {
        t.employersshare = 0;
      }
    } else {
      t.employersshare = 0;
    }

    t.employersshareAdditional = 0;
    if (
      typeof t.$employersshareAdditional !== "undefined" &&
      t.$employersshareAdditional.length > 0
    ) {
      t.$employersshareAdditional.each(function (i, elm) {
        var val = jQuery(elm).find("input").val();

        if (val !== "" && typeof val !== "undefined") {
          t.employersshareAdditional += parseFloat(val.replace(",", "."));
        }
      });
    }

    // SUBVENTIONS

    if (typeof t.$subventionAdd !== "undefined") {
      if (
        t.$subventionAdd.val() !== "" &&
        typeof t.$subventionAdd.val() !== "undefined"
      ) {
        t.subventionAdd = parseFloat(t.$subventionAdd.val().replace(",", "."));
      } else {
        t.subventionAdd = 0;
      }
    } else {
      t.subventionAdd = 0;
    }

    if (typeof t.$subventionInternet !== "undefined") {
      if (
        t.$subventionInternet.val() !== "" &&
        typeof t.$subventionInternet.val() !== "undefined"
      ) {
        t.subventionInternet = parseFloat(
          t.$subventionInternet.val().replace(",", ".")
        );
      } else {
        t.subventionInternet = 0;
      }
    } else {
      t.subventionInternet = 0;
    }

    if (typeof t.$subventionPhone !== "undefined") {
      if (
        t.$subventionPhone.val() !== "" &&
        typeof t.$subventionPhone.val() !== "undefined"
      ) {
        t.subventionPhone = parseFloat(
          t.$subventionPhone.val().replace(",", ".")
        );
      } else {
        t.subventionPhone = 0;
      }
    } else {
      t.subventionPhone = 0;
    }

    t.subvention = t.subventionAdd + t.subventionPhone + t.subventionInternet;

    if (typeof t.$selectSteuerklasse !== "undefined") {
      b.STKL = t.$selectSteuerklasse.val();
      if (b.STKL > 4) {
        b.STKL -= 1;
      }
      if (t.$switchKinder.hasClass("opt-yes")) {
        b.ZKF = t.$inputKinder.val();
      } else {
        b.ZKF = 0;
      }
    } else {
      b.STKL = 1;
      b.ZKF = 0;
    }

    if (typeof t.$selectSteuerklasse !== "undefined") {
      b.PVZ = t.$inputKinder.val() == "0" ? 1 : 0;
    } else {
      b.PVZ = 1;
    }

    if (typeof t.$kvZusatz !== "undefined") {
      t.kvZusatz =
        Math.round(parseFloat(t.$kvZusatz.val().replace(",", ".")) * 100) /
        10000;
    } else {
      t.kvZusatz = Math.round(b.KVZ) / 100;
    }
    b.KVZ = t.kvZusatz * 100;

    b.PKPV = 0; //IRRELEVANT: t.$selectKrankenkasse.val() == 1 ? 0 : parseFloat(t.$inputPrivKrankenkassenBeitrag.val());

    // if(typeof t.$inputGeburtsjahr !== 'undefined') {
    // 	if(t.$inputGeburtsjahr.val() !== '' && typeof t.$inputGeburtsjahr !== 'undefined') t.gebJahr = parseInt(t.$inputGeburtsjahr.val());
    // 	else t.gebJahr = 1980;
    // } else {
    // 	t.gebJahr = typeof t.birthYear !== 'undefined' ? t.birthYear : 1980;
    // }

    currentYear = new Date().getFullYear();
    t.gebJahr = currentYear - 24;
    b.AJAHR = parseFloat(t.gebJahr) + 65;
    b.ALTER1 = currentYear - t.gebJahr > 64 ? 1 : 0;

    if (t.$switchBeamte.hasClass("opt-yes")) {
      t.$krankenkasseRow.hide();
      t.$kvZusatzRow.hide();
      t.$renteRow.hide();
      t.beamte = true;

      b.PKV = 1;
      b.KRV = 2;

      t.$elm.addClass("set_wording_beamte");
    } else {
      t.$krankenkasseRow.show();
      t.$kvZusatzRow.show();
      t.$renteRow.show();
      t.beamte = false;

      if (typeof t.$selectKrankenkasse !== "undefined") {
        b.PKV = t.$selectKrankenkasse.val() - 1;
      } else {
        b.PKV = 0;
      }

      if (typeof t.$selectRente !== "undefined") {
        b.KRV = parseInt(t.$selectRente.val());
      } else {
        b.KRV = 0;
      }

      t.$elm.removeClass("set_wording_beamte");
    }

    if (typeof t.$selectBundesland !== "undefined") {
      t.Bundesland = t.$selectBundesland.val();
    } else {
      t.Bundesland = typeof t.region !== "undefined" ? t.region : "NRW";
    }
    b.PVS = t.Bundesland === "SACHSEN" ? 1 : 0;

    t.paket = t.$versicherung.val();
  },

  calculate: function (firstCalc) {
    var t = this,
      lohnMinusBike,
      agKostenOhneBike,
      agKostenMitBike;

    // Normaler Lohn
    t.resetParams();
    t.versteuerungsgrundlageOhneBike = t.lohnBrutto - t.subvention;
    t.lohnNettoOhneBike = t.getLohnNetto(t.versteuerungsgrundlageOhneBike);
    t.lohnNettoBankOhneBike = t.lohnNettoOhneBike;
    agKostenOhneBike = t.agVers;

    t.steuernOhneBike = t.steuern;
    t.lohnSteuerOhneBike = t.lohnSteuer;
    t.soliOhneBike = t.soli;
    t.kSteuerOhneBike = t.kSteuer;
    t.versOhneBike = t.vers;
    t.kVersOhneBike = t.kVers;
    t.pVersOhneBike = t.pVers;
    t.rVersOhneBike = t.rVers;
    t.aVersOhneBike = t.aVers;
    t.abgabenOhneBike = t.abgaben;

    // Lohn mit E-Bike
    t.resetParams();
    if (t.ust === 1) {
      lohnMinusBike = t.lohnBrutto - t.leasingPriceBrutto;
    } else {
      lohnMinusBike = t.lohnBrutto - t.leasingPriceNetto; // Bruttogehalt nach Umwandlung:
    }
    t.lohnBruttoBarumwandlung =
      lohnMinusBike -
      t.subvention +
      t.employersshare -
      t.valueAddedTax +
      t.employersshareAdditional;
    t.versteuerungsgrundlageMitBike =
      t.lohnBruttoBarumwandlung + t.percentBikePrice;
    t.lohnNettoMitBike = t.getLohnNetto(t.versteuerungsgrundlageMitBike); // Lohn abzüglich Sozialabgaben und Steuern Abgaben
    t.lohnNettoBankMitBike = t.lohnNettoMitBike - t.percentBikePrice; // Auszahlungsbetrag auf Konto
    agKostenMitBike = t.agVers;

    // Leasingpreis per Gehaltsumwandlung
    t.leasingPriceBarumwandlung =
      Math.round((t.lohnNettoBankOhneBike - t.lohnNettoBankMitBike) * 100) /
      100;

    // Berechnung der Ersparnis
    var bikeCount = t.getBikeCount();
    // bikeCount = 1;
    t.reparaturKosten = 400 * bikeCount;
    t.bikesPriceBruttoPlusReparatur = t.bikesPriceBrutto + t.reparaturKosten;
    t.leasingPriceBarumwandlung36 = t.leasingPriceBarumwandlung * 36;
    // console.log({ leasingPriceBarumwandlung36: t.leasingPriceBarumwandlung36 });
    t.ersparnis =
      t.bikesPriceBruttoPlusReparatur - t.leasingPriceBarumwandlung36;
    // console.log({
    //   bikesPriceBruttoPlusReparatur: t.bikesPriceBruttoPlusReparatur,
    //   leasingPriceBarumwandlung36: t.leasingPriceBarumwandlung36,
    // });
    t.ersparnisProz = t.roundit(
      (1 - t.leasingPriceBarumwandlung36 / t.bikesPriceBruttoPlusReparatur) *
        100,
      2
    );

    // change prices
    t.displayNewPrices(firstCalc);
  },

  /*______________ LEASING ___________________*/

  getBikeCount: function () {
    var t = this,
      count,
      bikeCount = 0;

    t.$elm.find(".lur_bike_count").each(function (i, elm) {
      count = parseInt(jQuery(elm).val());
      if (!isNaN(count)) bikeCount += count;
    });

    return bikeCount;
  },

  getBikePrices: function () {
    var t = this,
      bikesPriceBrutto = 0,
      priceUvpBrutto = 0,
      bikesMitVersBrutto = 0,
      versBrutto = 0,
      versNetto = 0,
      versNettoSum = 0,
      versBruttoSum = 0,
      price = 0,
      count = 0,
      $row;

    t.versPraemien = [];

    t.$elm.find(".lur_bike_price").each(function (i, elm) {
      $row = jQuery(elm).parents(".lur_content_row");
      price = parseFloat(jQuery(elm).val().replace(",", "."));
      count = parseInt($row.find(".lur_bike_count").val());
      bikeType = parseInt($row.find(".lur_type").val());

      if (!isNaN(price)) {
        bikesPriceBrutto += price * count;
        var versPraemie = t.getVerspraemie(price, bikeType);
        versNetto = (versPraemie / 1.19) * count;
        if (t.noTaxOnInsurance) {
          var inspection = 5 * 36;
          var versWithoutInspection = versNetto - inspection;
          versBrutto = inspection * 1.19 + versWithoutInspection;
        } else {
          versBrutto = versNetto * 1.19;
        }
        versBruttoSum += versBrutto;
        versNettoSum += versNetto;
        bikesMitVersBrutto += bikesPriceBrutto + versBrutto;
        t.versPraemien.push({ netto: versNetto / 36, brutto: versBrutto / 36 });
      }
    });
    t.versBrutto = versBruttoSum;
    t.versNetto = versNettoSum;
    t.bikesPriceBrutto = bikesPriceBrutto;
    t.bikesMitVersBrutto = bikesMitVersBrutto;

    t.$elm.find(".lur_bike_price-uvp").each(function (i, elm) {
      price = parseFloat(jQuery(elm).val().replace(",", "."));
      count = parseInt(
        jQuery(elm).parents(".lur_content_row").find(".lur_bike_count").val()
      );
      if (!isNaN(price)) priceUvpBrutto += price * count;
    });
    t.bikesPriceUvpBrutto = priceUvpBrutto;

    // grundlage
    t.bikesPriceNetto = t.bikesPriceBrutto / 1.19;
    t.priceNettoVers = t.bikesMitVersBrutto / 1.19;

    t.getLeasingPrice();
    // 1% vom Fahrradneupreis auf volle hundert abgerundet

    t.quarterBikesPriceUvpBrutto = t.bikesPriceUvpBrutto / 4;

    if (t.useFullBikeUvpPrice) {
      t.fractionBikesPriceUvpBrutto = Math.floor(t.bikesPriceUvpBrutto / 100);
    } else {
      t.fractionBikesPriceUvpBrutto = Math.floor(
        t.quarterBikesPriceUvpBrutto / 100
      );
    }
    t.percentBikePrice = Math.floor(t.quarterBikesPriceUvpBrutto / 100);

    t.benefitBase = t.percentBikePrice * 100;

    function hideOrShowEmployersshareMinus(value) {
      if (t.subtractEmployersShareInResult) {
        t.$employersshareMinusValue.html(
          t.germanFormat(-Math.round(value * 100) / 100) + " &euro;"
        );
        if (value > 0) {
          t.$employersshareMinus.css("display", "table-row");
        } else {
          t.$employersshareMinus.css("display", "none");
        }
      }
    }

    if (t.employersshareType === 3) {
      var percentEployerShare = t.employerssharePercent / 100;
      t.employersshare =
        Math.round(t.leasingPriceNetto * percentEployerShare * 100) / 100;
      t.$employersshare.val(t.employersshare).attr("value", t.employersshare);
    }

    var percentEployerShareVers = t.employerssharePercent / 100;
    if (t.employersshareType === 4) {
      var versPerMonth = versNettoSum / 36;
      var partOfVersPerMonth = versPerMonth * percentEployerShareVers;
      t.employersshare = Math.round(partOfVersPerMonth * 100) / 100;
      t.$employersshare.val(t.employersshare).attr("value", t.employersshare);
    }

    if (t.employersshareType === 8) {
      var percentEployerShare = t.employerssharePercent2 / 100;
      t.employersshare =
        Math.round(t.priceNettoMonth * percentEployerShare * 100) / 100;
      t.$employersshare.val(t.employersshare).attr("value", t.employersshare);

      var percentEployerShareVers = t.employerssharePercent / 100;
      var versPerMonth = versNettoSum / 36;
      var partOfVersPerMonth = versPerMonth * percentEployerShareVers;
      t.employersshare =
        Math.round((t.employersshare + partOfVersPerMonth) * 100) / 100;
      t.$employersshare.val(t.employersshare).attr("value", t.employersshare);
    }

    if (t.employersshareType === 5) {
      var partOfTotal = t.bikesPriceUvpBrutto * percentEployerShareVers;
      t.employersshare = Math.round(partOfTotal * 100) / 100;
      t.$employersshare.val(t.employersshare).attr("value", t.employersshare);
    }

    t.valueAddedTax = 0;
    if (t.subtractTaxAfterEmployershare === 1) {
      t.valueAddedTax =
        Math.round(((t.fractionBikesPriceUvpBrutto * 19) / 119) * 100) / 100;
    }

    t.leasingPriceNettoMinusEmployersshare =
      t.leasingPriceNetto - t.employersshare;
    t.leasingPriceBruttoMinusEmployersshare =
      t.leasingPriceNettoMinusEmployersshare * 1.19;
    hideOrShowEmployersshareMinus(t.employersshare);
  },

  getMaxBikePrice: function (limitRate) {
    var t = this;
    if (isNaN(limitRate) || limitRate < 0) return;

    var bikeBruttoStart = 356;
    var bikeBruttoLimit = 20000;
    var bikeBrutto = bikeBruttoStart;
    var leasingRate = 0;
    var maxBikePrice = 0;
    while (leasingRate < limitRate && bikeBrutto < bikeBruttoLimit) {
      bikeBrutto++;
      var leasingPrice = ((bikeBrutto / 1.19) * 3.27) / 100;
      var vers = t.getVerspraemie(bikeBrutto, 0) / 1.19;
      var versMonth = vers / 36;
      leasingRate = leasingPrice + versMonth;
      if (leasingRate < limitRate) maxBikePrice = bikeBrutto;
    }

    if (maxBikePrice) {
      t.$maxLeasingRateResultNumber.text(t.germanFormat(maxBikePrice));
      t.$maxLeasingRateResult.show();
    }
    t.maxBikePrice = maxBikePrice;
    return maxBikePrice;
  },

  getVerspraemie: function (bikePrice, bikeType) {
    var t = this,
      i,
      levels,
      level,
      lastLevel,
      firstLevel,
      verspraemieNetto = 450;

    if (t.paket === "alt") {
      switch (true) {
        case bikeType === 1:
          switch (true) {
            case bikePrice <= 4760:
              verspraemieNetto = 450;
              break;
            case bikePrice > 4760 && bikePrice <= 6000:
              verspraemieNetto = 480;
              break;
            case bikePrice > 6000 && bikePrice <= 8000:
              verspraemieNetto = 580;
              break;
            case bikePrice > 8000:
              verspraemieNetto = 670;
              break;
          }
          break;
        case bikeType === 0:
          switch (true) {
            case bikePrice <= 4760:
              verspraemieNetto = 450;
              break;
            case bikePrice > 4760 && bikePrice <= 6000:
              verspraemieNetto = 550;
              break;
            case bikePrice > 6000 && bikePrice <= 8000:
              verspraemieNetto = 670;
              break;
            case bikePrice > 8000:
              verspraemieNetto = 770;
              break;
          }
          break;
        case bikeType === 2:
          verspraemieNetto = 510;
          break;
      }
    } else {
      levels = t.getPackageValue("leasingInsurancePrices");

      lastLevel = levels[levels.length - 1];
      firstLevel = levels[0];
      verspraemieNetto = firstLevel.value;
      if (bikePrice > firstLevel.upto) {
        for (i = levels.length - 1; i >= 0; i--) {
          level = levels[i];
          if (bikePrice <= level.upto) verspraemieNetto = level.value;
        }
      }
      if (bikePrice > lastLevel.upto) verspraemieNetto = lastLevel.value;
    }
    // console.log(levels);

    verspraemieBrutto = verspraemieNetto * 1.19;

    return verspraemieBrutto;
  },

  getPackageValue: function (attribute) {
    var t = this;
    var value = t.verspraemie[0][attribute];
    for (var v = 0; v < t.verspraemie.length; v++) {
      if (t.paket === t.verspraemie[v]["name"]) {
        value = t.verspraemie[v][attribute];
      }
    }
    return value;
  },

  getLeasingPrice: function () {
    var t = this;

    // leasingfaktor
    t.getLeasingFactor();

    // leasingPrice
    t.priceVersNettoMonth = t.versNetto / 36;
    t.priceVersBruttoMonth = t.versBrutto / 36;
    t.priceNettoMonth = t.bikesPriceNetto * (t.leasingFactor / 100);
    t.priceBruttoMonth = t.priceNettoMonth * 1.19;
    t.leasingPriceNetto = t.priceNettoMonth + t.priceVersNettoMonth;
    t.leasingPriceBrutto = t.priceBruttoMonth + t.priceVersBruttoMonth;
    // console.log({
    //   versNetto: t.versNetto,
    //   priceVersNettoMonth: t.priceVersNettoMonth,
    //   priceNettoMonth: t.priceNettoMonth,
    //   priceBruttoMonth: t.priceBruttoMonth,
    //   leasingPriceNetto: t.leasingPriceNetto,
    //   leasingPriceBrutto: t.leasingPriceBrutto,
    // });
  },

  getLeasingFactor: function () {
    var t = this,
      i,
      levels,
      level,
      lastLevel,
      firstLevel,
      leasingFactor = 3.742;

    if (t.calctype != 1) {
      levels = t.factorObject[t.paket];
      lastLevel = levels[levels.length - 1];
      firstLevel = levels[0];
      leasingFactor = firstLevel.factor;

      var priceToCompareWith = t.priceNettoVers;
      if (t.calctype == 2 || t.year >= 2018) {
        priceToCompareWith = t.bikesPriceNetto;
      }

      if (priceToCompareWith > firstLevel.upto) {
        for (i = levels.length - 1; i >= 0; i--) {
          level = levels[i];
          if (priceToCompareWith <= level.upto) leasingFactor = level.factor;
        }
      }
      if (priceToCompareWith > lastLevel.upto) leasingFactor = lastLevel.factor;
    } else if (t.calctype == 1) {
      switch (true) {
        case t.priceNettoVers <= 1000:
          leasingFactor = 3.6895;
          break;
        case t.priceNettoVers > 1000 && t.priceNettoVers <= 2000:
          leasingFactor = 3.5475;
          break;
        case t.priceNettoVers > 2000 && t.priceNettoVers <= 3000:
          leasingFactor = 3.4175;
          break;
        case t.priceNettoVers > 3000 && t.priceNettoVers <= 5000:
          leasingFactor = 3.3575;
          break;
        case t.priceNettoVers > 5000 && t.priceNettoVers <= 7500:
          leasingFactor = 3.3175;
          break;
        case t.priceNettoVers > 7500 && t.priceNettoVers <= 15000:
          leasingFactor = 3.2875;
          break;
        case t.priceNettoVers > 15000 && t.priceNettoVers <= 25000:
          leasingFactor = 3.2375;
          break;
      }
    }

    t.leasingFactor = parseFloat(leasingFactor);
    // console.log({
    //   leasingFactor: t.leasingFactor,
    //   object: t.factorObject[t.paket],
    //   paket: t.paket,
    // });
  },

  /*______________ LOHN UND NEBENKOSTEN ___________________*/

  getLohnNetto: function (lohnBrutto) {
    var t = this,
      b = t.bmfSteuerRechner,
      lohnBrutto,
      lohnNetto;

    t.getSteuern(lohnBrutto);

    // steuerrechner
    t.getVers2025(lohnBrutto);

    t.abgaben = t.steuern + t.vers; // Alle Abgaben
    lohnNetto = lohnBrutto - t.abgaben;
    return lohnNetto;
  },

  getSteuern: function (lohnBrutto) {
    var t = this,
      b = t.bmfSteuerRechner,
      bikesPriceBrutto,
      bikesPrice,
      kSteuerSatz;

    // STEUERN
    b.RE4 = lohnBrutto * 100;

    b.func_LST();

    t.lohnSteuer = Math.round(b.LSTLZZ) / 100;
    t.soli = Math.round(b.SOLZLZZ) / 100;

    kSteuerSatz =
      t.Bundesland === "BW" || t.Bundesland === "BAYERN" ? 0.08 : 0.09;
    if (t.kirche === 1) t.kSteuer = Math.floor(b.BK * kSteuerSatz) / 100;
    else t.kSteuer = 0;

    //(Lohnsteuer, Solidaritätszuschlag, Kirchensteuer)
    t.steuern = t.lohnSteuer + t.soli + t.kSteuer;
  },

  // https://www.tk.de/resource/blob/2187234/93573cf0ff97502f90b20dea0a4fd168/beitragstabelle-2025-data.pdf
  getVers2025: function (lohnBrutto) {
    var t = this;
    var b = t.bmfSteuerRechner;

    // Beitragssätze
    var aVersSatz = 0.026; // Arbeitslosenversicherung 2,60% 2025
    var aVersSatzAn = aVersSatz / 2; // hälfte wird von Arbeitnehmer getragen

    var pVersSatz = 0.042; // 4% Pflegeversicherung 2025 ab Juli
    var pVersSachsen = 0; // + 0% für Sachsen
    var pVersSatzAg = 0.018; // 1,8% Arbeitgeberanteil
    var pVersSatzAn = pVersSatz - pVersSatzAg; // 1,8% wird von Arbeitnehmer getragen
    var pVersKinderAbzug = 0;
    var childrenAfterFirst = 0;
    var children = t.$inputKinder2.val();
    var kinderAbzugJeKind = 0.0025;
    var maxKinderAbzug = 5;
    if (children > 0) {
      pVersKinderAbzug = 0.006; // - 0,6% für erstes Kind
      if (children > 1) {
        childrenAfterFirst = children - 1; // + 0,25% für weitere Kinder
        pVersKinderAbzug +=
          kinderAbzugJeKind * Math.min(childrenAfterFirst, maxKinderAbzug);
      }
    }
    pVersKinderAbzug = Math.round(pVersKinderAbzug * 10000) / 10000;
    pVersSatzAn -= pVersKinderAbzug;
    if (b.PVS == 1) pVersSatzAn += pVersSachsen;
    if (b.PVS == 1) pVersSatzAg -= pVersSachsen;
    // var pVersSatzAn = b.PVSATZAN;
    // var pVersSatzAg = b.PVSATZAG;
    var kVersSatz = 0.146; // 14,60% in 2025
    var kVersSatzAn =
      Math.round(((kVersSatz + t.kvZusatz) / 2) * 10000) / 10000; // häfte von Krankenversicherung
    var kVersSatzAg = kVersSatzAn;
    var rVersSatz = 0.186; // 18,60 %
    var rVersSatzAn = rVersSatz / 2; // hälfte wird von Arbeitnehmer getragen;
    // Beitragsbemessungsgrenzen
    var kVersGrenze = 5512.5; // 5.512,50€ in 2025
    var aVersGrenze = 8050; // 8.050 € in 2025
    var aVersGrenzeOst = 8050; //  8.050 € in 2025

    if (b.PKV < 1) {
      // wenn gesetzlich krankenversichert
      // Bemessungsgrundlage Krankenversicherung und Pflegeversicherung
      kpVersGrundlage = lohnBrutto > kVersGrenze ? kVersGrenze : lohnBrutto;

      // Pflegeversicherung Arbeitnehmer
      t.pVers = kpVersGrundlage * pVersSatzAn;
      // Pflegeversicherung Arbeitgeber
      t.agPVers = kpVersGrundlage * pVersSatzAg;

      // Krankenversicherung Arbeitnehmer
      t.kVers = kpVersGrundlage * kVersSatzAn;
    } else {
      // wenn privat krankenversichert
      t.kVers = b.PKPV / 100;
    }

    if (b.KRV == 2) {
      t.rVers = 0;
    } else {
      // Bemessungsgrundlage Arbeitslosenversicherung und Rentenversicherung
      arVersGrundlage = lohnBrutto > aVersGrenze ? aVersGrenze : lohnBrutto;
      if (b.KRV == 1)
        arVersGrundlage =
          lohnBrutto > aVersGrenzeOst ? aVersGrenzeOst : lohnBrutto;

      // Rentenversicherung Arbeitnehmer
      t.rVers = arVersGrundlage * rVersSatzAn;

      // Arbeitslosenversicherung Arbeitnehmer
      t.aVers = arVersGrundlage * aVersSatzAn;
    }

    // b.KVSATZAN = kVersSatzAn;
    // b.KVSATZAG = kVersSatzAg;
    // b.PVSATZAN = pVersSatzAn;
    // b.PVSATZAG = pVersSatzAg;

    // Einstellung Kalkulationstyp Sonderregelung
    if (t.calctype === 1 || t.beamte) {
      t.aVers = 0;
      t.rVers = 0;
      t.kVers = 0;
      t.pVers = 0;
    }

    // Versicherungen gesamt (Arbeitslosenversicherung, Rentenversicherung, Krankenversicherung, Pflegeversicherung)
    // Arbeitnehmer
    t.vers = t.aVers + t.rVers + t.kVers + t.pVers;
    // Arbeitgeber
    t.agVers = t.aVers + t.rVers + t.kVers + t.agPVers;
  },

  // https://www.tk.de/firmenkunden/versicherung/beitraege-faq/beitragssaetze/tk-beitragssatz-2023-2073894?tkcm=aaus
  // https://www.tk.de/resource/blob/2141992/75e4a141c20e6559fdce70ec56fb32ef/beitragstabelle-2023-data.pdf
  getVers2023: function (lohnBrutto) {
    var t = this;
    var b = t.bmfSteuerRechner;

    // Beitragssätze
    var aVersSatz = 0.026; // Arbeitslosenversicherung 2,60% 2023
    var aVersSatzAn = aVersSatz / 2; // hälfte wird von Arbeitnehmer getragen

    var pVersSatz = 0.046; // 3,4% Pflegeversicherung 2023 ab Juli
    var pVersSachsen = 0.005; // + 0,05% für Sachsen
    var pVersSatzAn = pVersSatz / 2; // hälfte wird von Arbeitnehmer getragen
    var pVersKinderAbzug = 0;
    var childrenAfterFirst = 0;
    var children = t.$inputKinder2.val();
    var kinderAbzugJeKind = 0.0025;
    var maxKinderAbzug = 5;
    if (children > 0) {
      pVersKinderAbzug = 0.006; // - 0,6% für erstes Kind 2023 ab Juli
      if (children > 1) {
        childrenAfterFirst = children - 1; // + 0,25% für weitere Kinder 2023 ab Juli
        pVersKinderAbzug +=
          kinderAbzugJeKind * Math.min(childrenAfterFirst, maxKinderAbzug);
      }
    }
    pVersKinderAbzug = Math.round(pVersKinderAbzug * 1000000) / 1000000;
    pVersSatzAn -= pVersKinderAbzug;
    if (b.PVS == 1) pVersSatzAn += pVersSachsen;
    var pVersSatzAg = 0.01525;
    if (b.PVS == 1) pVersSatzAg -= pVersSachsen;
    // var pVersSatzAn = b.PVSATZAN;
    // var pVersSatzAg = b.PVSATZAG;
    var kVersSatz = 0.146; // 14,60% in 2023
    var kVersSatzAn =
      Math.round(((kVersSatz + t.kvZusatz) / 2) * 100000) / 100000; // häfte von Krankenversicherung
    var kVersSatzAg = kVersSatzAn;
    var rVersSatz = 0.186; // 18,60 %
    var rVersSatzAn = rVersSatz / 2; // hälfte wird von Arbeitnehmer getragen;
    // Beitragsbemessungsgrenzen
    var kVersGrenze = 4987.5; // 4987.50 € in 2023
    var aVersGrenze = 7300; // 7300 € in 2023
    var aVersGrenzeOst = 7100; // 7100 € in 2023

    if (b.PKV < 1) {
      // wenn gesetzlich krankenversichert
      // Bemessungsgrundlage Krankenversicherung und Pflegeversicherung
      kpVersGrundlage = lohnBrutto > kVersGrenze ? kVersGrenze : lohnBrutto;

      // Pflegeversicherung Arbeitnehmer
      t.pVers = kpVersGrundlage * pVersSatzAn;
      // Pflegeversicherung Arbeitgeber
      t.agPVers = kpVersGrundlage * pVersSatzAg;

      // Krankenversicherung Arbeitnehmer
      t.kVers = kpVersGrundlage * kVersSatzAn;
    } else {
      // wenn privat krankenversichert
      t.kVers = b.PKPV / 100;
    }

    if (b.KRV == 2) {
      t.rVers = 0;
    } else {
      // Bemessungsgrundlage Arbeitslosenversicherung und Rentenversicherung
      arVersGrundlage = lohnBrutto > aVersGrenze ? aVersGrenze : lohnBrutto;
      if (b.KRV == 1)
        arVersGrundlage =
          lohnBrutto > aVersGrenzeOst ? aVersGrenzeOst : lohnBrutto;

      // Rentenversicherung Arbeitnehmer
      t.rVers = arVersGrundlage * rVersSatzAn;

      // Arbeitslosenversicherung Arbeitnehmer
      t.aVers = arVersGrundlage * aVersSatzAn;
    }

    // b.KVSATZAN = kVersSatzAn;
    // b.KVSATZAG = kVersSatzAg;
    // b.PVSATZAN = pVersSatzAn;
    // b.PVSATZAG = pVersSatzAg;

    // Einstellung Kalkulationstyp Sonderregelung
    if (t.calctype === 1 || t.beamte) {
      t.aVers = 0;
      t.rVers = 0;
      t.kVers = 0;
      t.pVers = 0;
    }

    // Versicherungen gesamt (Arbeitslosenversicherung, Rentenversicherung, Krankenversicherung, Pflegeversicherung)
    // Arbeitnehmer
    t.vers = t.aVers + t.rVers + t.kVers + t.pVers;
    // Arbeitgeber
    t.agVers = t.aVers + t.rVers + t.kVers + t.agPVers;
  },

  // https://www.tk.de/firmenkunden/versicherung/beitraege-faq/beitragssaetze/tk-beitragssatz-2020-2073894
  // https://www.tk.de/resource/blob/2113704/a12b6924abd42f5f64fde6a4bd80740d/beitragstabelle-2022-data.pdf
  getVers2022: function (lohnBrutto) {
    var t = this;
    var b = t.bmfSteuerRechner;

    // Beitragssätze
    var aVersSatz = 0.024; // Arbeitslosenversicherung 2,40% 2022
    var aVersSatzAn = aVersSatz / 2; // hälfte wird von Arbeitnehmer getragen
    var pVersSatz = 0.0305; // 3,05% Pflegeversicherung 2022
    var pVersKinderlos = 0.0035; // + 0,35% für Kinderlose 2022
    var pVersSachsen = 0.005; // + 0,05% für Sachsen
    var pVersSatzAn = pVersSatz / 2; // hälfte wird von Arbeitnehmer getragen
    if (b.ZKF == 0 && b.ALTER1 >= 23) pVersSatzAn += pVersKinderlos;
    if (b.PVS == 1) pVersSatzAn += pVersSachsen;
    var pVersSatzAg = 0.01525;
    if (b.PVS == 1) pVersSatzAg -= pVersSachsen;
    var kVersSatz = 0.146; // 14,60% in 2022
    var kVersSatzAn = (kVersSatz + t.kvZusatz) / 2; // häfte von Krankenversicherung
    var rVersSatz = 0.186; // 18,60 %
    var rVersSatzAn = rVersSatz / 2; // hälfte wird von Arbeitnehmer getragen;
    // Beitragsbemessungsgrenzen
    var kVersGrenze = 4837.5; // 4837.50€ in 2022
    var aVersGrenze = 7050; // 7050€ in 2022
    var aVersGrenzeOst = 6750; // 6750 in 2022

    if (b.PKV < 1) {
      // wenn gesetzlich krankenversichert
      // Bemessungsgrundlage Krankenversicherung und Pflegeversicherung
      kpVersGrundlage = lohnBrutto > kVersGrenze ? kVersGrenze : lohnBrutto;

      // Pflegeversicherung Arbeitnehmer
      t.pVers = kpVersGrundlage * pVersSatzAn;
      // Pflegeversicherung Arbeitgeber
      t.agPVers = kpVersGrundlage * pVersSatzAg;

      // Krankenversicherung Arbeitnehmer
      t.kVers = kpVersGrundlage * kVersSatzAn;
    } else {
      // wenn privat krankenversichert
      t.kVers = b.PKPV / 100;
    }

    if (b.KRV == 2) {
      t.rVers = 0;
    } else {
      // Bemessungsgrundlage Arbeitslosenversicherung und Rentenversicherung
      arVersGrundlage = lohnBrutto > aVersGrenze ? aVersGrenze : lohnBrutto;
      if (b.KRV == 1)
        arVersGrundlage =
          lohnBrutto > aVersGrenzeOst ? aVersGrenzeOst : lohnBrutto;

      // Rentenversicherung Arbeitnehmer
      t.rVers = arVersGrundlage * rVersSatzAn;

      // Arbeitslosenversicherung Arbeitnehmer
      t.aVers = arVersGrundlage * aVersSatzAn;
    }

    // Einstellung Kalkulationstyp Sonderregelung
    if (t.calctype === 1 || t.beamte) {
      t.aVers = 0;
      t.rVers = 0;
      t.kVers = 0;
      t.pVers = 0;
    }

    // Versicherungen gesamt (Arbeitslosenversicherung, Rentenversicherung, Krankenversicherung, Pflegeversicherung)
    // Arbeitnehmer
    t.vers = t.aVers + t.rVers + t.kVers + t.pVers;
    // Arbeitgeber
    t.agVers = t.aVers + t.rVers + t.agPVers + t.kVers;
  },

  /*______________ VALIDATION ___________________*/

  validate: function () {
    var t = this,
      d,
      n,
      bruttolohn = t.$inputBruttoLohn.val().replace(",", "."),
      error,
      employersshare,
      steuerFaktor;

    t.$inputPrice.addClass("error");
    t.$inputBruttoLohn.addClass("error");
    t.$selectBundesland.addClass("error");
    t.$inputSteuerFaktor.addClass("error");
    t.$inputKinder.addClass("error");
    if (!t.$employersshare.attr("disabled"))
      t.$employersshare.addClass("error");
    error = false;
    // t.$inputGeburtsjahr.addClass('error');

    // price
    if (t.$inputPrice.val() == "") {
      //if(!inputchange) alert('Bitte die Angabe f\u00fcr den Neupreis pr\u00fcfen');
      error = true;
    } else {
      t.$inputPrice.removeClass("error");
    }

    // bruttolohn
    if (bruttolohn <= 0 || isNaN(bruttolohn)) {
      //if(!inputchange) alert('Bitte die Angabe f\u00fcr das Monatsbruttogehalt pr\u00fcfen');
      error = true;
    } else {
      t.$inputBruttoLohn.removeClass("error");
    }

    // steuerklasse
    steuerFaktor = parseFloat(t.$inputSteuerFaktor.val().replace(",", "."));
    if (
      t.$selectSteuerklasse.val() == 5 &&
      (steuerFaktor <= 0 || steuerFaktor > 1 || isNaN(steuerFaktor))
    ) {
      //if(!inputchange) alert('Der Wert des Faktors muss gr\u00f6\u00dfer 0 und kleiner 1 sein. Maximal auf drei Nachkommastellen genau.');
      error = true;
    } else {
      t.$inputSteuerFaktor.removeClass("error");
    }

    if (
      typeof t.$employersshare !== "undefined" &&
      typeof t.$employersshare.val() !== "undefined"
    ) {
      employersshare = parseFloat(t.$employersshare.val().replace(",", "."));
    }
    if (
      typeof employersshare !== "undefined" &&
      !t.$employersshare.attr("disabled") &&
      (isNaN(employersshare) || employersshare < 0)
    ) {
      error = true;
    } else {
      t.$employersshare.removeClass("error");
    }

    // kirchensteuer
    if (
      t.$switchKirche.hasClass("opt-yes") &&
      t.$selectBundesland.val() === "WAHL"
    ) {
      //if(!inputchange) alert('Bitte ein Bundesland aus der Selectbox ausw\u00e4hlen!');
      error = true;
    }

    // bundesland
    if (t.$selectBundesland.prop("selectedIndex") === 0) {
      error = true;
    } else {
      t.$selectBundesland.removeClass("error");
    }

    // krankenversicherung
    if (
      t.$inputPrivKrankenkassenBeitrag.val() < 0 ||
      t.$inputPrivKrankenkassenBeitrag.val() === NaN ||
      t.$inputPrivKrankenkassenBeitrag.val() === ""
    ) {
      //if(!inputchange) alert('Der Arbeitnehmerbeitrag zur privaten Krankenkasse muss positiv sein!');
      //error = true;
    }

    // kinder?
    if (
      t.$switchKinder.hasClass("opt-yes") &&
      (t.$inputKinder.val() === NaN || t.$inputKinder.val() < 0)
    ) {
      //if(!inputchange) alert('Bitte kontrollieren Sie die Anzahl der Kinderfeibetr\u00e4ge (Schrittweite: 0.5).');
      error = true;
    } else {
      t.$inputKinder.removeClass("error");
    }

    if (error) return false;
    return true;
  },

  /*______________ TABLE ___________________*/

  displayNewPrices: function (firstCalc) {
    var t = this,
      bikesPriceBrutto,
      bikesPrice,
      $versRow,
      $insertAfter,
      versBrutto,
      versNetto,
      summe,
      summeNetto;

    // Leasingpreis ohne Barumwandlung
    leasingPrice =
      t.germanFormat(t.extendDecimalNumbers(t.priceBruttoMonth)) + " &euro;";

    leasingPriceNetto =
      t.germanFormat(t.extendDecimalNumbers(t.priceNettoMonth)) + " &euro;";
    t.$outputLeasingMonat.html(leasingPrice);
    t.$outputLeasingMonatNetto.html(leasingPriceNetto);

    t.$elm.find(".versRow").remove();
    $insertAfter = t.$leasingRow;
    jQuery.each(t.versPraemien, function (i, vers) {
      versBrutto =
        t.germanFormat(t.extendDecimalNumbers(vers.brutto)) + " &euro;";
      versNetto =
        t.germanFormat(t.extendDecimalNumbers(vers.netto)) + " &euro;";

      $versRow = t.$versRow.clone();
      $versRow.find(".lur_vers_monat").html(versBrutto);
      $versRow.find(".bikeNoFooter").html(i + 1);
      $versRow.find(".lur_versmonat_netto").html(versNetto);
      $versRow.insertAfter($insertAfter);
      $insertAfter = $versRow;
    });

    if (t.subtractEmployersShareInResult) {
      summe =
        t.extendDecimalNumbers(t.leasingPriceBruttoMinusEmployersshare) +
        " &euro;";
      summeNetto =
        t.extendDecimalNumbers(t.leasingPriceNettoMinusEmployersshare) +
        " &euro;";
    } else {
      summe = t.extendDecimalNumbers(t.leasingPriceBrutto) + " &euro;";
      summeNetto = t.extendDecimalNumbers(t.leasingPriceNetto) + " &euro;";
    }
    t.$outputSummeMonat.html(t.germanFormat(summe) + " &euro;");
    t.$outputSummeMonatNetto.html(t.germanFormat(summeNetto) + " &euro;");
    // if(!t.$employersshare.attr('disabled'))t.$employersshare.val(t.roundit(t.employersshare,2));

    // Leasingpreis mit Barumwandlung
    if (!firstCalc) {
      if (!t.validate()) {
        t.$outputLeasingUmlage.html("-- &euro;");
        // t.$outputErsparnisMonat.html('-- &euro;');
        t.$outputErsparnisProzent.html("-- %");
        t.$outputErsparnisAbsolut.html("-- &euro;");
      } else {
        t.$outputLeasingUmlage.html(
          t.germanFormat(
            t.extendDecimalNumbers(t.roundit(t.leasingPriceBarumwandlung, 2))
          ) + " &euro;"
        );
        // t.$outputErsparnisMonat.html(t.germanFormat(t.extendDecimalNumbers(t.ersparnis)) + ' &euro;');
        t.$outputErsparnisProzent.html(t.germanFormat(t.ersparnisProz) + "%");
        t.$outputErsparnisAbsolut.html(
          t.germanFormat(t.extendDecimalNumbers(t.ersparnis)) + " &euro;"
        );

        t.$calcTable
          .find("#bike-brutto")
          .find(".value")
          .text(t.germanFormat(t.bikesPriceUvpBrutto));
        t.$calcTable
          .find("#bike-brutto-half")
          .find(".value")
          .text(t.germanFormat(t.quarterBikesPriceUvpBrutto));
        t.$calcTable
          .find("#bike-brutto-2")
          .find(".value")
          .text(t.germanFormat(t.bikesPriceBrutto));
        t.$calcTable
          .find("#benefit-base")
          .find(".value")
          .text(t.germanFormat(t.benefitBase));
        t.$calcTable
          .find("#monetary-benefit, #monetary-benefit-2")
          .find(".value")
          .text(t.germanFormat(t.percentBikePrice));
        t.$calcTable
          .find("#monetary-benefit-3, #monetary-benefit-4")
          .find(".col-1 .value")
          .text(t.germanFormat(0));
        t.$calcTable
          .find("#monetary-benefit-3, #monetary-benefit-4")
          .find(".col-2 .value")
          .text(t.germanFormat(t.percentBikePrice));
        t.$calcTable
          .find("#brutto")
          .find(".value")
          .text(t.germanFormat(t.lohnBrutto));
        t.$calcTable
          .find("#leasing")
          .find(".col-1 .value")
          .text(t.germanFormat(0));
        t.$calcTable
          .find("#leasing")
          .find(".col-2 .value")
          .text(t.germanFormat(t.ust === 1 ? summe : summeNetto));
        t.$calcTable
          .find("#subventions")
          .find(".value")
          .text(t.germanFormat(t.subvention));
        t.$calcTable
          .find("#employersshare")
          .find(".col-1 .value")
          .text(t.germanFormat(0));
        t.$calcTable
          .find("#employersshare")
          .find(".col-2 .value")
          .text(t.germanFormat(t.employersshare));
        t.$calcTable.find(".employersshare").remove();
        t.$employersshareAdditional.each(function (i, elm) {
          t.$employersshareRow = t.$calcTable.find("#employersshare").clone();
          var val = parseFloat(jQuery(elm).find("input").val());
          t.$employersshareRow
            .attr("id", "")
            .attr("class", "employersshare employersshare" + i)
            .find(".col-2 .value")
            .text(t.germanFormat(val));

          t.$employersshareRow.find(".col-1 .value").text(t.germanFormat(0));
          t.$employersshareRow
            .find("td:first-child")
            .text(jQuery(elm).find(".lur_content_label").text());
          t.$calcTable.find("#employersshare").after(t.$employersshareRow);
        });
        t.$calcTable
          .find("#subtract_tax_after_employershare")
          .find(".col-1 .value")
          .text(t.germanFormat(0));
        t.$calcTable
          .find("#subtract_tax_after_employershare")
          .find(".col-2 .value")
          .text(t.germanFormat(t.valueAddedTax));
        t.$calcTable
          .find("#brutto-2")
          .find(".col-1 .value")
          .text(t.germanFormat(t.lohnBrutto));
        t.$calcTable
          .find("#brutto-2")
          .find(".col-2 .value")
          .text(t.germanFormat(t.lohnBruttoBarumwandlung));
        // // ABGABEN
        t.$calcTable
          .find("#tax-base")
          .find(".col-1 .value")
          .text(t.germanFormat(t.versteuerungsgrundlageOhneBike));
        t.$calcTable
          .find("#tax-base")
          .find(".col-2 .value")
          .text(t.germanFormat(t.versteuerungsgrundlageMitBike));

        t.$calcTable
          .find("#taxes")
          .find(".col-1 .value")
          .text(t.germanFormat(t.abgabenOhneBike));
        t.$calcTable
          .find("#taxes")
          .find(".col-2 .value")
          .text(t.germanFormat(t.abgaben));
        t.$calcTable
          .find("#tax")
          .find(".col-1 .value")
          .text(t.germanFormat(t.steuernOhneBike));
        t.$calcTable
          .find("#tax")
          .find(".col-2 .value")
          .text(t.germanFormat(t.steuern));
        t.$calcTable
          .find("#income")
          .find(".col-1 .value")
          .text(t.germanFormat(t.lohnSteuerOhneBike));
        t.$calcTable
          .find("#income")
          .find(".col-2 .value")
          .text(t.germanFormat(t.lohnSteuer));
        t.$calcTable
          .find("#solidarity")
          .find(".col-1 .value")
          .text(t.germanFormat(t.soliOhneBike));
        t.$calcTable
          .find("#solidarity")
          .find(".col-2 .value")
          .text(t.germanFormat(t.soli));
        t.$calcTable
          .find("#church")
          .find(".col-1 .value")
          .text(t.germanFormat(t.kSteuerOhneBike));
        t.$calcTable
          .find("#church")
          .find(".col-2 .value")
          .text(t.germanFormat(t.kSteuer));
        t.$calcTable
          .find("#insurance-contributions")
          .find(".col-1 .value")
          .text(t.germanFormat(t.versOhneBike));
        t.$calcTable
          .find("#insurance-contributions")
          .find(".col-2 .value")
          .text(t.germanFormat(t.vers));
        t.$calcTable
          .find("#pension")
          .find(".col-1 .value")
          .text(t.germanFormat(t.rVersOhneBike));
        t.$calcTable
          .find("#pension")
          .find(".col-2 .value")
          .text(t.germanFormat(t.rVers));
        t.$calcTable
          .find("#health")
          .find(".col-1 .value")
          .text(t.germanFormat(t.kVersOhneBike));
        t.$calcTable
          .find("#health")
          .find(".col-2 .value")
          .text(t.germanFormat(t.kVers));
        t.$calcTable
          .find("#care")
          .find(".col-1 .value")
          .text(t.germanFormat(t.pVersOhneBike));
        t.$calcTable
          .find("#care")
          .find(".col-2 .value")
          .text(t.germanFormat(t.pVers));
        t.$calcTable
          .find("#unemployment")
          .find(".col-1 .value")
          .text(t.germanFormat(t.aVersOhneBike));
        t.$calcTable
          .find("#unemployment")
          .find(".col-2 .value")
          .text(t.germanFormat(t.aVers));

        t.$calcTable
          .find("#netto")
          .find(".col-1 .value")
          .text(t.germanFormat(t.lohnNettoOhneBike));
        t.$calcTable
          .find("#netto")
          .find(".col-2 .value")
          .text(t.germanFormat(t.lohnNettoMitBike));
        t.$calcTable
          .find("#netto-1")
          .find(".col-1 .value")
          .text(t.germanFormat(t.lohnNettoBankOhneBike));
        t.$calcTable
          .find("#netto-1")
          .find(".col-2 .value")
          .text(t.germanFormat(t.lohnNettoBankMitBike));

        t.$calcTable
          .find("#bike-brutto-3")
          .find(".value")
          .text(t.germanFormat(t.annschaffungsPreisVers));
        t.$calcTable
          .find("#netto-2")
          .find(".value")
          .text(t.germanFormat(t.leasingPriceBarumwandlung));
        t.$calcTable
          .find("#total-leasing-36")
          .find(".value")
          .text(t.germanFormat(t.leasingPriceBarumwandlung * 36));
        t.$calcTable
          .find("#price-rest")
          .find(".value")
          .text(t.germanFormat(t.bikeRestwert));
        t.$calcTable
          .find("#bike-brutto-4")
          .find(".value")
          .text(t.germanFormat(t.costsAfterTime));
        t.$calcTable
          .find("#saving-buy")
          .find(".value")
          .text(t.germanFormat(t.savingsBuy));

        t.$calcTable
          .find("#leasing-2")
          .find(".value")
          .text(t.germanFormat(t.leasingPriceBrutto));
        t.$calcTable
          .find("#leasing-umwandlung")
          .find(".value")
          .text(t.germanFormat(t.leasingPriceBarumwandlung));
        t.$calcTable
          .find("#savings-leasing-monthly")
          .find(".value")
          .text(t.germanFormat(t.ersparnis));
        t.$calcTable
          .find("#savings-leasing-36")
          .find(".value")
          .text(t.germanFormat(t.ersparnis36));
        t.$calcTable
          .find("#savings-leasing-percent")
          .find(".value")
          .text(t.germanFormat(t.ersparnisProz));

        $showTables = jQuery("#show-tables");
        jQuery($showTables.data("show")).addClass("active");
        $showTables.text($showTables.data("text-active"));
      }
    }
  },

  /*______________NUMBER FUNCTIONS___________________*/

  extendDecimalNumbers: function (numberToExtend) {
    var splitNumber = ("" + numberToExtend).split(".");
    if (splitNumber.length == 2 && splitNumber[1].length == 1) {
      return numberToExtend + "0";
    } else if (splitNumber.length == 1) {
      return numberToExtend + ".00";
    }
    return numberToExtend;
  },

  roundit: function (input, digits) {
    return Math.round(input * 100) / Math.pow(10, digits);
  },

  germanFormat: function (number) {
    // var number2 = parseFloat(number);
    var fixedFloat = parseFloat(parseFloat(number).toFixed(2));
    var localString = fixedFloat.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
    });

    return localString;

    // var postComma, preComma, stringReverse, _ref;
    // stringReverse = function(str) {
    // 	return str.split('').reverse().join('');
    // };
    // _ref = number2.toFixed(2).split('.'), preComma = _ref[0], postComma = _ref[1];
    // preComma = stringReverse(stringReverse(preComma).match(/.{1,3}/g).join('.'));
    // return '' + preComma + ',' + postComma;
  },
};
