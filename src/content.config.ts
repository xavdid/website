import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/posts", pattern: "**/*.mdx" }),
  schema: ({ image }) =>
    z
      .object({
        datePublished: z.iso.date().optional(),
        title: z.string(),
        fact: z.string(),
        factYear: z.number(),
        tags: z.array(z.string()).default([]),
        ogImg: image().optional(),
        ogDesc: z.string().optional(),
        best_of: z.boolean().default(false),
      })
      .strict(),
});

// these are rendered in `src/pages/[...slug].astro`
const pages = defineCollection({
  loader: glob({ base: "./src/staticPages", pattern: "**/*.mdx" }),
  schema: () =>
    z
      .object({
        title: z.string(),
        subtitle: z.string().optional(),
        tab_title: z.string().optional(),
      })
      .strict(),
});

export const collections = { blog, pages };
