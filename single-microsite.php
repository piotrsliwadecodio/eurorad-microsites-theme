<?php
global $siteOptions;

$master_microsite_id = get_field('microsites_master', 'option') ?? 0;
$microsite_id        = $siteOptions['microsite_id'] ?? null;

get_header();

// Use comprehensive Elementor detection function
// This covers all Elementor modes: editor, iframe, preview, templates, global widgets
$elementor = false;
if (function_exists('is_elementor_active')) {
    $elementor = is_elementor_active();
} else {
    // Fallback detection if function doesn't exist yet
    $elementor = (
        isset($_GET['elementor-preview']) ||           // Standard editor preview
        isset($_GET['preview']) ||                     // WP preview
        ( did_action('elementor/loaded') 
            && isset(\Elementor\Plugin::$instance->editor)
            && \Elementor\Plugin::$instance->editor->is_edit_mode()
        ) ||                                            // Editor mode
        ( did_action('elementor/loaded') 
            && isset(\Elementor\Plugin::$instance->preview)
            && \Elementor\Plugin::$instance->preview->is_preview_mode()
        )                                               // Live preview (iframe)
    );
}

// Force calling the_content() ALWAYS in Elementor editor mode
// Elementor MUST detect the_content() to render the edit interface
// This is critical for ALL post types: pages, posts, microsites, elementor_library
$force_the_content = $elementor;

while ( have_posts() ) {
    the_post();
    $post_id = get_the_ID();
    $post_content = get_the_content(null, false, $post_id);

    if ( $force_the_content ) {
        /**
         * --- ELEMENTOR EDITOR / PREVIEW MODE ---
         * We *must* output the_content(), EVEN IF EMPTY.
         * Elementor scans for this hook to know where to insert widgets.
         */
        the_content();
        continue;
    }

    /**
     * --- FRONTEND MODE ---
     * If post_content exists → normal rendering
     * If empty → but Elementor data exists → use Elementor frontend renderer
     * Otherwise → fallback to plain WP content filter
     */

    if ( ! empty($post_content) ) {
        // Standard WordPress content
        the_content();
    } else {

        $has_elementor_data = get_post_meta($post_id, '_elementor_data', true);

        if ( $has_elementor_data && did_action('elementor/loaded') ) {
            // Render Elementor-built content on frontend
            echo \Elementor\Plugin::instance()->frontend->get_builder_content_for_display($post_id);
        } else {
            // True fallback: render whatever is in post_content even if empty
            echo apply_filters('the_content', get_post_field('post_content', $post_id));
        }
    }
}

get_footer();
