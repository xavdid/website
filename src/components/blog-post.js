import React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "./layouts/BaseLayout";
import Seo from "./seo";
import PageHeader from "./page-header";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  console.log(data);
  const post = data.mdx;
  const { previous, next, isBlog } = pageContext;

  return (
    <Layout location={location}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        {post.frontmatter.title && (
          <PageHeader
            title={post.frontmatter.title}
            subtitle={post.frontmatter.date}
          />
        )}
        <MDXRenderer>{post.body}</MDXRenderer>
      </article>
      {isBlog && (
        <>
          <hr />
          <nav>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </>
      )}
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
