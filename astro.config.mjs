// @ts-check

import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// https://astro.build/config
export default defineConfig({
  site: "https://xavd.id",
  // have to configure these here, since expressiveCode gets wiped out if `mdx()` is configured
  // see: https://github.com/expressive-code/expressive-code/issues/330
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            // passed as a prop to OmniLink
            isHeading: true,
          },
        },
      ],
    ],
  },
  integrations: [
    expressiveCode({
      frames: false,
      styleOverrides: {
        borderColor: "#00eaff",
        borderWidth: "1px",
        codeLineHeight: "1.4",
      },
    }),
    mdx(),
    sitemap(),
    react(),
  ],
});
