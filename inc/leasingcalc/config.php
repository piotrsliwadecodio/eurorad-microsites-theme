<?php

global $siteOptions;
global $optionsArr;

// $siteOptions["calc_version"] = '2022';
// $siteOptions['calc_country'] = 'AT';
//*********************
// CONFIG
//*********************

$minBikePrice = $siteOptions['filter_price_min'] ? $siteOptions['filter_price_min'] :  357;
$maxBikePrice = $siteOptions['filter_price_max'] ? $siteOptions['filter_price_max'] : 1000000;
$monthlyIncome = isset($_REQUEST['DOMAIN']) ? "3000" : "";
$maxBikes = $siteOptions['max-bikes'] ? $siteOptions['max-bikes'] : 1;
if ($maxBikes == 1) {
  $maxBikesWords = 'ein';
} elseif ($maxBikes == 2) {
  $maxBikesWords = 'zwei';
} elseif ($maxBikes == 3) {
  $maxBikesWords = 'drei';
} elseif ($maxBikes == 4) {
  $maxBikesWords = 'vier';
} elseif ($maxBikes == 5) {
  $maxBikesWords = 'fünf';
} elseif ($maxBikes == 6) {
  $maxBikesWords = 'sechs';
} elseif ($maxBikes == 7) {
  $maxBikesWords = 'sieben';
} elseif ($maxBikes == 8) {
  $maxBikesWords = 'acht';
} elseif ($maxBikes == 9) {
  $maxBikesWords = 'neun';
} elseif ($maxBikes == 10) {
  $maxBikesWords = 'zehn';
} elseif ($maxBikes == 11) {
  $maxBikesWords = 'elf';
} elseif ($maxBikes == 12) {
  $maxBikesWords = 'zwölf';
}

if (trim($siteOptions['ersparnis_sternchen']) === '-') {
  $siteOptions['ersparnis_sternchen'] = '';
}

$price = is_string($siteOptions['default_bike_price']) ? $siteOptions['default_bike_price'] : 999.99;
$priceUvp = is_string($siteOptions['default_bike_price']) ? $siteOptions['default_bike_price'] : 999.99;

$currentState = $siteOptions['federal_state'] ? $siteOptions['federal_state'] : (isset($_REQUEST['DOMAIN']) ? "NRW" : '');
$states = array(
  array('short' => 'BW', 'full' => 'Baden-Württemberg'),
  array('short' => 'BAYERN', 'full' => 'Bayern'),
  array('short' => 'BERLIN', 'full' => 'Berlin'),
  array('short' => 'BRANDENBURG', 'full' => 'Brandenburg'),
  array('short' => 'BREMEN', 'full' => 'Bremen'),
  array('short' => 'HH', 'full' => 'Hamburg'),
  array('short' => 'HESSEN', 'full' => 'Hessen'),
  array('short' => 'MECKLENBURG', 'full' => 'Mecklenburg-Vorpommern'),
  array('short' => 'NIEDERSACHSEN', 'full' => 'Niedersachsen'),
  array('short' => 'NRW', 'full' => 'Nordrhein-Westfalen'),
  array('short' => 'RP', 'full' => 'Rheinland-Pfalz'),
  array('short' => 'SAARLAND', 'full' => 'Saarland'),
  array('short' => 'SACHSEN', 'full' => 'Sachsen'),
  array('short' => 'SA', 'full' => 'Sachsen-Anhalt'),
  array('short' => 'SH', 'full' => 'Schleswig-Holstein'),
  array('short' => 'TH', 'full' => 'Thüringen')
);

$features = array(
  'basis' => array(
    'Accident' => true,
    'Fall' => true,
    'Vandalism' => true,
    'ImproperHandling' => true,
    'ElectricDamage' => true,
    'BatteryDamage' => true,
    'MaterialDamage' => true,
    'Theft' => true,
    'Burglary' => true,
    'Robbery' => true,
    'WearOff' => false,
    'CostAbsorbtion' => false,
    'AbsorbtionAfterYear2' => false,
    'MobilityProtection' => false,
    'SickLeave' => false,
    'ParentalLeave' => false,
    'DepartureOfEmployee' => false,
    'AccidentalDeath' => false,
    'Deductible' => "basicDeductible",
    'SmallClaims' => "basicSmallClaims",
  ),
  'premium' => array(
    'Accident' => true,
    'Fall' => true,
    'Vandalism' => true,
    'ImproperHandling' => true,
    'ElectricDamage' => true,
    'BatteryDamage' => true,
    'MaterialDamage' => true,
    'Theft' => true,
    'Burglary' => true,
    'Robbery' => true,
    'WearOff' => true,
    'CostAbsorbtion' => true,
    'AbsorbtionAfterYear2' => false,
    'MobilityProtection' => true,
    'SickLeave' => true,
    'ParentalLeave' => true,
    'DepartureOfEmployee' => true,
    'AccidentalDeath' => true,
    'Deductible' => "compareTableNone",
    'SmallClaims' => "compareTableNone",
  ),
  'premiumPlus' => array(
    'Accident' => true,
    'Fall' => true,
    'Vandalism' => true,
    'ImproperHandling' => true,
    'ElectricDamage' => true,
    'BatteryDamage' => true,
    'MaterialDamage' => true,
    'Theft' => true,
    'Burglary' => true,
    'Robbery' => true,
    'WearOff' => true,
    'CostAbsorbtion' => false,
    'AbsorbtionAfterYear2' => true,
    'MobilityProtection' => true,
    'SickLeave' => true,
    'ParentalLeave' => true,
    'DepartureOfEmployee' => true,
    'AccidentalDeath' => true,
    'Deductible' => "compareTableNone",
    'SmallClaims' => "compareTableNone",
  )
);

$insurancePackages = array();
$insPackIndex = 0;
// print_r($siteOptions['verspraemien']);
// print_r($siteOptions['insurance']);
foreach ($siteOptions['verspraemien']  as $vers) {
  $name = $vers['value'];
  $title = $vers['label'];

  $leasingFactors = array();
  // CURRENT
  // foreach($siteOptions['leasing_factor'] as $paket) {
  //   if($paket['paketname'] === $name) {
  //     foreach($paket['steps'] as $step) {
  //       array_push($leasingFactors, array('upto' => $step['upto'], 'value' =>  $step['factor'] ));
  //     }
  //   }
  // }

  $leasingInsurancePrices = array();
  foreach ($siteOptions['insurance'] as $paket) {
    if ($paket['paketname'] === $name) {
      foreach ($paket['steps'] as $step) {
        array_push($leasingInsurancePrices, array('upto' => floatval($step['upto']), 'value' =>  floatval($step['verspraemie'])));
      }
      // NEW
      foreach ($paket['leasingfactor'] as $leasingfactor) {
        array_push($leasingFactors, array('upto' => floatval($leasingfactor['upto']), 'value' =>  floatval($leasingfactor['factor'])));
      }


      $package = array(
        'name' => $name,
        'title' => $title,
        'leasingFactors' => $leasingFactors,
        'leasingInsurancePrices' => $leasingInsurancePrices,
        'features' => $features[$name],
        'maxBikePrice' =>  $paket['maxbikeprice'] ? $paket['maxbikeprice'] : 1000000,
      );
      $insurancePackages[$insPackIndex] = $package;
    }
  }
  $insPackIndex++;
}

$employerBenefitPerPackage = array();
if (is_array($siteOptions['agzuschuss_je_paket'])) {
  foreach ($siteOptions['agzuschuss_je_paket'] as $paket) {
    $employerBenefitPerPackage[$paket['paket']] = $paket['betrag'];
  }
}

$defaultBenefit = floatval($siteOptions["employersshare_value"]);
if ($siteOptions["employersshare"] === "7") {
  $defaultBenefit = floatval($siteOptions["employersshare_dropdown"][0]['wert']);
}

$benefitDropDown = array();
foreach ($siteOptions["employersshare_dropdown"] as $dropdownItem) {
  array_push($benefitDropDown, array('optValue' => $dropdownItem['wert'], 'name' => $dropdownItem['titel']));
}

$benefitAdditional = array();
foreach ($siteOptions["employersshare_additional"] as $dropdownItem) {
  array_push($benefitDropDown, array('value' => $dropdownItem['wert'], 'name' => $dropdownItem['titel'], 'editable' => $dropdownItem['editierbar']));
}

$mainColor = $siteOptions['main_color'];
$linkColor = $mainColor;
if ($siteOptions['secondary_color']) $linkColor = $siteOptions['secondary_color'];
if ($siteOptions['a_color']) $linkColor = $siteOptions['a_color'];
//*********************
// NEW CALCULATOR OPTIONS
//*********************
if ($siteOptions["calc_country"] === 'DE') {
  $optionsArr = array(
    "initialParams" => array(
      'totalPrice' =>  $price, // 999.99, // bike price in €
      'totalPriceUVP' => $priceUvp, // 999.99, // bike uvp price in €
      'salaryGross' => $monthlyIncome, // 3000, // monthly income  in €
      'insurancePackage' => $insurancePackages[count($insurancePackages) - 1]['name'], // "premium", // insurance package baisc|premium|premiumPlus
      'employerTaxDeduction' => $siteOptions['ust_at'] === '0' || $siteOptions['ust'] === '1' ? false : true, // true, // if employer can deduct VAT or not
      // 'churchTax' => true, // true, // has to pay church tax or not
      // 'taxClass' => 1, // 1, // tax class I to VI
      // 'taxFactor' => 1, // 1, // tax factor for IV tax class
      // 'leasingperiod' => 36, // 36, // default is 36 (3 years)
      'benefit' => $defaultBenefit, // 3.33, // employer benefit in € per bike
      'benefit2' => floatval($siteOptions["employersshare_value_2"]), // 3.33, // employer benefit in € per bike
      'benefitInternet' => floatval($siteOptions["leasing_contribution_internet"]), // 0,
      'benefitPhone' =>  floatval($siteOptions["leasing_contribution_phone"]), // 0,
      'benefitAds' => floatval($siteOptions["leasing_contribution_advertising"]), // 0,
      // 'pensionInsurance' => 0,// 0,
      // 'healthInsurance' => 1, // 1, // public (1) or private (1)
      // 'healthInsuranceFactor' => 1.3, // 1.3, // factor for public health insurance (default is 1.3)
      'region' =>  $currentState, // "NRW", // region preselect
      'workTypeOfficial' =>  $siteOptions["calctype"] === "3" // false, // if is official (Beamte) or not
      // 'hasChildren' => false, // false, // if has children
      // 'childAllowances' => 0, // 0, // child allowances
      // 'childrenCount' => 0, // 0, // number of children
      // 'bikeCount' => 0, // 0, // number of bikes
    ),
    "hiddenInputs" => array(
      // "hasChildren",
      // "pensionInsurance",
      // "healthInsurance",
      // "workTypeOfficial",
      // "region",
      // "employerBenefit",
      "benefitAds",
      "benefitPhone",
      "benefitInternet",
      // "insurancePackage",
      "leasingPeriod",
      // "employerTaxDeduction",
      // "taxClass",
      // "churchTax",
    ),
    "colors" => array(
      // 'text' =>  "#444", // text color
      // 'formBg' =>  "#f7f7f7", // form background
      // 'yes' =>  "#6edc6e", // toggle switched to yes
      'primary' =>  $mainColor, // "purple", // headlines, big result numbers
      "button" => $linkColor, // "purple", // buttons background
      // 'buttonText' => "#ffffff", // text on buttons
      // 'buttonLight' => "#ccc", // lower prio buttons background
      // 'textLight' => "#aaa", // lower prio light texts
      // 'results' => "#eee", // results backround
      // 'border' => "#00000008", // border color
      // 'input' =>  "white", // input background
      // 'inputDisabled' => "#ddd", // disabled input background
      // 'resultRowHighlight' => "#fbfbfb", // result highlighted rows background
      // 'resultRowHead' =>  "#f6f6f6", // result heading background
    ),
    "settings" => array(
      // 'language' => "de", // set language if multiple text sets are include (see texts attribute below)
      'isProduct' => false, // if calculator is included on product page
      'calculateMethod' => "direct", // calculate "direct" via button click ("button")
      'formMode' => "extended", // "extended" or "compact" (the latter can be extended via click)

      // bike settings
      // 'repairCost' => 400, // repair cost per bike used in calculation
      'maxBikes' => $maxBikes, // 2, // maximum bikes allowed
      'maxBikePrice' => $maxBikePrice, // maximum bike price for each bike
      'minBikePrice' => $siteOptions['preis_untergrenze'] ? $siteOptions['preis_untergrenze'] : $minBikePrice, // 357, // minimum bike price for each bike

      // employer benefit
      'benefitType' => intval($siteOptions['employersshare']), // 2, // 0 = none; 1 = fixed value ber bike depending on insurance packae; 2 = fixed value per bike; 3: percent of total price (bikes + insurance), 4: percent of insurance price
      'benefitDropdown' => $benefitDropDown, //
      'benefitAdditional' => $benefitAdditional, //
      'benefitPerInsurancePackage' => $employerBenefitPerPackage,
      'benefitBikeCount' => $siteOptions['employersshare_bike_count'], // 1000, // maximum bikes the employer benefit will be multiplied with
      'benefitFixed' => ($siteOptions['employersshare'] !== "6" && $siteOptions['employersshare_value']) ? true : false, // set employer benefit field disabled (so user cannot change it)

      // calculation details
      'noTaxOnInsurance' => $siteOptions['no_tax_on_insurance'], // false, // if insurance should be calculated without tax
      'subtractBenefitsInResults' => $siteOptions['subtract_employersshare_in_result'], // false, // if employer benefit should be subtracted from leasing rate
      'subtractTaxAfterEmployerBenefit' => $siteOptions['subtract_tax_after_employershare'], // false, // if VAT should be subtracted from monthly income after employer benefit
      'useFullBikeUvpPrice' => $siteOptions['use_full_bike_uvp'], // false, // default is a quarter of the bike uvp price for subtraction from monthly income
      'hasReverseCalculator' => $siteOptions['has_reverse_calculator'], // false, // if reverse calculator is enabled
      // 'includeInsuranceForFactorComparison' => false, // default for looking up leasing factor is netto bike price. If set to "true" the insurance price will be also included for lookup

      // dropdown for regions
      'regions' => $states,

      // insurance and leasing facor tables
      'insurancePackages' => $insurancePackages,
    ),
    "texts" => array(
      "de" => array()
    ),
  );

  // HIDDEN PARAMS
  if ($siteOptions['prefix'] === 'zeg') {
    $optionsArr['settings']['linkToInsurances'] = 'https://www.eurorad.de/versicherung';
  }

  // HIDDEN PARAMS
  if ($siteOptions["hide_field_leasingperiod"]) {
    array_push($optionsArr['hiddenInputs'], 'leasingperiod');
  }
  if ($siteOptions["hide_field_employerTaxDeduction"]) {
    array_push($optionsArr['hiddenInputs'], 'employerTaxDeduction');
  }
  if ($siteOptions["ust"] !== "3") {
    array_push($optionsArr['hiddenInputs'], 'employerTaxDeduction');
  }
  if ($siteOptions["hide_field_employerBenefit"]) {
    array_push($optionsArr['hiddenInputs'], 'employerBenefit');
  }
  if ($siteOptions["calctype"] === "3" || $siteOptions["opt_beamte"] === "0") {
    array_push($optionsArr['hiddenInputs'], 'workTypeOfficial');
  }

  // TEXTS
  if ($siteOptions['calc_country'] === 'DE') {
    if ($siteOptions['ag_zuschuss_erlauterung']) {
      $optionsArr['texts']['de']['benefitHintText'] = $siteOptions['ag_zuschuss_erlauterung'];
    }
  } else {
    if ($siteOptions['ag_zuschuss_erlauterung_at']) {
      $optionsArr['texts']['de']['benefitHintText'] = $siteOptions['ag_zuschuss_erlauterung_at'];
    }
  }

  if ($siteOptions['ersparnis_sternchen']) {
    $optionsArr['texts']['de']['insuranceCostExplaination'] = $siteOptions['ersparnis_sternchen'];
  }

  if ($siteOptions['ag_zuschuss_detailcalc_text']) {
    $optionsArr['texts']['de']['benefitTable'] = $siteOptions['ag_zuschuss_detailcalc_text'];
  }

  if ($siteOptions['ust_erlauterung']) {
    $optionsArr['texts']['de']['employerTaxDeductionHintText'] = $siteOptions['ust_erlauterung'];
  }

  if ($siteOptions['kv_erlauterung']) {
    $optionsArr['texts']['de']['healthInsuranceFactorHintText'] = $siteOptions['kv_erlauterung'];
  }
  if ($siteOptions['quarter_price_erlauterung']) {
    $optionsArr['texts']['de']['quarterPriceUVPHintText'] = $siteOptions['quarter_price_erlauterung'];
  }

  if ($siteOptions['text_after_ergebnis_Monatliche_Leasingrate']) {
    $optionsArr['texts']['de']['leasingRateAddition'] = $siteOptions['text_after_ergebnis_Monatliche_Leasingrate'];
  }
} else {

  $optionsArr = array(
    "initialParams" => array(
      'totalPrice' =>  $price, // 999.99, // bike price in €
      'totalPriceUVP' => $priceUvp, // 999.99, // bike uvp price in €
      // 'monthlyIncome' => $monthlyIncome,// 3000, // monthly income  in €
      'employerTaxDeduction' => $siteOptions['ust_at'] === '0' || $siteOptions['ust'] === '1' ? false : true, // true, // if employer can deduct VAT or not
      // "withPremiumPlus" => true,
      // "leasingperiod" => 48,
      // "acceptCostLeasingRate" => "AN",
      // "acceptCostPremiumPlus" => "AN",
      // "employerBenefit" => 0,
      'healthInsuranceFactor' => $siteOptions['kv_addition'] ? $siteOptions['kv_addition'] : 1.7,
      "workTypeOfficial" => false,
    ),
    "hiddenInputs" => array(
      "acceptCostLeasingRate",
      "withPremiumPlus",
      "acceptCostPremiumPlus",
      // 'leasingperiod',
      // 'employerTaxDeduction',
      // 'employerBenefit',
    ),
    "colors" => array(
      // 'text' =>  "#444", // text color
      // 'formBg' =>  "#f7f7f7", // form background
      // 'yes' =>  "#6edc6e", // toggle switched to yes
      'primary' =>  'var(--color-main)', // "purple", // headlines, big result numbers
      "button" => 'var(--color-link)', // "purple", // buttons background
      // 'buttonText' => "#ffffff", // text on buttons
      // 'buttonLight' => "#ccc", // lower prio buttons background
      // 'textLight' => "#aaa", // lower prio light texts
      // 'results' => "#eee", // results backround
      // 'border' => "#00000008", // border color
      // 'input' =>  "white", // input background
      // 'inputDisabled' => "#ddd", // disabled input background
      // 'resultRowHighlight' => "#fbfbfb", // result highlighted rows background
      // 'resultRowHead' =>  "#f6f6f6", // result heading background
    ),
    "settings" => array(
      // // 'language' => "de", // set language if multiple text sets are include (see texts attribute below)
      // // bike settings
      // // 'repairCost' => 400, // repair cost per bike used in calculation
      // "initialBikePrice" => 999.9,
      // "initialBikePriceUvp" => 999.99,
      'maxBikes' => $maxBikes, // 2, // maximum bikes allowed
      'maxBikePrice' => $maxBikePrice, // maximum bike price for each bike
      'minBikePrice' => $siteOptions['preis_untergrenze'] ? $siteOptions['preis_untergrenze'] : $minBikePrice, // 357, // minimum bike price for each bike
    ),
    "texts" => array(
      "de" => array()
    ),
  );
}

//*********************
// OLD CONFIG
//*********************

$verspraemien = array();
foreach ($siteOptions['verspraemien'] as $vers) {
  array_push($verspraemien, $vers['value']);
};

$ustClass = '';
if ($siteOptions['ust'] === '1') $ustClass = 'with-ust';
// $siteOptions['subtract_tax_after_employershare'] = "1";

$bikeLimitMessage = $maxBikes > 1 ? $maxBikesWords . ' Bikes kalkuliert werden können' : $maxBikesWords . ' Bike kalkuliert werden kann';

if ($siteOptions['employersshare'] === '3' && !empty($siteOptions['employersshare_value'])) {
  $agzuschussPercent .= 'data-agzuschuss-percent="' . $siteOptions['employersshare_value'] . '"';
}

$agzuschussPakete = '';
if (isset($siteOptions['agzuschuss_je_paket']) && !empty($siteOptions['agzuschuss_je_paket'])) {
  foreach ($siteOptions['agzuschuss_je_paket'] as $agzuschussPaket) {
    if ($agzuschussPaket['betrag'] > 0) {
      $agzuschussPakete .= 'data-agzuschuss-' . strtolower($agzuschussPaket['paket']) . '="' . $agzuschussPaket['betrag'] . '" ';
    }
  }
}

$noSavings = $siteOptions['no_savings'] === '1' ? true : false;
$year = isset($_REQUEST['year']) ? $_REQUEST['year'] : date("Y");

//*********************
// FACTORS
//*********************

if (isset($siteOptions['leasing_factor'])) {
  $factorObject = array();
  foreach ($siteOptions['leasing_factor'] as $paket) {
    if (in_array($paket['paketname'], $verspraemien)) $factorObject[$paket['paketname']] = $paket['steps'];
  }
}
$factorObjectJson = json_encode($factorObject);

//*********************
// INSURANCE
//*********************

if (isset($siteOptions['insurance'])) {
  $insuranceObject = $insurancePackages;
  // foreach($siteOptions['insurance'] as $paket) {
  //   if(in_array($paket['paketname'], $verspraemien)) $insuranceObject[$paket['paketname']] = $paket['steps'];
  // }
}
$insuranceObjectJson = json_encode($insuranceObject);
