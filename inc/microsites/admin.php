<?php
function er_microsite_url_column($columns) {
    $columns['microsite-url'] = 'Preview URL';
    return $columns;
}
add_filter('manage_microsite_posts_columns', 'er_microsite_url_column');

function er_microsite_url_column_content($column_name, $post_id) {
    if ('microsite-url' === $column_name) {
        $url = get_microsite_preview_url($post_id);
        echo '<a href="' . esc_url($url) . '" target="_blank">' . esc_html($url) . '</a>';
    }
}
add_action('manage_microsite_posts_custom_column', 'er_microsite_url_column_content', 10, 2);