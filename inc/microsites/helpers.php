<?php
// Add caching for domain lookups
function get_microsites_domains_cached() {
	$cache_key = 'microsites_domains_map';
	$cached    = wp_cache_get( $cache_key, 'microsite' );

	if ( false !== $cached ) {
		return $cached;
	}

	$domains = get_microsites_domains();
	wp_cache_set( $cache_key, $domains, 'microsite', 3600 );

	return $domains;
}

function get_microsites_domains() {

	if ( ! function_exists( 'get_field' ) ) {
		return array();
	}

	// Query all CPT Microsites
	$microsites = get_posts(
		array(
			'post_type'      => 'microsite',
			'posts_per_page' => -1,
			'tax_query'      => array(
				array(
					'taxonomy' => 'microsite-type',
					'field'    => 'slug',
					'terms'    => array( 'master' ),
					'operator' => 'NOT IN',
				),
			),
		)
	);

	$domains = array();
	foreach ( $microsites as $microsite ) {
		$base_url = ( get_permalink( $microsite->ID ) ?? '' );

		if ( ! empty( $base_url ) ) {
			$base_url                        = str_replace( 'http://' . $_SERVER['HTTP_HOST'], '', $base_url );
				$base_url                    = str_replace( '/', '', $base_url );
				$domains[ $microsite->ID ]   = array( $base_url );
				$domains[ $microsite->ID ][] = $base_url . '.eurorad.de';
				$domains[ $microsite->ID ][] = $base_url . '.eurorad-micro-test.local';
		}

		$domain = get_field( 'domain', $microsite->ID ) ?? '';
		if ( ! empty( $domain ) ) {
			$domains[ $microsite->ID ][] = get_field( 'domain', $microsite->ID );
		}
	}

	return $domains;
}

function get_microsite_context() {
	static $context = null;

	if ( null !== $context ) {
		return $context;
	}

	// CRITICAL: Skip microsite context detection if Elementor is active
	// Elementor needs to work without microsite context interference
	if ( function_exists( 'is_elementor_active' ) && is_elementor_active() ) {
		$context = array(
			'is_microsite'     => false,
			'microsite_id'     => false,
			'is_preview'       => false,
			'subpage_slug'     => '',
			'detection_method' => 'elementor_active',
		);
		return $context;
	}

	// Also skip if elementor-preview is set (fallback)
	if ( isset( $_GET['elementor-preview'] ) ) {
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
	$request_path = trim( explode( '?', $request_uri )[0], '/' );
	$path_parts   = explode( '/', $request_path );

	$context = array(
		'is_microsite'     => false,
		'microsite_id'     => false,
		'is_preview'       => false,
		'subpage_slug'     => '',
		'detection_method' => 'none',
	);

	// ============================================================
	// METHOD 1 — direct domain match (full hostname)
	// ============================================================
	$microsite_id = get_microsite_id_by_domain( $host );
	if ( $microsite_id ) {
		$context['is_microsite']     = true;
		$context['microsite_id']     = $microsite_id;
		$context['subpage_slug']     = $request_path;
		$context['detection_method'] = 'domain';
		return $context;
	}

	// ============================================================
	// METHOD 2 — Subdomain-based microsite
	// e.g. fran.eurorad-micro-test.local
	// ============================================================
	$subdomain = is_subdomain_microsite( $host );
	if ( $subdomain ) {
		$microsite_id = get_microsite_id_by_slug( $subdomain );
		if ( $microsite_id ) {
			$context['is_microsite']     = true;
			$context['microsite_id']     = $microsite_id;
			$context['subpage_slug']     = $request_path; // everything after /
			$context['detection_method'] = 'subdomain';
			return $context;
		}
	}

	// ============================================================
	// METHOD 3 — Forced preview via ?mode=microsite
	// ============================================================
	if ( isset( $_GET['mode'] ) && $_GET['mode'] === 'microsite' ) {
		$slug         = $path_parts[0] ?? '';
		$microsite_id = get_microsite_id_by_slug( $slug );

		if ( $microsite_id ) {
			$context['is_microsite']     = true;
			$context['microsite_id']     = $microsite_id;
			$context['is_preview']       = true;
			$context['subpage_slug']     = implode( '/', array_slice( $path_parts, 1 ) );
			$context['detection_method'] = 'forced_preview';
			return $context;
		}
	}

	// ============================================================
	// METHOD 4 — Path-based preview (ONLY for non-master microsites)
	// ============================================================
	if ( count( $path_parts ) > 0 && ! empty( $path_parts[0] ) ) {
		$possible_slug = $path_parts[0];
		$microsite_id  = get_microsite_id_by_slug( $possible_slug );

		if ( $microsite_id ) {
			// Master microsites require explicit preview mode
			if ( is_master_microsite( $microsite_id ) ) {
				return $context;
			}

			// Non-master → path detection
			// - If path has only the microsite slug (e.g. /microsite-slug/) treat as a live microsite homepage
			// - If path has additional segments (e.g. /microsite-slug/subpage) treat as preview/subpage
			$path_count = count( $path_parts );
			if ( $path_count === 1 ) {
				// Root path for a non-master microsite — serve the microsite homepage
				$context['is_microsite']     = true;
				$context['microsite_id']     = $microsite_id;
				$context['is_preview']       = false; // Live frontend
				$context['subpage_slug']     = '';
				$context['detection_method'] = 'path_root';
			} elseif ( $path_count > 1 ) {
				// Subpage preview under a microsite
				$context['is_microsite']     = true;
				$context['microsite_id']     = $microsite_id;
				$context['is_preview']       = true;
				$context['subpage_slug']     = implode( '/', array_slice( $path_parts, 1 ) );
				$context['detection_method'] = 'path_preview';
			}
		}
	}

	return $context;
}

function get_microsite_id_by_domain( $domain ) {
	$microsites = get_microsites_domains();
	foreach ( $microsites as $microsite_id => $domains ) {
		if ( in_array( $domain, $domains, true ) ) {
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
 * Comprehensive Elementor detection function
 * Covers all Elementor modes: editor, preview, iframe, templates, etc.
 *
 * @return bool True if Elementor editor/preview is active
 */
function is_elementor_active() {
	// Check for Elementor preview parameter (standard editor)
	if ( isset( $_GET['elementor-preview'] ) ) {
		return true;
	}

	// Check for WordPress preview mode (Elementor uses this too)
	if ( isset( $_GET['preview'] ) && isset( $_GET['preview_id'] ) ) {
		return true;
	}

	// Check if Elementor is loaded and in edit/preview mode
	if ( did_action( 'elementor/loaded' ) ) {
		try {
			$plugin = \Elementor\Plugin::$instance;

			// Check editor mode
			if ( isset( $plugin->editor ) && $plugin->editor->is_edit_mode() ) {
				return true;
			}

			// Check preview mode (iframe)
			if ( isset( $plugin->preview ) && $plugin->preview->is_preview_mode() ) {
				return true;
			}
		} catch ( Exception $e ) {
			// Elementor not fully loaded, continue with other checks
		}
	}

	// Check for Elementor AJAX requests
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
		if ( isset( $_REQUEST['action'] ) && strpos( $_REQUEST['action'], 'elementor' ) !== false ) {
			return true;
		}
	}

	// Check for Elementor REST API requests
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
		if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], '/wp-json/elementor/' ) !== false ) {
			return true;
		}
	}

	return false;
}

/**
 * Check if current request is for Elementor Template (elementor_library post type)
 *
 * @return bool
 */
function is_elementor_template_request() {
	global $wp_query;

	// Check query vars
	if ( isset( $wp_query->query_vars['post_type'] ) && $wp_query->query_vars['post_type'] === 'elementor_library' ) {
		return true;
	}

	// Check queried object
	if ( isset( $wp_query->queried_object ) && isset( $wp_query->queried_object->post_type ) && $wp_query->queried_object->post_type === 'elementor_library' ) {
		return true;
	}

	// Check if we're editing an Elementor template
	if ( isset( $_GET['elementor-preview'] ) ) {
		$post_id = intval( $_GET['elementor-preview'] );
		if ( $post_id ) {
			$post = get_post( $post_id );
			if ( $post && $post->post_type === 'elementor_library' ) {
				return true;
			}
		}
	}

	return false;
}
