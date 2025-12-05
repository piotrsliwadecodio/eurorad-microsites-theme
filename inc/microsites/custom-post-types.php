<?php
// Custom post for Microsites
function er_microsites_posts() {
    $labels = array(
        'name'          => _x('Microsites', 'Post Type General Name', 'text_domain'),
        'singular_name' => _x('Microsite', 'Post Type singular Name', 'text_domain'),
        'menu_name'     => __('Microsites', 'text_domain'),
        'all_items'     => __('All Microsites', 'text_domain'),
        'add_new_item'  => __('Add New Microsite', 'text_domain'),
        'edit_item'     => __('Edit Microsite', 'text_domain'),
        'view_item'     => __('View Microsite', 'text_domain'),
    );
    
    $args = array(
        'label'              => __('microsite', 'text_domain'),
        'description'        => __('Microsite', 'text_domain'),
        'labels'             => $labels,
        'supports'           => array('title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields'),
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'has_archive'        => false,
        'rewrite'            => false, // CRITICAL: Disable automatic rewrites
        'show_in_rest'       => true,
        'capability_type'    => 'page',
        'map_meta_cap'       => true,
        'hierarchical'       => false,
        'exclude_from_search'=> true,          // 1) WP search disabled
    );
    
    register_post_type('microsite', $args);
}
add_action('init', 'er_microsites_posts', 0);

// Custom permalink structure (admin only)
// CRITICAL: Don't interfere with Elementor edit links
add_filter('post_type_link', function($post_link, $post) {
    // Skip if Elementor is active - Elementor needs to generate its own URLs
    if (function_exists('is_elementor_active') && is_elementor_active()) {
        return $post_link;
    }
    
    // Skip if this is an Elementor edit request
    if (isset($_GET['elementor-preview'])) {
        return $post_link;
    }
    
    if ($post->post_type === 'microsite') {
        // In admin, show clean URLs for preview
        $post_link = home_url('/' . $post->post_name . '/?mode=microsite');
    }
    return $post_link;
}, 10, 2);

// Register Microsite Type Taxonomy
function er_microsite_type() {
    register_taxonomy(
        'microsite-type',
        'microsite',
        array(
            'hierarchical' => true,
            'label'        => 'Microsite Types',
            'query_var'    => true,
            'rewrite'      => array( 'slug' => 'microsite-type' ),
            'show_ui' => true,
            'show_in_nav_menus' => true, // Add this line
        )
    );
}
add_action('init', 'er_microsite_type');

function er_microsite_slug_column($columns) {
    $columns['microsite-slug'] = 'Slug';
    return $columns;
}
add_filter('manage_microsite_posts_columns', 'er_microsite_slug_column');

function er_microsite_slug_column_content($column_name, $post_id) {
    if ('microsite-slug' === $column_name) {
        $post = get_post($post_id);
        echo $post->post_name;
    }
}
add_action('manage_microsite_posts_custom_column', 'er_microsite_slug_column_content', 10, 2);


function er_microsite_type_column($columns) {
    $columns['microsite-type'] = 'Microsite Type';
    return $columns;
}
add_filter('manage_microsite_posts_columns', 'er_microsite_type_column');

// Show Term(s) for Each Post in Admin Column
function er_microsite_type_column_content($column_name, $post_id) {
    if ('microsite-type' === $column_name) {
        $terms = wp_get_post_terms($post_id, 'microsite-type');
        $links = array();
        foreach ($terms as $term) {
            $links[] = '<a href="' . get_term_link($term) . '">' . esc_html($term->name) . '</a>';
        }
        echo implode(', ', $links);
    }
}
add_action('manage_microsite_posts_custom_column', 'er_microsite_type_column_content', 10, 2);

function er_microsite_domain_column($columns) {
    $columns['microsite-domain'] = 'Domain';
    return $columns;
}
add_filter('manage_microsite_posts_columns', 'er_microsite_domain_column');

function er_microsite_domain_column_content($column_name, $post_id) {
    if ('microsite-domain' === $column_name) {
        $domain = get_field('domain', $post_id);
        echo $domain;
    }
}
add_action('manage_microsite_posts_custom_column', 'er_microsite_domain_column_content', 10, 2);

// Add column in admin with ACF 'type' field value
function er_microsite_acf_type_column($columns) {
    $columns['microsite-acf-type'] = 'Type';
    return $columns;
}
add_filter('manage_microsite_posts_columns', 'er_microsite_acf_type_column');

function er_microsite_acf_type_column_content($column_name, $post_id) {
    if ('microsite-acf-type' === $column_name) {
        $acf_type = get_field('type', $post_id);
        echo esc_html($acf_type);
    }
}
add_action('manage_microsite_posts_custom_column', 'er_microsite_acf_type_column_content', 10, 2);


// Add Filter Dropdown for Microsite Type in Admin List
add_action('restrict_manage_posts', function() {
    global $typenow;
    if ($typenow == 'microsite') {
        $taxonomy = 'microsite-type';
        $selected = isset($_GET[$taxonomy]) ? $_GET[$taxonomy] : '';
        wp_dropdown_categories(array(
            'show_option_all' => 'All Microsite Types',
            'taxonomy'        => $taxonomy,
            'name'            => $taxonomy,
            'orderby'         => 'name',
            'selected'        => $selected,
            'hierarchical'    => true,
            'value_field'     => 'slug',
            'show_count'      => false,
            'hide_empty'      => false,
        ));
    }
});

// Make the Dropdown Filter Perform Filtering
add_filter('parse_query', function ($query) {
    global $pagenow;
    $taxonomy = 'microsite-type';
    if (
        $pagenow == 'edit.php'
        && isset($_GET['post_type']) && $_GET['post_type'] == 'microsite'
        && isset($_GET[$taxonomy]) && $_GET[$taxonomy] != ''
    ) {
        $term = $_GET[$taxonomy];
        // Ensure proper filtering by taxonomy slug
        $query->query_vars[$taxonomy] = $term;
    }
});