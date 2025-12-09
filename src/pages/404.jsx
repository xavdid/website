import Layout from "../components/layouts/BaseLayout";
import Link from "../components/Link";
import Seo from "../components/seo";

const notFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>
      There might be easter eggs to find... but this isn't one of them.{" "}
      <Link href="/">Head home.</Link>
    </p>
  </Layout>
);

export default notFoundPage;
