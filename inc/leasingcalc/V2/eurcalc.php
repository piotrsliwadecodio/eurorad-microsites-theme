<?php 

$options = htmlentities(json_encode($optionsArr));

add_action('wp_footer', function(){
    wp_enqueue_script('zeg-leasingcalc-2022', get_stylesheet_directory_uri().'/modules/leasingcalc/V2/eurcalc.js?v=2.11');
});

$styleSheet = get_stylesheet_directory_uri().'/modules/leasingcalc/V2/eurcalc.css?v=2.11';

if($siteOptions["calc_country"] === 'AT') { ?>
    <div id="lur_main_layout"><eur-leasingcalc options='<?php echo $options ?>' country="at" style-sheet="<?php echo $styleSheet ?>"></div>
<?php } else { ?>
    <div id="lur_main_layout"><eur-leasingcalc options='<?php echo $options ?>' country="de" style-sheet="<?php echo $styleSheet ?>"></div>    
<?php } ?>
