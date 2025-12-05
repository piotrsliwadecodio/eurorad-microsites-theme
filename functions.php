<?php
/**
 * Theme functions and definitions.
 *
 * For additional information on potential customization options,
 * read the developers' documentation:
 *
 * https://developers.elementor.com/docs/hello-elementor-theme/
 *
 * @package HelloElementorChild
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'HELLO_ELEMENTOR_CHILD_VERSION', '2.0.0' );

require_once __DIR__ . '/inc/theme.php';
require_once __DIR__ . '/inc/locations.php';
require_once __DIR__ . '/inc/custom-post-types.php';

// require_once __DIR__ . '/inc/microsites/custom-post-types.php';
// require_once __DIR__ . '/inc/microsites/helpers.php';
// require_once __DIR__ . '/inc/microsites/core.php';
// require_once __DIR__ . '/inc/microsites/content-override.php';

require_once __DIR__ . '/inc/microsites/microsites.php';

require_once __DIR__ . '/inc/microsites/admin.php';
require_once __DIR__ . '/inc/microsites/theme.php';
require_once __DIR__ . '/inc/microsites/shortcodes.php';
require_once __DIR__ . '/inc/microsites/help-center.php';
require_once __DIR__ . '/inc/microsites/admin.php';
require_once __DIR__ . '/inc/microsites/navigation.php';
require_once __DIR__ . '/inc/microsites/seo.php';

/**
 * Load child theme scripts & styles.
 *
 * @return void
 */
function hello_elementor_child_scripts_styles() {

	wp_enqueue_style(
		'hello-elementor-child-style',
		get_stylesheet_directory_uri() . '/dist/css/app.css',
		array(
			'hello-elementor-theme-style',
		),
		HELLO_ELEMENTOR_CHILD_VERSION
	);

	wp_enqueue_script(
		'hello-elementor-child-script',
		get_stylesheet_directory_uri() . '/dist/js/app.js',
		array( 'jquery', 'swiper' ),
		'1.0.0',
	);

	wp_localize_script(
		'hello-elementor-child-script',
		'locationSearchAjax',
		array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'nonce'    => wp_create_nonce( 'search_locations_nonce' ),
		)
	);
}

add_action( 'wp_enqueue_scripts', 'hello_elementor_child_scripts_styles', 20 );

add_filter( 'upload_mimes', 'custom_mime_types', 1, 1 );
function custom_mime_types( $mime_types ) {
	$mime_types['jfif'] = 'image/jpeg';  // or 'image/jfif+xml'
	$mime_types['ico']  = 'image/x-icon';
	return $mime_types;
}

add_filter('elementor/frontend/print_google_fonts', '__return_false');

add_filter( 'gform_notification', function( $notification, $form, $entry ) {

    // --- CONFIGURATION ---
    // Absolute path to your iCal file
    $ical_path = WP_CONTENT_DIR . '/uploads/2025/08/eurorad-trifft-kuestenrad.ics';   // Change this to your file location
    $target_id = '51794abf1f0d1';                             // Change to your notification's string ID

    // --- DEBUG LOGGING ---
    error_log('GF Debug: Processing notification:');
    error_log('Type: ' . ($notification['toType'] ?? '[none]'));
    error_log('ID: ' . ($notification['id'] ?? '[none]'));
    error_log('File path: ' . $ical_path);
    error_log('File exists: ' . (file_exists($ical_path) ? 'YES' : 'NO'));

    // --- ATTACH LOGIC ---
    if (
        'email' === ($notification['toType'] ?? '') &&
        isset($notification['id']) &&
        $notification['id'] === $target_id &&
        file_exists($ical_path)
    ) {
        // Attach file
        if ( ! isset( $notification['attachments'] ) || ! is_array( $notification['attachments'] ) ) {
            $notification['attachments'] = array();
        }
        $notification['attachments'][] = $ical_path;
        error_log('GF Debug: Attached file for notification ID ' . $target_id);
    } else {
        error_log(
            'GF Debug: Not attached. ' .
            'Type match: ' . ('email' === ($notification['toType'] ?? '') ? 'YES' : 'NO') .
            ', ID match: ' . (isset($notification['id']) && $notification['id'] === $target_id ? 'YES' : 'NO') .
            ', File exists: ' . (file_exists($ical_path) ? 'YES' : 'NO')
        );
    }

    return $notification;

}, 10, 3 );

function add_mobile_body_class( $classes ) {
    if ( wp_is_mobile() ) {
        $classes[] = 'is-mobile';
    }
    return $classes;
}
add_filter( 'body_class', 'add_mobile_body_class' );
