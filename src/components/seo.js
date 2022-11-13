import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

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

  const metaProperties = {
    description: metaDescription,
    "og:title": title,
    "og:image": data.site.siteMetadata.defaultOgImg,
    "og:description": metaDescription,
    "og:type": "website",

    "twitter:card": "summary",
    "twitter:creator": "@xavdid",
    "twitter:title": title,
    "twitter:description": metaDescription,
    ...meta,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={title}
      titleTemplate="%s | xavd.id"
      meta={Object.entries(metaProperties).map(([key, value]) => ({
        property: key,
        content: value,
      }))}
      link={[{ rel: "me", href: "https://mastodon.social/@xavdid" }].concat(
        path
          ? [
              {
                rel: "canonical",
                href: `${data.site.siteMetadata.siteUrl}${path}`,
              },
            ]
          : []
      )}
    />
  );
}

export default SEO;
