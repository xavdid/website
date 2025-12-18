// @ts-check

import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://xavd.id",
  integrations: [
    mdx({
      rehypePlugins: [
        // the IDs get generated without this, but the autolinking doesn't work?
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
    sitemap(),
    react(),
  ],
});
