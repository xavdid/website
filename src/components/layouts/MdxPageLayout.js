import React from "react";

import BaseLayout from "./BaseLayout";
import Seo from "../seo";
import PageHeader from "../page-header";

export default ({ pageContext: { frontmatter }, children }) => (
  <BaseLayout>
    <Seo title={frontmatter.seo_title || frontmatter.title} />
    {frontmatter.title && (
      <PageHeader title={frontmatter.title} subtitle={frontmatter.subtitle} />
    )}
    {children}
  </BaseLayout>
);
