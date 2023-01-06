import { MDXProvider } from "@mdx-js/react";
import React from "react";

import InlineCode from "../InlineCode";
import Link from "../Link";
import PageHeader from "../page-header";
import Seo from "../seo";
import BaseLayout from "./BaseLayout";

import AirtableLinkAndReturn from "../AirtableLinkAndReturn";
import BlockquoteTitle from "../BlockquoteTitle";
import Spoiler from "../Spoiler";
import TightList from "../TightList";
import YoutubeEmbed from "../YoutubeEmbed";

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
        TightList,
      }}
    >
      {children}
    </MDXProvider>
  </BaseLayout>
);
