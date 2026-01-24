module.exports = {
  plugins: ["prettier"],
  extends: ["standard", "preact", "plugin:mdx/recommended", "prettier"],
  rules: {
    "react/prop-types": 0,
  },
  overrides: [
    {
      files: ["*.mdx"],
      rules: {
        "react/jsx-indent": 0,
        // messes with ul lists that take markdown content
        "react/self-closing-comp": 0,
      },
      globals: {
        YoutubeEmbed: true,
        BlockquoteTitle: true,
        AirtableLinkAndReturn: true,
        Spoiler: true,
        Link: true,
        MediaYearLink: true,
        ViewFullSize: true,
        FinishWhatWeStarted: true,
        BigLink: true,
      },
    },
  ],
};
