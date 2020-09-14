import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layouts/BaseLayout";
import Seo from "../components/seo";
import PageHeader from "../components/page-header";

import Link from "../components/Link";

export default () => {
  const data = useStaticQuery(graphql`
    {
      posts: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/posts/" } }
      ) {
        edges {
          node {
            fields {
              published
              slug
            }
            timeToRead
            frontmatter {
              title
              og_desc
              date
              tags
            }
          }
        }
      }
    }
  `);

  // obj of year => [post]
  const postsByYear = data.posts.edges.reduce((result, post) => {
    if (!post.node.fields.published) {
      return result;
    }

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

  return (
    <Layout>
      <Seo title="Blog" />
      <PageHeader
        title="Blog"
        subtitle={`${data.posts.edges.length} posts and counting.`}
      />

      <p>
        If you want to be notified every time I post, head on over to the{" "}
        <Link href="/blog/feeds">feeds page</Link>.
      </p>

      {years.map((year) => (
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
              <h3 style={{ display: "flex", marginLeft: 0 }}>
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
              <div style={{ display: "flex", paddingTop: "10px" }}>
                <div style={{ ...leftBlockStyle }} />
                {/* <span style={{ fontSize: "smaller" }}> */}
                {/* <span style={{ paddingRight: "5px" }}>
                    ~ {post.node.timeToRead} min{" "}
                  </span> */}
                {/* [{post.node.frontmatter.tags.join(", ")}] */}
                {/* <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    fontSize: "smaller",
                  }}
                >
                  {post.node.frontmatter.tags
                    .sort((a, b) =>
                      a.localeCompare(b, "en", { sensitivity: "base" })
                    )
                    .map((tag) => (
                      <span
                        key={tag}
                        style={{
                          backgroundColor: "lightgreen",
                          // TODO: fix first child not needing padding. flex?
                          // margin: "0 0.25rem",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                </div> */}
                {/* </span> */}
              </div>
            </div>
          ))}
        </section>
      ))}
    </Layout>
  );
};
