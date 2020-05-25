import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import Seo from "../components/seo";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
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
              <Link to={fields.slug}>{frontmatter.title}</Link>
            </li>
          )
        )}
      </ul>
    </Layout>
  );
};

export default IndexPage;
