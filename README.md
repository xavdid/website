# xavd.id

This site is built with [gatsby](https://www.gatsbyjs.org/)!

## Notes

An unorganized list to help me keep this organized

- Everything in `src/posts` is built into a page automatically, nothing extra needed
- All the blog posts are made into pages by `js` code in `gatsby-node.js`
- `.md(x)` files in the `pages` folder can have optional frontmatter that's available to `MdxPageLayout` via `props.pageContext.frontmatter`.
- `.md(x)` files can supply a `title` in frontmatter, or just use a `#` tag at the top of the page. If you want a subtitle, you need to supply both the `title` and `subtitle` in frontmatter.
- For the `SEO` component, later versions of it will be merged into the root value. `title` and `XYZ` are picked up automatically if in frontmatter or you can drop an actual component in the file.
- the gatsby version is pinned to `2.22.20` to get around [this](https://github.com/carbon-design-system/gatsby-theme-carbon/issues/873)
- there's really only styles for h1-3, so don't use h4 and down
- anything that would have dropped in as a cdn tag and included should go in `gatsby-browser`
- some lines in markdown have `<!-- prettier-ignore -->` because prettier is adding a `\` before regular `$`.
- adding `draft: true` to a post's frontmatter hides it from the list and stops the page from being built.
