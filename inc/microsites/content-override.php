<?php

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
 * Replace Elementor sections by their CSS ID with Elementor Templates
 * that have ACF field 'section_id'.
 */
/**
 * Replace Elementor sections by their CSS ID with Elementor Templates
 * that have ACF field 'override_section_id'.
 * Optionally limit by 'override_target_pages' (array of Microsite posts).
 */
add_filter(
	'the_content',
	function ( $content ) {
		// CRITICAL: Skip completely if Elementor is active (editor, preview, etc.)
		// This filter should not run during Elementor editing
		if ( is_admin() ) {
			return $content;
		}
		
		// Use comprehensive Elementor detection
		if ( function_exists( 'is_elementor_active' ) && is_elementor_active() ) {
			return $content;
		}
		
		// Fallback check
		if ( isset( $_GET['elementor-preview'] ) ) {
			return $content;
		}
		
		// Also check Elementor edit mode (fallback)
		if ( defined( 'ELEMENTOR_VERSION' ) && isset( \Elementor\Plugin::$instance->editor ) && \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
			return $content;
		}

		global $siteOptions;
		$current_microsite_id = $siteOptions['microsite_id'] ?? null;
		if ( ! $current_microsite_id ) {
			return $content; // no microsite context
		}

		// Get all Elementor templates with override_section_id set
		$args      = array(
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
		$templates = get_posts( $args );

		if ( ! $templates ) {
			return $content;
		}

		libxml_use_internal_errors( true );
		$dom = new DOMDocument();
		$dom->loadHTML( '<?xml encoding="utf-8" ?>' . $content );
		$xpath = new DOMXPath( $dom );

		foreach ( $templates as $template ) {
			$target_section_id = get_field( 'override_target_section_id', $template->ID );
			if ( ! $target_section_id ) {
				continue;
			}

			// Optional: limit overrides by target microsites
			$target_pages = get_field( 'microsite_ids', $template->ID ); // ACF Post Object (multiple)
			if ( $target_pages && ! in_array( $current_microsite_id, wp_list_pluck( $target_pages, 'ID' ) ) ) {
				continue; // skip if this microsite not included
			}

			// Find matching section by ID
			$nodes = $xpath->query( "//*[@id='{$target_section_id}']" );
			if ( $nodes->length === 0 ) {
				continue;
			}

			// Render replacement from Elementor template
			$replacement_html = \Elementor\Plugin::$instance->frontend->get_builder_content_for_display( $template->ID );
			if ( ! $replacement_html ) {
				continue;
			}

			// Load rendered content into temp DOM
			$tmp_dom = new DOMDocument();
			$tmp_dom->loadHTML( '<?xml encoding="utf-8" ?>' . $replacement_html );
			$replacement_body = $tmp_dom->getElementsByTagName( 'body' )->item( 0 );

			if ( $replacement_body ) {
				$replacement_fragment = $dom->createDocumentFragment();
				foreach ( $replacement_body->childNodes as $child ) {
					$replacement_fragment->appendChild( $dom->importNode( $child, true ) );
				}

				// Replace target node with Elementor section
				$node = $nodes->item( 0 );
				$node->parentNode->replaceChild( $replacement_fragment, $node );
			}
		}

		$html = $dom->saveHTML();
		libxml_clear_errors();

		// Extract only the inner <body> content (cleanup)
		$html = preg_replace( '~^.*<body>(.*)</body>.*$~is', '$1', $html );

		return $html;
	},
	20
);