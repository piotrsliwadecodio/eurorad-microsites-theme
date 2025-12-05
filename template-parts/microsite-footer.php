<?php 
global $siteOptions; 
?>
<footer id="footer" class="er-microsite-footer">
	<?php get_template_part( 'template-parts/partials/dienstrad-tool-footer'); ?>
	<div class="er-container er-microsite-footer-main">
		<div class="er-microsite-footer-left">
			<?php if($siteOptions['footer_left']) { echo $siteOptions['footer_left']; } ?>
		</div>
		<div class="er-microsite-footer-right">
			<?php if($siteOptions['footer_right']) { echo $siteOptions['footer_right']; } ?>
		</div>
		<ul class="er-microsite-footer-menu">
			<?php
					wp_nav_menu(array(
						'theme_location' => 'menu-microsite-footer',
						'container'  => false,
						'items_wrap' => '%3$s',
						'after'      => '<span>|</span>',
						'depth'      => 0,
						'walker'     => new Microsite_Menu_Walker(),
					));
				?>
		</ul>
	</div>
</footer>