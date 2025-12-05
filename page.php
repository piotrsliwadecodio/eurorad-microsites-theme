<?php
/**
 * The template to display all single pages
 *
 * @package eurorad
 * @since eurorad 1.0
 */

get_header();

while ( have_posts() ) {
	the_post();

	get_template_part( apply_filters( 'eurorad_filter_get_template_part', 'templates/content', 'page' ), 'page' );

}

get_footer();
