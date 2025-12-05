<div class="er-locations__item"
  data-title="<?php echo get_the_title($args['location']); ?>"
  data-address="<?php echo get_field( 'street', $args['location'] ); ?>, <?php echo get_field( 'postcode', $args['location'] ); ?> <?php echo get_field( 'city', $args['location'] ); ?>"
  data-lat="<?php echo $localization['lat']; ?>"
  data-lng="<?php echo $localization['lng']; ?>"
  data-city="<?php echo get_field( 'city', $args['location'] ); ?>"
  data-phone="<?php echo get_field( 'phone', $args['location'] ); ?>"
  data-website="<?php echo get_field( 'website', $args['location'] ); ?>"
  data-email="<?php echo get_field( 'email', $args['location'] ); ?>"
>
  <h3 class="er-locations__item-title"><?php the_title(); ?></h3>
  <p><?php echo get_field( 'street', $args['location'] ); ?></p>
  <p><?php echo get_field( 'postcode', $args['location'] ); ?></p>
  <p><?php echo get_field( 'city', $args['location'] ); ?></p>
  <p><?php echo get_field( 'phone', $args['location'] ); ?></p>
  <p><?php echo get_field( 'website', $args['location'] ); ?></p>
  <p><?php echo get_field( 'email', $args['location'] ); ?></p>
</div>
