<?php global $siteOptions; ?>
<?php if ( ! empty( $siteOptions['dienstrad_tool_links'] ) ) { ?>
	<span class="er-dropdown">
		<span class="er-dropdown-title">Bitte auswählen <i class="fa fa-chevron-down"></i></span>
		<span class="er-dropdown-dropdown">
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
		</span>
	</span>
<?php } else { ?>
			<?php if ( $siteOptions['dienstrad_tool_links'][0]['link_type'] == 'url' ) { ?>
		<a href="<?php echo $siteOptions['dienstrad_tool_links'][0]['url']; ?>" class="er-button" target="_blank"><?php echo $siteOptions['dienstrad_tool_links'][0]['titel']; ?></a>
	<?php } elseif ( $siteOptions['dienstrad_tool_links'][0]['link_type'] == 'mailto' ) { ?>
		<a href="mailto:<?php echo $siteOptions['dienstrad_tool_links'][0]['mail_address']; ?>?subject=<?php echo rawurlencode( htmlspecialchars_decode( $siteOptions['dienstrad_tool_links'][0]['mail_subject'] ) ); ?>&amp;body=<?php echo rawurlencode( htmlspecialchars_decode( $siteOptions['dienstrad_tool_links'][0]['mail_body'] ) ); ?>" class="er-button" target="_blank"><?php echo $siteOptions['dienstrad_tool_links'][0]['titel']; ?></a>
	<?php } else { ?>
		<a href="https://www.dienstradtool.eurorad.de/register/step1/<?php echo $siteOptions['dienstrad_tool_links'][0]['id']; ?>" class="er-button" target="_blank"><?php echo $siteOptions['dienstrad_tool_links'][0]['titel']; ?></a>
	<?php } ?>
<?php } ?>

