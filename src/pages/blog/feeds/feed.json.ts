import type { APIRoute } from "astro";
import { getPublishedPosts } from "../../../util";

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "The David Brownman Blog",
    home_page_url: `${import.meta.env.SITE}/blog`,
    feed_url: `${import.meta.env.SITE}/blog/feeds/feed.json`,
    items: posts.map(
      ({
        id,
        permalink,
        body,
        data: { title, ogDesc, datePublished, tags },
      }) => ({
        // https://www.jsonfeed.org/version/1.1/#items
        id,
        url: `${import.meta.env.SITE}${permalink}`,
        title,
        summary: ogDesc || "An older blog post",
        content_text: body?.slice(0, 100) + "...",
        date_published: `${datePublished}T17:00:00-07:00.`, // RFC3339, not just ISO
        tags,
      }),
    ),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { "Content-Type": "application/feed+json" },
  });
};
