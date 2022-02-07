import React from "react";

import "./blockquote-title.scss";

/**
 * A legacy component that replicates how blockquotes used to be styled on the site
 */
export default ({ children }) => (
  <div className="blockquote-title">{children}</div>
);
