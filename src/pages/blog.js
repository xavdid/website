import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/seo";

import Link from "../components/Link";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { published: { eq: null } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
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
    const year = post.node.frontmatter.date.slice(0, 4);
    return {
      ...result,
      [year]: [...(result[year] || []), post],
    };
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  // styles
  const leftBlockStyle = {
    flex: "0 0 4rem",
    textAlign: "right",
    margin: "0rem 1rem 0rem 1.5rem",
  };

  return (
    <Layout>
      <Seo title="Blog" />
      <h1>Blog</h1>
      <p className="subtitle">
        I don't post often, but I put great effort into everything I write here.
      </p>
      {years.map((year) => (
        <section key={year}>
          <h2>{year}</h2>
          {/* <ul style={{ listStyleType: "none" }}> */}
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
              <h3 style={{ display: "flex" }}>
                <time
                  dateTime={post.node.frontmatter.date}
                  style={leftBlockStyle}
                >
                  {new Date(post.node.frontmatter.date).toLocaleString(
                    undefined,
                    {
                      month: "short",
                      day: "2-digit",
                    }
                  )}
                </time>
                <Link to={post.node.fields.slug}>
                  {post.node.frontmatter.title}
                </Link>
              </h3>
              <div style={{ display: "flex" }}>
                <div style={leftBlockStyle} />
                <span style={{ fontSize: "smaller" }}>
                  [{post.node.frontmatter.tags}]
                </span>
              </div>
            </div>
          ))}
          {/* </ul> */}
        </section>
      ))}
    </Layout>
  );
};

export default IndexPage;
