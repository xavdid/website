import { type CollectionEntry, getCollection } from "astro:content";

/**
 * takes an nullable date value and returns its unix timestamp - perfect for sorting!
 */
export const sortableDateValue = (d?: string): number =>
  (d ? new Date(d) : new Date()).valueOf();

/**
 * useful for sorting lists of things that have been finished. Newest to oldest.
 */
export const sortDateDescending = (
  a: { dateFinished: string },
  b: { dateFinished: string },
): number =>
  sortableDateValue(b.dateFinished) - sortableDateValue(a.dateFinished);

export const postPermalink = (slug: string): string => `/blog/post/${slug}/`;

// https://docs.astro.build/en/guides/environment-variables/#default-environment-variables
export const isProdBuild = import.meta.env.PROD;

// https://docs.astro.build/en/guides/content-collections/#filtering-collection-queries
// everything in dev, published only in prod
export const getPublishedPosts = async (): Promise<
  Array<CollectionEntry<"blog"> & { permalink: string }>
> =>
  (
    await getCollection("blog", ({ data: { datePublished } }) =>
      isProdBuild ? datePublished : true,
    )
  )
    .map((article) => ({
      ...article,
      permalink: postPermalink(article.id),
    }))
    .toSorted(
      (a, b) =>
        sortableDateValue(b.data.datePublished) -
        sortableDateValue(a.data.datePublished),
    );

export type ImageInfo = {
  url: string;
  height: number;
  width: number;
  // https://en.wikipedia.org/wiki/Media_type#Common_examples
  // pulled from the way astro loads images
  type: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
};
