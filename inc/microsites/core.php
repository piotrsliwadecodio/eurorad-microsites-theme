<?php
function get_microsite_options_from_cache() {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $uri = $_SERVER['REQUEST_URI'] ?? '';
    
    $cacheKey = 'siteOptions-' . md5($host . $uri);
    $cacheGroup = 'site-management';
    
    // In development, disable cache
    if (defined('WP_DEBUG') && WP_DEBUG) {
        return false;
    }
    
    return wp_cache_get($cacheKey, $cacheGroup);
}

function set_microsite_options_from_acf() {
    global $siteOptions;
    
    $context = get_microsite_context();
    
    if (!$context['is_microsite']) {
        $siteOptions = [];
        return;
    }
    
    $microsite_id = $context['microsite_id'];
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $uri = $_SERVER['REQUEST_URI'] ?? '';
    
    $cacheKey = 'siteOptions-' . md5($host . $uri);
    $cacheGroup = 'site-management';
    $cacheExpire = 3600;
    
    $siteOptions = get_microsite_meta($microsite_id);
    $siteOptions['microsite_context'] = $context; // Store context
    
    if (!defined('WP_DEBUG') || !WP_DEBUG) {
        wp_cache_set($cacheKey, $siteOptions, $cacheGroup, $cacheExpire);
    }
}

function set_microsite_options() {
    global $siteOptions;
    if (null === $siteOptions) {
        $siteOptions = get_microsite_options_from_cache();
        if (false === $siteOptions) {
            set_microsite_options_from_acf();
        }
    }
}
add_action('init', 'set_microsite_options', 20);

add_action('save_post_microsite', function($post_id) {
    wp_cache_flush_group('site-management');
    wp_cache_delete('microsites_domains_map', 'microsite');
});

function get_microsite_meta($microsite_id) {

    if (!function_exists('get_field')) {
      return;
    }

    if ( empty($microsite_id)) {
        return;
    }

    $microsite_post = get_post($microsite_id);

    if ( empty($microsite_post)) {
        return;
    }

    $siteOptions = array(
      'microsite_id' => $microsite_id,
      'slug' => $microsite_post->post_name,
      'title' => $microsite_post->post_title,
    );

    $microsite_master = get_field('microsite_master', 'option');

    if ( $microsite_master ) {
        $fields_master = get_field_objects($microsite_master);
        if($fields_master) {
            foreach ($fields_master as $key => $field) {
                $siteOptions[$key] = $field['value'];
            }
        }
    }

    $microsites_settings_override = get_field('microsites_settings_override', 'option');

    if ( $microsites_settings_override ) {
        foreach ($microsites_settings_override as $microsite) {
            $microsite_type_ids = $microsite['microsite_type'];
            if ( has_term( $microsite_type_ids, 'microsite-type', $microsite_id ) ) {
                $override_post_id = $microsite['microsite'] ?? 0;
                $fields = get_field_objects($override_post_id);
                if($fields) {
                    foreach ($fields as $key => $field) {
                        if(!empty($field['value'])) {
                            $siteOptions[$key] = $field['value'];
                        }            
                    }
                }
            }
        }
    }
    
    $fields = get_field_objects($microsite_id);

    if($fields) {
        foreach ($fields as $key => $field) {
            if(!empty($field['value'])) {
                $siteOptions[$key] = $field['value'];
            }            
        }
    }

    return $siteOptions;
}