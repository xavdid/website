import { MDXProvider } from "@mdx-js/react";
import React from "react";

// ordering of these imports is very important
// if they're out of order, then the CSS loader
// gets confused and I get tons of hard-to-fix warnings

import PageHeader from "../page-header";
import Seo from "../seo";

import AirtableLinkAndReturn from "../AirtableLinkAndReturn";
import BlockquoteTitle from "../BlockquoteTitle";
import InlineCode from "../InlineCode";
import Link from "../Link";
import Spoiler from "../Spoiler";
import YoutubeEmbed from "../YoutubeEmbed";

import BaseLayout from "./BaseLayout";

export default ({
  pageContext: { frontmatter = {} } = {},
  children,
  noTitle,
  path,
}) => (
  <BaseLayout>
    <Seo title={frontmatter.seo_title || frontmatter.title} path={path} />
    {!noTitle && frontmatter.title && (
      <PageHeader title={frontmatter.title} subtitle={frontmatter.subtitle} />
    )}
    <MDXProvider
      components={{
        // these will be used in place of the generic
        a: Link,
        inlineCode: InlineCode,
        table: (props) => (
          <div className="table-container">
            <table>{props.children}</table>
          </div>
        ),
        // any other components here can be used in all mdx without imports
        // also add these in eslintrc
        YoutubeEmbed,
        BlockquoteTitle,
        AirtableLinkAndReturn,
        Spoiler,
      }}
    >
      {children}
    </MDXProvider>
  </BaseLayout>
);
