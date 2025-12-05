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
