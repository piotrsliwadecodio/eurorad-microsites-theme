<?php
// Remove microsite post type from Yoast SEO indexable post types
add_filter(
    'wpseo_indexable_post_types',
    function ( $types ) {
        unset( $types['microsite'] );
        return $types;
    }
);

// Remove microsite post type from WordPress sitemaps
add_filter(
    'wp_sitemaps_post_types',
    function ( $post_types ) {
        unset( $post_types['microsite'] );
        return $post_types;
    }
);

// Exclude microsite from search results on frontend
add_action(
    'pre_get_posts',
    function ( $query ) {
        if ( ! is_admin() && $query->is_main_query() && $query->is_search() ) {
            $query->set( 'post_type', array( 'post', 'page' ) );
        }
    }
);

// Add noindex,nofollow to microsite pages
add_action(
    'wp_head',
    function () {
        if ( is_microsite() ) {
            echo '<meta name="robots" content="noindex,nofollow">';
        }
    }
);

// Override page title for microsite with parent microsite title
add_filter(
    'wpseo_title',
    function ( $title ) {
        global $siteOptions;
        if ( is_microsite() ) {
            $context      = get_microsite_context();
            $microsite_id = $siteOptions['microsite_id'] ?? 0;
            return get_the_title( $microsite_id );
        }
        return $title;
    }
);
