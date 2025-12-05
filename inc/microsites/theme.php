<?php

// Add Microsite menu location
add_action( 'init', 'er_microsites_menu_location' );

function er_microsites_menu_location() {
	register_nav_menu( 'menu-microsite', __( 'Microsite Menu', 'hello-theme-child' ) );
	register_nav_menu( 'menu-microsite-footer', __( 'Microsite Footer Menu', 'hello-theme-child' ) );
}

function generate_microsite_styles() {
		global $siteOptions;

		if(empty($siteOptions['microsite_id'])) {
			return;
		}

		$color_primary = $siteOptions['main_color'];
		$color_secondary = $siteOptions['secondary_color'];

		echo "
		<style>
			:root {
				--color-primary: {$color_primary};
				--color-secondary: {$color_secondary};
				--color-black: #191919;
				
			}
			.elementor-kit-6 {
				--e-global-color-primary: {$color_primary} !important;
				--e-global-color-secondary: {$color_secondary} !important;
			}
		</style>
		";
}

add_action('wp_head', 'generate_microsite_styles');