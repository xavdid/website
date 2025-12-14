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
