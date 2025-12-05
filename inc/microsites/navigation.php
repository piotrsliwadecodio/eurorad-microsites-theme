<?php
/**
 * Custom menu walker to rewrite URLs for preview mode.
 */

if ( ! class_exists( 'Custom_Menu_Walker' ) ) {

	class Microsite_Menu_Walker extends Walker_Nav_Menu {

		/**
		 * Start element output.
		 *
		 * @param string $output Passed by reference. Used to append additional content.
		 * @param object $item   Menu item data object.
		 * @param int    $depth  Depth of menu item.
		 * @param array  $args   An array of arguments.
		 * @param int    $id     Current item ID.
		 */
		public function start_el( &$output, $item, $depth = 0, $args = [], $id = 0 ) {
			// Default link
			$url = $item->url;

			$context = get_microsite_context();

			if(isset($context['is_preview']) && $context['is_preview'] === true) {
				// Get current host (e.g., domainB.com)
				$current_host = $_SERVER['HTTP_HOST'];

				// Parse REQUEST_URI to separate path from query string
				$request_uri = $_SERVER['REQUEST_URI'];
				$request_path = trim( explode( '?', $request_uri )[0], '/' );
				$query_string = parse_url( $request_uri, PHP_URL_QUERY );

				// Detect the first path segment (subcatalog)
				$parts       = explode( '/', $request_path );
				$first_slug  = isset( $parts[0] ) ? $parts[0] : '';

				// Build new base (domainB.com/slug)
				$base = trailingslashit( $_SERVER['REQUEST_SCHEME'] . '://' . $current_host . '/' . $first_slug );

				// Remove domain from original menu link and rebuild
				$path = parse_url( $url, PHP_URL_PATH );
				$path = ltrim( $path, '/' );

				$url = trailingslashit( $base . $path );

				// Preserve query string if it exists
				if ( ! empty( $query_string ) ) {
					$url .= '?' . $query_string;
				}
			}

			$title = apply_filters( 'the_title', $item->title, $item->ID );

			// Output link (we know depth=0 always)
			$output .= sprintf(
				'<a href="%s">%s</a>',
				esc_url( $url ),
				esc_html( $title )
			);

			// Add separator if defined in args
			if ( isset( $args->after ) && ! empty( $args->after ) ) {
				$output .= $args->after;
			}
		}
	}
}