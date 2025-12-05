<?php
function get_microsite_options_from_cache() {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $uri = $_SERVER['REQUEST_URI'] ?? '';
    
    $cacheKey = 'siteOptions-' . md5($host . $uri);
    $cacheGroup = 'site-management';
    
    // In development, disable cache
    if (defined('WP_DEBUG') && WP_DEBUG) {
        return false;
    }
    
    return wp_cache_get($cacheKey, $cacheGroup);
}

function set_microsite_options_from_acf() {
    global $siteOptions;
    
    $context = get_microsite_context();
    
    if (!$context['is_microsite']) {
        $siteOptions = [];
        return;
    }
    
    $microsite_id = $context['microsite_id'];
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $uri = $_SERVER['REQUEST_URI'] ?? '';
    
    $cacheKey = 'siteOptions-' . md5($host . $uri);
    $cacheGroup = 'site-management';
    $cacheExpire = 3600;
    
    $siteOptions = get_microsite_meta($microsite_id);
    $siteOptions['microsite_context'] = $context; // Store context
    
    if (!defined('WP_DEBUG') || !WP_DEBUG) {
        wp_cache_set($cacheKey, $siteOptions, $cacheGroup, $cacheExpire);
    }
}

function set_microsite_options() {
    global $siteOptions;
    if (null === $siteOptions) {
        $siteOptions = get_microsite_options_from_cache();
        if (false === $siteOptions) {
            set_microsite_options_from_acf();
        }
    }
}
add_action('init', 'set_microsite_options', 20);

add_action('save_post_microsite', function($post_id) {
    wp_cache_flush_group('site-management');
    wp_cache_delete('microsites_domains_map', 'microsite');
});

function get_microsite_meta($microsite_id) {

    if (!function_exists('get_field')) {
      return;
    }

    if ( empty($microsite_id)) {
        return;
    }

    $microsite_post = get_post($microsite_id);

    if ( empty($microsite_post)) {
        return;
    }

    $siteOptions = array(
      'microsite_id' => $microsite_id,
      'slug' => $microsite_post->post_name,
      'title' => $microsite_post->post_title,
    );

    $microsite_master = get_field('microsite_master', 'option');

    if ( $microsite_master ) {
        $fields_master = get_field_objects($microsite_master);
        if($fields_master) {
            foreach ($fields_master as $key => $field) {
                $siteOptions[$key] = $field['value'];
            }
        }
    }

    $microsites_settings_override = get_field('microsites_settings_override', 'option');

    if ( $microsites_settings_override ) {
        foreach ($microsites_settings_override as $microsite) {
            $microsite_type_ids = $microsite['microsite_type'];
            if ( has_term( $microsite_type_ids, 'microsite-type', $microsite_id ) ) {
                $override_post_id = $microsite['microsite'] ?? 0;
                $fields = get_field_objects($override_post_id);
                if($fields) {
                    foreach ($fields as $key => $field) {
                        if(!empty($field['value'])) {
                            $siteOptions[$key] = $field['value'];
                        }            
                    }
                }
            }
        }
    }
    
    $fields = get_field_objects($microsite_id);

    if($fields) {
        foreach ($fields as $key => $field) {
            if(!empty($field['value'])) {
                $siteOptions[$key] = $field['value'];
            }            
        }
    }

    return $siteOptions;
}

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
// Add caching for domain lookups
function get_microsites_domains_cached() {
    // Check if we can safely query posts and ACF
    if (!did_action('init')) {
        return array();
    }
    
    if (!function_exists('get_field')) {
        return array();
    }
    
    $cache_key = 'microsites_domains_map';
    $cached    = wp_cache_get($cache_key, 'microsite');

    if (false !== $cached && is_array($cached) && !empty($cached)) {
        return $cached;
    }

    $domains = get_microsites_domains();
    
    // Only cache if we got results
    if (!empty($domains)) {
        wp_cache_set($cache_key, $domains, 'microsite', 3600);
    }

    return $domains;
}

function get_microsites_domains() {
    if (!function_exists('get_field')) {
        return array();
    }

    // Query all CPT Microsites
    $microsites = get_posts(array(
        'post_type'      => 'microsite',
        'posts_per_page' => -1,
        'tax_query'      => array(
            array(
                'taxonomy' => 'microsite-type',
                'field'    => 'slug',
                'terms'    => array('master'),
                'operator' => 'NOT IN',
            ),
        ),
    ));

    $domains = array();
    
    foreach ($microsites as $microsite) {
        $domains[$microsite->ID] = array();
        
        // Get the post slug (clean, without any URL parameters)
        $slug = $microsite->post_name;
        
        if (!empty($slug)) {
            // Add slug-based domains (for path-based and subdomain routing)
            $domains[$microsite->ID][] = $slug;
            $domains[$microsite->ID][] = $slug . '.eurorad.de';
            $domains[$microsite->ID][] = $slug . '.eurorad-micro-test.local';
        }

        // Add custom domain if set in ACF
        $custom_domain = get_field('domain', $microsite->ID);
        if (!empty($custom_domain)) {
            // Clean the domain (remove http://, https://, trailing slashes)
            $custom_domain = preg_replace('#^https?://#', '', $custom_domain);
            $custom_domain = rtrim($custom_domain, '/');
            
            $domains[$microsite->ID][] = $custom_domain;
        }
    }

    return $domains;
}

function get_microsite_context() {
    static $context = null;

    if (null !== $context) {
        return $context;
    }

    // Skip microsite context detection if Elementor is active
    if (function_exists('is_elementor_active') && is_elementor_active()) {
        $context = array(
            'is_microsite'     => false,
            'microsite_id'     => false,
            'is_preview'       => false,
            'subpage_slug'     => '',
            'detection_method' => 'elementor_active',
        );
        return $context;
    }

    if (isset($_GET['elementor-preview'])) {
        $context = array(
            'is_microsite'     => false,
            'microsite_id'     => false,
            'is_preview'       => false,
            'subpage_slug'     => '',
            'detection_method' => 'elementor_preview',
        );
        return $context;
    }

    $host         = $_SERVER['HTTP_HOST'] ?? '';
    $request_uri  = $_SERVER['REQUEST_URI'] ?? '';
    $request_path = trim(explode('?', $request_uri)[0], '/');
    $path_parts   = explode('/', $request_path);

    $context = array(
        'is_microsite'     => false,
        'microsite_id'     => false,
        'is_preview'       => false,
        'subpage_slug'     => '',
        'detection_method' => 'none',
    );

    // Check if WordPress is fully initialized
    $can_query_domains = did_action('init') && function_exists('get_field');

    // METHOD 1: Direct domain match
    if ($can_query_domains) {
        $microsite_id = get_microsite_id_by_domain($host);
        
        if ($microsite_id) {
            $context['is_microsite']     = true;
            $context['microsite_id']     = $microsite_id;
            $context['subpage_slug']     = $request_path;
            $context['detection_method'] = 'domain';
            return $context;
        }
    }

    // METHOD 2: Subdomain-based microsite
    if ($can_query_domains) {
        $subdomain = is_subdomain_microsite($host);
        
        if ($subdomain) {
            $microsite_id = get_microsite_id_by_slug($subdomain);
            if ($microsite_id) {
                $context['is_microsite']     = true;
                $context['microsite_id']     = $microsite_id;
                $context['subpage_slug']     = $request_path;
                $context['detection_method'] = 'subdomain';
                return $context;
            }
        }
    }

    // METHOD 3: Forced preview via ?mode=microsite
    if (isset($_GET['mode']) && $_GET['mode'] === 'microsite' && $can_query_domains) {
        $slug         = $path_parts[0] ?? '';
        $microsite_id = get_microsite_id_by_slug($slug);

        if ($microsite_id) {
            $context['is_microsite']     = true;
            $context['microsite_id']     = $microsite_id;
            $context['is_preview']       = true;
            $context['subpage_slug']     = implode('/', array_slice($path_parts, 1));
            $context['detection_method'] = 'forced_preview';
            return $context;
        }
    }

    // METHOD 4: Path-based preview
    if (count($path_parts) > 0 && !empty($path_parts[0]) && $can_query_domains) {
        $possible_slug = $path_parts[0];
        $microsite_id  = get_microsite_id_by_slug($possible_slug);

        if ($microsite_id) {
            // Master microsites require explicit preview mode
            if (is_master_microsite($microsite_id)) {
                return $context;
            }

            $path_count = count($path_parts);
            if ($path_count === 1) {
                $context['is_microsite']     = true;
                $context['microsite_id']     = $microsite_id;
                $context['is_preview']       = false;
                $context['subpage_slug']     = '';
                $context['detection_method'] = 'path_root';
            } elseif ($path_count > 1) {
                $context['is_microsite']     = true;
                $context['microsite_id']     = $microsite_id;
                $context['is_preview']       = true;
                $context['subpage_slug']     = implode('/', array_slice($path_parts, 1));
                $context['detection_method'] = 'path_preview';
            }
        }
    }

    return $context;
}

function get_microsite_id_by_domain($domain) {
    $microsites = get_microsites_domains_cached();
    
    foreach ($microsites as $microsite_id => $domains) {
        if (in_array($domain, $domains, true)) {
            return $microsite_id;
        }
    }
    
    return false;
}

function get_microsite_id_by_slug( $slug ) {
	$microsite = get_posts(
		array(
			'post_type'      => 'microsite',
			'name'           => $slug,   // filter by slug
			'posts_per_page' => 1,
			'post_status'    => 'publish', // optional, but recommended
		)
	);

	if ( ! empty( $microsite ) ) {
		return $microsite[0]->ID;
	}

	return false;
}

/**
 * Retrieve the ID of a differ page based on the given microsite ID and target post ID.
 *
 * The differ page is an Elementor template that overrides the content of the target page.
 *
 * @param int $microsite_id The ID of the microsite.
 * @param int $target_post_id The ID of the target page.
 *
 * @return int|false The ID of the differ page, or false if not found.
 */
function get_differ_page( $microsite_id, $target_post_id ) {

	$override_page = false;

	if ( ! function_exists( 'get_field' ) ) {
		return;
	}

	if ( empty( $microsite_id ) || empty( $target_post_id ) ) {
		return;
	}

	// First, check if we have any Microsite Type differ templates assigned
	$microsite_types = wp_get_post_terms( $microsite_id, 'microsite-type', array( 'fields' => 'ids' ) );

	if ( ! empty( $microsite_types ) ) {

		$term_queries = array( 'relation' => 'OR' );
		foreach ( $microsite_types as $term_id ) {
			$term_queries[] = array(
				'key'     => 'override_target_pages_types',
				'value'   => '"' . $term_id . '"',
				'compare' => 'LIKE',
			);
		}

		$args = array(
			'post_type'      => 'elementor_library',
			'posts_per_page' => 1,
			'post_status'    => 'publish',
			'meta_query'     => array(
				'relation' => 'AND',
				array(
					'key'   => 'override_content',
					'value' => '1',
				),
				array(
					'key'   => 'target_post_id',
					'value' => $target_post_id,
				),
				$term_queries,
			),
		);

		$query = new WP_Query( $args );

		if ( $query->have_posts() ) {
			$query->the_post();
			$override_page = get_the_ID();
		}

		wp_reset_postdata();
	}

	// Query Elementor templates based on ACF meta $microsite_id and $target_id
	$args = array(
		'post_type'      => 'elementor_library',
		'posts_per_page' => 1,
		'post_status'    => 'publish',
		'meta_query'     => array(
			'relation' => 'AND',
			array(
				'key'   => 'override_content',
				'value' => true,
			),
			array(
				'key'     => 'microsite_ids',
				'value'   => $microsite_id,
				'compare' => 'LIKE',
			),
			array(
				'key'   => 'target_post_id',
				'value' => $target_post_id,
			),
		),
	);

	$query = new WP_Query( $args );

	if ( $query->have_posts() ) {
		$query->the_post();
		$override_page = get_the_ID();
	}

	return $override_page ? $override_page : false;
}

function is_microsite() {
	global $siteOptions;
	return ! empty( $siteOptions['microsite_id'] );
}

function get_current_microsite_id() {
	global $siteOptions;
	return $siteOptions['microsite_id'] ?? null;
}

function is_master_microsite( $microsite_id ) {
	return has_term( 'master', 'microsite-type', $microsite_id );
}

/**
 * Get the correct URL for a microsite page
 */
function get_microsite_url( $microsite_id, $subpage_slug = '' ) {
	$domain = get_field( 'domain', $microsite_id );
	$slug   = get_post_field( 'post_name', $microsite_id );

	if ( $domain ) {
		// Custom domain
		$url = 'https://' . $domain;
	} else {
		// Subdomain or preview
		$main_domain = $_SERVER['HTTP_HOST'];
		$url         = 'https://' . $slug . '.' . $main_domain;
	}

	if ( $subpage_slug ) {
		$url .= '/' . ltrim( $subpage_slug, '/' );
	}

	return $url;
}

function get_microsite_preview_url( $microsite_id ) {
	$slug        = get_post_field( 'post_name', $microsite_id );
	$main_domain = get_option( 'siteurl' );
	return $main_domain . '/' . $slug . '?mode=microsite';
}

/**
 * Check if current request is for a regular page (not microsite)
 */
function is_regular_page_context() {
	$context = get_microsite_context();
	return ! $context['is_microsite'];
}

function is_subdomain_microsite( $host ) {
	$parts = explode( '.', $host );

	// Need at least 3 parts for subdomain (subdomain.domain.tld)
	if ( count( $parts ) < 3 ) {
		return false;
	}

	// First part is the potential microsite slug
	return $parts[0];
}

/**
 * STAGE 1: ENHANCED ELEMENTOR DETECTION
 * 
 * Replace your existing is_elementor_active() function with this improved version.
 * This adds more detection methods and caching for better performance.
 */

/**
 * Comprehensive Elementor detection function
 * Detects ALL Elementor modes: editor, preview, iframe, templates, AJAX, REST API
 * 
 * @return bool True if Elementor editor/preview is active
 */
function is_elementor_active() {
    // Static cache to avoid repeated checks in same request
    static $is_active = null;
    
    if (null !== $is_active) {
        return $is_active;
    }
    
    // 1. Check for Elementor preview parameter (most common)
    if (isset($_GET['elementor-preview'])) {
        $is_active = true;
        return $is_active;
    }
    
    // 2. Check for WordPress preview mode (Elementor uses this)
    if (isset($_GET['preview']) && isset($_GET['preview_id'])) {
        $is_active = true;
        return $is_active;
    }
    
    // 3. Check for Elementor editor parameter
    if (isset($_GET['action']) && $_GET['action'] === 'elementor') {
        $is_active = true;
        return $is_active;
    }
    
    // 4. Check if we're editing an Elementor template directly
    if (isset($_GET['post']) && isset($_GET['action']) && $_GET['action'] === 'edit') {
        $post_id = intval($_GET['post']);
        if ($post_id) {
            $post = get_post($post_id);
            if ($post && $post->post_type === 'elementor_library') {
                $is_active = true;
                return $is_active;
            }
        }
    }
    
    // 5. Check if Elementor plugin is loaded and in edit/preview mode
    if (did_action('elementor/loaded')) {
        try {
            if (class_exists('\Elementor\Plugin')) {
                $plugin = \Elementor\Plugin::$instance;
                
                // Check editor mode
                if (isset($plugin->editor) && $plugin->editor->is_edit_mode()) {
                    $is_active = true;
                    return $is_active;
                }
                
                // Check preview mode (iframe)
                if (isset($plugin->preview) && $plugin->preview->is_preview_mode()) {
                    $is_active = true;
                    return $is_active;
                }
            }
        } catch (Exception $e) {
            // Elementor not fully loaded, continue with other checks
        }
    }
    
    // 6. Check for Elementor AJAX requests
    if (defined('DOING_AJAX') && DOING_AJAX) {
        if (isset($_REQUEST['action'])) {
            $action = $_REQUEST['action'];
            // Check for any Elementor-related AJAX action
            if (
                strpos($action, 'elementor') !== false ||
                $action === 'heartbeat' // Elementor uses heartbeat during editing
            ) {
                $is_active = true;
                return $is_active;
            }
        }
    }
    
    // 7. Check for Elementor REST API requests
    if (defined('REST_REQUEST') && REST_REQUEST) {
        if (isset($_SERVER['REQUEST_URI']) && 
            strpos($_SERVER['REQUEST_URI'], '/wp-json/elementor/') !== false) {
            $is_active = true;
            return $is_active;
        }
    }
    
    // 8. Check if current post is being edited in Elementor
    global $post;
    if ($post && isset($_GET['action']) && $_GET['action'] === 'elementor') {
        $is_active = true;
        return $is_active;
    }
    
    // 9. Check for Elementor autosave
    if (isset($_POST['action']) && $_POST['action'] === 'elementor_ajax') {
        $is_active = true;
        return $is_active;
    }
    
    $is_active = false;
    return $is_active;
}

/**
 * Check if current request is for Elementor Template (elementor_library post type)
 * 
 * @return bool
 */
function is_elementor_template_request() {
    global $wp_query;
    
    // Check query vars
    if (isset($wp_query->query_vars['post_type']) && 
        $wp_query->query_vars['post_type'] === 'elementor_library') {
        return true;
    }
    
    // Check queried object
    if (isset($wp_query->queried_object) && 
        isset($wp_query->queried_object->post_type) && 
        $wp_query->queried_object->post_type === 'elementor_library') {
        return true;
    }
    
    // Check if we're editing an Elementor template
    if (isset($_GET['elementor-preview'])) {
        $post_id = intval($_GET['elementor-preview']);
        if ($post_id) {
            $post = get_post($post_id);
            if ($post && $post->post_type === 'elementor_library') {
                return true;
            }
        }
    }
    
    // Check for template edit in admin
    if (is_admin() && isset($_GET['post'])) {
        $post_id = intval($_GET['post']);
        if ($post_id) {
            $post = get_post($post_id);
            if ($post && $post->post_type === 'elementor_library') {
                return true;
            }
        }
    }
    
    return false;
}

/**
 * Helper: Check if we should skip microsite logic entirely
 * Use this at the start of every microsite function
 * 
 * @return bool True if microsite logic should be skipped
 */
function should_skip_microsite_logic() {
    // Skip in admin (except AJAX)
    if (is_admin() && (!defined('DOING_AJAX') || !DOING_AJAX)) {
        return true;
    }
    
    // Skip if Elementor is active
    if (is_elementor_active()) {
        return true;
    }
    
    // Skip if editing Elementor templates
    if (is_elementor_template_request()) {
        return true;
    }
    
    return false;
}

/**
 * Intercept query BEFORE WordPress resolves it
 * This prevents the dual-query issue
 */
add_action( 'parse_request', 'er_microsite_parse_request', 1 );
function er_microsite_parse_request( $wp ) {
	// CRITICAL: Skip completely if Elementor is active - Elementor needs direct post access
	// This applies to ALL post types: pages, posts, microsites, elementor_library
	if ( function_exists( 'is_elementor_active' ) && is_elementor_active() ) {
		return;
	}
	
	// Also check for elementor-preview as fallback (in case function doesn't exist yet)
	if ( isset( $_GET['elementor-preview'] ) ) {
		return;
	}

	$context = get_microsite_context();

	// Not a microsite context - let WordPress handle normally
	if ( ! $context['is_microsite'] ) {
		return;
	}

	// Store context globally for later use
	global $microsite_context;
	$microsite_context = $context;

	// Override query vars to force microsite resolution
	$wp->query_vars['post_type']    = 'microsite';
	$wp->query_vars['name']         = ''; // Clear name to prevent page matching
	$wp->query_vars['pagename']     = ''; // Clear pagename
	$wp->query_vars['microsite_id'] = $context['microsite_id'];

	// Set custom query var to prevent other post types from matching
	$wp->query_vars['er_microsite_mode'] = true;
}

add_action(
	'pre_get_posts',
	function ( $query ) {
		// Skip if not main query or in admin
		if ( ! $query->is_main_query() || is_admin() ) {
			return;
		}

		// CRITICAL: For Elementor editor, completely skip ALL our query manipulation
		// Elementor needs to handle queries itself for ALL post types
		// This includes: pages, posts, microsites, elementor_library
		// Check multiple ways to ensure we catch Elementor early
		if ( isset( $_GET['elementor-preview'] ) ) {
			// Elementor preview parameter - skip everything
			return;
		}
		
		if ( function_exists( 'is_elementor_active' ) && is_elementor_active() ) {
			// Elementor is active - don't touch anything
			return;
		}
		
		// Check if this is an Elementor template request
		if ( function_exists( 'is_elementor_template_request' ) && is_elementor_template_request() ) {
			return;
		}

		// If microsite mode is active, ONLY query microsites
		if ( isset( $query->query_vars['er_microsite_mode'] ) ) {
			$query->set( 'post_type', 'microsite' );
			$query->set( 'name', '' ); // Prevent slug matching
			$query->set( 'pagename', '' );

			// We'll handle the post loading in template_include
			return;
		}

		// Original logic for non-microsite contexts
		// BUT: Skip if Elementor might be active (double-check)
		if ( $query->is_singular && isset( $query->query['name'] ) ) {
			// Double-check Elementor isn't active before modifying query
			if ( isset( $_GET['elementor-preview'] ) || 
			     ( function_exists( 'is_elementor_active' ) && is_elementor_active() ) ) {
				return;
			}
			
			// Exclude microsite from regular queries to prevent collisions
			$post_types = array( 'post', 'page' );

			// Only add microsite if explicitly accessing a microsite URL pattern
			$context = get_microsite_context();
			if ( $context['is_microsite'] ) {
				$post_types[] = 'microsite';
			}

			$query->set( 'post_type', $post_types );
		}
	},
	1
);

add_filter( 'redirect_canonical', 'disable_canonical_for_microsite', 10, 2 );
function disable_canonical_for_microsite( $redirect_url, $requested_url ) {
	// CRITICAL: Skip if Elementor is active - allow normal redirects
	// Elementor needs canonical redirects to work properly
	if ( function_exists( 'is_elementor_active' ) && is_elementor_active() ) {
		return $redirect_url;
	}
	
	// Fallback check
	if ( isset( $_GET['elementor-preview'] ) ) {
		return $redirect_url;
	}

	$context = get_microsite_context();

	// Disable redirects for any microsite context
	if ( $context['is_microsite'] ) {
		return false;
	}

	return $redirect_url;
}

function multisite_template_override( $template ) {
	global $wp_query, $microsite_context;

	// CRITICAL: Skip completely if Elementor is active - let Elementor handle the template
	// This applies to ALL post types: pages, posts, microsites, elementor_library
	// Elementor needs to use its own templates for proper editor functionality
	if ( function_exists( 'is_elementor_active' ) && is_elementor_active() ) {
		return $template;
	}
	
	// Also check for Elementor Template requests
	if ( function_exists( 'is_elementor_template_request' ) && is_elementor_template_request() ) {
		return $template;
	}
	
	// Fallback check
	if ( isset( $_GET['elementor-preview'] ) ) {
		return $template;
	}

	// Get context (cached from parse_request)
	$context = $microsite_context ?? get_microsite_context();

	$debug     = isset( $_GET['debug'] ) && $_GET['debug'] === 'microsite';
	$debug_log = array();

	// Not a microsite context - return normal template
	if ( ! $context['is_microsite'] ) {
		if ( $debug ) {
			echo "<pre style='background:#111;color:#999;padding:10px;'>";
			echo "🧩 MICROSITE DEBUG\n\nNot in microsite context\n";
			echo "Detection method: {$context['detection_method']}\n";
			echo 'Returning normal template: ' . basename( $template ) . '</pre>';
		}
		return $template;
	}

	$microsite_id = $context['microsite_id'];
	$is_preview   = $context['is_preview'];
	$subpage_slug = $context['subpage_slug'];

	$debug_log[] = "Microsite ID: {$microsite_id}";
	$debug_log[] = "Detection: {$context['detection_method']}";
	$debug_log[] = 'Preview mode: ' . ( $is_preview ? 'YES' : 'NO' );
	$debug_log[] = "Subpage slug: '{$subpage_slug}'";

	$target_post_id = false;

	if ( is_master_microsite( $microsite_id ) ) {
		$debug_log[]    = 'Microsite is type master';
		$target_post_id = $microsite_id;
	} else {
		// Disable canonical redirects
		add_filter( 'redirect_canonical', '__return_false' );

		// Determine which page to load
		if ( empty( $subpage_slug ) ) {
			// Homepage - use microsite master
			$target_post_id = get_field( 'microsite_master', 'option' ) ?: $microsite_id;
			$debug_log[]    = "Loading homepage (master: {$target_post_id})";
		} else {
			// Subpage - lookup by slug
			$target_post_id = get_microsite_id_by_slug( $subpage_slug );

			if ( ! $target_post_id ) {
				// Try last segment only (for nested paths)
				$path_segments  = explode( '/', $subpage_slug );
				$last_segment   = end( $path_segments );
				$target_post_id = get_microsite_id_by_slug( $last_segment );
			}

			if ( $target_post_id ) {
				$debug_log[] = "Found subpage: {$target_post_id} for slug '{$subpage_slug}'";
			} else {
				$debug_log[] = "404: No subpage found for '{$subpage_slug}'";

				if ( $debug ) {
					echo "<pre style='background:#111;color:#f00;padding:10px;'>";
					echo implode( "\n", $debug_log ) . '</pre>';
				}

				// Set 404
				$wp_query->set_404();
				status_header( 404 );
				return get_404_template();
			}
		}
	}

	// Check for deffer content
	$deffer_page = get_differ_page( $microsite_id, $target_post_id );

	if ( $deffer_page ) {
		$debug_log[] = "Deffer: Post {$deffer_page} mapped to overwrite {$target_post_id}";
		if ( $debug ) {
				echo "<pre style='background:#111;color:#f00;padding:10px;'>";
				echo implode( "\n", $debug_log ) . '</pre>';
		}
		$target_post_id = $deffer_page;
	}

	// Load the post
	$post = get_post( $target_post_id );
	if ( ! $post ) {
		$debug_log[] = "ERROR: Post {$target_post_id} not found in database";
		if ( $debug ) {
			echo "<pre style='background:#111;color:#f00;padding:10px;'>";
			echo implode( "\n", $debug_log ) . '</pre>';
		}
		return $template;
	}

	// Override global query
	$wp_query->post              = $post;
	$wp_query->posts             = array( $post );
	$wp_query->queried_object    = $post;
	$wp_query->queried_object_id = $post->ID;
	$wp_query->post_count        = 1;
	$wp_query->is_single         = true;
	$wp_query->is_singular       = true;
	$wp_query->is_page           = false;
	$wp_query->is_404            = false;
	$wp_query->is_home           = ( $target_post_id == get_field( 'microsite_master', 'option' ) );

	// Critical: Set post type to microsite
	$wp_query->queried_object->post_type = 'microsite';

	setup_postdata( $post );

	// Disable Elementor theme locations to prevent header/footer duplication
	add_filter( 'elementor/theme/register_locations', '__return_false', 99 );
	add_filter( 'elementor/theme/get_location_templates', '__return_empty_array', 99 );

	if ( $debug ) {
		echo "<pre style='background:#111;color:#0f0;padding:10px;'>";
		echo "🧩 MICROSITE DEBUG\n\n";
		echo implode( "\n", $debug_log );
		echo "\n\nPost ID: {$post->ID}";
		echo "\nPost Title: {$post->post_title}";
		echo "\nPost Type: {$post->post_type}";
		echo "\nTemplate: single-microsite.php</pre>";
	}

	return locate_template( 'single-microsite.php' );
}
add_filter( 'template_include', 'multisite_template_override', 1 );

/**
 * PHASE 1: ADD THIS CODE TO inc/microsites/microsites.php
 * 
 * Add this AFTER the multisite_template_override() function
 * (around line 900, after the template_include filter)
 */

/**
 * Setup microsite post context early for proper Elementor asset loading
 * 
 * This function runs at the 'wp' hook (priority 5), which is AFTER WordPress
 * resolves the query but BEFORE wp_enqueue_scripts fires (priority 10).
 * 
 * Why this is critical:
 * - Elementor decides which CSS/JS to load during wp_enqueue_scripts
 * - It checks $wp_query->post to determine the post ID
 * - Our template_include override happens too late (after assets are enqueued)
 * - By setting the correct post here, Elementor loads the right assets
 * 
 * @since 2.0.0
 */
add_action('wp', 'er_setup_microsite_post_context', 5);
function er_setup_microsite_post_context() {
    // Skip if Elementor editor is active
    if (function_exists('is_elementor_active') && is_elementor_active()) {
        return;
    }
    
    if (isset($_GET['elementor-preview'])) {
        return;
    }
    
    // Skip if in admin
    if (is_admin()) {
        return;
    }
    
    global $wp_query, $microsite_context;
    
    // Get microsite context (cached from parse_request)
    $context = $microsite_context ?? get_microsite_context();
    
    // Not a microsite - exit early
    if (!$context['is_microsite']) {
        return;
    }
    
    $microsite_id = $context['microsite_id'];
    $subpage_slug = $context['subpage_slug'];
    
    // Determine target post ID using same logic as template_include
    $target_post_id = false;
    
    if (is_master_microsite($microsite_id)) {
        // Master microsite - use itself as target
        $target_post_id = $microsite_id;
    } else {
        if (empty($subpage_slug)) {
            // Homepage - use microsite master or fallback to microsite itself
            $microsite_master = get_field('microsite_master', 'option');
            $target_post_id = $microsite_master ? $microsite_master : $microsite_id;
        } else {
            // Subpage - lookup by slug
            $target_post_id = get_microsite_id_by_slug($subpage_slug);
            
            if (!$target_post_id) {
                // Try last segment only (for nested paths like /ebm/about/team)
                $path_segments = explode('/', $subpage_slug);
                $last_segment = end($path_segments);
                $target_post_id = get_microsite_id_by_slug($last_segment);
            }
            
            // If still no subpage found, return early (404 will be handled later)
            if (!$target_post_id) {
                return;
            }
        }
    }
    
    // Check for Elementor template override (differ page)
    if (function_exists('get_differ_page')) {
        $deffer_page = get_differ_page($microsite_id, $target_post_id);
        if ($deffer_page) {
            $target_post_id = $deffer_page;
        }
    }
    
    // Load the post
    $post = get_post($target_post_id);
    if (!$post) {
        return;
    }
    
    // CRITICAL: Set post in global query EARLY
    // This ensures Elementor sees the correct post during wp_enqueue_scripts
    $wp_query->post = $post;
    $wp_query->posts = array($post);
    $wp_query->queried_object = $post;
    $wp_query->queried_object_id = $post->ID;
    $wp_query->post_count = 1;
    $wp_query->is_single = true;
    $wp_query->is_singular = true;
    $wp_query->is_page = false;
    $wp_query->is_404 = false;
    $wp_query->is_home = ($target_post_id == get_field('microsite_master', 'option'));
    
    // Set post type to microsite
    $wp_query->queried_object->post_type = 'microsite';
    
    setup_postdata($post);
    
    // Store target post ID globally for use in template_include
    // This avoids duplicate logic
    global $er_microsite_post_id;
    $er_microsite_post_id = $target_post_id;
    
    // Temporary debug logging (will be removed in Phase 6)
    if (defined('WP_DEBUG') && WP_DEBUG && isset($_GET['debug_assets'])) {
        error_log('=== Microsite Post Context Setup (wp hook) ===');
        error_log('Microsite ID: ' . $microsite_id);
        error_log('Target Post ID: ' . $target_post_id);
        error_log('Post Title: ' . $post->post_title);
        error_log('Post Type: ' . $post->post_type);
        error_log('Queried Object ID: ' . $wp_query->queried_object_id);
        error_log('Detection Method: ' . $context['detection_method']);
    }
}

/**
 * PHASE 3: Temporary diagnostic logging for asset enqueueing
 * This helps verify Elementor sees the correct post
 * Will be removed in Phase 6
 */
if (defined('WP_DEBUG') && WP_DEBUG) {
    add_action('wp_enqueue_scripts', function() {
        if (!isset($_GET['debug_assets'])) {
            return;
        }
        
        global $wp_query;
        
        error_log('=== wp_enqueue_scripts fired ===');
        error_log('Current Post ID: ' . ($wp_query->post->ID ?? 'none'));
        error_log('Current Post Title: ' . ($wp_query->post->post_title ?? 'none'));
        error_log('Queried Object ID: ' . ($wp_query->queried_object_id ?? 'none'));
        error_log('Is Singular: ' . ($wp_query->is_singular ? 'yes' : 'no'));
        
        // Check if Elementor CSS is registered
        global $wp_styles;
        $elementor_styles = array();
        foreach ($wp_styles->registered as $handle => $style) {
            if (strpos($handle, 'elementor') !== false || strpos($handle, 'post-') !== false) {
                $elementor_styles[] = $handle . ' => ' . $style->src;
            }
        }
        
        if (!empty($elementor_styles)) {
            error_log('Registered Elementor styles:');
            foreach ($elementor_styles as $style_info) {
                error_log('  - ' . $style_info);
            }
        } else {
            error_log('WARNING: No Elementor styles registered yet');
        }
    }, 5); // Priority 5 - runs early to catch initial registration
}

/**
 * Clear conflicting query vars for Elementor editor
 * This ensures microsite query vars don't interfere with Elementor
 * Works for: pages, posts, microsites, elementor_library
 */
add_action( 'parse_request', 'er_clear_microsite_vars_for_elementor', 5 );
function er_clear_microsite_vars_for_elementor( $wp ) {
	// Only for Elementor editor - check early
	if ( ! isset( $_GET['elementor-preview'] ) ) {
		return;
	}
	
	// Clear conflicting vars that might interfere with Elementor's query
	// Don't set any query vars - let Elementor handle everything
	unset( $wp->query_vars['er_microsite_mode'] );
	unset( $wp->query_vars['microsite_id'] );
}

/**
 * Ensure post is properly set up in query for Elementor editor (fallback)
 * This runs later as a safety net in case Elementor needs the query set up
 */
add_action( 'wp', 'er_setup_elementor_editor_query', 1 );

function er_setup_elementor_editor_query() {
	// Only for Elementor editor
	if ( ! isset( $_GET['elementor-preview'] ) ) {
		return;
	}

	global $wp_query;

	// Get the post ID from Elementor preview parameter
	$post_id = intval( $_GET['elementor-preview'] );
	if ( ! $post_id ) {
		return;
	}

	// Get the post
	$post = get_post( $post_id );
	if ( ! $post ) {
		return;
	}

	// Only set up query if it's not already set up correctly
	// This is a fallback - Elementor should have already set this up
	if ( empty( $wp_query->posts ) || ( isset( $wp_query->posts[0] ) && $wp_query->posts[0]->ID !== $post_id ) ) {
		$wp_query->post              = $post;
		$wp_query->posts             = array( $post );
		$wp_query->queried_object    = $post;
		$wp_query->queried_object_id = $post->ID;
		$wp_query->post_count        = 1;
		$wp_query->is_single         = true;
		$wp_query->is_singular       = true;
		$wp_query->is_404            = false;

		// Set appropriate flags based on post type
		if ( $post->post_type === 'page' ) {
			$wp_query->is_page = true;
		} elseif ( $post->post_type === 'microsite' ) {
			$wp_query->is_page = false;
		} elseif ( $post->post_type === 'elementor_library' ) {
			$wp_query->is_page = false;
		}

		setup_postdata( $post );
	}
}

/**
 * STAGE 1.5: FIX CONTENT FILTER
 * 
 * Replace your existing the_content filter (starting around line ~680)
 * with this version that has proper safety checks.
 */

/**
 * Replace Elementor sections by their CSS ID with Elementor Templates
 * that have ACF field 'override_target_section_id'.
 * Optionally limit by 'microsite_ids' (array of Microsite posts).
 */
add_filter('the_content', function($content) {
    // === SAFETY CHECKS - EXIT EARLY ===
    
    // 1. Skip in admin (unless it's a specific frontend AJAX call)
    if (is_admin()) {
        return $content;
    }
    
    // 2. CRITICAL: Skip for ALL Elementor operations
    if (should_skip_microsite_logic()) {
        return $content;
    }
    
    // 3. Skip if no content to process
    if (empty($content)) {
        return $content;
    }
    
    // 4. Skip if content is too short to have sections (performance)
    if (strlen($content) < 100) {
        return $content;
    }
    
    // 5. Only run in microsite context
    global $siteOptions;
    $current_microsite_id = $siteOptions['microsite_id'] ?? null;
    if (!$current_microsite_id) {
        return $content; // Not in microsite context
    }
    
    // 6. Verify we're on frontend (not REST API, not AJAX)
    if (defined('REST_REQUEST') && REST_REQUEST) {
        return $content;
    }
    
    if (defined('DOING_AJAX') && DOING_AJAX) {
        return $content;
    }
    
    // === MAIN LOGIC ===
    
    // Get all Elementor templates with override_target_section_id set
    $args = array(
        'post_type'      => 'elementor_library',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'meta_query'     => array(
            array(
                'key'     => 'override_target_section_id',
                'compare' => 'EXISTS',
            ),
        ),
    );
    
    $templates = get_posts($args);
    
    if (!$templates || empty($templates)) {
        return $content;
    }
    
    // === DOM PROCESSING WITH ERROR HANDLING ===
    
    // Suppress libxml errors
    $previous_error_state = libxml_use_internal_errors(true);
    
    try {
        $dom = new DOMDocument();
        
        // Add UTF-8 encoding and load HTML
        $loaded = @$dom->loadHTML(
            '<?xml encoding="UTF-8"?>' . $content,
            LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
        );
        
        if (!$loaded) {
            throw new Exception('Failed to load HTML');
        }
        
        $xpath = new DOMXPath($dom);
        $replacements_made = false;
        
        foreach ($templates as $template) {
            $target_section_id = get_field('override_target_section_id', $template->ID);
            
            if (!$target_section_id || empty($target_section_id)) {
                continue;
            }
            
            // Optional: limit overrides by target microsites
            $target_pages = get_field('microsite_ids', $template->ID);
            if ($target_pages && is_array($target_pages)) {
                $target_ids = wp_list_pluck($target_pages, 'ID');
                if (!in_array($current_microsite_id, $target_ids)) {
                    continue; // Skip if this microsite not included
                }
            }
            
            // Find matching section by ID (sanitize ID for XPath)
            $safe_id = str_replace('"', '', $target_section_id);
            $nodes = @$xpath->query("//*[@id='{$safe_id}']");
            
            if (!$nodes || $nodes->length === 0) {
                continue;
            }
            
            // Render replacement from Elementor template
            if (!class_exists('\Elementor\Plugin')) {
                continue;
            }
            
            $replacement_html = \Elementor\Plugin::$instance->frontend->get_builder_content_for_display($template->ID);
            
            if (!$replacement_html || empty($replacement_html)) {
                continue;
            }
            
            // Load rendered content into temp DOM
            $tmp_dom = new DOMDocument();
            $tmp_loaded = @$tmp_dom->loadHTML(
                '<?xml encoding="UTF-8"?>' . $replacement_html,
                LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
            );
            
            if (!$tmp_loaded) {
                continue;
            }
            
            $replacement_body = $tmp_dom->getElementsByTagName('body')->item(0);
            
            if ($replacement_body) {
                $replacement_fragment = $dom->createDocumentFragment();
                
                foreach ($replacement_body->childNodes as $child) {
                    $imported_node = @$dom->importNode($child, true);
                    if ($imported_node) {
                        $replacement_fragment->appendChild($imported_node);
                    }
                }
                
                // Replace target node with Elementor section
                $node = $nodes->item(0);
                if ($node && $node->parentNode) {
                    $node->parentNode->replaceChild($replacement_fragment, $node);
                    $replacements_made = true;
                }
            }
        }
        
        // Only process output if we made changes
        if ($replacements_made) {
            $html = $dom->saveHTML();
            
            // Extract only the inner <body> content (cleanup)
            if (preg_match('~<body>(.*)</body>~is', $html, $matches)) {
                $content = $matches[1];
            } else {
                // Fallback: remove XML declaration and doctype
                $content = preg_replace('~^<\?xml[^>]*>\s*~i', '', $html);
                $content = preg_replace('~^<!DOCTYPE[^>]*>\s*~i', '', $content);
            }
        }
        
    } catch (Exception $e) {
        // Log error silently, return original content
        error_log('Microsite content filter error: ' . $e->getMessage());
        // Don't modify content if there was an error
    } finally {
        // Always restore error handling state
        libxml_clear_errors();
        libxml_use_internal_errors($previous_error_state);
    }
    
    return $content;
    
}, 20); // Priority 20 - after most other content filters

/**
 * STAGE 1.8: DOMAIN DETECTION DEBUG
 * 
 * Add this temporary debug function to your microsites.php file.
 * Then visit: http://ebm.local/?microsite_debug=1
 */

add_action('init', 'er_debug_domain_detection', 999);
function er_debug_domain_detection() {
    if (!isset($_GET['microsite_debug']) || $_GET['microsite_debug'] != '1') {
        return;
    }
    
    // Get current request info
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $request_uri = $_SERVER['REQUEST_URI'] ?? '';
    $request_path = trim(explode('?', $request_uri)[0], '/');
    
    // Get all registered microsite domains
    $all_domains = get_microsites_domains();
    
    // Try to detect microsite
    $context = get_microsite_context();
    
    // Output debug info
    header('Content-Type: text/html; charset=utf-8');
    echo '<html><head><title>Microsite Domain Debug</title></head><body>';
    echo '<style>
        body { font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 20px; }
        h2 { color: #4ec9b0; border-bottom: 2px solid #4ec9b0; padding-bottom: 10px; }
        h3 { color: #dcdcaa; margin-top: 30px; }
        pre { background: #252526; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .success { color: #4ec9b0; }
        .error { color: #f48771; }
        .warning { color: #ce9178; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { text-align: left; padding: 12px; border: 1px solid #3e3e42; }
        th { background: #252526; color: #4ec9b0; }
        tr:nth-child(even) { background: #252526; }
    </style>';
    
    echo '<h2>🔍 Microsite Domain Detection Debug</h2>';
    
    // Current Request
    echo '<h3>📡 Current Request:</h3>';
    echo '<table>';
    echo '<tr><th>Parameter</th><th>Value</th></tr>';
    echo '<tr><td>HTTP_HOST</td><td><strong>' . esc_html($host) . '</strong></td></tr>';
    echo '<tr><td>REQUEST_URI</td><td>' . esc_html($request_uri) . '</td></tr>';
    echo '<tr><td>REQUEST_PATH</td><td>' . esc_html($request_path) . '</td></tr>';
    echo '</table>';
    
    // Detection Result
    echo '<h3>🎯 Detection Result:</h3>';
    echo '<table>';
    echo '<tr><th>Property</th><th>Value</th></tr>';
    echo '<tr><td>Is Microsite?</td><td class="' . ($context['is_microsite'] ? 'success' : 'error') . '">' . 
         ($context['is_microsite'] ? '✅ YES' : '❌ NO') . '</td></tr>';
    echo '<tr><td>Microsite ID</td><td>' . ($context['microsite_id'] ?: 'none') . '</td></tr>';
    echo '<tr><td>Detection Method</td><td>' . esc_html($context['detection_method']) . '</td></tr>';
    echo '<tr><td>Is Preview?</td><td>' . ($context['is_preview'] ? 'YES' : 'NO') . '</td></tr>';
    echo '<tr><td>Subpage Slug</td><td>' . esc_html($context['subpage_slug']) . '</td></tr>';
    echo '</table>';
    
    // All Registered Domains
    echo '<h3>🌐 All Registered Microsite Domains:</h3>';
    if (empty($all_domains)) {
        echo '<p class="error">❌ No microsites found!</p>';
    } else {
        echo '<table>';
        echo '<tr><th>Microsite ID</th><th>Post Title</th><th>Registered Domains</th><th>Match?</th></tr>';
        
        foreach ($all_domains as $microsite_id => $domains) {
            $post = get_post($microsite_id);
            $post_title = $post ? $post->post_title : 'Unknown';
            $match = in_array($host, $domains, true);
            
            echo '<tr>';
            echo '<td>' . $microsite_id . '</td>';
            echo '<td>' . esc_html($post_title) . '</td>';
            echo '<td>';
            foreach ($domains as $domain) {
                $is_match = ($domain === $host);
                $class = $is_match ? 'success' : '';
                echo '<div class="' . $class . '">';
                echo esc_html($domain);
                if ($is_match) echo ' <strong>← CURRENT HOST</strong>';
                echo '</div>';
            }
            echo '</td>';
            echo '<td class="' . ($match ? 'success' : '') . '">' . ($match ? '✅ MATCH' : '') . '</td>';
            echo '</tr>';
        }
        echo '</table>';
    }
    
    // ACF Domain Check
    echo '<h3>📝 ACF Domain Field Check:</h3>';
    echo '<table>';
    echo '<tr><th>Microsite ID</th><th>Post Title</th><th>ACF Domain Field</th></tr>';
    
    $microsites = get_posts(array(
        'post_type' => 'microsite',
        'posts_per_page' => -1,
        'post_status' => 'publish',
    ));
    
    foreach ($microsites as $microsite) {
        $acf_domain = get_field('domain', $microsite->ID);
        echo '<tr>';
        echo '<td>' . $microsite->ID . '</td>';
        echo '<td>' . esc_html($microsite->post_title) . '</td>';
        echo '<td>' . ($acf_domain ? esc_html($acf_domain) : '<span class="warning">⚠️ Not set</span>') . '</td>';
        echo '</tr>';
    }
    echo '</table>';
    
    // Subdomain Detection
    echo '<h3>🔗 Subdomain Detection:</h3>';
    $subdomain_result = is_subdomain_microsite($host);
    echo '<table>';
    echo '<tr><th>Check</th><th>Result</th></tr>';
    echo '<tr><td>Host Parts</td><td>' . implode(' . ', explode('.', $host)) . '</td></tr>';
    echo '<tr><td>Is Subdomain?</td><td>' . ($subdomain_result ? '<span class="success">YES: ' . esc_html($subdomain_result) . '</span>' : 'NO') . '</td></tr>';
    if ($subdomain_result) {
        $microsite_id = get_microsite_id_by_slug($subdomain_result);
        echo '<tr><td>Microsite Found?</td><td>' . ($microsite_id ? '<span class="success">YES (ID: ' . $microsite_id . ')</span>' : '<span class="error">NO</span>') . '</td></tr>';
    }
    echo '</table>';
    
    // Raw Data
    echo '<h3>📦 Raw Data:</h3>';
    echo '<pre>';
    echo "All Domains Array:\n";
    print_r($all_domains);
    echo "\n\nContext Array:\n";
    print_r($context);
    echo '</pre>';
    
    echo '</body></html>';
    exit;
}