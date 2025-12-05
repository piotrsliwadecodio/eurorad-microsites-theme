<?php
// Add Display taxonomy to Help Center Posts
add_action('elementor/query/help_center_query', function( $query ) {
    if ( function_exists('is_microsite') && is_microsite() ) {
        global $siteOptions;
        $current_microsite = $siteOptions['microsite_id'];
        
        $tax_query = array(
            array(
                'taxonomy' => 'display-category',
                'field'    => 'slug',
                'terms'    => array('microsites'),
            )
        );

        $meta_query = array();
        // Only filter if display_for_microsites has a value to match
        if ($current_microsite) {
            $meta_query[] = array(
                'key'     => 'display_for_microsites',
                'value'   => '"' . $current_microsite . '"', // match in serialized array
                'compare' => 'LIKE'
            );
        }

        $query->set('tax_query', $tax_query);
        if (!empty($meta_query)) {
            $query->set('meta_query', $meta_query);
        }
    } else {
        $tax_query = array(
            array(
                'taxonomy' => 'display-category',
                'field'    => 'slug',
                'terms'    => array('main'),
            )
        );
        $query->set('tax_query', $tax_query);
    }
});