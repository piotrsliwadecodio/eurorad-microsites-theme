<?php
function leasingcalc_shortcode( $atts, $innerContent = null ) {
	global $siteOptions;

	ob_start();
	include get_stylesheet_directory() . '/inc/leasingcalc/leasingcalc.php';
	$markup = ob_get_clean();
	return $markup;
}
add_shortcode( 'leasingcalc', 'leasingcalc_shortcode' );

function var_shortcode( $atts, $innerContent = null ) {
	extract(
		shortcode_atts(
			array(
				'var' => '',
			),
			$atts
		)
	);
	global $siteOptions;

	return $siteOptions[ $var ];
}
	add_shortcode( 'var', 'var_shortcode' );


function subvar_shortcode( $atts, $innerContent = null ) {
	extract(
		shortcode_atts(
			array(
				'var'    => '',
				'subvar' => '',
			),
			$atts
		)
	);
	global $siteOptions;

	return $siteOptions[ $var ][0][ $subvar ];
}
	add_shortcode( 'subvar', 'subvar_shortcode' );

add_shortcode( 'er_microsite_links', 'er_microsite_links' );
function er_microsite_links() {
	global $siteOptions;
	if ( ! empty( $siteOptions['dienstrad_tool_links'] ) ) { ?>
	<div class="er-microsite-links">
				<?php foreach ( $siteOptions['dienstrad_tool_links'] as $link ) { ?>
					<?php if ( $link['link_type'] == 'url' ) { ?>
						<a href="<?php echo $link['url']; ?>" class="er-dropdown-option" target="_blank"><?php echo $link['titel']; ?></a>
					<?php } elseif ( $link['link_type'] == 'mailto' ) { ?>
						<a href="mailto:<?php echo $link['mail_address']; ?>?subject=<?php echo rawurlencode( htmlspecialchars_decode( $link['mail_subject'] ) ); ?>&amp;body=<?php echo rawurlencode( htmlspecialchars_decode( $link['mail_body'] ) ); ?>" class="er-dropdown-option" target="_blank"><?php echo $link['titel']; ?></a>
						<?php
					} else {
						$currentDate = new DateTime();
						$dateFrom    = new DateTime( '2025-09-29', new DateTimeZone( 'Europe/Berlin' ) );
						$linkUrl     = '';
						if ( $currentDate >= $dateFrom ) {
							$linkId = $link['id_2025'];
							if ( $linkId ) {
								$linkUrl = 'https://leasingportal.eurorad.de/de/sign-up/rider?employeeRegistrationToken=' . $linkId;
							}
						} else {
							$linkId = $link['id'];
							if ( $linkId ) {
								$linkUrl = 'https://www.dienstradtool.eurorad.de/register/step1/' . $linkId;
							}
						}
						if ( $linkUrl ) {
							?>
						<a href="<?php echo $linkUrl; ?>" class="er-dropdown-option" target="_blank"><?php echo $link['titel']; ?></a>
						<?php } ?>
					<?php } ?>
			<?php } ?>
		</div>
		<?php
	}
	?>
	<?php
}

add_shortcode( 'er_microsite_downloads', 'er_microsite_downloads_function' ); 
function er_microsite_downloads_function() {
	get_template_part( 'template-parts/shortcodes/dealer-downloads', null );
}