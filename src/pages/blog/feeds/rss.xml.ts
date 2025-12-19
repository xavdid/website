import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPublishedPosts } from "../../../util";

export const GET: APIRoute = async (context) => {
  const posts = await getPublishedPosts();

  return rss({
    title: "The David Brownman Blog",
    description: "A little bit of everything",
    site: context.site!,
    items: posts.map((post) => ({
      ...post.data,
      pubDate: post.data.datePublished
        ? new Date(post.data.datePublished)
        : new Date(),
      description: `${post.data.og_desc}<br /><br /><a href=${`https://xavd.id/blog/post/${post.id}/`}>Read the whole thing</a>.`,
      link: `/blog/post/${post.id}/`,
    })),
  });
};
