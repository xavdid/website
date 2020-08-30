const path = require(`path`);
const { shuffle } = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage: createGatsbyPage } = actions;

  const isProdBuild = process.env.NODE_ENV === "production";

  const blogPost = require.resolve(`./src/components/layouts/BlogPost`);
  const result = await graphql(
    `
      {
        blog: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { regex: "/posts/" } }
        ) {
          edges {
            node {
              frontmatter {
                title
              }
              fields {
                slug
                published
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query');
    return;
  }

  // Create blog posts pages.
  const posts = result.data.blog.edges.filter((post) =>
    // for prod, pretend non-published posts don't exist
    isProdBuild ? post.node.fields.published : true
  );

  const randomlyOrderedSlugs = shuffle(
    posts.map((post) => post.node.fields.slug)
  );

  posts.forEach((post, index) => {
    const slug = post.node.fields.slug;
    // the random target is the next in the shuffled list (or wraparound if it's the end)
    // this gives us a complete circuit of posts
    const randomSlug =
      randomlyOrderedSlugs[
        (randomlyOrderedSlugs.indexOf(slug) + 1) % randomlyOrderedSlugs.length
      ];

    createGatsbyPage({
      path: slug,
      component: blogPost,
      context: {
        slug,
        randomSlug,
      },
    });
  });

  // everything in src/pages is created automatically
  // any other folders would need to be handled here.
};

// add slugs to pages
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const filePath = createFilePath({ node, getNode });

    // since all markdown comes through here, we have to distinguish which files are blog posts vs top-level pages
    const value = path
      .relative(__dirname, node.fileAbsolutePath)
      .startsWith("posts")
      ? `/blog/post${filePath}`
      : filePath;

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    // it's hard to query for null values, so flip them here
    createNodeField({
      name: `published`,
      node,
      value: !node.frontmatter.draft, // missing (or false, I guess) means it's public
    });
  }
};
