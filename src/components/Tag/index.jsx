import { slugify } from "../../util";
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
