import React from "react";

import Layout from "../components/layouts/BaseLayout";
import Seo from "../components/seo";

import Link from "../components/Link";

export default () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>
      There might be easter eggs to find... but this isn&apos;t one of them.{" "}
      <Link href="/">Head Home.</Link>
    </p>
  </Layout>
);
