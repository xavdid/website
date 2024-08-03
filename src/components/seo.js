import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

function SEO({ description, meta = {}, title, path }) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          defaultOgImg
        }
      }
    }
  `);
  const metaDescription =
    description || `David Brownman's little corner of the internet.`;

  const pageUrl = `${data.site.siteMetadata.siteUrl}${path}`;

  const metaProperties = {
    description: metaDescription,
    "og:title": title,
    "og:url": pageUrl,
    "og:image": data.site.siteMetadata.defaultOgImg,
    "og:description": metaDescription,
    "og:type": "website",

    "twitter:card": "summary_large_image",
    "twitter:url": pageUrl,
    "twitter:creator": "@xavdid",
    "twitter:site": "@xavdid",
    "twitter:title": title,
    "twitter:description": metaDescription,
    "twitter:domain": "xavd.id",
    ...meta,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title}
      titleTemplate="%s | xavd.id"
      meta={[
        ...Object.entries(metaProperties).map(([key, value]) => ({
          property: key,
          content: value,
        })),
        // https://github.com/darkreader/darkreader/issues/11604#issuecomment-1915815103
        // https://github.com/darkreader/darkreader/blob/main/CONTRIBUTING.md#disabling-dark-reader-on-your-site
        { name: "darkreader-lock" },
        { name: "fediverse:creator", content: "@xavdid@mastodon.social" },
      ]}
      link={[{ rel: "me", href: "https://mastodon.social/@xavdid" }].concat(
        path
          ? [
              {
                rel: "canonical",
                href: pageUrl,
              },
            ]
          : []
      )}
    />
  );
}

export default SEO;
