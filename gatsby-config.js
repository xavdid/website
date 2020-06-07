module.exports = {
  siteMetadata: {
    siteUrl: "https://xavd.id",
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages-md`,
      },
    },
    `gatsby-remark-images`,
    `gatsby-remark-autolink-headers`, // dupe from mdx, needed
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/components/layouts/MdxPageLayout"),
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true, // i'll style these elsewhere
            },
          },
          `gatsby-remark-copy-linked-files`,
          // `gatsby-remark-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // maxWidth: 800
              linkImagesToOriginal: false,
              showCaptions: true,
              markdownCaptions: true,
            },
          },
          // },
        ],
      },
    },
    `gatsby-transformer-sharp`,
  ],
};
