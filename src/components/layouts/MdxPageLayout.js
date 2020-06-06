import React from "react";
import { MDXProvider } from "@mdx-js/react";

import BaseLayout from "./BaseLayout";
import Seo from "../seo";
import PageHeader from "../page-header";
import Link from "../Link";
import InlineCode from "../InlineCode";

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
        a: Link,
        inlineCode: InlineCode,
      }}
    >
      {children}
    </MDXProvider>
  </BaseLayout>
);
