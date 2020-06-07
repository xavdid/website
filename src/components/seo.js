/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";

function SEO({ description, meta = {}, title }) {
  const metaDescription =
    description || `David Brownman's little corner of the internet.`;

  const metaProperties = {
    description: metaDescription,
    "og:title": title,
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
        // name: key,
        content: value,
      }))}
    />
  );
}

export default SEO;
