<?php
global $siteOptions;
$mapCenter = !empty($siteOptions['dealer_map_center']) ? $siteOptions['dealer_map_center'] : '';
$data = get_query_var('locations_setup');
?>
<div class="er-locations er-locations--init er-locations--<?php echo esc_attr( $data['layout'] ); ?>" data-mode="map">
	<?php if ( $data['layout'] === 'default' ) : ?>
	<div class="er-locations__mode-toggle">
		<button id="er-locations-toggle-map" class="er-locations__mode-toggle-button active"><?php _e( 'Kartenansicht', 'hello-theme-child' ); ?></button>
		<button id="er-locations-toggle-list" class="er-locations__mode-toggle-button"><?php _e( 'Listenansicht', 'hello-theme-child' ); ?></button>
	</div>
	<?php endif; ?>
	<div class="er-locations__form">
		<?php if($data['layout'] === 'map') : ?>
			<?php if($data['header']) : ?>
			<h4>
					<?php echo $data['header']; ?>
			</h4>
			<?php endif; ?>
			<?php if($data['text']) : ?>
				<?php echo wpautop($data['text']); ?>
			<?php endif; ?>
		<?php endif; ?>
		<div class="er-locations__search">
			<input type="text" class="er-locations__search-input" placeholder="<?php _e( 'PLZ oder Ort', 'hello-theme-child' ); ?>" value="<?php echo $mapCenter; ?>">
			<button class="er-locations__geolocate">
				<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="10" r="3" fill="#ffffff"></circle><path d="M11.5193 23.5136C11.7957 23.8152 12.1834 23.9908 12.5924 23.9996C13.0014 24.0085 13.3964 23.85 13.6857 23.5607C18.2027 19.0437 21.25 14.6366 21.25 10.25C21.25 5.69365 17.5563 2 13 2C8.44365 2 4.75 5.69365 4.75 10.25C4.75 14.5651 7.33436 18.9482 11.5193 23.5136Z" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"></path></svg>
			</button>
		</div>
	<div class="er-locations__radius">
		<div class="er-locations__radius-header">
		<span><?php _e( 'Umkreis:', 'hello-theme-child' ); ?></span>
		<span>(<span class="er-locations__results-count">0</span> <?php _e( 'Ergebnisse', 'hello-theme-child' ); ?>)</span>
		</div>
		<div class="er-locations__radius-buttons">
		<button class="er-locations__radius-button active" data-radius="10"><?php _e( '10km', 'hello-theme-child' ); ?></button>
		<button class="er-locations__radius-button" data-radius="25"><?php _e( '25km', 'hello-theme-child' ); ?></button>
		<button class="er-locations__radius-button" data-radius="50"><?php _e( '50km', 'hello-theme-child' ); ?></button>
		</div>
	</div>
	<button class="er-locations__submit" disabled><?php _e( 'Fachhandel finden', 'hello-theme-child' ); ?></button>
	</div>
	<div class="er-locations__results">
		<div class="er-locations__map"></div>
		<div class="er-locations__list">
		</div>
		<div class="er-locations__init">
			<?php esc_html_e( 'Bitte verwenden Sie das obenstehende Formular, um nach Standorten zu suchen.', 'hello-theme-child' ); ?>
		</div>
		<div class="er-locations__empty">
			<?php esc_html_e( 'Leider wurden keine Standorte gefunden.', 'hello-theme-child' ); ?>
		</div>
		<div class="er-loader"></div>
	</div>
</div>
<?php if($mapCenter) : ?>
	<input type="hidden" id="er-locations-map-center" value="<?php echo $mapCenter; ?>">
<?php endif; ?>
<script src="https://maps.googleapis.com/maps/api/js?key=<?php echo get_option('options_google_maps_api_key'); ?>&libraries=places,geometry&callback=initMaps"></script>
