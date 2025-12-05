<?php
/**
 * Template Name: Page Override
 *
 * @package Hello_Theme_Child
 * @subpackage Hello_Theme_Child
 * @since Hello Theme Child 1.0
 */
?>
<?php
while ( have_posts() ) {
	the_post();
	if ( function_exists( 'elementor_frontend' ) ) {
		elementor_frontend()->get_builder()->get_current_page()->print_elements();
	} else {
		the_content();
	}
}
?>
