module.exports = {
  plugins: ["prettier"],
  extends: ["standard", "standard-react", "plugin:mdx/recommended", "prettier"],
  rules: {
    "react/prop-types": 0,
  },
  overrides: [
    {
      files: ["*.mdx"],
      rules: {
        "react/jsx-indent": 0,
      },
      globals: {
        YoutubeEmbed: true,
        BlockquoteTitle: true,
        AirtableLinkAndReturn: true,
        Spoiler: true,
      },
    },
  ],
};
