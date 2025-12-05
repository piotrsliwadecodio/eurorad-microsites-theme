<?php
function er_press_releases() {
	$labels = array(
		'name'          => _x( 'Press Releases', 'Post Type General Name', 'text_domain' ),
		'singular_name' => _x( 'Press Release', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'     => __( 'Press Releases', 'text_domain' ),
		'all_items'     => __( 'All Press Releases', 'text_domain' ),
		'add_new_item'  => __( 'Add New Press Release', 'text_domain' ),
		'edit_item'     => __( 'Edit Press Release', 'text_domain' ),
		'view_item'     => __( 'View Press Release', 'text_domain' ),
		// ... (other labels as needed)
	);
	$args = array(
		'label'        => __( 'press-release', 'text_domain' ),
		'description'  => __( 'Press release', 'text_domain' ),
		'labels'       => $labels,
		'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
		'public'       => true,
		'publicly_queryable' => false,
		'show_ui' => true,
		'show_in_menu' => true,
		'has_archive'  => false,
		'exclude_from_search' => true,
		'menu_icon'    => 'dashicons-format-aside',
	);
	register_post_type( 'press-release', $args );
}
add_action( 'init', 'er_press_releases', 0 );

function er_locations() {
	$labels = array(
		'name'          => _x( 'Locations', 'Post Type General Name', 'text_domain' ),
		'singular_name' => _x( 'Location', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'     => __( 'Locations', 'text_domain' ),
		'all_items'     => __( 'All Locations', 'text_domain' ),
		'add_new_item'  => __( 'Add New Location', 'text_domain' ),
		'edit_item'     => __( 'Edit Location', 'text_domain' ),
		'view_item'     => __( 'View Location', 'text_domain' ),
		// ... (other labels as needed)
	);
	$args = array(
		'label'        => __( 'location', 'text_domain' ),
		'description'  => __( 'Location', 'text_domain' ),
		'labels'       => $labels,
		'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
		'public'       => true,
		'publicly_queryable' => false,
		'show_in_menu' => true,
		'has_archive'  => false,
		'menu_icon'    => 'dashicons-format-aside',
	);
	register_post_type( 'location', $args );
}
add_action( 'init', 'er_locations', 0 );

function er_online_partners() {
	$labels = array(
		'name'          => _x( 'Online Partners', 'Post Type General Name', 'text_domain' ),
		'singular_name' => _x( 'Online Partner', 'Post Type singular Name', 'text_domain' ),
		'menu_name'     => __( 'Online Partners', 'text_domain' ),
		'all_items'     => __( 'All Online Partners', 'text_domain' ),
		'add_new_item'  => __( 'Add New Online Partner', 'text_domain' ),
		'edit_item'     => __( 'Edit Online Partner', 'text_domain' ),
		'view_item'     => __( 'View Online Partner', 'text_domain' ),
		// ... (other labels as needed)
	);
	$args = array(
		'label'        => __( 'online-partner', 'text_domain' ),
		'description'  => __( 'Online Partner', 'text_domain' ),
		'labels'       => $labels,
		'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
		'public'       => true,
		'publicly_queryable' => false,
		'show_in_menu' => true,
		'has_archive'  => false,
		'menu_icon'    => 'dashicons-format-aside',
	);
	register_post_type( 'online-partner', $args );
}
add_action( 'init', 'er_online_partners', 0 );

// Custom post for Help Center Posts
function er_help_center_posts() {
	$labels = array(
		'name'          => _x( 'Help Center', 'Post Type General Name', 'text_domain' ),
		'singular_name' => _x( 'Help Center Post', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'     => __( 'Help Center', 'text_domain' ),
		'all_items'     => __( 'All Help Center Posts', 'text_domain' ),
		'add_new_item'  => __( 'Add New Help Center Post', 'text_domain' ),
		'edit_item'     => __( 'Edit Help Center Post', 'text_domain' ),
		'view_item'     => __( 'View Help Center Post', 'text_domain' ),
		// ... (other labels as needed)
	);
	$args = array(
		'label'        => __( 'help-center', 'text_domain' ),
		'description'  => __( 'Help center', 'text_domain' ),
		'labels'       => $labels,
		'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
		'public'       => true,
		'publicly_queryable' => false,
		'show_ui' => true,
		'show_in_menu' => true,
		'has_archive'  => false,
		'exclude_from_search' => true,
		'menu_icon'    => 'dashicons-format-aside',
	);
	register_post_type( 'help-center', $args );
}
add_action( 'init', 'er_help_center_posts', 0 );

// Custom taxonomies for Help Center Posts
function er_help_center_taxonomies() {
	// Labels
	$labels = array(
		'name'              => _x( 'Help Center Groups', 'taxonomy general name', 'text_domain' ),
		'singular_name'     => _x( 'Help Center Group', 'taxonomy singular name', 'text_domain' ),
		'search_items'      => __( 'Search Help Center Groups', 'text_domain' ),
		'all_items'         => __( 'All Help Center Groups', 'text_domain' ),
		'parent_item'       => __( 'Parent Help Center Group', 'text_domain' ),
		'parent_item_colon' => __( 'Parent Help Center Group:', 'text_domain' ),
		'edit_item'         => __( 'Edit Help Center Group', 'text_domain' ),
		'update_item'       => __( 'Update Help Center Group', 'text_domain' ),
		'add_new_item'      => __( 'Add New Help Center Group', 'text_domain' ),
		'new_item_name'     => __( 'New Help Center Group Name', 'text_domain' ),
		'menu_name'         => __( 'Help Center Groups', 'text_domain' ),
	);

	// Arguments
	$args = array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'rewrite'           => array( 'slug' => 'help-center-group' ),
	);

	// Register taxonomy
	register_taxonomy( 'help-center-group', array( 'help-center' ), $args );

	// Labels
	$labels = array(
		'name'              => _x( 'Help Center Categories', 'taxonomy general name', 'text_domain' ),
		'singular_name'     => _x( 'Help Center Category', 'taxonomy singular name', 'text_domain' ),
		'search_items'      => __( 'Search Help Center Categories', 'text_domain' ),
		'all_items'         => __( 'All Help Center Categories', 'text_domain' ),
		'parent_item'       => __( 'Parent Help Center Category', 'text_domain' ),
		'parent_item_colon' => __( 'Parent Help Center Category:', 'text_domain' ),
		'edit_item'         => __( 'Edit Help Center Category', 'text_domain' ),
		'update_item'       => __( 'Update Help Center Category', 'text_domain' ),
		'add_new_item'      => __( 'Add New Help Center Category', 'text_domain' ),
		'new_item_name'     => __( 'New Help Center Category Name', 'text_domain' ),
		'menu_name'         => __( 'Help Center Categories', 'text_domain' ),
	);

	// Arguments
	$args = array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'rewrite'           => array( 'slug' => 'help-center-category' ),
	);

	// Register taxonomy
	register_taxonomy( 'help-center-category', array( 'help-center' ), $args );

	$labels = array(
		'name'              => _x( 'Display Categories', 'taxonomy general name', 'text_domain' ),
		'singular_name'     => _x( 'Display Category', 'taxonomy singular name', 'text_domain' ),
		'search_items'      => __( 'Search Display Categories', 'text_domain' ),
		'all_items'         => __( 'All Display Categories', 'text_domain' ),
		'parent_item'       => __( 'Parent Display Category', 'text_domain' ),
		'parent_item_colon' => __( 'Parent Display Category:', 'text_domain' ),
		'edit_item'         => __( 'Edit Display Category', 'text_domain' ),
		'update_item'       => __( 'Update Display Category', 'text_domain' ),
		'add_new_item'      => __( 'Add New Display Category', 'text_domain' ),
		'new_item_name'     => __( 'New Display Category Name', 'text_domain' ),
		'menu_name'         => __( 'Display Categories', 'text_domain' ),
	);

	// Arguments
	$args = array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'rewrite'           => array( 'slug' => 'display-category' ),
	);

	// Register taxonomy
	register_taxonomy( 'display-category', array( 'help-center' ), $args );
}
add_action( 'init', 'er_help_center_taxonomies', 0 );

// Add Display Category Column to Admin List Table
function er_display_category_column($columns) {
    $columns['display-category'] = 'Display Category';
    return $columns;
}
add_filter('manage_post_posts_columns', 'er_display_category_column'); // Change 'post' to your CPT if needed

// Show Term(s) for Each Post in Admin Column
function er_display_category_column_content($column_name, $post_id) {
    if ('display-category' === $column_name) {
        $terms = wp_get_post_terms($post_id, 'display-category');
        $links = array();
        foreach ($terms as $term) {
            $links[] = '<a href="' . get_term_link($term) . '">' . esc_html($term->name) . '</a>';
        }
        echo implode(', ', $links);
    }
}
add_action('manage_post_posts_custom_column', 'er_display_category_column_content', 10, 2); // Change 'post' to your CPT if needed

// Add Filter Dropdown for Display Category in Admin List
add_action('restrict_manage_posts', function() {
    global $typenow;
    if ($typenow == 'help-center') { // Change 'post' to your CPT if needed
        $taxonomy = 'display-category';
        $selected = isset($_GET[$taxonomy]) ? $_GET[$taxonomy] : '';
        wp_dropdown_categories(array(
            'show_option_all' => 'All Display Categories',
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
    $taxonomy = 'display-category';
    if (
        $pagenow == 'edit.php'
        && isset($_GET['post_type']) && $_GET['post_type'] == 'post' // Change 'post' to your CPT if needed
        && isset($_GET[$taxonomy]) && $_GET[$taxonomy] != ''
    ) {
        $term = $_GET[$taxonomy];
        $query->query_vars[$taxonomy] = $term;
    }
});