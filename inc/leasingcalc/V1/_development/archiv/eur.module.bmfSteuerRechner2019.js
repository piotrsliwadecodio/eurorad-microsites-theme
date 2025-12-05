/*
*
* Copyright 2019 DUNCKELFELD GmbH
* Tom Kirchhartz <tk@dunckelfeld.de>
*
* Funktionen und Parameter sowie Tabellen laut Programmablaufplan 2019 von bmf-steuerrechner.de
* https://www.bmf-steuerrechner.de/pruefdaten/pap2019.pdf
* Erstumsetzung von Christoph Hahn, Wartung von Tom Kirchhartz
*
*/

// *******************************
// BmfSteuerRechner2019
// *******************************
var BmfSteuerRechner2019 = function(elm) {
	this.init(elm);
};
BmfSteuerRechner2019.prototype = {

	// initialize the whole stuff
	init: function(elm) {
		var t = this;
		t.$elm = elm;

		t.debugmode = false;
		t.prepareDataObject();

	},

	prepareDataObject: function () {
		var t = this;

	// *******************************
	// * EINGANGSPARAMETER
	// *******************************
		// 1, wenn Faktorverfahren gewaehlt wurde (nur in Steuerklasse IV)
		t.AF = 0;
		// Auf die Vollendung des 64. Lebensjahres folgende Kalenderjahr
		// (erforderlich wenn ALTER1 = 1)
		t.AJAHR = 0;
		// 1, wenn das 64. Lebensjahr vor Beginn des Kalenderjahres vollendet
		// wurde, in dem der Lohnzahlungszeitraum endet (§ 24a EStG), sonst = 0
		t.ALTER1 = 0;
		// In VKAPA und VMT enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent
		t.ENTSCH = 0;
		// eingetragener Faktor mit drei Nachkommastellen
		t.F = 1;
		// Jahresfreibetrag für die Ermittlung der Lohnsteuer für die
		// sonstigen Bezüge nach Maßgabe der elektronischen Lohnsteuerabzugsmerkmale
		// nach § 39e EStG oder der Eintragung auf der
		// Bescheinigung für den Lohnsteuerabzug 2019 in Cent (ggf. 0)
		t.JFREIB = 0;
		// Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die
		// sonstigen Bezüge nach Maßgabe der elektronischen Lohnsteuerabzugsmerkmale
		// nach § 39e EStG oder der Eintragung auf der Bescheinigung für den
		// Lohnsteuerabzug 2019 in Cent (ggf. 0)
		t.JHINZU = 0;
		// Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge und ohne
		// Vergütung für mehrjährige Tätigkeit in Cent. Anmerkung: Die
		// Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu
		// sonstigen Bezügen (Felder SONSTB, VMT oder VKAPA).
		// Sind in einem vorangegangenen Abrechnungszeitraum bereits
		// sonstige Bezüge gezahlt worden, so sind sie dem voraussichtlichen
		// Jahresarbeitslohn hinzuzurechnen. Vergütungen für mehrjährige
		// Tätigkeit aus einem vorangegangenen Abrechnungszeitraum werden
		// in voller Höhe hinzugerechnet.
		t.JRE4 = 0;
		// In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent
		t.JRE4ENT = 0;
		// In JRE4 enthaltene Versorgungsbezüge in Cent (ggf. 0)
		t.JVBEZ = 0;
		// Merker für die Vorsorgepauschale
		// 0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung
		// oder einer berufsständischen Versorgungseinrichtung
		// pflichtversichert oder bei Befreiung von der Versicherungspflicht
		// freiwillig versichert; es gilt die allgemeine
		// Beitragsbemessungsgrenze (BBG West)
		// 1 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung
		// oder einer berufsständischen Versorgungseinrichtung
		// pflichtversichert oder bei Befreiung von der Versicherungspflicht
		// freiwillig versichert; es gilt die Beitragsbemessungsgrenze Ost
		// (BBG Ost)
		// 2 = wenn nicht 0 oder 1
		t.KRV = 0;
		// Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich
		// krankenversicherten Arbeitnehmer in Prozent (bspw. 0,90 für
		// 0,90 %) mit 2 Dezimalstellen. Es ist der volle Zusatzbeitragssatz
		// anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeberanteil
		// erfolgt im Programmablauf.
		t.KVZ = 1;
		// Lohnzahlungszeitraum
		t.LZZ = 2;
		// Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber
		// nach § 39e EStG festgestellte oder in der Bescheinigung für den
		// Lohnsteuerabzug 2019 eingetragene Freibetrag für den Lohnzahlungszeitraum in
		// Cent
		t.LZZFREIB = 0;
		// Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber
		// nach § 39e EStG festgestellte oder in der Bescheinigung für den
		// Lohnsteuerabzug 2019 eingetragene Hinzurechnungsbetrag für den
		// Lohnzahlungszeitraum in Cent
		t.LZZHINZU = 0;
		// Dem Arbeitgeber mitgeteilte Beiträge des Arbeitnehmers für eine
		// private Basiskranken- bzw. Pflege-Pflichtversicherung im Sinne des
		// § 10 Absatz 1 Nummer 3 EStG in Cent; der Wert ist unabhängig vom
		// Lohnzahlungszeitraum immer als Monatsbetrag anzugeben
		t.PKPV = 0;
		// 0 = gesetzlich krankenversicherte Arbeitnehmer
		// 1 = ausschließlich privat krankenversicherte Arbeitnehmer ohne
		// Arbeitgeberzuschuss
		// 2 = ausschließlich privat krankenversicherte Arbeitnehmer mit
		// Arbeitgeberzuschuss
		t.PKV = 0;
		// 1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu
		// berücksichtigen sind bzw. zu berücksichtigen wären
		t.PVS = 0;
		// 1, wenn der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung zu
		// zahlen hat
		t.PVZ = 0;
		// Religionsgemeinschaft des Arbeitnehmers lt. elektronischer
		// Lohnsteuerabzugsmerkmale
		// oder der Bescheinigung für den Lohnsteu-erabzug 2019 (bei keiner
		// Religionszugehörigkeit = 0)
		t.R = 0;
		// Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor
		// Berücksichtigung des Versorgungsfreibetrags und des Zuschlags
		// zum Versorgungsfreibetrag, des Altersentlastungsbetrags und des
		// als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in
		// der Bescheinigung für den Lohnsteuerabzug 2019 für den
		// Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
		// Hinzurechnungsbetrags in Cent
		t.RE4 = 0;
		// Sonstige Bezüge (ohne Vergütung aus mehrjähriger Tätigkeit) einschließlich
		// Sterbegeld bei Versorgungsbezügen sowie Kapitalaus-zahlungen/Abfindungen,
		// soweit es sich nicht um Bezüge für mehre-re Jahre handelt in Cent (ggf. 0)
		t.SONSTB = 0;
		// In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG in Cent
		t.SONSTENT = 0;
		// Sterbegeld bei Versorgungsbezügen sowie Kapitalauszahlun-gen/Abfindungen,
		// soweit es sich nicht um Bezüge für mehrere Jahre handelt (in SONSTB enthalten)
		// in Cent
		t.STERBE = 0;
		// Steuerklasse
		t.STKL = 0;
		// In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter
		// Berücksichtigung
		// einer geänderten Bemessungsgrundlage nach § 19 Absatz 2 Satz 10 und 11 EStG
		t.VBEZ = 0;
		// In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter
		// Berücksichtigung
		// einer geänderten Bemessungsgrundlage nach § 19 Absatz 2 Satz 10 und 11 EStG
		t.VBEZM = 0;
		// Voraussichtliche Sonderzahlungen von Versorgungsbezügen im Kalenderjahr des
		// Versorgungsbeginns bei Versorgungsempfängern ohne Sterbegeld,
		// Kapitalauszahlungen/Abfindungen in Cent
		t.VBEZS = 0;
		// In SONSTB enthaltene Versorgungsbezüge einschließlich Sterbe-geld in Cent
		// (ggf. 0)
		t.VBS = 0;
		// Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde;
		// werden mehrere Versorgungsbezüge gezahlt, wird aus
		// Vereinfachungsgründen für die Berechnung das Jahr des ältesten
		// erstmaligen Bezugs herangezogen; auf die Möglichkeit der
		// getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a
		// EStG) wird im Übrigen verwiesen
		t.VJAHR = 0;
		// Kapitalauszahlungen/Abfindungen/Nachzahlungen bei Versorgungsbezügen für
		// mehrere Jahre in Cent (ggf. 0)
		t.VKAPA = 0;
		// Vergütung für mehrjährige Tätigkeit ohne Kapitalauszahlungen und ohne
		// Abfindungen bei Versorgungsbezügen in Cent (ggf. 0)
		t.VMT = 0;
		// Zahl der Freibeträge für Kinder (eine Dezimalstelle, nur bei Steuer-klassen I,
		// II, III und IV)
		t.ZKF = 0;
		// Zahl der Monate, für die Versorgungsbezüge gezahlt werden
		// [nur erforderlich bei Jahresberechnung (LZZ = 1)]
		t.ZMVB = 0;
		t.LST1, t.LST2, t.LST3, t.LSTOSO, t.LSTSO = 0;


	// *******************************
	// * AUSGANGSPARAMETER
	// *******************************
		// Bemessungsgrundlage für die Kirchenlohnsteuer in Cent
		t.BK = 0;
		// Bemessungsgrundlage der sonstigen Bezüge (ohne Vergütung für mehrjährige Tätigkeit)
		// für die Kirchenlohnsteuer in Cent
		t.BKS = 0;
		// Bemessungsgrundlage der Vergütung für mehrjährige Tätigkeit für die Kirchenlohnsteuer in Cent
		t.BKV = 0;
		// Für den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cent
		t.LSTLZZ = 0;
		// Für den Lohnzahlungszeitraum einzubehaltender Solidaritätszu-schlag in Cent
		t.SOLZLZZ = 0;
		// Solidaritätszuschlag für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit) in Cent
		t.SOLZS = 0;
		// Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit in Cent
		t.SOLZV = 0;
		// Lohnsteuer für sonstige Bezüge (ohne Vergütung für mehrjährige Tätigkeit) in Cent
		t.STS = 0;
		// Lohnsteuer für die Vergütung für mehrjährige Tätigkeit in Cent
		t.STV = 0;
		// Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeit-nehmers zur
		// privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung
		// (ggf. auch die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn.
		// Für Zwecke der Lohnsteuerbescheinigung sind die einzelnen Ausgabewerte außerhalb
		// des ei-gentlichen Lohnsteuerberechnungsprogramms zu addieren; hinzuzurechnen sind
		// auch die Ausgabewerte VKVSONST.
		t.VKVLZZ = 0;
		// Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeit-nehmers
		// zur privaten Basis-Krankenversicherung und privaten Pfle-ge-Pflichtversicherung
		// (ggf. auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der
		// Ausgabewert kann auch negativ sein. Für tarifermäßigt zu besteuernde Vergütungen
		// für mehrjährige Tätigkeiten enthält der PAP keinen entsprechenden Ausgabewert.
		t.VKVSONST = 0;

	// *******************************
	// * AUSGANGSPARAMETER DBA
	// *******************************
		// VFRB Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns,
		// in Cent
		t.VFRB = 0;
		// VFRBS1 Verbrauchter Freibetrag bei Berechnung des voraussichtlichen
		// Jahresarbeitslohns, in Cent
		t.VFRBS1 = 0;
		// VFRBS2 Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in
		// Cent
		t.VFRBS2 = 0;
		// WVFRB Für die weitergehende Berücksichtigung des Steuerfreibetrags nach
		// dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag bei der
		// Berechnung des laufenden Arbeitslohns, in Cent
		t.WVFRB = 0;
		// WVFRBO Für die weitergehende Berücksichtigung des Steuerfreibetrags nach
		// dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag bei der
		// Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
		t.WVFRB = 0;
		// WVFRBM Für die weitergehende Berücksichtigung des Steuerfreibetrags nach
		// dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag bei der
		// Berechnung der sonstigen Bezüge, in Cent
		t.WVFRBM = 0;

	// *******************************
	// * INTERNE FELDER
	// *******************************
		// Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
		t.ALTE = 0;
		// Arbeitnehmer-Pauschbetrag/Werbungskosten-Pauschbetrag in Euro
		t.ANP = 0;
		// Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten auf ganze
		// Cent abgerundet
		t.ANTEIL1 = 0;
		// Bemessungsgrundlage für Altersentlastungsbetrag in Euro, Cent (2
		// Dezimalstellen)
		t.BMG = 0;
		// Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung
		// und der sozialen Pflegeversicherung in Euro
		t.BBGKVPV = 0;
		// allgemeine Beitragsbemessungsgrenze in der allgemeinen Rentenversicherung
		// in Euro
		t.BBGRV = 0;
		// Differenz zwischen ST1 und ST2 in Euro
		t.DIFF = 0;
		// Entlastungsbetrag für Alleinerziehende in Euro
		t.EFA = 0;
		// Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
		t.FVB = 0;
		// Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen) für die Be-rechnung der
		// Lohnsteuer für den sonstigen Bezug
		t.FVBSO = 0;
		// Zuschlag zum Versorgungsfreibetrag in Euro
		t.FVBZ = 0;
		// Zuschlag zum Versorgungsfreibetrag in Euro für die Berechnung der Lohnsteuer
		// beim sonstigen Bezug
		t.FVBZSO = 0;
		// GFB Grundfreibetrag in Euro
		t.GFB = 0;
		// Maximaler Altersentlastungsbetrag in Euro
		t.HBALTE = 0;
		// Maßgeblicher maximaler Versorgungsfreibetrag in Euro
		t.HFVB = 0;
		// Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent (2
		// Dezimalstellen)
		t.HFVBZ = 0;
		// Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent (2
		// Dezimalstellen) für die Berechnung der Lohnsteuer für den sonstigen Bezug
		t.HFVBZSO = 0;
		// Zwischenfeld zu X für die Berechnung der Steuer nach § 39b Absatz 2 Satz 7
		// EStG in Euro
		t.HOCH = 0;
		// Nummer der Tabellenwerte für Versorgungsparameter
		t.J = 0;
		// Jahressteuer nach § 51a EStG, aus der Solidaritätszuschlag und
		// Bemessungsgrundlage für die Kirchenlohnsteuer ermittelt werden in Euro
		t.JBMG = 0;
		// Auf einen Jahreslohn hochgerechneter LZZFREIB in Euro, Cent (2 Dezimalstellen)
		t.JLFREIB = 0;
		// Auf einen Jahreslohn hochgerechnete LZZHINZU in Euro, Cent (2 Dezimalstellen)
		t.JLHINZU = 0;
		// Jahreswert, dessen Anteil für einen Lohnzahlungszeitraum in UPANTEIL errechnet
		// werden soll in Cent
		t.JW = 0;
		// Nummer der Tabellenwerte für Parameter bei Altersentlastungsbe-trag
		t.K = 0;
		// Merker für Berechnung Lohnsteuer für mehrjährige Tätigkeit
		// 0 = normale Steuerberechnung
		// 1 = Steuerberechnung für mehrjährige Tätigkeit
		// 2 = Ermittlung der Vorsorgepauschale ohne Entschädigungen i.S.d. § 24 Nummer 1
		// EStG
		t.KENNVMT = 0;
		// Summe der Freibeträge für Kinder in Euro
		t.KFB = 0;
		// Beitragssatz des Arbeitgebers zur Krankenversicherung unter
		// Berücksichtigung des durchschnittlichen Zusatzbeitragssatzes für die
		// Ermittlung des Arbeitgeberzuschusses (5 Dezimalstellen)
		t.KVSATZAG = 0;
		// Beitragssatz des Arbeitnehmers zur Krankenversicherung (5 Dezimalstellen)
		t.KVSATZAN = 0;
		// Kennzahl für die Einkommensteuer-Tarifarten: 1 = Grundtarif 2 = Splittingverfahren
		t.KZTAB = 0;
		// Jahreslohnsteuer in Euro
		t.LSTJAHR = 0;
		// Zwischenfelder der Jahreslohnsteuer in Cent
		t.LST1, t.LST2, t.LST3, t.LSTOSO, t.LSTSO = 0;
		// Mindeststeuer für die Steuerklassen V und VI in Euro
		t.MIST = 0;
		// Beitragssatz des Arbeitgebers zur Pflegeversicherung (5 Dezimalstellen)
		t.PVSATZAG = 0;
		// Beitragssatz des Arbeitnehmers zur Pflegeversicherung (5 Dezimalstellen)
		t.PVSATZAN = 0;
		// Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen
		// Rentenversicherung (4 Dezimalstellen)
		t.RVSATZAN = 0;
		// Rechenwert in Gleitkommadarstellung
		t.RW = 0;
		// Sonderausgaben-Pauschbetrag in Euro
		t.SAP = 0;
		// Freigrenze für den Solidaritätszuschlag in Euro
		t.SOLZFREI = 0;
		// Solidaritätszuschlag auf die Jahreslohnsteuer in Euro, Cent (2 Dezimalstellen)
		t.SOLZJ = 0;
		// Zwischenwert für den Solidaritätszuschlag auf die Jahreslohnsteuer in Euro,
		// Cent (2 Dezimalstellen)
		t.SOLZMIN = 0;
		// Tarifliche Einkommensteuer in Euro
		t.ST = 0;
		// Tarifliche Einkommensteuer auf das 1,25-fache ZX in Euro
		t.ST1 = 0;
		// Tarifliche Einkommensteuer auf das 0,75-fache ZX in Euro
		t.ST2 = 0;
		// Zwischenfeld zur Ermittlung der Steuer auf Vergütungen für mehr-jährige
		// Tätigkeit in Euro
		t.STOVMT = 0;
		// Tabelle für die Prozentsätze des Versorgungsfreibetrags
		// t.TAB1 = 0;
		// // Tabelle für die Höchstbeträge des Versorgungsfreibetrags
		// t.TAB2 = 0;
		// // Tabelle für die Zuschläge zum Versorgungsfreibetrag
		// t.TAB3 = 0;
		// // Tabelle für die Prozentsätze des Altersentlastungsbetrags
		// t.TAB4 = 0;
		// // Tabelle für die Höchstbeträge des Altersentlastungsbetrags
		// t.TAB5 = 0;
		// Teilbetragssatz der Vorsorgepauschale für die Rentenversicherung
		// (2 Dezimalstellen)
		t.TBSVORV = 0;
		// // Bemessungsgrundlage für den Versorgungsfreibetrag in Cent
		t.VBEZB = 0;
		// Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für den sonstigen
		// Bezug
		t.VBEZBSO = 0;
		// Zwischenfeld zu X für die Berechnung der Steuer nach § 39b Absatz 2 Satz 7
		// EStG in Euro
		t.VERGL = 0;
		// Höchstbetrag der Mindestvorsorgepauschale für die Kranken- und
		// Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
		t.VHB = 0;
		// Jahreswert der berücksichtigten Beiträge zur privaten
		// Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
		// die Mindestvorsorgepauschale) in Cent
		t.VKV = 0;
		// Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung sowie die
		// gesetzliche Kranken- und soziale Pflegeversicherung nach fiktiven Beträgen
		// oder ggf. für die private Basiskrankenversi-cherung und private
		// Pflege-Pflichtversicherung in Euro, Cent (2 De-zimalstellen)
		t.VSP = 0;
		// Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung sowie der
		// Mindestvorsorgepauschale für die Kranken- und Pflege-versicherung in Euro,
		// Cent (2 Dezimalstellen)
		t.VSPN = 0;
		// Zwischenwert 1 bei der Berechnung der Vorsorgepauschale in Eu-ro, Cent (2
		// Dezimalstellen)
		t.VSP1 = 0;
		// Zwischenwert 2 bei der Berechnung der Vorsorgepauschale in Eu-ro, Cent (2
		// Dezimalstellen)
		t.VSP2 = 0;
		// Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken- und soziale
		// Pflegeversicherung nach fiktiven Beträgen oder ggf. für die private
		// Basiskrankenversicherung und private Pflege-Pflichtversicherung in Euro, Cent
		// (2 Dezimalstellen)
		t.VSP3 = 0;
		// Zu versteuerndes Einkommen gem. § 32a Absatz 1 und 2 EStG in Euro, Cent (2
		// Dezimalstellen)
		// Erster Grenzwert in Steuerklasse V/VI in Euro
		t.W1STKL5 = 0;
		// Zweiter Grenzwert in Steuerklasse V/VI in Euro
		t.W2STKL5 = 0;
		// Dritter Grenzwert in Steuerklasse V/VI in Euro
		t.W3STKL5 = 0;
		t.X = 0;
		// Zu versteuerndes Einkommen gem. § 32a Absatz 1 und 5 EStG in
		// Euro, Cent (2 Dezimalstellen)
		t.Y = 0;
		// Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen) nach
		// Abzug der Freibeträge nach § 39b Absatz 2 Satz 3 und 4 EStG
		t.ZRE4 = 0;
		// Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
		t.ZRE4J = 0;
		// Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der
		// Entschädigungen i.S.d. § 24 Nummer 1 EStG in Euro, Cent (2
		// Dezimalstellen)
		t.ZRE4VP = 0;
		// Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in Euro, Cent (2
		// Dezimalstellen)
		t.ZTABFB = 0;
		// Auf einen Jahreslohn hochgerechnetes VBEZ abzüglich FVB in Euro, Cent (2
		// Dezimalstellen)
		t.ZVBEZ = 0;
		// Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)
		t.ZVBEZJ = 0;
		// Zu versteuerndes Einkommen in Euro, Cent (2 Dezimalstellen)
		t.ZVE = 0;
		// Zwischenfeld zu X für die Berechnung der Steuer nach § 39b Absatz 2 Satz 7
		// EStG in Euro
		t.ZX = 0;
		// Zwischenfeld zu X für die Berechnung der Steuer nach § 39b Absatz 2 Satz 7
		// EStG in Euro
		t.ZZX = 0;

		// Rentenversicherung in Euro,cent
		t.RVERS = 0;
		// Krankenversicherung in Euro,cent
		t.KVERS = 0;
		// Pflegeversicherung in Euro,cent
		t.PVERS = 0;
		// Arbeitslosenversicherung in Euro,cent
		t.AVERS = 0;


	// *******************************
	// * TABELLE J
	// *******************************

		t.varTab1 = new Array();
		t.varTab1[0] = 0;
		t.varTab1[1] = 0.4;
		t.varTab1[2] = 0.384;
		t.varTab1[3] = 0.368;
		t.varTab1[4] = 0.352;
		t.varTab1[5] = 0.336;
		t.varTab1[6] = 0.320;
		t.varTab1[7] = 0.304;
		t.varTab1[8] = 0.288;
		t.varTab1[9] = 0.272;
		t.varTab1[10] = 0.256;
		t.varTab1[11] = 0.240;
		t.varTab1[12] = 0.224;
		t.varTab1[13] = 0.208;
		t.varTab1[14] = 0.192;
		t.varTab1[15] = 0.176;
		t.varTab1[16] = 0.160;
		t.varTab1[17] = 0.152;
		t.varTab1[18] = 0.144;
		t.varTab1[19] = 0.136;
		t.varTab1[20] = 0.128;
		t.varTab1[21] = 0.120;
		t.varTab1[22] = 0.112;
		t.varTab1[23] = 0.104;
		t.varTab1[24] = 0.096;
		t.varTab1[25] = 0.088;
		t.varTab1[26] = 0.080;
		t.varTab1[27] = 0.072;
		t.varTab1[28] = 0.064;
		t.varTab1[29] = 0.056;
		t.varTab1[30] = 0.048;
		t.varTab1[31] = 0.040;
		t.varTab1[32] = 0.032;
		t.varTab1[33] = 0.024;
		t.varTab1[34] = 0.016;
		t.varTab1[35] = 0.008;
		t.varTab1[36] = 0.000;

		t.varTab2= new Array();
		t.varTab2[0]  = 0;
		t.varTab2[1]  = 3000;
		t.varTab2[2]  = 2880;
		t.varTab2[3]  = 2760;
		t.varTab2[4]  = 2640;
		t.varTab2[5]  = 2520;
		t.varTab2[6]  = 2400;
		t.varTab2[7]  = 2280;
		t.varTab2[8]  = 2160;
		t.varTab2[9]  = 2040;
		t.varTab2[10] = 1920;
		t.varTab2[11] = 1800;
		t.varTab2[12] = 1680;
		t.varTab2[13] = 1560;
		t.varTab2[14] = 1440;
		t.varTab2[15] = 1320;
		t.varTab2[16] = 1200;
		t.varTab2[17] = 1140;
		t.varTab2[18] = 1080;
		t.varTab2[19] = 1020;
		t.varTab2[20] = 960;
		t.varTab2[21] = 900;
		t.varTab2[22] = 840;
		t.varTab2[23] = 780;
		t.varTab2[24] = 720;
		t.varTab2[25] = 660;
		t.varTab2[26] = 600;
		t.varTab2[27] = 540;
		t.varTab2[28] = 480;
		t.varTab2[29] = 420;
		t.varTab2[30] = 360;
		t.varTab2[31] = 300;
		t.varTab2[32] = 240;
		t.varTab2[33] = 180;
		t.varTab2[34] = 120;
		t.varTab2[35] = 60;
		t.varTab2[36] = 0;

		t.varTab3 = new Array();
		t.varTab3[0]  = 0;
		t.varTab3[1]  = 900;
		t.varTab3[2]  = 864;
		t.varTab3[3]  = 828;
		t.varTab3[4]  = 792;
		t.varTab3[5]  = 756;
		t.varTab3[6]  = 720;
		t.varTab3[7]  = 684;
		t.varTab3[8]  = 648;
		t.varTab3[9]  = 612;
		t.varTab3[10] = 576;
		t.varTab3[11] = 540;
		t.varTab3[12] = 504;
		t.varTab3[13] = 468;
		t.varTab3[14] = 432;
		t.varTab3[15] = 396;
		t.varTab3[16] = 360;
		t.varTab3[17] = 342;
		t.varTab3[18] = 324;
		t.varTab3[19] = 306;
		t.varTab3[20] = 288;
		t.varTab3[21] = 270;
		t.varTab3[22] = 252;
		t.varTab3[23] = 234;
		t.varTab3[24] = 216;
		t.varTab3[25] = 198;
		t.varTab3[26] = 180;
		t.varTab3[27] = 162;
		t.varTab3[28] = 144;
		t.varTab3[29] = 126;
		t.varTab3[30] = 108;
		t.varTab3[31] = 90;
		t.varTab3[32] = 72;
		t.varTab3[33] = 54;
		t.varTab3[34] = 36;
		t.varTab3[35] = 18;
		t.varTab3[36] = 0;

	// *******************************
	// * TABELLE K
	// *******************************
		t.varTab4 = new Array();
		t.varTab4[0] = 0;
		t.varTab4[1] = 0.4;
		t.varTab4[2] = 0.384;
		t.varTab4[3] = 0.368;
		t.varTab4[4] = 0.352;
		t.varTab4[5] = 0.336;
		t.varTab4[6] = 0.320;
		t.varTab4[7] = 0.304;
		t.varTab4[8] = 0.288;
		t.varTab4[9] = 0.272;
		t.varTab4[10] = 0.256;
		t.varTab4[11] = 0.240;
		t.varTab4[12] = 0.224;
		t.varTab4[13] = 0.208;
		t.varTab4[14] = 0.192;
		t.varTab4[15] = 0.176;
		t.varTab4[16] = 0.160;
		t.varTab4[17] = 0.152;
		t.varTab4[18] = 0.144;
		t.varTab4[19] = 0.136;
		t.varTab4[20] = 0.128;
		t.varTab4[21] = 0.120;
		t.varTab4[22] = 0.112;
		t.varTab4[23] = 0.104;
		t.varTab4[24] = 0.096;
		t.varTab4[25] = 0.088;
		t.varTab4[26] = 0.080;
		t.varTab4[27] = 0.072;
		t.varTab4[28] = 0.064;
		t.varTab4[29] = 0.056;
		t.varTab4[30] = 0.048;
		t.varTab4[31] = 0.040;
		t.varTab4[32] = 0.032;
		t.varTab4[33] = 0.024;
		t.varTab4[34] = 0.016;
		t.varTab4[35] = 0.008;
		t.varTab4[36] = 0.000;

		t.varTab5 = new Array();
		t.varTab5[0]  = 0;
		t.varTab5[1]  = 1900;
		t.varTab5[2]  = 1824;
		t.varTab5[3]  = 1748;
		t.varTab5[4]  = 1672;
		t.varTab5[5]  = 1596;
		t.varTab5[6]  = 1520;
		t.varTab5[7]  = 1444;
		t.varTab5[8]  = 1368;
		t.varTab5[9]  = 1292;
		t.varTab5[10] = 1216;
		t.varTab5[11] = 1140;
		t.varTab5[12] = 1064;
		t.varTab5[13] = 988;
		t.varTab5[14] = 912;
		t.varTab5[15] = 836;
		t.varTab5[16] = 760;
		t.varTab5[17] = 722;
		t.varTab5[18] = 684;
		t.varTab5[19] = 646;
		t.varTab5[20] = 608;
		t.varTab5[21] = 570;
		t.varTab5[22] = 532;
		t.varTab5[23] = 494;
		t.varTab5[24] = 456;
		t.varTab5[25] = 418;
		t.varTab5[26] = 380;
		t.varTab5[27] = 342;
		t.varTab5[28] = 304;
		t.varTab5[29] = 266;
		t.varTab5[30] = 228;
		t.varTab5[31] = 190;
		t.varTab5[32] = 152;
		t.varTab5[33] = 114;
		t.varTab5[34] = 76;
		t.varTab5[35] = 38;
		t.varTab5[36] = 0;
	},

	TAB1: function (j){
		var t = this;
	    return t.varTab1[j];
	},

	TAB2: function (j){
		var t = this;
	    return t.varTab2[j];
	},

	TAB3: function (j){
		var t = this;
	    return t.varTab3[j];
	},

	TAB4: function (j){
		var t = this;
	    return t.varTab4[j];
	},

	TAB5: function (j){
		var t = this;
	    return t.varTab5[j];
	},

	// *******************************
	// * LUR FUNCTIONS
	// *******************************

		/*
		* Zuweisung von Werten für bestimmte Sozialversicherungsparameter
		*/

	func_MPARA: function () {
		var t = this;

		if(t.KRV < 2) {
			if(t.KRV === 0) {
				t.BBGRV = 73800;
			} else {
				t.BBGRV = 80400;
			}

			t.RVSATZAN = 0.093;
			t.TBSVORV = 0.76;
		}

		t.BBGKVPV = 54450;
		t.KVSATZAN = t.KVZ/2/100 + 0.07
		t.KVSATZAG = 0.0045 + 0.07;

		if(t.PVS === 1) {
			t.PVSATZAN = 0.02025;
			t.PVSATZAG = 0.01025;
		} else {
			t.PVSATZAN = 0.01525;
			t.PVSATZAG = 0.01525;
		}

		if(t.PVZ === 1) {
			t.PVSATZAN = t.PVSATZAN + 0.0025;
		}

		t.W1STKL5 = 10635;
		t.W2STKL5 = 27980;
		t.W3STKL5 = 212261;
		t.GFB = 9168;
		t.SOLZFREI = 972;
	},

		/*
		* Ermittlung des Jahresarbeitslohns und der Freibeträge
		*/

	func_MRE4JL: function () {
		var t = this, faktor = 1;

		if (t.LZZ == 1) {
			faktor = 1;
		} else if (t.LZZ == 2) {
			faktor = 12;
		} else if (t.LZZ == 3) {
			faktor = 360 / 7;
		} else {
			faktor = 360;
		}

		t.ZRE4J = t.RE4 * faktor / 100;
		t.ZVBEZJ = t.VBEZ * faktor / 100;
		t.JLFREIB = t.LZZFREIB * faktor / 100;
		t.JLHINZU = t.LZZHINZU * faktor / 100;


		if (t.AF == 0) {
			t.F = 1;
		}
	},

	/*
	* Altersentlastungsbetrag
	*/
	func_MRE4ALTE: function () {
		var t = this;

		if (t.ALTER1 == 0) {
			t.ALTE = 0;
		} else {
			if (t.AJAHR < 2006) {
				t.K = 1;
			} else if (t.AJAHR < 2040) {
				t.K = t.AJAHR - 2004;
			} else {
				t.K = 36;
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
	* Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag
	*/
	func_MRE4: function () {
		var t = this;

		if (t.ZVBEZJ == 0) {
			t.FVBZ = 0;
			t.FVB = 0;
			t.FVBZSO = 0;
			t.FVBSO = 0;
		} else {
			if (t.VJAHR < 2006) {
				t.J = 1;
			} else if (t.VJAHR < 2040) {
				t.J = t.VJAHR - 2004;
			} else {
				t.J = 36;
			}
			if (t.LZZ == 1) {
				t.VBEZB = (t.VBEZM * t.ZMVB) + t.VBEZS;
				t.HFVB = t.TAB2(t.J) / 12 * t.ZMVB;
				t.FVBZ = Math.ceil(t.TAB3(t.J) / 12 * t.ZMVB);
			} else {
				t.VBEZB = (t.VBEZM * 12) + t.VBEZS;
				t.HFVB = t.TAB2(t.J);
				t.FVBZ = t.TAB3(t.J);
			}
			t.FVB = t.decimalCeil(t.VBEZB * t.TAB1(t.J) / 100, 2);
			if (t.FVB > t.HFVB) {
				t.FVB = t.HFVB;
			}
			if(t.FVB > t.ZVBEZJ) {
				t.FVB = t.ZVBEZJ;
			}
			t.FVBSO = t.decimalCeil(t.FVB + (t.VBEZBSO * t.TAB1(t.J) / 100), 2);
			if (t.FVBSO > t.TAB2(t.J)) {
				t.FVBSO = t.TAB2(t.J);
			}
			t.HFVBZSO = ((t.VBEZB + t.VBEZBSO) / 100) - t.FVBSO;
			t.FVBZSO = Math.ceil(t.FVBZ + (t.VBEZBSO / 100));
			if (t.FVBZSO > t.HFVBZSO) {
				t.FVBZSO = Math.ceil(t.HFVBZSO);
			}
			if (t.FVBZSO > t.TAB3(t.J)) {
				t.FVBZSO = t.TAB3(t.J);
			}
			t.HFVBZ = (t.VBEZB / 100) - t.FVB;
			if (t.FVBZ > t.HFVBZ) {
				t.FVBZ = Math.ceil(t.HFVBZ);
			}
		}

		// Ermittlung des Altersentlastungsbetrags
		t.func_MRE4ALTE();
	},

	/*
	* Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge
	*/
	func_MRE4ABZ: function () {
		var t = this;

		t.ZRE4 = t.ZRE4J - t.FVB - t.ALTE - t.JLFREIB + t.JLHINZU;
		if (t.ZRE4 < 0) {
			t.ZRE4 = 0;
		}
		t.ZRE4VP = t.ZRE4J;
		if (t.KENNVMT == 2) {
			t.ZRE4VP = t.ZRE4VP - (t.ENTSCH / 100);
		}
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
		var t = this;
		// Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale)
		t.func_MZTABFB();
		t.VFRB = (t.ANP + t.FVB + t.FVBZ) * 100;
		// Ermittlung der Jahreslohnsteuer für die Lohnsteuerberechnung
		t.func_MLSTJAHR();
		t.WVFRB = (t.ZVE - t.GFB) * 100;
		if(t.WVFRB < 0) {
			t.WVFRB = 0;
		}
		t.LSTJAHR = t.ST * t.F;
		// Ermittlung des Anteils der Jahreslohnsteuer für den Lohnzahlungszeitraum
		t.func_UPLSTLZZ();
		// Ermittlung des Anteils der berücksichtigten Vorsorgeaufwendungen für den Lohnzahlungszeitraum
		t.func_UPVKVLZZ();
		if(t.ZKF > 0) {
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
		var t = this;

		t.ANP = 0;
		if (t.ZVBEZ >= 0 && t.ZVBEZ < t.FVBZ) {
			t.FVBZ = t.ZVBEZ;
		}
		if (t.STKL < 6) {
			if (t.ZVBEZ > 0) {
				if ((t.ZVBEZ - t.FVBZ) < 102) {
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
				if ((t.ZRE4 - t.ZVBEZ) < 1000) {
					t.ANP = Math.ceil(t.ANP + t.ZRE4 - t.ZVBEZ);
				} else {
					t.ANP = t.ANP + 1000;
				}
			}
		}
		t.KZTAB = 1;
		if (t.STKL == 1) {
			t.SAP = 36;
			t.KFB = t.ZKF * 7620;
		} else if (t.STKL == 2) {
			t.EFA = 1908;
			t.SAP = 36;
			t.KFB = t.ZKF * 7620;
		} else if (t.STKL == 3) {
			t.KZTAB = 2;
			t.SAP = 36;
			t.KFB = t.ZKF * 7620;
		} else if (t.STKL == 4) {
			t.SAP = 36;
			t.KFB = t.ZKF * 3810;
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
	*
	*/
	func_UPMLST: function () {
		var t = this;

		if (t.ZVE < 1) {
			t.ZVE = 0;
			t.X = 0;
		} else {
			t.X = Math.floor(t.ZVE / t.KZTAB);
		}
		// Ermittlung der Jahreslohnsteuer aus dem Einkommensteuertarif
		if (t.STKL < 5) {
			t.func_UPTAB19( );
		} else {
			t.func_MST5_6( );
		}
	},

	/*
	* Anteil von Jahresbeträgen für einen LZZ
	*/
	func_UPANTEIL: function () {
		var t = this;

		if (t.LZZ == 1) {
			t.ANTEIL1 = t.JW;
		} else if (t.LZZ == 2) {
			t.ANTEIL1 = t.decimalFloor(t.JW / 12, 2);
		} else if (t.LZZ == 3) {
			t.ANTEIL1 = t.decimalFloor(t.JW * 7 / 360, 2);
		} else {
			t.ANTEIL1 = t.decimalFloor(t.JW / 360, 2);
		}
	},

	/*
	*
	*/
	func_UPLSTLZZ: function () {
		var t = this;

		t.JW = t.LSTJAHR * 100;
		// Ermittlung des Anteils der Jahreslohnsteuer für den Lohnzahlungszeitraum
		t.func_UPANTEIL();
		t.LSTLZZ = t.ANTEIL1;
	},

	/*
	*
	*/
	func_UPVKV: function () {
		var t = this;

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
	func_UPVKVLZZ: function () {
		var t = this;

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
	* Solidaritätszuschlag
	*/
	func_MSOLZ: function () {
		var t = this;

		t.SOLZFREI = t.SOLZFREI * t.KZTAB;
		if (t.JBMG > t.SOLZFREI) {
			t.SOLZJ = t.decimalFloor(t.JBMG * 5.5 / 100, 2);
			t.SOLZMIN = (t.JBMG - t.SOLZFREI) * 20 / 100;
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
	*
	*/
	func_UP5_6: function () {
		var t = this;

		t.X = t.ZX * 1.25;
		t.func_UPTAB19();
		t.ST1 = t.ST;
		t.X = t.ZX * 0.75;
		t.func_UPTAB19();
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
	* Lohnsteuer für die Klasse V und VI
	*/
	func_MST5_6: function () {
		var t = this;

		t.ZZX = t.X;
		if (t.ZZX > t.W2STKL5) {
			t.ZX = t.W2STKL5;
			t.func_UP5_6( );
			if (t.ZZX > t.W3STKL5) {
				t.ST = Math.floor(t.ST + ((t.W3STKL5 - t.W2STKL5) * 0.42));
				t.ST = Math.floor(t.ST + ((t.ZZX - t.W3STKL5) * 0.45));
			} else {
				t.ST = Math.floor(t.ST + ((t.ZZX - t.W2STKL5) * 0.42));
			}
		} else {
			t.ZX = t.ZZX;
			t.func_UP5_6( );
			if (t.ZZX > t.W1STKL5) {
				t.VERGL = t.ST;
				t.ZX = t.W1STKL5;
				t.func_UP5_6( );
				t.HOCH = Math.floor(t.ST + ((t.ZZX - t.W1STKL5) * 0.42));
				if (t.HOCH < t.VERGL) {
					t.ST = t.HOCH;
				} else {
					t.ST = t.VERGL;
				}
			}
		}
	},

	/*
	* Vorsorgepauschale - Vergleichsberechnung zu Midestvorsorgepauschale
	*/
	func_MVSP: function () {
		var t = this;

		if (t.ZRE4VP > t.BBGKVPV) {
			t.ZRE4VP = t.BBGKVPV;
		}

		if (t.PKV > 0) {
			if (t.STKL == 6) {
				t.VSP3 = 0;
			} else {
				t.VSP3 = t.PKPV * 12 / 100;
				if (t.PKV == 2) {
					t.VSP3 = t.VSP3 - t.ZRE4VP * (t.KVSATZAG + t.PVSATZAG);
				}
			}
			t.KVERS = 0; // VERSICHERUNGEN
			t.PVERS = 0; // VERSICHERUNGEN
		} else {
			t.VSP3 = t.ZRE4VP * (t.KVSATZAN + t.PVSATZAN)
		}
		t.VSP = Math.ceil(t.VSP3 + t.VSP1);
	},

	/*
	* Vorsorgepauschale
	*/
	func_UPEVP: function () {
		var t = this;

		if (t.KRV > 1) {
			t.VSP1 = 0;
		} else {
			if (t.ZRE4VP > t.BBGRV) {
				t.ZRE4VP = t.BBGRV;
			} else {

			}
		//RVERS = ZRE4VP * 0.0945;
			t.VSP1 = t.TBSVORV * t.ZRE4VP;
			t.VSP1 *= t.RVSATZAN;
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

	func_UPTAB19: function () {
		var t = this;

		if (t.X < t.GFB + 1) {
			t.ST = 0;
		} else if (t.X < 14255) {
			t.Y = (t.X - t.GFB) / 10000;
			t.RW = t.Y * 980.14;
			t.RW = t.RW + 1400;
			t.ST = Math.floor(t.RW * t.Y);
		} else if (t.X < 55961) {
			t.Y = (t.X - 14254) / 10000;
			t.RW = t.Y * 216.16;
			t.RW = t.RW + 2397;
			t.RW = t.RW * t.Y;
			t.ST = Math.floor(t.RW + 965.58);
		} else if (t.X < 265327) {
			t.ST = Math.floor((t.X * 0.42) - 8780.9);
		} else {
			t.ST = Math.floor((t.X * 0.45) - 16740.68);
		}
		t.ST = t.ST * t.KZTAB;
	},

	/*
	* Ermittlung Jahreslohnsteuer
	*/
	func_MLSTJAHR: function () {
		var t = this;
		// Ermittlung der Versorgungspauschale
		t.func_UPEVP();
		// Ermittlung der Steuer bei Vergütung für mehrjährige Tätigkeit
		if (t.KENNVMT !== 1) {
			t.ZVE = t.ZRE4 - t.ZTABFB - t.VSP;
			t.func_UPMLST();
		} else {
			t.ZVE = t.ZRE4 - t.ZTABFB - t.VSP - (t.VMT / 100) - (t.VKAPA / 100);
			if (t.ZVE < 0) {
		      // Sonderfall des negativen verbleibenden zvE
		      t.ZVE = (t.ZVE + (t.VMT / 100) + (t.VKAPA / 100)) / 5;
		      t.func_UPMLST( );
		      t.ST *= 5;
		  } else {
		      // Steuerberechnung ohne Einkünfte
		      t.func_UPMLST();
		      t.STOVMT = t.ST;
		      //--------------------------------
		      // Steuerberechnung mit Einkünften
		      t.ZVE = t.ZVE + ((t.VMT + t.VKAPA) / 500);
		      t.func_UPMLST( );
		      t.ST = ((t.ST - t.STOVMT) * 5) + t.STOVMT;
		  }
		}
	},

	/*
	* Berechnung sonstiger Bezüge
	*/
	func_MSONST: function () {
		var t = this;

		t.LZZ = 1;
		if (t.ZMVB == 0) {
			t.ZMVB = 12;
		}
		if (t.SONSTB == 0) {
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
			if(t.WVFRBM < 0) {
				t.WVFRBM = 0;
			}
			t.func_UPVKV();
			t.VKVSONST = t.VKV - t.VKVSONST;
			t.LSTSO = t.ST * 100;
			t.STS = Math.floor((t.LSTSO - t.LSTOSO) * t.F);
			if (t.STS < 0) {
				t.STS = 0;
			}
			t.SOLZS = t.decimalFloor(t.STS * 5.5 / 100, 2);
			if (t.R > 0) {
				t.BKS = t.STS;
			} else {
				t.BKS = 0;
			}
		}
	},

	/*
	* Sonderberechung mit sonstigen Bezügen für Berechnung bei sosntigen Bezügen
	* oder Vergütung für mehrjährige Tätigkeit
	*/
	func_MRE4SONST: function ( ) {
		var t = this;

		t.func_MRE4();
		t.FVB = t.FVBSO;
		t.func_MRE4ABZ();
		t.ZRE4VP = t.ZRE4VP - (t.JRE4ENT / 100) - (t.SONSTENT / 100);
		t.FVBZ = t.FVBZSO;
		t.func_MZTABFB();
		t.VFRBS2 = (t.ANP + t.FVB + t.FVBZ) * 100 - t.VFRBS1;
	},

	/*
	* Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen
	* oder Vergütung für mehrjährige Tätigkeit
	*/
	func_MOSONST: function () {
		var t = this;

		t.ZRE4J = t.JRE4 / 100;
		t.ZVBEZJ = t.JVBEZ / 100;
		t.JLFREIB = t.JFREIB / 100;
		t.JLHINZU = t.JHINZU / 100;
		t.func_MRE4();
		t.func_MRE4ABZ();
		t.ZRE4VP = t.ZRE4VP - (t.JRE4ENT / 100);
		t.func_MZTABFB();
		t.VFRBS1 = (t.ANP + t.FVB + t.FVBZ) * 100;
		t.func_MLSTJAHR();
		t.WVFRBO = (t.ZVE - t.GFB) * 100;
		if(t.WVFRBO < 0) {
			t.WVFRBO = 0;
		}
		t.LSTOSO = t.ST * 100;
	},

	/*
	* Berechnung der Vergütung für mehrjährige Tätigkeit
	*/
	func_MVMT: function () {
		var t = this;

		if (t.VKAPA < 0) {
			t.VKAPA = 0;
		}
		if ((t.VMT + t.VKAPA) > 0) {
			if (t.LSTSO == 0) {
				t.func_MOSONST( );
				t.LST1 = t.LSTOSO;
			} else {
				t.SLT1 = t.LSTSO;
			}
			t.VBEZBSO = t.STERBE + t.VKAPA;
			t.ZRE4J = (t.JRE4 + t.SONSTB + t.VMT + t.VKAPA) / 100;
			t.ZVBEZJ = (t.JVBEZ + t.VBS + t.VKAPA) / 100;
			t.KENNVMT = 2;
			t.func_MRE4SONST( );
			t.func_MLSTJAHR( );
			t.LST3 = t.ST * 100;
			t.func_MRE4ABZ( );
			t.ZRE4VP = t.ZRE4VP - (t.JRE4ENT / 100) - (t.SONSTENT / 100);
			t.KENNVMT = 1;
			t.func_MLSTJAHR( );
			t.LST2 = t.ST * 100;
			t.STV = t.LST2 - t.LST1;
			t.LST3 = t.LST3 - t.LST1;
			if (t.LST3 < t.STV) {
				t.STV = t.LST3;
			}
			if (t.STV < 0) {
				t.STV = 0;
			} else {
				t.STV = Math.floor(t.STV * t.F);
			}
			t.SOLZV = t.decimalFloor(t.STV * 5.5 / 100, 2);
			if (t.R > 0) {
				t.BKV = t.STV;
			} else {
				t.BKV = 0;
			}
		} else {
			t.STV = 0;
			t.SOLZV = 0;
			t.BKV = 0;
		}
	},

	func_LST: function () {
		var t = this;
		// console.log(2019);

		t.func_MPARA();
		t.func_MRE4JL();
		t.VBEZBSO = 0;
		t.KENNVMT = 0;
		t.func_MRE4();
		t.func_MRE4ABZ();
		t.func_MBERECH();
		t.func_MSONST();
		t.func_MVMT();
	},


	// *******************************
	// * HELPER FUNCTIONS
	// *******************************
	decimalRound: function (numberToRound, precision){
		var t = this, factor = Math.pow(10, precision);
		return Math.round(numberToRound * factor) / factor;
	},

	decimalCeil: function (numberToCeil, precision) {
		var t = this, factor = Math.pow(10, precision);
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
		var t = this, factor = Math.pow(10, precision);
		return Math.floor(numberToFloor * factor) / factor;
	},

	initParams: function () {
		var t = this;

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
	   t.LST1, t.LST2, t.LST3, t.LSTOSO, t.LSTSO = 0;
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
	}
}
