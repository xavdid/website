import React from "react";

import Link from "../Link";
import TagGroup from "../TagGroup";

/**
 * `posts` is an object with `edges`
 */
const BlogPostList = ({ posts }) => {
  const postsByYear = posts.edges.reduce((result, post) => {
    const year = post.node.frontmatter.date.slice(0, 4);

    return {
      ...result,
      [year]: [...(result[year] || []), post],
    };
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  // styles
  const leftBlockStyle = {
    flex: "0 0 5rem",
    textAlign: "right",
    margin: "0rem 1rem",
    fontWeight: "normal",
  };
  return years.map((year) => (
    <section key={year}>
      <h2>{year}</h2>
      {postsByYear[year].map((post) => (
        <div
          className="post-row"
          key={post.node.fields.slug}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
          }}
        >
          <h3
            // don't let the font size here get too big or the dates wrap and it looks bad
            style={{ display: "flex", marginLeft: 0, fontSize: "1.17em" }}
          >
            <time
              dateTime={post.node.frontmatter.date}
              style={{ ...leftBlockStyle, fontFamily: "monospace" }}
            >
              {new Date(
                `${post.node.frontmatter.date}T00:00:00`
              ).toLocaleString(undefined, {
                month: "short",
                day: "2-digit",
              })}
            </time>
            <Link href={post.node.fields.slug}>
              {post.node.frontmatter.title}
            </Link>
          </h3>
          <div style={{ display: "flex", paddingTop: "10px" }}>
            <div style={{ ...leftBlockStyle }} />
            <span style={{ fontSize: "smaller" }}>
              {post.node.frontmatter.og_desc}
            </span>
          </div>
          <div style={{ display: "flex", paddingTop: "" }}>
            <div style={{ ...leftBlockStyle }} />
            <TagGroup tags={post.node.frontmatter.tags} />
          </div>
        </div>
      ))}
    </section>
  ));
};

export default BlogPostList;
