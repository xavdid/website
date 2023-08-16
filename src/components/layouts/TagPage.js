import { graphql } from "gatsby";
import React from "react";

// Components
import BlogPostList from "../BlogPostList";
import Link from "../Link";
import PageHeader from "../page-header";
import Seo from "../seo";
import Layout from "./MdxPageLayout";

const Tags = ({ pageContext, data }) => {
  const { tag, slug } = pageContext;
  const { totalCount } = data.tagInfo;

  const tagHeader = `${totalCount === 1 ? "is" : "are"} ${totalCount} post${
    totalCount === 1 ? "" : "s"
  }`;

  return (
    <Layout noTitle>
      <Seo
        title={`Blog posts tagged with "${tag}"`}
        description={`Here are all the posts I've wrtten about ${tag}`}
        path={`/blog/tags/${slug}`}
      />

      <PageHeader title={`Posts tagged "${tag}"`} />
      <p>
        There {tagHeader} in this category. You can also view{" "}
        <Link href="/blog/tags">all tags</Link>.
      </p>
      <BlogPostList posts={data.tagInfo} />
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {
    tagInfo: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fields: { isBlogPost: { eq: true }, published: { eq: true } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
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
`;
