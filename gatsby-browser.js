import littlefoot from "littlefoot";

// these need to be `require`s, not es6 imports
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
