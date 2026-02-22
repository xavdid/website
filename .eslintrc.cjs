module.exports = {
  plugins: ["prettier"],
  extends: [
    "plugin:astro/recommended",
    "standard",
    "preact",
    "plugin:mdx/recommended",
    "prettier",
  ],
  rules: {
    "react/prop-types": 0,
    "react/jsx-key": 0,
    "react/self-closing-comp": 0,
    "no-restricted-imports": [
      "error",
      {
        paths: [
          // importing from lucide root is super slow
          // https://github.com/withastro/astro/issues/12928
          {
            name: "@lucide/astro",
            message:
              "Import from `@lucide/astro/icons/TKTK` instead for performance reasons",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
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
