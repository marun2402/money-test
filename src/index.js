// SCSS
import './scss/main.scss'

import $ from 'jquery';
global.jQuery = global.$ = $;

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

requireAll(require.context('./components', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));  // pattern to take each .js(x) files
requireAll(require.context('./pug', true, /^\.\/(?!.*(?:__tests__)).*\.(jsx?)$/));

