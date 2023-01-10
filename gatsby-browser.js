import littlefoot from "littlefoot";

// need to import this css so it's included in the bundle and not loaded
//   async later (causing an unstyled content flash)
// https://github.com/FortAwesome/react-fontawesome/issues/234
// https://dev.to/kayla/how-to-fix-font-awesome-icons-flashing-wrong-size-in-gatsby-3igm
require("@fortawesome/fontawesome-svg-core/styles.css");
require("@fortawesome/fontawesome-svg-core").autoAddCss = false;

// these need to be `require`s, not es6 imports
// see: https://github.com/goblindegook/littlefoot/issues/338
require("littlefoot/dist/littlefoot.css");
require("prismjs/themes/prism-okaidia.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");

export function onRouteUpdate() {
  littlefoot({
    buttonTemplate: `<button
    aria-controls="fncontent:<% id %>"
    aria-expanded="false"
    aria-label="Footnote <% number %>"
    class="littlefoot-footnote__button"
    id="<% reference %>"
    rel="footnote"
    title="See Footnote <% number %>"
  />
    <% number %>
  </button>`,
  }); // Pass any littlefoot settings here.
}
