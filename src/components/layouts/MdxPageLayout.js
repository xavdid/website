import React from "react";
import { MDXProvider } from "@mdx-js/react";

import BaseLayout from "./BaseLayout";
import Seo from "../seo";
import PageHeader from "../page-header";
import Link from "../Link";
import InlineCode from "../InlineCode";

import YoutubeEmbed from "../YoutubeEmbed";
import BlockquoteTitle from "../BlockquoteTitle";
import AirtableLinkAndReturn from "../AirtableLinkAndReturn";
import Spoiler from "../Spoiler";

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
