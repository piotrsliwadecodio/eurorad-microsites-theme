<?php
/**
 * Checks if the location geodata table needs to be created and creates it if necessary.
 *
 * This function first verifies that the current user has administrative privileges.
 * It then checks if the location geodata table has already been created by looking
 * for a specific database version option. If the table has not been created, it
 * calls a function to create the table.
 *
 * @return void
 */
function er_init_location_geodata() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return; // Only admins
	}

	if ( get_option( 'location_geodata_db_version' ) ) {
		return; // Table already created
	}

	er_init_location_geodata();
}
add_action( 'admin_init', 'er_create_location_geodata_table' );

/**
 * Creates the location geodata table in the database.
 *
 * Creates a table to store geocode data for locations. The table has three columns
 * - post_id: The post ID that the geocode data belongs to.
 * - lat: The latitude of the geocode data.
 * - lng: The longitude of the geocode data.
 *
 * The table has a primary key on post_id and an index on the lat and lng columns.
 *
 * @return void
 */
function er_create_location_geodata_table() {
	global $wpdb;

	$table_name = $wpdb->prefix . 'location_geodata';

	$charset_collate = $wpdb->get_charset_collate();

	$sql = "CREATE TABLE $table_name (
        post_id BIGINT(20) UNSIGNED NOT NULL,
        lat DECIMAL(10, 6) NOT NULL,
        lng DECIMAL(10, 6) NOT NULL,
        PRIMARY KEY  (post_id),
        KEY lat_lng_idx (lat, lng)
    ) $charset_collate;";

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';

	dbDelta( $sql );

	add_option( 'location_geodata_db_version', '1.0' );
}

/**
 * Geocode a given post ID.
 *
 * Fetches the street, postcode and city field values from the post and geocodes the address.
 * If the geocode result is successful, it updates the post meta with the latitude and longitude,
 * and inserts the geocode data into the location_geodata table.
 *
 * @param int $post_id The post ID to geocode.
 *
 * @return void
 */
function er_geocode( $post_id, $xml_node, $is_update ) {
	global $wpdb;
	$time = date( 'H:i:s' );

	error_log( 'save_post_triggered ' );

	if ( ! get_post( $post_id ) || get_post_type( $post_id ) !== 'location' || 'trash' === get_post_status( $post_id ) ) {
		return;
	}

	$street   = get_field( 'street', $post_id ) ?? '';
	$postcode = get_field( 'postcode', $post_id ) ?? '';
	$city     = get_field( 'city', $post_id ) ?? '';
	$address  = $street . ', ' . $postcode . ' ' . $city;

	if ( empty( $address ) || empty( $city ) ) {
		return;
	}

	$table_name = $wpdb->prefix . 'location_geodata';
	$location   = $wpdb->get_row( $wpdb->prepare( "SELECT lat, lng FROM $table_name WHERE post_id = %d", $post_id ) );

	if ( ! empty( $location ) ) {
		echo '[' . $time . '] Geocode: Location for post ' . $post_id . ' already geocoded.';
		return;
	}

	$geocode = er_geocode_address( $address );
	if ( empty( $geocode ) ) {
		echo '[' . $time . '] Geocode: Geocode failed for post ID: ' . $post_id . ' with address: ' . $address;
		return;
	}

	$geocode_lat = $geocode->geometry->location->lat ?? '';
	$geocode_lng = $geocode->geometry->location->lng ?? '';

	// Update post meta
	echo '[' . $time . '] Geocode: Post ' . $post_id . ' geocoded with lat: ' . $geocode_lat . ' and lng: ' . $geocode_lng;
	update_post_meta( $post_id, 'latitude', $geocode_lat );
	update_post_meta( $post_id, 'longitude', $geocode_lng );

	$table_name = $wpdb->prefix . 'location_geodata';
	if ( $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) === $table_name ) {
		$wpdb->replace(
			$table_name,
			array(
				'post_id' => $post_id,
				'lat'     => $geocode_lat,
				'lng'     => $geocode_lng,
			)
		);
	}
}
add_action( 'pmxi_saved_post', 'er_geocode', 10, 3 );
add_action( 'save_post', 'er_geocode', 10, 3 );

// Delete data from geolocate if post is deleted
add_action( 'delete_post', 'er_delete_geolocate_data' );
function er_delete_geolocate_data( $post_id ) {
	global $wpdb;
	$table_name = $wpdb->prefix . 'location_geodata';
	$wpdb->delete( $table_name, array( 'post_id' => $post_id ) );
}

/**
 * Retrieves the latitude and longitude for a given post ID.
 *
 * @param int $post_id The post ID to retrieve the latitude and longitude for.
 *
 * @return array An array containing the lat and lng for the post.
 */
function er_get_post_lat_lng( $post_id ) {
	global $wpdb;
	$table_name = $wpdb->prefix . 'location_geodata';
	$location   = $wpdb->get_row( "SELECT lat, lng FROM $table_name WHERE post_id = $post_id" );
	return array(
		'lat' => $location->lat ?? '',
		'lng' => $location->lng ?? '',
	);
}

/**
 * Geocode a given address.
 *
 * @param string $address The address to geocode.
 *
 * @return array The geocode data. Contains the following keys:
 *               address, lat, lng, zoom, place_id, name, city
 */
function er_geocode_address( $address ) {
	$api_key = get_field( 'google_maps_api_key', 'option' );
	if ( empty( $api_key ) ) {
		error_log( 'ERROR: Google Maps API key is empty.' );
		return array();
	}

	error_log( 'NOTICE: Sending request to Maps API for address: ' . $address );
	$geocode = file_get_contents( 'https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode( $address ) . '&key=' . $api_key );
	if ( false === $geocode ) {
		error_log( 'ERROR: Geocode API request failed.' );
		return array();
	}

	$geocode = json_decode( $geocode );
	if ( json_last_error() !== JSON_ERROR_NONE ) {
		error_log( 'ERROR: Geocode API response could not be parsed.' );
		return array();
	}

	if ( isset( $geocode->error_message ) ) {
		error_log( 'ERROR: Geocode API returned an error - ' . $geocode->error_message );
		return array();
	}

	if ( empty( $geocode->results ) || empty( $geocode->results[0] ) ) {
		error_log( 'ERROR: Geocode API did not return any result.' );
		return array();
	}

	error_log( 'SUCESS: Geocoded address - ' . $address );

	return $geocode->results[0] ?? array();
}



/**
 * Callback function for the 'er-map' shortcode.
 *
 * This function retrieves and includes the map template part
 * located in 'template-parts/shortcodes/map'.
 *
 * @return void
 */
function er_map_callback( $atts ) {
	$a = shortcode_atts(
		array(
			'layout' => 'default',
			'header' => '',
			'text'   => '',
		),
		$atts
	);

	set_query_var( 'locations_setup', $a );
	return get_template_part( 'template-parts/shortcodes/locations', null );
}
add_shortcode( 'er_map', 'er_map_callback' );


/**
 * Retrieves all locations within a given radius from a center point.
 *
 * @param float $center_lat The latitude of the center point.
 * @param float $center_lng The longitude of the center point.
 * @param int   $radius_km The radius in kilometers.
 *
 * @return array An array of objects containing the post_id, lat and lng of
 *               all locations within the given radius. The array is sorted by
 *               distance in ascending order. The first element of the array is
 *               the closest location to the center point. The array will not
 *               contain more than 500 elements.
 */
function er_get_locations_in_radius( $center_lat, $center_lng, $radius ) {
	global $wpdb;

	$earth_radius = 6371; // Kilometers
	$lat_diff     = $radius / 111; // Approx. 1° = 111km
	$lng_diff     = $radius / ( 111 * cos( deg2rad( $center_lat ) ) );

	$table_name = $wpdb->prefix . 'location_geodata';
	$sql        = $wpdb->prepare(
		"
    SELECT post_id, lat, lng,
      (%d * ACOS(
        COS(RADIANS(%f)) * COS(RADIANS(lat)) * 
        COS(RADIANS(lng) - RADIANS(%f)) + 
        SIN(RADIANS(%f)) * SIN(RADIANS(lat))
      )) AS distance
    FROM $table_name
    WHERE
      lat BETWEEN %f AND %f
      AND lng BETWEEN %f AND %f
    HAVING distance <= %f
    ORDER BY distance
    LIMIT 500",
		$earth_radius,
		$center_lat,
		$center_lng,
		$center_lat,
		$center_lat - $lat_diff,
		$center_lat + $lat_diff,
		$center_lng - $lng_diff,
		$center_lng + $lng_diff,
		$radius
	);

	return $wpdb->get_results( $sql );
}

function er_get_locations_by_city( $city ) {
		$args = array(
			'post_type'      => 'location',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'meta_query'     => array(
				'relation' => 'AND',
				array(
					'key'   => 'city',
					'value' => $city,
					'compare' => 'LIKE',
				),
				array(
					'relation' => 'OR',
					array(
						'key'     => 'latitude',
						'value'   => array( 0, '' ),
						'compare' => 'IN',
					),
					array(
						'key'     => 'longitude',
						'value'   => array( 0, '' ),
						'compare' => 'IN',
					),
				),
			),
		);

		$locations = get_posts( $args ) ?? array();

		return $locations;
}

/**
 * Retrieves locations within a given radius from the database, but first
 * checks the WordPress transient cache. If the cache contains a result
 * for the given radius and center point, that result is returned instead
 * of querying the database.
 *
 * @param float $center_lat The latitude of the center point.
 * @param float $center_lng The longitude of the center point.
 * @param int   $radius_km The radius in kilometers.
 *
 * @return array An array of objects containing the post_id, lat and lng of
 *               all locations within the given radius. The array is sorted by
 *               distance in ascending order. The first element of the array is
 *               the closest location to the center point. The array will not
 *               contain more than 500 elements.
 */
function er_get_cached_locations( $center_lat, $center_lng, $radius ) {
	$cache_key = 'er_geo_' . round( $center_lat, 4 ) . '_' . round( $center_lng, 4 ) . "_$radius";
	$results   = get_transient( $cache_key );

	if ( ! $results ) {
		$results = er_get_locations_in_radius( $center_lat, $center_lng, $radius );
	}

	set_transient( $cache_key, $results, HOUR_IN_SECONDS );

	return $results;
}

// AJAX get locations by lat, lng and radius
add_action( 'wp_ajax_search_locations', 'er_ajax_search_locations' );
add_action( 'wp_ajax_nopriv_search_locations', 'er_ajax_search_locations' );

/**
 * AJAX handler for searching locations by latitude, longitude and radius.
 *
 * @since 1.0
 *
 * @param string $_POST['lat']    The latitude of the center point.
 * @param string $_POST['lng']    The longitude of the center point.
 * @param string $_POST['radius'] The radius in kilometers.
 *
 * @return array JSON response containing the post_id, title, lat, lng and distance
 *               of all locations within the given radius. The array is sorted by
 *               distance in ascending order. The first element of the array is the
 *               closest location to the center point. The array will not contain
 *               more than 500 elements.
 */
function er_ajax_search_locations() {
	// Security: Nonce check
	check_ajax_referer( 'search_locations_nonce', 'nonce' );

	// Sanitize and validate input
	$lat    = isset( $_POST['lat'] ) ? floatval( $_POST['lat'] ) : 0;
	$lng    = isset( $_POST['lng'] ) ? floatval( $_POST['lng'] ) : 0;
	$radius = isset( $_POST['radius'] ) ? floatval( $_POST['radius'] ) : 10;
	$city   = isset( $_POST['city'] ) ? sanitize_text_field( $_POST['city'] ) : '';

	// Retrieve locations within the given radius
	$results = er_get_cached_locations( $lat, $lng, $radius );

	// Optionally, get post titles or other data
	$locations = array();
	foreach ( $results as $row ) {
		$post        = get_post( $row->post_id );
		$locations[] = array(
			'id'       => $row->post_id,
			'title'    => $post ? get_the_title( $row->post_id ) : '',
			'lat'      => $row->lat,
			'lng'      => $row->lng,
			'distance' => round( $row->distance, 2 ),
			'street'   => get_field( 'street', $row->post_id ),
			'postcode' => get_field( 'postcode', $row->post_id ),
			'phone'    => get_field( 'phone', $row->post_id ),
			'email'    => get_field( 'email', $row->post_id ),
			'website'  => get_field( 'website', $row->post_id ),
			'city'     => get_field( 'city', $row->post_id ),
		);
	}

	// Include locations with empty lat and lng but same city
	if ( ! empty( $city ) ) {
		$locations_city = er_get_locations_by_city( $city );
		if ( $locations_city ) {
			foreach ( $locations_city as $location ) {
				$locations[] = array(
					'id'       => $location,
					'title'    => get_the_title( $location ),
					'lat'      => 0,
					'lng'      => 0,
					'distance' => 0,
					'street'   => get_field( 'street', $location ),
					'postcode' => get_field( 'postcode', $location ),
					'phone'    => get_field( 'phone', $location ),
					'email'    => get_field( 'email', $location ),
					'website'  => get_field( 'website', $location ),
					'city'     => get_field( 'city', $location ),
				);
			}
		}
	}

	// Remove duplicates
	$locations = array_unique( $locations, SORT_REGULAR );

	// Sort by title
	usort( $locations, function ( $a, $b ) {
		return strcmp( $a['title'], $b['title'] );
	} );

	wp_send_json_success( $locations );
}

add_action( 'save_post', 'check_acf_lat_lng_fields', 10, 3 );

function check_acf_lat_lng_fields( $post_id, $post, $update ) {
	// Avoid infinite loop
	remove_action( 'save_post', 'check_acf_lat_lng_fields', 10 );

	// Only run on post update, not on creation
	if ( ! $update ) {
		return;
	}

	// Get ACF fields
	$latitude  = get_field( 'latitude', $post_id );
	$longitude = get_field( 'longitude', $post_id );

	// Check if empty or 0
	if ( empty( $latitude ) || $latitude == 0 || empty( $longitude ) || $longitude == 0 ) {
				// Delete the post
				er_delete_geolocate_data( $post_id );
	}

	// Re-add the action
	add_action( 'save_post', 'check_acf_lat_lng_fields', 10, 3 );
}
