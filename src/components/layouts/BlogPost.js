import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Link from "../Link";
import Layout from "./MdxPageLayout";
import Seo from "../seo";
import PageHeader from "../page-header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRssSquare } from "@fortawesome/free-solid-svg-icons";

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.mdx;
  const { previous, next } = pageContext;

  return (
    <Layout noTitle>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <PageHeader
          title={post.frontmatter.title || "Missing Title"}
          date={post.frontmatter.date}
        />
        <MDXRenderer>{post.body}</MDXRenderer>
      </article>

      <hr />

      <nav
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        {previous && (
          <div>
            <Link href={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          </div>
        )}

        <div>
          <Link href="/blog/feed">
            <FontAwesomeIcon icon={faRssSquare} style={{ color: "orange" }} />
          </Link>
        </div>

        {next && (
          <div>
            <Link href={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          </div>
        )}
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        subtitle
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
