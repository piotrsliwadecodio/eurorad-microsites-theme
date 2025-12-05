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

// *******************************
// BmfSteuerRechner
// *******************************
var BmfSteuerRechner = function (elm) {
  this.init(elm);
};
BmfSteuerRechner.prototype = {
  // initialize the whole stuff
  init: function (elm) {
    var t = this;
    t.$elm = elm;

    t.debugmode = false;
    t.prepareDataObject();
  },
  prepareDataObject: function () {
    const t = this;

    // *******************************
    // * EINGANGSPARAMETER
    // *******************************
    t.AF = 0;
    t.AJAHR = 0;
    t.ALTER1 = 0;
    t.F = 1;
    t.JFREIB = 0;
    t.JHINZU = 0;
    t.JRE4 = 0;
    t.JRE4ENT = 0;
    t.JVBEZ = 0;
    t.KRV = 0;
    t.KVZ = 1;
    t.LZZ = 2;
    t.LZZFREIB = 0;
    t.LZZHINZU = 0;
    t.MBV = 0;
    t.PKPV = 0;
    t.PKV = 0;
    t.PVA = 0;
    t.PVS = 0;
    t.PVZ = 0;
    t.R = 0;
    t.RE4 = 0;
    t.SONSTB = 0;
    t.SONSTENT = 0;
    t.STERBE = 0;
    t.STKL = 0;
    t.VBEZ = 0;
    t.VBEZM = 0;
    t.VBEZS = 0;
    t.VBS = 0;
    t.VJAHR = 0;
    t.ZKF = 0;
    t.ZMVB = 0;
    t.LST1, t.LST2, t.LST3, t.LSTOSO, (t.LSTSO = 0);

    // *******************************
    // * AUSGANGSPARAMETER
    // *******************************
    t.BK = 0;
    t.BKS = 0;
    t.LSTLZZ = 0;
    t.SOLZLZZ = 0;
    t.SOLZS = 0;
    t.STS = 0;
    t.VKVLZZ = 0;
    t.VKVSONST = 0;

    // *******************************
    // * AUSGANGSPARAMETER DBA
    // *******************************
    t.VFRB = 0;
    t.VFRBS1 = 0;
    t.VFRBS2 = 0;
    t.WVFRB = 0;
    t.WVFRB = 0;
    t.WVFRBM = 0;

    // *******************************
    // * INTERNE FELDER
    // *******************************
    t.ALTE = 0;
    t.ANP = 0;
    t.ANTEIL1 = 0;
    t.BMG = 0;
    t.BBGKVPV = 0;
    t.BBGRV = 0;
    t.DIFF = 0;
    t.EFA = 0;
    t.FVB = 0;
    t.FVBSO = 0;
    t.FVBZ = 0;
    t.FVBZSO = 0;
    t.GFB = 0;
    t.HBALTE = 0;
    t.HFVB = 0;
    t.HFVBZ = 0;
    t.HFVBZSO = 0;
    t.HOCH = 0;
    t.J = 0;
    t.JBMG = 0;
    t.JLFREIB = 0;
    t.JLHINZU = 0;
    t.JW = 0;
    t.K = 0;
    t.KFB = 0;
    t.KVSATZAG = 0;
    t.KVSATZAN = 0;
    t.KZTAB = 0;
    t.LSTJAHR = 0;
    t.LST1 = 0;
    t.LST2 = 0;
    t.LST3 = 0;
    t.LSTOSO = 0;
    t.LSTSO = 0;
    t.MIST = 0;
    t.PVSATZAG = 0;
    t.PVSATZAN = 0;
    t.RVSATZAN = 0;
    t.RW = 0;
    t.SAP = 0;
    t.SOLZFREI = 0;
    t.SOLZJ = 0;
    t.SOLZMIN = 0;

    t.SOLZSBMG = 0;
    t.SOLZSZVE = 0;
    t.ST = 0;
    t.ST1 = 0;
    t.ST2 = 0;
    t.STOVMT = 0;

    t.VBEZB = 0;
    t.VBEZBSO = 0;
    t.VERGL = 0;
    t.VHB = 0;
    t.VKV = 0;
    t.VSP = 0;
    t.VSPN = 0;
    t.VSP1 = 0;
    t.VSP2 = 0;
    t.VSP3 = 0;
    t.W1STKL5 = 0;
    t.W2STKL5 = 0;
    t.W3STKL5 = 0;
    t.X = 0;
    t.Y = 0;
    t.ZRE4 = 0;
    t.ZRE4J = 0;
    t.ZRE4VP = 0;
    t.ZTABFB = 0;
    t.ZVBEZ = 0;
    t.ZVBEZJ = 0;
    t.ZVE = 0;
    t.ZX = 0;
    t.ZZX = 0;

    t.RVERS = 0;
    t.KVERS = 0;
    t.PVERS = 0;
    t.AVERS = 0;

    // *******************************
    // * TABELLE J
    // *******************************

    t.varTab1 = [];
    t.varTab1[0] = 0;
    t.varTab1[1] = 0.4;
    t.varTab1[2] = 0.384;
    t.varTab1[3] = 0.368;
    t.varTab1[4] = 0.352;
    t.varTab1[5] = 0.336;
    t.varTab1[6] = 0.32;
    t.varTab1[7] = 0.304;
    t.varTab1[8] = 0.288;
    t.varTab1[9] = 0.272;
    t.varTab1[10] = 0.256;
    t.varTab1[11] = 0.24;
    t.varTab1[12] = 0.224;
    t.varTab1[13] = 0.208;
    t.varTab1[14] = 0.192;
    t.varTab1[15] = 0.176;
    t.varTab1[16] = 0.16;
    t.varTab1[17] = 0.152;
    t.varTab1[18] = 0.144;
    t.varTab1[19] = 0.14;
    t.varTab1[20] = 0.136;
    t.varTab1[21] = 0.132;
    t.varTab1[22] = 0.128;
    t.varTab1[23] = 0.124;
    t.varTab1[24] = 0.12;
    t.varTab1[25] = 0.116;
    t.varTab1[26] = 0.112;
    t.varTab1[27] = 0.108;
    t.varTab1[28] = 0.104;
    t.varTab1[29] = 0.1;
    t.varTab1[30] = 0.096;
    t.varTab1[31] = 0.092;
    t.varTab1[32] = 0.088;
    t.varTab1[33] = 0.084;
    t.varTab1[34] = 0.08;
    t.varTab1[35] = 0.076;
    t.varTab1[36] = 0.072;
    t.varTab1[37] = 0.068;
    t.varTab1[38] = 0.064;
    t.varTab1[39] = 0.06;
    t.varTab1[40] = 0.056;
    t.varTab1[41] = 0.052;
    t.varTab1[42] = 0.048;
    t.varTab1[43] = 0.044;
    t.varTab1[44] = 0.04;
    t.varTab1[45] = 0.036;
    t.varTab1[46] = 0.032;
    t.varTab1[47] = 0.028;
    t.varTab1[48] = 0.024;
    t.varTab1[49] = 0.02;
    t.varTab1[50] = 0.016;
    t.varTab1[51] = 0.012;
    t.varTab1[52] = 0.008;
    t.varTab1[53] = 0.004;
    t.varTab1[54] = 0.0;

    t.varTab2 = [];
    t.varTab2[0] = 0;
    t.varTab2[1] = 3000;
    t.varTab2[2] = 2880;
    t.varTab2[3] = 2760;
    t.varTab2[4] = 2640;
    t.varTab2[5] = 2520;
    t.varTab2[6] = 2400;
    t.varTab2[7] = 2280;
    t.varTab2[8] = 2160;
    t.varTab2[9] = 2040;
    t.varTab2[10] = 1920;
    t.varTab2[11] = 1800;
    t.varTab2[12] = 1680;
    t.varTab2[13] = 1560;
    t.varTab2[14] = 1440;
    t.varTab2[15] = 1320;
    t.varTab2[16] = 1200;
    t.varTab2[17] = 1140;
    t.varTab2[18] = 1080;
    t.varTab2[19] = 1050;
    t.varTab2[20] = 1020;
    t.varTab2[21] = 990;
    t.varTab2[22] = 960;
    t.varTab2[23] = 930;
    t.varTab2[24] = 900;
    t.varTab2[25] = 870;
    t.varTab2[26] = 840;
    t.varTab2[27] = 810;
    t.varTab2[28] = 780;
    t.varTab2[29] = 750;
    t.varTab2[30] = 720;
    t.varTab2[31] = 690;
    t.varTab2[32] = 660;
    t.varTab2[33] = 630;
    t.varTab2[34] = 600;
    t.varTab2[35] = 570;
    t.varTab2[36] = 540;
    t.varTab2[37] = 510;
    t.varTab2[38] = 480;
    t.varTab2[39] = 450;
    t.varTab2[40] = 420;
    t.varTab2[41] = 390;
    t.varTab2[42] = 360;
    t.varTab2[43] = 330;
    t.varTab2[44] = 300;
    t.varTab2[45] = 270;
    t.varTab2[46] = 240;
    t.varTab2[47] = 210;
    t.varTab2[48] = 180;
    t.varTab2[49] = 150;
    t.varTab2[50] = 120;
    t.varTab2[51] = 90;
    t.varTab2[52] = 60;
    t.varTab2[53] = 30;
    t.varTab2[54] = 0;

    t.varTab3 = [];
    t.varTab3[0] = 0;
    t.varTab3[1] = 900;
    t.varTab3[2] = 864;
    t.varTab3[3] = 828;
    t.varTab3[4] = 792;
    t.varTab3[5] = 756;
    t.varTab3[6] = 720;
    t.varTab3[7] = 684;
    t.varTab3[8] = 648;
    t.varTab3[9] = 612;
    t.varTab3[10] = 576;
    t.varTab3[11] = 540;
    t.varTab3[12] = 504;
    t.varTab3[13] = 468;
    t.varTab3[14] = 432;
    t.varTab3[15] = 396;
    t.varTab3[16] = 360;
    t.varTab3[17] = 342;
    t.varTab3[18] = 324;
    t.varTab3[19] = 315;
    t.varTab3[20] = 306;
    t.varTab3[21] = 297;
    t.varTab3[22] = 288;
    t.varTab3[23] = 279;
    t.varTab3[24] = 270;
    t.varTab3[25] = 261;
    t.varTab3[26] = 252;
    t.varTab3[27] = 243;
    t.varTab3[28] = 234;
    t.varTab3[29] = 225;
    t.varTab3[30] = 216;
    t.varTab3[31] = 207;
    t.varTab3[32] = 198;
    t.varTab3[33] = 189;
    t.varTab3[34] = 180;
    t.varTab3[35] = 171;
    t.varTab3[36] = 162;
    t.varTab3[37] = 153;
    t.varTab3[38] = 144;
    t.varTab3[39] = 135;
    t.varTab3[40] = 126;
    t.varTab3[41] = 117;
    t.varTab3[42] = 108;
    t.varTab3[43] = 99;
    t.varTab3[44] = 90;
    t.varTab3[45] = 81;
    t.varTab3[46] = 72;
    t.varTab3[47] = 63;
    t.varTab3[48] = 54;
    t.varTab3[49] = 45;
    t.varTab3[50] = 36;
    t.varTab3[51] = 27;
    t.varTab3[52] = 18;
    t.varTab3[53] = 9;
    t.varTab3[54] = 0;

    // *******************************
    // * TABELLE K
    // *******************************
    t.varTab4 = [];
    t.varTab4[0] = 0;
    t.varTab4[1] = 0.4;
    t.varTab4[2] = 0.384;
    t.varTab4[3] = 0.368;
    t.varTab4[4] = 0.352;
    t.varTab4[5] = 0.336;
    t.varTab4[6] = 0.32;
    t.varTab4[7] = 0.304;
    t.varTab4[8] = 0.288;
    t.varTab4[9] = 0.272;
    t.varTab4[10] = 0.256;
    t.varTab4[11] = 0.24;
    t.varTab4[12] = 0.224;
    t.varTab4[13] = 0.208;
    t.varTab4[14] = 0.192;
    t.varTab4[15] = 0.176;
    t.varTab4[16] = 0.16;
    t.varTab4[17] = 0.152;
    t.varTab4[18] = 0.144;
    t.varTab4[19] = 0.14;
    t.varTab4[20] = 0.136;
    t.varTab4[21] = 0.132;
    t.varTab4[22] = 0.128;
    t.varTab4[23] = 0.124;
    t.varTab4[24] = 0.12;
    t.varTab4[25] = 0.116;
    t.varTab4[26] = 0.112;
    t.varTab4[27] = 0.108;
    t.varTab4[28] = 0.104;
    t.varTab4[29] = 0.1;
    t.varTab4[30] = 0.096;
    t.varTab4[31] = 0.092;
    t.varTab4[32] = 0.088;
    t.varTab4[33] = 0.084;
    t.varTab4[34] = 0.08;
    t.varTab4[35] = 0.076;
    t.varTab4[36] = 0.072;
    t.varTab4[37] = 0.068;
    t.varTab4[38] = 0.064;
    t.varTab4[39] = 0.06;
    t.varTab4[40] = 0.056;
    t.varTab4[41] = 0.052;
    t.varTab4[42] = 0.048;
    t.varTab4[43] = 0.044;
    t.varTab4[44] = 0.04;
    t.varTab4[45] = 0.036;
    t.varTab4[46] = 0.032;
    t.varTab4[47] = 0.028;
    t.varTab4[48] = 0.024;
    t.varTab4[49] = 0.02;
    t.varTab4[50] = 0.016;
    t.varTab4[51] = 0.012;
    t.varTab4[52] = 0.008;
    t.varTab4[53] = 0.004;
    t.varTab4[54] = 0.0;

    t.varTab5 = [];
    t.varTab5[0] = 0;
    t.varTab5[1] = 1900;
    t.varTab5[2] = 1824;
    t.varTab5[3] = 1748;
    t.varTab5[4] = 1672;
    t.varTab5[5] = 1596;
    t.varTab5[6] = 1520;
    t.varTab5[7] = 1444;
    t.varTab5[8] = 1368;
    t.varTab5[9] = 1292;
    t.varTab5[10] = 1216;
    t.varTab5[11] = 1140;
    t.varTab5[12] = 1064;
    t.varTab5[13] = 988;
    t.varTab5[14] = 912;
    t.varTab5[15] = 836;
    t.varTab5[16] = 760;
    t.varTab5[17] = 722;
    t.varTab5[18] = 684;
    t.varTab5[19] = 665;
    t.varTab5[20] = 646;
    t.varTab5[21] = 627;
    t.varTab5[22] = 608;
    t.varTab5[23] = 589;
    t.varTab5[24] = 570;
    t.varTab5[25] = 551;
    t.varTab5[26] = 532;
    t.varTab5[27] = 513;
    t.varTab5[28] = 494;
    t.varTab5[29] = 475;
    t.varTab5[30] = 456;
    t.varTab5[31] = 437;
    t.varTab5[32] = 418;
    t.varTab5[33] = 399;
    t.varTab5[34] = 380;
    t.varTab5[35] = 361;
    t.varTab5[36] = 342;
    t.varTab5[37] = 323;
    t.varTab5[38] = 304;
    t.varTab5[39] = 285;
    t.varTab5[40] = 266;
    t.varTab5[41] = 247;
    t.varTab5[42] = 228;
    t.varTab5[43] = 209;
    t.varTab5[44] = 190;
    t.varTab5[45] = 171;
    t.varTab5[46] = 152;
    t.varTab5[47] = 133;
    t.varTab5[48] = 114;
    t.varTab5[49] = 95;
    t.varTab5[50] = 76;
    t.varTab5[51] = 57;
    t.varTab5[52] = 38;
    t.varTab5[53] = 19;
    t.varTab5[54] = 0;
  },

  TAB1: function (j) {
    const t = this;
    return t.varTab1[j];
  },

  TAB2: function (j) {
    const t = this;
    return t.varTab2[j];
  },

  TAB3: function (j) {
    const t = this;
    return t.varTab3[j];
  },

  TAB4: function (j) {
    const t = this;
    return t.varTab4[j];
  },

  TAB5: function (j) {
    const t = this;
    return t.varTab5[j];
  },

  // *******************************
  // * LUR FUNCTIONS
  // *******************************

  func_LST: function () {
    const t = this;

    t.func_MPARA();
    t.func_MRE4JL();
    t.VBEZBSO = 0;
    t.func_MRE4();
    t.func_MRE4ABZ();
    t.func_MBERECH();
    t.func_MSONST();
  },

  /*
   * Zuweisung von Werten für bestimmte Sozialversicherungsparameter
   */

  func_MPARA: function () {
    const t = this;

    if (t.KRV < 1) {
      t.BBGRV = 96600;
      t.RVSATZAN = 0.093;
    }

    t.BBGKVPV = 66150;
    t.KVSATZAN = t.KVZ / 2 / 100 + 0.07;
    t.KVSATZAG = 0.0125 + 0.07;

    if (t.PVS === 1) {
      t.PVSATZAN = 0.023;
      t.PVSATZAG = 0.013;
    } else {
      t.PVSATZAN = 0.018;
      t.PVSATZAG = 0.018;
    }
    if (t.PVZ === 1) {
      t.PVSATZAN = t.PVSATZAN + 0.006;
    } else {
      t.PVSATZAN = t.PVSATZAN - t.PVA * 0.0025;
    }

    t.W1STKL5 = 13432;
    t.W2STKL5 = 33380;
    t.W3STKL5 = 222260;
    t.GFB = 11784;
    t.SOLZFREI = 18130;
  },

  /*
   * Ermittlung des Jahresarbeitslohns und der Freibeträge
   */

  func_MRE4JL: function () {
    var t = this,
      faktor = 1;

    if (t.LZZ == 1) {
      faktor = 1;
    } else if (t.LZZ == 2) {
      faktor = 12;
    } else if (t.LZZ == 3) {
      faktor = 360 / 7;
    } else {
      faktor = 360;
    }

    t.ZRE4J = (t.RE4 * faktor) / 100;
    t.ZVBEZJ = (t.VBEZ * faktor) / 100;
    t.JLFREIB = (t.LZZFREIB * faktor) / 100;
    t.JLHINZU = (t.LZZHINZU * faktor) / 100;

    if (t.AF == 0) {
      t.F = 1;
    }
  },

  /*
   * Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag
   */
  func_MRE4: function () {
    const t = this;

    if (t.ZVBEZJ == 0) {
      t.FVBZ = 0;
      t.FVB = 0;
      t.FVBZSO = 0;
      t.FVBSO = 0;
    } else {
      if (t.VJAHR < 2006) {
        t.J = 1;
      } else if (t.VJAHR < 2058) {
        t.J = t.VJAHR - 2004;
      } else {
        t.J = 54;
      }
      if (t.LZZ == 1) {
        t.VBEZB = t.VBEZM * t.ZMVB + t.VBEZS;
        t.HFVB = Math.ceil((t.TAB2(t.J) / 12) * t.ZMVB);
        t.FVBZ = Math.ceil((t.TAB3(t.J) / 12) * t.ZMVB);
      } else {
        t.VBEZB = t.VBEZM * 12 + t.VBEZS;
        t.HFVB = Math.ceil(t.TAB2(t.J));
        t.FVBZ = Math.ceil(t.TAB3(t.J));
      }
      t.FVB = t.decimalCeil((t.VBEZB * t.TAB1(t.J)) / 100, 2);
      if (t.FVB > t.HFVB) {
        t.FVB = t.HFVB;
      }
      if (t.FVB > t.ZVBEZJ) {
        t.FVB = t.ZVBEZJ;
      }
      t.FVBSO = t.decimalCeil(t.FVB + (t.VBEZBSO * t.TAB1(t.J)) / 100, 2);
      if (t.FVBSO > t.TAB2(t.J)) {
        t.FVBSO = t.TAB2(t.J);
      }
      t.HFVBZSO = (t.VBEZB + t.VBEZBSO) / 100 - t.FVBSO;
      t.FVBZSO = Math.ceil(t.FVBZ + t.VBEZBSO / 100);
      if (t.FVBZSO > t.HFVBZSO) {
        t.FVBZSO = Math.ceil(t.HFVBZSO);
      }
      if (t.FVBZSO > t.TAB3(t.J)) {
        t.FVBZSO = t.TAB3(t.J);
      }
      t.HFVBZ = t.VBEZB / 100 - t.FVB;
      if (t.FVBZ > t.HFVBZ) {
        t.FVBZ = Math.ceil(t.HFVBZ);
      }
    }

    // Ermittlung des Altersentlastungsbetrags
    t.func_MRE4ALTE();
  },

  /*
   * Altersentlastungsbetrag
   */
  func_MRE4ALTE: function () {
    const t = this;

    if (t.ALTER1 == 0) {
      t.ALTE = 0;
    } else {
      if (t.AJAHR < 2006) {
        t.K = 1;
      } else if (t.AJAHR < 2058) {
        t.K = t.AJAHR - 2004;
      } else {
        t.K = 54;
      }
      t.BMG = t.ZRE4J - t.ZVBEZJ;
      t.ALTE = Math.ceil(t.BMG * t.TAB4(t.K));
      t.HBALTE = t.TAB5(t.K);
      if (t.ALTE > t.HBALTE) {
        t.ALTE = t.HBALTE;
      }
    }
  },

  /*
   * Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge
   */
  func_MRE4ABZ: function () {
    const t = this;

    t.ZRE4 = t.ZRE4J - t.FVB - t.ALTE - t.JLFREIB + t.JLHINZU;
    if (t.ZRE4 < 0) {
      t.ZRE4 = 0;
    }
    t.ZRE4VP = t.ZRE4J;
    t.ZVBEZ = t.ZVBEZJ - t.FVB;
    if (t.ZVBEZ < 0) {
      t.ZVBEZ = 0;
    }
  },

  /**
   * Berechnung für laufende Lohnzahlungszeiträume
   *
   * @returns {undefined}
   */

  func_MBERECH: function () {
    const t = this;
    // Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale)
    t.func_MZTABFB();
    t.VFRB = (t.ANP + t.FVB + t.FVBZ) * 100;
    // Ermittlung der Jahreslohnsteuer für die Lohnsteuerberechnung
    t.func_MLSTJAHR();
    t.WVFRB = (t.ZVE - t.GFB) * 100;
    if (t.WVFRB < 0) {
      t.WVFRB = 0;
    }
    t.LSTJAHR = t.ST * t.F;
    // Ermittlung des Anteils der Jahreslohnsteuer für den Lohnzahlungszeitraum
    t.func_UPLSTLZZ();
    // Ermittlung des Anteils der berücksichtigten Vorsorgeaufwendungen für den Lohnzahlungszeitraum
    t.func_UPVKVLZZ();
    if (t.ZKF > 0) {
      // Berechnung der Tabellenfreibeträge mit Freibeträgen für Kinder für die Bemessungsgrundlage KiSt und SOLZ
      t.ZTABFB = t.ZTABFB + t.KFB;
      t.func_MRE4ABZ();
      // Ermittlung der Jahreslohnsteuer mit Freibeträgen für Kinder als Jahresbemessungsgrundlage KiSt und SOLZ
      t.func_MLSTJAHR();
      t.JBMG = t.ST * t.F;
    } else {
      t.JBMG = t.LSTJAHR;
    }
    // Ermittlung des Solidaritätszuschlags mit Aufteilung von SOLZJ und JBMG auf den Lohnzahlungszeitraum
    t.func_MSOLZ();
  },

  /**
   * Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale)
   *
   * @returns {undefined}
   */
  func_MZTABFB: function () {
    const t = this;

    t.ANP = 0;
    if (t.ZVBEZ >= 0 && t.ZVBEZ < t.FVBZ) {
      t.FVBZ = t.ZVBEZ;
    }
    if (t.STKL < 6) {
      if (t.ZVBEZ > 0) {
        if (t.ZVBEZ - t.FVBZ < 102) {
          t.ANP = Math.ceil(t.ZVBEZ - t.FVBZ);
        } else {
          t.ANP = 102;
        }
      }
    } else {
      t.FVBZ = 0;
      t.FVBZSO = 0;
    }
    // Festlegung Arbeitnehmer-Pauschalbetrag für aktiven Lohn mit möglicher
    // Begrenzung
    if (t.STKL < 6) {
      if (t.ZRE4 > t.ZVBEZ) {
        if (t.ZRE4 - t.ZVBEZ < 1230) {
          t.ANP = Math.ceil(t.ANP + t.ZRE4 - t.ZVBEZ);
        } else {
          t.ANP = t.ANP + 1230;
        }
      }
    }
    t.KZTAB = 1;
    if (t.STKL == 1) {
      t.SAP = 36;
      t.KFB = t.ZKF * 9540;
    } else if (t.STKL == 2) {
      t.EFA = 4260;
      t.SAP = 36;
      t.KFB = t.ZKF * 9540;
    } else if (t.STKL == 3) {
      t.KZTAB = 2;
      t.SAP = 36;
      t.KFB = t.ZKF * 9540;
    } else if (t.STKL == 4) {
      t.SAP = 36;
      t.KFB = t.ZKF * 4770;
    } else if (t.STKL == 5) {
      t.SAP = 36;
      t.KFB = 0;
    } else {
      t.KFB = 0;
    }
    // Berechnung der Tabellenfreibeträge ohne Freibeträge für Kinder für die
    // Lohnsteuerberechnung
    t.ZTABFB = t.EFA + t.ANP + t.SAP + t.FVBZ;
  },

  /*
   * Ermittlung Jahreslohnsteuer
   */
  func_MLSTJAHR: function () {
    const t = this;
    // Ermittlung der Versorgungspauschale
    t.func_UPEVP();
    // Ermittlung der Steuer bei Vergütung für mehrjährige Tätigkeit
    t.ZVE = t.ZRE4 - t.ZTABFB - t.VSP;
    t.func_UPMLST();
  },

  /*
   *
   */
  func_UPVKVLZZ: function () {
    const t = this;

    // Ermittlung des Jahreswertes der berücksichtigten privaten Krannken- und
    // Pflegeversicherungsbeiträge
    t.func_UPVKV();
    t.JW = t.VKV;
    // Ermittlung des Anteils der berücksichtigten privaten Krannken- und
    // Pflegeversicherungsbeiträge für den Lohnzahlungszeitraum
    t.func_UPANTEIL();
    t.VKVLZZ = t.ANTEIL1;
  },

  /*
   *
   */
  func_UPVKV: function () {
    const t = this;

    if (t.PKV > 0) {
      if (t.VSP2 > t.VSP3) {
        t.VKV = t.VSP2 * 100;
      } else {
        t.VKV = t.VSP3 * 100;
      }
    } else {
      t.VKV = 0;
    }
  },

  /*
   *
   */
  func_UPLSTLZZ: function () {
    const t = this;

    t.JW = t.LSTJAHR * 100;
    // Ermittlung des Anteils der Jahreslohnsteuer für den Lohnzahlungszeitraum
    t.func_UPANTEIL();
    t.LSTLZZ = t.ANTEIL1;
  },

  /*
   *
   */
  func_UPMLST: function () {
    const t = this;

    if (t.ZVE < 1) {
      t.ZVE = 0;
      t.X = 0;
    } else {
      t.X = Math.floor(t.ZVE / t.KZTAB);
    }
    // Ermittlung der Jahreslohnsteuer aus dem Einkommensteuertarif
    if (t.STKL < 5) {
      t.func_UPTAB24();
    } else {
      t.func_MST5_6();
    }
  },

  /*
   * Vorsorgepauschale
   */
  func_UPEVP: function () {
    const t = this;

    if (t.KRV == 1) {
      t.VSP1 = 0;
    } else {
      if (t.ZRE4VP > t.BBGRV) {
        t.ZRE4VP = t.BBGRV;
      }
      t.VSP1 = t.RVSATZAN * t.ZRE4VP;
    }

    t.VSP2 = 0.12 * t.ZRE4VP;
    if (t.STKL == 3) {
      t.VHB = 3000;
    } else {
      t.VHB = 1900;
    }
    if (t.VSP2 > t.VHB) {
      t.VSP2 = t.VHB;
    }
    t.VSPN = Math.ceil(t.VSP1 + t.VSP2);
    t.func_MVSP();
    if (t.VSPN > t.VSP) {
      t.VSP = t.VSPN;
    }
    t.AVERS = t.ZRE4VP * 0.015; // VERSICHERUNGEN
  },

  /*
   * Vorsorgepauschale - Vergleichsberechnung zu Midestvorsorgepauschale
   */
  func_MVSP: function () {
    const t = this;

    if (t.ZRE4VP > t.BBGKVPV) {
      t.ZRE4VP = t.BBGKVPV;
    }

    if (t.PKV > 0) {
      if (t.STKL == 6) {
        t.VSP3 = 0;
      } else {
        t.VSP3 = (t.PKPV * 12) / 100;
        if (t.PKV == 2) {
          t.VSP3 = t.VSP3 - t.ZRE4VP * (t.KVSATZAG + t.PVSATZAG);
        }
      }
      t.KVERS = 0; // VERSICHERUNGEN
      t.PVERS = 0; // VERSICHERUNGEN
    } else {
      t.VSP3 = t.ZRE4VP * (t.KVSATZAN + t.PVSATZAN);
    }
    t.VSP = Math.ceil(t.VSP3 + t.VSP1);
  },

  /*
   * Lohnsteuer für die Klasse V und VI
   */
  func_MST5_6: function () {
    const t = this;

    t.ZZX = t.X;
    if (t.ZZX > t.W2STKL5) {
      t.ZX = t.W2STKL5;
      t.func_UP5_6();
      if (t.ZZX > t.W3STKL5) {
        t.ST = Math.floor(t.ST + (t.W3STKL5 - t.W2STKL5) * 0.42);
        t.ST = Math.floor(t.ST + (t.ZZX - t.W3STKL5) * 0.45);
      } else {
        t.ST = Math.floor(t.ST + (t.ZZX - t.W2STKL5) * 0.42);
      }
    } else {
      t.ZX = t.ZZX;
      t.func_UP5_6();
      if (t.ZZX > t.W1STKL5) {
        t.VERGL = t.ST;
        t.ZX = t.W1STKL5;
        t.func_UP5_6();
        t.HOCH = Math.floor(t.ST + (t.ZZX - t.W1STKL5) * 0.42);
        if (t.HOCH < t.VERGL) {
          t.ST = t.HOCH;
        } else {
          t.ST = t.VERGL;
        }
      }
    }
  },

  /*
   *
   */
  func_UP5_6: function () {
    const t = this;

    t.X = t.ZX * 1.25;
    t.func_UPTAB24();
    t.ST1 = t.ST;
    t.X = t.ZX * 0.75;
    t.func_UPTAB24();
    t.ST2 = t.ST;
    t.DIFF = (t.ST1 - t.ST2) * 2;
    t.MIST = Math.floor(t.ZX * 0.14);
    if (t.MIST > t.DIFF) {
      t.ST = t.MIST;
    } else {
      t.ST = t.DIFF;
    }
  },

  /*
   * Solidaritätszuschlag
   */
  func_MSOLZ: function () {
    const t = this;

    t.SOLZFREI = t.SOLZFREI * t.KZTAB;
    if (t.JBMG > t.SOLZFREI) {
      t.SOLZJ = t.decimalFloor((t.JBMG * 5.5) / 100, 2);
      t.SOLZMIN = ((t.JBMG - t.SOLZFREI) * 11.9) / 100;
      if (t.SOLZMIN < t.SOLZJ) {
        t.SOLZJ = t.SOLZMIN;
      }
      t.JW = t.SOLZJ * 100;
      t.func_UPANTEIL();
      t.SOLZLZZ = t.ANTEIL1;
    } else {
      t.SOLZLZZ = 0;
    }
    // Aufteilung des Betrages auf den LZZ für die Kirchensteuer
    if (t.R > 0) {
      t.JW = t.JBMG * 100;
      t.func_UPANTEIL();
      t.BK = t.ANTEIL1;
    } else {
      t.BK = 0;
    }
  },

  /*
   * Anteil von Jahresbeträgen für einen LZZ
   */
  func_UPANTEIL: function () {
    const t = this;

    if (t.LZZ == 1) {
      t.ANTEIL1 = t.JW;
    } else if (t.LZZ == 2) {
      t.ANTEIL1 = t.decimalFloor(t.JW / 12, 0);
    } else if (t.LZZ == 3) {
      t.ANTEIL1 = t.decimalFloor((t.JW * 7) / 360, 0);
    } else {
      t.ANTEIL1 = t.decimalFloor(t.JW / 360, 0);
    }
  },
  /*
   * Berechnung sonstiger Bezüge
   */
  func_MSONST: function () {
    const t = this;

    t.LZZ = 1;
    if (t.ZMVB == 0) {
      t.ZMVB = 12;
    }
    if (t.SONSTB == 0 && t.MBV == 0) {
      t.VKVSONST = 0;
      t.LSTSO = 0;
      t.STS = 0;
      t.SOLZS = 0;
      t.BKS = 0;
    } else {
      t.func_MOSONST();
      t.func_UPVKV();
      t.VKVSONST = t.VKV;
      t.ZRE4J = (t.JRE4 + t.SONSTB) / 100;
      t.ZVBEZJ = (t.JVBEZ + t.VBS) / 100;
      t.VBEZBSO = t.STERBE;
      t.func_MRE4SONST();
      t.func_MLSTJAHR();
      t.WVFRBM = (t.ZVE - t.GFB) * 100;
      if (t.WVFRBM < 0) {
        t.WVFRBM = 0;
      }
      t.func_UPVKV();
      t.VKVSONST = t.VKV - t.VKVSONST;
      t.LSTSO = t.ST * 100;

      t.STS = Math.abs(Math.floor((t.LSTSO - t.LSTOSO) * t.F));
      t.func_STSMIN();
    }
  },

  func_STSMIN: function () {
    const t = this;
    if (t.STS < 0) {
      if (t.MBV != 0) {
        t.LSTLZZ = t.LSTLZZ + t.STS;
        if (t.LSTLZZ < 0) {
          t.LSTLZZ = 0;
        }

        t.SOLZLZZ = t.decimalFloor(t.SOLZLZZ + (t.STS * 5.5) / 100, 2);
        if (t.SOLZLZZ < 0) {
          t.SOLZLZZ = 0;
        }

        t.BK = t.BK + t.STS;
        if (t.BK < 0) {
          t.BK = 0;
        }
      }

      t.STS = 0;
      t.SOLZS = 0;
    } else {
      t.func_MSOLZSTS();
    }

    if (t.R > 0) {
      t.BKS = t.STS;
    } else {
      t.BKS = 0;
    }
  },

  /*
   * Berechnung des SolZ auf sonstige
   * Bezüge
   */
  func_MSOLZSTS: function () {
    const t = this;
    if (t.ZKF > 0) {
      t.SOLZSZVE = t.ZVE - t.KFB;
    } else {
      t.SOLZSZVE = t.ZVE;
    }

    if (t.SOLZSZVE < 1) {
      t.SOLZSZVE = 0;
      t.X = 0;
    } else {
      t.X = Math.floor(t.SOLZSZVE / t.KZTAB);
    }

    if (t.STKL < 5) {
      t.func_UPTAB24();
    } else {
      t.func_MST5_6();
    }

    t.SOLZSBMG = Math.floor(t.ST * t.F);

    if (t.SOLZSBMG > t.SOLZFREI) {
      t.SOLZS = t.decimalFloor((t.STS * 5.5) / 100, 2);
    } else {
      t.SOLZS = 0;
    }
  },

  /*
   * Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen
   * oder Vergütung für mehrjährige Tätigkeit
   */
  func_MOSONST: function () {
    const t = this;

    t.ZRE4J = t.JRE4 / 100;
    t.ZVBEZJ = t.JVBEZ / 100;
    t.JLFREIB = t.JFREIB / 100;
    t.JLHINZU = t.JHINZU / 100;
    t.func_MRE4();
    t.func_MRE4ABZ();
    t.ZRE4VP = t.ZRE4VP - t.JRE4ENT / 100;
    t.func_MZTABFB();
    t.VFRBS1 = (t.ANP + t.FVB + t.FVBZ) * 100;
    t.func_MLSTJAHR();
    t.WVFRBO = (t.ZVE - t.GFB) * 100;
    if (t.WVFRBO < 0) {
      t.WVFRBO = 0;
    }
    t.LSTOSO = t.ST * 100;
  },

  /*
   * Sonderberechung mit sonstigen Bezügen für Berechnung bei sosntigen Bezügen
   * oder Vergütung für mehrjährige Tätigkeit
   */
  func_MRE4SONST: function () {
    const t = this;

    t.func_MRE4();
    t.FVB = t.FVBSO;
    t.func_MRE4ABZ();
    t.ZRE4VP = t.ZRE4VP + t.MBV / 100 - t.JRE4ENT / 100 - t.SONSTENT / 100;
    t.FVBZ = t.FVBZSO;
    t.func_MZTABFB();
    t.VFRBS2 = (t.ANP + t.FVB + t.FVBZ) * 100 - t.VFRBS1;
  },

  func_UPTAB24: function () {
    const t = this;

    if (t.X < t.GFB + 1) {
      t.ST = 0;
    } else if (t.X < 17006) {
      t.Y = (t.X - t.GFB) / 10000;
      t.RW = t.Y * 954.8;
      t.RW = t.RW + 1400;
      t.ST = Math.floor(t.RW * t.Y);
    } else if (t.X < 66761) {
      t.Y = (t.X - 17005) / 10000;
      t.RW = t.Y * 181.19;
      t.RW = t.RW + 2397;
      t.RW = t.RW * t.Y;
      t.ST = Math.floor(t.RW + 991.21);
    } else if (t.X < 277826) {
      t.ST = Math.floor(t.X * 0.42 - 10636.31);
    } else {
      t.ST = Math.floor(t.X * 0.45 - 18971.06);
    }
    t.ST = t.ST * t.KZTAB;
  },

  // *******************************
  // * HELPER FUNCTIONS
  // *******************************
  decimalRound: function (numberToRound, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(numberToRound * factor) / factor;
  },

  decimalCeil: function (numberToCeil, precision) {
    var factor = Math.pow(10, precision);
    return Math.ceil(numberToCeil * factor) / factor;
  },

  /**
   * Rundet eine Zahl auf die angegebenen Nachkommastellen ab.
   *
   * @param {Float} numberToFloor Die zu rundende Zahl.
   * @param {Integer} precision Die genauigkeit an Dezimalstellen, auf die abgerundet werden soll.
   * @returns {Float} Das Ergebnis der Rundung.
   */
  decimalFloor: function (numberToFloor, precision) {
    var factor = Math.pow(10, precision);
    return Math.floor(numberToFloor * factor) / factor;
  },

  initParams: function () {
    const t = this;

    // Eingangsparameter
    t.AF = 0;
    t.AJAHR = 0;
    t.ALTER1 = 0;
    t.ENTSCH = 0;
    t.F = 1;
    t.JFREIB = 0;
    t.JHINZU = 0;
    t.JRE4 = 0;
    t.JRE4ENT = 0;
    t.JVBEZ = 0;
    t.KRV = 0;
    t.LZZ = 2;
    t.LZZFREIB = 0;
    t.LZZHINZU = 0;
    t.PKPV = 0;
    t.PKV = 0;
    t.PVS = 0;
    t.PVZ = 0;
    t.R = 0;
    t.RE4 = 0;
    t.SONSTB = 0;
    t.SONSTENT = 0;
    t.STERBE = 0;
    t.STKL = 0;
    t.VBEZ = 0;
    t.VBEZM = 0;
    t.VBEZS = 0;
    t.VBS = 0;
    t.VJAHR = 0;
    t.VKAPA = 0;
    t.VMT = 0;
    t.ZKF = 0;
    t.ZMVB = 0;
    // Ausgangsparameter
    t.BK = 0;
    t.BKS = 0;
    t.BKV = 0;
    t.LSTLZZ = 0;
    t.SOLZLZZ = 0;
    t.SOLZS = 0;
    t.SOLZV = 0;
    t.STS = 0;
    t.STV = 0;
    t.VKVLZZ = 0;
    t.VKVSONST = 0;
    //Interne Felder
    t.ALTE = 0;
    t.ANP = 0;
    t.ANTEIL1 = 0;
    t.BMG = 0;
    t.DIFF = 0;
    t.EFA = 0;
    t.FVB = 0;
    t.FVBSO = 0;
    t.FVBZ = 0;
    t.FVBZSO = 0;
    t.HBALTE = 0;
    t.HFVB = 0;
    t.HFVBZ = 0;
    t.HFVBZSO = 0;
    t.HOCH = 0;
    t.J = 0;
    t.JBMG = 0;
    t.JLFREIB = 0;
    t.JLHINZU = 0;
    t.JW = 0;
    t.K = 0;
    t.KENNVMT = 0;
    t.KFB = 0;
    t.KVSATZAG = 0;
    t.KVSATZAN = 0;
    t.KZTAB = 0;
    t.LSTJAHR = 0;
    t.LST1, t.LST2, t.LST3, t.LSTOSO, (t.LSTSO = 0);
    t.MIST = 0;
    t.PVSATZAG = 0;
    t.PVSATZAN = 0;
    t.RW = 0;
    t.SAP = 0;
    t.SOLZFREI = 0;
    t.SOLZJ = 0;
    t.SOLZMIN = 0;
    t.ST = 0;
    t.ST1 = 0;
    t.ST2 = 0;
    t.STOVMT = 0;
    // t.TAB1 = 0;
    // t.TAB2 = 0;
    // t.TAB3 = 0;
    // t.TAB4 = 0;
    // t.TAB5 = 0;
    t.VBEZB = 0;
    t.VBEZBSO = 0;
    t.VERGL = 0;
    t.VHB = 0;
    t.VKV = 0;
    t.VSP = 0;
    t.VSPN = 0;
    t.VSP1 = 0;
    t.VSP2 = 0;
    t.VSP3 = 0;
    t.W1STKL5 = 0;
    t.W2STKL5 = 0;
    t.W3STKL5 = 0;
    t.X = 0;
    t.Y = 0;
    t.ZRE4 = 0;
    t.ZRE4J = 0;
    t.ZRE4VP = 0;
    t.ZTABFB = 0;
    t.ZVBEZ = 0;
    t.ZVBEZJ = 0;
    t.ZVE = 0;
    t.ZX = 0;
    t.ZZX = 0;
  },
};

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
