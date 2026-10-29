// @ts-check

import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://xavd.id",
  markdown: {
    // have to configure these here, since expressiveCode gets wiped out if `mdx()` is configured
    // see: https://github.com/expressive-code/expressive-code/issues/330
    processor: unified({
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
    }),
  },
  integrations: [
    expressiveCode({
      frames: false,
      styleOverrides: {
        // borderColor: "#00eaff",
        borderWidth: "1px",
        codeLineHeight: "1.4",
      },
    }),
    mdx(),
    sitemap(),
    preact(),
  ],
});
