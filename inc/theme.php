<?php

add_action(
	'acf/init',
	function () {
		if ( function_exists( 'acf_add_options_page' ) ) {
			// Main page (redirects automatically to the first subpage)
			acf_add_options_page(
				array(
					'page_title'   => 'Eurorad Settings',
					'menu_title'   => 'Eurorad Settings',
					'menu_slug'    => 'eurorad-settings',
					'capability'   => 'edit_posts',
					'redirect'     => true, // automatically redirect to first subpage
					'show_in_menu' => true, // keep subpages visible under it
					'position'     => 'top',
				)
			);

			// Subpages
			acf_add_options_sub_page(
				array(
					'page_title'  => 'Theme Settings',
					'menu_title'  => 'General',
					'parent_slug' => 'eurorad-settings',
				)
			);

			acf_add_options_sub_page(
				array(
					'page_title'  => 'Microsite Settings',
					'menu_title'  => 'Microsites',
					'parent_slug' => 'eurorad-settings',
				)
			);
		}
	}
);

function my_acf_google_map_api( $api ) {
	$api['key'] = get_field( 'google_maps_api_key', 'option' );
	return $api;
}
add_filter( 'acf/fields/google_map/api', 'my_acf_google_map_api' );

// Allow only posts in search
// add_filter(
// 'pre_get_posts',
// function ( $query ) {
// if ( ! is_admin() && $query->is_search() ) {
// $query->set( 'post_type', 'post' );
// }
// }
// );

// add_action( 'elementor/query/help_center_query', function( $query ) {
// if( $_GET['search'] && ! empty( $_GET['search'] ) ) {
// $query->set( 's', $_GET['search'] );
// }
// });

// add_action( 'elementor/query/help_center_query', function( $query ) {
// Example: Filter by a custom search parameter sent via AJAX
// error_log(print_r($_POST, true));
// if ( isset( $_POST['widget_filters']['search'] ) ) {
// $search = sanitize_text_field( $_POST['widget_filters']['search'] );
// $query->set( 's', $search );
// }
// });

// add_action( 'elementor/query/help_center_query', function( $query ) {
// $query->set( 'posts_per_page', -1 );
// $query->set( 'post_type', 'help-center' );
// error_log('***************');
// error_log(print_r($_GET, true));
// error_log('***************');
// error_log(print_r($query, true));
// }, 9999);

add_action(
	'elementor/query/search_query',
	function ( $query ) {
		$query->set( 'post_type', array( 'post', 'page' ) );
		// If search query empty dont show any results
		if ( empty( $_GET['s'] ) ) {
			$query->set( 'posts_per_page', -1 );
		} else {
			$query->set( 's', $_GET['s'] );
		}
	},
	999
);
