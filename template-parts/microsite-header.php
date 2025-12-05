<?php
/**
 * The template for displaying header.
 *
 * @package HelloElementor
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $siteOptions;
global $is_preview;

$site_name       = $siteOptions['title'] ? $siteOptions['title'] : get_bloginfo( 'name' );
$menu = isset( $siteOptions['menu'] ) ? $siteOptions['menu'] : '';

$menu_args = array(
	'fallback_cb'    => false,
	'container'      => false,
	'echo'           => false,
	'walker'         => new Microsite_Menu_Walker(),
);

if ( ! empty( $menu ) ) {
	$menu_exists = wp_get_nav_menu_object( $menu );
	if ( ! $menu_exists ) {
		$menu = '';
		$menu_args['theme_location'] = 'menu-microsite';
	} else {
		$menu_args['menu'] = $menu;
	}
}

if ( ! empty( $menu ) ) {
	$menu_args['theme_location'] = 'menu-microsite';
}

$header_nav_menu = wp_nav_menu( $menu_args );

$logo_id  = isset( $siteOptions['logo']['id'] ) ? $siteOptions['logo']['id'] : 0;
$title    = isset( $siteOptions['title'] ) ? $siteOptions['title'] : '';
$subtitle = isset( $siteOptions['subtitle'] ) ? $siteOptions['subtitle'] : '';
?>

<header id="microsite-header" class="er-microsite-header">
	<?php if ( $siteOptions['has_top_bar'] === '1' ) : ?>
		<div id="top-bar" class="er-microsite-header__top-bar">
			<div class="er-top-links">
				<?php
					$menuParameters = array(
						'menu'       => 'Hauptmenu-Meta',
						'container'  => false,
						'echo'       => false,
						'items_wrap' => '%3$s',
						'after'      => '|',
						'depth'      => 0,
					);
					echo strip_tags( wp_nav_menu( $menuParameters ), '<a>' );
				?>
				<?php
				if ( $siteOptions['top_bar_hotline'] ) {
					echo $siteOptions['top_bar_hotline'];
				}
				?>
			</div>
			<?php if ( ! empty( $siteOptions['social_links'] ) ) : ?>
				<div class="er-socailfollow">
					<?php
					foreach ( $siteOptions['social_links'] as $social ) {
						the_row();
						?>
						<a href="<?php echo $social['url']; ?>" target="_blank" class="<?php echo $social['type']; ?>">
											<i class="fa fa-<?php echo $social['type']; ?>"></i>
										</a>
					<?php } ?>
				</div>
			<?php endif; ?>
		</div>
	<?php endif; ?>
	<div class="er-microsite-header__main">
		<div class="er-microsite-branding">
			<div class="er-microsite-logo">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>">
					<?php
					if ( $logo_id ) {
						echo wp_get_attachment_image( $logo_id, 'full' );
					} elseif ( has_custom_logo() ) {
						the_custom_logo();
					}
					?>
				</a>
			</div>
			<?php if ( ! empty( $title ) || ! empty( $subtitle ) ) : ?>
					<div class="er-microsite-branding-text">
						<?php if ( ! empty( $title ) ) : ?>
							<h1 class="er-microsite-title">
								<?php echo esc_html( $title ); ?>
							</h1>
						<?php endif; ?>
						<?php if ( ! empty( $subtitle ) ) : ?>
							<h2 class="er-microsite-subtitle">
								<?php echo esc_html( $subtitle ); ?>
							</h2>
						<?php endif; ?>
					</div>
				<?php endif; ?>
			</div>
			<span class="er-button er-microsite-menu-toggle">
				<span class="er-microsite-menu-icon"></span>
				<span class="er-microsite-menu-icon"></span>
				<span class="er-microsite-menu-icon"></span>
			</span>
			<?php if ( $header_nav_menu ) : ?>
				<nav class="er-site-navigation" aria-label="<?php echo esc_attr__( 'Main menu', 'hello-elementor' ); ?>">
					<?php
					// PHPCS - escaped by WordPress with "wp_nav_menu"
					echo $header_nav_menu; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					?>
				</nav>
			<?php endif; ?>
		</div>
	</div>
	<?php if($siteOptions['dienstrad_tool_links'] && count($siteOptions['dienstrad_tool_links'])> 0)  {  ?>
			<nav class="er-microsite-header-dienstrad-tool">
		      <p><?php echo $siteOptions['dienstrad_tool_header_title']; ?> </p>
					<?php get_template_part( 'template-parts/partials/dienstrad-tool-links'); ?>
			</nav>
	<?php } ?>
</header>
