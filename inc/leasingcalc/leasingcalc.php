<?php  

include('config.php');

if($siteOptions["calc_country"] === 'AT' || $siteOptions["calc_version"] === '2022') {
    include('V2/eurcalc.php');
} else {
    include('V1/tmp-rechner.php');
}