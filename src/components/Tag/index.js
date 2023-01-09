import { Link } from "gatsby";
import React from "react";

import { slugify } from "../../misc/utils";

import "./tag.scss";

/**
 * nice little rounded link tag
 */
const Tag = ({ name }) => (
  <Link className="tag" to={`/blog/tags/${slugify(name)}`}>
    {name}
  </Link>
);

export default Tag;
