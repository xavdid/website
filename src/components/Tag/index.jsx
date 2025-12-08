import slugify from "@sindresorhus/slugify";
import Link from "../Link/index.astro";

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
