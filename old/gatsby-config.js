const siteUrl = "https://xavd.id";

module.exports = {
  siteMetadata: {
    title: "The site formerly known as davidbrownman.com",
    siteUrl,
    defaultOgImg: `${siteUrl}/og_img.png`,
    author: "David Brownman",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `David Brownman's Website`,
        short_name: `xavd.id`,
        start_url: `/`,
        background_color: `#00274C`,
        theme_color: `#FFCB05`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
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
          `gatsby-remark-mermaid`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true, // i'll style these elsewhere
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // maxWidth: 800
              linkImagesToOriginal: false,
              showCaptions: true,
              // markdownCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              // explicitly ignore nothing so that it works for images
              ignoreFileExtensions: [],
            },
          },
          // },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        // REQUIRED IF USING HOSTED GOATCOUNTER! https://[my_code].goatcounter.com
        code: "xavdid",

        // there are many other settings, which I'm not using
        // see: https://www.gatsbyjs.com/plugins/gatsby-plugin-goatcounter/#how-to-use

        // Set to true to include a gif to count non-JS users
        pixel: true,

        // Allow requests from local addresses (localhost, 192.168.0.0, etc.)
        // for testing the integration locally.
        allowLocal: false,
      },
    },
    // `gatsby-remark-copy-linked-files`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                author
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            output: "/blog/feeds/rss.xml",
            title: "The David Brownman Blog",
            description: "A little bit of everything",
            serialize: ({
              query: {
                site: {
                  siteMetadata: { siteUrl },
                },
                posts,
              },
            }) => {
              return posts.edges.map(({ node }) => {
                const path = `${siteUrl}${node.fields.slug}`;
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: path,
                  guid: path,
                  categories: node.frontmatter.tags,
                });
              });
            },
            query: `
              {
                posts: allMdx(
                  filter: {fields: {isBlogPost: {eq: true}, published: {eq: true}}}
                  sort: {fields: frontmatter___date, order: DESC}
                ) {
                  edges {
                    node {
                      excerpt
                      fields { slug }
                      frontmatter {
                        title
                        date
                        tags
                      }
                    }
                  }
                }
              }`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-remove-serviceworker`,
  ],
};
