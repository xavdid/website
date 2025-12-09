import slugify from "@sindresorhus/slugify";
import Link from "../Link/index.astro";

import "./tag.scss";

/**
 * nice little rounded link tag
 */
const Tag = ({ name }) => (
  <a className="tag" href={`/blog/tags/${slugify(name)}`}>
    {name}
  </a>
);

export default Tag;
