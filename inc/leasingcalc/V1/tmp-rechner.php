<?php
add_action('wp_footer', function () {
    wp_enqueue_style('zeg-leasingcalc', get_stylesheet_directory_uri() . '/inc/leasingcalc/V1/assets/css/lur.min.css?v=2025.1', null, null);
    wp_enqueue_script('eur-leasing', get_stylesheet_directory_uri() . '/inc/leasingcalc/V1/assets/js/eur.module.calc.js?v=2025.3', array());
});

?>

<div id="lur_main_layout" class="<?php echo $ustClass; ?> jahr<?php echo date("Y"); ?>"
    data-factorobject="<?php echo htmlspecialchars($factorObjectJson, ENT_QUOTES, 'UTF-8'); ?>"
    data-insuranceobject="<?php echo htmlspecialchars($insuranceObjectJson, ENT_QUOTES, 'UTF-8'); ?>"
    data-calctype="<?php echo $siteOptions["calctype"]; ?>"
    data-employersshare="<?php echo $siteOptions["employersshare"]; ?>"
    data-subtract-employersshare-in-result="<?php echo $siteOptions["subtract_employersshare_in_result"]; ?>"
    data-employersshare-value="<?php echo $siteOptions["employersshare_value"]; ?>"
    data-employersshare-value-2="<?php echo $siteOptions["employersshare_value_2"]; ?>"
    data-employersshare-bike-count="<?php echo $siteOptions["employersshare_bike_count"]; ?>"
    data-employersshare-multiply="<?php echo $siteOptions["employersshare_multiply"]; ?>"
    data-no-tax-on-insurance="<?php echo $siteOptions["no_tax_on_insurance"]; ?>"
    data-client="<?php echo $siteOptions["prefix"]; ?>"
    data-year="<?php echo date("Y"); ?>"
    data-use-full-bike-uvp="<?php echo $siteOptions["use_full_bike_uvp"]; ?>"
    data-max-bikes="<?php echo $maxBikes; ?>"
    data-subtract-tax-after-employershare="<?php echo $siteOptions['subtract_tax_after_employershare'] ? 1 : 0; ?>"
    <?php echo $agzuschussPakete; ?>
    data-nosavings="<?php echo $noSavings; ?>">
    <form name="lur_main_form" class="lur_main_form">
        <div id="lur_content_container">
            <?php include('_partials/rechner.php'); ?>
            <?php include('_partials/table.php'); ?>
    </form>
</div>
<!-- </div> -->