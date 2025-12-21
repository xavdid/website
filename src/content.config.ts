import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/posts", pattern: "**/*.mdx" }),
  schema: ({ image }) =>
    z
      .object({
        datePublished: z.string().date().optional(),
        title: z.string(),
        fact: z.string(),
        fact_year: z.number(),
        tags: z.array(z.string()).default([]),
        og_img: image().optional(),
        og_desc: z.string().optional(),
        best_of: z.boolean().default(false),
      })
      .strict(),
});

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
