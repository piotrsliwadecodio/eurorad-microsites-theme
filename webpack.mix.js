const mix = require('laravel-mix');

mix.js(['src/js/app.js','src/js/calculator.js','src/js/locations.js','src/js/help-center.js','src/js/online-partners.js', 'src/js/micrositeHeader.js'], './dist/js/')
    .sass('src/scss/app.scss', './dist/css/')
    .sourceMaps(true, 'source-map');
mix.options({
    processCssUrls: false, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
    
});
mix.disableNotifications()