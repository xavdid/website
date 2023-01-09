import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import BlogPostList from "../components/BlogPostList";
import Layout from "../components/layouts/BaseLayout";
import Link from "../components/Link";
import PageHeader from "../components/page-header";
import Seo from "../components/seo";

const blogPage = () => {
  const data = useStaticQuery(graphql`
    {
      posts: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: {
          # don't remove; load bearing
          # I'd think that published posts all have dates, but idk
          fileAbsolutePath: { regex: "/posts/" }
          fields: { published: { eq: true } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            # timeToRead
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

  return (
    <Layout>
      <Seo title="Blog" path="/blog/" />
      <PageHeader
        title="Blog"
        subtitle={`${data.posts.edges.length} posts and counting.`}
      />

      <p>
        Posts are shown chronologically; you can also view posts{" "}
        <Link href="/blog/tags">by tag</Link>.
      </p>
      <p>
        If you want to be notified every time I post, head on over to the{" "}
        <Link href="/blog/feeds">feeds page</Link>.
      </p>

      <BlogPostList posts={data.posts} />
    </Layout>
  );
};

export default blogPage;
