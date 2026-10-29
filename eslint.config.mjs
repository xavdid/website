// @ts-check

import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import astro from "eslint-plugin-astro";
import * as mdx from "eslint-plugin-mdx";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

// i commented out a bunch of things in here during a migration on 2026-10-28. they might still be relevant, but maybe not

export default defineConfig(
  { ignores: ["dist/", ".astro/", "eslint.config.mjs"] },

  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  mdx.flat,
  prettier,

  {
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
  },
  // {
  //   rules: {
  //     // https://typescript-eslint.io/rules/no-unused-vars/#what-benefits-does-this-rule-have-over-typescript
  //     "@typescript-eslint/no-unused-vars": [
  //       "error",
  //       {
  //         args: "all",
  //         argsIgnorePattern: "^_",
  //         caughtErrors: "all",
  //         caughtErrorsIgnorePattern: "^_",
  //         destructuredArrayIgnorePattern: "^_",
  //         varsIgnorePattern: "^_",
  //         ignoreRestSiblings: true,
  //       },
  //     ],
  //     "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  //     // all astro components are untyped, so I'm getting a lot of complaints about this
  //     "@typescript-eslint/no-unsafe-return": "off",
  //     "@typescript-eslint/no-unsafe-assignment": "off",
  //     "no-restricted-imports": [
  //       "error",
  //       {
  //         paths: [
  //           {
  //             name: "astro:schema",
  //             importNames: ["undefined"],
  //             message:
  //               "This import is almost certainly in error. You use `undefined` directly unless you're describing a Zod schema.",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // },
  {
    // it's hard to disable eslint rules in mdx for parser reasons, so I do it here
    // I need to import `Spoiler` but it looks unused
    files: [
      "src/posts/afterparty-s2-puzzle-guide/index.mdx",
      "src/posts/favorite-media-2022/index.mdx",
      "src/staticPages/blog/feeds.mdx",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.mdx"],

    // rules: {
    //   "react/jsx-indent": 0,
    //   "react/self-closing-comp": 0,
    // },

    languageOptions: {
      globals: {
        // these don't seem to do anything anymore? linting doesn't actually work
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
  },
  {
    files: ["**/*.ts", "**/*.astro"],
    rules: {
      "no-restricted-imports": [
        "error",

        // importing from the config directly blows up the build w/ vague error messages
        {
          patterns: [
            {
              regex: "(\.\.\/)+astro.config.mjs",
              message:
                "Don't import astro.config.mjs directly. To get the site name, use `import.meta.env.SITE`. Otherwise, seek a different approach.",
            },
          ],
        },
      ],
    },
  },
);
