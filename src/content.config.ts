import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      date: z.string().date(),
      title: z.string(),
      fact: z.string(),
      fact_year: z.number(),
      tags: z.array(z.string()).default([]),
      og_img: image().optional(),
      og_desc: z.string().optional(),
      best_of: z.boolean().default(false),
    }),
});

export const collections = { blog };
