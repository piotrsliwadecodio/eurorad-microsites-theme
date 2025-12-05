<?php global $siteOptions; ?>

<?php if ( ! empty( $siteOptions['dienstrad_tool_links'] ) && count( $siteOptions['dienstrad_tool_links'] ) > 0 ) : ?>
	<div style="border-bottom: 1px solid rgba(0,0,0,0.1); padding: 32px 0px;">
		<div class="er-container" style="text-align: center">
			<?php if ( $siteOptions['dienstrad_tool_footer_title'] ) { ?>
			<div class="er-header"><?php echo $siteOptions['dienstrad_tool_footer_title']; ?></div>
			<?php } ?>
			<?php if ( $siteOptions['dienstrad_tool_footer_text'] ) { ?>
				<?php echo $siteOptions['dienstrad_tool_footer_text']; ?>
			<?php } ?>
			
      <?php get_template_part( 'template-parts/partials/dienstrad-tool-links'); ?>

		</div>
	</div>
<?php endif; ?>
