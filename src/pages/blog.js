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

  return (
    <Layout>
      <Seo title="Blog" />
      <h1>Blog</h1>
      <p className="subtitle">I wrote some things.</p>
      {years.map((year) => (
        <section key={year}>
          <h2>{year}</h2>
          <ul style={{ listStyleType: "circle" }}>
            {postsByYear[year].map((post) => (
              <li key={post.node.fields.slug}>
                <h3 style={{ margin: 0 }}>
                  <Link to={post.node.fields.slug}>
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Layout>
  );
};

export default IndexPage;
