import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { faRssSquare, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogPostList from "../components/BlogPostList";
import Link from "../components/Link";
import Layout from "../components/layouts/BaseLayout";
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
              best_of
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
        <FontAwesomeIcon icon={faTag} /> <Link href="/blog/tags">by tag</Link>.
        My best or most popular posts are marked with a ⭐, so those are good
        places to start.
      </p>
      <p>
        If you want to be notified every time I post (like via RSS), head to the{" "}
        <FontAwesomeIcon icon={faRssSquare} style={{ color: "orange" }} />{" "}
        <Link href="/blog/feeds">feeds page</Link>.
      </p>

      <BlogPostList posts={data.posts} />
    </Layout>
  );
};

export default blogPage;
