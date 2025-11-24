/**
 * simple funciton to normalize tag names for urls
 */
module.exports.slugify = (tag) =>
  tag
    // strip out non-ascii characters
    // .replace(/[^A-z0-9_\- ]/g, "")
    .split(" ")
    .join("-")
    .toLowerCase();
