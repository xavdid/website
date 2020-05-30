import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/seo";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date }) {
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
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Hello World</h1>
      <ul>
        {data.allMarkdownRemark.edges.map(
          ({ node: { fields, frontmatter } }) => (
            <li key={fields.slug}>
              <Link to={fields.slug}>{frontmatter.title}</Link> (
              {frontmatter.date})
            </li>
          )
        )}
      </ul>
    </Layout>
  );
};

export default IndexPage;
