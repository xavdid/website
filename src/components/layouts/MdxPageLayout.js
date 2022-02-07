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

export default ({
  pageContext: { frontmatter = {} } = {},
  children,
  noTitle,
}) => (
  <BaseLayout>
    <Seo title={frontmatter.seo_title || frontmatter.title} />
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
        YoutubeEmbed,
        BlockquoteTitle,
        AirtableLinkAndReturn,
      }}
    >
      {children}
    </MDXProvider>
  </BaseLayout>
);
