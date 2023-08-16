import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

import {
  faArrowLeft,
  faRandom,
  faRssSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "../Link";
import PageHeader from "../page-header";
import Seo from "../seo";
import Layout from "./MdxPageLayout";

const BlogPostTemplate = ({
  data,
  pageContext: { randomSlug },
  location: { pathname },
}) => {
  const post = data.mdx;

  return (
    <Layout noTitle>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.og_desc || post.excerpt}
        meta={{
          "og:type": `article`,
          "og:url": `${data.site.siteMetadata.siteUrl}${pathname}`,
          "article:published_time": post.frontmatter.date,
          "og:image": post.frontmatter.og_img
            ? `${data.site.siteMetadata.siteUrl}${post.frontmatter.og_img.childImageSharp.original.src}`
            : data.site.siteMetadata.defaultOgImg,
        }}
        path={pathname}
      />
      <article>
        <PageHeader
          title={post.frontmatter.title || "Missing Title"}
          date={post.frontmatter.human_date}
          tags={post.frontmatter.tags}
        />
        <MDXRenderer>{post.body}</MDXRenderer>
      </article>

      <hr />

      <nav
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-evenly`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <div>
          <Link href="/blog">
            <FontAwesomeIcon icon={faArrowLeft} /> All Posts
          </Link>
        </div>

        <div>
          <Link href="/blog/feeds">
            <FontAwesomeIcon icon={faRssSquare} style={{ color: "orange" }} />{" "}
            Subscribe
          </Link>
        </div>

        <div>
          <Link href={randomSlug}>
            Random <FontAwesomeIcon icon={faRandom} />
          </Link>
        </div>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        defaultOgImg
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        og_desc
        og_img {
          childImageSharp {
            original {
              src
              height
              width
            }
          }
        }
        tags
        human_date: date(formatString: "MMMM DD, YYYY")
        date
      }
    }
  }
`;
